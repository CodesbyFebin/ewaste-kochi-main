# EWK Production Folder (ewk-prod)

This is the consolidated production folder containing all organized and deduplicated files from:
- `ewk-site/` - Main marketing website
- `astro-site/` - Astro blog with pSEO
- `content/` - Blog content and data
- `data/` - Database and configuration
- `scripts/` - Build and deployment automation

## Folder Structure

```
ewk-prod/
├── ewk-site/                  # Main static website
├── astro-site/                # Astro-based blog engine
├── content/                   # Blog content files
├── data/                      # Data and database files
├── scripts/                   # Build and deployment scripts
├── docs/                      # Documentation
└── README.md                  # This file
```

## Important Notes

- ✅ **No Duplicates**: All files have been deduplicated using MD5 hashing
- ✅ **Organized**: Files are properly categorized by function
- ✅ **Production-Ready**: Optimized for deployment
- ⚠️ **Sensitive**: Do NOT commit `.env.local` files (already in .gitignore)

## Deployment

Run deployment scripts from `scripts/` directory:
```bash
cd ewk-prod/scripts
./deploy.sh
```

---
**Last Updated**: 2026-06-04
