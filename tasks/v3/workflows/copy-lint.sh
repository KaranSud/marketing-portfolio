#!/usr/bin/env bash
# Anti-AI copy sweep (rules: tasks/lessons.md). Usage: copy-lint.sh <dir> [<dir>...]
# Prints offending lines; exit 1 if any hit. Scans ts/tsx/md/mdx copy, skips node_modules/.next.
set -u
hits=0
run() { local label="$1" pat="$2"; shift 2; local r; r=$(grep -rnE --include='*.ts' --include='*.tsx' --include='*.md' --include='*.mdx' --exclude-dir=node_modules --exclude-dir=.next "$pat" "$@" 2>/dev/null); if [ -n "$r" ]; then echo "== $label"; echo "$r" | head -40; hits=1; fi; }
run "em/en dash" '—|–' "$@"
run "AI vocab" '\b([Ss]eamless|[Ll]everage|[Ee]levate|[Uu]nleash|[Ss]upercharge|[Dd]elve|[Rr]obust|[Ee]mpower|[Ss]treamline|[Uu]nlock|[Gg]ame-changing|[Cc]utting-edge|[Tt]estament|[Tt]apestry)\b' "$@"
run "negative parallelism" ', not [a-z]|[^a-z]Not [a-z-]+\.|not just|isn.t just' "$@"
run "from X to Y sweep" 'from [a-z]+ to [a-z]+' "$@"
run "participle dangler" ', (highlighting|ensuring|reflecting|showcasing|underscoring)' "$@"
exit $hits
