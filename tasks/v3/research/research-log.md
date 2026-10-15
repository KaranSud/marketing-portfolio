# research log (append-only, one line per search/fetch: time | lane | url-or-query | takeaway)
20:21 | tooling | curl https://instaagent.com/ (raw HTML) | fetched raw HTML to identify bg tech
20:21 | tooling | instaagent.com /_next/static/chunks/*.js | downloaded JS chunks to find hero canvas + cursor code
20:21 | conversion | WS: form fields conversion Imagescape/HubSpot | Imagescape primary PDF: 11->4 fields = +160% submissions (2008, own site); HubSpot 4->3 ~50% is second-hand only
20:21 | conversion | WS: HBR Short Life of Online Sales Leads (Oldroyd 2011) | 1.25M leads: contact within 1h ~7x more likely to qualify vs 1h later, 60x vs 24h+; 23% of firms never replied
20:21 | conversion | WS: NN/g audience-based navigation | NN/g (Sherwin 2015) + GOV.UK: audience split nav hurts usability when audiences overlap; ok only when tasks totally separate
20:21 | conversion | WS: NN/g B2B pricing information | NN/g B2B study: price ranked #1 of 28 info types; users go to competitors when price hidden; rough price level is enough
20:21 | conversion | WS: Spiegel Research Center reviews 270% | Spiegel/PowerReviews 2017: 5 reviews vs 0 = 270% higher purchase likelihood, bigger for high-price; perfect 5.0 reads too good to be true
20:22 | positioning | search: fractional head of growth personal website book a call | Lillian Pierson data-mania leads with free consult + stage range; directories over personal sites
20:22 | positioning | search: best fractional CMO personal websites 2026 | only directories (thecmo.com, inbeat); no site roundups; use known operators instead
20:22 | positioning | search: web3 crypto marketing consultant personal site fractional CMO | mostly agencies (coinbound, northpoint); few strong solo crypto marketer sites
20:22 | tooling | instaagent.com chunk 6a475df8e5239a94.js + css | hero bg = Canvas2D glyph field (14px cells), 8 random-walk streaks, 180px cursor spotlight in accent, 30fps cap, IO+visibility pause, off for reduced-motion, coarse pointer gets auto Lissajous cursor; site also uses GSAP+ScrollTrigger, Lenis, framer-motion, custom dot cursor
20:22 | conversion | WS: Chili Piper instant scheduling after form benchmark | Vendor data (~4M forms): qualified form->booked ~30% without instant scheduling vs 66.7% with; RevenueHero median 62%; vendor-biased
20:22 | conversion | WS: nngroup trustworthy-design 4 credibility factors | NN/g: design quality, up-front disclosure, comprehensive current content, connected to rest of web; reconfirmed 2016
20:22 | conversion | WS: Deloitte Milliseconds Make Millions (web.dev) | Google/Deloitte 37 brands: 0.1s faster mobile = lead-gen form step1->submit +21.6%, retail conv +8.4%; correlational, Google-funded
20:22 | conversion | WS: Hoober how users hold phones (UXmatters 2013) | Hoober field obs n=1,333: 49% one-handed, 36% cradled, 15% two-handed; later says center of screen easiest, thumb zones not rigid
20:22 | conversion | WS: sticky CTA mobile A/B test | Only vendor ecommerce tests: Convertibles homepage sticky bar +20.4% (327 orders, 95% prob); none lead-gen; directional only
20:22 | tooling | registry.npmjs.org (gsap, motion, ogl, three, r3f, rive, lottie, confetti, visx, d3, cmdk, cal, calendly, recharts, number-flow) | latest versions, release dates, licenses, react peer ranges
20:22 | conversion | WS: ContentVerve my vs your button copy test | Could not verify the 90% my/your claim; do not cite
20:22 | conversion | WS: precise vs round numbers credibility (Schindler & Yalch 2006, Xie & Kronrod 2012) | Sharp numbers read as research-based/more factual than round; supports exact figures over 10K+ style
20:22 | conversion | WS: Highrise person-photo A/B (signalvnoise 2977/2991) | Primary SvN: long form +37.5% signups; person-photo page +47% paid signups vs long form; 102.5% is a Neil Patel misquote
20:22 | conversion | WS: budget field on contact form lead quality | No rigorous test found; only vendor anecdotes (fewer but better leads); treat as weak
20:22 | conversion | WS: freelancers publishing prices / starting at | Practitioner anecdotes only: published prices = fewer, better inquiries; starting-at or range recommended; weak evidence
20:22 | positioning | https://www.kevin-indig.com/ | hero 'I unlock Organic Growth' + 18 logos + ex-Shopify/G2 creds; CTA contact; newsletter footer
20:22 | positioning | https://www.elenaverna.com/ | redirects to Substack newsletter page (99K subs); not a consulting site, drop as benchmark
20:22 | positioning | https://www.gaetanodinardi.com/ | DNS fail ENOTFOUND; dropped
20:22 | positioning | https://www.kaleighmoore.com/ | hero names dual problem (humans + AI search); 3 productized offers; CTA See If We're a Fit; logos+bylines
20:22 | tooling | bundlephobia.com/api/size (19 packages) | min+gzip sizes for candidate libs
20:23 | tooling | bundlephobia exports-sizes ogl+gsap; raw.githubusercontent Fyrd/caniuse view-transitions, scroll-driven | per-export sizes + browser support
20:23 | tooling | raw.githubusercontent Fyrd/caniuse css-scroll-timeline | scroll-driven animation support
20:23 | conversion | WF: https://www.nngroup.com/articles/audience-based-navigation/ | 5 failure modes (self-ID effort, overlap, fear of missing better option); ok if content unique, labels say For X, easy switching; prefer task nav
20:23 | conversion | WF: https://signalvnoise.com/posts/2991-behind-the-scenes-ab-testing-part-3-final | Person page +47% paid signups vs long form; adding info below cut it 22%; face identity barely mattered; no sample sizes given
20:23 | conversion | WF: https://www.nngroup.com/articles/trustworthy-design/ | Upfront disclosure: show base price or ranges, contact info, what happens after; on-site testimonials less credible than off-site links
20:23 | positioning | https://www.data-mania.com/ | Lillian Pierson: 'Fractional CMO & GTM Engineer' + PE license as credibility; free consult CTA; 20-section page, lead magnet popup
20:23 | positioning | https://mkt1.co/ | Emily Kramer: newsletter-first (85K), advising 'limited availability' via email; named clients in FAQ; no logos
20:23 | positioning | https://www.blueprintgtm.com/ | Jordan Crawford: hero question about AI SDR messages; before/after message proof; fit criteria; CTA Email Jordan
20:23 | positioning | https://www.devinbramhall.com/ | weak: slogan hero, no hero CTA, primary CTA is Amazon book; logos + 2 testimonials
20:23 | tooling | WS: CSS scroll-driven animations support Safari 26 Firefox 2026 | Chrome 115+, Safari 26+; Firefox still not default-on; use @supports + fallback
20:23 | conversion | WF: https://www.designjoy.co/ | Solo productized: price on page, Join = Stripe checkout, Book a 15-min intro call as fallback, 3-step how it works, long FAQ carries objections
20:23 | conversion | WF: https://marketingexamples.com/ | Newsletter-only capture; 130k readers + 27 named photo testimonials beside it; 100+ free ungated examples funnel to signup
20:23 | conversion | WF: https://jonathanstark.com/ | Primary CTA = daily email (10k subs), paid offers behind Browse pages, no service prices on home; ladder email -> books -> coaching
20:23 | conversion | WF: https://www.nngroup.com/articles/get-started/ | Generic Get Started/Learn More stops info-seeking, users bounce; label should state exactly what you get; a link is a promise
20:23 | positioning | https://www.fishmana.com/ | cert error (bluehost); dropped
20:23 | positioning | search: Liza Adams GrowthPath AI marketing fractional CMO | no site URL found; profile only; dropped
20:23 | positioning | search: Lara Acosta personal branding website | runs on LinkedIn + course page (ladigital.club); no consulting site; dropped
20:24 | facts | https://api.fxtwitter.com/KaranSudSocial | 258 followers, bio 'I help brands find their voice', no employer listed, links v2 site
20:24 | facts | https://api.fxtwitter.com/FanTV_official | 404 via fxtwitter; FanTV follower count not publicly verifiable this way
20:24 | facts | https://api.fxtwitter.com/prashan_agarwal | 93,181 followers today (site says 100K); bio confirms Founder FanTV, ex-CEO Gaana
20:24 | facts | https://api.fxtwitter.com/BimaBTC | 125,562 followers today (site says 144K); account joined May 2024
20:24 | facts | https://api.fxtwitter.com/fere_ai | 17,835 followers today
20:24 | facts | https://api.fxtwitter.com/Novaswap | 1,518 followers; account created 5 Nov 2025 (so 19,000% profile-visit growth is off a near-zero base)
20:24 | tooling | calendly widget.js + cal.com embed.js transfer sizes | measured loader script sizes; both then load a full booking app iframe
20:24 | positioning | https://caseyaccidental.com/ | Substack subscribe page only; famous advisors use newsletter as homepage; not a converting model
20:24 | positioning | https://www.amandanatividad.com/ | DNS fail; dropped
20:24 | positioning | https://www.growthenginex.com/ | 301 to coldoutbound.com
20:24 | positioning | https://www.kieranflanagan.io/ | Substack page 'Turn AI into results.' 16K subs; newsletter only, no offer
20:24 | tooling | api.github.com repos: satus, lenis, play.core, number-flow, paper-design/shaders, r3f, ogl, cmdk, GSAP, visx | stars, last push, license for repo shortlist
20:24 | conversion | WF: https://web.dev/case-studies/vodafone | Clean 50/50 A/B, only Web Vitals differ: LCP 8.3s->5.7s (31%) = +15% lead-to-visit, +8% sales
20:24 | conversion | WF: https://www.nngroup.com/articles/scrolling-and-attention/ | 2018 eyetracking: 57% viewing time above fold, 74% in first two screenfuls; keep major CTA above fold
20:24 | conversion | WS: ContentVerve never spam you -18.7% privacy microcopy | Not verifiable in search; do not cite
20:24 | conversion | WF: https://www.nngroup.com/articles/scrolljacking-101/ | Scrolljacking takes control, disorients, long ones read as bugs, worst on mobile; avoid
20:24 | facts | https://api.llama.fi/summary/derivatives/defx | HTTP 402 (paid endpoint now); use defillama.com page or Karan's screenshot instead
20:24 | facts | https://www.linkedin.com/in/karansud-marketing | HTTP 999 bot wall; LinkedIn not readable via WebFetch
20:24 | facts | https://www.producthunt.com/products/fere-ai | Badge: ranked #2 of the day, 17 May 2026, 421 pts, tags Fintech/AI/Web3; no #1 Fintech badge visible
20:24 | tooling | raw.githubusercontent darkroomengineering/satus README + package.json | Next App Router starter from Lenis authors; deps and patterns
20:24 | tooling | raw satus components/effects/gsap.tsx + lenis/scroll-trigger.tsx | pattern: GSAP ticker driven by tempus RAF, lagSmoothing(0), ScrollTrigger.update on lenis scroll
20:24 | conversion | WS: Hinge Research Institute buyers vet professional services | Hinge (via MarketingProfs 2014): 81% of buyers check provider website, 63% google them; expertise is top selection criterion; referrals lead discovery
20:24 | conversion | WS: Ladders 2018 eye-tracking resumes 7.4s | Recruiters' initial screen 7.4s; scan titles/subheads, simple layout wins; hiring-manager intent wants a fast scannable career summary
20:24 | conversion | WS: Demand Gen Report content preferences 2024 | 51% say too many steps to access content (up from 30%); 54% dislike sales-pitchy content; argues against gating
20:24 | conversion | WS: free tool lead gen HubSpot Website Grader | Grader graded 4M+ sites by 2011; email+URL for report; no audited lead numbers, vendor-only
20:24 | baseline | https://www.aprildunford.com | BENCHMARK pick: one-line outcome hero for B2B tech, 200+ companies stat, client logos + 4 named exec testimonials, 3 offers each with Learn more, single Contact April CTA repeated; no pricing
20:24 | baseline | https://www.justinwelsh.me | BENCHMARK pick: one primary action (free 30-page guide / Saturday essay), 200K readers + 3 named author testimonials, no service menu; single-CTA discipline
20:24 | baseline | https://julian.com | now an investor homepage (deeptech fund banner), not a marketer site; dropped as benchmark
20:24 | tooling | raw ertdfgcvb/play.core README | ASCII playground: per-cell program model with cursor input; reference for glyph-field technique
20:24 | positioning | http://coldoutbound.com/ | Eric Nowoslawski: number hero '8M+ emails/month', free test campaign CTA (Tally), fit criteria, founder barely named
20:24 | positioning | https://www.ashleyfaus.com/ | weak: day/night slogan hero, no ICP, primary CTA Amazon preorder, no proof
20:24 | positioning | search: web3 growth marketer personal portfolio KOL work with me | crypto marketers mostly use Notion/web3.career profiles: numbers + KOL counts, skill bars; no strong sites
20:24 | positioning | search: AI startup growth marketer portfolio open to fractional and full-time | only job posts; AI head-of-growth JDs ask for case studies with revenue impact
20:24 | facts | https://defillama.com/protocol/defx | 403 via WebFetch; rely on Karan's DefiLlama screenshot (cumulative perp vol 1.529b)
20:24 | facts | WS: Karan Sud Cyberwave/Crowwd/Fere AI linkedin | no public result links Karan Sud to Cyberwave or Crowwd; employer unconfirmed
20:24 | facts | WS: Mohaimina Haque Tony Roma's first female CEO | verified: fsrmagazine/fermag/nrn say first female CEO, permanent Aug 2024; '52-year-old startup' in 2024 so founded 1972
20:25 | tooling | https://number-flow.barvian.me/ | respectMotionPreference default true; SSR via declarative shadow DOM + nonce; 6.1KB gz
20:25 | conversion | WS: Calendly inline embed vs link conversion | No rigorous data; only anecdotes (one consultant 3x bookings after inline embed) and unsourced 30-40% claims; weak
20:25 | conversion | WS: Kit/ConvertKit creator signup benchmark | No published creator benchmark; general landing pages ~2-7%; weak, use own data
20:25 | conversion | WS: Venture Harbour multi-step form | Self-reported (sold form tool): enquiry form 0.96% -> 8.1% after multi-step + years of tests; vendor-biased
20:25 | conversion | WS: nngroup popups/overlay overload | NN/g: modal overlays most hated, signup modals erode trust; ask for signup after engagement, inline not modal
20:25 | baseline | https://www.fletchpmm.com | BENCHMARK pick: hero names the problem, productized 2-week sprint priced by stage (10K/20K/30K), availability note on CTA, week-by-week timeline, interactive problem checklist, metric testimonials, Before & Afters as 2nd CTA
20:25 | tooling | https://gsap.com/standard-license | free commercial incl. all plugins; proprietary (Webflow), bans Webflow-competing no-code builders
20:25 | positioning | https://www.elischwartz.co/ | 'the Product-Led SEO expert' category-of-one + named clients + Book a call (intro.co); Hire me nav split consult/speaking
20:25 | positioning | https://www.majavoje.com/ | bot verification wall; dropped
20:25 | positioning | https://www.rosssimmonds.com/ | hero slogan 'New school technology. Old school storytelling.'; newsletter primary CTA; 10+ competing CTAs
20:25 | positioning | https://senpaiportfolio.onrender.com/ | weak crypto template: 'I don't just market' hero, self-rated skill bars, anonymous projects, DM on X CTA
20:25 | conversion | WF: https://brittanychiang.com/ | Hiring-intent pattern: experience list + View Full Resume PDF link; no email/contact path at all (weak for leads)
20:25 | conversion | WF: https://www.coreyhaines.com/ | SSL error; dropped
20:25 | facts | WS: FanTV monthly active users Multicoin | sui.io blog + QuickNode: ~1.5M MAU (company-sourced); 8M on-chain users figure is from paid release
20:25 | facts | WS: Fere AI daily active traders agent executions | PH/hunted.space launch copy: 7,000+ daily users, 10M+ executions (company-sourced, no independent check)
20:25 | facts | https://opaquestudio.in/ | site states 700+ artisans; handcrafted furniture/decor made in India
20:26 | conversion | WF: https://www.punchlineconversion.com/ | DNS fail; dropped
20:26 | conversion | WF: https://www.demandmaven.io/ | Free 45-min growth call primary, named fixed-length engagements (6-wk, 5-wk), free SaaS Growth Audit Tool + newsletter as secondary; no pricing
20:26 | positioning | https://www.rachelkarten.com/ | JS/tracking shell only, no copy readable; dropped
20:26 | positioning | search: Jack Appleby Future Social consultant website | newsletter on beehiiv (80K), full-time creator; no consulting site; dropped
20:26 | positioning | search: GTM engineer personal website portfolio Clay | Clay community: buyers value ICP-to-accounts-to-reach end to end over complex workflows; portfolios mostly Notion
20:26 | facts | https://www.sui.io/blog/fantv-creator-economy-video | published 19 Nov 2024 already citing ~1.5M MAU (Karan started Oct 2024): MAU not attributable to him
20:26 | facts | https://www.hunted.space/dashboard/fere-ai | PH 17 May 2026: #2 Product of the Day, 495 upvotes; no Fintech category rank shown; maker comment says 7,000+ daily users, 10M+ executions, 'live 90+ days'
20:26 | facts | https://account-research-five.vercel.app | live; 'Account research and outreach, on autopilot', up to 10 companies/run, brief+email+LinkedIn opener, Gemini free tier; no fit score mentioned
20:26 | facts | https://slouchguard-site.vercel.app | live; AirPods posture app for Mac (macOS 14+), free + Pro $12 once, by Karan Sud; no user counts
20:26 | baseline | https://marketingexamples.com (shot) | BENCHMARK pick for craft: hand-made illustrated cards, each one a worked example that shows the method; sticky tag sidebar; 130k readers proof beside newsletter; shots in shots/baseline/bench-marketingexamples
20:26 | baseline | shots: aprildunford, fletchpmm, marketingexamples | benchmark screenshots saved to tasks/v3/shots/baseline/bench-<name>-{desktop,mobile}-NN.png for other lanes
20:26 | conversion | WF: https://www.fletchpmm.com/ (CTA mechanics; baseline also logged it) | Exact tiered prices by company stage on page, Reserve your sprint + (Booking in November) scarcity, week-by-week what happens, Calendly as fallback, quantified named testimonials
20:26 | positioning | https://www.tomorbach.com/ | 307 to marketingideas.com newsletter; full-time operators park personal domain on newsletter
20:26 | positioning | https://jayacunzo.com/ | slogan hero + very specific subhead ICP; Book a Call primary; many testimonials; leftover lorem ipsum labels
20:26 | facts | WS: Karan Sud linkedin karansud-marketing / karansud7 | neither LinkedIn URL indexed in search; no public employer found
20:26 | facts | https://www.theculturegram.com/ | homepage shows S1 episode (Jessica Neal), S2 teaser, 2 essays by Shweta Shukla, 1 report; 5 episodes/3 essays not countable from homepage
20:26 | positioning | search: Hila Qu growth advisor personal website | no personal site; sells via Maven course + Reforge; dropped
20:26 | positioning | search: crypto marketing advisor personal website former head of marketing TGE | crypto advisors live on web3.career/peerlist profiles; Supernumerary (ex-Kraken PMM) only advisory brand; gap for a polished crypto+AI site
20:26 | conversion | WS: HubSpot anchor text CTA blog study | HubSpot deck, 11 top posts: end-of-post banners ~6% of leads; in-body anchor text CTAs 47-93%; small sample, moderate-weak
20:26 | conversion | WS: Wynter buyer skepticism vague claims | No published Wynter study found; only product pages; do not cite
20:26 | conversion | WS: VWO WikiJob testimonials +34% | VWO case: same testimonials lower on page = no effect; 3 sober lines near the buy step = +34% purchases; vendor, no n
20:26 | conversion | WS: Google intrusive interstitials guidance | Google demotes content-blocking overlays (mobile 2017, desktop 2021); legal notices exempt; no signup modals
20:27 | tooling | cdn.jsdelivr.net gsap ScrollTrigger/SplitText, rive.wasm, dotlottie wasm (size only) | measured raw+gzip of runtime files
20:27 | positioning | search: Supernumerary crypto advisory | no site found; dropped
20:27 | tooling | https://motion.dev/docs/react-reduce-bundle-size | motion comp 34kb; m+LazyMotion 4.6kb initial, domAnimation +15kb, domMax +25kb, useAnimate mini 2.3kb
20:27 | tooling | api.github.com trees DavidHDev/react-bits + magicuidesign/magicui | component catalogs = list of template-tell effects to avoid
20:27 | conversion | WS: Gartner 61% B2B buyers prefer rep-free (2025 release) | Gartner n=632 (2024 fieldwork): 61% prefer rep-free; self-serve for info, seller input for fit questions; 73% avoid irrelevant outreach
20:27 | conversion | WF: https://account-research-five.vercel.app (CTA/capture check; facts lane also fetched) | No email gate, no hire/contact CTA, links back to portfolio only; tool leaks intent with no capture
20:28 | facts | Chrome: linkedin.com/in/karansud-marketing (profile + activity) | headline Brand & Content Strategist; no current employer; reposts Cyberwave; 655 followers; own post claims 12K signups zero paid, 9.5M impressions, 728K views, 10+ brands
20:28 | facts | Chrome: linkedin.com/in/karansud-marketing/details/experience | Crowwd Sep25-May26, Independent Sep24-Aug26, FanTV Oct24-Aug25, SportsRush Jun-Sep24, Mach1 Nov23-May24; Fere 300K+ signups/400-500 DAU/7k MAU; Novaswap 800K+; FanTV 9.5M impressions
20:28 | facts | Chrome: linkedin.com/in/karansud7 | redirects to karansud-marketing (v2 site still links the old slug)
