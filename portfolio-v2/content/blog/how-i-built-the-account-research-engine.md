---
title: "How I built a free account research and outbound engine"
description: "A look under the hood of the account research tool: the free data sources, the no-fabrication design, and the infrastructure that runs the whole thing at zero cost."
date: "2026-06-16"
tags: ["Building", "Infrastructure", "AI"]
author: "Karan Sud"
accent: "sage"
---

I built an account research and outbound engine that takes a company domain and returns a sourced brief, a fit score, the people to contact, and a full outbound sequence. It works for any kind of business, runs on public data, and costs nothing to operate. Here is how the whole thing is put together.

## The shape of the system

Every request flows through three stages: gather public signals, classify and synthesize, then produce the outreach. Nothing is invented along the way.

<div class="ig">
  <div class="ig-flow">
    <div class="ig-step"><span class="ig-num">1</span><b>Gather</b><small>Site, Wikidata, news, sitemap, hiring</small></div>
    <div class="ig-arrow">&rarr;</div>
    <div class="ig-step"><span class="ig-num">2</span><b>Understand</b><small>Classify the business, score the fit</small></div>
    <div class="ig-arrow">&rarr;</div>
    <div class="ig-step"><span class="ig-num">3</span><b>Produce</b><small>Brief, contacts, 5-touch cadence</small></div>
  </div>
  <div class="ig-cap">The pipeline: public data in, a ready-to-run brief out.</div>
</div>

## The data layer

The hard part of research is not writing, it is knowing real things about a company. I pull from sources that are free and that I can cite.

- **The company's own site.** The richest universal source is the structured data sites publish about themselves. Parsing schema.org and JSON-LD gives a real address, opening hours, price range, ratings, founders, and social profiles, the same for a restaurant as for a software firm.
- **Wikipedia and Wikidata.** Verified facts like founding year, headcount, and industry, confirmed against the company's official website so the wrong entity never gets attached.
- **News, sitemaps, and hiring.** Recent headlines for timing, the sitemap for catalog and location scale, and careers pages for growth signals.

For software companies it also reads GitHub and tech-stack signals, but those stay one input among many rather than the whole picture.

## The no-fabrication rule

The single most important design decision was that the model never invents a number. Every figure in a brief traces back to one of the sources above. When the outreach wants to cite a result the seller has not provided, it writes a bracketed placeholder for the human to fill in rather than making one up. A brief you cannot trust is worse than no brief, so honesty is enforced in the prompt and checked in the output.

## The infrastructure

The stack is deliberately boring and free.

<div class="ig">
  <div class="ig-chips">
    <span>Next.js app</span>
    <span>Serverless API routes</span>
    <span>Wikidata SPARQL</span>
    <span>schema.org parsing</span>
    <span>Gemini for synthesis</span>
    <span>Vercel hosting</span>
  </div>
  <div class="ig-cap">No CRM, no data vendor, no paid enrichment. One free model key.</div>
</div>

A web app serves the interface and the API routes do the work on the server: fetch the public sources in parallel, classify the business, and call a free language model only to synthesize the qualitative parts, never the facts. It is hosted on a free tier, so the running cost is genuinely zero.

## Security, because it fetches user input

The moment a tool fetches a URL a stranger gives it, it has an attack surface. So the engine refuses requests aimed at internal or private addresses, rate limits each visitor, caps input sizes, and ships a full set of security headers. A small free tool still deserves to be built like it matters.

## What it adds up to

The result is a research-to-outreach engine that is honest, works for any business, and costs nothing to run. The next two posts cover why I bothered building it myself, and how the lead discovery finds real companies without paying for data.
