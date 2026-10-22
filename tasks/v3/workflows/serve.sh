#!/usr/bin/env bash
# Build + serve a Next app. Usage: serve.sh <appDir> <port>   (stops whatever listens on that port first)
# Ends with a buildId guard: the served HTML must carry the buildId in .next/BUILD_ID, or the
# script fails loudly (a server left running from an older build serves stale HTML whose chunks 500).
set -e
dir="$1"; port="$2"
cd "$dir"
[ -d node_modules ] || npm ci --no-audit --no-fund >/dev/null
npm run build 2>&1 | grep -E 'Compiled|Failed|rror' | head -20
[ -f .next/BUILD_ID ] || { echo "FAIL: no .next/BUILD_ID, the build did not finish"; exit 1; }
# Only the listener: plain `lsof -ti tcp:PORT` also returns browsers connected to it.
pid=$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || true); [ -n "$pid" ] && kill $pid 2>/dev/null || true
for i in $(seq 1 20); do lsof -ti tcp:"$port" -sTCP:LISTEN >/dev/null 2>&1 || break; sleep 0.5; done
(npx next start -p "$port" >/dev/null 2>&1 &)
for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:$port/ && break; sleep 1; done
want=$(cat .next/BUILD_ID)
got=$(curl -s http://localhost:$port/ | grep -oE '\\"b\\":\\"[A-Za-z0-9_-]+' | head -1 | sed -E 's/.*\\"//')
if [ "$got" != "$want" ]; then
  echo "FAIL: :$port serves buildId '${got:-none}' but .next/BUILD_ID is '$want'. A stale server is answering; stop it and rerun."
  exit 1
fi
echo "serving $dir on :$port (buildId $want matches)"
