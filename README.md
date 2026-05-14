# Ewaste Kochi - Programmatic SEO (11K Pages)

This repository contains the programmatic SEO (pSEO) engine designed to generate and deploy 11,000+ targeted local landing pages for Ewaste Kochi using an Astro static site generator.

## Structure Overview

*   `astro-site/`: The Astro front-end application configured for maximum static performance and batched deployments.
*   `astro-site/src/data/content.db`: The high-performance SQLite database powering the 11k routes.
*   `scripts/`: Python and bash scripts for generating content, chunking sitemaps, and triggering Vercel batch deploys.

## Deployment Steps

To generate the data and deploy to Vercel:

1.  **Install Dependencies**
    ```bash
    cd astro-site
    npm install
    cd ..
    ```

2.  **Generate pSEO Data & Sitemaps**
    ```bash
    python3 scripts/05-generate-blogs.py
    python3 scripts/06-build-sitemaps.py
    ```

3.  **Build and Deploy**
    ```bash
    cd astro-site
    npm run build
    vercel --prod
    ```
    *Note: The project uses Hybrid rendering; 11k pages are served on-demand via the Edge for optimal performance.*
