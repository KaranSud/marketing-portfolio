# Baseline: live v2 scored with the rubric

Lane: baseline. Written 2026-10-15 from fresh shots of http://localhost:3200 (v2 build) and the v2 source.
Shots: `tasks/v3/shots/baseline/` (`v2-home-*`, `v2-modal-*` (FanTV AI card), `v2-blog-*`, `bench-*`).
Measurements: Playwright + CDP script run locally (4x CPU slowdown, 1.6 Mbps / 150 ms network for mobile). No Lighthouse
was available, so LCP/CLS/long tasks come from PerformanceObserver in the page.

## Verdict

**v2 scores 5.0 / 10.** It is a clean, consistent dark site with real numbers and real analytics screenshots, and it
would pass as a competent freelancer template. It would not pass a design director or a CRO lead. Three problems
cost the most: the hero sells a slogan instead of a buyer and an outcome, the page has no offer and no single action,
and the layout is a stack of card grids (13 case cards, 12 service cards, 38 tool chips, two marquees) that reads as a
resume with a template skin. The best work-explaining interactions already exist in the code but are buried or
switched off.

## Score table

| # | Dimension | Weight | Score | Weighted |
|---|-----------|--------|-------|----------|
| 1 | Positioning clarity | 15 | 5.0 | 75.0 |
| 2 | Proof and credibility | 15 | 6.0 | 90.0 |
| 3 | Conversion path | 15 | 4.5 | 67.5 |
| 4 | Narrative journey | 10 | 4.0 | 40.0 |
| 5 | Visual craft and originality | 15 | 5.5 | 82.5 |
| 6 | Interaction design | 10 | 4.5 | 45.0 |
| 7 | Copy | 10 | 5.5 | 55.0 |
| 8 | Mobile | 5 | 5.0 | 25.0 |
| 9 | Accessibility + performance | 5 | 4.5 | 22.5 |
| | **Overall** | 100 | | **5.0** (502.5 / 100) |

## Evidence by dimension

### 1. Positioning clarity: 5.0
- The H1 is a slogan: "Brands don't go viral. Systems do." (`components/KineticHeadline.tsx:20`, `v2-home-desktop-01.png`).
  It names no buyer, no engagement type, and no reason to pick Karan over any other social marketer.
- The sub-line rescues some of it with three concrete results and "content, community, and paid growth"
  (`components/Hero.tsx:48-53`). A stranger gets "growth marketer, crypto-flavoured" in 5 seconds; they do not get
  "who he helps" or "how to hire him".
- His real differentiator, a marketer who builds his own AI tools and software, is absent from the hero. It appears
  only in section 3 ("Tools I build", `components/Labs.tsx:27`).
- Services lists 12 offers across every channel and four industries (`components/Services.tsx:4-53`,
  `v2-home-desktop-03.png`). That reads as "does everything", which blurs positioning further.
- The metadata says "Senior content and growth strategist" (`app/layout.tsx:32-33`); the page never says it in that plain form.

### 2. Proof and credibility: 6.0
Strengths: four hard numbers above the fold (`components/HeroVisual.tsx:7-12`); every case has metrics, a
situation/strategy/execution/results write-up and real analytics screenshots (`v2-modal-desktop-01..05.png`).
Weaknesses:
- Zero testimonials anywhere on the site. Both benchmarks below put named people next to the offer.
- Counts disagree on one page: "across 15+ brands" (`HeroVisual.tsx:25`), "Thirteen engagements" (`Work.tsx:88`),
  "Across eight industries" (`Brands.tsx:64`), seven industries in the FAQ (`lib/faqs.ts:10`), five sectors in the Work sub.
- The hero's "471% Peak campaign ROI" rests on a ₹3,500 ad spend (`lib/caseStudies.ts:426, 457`). A buyer who opens
  the case finds a very small budget behind the biggest number. Facts lane should rule on whether it can headline.
- Brand logos in the hero are a 22px overlapping stack, illegible (`Hero.tsx:66-73`, `v2-home-desktop-01.png`).
  The same logos then repeat in a marquee (`Brands.tsx`) and on every card: three showings, none legible at a decision point.
- The featured case is The Culturegram redesign with non-numeric metrics "Ground-Up", "Custom", "9"
  (`lib/caseStudies.ts:602-606`), placed under the headline "Brands I took from quiet to known". The weakest growth
  proof leads the strongest section.
- Tony Roma's card reads "Content strategy for a 53-year-old global chain" (`lib/caseStudies.ts:331`). The brief says
  the locations are partner franchises; this wording implies he ran the global brand. Facts lane to confirm.
- The CTA band and the contact section carry no proof at all (`components/CtaBand.tsx`, `components/Contact.tsx`).

### 3. Conversion path: 4.5
- The hero's primary (white) button is "View case studies"; "Get in touch" is the ghost button (`Hero.tsx:55-64`).
  The nav CTA is also ghost-styled (`components/Nav.tsx:129`). The page's main action is browsing, not contacting.
- No offer: no engagement shape (project, retainer, fractional, full-time), no price or range, no availability,
  no "what happens after you click" beyond "I reply within 24 hours" (`CtaBand.tsx:14`).
- Case modals end on screenshots with no next step (`components/CaseModal.tsx:170-233`, `v2-modal-desktop-05.png`).
  The highest-intent moment on the site is a dead end.
- Contact gives two equal buttons plus three links (`Contact.tsx:93-133`, `v2-home-desktop-07.png`), and the email is
  a Gmail address. The LinkedIn link is `linkedin.com/in/karansud7` (`Contact.tsx:115`) while the brief lists
  `karansud-marketing`. NEEDS KARAN.
- No secondary path for not-ready visitors on the home page: no newsletter, no lead magnet. The blog index has no CTA
  of any kind (`v2-blog-desktop-10.png`).
- No sticky or thumb-reachable CTA on mobile. Form errors surface through `alert()` (`Contact.tsx:66`).
- Good: three-field form, Calendly option, a stated reply time.

### 4. Narrative journey: 4.0
- Order (`app/page.tsx:20-31`): Hero, Work, Services, Tools, CTA band, Brands marquee, Toolkit, FAQ, word marquee,
  Contact. That is a resume order, not a story. There is no "how I work" section and no "who is Karan" story at all
  (the engineer who moved into marketing and now builds his own tools is the most interesting thing about him).
- Repetition: logos three times, Services and Toolkit overlap (Social Media Management, Community, KOL, Email appear in
  both), the FAQ restates the hero in third person, the footer repeats the slogan.
- Filler: Toolkit is 38 chips (`components/Skills.tsx`), the outlined word marquee is a blank 180px band in every shot
  (`components/WordMarquee.tsx`, `v2-home-desktop-06.png`), the Brands marquee adds no new information.
- Length: 10,086px on desktop and 16,009px on mobile (measured). Roughly half of that is filler.

### 5. Visual craft and originality: 5.5
Strengths: restrained palette (warm-dark plus sage `#6CA088`, off-white primary button), a sensible type system
(Space Grotesk, Inter, JetBrains Mono, `app/layout.tsx:9-27`), even spacing, consistent radii.
Why it still reads as a template:
- Nearly every section is a bordered dark card grid. Mono uppercase micro-labels sit on every card and tag.
- Every H2 uses the same "plain words + sage-gradient accent words" device (all 7 home-page H2s plus the H1).
- Two marquees (logo chips and outlined giant words) are stock portfolio-template tropes.
- Services carry "01" to "12" index numbers (`Services.tsx:71`), close to the banned "01/02/03" tell.
- The cursor-reactive background Karan asked for (instaagent) is built (`components/CursorField.tsx`) but never
  imported. The live background is a time-based aurora (`components/Aurora.tsx`).
Visible craft bugs:
- "FEATURED" badge is unreadable on the cream Culturegram panel (`v2-home-desktop-01.png`, `globals.css:539`).
- The "Ground-Up" metric breaks across two lines (`v2-home-desktop-02.png`).
- Card descriptions are cut off with ellipses mid-sentence ("monthly...", "not pa...") (`v2-home-desktop-02.png`).
- In the modal, the "Before" tag covers the "Verified followers" label (`v2-modal-desktop-05.png`). The same
  screenshot is shown again under Proof (`v2-modal-desktop-03.png`). The "Creatives" section shows analytics, not creatives.
- On mobile the modal title "FanTV AI" sits on top of the logo (`v2-modal-mobile-01.png`).
- The footer renders "© 2026Brands don't go viral" with no space (`components/Footer.tsx:6-7`, `v2-home-desktop-07.png`).
- The blog index recycles one constellation graphic in different hues for all 38 posts (`v2-blog-desktop-01.png`).

### 6. Interaction design: 4.5
- What runs is decoration: character-cascade headline, magnetic buttons, 3D tilt card, count-ups, card spotlight,
  aurora canvas, Lenis smooth scroll (`Hero.tsx`, `Magnetic.tsx`, `Tilt.tsx`, `CountUp.tsx`, `Aurora.tsx`). None of
  these helps a visitor feel a result or understand a process.
- The two pieces that do explain the work are hidden. The pinned scroll story (`components/FeatureStory.tsx`) only
  renders when the featured case is Fere (`Work.tsx:94`), but the featured case is The Culturegram, so it never shows.
  The drag-to-compare slider (`components/BeforeAfterSection.tsx:31`) lives inside one modal.
- The tool mocks in the Tools section are static pictures (`v2-home-desktop-04.png`); the visitor cannot try anything
  on the page.
- Modals have no focus trap and no focus return (`CaseModal.tsx:44-49`, `Contact.tsx:135`).

### 7. Copy: 5.5
- The hero sub-line is specific and good. Case write-ups are concrete and first-person.
- `copy-lint.sh` on `app components lib` fails: three "from X to Y" sweeps, including the Work H2 itself
  (`Work.tsx:85`, `Services.tsx:31`, `caseStudies.ts:322`), and five negative-parallelism lines
  (`caseStudies.ts:83, 133, 230, 289, 621`).
- Section headlines are stock phrases: "Results that compound", "Marketing run end to end", "Questions, answered",
  "Let's build something real", "Strong product, quiet brand?". The H1 is a common LinkedIn line.
- The FAQ is written in third person ("Karan Sud is a senior content and growth strategist...", `lib/faqs.ts:6`),
  clearly for AEO, and it reads robotic on the page.
- Blog: 18 em dashes across 14 of 38 posts, one visible in a card excerpt on `/blog` (`v2-blog-desktop-01.png`);
  Title Case post titles; the blog H1 "Building the outbound engine" (`app/blog/page.tsx:39`) sits above posts about
  AI content marketing and SaaS CAC payback.

### 8. Mobile: 5.0
- Stacks cleanly, no horizontal scroll, readable type (`v2-home-mobile-01..07.png`).
- Nothing is designed for 390px: 13 full case cards and 12 service cards stack into a 16,009px page.
- No sticky CTA. 9 tap targets under 44px (Tools links and contact links 22px tall, menu toggle 42x42).
- Modal title overlaps the logo (`v2-modal-mobile-01.png`); contact buttons stack at uneven widths (`v2-home-mobile-07.png`).

### 9. Accessibility + performance: 4.5
Passes: body text contrast 6.75:1 and label text 5.62:1 on `#0A0A0B`; CLS measured 0.00 on desktop and mobile;
MotionConfig `reducedMotion="user"` (`components/MotionProvider.tsx`), Lenis and the aurora switch off under reduced motion.
Fails:
- 0 of 13 case cards are keyboard reachable: they are `motion.div` with `onClick` (`Work.tsx:138-140`). Tabbing
  instead lands on the hidden modal close button. The site's main proof is unreachable without a mouse.
- Modals have no `role="dialog"` or `aria-modal`; form inputs have placeholders but no labels (`Contact.tsx:174-176`);
  no skip link; 36 of 36 images have no width/height.
- `CountUp` ignores reduced motion: the modal shot, taken with reduced motion on, caught "299K" mid-count while the
  data says 300K (`v2-modal-desktop-01.png` vs `caseStudies.ts:74`).
- Mobile LCP 4.6s on the throttled profile (desktop 1.0s). The LCP element is `.hero-sub`, which is server-rendered at
  `opacity:0` and only appears after hydration plus a 0.16s delay and 0.7s fade. The H1 characters are also
  server-rendered translated out of view. 763KB of decoded JS on first load.

## Benchmarks: where three operator sites beat v2

Logged in `research/research-log.md`. Shots: `tasks/v3/shots/baseline/bench-<name>-{desktop,mobile}-NN.png`.

| Site | Beats v2 on | What it does | Where v2 falls short |
|------|-------------|--------------|----------------------|
| aprildunford.com (April Dunford, positioning consultant) | Positioning, proof | Hero states the outcome for a named buyer (B2B tech); the sub-line names the buyer's pain; one action "Contact April" repeats in the hero, a pinned side tab and mid-page; 18 client logos at full size; named executive testimonials; "200+ companies"; a photo of her (`bench-aprildunford-desktop-01/02.png`). | v2 names no buyer, has no photo of Karan anywhere, shows logos at 22px, has no testimonials, and splits its CTA between browsing and contacting. Do not copy her visual style (Title Case, dated stock layout). |
| fletchpmm.com (Anthony Pierri and Robert Kaminski) | Conversion path, interaction that explains | Hero names the problem; one productized offer (2-week sprint) priced by company stage; availability inside the button ("Booking in November"); deliverables shown as preview images; a week-by-week timeline; an interactive "check all that apply" problem checklist; metric testimonials beside the offer; "See Before & Afters" as the second CTA (`bench-fletchpmm-desktop-01/02.png`). | v2 has no offer, no range, no timeline, no availability, and no next step after a case study. Its interactions decorate; Fletch's checklist makes the visitor diagnose themselves. Take the structure, not the styling (it uses check chips Karan bans). |
| marketingexamples.com (Harry Dry) | Visual originality, showing the work | Hand-made illustrated art direction nobody would mistake for a template; every tile is a worked example that teaches the method; one capture (newsletter) with "130k" readers next to it; topic filter sidebar (`bench-marketingexamples-desktop-01.png`). | v2 describes its work in 13 identical dark cards and never shows it in-line; the blog reuses one generated graphic 38 times. v2 has the raw material (real screenshots, before/after) but hides it in modals. |

## What v3 must fix (ranked, most score-moving first)

1. **Hero positioning** (`Hero.tsx`, `KineticHeadline.tsx`, `HeroVisual.tsx`). Problem: slogan H1, no buyer, no
   engagement type, builder angle missing. Cost: dimension 1 (15%) and first-impression proof. Fix: an H1 that names
   who he helps and the outcome (positioning lane supplies the line), a sub-line with 2 or 3 facts.md numbers, one
   primary CTA, his face, and the "marketer who builds his own tools" angle in the first screen.
2. **One offer, one action** (`Hero.tsx`, `Nav.tsx`, `CtaBand.tsx`, `Contact.tsx`, `CaseModal.tsx`). Problem: no
   offer, primary button is "View case studies", case modals dead-end. Cost: dimension 3 (15%). Fix: define 1 to 3
   engagement shapes with availability and a "what happens next" in 3 steps; make one action primary everywhere
   (nav, hero, end of every case, contact); add a CTA plus a "next case" link at the end of each case; add a
   secondary path (newsletter or a tool) for not-ready visitors; sticky CTA on mobile. Conversion lane decides the
   action type.
3. **Curate proof** (`Work.tsx`, `lib/caseStudies.ts`, `Brands.tsx`). Problem: 13 equal cards, Culturegram redesign
   leads, counts disagree, logos illegible, no testimonials. Cost: dimensions 2 and 4 (25%). Fix: 3 or 4 flagship
   growth cases told as stories on the page (problem, move, number, screenshot), the rest in a compact index; one
   count for brands and industries taken from facts.md; legible logo row once, near the CTA; real testimonials only if
   Karan supplies them (NEEDS KARAN); re-frame or drop the 471% headline per facts lane; fix Tony Roma's wording.
4. **Cut to a story** (`app/page.tsx`). Problem: resume order and filler. Cost: dimension 4 (10%) and mobile.
   Fix: drop the Services 12-grid, Toolkit chips, both marquees and the duplicate CTA band; add "how I work" and a
   short "who I am" (engineer, marketer, builder). Target roughly half the current length (mobile under 8,000px).
5. **Own art direction** (`app/globals.css`, all sections). Problem: dark card-grid template tropes. Cost: dimension 5
   (15%). Fix: keep the palette, change the composition: fewer boxes, bigger real artefacts (screenshots, charts,
   creatives) shown in-line, one signature visual idea; no marquees, no 01 to 12 indices, no accent-word device on
   every H2, fewer mono labels. Fix every bug listed under dimension 5.
6. **Interactions that explain** (`FeatureStory.tsx`, `BeforeAfterSection.tsx`, `Labs.tsx`, `CursorField.tsx`).
   Problem: decoration runs, explanation is hidden. Cost: dimension 6 (10%). Fix: bring the pinned case story and the
   compare slider onto the home page for flagship cases; make the Tools section usable inline (for example, score one
   sample domain live); build the instaagent-style cursor field Karan asked for, with reduced-motion and touch fallbacks
   (tooling lane has the recipe). Remove tilt, magnetic and spotlight unless they earn a place.
7. **Accessibility and LCP** (`Work.tsx`, `CaseModal.tsx`, `Contact.tsx`, `CountUp.tsx`, `Hero.tsx`). Problem:
   cards not keyboard reachable, no dialog semantics, unlabeled inputs, CountUp ignores reduced motion, hero text hidden
   until hydration. Cost: dimension 9 plus a credibility risk with technical buyers. Fix: cards as `<button>` or
   `<a>`, dialogs with role, aria-modal, focus trap and focus return, visible labels, skip link, image dimensions,
   reduced-motion check in CountUp, hero copy visible in server HTML (animate transform only, never opacity 0 on LCP text).
8. **Copy pass** (`Work.tsx:85`, `lib/caseStudies.ts`, `lib/faqs.ts`, `app/blog/page.tsx`, `content/blog`). Problem:
   copy-lint failures, stock headlines, third-person FAQ, blog H1 mismatch and em dashes. Cost: dimension 7 (10%).
   Fix: copy-lint clean, first-person FAQ (keep a third-person version only in JSON-LD), headlines that say something
   specific, a blog index H1 that matches the posts, and a CTA on the blog index.
9. **Mobile layouts** (all sections). Problem: desktop stacked. Cost: dimension 8 (5%). Fix: compact case list or
   swipe rail at 390px, 44px targets, sticky CTA, fix the modal title overlap.
10. **Contact details** (`Contact.tsx:108-121`). Problem: Gmail address and a LinkedIn handle that differs from the
    brief. Fix: facts lane to confirm the right handle; a domain email if Karan has one (NEEDS KARAN).

## What v2 does well that v3 must keep

- Real, specific numbers and real analytics screenshots for every case; the situation, strategy, execution, results,
  proof structure in `CaseModal.tsx`.
- The hero sub-line's habit of putting results inside a sentence (`Hero.tsx:48-53`).
- The palette and restraint: warm-dark base, one sage accent, off-white primary button; the Space Grotesk and Inter pairing.
- Contrast above 4.5:1, CLS 0, the reduced-motion plumbing (`MotionProvider.tsx`, `SmoothScroll.tsx`, `Aurora.tsx`).
- The low-friction three-field form, the Calendly option and the stated 24-hour reply.
- The built tools (live Account Research Engine, CRM) as proof he can build: keep them, reframe them as proof.
- `BeforeAfterSection.tsx` compare slider (native range input, so keyboard and touch work) and the `FeatureStory.tsx`
  pinned-scroll pattern: promote both.
- SEO and AEO plumbing: JSON-LD (`components/JsonLd.tsx`), OG and Twitter images, sitemap, robots, feed, llms.txt.
- The 38-post blog as the secondary path for visitors who are not ready to talk.

## Handoff to PLAN.md

1. Score to beat: v2 = 5.0. Biggest gaps: conversion path 4.5, narrative 4.0, interaction 4.5, positioning 5.0.
2. Rebuild the hero around buyer, outcome and the builder angle, with one primary action and Karan's face; nothing else above the fold.
3. Add an explicit offer (engagement shapes, availability, 3-step next steps) and put the same primary CTA in the nav, hero, after every case and at contact, plus a sticky mobile CTA and one secondary path.
4. Replace the 13-card grid, Services grid, Toolkit chips and both marquees with 3 or 4 flagship case stories shown in-line (promote FeatureStory and the compare slider), a compact index, how-I-work and who-I-am.
5. Ship with keyboard-reachable cases, real dialog semantics, labeled inputs, hero text visible in server HTML (mobile LCP under 2.5s), copy-lint clean, and every number traced to facts.md.
