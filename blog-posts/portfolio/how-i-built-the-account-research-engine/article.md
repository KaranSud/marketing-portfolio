# I Built a Free Account Research Engine Because the Paid Ones Are Lying to You

### Why a $15,000 per year data problem has a $0 solution, and the architectural choices that make it work without fabricating a single fact.

![Rows of servers in a data center, representing infrastructure built to process company data at scale](https://raw.githubusercontent.com/KaranSud/marketing-portfolio/main/blog-posts/portfolio/how-i-built-the-account-research-engine/hero.jpg)

I got tired of watching sales teams spend real money on data that was wrong before they even imported it. So I built an account research and outbound engine that takes a company domain, pulls from public sources, and returns a sourced company brief, a fit score, the right contacts to reach, and a ready-to-run five-touch outbound cadence. It works for any business type, costs zero dollars to operate, and refuses to invent a single number.

This post is about how it's built and why the design choices matter more than the tech stack.

## The Data Problem Is Worse Than You Think

Before I get into architecture, I want to make the case that this is a real problem and not just a developer scratching an itch.

[Dun and Bradstreet research](https://www.datamaticsbpm.com/blog/data-decay-in-b2b-databases-in-every-year/) puts B2B contact data decay at 30 to 40 percent per year. Email addresses alone go stale at roughly 23 to 30 percent annually. That means the ZoomInfo export you pulled in January has decayed meaningfully before summer. And ZoomInfo's pricing for a mid-sized sales team [starts around $15,000 per year and climbs past $60,000](https://www.factors.ai/blog/zoominfo-pricing) when you add intent data or ABM features.

The irony is that the expensive tools are not dramatically more accurate than free public sources for the top-of-funnel signals that actually matter during prospecting. What a company does, how large it is, what it sells, who the leadership is, and what it's hiring for: all of that information lives in public sources. The paid platforms are charging for convenience and scale, which is a legitimate value proposition if you have a large SDR team and deep pockets. But most teams don't, and those that do are often funding the convenience at the cost of accuracy.

[Gartner estimates that bad data costs organizations an average of $15 million annually](https://pipeline.zoominfo.com/operations/poor-data-quality-impact), while [Validity's 2025 report found that 76 percent of organizations say less than half their CRM data is accurate](https://www.cleanlist.ai/blog/2026-01-22-b2b-data-decay-statistics). SDRs waste 27 percent of their selling time chasing dead ends sourced from that same data. Paying for inaccurate data, at scale, is not a sales tool problem. It is a category problem.

I built around it.

## The Architecture: Three Stages, No Shortcuts

Every request flows through three stages in sequence. The sequencing is not arbitrary. It reflects a real constraint: you cannot synthesize what you have not gathered, and you cannot personalize outreach around facts you have not verified.

**Stage one: gather public signals.** The system fetches the company's own website, structured data the site publishes about itself, Wikidata entries, recent news, the site's XML sitemap, and any visible hiring signals. For software companies it also reads GitHub activity and tech-stack signals where available.

**Stage two: classify and score.** A language model reads the gathered signals and classifies the business: industry, size range, business model, and how well the account fits a given ideal customer profile. This is where the LLM does its actual job, which is synthesis and classification, not fact generation.

**Stage three: produce the output.** The system generates the company brief, identifies contacts to reach, and writes a five-touch outbound cadence calibrated to what it actually learned about the business.

Nothing is invented anywhere in that pipeline. The model is explicitly instructed not to generate numbers or claims that are not traceable to one of the gathered sources. If the outreach sequence wants to cite a specific result the seller has not provided, it writes a bracketed placeholder instead of fabricating a case study. That placeholder looks like \[INSERT RESULT FROM YOUR PORTFOLIO\] and it is the most honest thing a piece of outreach software can do.

## The Data Sources and Why Each One Earns Its Place

### The company's own website as the primary source

The richest universal data source for any company is the structured data that company publishes about itself. Schema.org and JSON-LD markup, embedded in the HTML of most modern websites, contains verified machine-readable facts: addresses, founding information, executive names, pricing tiers, product categories, social profiles, ratings, and more. A restaurant will have opening hours and cuisine type. A SaaS company will have product descriptions and integrations. A consultancy will have service lines and case study titles.

This is not scraped text that requires interpretation. It is structured, intentional, and current, because the company maintains it to power its own search appearance and social previews. Schema.org parsing is the cleanest data source in the entire pipeline precisely because the company itself is the publisher.

### Wikidata for verified firmographics

Wikipedia and Wikidata provide independently verified facts about companies that have a meaningful public presence: founding year, headquarters location, headcount range, parent company, and industry classification. The key design decision here is verification. The system cross-references the Wikidata entity against the company's official domain to confirm it is matching the right entity before pulling any facts. A query for a company name that exists in three countries under similar brands will return the wrong result if you do not verify against the domain. This verification step is not optional.

### News, sitemaps, and hiring signals for timing

Recent news headlines give the system timing signals. A company that just raised a Series B, announced a new product, or opened offices in three new markets is a different outreach target than the same company twelve months ago. The sitemap gives scale: a company with 40,000 pages organized by product category is a different business than one with 200 pages. Careers pages and job boards give growth signals, because what a company is actively hiring for reveals where it is investing.

These three sources together answer the question that matters most before outreach: what is happening at this company right now that makes contact timely and relevant.

## The No-Fabrication Rule Is a Design Constraint, Not a Nice-To-Have

This is the part I want to spend the most time on, because it is the part that most AI sales tools get wrong.

Most AI research tools use a language model to generate a company brief. The model has training data about the company, or it performs a search and then synthesizes freely from those results, adding interpolations, rounding figures up for impact, and occasionally confabulating metrics that sound plausible. The brief reads confidently. It is often wrong in ways that are hard to detect without already knowing the answer.

The consequence of a confident, wrong brief is not neutral. A sales rep reads that an account has "approximately 500 employees across three offices" when the real count is 45, and they calibrate their entire pitch around a misunderstanding. They price wrong. They reference the wrong decision-making structure. They miss the actual pain point. The fabricated brief is worse than no brief, because it replaces curiosity with false certainty.

My system enforces the no-fabrication rule at the prompt level. The model is instructed that every quantitative claim in its output must trace to a specific gathered source, which it must cite inline. Claims that cannot be traced to a source are either omitted or flagged as unknown. The model is not allowed to estimate, infer numbers from non-numeric signals, or fill in gaps with "typical" figures for the industry.

This constraint forces the system toward a more honest output format: "This is what we know, this is where we know it from, and here are the placeholders for what the seller needs to add." That is exactly the format a serious outbound rep wants, because it tells them what to verify and what to trust.

## The Stack Is Deliberately Boring

Next.js handles the web interface. Serverless API routes do the actual work on the server side: fetching public sources in parallel, running the classification, calling the language model, and formatting the output. Wikidata provides structured company facts via SPARQL. Gemini handles the synthesis because it has a generous free tier and strong instruction-following at the tasks involved. Vercel hosts the whole thing on a free tier.

There is no CRM integration. No paid data vendor. No enrichment API. No database. The running cost is zero because everything the system needs is either publicly available or provided by free-tier services.

I made this choice deliberately, not just to keep costs down but to validate a thesis: that meaningful account intelligence does not require a paid data infrastructure. The intelligence comes from knowing where to look and how to structure what you find, not from paying for a proprietary database that decays at 30 percent per year.

The tradeoff is scale. This system is not designed to process 10,000 accounts overnight for an enterprise SDR team. It is designed to produce one genuinely good, fully sourced brief for one account in under a minute. That is the right tradeoff for the use case: a founder, a solo AE, or a small team doing high-quality targeted outreach where the quality of each touch matters more than the volume of contacts processed.

## Security, Because the System Fetches URLs You Give It

The moment you build a tool that fetches a URL based on user input, you have created a server-side request forgery attack surface. This is not a theoretical concern. An attacker who can direct the server to fetch an internal address can potentially reach services behind a firewall that are not exposed to the public internet.

The engine defends against this in several layers. It refuses requests aimed at private IP ranges (10.x.x.x, 192.168.x.x, 127.x.x.x) and validates that target domains resolve to public addresses before making any fetch. It rate-limits requests per visitor, caps input domain lengths, and ships a complete set of security headers including Content Security Policy, X-Frame-Options, and referrer policy. It validates the format of every domain input before processing begins.

A small free tool still deserves to be built to the same standards as a production system, because its users have no reason to expect otherwise.

## What I Actually Learned Building This

The most surprising finding was how much genuinely useful company intelligence lives in schema.org markup. I expected it to be sparse. In practice, companies that care about their SEO and social presence have invested in structured data that includes exactly the firmographic and product signals that matter for outbound. Parsing it takes ten lines of code and returns better structured data than many enrichment APIs.

The second finding was about AI's actual role in a research pipeline. The temptation when building with language models is to let the model do everything: research, synthesis, fact-checking, and output generation in one pass. That approach produces fluent, confident, often inaccurate outputs. The better architecture uses the model only for the tasks it is genuinely good at (classification, synthesis, tone-matching, sequencing) while keeping fact-gathering and fact-verification entirely outside the model. The model should never be the source of truth. It should only ever be the interpreter of sources.

The third finding is about honesty as a feature. Sales reps who have used this tool consistently report that the bracketed placeholders are useful rather than frustrating. They identify exactly what the rep needs to find before sending. A brief that knows what it does not know is a more valuable tool than one that fills every gap with a plausible-sounding fabrication.

[McKinsey's research on generative AI in sales](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier) found that AI could increase sales productivity by 3 to 5 percent of global sales expenditures. That number is real, but it is also conservative. The gains come from AI doing the things it does well (pattern recognition, synthesis, drafting) while humans retain the things they do better (judgment, relationship context, verification). An AI tool that tries to replace human judgment with confident fabrications does not produce productivity gains. It produces confident mistakes at scale.

## The Rest of the System

This post covers the core engine. The next piece covers why I built this from scratch rather than integrating an existing tool, including the specific cost and accuracy comparisons I ran. The piece after that covers the lead discovery layer: how the system finds companies matching a target profile without any paid data sources, using public web signals and structured query patterns.

If you want to use the engine yourself, it's live at the link in my portfolio. Any company domain works. The brief takes about 45 seconds. The output is sourced, the contacts are real, and nothing in it was invented.
