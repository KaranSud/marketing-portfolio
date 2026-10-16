// v3 case data. Every number traces to tasks/v3/research/facts.md: table (a), or a
// row with status KP or better in table (b). Claims marked CONFLICT there are left
// out until Karan answers facts.md (c); where his copy and his own screenshot
// disagree, the screenshot figure is used. Roles and dates that conflict with his
// LinkedIn are written neutrally.

export type Metric = { val: string; label: string };
export type Shot = { src: string; caption: string };

export type BeforeAfterPair = { before: string; after: string; label?: string };

export type BeforeAfterVideo = {
  before: string;
  after: string;
  beforePoster: string;
  afterPoster: string;
};

export type BeforeAfter = { video: BeforeAfterVideo; screenshots: BeforeAfterPair[] };

export type CaseStudy = {
  key: string;
  title: string;
  /** One line for the work index. */
  kind: string;
  /** Who he worked for and when, only as far as sources agree. */
  meta: string;
  lede: string;
  channels: string[];
  stats: Metric[];
  situation: string;
  strategy: string;
  execution: string[];
  results: string[];
  screenshots: Shot[];
  /** Preview for the work index when a case has no screenshot. */
  logo?: string;
  /** Index preview when the case's screenshot already appears in "How I work". */
  indexImage?: string;
  /** A short muted loop of the real work, used as the index preview. */
  preview?: { video: string; poster: string };
  /** Folder under public/Results/ scanned for before-after pairs. */
  mediaDir?: string;
  beforeAfter?: BeforeAfter;
};

export const caseStudies: CaseStudy[] = [
  {
    key: "fantv",
    mediaDir: "FanTV",
    title: "FanTV AI",
    kind: "Social media and community, 2024 to 2025",
    meta: "Social Media Marketing Manager · Oct 2024 to Aug 2025",
    lede: "A SocialFi app for creators that started with about 70K followers on X and under 1,000 community members. With airdrops and a 100+ KOL program, the X account went from 70K to 297.7K followers in 11 months, and Discord and Telegram passed 150K members.",
    channels: ["X", "Instagram", "Discord", "Telegram"],
    stats: [
      { val: "297.7K", label: "X followers, up from 70K in 11 months, with airdrops and a 100+ KOL program" },
      { val: "150K+", label: "Members across Discord and Telegram" },
      { val: "100+", label: "KOLs in the program, up from about 10" },
      { val: "9.5M+", label: "Impressions on FanTV AI's X account; 12M+ with Prashan Agarwal's" },
    ],
    situation:
      "FanTV is a SocialFi platform for creators and users. Instead of rewarding only the top few creators the way YouTube does, payouts are algorithmic for fairness, and creators earn from day one (paid in tokens, since it is a crypto project). When I joined, the product was strong but quiet: roughly 70K followers on X and under 1,000 members across Discord and Telegram, with nothing pulling new people in.",
    strategy:
      "The team's priority was users, so I built for the top of the funnel: get FanTV in front of as many of the right people as possible, then turn that attention into followers, community members and active users. Two engines fed each other, the brand account for reach and the founder's account for trust, backed by a real content pipeline and paid growth.",
    execution: [
      "Built the full social media content system for both the brand and the founder, with defined pillars, a weekly cadence and recurring formats.",
      "Scaled the KOL program from around 10 KOLs to 100+ at peak, and ran ambassador programs and AMAs that grew Discord and Telegram from under 1K to 150K+ members.",
      "Ran airdrop campaigns (no TGE) to drive signups and community growth.",
      "Led top-of-funnel performance marketing on a ₹45 to 50L monthly budget, with push notifications and full-funnel tracking in MoEngage (CAC, average session duration, DAU, WAU and MAU, D3, D7 and D15 retention).",
      "Grew the founder's personal brand on X in parallel, which fed credibility and reach back into FanTV. It has its own case study.",
      "Led a team of mods, ambassadors, designers and editors with clear SOPs and review loops.",
    ],
    results: [
      "The X account grew from 70K to 297.7K followers in 11 months, with airdrops and a 100+ KOL program behind it.",
      "The community grew from under 1,000 to 150K+ members across Discord and Telegram.",
      "The KOL program grew from around 10 to 100+ KOLs.",
      "9.5M+ impressions on the FanTV AI account, and 12M+ including Prashan Agarwal's founder account.",
    ],
    screenshots: [
      { src: "/Results/FanTV/FanTV_Web1.png", caption: "FanTV AI X analytics, 1 to 31 January 2025." },
      { src: "/Results/FanTV/FanTV X Mobile SS.png", caption: "FanTV AI on X: 297.7K followers." },
      { src: "/Results/FanTV/FanTV_Web3.png", caption: "FanTV AI X analytics." },
      { src: "/Results/FanTV/FanTV_Web2.png", caption: "FanTV AI X analytics, June to August 2025." },
    ],
  },
  {
    key: "defx",
    mediaDir: "Defx",
    title: "Defx",
    kind: "Trading contests, KOLs and content for a perps DEX",
    meta: "Senior Content Manager, Crowwd Labs · Sep 2025 to Jan 2026",
    lede: "A perpetuals DEX with 40 to 50 active traders when I joined. Active traders went from about 50 to about 350, and I helped Defx reach $1.5B in cumulative perp volume, public on DefiLlama. Defx has since closed, so its public DefiLlama page is the one screenshot I can show.",
    channels: ["X", "Telegram", "Discord"],
    stats: [
      { val: "$1.5B", label: "Cumulative perp volume on DefiLlama, which I helped Defx reach" },
      { val: "50 to 350", label: "Active traders, from about 50 to about 350" },
      { val: "2", label: "Trading contests, one with Voltrade" },
    ],
    situation:
      "Defx had a working perpetuals DEX and few people using it: around 40 to 50 active traders when I joined. There was no community and no clear reason for traders to show up.",
    strategy:
      "Drive volume by combining reasons to trade with reasons to stay: incentive-led acquisition through contests and KOLs, backed by organic content and UGC that built credibility around the product.",
    execution: [
      "Designed and ran two trading contests, one self-hosted and one in partnership with Voltrade (voltrade.xyz), to pull active traders onto the platform.",
      "Built KOL relationships and a community of people who actually traded.",
      "Produced UGC and organic content to build awareness and trust around the product.",
    ],
    results: [
      "Active traders grew from around 40 to 50 to around 300 to 350.",
      "I helped Defx reach $1.5B in cumulative perp volume, public on DefiLlama.",
    ],
    screenshots: [{ src: "/Results/Defx/Defx.png", caption: "Defx on DefiLlama: $1.529b cumulative perp volume." }],
  },
  {
    key: "fere",
    mediaDir: "Fere AI",
    title: "Fere AI",
    kind: "Content, launch and growth for an AI trading agent",
    meta: "Senior Content Manager, Crowwd Labs · Sep 2025 to May 2026",
    lede: "An AI trading agent whose brand did not exist yet. The X account earned 6.8M impressions in eight months, and in May 2026 Fere launched to #2 Product of the Day on Product Hunt.",
    channels: ["X", "Telegram", "Email", "YouTube", "Blog", "Medium", "Farcaster"],
    stats: [
      { val: "7K+", label: "Daily active traders" },
      { val: "12K+", label: "Signups, with zero paid budget" },
      { val: "#2", label: "Product of the Day on Product Hunt, 17 May 2026" },
      { val: "6.8M", label: "X impressions, 1 Sep 2025 to 27 Apr 2026" },
      { val: "192.4K", label: "X engagements in the same eight months" },
    ],
    situation:
      "Fere AI had a powerful AI trading agent and few people using it. The product worked, but the brand did not exist yet and traders had no reason to discover it, or to trust it over the tools they already had.",
    strategy:
      "I positioned Fere on proof: show the agent actually trading, benchmark it against competitors, and make that evidence easy to find on every channel. Then build a content and acquisition engine that turned attention into signups and active traders.",
    execution: [
      "Built a content pipeline on X with recurring formats (trading threads, data drops, market takes, product demos).",
      "Ran product testing and competitor benchmarking, then turned the results into proof-led content showing the agent's edge.",
      "Ran the Product Hunt launch campaign, where Fere finished #2 Product of the Day, and launched it on other startup launch sites.",
      "Grew signups with zero paid budget: launch campaigns, email marketing, a referral campaign and a points program.",
      "Worked with KOL agencies to source and brief KOLs, and ran regular product demos and UGC campaigns.",
      "Launched the email marketing program that converted Fere's first paying users.",
      "Led a team across design, copy and community.",
    ],
    results: [
      "7K+ daily active traders and 12K+ signups, with zero paid budget.",
      "#2 Product of the Day on Product Hunt.",
      "6.8M X impressions and 192.4K engagements between 1 September 2025 and 27 April 2026.",
      "Email marketing brought in Fere's first paying users.",
    ],
    screenshots: [{ src: "/Results/Fere AI/Fere AI.png", caption: "Fere AI X analytics, 1 Sep 2025 to 27 Apr 2026." }],
  },
  {
    key: "novaswap",
    mediaDir: "Novaswap",
    title: "Novaswap",
    indexImage: "/Logos/Novaswap.jpg",
    kind: "Launching a stablecoin DEX on X",
    meta: "Senior Content Manager, Crowwd Labs · Novaswap launched on X in November 2025",
    lede: "A cross-chain stablecoin DEX that nobody had heard of. The X account opened in November 2025 and earned 1.1M impressions and 53.9K engagements by the end of April 2026.",
    channels: ["X", "Telegram", "Discord"],
    stats: [
      { val: "$800K+", label: "Organic trading volume in 3 months" },
      { val: "1.1M", label: "X impressions, 1 Nov 2025 to 27 Apr 2026" },
      { val: "53.9K", label: "X engagements in the same period" },
    ],
    situation:
      "Novaswap was a cross-chain stablecoin DEX built on Mynth Protocol with a solid product and nothing around it. Nobody knew the name, the community did not exist yet, and volume sat near zero.",
    strategy:
      "Launch it like a brand. I built a clear voice and visual direction, seeded the right communities, and tied content directly to on-chain actions so attention turned into trading volume.",
    execution: [
      "Built the full brand presence from scratch: voice, visual direction, posting cadence and community onboarding.",
      "Seeded targeted KOLs and designed trading incentives that drove on-chain activity.",
      "Ran a content program of weekly stablecoin reports, chain-expansion announcements, editorial pieces and partnership threads with protocols like Hemi Network.",
    ],
    results: [
      "$800K+ in organic trading volume in 3 months.",
      "1.1M X impressions and 53.9K engagements on an account opened in November 2025.",
    ],
    screenshots: [{ src: "/Results/Novaswap/Novaswap.png", caption: "Novaswap X analytics, 1 Nov 2025 to 27 Apr 2026." }],
  },
  {
    key: "prashan",
    mediaDir: "Prashan",
    title: "Prashan Agarwal",
    kind: "Founder brand on X and LinkedIn",
    meta: "Founder of FanTV, ex-CEO of Gaana · Oct 2024 to Aug 2025",
    lede: "I wrote a founder's posts in his voice, alongside the FanTV AI account. His X went from 12K to over 90K followers, and LinkedIn from 5K to 10K.",
    channels: ["X", "LinkedIn"],
    stats: [
      { val: "90K+", label: "X followers, up from 12K" },
      { val: "5K to 10K", label: "LinkedIn followers" },
    ],
    situation:
      "Prashan Agarwal is the founder of FanTV and a former CEO of Gaana.com. Moving into Web3 meant he needed a credible personal voice on X and LinkedIn. The accounts existed without a strategy or a consistent point of view, and real engagement was thin.",
    strategy:
      "I positioned him at the intersection of two stories the audience already cared about: a proven Indian tech operator, and a builder making a serious bet on Web3. Every post came back to that, written from his actual perspective so it sounded like him.",
    execution: [
      "Defined his positioning and content pillars, then built a calendar balancing founder lessons, Web3 commentary and the FanTV story.",
      "Wrote and managed all content across X and LinkedIn in his voice, run alongside the FanTV brand account so the two reinforced each other.",
      "Used his posts to humanise the FanTV brand and pull his network into the community effort.",
    ],
    results: ["X grew from 12K to over 90K followers.", "LinkedIn grew from 5K to 10K followers."],
    screenshots: [
      { src: "/Results/Prashan/Prashan_1.png", caption: "Prashan Agarwal X analytics, 1 Oct 2024 to 29 Aug 2025." },
      { src: "/Results/Prashan/Prashan_2.png", caption: "Prashan Agarwal analytics." },
      { src: "/Results/Prashan/Prashan_3.png", caption: "Prashan Agarwal analytics." },
    ],
  },
  {
    key: "mohaimina",
    mediaDir: "Mohaimina Haque",
    title: "Mohaimina Haque",
    kind: "CEO brand on Instagram and Facebook",
    meta: "CEO of Tony Roma's · Oct 2025 to Apr 2026",
    lede: "Personal brand for Tony Roma's first female CEO: 1.2M+ organic impressions in six months, with nothing spent on ads.",
    channels: ["Instagram", "Facebook"],
    stats: [
      { val: "1.2M+", label: "Organic impressions in six months" },
      { val: "$0", label: "Ad spend" },
    ],
    situation:
      "Mohaimina Haque (@attorneyminadc) is the CEO of Tony Roma's and the brand's first female CEO. She had an existing following on Instagram and Facebook but no strategy behind it.",
    strategy:
      "Lead with her actual experience as a female CEO in a legacy restaurant brand, and put substance ahead of volume so each post earned attention.",
    execution: [
      "Ran her personal brand across Instagram and Facebook: positioning, content pillars, copy and calendar.",
      "Sourced every post from her real perspective and experience as a CEO.",
      "Posted less often, with more substance in each post.",
    ],
    results: ["1.2M+ organic impressions in six months, with no ad spend."],
    screenshots: [
      { src: "/Results/Mohaimina Haque/Mohaimina.png", caption: "Mohaimina Haque analytics." },
      { src: "/Results/Mohaimina Haque/Posts Feed.png", caption: "Posts feed." },
      { src: "/Results/Mohaimina Haque/Reels Feed.png", caption: "Reels feed." },
    ],
  },
  {
    key: "tony",
    mediaDir: "Tony Roma's",
    title: "Tony Roma's",
    kind: "Brand content for partner-franchise launches",
    meta: "Freelance content strategy · Facebook analytics 1 Sep 2025 to 27 Apr 2026",
    lede: "Brand content for Tony Roma's, the ribs brand founded in 1972, including launches for partner-franchise locations. 678.5K organic Facebook views in eight months.",
    channels: ["Instagram", "Facebook"],
    stats: [
      { val: "678.5K", label: "Organic Facebook views, 1 Sep 2025 to 27 Apr 2026" },
      { val: "130.1K", label: "Views on the top post" },
      { val: "289.0K", label: "Instagram views" },
    ],
    situation:
      "Tony Roma's, the ribs brand founded in 1972, needed a consistent social presence and support for new partner-franchise location launches.",
    strategy:
      "Appetite-led brand content to drive reach and footfall, run alongside the personal brand of the CEO, Mohaimina Haque, so the brand had a human voice too. All organic.",
    execution: [
      "Ran the content strategy across Instagram and Facebook: calendar, visual direction and posting cadence.",
      "Built multi-phase campaigns for location launches, including Kimball, Tennessee.",
      "Built the CEO's personal brand in parallel. It has its own case study.",
    ],
    results: [
      "Facebook: 678.5K organic views, 3-second views up 371.3%, content interactions up 135.1%, watch time up 339.3%.",
      "Instagram: 289.0K views, reach up 52.7%, 6.1K content interactions.",
      "Top post: 130.1K views. The CEO's account stands at 6,519 followers.",
    ],
    screenshots: [
      { src: "/Results/Tony Roma's/TR_FacebookContent.png", caption: "Tony Roma's Facebook content, 1 Sep 2025 to 27 Apr 2026." },
      { src: "/Results/Tony Roma's/TR_Facebook.png", caption: "Tony Roma's Facebook insights." },
      { src: "/Results/Tony Roma's/TR_Instagram.png", caption: "Tony Roma's Instagram insights." },
      { src: "/Results/Tony Roma's/TR_InstagramContent.png", caption: "Tony Roma's Instagram content." },
      { src: "/Results/Tony Roma's/TR_FacebookMessaging.png", caption: "Facebook messaging." },
      { src: "/Results/Tony Roma's/TR_InstagramMessaging.png", caption: "Instagram messaging." },
    ],
  },
  {
    key: "sportsrush",
    mediaDir: "Sportsrush",
    title: "The SportsRush",
    indexImage: "/Logos/sportsrush.jpg",
    kind: "Instagram from 26 followers, 2024",
    meta: "Instagram content · Jun 2024 to Sep 2024",
    lede: "A sports media brand's Instagram, from 26 to 4,500 followers in three months, with reels at 4M and 2M views and no ad spend.",
    channels: ["Instagram"],
    stats: [
      { val: "26 to 4.5K", label: "Followers in three months" },
      { val: "4M", label: "Views on the top reel" },
      { val: "7M+", label: "Total views" },
    ],
    situation:
      "The SportsRush is a sports media brand. When I joined, its Instagram had 26 followers and no content strategy. I was brought in to build it from the ground up.",
    strategy:
      "Build a repeatable content engine: define formats and pillars that fit short-form sports media, then document them so the team could produce at volume without me in every frame.",
    execution: [
      "Developed the content strategy and identity: pillars, original video formats and production SOPs.",
      "Created formats designed for reach on Instagram's short-form surfaces.",
      "Set the team up to produce consistently from the documented system.",
    ],
    results: [
      "Two reels reached 4M and 2M views, both organic.",
      "Total account views crossed 7M in three months.",
      "Followers grew from 26 to 4,500 with no paid spend.",
    ],
    screenshots: [{ src: "/Results/Sportsrush/Sportsrush Viral Reels.png", caption: "The SportsRush reels." }],
  },
  {
    key: "potters",
    mediaDir: "Potters' Hub",
    title: "Potters' Hub",
    kind: "Shopify store, Meta ads and reels",
    meta: "Freelance digital strategy · Jan 2025 to May 2025",
    lede: "A pottery studio with no online sales. Month one: ₹20,000 in revenue from ₹3,500 of Meta ads, a 471% return.",
    channels: ["Instagram", "Meta Ads", "Shopify"],
    stats: [
      { val: "₹20,000", label: "Month-one revenue from ₹3,500 of Meta ads (471%)" },
      { val: "243K", label: "Views in 90 days" },
      { val: "95.8%", label: "Of reel views from non-followers" },
    ],
    situation:
      "Potters' Hub had a physical pottery studio and no online presence: no Shopify store, no digital revenue, and nothing built for discovery or sales online.",
    strategy:
      "Build the storefront and the demand at the same time: organic content to pull in new people, and paid social to turn intent into class bookings and retail sales, on a small budget.",
    execution: [
      "Built the Shopify store from scratch.",
      "Ran targeted Instagram and Meta ads for class bookings and retail.",
      "Made organic reels around pottery and education, with 95.8% of views coming from non-followers.",
    ],
    results: [
      "Month one: ₹20,000 in revenue from ₹3,500 of ad spend, a 471% return.",
      "Revenue ran at about ₹15K a month after that.",
      "243K views in 90 days, with accounts reached up 190%.",
    ],
    screenshots: [
      { src: "/Results/Potters' Hub/Potters' Hub_1.png", caption: "Potters' Hub Facebook insights, 1 Jan to 31 May 2025." },
      { src: "/Results/Potters' Hub/Potters Hub_2.png", caption: "Potters' Hub insights." },
      { src: "/Results/Potters' Hub/Potters Hub_3.png", caption: "Potters' Hub insights." },
      { src: "/Results/Potters' Hub/Potters Hub 4.png", caption: "Potters' Hub insights." },
    ],
  },
  {
    key: "opaque",
    mediaDir: "Opaque Studio",
    title: "Opaque Studio",
    kind: "Performance and social, via Mach1 Digital",
    meta: "Through Mach1 Digital · Mar 2024 to May 2024",
    lede: "Marketing for a luxury handcrafted home brand made with 700+ artisans: 4X ROAS on ₹3L a month of ad spend.",
    logo: "/Logos/Opaque-Studio.png",
    channels: ["Instagram", "Facebook", "Google Ads"],
    stats: [
      { val: "4X", label: "ROAS on ₹3L a month of ad spend" },
      { val: "30K to 41K", label: "Instagram followers" },
    ],
    situation:
      "Opaque Studio is a luxury D2C home brand: handcrafted furniture and bespoke decor, made to order with 700+ artisans across India. The marketing was not keeping up with the product.",
    strategy:
      "Treat it as a premium brand and a performance engine at once: aspirational social content to build desire, and disciplined paid media to turn that desire into orders, with full launch campaigns for new collections.",
    execution: [
      "Ran social strategy and execution on Instagram and Facebook, through Mach1 Digital.",
      "Managed Meta and Google performance, plus the website.",
      "Led product-launch campaigns, pre-launch storytelling through paid amplification, with designers, editors and a performance executive.",
    ],
    results: [
      "Scaled to ₹3L a month in ad spend at a 4X ROAS.",
      "Grew Instagram from 30K to 41K followers.",
    ],
    screenshots: [],
  },
  {
    key: "bima",
    mediaDir: "BimaBTC",
    title: "BimaBTC",
    kind: "Content on X",
    meta: "Senior Content Manager, Crowwd Labs · Sep 2025 to May 2026",
    lede: "BimaBTC already had a following. A posting system and timely market commentary earned 1.9M impressions between September 2025 and April 2026.",
    channels: ["X", "Telegram", "Discord"],
    stats: [
      { val: "1.9M", label: "X impressions, 1 Sep 2025 to 27 Apr 2026" },
      { val: "30.5K", label: "X engagements in the same period" },
      { val: "1.6%", label: "Engagement rate" },
    ],
    situation: "BimaBTC had a product worth following. The job was making the account's engagement reflect that.",
    strategy:
      "Win on consistency and relevance: a disciplined posting system plus timely market commentary.",
    execution: [
      "Built a posting system with a regular cadence and clear content pillars.",
      "Added timely market commentary so the account stayed relevant to what traders cared about that week.",
    ],
    results: ["1.9M impressions and 30.5K engagements, at a 1.6% engagement rate, between 1 September 2025 and 27 April 2026."],
    screenshots: [{ src: "/Results/BimaBTC/BimaBTC.png", caption: "BimaBTC X analytics, 1 Sep 2025 to 27 Apr 2026." }],
  },
  {
    key: "bones",
    mediaDir: "B&B",
    title: "Bones & Burgers",
    kind: "Social media, organic only",
    meta: "Freelance social media · Facebook and Instagram · Current client",
    lede: "An account full of bot followers, cleaned up and rebuilt with no ad spend.",
    channels: ["Facebook", "Instagram"],
    stats: [
      { val: "+160%", label: "Content interactions" },
      { val: "+287%", label: "Watch time" },
      { val: "+359%", label: "3-second views" },
    ],
    situation:
      "Bones & Burgers had an account full of bot followers, no posting schedule, and almost no real engagement. Before any growth, it needed a clean foundation.",
    strategy:
      "Reset, then rebuild on organic content: clear out the bots, set a real identity and cadence, and let strong content earn reach without paid spend.",
    execution: [
      "Audited and removed bot followers to get back to a true baseline.",
      "Rebuilt the content strategy: calendar, visual identity and voice.",
      "Posted consistently on an organic-only budget.",
    ],
    results: [
      "Facebook views up 79% and content interactions up 160%.",
      "Watch time up 287% and 3-second views up 359%.",
      "No paid budget behind any of it.",
    ],
    screenshots: [
      { src: "/Results/B&B/B&B_1.png", caption: "Bones & Burgers Instagram." },
      { src: "/Results/B&B/B&B_2.png", caption: "Bones & Burgers Instagram." },
      { src: "/Results/B&B/B&B_3.png", caption: "Bones & Burgers audience." },
    ],
  },
  {
    key: "culturegram",
    title: "The Culturegram",
    kind: "Website redesign on Ghost",
    meta: "Social and content strategy · Client since June 2026",
    lede: "A ground-up revamp of The Culturegram's website on Ghost, a library of custom illustrations, and the groundwork for a proper video podcast.",
    logo: "/Logos/Culturegram.png",
    preview: { video: "/Results/Culturegram/after-loop.mp4", poster: "/Results/Culturegram/after-loop-poster.jpg" },
    channels: ["Website (Ghost)", "Podcast", "Editorial report"],
    stats: [],
    situation:
      "The Culturegram's old site was a corporate services page about the company. There was no publishing infrastructure behind it: no way to run a podcast library, an essays section or a research report.",
    strategy:
      "Redesign it from the ground up as a content-first publication. I rebuilt the information architecture around content, hand-coded the theme, and replaced stock photography with a visual system built for the brand. It shipped in phases (brand shell, then podcast, then essays, then the report) so the founder could react at every stage.",
    execution: [
      "Rebuilt the site on Ghost with a hand-coded theme matched to an approved mockup.",
      "Built the podcast library with episode templates, guest bios and platform links, an essays section, and an editorial research report with custom illustrations.",
      "Worked on launching a proper video podcast; the first episode is made and not yet launched.",
      "Built a photo-treatment pipeline that draws brand-consistent doodle marks onto licensed photography.",
      "Ran rounds of stakeholder review and mobile polish, tested in real browsers before every deploy.",
    ],
    results: [
      "A content publication where the services page used to be, with a podcast library, an essays section and an editorial report.",
      "A visual identity of its own: doodled photo treatments and an illustrated report in place of stock imagery.",
    ],
    screenshots: [],
    beforeAfter: {
      video: {
        before: "/Results/Culturegram/before.mp4",
        after: "/Results/Culturegram/after.mp4",
        beforePoster: "/Results/Culturegram/before-poster.jpg",
        afterPoster: "/Results/Culturegram/after-poster.jpg",
      },
      screenshots: [
        { before: "/Results/Culturegram/before-home.png", after: "/Results/Culturegram/after-home.png", label: "Homepage" },
        { before: "/Results/Culturegram/before-content.png", after: "/Results/Culturegram/after-content.png", label: "Content hub" },
        { before: "/Results/Culturegram/before-podcast.png", after: "/Results/Culturegram/after-podcast.png", label: "Podcast" },
        { before: "/Results/Culturegram/before-team.png", after: "/Results/Culturegram/after-team.png", label: "Team" },
        { before: "/Results/Culturegram/before-contact.png", after: "/Results/Culturegram/after-contact.png", label: "Contact" },
      ],
    },
  },
];

export const flagshipKeys = ["fantv", "defx", "fere"] as const;

export function getCase(key: string) {
  return caseStudies.find((c) => c.key === key);
}
