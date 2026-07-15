# GSC-P3 Full Indexed Footprint Upgrade Report

Date: 2026-07-15

## Scope

Goal: every one of the 414 confirmed indexed URLs gets a safe outcome without recreating the old pSEO system.

Source data:

- `data/gsc-url-protection-map.json`
- Confirmed indexed rows marked by `confirmed_indexed_2026-07-10` or `indexed-pages-crosscheck-2026-07-10`

## Route Count

- Before this phase: 79 routes after OLD-P0B
- After this phase: 87 routes
- Net new routes: 8

Built safe 200 pages added:

- `/locations/kothamangalam/`
- `/locations/muvattupuzha/`
- `/locations/vyttila/`
- `/locations/north-paravur/`
- `/locations/perumbavoor/`
- `/locations/maradu/`
- `/locations/willingdon-island/`
- `/locations/kalady/`

Not built:

- `/locations/kalamassery-hitech-park/` because it is already a resolved loser and `vercel.json` redirect source to `/locations/kalamassery/`.

## Indexed URL Actions

From `data/gsc-indexed-url-upgrade-map.json`:

| Action | Count |
| --- | ---: |
| `upgrade_existing_200` | 30 |
| `build_safe_200` | 23 |
| `redirect_301` | 90 |
| `manual_review` | 64 |
| `leave_404` | 207 |
| `canonicalize` | 0 |
| `noindex` | 0 |
| `return_410` | 0 |

## Traffic Protection

- Clicked indexed URLs: 61
- Clicked URLs protected: 61
- Clicked URLs left 404/410: 0
- URLs with 100+ impressions: 34
- 100+ impression URLs protected or manual-review tracked: 34

## Page Upgrades

High-value existing pages were kept 200 and made safer:

- Direct-answer blocks added to `/recycling/`, `/marketplace/`, `/battery-recycling/`, `/services/electronics-recycling-near-me/`, and `/sell-electronics/`.
- `/sell-electronics/` title, description, lede and FAQ language were softened from instant/on-the-spot claims to condition-based quote language.
- Services, location and blog references to "instant quote" were softened to "condition-based estimate."
- Default CTA label changed from "Book Free Pickup" to "Book Pickup" so feasibility pages do not imply a guaranteed free pickup.

## Discovery Status

Discovery files are clean:

- `sitemap.xml`
- child sitemaps
- `content-index.json`
- `content-index.xml`
- `ai-sitemap.xml`
- `llms.txt`

Confirmed absent from discovery:

- redirect sources
- `/blogs/` legacy URLs
- buyback SKU URLs
- `blog.ewastekochi.com`
- noindex/dead URLs
- duplicate non-www URLs

## Unsafe Claim Sweep

Rendered `dist/` sweep: 0 matches for the requested unsafe patterns, including ratings/reviews, fake authorization/certification claims, instant-cash wording, same-day guarantee wording, all-Kerala free pickup, `100% Data Security`, and `zero landfill`.

## Validation

Passed:

- `npm run check`
- `npm run build`
- `npm run validate`
- `npx tsx scripts/check-duplicate-content.ts`
- `npx tsx scripts/check-orphan-articles.ts`
- rendered unsafe-claim sweep
- indexed URL action-map checks
- redirect target checks
- discovery file checks

Latest validator result:

- Routes checked: 87
- Failures: 0

## Staging

Staging-only deploy completed.

- Project: `ewastekochi-v2-staging`
- Project ID: `prj_FvHPByEMUjCejy5w9kph4neqy9Eq`
- Alias: `https://ewastekochi-v2-staging.vercel.app`
- Preview: `https://ewastekochi-v2-staging-qks1ir016-projects555.vercel.app`

Staging sanity crawl:

- Pages/discovery URLs checked: 59
- Indexed redirect sources checked: 90
- Failures: 0
- No staging URL leaked into canonical tags.

## Remaining Launch Blockers

No content, schema, sitemap, redirect, or staging blocker found in this phase.

Remaining manual decision:

- `blog.ewastekochi.com` has 53 indexed URLs with no current traffic. Keep parked for now; decide later whether to keep separate, migrate selected pillar/tool pages, or retire.

## Phase 2L Retry

Phase 2L production cutover retry is safe after review and explicit user approval. Do not submit GSC or deploy production automatically.
