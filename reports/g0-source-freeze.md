# G0 — Source Freeze Audit

**Timestamp:** 2026-08-17
**Executor:** Certification protocol master-prompt audit
**Scope:** read-only source-integrity + build-integrity verification
**Zero code changes made.**

## Source integrity

| Item | Value |
|---|---|
| Branch | `main` |
| Local HEAD | `8235e03686248c8a08bac70ec7462199be198518` |
| origin/main | `8235e03686248c8a08bac70ec7462199be198518` |
| Sync status | **IN SYNC** |
| Working-tree changes | 1 untracked (`sitemap-export/` — Vercel-ignored, expected) |

## Toolchain versions

| Package | Version |
|---|---|
| astro | ^5.18.2 (resolved: 5.18.2) |
| @astrojs/sitemap | ^3.7.3 |
| @astrojs/check | 0.9.9 |
| @astrojs/mdx | 4.3.14 |
| typescript | ^5.6.3 (resolved: 5.9.3) |
| tsx | 4.23.0 |
| cheerio | 1.2.0 |
| gray-matter | 4.0.3 |
| js-yaml | 5.2.2 |
| reading-time | 1.5.0 |
| @types/node | 26.1.0 |
| vercel CLI | not declared |

## Manifest / config inventory (SHA-1 sampled)

| Path | Bytes | Lines | SHA-1 (first 12) |
|---|---:|---:|---|
| `package.json` | 1,234 | 39 | `66497048b776` |
| `package-lock.json` | 292,858 | 8,204 | `3515ede0636b` |
| `astro.config.mjs` | 715 | 19 | `8972d15c2d87` |
| `vercel.json` | 80,476 | 2,724 | `122c02783184` |
| `.vercelignore` | 2,944 | 63 | `64b587d17ffa` |
| `public/robots.txt` | 3,499 | 163 | `c1835008e816` |
| `src/data/routes.ts` | 304,439 | 8,138 | `7e5901977b75` |
| `src/data/site.ts` | 2,087 | 49 | `e5644d74c6c9` |
| `src/components/SeoHead.astro` | 5,999 | 159 | `1b641621da0c` |
| `src/layouts/Layout.astro` | 11,614 | 313 | `2fd80ca6c486` |

## Build integrity

### `npm run check`
```
Result (723 files):
- 0 errors
- 0 warnings
- 5 hints
```

### `npm run build`
```
[vite] ✓ built in 15.07s
[vite] ✓ built in 65ms
[build] 988 page(s) built in 21.23s
[build] Complete!
```

### `npm run validate` (SEO + generated-dist deep validation)
```
- Failures: 0
All checks passed.
All SEO validation checks passed.
```

## npm scripts inventory

`dev`, `build`, `preview`, `check`, `validate`, `gsc:indexing-readiness`, `content:freshness-indexing`, `blog:silo-plan`, `generate:blog`, `content:generate`, `content:validate`, `verify:dist`, `safe-deep`

## Recent commit chain (top 10)

```
8235e0368 reports: GSC 2026-08-16 disposition map — 227 not-indexed + 295 alt-canonical classified
6d4fbfcf0 seo+analytics: install GTM-KLVK4C8P + add sameAs social profiles
8c5d0aeef feat(seo): structural indexation hygiene & content recovery (PR #12)
ab58cd395 seo: enrich schema — LocalBusiness image + openingHours, add standalone Organization & WebSite
2ab20718a fix(build): clean 23 SEO validation failures for zero-failure build
a14a73c4e seo: SeoHead overrides — add pan-India ship-in to donate + sell pages
d7eb57222 fix(build): restore Vercel inputs and Malayalam services hub
65cdea966 tracker: lock 7-phase Host & Indexation Consolidation plan (2026-08-13)
ce368c432 seo: fix mangled titles on ~220 legacy-indexed blog pages
884b9677c seo: Tier A snippet sweep — 25 zero-CTR pages, verifiable claims only
```

## G0 verdict

**🟢 PASS** — source is frozen, toolchain aligned, build and validation are green.

## Reproducibility

Anyone with repo access can reproduce exactly this state via:
```
git fetch origin && git checkout 8235e03
npm ci
npm run check
npm run build
npm run validate
```
