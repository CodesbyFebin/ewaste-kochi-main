# Blog Pillar V3 — Battery Recycling Near Me

Date: 2026-07-14
Status: **Complete. Not deployed.**

## Approach changed from the original spec — flagged before writing anything

The spec asked for a new page at `/blog/battery-recycling-near-me/`. Before building it, checked the target cluster and found `/blog/battery-recycling-near-me-kochi/` **already exists** as one of the 16 originally reviewed posts — and its title, H1 pattern, battery-type breakdown (UPS/inverter/laptop/lithium/mobile), swollen/leaking/damaged safety content, area coverage, and FAQ set already covered nearly the entire scope the new spec asked for. Building a second page at a near-identical URL for the same primary keyword would have been the exact keyword-cannibalization pattern this project has rejected repeatedly (documented in `PROJECT_TRACKER.md` as Findings D1–D5, the `RESOLVED_LOSER_PATHS` guard in `validate-seo-v2.ts`).

Flagged this via `AskUserQuestion` rather than guessing. **User's decision: expand the existing post in place to pillar depth instead of creating a new URL.** No new route, no cannibalization risk, same effect as the requested pillar.

## Page

- URL: `/blog/battery-recycling-near-me-kochi/` (unchanged — existing URL, expanded in place)
- File: `src/pages/blog/battery-recycling-near-me-kochi/index.astro`
- Word count: **1,262 → 2,827 words** (target 2,800–3,500)
- FAQ count: **7 → 20**, all original answers, none reused verbatim from other pages
- Cluster: `battery-recycling` — `existingPosts` entry unchanged (same href, title, excerpt already accurate)

## What was added, on top of the existing content (kept as-is)

Kept: intro, quick-answer, key takeaways, "why batteries need separate handling," the original battery-type table, safe-storage steps, swollen-battery guidance, post-collection handling, the "informal scrap dealer" comparison.

Added: a proper Quick Facts box (matching the pattern used on other pillars), 8 dedicated battery-type category cards (including e-bike/scooter batteries with an explicit case-by-case caveat, not a blanket promise), a structured safety-warning section using the spec's exact safe wording ("Do not open, puncture, crush or heat batteries..."), an 8-step visible `HowTo` pickup process (schema-matched, same pattern as `how-to-book-ewaste-pickup-kochi`), a battery feasibility table (type/condition → what to send → why it matters), dedicated Home and Business/Office sections (the business section — UPS rooms, server-room batteries, ITAD link — didn't exist before), an areas-by-Kochi-metro section, a "what to send on WhatsApp" checklist, an expanded "what not to do" list (throw in waste / burn / puncture / crush / break open / mix damaged with scrap / store near heat / hide inside mixed bags), and a battery-resale-value section with explicit "not guaranteed before inspection" wording.

## Cross-duplication check

Directly compared the expanded post against `/blog/ewaste-pickup-near-me/` (which also briefly touches batteries) and the other 20 indexable posts via the duplicate-content gate: **9/9 body paragraphs unique (100%)**, 0 FAQ answers reused elsewhere.

## Internal links

**Related Reading (7):** `/blog/recycling-basics/`, `/blog/where-to-recycle-old-electronics-kochi/`, `/blog/how-to-book-ewaste-pickup-kochi/`, `/blog/ewaste-pickup-near-me/`, `/blog/how-to-prepare-electronics-for-recycling/`, `/blog/how-ewaste-recycling-works/`, `/blog/why-electronics-should-not-go-in-household-waste/` — all live, indexable.

**Related services (11):** `/battery-recycling/`, `/pickup/`, `/recycling/`, `/services/electronics-recycling-near-me/`, `/sell-electronics/`, `/e-waste-scrap-prices-kochi/`, `/data-destruction/`, `/locations/`, `/locations/kakkanad/`, `/locations/kalamassery/`, `/locations/ernakulam-south/`.

## Schema

`BlogPosting`, `HowTo` (8 steps, matching visible content), `WebPage`, auto `BreadcrumbList`, auto `FAQPage`. No `QAPage`, `AggregateRating`, `Review`, or fake `GeoCoordinates`.

## Route / discovery-surface counts

No change — same URL, same route entry. Route count stays **59**, sitemap/content-index blog counts stay **23**. `llms.txt` already listed this URL; no edit needed there.

## Validation results

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (103 files) |
| `npm run build` | 59 pages |
| `npm run validate` | **523/523** passed |
| Orphan check (indexable-only + `--all`) | 0 orphans among 21 indexable articles; 0 live posts stranded |
| Duplicate-content gate | PASS — all 22 indexable posts, this page 9/9 (100%) unique |
| Site-wide broken-link sweep | 0 |
| Forbidden-claims sweep | Clean (one grep false-positive on "sepa**rating**," verified with word-boundary regex) |
| Schema sweep | `HowTo` steps match visible steps; no disallowed schema types |

## Production recommendation

Not deployed, not submitted to GSC. Ready to ship whenever a deploy is next in scope — this closes the "battery recycling near me" pillar gap without creating a competing URL.
