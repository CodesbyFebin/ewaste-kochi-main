# Content Freshness Indexing Queue

Generated: 2026-09-18T08:27:30.500Z

## Safety Position

This is a readiness queue only. It does not ping Google, does not call the Google Indexing API, does not submit sitemaps, and does not request indexing automatically.

Google's sitemap ping endpoint is deprecated. Google's Indexing API is not intended for normal EwasteKochi service, location, tool, or blog pages because it is limited to JobPosting and livestream BroadcastEvent URLs. Fresh content should be discovered through sitemap/robots.txt and manually inspected/requested in Google Search Console when the update is important.

References:

- Google Search Central: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
- Google Indexing API Quickstart: https://developers.google.com/search/apis/indexing-api/v3/quickstart

## Input

- Git range: `HEAD~1..HEAD`
- Working tree included: no
- Changed files inspected: 28
- Canonical candidate URLs found: 33
- Live checks passed: 33
- Live checks held: 0

## Changed Files

- `public/.well-known/keys.txt`
- `scripts/regenerate-llms.mjs`
- `scripts/validate-discovery-guides.ts`
- `src/components/DiscoveryGuide.astro`
- `src/components/SeoHead.astro`
- `src/data/discoveryBusiness.ts`
- `src/data/discoveryBusiness2.ts`
- `src/data/discoveryCompliance2.ts`
- `src/data/discoveryDefinitions.ts`
- `src/data/discoveryDevices.ts`
- `src/data/discoveryGuideTypes.ts`
- `src/data/discoveryGuides.ts`
- `src/data/discoveryHowTo.ts`
- `src/data/discoveryHowTo2.ts`
- `src/data/discoveryIndustries2.ts`
- `src/data/discoveryLocations.ts`
- `src/data/discoveryLocations2.ts`
- `src/data/routes.json`
- `src/data/routes.ts`
- `src/data/seoOverrides.ts`
- `src/lib/schemaSafety.ts`
- `src/pages/[legacyStandalone]/index.astro`
- `src/pages/index.astro`
- `src/pages/schema/organization.json.ts`
- `src/pages/wiki/sales/choose-secure-itad-vendor/index.astro`
- `src/pages/wiki/sales/e-waste-scrap-buyers/index.astro`
- `src/pages/wiki/sales/online-selling-platforms/index.astro`
- `src/pages/wiki/technical/choose-recycler/index.astro`

## Manual GSC Queue

| URL | Tier | Live status | Recommendation |
| --- | --- | --- | --- |
| https://www.ewastekochi.com/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/battery-recycling/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/contact/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/e-waste/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/marketplace/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/pickup/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/recycling/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/sell-electronics/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/services/air-conditioner-recycling-kochi/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/services/computer-recycling-near-me/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/services/electronics-recycling-near-me/ | P1 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/aluva/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/edappally/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/ernakulam-south/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/kakkanad/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/kalamassery/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/kannur/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/kollam/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/kottayam/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/kozhikode/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/malappuram/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/palakkad/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/thiruvananthapuram/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/locations/thrissur/ | P2 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/blog/electronic-waste-disposal-kerala/ | P3 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/blog/free-e-waste-pickup-kochi/ | P3 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/blog/how-to-choose-itad-provider/ | P3 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/blog/laptop-scrap-price-kochi/ | P3 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/tools/scrap-value-calculator/ | P3 | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/wiki/sales/choose-secure-itad-vendor/ | freshness | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/wiki/sales/e-waste-scrap-buyers/ | freshness | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/wiki/sales/online-selling-platforms/ | freshness | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |
| https://www.ewastekochi.com/wiki/technical/choose-recycler/ | freshness | Pass | After production deployment, inspect live URL in GSC and request indexing if the content update is important. |

## Skip Rules

- Do not request indexing for redirected URLs.
- Do not request indexing for retired 404 or intentional noindex URLs.
- Do not request indexing for staging, localhost, or Vercel preview URLs.
- Do not request indexing for all sitemap URLs after routine edits.
- Use GSC URL Inspection only for changed, valuable, canonical URLs that pass the live test.

## Next Step

After the relevant production deployment is live, use the passed rows above as the manual URL Inspection queue in Google Search Console. Keep `https://www.ewastekochi.com/sitemap.xml` submitted in GSC and referenced from `robots.txt`.
