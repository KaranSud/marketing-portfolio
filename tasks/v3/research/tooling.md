# Tooling lane: libraries, the cursor background, interactions that explain the work

Written 2026-10-15 by the tooling agent. Sources are inline (URL or file:line). Sizes are min+gzip from
bundlephobia unless marked "measured" (gzip of the CDN file). Every web call is in `research-log.md`.

## Decisions first

1. **Add at most one dependency: `@number-flow/react` (6.1 KB gz, MIT).** Only if an interaction shows numbers
   that change while the visitor drags or toggles. Everything else is covered by what is already installed:
   framer-motion 12.40 (springs, gestures, scroll-linked values, reduced-motion config), lenis, plain SVG and
   Canvas2D. Do not add GSAP, three/R3F, OGL, Rive, Lottie, recharts, cmdk or confetti.
2. **Cursor background: one hand-written Canvas2D "noise to order" field inside the hero only** (about 2 KB,
   no library). This is the same technique instaagent.com uses (2D canvas, not WebGL). Retire `CursorField.tsx`
   (never imported) and stop animating `Aurora.tsx` site-wide so the hero has one moving layer.
3. **Top interactions:** a replay of the Account Research Engine using a real recorded run; a "start vs now"
   unit chart for the headline cases; a content-system diagram that assembles on scroll and then sends one
   post through it. A growth-timeline scrubber is the best explainer of all, but only if Karan supplies real
   monthly data.
4. **Skills:** build with `design-taste-frontend` (run with `--keep palette,type`). Critique support with
   `emil-design-eng`. Karan can additionally run `/review-animations` by hand before ship.
5. **Template-tell warning:** nearly every motion component in v2 has a free copy-paste twin in ReactBits or
   Magic UI (table in section 2). v3 should keep only the ones that carry information.

## 1. Library vetting

Current stack, from `portfolio-v3/package.json`: next 16.3.8, react 19.2.4, framer-motion ^12.40.0 (installed
12.40.0), lenis ^1.3.23, Tailwind 4. Registry data comes from registry.npmjs.org on 2026-10-15.

| Candidate | Purpose here | Size gz | License | Latest release | React 19 / SSR | Reduced motion | Template-tell risk | Verdict |
|---|---|---|---|---|---|---|---|---|
| framer-motion (installed) | Reveals, springs, drag, scroll-linked values, layout morphs | 59.1 KB full `motion`; `m` + LazyMotion 4.6 KB initial, +15 KB domAnimation ([motion.dev](https://motion.dev/docs/react-reduce-bundle-size)) | MIT | 14.3.0 on 2026-10-15; repo on 12.40 | peer `^18 \|\| ^19`; client components | `MotionConfig reducedMotion="user"` already set (`components/MotionProvider.tsx:9`) | Depends on use | **Keep.** Covers 90% of needs. Do not take the 12 to 14 major mid-build. Consider LazyMotion + `m` to cut the initial bundle. |
| lenis (installed) | Smooth wheel scroll | 5.3 KB | MIT | 1.3.26, 2026-08-05 | peer `>=17` | Disabled under reduce (`components/SmoothScroll.tsx:9`) | Low | **Keep.** Optional bump to 1.3.26. |
| GSAP 3.15 + ScrollTrigger | Pinned scrubbed timelines, SplitText | 28.4 KB core + 18.0 KB ScrollTrigger + 3.6 KB SplitText (measured, jsdelivr) | Proprietary "Standard no charge" license, free for commercial sites incl. all plugins; bans use in no-code builders that compete with Webflow ([gsap.com](https://gsap.com/standard-license)) | 3.15.0, 2026-04-13 | `@gsap/react` `useGSAP`, client only | Manual via `gsap.matchMedia()` | Low (it is a runtime) | **Avoid.** A second animation runtime adds about 50 KB and a second mental model. FeatureStory already does sticky scrollytelling with `useScroll` (`components/FeatureStory.tsx:115`). Add only if PLAN specifies a pinned multi-step timeline that framer-motion cannot express. |
| CSS scroll-driven animations | Decorative scroll progress, reveal without JS | 0 KB | n/a | Chrome 115+, Safari 26+, Firefox not on by default ([Chrome docs](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [buildmvpfast](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026)) | Pure CSS | Wrap in `@media (prefers-reduced-motion: no-preference)` | Low | **Use for decoration only**, inside `@supports (animation-timeline: scroll())`. Could replace `ScrollProgress.tsx` (a spring on `useScroll`). Firefox gets no animation, which is fine. |
| View Transitions (React `<ViewTransition>`) | Case card to case page morph, blog list to post | 0 KB | n/a | Same-document 92.9% global, cross-document 86.8% ([caniuse data](https://github.com/Fyrd/caniuse)) | Next 16 `experimental.viewTransition`; App Router bundles the React canary that has it (local skill `react-view-transitions/SKILL.md:45`) | CSS media query on `::view-transition-*` | Low | **Use if PLAN turns case modals into routes.** It gives continuity and SEO-indexable case pages. Unsupported browsers just navigate. |
| OGL | Light WebGL shader background | 33.4 KB whole package; Renderer alone 3.6 KB (measured) | Unlicense | 1.0.11, 2025-01-27 (slow cadence) | Client only | Manual | High (fluid/flowmap cursors are a catalog staple) | **Avoid.** Canvas2D is enough for the field below. |
| three + @react-three/fiber | 3D scene | 180.6 KB + 56.3 KB | MIT | 0.186.1 / 9.8.2 (Oct 2026) | R3F peer `>=19 <19.4` | Manual | High (3D blob heroes) | **Avoid.** No 3D story in Karan's work. |
| Rive (`react-canvas-lite`) | State-machine illustrations | 55.5 KB JS + 316 KB wasm (measured) | MIT | 4.36.0, 2026-09-30 | peer `^19`, client | Manual | Medium | **Avoid.** Needs assets authored in the Rive editor. None exist. |
| Lottie (`lottie-react` / dotLottie) | After Effects animations | 191.4 KB, or 33.2 KB + 498 KB wasm (measured) | MIT | 3.1.2 / 0.20.0 | Client | Manual | High (stock illustration feel) | **Avoid.** |
| canvas-confetti | Celebration on submit | 4.2 KB | ISC | 1.9.4, 2025-10-25 | Client | Has `disableForReducedMotion` | High | **Avoid.** A confirmation message does the job. |
| Charts: recharts | Interactive results | 148.0 KB | MIT | 3.10.1 | OK | Manual | Medium (default chart look) | **Avoid.** Too heavy for a few series. |
| Charts: visx / d3-shape / d3-scale | Same | @visx/shape 10.5 KB; d3-shape 5.5 KB; d3-scale 15.6 KB | MIT / ISC | visx 4.0.0 (2026-06); d3-shape 3.2.0 (2022, stable) | Pure functions, SSR safe | n/a | Low | **Plain SVG first.** Add `d3-shape` (5.5 KB) only for smooth monotone curves. Skip d3-scale; a linear scale is three lines. |
| @number-flow/react | Animated readouts that change on drag or toggle | 6.1 KB | MIT | 0.6.2, 2026-07-18 | peer `^18 \|\| ^19`; SSR through declarative shadow DOM | `respectMotionPreference` defaults to true ([number-flow](https://number-flow.barvian.me/)) | Medium (common on pricing toggles) | **Add only with interaction 2 or 4.** Keep `CountUp.tsx` for one-shot reveals, or drop count-ups entirely. |
| cmdk | Command palette | 14.6 KB | MIT | 1.1.1, 2025-03-14 | peer `^19` | n/a | High (dev-portfolio tell) | **Avoid.** 38 blog posts need a simple filter at most. |
| Cal.com embed | Inline booking | Wrapper 0.8 KB, but `embed.js` is 23.1 KB (measured), plus the full booking app in an iframe (not measured) | Wrapper license file; app AGPL | 1.5.3, 2025-04-30 | peer `^19` | n/a | Low | **Never on initial load.** If conversion lane picks a booking CTA, use a facade: a button that injects the script and opens the modal on click, or link out. |
| Calendly (`react-calendly`) | Same | 3.6 KB wrapper; `widget.js` 4.0 KB (measured), plus iframe app | MIT wrapper | 4.4.0, 2025-05-23 | peer `>=16.8` | n/a | Low | Same facade rule. Skip the wrapper and load `widget.js` on click. |
| Aceternity UI / Magic UI / ReactBits | Copy-paste effects | n/a | Various | Very active | n/a | Mostly none | **Very high** | **Never.** See section 2. |

## 2. Template-tell audit of what v2 already ships

ReactBits has 183 components and Magic UI has 79 (GitHub trees, logged). Each v2 motion component has a twin there:

| v2 component | Catalog twin | Tell | Keep in v3? |
|---|---|---|---|
| `Aurora.tsx` (site-wide canvas) | ReactBits Aurora, SoftAurora; Aceternity Aurora Background | High | Make static (CSS gradient already in `globals.css:55`) |
| `CursorField.tsx` (blurred orbs on springs) | ReactBits BlobCursor, Orb | High | Delete; never imported anywhere (grep) |
| `WordMarquee.tsx` | Magic UI marquee, ReactBits LogoLoop / ScrollVelocity | High | Drop unless it carries proof |
| `Tilt.tsx` on the hero card | ReactBits TiltedCard | Medium-high | Drop |
| `KineticHeadline.tsx` char cascade | ReactBits SplitText / BlurText, Magic UI text-animate | Medium | Simplify to one line-level reveal |
| `CountUp.tsx` | ReactBits CountUp, Magic UI number-ticker | Medium | Show final numbers statically (PagerDuty style); animate numbers only inside interactions |
| `ScrollProgress.tsx` | Magic UI scroll-progress | Medium | Optional; CSS-only if kept |
| `Magnetic.tsx` | ReactBits Magnet | Low-medium | Primary CTA only |
| `FeatureStory.tsx`, `BeforeAfterSection.tsx` slider | none | Low | Keep and build on them |

The cursor-field family also exists in those catalogs (ReactBits MagnetLines, DotField, GradientASCII,
LetterGlitch; Magic UI glyph-matrix, interactive-grid-pattern). So the field below has to earn its
distinctiveness from its idea and tuning. Picking the technique alone will not do that.

## 3. The instaagent-style cursor background

### What instaagent.com actually does (raw HTML, CSS and JS chunk `6a475df8e5239a94.js`, logged 20:22)
- One `<canvas>` absolutely positioned inside the hero section (100svh). It does not cover the whole page and
  is not fixed. White background, coral accent `#f46760`, and a 4% SVG-noise grain overlay above it.
- Canvas2D draws a character grid with 14 px cells and 12 px monospace glyphs. At rest every cell shows a faint
  dot-like glyph at about 6% opacity.
- Eight random-walk "streaks" travel across the grid. They light a soft band of cells and swap them to
  block-drawing glyphs, then fade and respawn.
- Cursor: cells within a 180 px radius brighten (up to about 90%), turn accent-coloured and flicker to
  other glyphs. Brightness eases toward its target each frame, so the light trails the pointer.
- Frame cap about 30 fps. The loop stops when the hero leaves the viewport (IntersectionObserver) or the tab
  hides.
- Touch (`pointer: coarse`): no pointer listener. A phantom cursor drifts on a slow Lissajous path instead.
- Reduced motion: the effect exits early, so the canvas stays blank.
- The rest of the site uses GSAP + ScrollTrigger, Lenis, framer-motion, a GSAP magnetic button, and a custom
  dot-and-ring cursor.

What Karan is reacting to: the background visibly answers the pointer, locally and immediately; it has a
life of its own when idle; and it stays monochrome and quiet until the cursor brings colour. Those three
qualities are the spec. The ASCII glyphs and the coral colour are instaagent's own look and should not be copied.

### Recommended build for v3: `HeroField.tsx`, "noise to order"
- **Idea:** at rest, short marks (1 px by 5 to 8 px dashes) lie in a slow, noisy, drifting pattern. Within
  about 240 px of the cursor they swing into one coherent flow around it, get longer, and the nearest ones turn
  sage `#6CA088`. Moving the mouse turns noise into a system, which is the current headline's claim made
  physical (`components/KineticHeadline.tsx:9`). If positioning changes the headline, keep the metaphor only if
  "systems" stays central.
- **Layout:** marks sit on a jittered lattice (spacing 24 px desktop, offset up to 35% per mark, varied base
  alpha), so no straight rows read as a background grid. Grids are a banned tell (BRIEF).
- **Discoverability:** on load, one slow left-to-right alignment sweep (about 1.2 s) then relax, so visitors
  who never move the mouse still see what it does.
- **Text safety:** precompute a per-mark dimming mask from the headline and sub-copy rects on resize, so body
  text keeps 4.5:1 contrast while the field lights up behind it.
- **Static first paint:** keep the existing CSS radial gradient as the base layer. The canvas only adds marks,
  so nothing pops on hydration.

**Performance budget**
| Item | Budget |
|---|---|
| JS | under 3 KB gz, zero dependencies, its own client component. No framer-motion in the frame loop. |
| Marks | about 2,300 at 1440x900 (24 px), about 1,000 on phones (32 px) |
| Draw | marks bucketed into about 6 alpha bins: one `beginPath`/`stroke` per bin per frame |
| Frame time | 2 ms or less of scripting on an M1; 4 ms or less on a mid Android |
| Frame rate | 60 fps for 1 s after any pointer move, 24 fps idle drift |
| DPR | cap 2 desktop (thin lines need it), 1.5 mobile |
| Pausing | IntersectionObserver on the hero + `visibilitychange` (copy instaagent here) |
| Layout reads | none in the loop; cache rects on resize and scroll |
| Start | init in `requestIdleCallback` after hydration, so INP and TBT stay clean; the canvas is never the LCP element |

**Touch:** `(hover: none)` uses a phantom cursor drifting slowly behind the headline, as instaagent does. A tap
in the hero sends a one-off alignment ripple from that point that relaxes over about 1.2 s. Use passive
listeners only and never block scroll. No gyroscope (iOS asks for permission).

**Reduced motion and Save-Data:** draw one static, composed frame (a calm aligned region behind the headline)
with no loop and no listeners. Better than instaagent's blank canvas. Use the same path when
`navigator.connection.saveData` is set.

**Do not add** a custom cursor. It hides the native pointer, competes with the field, and is an agency tell.

### Can the existing components be adapted?
- `CursorField.tsx`: no. It moves four 320 to 460 px blurred divs a few dozen px on springs
  (`components/CursorField.tsx:23-28, 39-40`). The motion is barely visible, `filter: blur(70-90px)` on large
  layers is costly on Safari, and nothing imports it. Delete it in the build.
- `Aurora.tsx`: reuse only its canvas boilerplate (DPR cap, resize, rAF cleanup, `Aurora.tsx:38-78`). As it
  stands it repaints four full-viewport radial gradients with additive blending every frame, on every page,
  with no fps cap and no visibility handling (`Aurora.tsx:51-69`), mounted from `app/layout.tsx:81`. In v3,
  make the site-wide ambient a static CSS gradient and keep the hero field as the only animated background.

**Fallback variant (if Karan wants the literal instaagent look):** the same engine with glyph rendering, using
marketing glyphs (@ # % + ↑) in place of ASCII blocks. Expect a higher tell risk: glyph fields are a 2025 and
2026 trend with catalog copies (ReactBits GradientASCII, Magic UI glyph-matrix), and on warm-dark they read as
a terminal.

## 4. Interactions that explain Karan's work

Rule for all of them: plot only numbers that appear in `research/facts.md`. Most case data is a start and end
pair with no series in between (`lib/caseStudies.ts:58-78, 113-115, 250-266`), so any curve between two points would be
invented. Every control is a native `<input type="range">` or buttons, like the existing `CompareSlider`
(`components/BeforeAfterSection.tsx:32-66`), so keyboard and touch work for free.

| # | Interaction | What the visitor feels | Build (vetted stack) | Effort | Gratuitous risk |
|---|---|---|---|---|---|
| 1 | **Research Engine replay** | "He builds working AI tools." Pick one of 3 real companies; the brief assembles step by step (sources found, then fit score with reason, then the opener), followed by "Run it on your list" linking to the live tool. | Record 3 real runs of `/api/research` (output includes `fitScore` and `fitReason`, `labs/account-research/lib/agent.ts:46, 251`) into static JSON. framer-motion staggered reveal and a NumberFlow fit score. No live API calls, so no quota cost. | S to M | Low. It is the real product with real output. Never hand-write a brief. |
| 2 | **Start vs now, counted in units** | The size of a jump becomes visible: 70 dots become 300 (1 dot = 1K followers, FanTV), 50 traders become 350 (Defx), 12 become 100 (Prashan, X). | One SVG unit chart per headline case, with a Start/Now toggle or slider. Dots fill with a framer-motion stagger; NumberFlow readout; the case timeline as a label ("Oct 2024 to Aug 2025", `caseStudies.ts:68`). | S | Low for 2 or 3 cases, high if repeated on all 13 |
| 3 | **The system, assembled** | How the work is done: pillar, then formats, channels, distribution (KOLs, community), then conversion (email, referrals). At the end one post's pulse travels the graph. | Reuse FeatureStory's sticky + `useScroll` pattern. SVG nodes and paths drawn with `pathLength`. Labels come from real case copy (Fere channels, `FeatureStory.tsx:29`). Static and fully labelled under reduced motion. | M | Medium. Animated beams are a Magic UI staple. Keep one travelling pulse, no glow. |
| 4 | **Growth timeline scrubber** | Cause and effect: drag through the months and see what he shipped at each point (KOL program start, Product Hunt #1) against the real curve. | Plain SVG path (d3-shape monotone only if needed), range-input scrubber, annotation pins, NumberFlow readout. | M; L if data must be gathered | Low, and the highest explanatory value. **Gated: NEEDS KARAN** for monthly exports (X analytics for FanTV and Prashan; Defx volume may be public on DefiLlama, which the facts lane can check). Do not build without real points. |
| 5 | **Profile before/after on the homepage** | Instant proof of the executive-branding work: drag across a real before and after profile. | Already built (`CompareSlider`); lift it out of the modal for Prashan or Mohaimina using existing `public/Results` media. | S | Low |
| 6 | **"Which case is closest to you?"** | Fit: two taps (stage: pre-launch / launched without traction / scaling; main channel), then the matching case and the system used there. | Plain buttons plus a lookup table over `caseStudies`; framer-motion layout transition to the matched card. | S | Medium if it feels like a quiz. Keep it to 2 questions with no scoring. |
| 7 | **Hero field** (section 3) | "Systems turn noise into order," felt in the first second. | Canvas2D, about 2 KB | M | Medium. Mitigated by the idea, the restraint and the text-safe mask. |

**Avoid:** a channel-mix or budget "calculator". Any projected output would need invented response curves,
and the PLAYBOOK forbids fabricated metrics.

## 5. Claude skills and repos

**Local design skills** in `~/.claude/skills/design-and-editing/` (frontmatter only): brandkit, canvas-design,
design-dna, design-everyday-things, design-sprint, design-taste-frontend, design-trends-2026, emil-design-eng,
extract-design-system, ios-hig-design, microinteractions, motion-design, refactoring-ui, review-animations,
steve-jobs-design-review, top-design, ui-ux-pro-max, ux-heuristics, web-design-guidelines, web-typography,
social-card-gen, sonic-branding, react-view-transitions, plus the gsap-*, threejs-*, hyperframes-*,
media-use, motion-graphic and remotion skills (video and 3D, out of scope here).

- **BUILD: `design-taste-frontend`.** It targets exactly this (public portfolio pages and "looks AI-made"
  complaints) and ships a source linter plus a real-browser inspector and screenshot fix loop. Run it with
  `--keep palette,type` so it respects Karan's fixed warm-dark and sage direction rather than dealing a new
  one. Cost: 30 to 45 min and a few hundred K tokens per build (global CLAUDE.md). Rejected: `top-design`
  (pushes cinematic motion, more risk of gratuitous effects); `ui-ux-pro-max` (broad, style-catalog driven).
- **CRITIQUE support: `emil-design-eng`.** It encodes the polish and "should this animate at all" judgment
  that rubric dimensions 5 and 6 (25% of the score) need, and the critic can call it.
  `review-animations` is the sharper motion-code reviewer, but its frontmatter sets
  `disable-model-invocation: true`, so only Karan can run it (`/review-animations`). Worth one manual pass
  before ship.

**GitHub repos to borrow patterns from (read only, nothing installed)** (api.github.com, 2026-10-15)
| Repo | Health | Borrow |
|---|---|---|
| [darkroomengineering/satus](https://github.com/darkroomengineering/satus) | MIT, 1,002 stars, pushed 2026-10-15; Next 16.3.8 + React 19 + Tailwind 4, by the Lenis team | Heavy effects (WebGL) live behind a feature flag in `lib/features`. An asset-size budget runs in their `check` script, and Lighthouse CI runs on previews. If GSAP is ever added, copy their Lenis to ScrollTrigger sync (`components/layout/lenis/scroll-trigger.tsx`) and `useGSAP` scoping. |
| [ertdfgcvb/play.core](https://github.com/ertdfgcvb/play.core) | Apache-2.0, 541 stars, pushed 2026-04-03 | The architecture of a mark or glyph field: a pure per-cell function of (coord, time, cursor) feeding a canvas renderer. This keeps `HeroField` tunable and testable. |
| [barvian/number-flow](https://github.com/barvian/number-flow) | MIT, 7,754 stars, pushed 2026-09-20 | Accessible animated digits that respect motion preference by default; the dependency for interactions 2 and 4. |

## Handoff to PLAN.md
1. Dependencies: keep framer-motion 12.x and lenis. Add only `@number-flow/react` if interaction 2 or 4 ships. No GSAP, WebGL, Lottie, Rive, chart libs, cmdk or confetti. Load any booking embed on click only.
2. Background: build `HeroField.tsx` (Canvas2D "noise to order", hero only, under 3 KB, 60/24 fps, IO + visibility pause, phantom cursor on touch, static frame under reduced motion and Save-Data, text-safe mask). Delete `CursorField.tsx`; make the Aurora ambient static.
3. Interactions in order: (1) Research Engine replay from 3 recorded real runs, (2) start-vs-now unit charts for 2 or 3 headline cases, (3) system diagram assembled on scroll. The growth scrubber waits on Karan's monthly data.
4. Cut template-twin motion (Tilt, WordMarquee, char-cascade headline, decorative count-ups). Move scroll progress to CSS scroll-driven animation. Use View Transitions if case studies become routes.
5. Skills: build with `design-taste-frontend --keep palette,type`; critic adds `emil-design-eng`; Karan runs `/review-animations` once before ship.
