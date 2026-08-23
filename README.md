# E-Waste Kochi

[![Quality Gate](https://github.com/CodesbyFebin/ewaste-kochi-main/actions/workflows/quality-gate.yml/badge.svg)](https://github.com/CodesbyFebin/ewaste-kochi-main/actions/workflows/quality-gate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The production source for [ewastekochi.com](https://www.ewastekochi.com/) — a local e-waste recycling, electronics pickup, battery recycling, IT asset disposition (ITAD), and data destruction service operating in Kochi, Ernakulam, and Kerala, India.

## What This Repository Contains

- **Astro 5.x static site** with 900+ pages including service pages, location pages, device guides, and a 48-page E-Waste Encyclopedia
- **SEO/AEO/GEO infrastructure**: structured data, llms.txt, ai.txt, sitemap generation, canonical handling
- **Content validation tooling**: automated SEO checks, content freshness tracking, route parity verification
- **Security posture**: CSP headers, HSTS, security.txt, responsible disclosure policy

## Tech Stack

- **Framework**: Astro 5.x with MDX
- **Language**: TypeScript
- **Styling**: Scoped CSS (no external UI framework)
- **Build**: Static site generation (SSG)
- **Hosting**: Vercel
- **Node**: 22.x

## Getting Started

### Prerequisites

- Node.js 22.x
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Site runs at `http://localhost:4321`.

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Validation

```bash
npm run validate      # Build + SEO validation
npm run check         # Astro type check
npm run content:validate  # Content quality checks
```

## Project Structure

```
src/
├── components/     # Reusable Astro components (SeoHead, Breadcrumbs, Faq, etc.)
├── data/           # Route registries, site config, SEO overrides
├── layouts/        # Page layouts
├── pages/          # File-based routing
│   ├── wiki/       # 48-page E-Waste Encyclopedia
│   ├── services/   # Service pages
│   ├── locations/  # Location pages
│   └── ...
scripts/
├── validate-seo-v2.ts    # SEO validation suite
├── validate-content.mjs  # Content quality validation
├── verify-dist.mjs       # Build output verification
└── ...
public/
├── llms.txt        # LLM-readable site overview
├── llms-full.txt   # Full content dump for AI ingestion
├── ai.txt          # AI training permissions
├── robots.txt      # Crawler directives
└── .well-known/    # security.txt, keys.txt
```

## Content Architecture

The site follows a **pillar-cluster model**:

- **Pillar pages**: Comprehensive hub topics (e.g., "E-Waste Recycling in Kochi")
- **Cluster pages**: Subtopic deep-dives (e.g., "How to Recycle Electronics at Home")
- **Service pages**: Commercial-intent conversion pages
- **Location pages**: Geographic service coverage
- **Wiki/Encyclopedia**: 48 educational articles across 5 silos

## SEO & AEO

- Unique title/meta description on every page
- JSON-LD structured data (FAQPage, Article, BreadcrumbList, Organization, LocalBusiness)
- Canonical URL enforcement with trailing-slash policy
- Sitemap auto-generation from route registry
- `llms.txt` and `llms-full.txt` for LLM discoverability
- `ai.txt` for AI training permissions

## Security

- Content Security Policy (CSP) headers
- HSTS with preload
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restricting camera/mic/geolocation
- `/.well-known/security.txt` with disclosure policy

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

[MIT](./LICENSE)
