# Protected Pages: Upgrade to 10/10

Date: 2026-07-15
Status: **Complete. Not deployed.**

## Starting finding: 4 of the 12 pages didn't exist

Before touching anything, cross-checked all 12 named URLs against V2's `routes.ts` and filesystem. **4 were missing entirely**: `/locations/edappally/`, `/locations/infopark-kochi/`, `/locations/kadavanthra/`, `/locations/aluva/`. V2 only had 3 location pages (Kakkanad, Kalamassery, Ernakulam South). Deploying as-is would have taken these 4 from 200 (old site) straight to 404 — the exact regression the "protect at all cost" instruction exists to prevent. All 4 are genuine Kochi-metro areas already named in safe-wording copy across dozens of existing pages (Aluva especially), not the far-city pages this project has correctly refused elsewhere — building them properly was in scope, not scope creep.

## Second finding: the earlier compliance-claim sweep was incomplete

Reading the first existing location page (`kakkanad`) as a template surfaced an unfixed "Compliance" section still carrying the exact unverified ISO/Pollution Control Board claim from before — meaning the prior claim-safety patch had missed pages. A full re-sweep found **7 more instances** across pages never checked in that pass, including two of the explicitly-protected pages:

| File | Where |
| --- | --- |
| `locations/kakkanad/index.astro` | "Compliance" section |
| `locations/kalamassery/index.astro` | "Compliance" section |
| `ml/battery-recycling/index.astro` | "അനുസരണം (Compliance)" section (Malayalam) |
| `battery-recycling/index.astro` **(protected page)** | Both a FAQ answer *and* a separate "Compliance" section — two independent occurrences |
| `data-destruction/index.astro` **(protected page)** | "Compliance" section |
| `itad/index.astro` | "Compliance" section |
| `blog/how-responsible-ewaste-collection-works/index.astro` | Borderline/ambiguous general-definition wording — softened for consistency rather than left as a judgment call |

All fixed with the same established safe wording. Two more genuinely safe educational-context occurrences (`e-waste-management-rules-2022`, `what-is-epr-in-e-waste`, `e-waste-collection-near-me`) were reviewed and correctly left alone — they describe general regulatory concepts or point to CPCB's real resources, not claims about Ewaste Kochi.

## Third finding: a live "instant payment" claim on 3 pages

A broader sweep for other forbidden-claim patterns (not just ISO/PCB) turned up **"Instant payment"** — the exact phrase flagged as a red flag on the *old* production site's homepage title — live on three V2 pages: `computer-scrap-buyers-kochi` (a protected page), `marketplace`, and `sell-electronics`. All three promised guaranteed instant payment in a numbered process list. Replaced with the same hedged pattern already used correctly elsewhere on the site ("Payment arranged once you accept — ask about the specific arrangement when you book"). `marketplace`'s title also had a superlative "Best Quote" claim, softened to "Condition-Based Quote" to match the site's established, already-used phrasing.

## Fourth finding: `/locations/` overclaimed far-city coverage

The locations hub's lede, meta description, and one FAQ answer stated as flat fact that the business has "wider coverage across Kerala including Kottayam, Thrissur, Kozhikode, and Thiruvananthapuram" — directly contradicting the hedged "Kochi-metro + contact us for other districts" wording used consistently everywhere else on the site. Softened to match. The far-city names were also removed from the "Also serving" area-chip list (13 genuinely Ernakulam-district/Kochi-metro areas remain).

## New pages built

4 location pages, matching the existing Kakkanad/Kalamassery template and quality bar, each with genuinely distinct content (not template-swapped):

| Page | Angle | Word count | FAQs |
| --- | --- | --- | --- |
| `/locations/edappally/` | Mall district + NH66 junction, apartment + retail pickup | 439 | 4 |
| `/locations/infopark-kochi/` | IT-office/business-specific — deliberately differentiated from Kakkanad's general framing (bulk pickup, asset lists, ITAD tie-in) | 547 | 4 |
| `/locations/kadavanthra/` | Central, metro-adjacent, government/office mix | 413 | 4 |
| `/locations/aluva/` | Metro terminus + airport corridor, explicitly reassures it's core coverage, not an outlying add-on | 445 | 4 |

Cross-checked all 7 location pages (3 existing + 4 new) against each other directly: **0 exact-duplicate paragraphs.**

Wired into `routes.ts` (+4 routes), `/locations/index.astro` (moved from the plain-text "also serving" list into the dedicated-page grid, now 7 cards), `llms.txt`, and the sitewide footer's "Top Locations" column (previously only listed 3 of what are now 7 real pages).

## Existing pages upgraded

6 protected service pages expanded with genuine new sections (not padding) and larger FAQ sets, roughly doubling word count and FAQ count on each:

| Page | Before | After |
| --- | --- | --- |
| `/battery-recycling/` | 542 words, 6 FAQs | 1,009 words, 12 FAQs |
| `/data-destruction/` | 526 words, 6 FAQs | 926 words, 12 FAQs |
| `/services/electronics-recycling-near-me/` | 365 words, 4 FAQs | 718 words, 8 FAQs |
| `/tv-recycling-kochi/` | 377 words, 5 FAQs | 694 words, 10 FAQs |
| `/computer-scrap-buyers-kochi/` | 395 words, 5 FAQs | 730 words, 10 FAQs |
| `/marketplace/` | 481 words, 5 FAQs | 775 words, 9 FAQs |

New sections added were deliberately differentiated from existing deep-dive blog content rather than duplicating it — e.g. `/battery-recycling/` cross-links to `/blog/battery-recycling-near-me-kochi/` for exhaustive safety detail instead of re-explaining it. `/recycling/` (already expanded to 3,030 words / 20 FAQs in an earlier phase) and the homepage (already 2,273 words / 16 FAQs) needed no further expansion — both already clear the bar and were re-verified clean of any compliance-claim issues.

## Validation

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (108 files) |
| `npm run build` | 64 pages (60 → 64, +4) |
| `npm run validate` | **538/538** passed (526 → 538) |
| Orphan check (indexable-only + `--all`) | 0 orphans among 22 indexable articles; 0 live posts stranded |
| Duplicate-content gate | PASS — all 23 indexable posts |
| Cross-check: 7 location pages against each other | 0 exact-duplicate paragraphs |
| Site-wide broken-link sweep | 0 |
| Comprehensive forbidden-claims sweep (ISO/CPCB/KSPCB/PCB, instant cash/payment, best-price-guaranteed, superlatives) | 0 unsafe matches remaining across all of `src/pages/` |
| All 12 protected pages present in build output | Confirmed individually |

## Production recommendation

Not deployed. This work sits on top of the still-unresolved `vercel.json` output-directory fix from the interrupted Phase 2L attempt — that fix is written but uncommitted. Recommend: commit this work, then proceed with the staging sanity-check → careful production retry sequence already agreed, now with a materially stronger public surface than what was attempted before (4 fewer would-be regressions, 9 total pages with the ISO/PCB liability actually gone instead of 5, 3 more "instant payment" claims removed, and 6 protected pages meaningfully deeper).
