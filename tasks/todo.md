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
