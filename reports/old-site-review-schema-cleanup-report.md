# Old-Site Review Schema Cleanup Report

Phase: OLD-SITE-GSC-CLEANUP

## Scan Scope

Scanned:

- `src/`
- `public/`
- `data/`
- `scripts/`
- `dist/`
- `ewastekochi-amp.html`
- `.content-quarantine/`

Patterns:

- `Review`
- `AggregateRating`
- `ratingValue`
- `reviewCount`
- `reviewRating`
- `itemReviewed`
- `bestRating`
- `worstRating`
- `4.9`
- `500+ Reviews`
- `Google Rating`

## Findings

V2 deployed source/build:

- No Review schema or AggregateRating schema found in rendered `dist`.
- No fake rating fields found in active page source.
- Matches in `src/lib/schemaSafety.ts` and `scripts/validate-seo-v2.ts` are deny-list/validator safeguards, not emitted schema.

Ignored legacy artifact:

- `ewastekochi-amp.html` contains unsafe old review/rating material:
  - `AggregateRating`
  - `ratingValue: 4.9`
  - `reviewCount: 124`
  - visible `4.9/5 Rating`
  - visible review/testimonial blocks

This file is not tracked in git and is not part of the V2 deployment. It should remain excluded and must not be served from production.

## Cleanup Decision

No Review schema was added. No `itemReviewed` field was added. No AggregateRating/Review markup remains in deployed V2 output.

The correct old-alert remediation is:

- Treat the Review-snippet GSC issue as old-site/pre-cutover noise if it points at old rendered pages.
- Use GSC Validate Fix after confirming current live production has no Review/AggregateRating schema.
- Do not re-upload or deploy `ewastekochi-amp.html`.

## Unsafe Trust Claim Scan

Active V2 rendered/source sweep found no emitted unsafe trust claims. The ignored `ewastekochi-amp.html` artifact contains old unsafe claims including:

- `Kerala's most trusted`
- `government authorized`
- `ISO 14001:2015`
- `100% Data Security`
- `Best Market Price`
- `Instant Payment`

Because this artifact is ignored and not deployed, no code patch to active V2 page source was needed for those strings.
