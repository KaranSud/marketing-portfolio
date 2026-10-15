# Critic round (repeat until three consecutive rounds score 9.5+)
1. Builder: `npm run build` clean, `copy-lint.sh` clean, commit, then serve v3 on :3300.
2. Spawn a fresh critic agent (never reuse one, never show it PLAN.md or the copy deck before it scores).
   Prompt template: the round-01 prompt in this session's history; change the round number and shot folder
   (`tasks/v3/shots/rounds/rNN/`, gitignored). Output: `critiques/round-NN.md` with score table, overall, ranked
   fix list, and a separate "Blocked on Karan" section.
3. Builder fixes the fix list top-down, re-runs the taste inspector (`node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3300`)
   to 0 FAIL, rebuilds, commits, and starts the next round.
