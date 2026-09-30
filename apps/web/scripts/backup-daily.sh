#!/usr/bin/env bash
# Daily backup: app DB + Directus DB + Directus uploads
# Install: 0 3 * * * /data/studyabroad/apps/web/scripts/backup-daily.sh >> /var/log/studyabroad-backup.log 2>&1
set -euo pipefail

ROOT="${STUDYABROAD_ROOT:-/data/studyabroad}"
BACKUP_ROOT="${BACKUP_ROOT:-$ROOT/backups}"
STAMP="$(date +%Y%m%d_%H%M%S)"
DAY_DIR="$BACKUP_ROOT/$STAMP"
KEEP_DAYS="${KEEP_DAYS:-14}"

mkdir -p "$DAY_DIR"

# Load DB credentials if present
if [[ -f "$ROOT/infra/.env" ]]; then
  # shellcheck disable=SC1090
  set -a
  # Only export safe keys we need
  POSTGRES_PASSWORD="$(grep -E '^POSTGRES_PASSWORD=' "$ROOT/infra/.env" | cut -d= -f2- | tr -d '"' || true)"
  POSTGRES_USER="$(grep -E '^POSTGRES_USER=' "$ROOT/infra/.env" | cut -d= -f2- | tr -d '"' || true)"
  POSTGRES_USER="${POSTGRES_USER:-postgres}"
  set +a
fi

echo "[backup] start $STAMP"

# App database (compose project names containers with -1 suffix)
PG_CONTAINER="${PG_CONTAINER:-studyabroad-postgres-1}"
if command -v docker >/dev/null 2>&1; then
  if ! docker inspect "$PG_CONTAINER" >/dev/null 2>&1; then
    PG_CONTAINER="$(docker ps --format '{{.Names}}' | grep -E 'postgres' | head -1 || true)"
  fi
  if [[ -n "${PG_CONTAINER:-}" ]]; then
    docker exec "$PG_CONTAINER" pg_dump -U "$POSTGRES_USER" studyabroad_app \
      | gzip > "$DAY_DIR/studyabroad_app.sql.gz" || echo "[backup] WARN app dump failed"
    # Directus DB name may be studyabroad or directus
    for DB in studyabroad directus; do
      if docker exec "$PG_CONTAINER" psql -U "$POSTGRES_USER" -ltq | awk '{print $1}' | grep -qx "$DB"; then
        docker exec "$PG_CONTAINER" pg_dump -U "$POSTGRES_USER" "$DB" \
          | gzip > "$DAY_DIR/studyabroad_directus.sql.gz" && break
      fi
    done
    [[ -s "$DAY_DIR/studyabroad_directus.sql.gz" ]] || echo "[backup] WARN directus dump failed"
  else
    echo "[backup] WARN postgres container not found"
  fi
else
  echo "[backup] WARN docker not found; skipping pg_dump"
fi

# Directus uploads
UPLOADS="$ROOT/infra/directus/uploads"
if [[ -d "$UPLOADS" ]]; then
  tar -czf "$DAY_DIR/directus_uploads.tar.gz" -C "$ROOT/infra/directus" uploads \
    || echo "[backup] WARN uploads tar failed"
fi

# Env snapshot (redact-friendly: copy without secrets if needed — store separately)
cp -a "$ROOT/apps/web/.env.local" "$DAY_DIR/web.env.local.bak" 2>/dev/null || true

echo "[backup] wrote $DAY_DIR"
ls -lh "$DAY_DIR" || true

# Prune old
find "$BACKUP_ROOT" -mindepth 1 -maxdepth 1 -type d -mtime +"$KEEP_DAYS" -exec rm -rf {} + 2>/dev/null || true
echo "[backup] done; keep ${KEEP_DAYS}d"
