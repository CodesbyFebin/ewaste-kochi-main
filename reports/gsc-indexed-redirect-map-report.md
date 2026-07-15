# GSC Indexed Redirect Map Report

## Files

Created:

- `data/gsc-indexed-redirect-map.csv`
- `data/gsc-indexed-redirect-map.json`

Rows: 90 indexed redirect decisions.

## Redirect Breakdown

| Page type | Count |
| --- | ---: |
| `location-service-matrix` | 84 |
| `other-legacy-service` | 5 |
| `location-page` | 1 |

## Implementation Status

- Redirects added this phase: 0
- Existing configured redirects used: 90
- Bad local redirect targets: 0
- Redirect sources in sitemap/content-index: 0

The redirect map records the exact configured Vercel source path, including trailing slash where required. This matters because several indexed GSC paths are non-slash variants while the Vercel rule is slash-specific.

## Staging Verification

Staging crawl against `https://ewastekochi-v2-staging.vercel.app`:

- Redirect sources checked: 90
- All returned 3xx from the exact configured source.
- All targets resolved to 200.
- Failures: 0

## Containment

No old service-child location pages were rebuilt as thin pages. They either:

- redirect to a bare location page, or
- redirect to the strongest relevant service page.

No redirect points to the homepage as a catch-all.
