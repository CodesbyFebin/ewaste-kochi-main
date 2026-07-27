# generate-pillar-page.py

Spec-driven Astro pillar-page generator for ewastekochi-v2.

**Not an LLM content generator.** Deliberately. Content quality = spec quality.
Aligns with the Phase 2L-RETRY anti-fabrication discipline the project already
enforces (see `PROJECT_TRACKER.md` and the `.gitignore` rationale block).

## Quick start

```bash
# 1. Get a sample spec to fill in
python3 scripts/generate-pillar-page.py --emit-sample-spec > my-page.yaml

# 2. Edit my-page.yaml with your real facts

# 3. Validate before rendering
python3 scripts/generate-pillar-page.py my-page.yaml --validate-only

# 4. Dry-run: see the rendered Astro without writing anything
python3 scripts/generate-pillar-page.py my-page.yaml --dry-run

# 5. Write to quarantine for review (default, safe)
python3 scripts/generate-pillar-page.py my-page.yaml
# → .content-quarantine/generated/<path>/index.astro

# 6. When happy, promote to live + register route
python3 scripts/generate-pillar-page.py my-page.yaml --live --register-route
# → src/pages/<path>/index.astro   +   routes.ts entry appended
```

## What the spec captures

Every text field the resulting Astro page needs:
- SEO title, description, H1, breadcrumb label
- Lede paragraph, BLUF DirectAnswer (30-100 words for AI extraction)
- 3+ key takeaways
- Accepted-items table (customisable columns)
- 3+ HowTo steps (renders as JSON-LD HowTo + visible ordered list)
- 3+ H2 sections with body copy
- 6+ FAQ Q&A pairs (renders as FAQPage schema via `<Faq>` component)
- 4+ related pages for internal linking
- Route metadata (changefreq, priority, type, sitemap group, hreflang pair)
- WhatsApp CTA message
- Optional: verified_claims block (whitelist otherwise-forbidden claims with a citation source)

## Safety gates

1. **Structural validation** — every required field present, correct type; length bounds enforced.
2. **Forbidden-phrase scan** — bans "instant quote", "guaranteed pickup", "100% free", bare authority claims, unverified certification numbers, fake ratings, "over X years experience" tenure claims, and template-variable leaks. See `FORBIDDEN_PHRASES` and `FORBIDDEN_PATTERNS` in the script.
3. **Whitelisting via `verified_claims:`** — the only way to include an otherwise-banned phrase (e.g. a specific KSPCB reg number) is to declare it in `verified_claims:` with a `citation_source`. The scan then permits substring occurrences.
4. **Quarantine by default** — output goes to `.content-quarantine/generated/` for human review. `--live` required to write into `src/pages/`.
5. **Overwrite protection** — `--force` required to overwrite an existing file.
6. **Duplicate route protection** — `--register-route` refuses if the path is already in `routes.ts`.

## Dependencies

- Python 3.8+
- PyYAML — only for `.yaml`/`.yml` specs. `.json` specs work with stdlib alone.
  Install: `python3 -m pip install --user --break-system-packages pyyaml`

## Exit codes

- `0` success
- `1` CLI usage error
- `2` spec validation failed
- `3` forbidden-phrase / pattern hit
- `4` file exists (missing `--force`)
- `5` duplicate route
- `6` file write error

## Design notes

- **Single file, self-contained.** The Astro template is embedded as a string in the script itself, not a separate file. Move the script, keep it working.
- **No network calls.** No LLM API, no telemetry, no external fetches.
- **Idempotent.** Running twice produces the same output. Route registration refuses duplicates.
- **Matches the exact template pattern of the 5 pillar pages shipped 2026-07-27** (`/laptop-recycling/`, `/computer-recycling/`, `/mobile-phone-recycling/`, `/corporate-e-waste-recycling/`, `/office-e-waste-pickup/`).

## What this script does NOT do

- Does not generate content ideas or topic suggestions.
- Does not call any AI model.
- Does not fabricate specifics you don't provide.
- Does not skip validation for convenience.
- Does not write to `src/pages/` without `--live`.

If you want a topic-idea generator, use the GSC "Top Queries" export in
`data/pseo-recovery-plan.xlsx` — the demand data is already grounded in real
impressions.
