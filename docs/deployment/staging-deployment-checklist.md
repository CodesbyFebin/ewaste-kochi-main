# Staging Deployment Checklist

Status: **executed twice** — Phase 2H (initial deploy) and Phase 2K (fresh redeploy after the chatbot and hero rebuild, plus the git baseline). Kept as a checklist for the next redeploy, whenever that happens.

## Pre-deploy state (confirmed as of Phase 2K)

- 43 pages, `npm run build` and `npm run validate` both green (**469/469 checks**, up from 464 — includes the Phase 2I-A chatbot's 5 safety checks).
- `vercel.json` has **297 redirect rules** (13 pre-existing + 284 legacy-matrix redirects added in Phase 2G), all target-verified, no chains.
- The site now includes the **Phase 2I-A lead-funnel chatbot** (mounted globally via `Layout.astro`, no backend, no LLM calls) and the **Phase 2J-flagged, Phase-2I-rebuilt homepage hero** (`.hero-features`, inline SVG icons, no raster images, no fabricated claims).
- No environment variables are used anywhere in the codebase (confirmed by grep for `import.meta.env` / `process.env` — this is a fully static site with no external API calls or secrets). **Nothing needs to be configured in Vercel's environment variables panel for this to work.**
- **Git baseline exists as of Phase 2K**: commit `0841992ecd21faeac1976dace853f604aa0d9333`, tag `v2-pre-production-baseline`. See `docs/deployment/rollback-safety-plan.md`.

## 1. Environment variables

**None required.** If a future phase adds anything that needs a secret (an analytics key, a form-submission endpoint, etc.), add it here before deploying — as of Phase 2F, there is nothing to configure.

## 2. Vercel project settings

- [ ] Framework preset: Astro (should auto-detect from `astro.config.mjs`).
- [ ] Build command: `astro build` (default, matches `package.json`).
- [ ] Output directory: `dist` (Astro default).
- [ ] Node version: match whatever was used locally for this build (check `node --version` in the dev environment before deploying, pin it in Vercel if it matters).
- [ ] **Do not** point this staging deployment at the production domain (`www.ewastekochi.com`) — use a Vercel preview URL or a separate staging subdomain until the site is verified.
- [ ] Confirm the `vercel.json` redirects file is picked up (Vercel reads it automatically from the project root — no separate configuration needed).

## 3. Domain / canonical expectations

- [ ] `SITE_URL` in `src/data/site.ts` is hardcoded to `https://www.ewastekochi.com` — every canonical, OG tag, and schema `@id` on every page assumes this exact host. **If staging runs on a different domain (a Vercel preview URL, a staging subdomain), every canonical tag will point to the production domain, not the staging URL.** This is intentional for canonical tags (you don't want search engines indexing a staging URL as canonical) but means:
  - Don't expect canonical self-referencing to "work" correctly on a staging URL in the sense of pointing to itself — it will correctly point to the eventual production URL instead.
  - This makes the staging environment safe to crawl-test without leaking staging URLs into search results, but also means a naive "does the canonical match this page's own URL" check will look wrong on staging — that's expected, not a bug.
- [ ] The host-canonicalization redirect rule (`/:path*` with a `host` match on `ewastekochi.com`) is specific to the production domain and won't fire on a staging URL — that's fine, it's not needed there.

## 4. Redirect rules to verify after deploy

Test all **297 rules** in `vercel.json` against the actual deployed staging URL — the original 13 individually (below), plus the 284 legacy-matrix redirects added in Phase 2G via a scripted check (see `reports/phase-2g-legacy-matrix-redirect-report.md` for the full source list) with manual spot-checks across each source group.

Original 13:
- [ ] `http://ewastekochi.com/*` and `https://ewastekochi.com/*` → `https://www.ewastekochi.com/*` (only testable once deployed to the real production domain, not staging)
- [ ] `/services/battery-recycling-kochi` → `/battery-recycling/`
- [ ] `/services/data-destruction-kochi` → `/data-destruction/`
- [ ] `/services/itad-kochi` → `/itad/`
- [ ] `/locations/v2/kakkanad` → `/locations/kakkanad/`
- [ ] `/e-waste-recycling` → `/recycling/`
- [ ] `/services/e-waste-recycling-kochi` → `/recycling/`
- [ ] `/data-destruction-services-kochi` → `/data-destruction/`
- [ ] `/scrap-price` → `/e-waste-scrap-prices-kochi/`
- [ ] `/free-e-waste-pickup-kochi` → `/blog/free-e-waste-pickup-kochi/`
- [ ] `/blog/sell-old-laptop-kochi-best-price` → `/blog/sell-old-laptop-kochi/`
- [ ] `/locations/ernakulam` → `/locations/ernakulam-south/`
- [ ] `/locations/kalamassery-hitech-park` → `/locations/kalamassery/`

Plus 284 legacy-matrix redirects (Phase 2G): `/locations/{city}/{service}/` patterns → 16 hub pages (`/recycling/`, `/battery-recycling/`, `/pickup/`, `/itad/`, `/data-destruction/`, `/hard-drive-shredding/`, `/services/hard-drive-degaussing-kochi/`, `/server-recycling-kochi/`, `/services/it-asset-inventory-audit/`, `/services/electronics-recycling-near-me/`, `/tv-recycling-kochi/`, `/data-destruction-certificate-sample/`, `/sell-electronics/`, `/locations/kakkanad/`, `/locations/kalamassery/`, `/locations/ernakulam-south/`).

For each: confirm a single 301/308 hop (not a chain), and confirm the destination returns 200.

## 5. Sitemap URLs to test after deploy

- [ ] `/sitemap.xml` loads and is a valid `<sitemapindex>`.
- [ ] All 6 sub-sitemaps load: `/sitemaps/core.xml`, `/sitemaps/services.xml`, `/sitemaps/locations.xml`, `/sitemaps/legal.xml`, `/sitemaps/ml.xml`, `/sitemaps/blog.xml`.
- [ ] Spot-check 5-10 URLs from the sitemap directly to confirm they return 200 and are self-canonical.
- [ ] `/robots.txt` loads and references the correct sitemap URLs.
- [ ] `/llms.txt`, `/content-index.json`, `/content-index.xml`, `/ai-sitemap.xml` all load.

## 6. Search Console resubmission steps (production only — not staging)

This section applies only once this codebase actually replaces the live production site, not for a staging preview:

- [ ] Do not submit a staging URL to Search Console.
- [ ] Before going live on production, verify domain ownership is already established in Search Console for `www.ewastekochi.com` (it already receives real traffic per the GSC exports processed in earlier phases, so this should already exist).
- [ ] After the real production cutover, submit the new `sitemap.xml` (the sitemap index) via Search Console's Sitemaps report.
- [ ] Use the URL Inspection tool to spot-check a handful of pages post-cutover, especially the 7 pages involved in the GSC-decided redirects (Findings D1–D5, ernakulam, kalamassery) to confirm Google picks up the new canonical/redirect relationship rather than continuing to show the old URL.
- [ ] Monitor the Coverage report for a spike in "Page with redirect" (expected, from the 13 new redirects) and watch for any unexpected new 404s or "Excluded" categories in the weeks after cutover.

## 7. Rollback plan

See `docs/deployment/rollback-safety-plan.md` for the full plan (git baseline commit/tag, deployment targets, domain-level and code-level rollback strategy). Summary:

- [ ] Confirm with the user, before cutover, whether the current live site's deployment (wherever it's hosted now) can be quickly restored if something goes wrong — this repository has no visibility into how the current live site is actually deployed (it was audited via crawling only, per `reports/v2-initial-repo-audit.md`), so the rollback mechanism has to come from wherever that deployment actually lives.
- [ ] Keep the old site's DNS/hosting configuration untouched until the new deployment is verified stable — don't decommission the old deployment path as part of the same change that goes live.
- [ ] Because `vercel.json` redirects are permanent (301/308), a rollback that un-does the redirect layer specifically (not the whole site) means reverting just that file to a prior git commit — this is now possible for the first time as of the Phase 2K git baseline (`v2-pre-production-baseline`).

## 8. Post-deploy crawl checklist

See `docs/deployment/post-deploy-crawl-checklist.md` for the detailed step-by-step crawl verification to run immediately after any deploy (staging or production).
