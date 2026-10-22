# Critique round 03: portfolio-v3

Critic: independent, did not build. Judged 2026-10-21 from source in `portfolio-v3/` at HEAD `ada9835` and from the
build in `portfolio-v3/.next` (BUILD_ID `brXOdqJUo_ZdfM-fHJHCs`, built 10:20). PLAN.md and copy-deck.md were not read.
Scores were set before reading `critiques/round-02.md`.

**Serving note (read first).** The server on :3300 (pid 87446) was started at 01:36, before the 10:20 rebuild, and was
never restarted. It serves stale HTML that references `/_next/static/chunks/3h3-6_c31u3tz.js`, which returns 500, so
React never hydrates. On :3300 the hero field is a blank 300x150 canvas, the Book button skips the popup and
navigates to calendly.com, the Method slider changes nothing, the sticky CTA never appears, and "Next case" crashes
to "This page couldn't load" (`stale-3300/probe-nextcase-defx.png`, `stale-3300/home-desktop-01.png`). I did not
restart :3300. I served the same `.next` build on :3301 (`npx next start -p 3301`, no rebuild, no source edits)
and scored that, because it is what HEAD produces. Judged literally on :3300 the site scores about **6.9**.

Shots: `tasks/v3/shots/rounds/r03/` `home-*`, `home-motion-*`, `case-fantv-*`, `case-fere-*`, `case-culturegram-*`,
`blog-*`, `post-outbound-*` from `shot.mjs` (on :3301), plus `probe-*` viewport shots from Playwright probes (real
pointer, drag, keyboard, scroll, touch). Perf profile as in earlier rounds: 390x844, 4x CPU, 1.6 Mbps, 150 ms RTT.
`copy-lint.sh portfolio-v3/app portfolio-v3/components portfolio-v3/lib`: clean. Same script on `content/blog`: 61
hits. The live engine page (account-research-five.vercel.app) was read with WebFetch on 21 Oct; I did not append
to research-log.md because this round may only write this file.

## Score table

| # | Dimension | Weight | Score | Weighted | Evidence |
|---|-----------|--------|-------|----------|----------|
| 1 | Positioning clarity | 15 | 8.3 | 124.5 | Passes the 5-second test at 1440 and 390: "You built the AI product. I find the people who use it." and "Growth and content marketing for AI products, as a project or as part-time support" (`Hero.tsx:24-29`, `probe-hero-pointer.png`, `probe-m-first-viewport.png`). Crypto is gone from the support line and no employer is named. Held back: the promise is users, but the hero proves followers (FanTV, "with airdrops") and DEX volume ("perp volume ... DefiLlama"). Two of three tiles read as crypto, and none counts users (`Hero.tsx:6-10`). The left 46% of the desktop hero is a dark panel with 1.6% of its pixels lit at rest (canvas probe), so half the first screen says nothing about the offer. Machine-facing copy still sells crypto: `public/llms.txt:9` "for AI and crypto products", `app/layout.tsx:43` keyword "crypto marketing", `lib/faqs.ts:32` "deep experience in crypto-native AI". |
| 2 | Proof and credibility | 15 | 7.6 | 114.0 | Better: a legible linked logo row with a permission line (`Offer.tsx:84-93`, `home-desktop-05.png`). Real posts from each account carry account, platform and date, link to the original and fall inside the tenure dates (`lib/creatives.ts`). Flagship crops are clean and dated. Every number I checked traces to facts.md (a), (e) or a KP row. Held back: (1) on `/work/fantv` the "More proof" screenshot of FanTV's own account reads **Impressions 12M**, while the stats on the same page say "9.5M+ on FanTV AI's X account; 12M+ with Prashan Agarwal's" (`caseStudies.ts:60,78,82`, `case-fantv-desktop-03.png`). (2) The Jun to Aug 2025 FanTV frame shows daily net unfollows in red with no comment (`caseStudies.ts:84`, `case-fantv-desktop-04.png`). (3) The Tools card says the engine reads "Wikipedia, GitHub and Google News, scores the fit out of 100" (`Tools.tsx:11`). facts.md "Things he built" still marks this CONFLICT, and the live engine's own page says "It pulls their homepage, about, and pricing" with no fit score (WebFetch 21 Oct). The visitor who clicks "Run it on your list" meets a different product. (4) Mohaimina's lead image is a profile screenshot captioned "Mohaimina Haque analytics." (`caseStudies.ts:231`). (5) Fere "7K+ daily active traders" beside "12K+ signups" (`caseStudies.ts:124-125`) implies 58% of all signups trade daily, with no source link. It is allowed by (e), but a diligent buyer will doubt it. (6) "public on DefiLlama" and "#2 Product of the Day" are named but never linked. (7) No testimonials (Blocked). |
| 3 | Conversion path | 15 | 7.8 | 117.0 | One action with one label in the nav, hero, after the flagships, offer, case ends, blog ends, contact and mobile sticky. Calendly opens in place (`probe-calendly.png`). The pricing line answers cost, offer rows link to proof, and a secondary path sits after the flagships (`Work.tsx:101-110`). Held back: the mobile sticky is now blocked by `#faq`, `.v3-index-list`, `.v3-method-controls` and `.v3-offer-list` (`StickyCta.tsx:20`). Probe: 21 of 63 scroll steps at 390px show no CTA, including the whole "Before you book" FAQ (5 of 5 steps), all of Method (4 of 4) and the About block (`probe-m-faq.png`). The section that clears the last objections has no way to act. "What happens after I book?" (`faqs.ts:24`) says what happens on the call but not what the buyer leaves with. |
| 4 | Narrative journey | 10 | 7.4 | 74.0 | The order holds: claim, proof, how, offer, builder, who, objections, act. Method artefacts no longer repeat index images. Mobile dropped from 15,519px to 12,735px. Held back: desktop did not get shorter (11,155px; Work alone is 4,426px, up from 3,834px). Dead bands sit between sections: about 250px from hero to "Work", about 180px above "Ways to work together", and about 200px around About (`home-desktop-01/05/06.png`). The flagship text column ends with about 300px of empty column beside the posts (`home-desktop-02.png`). The Ways CTA floats mid-height in an empty right column (`home-desktop-05.png`). |
| 5 | Visual craft and originality | 15 | 7.3 | 109.5 | Consistent direction (dark field, square corners, two faces, display lowercase name, name index, cream contact). The round-02 crop and SlouchGuard faults are fixed. Held back: (1) `.v3-post` names two different things. The creative tile rule (`v3.css:704`: `aspect-ratio:1; background:var(--field)`) also hits every blog post `<main className="v3-casepage v3-post">` (`app/blog/[slug]/page.tsx:83`). Posts sit on the wrong field colour, and the post's Figure 1 bleeds to x=0 in the old v2 rounded card with mono kicker (`post-outbound-desktop-01.png`). (2) Creative tiles letterbox 16:9 covers into squares, so about 40% of each tile is empty (`home-desktop-02.png`, `home-desktop-03.png`). (3) Case-page leads are the full X dashboard with sidebar, "SuperGrok" and a notification badge, and are unreadable at 390 (`case-fantv-desktop-01.png`, `probe-m-case-fere-shot.png`). (4) The Method right panel holds a 250px image in a 760px stage (`probe-method-revenue.png`). (5) The Culturegram recordings still show the cursor (`case-culturegram-desktop-03.png`). (6) The index crossfade shows two previews overlapped at 500ms (`probe-index-hover-tony.png`). Originality: well made, but the dark name-index portfolio is familiar; the flow field is the only idea nobody else has. |
| 6 | Interaction design | 10 | 7.6 | 76.0 | Measured on :3301. The flow field sweeps once, follows the pointer and ripples on touch; reduced motion gives a still frame (`probe-hero-pointer.png`, `probe-hero-reduced.png`). Method now builds a running ledger, works by drag, keys and stops (`probe-method-drag.png`), and pairs Trust with a real Prashan post. The index preview follows hover and focus. Next case and nav anchors work across client navigation, with reveals intact and the canvas alive after returning home (probe log). Held back: the field explains the biography, not the marketing work. On phones the artefact that changes sits below the controls (`probe-m-method.png`). The engine sample is still a static block. |
| 7 | Copy | 10 | 7.5 | 75.0 | Lint clean, first person, plain and specific ("Tell me which of these fits, or what you need instead."). The round-02 copy fixes landed. Held back: the sample email is still the most machine-sounding text on the page ("Getting creators to try and stick with advanced AI tools is key. We help AI companies like yours drive initial adoption and build lasting communities"), and it addresses a real CEO by first name ("Hi Mati", `data/sample-brief.json:10`). The card copy asserts CONFLICT features (`Tools.tsx:11`). The caption "analytics" is wrong on Mohaimina. Blog bodies carry 61 lint hits, dense "not X, it is Y" stacks (`content/blog/ai-marketing-automation-is-scaling-but-your-organization-probably-isnt.md:32,42,80,94`) and one visible em dash subtitle (`ai-content-homogenization-what-the-peer-reviewed-data-says.md:10`). |
| 8 | Mobile | 5 | 7.5 | 37.5 | No horizontal scroll, CTA in the first viewport, "Tap the field" on touch, index rows text-only, menu has 70px rows and closes on Esc, only 2 non-inline targets under 44px (probe). Held back: 33% of the scroll has no CTA (fix 2); case leads are illegible; Method feedback lands below the controls; the sticky covers body text with no backing (`probe-m-case-fere-shot.png`); the footer "X" wraps alone (`home-mobile-06.png`). |
| 9 | Accessibility + performance | 5 | 8.0 | 40.0 | Throttled mobile LCP 0.82s on home, 0.78s on FanTV, 0.70s on /blog; CLS 0.005 at most; long tasks about 5ms. Skip link, visible 2px focus, labelled range with `aria-valuetext`, inert hidden sticky, no running animations under reduce, no console errors on 20 routes, legacy pages noindex. Held back: the six creative links on home and three on each case page have **invisible focus** because `.v3-post { outline: 1px solid transparent }` (`v3.css:704`) beats `:focus-visible` (`v3.css:59`); tab log stops 10-12 and 15-17. `/work/culturegram` has LCP **6.1s** on the throttled profile (compare PNG plus videos, 1.17MB). |
| | **Overall** | 100 | | **7.7** (767.5 / 100) | v2 5.0, r01 6.4, r02 7.3. About 6.9 if judged on the stale :3300 server. |

## Round 02 fixes: what landed

| r02 fix | Status |
|---------|--------|
| 1 Tools agrees with itself, v2 leftovers retired | Card and sample now agree. /tools, /samples and /crm are noindex and out of the sitemap. Not landed: the claims still conflict with the live engine and facts.md, and the sample email is still generic. |
| 2 Cut length, no repeated artefacts | Mobile cut by 2,784px; index text-only on phones; SlouchGuard is a compact row; FAQ down to 5; no repeated images. Desktop unchanged (11,155px). |
| 3 Crops as compositions | Flagships landed and the FanTV inset is gone. Case-page leads still show the full X UI. |
| 4 Blog as a secondary path | Landed: sentence case, builder posts first, closing CTA. Post bodies not cleaned. |
| 5 Method artefacts and ledger | Landed, including the accumulating ledger. Phone order is only partly fixed. |
| 6 Nav at anchors and hero | Landed (H2 at y=88, hidden mark skipped by Tab). |
| 7 Copy fixes | Landed. |
| 8 Offer links, not-ready line | Landed. |
| 9 Culturegram cursor | Not landed. |

Regressions: the mobile sticky now drops out over FAQ, Method and the index; the `.v3-post` class collision breaks
blog post pages and hides focus on the new creative links; the new FanTV "More proof" frames contradict the case's own
9.5M+ line and show follower losses; the :3300 server was left stale after the rebuild.

## Ranked fix list (builder)

Gains are rough changes to the overall score.

1. **Restart the preview after every build, and check it.** Process; avoids a drop of about 0.8 on what Karan and the
   critic see. `npm run build` was run without restarting :3300. Always use `tasks/v3/workflows/serve.sh portfolio-v3 3300`,
   which builds and restarts. Then add a guard line to `serve.sh` and `critic.md`: fetch `/` and compare its
   `buildId` with `.next/BUILD_ID`, and fail loudly if they differ.
2. **Keep a CTA on screen through the whole phone scroll.** Dim 3 +0.5, dim 8 +0.6 (about +0.11).
   - `StickyCta.tsx:20`: drop `#faq`, `.v3-index-list`, `.v3-method-controls` and `.v3-offer-list` from `blockers`.
     Better rule: hide the sticky only while another Book button (`a[href*="calendly.com"]` outside `.v3-sticky`) is in
     the viewport, or while a text field has focus.
   - `components/Faq.tsx`: end the list with one `<BookButton />` row after "What happens after I book?". Re-run the
     coverage probe; target 0 steps without a CTA at 390px.
3. **Remove every on-page contradiction in the proof.** Dim 2 +0.6, dim 7 +0.2 (about +0.11).
   - `caseStudies.ts:82`: crop `FanTV X Mobile SS.png` to the Verified followers card ("4.2K / 297.7K") or drop it. Its
     "Impressions 12M" for FanTV's own account contradicts `caseStudies.ts:60,78`.
   - `caseStudies.ts:84` (`FanTV_Web2.png`): caption what it shows ("Daily follows ran net negative from June to August
     2025") or remove it. Silence about red bars reads as not having looked.
   - `caseStudies.ts:231`: "Mohaimina Haque analytics." to "Mohaimina Haque on Instagram: 6,519 followers."
   - `Tools.tsx:11` and the sample: describe only what the live engine at the linked URL does today (homepage, about and
     pricing pages, up to 10 companies a run, a brief, an email and a LinkedIn opener). Either remove `.v3-brief-fit`
     and the Wikipedia, GitHub and News sources from the sample, or deploy the build that produced it. Also re-run on a
     target whose output does not use stock lines ("X is key", "companies like yours", "lasting communities"), and show
     the greeting as "Hi [first name]" instead of a real CEO's name.
   - Link the public sources: wrap "public on DefiLlama" and "#2 Product of the Day" in the hero, flagship captions and
     case pages with links to defillama.com/protocol/defx and producthunt.com/products/fere-ai.
4. **Make the hero proof match the promise.** Dim 1 +0.5, dim 2 +0.2 (about +0.1). The promise is users. Replace the
   `$1.5B` tile (`Hero.tsx:8`) with Fere's "12K+ signups with zero paid budget, for an AI trading agent" (facts.md (e)).
   Keep Defx in the flagship. Two crypto mechanics in three tiles undercut "AI products" in the 5-second test. In the
   same pass, change `public/llms.txt:9`, `app/layout.tsx:43` and `lib/faqs.ts:32` to AI products, with crypto as context.
5. **Split the `.v3-post` class.** Dim 9 +1.0, dim 5 +0.3 (about +0.09). Rename the creative tile to `.v3-post-tile`
   (`Posts.tsx:11`, `Method.tsx:108`, `v3.css:704-714`) and give it `:focus-visible { outline: 2px solid var(--accent) }`.
   Blog posts then get back `--bg`, lose the forced square min-height and get focus rings. Then restyle the in-post
   figures (`FIGURE 1 · BUILD VS. BUY` card) to the v3 system (square corners, body font, no mono kicker), aligned to
   the 32px text margin.
6. **Show the posts at their own shape and say whose they are.** Dim 5 +0.3, dim 2 +0.2 (about +0.08).
   - `v3.css` `.v3-post` tile: use each image's intrinsic ratio (the `imageSize` helper exists) or a 4:5 crop with
     `object-fit: cover` for covers, so the field is not 40% empty.
   - `Work.tsx:94-96`: give the home flagship posts the visible label the case pages already have ("Posts I made").
     Today only an aria-label says so.
7. **Crop the case-page leads.** Dim 5 +0.3, dim 8 +0.3 (about +0.06). In `app/work/[slug]/page.tsx:70-75`, use the
   existing `crop-analytics.png` files as the lead for FanTV and Fere, and crop the BimaBTC, Novaswap, Prashan and Tony
   Roma's leads to the analytics panel without the X or Meta sidebar. Under 860px, show the crop where the claimed
   number is legible.
8. **Close the dead bands.** Dim 4 +0.4, dim 5 +0.2 (about +0.07). Cut `.v3-section` top padding about 40%. Set
   `.v3-offer-cta` to `align-self: start` (or sticky top) so it sits beside "A launch". Size the Method frame to the
   artefact (`.v3-method-fragwrap` without fixed min-height). Fill the flagship column below the caption or move the
   posts up into it. Target: desktop home under 10,000px.
9. **Fix Culturegram load and recordings.** Dim 9 +0.4, dim 5 +0.1 (about +0.03). Give the first compare image
   `fetchpriority="high"` and serve it through `next/image` (AVIF or WebP). Set the before and after videos to
   `preload="none"` until play. Re-encode `before.mp4` and `after.mp4` with the pointer masked. Target LCP under 2.5s
   on the throttled profile.
10. **Copy pass.** Dim 7 +0.3 (about +0.03). Clear `copy-lint.sh portfolio-v3/content/blog` for anything a post renders,
    starting with the em dash subtitle and the negative-parallelism stacks listed above. Keep the footer links on one
    line at 390, or let "X" join "LinkedIn".

If 1 to 10 land, expect about 8.3.

## Blocked on Karan

| Item | Why | Score it costs now |
|------|-----|--------------------|
| Testimonial lines from Prashan Agarwal, Mohaimina Haque, Shweta Shukla and Khushi (all agreed) | Named proof at the offer and the FAQ; every benchmark has it | about 0.2 (dim 2 +1.0, dim 3 +0.3) |
| What a buyer leaves the 30-minute call with, and an availability line ("taking 1 new project from November") | Makes the ask concrete; answers "what happens after I click" in full | about 0.07 (dim 3 +0.5) |
| facts.md (c) 13: which engine is live, or deploy the build that produced the 16 Oct sample | Settles fix 3 for good | about 0.05 |
| A public source for Fere's 7K+ daily active traders (the Product Hunt comment link, or a dashboard screenshot) | The 7K and 12K pair looks implausible without a source; LinkedIn says 400 to 500 DAU | about 0.04 |
| A domain email | The contact block sets a Gmail address at display size | about 0.03 |
| Tony Roma's status and dates (posts are dated 17 to 20 Oct 2026, the meta gives no tenure, the offer's "current clients" omits it); start dates for Bones & Burgers; dates for Novaswap's $800K+ window | Every case dated and consistent | about 0.03 |
| Why FanTV follows ran net negative from June to August 2025 (one line for the caption) | Turns a weak frame into an honest one | about 0.02 |
| A hero-grade portrait (`/karan.jpg` is 400x400 and sits at 52px) | A face at a real size in the first screen | about 0.03 |

## Reachable ceiling

Without the Blocked items: about **8.4**. Fixes 1 to 10 take positioning and conversion near 8.5 to 8.7, but proof
stays near 8.2 without testimonials and craft stays near 7.8 to 8.0 while the art direction remains the familiar dark
name-index portfolio. With the Blocked items: about 8.8 to 9.0. 9.5 needs all of that plus an art direction a design
director would call distinctive: the flow field carried into the work itself, and posts and analytics composed as
editorial spreads, not tiles.
