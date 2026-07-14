# Blog Pillar V4 — Sell Old Electronics in Kochi

Date: 2026-07-14
Status: **Complete. Not deployed.**

## Cannibalization check, done before writing anything

Same check as V3, applied to this cluster too: `/blog/how-to-sell-old-electronics-kochi/` already exists and already covers condition-based quotes, value factors, step-by-step selling, data wiping, payment/pickup, resale-vs-recycle, bulk/office selling, and mistakes to avoid — nearly the full scope the spec's new page also asks for. Flagged via the same `AskUserQuestion` as V3. **User's decision here (different from V3): build the new page, but with a deliberately different angle** rather than expanding the existing one.

## Differentiation strategy

The existing post owns the **step-by-step selling process** (how quotes work, wipe data, payment/pickup, when to recycle instead) — this new page does not re-tell that story. Instead it leans into ground the existing post doesn't cover:

- **Item-category breakdown** (home electronics / office electronics / parts & components) — new structure, not present in the existing post.
- **An 11-row value-factors table** (device type, brand/model, working status, physical condition, age, battery condition, accessories, quantity, data-bearing storage, location, market rate) — more granular than the existing post's simple 2-column condition table.
- **A "Sell vs. Reuse vs. Recycle" decision framework** — not in the existing post.
- **7 common-selling-scenario cards** — not in the existing post.
- **Dedicated data-safety and battery/damage-safety sections** — the existing post touches data wiping in one paragraph; this page treats both as their own sections.
- **Business/office section with an explicit ITAD tie-in** — the existing post has one short paragraph on this; expanded here.
- The "How the Quote Process Works" section here is deliberately kept short and explicitly labeled "the short version," pointing to the existing post for the full step-by-step detail rather than re-writing it — the two pages now genuinely complement rather than compete with each other, and cross-link both ways.

Directly verified this held: cross-checked the new page's prose against `how-to-sell-old-electronics-kochi`, `sell-old-laptop-kochi`, and `how-ewaste-scrap-quotes-work-kochi` — **0 exact-duplicate paragraphs**, 1 near-duplicate pair (Jaccard 0.67) which is the shared final-CTA boilerplate line already used site-wide, not copied content.

## Page

- URL: `/blog/sell-old-electronics-kochi/`
- File: `src/pages/blog/sell-old-electronics-kochi/index.astro`
- Word count: **2,853** (target 2,800–3,500)
- FAQ count: **20**, all original
- Cluster: `sell-old-electronics` — now 4 `existingPosts` (was 3)

## Internal links

**Related Reading (7):** `/blog/recycling-basics/`, `/blog/where-to-recycle-old-electronics-kochi/`, `/blog/how-to-sell-old-electronics-kochi/`, `/blog/sell-old-laptop-kochi/`, `/blog/how-ewaste-scrap-quotes-work-kochi/`, `/blog/ewaste-pickup-near-me/`, `/blog/how-to-prepare-electronics-for-recycling/`.

**Related services (13):** `/sell-electronics/`, `/marketplace/`, `/e-waste-scrap-prices-kochi/`, `/computer-scrap-buyers-kochi/`, `/pickup/`, `/recycling/`, `/battery-recycling/`, `/data-destruction/`, `/itad/`, `/locations/`, `/locations/kakkanad/`, `/locations/kalamassery/`, `/locations/ernakulam-south/`.

All target real, existing routes (`/computer-scrap-buyers-kochi/` verified against `routes.ts` before use). Zero links to quarantined/draft posts.

## Schema

`BlogPosting`, `WebPage`, auto `BreadcrumbList`, auto `FAQPage`. **Deliberately no `HowTo` schema** — the visible "quote process" steps on this page are explicitly the abbreviated, secondary version (the full step-by-step process, and its `HowTo`-eligible detail, belongs to `how-to-sell-old-electronics-kochi`); adding a second `HowTo` here for the same underlying process would have been redundant rather than helpful. No `QAPage`, `AggregateRating`, `Review`, or fake `GeoCoordinates`.

## Forbidden-claims sweep

Checked against every explicitly banned phrase, including the two specific to this page's spec (guaranteed buyback, best-price-guaranteed) and the standard set (instant cash, unverified ISO/CPCB/KSPCB, reviews/testimonials, ad banners). **Clean** — no matches.

## Route / discovery-surface counts

| Metric | Before | After |
| --- | --- | --- |
| Total routes | 59 | **60** |
| Sitemap blog URLs | 23 | **24** |
| `content-index.json` total / blog | 59 / 23 | **60 / 24** |
| `llms.txt` blog URLs | 23 | **24**, notes section updated to describe 4 pillar-depth pages |

## Validation results

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (104 files) |
| `npm run build` | 60 pages |
| `npm run validate` | **526/526** passed |
| Orphan check (indexable-only + `--all`) | 0 orphans among 22 indexable articles; 0 live posts stranded |
| Duplicate-content gate | PASS — all 23 indexable posts, new page 10/10 (100%) unique |
| Direct cross-check vs. the 3 closest topical neighbors | 0 exact-duplicate paragraphs |
| Site-wide broken-link sweep | 0 |
| Forbidden-claims sweep | Clean |
| Schema sweep | No disallowed schema types; no redundant `HowTo` |

## Production recommendation

Not deployed, not submitted to GSC. Ready to ship whenever a deploy is next in scope — the two "sell electronics" pages now cover genuinely distinct ground (categories/value/decision framework vs. step-by-step process) rather than competing for the same query.
