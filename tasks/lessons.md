# Lessons

## Copy voice (2026-07-02)
- Karan does not want AI-sounding copy anywhere on the site. Concretely:
  - No em dashes (—) or en dashes (–) in visible copy. Use a period, comma, or colon instead. Write number ranges as "0 to 100".
  - No stock AI vocabulary: seamless, leverage, elevate, unleash, supercharge, delve, robust, empower, streamline, unlock, game-changing, cutting-edge.
  - Avoid the "no X, no Y, no Z — just W" cadence and stacked clause chains; prefer short declarative sentences.
- No AI-tell design defaults either:
  - No ✓ checkmark chips for feature lists; use the site's existing small accent-dot bullets.
  - No ↗ / → glyphs inside button labels (arrow spans inside text links are the site's own idiom and are fine).
  - Don't repeat the same micro-label on every item ("What you get" on each step); vary or shorten it.
- Sweep with: `grep -rn '—\|–' app components content lib` before shipping copy.

## Anti-AI writing pass, Wikipedia checklist (2026-07-02)
Karan asked for copy to be checked against Wikipedia's "Signs of AI writing" essay. Beyond the existing rules above, also sweep for:
- Negative parallelism and antithesis, especially repeated: "X, not Y", "Not X. Y.", "it's not just X, it's Y", "nothing to X and nothing to Y". One instance can stay if it is the page's thesis; never more than one per page.
- "From X to Y" transformational sweeps ("from quiet to everywhere"). Numeric ranges ("from 70K to 300K") are fine.
- Rule-of-three triads used decoratively. A triad that maps to a real list (his three service lines) is fine.
- Puffery and editorializing: "stands as a testament", "plays a vital role", "rich heritage", "boasts".
- Participle danglers: ", highlighting...", ", ensuring...", ", showcasing...".
- Vague attribution ("industry reports", "widely regarded") and empty summarizers ("In conclusion", "Overall").
- Title Case Headings and bold-led bullet lists.
Sweep grep: `grep -nE ', not [a-z]|Not [a-z-]+\.|from [a-z]+ to [a-z]+|, (highlighting|ensuring|reflecting|showcasing)'` on copy files.

## Commit identity (permanent, per Karan 2026-07-12)
- Author + committer on ALL commits: Karan Sud <karansud98@gmail.com>. Never Claude/Anthropic.
- No Co-Authored-By Claude, Claude-Session, or "Generated with Claude" lines in messages.
- Repo git config already set. History rewritten 2026-07-12 (62 commits filtered).
