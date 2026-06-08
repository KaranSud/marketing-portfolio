---
title: "What I learned building a free AI outbound engine"
description: "Notes from building an AI-native account research and outreach tool that works for any business, runs on free data, and never fabricates a number."
date: "2026-06-08"
tags: ["AI", "Building", "GTM"]
author: "Karan Sud"
---

I build small tools to solve my own go to market problems, then put them online for anyone to use. The latest is an account research and outreach engine. You give it your offer and a list of companies, or no list at all, and it finds your ideal customers, researches each one from public data, scores the fit, and writes a full outbound sequence. It runs entirely on free data. Here is what building it taught me.

## Most tools are tech only by accident

Early versions worked beautifully for software companies and poorly for everyone else. The reason was the data sources. Signals like GitHub activity and Hacker News mentions only exist for tech firms, so a restaurant or a law firm came back with a thin, generic report.

The fix was to lean on the one source almost every business publishes about itself: the structured data on its own website. Address, hours, ratings, price range, menu, founders, and social links are all sitting in the page markup of millions of sites. Reading that, plus a free company graph and recent news, let the same engine treat a taco shop, a Shopify brand, and a SaaS startup as the distinct businesses they are. The brief now reframes itself for each one, talking about covers and reviews for a restaurant and catalog and repeat purchase for a store.

## No fabrication is a feature, not a constraint

The hardest rule I set was that every number had to trace to a real source, and the model could never invent one. This is harder than it sounds, because a language model will happily produce a confident statistic that does not exist.

I caught it doing exactly that in the outreach copy, writing a fake result for the seller in a proof email. The answer was to make the model use a clearly marked placeholder whenever it wanted to cite a result that was not in the input. The email stays ready to send, but the human fills in the real number. Honesty turned out to be a better product, not a worse one, because a brief you cannot trust is worthless.

## Free is a design discipline

Choosing to use no paid data forced better engineering. Instead of buying enriched contacts, the tool reads what companies publish, infers an email pattern only when a real address reveals one, and is honest about coverage gaps. Instead of a paid company database for discovery, it queries open public data and ranks by notability so recognizable companies surface first. Constraints made the thing sharper.

## Security is not optional just because it is a side project

The moment a tool fetches a URL a stranger gives it, you have an attack surface. I added protection against requests to internal addresses, basic rate limiting, and a full set of security headers. A small tool with real users still deserves to be built like it matters.

The whole thing is live and free. If you run outbound for a brand that is starting from nothing, it is built for exactly that.
