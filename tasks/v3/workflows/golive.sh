#!/bin/bash
# Go live with portfolio-v3 on the main portfolio address. Usage: bash tasks/v3/workflows/golive.sh
# 1. Copies blog posts the blog routine pushed to origin/main (portfolio-v2/content|public/blog) that v3 lacks.
#    New posts still need a sentence-case title and a hook in lib/hooks.ts; the script lists them and stops.
# 2. Deploys portfolio-v3 to production, waits for Ready.
# 3. Points karan-sud-portfolio.vercel.app at it. The domain still belongs to the old karan-sud-portfolio
#    project (only the dashboard can move it), so a v3 deploy does not pick it up on its own.
#    The old project's git link was disconnected on 13 Nov 2026 so it cannot take the address back.
set -e
cd "$(dirname "$0")/../.."
DOMAIN=karan-sud-portfolio.vercel.app
git fetch -q origin main
new=""
for f in $(git ls-tree -r --name-only origin/main portfolio-v2/content/blog | grep '\.md$'); do
  s=$(basename "$f" .md)
  [ -f "portfolio-v3/content/blog/$s.md" ] && continue
  new="$new $s"
  git show "origin/main:$f" > "portfolio-v3/content/blog/$s.md"
  for a in $(git ls-tree -r --name-only origin/main "portfolio-v2/public/blog/$s"); do
    d="portfolio-v3/${a#portfolio-v2/}"; mkdir -p "$(dirname "$d")"; git show "origin/main:$a" > "$d"
  done
done
if [ -n "$new" ] && [ -z "$SKIP_NEW" ]; then
  echo "New posts copied:$new"
  echo "Give each a sentence-case title and a hook in lib/hooks.ts, then rerun (or SKIP_NEW=1 to deploy as is)."
  exit 2
fi
cd portfolio-v3
npx tsc --noEmit
out=$(vercel deploy --prod --yes 2>&1 || true)
url=$(echo "$out" | grep -o -E 'https://portfolio-v3-[a-z0-9]+-karansuds-projects\.vercel\.app' | head -1)
[ -z "$url" ] && { echo "$out" | tail -5; exit 1; }
for i in $(seq 1 30); do
  st=$(vercel inspect "$url" 2>&1 | grep -E '^\s+status' || true)
  echo "$st" | grep -q -E 'Ready|Error|Canceled' && break; sleep 15
done
echo "$st" | grep -q Ready || { echo "Build not ready: $st"; exit 1; }
vercel alias set "$url" "$DOMAIN"
echo "Live: https://$DOMAIN -> $url"
