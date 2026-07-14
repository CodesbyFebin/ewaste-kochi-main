# Blog Pillar V2 — E-Waste Pickup Near Me

Date: 2026-07-14
Status: **Complete. Not deployed.**

## New page

- URL: `/blog/ewaste-pickup-near-me/`
- File: `src/pages/blog/ewaste-pickup-near-me/index.astro`
- Word count: **2,851** (target 2,800–3,500)
- FAQ count: **20**, all original answers — none templated, none reused verbatim from the cluster's existing FAQ set or from `how-to-book-ewaste-pickup-kochi` / `e-waste-collection-near-me` / `free-e-waste-pickup-kochi`
- Cluster: `e-waste-pickup-near-me` ("E-Waste Pickup Near Me") — now 4 `existingPosts` (was 3), plus its own 28-topic `plannedPosts` roadmap unchanged

## Cannibalization check

Before writing, checked the cluster's 3 existing posts to confirm this page adds a genuinely distinct angle rather than competing with them:

| Post | Angle |
| --- | --- |
| `e-waste-collection-near-me` | How to vet/choose a *safe recycler* — trust and verification |
| `how-to-book-ewaste-pickup-kochi` | The *booking process* in step-by-step detail |
| `free-e-waste-pickup-kochi` | Areas, items, what to prepare |
| **`ewaste-pickup-near-me` (new)** | The pillar — item categories, feasibility factors, home vs. business, area coverage, scenarios, pickup vs. drop-off |

Directly cross-checked the new page's prose against these three, `recycling-basics`, and `/recycling/`: **0 exact-duplicate paragraphs**, 2 near-duplicate pairs (Jaccard > 0.45) — both are the shared final-CTA boilerplate line already used site-wide, not copied content.

## Internal links

**Related Reading (6):** `/blog/recycling-basics/`, `/blog/how-to-book-ewaste-pickup-kochi/`, `/blog/e-waste-collection-near-me/`, `/blog/where-to-recycle-old-electronics-kochi/`, `/blog/how-ewaste-recycling-works/`, `/blog/how-to-prepare-electronics-for-recycling/` — all live, indexable posts only (the last two were promoted in Phase 2P; confirmed routed before linking).

**Related services (12):** `/pickup/`, `/services/electronics-recycling-near-me/`, `/recycling/`, `/battery-recycling/`, `/sell-electronics/`, `/marketplace/`, `/data-destruction/`, `/itad/`, `/locations/`, `/locations/kakkanad/`, `/locations/kalamassery/`, `/locations/ernakulam-south/`.

Zero links to quarantined/draft/generated posts — verified both by manual review and by the orphan checker's `--all` diagnostic mode (which would flag any live page referencing a non-indexable one).

## Schema

`BlogPosting`, `HowTo` (8 visible steps, `HowToStep` array generated from the same `howToSteps` data that renders the visible ordered list — schema and visible content match exactly, same pattern as the existing `how-to-book-ewaste-pickup-kochi` post), `WebPage`, plus auto-generated `BreadcrumbList` (`Breadcrumbs.astro`) and `FAQPage` (`Faq.astro`). No `QAPage`, `AggregateRating`, `Review`, `GeoCoordinates`, or fake `LocalBusiness` claims.

## Forbidden-claims sweep

Checked against every explicitly banned phrase: free pickup across Kerala, guaranteed same-day pickup, best price guaranteed, instant cash, ISO/CPCB/KSPCB/government authorization, reviews/ratings/testimonials/named clients, ad banners. **Clean.** The two "same-day" matches found by the sweep are the correct hedged usage ("isn't guaranteed," "never guaranteed") — the opposite of a forbidden claim.

## Route / discovery-surface counts

| Metric | Before | After |
| --- | --- | --- |
| Total routes | 58 | **59** |
| Sitemap blog URLs | 22 | **23** |
| `content-index.json` total / blog | 58 / 22 | **59 / 23** |
| `llms.txt` blog URLs | (stale — missing 6 from Phase 2P) | **23**, corrected |

`llms.txt` had a pre-existing gap discovered during this phase: `/blog/recycling-basics/` and the 5 posts promoted in Phase 2P were described in the file's prose but never added to its actual URL list. Fixed alongside adding this page, since leaving it stale would have meant undercounting again.

## Validation results

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (103 files) |
| `npm run build` | 59 pages |
| `npm run validate` | **523/523** passed, 0 failures |
| Orphan check (indexable-only) | 0 orphans among 21 indexable articles |
| Orphan check (`--all` diagnostic) | 550 quarantined posts correctly outside the graph; 0 live posts stranded |
| Duplicate-content gate | PASS — all 22 indexable posts, new page 9/9 (100%) unique paragraphs |
| Site-wide broken-link sweep | 0 |
| Forbidden-claims sweep | Clean |
| Schema sweep | `HowTo` steps match visible steps exactly; no disallowed schema types present |

## Production recommendation

Not deployed, not submitted to GSC, per instruction. Structurally and content-wise this page is ready to ship whenever a deploy is next in scope — it was built and reviewed to the same bar as the Phase 2P pillar work, not mass-generated.
