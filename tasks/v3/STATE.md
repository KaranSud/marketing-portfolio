# v3 state
Moved to Karan's local machine on 2026-10-15 at his request (no more cloud runs).
Phase: 3 critic loop (since 2026-10-16). Research done (research/*.md), PLAN.md and copy-deck.md written,
v3 home + /work/[slug] built on the taste-skill "dark room" direction (commit 79304e4). Taste inspector: 0 FAIL.
Round 01 scored 6.4 (v2 baseline 5.0); fixes in b27990b. Round 02 scored 7.3; its fixes in 09c21d7 (critic estimated 8.1 to 8.2 if all landed).
PAUSED 2026-10-16 to save Karan's usage: round 03 critic was stopped before scoring.
Karan answered the questions: tasks/v3/ANSWERS-2026-10-16.md. Batch 1 DONE (05791bd): positioning, offer, FAQ, facts, titles, dates.
Remaining batches (check usage before each; weekly was 86% on 16 Oct, resets 19 Oct 10:30 IST):
  2. DONE 21 Oct: Fere #1 Fintech not found (site keeps #2); Novaswap 3-month dates not found (undated); client logo
     row added under Ways to work; Calendly copy drafted in tasks/v3/CALENDLY-COPY.md for Karan to paste.
  3. DONE 21 Oct: 22 real posts (FanTV 3, Prashan 2, Fere 3, Novaswap 2, BimaBTC 3, Mohaimina 3, Tony Roma's 3,
     B&B 3) in lib/creatives.ts, shown on /work/[slug] ("Posts I made"), under the FanTV and Fere flagships, and in
     How I work (Reach: Novaswap, Trust: Prashan). Log: research/creatives-log.md. Not reached: The SportsRush
     (@thesportsrushus unavailable), Opaque Studio (2024 posts ~600 deep, IG API 429), Potters' Hub (no handle).
     Checks: tsc, build, copy-lint 0, taste inspector 0 FAIL (1 WARN, palette-cream, pre-existing).
     22 Oct: Opaque Studio added (3 posts, Mar and May 2024; total 25 posts, 9 accounts). SportsRush: @thesportsrushus
     gone, @thesportsrush is a dormant 2017 account, so screenshot only. Potters' Hub: handle still needed from Karan.
     Phone rule (375/414/768) now passes: workflows/phone-check.mjs (44px taps on text links and nav name, sticky
     hidden while the menu is open). Round-03 fixes are still uncommitted in the tree; on 22 Oct their two inspector
     fails were fixed (sticky hides over the index list, offer list and method controls; phone flagship cluster 40px
     below the caption). Full tree: inspector 0 FAIL, phone-check 0 FAIL. Commit the round-03 set once reviewed.
  4. History rewrite DONE 21 Oct: all 17 branch commits now Karan Sud <karansud98@gmail.com>, no Claude lines, tree
     unchanged; commit hashes changed (old tip kept as local branch backup/pre-history-rewrite). Remaining: critic round 03
     (fresh session, after the 5-hour reset), then force-push the branch once Karan approves.
Ceiling without Karan's input is about 8.4; 9+ needs the answers in QUESTIONS-FOR-KARAN.md.
Loop per workflows/critic.md until three consecutive 9.5+; round 01 judged about 0.9 points blocked on Karan.
Open for Karan: the 15 questions in research/facts.md (c) plus PLAN.md section 10 (prices, testimonials, headshot,
titles and dates); e6d6721 and four earlier branch commits carry the wrong author or a Claude line, and fixing them
needs a force-push he has not approved.

2026-10-16 15:27 IST: batch 2 skipped for usage (weekly window at 90%, stop line is 89%; resets 19 Oct 05:00 UTC). No steps run, no files changed.

2026-10-25 REWORK (Karan disliked round-03 site): plan = tasks/v3/REPLAN-2026-10-23.md (v2, elayadesign skills);
his answers at the bottom of ANSWERS-2026-10-16.md. Step 1 DONE (f268a7b): prototype at /preview (island nav,
hero over drifting post wall, word-by-word tagline, FanTV chapter with 24 posts and 3 videos, large view, 3 steps,
free-call close). Phone check 0 FAIL. Taste inspector on /preview: 3 FAIL that clash with the landing skill
(focal-point 48px headline, headline-lines on the tagline and on phones) plus pill-nav and side-scroll WARNs.
NEXT: Karan reviews /preview; then pull 20-25 posts per client with workflows/x-search-collect.js, x-pull.py,
post-media.py (IG: ig.py + grid scroll); curate only strong, creative, well performing reels and posts.

2026-10-25 FLOW (approved direction, Karan: "much better, i like it"): plan tasks/v3/PLAN-v4-2026-10-25.md.
/flow (commit cb7e826): name-led hero on a live CFD flow field, photo card, the turn (posts ride lanes),
v2 logo marquee unchanged, ten client streams (17-25 posts each, reels play, text cards for Prashan),
cards for SportsRush/Defx/Culturegram, built-things cards, night footer, phone menu, easyui-style call button.
Phone check 0 FAIL. NEXT: port the remaining easyui pieces (number morph, notification-stack testimonials,
morphing dialog, timeline, shooting stars), restyle case pages to Flow, make /flow the home page, critic round,
then a Vercel preview for Karan's phone. Posts per client are in portfolio-v3/data/posts/*.json.

2026-10-26: Flow is the home page (commit ad2e567). Case pages and 404 restyled to Flow; easyui pieces ported
(rolling digits, milestone notifications, morphing post view, timeline, shooting stars, FAQ accordion).
Vercel preview (project portfolio-v3, scope karansuds-projects, behind Vercel Authentication):
https://portfolio-v3-eliunndaf-karansuds-projects.vercel.app . Production (v2) untouched.
Phone check 0 FAIL on home, 4 case pages, blog. Taste inspector: 6 style FAILs that clash with the approved
anushriya-like look (headline lines, timeline date labels, emoji in real posts, FAQ dividers, outlined boxes).
Old home components (Hero, Work, Method, Offer, Tools, About, Faq, Contact, StickyCta) are now unused; left in place.

2026-10-26: blog index and posts in Flow (c576f78). Latest preview: https://portfolio-v3-9gwjklbyn-karansuds-projects.vercel.app (Vercel login). Whole site now in Flow.

2026-10-26: Vercel Authentication (SSO protection) turned OFF on project portfolio-v3 at Karan's request (vercel project protection disable portfolio-v3 --sso). Preview links are now public.
