# GSC Data Analysis — Manual-Review Resolution + Legacy Footprint Discovery

Date processed: 2026-07-07
Source files (dropped into the project root by the user, extracted for analysis, originals left in place):
- `ewastekochi.com-Performance-on-Search-2026-07-06.zip` — Pages/Queries/Countries/Devices/Search-appearance, ~3-month window ending 2026-06-29
- `ewastekochi.com-Coverage-2026-07-06.zip` — indexing status summary
- `ewastekochi.com-Coverage-Drilldown-2026-07-06.zip` (×7) — per-issue-type URL lists: Not found (404), Page with redirect, Alternate page with proper canonical tag, Crawled-not-indexed, Duplicate-Google-chose-different-canonical, Discovered-not-indexed, Excluded by noindex

## Part 1 — The 9 manual-review pairs: resolved

Every pair from the Phase 0/1 manual-review queue now has a clear, data-backed winner. `data/urlInventory.json` has been updated in place (action changed from `manual-review` to `keep`/`redirect`, real `searchValue` filled in).

| Pair | Winner | Loser | Numbers (combined www+non-www where relevant) |
|---|---|---|---|
| D1: Recycling | `/recycling/` | `/e-waste-recycling/` | 72 clicks / 3571 impr vs 2 clicks / 204 impr — ~18-30x |
| D2: Data destruction | `/data-destruction/` | `/data-destruction-services-kochi/` | 5 clicks / 191 impr vs 0 clicks / 16 impr |
| D3: Scrap price | `/e-waste-scrap-prices-kochi/` | `/scrap-price/` | 3 clicks / 106 impr vs 0 clicks / 27 impr |
| D4: Free pickup | `/blog/free-e-waste-pickup-kochi/` | `/free-e-waste-pickup-kochi/` | 8 clicks / 137 impr vs **0 clicks / 0 impr (didn't appear in the report at all)** |
| D5: Sell old laptop | `/blog/sell-old-laptop-kochi/` | `/blog/sell-old-laptop-kochi-best-price/` | 0 clicks / 4 impr vs 0 clicks / 0 impr |
| Ernakulam | `/locations/ernakulam-south/` | `/locations/ernakulam/` | 7 clicks / 442 impr vs 0 clicks / 0 impr |
| Kalamassery | `/locations/kalamassery/` | `/locations/kalamassery-hitech-park/` | 3 clicks / 145 impr vs 0 clicks / 43 impr |

**Note on D4:** this is the one place the data overturned intuition. A dedicated top-level service-style page competing against a blog post — I'd have guessed the service page should win on general principle, but it has *zero* recorded impressions, while the blog post has real, if modest, traffic. The data-driven call is to redirect the page with no equity into the one that actually has it, even though that means a commercial-style URL folding into a `/blog/` URL. Flagging this explicitly since it's the one non-obvious call in this batch.

**Two items remain open, not because of ambiguity but because of a genuine lack of data:** `/pricing/` and `/e-waste-collection-kochi/` both show **zero clicks and zero impressions** — they didn't appear in the GSC Pages report at all. That's not evidence they're worthless (they may be too new to have accrued data, or the report window may predate them), just that there's nothing to decide *from* yet. Left as `manual-review` with the zero-data finding noted; low priority since nothing is being risked by waiting.

## Part 2 — A much larger discovery: the historical pSEO footprint

The GSC Pages report contains 805 total URL rows — far more than the 103 URLs in the current live `sitemap.xml`. Breaking that down by pattern:

| Category | Rows | Combined clicks | Combined impressions |
|---|---|---|---|
| `/locations/{city}/{service}/` matrix pages | 386 | 63 | 2,023 |
| `/blogs/{category}/{slug}/` taxonomy (a *second*, separate blog system from `/blog/`) | 124 | 12 | 980 |
| `/hi/` (Hindi-language pages — not mentioned anywhere in the original mission brief) | 6 | 3 | 159 |
| `/industries/*.html` (matches the aspirational IA's "industries/" idea, but as legacy `.html` pages) | 5 | 0 | 49 |
| `blog.ewastekochi.com` subdomain (a real, content-bearing subdomain — different from `blogs.ewastekochi.com`, which 404s) | 1 | 0 | 18 |
| Everything already in our inventory (core/service/location/blog pages) | 284 | 871 | 27,587 |

**This is exactly the pattern the original mission brief warned about** ("thin location-service matrix pages," "do not mass-index hundreds of thin matrix URLs") — except it turns out this pattern was already built at some point in the site's history, at real scale, and mostly abandoned/thinned since (the current live sitemap and current live crawl show almost none of this — most of these 404 or aren't linked today). The Coverage report's "Indexed" count dropping from 936 (mid-May) to 441 (late June) is consistent with a large cleanup already having happened before this V2 project started.

### Classification (`data/gscLegacyMatrixFindings.json`)

Deduping the 386 location-matrix + 124 blogs-taxonomy rows across www/non-www host variants gives **467 unique legacy URLs**. Applying the mission's own location-service matrix policy (keep only with real clicks/business value; redirect if thin/no clicks):

- **56 have at least 1 click** in the 3-month window — but even the single best performer (`/locations/thrippunithura/e-waste-recycling-kochi/`) has only 4 clicks / 16 impressions. None of these clear any reasonable bar for "strong business value" on their own, especially set against the parent hub pages pulling thousands of impressions each.
- **411 have zero clicks.**

**Recommendation:** none of these 467 URLs warrant being rebuilt as standalone V2 pages. All should eventually 301 into their parent location hub (`/locations/{city}/`) or the relevant service hub, consistent with the mission's explicit anti-pSEO stance. Since most of the target location hubs don't exist yet in V2 (only Kakkanad is built), the practical plan is: **fold this redirect list into the location-page build work already queued in `PROJECT_TRACKER.md`** — when `/locations/edappally/` gets built, its corresponding matrix-page redirects (`/locations/edappally/e-waste-recycling-kochi/`, etc.) get added to `vercel.json` in the same pass. `data/gscLegacyMatrixFindings.json` has the full per-page breakdown so nothing needs to be re-derived when that work happens.

### Three things flagged for your decision, not acted on

1. **`/hi/` (Hindi) pages exist** — 6 URLs, modest impressions. Hindi was never part of any brief (only Malayalam was scoped for Phase 1.5). Is this intentional multi-language scope, or legacy from a template/theme default? No action taken pending your answer.
2. **A `blog.ewastekochi.com` subdomain has real content** — article titles like "recycled-smartphone-gold-yields," "ai-revolutionising-device-recycling." This is different from `blogs.ewastekochi.com` (which 404s and is the one referenced in the original mission brief). Worth clarifying which subdomain, if either, is the intended long-term blog home.
3. **A `/blogs/{category}/{slug}/` taxonomy** (96 unique paths) is a second, separate blog content system from `/blog/`. Same question as above — is this active, abandoned, or superseded?

## Part 3 — Design reference

The screenshot dropped alongside the GSC data (`REcycling page.png`) is confirmed to be a **reference/inspiration design**, not an existing live page or another tool's output. It shows a richer page structure worth incorporating into a future content/design pass: mega-menu nav with dropdowns, a trust-badge strip (CPCB/ISO/reviews/tons recycled), a "Key Takeaways" grid, an accepted-items icon grid, a "Why It Matters" stats band, a 5-step process diagram, split "Solutions for Homes/Businesses" cards, an area-coverage map, an indicative pricing table, and a "Guides & Resources" content teaser row. Noted here for the next design-focused phase — not actioned in this pass, which was data processing.
