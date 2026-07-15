# GSC Indexed URL Upgrade Summary

## Master Map

Created:

- `data/gsc-indexed-url-upgrade-map.csv`
- `data/gsc-indexed-url-upgrade-map.json`

Rows: 414 indexed URLs.

## Traffic Tiers

| Tier | Count |
| --- | ---: |
| P0 | 18 |
| P1 | 43 |
| P2 | 6 |
| P3 | 224 |
| P4 | 123 |

## Current V2 Status

| Status | Count |
| --- | ---: |
| `built_200` | 53 |
| `redirect_configured` | 90 |
| `missing_not_built` | 218 |
| `external_subdomain_indexed` | 53 |

## Final Action Counts

| Action | Count |
| --- | ---: |
| `upgrade_existing_200` | 30 |
| `build_safe_200` | 23 |
| `redirect_301` | 90 |
| `manual_review` | 64 |
| `leave_404` | 207 |

## Decisions

- Existing high-value V2 routes stay 200.
- Clicked and high-impression bare location gaps were built as safe feasibility pages.
- Old service-child location URLs redirect to bare location or relevant service pages.
- Old generated `/blogs/` and low-value old `/blog/` URLs are not rebuilt.
- Buyback SKU pages are not rebuilt.
- `blog.ewastekochi.com` is tracked separately as manual review.

## Guardrails

The validator now fails if:

- the indexed map is missing or not 414 rows,
- a clicked URL is left 404/410,
- a 100+ impression URL is left 404/410,
- a built action points to a missing route,
- an indexed redirect is missing from `vercel.json`,
- unsafe schema or business claims appear in rendered output.
