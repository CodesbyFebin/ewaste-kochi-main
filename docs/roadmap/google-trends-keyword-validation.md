# Google Trends / Keyword Validation Methodology

Status: living roadmap doc. No blog posts are created from this — see `blog-content-gap-roadmap.md` for the resulting content plan.

## A methodology note, stated plainly

This document is titled "Google Trends" because that's what was requested, but the actual primary data source here is **Google Search Console's real Performance export** (`ewastekochi.com-Performance-on-Search-2026-07-06.zip`, specifically `Queries.csv` — 1,010 real search queries with actual clicks/impressions/CTR/position for this exact site, over the 3-month window ending 2026-06-29).

This tool has no live connection to Google Trends (it's an interactive JS-driven UI with no exposed export API reachable from here). Rather than fabricate directional trend numbers ("rising 40% YoY") that would just be invented, this doc uses the real query data already in hand — arguably a stronger signal anyway, since it's actual searchers who found this exact site, not generic national search-volume estimates.

**If you want real Google Trends directional validation** (is a keyword rising or falling, seasonal patterns, regional interest within Kerala specifically), that requires a human to pull it from trends.google.com and export/paste the CSV — same pattern as the GSC exports. I've flagged the specific keyword clusters below where trends data would add the most value on top of what GSC already shows.

## Data summary

- 1,010 unique queries recorded, 320 total clicks, 14,738 total impressions.
- The single biggest finding: **three queries alone account for 6,311 impressions and zero clicks**, despite ranking in the top 4 on average. This isn't a keyword-discovery gap — it's a live conversion problem on already-ranking content.

## Finding: high-position, zero-click queries (the real priority)

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| where to recycle old electronics | 2,353 | 3.87 | 0 |
| where to donate electronics | 2,303 | 3.86 | 0 |
| where to recycle batteries | 1,655 | 3.73 | 0 |
| where to sell electronics locally | 987 | 6.26 | 0 |
| how to recycle electronics | 855 | 3.92 | 0 |
| local recycling centers | 698 | 8.37 | 0 |
| where to sell used electronics | 652 | 6.93 | 0 |

Ranking at position ~4-9 with literally zero clicks is unusual — normal CTR at that position range is typically 2-8%. Two explanations, both worth investigating rather than assuming:
1. **SERP feature competition** — these are exactly the kind of broad informational queries where Google often shows a featured snippet, "People also ask," or a local-pack/map result above organic listings, which can suppress organic CTR even at a good position.
2. **Title/meta mismatch** — whatever page is currently ranking for these queries may have a title or description that doesn't read as a direct answer to "where to X," even though its content is topically relevant enough to rank.

**Before writing any new content for this cluster, identify which existing page (`/recycling/`, `/battery-recycling/`, or an existing kept blog post) is the one actually ranking for these queries**, and audit its title/meta/first-paragraph against the literal query phrasing first. Creating a brand-new page without checking this risks the exact cannibalization pattern this project has spent two phases cleaning up (see `reports/v2-gsc-data-analysis.md`).

## Query clusters identified (grouped by theme)

### 1. General "where/how to recycle, donate, or sell" (Tier 1 — see roadmap doc)
`where to recycle old electronics` (2353), `where to donate electronics` (2303), `where to recycle batteries` (1655), `where to sell electronics locally` (987), `how to recycle electronics` (855), `local recycling centers` (698), `where to sell used electronics` (652), plus long tail: `sell electronics online` (28), `sell old electronics` (24), `sell electronics` (20), `sell e waste` (11).

**Flag on "donate" specifically**: `where to donate electronics` (2,303 impressions) and `where to donate office equipment` (54) are a genuinely distinct intent from recycle/sell — donation implies a non-profit or charity pathway. **Do not publish content implying a donation program exists unless the business actually has one** (an NGO partnership, a donation drop-off, a CSR program). If no such pathway exists, the honest content angle is explaining why recycling (not donation) is usually the better/safer option for e-waste specifically (data security, hazardous material handling) — a legitimate answer to the query that doesn't overclaim.

### 2. Battery-specific
`where to recycle batteries` (1655), `battery deposit` (46), `battery recycling near me` (28), `batteries disposal near me` (26), `battery disposal near me` (12), `battery scrap rate` (10), `battery recycling` (9), `battery scrap shop near me` (5).

**Flag on "battery deposit"**: this phrasing usually refers to a deposit/exchange scheme (pay a deposit on a new battery, get it back on returning the old one) — common with lead-acid battery retailers. Confirm with the business whether such a scheme exists before content addresses it; if not, the query is likely still answerable by explaining standard battery recycling/pickup instead.

### 3. ITAD / data destruction — vendor-selection and technical
`hard drive destruction service` (91, ranking poorly at position 22.43), `itad companies in india` (22), `how to choose an itad vendor` (16), `data destruction services` (15), `dod vs. nist` (13), `secure asset & hard drive recycling` (11), `itad india` (11), `itad vendor checklist` (10), `shredding service near me` (8), `how to choose an itad provider` (7), `data center decommissioning checklist` (16).

**Note**: `/blog/how-to-choose-itad-provider/` already exists as a kept post. The vendor-checklist/how-to-choose queries above are very likely already targeting that post — this is an **optimize-existing** case, not a new-post case. `dod vs. nist` and `data center decommissioning checklist` are genuinely uncovered angles (existing posts cover NIST 800-88 and HDD-vs-SSD, but not a direct DoD-vs-NIST standard comparison, and nothing covers decommissioning-checklist format specifically).

### 4. Sell/scrap value
`where to sell electronics locally` (987), `where to sell used electronics` (652), plus long tail (`e waste scrap buyers near me` 13, `old tv scrap price` 9, `electronic scrap buyers` 9, `e scrap buyers near me` 9). Existing kept posts (`/blog/where-sell-ewaste-near-me/`, `/blog/laptop-scrap-price-kochi/`, `/blog/mobile-scrap-price-kochi/`) likely already target parts of this cluster — audit before creating new content here too.

### 5. Location-specific (beyond currently built pages)
`waste disposal kakkanad` (62), `waste collection kakkanad` (37), `scrap shop kakkanad` (30) — Kakkanad is already built; these likely support optimizing that page rather than new content. `e waste collection trivandrum` (17), `waste disposal trivandrum` (2) — Thiruvananthapuram is in the inventory as a planned-but-unbuilt location; this is a real signal to prioritize it in the location-page build queue.

## What this doc does NOT do

No new pages, posts, or content were created from this analysis. See `blog-content-gap-roadmap.md` for the prioritized action plan derived from these findings, and `PROJECT_TRACKER.md` for how this feeds into the broader phase sequence.
