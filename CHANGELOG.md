# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-08-19

### Added
- 48-page E-Waste Encyclopedia across 5 silos (disposal, sales, locations, technical, master pillar)
- wikiRoutes.ts with complete route registry for all wiki pages
- llms-full.txt (133KB full content dump for AI ingestion)
- manifest.json (web app manifest)
- ai.txt (AI training permissions)
- .well-known/security.txt and keys.txt
- humans.txt and health.json
- knowledge-graph.json and evidence.json
- GitHub community files: README.md, LICENSE (MIT), CONTRIBUTING.md, CODE_OF_CONDUCT.md
- GitHub issue templates (bug report, feature request)
- GitHub PR template
- Security & Dependency Audit workflow
- Deployment workflow for Vercel production

### Fixed
- Import path depth in all 47 subdirectory wiki pages (3 levels → 4 levels)
- Comma-before-const syntax errors in 11 wiki pages
- Unescaped inch-mark quotes in sell-old-crt-tvs FAQ
- Double less-than typo in choose-secure-itad-vendor FAQ
- Missing closing quotes on id attributes in 2 pages
- Stray closing tag and missing brace in index.astro LongformExpansion
- Trailing slash canonical mismatch in all 48 wiki pages
- Undefined breadcrumbItems references in 2 pages

### Security
- Content Security Policy headers via vercel.json
- HSTS with preload
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restricting camera/mic/geolocation
- Weekly dependency audit workflow
- Secret detection workflow

### Validation
- Build passes: 936 pages compiled successfully
- Sitemap contains all 48 wiki routes
- SEO validation: 3378 checks passed
- 4 benign content-pattern warnings (legitimate factual content)
