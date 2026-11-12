// One hook per article for its header image. The title already shows under the image
// (on this site and in LinkedIn, X and Slack previews), so the hook adds the one number
// that makes the post worth opening, never the title again. Every number is from the post.
// viz: pct = 100-dot grid, vs = two bars, count = people dots. No full stops (graphics rule).
export type Hook = {
  stat: string;
  line: string;
  viz?: { kind: "pct"; value: number } | { kind: "vs"; a: [string, number, string]; b: [string, number, string] } | { kind: "count"; value: number };
};

export const hooks: Record<string, Hook> = {
  "ai-ad-fraud-is-draining-the-budget-ai-ad-buying-wins": { stat: "$26.8B", line: "of programmatic ad budget wasted each year", viz: { kind: "vs", a: ["2023", 20, "$20B"], b: ["2025", 26.8, "$26.8B"] } },
  "ai-ad-spend-is-outrunning-what-marketers-can-prove": { stat: "15.3%", line: "of marketing budgets now go to AI", viz: { kind: "pct", value: 15 } },
  "ai-content-homogenization-what-the-peer-reviewed-data-says": { stat: "15%", line: "more alike once ChatGPT writes your brand copy" },
  "ai-content-marketings-only-moat-is-original-research": { stat: "39%", line: "of B2B teams see AI content pay off", viz: { kind: "pct", value: 39 } },
  "ai-content-marketings-performance-gap-and-how-to-close-it": { stat: "48 points", line: "between feeling faster and performing better", viz: { kind: "vs", a: ["Feel more productive", 87, "87%"], b: ["See better results", 39, "39%"] } },
  "ai-content-marketings-volume-trap-and-what-actually-works": { stat: "5.44x", line: "more traffic for pages people wrote", viz: { kind: "vs", a: ["Written by people", 5.44, "5.44x"], b: ["AI generated", 1, "1x"] } },
  "ai-influencer-marketings-hidden-fraud-tax-its-19": { stat: "19%", line: "of influencer spend reaches people who do not exist", viz: { kind: "pct", value: 19 } },
  "ai-marketing-automation-is-architecturally-broken": { stat: "Under 10%", line: "of CMOs get measurable value from AI tools" },
  "ai-marketing-automation-is-scaling-but-your-organization-probably-isnt": { stat: "30%", line: "of CMOs can scale the AI they want", viz: { kind: "vs", a: ["Want to lead in AI", 70, "70%"], b: ["Can scale it", 30, "30%"] } },
  "ai-marketing-automation-why-91-use-it-but-41-can-prove-it-works": { stat: "41%", line: "can prove AI pays off, down from 49%", viz: { kind: "vs", a: ["Use AI", 91, "91%"], b: ["Can prove it works", 41, "41%"] } },
  "ai-marketing-tools-are-slowing-your-campaigns-down": { stat: "34%", line: "of campaigns now take a month to launch", viz: { kind: "vs", a: ["Two years ago", 5, "5%"], b: ["Now", 34, "34%"] } },
  "ai-paid-ads-are-breaking-b2b-signal-quality-is-the-fix": { stat: "$5.34", line: "for one B2B click, up 29% in a year" },
  "ai-paid-ads-hit-57b-heres-why-26-8b-of-it-disappeared": { stat: "$57B", line: "on AI ads this year, placed in milliseconds" },
  "ai-social-media-marketing-isnt-working-heres-the-fix": { stat: "26%", line: "of people prefer AI creator content", viz: { kind: "pct", value: 26 } },
  "ai-social-media-tools-are-working-your-brand-isnt": { stat: "50%", line: "of consumers prefer brands that skip AI content", viz: { kind: "pct", value: 50 } },
  "answer-engine-optimization-the-fix-behind-falling-traffic": { stat: "61%", line: "fewer clicks on a #1 result under an AI Overview" },
  "answer-engine-optimization-the-gap-between-rank-and-citation": { stat: "38%", line: "of AI citations still come from the top 10", viz: { kind: "vs", a: ["July 2025", 76, "76%"], b: ["March 2026", 38, "38%"] } },
  "b2b-saas-marketing-tactics-happen-before-your-funnel-starts": { stat: "67%", line: "of buyers decide before they talk to sales", viz: { kind: "pct", value: 67 } },
  "email-marketing-automation-is-backwards-the-18x-revenue-gap-nobody": { stat: "18x", line: "more revenue per send from automated flows" },
  "email-open-rates-are-lying-to-you-58-of-them": { stat: "58%", line: "of your email opens are Apple's machines", viz: { kind: "pct", value: 58 } },
  "finding-real-leads-with-no-paid-data": { stat: "$0", line: "spent on lead data, and every company is real" },
  "how-i-built-the-account-research-engine": { stat: "$0", line: "a month to run the whole research engine" },
  "why-i-built-my-own-outbound-tool": { stat: "Build or buy", line: "my honest reasons for building a sales tool" },
  "incrementality-testing-exposes-the-31-flaw-in-your-attribution": { stat: "31%", line: "of paid conversions would have happened anyway", viz: { kind: "pct", value: 31 } },
  "marketing-analytics-investment-is-up-measurement-confidence-is-down": { stat: "39%", line: "of teams measure well, on an $8B tool market", viz: { kind: "pct", value: 39 } },
  "marketing-attribution-created-the-doom-loop-heres-how-to-break-it": { stat: "84%", line: "of companies are stuck in the brand doom loop", viz: { kind: "pct", value: 84 } },
  "marketing-attribution-is-destroying-your-brand-budget": { stat: "80%", line: "of the buying journey attribution cannot see", viz: { kind: "pct", value: 80 } },
  "marketing-budget-allocation-is-backing-the-wrong-bet": { stat: "24x", line: "the valuation for the best retention, 5x for the worst", viz: { kind: "vs", a: ["Top quartile retention", 24, "24x"], b: ["Bottom quartile", 5, "5x"] } },
  "product-led-growth-activation-the-60-leak-in-your-conversion-funnel": { stat: "60%", line: "of free users can leave before the aha moment", viz: { kind: "pct", value: 60 } },
  "product-led-growth-metrics-that-actually-predict-revenue": { stat: "61%", line: "faster growth for teams that track PQLs" },
  "product-led-growth-promised-to-kill-sales-teams-the-winners-brought": { stat: "67%", line: "of buyers want rep-free, yet the winners kept sales" },
  "product-led-growth-was-supposed-to-kill-sales-teams": { stat: "107", line: "SaaS firms studied, and hybrid selling won" },
  "saas-cac-payback-is-getting-worse-more-pipeline-wont-fix-it": { stat: "42%", line: "longer to earn back what a customer costs" },
  "saas-growth-strategy-pricing-architecture-beats-csm": { stat: "108%", line: "NRR on usage pricing, 98% on seats", viz: { kind: "vs", a: ["Usage pricing", 108, "108%"], b: ["Seat pricing", 98, "98%"] } },
  "saas-growth-strategy-stop-optimizing-for-new-logos-in-2026": { stat: "5x", line: "the valuation gap from 15 points of NRR" },
  "saas-growth-strategy-why-expansion-arr-now-beats-new-logos": { stat: "4.8x", line: "the valuation gap between 113% and 98% NRR", viz: { kind: "vs", a: ["113% NRR", 24, "24x revenue"], b: ["98% NRR", 5, "5x revenue"] } },
  "the-authenticity-arbitrage-41-of-linkedin-content-is-ai-thats-your": { stat: "41%", line: "of LinkedIn posts are AI, and they earn 45% less", viz: { kind: "pct", value: 41 } },
  "the-buying-committee-just-outgrew-your-funnel": { stat: "13", line: "people in the average B2B deal", viz: { kind: "count", value: 13 } },
};
