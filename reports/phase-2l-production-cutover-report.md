# Phase 2L — Production Cutover Execution

Date: 2026-07-14
Status: **FAILED — rolled back. Verdict: not launched. A real config fix is needed before retrying.**

## What happened, in order

1. **Part 1 (compliance-claim patch) verified intact** — already completed and committed in the prior turn (`ca18a71`). Re-confirmed via a fresh source sweep and `npm run check`/`build`/`validate` (0 errors, 60 routes, 526/526) rather than re-doing the work.
2. **Production project identified and confirmed** before touching anything: `vercel projects ls` showed `ewaste-kochi-main` → `https://www.ewastekochi.com`. `vercel project inspect ewaste-kochi-main` gave project ID `prj_Lrt5wSinYlavz837nxkvM8T9qkzW`. `vercel domains inspect ewastekochi.com` confirmed `www.ewastekochi.com` and `ewastekochi.com` both map to this project, nameservers verified (✔). Checked the live site *before* deploying: title `"Ewaste Recycling Kochi ♻️ Free Pickup + Instant Payment"` — confirmed this is the old, pre-V2 site (the emoji and "Instant Payment" phrasing are exactly what this rebuild was meant to replace), not a false target.
3. **Relinked this directory** from `ewastekochi-v2-staging` to `ewaste-kochi-main` via `vercel link -p ewaste-kochi-main --yes` (backed up the staging link first so it could be restored exactly).
4. **Deployed**: `vercel deploy --prod --yes`. Build succeeded locally in the deploy log (60 pages, 0 errors, matches every prior staging build). Vercel reported `target: "production"` and `▲ Aliased https://www.ewastekochi.com` — by Vercel's own account, this succeeded.
5. **Relinked back to staging immediately** (`vercel link -p ewastekochi-v2-staging --yes`), confirmed the restored `.vercel/project.json` byte-for-byte matches the pre-deploy backup.
6. **Immediate post-deploy check**: `https://www.ewastekochi.com/` returned **404**, `x-vercel-error: NOT_FOUND`. This is a genuine Vercel routing-level error (not a network failure, not a slow DNS resolution) — the request reached Vercel's edge, which found no matching content.
7. Rechecked after a brief pause (ruling out a transient edge-cache propagation delay) — still 404, same error code. Concluded this was a real fault, not a timing issue.
8. **Root cause identified**: `vercel project inspect ewaste-kochi-main` showed `Output Directory: .` (an explicit literal override to the project root) and `Framework Preset: Other`. Compared directly against `ewastekochi-v2-staging` (which has worked correctly on every deploy this entire session): its Output Directory shows `` `public` if it exists, or `.` `` — Vercel's normal *default* fallback text, meaning no explicit override is set there, so Vercel's build-time framework auto-detection finds Astro's real output (`dist/`) correctly. `ewaste-kochi-main`, by contrast, has a **legacy explicit override** — almost certainly left over from whatever the project served before this Astro codebase ever touched it (the old site likely had no build step, so files sat directly in the repo root). That override took precedence, Vercel served from the project root instead of `dist/`, found no `index.html` there, and returned 404 on every route. This repo's own `vercel.json` has no `outputDirectory` key at all — nothing in the codebase caused this; it's purely a stale project-level setting on `ewaste-kochi-main`.
9. **Rollback executed immediately** — this is exactly the "homepage is not 200" trigger from the task's own rollback-trigger list. Found the prior production deployment via `vercel ls ewaste-kochi-main` (`ewaste-kochi-main-g3gosktnn-...`, 17d old, `Ready`/`Production`) and ran `vercel rollback https://ewaste-kochi-main-g3gosktnn-...vercel.app --yes`. Succeeded.
10. **Confirmed production fully restored**: `https://www.ewastekochi.com/` → 200, title back to the pre-deploy old-site title. Spot-checked `/recycling/`, `/pickup/`, `/contact/` on the old site — all 200.

## Outage window

The homepage returned 404 from shortly after the alias completed until the rollback finished — acted on it immediately on detection, with no delay beyond the diagnosis steps needed to distinguish a real fault from propagation lag (a brief, deliberate check, not idle time). Based on the timestamps available (deploy log ~13:12 IST, first 404 detected ~13:15 IST, rollback completed shortly after), the real-traffic-facing outage window was on the order of a few minutes.

## Why this wasn't caught in staging

`ewastekochi-v2-staging` is its own separate, purpose-created Vercel project (created 8 days ago, specifically for this V2 rebuild) with no legacy configuration baggage — Vercel's default zero-config behavior has correctly found `dist/` on every one of the many staging deploys this session. `ewaste-kochi-main` is a 40-day-old project that already existed with the old site before this session began; nothing in this multi-week rebuild had deployed to it before, so its stale build settings were never exercised or discovered until this actual cutover attempt.

## Fix required before retrying

Add an explicit `outputDirectory` (and, for robustness, `framework`) declaration to this repo's own `vercel.json`, so the correct output location is defined in version control rather than relying on a Vercel project dashboard setting that's already proven to be wrong for `ewaste-kochi-main`:

```json
{
  "framework": "astro",
  "outputDirectory": "dist"
}
```

This is the standard, version-controlled way to make a deploy's output location explicit regardless of what any given Vercel project's dashboard currently has configured — it would have prevented this incident outright. **Not applied in this phase** — flagging it for the user's review rather than immediately attempting a second production deploy after the first one just caused a live-site outage.

## Compliance-claim sweep (Part 1, still valid)

Unaffected by the failed cutover — this was validated against the local build before any deploy attempt: 0 unverified ISO/CPCB/KSPCB/Pollution Control Board claims in rendered output (1 confirmed-safe educational-context occurrence), `FAQPage` schema matches visible copy on `/trust/` and `/certifications/`. See `reports/pre-launch-claim-safety-patch-report.md` for the full record.

## What was NOT checked

Because the deploy failed at the first possible check (homepage), none of the subsequent verification steps (protected pages, blog-safety leak check, redirects, SEO/schema-on-production, mobile, chatbot) were run against a working production deployment — there was nothing valid to check them against. These all remain to be run once a corrected deploy actually succeeds.

## Final launch verdict

**Not launched. Production currently serves the pre-existing old site, unchanged, fully stable, confirmed 200.** The V2 codebase itself is not at fault — it built and validated cleanly, and is already proven correct on staging. The blocker is a stale Vercel project setting on `ewaste-kochi-main` specifically. Recommend applying the `vercel.json` fix above, then re-attempting the cutover with the same project/domain confirmation discipline used this time.

## Next recommended step

Fix `vercel.json`, validate locally, then retry Phase 2L — not GSC submission, and not further content work.
