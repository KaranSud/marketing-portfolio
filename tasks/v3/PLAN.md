# v3 build plan (lead, 2026-10-16)

Inputs: `research/positioning.md`, `research/conversion.md`, `research/tooling.md`, `research/baseline.md` (v2 = 5.0),
`research/facts.md` (only source for numbers). Rubric: `workflows/rubric.md`. Target: 9.5+ on three consecutive critic rounds.

## 1. Decisions
1. **Position:** growth and content marketer for AI products. Crypto-native AI is the deepest proof, shown inside the
   cases, never the headline word. The mechanism that sets him apart: he ships working software (the Research Engine,
   SlouchGuard, this site). F&B and founder-branding work stays as range in the case index.
2. **Hero line:** "You built the AI product. I find the people who use it." (positioning draft 1). The sub-line names the
   engagement and carries the proof strip. Every number in it comes from the facts.md "Safe to headline" table.
3. **One primary action:** "Book a 30-minute call". It matches the real Calendly event (`calendly.com/contactkaransud/30min`).
   It appears with the same label and style in the nav, hero, end of every case, the engagement section, contact and the
   mobile sticky bar. Under it, one line on what happens next. The email address stays visible beside it.
4. **Two doors at the ask only:** the homepage is client-first. A "Hiring full-time?" utility link in the nav and footer
   goes to `/hire`. Intent chips (Project / Monthly / Full-time role) on the contact step route both groups.
5. **Proof is curated:** 3 flagship cases told inline, plus a compact index of the rest. Every case becomes its own
   route `/work/[slug]`. That removes the modal, makes cases keyboard and SEO friendly, and lets each one end in a CTA
   and a next case.
6. **One signature visual idea, "people as marks":** the hero field is made of small marks that drift as noise and
   gather into an ordered flow around the cursor. That is the headline made physical: finding the people. The same
   mark, a small sage dot or dash, is the unit in the start-vs-now charts, so the motif carries meaning down the page.
7. **Dependencies:** none added unless the unit chart needs `@number-flow/react` (6 KB). Keep framer-motion 12 and
   lenis. No GSAP, WebGL, Lottie, chart libs or copy-paste effect catalogs.

8. **Facts gate (from facts.md):** headline only rows of facts.md table (a). The v2 tiles "7K+ daily active traders",
   "12K+ AI signups", "300K+ followers grown" and the bare "471% peak ROI" are retired. Everything else on the site
   needs KP status or better; CONFLICT claims are removed from v3's `lib/caseStudies.ts` until Karan answers. Where the
   copy and a screenshot disagree, the screenshot figure is used. Platform metrics (FanTV MAU, Fere executions, Defx
   cumulative volume) are context only, always written as "helped". No brand, industry or years count until Karan picks
   one (facts.md (c) 9, 10).
   - Hero proof strip: FanTV AI X 70K to nearly 300K in 11 months (a1); helped Defx reach $1.5B cumulative perp volume,
     public on DefiLlama (a2); Fere AI #2 Product of the Day on Product Hunt (a4).
   - Flagship cases: FanTV AI (a1, a11, KOL program), Defx (a2, traders 50 to 350 KP), Fere AI (a3, a4).
   - Factual fixes: LinkedIn `/in/karansud-marketing`; "The SportsRush"; Tony Roma's "founded in 1972" with
     partner-franchise launches; Prashan "over 90K"; Labs copy describes the live engine as it is today.
   - About uses his public LinkedIn history: freelance writing from 2020, CFD engineer 2022 to 2023, marketing full-time
     from late 2023. Location: Noida, India.

## 2. Page map
| Route | Purpose |
|---|---|
| `/` | The story: hero → proof (3 flagship cases) → how I work → the builder → who I am → ways to work together → FAQ → contact |
| `/work/[slug]` | Full case (situation, move, execution, results, real screenshots, compare slider where media exists), ending in the CTA + next case |
| `/hire` | For hiring managers: one-screen timeline of roles from `caseStudies.ts`, what he is looking for (NEEDS KARAN; default copy is neutral), CTA |
| `/blog`, `/blog/[slug]` | Keep. Fix the index H1 to match the posts; add the end-of-post author card with the CTA |
| `/tools`, `/samples`, `/crm` | Keep routes working; restyle only where they share components. Not in the critic's scope unless linked from home |

## 3. Home, section by section
Order is the narrative: problem (hero) → proof → how → builder (why him) → who → act.

**Nav.** Name (wordmark in text, not a logo), links: Work, How I work, Tools, Writing. Right side: "Hiring full-time?"
(quiet text link) and the primary CTA (solid off-white, the only solid button in the nav). Mobile: menu + CTA kept
visible in the bar. Skip link before the nav.

**1. Hero** (`Hero.tsx` rewritten; `HeroField.tsx` new). Left-aligned on desktop, a column of about 640px:
- Small portrait (`public/karan.jpg` from his X avatar, 56 to 64px, round) + "Karan Sud · Growth and content for AI products".
- H1 (positioning draft 1). Plain weight, no accent-word gradient, no char cascade. Paints in server HTML with no
  opacity animation (LCP).
- Sub-line: one sentence naming who and how (project or monthly) plus the strongest named number.
- CTA row: primary "Book a 30-minute call" + secondary text link "See the work". Under it: "30 minutes on video. You get a
  written next step within 24 hours." (v2 already promises 24 hours; NEEDS KARAN to confirm the timezone.)
- Proof strip: 3 facts.md numbers, each with brand + short label (+ timeframe where facts.md has it), set as plain large
  numerals on one line with hairline separators. No cards, no count-up.
- Background: `HeroField` canvas inside the hero only (spec in section 5).

**2. Proof: three flagship cases** (`Work.tsx` rewritten → `FlagshipCase.tsx`, `UnitChart.tsx`). Default picks, adjusted
to whatever facts.md clears: Fere AI (usage), FanTV AI (audience + community), Defx or Novaswap (volume). Each is one
full-width band, not a card: client name + role + timeframe, a two-sentence problem, "the move" in one line, a start-vs-now
unit chart (only for pairs facts.md clears), one real screenshot from `public/Results`, a link "Read the full case" →
`/work/[slug]`. The sections alternate the screenshot side on desktop and stack on mobile. After the three: "More work" as
a compact list (client, category, one result, arrow link). These are real links, so they are keyboard reachable.

**3. How I work** (`System.tsx`, built on the FeatureStory sticky pattern). The system drawn as an SVG graph assembled on
scroll: Pillars → Formats → Channels → Distribution (KOLs, community, ambassadors) → Conversion (email, referrals, paid).
Labels come from real case copy. At the end, one post's pulse travels the graph once. Reduced motion: the finished,
labelled diagram, static. Mobile: a vertical stack of the same nodes, no pinning. Under it, the three engagement steps:
Week 1 audit → plan → run and report. Keep these generic and true; no durations Karan has not confirmed.

**4. The builder** (`Builder.tsx`, `ResearchReplay.tsx`). Heading from positioning draft 4: "A growth marketer who ships
his own software." The interaction is a replay of the Account Research Engine from 3 recorded real runs: pick a company,
and the brief assembles in order (sources, fit score with reason, opener). Then "Run it on your own list" → the live tool.
Beside it, two small proof tiles: SlouchGuard (link to its site) and "This site" (hand-built, Next.js). If 3 real runs
cannot be recorded (API key or quota), use real output already present in the repo; never hand-write a brief.

**5. Who I am** (`About.tsx`). Three short paragraphs in first person: mechanical engineer who moved into marketing; about
5 years across AI, crypto, F&B and founder brands (count from facts.md); builds his own tools. Portrait larger here.
Off-site links (LinkedIn, X) as proof.

**6. Ways to work together** (`Engagements.tsx`). Three columns, no boxes, hairline dividers: Project (a defined launch
or audit), Monthly (ongoing content, community and growth), Full-time role (→ `/hire`). Each: who it is for, what you
get, how it starts. No prices until Karan supplies floors (NEEDS KARAN). Primary CTA under it with one proof number.

**7. FAQ** (`Faq.tsx`). First person, 5 questions max: what do you work on, what does it cost, timezone and response,
what if it is not a fit, project vs full-time. Keep the third-person version only in JSON-LD (`JsonLd.tsx`).

**8. Contact** (`Contact.tsx` rewritten). Step 1: intent chips + email + optional one-line note (labelled inputs,
inline validation, no `alert()`). Step 2: the Calendly inline widget loads on click only (facade). Email link always
visible. Reply promise.

**Footer.** Name, one line, links (LinkedIn, X, email, Hiring full-time?, Writing). Fix "© 2026" spacing.

**Mobile sticky CTA.** Appears after the hero leaves view, hides near contact and when an input is focused, 48px,
safe-area aware.

Cut from v2: Services 12-grid, Skills/Toolkit chips, Brands marquee, WordMarquee, CtaBand, hero logo stack, Tilt,
Magnetic (except none), KineticHeadline char cascade, decorative CountUp, Aurora animation (keep its static gradient),
CursorField, ScrollProgress (or move to CSS scroll-driven).

## 4. Design direction
- **Keep:** the palette tokens in `app/globals.css` (`--bg #0A0A0B`, text `#F2F1EC`, sage `#6CA088`), Space Grotesk +
  Inter + JetBrains Mono, off-white primary button.
- **Change the composition:** fewer boxes. Sections are full-width bands separated by space and hairlines, not bordered
  cards. Real artefacts (screenshots, the replay, charts) are large and inline. Mono is used only for data labels, not on
  every element. Headings are plain, one weight, no accent-word gradient device. One accent use per viewport at most.
- **Type scale:** display 64/72 desktop, 40/44 mobile; H2 40/44 desktop, 30/34 mobile; body 18/28 desktop, 17/26 mobile.
  Line length 60 to 72ch.
- **Banned (BRIEF + baseline):** 01/02/03 eyebrows or index numbers, background grid, two-tone logo, ✓ chips, arrows
  inside button labels, marquees, glass cards, saturated gradients, custom cursor.
- Skill for the build: `design-taste-frontend` with palette and type kept. Critic support: `emil-design-eng`.

## 5. Interactions (spec)
1. **HeroField** (Canvas2D, no deps, under 3 KB): about 2,300 marks at 24px jittered spacing on desktop, about 1,000 at
   32px on phones. At rest the marks drift as soft noise at low alpha. Within about 240px of the pointer they align
   into a flow around it, lengthen, and the nearest turn sage. One alignment sweep on load. A per-mark dimming mask
   behind the text keeps 4.5:1 contrast. 60fps for 1s after pointer movement, 24fps idle. IntersectionObserver and
   visibilitychange pause it. Touch: a phantom cursor drifts and a tap sends a ripple. Reduced motion or Save-Data:
   one static composed frame. Starts in `requestIdleCallback`, never the LCP element.
2. **UnitChart:** start vs now for cleared pairs (for example 70 marks to 300 at 1K followers each). A toggle or range
   input; marks fill with a stagger; the readout uses static text, or NumberFlow if added. Each chart is captioned with
   the unit, timeframe and source.
3. **ResearchReplay:** 3 company tabs; the brief assembles in four steps, with a replay button. Keyboard operable, with
   a static complete view under reduced motion.
4. **System graph** (section 3) and the **compare slider** (existing `BeforeAfterSection.tsx`) on the case pages.

## 6. Engineering requirements (checked every round)
- `npm run build` clean; `npm run lint` no new errors (2 pre-existing, fix them if touched); `copy-lint.sh` clean on
  `portfolio-v3/app portfolio-v3/components portfolio-v3/lib`.
- Hero text in server HTML at full opacity. Mobile LCP 2.5s or less on the throttled profile, CLS 0.
- Every case is reachable by keyboard (links). Dialogs, if any remain, have role, aria-modal, focus trap and return.
  Inputs are labelled. Skip link. Images have width and height. Targets 44px or more on mobile.
- Reduced motion honoured by every animated component (including any count readout).
- No number on the site without a facts.md row. No fabricated testimonials, logos, metrics or quotes.

## 7. Copy process
`head-of-content` before drafting any copy → write → `signs-of-ai-writing` check → `copy-lint.sh`. First person,
short declarative sentences, specific nouns. Headlines say something a buyer can act on.

## 8. Build order (each step ends with a build + shot check)
1. Foundation: tokens and type scale, global cleanup (remove cut components, static ambient), Nav, Footer, skip link,
   sticky CTA, primary button style.
2. Hero + HeroField.
3. Flagship cases + UnitChart + case index; `/work/[slug]` pages from `caseStudies.ts` with CTA and next case.
4. How I work (system graph) + engagement steps.
5. Builder + ResearchReplay.
6. About, Engagements, FAQ, Contact (two-step, Calendly facade).
7. `/hire`, blog author card + index H1, metadata/JSON-LD/llms.txt updates (LinkedIn handle per facts.md).
8. Perf/a11y pass, then the critic loop.

## 9. Critic loop
Each round: `serve.sh portfolio-v3 3300`; shots via `shot.mjs` (home, one `/work/[slug]`, `/hire`) at desktop and
mobile. Then a fresh, independent critic agent scores with the rubric against the benchmarks and writes
`critiques/round-NN.md` with the score table and a ranked fix list. The lead fixes the top items and the next round
starts. Done when three consecutive rounds score 9.5 or more. Items blocked on Karan go to the NEEDS KARAN list,
never into invented content.

## 10. NEEDS KARAN (build proceeds with safe defaults)
facts.md (c) holds the 15 fact questions; these are the build-level ones. The build uses neutral or omitted copy until he answers.
1. Current employment, and whether the site may say he is open to full-time roles; which titles he wants.
2. Engagement models he offers and price floors or minimum lengths.
3. Timezone and the reply window he can keep (default: the 24 hours v2 already promises).
4. 3 to 5 real testimonials (name, role, photo, a number).
5. The correct LinkedIn handle (karansud7 vs karansud-marketing), a custom domain and email.
6. His role when Fere AI hit 7K+ daily active traders, for attribution wording.
7. Monthly data for a growth timeline (unlocks the scrubber interaction).
8. A proper headshot (the X avatar is a 400px outdoor photo).
