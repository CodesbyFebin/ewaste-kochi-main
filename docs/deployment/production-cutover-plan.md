# Production Cutover Plan

Status: **checklist only — not executed.** No production deploy has happened. This is what to do when the user decides to actually cut `www.ewastekochi.com` over to this V2 build. Do not run any step below without explicit direction to actually cut over.

## Preconditions (confirmed as of Phase 2K)

- [x] 43 pages, `npm run build` and `npm run validate` both green (**469/469 checks**).
- [x] `vercel.json` has 297 redirect rules, all target-verified, no chains.
- [x] Git baseline exists: commit `0841992ecd21faeac1976dace853f604aa0d9333`, tag `v2-pre-production-baseline` (see `docs/deployment/rollback-safety-plan.md`).
- [x] Staging (`https://ewastekochi-v2-staging.vercel.app`) reflects the current build, including the Phase 2I-A chatbot and the rebuilt hero — redeployed and re-crawled fresh in Phase 2K (see `reports/phase-2k-git-safety-fresh-staging-report.md`).
- [ ] **Not yet confirmed**: how the current live production site (whatever serves `www.ewastekochi.com` today) is actually hosted, and whether/how it can be quickly restored if something goes wrong. This project has only ever audited that site via crawling (`reports/v2-initial-repo-audit.md`), never via source access — this must be confirmed with the user before cutover, not assumed.
- [ ] Real ISO 14001 / CPCB / KSPCB certificate numbers still pending from the user — trust pages continue to use "documentation available on request" placeholder language until then. Not a blocker for cutover, but worth remembering it's still open.
- [ ] Native-speaker review of the 7 Malayalam pages has not happened. Not a blocker (pages are functionally correct — valid markup, correct hreflang, correct schema), but flagged since Phase 1.5.

## 1. Backup current production

- [ ] Confirm with the user how the current live site is deployed and hosted.
- [ ] Get (or confirm access to) a full backup/export of whatever is currently live, before touching anything.
- [ ] Do not decommission or delete the current production deployment as part of this cutover — keep it fully intact and reachable until V2 is verified stable.

## 2. Confirm Vercel project/domain settings

- [ ] Confirm which Vercel project should own `www.ewastekochi.com` going forward (this V2 build needs its own project — do not simply repoint the existing `ewaste-kochi-main` project without reviewing what else depends on it).
- [ ] Confirm DNS/domain assignment steps with the user before making any change — this is domain-level and affects live traffic immediately.
- [ ] Record the exact pre-cutover DNS/domain configuration (nameservers, A/CNAME records, or which Vercel project currently owns the domain) so a rollback is a fast, mechanical revert.

## 3. Production deploy

- [ ] Deploy the current `master` build to the production-designated Vercel project (not the disposable `ewastekochi-v2-staging` project).
- [ ] Do not assign `www.ewastekochi.com` to it yet — verify the deployment on its own preview/production `.vercel.app` URL first.

## 4. Verification (before assigning the real domain)

Using `docs/deployment/post-deploy-crawl-checklist.md` in full:
- [ ] All 43 pages return 200.
- [ ] All 297 redirects work, 0 chains.
- [ ] robots.txt, sitemaps, content-index, llms.txt, ai-sitemap.xml all load correctly.
- [ ] Canonicals point to `https://www.ewastekochi.com/...` (they will, since `SITE_URL` is hardcoded — confirm this is what's intended once the domain is actually live there).
- [ ] Chatbot present and functional (per the Phase 2I-A / Phase 2K checks).
- [ ] Hero section shows only verified content, no fabricated claims.

## 5. Domain cutover

- [ ] Only after step 4 passes: assign `www.ewastekochi.com` to the new production deployment.
- [ ] Re-run the full post-deploy crawl checklist again, this time against the real domain.

## 6. Search Console

- [ ] Do not submit anything to GSC before this point.
- [ ] After cutover, submit the new `sitemap.xml` (the sitemap index) via Search Console's Sitemaps report.
- [ ] Use the URL Inspection tool to spot-check the pages involved in the GSC-decided redirects (Findings D1–D5, ernakulam, kalamassery) to confirm Google picks up the new canonical/redirect relationship.

## 7. Monitoring

- [ ] Watch Search Console's Coverage and Performance reports daily for the first 1-2 weeks for anything unexpected (a spike in 404s, a drop in impressions on a page that wasn't supposed to change, a redirect not being respected).
- [ ] Re-export a fresh GSC Performance report roughly 4-6 weeks after cutover and compare against the baseline in `reports/v2-gsc-data-analysis.md` and `docs/roadmap/google-trends-keyword-validation.md`.

## Rollback

See `docs/deployment/rollback-safety-plan.md` for the full plan. In short: the current production hosting stays untouched and reachable until V2 is verified; a domain-level rollback just reverts DNS/domain assignment back to what was recorded in step 2; a code-level issue is fixed via git revert against the `v2-pre-production-baseline` tag and redeployed.
