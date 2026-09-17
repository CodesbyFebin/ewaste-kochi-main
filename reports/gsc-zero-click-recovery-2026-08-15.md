# GSC Zero-Click Recovery Map — 2026-08-15

## Purpose

Prevent query cannibalization while acting on the high-impression, zero-click GSC opportunities supplied for the August recovery sprint. Reuse an existing strong canonical URL whenever the intent is already represented; create a new route only when no suitable canonical page exists.

## Canonical query ownership

| GSC intent | Canonical owner | Action |
| --- | --- | --- |
| where to donate electronics | `/blog/ewaste-donation-reuse-guide-kochi/` | Keep existing indexed page. Metadata aligned to the exact where-to intent; do not create a competing donation slug. |
| where to recycle old electronics | `/blog/where-to-recycle-old-electronics-in-kochi/` | Keep dedicated guide as informational owner. `/recycling/` is separated to transactional service intent. |
| where to recycle batteries | `/blog/where-to-recycle-batteries-in-kochi/` | Keep dedicated guide as informational owner. `/battery-recycling/` is separated to transactional service intent. |
| where to sell electronics locally | `/sell-electronics/` plus `/blog/sell-electronics/` for long-form guidance | Do not create a third competing sell URL until GSC query/page data proves a distinct intent gap. |
| where to sell used electronics | `/sell-electronics/` plus `/blog/sell-electronics/` | Same commercial-intent cluster; strengthen internal links rather than duplicate. |
| how to recycle electronics | `/recycling/` plus existing recycling education cluster | Treat as an optimization/internal-link task first; add a new page only if GSC page mapping shows no existing owner. |
| local recycling centers | `/locations/` and `/services/electronics-recycling-near-me/` | Use the service-area/near-me cluster instead of publishing an unsupported directory of third-party centers. |

## Restored location surface

The generated-route gate introduced by `7209f10d` was reversed using the exact pre-gate `gscIndexedGeneratedPages.ts` blob while preserving all later Safe-Deep, schema, SeoHead and CI work.

Measured post-restore sitemap surface from the Quality Gate:

- Total canonical sitemap URLs: **885**
- Blog: **619**
- Core: **14**
- Legal: **4**
- Locations: **184**
- Malayalam: **8**
- Services: **56**

The location group is therefore restored to **184 URLs**, including the high-priority GSC pages for Kakkanad, Kozhikode, Palakkad, Ernakulam South, Thrippunithura and Thrissur.

The current repository evidence does not establish 988 as the canonical sitemap count for this exact Safe-Deep build. Do not manufacture additional URLs merely to match that aggregate. Future reductions from the measured restored surface are guarded by `scripts/verify-dist.mjs` and `data/index-surface-baseline.json`.

## Manual GSC URL Inspection queue after production merge

Submit these first, then the restored priority locations:

1. `/appliance-recycling/`
2. `/same-day-pickup/`
3. `/home-e-waste-pickup/`
4. `/corporate-pickup/`
5. `/sell-old-laptop/`
6. `/sell-old-mobile/`
7. `/phone-buyback/`
8. `/office-clearance/`
9. `/business-e-waste-recycling/`
10. `/it-asset-disposal/`

Restored location priority queue:

- `/locations/kakkanad/`
- `/locations/kozhikode/`
- `/locations/palakkad/`
- `/locations/ernakulam-south/`
- `/locations/thrippunithura/`
- `/locations/thrissur/`

URL Inspection requests are manual Search Console actions and should be performed only after the recovery branch is merged and the production URLs are verified live.

## Next implementation sequence

1. Keep the 184-location restored surface protected in CI.
2. Validate the intent-separation metadata changes in the full Quality Gate.
3. Strengthen internal links from the three high-impression guide pages to their relevant service and location hubs.
4. Review mobile CTA visibility on the high-impression pages and location templates.
5. Process the GSC crawled-not-indexed and discovered-not-indexed exports before adding unrelated content.
6. Monitor query-to-page ownership, CTR, impressions and average position after the production recovery deploy.
