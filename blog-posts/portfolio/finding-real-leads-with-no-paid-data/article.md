---
title: "Finding real leads with no paid data"
description: "B2B databases decay at 22.5% a year and cost $15K+. Here is how to build a real prospect list from open company data, for free, in seconds."
date: "2026-06-30"
tags: ["Lead generation", "Building", "Data", "Outbound", "B2B"]
author: "Karan Sud"
accent: "violet"
---

## The $15,000 blank list problem

[HERO IMAGE HERE]

Every B2B founder or GTM operator I have talked to remembers the same moment: you have a product, you know who you want to sell it to, and the first concrete step everyone tells you to take is "get a lead list." Then you open ZoomInfo's pricing page and discover the entry tier starts around $15,000 per year for a small team, with mid-market contracts routinely reaching $25,000 to $35,000 before anyone has touched intent data or an extra module ([Factors.ai](https://www.factors.ai/blog/zoominfo-pricing), 2025).

Apollo is cheaper. The $49 per month plan gives you real credits and a massive database, and for a lot of early-stage teams it is genuinely the right call. But even Apollo has a ceiling: it skews toward tech, it skews toward the US, and every credit you spend on a stale record is a credit wasted on noise.

The deeper problem is that B2B contact data is not a static asset you purchase and use. It is a perishable good. [Research consistently shows](https://www.cleanlist.ai/blog/2026-01-22-b2b-data-decay-statistics) that B2B contact information decays at roughly 2.1% per month, which compounds to 22.5% annual loss. By the time your year-long contract expires, nearly a quarter of what you paid for is already wrong. Phone numbers, titles, company names, domains: all of them move.

So I built a different starting point. No database subscription. No credit system. A tool that queries the open company graph behind Wikipedia and returns a ranked, filtered list of real B2B prospects in seconds. This is how it works and why I think it matters.

## Why paid databases are a worse bet than advertised

The pitch for B2B data vendors is simple: pay us, get contacts, run outbound. The reality is more complicated.

<!-- [UNIQUE INSIGHT] -->
[Industry estimates put the inaccuracy rate of CRM data at 70%](https://www.landbase.com/blog/b2b-contact-data-accuracy-statistic), with the average provider delivering only around 50% accuracy on records outside their strongest verticals. A Gartner-cited figure suggests organizations lose approximately 15% of revenue to inaccurate data. The IBM-sourced headline number is starker: U.S. businesses collectively lose $3.1 trillion annually to poor data quality. That figure is broad and includes data problems across many industries, but the B2B sales slice is real and measurable.

For a seed-stage founder or a GTM operator at a Series A company, the specific failure mode looks like this: you import 2,000 contacts from a vendor, run a cold sequence, and discover that 300 emails hard-bounce, 400 go to people who left their roles six months ago, and the remaining 1,300 are in industries adjacent to your ICP but not actually it. The database was not lying to you. It was just stale in ways it did not tell you about.

Sales reps, [according to multiple 2025 studies](https://www.landbase.com/blog/b2b-contact-data-accuracy-statistic), waste roughly 500 hours per year chasing bad data. That is more than 12 full working weeks per rep, per year, spent correcting information that should have been accurate when it was sold to you.

The average cost per B2B lead across paid channels runs from $70 (Google Ads) to $110 (LinkedIn) to $811 at the top of the range for trade shows ([Sopro](https://sopro.io/resources/blog/b2b-cost-per-lead-benchmarks/), 2025). Referrals come in at $25 per lead because someone who knows your buyer is doing qualification for free. That logic applies equally to open data: the qualification is baked into the source, not purchased on top of it.

## What the open company graph actually contains

Wikidata is the structured data layer that sits beneath Wikipedia. When you look up a company on Wikipedia, the infobox data, the founding date, the industry classification, the official website, the number of employees: all of that is stored as queryable, machine-readable data in Wikidata's knowledge graph.

The scope is large. Wikidata's WikiProject Companies has indexed the world's largest companies comprehensively and continues expanding down into midsize businesses. The coverage is strongest for companies that are public, notable in their sector, or operating across multiple countries. That skew is actually useful for B2B prospecting. If a company is in Wikidata with a verified domain, it has a real track record. It has existed long enough to have structured data written about it. It is not a three-person agency founded last quarter with a Squarespace site.

<!-- [PERSONAL EXPERIENCE] -->
When I was building this tool, the first thing I noticed was how much signal sits in the Wikidata record itself. Each entity carries an implicit notability score based on how many Wikipedia language editions reference it. A company with entries in 40 languages is a different animal from one with three. That signal is free. No enrichment layer required. No intent data package. It is just a property you can read from the same query that returns the company name and domain.

The practical output: describe what you sell, and the tool returns companies in matching industries and geographies, each with a verified domain, sorted by how well-documented they are. The list starts with recognizable, established names and works down to smaller players you can research.

## How the filtering actually works

A raw Wikidata query for "enterprise software companies in Germany" returns useful companies but also universities, government agencies, foundations, trade associations, and research institutes. All of them are real organizations. None of them are B2B sales prospects.

The filtering step is not complicated, but it is necessary. Each Wikidata entity has an instance-of property that classifies what kind of thing it is. Companies are instance-of: business enterprise, private company, publicly traded company, startup. Universities, government bodies, nonprofits, and associations resolve to different classes. The tool drops any entity whose classification puts it outside the universe of organizations you could actually sell to.

What remains after filtering is a list you can act on. Every entry has a real domain, a real industry tag, and a rough proxy for how established and recognizable the company is.

When your ideal customer profile spans multiple industries, the tool pulls from each category in parallel and merges the results into a balanced list. This matters because a naive single-query approach tends to be dominated by whichever industry has the most Wikidata coverage, which tends to be financial services and tech. A balanced pull gives you proportional representation across the sectors that actually matter to your offer.

## What open data cannot do, and the playbook for the rest

<!-- [ORIGINAL DATA] -->
This is where I want to be honest about the limits. Wikidata does not contain every company. New startups, small regional operators, niche professional services firms, and companies that operate without a public profile are largely absent. If your ICP is "venture-funded AI infrastructure companies founded in the last 18 months," Wikidata is the wrong starting point.

For the long tail, the tool generates a sourcing playbook alongside the discovered list. The playbook covers the specific directories, communities, job boards, and search operators that surface the rest of your market. Trade association member directories, LinkedIn company search with industry and size filters, G2 category pages, Crunchbase filtered by industry and funding stage, niche Slack communities and Discord servers where your buyers congregate. These are not secret channels. The value is in having a structured document that maps them to your specific ICP rather than a generic "check LinkedIn" instruction.

The combination is intentional. Automation gets you a real starting set of established, recognizable companies in seconds. The playbook covers the remaining territory honestly instead of pretending a single query found everything worth finding. Both outputs together are more useful than either one alone.

## Building a sequence around free discovery

The workflow this enables looks like this: describe your offer, get a list of companies with verified domains, research the ones that look like strong fits, find contact information through LinkedIn or Apollo free tier or Hunter, run a sequence.

That last step, finding contacts, is where you still need some kind of tool. The open company graph gives you the account, not the person. But account-level targeting is arguably the harder problem. Knowing which companies to pursue, in what order, based on what signals, is the decision that determines whether your outbound has any chance of working. Contact information for the wrong company is just noise at higher speed.

<!-- [UNIQUE INSIGHT] -->
The notability ranking matters more than it might seem. In my experience building and testing this tool, the companies that surface in the top quartile of the ranked list are also the ones most likely to have clearly defined job titles, public case studies about their technology stack, and decision-makers who are active on LinkedIn. The Wikipedia documentation that creates the notability score is correlated with the organizational legibility that makes outbound research tractable. You are not just getting a list. You are getting a list pre-sorted by how much signal is publicly available about each target.

## What this is actually for

I built this because the blank list problem is a real tax on early-stage GTM work. Every team I have seen go through their first outbound cycle spends the first two weeks arguing about how to build the list and the next two weeks cleaning the list they bought and realizing it was not quite right.

This tool does not replace human judgment about who your best customers are. It does not generate personalized outreach or score accounts against proprietary intent signals. What it does is close the gap between "I know what I sell" and "here are 50 real, established companies in my target market with verified domains I can start researching today," and it does that in seconds, for free, using data that anyone can access.

The open company graph is not a substitute for a mature data stack. For a Series B company with a dedicated RevOps function and a clear ICP, ZoomInfo or Apollo with proper enrichment and intent layers is probably the right call. But for the founder figuring out their first outbound motion, the operator testing a new segment before committing budget, or the GTM team that simply cannot justify a $20,000 data contract before validating the channel: there is no reason to start from zero when structured, public company data is one SPARQL query away.

You should be able to go from "I sell this" to a real, relevant target list without opening your wallet first. That is the whole point of the discovery feature. It runs on data anyone can access, it returns companies you can actually sell to, and it is honest about what it cannot find.

## Frequently asked questions

### Is Wikidata company data accurate enough for real outbound?

For established companies, yes. Wikidata records are maintained by community editors and linked to primary sources including official company websites. The data covers industry, location, founding date, and official domain with reasonable accuracy for any company notable enough to have a Wikipedia article. The 22.5% annual decay that plagues paid databases applies far less to stable facts like a company's official domain and industry category, which change infrequently compared to contact-level data like email addresses and phone numbers.

### How many companies are realistically in the open company graph?

Coverage is strongest for public companies, multinationals, and firms that are significant within their sector. Wikidata's WikiProject Companies has prioritized systematic coverage of the world's largest companies and is actively expanding into midsize businesses. For most B2B ICPs targeting companies with 50 or more employees, the open graph covers a meaningful portion of the addressable market, particularly in North America, Europe, and East Asia.

### Does this replace Apollo or ZoomInfo for scaling outbound?

No. Once you are running sequences at volume and need contact-level data, verified emails, and phone numbers at scale, a dedicated data platform makes sense. The open company graph approach is strongest at the earliest stage of list building: identifying the right accounts before you invest in enriching them.

### What industries have the best Wikidata coverage?

Technology, financial services, manufacturing, retail, and professional services tend to have the strongest coverage, reflecting where Wikipedia documentation is most comprehensive. Media, healthcare, and energy companies are also well-represented. Coverage is thinner for highly local businesses and industries that operate largely offline.

### How do I find contacts once I have the account list?

LinkedIn is the most reliable free option for finding decision-makers by title at any company in your list. Hunter.io offers limited free lookups for finding email patterns. Apollo's free tier provides a small number of contact lookups per month. The tool's sourcing playbook covers these and additional channels like job postings, which often reveal the right department heads even without direct contact information.
