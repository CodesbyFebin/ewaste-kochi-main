# OLD-P0B pSEO Engine Complete Fix Report

## Generator Changes

The requested old Python generator (`scripts/05-generate-blogs.py`) is not present. Patched the current generator/data layer instead:

- `scripts/generate-remaining-posts.ts` already generates only `BlogPosting` and `WebPage` JSON-LD.
- `src/data/blogContentBank.ts` unsafe generated authorization wording was softened.
- `src/data/blogClusters.ts` matching unsafe FAQ wording was softened.
- Central schema sanitizer now protects generated pages at render time.

## DB Backup Path

Not applicable. No `astro-site/src/data/content.db` or other SQLite DB exists in this checkout.

## DB Rows Patched

0.

## Unsafe Claims Removed

- Removed source `LocalBusiness` schema block from homepage.
- Removed source `HowTo`/`HowToStep` schema blocks from three blog posts.
- Removed direct "Pollution Control Board-authorized processes" wording.
- Removed generated wording that could claim Ewaste Kochi is an authorized recycler.
- Removed certification/authorization boolean fields from shared business data.

## Schema Removed/Changed

Added `src/lib/schemaSafety.ts`:

- Allows top-level `Organization`, `WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`, `BlogPosting`, `Article`.
- Denies `AggregateRating`, `Review`, `GeoCoordinates`, `QAPage`, `LocalBusiness`, `HowTo`, `HowToStep`, fake certification-style properties, fake rating/review properties and geo properties.

Patched:

- `src/components/SeoHead.astro`
- `src/components/Faq.astro`
- `scripts/validate-seo-v2.ts`

## ewk-site Changes

`ewk-site/` is not present in this checkout. No changes made.

## Astro-site Changes

This checkout is a root-level Astro app, not nested under `astro-site/`.

Added:

- `src/components/LocationHub.astro`
- seven protected location hub pages
- `src/lib/schemaSafety.ts`

Patched:

- root homepage schema
- blog schema
- location index
- route registry
- sitemap generation
- SEO validation
- unsafe source copy/data wording

## Sitemap/Discovery Containment Status

Complete for this checkout.

- Sitemap source is still the route registry.
- Every sub-sitemap uses `isIndexable()`.
- Sitemap build logs counts.
- Current sitemap total: 79 canonical indexable URLs.
- No redirect source or unsafe generated matrix URL is emitted in sitemap output.

## GSC Traffic URL Protection Status

Complete for the provided critical list.

- 33 critical URLs checked.
- 33 are built 200 pages.
- 0 missing.

## Validation Results

Commands run:

- `npm install`: passed.
- `npm run build`: passed, 79 pages built.
- `npx tsx scripts/validate-seo-v2.ts`: passed with 0 failures.
- Rendered `dist/` unsafe claim/schema search: no hits.

Note: `npx tsx scripts/validate-seo-v2.ts` required approval because the sandbox blocked tsx IPC socket creation under `/var/folders`.

## Build Result

Passed.

Latest build output:

- 79 pages built.
- Sitemap chunks generated.
- Critical URLs present in `dist/`.

## Remaining Known Risks

- This checkout does not contain the old SQLite DB or old Python scripts named in the request. If those exist in another branch/archive, they still need a separate DB-level audit.
- Legacy data files still contain historical unsafe URL slugs as GSC/redirect evidence. They are not emitted as live pages or sitemap URLs.
- Certification/authorization documentation remains a real-world verification issue; no structured claim is emitted.

## Deployment Recommendation

Deploy this old pSEO safety patch to the current production target after reviewing the diff.

Do not run `vercel --prod` from the agent session. Use the normal deployment workflow and crawl the protected URLs immediately after deploy.
