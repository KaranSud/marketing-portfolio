#!/bin/bash
# Go live with portfolio-v3. Usage: bash tasks/v3/workflows/golive.sh
# Since 13 Nov 2026 the Vercel project karan-sud-portfolio (owner of karan-sud-portfolio.vercel.app) builds
# the portfolio-v3 folder from GitHub main. Going live = typecheck, push main, wait for the production build.
# The blog routine pushes posts to main the same way (portfolio-v3/scripts/sync-blog.mjs).
# Previews: cd portfolio-v3 && vercel deploy --yes (project portfolio-v3, never the live address).
set -e
cd "$(dirname "$0")/../../.."
[ "$(git branch --show-current)" = main ] || { echo "Switch to main first"; exit 1; }
(cd portfolio-v3 && npx tsc --noEmit)
git push origin main
sleep 20
for i in $(seq 1 30); do
  row=$(cd portfolio-v3 && vercel ls karan-sud-portfolio --prod 2>&1 | grep -E 'https://' | head -1)
  echo "$row" | grep -q -E 'Ready|Error|Canceled' && break; sleep 15
done
echo "$row"
echo "$row" | grep -q Ready && echo "Live: https://karan-sud-portfolio.vercel.app"
