# Conversion research for portfolio-v3

Lane: conversion. Written 2026-10-15. Every search and fetch behind this file is logged in `research-log.md` (lane "conversion").
Draft labels and microcopy below are placeholders for the builder; final copy goes through `head-of-content` and `copy-lint.sh`.

## Decision first

- **Primary CTA:** "Book a 20-minute call", one label everywhere (nav, hero, end of every case study, mid-page band,
  contact, mobile sticky bar). Clicking opens one step (pick what this is about: project, fractional, full-time role,
  plus email) and then an inline calendar. A plain email address sits beside it as the always-visible alternative.
- **Directly under the button:** what happens next in one line, and a reply promise Karan can keep.
- **Secondary path for not-ready visitors:** the live Account Research Engine (ungated) and the 38-post blog, each
  ending in the same call CTA. A newsletter only if Karan commits to a send cadence.
- **Top 3 moves:** (1) one specific CTA with what-happens-next on every decision point; (2) a named, quantified
  result beside every CTA, plus real testimonials Karan collects; (3) engagement models with a floor price or
  minimum, so buyers qualify themselves before they book.

## Evidence key

- **Strong:** controlled test with published method, large-sample survey, or NN/g observational research.
- **Moderate:** single-company test with partial method, correlational industry study, field observation.
- **Weak:** vendor case study without sample size, practitioner anecdote, or my own inference (labelled).

## 1. Primary CTA type

| Option | Friction | Qualification | Verdict |
|--------|----------|---------------|---------|
| Book a call (inline calendar) | Medium: commits 20 to 30 min | High: buyer self-selects a slot, can be routed by intent | **Primary.** Karan sells high-consideration work where the open question is fit |
| Email link | Lowest | None; replies are free-form | **Always-visible secondary** for people who refuse calls |
| Short form (name, email, message) | Low to medium | Low unless it asks intent | Use only as step 1 before the calendar, never as a dead end |
| DM (LinkedIn/X) | Low for active users | None; untracked | Footer link only |

Why a call for the primary:
- Gartner's 2025 release (632 B2B buyers, fieldwork 2024) says 61% prefer a rep-free buying experience overall,
  but buyers want seller input on tasks like judging whether a provider fits their needs. A fit call matches that
  task; pricing, process and FAQ cover the self-serve part. Strong.
  (gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience)
- Chili Piper data (about 4M form fills, as reported by a third-party roundup) puts qualified form-to-meeting at
  about 30% without instant scheduling and 66.7% with it. Weak: vendor data, secondhand.
  (ainora.lt/blog/b2b-meeting-booking-rate-every-study-2026)
- No rigorous test compares an inline Calendly embed with a link-out; claims of 30% or more are unsourced. Weak.
  An inline calendar removes a tab switch, so it is still the sensible default. (log: "Calendly inline embed vs link")
- Call length of 20 minutes is my judgment (weak): short enough to read as low commitment, long enough for a fit
  check. designjoy.co offers 15 minutes, DemandMaven 45, v2 offers 30 (Contact.tsx:8).

Friction rules:
- Fewer fields convert better. Imagescape cut its contact form from 11 fields to 4 and submissions rose 160%
  (own-site before/after, 2008). Moderate. (imagescape.com/filer/canonical/1455648270/152)
- The HubSpot "4 to 3 fields gives about 50%" claim only exists secondhand. Do not cite it.
- Step 1 should hold at most: intent (3 tappable chips), email, optional one-line note. No budget field: I found
  no real test of budget fields, only vendor anecdotes (weak). Floor prices on the page do that filtering instead.
- Multi-step forms beat long single-page forms in Venture Harbour's own tests (0.96% to 8.1% over years of
  iteration). Weak: the company sold the form tool. (ventureharbour.com/cro-case-studies/)

State what happens after the click:
- NN/g's trust research lists "upfront disclosure" (base price, contact info, the process after purchase) as one
  of four credibility factors, and warns against forms that ask for details before showing value. Strong.
  (nngroup.com/articles/trustworthy-design/)
- NN/g found "Get Started" and "Learn More" labels so generic that users stopped reading and bounced; a label
  should say exactly what the user gets. Strong. (nngroup.com/articles/get-started/) v2's hero and band say
  "Get in touch" (Hero.tsx:62, CtaBand.tsx:18), which is this exact problem.
- Draft microcopy under the button: "20 minutes on video. You get a written next step within one business day."
- Draft three-step block near the contact section: pick a time and say what you need; Karan reviews your site and
  channels before the call; within one business day you get scope and price, or a clear no.

Response-time promise:
- HBR (Oldroyd et al., 2011, 1.25M leads across 42 companies): firms that tried to contact a lead within an hour
  were nearly 7x as likely to qualify it as firms that waited one more hour, and over 60x as likely as those that
  waited 24 hours; 23% of audited firms never replied. Strong, seller-side data. (scholarsarchive.byu.edu/facpub/9711)
- So: instant automatic confirmation (Cal.com sends one; an email or form path needs an autoresponder), then a human reply within one business
  day, with the timezone stated. v2 promises 24 hours (Contact.tsx:89, CtaBand.tsx:14); keep a promise only if Karan can hold it
  alongside other work. NEEDS KARAN: timezone and realistic reply window.

## 2. Proof placement

- Above the fold carries most attention: NN/g's 2018 eyetracking found 57% of viewing time above the fold and 74%
  in the first two screens. Strong. (nngroup.com/articles/scrolling-and-attention/) Put the 3 strongest verified
  numbers in the hero, each tied to a named brand and a timeframe.
- Proof works at the decision point. VWO's WikiJob case: the same testimonials lower on the page did nothing; three
  sober lines next to the purchase step lifted purchases 34%. Weak (vendor, no sample size), but the mechanism
  matches. (vwo.com/resources/case-studies/wikijob-ab-tested-social-proof-increased-sales/) Put one quantified
  result beside every CTA instead of a separate "results" block far away.
- Specific numbers read as more factual. Schindler and Yalch (2006) found consumers assume sharp numbers are less
  likely to be estimates than round ones. Moderate. (log: "precise vs round numbers") Use the most exact figure `facts.md` supports.
  Never add precision the source does not have.
- Faces and named people help. Highrise's person-photo page beat its long-form page by 47% in paid signups; the
  specific face barely mattered; adding more info below the photo cut results 22%. Moderate (no sample size
  published). (signalvnoise.com/posts/2991-behind-the-scenes-ab-testing-part-3-final)
- Reviews move high-price decisions most. Spiegel/PowerReviews: 5 reviews versus none lifted purchase likelihood
  270%, more for expensive items, and a perfect 5.0 reads as too good to be true. Moderate (retail data; services untested).
  (spiegel.medill.northwestern.edu/How-Online-Reviews-Influence-Sales)
- Off-site proof beats on-site proof. NN/g: users discount on-site testimonials because only good ones get
  published, and trust sites connected to the rest of the web. Strong. (nngroup.com/articles/trustworthy-design/)
  Link LinkedIn recommendations, live client accounts and public posts from each case study.
- Services buyers judge expertise first and 81% check the provider's website (Hinge, via MarketingProfs 2014).
  Moderate. (marketingprofs.com/charts/2014/24457/how-buyers-evaluate-professional-service-providers)

Hierarchy for Karan: numbers with named brands (hero) > case studies with a CTA at the end (v2's CaseModal.tsx has
no CTA at all) > real testimonials with name, role, photo (v2 has none; NEEDS KARAN to collect 3 to 5) > logos
(only clients `facts.md` clears). Never fabricate any of these.

## 3. Pricing and engagement-model visibility

- NN/g's B2B study ranked price first of 28 information types; users went to competitors when price was hidden;
  a rough price level is enough at first. Moderate (original study is about 2006, repeated in NN/g's later trust
  work). (destinationcrm.com/Articles/CRM-News/CRM-Featured-Articles/B2B-Web-Sites-Are-Dropping-the-Ball-42449.aspx)
- NN/g trust research: show base cost or a range, plus what is included. Strong. (nngroup.com/articles/trustworthy-design/)
- Freelancers who publish prices report fewer but better inquiries. Weak, anecdotes only.
  (blog.freelancersunion.org/2022/07/18/should-freelancers-make-their-prices-public/)
- Recommendation: three engagement cards (project sprint, fractional monthly, full-time role), each with duration,
  cadence, what is included, and a floor ("from X") or minimum. NEEDS KARAN for the numbers and for which models he
  actually offers. If he will not publish numbers, publish the minimum engagement length and typical budget band.
- Keep every fact consistent across pages. Gartner found 69% of buyers see inconsistencies between a seller's
  website and what sellers tell them (strong); DemandMaven's hero says 7 weeks while its offers are 6 and 5 weeks.

## 4. Secondary path for not-ready visitors

- Do not gate. Demand Gen Report 2024: 51% of B2B buyers say content takes too many steps to access (30% a year
  before). Moderate, survey. (demandgenreport.com/resources/navigating-the-attention-economy-via-snack-able-shareable-content/) NN/g: no forms before value (strong).
- **The free tool** (account-research-five.vercel.app): today it has no capture and no hire CTA, only "back to
  portfolio" links (fetched 2026-10-15). On its results screen add one line, "Want this running on your pipeline?
  Book a 20-minute call", plus an optional "email me this brief" after the result appears. On the portfolio, frame
  it as "try it on your own list", ungated. HubSpot's Website Grader (4M+ sites graded by 2011) is the precedent,
  weak evidence for the lead value. (log: "HubSpot Website Grader")
- **The blog:** all 38 posts end in "More posts" with no CTA (app/blog/[slug]/page.tsx:105). HubSpot's analysis of
  its 11 top posts found end-of-post banners drove about 6% of leads and in-text anchor CTAs 47 to 93%. Moderate to
  weak (small sample, slide deck). (slideshare.net/slideshow/generate-traffic-and-conversions-on-your-blog-without-creating-another-post/61638183)
  Add one in-body line per post linking the matching case study or the call, and an author card at the end with
  photo, one-line positioning, and the primary CTA.
- **Newsletter:** only with a real cadence (NEEDS KARAN; Claude's notes mention a Substack/Medium routine). Inline signup at
  post ends and in the footer, never a modal: NN/g calls modal signup overlays the most hated popup type (strong;
  nngroup.com/articles/popups/), and Google demotes content-blocking interstitials (strong policy). Show the
  subscriber count beside the signup only once it is worth showing.

## 5. Two intents on one site (freelance client and full-time employer)

- NN/g lists five reasons audience-split navigation fails, including users worrying the other group gets a better
  option. It works when the content is unique to that audience, labels say who it is for, and it sits in secondary
  navigation. Strong. (nngroup.com/articles/audience-based-navigation/)
- Recruiters spend 7.4 seconds on the first resume screen and scan titles and subheads (Ladders 2018 eyetracking).
  Moderate, commercial source. (hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/)
- Recommendation: the homepage speaks to clients. Hiring managers get one utility link "Hiring full-time?" in nav
  and footer, to a /hire page with a one-screen timeline (titles, companies, dates), role types wanted, location
  and remote preference, a resume PDF, and the same call CTA. The step-1 intent chips route both groups.
- Inference (weak): a full-time signal in the hero may make freelance buyers doubt commitment. Keep it off the
  hero. v2 has no full-time path at all today.

## 6. Mobile and what hurts conversion

- Thumb reach: Hoober's field study (1,333 people observed) found 49% one-handed use; he later stressed that the
  centre of the screen is easiest to hit and that people shift grip to reach edges. Moderate. (uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
- Sticky bars: the only published tests are ecommerce vendor wins (for example +20.4% on a homepage sticky bar,
  327 orders). Weak. (convertibles.dev/blogs/case-studies/homepage-sticky-cta-case-study) Use one anyway, small:
  appears after the hero leaves view, hides at the contact section and when the keyboard is open, 48px+ tall,
  respects the safe-area inset.
- Speed: Vodafone's clean 50/50 test cut LCP from 8.3s to 5.7s and got 15% more leads per visit and 8% more sales.
  Strong. (web.dev/case-studies/vodafone) Deloitte for Google: 0.1s faster mobile moved lead-gen form step 1 to
  submit up 21.6%. Moderate (correlational, Google-funded). (web.dev/case-studies/milliseconds-make-millions)
  Target mobile LCP at or under 2.5s. v2's hero copy starts at opacity 0 (Hero.tsx:22), which delays LCP until
  hydration plus animation; the hero headline and numbers should paint with no entrance animation.
- Motion: NN/g says scrolljacking takes control away, reads as a bug when long, and is worst on mobile. Strong.
  (nngroup.com/articles/scrolljacking-101/) Keep Lenis gentle or off on touch, start the cursor background after
  LCP, pause it off-screen, and switch it off for reduced motion and coarse pointers (details in `tooling.md`).
- Load the calendar script only on click; `tooling.md` measured both loaders and both then pull a full iframe app.

## 7. Example sites worth copying

| Site | What converts | Copy this | Avoid |
|------|---------------|-----------|-------|
| fletchpmm.com | Exact prices by company stage (10K/20K/30K), "Reserve your sprint" with a booking-month note, week-by-week timeline, named testimonials with numbers, Calendly as fallback | Price-by-stage cards; availability note under the CTA (only if true); the timeline as "what happens next" | Wait time hidden in the FAQ |
| designjoy.co | Solo operator, price on page, three-step how-it-works, "Book a 15-min intro call" fallback, long FAQ that handles objections | Duration in the call label; FAQ that answers price, speed, fit | Refund terms that contradict each other |
| demandmaven.io | Free 45-minute growth call, named fixed-length engagements, a free audit tool and newsletter for the not-ready | Tool as the second door; engagements with fixed lengths | 7-week hero claim against 6- and 5-week offers |
| marketingexamples.com | 100+ ungated short examples funnel to one newsletter ask, with reader count and 27 named photo testimonials beside it | Proof sits right next to the ask; content stays free | Newsletter-only model (Karan needs calls) |
| jonathanstark.com | Daily email (10k subscribers) as the ladder to books and coaching; free best-of PDFs | The ladder idea for the blog | No service prices and an email-first primary CTA |

(Fetched 2026-10-15; see research-log.md. Baseline and positioning lanes also logged Fletch and others.)

## 8. Ranked recommendations for v3 (most impact first)

| # | Recommendation | Evidence | Rubric dimension |
|---|----------------|----------|------------------|
| 1 | One primary action, "Book a 20-minute call", same label and style in nav, hero, after each case study, mid-page, contact, mobile bar. Retire "Get in touch" and the modal-only form as primary. | Strong (NN/g get-started, scrolling-and-attention; Gartner) | 3 Conversion path, 7 Copy |
| 2 | One line of what-happens-next under every instance of the CTA, plus the three-step block and a reply promise with timezone near contact. | Strong (NN/g trust disclosure; HBR response time) | 3 |
| 3 | A verified, named, timeframed number beside every CTA; the strongest three in the hero; most exact figure facts.md allows. | Moderate (NN/g fold; WikiJob; Schindler and Yalch) | 2 Proof |
| 4 | End every case study with a CTA that names the matching outcome, plus links to off-site evidence (live account, post, LinkedIn recommendation). | Strong for off-site trust (NN/g); weak for the CTA lift | 2, 3, 4 Narrative |
| 5 | Engagement cards with duration, scope and a floor price or minimum. NEEDS KARAN for numbers. | Moderate (NN/g B2B pricing and trust) | 3, 1 Positioning |
| 6 | Collect 3 to 5 real testimonials with name, role, photo and a number; place them next to CTAs. NEEDS KARAN. | Moderate (Highrise, Spiegel); never fabricate | 2 |
| 7 | Contact flow: step 1 = intent chips + email (+ optional note), step 2 = inline calendar loaded on click; email link always visible; Formspree fallback without `alert()`. | Moderate (Imagescape); weak (Chili Piper) | 3, 9 Perf |
| 8 | Blog: one in-body contextual link per post plus an end-of-post author card with the CTA. Tool (separate deploy, Karan's call): one CTA on the results screen, optional email-the-brief after value. | Moderate to weak (HubSpot deck); strong for no gating (NN/g) | 3 |
| 9 | Hero paints without entrance animation; mobile LCP at or under 2.5s; heavy motion deferred, paused, off for reduced motion; no scroll-jacked sequences. | Strong (Vodafone; NN/g scrolljacking) | 9 A11y+perf, 6 Interaction |
| 10 | Mobile sticky CTA after the hero, hidden at contact and with the keyboard open, 48px+, safe-area aware. | Weak to moderate (Hoober; vendor tests) | 8 Mobile |
| 11 | /hire page for full-time intent via a "Hiring full-time?" utility link; client-first hero. | Strong (NN/g audience nav); moderate (Ladders) | 1, 3 |
| 12 | Short FAQ by the contact block answering price, start date, timezone, what if it is not a fit, freelance versus full-time. | Weak (designjoy, Fletch patterns) | 3 |

Trust breakers to fix on the way (facts lane to confirm): v2 links LinkedIn as `linkedin.com/in/karansud7`
(Contact.tsx:115, JsonLd.tsx:30) while the brief lists `karansud-marketing`; the site lives on a vercel.app
subdomain with a Gmail address. NN/g counts a site's legitimacy cues and its ties to the wider web as credibility
factors (strong); a custom domain and matching email are a cheap fix. NEEDS KARAN.

## 9. Not supported, do not cite

ContentVerve "my versus your" +90% and "never spam you" -18.7% (could not verify); the 102.5% Highrise figure
(the original says 47%); HubSpot "4 to 3 fields, about 50%"; any Wynter claim about logos or vague copy; "30 to 40%"
inline-calendar uplift.

## Sources and strength

| Source | Strength |
|--------|----------|
| NN/g: trustworthy-design, get-started, scrolling-and-attention, audience-based-navigation, scrolljacking-101, popups | Strong |
| web.dev Vodafone LCP A/B test | Strong |
| HBR, The Short Life of Online Sales Leads (2011) | Strong |
| Gartner B2B buyer survey (2025 release, n=632) | Strong |
| Google intrusive interstitials policy (via searchengineland.com, smashingmagazine.com) | Strong for ranking risk |
| Imagescape form test; Highrise A/B (Signal v Noise); Spiegel/PowerReviews; Hoober; Ladders; Hinge; Schindler and Yalch; Deloitte for Google; Demand Gen Report 2024; HubSpot blog CTA deck | Moderate |
| VWO WikiJob; Chili Piper; Venture Harbour; sticky CTA vendor tests; freelancer pricing anecdotes; HubSpot Website Grader | Weak |

## Handoff to PLAN.md

1. Primary CTA: "Book a 20-minute call" everywhere, intent chips + email, then inline calendar on click; email always visible beside it.
2. Every CTA carries a one-line what-happens-next and sits next to one verified, named, timeframed number; case studies end with the CTA.
3. Add engagement cards with duration, scope and a floor or minimum, and a short FAQ by contact (numbers and models: NEEDS KARAN).
4. Not-ready path: ungated tool with one CTA on its results screen, blog posts with an in-body link and author-card CTA, newsletter only with a real cadence, never a modal.
5. Client-first homepage with a "Hiring full-time?" link to /hire; hero paints without animation, mobile LCP at or under 2.5s, small sticky mobile CTA.
