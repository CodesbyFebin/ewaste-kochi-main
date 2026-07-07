# Phase 2G — Legacy Matrix Redirects for Already-Built Pages

Date: 2026-07-07
Status: **Complete.** No new pages, no deploy. Route count, sitemap count, and content-index count all remain 43 (unchanged). `vercel.json` grew from 13 to 297 redirect rules. Validation extended and green (464/464 checks, up from 177 because of the new redirect rules and new safety checks).

## Goal

Safely map legacy GSC-discovered URLs (`data/gscLegacyMatrixFindings.json`, 467 entries: 371 `location-matrix` + 96 `blogs-taxonomy`) to already-built canonical pages, without bulk-redirecting the whole set, without inventing new pages, and without touching anything outside `vercel.json` + two new data files.

## Method

The pre-existing `suggestedRedirectTarget` field in `gscLegacyMatrixFindings.json` was **not used** — it was computed in Phase 1.5 assuming a `/locations/{city}/` page for every city, which is false for 26 of the 30 cities in the matrix. Instead, every entry was re-classified from scratch against the actual 43-page route registry:

1. **Location-matrix entries** (`/locations/{city}/{service}/`, 371 total): classified **city-first, then service-fallback**.
   - If the city segment matches an already-built location page (`kakkanad`, `kalamassery`, `ernakulam-south`) or the already-resolved GSC loser city (`kalamassery-hitech-park`, which loses to `kalamassery` per the Phase 1.5/2B GSC decision), the entire entry redirects to that location page, high confidence, regardless of the service segment.
   - Otherwise, the *service* segment is matched against a hand-built table of the 30 real service suffixes found in the data, each mapped to high/medium/no-confident-target based on how directly it maps to a built service page (see table below).
2. **Blogs-taxonomy entries** (`/blogs/{category}/{slug}/`, 96 total): **all sent to manual-review**, none redirected. These slugs each mix a specific topic + city + scenario into one string (e.g. `pcb-and-motherboard-scrap-buyers-in-kakkanad-kochi`) with no clean 1:1 canonical target, and `docs/roadmap/legacy-matrix-redirect-strategy.md` already establishes the rule that these get evaluated individually against new `/blog/{slug}/` posts as they're built — not bulk-mapped now.

## Service-type confidence table (location-matrix only)

| Confidence | Service suffix → target |
|---|---|
| High (21 types) | `e-waste-recycling-kochi`, `electronic-waste-disposal`, `computer-recycling` → `/recycling/`; `battery-recycling-kochi`, `ups-inverter-recycling-kochi` → `/battery-recycling/`; `free-ewaste-pickup-kochi` → `/pickup/`; `itad-kochi`, `business-it-decommissioning` → `/itad/`; `data-destruction-kochi`, `hard-drive-destruction-kochi` → `/data-destruction/`; `hard-drive-shredding-kochi` → `/hard-drive-shredding/`; `hard-drive-degaussing-kochi` → `/services/hard-drive-degaussing-kochi/`; `server-recycling-kochi` → `/server-recycling-kochi/`; `it-asset-inventory-audit` → `/services/it-asset-inventory-audit/`; `electronics-recycling-near-me`, `laptop-recycling-near-me` → `/services/electronics-recycling-near-me/`; `tv-monitor-recycling-kochi` → `/tv-recycling-kochi/`; `certificate-of-destruction-kochi` → `/data-destruction-certificate-sample/`; `sell-old-electronics`, `sell-electronics-kochi`, `laptop-buyback-kochi` → `/sell-electronics/` |
| Medium (7 types, NOT implemented) | `mobile-recycling-kochi`, `printer-recycling-kochi`, `old-computer-disposal` → `/recycling/` (plausible but generic); `secure-computer-recycling`, `secure-laptop-disposal` → `/data-destruction/` (ambiguous between data-destruction and recycling); `corporate-ewaste-kochi` → `/itad/` (business framing, but could mean plain recycling for a small office); `network-equipment-disposal-kochi` → `/server-recycling-kochi/` (could also fit ITAD) |
| No confident target (2 types) | `air-conditioner-recycling-kochi` (no AC-recycling hub exists), `dpdp-act-compliance-kochi` (no DPDP Act content exists) |

City-based overrides took priority over this table whenever a city matched: `kakkanad` (17 entries), `kalamassery` (13), `kalamassery-hitech-park` (8, → `/locations/kalamassery/`, consistent with the already-resolved GSC decision), `ernakulam-south` (18) — 56 entries total, all high confidence.

## Results

| Bucket | Count | Action |
|---|---|---|
| High confidence | 284 | Added to `vercel.json` this phase |
| Medium confidence | 72 | Written to `data/legacyRedirectCandidates.json` only — **not implemented** |
| Manual review | 111 (96 blogs-taxonomy + 15 location-matrix with no confident target) | Written to `data/legacyRedirectManualReview.json` — **not implemented** |
| **Total** | **467** | Matches source file exactly |

GSC signal recovered by implementing only the high-confidence set: **55 clicks / 1,783 impressions** now redirect to a live page instead of 404ing. The medium set (7 clicks / 220 impressions) and manual-review set (13 clicks / 1,000 impressions) are deliberately left unredirected pending either a more specific future page or a human call on the genuinely ambiguous cases.

### High-confidence targets (all confirmed present in `src/data/routes.ts`)

`/recycling/`, `/battery-recycling/`, `/pickup/`, `/itad/`, `/data-destruction/`, `/hard-drive-shredding/`, `/services/hard-drive-degaussing-kochi/`, `/server-recycling-kochi/`, `/services/it-asset-inventory-audit/`, `/services/electronics-recycling-near-me/`, `/tv-recycling-kochi/`, `/data-destruction-certificate-sample/`, `/sell-electronics/`, `/locations/kakkanad/`, `/locations/kalamassery/`, `/locations/ernakulam-south/` — 16 distinct destinations absorbing 284 legacy sources. This many-to-few shape (consolidating scattered legacy long-tail URLs into existing hub pages) is standard migration practice, not a doorway-page pattern — no new page was created to receive any of this traffic.

## Deliverables

- `data/legacyRedirectCandidates.json` — 356 entries (284 high + 72 medium), fields: `source, target, reason, confidence, sourceGroup, targetType, gscClicks, gscImpressions`.
- `data/legacyRedirectManualReview.json` — 111 entries, fields: `source, reason, gscClicks, gscImpressions, suggestedNextStep`.
- `vercel.json` — grew from 13 to 297 rules (284 new, all high-confidence only, all individually verified target-exists and no-chain before being written).
- `scripts/validate-seo-v2.ts` extended with:
  - `redirect-source-in-route-registry` — fails if any redirect source is also a live route.
  - `redirect-source-in-sitemap` — fails if any redirect source URL appears in any sub-sitemap.
  - `redirect-source-in-content-index` — fails if any redirect source URL appears in `content-index.json` (structural re-check against the actual build artifact, since content-index.json is generated 1:1 from the route registry).
  - `links-to-redirect-source` — extended the existing per-page internal-link check (previously only checked the 7 `RESOLVED_LOSER_PATHS`) to check against all 297 redirect sources, so no internal link can ever point at a dead legacy URL.
  - Pre-existing `redirect-target-exists` / `redirect-chain` checks now run against all 297 rules, not just the original 13.

## Validation

```
npx astro build   → 43 pages (unchanged)
npm run validate  → 464 checks passed, 0 failures (up from 177 — new redirect rules and new checks each add pass entries)
```

- Route registry: 43 (unchanged).
- Sitemap total URLs across all 6 sub-sitemaps: 43 (unchanged).
- `content-index.json` page count: 43 (unchanged).
- 0 collisions between the 284 new sources and the 13 pre-existing `vercel.json` sources.
- 0 chain risk: none of the 284 new sources are existing redirect targets, none of the 16 new targets are existing redirect sources, and no new source equals its own target.
- All 16 unique high-confidence targets confirmed present in `src/data/routes.ts` before being written to `vercel.json`.

## Not done in this phase (explicitly out of scope)

- No blogs-taxonomy redirects — all 96 stayed in manual-review, per the standing strategy of evaluating them against future individual blog posts rather than bulk-mapping.
- No medium-confidence redirects implemented — all 72 stay in the candidate file for a future, more deliberate pass.
- No new pages, no route registry changes, no sitemap/content-index count change.
- No deploy.

## Next

Per the user's stated sequence: Phase 2H — Staging Deploy + Live Crawl (using `docs/deployment/staging-deployment-checklist.md` and `docs/deployment/post-deploy-crawl-checklist.md`, both of which should be updated to reflect the new 297-rule redirect count before that phase runs).
