# Homepage Evergreen Expansion Report

Date: 2026-07-08
Status: **Complete.** Build clean, validation clean, no production deploy.

## Why this phase

GSC data showed several high-volume, high-intent queries ("where to recycle old
electronics," "where to donate electronics," "where to sell used electronics," "local
recycling centers") ranking with thousands of impressions and **zero clicks** — the
homepage didn't directly answer these queries or carry enough on-page depth to win
featured snippets. This phase expands the homepage into a longer, mobile-first,
evergreen page that targets those queries directly, while staying inside this
project's existing guardrails (no fake reviews/ratings/named clients, no statewide
"free pickup everywhere" claims, no unverified certification numbers, no new pSEO
pages).

This builds **on top of** the uncommitted "Phase 2I" homepage redesign already in the
tree (dark hero, chatbot-wired intent cards, `Faq.astro`-driven FAQPage schema) rather
than replacing it — that work's chatbot hooks, favicon, and focus-visible styles are
bundled into this same commit since the homepage expansion depends on them.

## What changed

`src/pages/index.astro` grew from 3 content sections (~1,500 rendered words including
header/footer chrome) to 14 sections (~2,400 rendered words):

1. Hero — new H1/subhead/CTA copy, softer trust-strip wording (dropped "Certified
   Process — Authorised and compliant workflow" in favor of "Kochi-metro pickup /
   WhatsApp-first / Home & business / Data destruction documentation available" — a
   weaker, more defensible claim).
2. Quick-answer block — direct-answer copy for "Where can I recycle old electronics
   in Kochi?", targeting featured snippets.
3. High-intent service cards — 3 persona cards (existing) + 7-card services grid
   (new), covering all 10 URLs the brief listed.
4. How e-waste pickup works — **replaced** the previous "growth automation pipeline"
   copy block, which was written for an internal/engineering audience (talked about
   CRM routing and WhatsApp Cloud API to the site visitor). Recopied as a
   customer-facing 6-step pickup process using the same ordered-list component.
5. What we collect — 18-item scannable grid.
6. Home / business / data-bearing devices — 3-card section; "institutions" used only
   as an audience descriptor, no named clients.
7. Kochi locations we support — cards link only to the 3 real location pages
   (Kakkanad, Kalamassery, Ernakulam South); Aluva/Edappally/Vyttila/Kadavanthra/
   Infopark mentioned as plain text only, never linked (no pages exist for them).
8. Why responsible recycling matters — evergreen, no unverified statistics.
9. Data destruction & business ITAD — links to all 4 relevant pages.
10. Battery recycling safety.
11. Buy/sell/marketplace — explicitly avoids "best price guaranteed"; uses "price
    estimate after inspection" / "market-linked, condition-based value" instead.
12. Comparison table — 5 rows, wrapped in a horizontally-scrollable container so the
    page body itself never scrolls horizontally on mobile.
13. FAQ — expanded from 6 to 16 questions (still rendered through `Faq.astro`, so
    `FAQPage` JSON-LD stays automatic — no manual duplicate added).
14. Final CTA band.

`src/data/routes.ts` — the `/` entry's `title`/`description` updated to match the new
homepage `<title>`/meta description (previously stale, pre-dating the Phase 2I hero
rewrite), since these fields feed the sitemap/content-index/ai-sitemap generation.

## Deliberate scope decision

The brief's "Homepage section copy you can use" also included a separate prose
services deep-dive (E-Waste Recycling / Book Pickup / Sell Old Electronics / ... as
full paragraphs). That was **not** added — it duplicates the services card grid
(item 3 above) and the individual service pages already cover that depth. Kept one
card grid instead of two to avoid bloat and repetition while still linking every URL
requested.

## Schema

`jsonLd` array: Organization, LocalBusiness, Service, WebSite (all pre-existing) +
new minimal `WebPage` block. `FAQPage` continues to come from `Faq.astro` — confirmed
only one `FAQPage` block renders (6 total JSON-LD blocks, no duplication). No
AggregateRating, Review, or GeoCoordinates added — none exist anywhere in the output
(verified by grep).

## Validation

| Check | Result |
| --- | --- |
| `npm run check` (astro check) | 0 errors, 0 warnings, 0 hints |
| `npm run validate` (build + `scripts/validate-seo-v2.ts`) | **469/469 checks passed**, 0 failures |
| Banned-phrase sweep (`best price guaranteed`, `guaranteed pickup`, `instant cash guaranteed`, `government authorized`, `most trusted`, `free pickup across kerala`) | 0 matches |
| Named-institution sweep (`hospital`, `school`, `college`) | 0 matches |
| H1 count | 1 |
| Internal `href` sweep on built homepage | All 23 unique hrefs resolve to real, built routes; 0 dangling links; 0 links to the unbuilt location pages (Aluva etc.) |
| `astro preview` + curl | `/` → 200, `/pickup/` → 200, `/locations/kakkanad/` → 200, unknown path → 404 |
| Rendered word count (includes shared header/footer/nav chrome) | ~2,400 words |

## Not done in this phase

- Not deployed to staging or production.
- Malayalam homepage (`/ml/`) copy not touched — still the pre-existing shorter
  version; would need separate translation work if this expansion should mirror
  there.
- No new images added (kept CWV risk low — only the existing hero image is used).
