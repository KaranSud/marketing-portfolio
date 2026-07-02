# Portfolio Rebuild: index.backup.html → Next.js on Vercel

**Decisions:** Faithful port first (1:1, then enhance later) · Keep Formspree · Add Framer Motion · Deploy to Vercel
**Stack:** Next 16 App Router · React 19 · Tailwind 4 · Framer Motion · TypeScript

## HARD CONSTRAINT: $0 cost
Everything must run on free tiers, no paid services.
- Vercel **Hobby** plan — free (personal/non-commercial portfolio = allowed)
- Formspree **free** — 50 submissions/mo (sufficient)
- Calendly **free** link (already in use)
- Fonts via `next/font` — self-hosted, free (no paid font CDN)
- `framer-motion` — free / open source
- Replace logo.dev (token + potential paid usage) with **local logos** in `public/` — removes the dependency entirely
- No Resend / no paid email / no DB / no analytics that bills

## WORKFLOW (must follow)
1. Build the port locally (Phases 0–4 below)
2. **Host locally** (`npm run dev`) so Karan can review
3. Collect feedback → iterate locally
4. Only after Karan's **explicit green light** → push to GitHub, then deploy to Vercel (I run the deploy)
5. Do NOT push or deploy before green light

## Phase 0 — Foundation
- [ ] Install `framer-motion`
- [ ] Set up design tokens in `globals.css` via Tailwind 4 `@theme` (port CSS variables, light + dark)
- [ ] Wire fonts in `layout.tsx` with `next/font` (Outfit + Fraunces only; drop the 3 unused fonts)
- [ ] Real `metadata` in `layout.tsx` (title, description, OG image, canonical)
- [ ] Theme system: `ThemeProvider` + `data-theme` + localStorage + no-flash inline script

## Phase 1 — Data layer
- [ ] Create `lib/caseStudies.ts` — typed port of the 12-entry `cases` object
- [ ] Verify all screenshot/logo paths resolve in `public/` (watch spaces & apostrophes)
- [ ] Replace exposed logo.dev token: use local logos in `public/Logos`, fall back to initials

## Phase 2 — Sections (1:1 visual port)
- [ ] `Nav` (logo, links, Get in Touch CTA, ThemeToggle)
- [ ] `Hero` (badge, headline, sub, CTAs, animated stats, profile card) + count-up stats
- [ ] `Work` grid → `CaseModal` (data-driven, screenshots, initials fallback)
- [ ] `Services`
- [ ] `Brands`
- [ ] `Skills`
- [ ] `Contact` section + `ContactModal` (tabbed: Formspree form + Calendly)
- [ ] `StickyBook` floating Calendly CTA
- [ ] Footer

## Phase 3 — Interactions (Framer Motion replacing vanilla JS)
- [ ] Scroll-reveal (replace IntersectionObserver)
- [ ] Stat count-up animations
- [ ] Modal open/close transitions
- [ ] Contact form submit → Formspree (loading/success/error states)

## Phase 4 — Verify locally (NO deploy yet)
- [ ] `npm run build` passes, no TS/lint errors
- [ ] `npm run dev` — visual diff each section vs. index.backup.html (light + dark)
- [ ] Responsive check (mobile/tablet/desktop)
- [ ] Lighthouse/SEO sanity (metadata, alt text, OG)
- [ ] **Hand off local URL to Karan for review** ← STOP here, gather feedback, iterate

## Phase 5 — Ship (ONLY after Karan's green light)
- [ ] Push to GitHub
- [ ] Deploy to Vercel Hobby (I run it; guide through interactive `vercel` login)
- [ ] Confirm live URL works (light/dark, form, modals)
- [ ] (Later) enhanced animations / redesign pass

## Notes
- Keep `index.backup.html` untouched as the reference until parity confirmed.

## Review

### Done (Phases 0–4, local)
- Installed `framer-motion` 12.
- `globals.css`: full original stylesheet ported verbatim; font names swapped to `next/font` CSS variables; light + dark theming intact.
- `layout.tsx`: Outfit + Fraunces via `next/font` (3 unused fonts dropped), real SEO metadata + OG/Twitter tags, no-flash inline theme script, `suppressHydrationWarning`.
- `lib/caseStudies.ts`: all 12 case studies typed; logo.dev token + URLs removed, local `/Logos` used instead.
- Components: `Nav`, `Hero` (+`CountUp`), `Work` (+`CaseModal`), `Services`, `Brands` (logo fallback), `Skills`, `Contact` (+modal, Formspree, tabs), `StickyBook`, `FadeUp`.
- Vanilla JS rewritten as React: theme toggle, scroll-reveal (framer-motion), stat count-up, modals, contact form states, sticky CTA.
- `next.config.ts`: pinned `turbopack.root` to fix parent-lockfile root inference.
- Verified: `npm run build` passes (TS clean, no lint failures, all static). Dev server renders all sections; logo + screenshot assets (incl. spaces/apostrophes) return 200.

### Pending
- Karan's review of local preview → feedback → iterate.
- Phase 5 (deploy) only after green light.

### $0 status: confirmed
All free — Vercel Hobby, Formspree free, Calendly free, self-hosted fonts, local logos, framer-motion OSS. No paid services introduced.

---

# Phase 6 — Dark Cinematic Redesign

**Direction:** Dark premium / cinematic (Linear / Vercel / a16z) · Dramatic redesign · Strip visual gimmicks + copy tells
**Theme:** Dark-only (drop light/dark toggle)

## Design system
- [ ] Tokens: near-black bg, layered surfaces, blue→violet gradient, cyan, radial glows
- [ ] Fonts: Space Grotesk (display) + Inter (body) + JetBrains Mono (eyebrows/tags), drop Fraunces
- [ ] Update layout.tsx fonts; remove theme toggle + no-flash script (dark-only)

## Re-architected sections
- [ ] Hero: asymmetric, gradient-mesh glows, oversized headline, stat proof-bar, trusted-by logo row (remove profile card + pulsing badge)
- [ ] Work: featured case study + spotlight-glow grid (cursor-follow)
- [ ] Services: numbered editorial list / bento (replace flat 4x3 grid)
- [ ] Brands: auto-scroll logo marquee (replace static pills)
- [ ] Skills: restyled mono toolkit chips
- [ ] Contact: big closing section, clean CTA pair (remove trust strip + sticky book)
- [ ] Footer: refined

## Motion
- [ ] Cursor spotlight on cards
- [ ] Staggered scroll reveals (framer-motion)
- [ ] Brand marquee
- [ ] Keep count-ups, subtle hero glow drift

## AI cleanup (light, this pass)
- [ ] Remove all em dashes
- [ ] Soften worst tells (from nothing/zero repetition, punchy fragments, cliché lines)

## Verify
- [ ] npm run build clean
- [ ] Local preview for Karan → iterate
- [ ] (Next phase) full content lockdown per section

---

# Phase 7 — Account-research: best AI-native outbound + research for ALL business types

Goal: flawless for Tech/SaaS/AI, Local & service, E-commerce & D2C, and Professional & B2B services.
**Decisions (from Karan):** strictly FREE / no new API keys · deepen research (input stays offer + domains,
no discovery mode) · test all 4 verticals hard.

## Architecture (data-architect view)
Engine is tech-biased: HN/GitHub/tech-stack only fire for software. Richest UNIVERSAL free source,
on-page schema.org/JSON-LD, was never parsed. Fix = universal extractors + business-type classification
+ adaptive, category-aware brief; make tech signals conditional. No fabrication: every fact cited.

## Build stages
- [ ] 1. `lib/extract.ts`: parse on-page structured data (JSON-LD @type graph, OG/meta, sameAs,
      address/geo/phone, openingHours, priceRange, servesCuisine, aggregateRating rating+count,
      foundingDate, numberOfEmployees, brand, slogan, areaServed) → normalized `SiteFacts`, cited to page.
- [ ] 2. sitemap.xml (+index) → catalog/locations/blog counts (size & cadence proxy);
      careers/ATS detection (greenhouse/lever public JSON for real open-role counts) → hiring signal.
- [ ] 3. `lib/classify.ts`: deterministic `classifyBusiness(facts, signals)` →
      {category,label,confidence}. Categories: saas_tech, ecommerce, restaurant_food, local_service,
      professional_services, healthcare, media_content, nonprofit, other.
- [ ] 4. `lib/sources.ts`: extend `Signals` (place/ratings/catalog/hiring/category/sameAs); wire into gatherSignals.
- [ ] 5. `lib/agent.ts`: category-aware prompt + renderSignals universal facts; brief reframes per category.
- [ ] 6. route + `app/page.tsx`: render category badge, rating, location/hours, price range, catalog/locations,
      hiring (conditional, no empty blocks); diversify EXAMPLES across 4 verticals; CSV adds category/rating/location.
- [ ] 7. globals.css: snapshot chips + badges (dark product system).

## Testing (no mistakes)
- [ ] Probe pipeline 2-3 real domains/vertical via `node --experimental-strip-types`: correct category,
      cited universal facts, NO fabrication, brief reframes, fit sane, tech signals hidden for non-tech.
- [ ] `npm run build` clean; dev smoke; live API smoke post-deploy; auto-deploy READY; confirm live.

## Review
DONE + tested. New `lib/extract.ts` (schema.org/JSON-LD, OG/meta, sitemap, ATS/careers; pure,
15/15 unit tests pass) + `lib/classify.ts` (deterministic vertical classifier). `sources.ts` extended
(facts/scope/hiring/classification, fetchSitemap, fetchHiring, body-text for keyword classify).
`agent.ts` category-aware prompt + universal facts in renderSignals. route + page.tsx render category
chip, business-profile block (rating/price/locations/catalog/hiring/address/cuisine/hours, all
conditional), diversified examples across 4 verticals, CSV adds Business Type/Location/Rating.
Classification verified correct on 13 real domains across tech/restaurant/ecommerce/pro-services/
healthcare/local (fixed: vercel->saas not ecommerce; deloitte/perkinscoie->pro-services not tech;
aspendental->healthcare). Real facts populate (eataly address+socials). Briefs reframe per vertical,
no fabrication. Builds clean. Strictly free, no new keys.

---

## Review: engagement overhaul (2026-07-02)

Shipped on branch `claude/portfolio-redesign-overhaul-8dsywo`.

- [x] New `/tools` page: per-tool hero with live mock, "built for / replaces / costs" facts, numbered how-to steps with a Result callout per step, "what you walk away with" lists, workflow strip showing how the two tools chain, closing CTA. Added to nav and sitemap.
- [x] Homepage Labs section: both tools now get a full visual card (pipeline mock + kanban mock), each with an open link and a step-by-step guide link into /tools.
- [x] Blog infographics: figure headers (kicker + title), larger type throughout, hover states, wider canvas than the text column on desktop, vertical timeline layout on phones.
- [x] Services section: numbered list restyled as a 3-column interactive card grid with cursor-glow hover.
- [x] CRM: "How this works" onboarding panel (auto-shows when pipeline is empty, toggleable from the toolbar), rewritten empty state.
- [x] Copy pass: removed all em/en dashes and AI-sounding phrasing, dropped checkmark chips and arrow glyphs in buttons (see tasks/lessons.md).
- [x] Verified: production build passes, lint clean on changed files (2 pre-existing errors untouched), desktop + mobile screenshots reviewed for home, blog index, article, /tools, /crm.
