#!/usr/bin/env bash
# Build + serve a Next app. Usage: serve.sh <appDir> <port>   (kills whatever is on that port first)
set -e
dir="$1"; port="$2"
cd "$dir"
[ -d node_modules ] || npm ci --no-audit --no-fund >/dev/null
npm run build 2>&1 | grep -E 'Compiled|Failed|rror' | head -20
pid=$(lsof -ti tcp:"$port" 2>/dev/null || true); [ -n "$pid" ] && kill $pid 2>/dev/null || true
(npx next start -p "$port" >/dev/null 2>&1 &)
for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:$port/ && { echo "serving $dir on :$port"; exit 0; }; sleep 1; done
echo "server failed to start"; exit 1
