#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "Set GITHUB_TOKEN (repo write scope) then re-run." >&2
  exit 1
fi
git -c http.proxy= -c https.proxy= \
  push "https://x-access-token:${GITHUB_TOKEN}@github.com/hellolevi-ops/service.git" main
echo "Pushed: https://github.com/hellolevi-ops/service"
