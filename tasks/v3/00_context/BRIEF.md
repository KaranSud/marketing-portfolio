# v3 research brief (lead-written 2026-10-15; agents read this, not the raw sources)

Read first: `tasks/v3/PLAYBOOK.md` (hard rules), `tasks/v3/learnings.md`, `tasks/lessons.md` (copy rules).
Repo root: `~/marketing-portfolio` (branch `claude/portfolio-redesign-overhaul-8dsywo`). Running locally on Karan's Mac.

## Goal of the whole project
Next version of Karan Sud's personal brand site in `portfolio-v3/` (currently an exact copy of `portfolio-v2/`).
It must win the work Karan wants: growth / content / AI-marketing engagements, freelance and full-time.
It must feel like an intentional journey, be simple to understand, use interactivity that explains the work,
and not read as AI-generated. The critic (`workflows/rubric.md`) must score it 9.5+ three cycles in a row.
Research comes first. Your file feeds `PLAN.md`, which the lead writes after all five lanes finish.

## Who Karan is (lead's summary; facts lane verifies, nobody else re-derives)
- Mechanical engineer by degree who moved into marketing. About 5 years across crypto/DeFi, AI products,
  F&B/restaurants, e-commerce, and executive personal branding. He taught himself to build software this year with
  an AI coding partner. Never write "not an engineer" (he holds the degree).
- Case studies are in `portfolio-v2/lib/caseStudies.ts` (13 engagements). Karan supplied these facts himself.
  Treat them as Karan-provided, NOT independently verified. Roles there: Social Media Marketer (FanTV AI); Sr. Content
  Manager at Crowwd Labs (Fere AI, Novaswap, Defx, BimaBTC); Freelance Content Strategist (Tony Roma's, whose
  locations are partner franchises: never imply he ran the chain); Executive Personal Branding (Prashan Agarwal,
  Mohaimina Haque); Freelance Digital Strategist (Potters' Hub); Freelance Social Media Manager (Bones & Burgers);
  Performance & Social Marketer at Mach1 (Opaque Studio); Content Strategist (The Sportrush); Social & Content
  Strategist (The Culturegram, 2026 contract).
- Headline numbers on live v2 (hero): 7K+ daily active traders (Fere AI), 12K+ AI signups, 300K+ followers
  (FanTV AI, from 70K), 471% peak campaign ROI, community <1K to 150K, "15+ brands", "Thirteen engagements".
- Things he built: Account Research & Outreach Engine (live: https://account-research-five.vercel.app),
  a CRM page and samples page inside the portfolio, a 38-post blog (`portfolio-v3/content/blog`), and SlouchGuard,
  a posture app with its own site (https://slouchguard-site.vercel.app).
- Claude's private notes say he currently works at Cyberwave (Physical AI). Use only if his public LinkedIn
  confirms it; otherwise mark NEEDS KARAN.
- Public profiles: LinkedIn linkedin.com/in/karansud-marketing, X @KaranSudSocial, Instagram @karansudsmm.
  Live v2: https://karan-sud-portfolio.vercel.app (served locally at http://localhost:3200 right now).

## Karan's standing taste (from his past feedback; every lane respects it)
- YC-product / real-SaaS quality (Linear, Vercel, Clay, Resend tier). He rejected work twice as "vibe-coded".
- References he named: characterquilt.com (crafted product polish), instaagent.com (cursor-reactive moving
  background; he explicitly wants this on his landing page), pagerduty.com (numbers-forward, fully professional).
- Warm-dark base, one restrained sage accent `#6CA088`, off-white primary buttons, gradients sparingly.
- Banned design tells: "01/02/03" section number eyebrows, two-tone logo, background grid, ✓ chips, arrows inside
  button labels. Copy bans in `tasks/lessons.md` (no em/en dashes, no AI vocab, no "not X, Y" stacks, etc.).
- Every number on the site must trace to `research/facts.md`. Never fabricate testimonials, logos, clients, metrics.

## Rules for every agent
1. One lane, one output file (below). Do not write anywhere else except: the research log, shots you are told to
   take, and one-line appends to `tasks/v3/learnings.md` for reusable environment discoveries.
2. Research log `tasks/v3/research/research-log.md` is append-only and shared. BEFORE any web search or fetch,
   `grep -i` it for the URL/query. AFTER each, append ONE line via Bash only (other agents write concurrently):
   `printf '%s | %s | %s | %s\n' "$(date +%H:%M)" "<lane>" "<url or query>" "<one-line takeaway>" >> tasks/v3/research/research-log.md`
   Never use Edit/Write on the log.
3. Web tools start unloaded: first call ToolSearch with `select:WebSearch,WebFetch`. For x.com links use
   `https://api.fxtwitter.com/<handle>/status/<id>` or `https://api.fxtwitter.com/<handle>` via WebFetch.
4. Do not install packages or skills, do not edit `portfolio-v2/` or `portfolio-v3/`, do not commit or push.
   Recommend tools; never install them.
5. No copying: summarise other sites in your own words, quotes under 15 words with attribution.
6. Write the output in plain, specific prose with tables where useful. No em/en dashes. Lead with the decision or
   recommendation, then evidence. Mark every claim with its source (URL or file:line). Aim for under ~250 lines.
7. Finish with a 5-line "Handoff to PLAN.md" section: the decisions your lane recommends.

## Lanes
| Lane | Output | Owns | Not your lane |
|------|--------|------|---------------|
| facts | `research/facts.md` | Career fact base: every number/claim usable on the site, its source, verification status (verified-public / Karan-provided / conflict / NEEDS KARAN), and a short "safe to headline" list. Check v2 site copy, `lib/caseStudies.ts`, `lib/showcase.ts`, `lib/faqs.ts`, `public/llms.txt`, components' copy, his public profiles and client public pages. Flag inconsistencies (e.g. "15+ brands" vs "Thirteen engagements"). | positioning, design, CRO advice |
| positioning | `research/positioning.md` | 10 to 15 benchmark personal sites of top content / growth / AI-marketing operators and fractional marketers who win the clients Karan wants. For each: hero line, offer, proof style, CTA. Patterns. Then Karan's recommended positioning: 2 or 3 options, one recommended, with ICP, outcome sold, and draft hero lines (invoke the `head-of-content` skill before drafting any line). | conversion mechanics, tooling, scoring v2 |
| conversion | `research/conversion.md` | What converts on personal-brand / consultant / freelancer sites, with evidence (studies, CRO data, documented teardowns). Primary CTA type (call vs email vs form), friction, what-happens-next, proof placement, pricing visibility, secondary path for not-ready visitors (newsletter, tools, blog), mobile CTA. Ranked recommendations with evidence strength. | positioning copy, tooling, scoring v2 |
| tooling | `research/tooling.md` | Interactive-web libraries, repos and Claude skills worth using in Next 16 + React 19 (current stack: framer-motion, lenis, Tailwind 4). Vet each: what it is for, size, license, maintenance, React 19 / SSR fit, reduced-motion story, and "AI-template tell" risk. Concrete interaction ideas that EXPLAIN Karan's work (let a visitor feel a result or a process), plus how to do the instaagent-style cursor-reactive background well. Local design skills are in `~/.claude/skills/design-and-editing/` (read their SKILL.md headers only). | positioning, CRO, scoring v2 |
| baseline | `research/baseline.md` | Independent critique of live v2 with `workflows/rubric.md`. Take fresh shots: `node tasks/v3/workflows/shot.mjs http://localhost:3200 tasks/v3/shots/baseline/v2-home` (plus `--click` on a case card for the modal, and `/blog`). Score every dimension with evidence, overall score, then the ranked list of what v3 must fix. Compare against 3 benchmark sites you pick (log them so other lanes can see). | positioning advice, CRO research, tooling |
