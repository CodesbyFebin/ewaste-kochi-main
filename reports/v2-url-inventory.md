# V2 URL Inventory — Phase 1

Full machine-readable inventory: [`/data/urlInventory.json`](../data/urlInventory.json)

## Method

Crawled `sitemap.xml`, `robots.txt`, and ~25 direct HTTP checks against the live site on 2026-07-07. No GSC export was available at inventory time — `searchValue` is `"unknown"` for every entry pending the user's export. Classification below uses content-type/business-value judgment only. **Every entry needs a second pass once GSC data lands** — pages currently marked `keep` on judgment alone could flip to `manual-review` if they turn out to have zero impressions and thin content, and pages marked `manual-review` could resolve quickly once we see which side of a cannibalizing pair actually gets clicks.

## Counts

| Category | Count |
|---|---|
| Core pages | 11 |
| Service pages | 19 (7 flagged manual-review — cannibalization/overlap) |
| Blog posts | 37 (3 flagged manual-review — cannibalization) |
| Location pages | 32 (3 flagged manual-review — overlap) |
| Dead/legacy paths (already 404 or dead-end redirect) | 7 |
| Already-correct service-duplicate redirects | 4 |
| Host/protocol redirect rules | 3 |
| Infrastructure bugs | 1 (sitemap-index.xml loop) |

## Manual-review queue (blocking full canonical consolidation)

These 13 pages/pairs cannot be safely resolved without GSC clicks/impressions data per the mission's own non-negotiable rules (#2, #3). Listed by finding ID from `v2-initial-repo-audit.md`:

1. **D1** — `/recycling/` vs `/e-waste-recycling/`
2. **D2** — `/data-destruction/` vs `/data-destruction-services-kochi/`
3. **D3** — `/scrap-price/` vs `/e-waste-scrap-prices-kochi/` (possibly also `/pricing/`)
4. **D4** — `/free-e-waste-pickup-kochi/` vs `/blog/free-e-waste-pickup-kochi/`
5. **D5** — `/blog/sell-old-laptop-kochi/` vs `/blog/sell-old-laptop-kochi-best-price/`
6. `/locations/ernakulam/` vs `/locations/ernakulam-south/`
7. `/locations/kalamassery/` vs `/locations/kalamassery-hitech-park/`
8. `/pricing/` — possible 3-way overlap with the D3 pair
9. `/e-waste-collection-kochi/` — possible overlap with `/pickup/` and `/locations/`
10. `/why-choose-us/` — possible overlap with `/about/` / planned `/trust/`
11. `/blog/electronic-waste-collection-near-me-kochi/` vs `/blog/e-waste-collection-near-me-kochi/` (low priority, likely low-traffic tail pair)
12. `/blog/benefits-ewaste-recycling/` vs `/blog/environmental-impact-ewaste/` / `/blog/recycling-electronics-helps-kerala/` (low priority)

**Nothing in this queue will be redirected, merged, or noindexed until GSC data arrives and each pair is re-evaluated with real numbers**, per the mission's rule against removing/consolidating any URL with unknown search value.

## Discrepancies vs. the mission brief's assumed URL list

- Brief assumed `/services/e-waste-recycling-kochi/` → `/recycling/`. Reality: it redirects to `/e-waste-recycling/`, a different live page. Brief's canonical map for the Recycling silo is not accurate as written — do not hardcode it without resolving D1 first.
- Brief listed several blog slugs not found live (`dpdp-act-2023-it-disposal-compliance`, `battery-recycling-during-monsoon-kochi`, `e-waste-management-kerala-guidelines` style variants). Not carried into V2 since there's nothing live to preserve equity from; can be written as net-new content later if desired, not part of migration-safety scope.
- Brief did not anticipate `/why-choose-us/`, `/pricing/`, `/e-waste-collection-kochi/`, `/blog/e-waste-recycling-process-india/`, `/blog/e-waste-rules-india-2024/`, `/blog/benefits-ewaste-recycling/`, `/locations/ernakulam/`, `/locations/kalady/`, `/locations/kalamassery-hitech-park/` — all live and sitemap-indexed today. Added to inventory as `keep` or `manual-review` rather than silently dropped.
- The `/blogs/` duplicate path and `/ml/` root the brief worried about are both 404 on the live site — no migration action needed there beyond deciding whether V2's new `/ml/` tree reuses that path (yes, per bilingual plan) once real Malayalam content exists.
