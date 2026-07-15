# Phase 2L-RETRY Predeploy Production Snapshot

Date/time: 2026-07-15 07:49:53 IST

## Approved Candidate

- Candidate commit: `6e72598fdbc3e85b665f57e09440a076ed2320fe`
- Branch: `master`
- Local worktree before deploy: clean
- Git remote: no remote configured in this checkout

## Production Project Confirmation

- Vercel account: `febinfrancis555`
- Production project: `ewaste-kochi-main`
- Production project ID: `prj_Lrt5wSinYlavz837nxkvM8T9qkzW`
- Production owner/team scope: `projects555`
- Production domains on current live deployment:
  - `https://www.ewastekochi.com`
  - `https://ewastekochi.com`
- Staging project still linked locally before relink:
  - `ewastekochi-v2-staging`
  - `prj_FvHPByEMUjCejy5w9kph4neqy9Eq`

## Current Live Deployment Before Cutover

- Current production deployment ID: `dpl_HhyhimEVRcEeGCq7cSRXkj7Vkr5R`
- Current production deployment URL: `https://ewaste-kochi-main-g3gosktnn-febinfrancis555s-projects.vercel.app`
- Current production target: `production`
- Current production status: `Ready`
- Rollback candidate: the deployment above, unless a newer rollback target is selected in the Vercel dashboard.
- Old deployment build output observed before settings fix: `.`

## Production Settings Guard

The production project still had the legacy output-directory override before cutover:

- Framework preset before fix: `Other`
- Output directory before fix: `.`

Updated production project settings before deployment:

- Framework preset: `Astro`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: `dist`
- Root directory: `.`

Repo-level `vercel.json` also contains:

- `"framework": "astro"`
- `"outputDirectory": "dist"`
- 317 redirect rules, including all 90 indexed redirect sources from `data/gsc-indexed-redirect-map.csv`

## Local Validation Passed Before Deploy

- `npm run check`: passed, 0 errors, 0 warnings, 0 hints
- `npm run build`: passed, 87 pages built
- `npm run validate`: passed, 87 routes, 625 checks, 0 failures
- `npx tsx scripts/check-duplicate-content.ts`: passed, all 23 indexable posts clear duplicate-content gate
- `npx tsx scripts/check-orphan-articles.ts`: passed, 0 orphan indexable articles
- Rendered unsafe-claim sweep over `dist`: 0 hits
- `dist/content-index.json`: 87 pages, canonical domain `https://www.ewastekochi.com`, 0 non-www URLs, 0 staging URLs
- Indexed redirect containment: 90/90 configured in Vercel, 0 redirect sources in sitemap/content-index, 0 homepage dumping

## Deployment Decision

Production deploy may proceed only from a local link to `ewaste-kochi-main` / `prj_Lrt5wSinYlavz837nxkvM8T9qkzW`.
