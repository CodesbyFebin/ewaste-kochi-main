# Blog Bulk Generation Safety Guard

Date: 2026-07-18

## Decision

`npm run generate:blog` is intentionally blocked.

The pasted recommendation to generate hundreds of `.md` placeholder posts into `src/content/blog/` does not match this repository's current architecture or safety history. The repo already has:

- a 20-cluster / 600-topic roadmap in `src/data/blogRoadmap20.ts`
- a quarantined backlog in `.content-quarantine/blog-drafts/`
- a blog scale safety gate documented in `reports/blog-scale-safety-gate-report.md`
- a safe editorial queue command: `npm run blog:silo-plan`

## Why It Is Blocked

Bulk-generated placeholder pages would risk thin content, duplicate content, and premature sitemap discovery. That directly conflicts with the AdSense readiness guidance: publish 20-30 substantial posts, not hundreds of low-depth placeholders.

## Safe Workflow

1. Run `npm run blog:silo-plan`.
2. Rewrite Batch 1 candidates to 1200+ original words.
3. Fact-check, add visible FAQs only where answers are visible, and avoid fake Review/AggregateRating schema.
4. Promote 5-10 posts at a time into routes/discovery.
5. Run `npm run check`, `npm run build`, `npm run validate`, and `npx tsx scripts/check-duplicate-content.ts`.

## Guard Added

- `scripts/generate-blog-safety-guard.ts`
- `package.json` now maps `generate:blog` to the guard.

Result: anyone running `npm run generate:blog` receives the correct safe workflow and no blog pages are generated.
