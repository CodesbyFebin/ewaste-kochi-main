# EWK-Prod Deployment Guide

## Quick Start

```bash
cd ewk-prod
./scripts/deploy.sh
```

---

## Pre-Deployment Checklist

### 1. Environment Setup
```bash
# Verify you're in the ewk-prod directory
cd ewk-prod

# Check Node.js installation
node --version  # Should be v16+
npm --version   # Should be v8+

# Copy environment template
cp .env.example .env.local

# Edit with your credentials (DO NOT COMMIT)
# - Vercel API tokens
# - Database credentials
# - API keys
```

### 2. Dependency Installation
```bash
# Install main dependencies
npm install

# Install Astro site dependencies
cd astro-site
npm install
cd ..

# Install website dependencies
cd ewk-site
npm install
cd ..
```

### 3. Database Setup
```bash
# Validate and initialize database
python3 scripts/03-validate-data.py

# Sync content if needed
python3 scripts/04-sync-content.py
```

### 4. Content Generation
```bash
# Generate 11K+ blog pages
python3 scripts/05-generate-blogs.py

# Build sitemap indexes
python3 scripts/06-build-sitemaps.py

# Optimize images
bash scripts/07-optimize-images.sh
```

---

## Full Deployment Process

### Step 1: Validate
```bash
bash scripts/08-run-tests.sh
```

Expected output:
```
✅ HTML validation passed
✅ CSS validation passed
✅ JavaScript linting passed
✅ Database integrity verified
✅ Sitemaps validated
```

### Step 2: Build Staging
```bash
bash scripts/09-deploy-staging.sh
```

This will:
- Build Astro blog for staging
- Build ewk-site for staging
- Deploy to staging environment
- Run health checks

### Step 3: Verify Staging
```bash
# Check staging URLs
curl https://staging.ewaste-kochi.vercel.app
curl https://blog-staging.ewaste-kochi.vercel.app

# Verify sitemap generation
curl https://staging.ewaste-kochi.vercel.app/sitemap.xml
curl https://blog-staging.ewaste-kochi.vercel.app/sitemap-index.xml
```

### Step 4: Deploy Production
```bash
bash scripts/10-deploy-production.sh
```

This will:
- Build for production
- Deploy to production environment
- Update DNS/routing
- Run health checks
- Monitor for errors

### Step 5: Verify Production
```bash
# Check production URLs
curl https://ewaste-kochi.vercel.app
curl https://blog.ewaste-kochi.vercel.app

# Verify both sitemaps exist
curl https://ewaste-kochi.vercel.app/sitemap.xml
curl https://blog.ewaste-kochi.vercel.app/sitemap-index.xml

# Check health status
node scripts/health-check.js
```

---

## Deployment Architecture

```
Local Development
       ↓
  (git commit)
       ↓
GitHub Repository
       ↓
  (webhook triggers)
       ↓
   CI/CD Pipeline
       ↓
Staging Environment (Vercel)
       ↓
  (manual approval)
       ↓
Production Environment (Vercel)
       ↓
CloudFlare CDN
       ↓
End Users
```

---

## File Deployment Order

1. **Database Files** (`data/ewaste.db`)
2. **Configuration** (`data/config.json`)
3. **Content Data** (`content/`)
4. **Astro Blog Build** (`astro-site/dist/`)
5. **Static Website** (`ewk-site/`)
6. **Sitemaps** (public/sitemap*.xml)
7. **Scripts** (for monitoring/automation)

---

## Rollback Procedure

If deployment fails:

```bash
# Automatic rollback
bash scripts/rollback.sh

# Manual verification
node scripts/health-check.js

# Check backup database
# Use: data/backups/ewaste-[timestamp].db
```

---

## Monitoring & Health Checks

```bash
# Continuous monitoring
node scripts/health-check.js

# Check logs
tail -f ~/.vercel/logs/deployment.log

# Monitor Vercel deployments
vercel deployments --project ewaste-kochi-main
```

### Health Check Validates:
- ✅ Website responds (2xx)
- ✅ Blog responds (2xx)
- ✅ Sitemaps are valid XML
- ✅ Database is accessible
- ✅ No 404 errors on key pages
- ✅ SSL certificates valid

---

## Troubleshooting

### Issue: "Sitemap too large"
**Solution**: `06-build-sitemaps.py` automatically splits into 50K-entry chunks

### Issue: "Out of memory during generation"
**Solution**: Increase Node memory
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Issue: "Duplicate sitemaps"
**Solution**: Both names must be identical
```bash
# Verify they're the same
md5 public/sitemap_index.xml public/sitemap-index.xml
# Output should be identical
```

### Issue: "Database locked"
**Solution**: Kill competing processes
```bash
lsof +L1 data/ewaste.db | grep ewaste.db
kill -9 [PID]
```

---

## Post-Deployment

### Verify SEO
- Check Google Search Console
- Verify all 11K pages are indexed
- Monitor crawl stats

### Performance Monitoring
- Check Core Web Vitals
- Monitor page load times
- Track bounce rates

### Database Cleanup
```bash
# Backup current database
cp data/ewaste.db data/backups/ewaste-$(date +%Y-%m-%d).db

# Vacuum database
sqlite3 data/ewaste.db "VACUUM;"

# Verify integrity
sqlite3 data/ewaste.db "PRAGMA integrity_check;"
```

---

## Emergency Procedures

### Website Down
```bash
1. Run: bash scripts/rollback.sh
2. Verify: node scripts/health-check.js
3. Contact Vercel support if needed
```

### Corruption Detected
```bash
1. Stop all deployments: vercel cancel
2. Restore from backup: cp data/backups/ewaste-latest.db data/ewaste.db
3. Regenerate: python3 scripts/05-generate-blogs.py
4. Redeploy: bash scripts/09-deploy-staging.sh
```

### Performance Degradation
```bash
1. Clear cache: rm -rf .vercel/
2. Rebuild sitemaps: python3 scripts/06-build-sitemaps.py
3. Restart deployment: bash scripts/10-deploy-production.sh
```

---

## Support

For deployment issues:
- Check `/scripts/README.md` for script details
- Review Vercel documentation
- Contact DevOps team

---

**Last Updated**: 2026-06-04
