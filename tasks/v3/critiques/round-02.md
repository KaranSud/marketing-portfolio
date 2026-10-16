# Critique round 02: portfolio-v3

Critic: independent, did not build. Judged 2026-10-16 from http://localhost:3300 as served (build on branch
`claude/portfolio-redesign-overhaul-8dsywo`, HEAD `b27990b`) and from source in `portfolio-v3/`. PLAN.md and
copy-deck.md were not read. Scores were set before reading `critiques/round-01.md`.

Shots (all in `tasks/v3/shots/rounds/r02/`): `home-*`, `home-motion-*`, `case-fere-*`, `case-culturegram-*`, `blog-*`
from `shot.mjs`, plus `probe-*` viewport shots from throwaway Playwright probes (real pointer, drag, keyboard and
scroll, no forced reveals). Measurements: desktop 1440x900 (also 1280x720, 1024x768, 1920x1080 for the hero);
mobile 390x844 at 4x CPU slowdown, 1.6 Mbps, 150 ms RTT, cache off (same profile as baseline.md and round 01).
`copy-lint.sh portfolio-v3/app portfolio-v3/components portfolio-v3/lib`: clean (exit 0). The same script on
`portfolio-v3/content/blog`: 69 hits.

## Score table

| # | Dimension | Weight | Score | Weighted | Evidence |
|---|-----------|--------|-------|----------|----------|
| 1 | Positioning clarity | 15 | 8.0 | 120.0 | Passes the 5-second test on desktop and phone: "You built the AI product. I find the people who use it." plus "Growth and content marketing for AI and crypto products, as a project or as part of your team. I build software too.", a face beside the one button, three proofs, and the name at display size (`Hero.tsx:21-26`, `probe-hero-pointer.png`, `probe-m-first-viewport.png`; holds at 1280x720 and 1024x768, `probe-hero-1280x720.png`). The field now carries a meaning ("Before marketing I was a CFD engineer", `Hero.tsx:17`). Held back: the promise says "AI product" while two of three hero proofs are crypto (FanTV SocialFi, Defx perps DEX); "I build software too" is a tag-on sentence, so the builder angle is stated, not shown, until the Tools section 6,000px down; the face is 52px (`v3.css` `.v3-hero-face`). |
| 2 | Proof and credibility | 15 | 7.0 | 105.0 | Every hero and flagship number traces to facts.md (a) or a KP row in (b), with the required context ("with airdrops and a 100+ KOL program", "I helped it get there", dates on Fere). Real analytics run large on the page, and the FAQ answers "Where do the numbers come from?" honestly (`faqs.ts:23-25`). Held back: (1) the page contradicts itself in Tools: the card says the engine "Reads a company's homepage, about and pricing pages" (`Tools.tsx:10`) while the sample beside it says "Sources: Wikipedia / Wikidata: Aspen Dental, Google News" and shows a "90 fit" score (`data/sample-brief.json:6,14`, `home-desktop-05.png`); facts.md lists the fit score and the Wikidata feature list as CONFLICT with the live engine, and the sample adds non-facts.md numbers ("1100+ locations") to the page. (2) The Revenue stage pairs "₹20,000" with a Facebook insights frame whose visible content is an empty "Viewers --" telescope state, 47 interactions and 626 link clicks (`Method.tsx:52`, `probe-method-revenue-desktop.png`); the artefact does not support the claim. (3) The FanTV inset's largest figure is "4.2K" verified followers, not the 297.7K the caption promises ("Inset: the account at 297.7K followers", `Work.tsx:31,36-42`, `home-desktop-01.png`). (4) `/tools` is still in the sitemap (`app/sitemap.ts:37`) and sells "A 0 to 100 fit score" and "every number in it is real" in the v2 skin (`probe-page-tools.png`). No testimonials and no logo row anywhere (Blocked). |
| 3 | Conversion path | 15 | 7.5 | 112.5 | One action, one label, everywhere: nav, hero, after the flagships, offer, case ends, blog post ends, contact, mobile sticky. Calendly opens in place and the page does not navigate (`probe-calendly.png`). What happens next is said twice (hero note, FAQ). The new "Ways to work together" gives four engagement shapes with proof (`Offer.tsx:5-26`). Sticky behaviour is sensible: off over the hero, on through Work, Method and Ways, off over tool cards and contact (probe log). Held back: no terms at all (availability, length, price floor) so the ask is still a cold 30-minute call (Blocked); the not-ready visitor gets nothing but "keep reading" and a blog whose index has no closing CTA block (`app/blog/page.tsx:36-48`, `blog-mobile-05.png`); the offer rows name their proof ("As for Fere AI and Novaswap") without linking to it; contact is a Gmail address set at display size (Blocked). |
| 4 | Narrative journey | 10 | 7.0 | 70.0 | The story is complete now: claim, proof, how, offer, the builder, who, objections, act (`app/page.tsx:19-26`). Held back: the page did not get shorter. Desktop 11,119px (v2 10,086px, r01 11,367px), mobile 15,519px (r01 14,472px, baseline target under 8,000px). Work is 3,834px and Tools 2,127px on desktop (probe). Repetition moved instead of going away: three of the four Method images are the same files the index shows a screen earlier (SportsRush reels, `Novaswap.png`, `Potters' Hub_1.png`: `Method.tsx:16,28,52` vs `Work.tsx:144`; on mobile both render, `home-mobile-03.png` then `home-mobile-04.png`). SlouchGuard, a posture app with no numbers, takes a full 1000px viewport in a site about finding users for AI products (`Tools.tsx:77-82`, `v3.css:466`). |
| 5 | Visual craft and originality | 15 | 7.0 | 105.0 | A real direction and it holds across pages: one dark field, square corners, two faces, no mono labels, a display-size lowercase name over the flow field, a hover index of names, a cream contact block; the blog and case pages now share it (`home-desktop-01.png`, `blog-desktop-01.png`, `case-fere-desktop-01.png`). What stops a design director: all three flagship visuals are cut through the screenshot's own UI text at the left edge ("ome", "xplore", "otifications" on Fere; half the "Audience" tab and "Replies" on FanTV; "TVL x" and a sliced question chip on Defx), and Defx is upscaled 1.55x so its text goes soft (`Work.tsx:53`, `home-desktop-02.png`); the SlouchGuard card leaves 182px of empty cream under its button and sits on a darkened, zoomed screenshot whose fourth stat card is cut to "In / Tr" (`v3.css:476`, `probe-slouch-clean.png`); headings ghost through the 94% nav (`v3.css:108`, `probe-anchor-method.png`); on phones every case-page hero letterboxes a wide screenshot into a 4:5 box with ~130px dead bands and unreadable text (`v3.css:712`, `probe-m-case-fere-hero.png`); the Culturegram recordings show the mouse cursor (`case-culturegram-desktop-03.png`); `/tools` and `/samples` still run the v2 template (gradient accent words, mono kickers, 01 to 04 numbered cards, rounded cards, a Cloudflare challenge page as a "Fere AI Blog" thumbnail: `probe-page-tools.png`, `probe-page-samples.png`). Originality: well made and restrained, but the dark minimal portfolio with a name index is a familiar look; the flow field is the one idea nobody else has. |
| 6 | Interaction design | 10 | 7.0 | 70.0 | The hero field reacts to the pointer with laminar flow around it and pauses, throttles and freezes correctly (canvas alpha sum 85,363 idle to 110,039 under the pointer; still frame under reduced motion; `HeroField.tsx`). The Method range drags, keys and taps through four stages, each with its own artefact and number (`probe-method-reach-desktop.png`, `probe-method-revenue-desktop.png`). The index preview follows pointer and focus (`probe-index-hover-desktop.png`). Calendly opens in place. Held back: Method is still a four-tab switcher dressed as a slider (nothing accumulates as you drag); on phones the changed headline and number land below the controls and under the sticky bar, so a tap appears to change only the picture (`probe-m-method-trust.png`); the Tools brief is a static block with no way to try or expand anything on the page; the hero tells phone users to "Move your pointer" (`Hero.tsx:17`, `probe-m-first-viewport.png`). |
| 7 | Copy | 10 | 7.0 | 70.0 | Site copy is lint clean, first person, specific and mostly sounds like a person ("Or keep reading. Ten more projects below.", "Tell me which of these fits, or what you need instead."). Held back: the most machine-sounding text on the home page is the sample email, which uses the banned "streamline" plus "That's a smart move" and "a huge undertaking" (`data/sample-brief.json:11`, `home-mobile-05.png`); `/blog` shows em dashes in 8 visible excerpts and 38 Title Case titles in one repeated pattern ("AI Content Marketing's Performance Gap (And How to Close It)", `blog-desktop-01.png`; 69 lint hits in `content/blog`); case metas read like status notes ("Dates not shown", "No screenshot", `caseStudies.ts:330,381`); "A SocialFi app for creators with a quiet feed" reads as a product feature (`Work.tsx:45`); the Defx frame wobbles between "I helped it get there" (hero) and "Defx has since passed $1.5B" (`Work.tsx:57`); "let us talk" (`app/blog/[slug]/page.tsx:102`). |
| 8 | Mobile | 5 | 7.0 | 35.0 | Designed for 390px: no horizontal scroll, CTA in the first viewport, hero reorders, index rows carry their own media, Method reorders, sticky is thumb-reachable and hides at the right places; only 3 targets under 44px and all are inline text links (probe). Held back: 15,519px tall; case-page heroes letterbox (`probe-m-case-fere-hero.png`); the flagship 4:5 crops make the analytics unreadable (`home-mobile-01.png`, `home-mobile-02.png`); Method feedback lands below the fold; "Move your pointer" on a touch screen; footer "X" wraps alone onto its own line (`home-mobile-07.png`). |
| 9 | Accessibility + performance | 5 | 8.5 | 42.5 | Mobile throttled LCP 0.80s on the home h1 and 0.76s on the Fere lede; CLS 0.000 on both; long tasks over 50ms sum to ~1ms; 189KB JS transferred. Every case is a real link; tab order is logical through hero, cases, index, range, stops, offer, tools, about, contact and footer with a visible 2px outline; skip link; labelled range with `aria-valuetext` and `aria-live`; `aria-pressed` stops; sticky is inert when hidden; reduced motion gives a still canvas, paused videos and transform-free reveals; contrast 8.3:1 muted body, 4.9:1 inactive index names, 8.0:1 inverse muted. Held back: the nav mark is opacity 0 at the hero but still focusable, so Tab lands on an invisible link (`v3.css:118`, tab log); the "How I work" anchor parks its H2 at y=0 under the 68px fixed nav (`probe-anchor-method.png`). |
| | **Overall** | 100 | | **7.3** (730.0 / 100) | v2 baseline 5.0, round 01 6.4. |

## Round 01 fixes: what landed

| r01 fix | Status |
|---------|--------|
| 1 Truthful claims and honest crops | Mostly landed: Fere chronology, FanTV context, FAQ rewrite, FanTV fake before/after removed, Defx out of the TVL block. Not landed: crops still cut through UI text on all three flagships. |
| 2 Offer section | Landed as "Ways to work together" (terms Blocked). |
| 3 Tools without fake controls | Landed (real saved brief), but the sample now contradicts the card copy and carries the most AI-sounding text on the page. |
| 4 Repetition and dead space | Partial: thumbs on Defx and Fere removed, footer and contact trimmed. Method now repeats three index images; mobile got 1,047px longer. |
| 5 Hero builder line, face, field caption, email link, bigger statement | Landed. |
| 6 llms.txt, OG and Twitter images, sitemap | Landed except `/tools` (still in the sitemap with CONFLICT claims). |
| 7 Case pages to the v3 standard | Landed (tags, captions, dialog semantics with focus trap, Culturegram slider first). The FanTV-style `object-fit: contain` fix now letterboxes on phones. |
| 8 Method labels and artefact size | Landed. Still a tab switcher. |
| 9 Blog reskin, H1, sticky, post CTA | Landed except a CTA block on the index and the copy inside the posts. |
| 10 Contrast and load | Landed (index 0.5, inert sticky, server-painted case LCP, framer-motion out of the layout, video autoplay guarded, globals.css 4,269 to 2,247 lines). |
| 11 Mobile targets and first screen | Landed. |
| 12 Copy polish | Landed. |

Regressions this round: mobile length (+1,047px); Method and index now show the same three files; the Tools
sample contradicts its card; SlouchGuard card with 182px of empty cream; the touch-screen "pointer" instruction.

## Ranked fix list (builder)

Gains are estimates on the overall score (weight x dimension change / 100).

1. **Make the Tools section agree with itself and sound like Karan.** Dim 2 +0.5, 7 +0.5, 1 +0.2, 5 +0.2 (about +0.19).
   - `data/sample-brief.json` and `components/Tools.tsx:10,57-59,72`: re-run the live engine on a company Karan actually
     sells to (an AI product or AI dev tool, not a dental chain) with an offer in his words (for example "Launch content,
     KOL programs and community for AI products"). Save the run verbatim. Reject any run whose email uses copy-lint
     vocabulary or stock lines ("smart move", "must be a challenge", "huge undertaking"); run again until one is clean.
   - Then make the card describe exactly what the sample shows. If the live engine reads homepage, about and pricing
     pages and has no fit score (facts.md "Things he built"), delete `.v3-brief-fit` and make `sources` list those pages.
     If it really outputs Wikidata and a fit score, rewrite `Tools.tsx:10` to say so. The card and the brief must never
     disagree on screen.
   - Retire the v2 leftovers: drop `/tools` from `app/sitemap.ts:37` and either redirect `/tools`, `/samples`, `/crm`
     to `/#tools` in `next.config` or add `robots: { index: false }` to their metadata. `/tools` claims a fit score and
     "every number in it is real"; `/samples` shows a Cloudflare challenge page as the Fere AI Blog thumbnail.
2. **Cut the page to its story and stop repeating artefacts.** Dim 4 +1.0, 8 +0.8, 5 +0.3 (about +0.19).
   Target: desktop 9,000px or less, mobile 10,000px or less, and no image file shown twice on the home page.
   - Mobile index: at 860px and below, stop rendering `.v3-index-inline` (`v3.css:381`); show name and kind only, 44px+
     rows. This alone saves roughly 2,500px and removes the duplicate SportsRush, Novaswap and Potters images.
   - Desktop: either give Method artefacts no other home-page appearance (see fix 5 for Revenue) or pass `image: null`
     to the index for any key Method already shows (`Work.tsx:139-147`).
   - SlouchGuard: replace the full-viewport `.v3-tool-photo` (`Tools.tsx:77-82`, `v3.css:466-476`) with a compact row
     under the engine (name, one line, "See SlouchGuard"), or at minimum set `min-height: 0` on its card and crop the
     screenshot so no stat card is cut. It currently costs ~1,000px for the least relevant item on the page.
   - Engine brief on phones: show company, summary and email subject; put the rest in a `<details>` "Read the full brief".
   - Mobile rhythm: `.v3-section` and `.v3-method` top spacing to about 72px at 860px and below (`v3.css:253,388`).
   - FAQ: drop "How fast do you reply?" (said in the hero and at contact) and merge the freelance and full-time answers.
3. **Crop screenshots as compositions, not accidents.** Dim 5 +0.5, 8 +0.5, 2 +0.2 (about +0.13).
   - Flagships (`Work.tsx:27-72`, `v3.css` `.v3-case-visual`): the bleed off the left page edge slices each screenshot's
     own UI labels. Start each crop at a whole UI block (Fere: begin at the "Analytics" panel edge so the X sidebar is
     either whole or gone; FanTV: begin at the chart panel; Defx: keep the chart and the right axis, zoom 1.1 at most so
     the text stays sharp).
   - FanTV inset: crop `FanTV X Mobile SS.png` to the profile header where 297.7K followers is the largest figure, or
     drop the inset and its caption (`Work.tsx:31,36-42`). Today the biggest number in it is 4.2K.
   - Case heroes on phones (`v3.css:712`): replace `aspect-ratio: 4 / 5` with the image's intrinsic ratio (the
     `imageSize` helper already exists) so a 16:9 screenshot is not letterboxed with ~130px dead bands.
4. **Make the blog a secondary path a buyer would trust.** Dim 7 +0.7, 3 +0.3 (about +0.12).
   - Fix the 8 post descriptions with em or en dashes (they render on `/blog`) and move titles to sentence case in the
     frontmatter (slugs stay). Run `copy-lint.sh portfolio-v3/content/blog` and clear it, or at least everything the
     index renders.
   - `app/blog/page.tsx`: lead with the three posts about building the outbound engine (the builder proof), and end the
     list with the same `.v3-casepage-next` block the posts use.
5. **Pair each Method number with an artefact that shows it.** Dim 6 +0.5, 2 +0.3 (about +0.1).
   - Revenue (`Method.tsx:52`): swap `Potters' Hub_1.png` (empty-state telescope, 47 interactions) for
     `Potters Hub_3.png` cropped to "Top content by views", which shows the real reels; caption it with its dates.
   - Phones: put the clause and number above the image (`v3.css:452-454` order), so a tap visibly changes the words the
     visitor is reading, and keep the sticky hidden while `.v3-method-controls` is on screen.
   - Optional, higher value: let the stages accumulate (each stop keeps the previous numbers on screen as a small
     running ledger) so dragging shows a system building up rather than a tab swap.
6. **Fix the nav at anchors and at the hero.** Dim 9 +0.7, 5 +0.1 (about +0.05).
   - Add `main [id] { scroll-margin-top: 96px; }`; the "How I work" link lands its H2 under the nav.
   - `.v3-nav.is-solid` (`v3.css:108`): use `var(--bg)` at full opacity so headings stop ghosting through.
   - `.v3-nav.at-hero .v3-nav-mark` (`v3.css:118`): add `visibility: hidden` so Tab skips the invisible link.
7. **Copy fixes.** Dim 7 +0.4 (about +0.04).
   - `Hero.tsx:17`: under `(hover: none)` say "Tap the field." instead of "Move your pointer through the flow."
   - `caseStudies.ts:330,381`: drop "No screenshot" and "Dates not shown" from the metas (the FAQ already covers Opaque).
   - `Work.tsx:45` and `caseStudies.ts:52`: replace "with a quiet feed" with the start state in plain words.
   - Pick one Defx frame across hero, flagship and case (`Hero.tsx:8`, `Work.tsx:57`, `caseStudies.ts:89,92,107`):
     "helped Defx reach $1.5B in cumulative perp volume" everywhere.
   - `app/blog/[slug]/page.tsx:102`: "let us talk" to "let's talk".
8. **Give the not-ready visitor one step and link the offers to their proof.** Dim 3 +0.4 (about +0.06).
   - `Offer.tsx:9-24`: make each proof line a link to its case ("As for Fere AI" to `/work/fere`).
   - At `.v3-work-close` and in the contact foot, add one quiet secondary line next to the button ("Not ready? Read how
     I built my outbound engine" to the builder posts, or "Follow on LinkedIn"), never a second button.
9. **Re-encode the Culturegram recordings without the cursor.** Dim 5 +0.1 (about +0.02). `public/Results/Culturegram/before.mp4`,
   `after.mp4`: crop or mask the pointer, or lead with the stills and keep video behind the play button.

If all nine land, expect about 8.1 to 8.2.

## Blocked on Karan

| Item | Why it matters | Score it costs now |
|------|----------------|--------------------|
| 2 or 3 named testimonials with name and title (Prashan Agarwal, a Crowwd Labs lead, Shweta Shukla, someone at Tony Roma's) | Proof at the decision points; every benchmark has them | about 0.2 (dim 2 by 1.0, dim 3 by 0.3) |
| Offer terms: availability line, typical length, a price floor or "projects from", and which comes first (freelance or full-time) | Turns a cold call request into a known purchase; lets the hero name the engagement | about 0.15 (dim 3 by 0.7, dim 1 by 0.3) |
| Real creatives (posts, threads, KOL briefs, contest posts, launch assets) for Fere, Defx, Novaswap, FanTV. The `FanTV/creatives` folder holds analytics, one showing follower losses, not creatives | Lets Method and the flagships show the work itself, which is the strongest originality lever left | about 0.11 (dim 5 by 0.3, dim 6 by 0.3, dim 2 by 0.2) |
| Client logos with permission for a legible row near the offer | Recognisable names at a decision point | about 0.05 |
| Crypto stance (facts.md (c) 12): sell to crypto teams or show crypto only as context | Resolves the "AI product" promise versus crypto-heavy proof in the hero | about 0.05 |
| facts.md (c) answers: dates for Opaque, Culturegram and Bones & Burgers; a Defx active-traders screenshot; an Opaque screenshot; the engine's current behaviour (c) 13 | Every case gets dates and a matching artefact; settles fix 1 for good | about 0.05 |
| A domain email, and a Calendly event description plus one intake question | Trust at the moment of booking | about 0.05 |
| A hero-grade portrait (current `/karan.jpg` is 400x400) | Lets the face sit at a real size in the first screen | about 0.03 |

## Reachable ceiling

Without the Blocked items the most this site can score is about **8.4**: positioning and craft can reach 8.5, but proof
stays near 8 without testimonials, logos and creatives, and conversion stays near 8 without terms. With the Blocked
items answered and one more originality pass (creatives in the flagships, an accumulating Method), 9.0 to 9.2 is
realistic. 9.5 needs all of that plus art direction a design director would call distinctive, not only well made.
