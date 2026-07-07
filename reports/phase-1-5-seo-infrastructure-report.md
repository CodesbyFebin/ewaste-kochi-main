# Phase 1.5 — SEO Infrastructure + Trust + Malayalam Starter

Date: 2026-07-07
Status: **Complete.** Build green, validation script green (106/106 checks, 0 failures), no deploy performed.

## Scope confirmation

Per user instruction at the start of this phase: the curated flat core is the intended Phase 1 end state. No `industries/`, `knowledge-hub/`, `guides/`, `resources/`, `community/`, `calculators/`, or nested service routes were built. No existing indexed flat URL was renamed. This phase only added SEO infrastructure, trust pages, and a Malayalam starter set on top of the existing 17 Phase 1 pages.

## Files created or changed

### Route registry / shared logic
- `src/data/routes.ts` — extended `RouteEntry` with `sitemapGroup` ("core"|"services"|"locations"|"legal"|"ml"), `lang` ("en-IN"|"ml-IN"), and `hreflangPair`. Added a `getHreflang(path)` helper so every page computes its own hreflang triple (en-IN + ml-IN + x-default) from one source of truth instead of hand-writing URLs per page.
- `src/lib/sitemapXml.ts` — new shared `buildUrlsetXml()` helper used by all 5 sub-sitemap endpoints, so the `<url>` block format can't drift between them.

### Components
- `src/layouts/Layout.astro` — now accepts a `lang` prop and sets `<html lang="ml">` or `<html lang="en-IN">` accordingly.
- `src/components/LangSwitch.astro` — new. Renders a single "Read in English" / "മലയാളത്തിൽ വായിക്കുക" link near the top of any page that has a translation counterpart.
- `src/components/CtaBar.astro` — now accepts `labels` (call/whatsapp/pickup text) and `pickupHref`, so Malayalam pages can render Malayalam CTA text and link to the Malayalam pickup page instead of the English one.
- `src/components/Footer.astro` — added `/trust/` and `/ml/` (global Malayalam entry point) links; made the "Services" column header a link to `/services/` (see Findings below).

### Trust pages (3) — placeholder-safe, no invented numbers
- `/trust/` — hub explaining the compliance approach and where to find specifics.
- `/certifications/` — states ISO 14001:2015-aligned processes and Pollution Control Board authorization (both already public claims on the live site being carried forward, not new claims invented by this build), explicitly defers certificate numbers/validity to "documentation available on request."
- `/data-destruction-certificate-sample/` — describes the *fields* a real certificate contains (client name, device inventory, destruction method, standard followed, date/time, chain of custody, authorized signatory) rather than showing a filled-in sample with fabricated names/numbers.

### Malayalam starter pages (7)
`/ml/`, `/ml/recycling/`, `/ml/battery-recycling/`, `/ml/pickup/`, `/ml/sell-electronics/`, `/ml/data-destruction/`, `/ml/contact/`. Each has: Malayalam H1/title/meta description, self-canonical `/ml/...` URL, `lang="ml"` on `<html>`, full en-IN/ml-IN/x-default hreflang triple, Malayalam CTA labels, Malayalam FAQ (schema'd), and a link back to the English equivalent. **Caveat, stated plainly:** this Malayalam copy was written by an AI, not a native speaker. It aims for natural, simple, grammatically sound Malayalam and reuses consistent terminology across pages, but per the instruction not to ship poor machine-translation, I recommend a native-speaker review pass before this goes live — flagging this rather than silently asserting native-level quality.

### hreflang wiring on English pages
Added `hreflang={getHreflang(path)}` and a `<LangSwitch>` link to the 7 English pages that now have Malayalam counterparts: `/`, `/recycling/`, `/battery-recycling/`, `/pickup/`, `/sell-electronics/`, `/data-destruction/`, `/contact/`. Pages without an `/ml/` counterpart (marketplace, hard-drive-shredding, itad, about, faq, privacy, terms, locations, services, trust pages) correctly emit no hreflang block at all, per the existing canonical-plan rule against incomplete bilingual pairs.

### Sitemap architecture (restructured)
- `src/pages/sitemap.xml.ts` — rewritten from a flat `<urlset>` into a `<sitemapindex>` referencing the 5 group sub-sitemaps below. Only references a group's sub-sitemap file if at least one route exists in that group.
- `src/pages/sitemaps/core.xml.ts`, `services.xml.ts`, `locations.xml.ts`, `legal.xml.ts`, `ml.xml.ts` — new. Each is a plain `<urlset>` filtered from `ROUTES` by `sitemapGroup`.

Current sitemap contents (27 URLs total across 5 groups):

| Sub-sitemap | Routes |
|---|---|
| core.xml | `/`, `/services/`, `/locations/`, `/about/`, `/faq/`, `/contact/`, `/trust/`, `/certifications/`, `/data-destruction-certificate-sample/` |
| services.xml | `/recycling/`, `/battery-recycling/`, `/marketplace/`, `/sell-electronics/`, `/pickup/`, `/data-destruction/`, `/hard-drive-shredding/`, `/itad/` |
| locations.xml | `/locations/kakkanad/` |
| legal.xml | `/privacy/`, `/terms/` |
| ml.xml | all 7 `/ml/*` pages |

Note: `/services/` and `/locations/` hub pages are grouped into `core.xml` rather than their own group, since they're site-wide navigation hubs rather than individual service/location instances — a judgment call, flagged here rather than made silently.

### content-index / ai-sitemap
- `src/pages/content-index.json.ts` — fixed a bug: `language` was hardcoded to `"en-IN"` for every page regardless of actual language; now reads `r.lang` per route. Top-level `language` array now correctly lists `["en-IN", "ml-IN"]`.
- `src/pages/content-index.xml.ts` — new. XML mirror of content-index.json (same fields: url/title/description/type/canonical/language/lastModified/indexable), generated from the same `ROUTES` registry.
- `src/pages/ai-sitemap.xml.ts` — added a `<language>` field per page for consistency with the other two.

### robots.txt / llms.txt
- `public/robots.txt` — unchanged; already satisfied every Phase 1.5 rule (no block on `/services/`, `/locations/`, or `/ml/`; only references sitemaps that exist). Verified, not just assumed.
- `public/llms.txt` — rewritten to list all 27 live pages by section (Core, Locations, Trust, Malayalam), all 5 sub-sitemaps plus content-index/ai-sitemap, and an explicit note that legacy duplicate-content URLs like `/e-waste-recycling/` and `/scrap-price/` are not yet confirmed canonical.

## Finding fixed during this phase: orphan `/services/` page

While sweeping for dangling links, the reverse problem turned up: `/services/` had **zero** internal links pointing to it from anywhere in the codebase (not Header, not Footer, not homepage) — it was only reachable via the sitemap or a typed URL. Fixed by making the Footer's "Services" column header link to `/services/`, and adding a "View all services →" link under the homepage's service grid. Not part of the original task list, but a real internal-linking defect worth fixing rather than leaving for a future pass.

## Validation script extensions (`scripts/validate-seo-v2.ts`)

All 8 requested checks implemented:

1. **Sitemap URLs are 200 canonical pages** — every sub-sitemap URL is cross-checked against that route's own self-canonical tag in the built HTML.
2. **No sitemap URL redirects** — implemented as a best-effort proxy (every sitemap URL must equal some page's own built self-canonical); a true redirect-chain check requires hitting a live deployed URL, which is out of scope for a static local build and is noted as a limitation in the script's comments rather than falsely claimed as fully verified.
3. **No sitemap URL missing canonical** — covered by the per-route canonical check.
4. **No canonical points to non-www** — covered (`canonical-host` check).
5. **No canonical points to `/e-waste-recycling/`** — new explicit guard; fails the build if any page ever canonicalizes to that unresolved D1 duplicate.
6. **robots.txt does not block important pages** — extended with explicit assertions for `/services/`, `/locations/`, `/ml/` specifically, not just a generic loop.
7. **llms.txt / content-index.json / content-index.xml / ai-sitemap.xml exist** — new existence checks against the `dist/` build output.
8. **Malayalam pages have hreflang / English paired pages have hreflang** — one check covers both directions: any route with `hreflangPair` set must emit a complete en-IN + ml-IN + x-default triple pointing at the right URLs.
9. **Trust pages do not contain fake certificate numbers** — regex heuristic scanning visible text on the 3 trust-typed pages for patterns like "certificate/authorization/license/registration" followed by a number-like token; fails the build if one is ever introduced.

## Validation results

```
npx astro check   → 0 errors, 0 warnings, 0 hints (51 files)
npx astro build   → 27 pages built
npm run validate  → 106 checks passed, 0 failures
```

Manual spot checks (live `astro preview` crawl):
- All 27 page routes + `/sitemap.xml` + 5 sub-sitemaps + `/content-index.json` + `/content-index.xml` + `/ai-sitemap.xml` + `/llms.txt` + `/robots.txt` = 37 URLs, all return `200`.
- `sitemap.xml` confirmed to be a valid `<sitemapindex>` referencing exactly the 5 sub-sitemaps.
- hreflang triple confirmed byte-for-byte identical (correctly) on both sides of a pair (`/recycling/` and `/ml/recycling/` both emit the same 3 links).
- `<html lang="ml">` confirmed on `/ml/` pages.
- Zero dangling internal links across the full 27-page site (cross-checked every `href` in built HTML against actual dist output).

## Remaining blockers (unchanged from Phase 1)

- **GSC export still pending** — the manual-review queue (D1 `/e-waste-recycling/`, D2–D5 pairs, ernakulam/kalamassery pairs) remains fully unbuilt in V2, exactly as instructed.
- **Real certificate numbers still pending** — trust pages ship with placeholder "documentation available on request" language; the validation script now actively guards against this regressing.
- **`blogs.ewastekochi.com` still 404** — `/blog/` redirect stays blocked.
- **Malayalam content needs native-speaker QA** — flagged above; functionally correct (valid HTML, correct hreflang, correct schema) but linguistic quality has not been verified by a native speaker.

## Not done in this phase (explicitly out of scope)

- No blog template, no additional location pages beyond Kakkanad, no additional service pages beyond the Phase 1 set — those are Phase 1 continuation work, not Phase 1.5.
- No deployment. `vercel.json` redirects still sit undeployed from Phase 1.
