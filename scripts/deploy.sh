#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "Starting Vercel batch deployment process for 11K pages..."

# With Hybrid rendering and prerender=false, we no longer need complex batching.
# The build process now only handles the static shell and core pages.

# 1. Generate SEO Data and Sitemaps
python3 scripts/05-generate-blogs.py
python3 scripts/06-build-sitemaps.py

# 2. Deploy to Vercel
cd astro-site
npm run build
vercel --prod --yes --token $VERCEL_TOKEN

echo "Deployment complete."
