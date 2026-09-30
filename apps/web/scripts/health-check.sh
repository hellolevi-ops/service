#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://127.0.0.1:3000}"
DIRECTUS="${DIRECTUS_URL:-http://127.0.0.1:8055}"

echo "== web /api/health =="
curl -fsS "$BASE/api/health" | tee /tmp/sa-health.json
echo
echo "== directus health =="
curl -fsS "$DIRECTUS/server/health" || curl -fsS "$DIRECTUS/server/info" || true
echo
echo "== key pages =="
for p in / /tracks/uk-pg /cases /book /lab/tools/assessment /sitemap.xml /llms.txt /robots.txt; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$p")
  echo "$code $p"
done
echo "OK"
