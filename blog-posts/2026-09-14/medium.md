# Marketing Analytics Investment Is Up. Measurement Confidence Is Down.

*The $8B industry where spending more buys less certainty*

![Abstract bar chart and trend lines in dark slate and red against a dark background, representing marketing analytics measurement data showing investment growth alongside declining confidence.](https://raw.githubusercontent.com/KaranSud/marketing-portfolio/main/blog-posts/2026-09-14/hero.jpg)

Every CMO I know has a measurement vendor they don't fully trust and a dashboard that gets shared more than it gets acted on.

That sentence should bother you if you run a marketing function. The industry has been sold a specific story for the better part of a decade: better data, better decisions. More investment in measurement tools, higher confidence in where your budget actually works. The story is neat, logical, and at this point demonstrably wrong.

Marketing analytics spend is accelerating. Confidence in what measurement actually produces is not. Those two facts coexist, and the gap between them is now a business problem that no additional tool purchase can fix.

## The stat that's rewriting every CMO's 2026 planning conversation

[According to Gartner's 2025 CMO Spend Survey](https://www.gartner.com/en/newsroom/press-releases/2025-05-12-gartner-2025-cmo-spend-survey-reveals-marketing-budgets-have-flatlined-at-seven-percent-of-overall-company-revenue), marketing budgets held flat at 7.7% of company revenue for the second consecutive year. Same number, same executives, same pressure to demonstrate ROI. The survey covered 402 CMOs across North America, the UK, and Europe, with the majority representing companies above $1 billion in revenue. These are not underfunded startups struggling to find budget for a Looker dashboard.

The more interesting data point comes from the same survey: [59% of those CMOs say they have insufficient budget to execute their strategy](https://www.gartner.com/en/newsroom/press-releases/2025-05-12-gartner-2025-cmo-spend-survey-reveals-marketing-budgets-have-flatlined-at-seven-percent-of-overall-company-revenue). More than half of the people responsible for marketing at major enterprises feel they cannot do their job at the level required. And yet the analytics tools market, where a meaningful share of that marketing budget goes, is growing at double-digit rates.

This is the paradox in plain language. Marketing leaders are simultaneously increasing their measurement investment and reporting that measurement is not giving them the clarity to act. Something in the middle is broken, and it is not the tools.

## How an $8 billion bet on better measurement got made

> 📊 Chart: Marketing analytics market growth from .06B in 2023 to a projected 4.55B by 2031, with actual vs. projected values shown in a line chart — [View interactive chart](https://raw.githubusercontent.com/KaranSud/marketing-portfolio/main/blog-posts/2026-09-14/chart1.html)

There were genuinely good reasons to believe that more analytics infrastructure would solve the confidence problem.

Digital channels now account for [61.1% of total marketing spend](https://www.gartner.com/en/newsroom/press-releases/2025-06-02-gartner-survey-finds-digital-channels-account-for-61-point-1-percent-of-total-marketing-spend), per Gartner's June 2025 survey. When the majority of your budget flows through addressable digital channels, the theoretical promise of measurement is real: you can track impressions, clicks, conversions, and sequences. You can attribute revenue to channel and campaign. You can prove what worked. The logic of investing in tools to do that at scale is not obviously wrong.

The measurement tools industry understood this demand and built for it. The global marketing analytics market now stands at [$8.02 billion and is forecast to reach $14.55 billion by 2031](https://www.mordorintelligence.com/industry-reports/marketing-analytics-market), growing at a CAGR of 12.65% (Mordor Intelligence, 2026). That is not a speculative category. That is an industry reflecting real, sustained buyer commitment from serious organizations.

But somewhere between the genuine demand and the tool investment, something important got skipped. Measurement capability is not a software installation. It is an organizational practice, and the tools industry has mostly sold the software while leaving the practice to figure itself out.

## What good measurement actually requires

There is a reasonably clear consensus on what effective marketing measurement looks like in 2026. It requires three methods working in combination, each doing a specific job:

**Marketing mix modeling** works at the portfolio level. You give it years of historical spend data, channel mix, and outcome data, and it returns a statistical model of how each input correlates with sales. It captures offline effects, brand investment, and interactions between channels that single-channel tools structurally cannot see. It is slow, resource-intensive, and requires expertise in Bayesian statistics or the equivalent. Its output is strategic: where should your total budget go across channels over a planning horizon?

**Incrementality testing** is the causal layer. An MMM tells you correlation. An incrementality experiment tells you what would have happened if you had not run that campaign at all. It holds platform-reported ROAS accountable. When a platform tells you it drove 40% of your conversions, incrementality testing often finds the real number is 12%. The gap between those figures is money being allocated on false premises.

**Attribution reporting** is the tactical layer. It is fast, granular, and tells you which campaigns, audiences, and creatives are performing within a channel. It cannot tell you whether the channel itself is working. It is not designed to tell you that. When used alongside MMM and incrementality testing, attribution is a useful optimization signal. When used alone, which is how most organizations use it, attribution accuracy becomes a persistent and expensive fiction.

These three methods are not interchangeable. They answer different questions at different speeds. The right measurement practice uses each for the question it was actually built to answer.

## Only 39% of marketing teams have the full stack. Here's why.

> 🗺 Infographic: The three-level measurement maturity stack showing Level 1 (single-method, 61% of teams), Level 2 (partial integration), and Level 3 (full triangulated stack, 39% of teams) — [View infographic](https://raw.githubusercontent.com/KaranSud/marketing-portfolio/main/blog-posts/2026-09-14/infographic.svg)

According to the [IAB State of Data 2026 report](https://www.iab.com/insights/2026-state-of-data-report/), only 39% of buy-side marketers use attribution, marketing mix modeling, and incrementality testing together. This is despite the fact that the report's own respondents acknowledge the three methods are complementary. They know the answer. Most are not doing it.

The gap between knowing and doing is explained less by budget and more by organizational capability. Running an MMM is not just a purchase decision. It requires a data infrastructure capable of feeding the model historical spend, channel activity, and outcome data at the right level of granularity. It requires a data scientist or a specialized partner to build and maintain the model. It requires a planning cycle that actually pauses to act on what the model says rather than defaulting to last quarter's allocation.

Incrementality testing requires experimental design, control groups, and a media buying practice willing to withhold spend from a segment of the audience to establish a counterfactual. That last requirement, alone, generates institutional resistance in organizations where every stakeholder is measured on channel performance rather than portfolio efficiency.

The result is that most marketing teams keep defaulting to single-method measurement even when they intend otherwise. [Only 21.5% of US marketers report high confidence that last-click attribution accurately reflects a platform's long-term business impact](https://www.emarketer.com/content/just-1-5-marketers-confident-last-click-attribution) (eMarketer/Snap, n=282, July 2024). More than three-quarters actively want to move away from last-click. And yet last-click attribution remains the primary measurement model for the majority of organizations, because it is fast, it produces a number, and it avoids the organizational friction of the alternatives.

## What the tools industry is selling you instead

The measurement tools market is rational. It sells what organizations will actually buy and implement, not what organizations theoretically need. And what organizations will buy is software that produces a dashboard, runs without a statistician on staff, and generates a report before the next leadership meeting.

This is not a criticism of vendors. It is a description of incentive structure. A modern attribution platform can be implemented in a few weeks. A properly calibrated MMM takes months of data preparation before the first output. An incrementality testing program requires a redesign of how campaigns are bought and evaluated. The three-to-six month sales cycle prefers the fast option.

The industry has responded to this dynamic with hybrid positioning. Almost every major measurement vendor now has a page on their website mentioning marketing mix modeling, incrementality, and triangulated measurement. The offering is real in some cases and marketing language in others. The practical question is whether the tool your organization is about to purchase will require you to build the organizational capability to use it, or whether it will simply produce a new dashboard that replaces the old one while the underlying measurement problem persists.

Most marketing teams cannot tell the difference until they are twelve months in.

## The measurement behaviors that actually separate high-performers

> 📊 Chart: Lollipop comparison of the percentage of US marketers investing in each measurement method (MMM at 46.9%, incrementality at 36.2%, last-click at 78.4%) versus the 21.5% who actually trust last-click accuracy — [View interactive chart](https://raw.githubusercontent.com/KaranSud/marketing-portfolio/main/blog-posts/2026-09-14/chart2.html)

The investment data points at something useful. [Nearly 46.9% of US marketers plan to invest more in marketing mix modeling over the next year](https://www.emarketer.com/content/nearly-half-of-us-marketers-plan-invest-mmm-over-next-year), according to an eMarketer/TransUnion survey from July 2025. [36.2% plan to increase investment in incrementality testing](https://www.emarketer.com/content/nearly-half-of-us-marketers-plan-invest-mmm-over-next-year) over the same period.

These are not small numbers. Nearly half of the market moving toward MMM represents a real shift in stated priorities. But the question the data cannot yet answer is how many of those investments will produce integrated measurement practices versus how many will produce an MMM report that sits alongside the existing attribution dashboard without changing how budget decisions actually get made.

The difference between the 39% who use the full measurement stack and the 61% who do not is not primarily a function of how many tools they have purchased. It is a function of whether the measurement system is connected to the planning process. High-performing measurement organizations use MMM outputs to set annual budget allocation across channels. They run incrementality experiments before expanding spend in any channel above a threshold. They treat attribution data as a diagnostic for intra-channel optimization, not as proof that a channel is working at the portfolio level.

This is process design, not software procurement. It requires someone in the organization with authority to say that a channel cannot expand its budget until incrementality testing has established a causal lift figure. It requires a finance partnership where the CFO understands the difference between correlated revenue and incremental revenue. It requires patience in the first year, when the new measurement framework produces numbers that contradict the old dashboard and every channel manager defends their metrics.

## What to actually prioritize if you're not in the 39%

If your organization is currently doing single-method measurement and you want a path toward the full stack, the sequence matters more than the speed. Most teams try to implement all three methods simultaneously and find themselves with three incomplete implementations and no decision-making improvement to show for it.

Start with your data infrastructure rather than your tools. An MMM is only as good as the data you can feed it. Spend two quarters consolidating channel spend data, ensuring consistent UTM tagging, and building a reliable outcome data feed into a single model-ready dataset. Most organizations that run an MMM and get unusable outputs have a data quality problem, not a modeling problem.

The second step is incrementality testing for your largest channel, not your most interesting one. Start where the dollars are. If paid search represents 40% of your digital spend, run a geo-based holdout test on paid search before expanding into Instagram incrementality experiments. Establish a causal lift figure for one channel, document the process, and repeat.

Attribution accuracy becomes a better tool once you have incrementality testing to calibrate against. When your MMM and your incrementality tests converge on a channel's true contribution, you can use that figure to sanity-check what your attribution platform reports. At that point, the dashboard stops being the decision and starts being the instrument panel.

The 39% who've figured this out aren't using better tools. They built an organization that stops optimizing for reporting and starts optimizing for decisions.


---
*Originally published on [karan-sud-portfolio.vercel.app](https://karan-sud-portfolio.vercel.app/blog).*
