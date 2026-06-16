---
title: "Finding real leads with no paid data"
description: "How the tool builds a target list from nothing using open company data, with notability ranking and filtering so the results are real, recognizable companies."
date: "2026-06-14"
tags: ["Lead generation", "Building", "Data"]
author: "Karan Sud"
accent: "violet"
---

The hardest part of starting outbound for a new brand is the blank list. Paid databases solve this, but they cost money and skew to tech. I wanted the tool to answer "where do I begin" for free, with real companies. Here is how the discovery works.

## From an offer to a list

You describe what you sell. The tool turns that into an ideal customer profile, then queries open data for companies that match, then cleans and ranks the result.

<div class="ig">
  <div class="ig-flow">
    <div class="ig-step"><span class="ig-num">1</span><b>Offer</b><small>What you sell</small></div>
    <div class="ig-arrow">&rarr;</div>
    <div class="ig-step"><span class="ig-num">2</span><b>ICP</b><small>Industries, region, titles</small></div>
    <div class="ig-arrow">&rarr;</div>
    <div class="ig-step"><span class="ig-num">3</span><b>Query</b><small>Open company graph</small></div>
    <div class="ig-arrow">&rarr;</div>
    <div class="ig-step"><span class="ig-num">4</span><b>Rank</b><small>Filter, then sort by notability</small></div>
  </div>
  <div class="ig-cap">A starter list in seconds, every company with a real, verified domain.</div>
</div>

## The open company graph

The key source is the open data behind Wikipedia, which holds structured records for a huge number of companies, each linked to its official website. A single query can return companies in a given industry and region, every one with a real domain to research. No scraping, no purchase, no API key.

## Making the list usable

A raw query returns noise, so two steps make it useful.

- **Filtering.** Entities that are real but never a sales prospect get dropped: associations, universities, government bodies, foundations. What remains is companies you could actually sell to.
- **Notability ranking.** Each record carries a rough measure of how widely it is referenced. Sorting by that surfaces recognizable, established companies first, which makes for better leads and richer downstream research.

When the profile spans several industries, the tool pulls from each in turn so the final list is balanced rather than dominated by whichever industry happened to match best.

## Where automation stops, a plan starts

Open data does not contain every company, especially brand new startups. So alongside the discovered list, the tool gives a sourcing playbook: the specific directories, communities, events, and search strings to find the rest by hand. The automation gets you a real starting set in seconds, and the playbook covers the long tail honestly instead of pretending it found everything.

## The point

You should be able to go from "I sell this" to a real, relevant target list without opening your wallet. That is the whole goal of the discovery feature, and it runs on data anyone can access.
