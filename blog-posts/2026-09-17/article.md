# Incrementality Testing Exposes the 31% Flaw in Your Attribution

*31% of your conversions aren't real. Here's how to find out which ones.*

[HERO IMAGE HERE]

An incrementality study across roughly 150 experiments found that only 69% of the conversions last-click attribution credits to paid channels are actually caused by paid channels.

The other 31% would have happened anyway.

These are not marginal leads who stumbled through a retargeting funnel by accident. They are real buyers who were going to find your product through organic search, a referral, a LinkedIn post, or direct brand recall, and your paid campaign simply intercepted them at the last step and collected the credit. Your dashboard shows a healthy ROAS. Your CFO approves the budget. Your channel mix stays the same. And roughly a third of your paid media spend keeps purchasing outcomes that were never at risk.

This is the central measurement problem in B2B SaaS marketing right now, and it is not a tool problem. It is a question problem. Last-click attribution was built to answer "which touchpoint preceded the conversion?" Incrementality testing is built to answer a completely different question: "did our advertising actually cause this conversion, or would it have happened without us?" Those two questions produce very different numbers.

## The number that should change how you read every attribution report

The 69% figure comes from [analysis by Nico Neumann](https://www.linkedin.com/posts/nico-neumann-3021b32_marketinganalytics-attribution-causalinference-activity-7454783710568235008-Ck6g), a marketing analytics researcher, summarizing the results of multiple controlled incrementality experiments across verticals. The vertical breakdown is telling: e-commerce averages 76% incremental, retail drops to 63%, and travel falls to 48%. The travel number means that in that category, more than half of every conversion last-click attributes to a paid ad would have happened without the ad.

B2B SaaS sits somewhere in that range depending on your category maturity, brand awareness, and channel mix. If you have strong organic search presence and an active content program, buyers are already finding you before your ads touch them. The retargeting campaign that fires when they visit your pricing page is not converting them. It is taking credit for a decision they had already mostly made.

What makes this measurement failure persistent is not that marketers are naive. It is that the current incentive structure of digital advertising makes the over-reporting almost invisible. Platforms report what their tracking can see. They see the click. They do not see the organic referral that happened three days earlier, the Slack community recommendation that sparked the search, or the conference session that created the initial interest. They report the last touchpoint they can observe and call it the cause.

## Why last-click attribution got this so wrong (and still does)

The structural problem with last-click attribution is not that it measures the wrong thing. It is that it answers the wrong question and then gets used to answer the one it was never designed for.

Last-click was designed to identify which paid touchpoint came immediately before conversion. It is useful for that. If you want to know which ad creative or landing page closed the loop on a purchase decision, last-click gives you a decent signal. The problem begins when that number gets used to evaluate whether the channel itself is worth the budget, whether the campaign should be scaled, and whether the ROAS justifies continued spend.

Those questions require a causal answer. Last-click gives a correlational one.

The mechanism of over-attribution is straightforward. Paid retargeting and paid search campaigns are structured to intercept buyers who are already in-market. High intent buyers are, by definition, the ones most likely to convert without your advertising. When you run a paid campaign targeting high-intent signals, you are inevitably capturing a significant share of people who were coming anyway. The more your brand and content have already done their job, the larger the attribution gap will be.

There is also the data collection constraint. Each platform runs its attribution model inside its own walled garden. Google Ads counts a conversion if the buyer clicked a Google ad within a 30-day window. Meta does the same within its own window. Neither can see the other's touchpoints. When a buyer clicks both a Google ad and a Meta ad in the same journey, both platforms claim the conversion in full. Your cross-platform attribution tool tries to reconcile this, but it is working with incomplete identity graphs and mismatched measurement windows. The result is not precision. It is an estimate built on structural gaps.

## The measurement gap is bigger than you think (and measurable)

[CHART 1 HERE]

The attribution accuracy problem sits inside a broader measurement confidence crisis that the industry has been tracking for several years now.

[According to the IAB State of Data 2026](https://www.iab.com/insights/2026-state-of-data-report/), 75% of US buy-side leaders say their core measurement approaches (attribution analysis, incrementality tests, and marketing mix modeling) underperform on rigor, timeliness, trust, and efficiency. That finding covers all three methods, not just last-click. Senior marketers who have adopted what the industry considers advanced measurement are still reporting that it is not giving them the decision quality they need.

The [Nielsen 2025 Annual Marketing Report](https://www.nielsen.com/news-center/2025/nielsen-releases-its-2025-annual-marketing-report-looking-at-the-power-of-data-driven-marketing/), based on 1,400 global marketing professionals, found that only 32% of marketers measure their media spending holistically across both digital and traditional channels, down from 38% the previous year. Holistic measurement is not a niche capability. It is the baseline requirement for any budget decision that spans more than one channel. And it is declining.

[The Gartner 2026 CMO Spend Survey](https://www.gartner.com/en/newsroom/press-releases/2026-05-11-gartner-2026-cmo-spend-survey-finds-cmos-allocate-15-point-3-percent-of-marketing-budgets-to-ai-but-only-30-percent-are-ready-to-scale-ai-capabilities), which covered 401 CMOs across North America, the UK, and Europe, found that 56% of CMOs say they lack the budget to execute their 2026 strategy. These are not underfunded startups. These are marketing leaders at large organizations who have made serious technology investments and still cannot get the measurement confidence they need to make the argument for better funding. The measurement problem and the budget problem are not separate issues. They are the same issue.

If your measurement cannot clearly demonstrate which budget is working and why, the conversation with the CFO becomes a negotiation based on gut instinct instead of evidence. The measurement gap is not just a data problem. It erodes the internal political case for marketing investment.

## What incrementality testing actually tells you

[CHART 2 HERE]

Incrementality testing is the discipline of measuring what would have happened in the absence of your marketing. It works by creating two statistically identical groups: one exposed to your campaign, one held back from it. Everything else remains constant. After the campaign runs, you measure the conversion difference between the two groups. The conversions your exposed group produced above the holdout baseline are the incremental lift, meaning the outcomes your advertising actually caused.

The method is not new. It is the same randomized controlled trial logic that pharmaceutical companies use to evaluate drug efficacy. You are not trusting the platform's attribution model. You are running an experiment.

The gap between platform-reported performance and experimentally measured incrementality is where the 31% figure lives. When Nico Neumann's analysis shows that 69% of last-click attributed conversions are incremental on average, the implication is that platforms are systematically over-reporting causal impact by roughly 45% (100 attributed conversions versus 69 incremental ones). That over-reporting is not fraud. It is the predictable output of a measurement method that cannot distinguish causation from correlation.

What makes this method particularly useful for B2B SaaS is that it holds your highest-spend channels accountable. Paid search and paid retargeting (where most SaaS teams concentrate their performance budget) are precisely the channels where attribution over-counting is most severe, because those channels are designed to capture high-intent buyers who were already converging on a purchase decision.

The practical question is: if you ran a holdout experiment on your retargeting campaign tomorrow, how much of the attributed revenue would survive? The answer for most B2B SaaS teams, based on available experiment data, is roughly 60 to 75 cents on every attributed dollar. The rest is organic demand your ads happened to observe.

## The B2B SaaS math: what 31% over-attribution actually costs

[INFOGRAPHIC HERE]

Take a $2M annual paid media budget. If last-click attribution is over-crediting by 31% on average, approximately $620,000 of that budget is being allocated based on false signal. Some of those dollars are going to channels that genuinely work but are over-funded relative to their incremental contribution. Some are going to channels that appear to work but are primarily capturing organic demand. The budget stays constant. The mix optimizes for the wrong signal. Year over year, the gap between reported ROAS and actual marketing contribution compounds.

At industry scale, the [IAB's State of Data 2026](https://www.iab.com/insights/2026-state-of-data-report/) estimates that AI-powered improvements in measurement could generate approximately $32 billion in value for the buy-side within one to two years ($26.3 billion in recaptured media investment and $6.2 billion in productivity gains). That estimate assumes that current measurement systems are significantly mis-allocating budget. The incrementality gap is a major driver of that misallocation.

The B2B SaaS budget math matters beyond the immediate spend. When you over-attribute conversions to paid channels, you systematically undervalue organic channels, content, community, and earned media. Your MMM (and any planning built on historical attribution data) inherits those biases. The measurement error compounds into strategic error: you defund the channels that actually built intent while over-investing in the channels that merely captured it.

Measurement ROI is not an analytics team problem. It is a P&L problem dressed up as a dashboard problem.

## How to run your first incrementality test without an enterprise budget

Three practical approaches exist for B2B SaaS teams without dedicated measurement infrastructure.

The first is a **Google Ads campaign experiment**. Google's native experiment framework lets you split your campaign audience into exposed and holdout groups. Set the holdout to 20% of your target audience, run the campaign for four to six weeks at statistically meaningful scale, and compare conversion rates between the two groups. The lift you observe is your incremental conversion rate. If you are running always-on retargeting, this will be the most clarifying data you have run in the past year.

The second is a **matched market test**. Instead of splitting audiences within a channel, you split geographic markets. Identify two groups of markets that are historically similar in conversion behavior. Run your campaign in one group and withhold it from the other. Compare the conversion rates across the two groups. This approach captures all channels simultaneously and avoids cross-contamination from users who browse across platforms.

The third is the simplest: an **email send-vs-no-send experiment**. Take your next nurture sequence and randomly exclude 15 to 20% of eligible contacts from receiving it. Track conversion rates over 30 to 60 days. The conversion difference between the included and excluded groups is the incremental lift from that email program. For most B2B SaaS teams, this will produce a number that is either very reassuring or very instructive.

None of these require an enterprise measurement vendor. They require patience, statistical discipline, and willingness to see a number that might be uncomfortable.

## The measurement upgrade sequence for 2026 and beyond

The shift in practitioner confidence toward more rigorous measurement is already underway. According to the [EMARKETER and TransUnion Marketing Measurement Confidence survey](https://newsroom.transunion.com/new-transunion-research-reveals-marketers-confidence-in-measurement-has-stalled/), 46.9% of US marketers plan to invest more in MMM over the next 12 months, and 27.6% now cite MMM as their single most reliable measurement methodology, ahead of multi-touch attribution at 19.4%.

The logic of the B2B SaaS marketing analytics upgrade sequence is not complicated: start with the holdout experiment approach, then layer in MMM when you have the budget scale to justify it. The former is faster, cheaper, and produces the most directly actionable signal. It tells you which specific campaigns are working causally, in near-real time. MMM tells you how your whole portfolio contributes to revenue over a planning horizon, but it requires 18 to 24 months of historical data to calibrate and costs significant analyst time. The two methods complement each other, and one is not a replacement for the other.

The common objection is that the holdout approach requires sacrificing conversions in the holdout group. The math on this is almost always wrong. A 20% holdout on a retargeting campaign that is 31% over-attributing means you are temporarily withholding spend from a group that was largely going to convert anyway. The short-term cost of the experiment is small. The long-term benefit of knowing what is actually working is large.

Marketing attribution will not disappear. It is still the best fast-feedback loop for creative and audience optimization within a channel. But the marketing teams that treat it as their primary evidence for budget allocation are optimizing for a fiction. The measurement teams winning right now are not the ones with the most attribution data. They are the ones who built the habit of asking whether their ads actually caused what they claim to have caused.
