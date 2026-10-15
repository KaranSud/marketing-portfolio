# Facts: career fact base for portfolio-v3

Lane: facts. Written 2026-10-16. Every number on v3 must appear in table (a) or carry a status of KP or better in (b).

**Decision.** Rebuild the hero numbers. Three of the four v2 hero tiles fail a check against Karan's own public
LinkedIn or his own proof screenshots: Fere AI "7K+ daily active traders" and "12K+ AI signups" conflict with his
LinkedIn, and "300K+ followers grown" overstates a 297.7K end count. Headline the 12 numbers in (a) instead. Each one
matches across sources or is visible on a public page or an analytics screenshot. Hold everything marked CONFLICT
until Karan answers (c).

**Status key.** VP = verified-public (URL given). KP = Karan-provided (his site copy or LinkedIn, not independently
checkable). KP+shot = KP and visible in his own analytics screenshot in `portfolio-v2/public/Results/` (already
public on v2). CONFLICT = sources disagree (both shown). NEEDS KARAN = missing or ambiguous.

**Source shorthand.** `cs` = `portfolio-v2/lib/caseStudies.ts`. `shot` = `portfolio-v2/public/Results/<case>/<file>`.
`LI-exp` = his LinkedIn experience page, linkedin.com/in/karansud-marketing/details/experience (read 15 Oct 2026 via
Chrome; WebFetch gets HTTP 999). `LI-post` = his own LinkedIn post of 15 Oct 2026 (the "12,000+ signups" post).
`fx` = api.fxtwitter.com profile read on 15 Oct 2026. All fetches are in `research-log.md` under lane "facts".

## (a) Safe to headline

| # | Approved wording | Client | Source | Status |
|---|---|---|---|---|
| 1 | Took FanTV AI's X account from 70K to nearly 300K followers in 11 months | FanTV AI | cs:93; shot FanTV/FanTV X Mobile SS.png (297.7K); LI-exp | KP+shot |
| 2 | Helped Defx reach $1.5B in cumulative perp volume, public on DefiLlama | Defx | shot Defx/Defx.png (DefiLlama, $1.529b); defillama.com/protocol/defx; LI-exp wording | VP |
| 3 | 6.8M X impressions for Fere AI in 8 months | Fere AI | shot Fere AI/Fere AI.png (1 Sep 2025 to 27 Apr 2026); cs:176 | KP+shot |
| 4 | Fere AI launched to #2 Product of the Day on Product Hunt | Fere AI | producthunt.com/products/fere-ai (badge: #2 of the day, 17 May 2026); LI-exp | VP |
| 5 | 1.2M+ organic impressions in six months for Mohaimina Haque, Tony Roma's first female CEO | Mohaimina Haque | cs:396, 411; LI-exp; CEO facts: fsrmagazine.com, fermag.com | KP (CEO facts VP) |
| 6 | 678.5K organic Facebook views for Tony Roma's in eight months, top post 130.1K | Tony Roma's | shot Tony Roma's/TR_FacebookContent.png (1 Sep 2025 to 27 Apr 2026, 0 from ads) | KP+shot |
| 7 | Grew The SportsRush Instagram from 26 to 4,500 followers in three months, with reels at 4M and 2M views and no ad spend | The SportsRush | cs:591 to 593; shot Sportsrush/Sportsrush Viral Reels.png; LI-exp | KP+shot |
| 8 | Month one for Potters' Hub: ₹20,000 in revenue from ₹3,500 of Meta ads, a 471% return | Potters' Hub | cs:426, 457; LI-exp | KP |
| 9 | 1.1M X impressions and 53.9K engagements for Novaswap, on an account opened in November 2025 | Novaswap | shot Novaswap/Novaswap.png (1 Nov 2025 to 27 Apr 2026); fx (created 5 Nov 2025) | KP+shot |
| 10 | Grew FanTV founder Prashan Agarwal's X from 12K to over 90K followers | Prashan Agarwal | cs:142; fx (93,181 today) | KP start, VP end |
| 11 | Built FanTV's Discord and Telegram to 150K+ members | FanTV AI | cs:95; LI-exp | KP |
| 12 | 4X ROAS on ₹3L a month of ad spend for Opaque Studio | Opaque Studio | cs:549; LI-exp | KP (no screenshot; case page, not hero) |

Rules for these: keep the money context on #8 (the 471% is on a ₹3,500 spend, so it cannot sit alone as "peak
campaign ROI"); always write "helped" on #2; keep "airdrops and a 100+ KOL program" next to #1 and never call it
organic (the X analytics show most of the gain in a January 2025 airdrop window, shot FanTV_Web3.png).

## (b) Full claim table

### FanTV AI (Social Media Marketer per site; Oct 2024 to Aug 2025)
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| X followers | 70K to 300K | cs:57, 60, 74, 93; Hero.tsx:49; LI-exp | KP+shot | Screenshot shows 297.7K. Gain is concentrated in Jan 2025 (reposts peak near 260K a day, shot FanTV_Web3.png) |
| "300K+ Followers grown" tile | 300K+ | HeroVisual.tsx:10 | CONFLICT | End count 297.7K; net gain about 228K. Label overstates |
| Impressions in 6 months | 12M+ | cs:76, 93 | CONFLICT | Screenshot shows 12M (no date range visible); LI-exp and LI-post say 9.5M+ |
| Monthly active users | 1.5M+ / "1.5 to 2M" | cs:57, 59, 73, 94 | VP number, CONFLICT on attribution | sui.io/blog/fantv-creator-economy-video cited about 1.5M MAU on 19 Nov 2024, a month after he joined. Not his result |
| Community | under 1K to 150K+ | cs:61, 75, 81, 86, 95; Hero.tsx:50; Services.tsx:19 | KP | LI-exp says "from zero". Minor |
| Community retention | +70% | cs:78, 95 | KP | Metric undefined; LI-exp "70% retention growth" |
| KOL program | about 10 to 100+ | cs:77, 86, 96 | KP | |
| Team | 100+ distributed | LI-exp | KP | Not on site |
| Ad budget | ₹45 to 50L a month | cs:88, 97 | KP, NEEDS KARAN | Former employer's spend; confirm it can be public |
| Role title | Social Media Marketer | cs:69 | CONFLICT | LI-exp: Social Media Marketing Manager. Dates match LI-exp |

### Prashan Agarwal (executive brand, run alongside FanTV)
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| X followers | 12K to 100K | cs:111, 113, 126, 142; LI-exp | CONFLICT | fx shows 93,181 today. Use "over 90K" unless a 100K screenshot exists |
| LinkedIn followers | 5K to 10K | cs:114, 128, 143; LI-exp | KP | |
| Impressions on his card | 12M+ | cs:115, 129 | CONFLICT | cs:144 says this is FanTV's program total. Double counted |
| Duration | 10 mo | cs:130 | CONFLICT | cs:124 gives Oct 2024 to Aug 2025, 11 months |
| Founder FanTV, ex-CEO Gaana | | cs:120, 133 | VP | His X bio (fx) |

### Fere AI (Sr. Content Manager, Crowwd Labs)
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Daily active traders | 7K+ | cs:157, 160, 172, 193; HeroVisual.tsx:8; llms.txt:15 | CONFLICT | Fere's own Product Hunt comment: "7,000+ daily users" (hunted.space/dashboard/fere-ai). LI-exp: 400 to 500 DAU, about 7k MAU |
| Signups | 12K+ | cs:161, 175, 195; HeroVisual.tsx:9; faqs.ts:14; llms.txt:15 | CONFLICT | LI-exp: 300K+ signups. LI-post: 12,000+ "with zero paid budget", while cs:187 lists paid acquisition campaigns |
| Agent executions | 10M+ | cs:160, 173, 194; llms.txt:15 | VP (company-sourced) | Fere's Product Hunt comment. A platform metric, not his |
| Automated strategies | 90+ | cs:174, 193 | NEEDS KARAN | The Product Hunt comment says agents were "live 90+ days". Possible mix-up |
| X impressions | 6.8M | cs:176, 195 | KP+shot | 1 Sep 2025 to 27 Apr 2026 |
| X engagements | 195K+ | cs:195 | CONFLICT | Screenshot: 192.4K. Use 192K |
| Product Hunt | #1 Fintech, Top 2 overall | cs:157, 177, 186, 196; FeatureStory.tsx:34; llms.txt:15 | #2 VP; #1 Fintech unverified | Public badge: #2 of the day, 17 May 2026. No category rank found; LI-exp says #2 only |
| Email converted first paying users | | cs:189, 197 | KP | |
| Team | 5 | cs:190 | CONFLICT | LI-exp: team of 6 across all Crowwd brands |
| Dates | Sep 2025 to Present | cs:169 | CONFLICT | LI-exp: Crowwd Labs Sep 2025 to May 2026 |

### Novaswap
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Organic trading volume | $650K+ in 90 days | cs:206, 208, 222, 237; llms.txt:18; LI-post | CONFLICT | LI-exp: $800K+ in 3 months. DefiLlama blocked to WebFetch |
| X impressions, engagements | 1.1M, 53K+ | cs:209, 223, 224, 238 | KP+shot | Screenshot: 1.1M, 53.9K, 4.7% rate |
| Profile visits | +19,000% | cs:210, 225, 239 | NEEDS KARAN | Screenshot shows 9K visits total; the account opened 5 Nov 2025 (fx), so the base is near zero. Drop |
| Built from nothing | | cs:206, 228 | VP-consistent | Account creation date (fx) |
| Dates | Sep 2025 to Present | cs:219 | CONFLICT | LI-exp ends May 2026; X account starts Nov 2025 |

### Defx
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Monthly volume | under $100K to $50M+ | cs:248, 250, 263, 269, 278; faqs.ts:14; llms.txt:17; LI-exp | CONFLICT | The DefiLlama chart in his own screenshot shows roughly $2.5M to $4M daily perp volume in Jun to Sep 2025, before he joined (read by eye from the right axis) |
| Cumulative volume | $1.5B+ | cs:252, 264, 280; llms.txt:17 | VP | DefiLlama $1.529b. Includes volume from Dec 2024 and after Jan 2026; by eye, about half falls in his window. Say "helped reach" |
| Active traders | 40 to 50 to 300 to 350 | cs:251, 265, 269, 279 | KP | Card rounds to "50 to 350" |
| Trading contests | 2 (one with Voltrade) | cs:266, 273 | KP | |
| Dates | Sep 2025 to Jan 2026 | cs:260 | KP | Inside the Crowwd dates on LI-exp |

### BimaBTC
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| X impressions | 2.3M | cs:291, 305, 320 | CONFLICT | His screenshot (1 Sep 2025 to 27 Apr 2026): 1.9M |
| Engagements | 58K | cs:306, 320 | CONFLICT | Screenshot: 30.5K |
| Engagement rate | 2.4% | cs:289, 293, 307, 321 | CONFLICT | Screenshot: 1.6% |
| Followers | 144K | cs:289, 292, 308, 321 | CONFLICT | Screenshot 145.2K; fx today 125,562. This is account size, not a result. The follows chart shows net losses most days, so "organic growth" (cs:322) is unsupported |

### Tony Roma's (brand content; locations are partner franchises)
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| "53-year-old global chain" | 53 | cs:331, 353 | CONFLICT (stale, risky) | Founded 1972 (2024 press called it a "52-year-old startup"), so 54 now. "Global chain" reads as if he ran the chain. Write "Tony Roma's, the ribs brand founded in 1972" and "launches for partner-franchise locations" |
| Facebook views, organic | 729K | cs:333, 347, 362; llms.txt:19 | CONFLICT | Screenshot: 678.5K, 0 from ads. LI-post: 728,000 |
| 3-second views | +448% | cs:334, 348, 362; llms.txt:19 | CONFLICT | Screenshot: +371.3% |
| Interactions, watch time | +76%, +386% | cs:362 | CONFLICT | Screenshot: +135.1%, +339.3% |
| Instagram | 305K views, +14% reach, +100% interactions | cs:335, 349, 363 | CONFLICT | Screenshot TR_Instagram.png: 289.0K views, reach +52.7%, 6.1K interactions |
| Top post | 130,100 views | cs:350, 364 | KP+shot | Screenshot: 130.1K |
| Kimball, Tennessee launch | | cs:358 | KP+shot | Oct 2025 launch posts in screenshot |
| CEO account | 6,000+ followers | cs:364 | KP+shot | Screenshot 6,519. No start count, so not "grew" |
| Dates | Jan 2025 to Present | cs:344 | CONFLICT | LI-exp: Tony Roma's work began at Mach1 (Mar 2024); independent work ends Aug 2026 |

### Mohaimina Haque
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Organic impressions, $0 paid | 1.2M+ in 6 months | cs:380, 382 to 384, 396 to 399, 411; LI-exp | KP | No impressions screenshot |
| Tony Roma's first female CEO | | cs:353, 402 | VP | fsrmagazine.com, fermag.com; permanent CEO Aug 2024 (restaurantdive.com) |
| Dates | Oct 2025 to Apr 2026 | cs:393 | KP | Also listed inside the Tony Roma's card (cs:331); same client counted twice |

### Potters' Hub
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Month-one ROI | 471% (₹20,000 from ₹3,500) | cs:426, 428, 442, 457; Hero.tsx:51; HeroVisual.tsx:11; Services.tsx:23; faqs.ts:14; llms.txt:20; LI-exp | KP | Math holds: (20,000 minus 3,500) / 3,500 = 471%. Revenue over ad spend, not profit. Safe only with the spend shown |
| Monthly revenue after | about ₹15K | cs:458; LI-exp | KP | |
| Views, reach, top reel, non-followers | 243K in 90 days, +190%, 104K, 95.8% | cs:429, 430, 443 to 445, 454, 459; LI-exp | KP | Screenshots I checked show 1.0M Facebook views (Jan to May 2025) and an Instagram top reel of 57.9K; none shows 104K |

### Bones & Burgers (LI-exp names it "Tony Roma's Bones & Burgers")
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Interactions, watch time, 3-sec views, FB views | +160%, +287%, +359%, +79% | cs:475 to 477, 489 to 492, 504 to 506 | KP | B&B screenshots show Instagram views and audience (1,118 followers), not these |
| Dates | Jan 2025 to Present | cs:486 | CONFLICT | Same as Tony Roma's |

### Opaque Studio
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| ROAS at spend | 4X at ₹3L a month | cs:519, 521, 523, 534, 535, 549; Services.tsx:23; LI-exp | KP | No screenshots (cs:553) |
| Instagram | 30K to 41K (+37%) | cs:522, 536, 550; LI-exp | KP | Math holds (36.7%) |
| 700+ artisans | | cs:540 | VP | opaquestudio.in |
| Role, dates | Performance & Social Marketer, none | cs:531 | CONFLICT | LI-exp: Account Manager, Mach1 Digital, Mar to May 2024 |

### The SportsRush
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Followers, ad spend | 26 to 4.5K in 3 months, $0 | cs:560, 563, 564, 578, 579, 593; llms.txt:21; LI-exp | KP | |
| Total views | 7M+ | cs:562, 576, 592; LI-exp | KP | |
| Viral reels | 4M and 2M | cs:560, 577, 591 | KP+shot | |
| Brand name | "The Sportrush" | cs:559; Brands.tsx:22 | CONFLICT | The brand is The SportsRush (LI-exp) |
| Role | Content Strategist | cs:572 | CONFLICT | LI-exp: Social Media Manager. Dates Jun to Sep 2024 match |

### The Culturegram
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Content shipped | 5 episodes, 3 essays, 13 illustrations, 1 report (9 pieces) | cs:605, 615 to 618, 626 | NEEDS KARAN | Public homepage shows one Season 1 episode plus a Season 2 teaser, two essays by Shweta Shukla, one report. Say "published", not "wrote" |
| Ground-up Ghost redesign, hand-coded theme | | cs:601, 625 | KP+shot | Before and after video on v2 |
| Dates | none | cs:611 | NEEDS KARAN | |

### Site-wide and profile
| Claim | Number | Source | Status | Notes |
|---|---|---|---|---|
| Brand count | 15+ brands | HeroVisual.tsx:25 | CONFLICT | cs has 13 entries (11 businesses, 2 executives); marquee shows 10 (Brands.tsx:9 to 23); LI-post says "10+ brands" |
| Engagements | Thirteen | Work.tsx:88 | KP | Count is right, but Tony Roma's, Bones & Burgers and Mohaimina are one client group, and four cases sit under one employer (Crowwd Labs) |
| Industries | eight | Brands.tsx:64 | CONFLICT | faqs.ts:10 and llms.txt:24 list seven |
| Experience | 5+ years | layout.tsx:33; llms.txt:3; Skills.tsx:80 | KP, NEEDS KARAN | LI-exp: freelance writing Jan 2020 to Nov 2021, CFD engineering Apr 2022 to Jun 2023, agency marketing from Nov 2023. "5+ years" holds only if the 2020 writing counts |
| Mechanical engineer by degree | | BRIEF | KP | LI-exp shows engineering internships (2020 to 2021) and a CFD engineer role; the education section did not render |
| Location | Noida, India | LinkedIn profile | VP | |
| Current employer | none shown | LI-exp; X bio (fx) | NEEDS KARAN | No current role listed on either profile. He reposts Cyberwave, but no public role confirms it |
| LinkedIn URL | /in/karansud7 | Contact.tsx:115, 121; JsonLd.tsx:30; llms.txt:29 | VP: use /in/karansud-marketing | /in/karansud7 redirects to /in/karansud-marketing, which is the profile's canonical URL. Update all three |
| Audience | 258 X followers, 655 LinkedIn | fx; LinkedIn | VP | Not headline material |
| Reply time | within 24 hours | Contact.tsx:89; CtaBand.tsx:14 | KP | A promise; Karan to confirm (also asked by conversion lane) |
| Services without case proof | TikTok; SaaS marketing; KOLs in F&B; "4x ROAS on monthly budgets" | Services.tsx:7, 15, 23, 46 to 48 | NEEDS KARAN | No case covers TikTok or SaaS; LI-exp calls Tony Roma's influencer work "minimal"; the ROAS comes from one client. TGE planning (Services.tsx:27) is backed by LI-exp |

### Things he built
| Claim | Source | Status | Notes |
|---|---|---|---|
| Account Research & Outreach Engine is live and free | Labs.tsx:45 to 66; account-research-five.vercel.app | VP | Live page credits Karan Sud |
| Feature list: Wikidata, news, GitHub, Hacker News; 0 to 100 fit score; contact discovery; CSV export | Labs.tsx:7 to 10, 47 to 50 | CONFLICT | The live page describes reading a company's homepage, about and pricing pages, up to 10 companies a run, an email plus a LinkedIn opener, a free Gemini tier, and no fit score |
| Outbound CRM | Labs.tsx:13 to 17; app/crm | KP | In-repo page |
| 38 blog posts | portfolio-v3/content/blog | VP (repo count) | 3 are about the tool; 35 are industry essays |
| SlouchGuard, a posture app for Mac | slouchguard-site.vercel.app | VP | macOS 14+, free plus a $12 one-time Pro unlock, © Karan Sud. No usage numbers exist, so the site should not cite any |

## (c) Inconsistencies and NEEDS KARAN (answer in one pass)

1. **Fere AI usage and your role.** Site: 7K+ daily active traders, 12K+ signups. Your LinkedIn: 400 to 500 DAU,
   about 7K MAU, 300K+ signups. Which is right for your time there, and what was your role when the number was hit
   (positioning lane Q4)? Your post says "zero paid budget" but the case lists paid campaigns. Which?
2. **Fere AI details.** Do you have proof of "#1 Fintech" on Product Hunt (the public badge says #2 overall)? Is "90+
   strategies" a real count (Fere's PH comment says "live 90+ days")? OK to use 192K engagements (screenshot) for 195K+?
3. **Defx start point.** The DefiLlama chart in your screenshot shows millions a day in perp volume before Sep 2025.
   What did "under $100K a month" measure? Until answered, v3 uses only "helped reach $1.5B cumulative".
4. **Novaswap.** $650K+ in 90 days (site, post) or $800K+ in 3 months (LinkedIn)? Which dates? OK to drop 19,000%?
5. **FanTV.** Impressions: 12M+ (site) or 9.5M+ (LinkedIn), and for which dates? Community start: under 1K or zero?
   OK to stop saying you scaled MAU to 1.5M (Sui published 1.5M a month after you joined)? Can the ₹45 to 50L
   monthly budget be public?
6. **Prashan.** Is there a screenshot at 100K? He shows 93,181 today, so v3 says "over 90K" otherwise.
7. **BimaBTC and Tony Roma's numbers.** The v2 copy disagrees with the screenshots shown beside it (BimaBTC 2.3M vs
   1.9M impressions, 2.4% vs 1.6%; Tony Roma's 729K vs 678.5K views, +448% vs +371%). Which date range is the copy
   from? If there is no matching screenshot, v3 uses the screenshot figures. What was the CEO account's start count?
8. **Dates and titles.** LinkedIn ends Crowwd in May 2026 and independent work in Aug 2026, but v2 shows "Present" for
   Fere, Novaswap, Tony Roma's and Bones & Burgers. Titles differ (FanTV, Mach1/Opaque, SportsRush, team of 5 vs 6).
   Which version should v3 use? Opaque and Culturegram need dates.
9. **Counts.** Proposal: replace "15+ brands", "Thirteen engagements" and "eight industries" with "13 brands and
   founders" and "seven industries". OK? Group Bones & Burgers under Tony Roma's?
10. **Years.** Keep "5+ years", which counts freelance writing from 2020, or say "6 years in content, 3 in agency
    and in-house marketing"?
11. **Current role and availability** (merges positioning lane Q1 and Q2). Neither profile names an employer. Should
    the site name a current role (Cyberwave or none)? What availability line can it state, and which role titles, if
    any?
12. **Crypto** (positioning lane Q3). Take crypto-only clients, or show crypto only as context inside case studies?
13. **Labs copy.** Is the live engine the newer version (site pages, email plus LinkedIn opener, no fit score)? If so,
    v3 describes that one.
14. **Culturegram.** Confirm the counts (5 episodes, 3 essays, 13 illustrations) and the dates.
15. **Services.** Keep or cut TikTok, SaaS marketing and F&B KOLs, which have no case proof?

## (d) Handoff to PLAN.md

1. Hero uses only rows 1 to 4 and 9 of table (a). Drop the v2 tiles "7K+ daily active traders", "12K+ AI signups",
   "300K+ followers grown" and the bare "471% peak ROI" until Karan answers (c) 1 and 5.
2. Each case-study number shows its date range and, where one exists, the matching screenshot. Where copy and
   screenshot disagree, the screenshot wins.
3. Platform metrics (FanTV MAU, Fere executions, Defx cumulative volume) appear only as context with "helped". Never
   present them as his alone.
4. Fix factual copy on the way: "The SportsRush" spelling, Tony Roma's as "founded in 1972" with partner-franchise
   launches, LinkedIn link to /in/karansud-marketing, and one consistent brand and industry count.
5. Karan answers the 15 questions in (c) before copy lock. Anything still unanswered stays off the site.
