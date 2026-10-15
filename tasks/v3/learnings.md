# v3 learnings (append, dated, one line each)
- 2026-10-15 Container was refreshed between sessions; scratchpad is ephemeral, keep anything reusable under tasks/v3/.
- 2026-10-15 shot.mjs: ESM import ignores NODE_PATH; fixed by resolving playwright with createRequire (NODE_PATH dirs, fallback /opt/node22/lib/node_modules).
- 2026-10-15 shot.mjs --click: full-page chunking can't capture fixed modals; --click now pages the largest scrollable element with viewport shots.
- 2026-10-15 Subagents start without WebSearch/WebFetch loaded: first call ToolSearch "select:WebSearch,WebFetch" before researching.
- 2026-10-15 shot.mjs: lazy images came out blank because the page walk was too fast; force loading=eager and await img.decode() before capturing (fix not yet applied).
