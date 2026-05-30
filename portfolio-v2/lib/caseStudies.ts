import type { CSSProperties } from "react";

export type Metric = { val: string; label: string };

export type Thumb = {
  /** Background gradient for the card thumb + modal hero */
  bg: string;
  /** Local logo path (under /public). Mutually exclusive with `initials`. */
  logo?: string;
  cardImgStyle?: CSSProperties;
  modalImgStyle?: CSSProperties;
  initials?: string;
  subtitle?: string;
  initColor?: string;
};

export type CaseStudy = {
  key: string;
  // Card face
  tag: string;
  title: string;
  desc: string;
  cardMetrics: Metric[];
  thumb: Thumb;
  // Modal detail
  role: string;
  timeline?: string;
  channels: string[];
  stats: Metric[];
  situation: string;
  strategy: string;
  execution: string[];
  results: string[];
  screenshots: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    key: "fantv",
    tag: "Web3 / Social Growth",
    title: "FanTV AI",
    desc: "Took a stagnant account to 300K and built the community around it: Discord, Telegram, KOLs, the full structure.",
    cardMetrics: [
      { val: "300K", label: "Followers (from 70K)" },
      { val: "12M+", label: "X Impressions" },
      { val: "150K+", label: "Community" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #dde3f0 0%, #c8d2ea 100%)",
      logo: "/Logos/FanTV-AI.jpg",
      cardImgStyle: { mixBlendMode: "multiply" },
      modalImgStyle: { mixBlendMode: "multiply" },
    },
    role: "Social Media Marketer",
    timeline: "Oct 2024 to Aug 2025",
    channels: ["X", "Instagram", "Discord", "Telegram"],
    stats: [
      { val: "300K", label: "X Followers (from 70K)" },
      { val: "12M+", label: "Impressions in 6 months" },
      { val: "150K+", label: "Community Members" },
      { val: "+70%", label: "Community Retention" },
    ],
    situation:
      "FanTV came to me with 70K followers and no momentum behind them. The account posted irregularly, the community was quiet, and nothing was pulling new people in. In a Web3 market that rewards attention and punishes silence, the brand needed a system that compounded week over week, not one-off posts.",
    strategy:
      "I treated FanTV as two engines that fed each other: a brand account built for reach and shareability, and the founder's personal brand built for trust. The plan was to turn consistent, opinionated content into a real reason to follow, then convert that attention into an owned community on Discord and Telegram where retention and advocacy actually live.",
    execution: [
      "Built a repeatable content system on X with defined pillars, a weekly cadence, and formats (threads, product narratives, market takes) engineered to be shared, not just seen.",
      "Grew the founder's personal brand in parallel, from 12K to 100K on X and 5K to 10K on LinkedIn, using his real perspective as a Web3 builder and Indian tech founder.",
      "Built Discord and Telegram from zero to 150K+ members with onboarding flows, tier systems, reward mechanics, and a steady cadence of AMAs.",
      "Ran KOL and ambassador programs to seed reach, leading a team of 100+ at peak (mods, KOLs, ambassadors, designers, editors) with clear SOPs and review loops.",
    ],
    results: [
      "Brand X account grew from 70K to 300K followers.",
      "12M+ impressions in six months across brand and founder accounts.",
      "Community reached 150K+ members with a 70% lift in retention.",
      "Founder built into a recognisable voice that fed discovery back into the brand.",
    ],
    screenshots: [
      "/Results/FanTV/FanTV X Mobile SS.png",
      "/Results/FanTV/FanTV_Web1.png",
      "/Results/FanTV/FanTV_Web2.png",
      "/Results/FanTV/FanTV_Web3.png",
    ],
  },
  {
    key: "prashan",
    tag: "Executive Personal Brand / X & LinkedIn",
    title: "Prashan Agarwal",
    desc: "Grew a Web3 CEO's X from 12K to 100K and built out LinkedIn, while running FanTV at the same time.",
    cardMetrics: [
      { val: "12K to 100K", label: "X Followers" },
      { val: "5K to 10K", label: "LinkedIn" },
      { val: "12M+", label: "Impressions" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #0c1828 0%, #1e3a60 100%)",
      initials: "Prashan Agarwal",
      subtitle: "CEO, FanTV · ex-CEO Gaana.com",
      initColor: "#a8c4e8",
    },
    role: "Executive Personal Branding",
    timeline: "Oct 2024 to Aug 2025",
    channels: ["X (Twitter)", "LinkedIn"],
    stats: [
      { val: "12K to 100K", label: "X Followers" },
      { val: "5K to 10K", label: "LinkedIn Followers" },
      { val: "12M+", label: "Combined Impressions" },
      { val: "10 mo", label: "Duration" },
    ],
    situation:
      "Prashan Agarwal is CEO of FanTV and former CEO of Gaana.com, one of India's largest music streaming platforms. Moving into Web3 meant he needed a credible personal voice on X and LinkedIn, not a broadcast feed. The accounts existed but had no strategy, no consistent point of view, and little real engagement.",
    strategy:
      "I positioned him at the intersection of two stories the audience already cared about: a proven Indian tech operator, and a builder making a serious bet on Web3. Every post laddered up to that positioning, written from his actual perspective so it read as him, not a ghostwritten brand account.",
    execution: [
      "Defined his positioning and content pillars, then built a calendar balancing founder lessons, Web3 commentary, and the FanTV story.",
      "Wrote and managed all content across X and LinkedIn in his voice, run alongside the FanTV brand account so the two reinforced each other.",
      "Used his posts to humanise the FanTV brand and pull his network into the broader community effort.",
    ],
    results: [
      "X grew from 12K to 100K followers.",
      "LinkedIn grew from 5K to 10K followers.",
      "His content fed directly into FanTV's growth, part of the 12M+ impressions the program generated.",
    ],
    screenshots: [
      "/Results/Prashan/Prashan_1.png",
      "/Results/Prashan/Prashan_2.png",
      "/Results/Prashan/Prashan_3.png",
    ],
  },
  {
    key: "fere",
    tag: "AI / Growth Marketing",
    title: "Fere AI",
    desc: "Took an AI trading platform from invisible to 12K signups. Voice, content, email, community. Built without a paid budget.",
    cardMetrics: [
      { val: "12K+", label: "AI Agent Signups" },
      { val: "6.8M", label: "X Impressions" },
      { val: "400-500", label: "Daily Active Users" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #030c1f 0%, #071830 100%)",
      logo: "/Logos/Fere-AI.png",
      modalImgStyle: { mixBlendMode: "screen" },
    },
    role: "Sr. Content Manager, Crowwd Labs",
    timeline: "Sep 2025 to Present",
    channels: ["X", "Telegram", "Email", "YouTube", "Blog", "Medium", "Farcaster"],
    stats: [
      { val: "12K+", label: "AI Agent Signups" },
      { val: "400-500", label: "Daily Active Users" },
      { val: "6.8M", label: "X Impressions" },
      { val: "195K+", label: "Engagements" },
    ],
    situation:
      "Fere AI had a working AI trading agent and almost no awareness. The product was live and the tech was solid, but the brand did not exist yet and traders had no reason to find it.",
    strategy:
      "I built the brand around what traders actually stop to read: timely market intelligence and proof the agent worked. Instead of generic AI hype, the content led with data, trades, and real use cases, then used owned channels (email and community) to convert attention into signups and daily usage.",
    execution: [
      "Defined the brand voice and positioning from day one and built a content system on X around trading threads, data drops, and market takes.",
      "Led a team of 5 across design, copy, and community to keep output high without losing quality.",
      "Layered in email sequences, a points-program redesign, video scripts, and demo hooks to move people from follow to signup to active use.",
      "Built weekly reporting to tie content and campaigns back to signups and daily active users.",
    ],
    results: [
      "12K+ signups for the AI agent in a few months.",
      "400 to 500 daily active users, real usage rather than vanity numbers.",
      "6.8M X impressions and 195K+ engagements.",
    ],
    screenshots: ["/Results/Fere AI/Fere AI.png"],
  },
  {
    key: "novaswap",
    tag: "DeFi / Brand Building",
    title: "Novaswap",
    desc: "Launched Novaswap end to end: brand, community, and trading incentives. $650K+ in organic volume in 90 days.",
    cardMetrics: [
      { val: "$650K+", label: "Organic Volume, 90 Days" },
      { val: "1.1M", label: "X Impressions" },
      { val: "19,000%", label: "Profile Visit Growth" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #010d1a 0%, #042535 100%)",
      logo: "/Logos/Novaswap.jpg",
      cardImgStyle: { mixBlendMode: "screen" },
      modalImgStyle: { mixBlendMode: "screen" },
    },
    role: "Sr. Content Manager, Crowwd Labs",
    timeline: "Sep 2025 to Present",
    channels: ["X", "Telegram", "Discord"],
    stats: [
      { val: "$650K+", label: "Organic Volume, 90 Days" },
      { val: "1.1M", label: "X Impressions" },
      { val: "53K+", label: "Engagements" },
      { val: "19,000%", label: "Profile Visit Increase" },
    ],
    situation:
      "Novaswap was a cross-chain stablecoin DEX built on Mynth Protocol with a solid product and nothing around it: no name recognition, no community, and no volume.",
    strategy:
      "Launch it like a brand, not a contract. I built a clear voice and visual direction, seeded the right communities, and tied content directly to on-chain actions so attention turned into trading volume rather than empty impressions.",
    execution: [
      "Built the full brand presence from scratch: voice, visual direction, posting cadence, and community onboarding.",
      "Seeded targeted KOLs and designed trading incentives that drove real on-chain activity.",
      "Ran a content program spanning weekly stablecoin reports, chain-expansion announcements, editorial pieces, and partnership threads with protocols like Hemi Network.",
    ],
    results: [
      "$650K+ in organic trading volume in the first 90 days, and it held.",
      "1.1M X impressions and 53K+ engagements.",
      "19,000% increase in profile visits.",
    ],
    screenshots: ["/Results/Novaswap/Novaswap.png"],
  },
  {
    key: "defx",
    tag: "DeFi / Volume Growth",
    title: "Defx",
    desc: "Took a perp DEX from under $100K monthly volume to $50M+. Verified $1.5B cumulative on DefiLlama.",
    cardMetrics: [
      { val: "$50M+", label: "Monthly Volume" },
      { val: "$1.5B+", label: "Cumulative Perp Vol." },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #050508 0%, #0c1028 100%)",
      logo: "/Logos/Defx.png",
      modalImgStyle: { mixBlendMode: "screen" },
    },
    role: "Sr. Content Manager, Crowwd Labs",
    timeline: "Sep 2025 to Jan 2026",
    channels: ["X", "Telegram", "Discord"],
    stats: [
      { val: "$50M+", label: "Monthly Volume (from sub-$100K)" },
      { val: "$1.5B+", label: "Cumulative Perp Volume" },
    ],
    situation:
      "Defx had a working perpetuals DEX and almost no one using it, under $100K in monthly volume when I joined. There was no community and no clear reason for traders to show up.",
    strategy:
      "Drive volume by combining reasons to trade with reasons to stay: incentive-led acquisition through contests and KOLs, backed by organic content and UGC that built credibility around the product.",
    execution: [
      "Designed and ran trading contests that pulled active traders onto the platform.",
      "Built KOL relationships and a community of people actually trading, not just watching.",
      "Produced UGC and organic content to build awareness and trust around the product.",
    ],
    results: [
      "Monthly volume grew from under $100K to $50M+.",
      "$1.5B cumulative perpetual volume, verified and public on DefiLlama.",
      "Most of the original content was removed when the company was sold and rebranded.",
    ],
    screenshots: ["/Results/Defx/Defx.png"],
  },
  {
    key: "bima",
    tag: "Web3 / Content Strategy",
    title: "BimaBTC",
    desc: "144K followers, 2.4% engagement rate, 2.3M impressions. Built on posting discipline, not paid reach.",
    cardMetrics: [
      { val: "2.3M", label: "X Impressions" },
      { val: "144K", label: "Followers" },
      { val: "2.4%", label: "Engagement Rate" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #f2f0ea 0%, #e8e4d4 100%)",
      logo: "/Logos/Bima-BTC.jpg",
      cardImgStyle: { mixBlendMode: "multiply" },
      modalImgStyle: { mixBlendMode: "multiply" },
    },
    role: "Sr. Content Manager, Crowwd Labs",
    timeline: "Sep 2025 to Apr 2026",
    channels: ["X", "Telegram", "Discord"],
    stats: [
      { val: "2.3M", label: "X Impressions" },
      { val: "58K", label: "Engagements" },
      { val: "2.4%", label: "Engagement Rate" },
      { val: "144K", label: "Followers" },
    ],
    situation:
      "BimaBTC had a product worth following. The job was making the account reflect that with real engagement, not a padded follower count.",
    strategy:
      "Win on consistency and relevance. A disciplined posting system plus timely market commentary would earn engagement that compounds, rather than chasing reach through giveaways.",
    execution: [
      "Built a disciplined posting system with a regular cadence and clear content pillars.",
      "Layered in timely market commentary so the account stayed relevant to what traders cared about that week.",
      "Focused on content that gave people a reason to stay engaged, lifting rate rather than just count.",
    ],
    results: [
      "2.3M impressions and 58K engagements.",
      "2.4% engagement rate at 144K followers.",
      "Growth built on consistency rather than paid reach.",
    ],
    screenshots: ["/Results/BimaBTC/BimaBTC.png"],
  },
  {
    key: "tony",
    tag: "F&B / Social + Personal Brand",
    title: "Tony Roma's",
    desc: "Content strategy for a 53-year-old global chain, plus executive personal branding for their first female CEO. 100% organic.",
    cardMetrics: [
      { val: "729K", label: "Facebook Views" },
      { val: "+448%", label: "3-Sec Video Views" },
      { val: "305K", label: "Instagram Views" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #5a0808 0%, #8b1515 100%)",
      logo: "/Logos/Tony-Romas.jpg",
      cardImgStyle: { mixBlendMode: "screen" },
      modalImgStyle: { mixBlendMode: "screen" },
    },
    role: "Freelance Content Strategist",
    timeline: "Jan 2025 to Present",
    channels: ["Instagram", "Facebook"],
    stats: [
      { val: "729K", label: "Facebook Views (100% organic)" },
      { val: "+448%", label: "3-Second Video Views" },
      { val: "305K", label: "Instagram Views" },
      { val: "130K", label: "Top Post Views" },
    ],
    situation:
      "Tony Roma's, a 53-year-old global restaurant brand, needed a consistent social presence and support for new location launches. They also wanted to build the personal brand of their CEO, Mohaimina Haque, the brand's first female CEO.",
    strategy:
      "Run the brand and the CEO as complementary stories: appetite-driven brand content to drive reach and footfall, and an authentic executive voice to add a human, leadership layer. All organic, with no paid spend.",
    execution: [
      "Ran the full content strategy across Instagram and Facebook: calendar, visual direction, and posting cadence.",
      "Built multi-phase campaigns for location launches, including Kimball, Tennessee.",
      "Built the CEO's personal brand in parallel, positioning her as an executive voice in the restaurant industry.",
    ],
    results: [
      "Facebook: 729K views, +448% 3-second views, +76% content interactions, +386% watch time.",
      "Instagram: 305K views, +14% reach, +100% content interactions.",
      "Top post reached 130,100 views; CEO account grew to 6,000+ followers.",
    ],
    screenshots: [
      "/Results/Tony Roma's/TR_Facebook.png",
      "/Results/Tony Roma's/TR_FacebookContent.png",
      "/Results/Tony Roma's/TR_FacebookMessaging.png",
      "/Results/Tony Roma's/TR_Instagram.png",
      "/Results/Tony Roma's/TR_InstagramContent.png",
      "/Results/Tony Roma's/TR_InstagramMessaging.png",
    ],
  },
  {
    key: "mohamina",
    tag: "Executive Personal Brand / Instagram & Facebook",
    title: "Mohaimina Haque",
    desc: "Turned a quiet executive Instagram (@attorneyminadc) into a real presence. 1.2M+ impressions in 6 months, nothing spent on ads.",
    cardMetrics: [
      { val: "1.2M+", label: "Impressions" },
      { val: "6 mo", label: "Duration" },
      { val: "$0", label: "Paid Spend" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #5a0808 0%, #8b1515 100%)",
      initials: "Mohaimina Haque",
      subtitle: "CEO, Tony Roma's",
      initColor: "#f5c5c5",
    },
    role: "Executive Personal Branding",
    timeline: "Oct 2025 to Apr 2026",
    channels: ["Instagram", "Facebook"],
    stats: [
      { val: "1.2M+", label: "Organic Impressions" },
      { val: "6 months", label: "Duration" },
      { val: "$0", label: "Paid Spend" },
      { val: "100%", label: "Organic" },
    ],
    situation:
      "Mohaimina Haque (@attorneyminadc) is the CEO of Tony Roma's and the brand's first female CEO. She had an existing following on Instagram and Facebook but no strategy behind it, and the goal was to give people a real reason to follow.",
    strategy:
      "Lead with her actual experience as a female CEO in a legacy restaurant brand. Prioritise substance over volume so each post earned attention, building a genuine executive presence rather than chasing follower count.",
    execution: [
      "Ran her personal brand across Instagram and Facebook: positioning, content pillars, copy, and calendar.",
      "Sourced every post from her real perspective and experience as a CEO.",
      "Prioritised quality over output, with fewer posts and more substance.",
    ],
    results: [
      "1.2M+ organic impressions in six months, with no ad spend.",
      "Account moved from silent to consistently present with a clear voice.",
      "Became a profile people actually noticed and engaged with.",
    ],
    screenshots: [
      "/Results/Mohaimina Haque/Mohaimina.png",
      "/Results/Mohaimina Haque/Posts Feed.png",
      "/Results/Mohaimina Haque/Reels Feed.png",
    ],
  },
  {
    key: "potters",
    tag: "E-Commerce / Paid Ads",
    title: "Potters' Hub",
    desc: "Built their Shopify store and ran Meta ads that turned ₹3,500 into ₹20,000 in month one.",
    cardMetrics: [
      { val: "471%", label: "Month 1 ROI" },
      { val: "243K", label: "Views, 90 Days" },
      { val: "+190%", label: "Accounts Reached" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 100%)",
      logo: "/Logos/Potters-Hub.jpg",
      cardImgStyle: { mixBlendMode: "multiply" },
      modalImgStyle: { mixBlendMode: "multiply" },
    },
    role: "Freelance Digital Strategist",
    timeline: "Jan 2025 to May 2025",
    channels: ["Instagram", "Meta Ads", "Shopify"],
    stats: [
      { val: "471%", label: "Month 1 ROI" },
      { val: "243K", label: "Views in 90 Days" },
      { val: "+190%", label: "Accounts Reached" },
      { val: "104K", label: "Top Reel Views" },
    ],
    situation:
      "Potters' Hub had a physical pottery studio and no online presence: no Shopify store, no digital revenue, and nothing built for discovery or sales online.",
    strategy:
      "Build the digital storefront and the demand at the same time. Organic content to pull in new people, and paid social to convert intent into class bookings and retail sales, all on a small, efficient budget.",
    execution: [
      "Built the Shopify store from scratch.",
      "Ran targeted Instagram and Meta ads for class bookings and retail.",
      "Created organic reels around pottery and education, with 95.8% of views coming from non-followers.",
    ],
    results: [
      "Month one: ₹20,000 revenue from ₹3,500 ad spend, a 471% ROI.",
      "Scaled to roughly ₹15K per month from there.",
      "243K views in 90 days, accounts reached up 190%, top reel at 104K views.",
    ],
    screenshots: [
      "/Results/Potters' Hub/Potters' Hub_1.png",
      "/Results/Potters' Hub/Potters Hub_2.png",
      "/Results/Potters' Hub/Potters Hub_3.png",
      "/Results/Potters' Hub/Potters Hub 4.png",
    ],
  },
  {
    key: "bones",
    tag: "F&B / Organic Growth",
    title: "Bones & Burgers",
    desc: "Inherited an account full of bot followers. Cleaned it up and rebuilt it. No ads, just content.",
    cardMetrics: [
      { val: "+160%", label: "Content Interactions" },
      { val: "+287%", label: "Watch Time" },
      { val: "$0", label: "Ad Spend" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #5a0808 0%, #8b1515 100%)",
      logo: "/Logos/bones-and-burgers.jpg",
      cardImgStyle: { mixBlendMode: "screen" },
      modalImgStyle: { mixBlendMode: "screen" },
    },
    role: "Freelance Social Media Manager",
    timeline: "Jan 2025 to Present",
    channels: ["Facebook", "Instagram"],
    stats: [
      { val: "+160%", label: "Content Interactions" },
      { val: "+287%", label: "Watch Time" },
      { val: "+359%", label: "3-Second Views" },
      { val: "$0", label: "Ad Spend" },
    ],
    situation:
      "Bones & Burgers inherited an account full of bot followers, no posting schedule, and effectively zero real engagement. Before any growth, it needed a clean foundation.",
    strategy:
      "Reset, then rebuild on organic quality. Clear out the bots, establish a real identity and cadence, and let strong content drive genuine reach without paid spend.",
    execution: [
      "Audited and removed bot followers to get back to a true baseline.",
      "Rebuilt the content strategy: calendar, visual identity, and voice.",
      "Posted consistently on an organic-only budget, focused on quality over volume.",
    ],
    results: [
      "Facebook views up 79% and content interactions up 160%.",
      "Watch time up 287% and 3-second views up 359%.",
      "All organic, with no paid budget behind it.",
    ],
    screenshots: [
      "/Results/B&B/B&B_1.png",
      "/Results/B&B/B&B_2.png",
      "/Results/B&B/B&B_3.png",
    ],
  },
  {
    key: "opaque",
    tag: "Luxury D2C / Performance Marketing",
    title: "Opaque Studio",
    desc: "Ran all marketing for a luxury handcrafted home brand: Meta, Google, socials, product launches. 4X ROAS at ₹3L/month.",
    cardMetrics: [
      { val: "4X", label: "ROAS" },
      { val: "+37%", label: "Follower Growth" },
      { val: "₹3L/mo", label: "Ad Spend Managed" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #1a1208 0%, #4a3520 50%, #6b4c2a 100%)",
      logo: "/Logos/Opaque-Studio.png",
      cardImgStyle: { filter: "invert(1) brightness(1.3)" },
      modalImgStyle: { filter: "invert(1) brightness(1.3)" },
    },
    role: "Performance & Social Marketer, Mach1",
    channels: ["Instagram", "Facebook", "Google Ads"],
    stats: [
      { val: "4X", label: "ROAS" },
      { val: "₹3L/mo", label: "Ad Spend Managed" },
      { val: "30K to 41K", label: "Followers Grown" },
      { val: "2+", label: "Product Launches" },
    ],
    situation:
      "Opaque Studio is a luxury D2C home brand: handcrafted furniture and bespoke decor, made to order with 700+ artisans across India. The product was strong; the marketing was not keeping up with it.",
    strategy:
      "Treat it as a premium brand and a performance engine at once: aspirational social content to build desire, and disciplined paid media to turn that desire into orders, supported by full launch campaigns for new collections.",
    execution: [
      "Ran marketing end to end at Mach1: social strategy and execution on Instagram and Facebook.",
      "Managed Meta and Google performance, plus the website.",
      "Led full product-launch campaigns from pre-launch storytelling to paid amplification, with a team of designers, editors, and a performance exec.",
    ],
    results: [
      "Scaled to ₹3L/month in ad spend at a consistent 4X ROAS.",
      "Grew Instagram from 30K to 41K followers.",
      "Launched multiple collections driving both awareness and direct sales.",
    ],
    screenshots: [],
  },
  {
    key: "sportrush",
    tag: "Sports Media / Content Growth",
    title: "The Sportrush",
    desc: "Built their entire Instagram presence from 26 followers. New content strategy, formats, SOPs. Two reels went viral: 4M and 2M views.",
    cardMetrics: [
      { val: "7M+", label: "Total Views" },
      { val: "26 to 4.5K", label: "Followers" },
      { val: "$0", label: "Ad Spend" },
    ],
    thumb: {
      bg: "linear-gradient(135deg, #0a1a0a 0%, #0d2b0d 100%)",
      logo: "/Logos/sportsrush.jpg",
      cardImgStyle: { mixBlendMode: "lighten", opacity: 0.9 },
      modalImgStyle: { mixBlendMode: "lighten" },
    },
    role: "Content Strategist",
    timeline: "Jun 2024 to Sep 2024",
    channels: ["Instagram"],
    stats: [
      { val: "7M+", label: "Total Views" },
      { val: "4M", label: "Single Reel (Viral)" },
      { val: "26 to 4.5K", label: "Followers in 3 Months" },
      { val: "$0", label: "Ad Spend" },
    ],
    situation:
      "The Sportrush is a sports media brand. When I joined, the Instagram had 26 followers and no real content strategy. I was brought in to build it from the ground up.",
    strategy:
      "Build a repeatable content engine, not just posts: define formats and pillars that fit short-form sports media, then document them so the team could execute at volume without me in every frame.",
    execution: [
      "Developed the full content strategy and identity: pillars, original video formats, and production SOPs.",
      "Created formats designed for reach on Instagram's short-form surfaces.",
      "Set the team up to execute consistently from the documented system.",
    ],
    results: [
      "Two reels went viral at 4M and 2M views, both organic.",
      "Total account views crossed 7M in three months.",
      "Followers grew from 26 to 4,500 with zero paid spend.",
    ],
    screenshots: ["/Results/Sportsrush/Sportsrush Viral Reels.png"],
  },
];
