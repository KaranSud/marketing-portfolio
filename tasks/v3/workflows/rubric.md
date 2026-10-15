# v3 critic rubric (score out of 10)

The critic is independent of the builder. Score only what is on screen and in the code; never give credit
for intentions in the plan. Compare against the benchmark sites in research/positioning.md and research/conversion.md.

| # | Dimension | Weight | 10 looks like |
|---|-----------|--------|---------------|
| 1 | Positioning clarity | 15 | A stranger can say who Karan is, who he helps, and the outcome he sells within 5 seconds of the hero. |
| 2 | Proof and credibility | 15 | Specific, verified numbers and recognisable names appear above the fold and recur at decision points. Every number matches research/facts.md. |
| 3 | Conversion path | 15 | One primary action, visible from every section, low friction, clear what happens after clicking. Secondary path for not-ready visitors. |
| 4 | Narrative journey | 10 | Sections read as a deliberate story (problem → proof → how → who → act). No filler sections, no repetition. |
| 5 | Visual craft and originality | 15 | Distinct art direction. Would not be mistaken for a template or an AI-generated site. Typography, spacing, rhythm feel designed. |
| 6 | Interaction design | 10 | Interactivity explains the work (lets you feel results/process). Smooth, purposeful, no jank, nothing gratuitous. |
| 7 | Copy | 10 | Human, specific, confident. `workflows/copy-lint.sh` clean. Reads like Karan, not like marketing filler. |
| 8 | Mobile | 5 | Every section designed for 390px, not just stacked. Thumb-reachable CTA. |
| 9 | Accessibility + performance | 5 | Contrast ≥4.5:1 body text, targets ≥44px mobile, reduced-motion honoured, no layout shift, fast LCP. |

Score = Σ(weight × dim score) / 100, one decimal. 9.5+ means a senior design director and a CRO lead would both ship it as-is.

Critique output (critiques/round-NN.md): score table, overall score, then the ranked fix list (most score-moving first),
each fix concrete enough that the builder can act without asking (selector/file, what to change, why).
