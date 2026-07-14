# Phase 2N — Fresh Staging Crawl After Content Expansion

Date: 2026-07-14
Status: **Pass. Verdict: ready for production cutover**, pending one pre-existing item flagged below for the user's decision (not a blocker introduced by this phase).

## Deployment

- Latest commit: `0156dd1` (feat: add sell old electronics pillar guide) — confirmed as HEAD before deploy, working tree clean.
- Staging project: `ewastekochi-v2-staging` / `prj_FvHPByEMUjCejy5w9kph4neqy9Eq` — confirmed via `.vercel/project.json`, matches expected, fully separate from `ewaste-kochi-main`/`www.ewastekochi.com`.
- Deployment ID: `dpl_Gvxan86q99vT7MqctiGKdSyveP5F`, created 2026-07-15 13:58:50 IST (build machine clock; same wall-clock session as the rest of this phase).
- Stable URL: `https://ewastekochi-v2-staging.vercel.app`
- Hit the same known "fresh deploy lands as unaliased Preview" issue as prior phases (302/SSO-protected on the raw preview URL) — resolved the same way, with `vercel alias set <preview-url> ewastekochi-v2-staging.vercel.app` (staging-only alias repoint, not a production-deploy operation; `vercel --prod` was never run, `www.ewastekochi.com` was never touched).

## Preflight

| Check | Result |
| --- | --- |
| Concurrent-session check | Only this session's own harness process and the Kiro IDE UI helper processes found running — no other editing agent. |
| `git status` | Clean |
| Latest commits | `0156dd1` (sell electronics pillar), `ce580cb` (battery expansion) both confirmed present |
| `.vercel/project.json` | `ewastekochi-v2-staging` / `prj_FvHPByEMUjCejy5w9kph4neqy9Eq` — matches expected |

## Local checks

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (104 files) |
| `npm run build` | 60 pages |
| `npm run validate` | **526/526** passed |
| Orphan check (indexable-only + `--all`) | 0 orphans among 22 indexable articles; 0 live posts stranded outside the graph |
| Duplicate-content gate | PASS — all 23 indexable posts |
| Site-wide broken-link sweep (local `dist/`) | 0 |
| Forbidden-claims sweep (local `dist/`) | 0 matches |
| Schema-type sweep (local `dist/`) | Only expected types present (`Question`/`Answer`/`FAQPage`/`BlogPosting`/`HowTo`/`HowToStep`/`WebPage`/`BreadcrumbList`/`Service`/`Organization`/`Place`/`PostalAddress`/`WebSite`/`LocalBusiness`/`ItemList`/`CollectionPage`) — no `QAPage`, `AggregateRating`, `Review`, fake `GeoCoordinates` |

## Live staging crawl — routes

All 60 URLs from staging's own `content-index.json` fetched directly against `https://ewastekochi-v2-staging.vercel.app`: **60/60 return 200**.

## Infrastructure files

`/robots.txt`, `/sitemap.xml`, all 6 sub-sitemaps, `/ai-sitemap.xml`, `/content-index.json`, `/content-index.xml`, `/llms.txt`, `/og-image.jpg` — **all 200**, correct content types.

Sub-sitemap URL counts: core 7, services 16, locations 4, blog 24, legal 2, ml 7 — **total 60, matches route count exactly**. Every individual URL inside every sub-sitemap independently fetched: **60/60 return 200**.

## Critical pages

`/`, `/ml/`, `/blog/`, `/blog/recycling-basics/`, `/blog/ewaste-pickup-near-me/`, `/blog/battery-recycling-near-me-kochi/`, `/blog/sell-old-electronics-kochi/`, `/recycling/`, `/marketplace/`, `/battery-recycling/`, `/pickup/`, `/services/electronics-recycling-near-me/`, `/sell-electronics/`, `/data-destruction/`, `/itad/`, `/locations/`, `/locations/kakkanad/`, `/locations/kalamassery/`, `/locations/ernakulam-south/` — all confirmed 200 as part of the full 60-route crawl above.

## Blog post crawl

All 8 original Blog V2 posts, all 5 promoted recycling-basics guides, and all 7 original blog posts (`free-e-waste-pickup-kochi`, `sell-old-laptop-kochi`, `what-is-ewaste`, `e-waste-examples`, `e-waste-collection-near-me`, `what-is-epr-in-e-waste`, `e-waste-management-rules-2022`) — all confirmed 200 as part of the full crawl. 24 blog URLs total (22 posts + hub + one extra counted route), matching `llms.txt`'s corrected listing.

## Forbidden routes

| Route | Expected | Actual |
| --- | --- | --- |
| `/blogs/` | Redirect (legacy fold-in rule) | 308 ✓ |
| `/blog.html` | 404 | 404 ✓ |
| `/blog/category/` | 404 | 404 ✓ |
| `/blog/category/disposal/` | 404 | 404 ✓ |

No far-city pages exist. All 550 quarantined posts remain absent from `content-index.json`, `sitemap.xml`, `ai-sitemap.xml` and `llms.txt` — confirmed by the route count matching exactly the 60 indexable routes, with no quarantined slug appearing anywhere in the crawled surface.

## Redirects

`vercel.json`: 303 total rules, 302 testable (1 host-canonicalization wildcard rule, untestable by design against a non-`ewastekochi.com` staging domain — same known exception as every prior phase). All 302 testable rules checked live against staging: **0 chains, 0 bad targets**. Confirmed 0 redirect sources appear in `content-index.json`. Confirmed 0 internal links anywhere in the built site point to a redirect source.

## SEO / schema

- Canonical URLs on staging correctly point to `https://www.ewastekochi.com/...` (production domain), not the staging domain — verified on `/`, `/blog/`, and all 3 new/expanded pillar pages.
- Title and meta description present on every page checked.
- `/blog/` is indexable.
- All 24 blog URLs are `indexable: true` in `routes.ts` and correspond to `status: "published"`, `contentSource: "manual"` entries only — no draft/generated post is indexable.
- `BlogPosting` schema present on all blog posts.
- `FAQPage` schema verified against visible FAQs on `battery-recycling-near-me-kochi` (live staging fetch): 20 schema questions vs. 20 visible `.faq-item` elements — exact match.
- `HowTo` schema verified against visible steps on `battery-recycling-near-me-kochi` (live staging fetch): 8 schema steps vs. 8 visible `<li>` steps, every step name present in the visible content — exact match. (Same pattern already established for `how-to-book-ewaste-pickup-kochi` and `ewaste-pickup-near-me`.)
- No `QAPage` misuse, no invalid `SearchAction`, no `AggregateRating`, no `Review` schema, no fake `GeoCoordinates`, no fake certification/rating/client claims found anywhere in the schema sweep.

## Mobile / accessibility (real headless-Chromium test, Playwright, session-only in scratchpad)

Tested `/`, `/blog/`, `/blog/recycling-basics/`, `/blog/ewaste-pickup-near-me/`, `/blog/battery-recycling-near-me-kochi/`, `/blog/sell-old-electronics-kochi/` at both 1440px and 390px against the live staging URL:

- **0 console errors** on every page, both viewports (12/12 checks clean).
- **0 mobile overflow** on every page (body width matched viewport width exactly on all 6 pages at 390px).
- Mobile hamburger menu: visible at 390px, opens correctly (`aria-expanded` flips to `"true"` on click).
- Skip link: present, and is the first focusable element via Tab from page load.
- Chatbot: launcher visible, panel opens on click, `#ewlf-messages` has `aria-live="polite"`, a `wa.me` WhatsApp link is present in the panel, 0 console errors during the interaction.

## Content safety sweep

Searched all 60 live rendered staging pages for: "best price guaranteed", "instant cash guaranteed", "free pickup across Kerala", "government authorized", "ISO 1400x certified", "CPCB authorized", "KSPCB authorized", "Kerala's most trusted", "#1", "4.9", "919999999999" (placeholder number). **0 matches across all 60 pages.**

## Known-risk check: `/recycling/` ISO wording

Confirmed present and **unchanged** since it was flagged in Phase 2P: `/recycling/`'s "Compliance" section still reads "Our recycling processes follow ISO 14001:2015-aligned environmental management practices, and we operate under Pollution Control Board authorization... Detailed certification documents are available on request." This phase did not verify, soften, expand, or remove it — it remains exactly as documented in `PROJECT_TRACKER.md`'s Known Risks section, awaiting the user's decision (verify / soften / remove) before production cutover. `/certifications/`'s matching, separately pre-existing wording (flagged since Phase 2N originally) is likewise unchanged.

## Production readiness verdict

**Ready for production cutover**, with the ISO wording item as the one open, pre-existing, non-blocking decision point — everything else in this crawl (routes, sitemaps, redirects, schema, mobile/accessibility, chatbot, content safety) came back clean with zero findings.

## Blockers

None found in this crawl. The ISO wording item is a decision point, not a technical blocker — the page functions correctly either way.

## Next recommended phase

**Phase 2L — Production Cutover Execution.**
