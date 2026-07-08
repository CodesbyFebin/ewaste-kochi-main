# Phase 2N — Fresh Staging Redeploy + Full Post-Content Crawl

Date: 2026-07-08
Status: **Pass. Verdict: ready for production cutover**, pending one pre-existing item flagged below for your decision (not a blocker introduced by this phase).

## Preflight

| Check | Result |
| --- | --- |
| Concurrent-session check | No evidence of active writes — only an IDE language-server helper process (Kiro's Astro extension) found running, not an editing agent. No unexpected file changes. |
| `git status` | Clean |
| Latest commit | `6dd96f5` — matches expected |
| Excluded artifacts still untracked | `SWARM/`, `ewastekochi-v3-chatbot.zip`, `ewastekochi-amp.html`, `.kilocode/`, `dist/`, `node_modules/`, `.vercel/` — all confirmed untracked and covered by `.gitignore`. No `.env` file present. |

## Local build/validate

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints |
| `npm run build` | 53 pages built |
| `npm run validate` | **505/505 checks passed**, 0 failures |
| Sitemap URL count (sum of 6 sub-sitemaps) | 53 |
| `content-index.json` page count | 53 |

## Staging deployment

Deployed to the isolated `ewastekochi-v2-staging` project (confirmed via `.vercel/project.json` and `vercel projects ls` as fully separate from `ewaste-kochi-main`, which owns the real `www.ewastekochi.com`). Hit the same known issue documented in Phase 2H/2K: a fresh `vercel deploy` lands as an unaliased "Preview" deployment (auto-SSO-protected, not publicly crawlable — confirmed via a 302 on the deployment-specific URL). Fixed with `vercel alias set <new-deployment> ewastekochi-v2-staging.vercel.app`, the same narrow, staging-only command used previously — it only repoints the staging project's own alias, not a production-deploy operation. Confirmed the stable URL now serves the current build (title tag matches latest commit).

**Not deployed to production. DNS untouched. `ewaste-kochi-main` untouched.**

One process note: the first attempt at `vercel deploy --yes` was blocked by the harness's own auto-mode safety classifier as an unverified potential production deploy. Rather than work around it, I stopped and reported it to you; you confirmed and I proceeded with the same command, which then succeeded normally.

## Full live crawl — routes

All 53 URLs from `content-index.json` fetched directly against `https://ewastekochi-v2-staging.vercel.app`: **53/53 return 200**, including every route named in the brief (`/`, `/ml/`, `/blog/`, `/blog/recycling-basics/`, all 8 Blog V2 posts, all 7 original blog posts, all service/location pages).

## Infrastructure files

`/robots.txt`, `/sitemap.xml`, all 6 sub-sitemaps, `/ai-sitemap.xml`, `/content-index.json`, `/content-index.xml`, `/llms.txt`, `/og-image.jpg` — **all 200**.

## Forbidden routes / redirects

- `/blog.html` → 404 (never existed, correct)
- `/blog/category/` → 404 (never existed, correct)
- `/blogs/` and `/blogs/disposal/` → 308 to `/blog/` (this is a redirect *rule*, working as designed — not a forbidden live page)
- **All 303 `vercel.json` redirect rules tested**: 302 testable rules (path-based) resolve to a 200 final destination with **0 chains** (max 1 hop each). The 1 untested rule is the known host-canonicalization wildcard (`source: "/:path*"`, fires only on the real `ewastekochi.com` host header) — confirmed in source, cannot fire on a `.vercel.app` domain, same documented limitation as Phase 2H.

## SEO / schema

Crawled all 53 live pages directly:

| Check | Result |
| --- | --- |
| Missing `<title>` | 0 |
| Missing meta description | 0 |
| Non-`https://www.ewastekochi.com` canonical | 0 |
| Pages without exactly 1 `<h1>` | 0 |
| Pages with 0 JSON-LD blocks | 0 |
| JSON-LD blocks that fail to parse | 0 |
| `QAPage` misuse | 0 |
| `AggregateRating` | 0 |
| `Review` schema | 0 |
| `GeoCoordinates` | 0 |
| `SearchAction` (any form) | 0 |

## Mobile / accessibility (live Chromium, headless Chrome for Testing)

| Check | Result |
| --- | --- |
| Homepage mobile (390px) horizontal overflow | None |
| `/blog/` mobile overflow | None |
| `/blog/recycling-basics/` mobile overflow | None |
| Mobile hamburger menu | Opens (`aria-expanded="true"`), closes correctly |
| Skip link | Tab-focuses first on a fresh page load, becomes visible at `y: 0` once its CSS transition settles (re-verified in isolation after an initial false-negative caused by testing it right after clicking the hamburger button, which had moved focus elsewhere — test-order artifact, not a site bug) |
| Chatbot | Opens (`aria-expanded="true"`), `#ewlf-messages` has `aria-live="polite"` |
| Console errors across all checks | 0 |

## Content safety sweep (all 53 live pages)

Searched rendered text for: `best price guaranteed`, `instant cash guaranteed`, `free pickup across kerala`, `government authorized`, `iso certified`, `cpcb authorized`, `kspcb authorized`, `kerala's most trusted`, `#1`, `4.9`, `reviews`, `919999999999` (placeholder number).

**2 raw matches, both investigated:**

1. **"reviews" — 2 pages** (`/blog/how-to-book-ewaste-pickup-kochi/`, `/services/it-asset-inventory-audit/`). Checked context on both: "the team **reviews** what you've sent," "internal audits or compliance **reviews**." Generic English usage, not fake testimonials/ratings. **False positive, not a violation.**
2. **"ISO certified" — 1 page** (`/certifications/`): *"Is Ewaste Kochi ISO certified? Our recycling processes are aligned with ISO 14001:2015 environmental management practices. Detailed certificate documentation is available on request."* This is a **real match** on the literal phrase, but it's **pre-existing content that predates this session** — the same carried-forward production claim documented in `src/data/site.ts`'s compliance-claims comment and already logged as a standing item in `PROJECT_TRACKER.md`'s "Known Risks" ("Certification documents not yet provided... ships with placeholder 'documentation available on request' language... until the user supplies them"). Not introduced by any commit this session, not in scope for a crawl-only phase to silently rewrite. **Flagged for your decision, not edited.**

No other forbidden patterns matched anywhere across all 53 pages.

## Verdict

Everything this phase was asked to verify passed. The one open item (`/certifications/`'s ISO wording) is pre-existing and already tracked — worth a decision before or shortly after cutover, but not something this phase changed or blocks on.

**Next recommended phase: Production Cutover Execution** (per your own sequencing).
