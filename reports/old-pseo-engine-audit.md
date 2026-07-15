# OLD-P0B pSEO Engine Audit

Validation scope: local checkout at repository root (`/Users/cyberteck/Desktop/EwasteKochi`).

## Repository Shape Found

- `ewk-site/`: not present in this checkout.
- `astro-site/`: not present in this checkout.
- Astro app is at repository root (`astro.config.mjs`, `src/`, `public/`, `dist/`).
- `astro-site/src/data/content.db`: not present.
- `scripts/05-generate-blogs.py`: not present.
- `scripts/06-build-sitemaps.py`: not present.
- Root `vercel.json`: present, with 317 redirects.

## Where The Large Legacy/pSEO Footprint Comes From

The current app does not contain an 11,000-row SQLite content database or 11,000 generated Astro pages. The large legacy footprint is represented by imported GSC and redirect planning data under `data/`, plus `vercel.json` redirect rules that contain old pSEO matrix URL sources.

Current live build source of truth:

- `src/data/routes.ts`: canonical route registry for built and discoverable URLs.
- `src/pages/**`: hand-authored Astro pages and current blog posts.
- `src/data/blogContentBank.ts`, `src/data/blogClusters.ts`, `src/data/blogRoadmap20.ts`: content bank and roadmap used by the current TypeScript blog generator.
- `scripts/generate-remaining-posts.ts`: current generated blog script.
- `src/lib/sitemapXml.ts` and `src/pages/sitemaps/*.ts`: sitemap generation.

Current build output after patch: 79 pages.

## DB Tables Found

No SQLite database file was found. Searches for `content.db`, `*.db`, `*.sqlite`, and `*.sqlite3` returned no files.

## Generator Fields Found

Current generator: `scripts/generate-remaining-posts.ts`.

Input fields:

- `title`
- `slug`
- `clusterName`
- `clusterSlug`

Generated page fields:

- `title`
- `description`
- `datePublished`
- `dateModified`
- `breadcrumbItems`
- `jsonLd` with `BlogPosting` and `WebPage`
- visible sections from `CONTENT_BANK.modules`
- visible FAQ from `CONTENT_BANK.faqAnswers`
- related links from roadmap/content bank data

## Sitemap Sources Found

- `src/data/routes.ts`: route registry.
- `src/lib/indexable.ts`: indexability filter.
- `src/lib/sitemapXml.ts`: XML builder and containment helper.
- `src/pages/sitemap.xml.ts`: sitemap index.
- `src/pages/sitemaps/*.ts`: sub-sitemaps.
- `src/pages/content-index.json.ts`, `src/pages/content-index.xml.ts`, `src/pages/ai-sitemap.xml.ts`: discovery companions, all based on indexable routes.

## Schema Sources Found

- `src/components/SeoHead.astro`: emits page-provided JSON-LD.
- `src/components/Faq.astro`: emits visible FAQ JSON-LD.
- `src/components/Breadcrumbs.astro`: emits breadcrumb JSON-LD.
- Individual `src/pages/**/*.astro` files define page-specific `jsonLd`.
- `src/lib/schemaSafety.ts`: added as the central JSON-LD denylist/allowlist guard.

## Unsafe Claim Locations Found

Fixed source locations:

- `src/pages/index.astro`: removed `LocalBusiness` schema block.
- `src/pages/blog/ewaste-pickup-near-me/index.astro`: removed `HowTo` schema block.
- `src/pages/blog/how-to-book-ewaste-pickup-kochi/index.astro`: removed `HowTo` schema block.
- `src/pages/blog/battery-recycling-near-me-kochi/index.astro`: removed `HowTo` schema block.
- `src/pages/blog/what-is-ewaste/index.astro`: removed direct "Pollution Control Board-authorized processes" wording.
- `src/data/blogContentBank.ts`: removed generated wording that could claim Ewaste Kochi is an authorized recycler.
- `src/data/blogClusters.ts`: matched the same safer generated FAQ wording.
- `src/data/site.ts`: removed boolean certification/authorization status fields.

Engine-level guard added:

- `src/lib/schemaSafety.ts` strips denied schema types/properties before render.
- `scripts/validate-seo-v2.ts` now fails if denied schema or properties appear in built output.

## Unsafe Claims By Source Type

- DB: none found; no DB exists in this checkout.
- Templates/components: unsafe schema could pass through before patch; now centrally sanitized.
- Scripts/data: current TypeScript generator and content bank contained potentially unsafe authorization phrasing; patched.
- Static HTML/Astro pages: one direct Pollution Control Board authorization phrasing was found and patched.
- Redirect/data maps: legacy URLs include unsafe slugs such as `government-approved` and `iso-certified`; these are data/redirect artifacts and are not emitted as live page schema or sitemap URLs.
