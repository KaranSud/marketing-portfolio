# Critic round (repeat until three consecutive rounds score 9.5+)
1. Builder: `npm run build` clean, `copy-lint.sh` clean, commit, then serve v3 on :3300 with
   `bash tasks/v3/workflows/serve.sh portfolio-v3 3300` (never a bare `npm run build`: a server left running from the
   old build serves stale HTML and breaks hydration). serve.sh ends with a buildId guard: it fetches `/`, compares the
   buildId in the HTML with `.next/BUILD_ID` and exits 1 on a mismatch. Do not hand the site to a critic unless it
   printed "buildId ... matches".
2. Spawn a fresh critic agent (never reuse one, never show it PLAN.md or the copy deck before it scores).
   Prompt template: the round-01 prompt in this session's history; change the round number and shot folder
   (`tasks/v3/shots/rounds/rNN/`, gitignored). Output: `critiques/round-NN.md` with score table, overall, ranked
   fix list, and a separate "Blocked on Karan" section. The critic also checks the guard first:
   `curl -s localhost:3300/ | grep -c "$(cat portfolio-v3/.next/BUILD_ID)"` must print 1 or more.
3. Builder fixes the fix list top-down, re-runs the taste inspector (`node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3300`)
   to 0 FAIL, rebuilds with serve.sh, commits, and starts the next round.
