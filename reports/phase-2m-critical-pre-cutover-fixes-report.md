# Phase 2M — Critical Pre-Cutover Fixes

Date: 2026-07-08
Status: **Complete.** Build clean, validation clean, no production deploy.

## Why this phase

A full codebase audit of EwasteKochi V2 flagged 9 issues to fix before production
cutover: no mobile navigation, an invalid `SearchAction` schema, a missing `/blog/`
index despite 7 live posts, no skip-navigation link, a stale `llms.txt`, no OG image,
no `aria-live` on the chatbot, footer/nav accessibility gaps, and unimplemented
GSC-verified legacy redirects.

## Important note: this ran concurrently with another session on the same repo

While this phase was in progress, a concurrent process (same git author,
`CodesbyFebin`) was independently working the same task list under the name
"Phase Blog Hub V1" in the same working directory. It committed first, as
`1305745`, before this session reached its own commit step — and because we were
editing the same files, that commit swept up this session's in-progress edits to
`Header.astro`, `Footer.astro`, `Layout.astro`, `SeoHead.astro`, and
`leadFunnelChatbot.ts` along with its own. Comparing this session's working tree to
that commit afterward (`git diff HEAD`) came back empty for every file both sessions
touched — confirming no work was lost or silently reverted either direction.

**Verified before assuming duplicate effort was needed** (2 of the audit's 9 items
were already fixed as side effects of earlier phases, independent of either session
this round):
- `SearchAction` schema doesn't exist anywhere in `src/` — already removed as a side
  effect of the Phase 2L homepage rewrite.
- `llms.txt` was already fully updated (by the concurrent session, landed before this
  one started writing).

**What this session verified, fixed, or added that is distinct from commit `1305745`:**

1. **Found and fixed a real bug** in the `/blog/index.astro` the concurrent session
   built: it manually included a `FAQPage` JSON-LD block in its `jsonLd` array *and*
   rendered `<Faq items={hubFaqs} .../>`, which auto-generates its own `FAQPage`
   block — two duplicate `FAQPage` schema blocks on one page. Removed the manual one
   (confirmed via `git show HEAD` that the fix is the version that landed). Also
   removed an unused `BUSINESS` import `astro check` flagged.
2. **The OG image file itself was never actually committed.** `SeoHead.astro` in
   `1305745` correctly emits `<meta property="og:image" content=".../og-image.jpg">`,
   but no `public/og-image.jpg` exists anywhere in that commit or git history — the
   meta tag pointed at a 404. This session generated a real branded 1200×630 image
   (dark-green gradient matching the site's actual palette, "E-Waste Recycling &
   Pickup in Kochi" + brand mark) via headless Chromium screenshotting a small local
   HTML file — no stock photo, no new dependency — and this commit is what actually
   adds `public/og-image.jpg` (56KB) to the repository.
3. **Re-verified the "11 approved redirects" claim against its own source report**
   rather than trusting the count, and this reasoning doesn't appear in the
   concurrent session's report. Re-reading `reports/legacy-url-priority-list.md`'s
   19-row table: only **4** of the 11 non-far-city rows the report's summary called
   "safe" actually have a real, pre-vetted destination (the
   `corporate-ewaste-kochi`/`printer-recycling-kochi` medium-confidence cluster rows
   → `/itad/` or `/recycling/`). The other 7 are `manual-review` `/blogs/...` article
   URLs whose target column is explicitly `"—"` ("no existing owner") — inventing a
   destination for those would repeat the lossy city/topic-swap redirect pattern this
   project has rejected three times already. The 6 redirects that landed in
   `1305745` match exactly what this analysis supports: the 4 vetted ones, plus 2
   blog-root fold-ins (`/blogs/` and `/blogs/disposal/` → the new `/blog/`, a clean
   match now that the hub is real) — not the 11 originally claimed. The remaining 5
   stay in `manual-review` exactly where they already were, deliberately not
   redirected.

## Validation (current repo state, after adding the OG image)

| Check | Result |
| --- | --- |
| `npm run check` (astro check) | 0 errors, 0 warnings, 0 hints |
| `npm run validate` (build + `scripts/validate-seo-v2.ts`) | 44 routes, **478/478 checks passed**, 0 failures |
| `/blogs/`, `/blog/{cluster-slug}/`, planned-post links anywhere in `src/` | 0 matches |
| Redirect source URLs referenced internally | 0 matches |
| `/blog/` schema | 5 blocks: CollectionPage, ItemList, WebPage, BreadcrumbList, FAQPage — exactly one FAQPage |
| `og:image`/`twitter:image` | Now resolve to a real 200 file (previously 404) |
| `astro preview` + curl | `/`, `/blog/`, `/blog/what-is-ewaste/`, `/og-image.jpg` all 200 |
| Live Chromium (Playwright, headless Chrome for Testing) — mobile hamburger | Opens (8 links visible, `aria-expanded="true"`), closes on link click and navigates correctly, 0 console errors |
| Live Chromium — skip link | Tab-focuses first, becomes visible at `y: 0` once its CSS transition settles, screenshot confirms visible amber focus ring |
| Live Chromium — `/blog/` full page | Renders correctly: hero, intent cards, 7 featured guides, 15-cluster roadmap grid, 10-question FAQ, final CTA, footer with all 3 location links |

## Not done in this phase

- Not deployed to staging or production.
- The 5 deferred `manual-review` legacy URLs (city/article-specific `/blogs/...`
  paths with no real content match) remain unredirected, as documented above.
- No new blog articles written — `plannedPosts` stay data-only per the brief.
