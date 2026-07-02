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
