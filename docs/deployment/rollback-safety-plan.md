# Rollback Safety Plan

Status: written as of Phase 2K (2026-07-07), before any production cutover. This documents the safety net that now exists and the rules for using it.

## Git baseline

- **Repository**: `~/Desktop/EwasteKochi` (this project). No git history existed before Phase 2K — this is the first commit ever made for this project.
- **Baseline commit**: `0841992ecd21faeac1976dace853f604aa0d9333`
- **Baseline tag**: `v2-pre-production-baseline`
- **Contents**: 43 pages, 297 redirects, 469/469 validation checks passing, the Phase 2I-A lead-funnel chatbot, and the rebuilt homepage hero — the full current state of the site source.
- **Deliberately excluded** (see `.gitignore` for full reasoning): `SWARM/` (debris from an unverified, never-tested pitch), `ewastekochi-v3-chatbot.zip` (a mass pSEO pillar-page generator, out of scope), `ewastekochi-amp.html` (contains unverified claims this project rejects), `Homepage Hero image.png` (source for an already-rejected hero graphic), and the raw GSC export zips (already extracted into `data/*.json`).

To return to this exact state at any point: `git checkout v2-pre-production-baseline` (or `git reset --hard v2-pre-production-baseline` if you want the working tree to match exactly — check `git status` for uncommitted changes first).

## Current deployment targets

| Target | Project | URL | Status |
|---|---|---|---|
| Staging | `ewastekochi-v2-staging` (Vercel) | `https://ewastekochi-v2-staging.vercel.app` | Isolated, disposable, redeployed in this phase |
| Production | `ewaste-kochi-main` (Vercel) | `https://www.ewastekochi.com` | **Untouched by this project so far** — the live site is still whatever was there before this V2 rebuild started |

These are two entirely separate Vercel projects in the same account. Nothing this project has done has touched `ewaste-kochi-main` or its domain — confirmed at every deploy so far (Phase 2H, and the redeploy in this phase) by deliberately linking only to the staging project.

## Rollback strategy for the eventual production cutover

This section is a plan for *when* cutover happens, not something executed yet:

1. **Before cutover**: confirm with the user how the *current* live site (whatever is serving `www.ewastekochi.com` today, outside this project's visibility) is actually hosted and whether it can be quickly restored if V2 has a problem after going live. This project has no visibility into that hosting — it was audited via crawling only (`reports/v2-initial-repo-audit.md`), never via source access.
2. **Do not decommission or delete the current production deployment/hosting as part of the same change that cuts over to V2.** Keep it fully intact and reachable (even if traffic is pointed at V2) until V2 is verified stable in production for a meaningful period.
3. **Domain-level rollback**: if the cutover is done via DNS or a Vercel domain reassignment, the rollback is simply reverting that DNS/domain change back to the prior target — keep a record of exactly what the domain pointed to *before* cutover (nameservers, A/CNAME records, or which Vercel project owned the domain) so this is a fast, mechanical revert, not a rebuild.
4. **Code-level rollback**: if a bug is found in the V2 code itself after cutover (not a domain issue), the fix is `git revert` or `git reset` to a known-good commit in this repository, then redeploy — this is what the git baseline in this phase now makes possible for the first time.
5. **Redirect-layer rollback**: because all 297 redirects live in one file (`vercel.json`) under version control, a bad redirect can be isolated and reverted independently of the rest of the site by reverting just that file to a prior commit.

## What this plan does not cover yet

- No actual production deployment has happened, so no rollback has ever been tested.
- The real current production hosting/DNS configuration is still unknown to this project (see point 1 above) — this needs to be confirmed with the user before cutover, not assumed.
- Vercel's own deployment history (every `vercel deploy` creates an immutable deployment that can be instantly promoted/rolled back within that project) is a second, independent safety net on top of git, but hasn't been exercised yet either.
