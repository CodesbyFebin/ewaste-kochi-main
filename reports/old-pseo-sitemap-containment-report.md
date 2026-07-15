# OLD-P0B Sitemap Discovery Containment Report

## Patch Summary

Sitemap containment is now centralized in `src/lib/sitemapXml.ts` via `sitemapRoutes()`.

Rules enforced:

- Only canonical route-registry paths are emitted.
- `isIndexable()` is applied to every sub-sitemap group.
- Duplicate route paths are removed before XML generation.
- URLs are sorted for stable output.
- Build logs sitemap counts per group.
- Sitemap URLs use canonical `https://www.ewastekochi.com` via `SITE_URL`.

## Current Sitemap Counts

Built from `dist/sitemaps/*.xml` after `npm run build`:

- `core.xml`: 7 URLs
- `services.xml`: 16 URLs
- `locations.xml`: 23 URLs
- `legal.xml`: 2 URLs
- `ml.xml`: 7 URLs
- `blog.xml`: 24 URLs

Total canonical indexable URLs: 79.

## Containment Status

- Redirect sources are not included in sitemaps.
- 404 URLs are not included in sitemaps.
- Duplicate non-canonical URLs are not included.
- Known generated/unsafe legacy pSEO matrix URLs remain redirect/data artifacts, not sitemap URLs.
- High-value bare location/service pages remain discoverable.

## Validation

`npx tsx scripts/validate-seo-v2.ts`

- Routes checked: 79
- Failures: 0

Rendered output search found no forbidden schema/claim hits in `dist/` for:

- `AggregateRating`
- `Review`
- `ratingValue`
- `reviewCount`
- `GeoCoordinates`
- `QAPage`
- `LocalBusiness`
- `HowTo`
- `HowToStep`
- unsafe authorization/rating phrases
