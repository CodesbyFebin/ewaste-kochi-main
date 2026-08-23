# Contributing to Ewaste Kochi

## Workflow

1. Create a branch from `main`.
2. Run `npm run validate` before opening a PR.
3. Do not commit secrets or keys.
4. Keep the SEO validation gate green (`npm run validate` must pass).

## Adding a new SEO page

1. Add the route entry in `src/data/routes.ts`.
2. Create the Astro page under `src/pages/blog/<slug>/index.astro`.
3. Include JSON-LD schema (`Article`, `HowTo`, or `WebPage` depending on type).
4. Run `npm run build` to regenerate `public/llms-full.txt`.

## Adding machine-readable files

- `entities.json` — brand entity identity
- `knowledge-graph.json` — semantic relationships
- `evidence.json` — claims with sources
- `models.json` — AI model metadata
- `language.json` — language mapping

Update `public/llms.txt` to reference new files.

## Validation commands

| Command | Purpose |
|---|---|
| `npm run validate` | Build + SEO validation |
| `npm run gsc:indexing-readiness` | GSC indexing report |
| `npm run verify:dist` | Distribution parity check |
| `npm run content:validate` | Content quality gate |
