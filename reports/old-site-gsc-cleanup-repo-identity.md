# OLD-SITE-GSC-CLEANUP Repo Identity

Phase: OLD-SITE-GSC-CLEANUP — legacy website alert fix

## Commands Run

- `git remote -v`
- `git branch --show-current`
- `git rev-parse --show-toplevel`
- `find . -maxdepth 3 -type d | sort | sed -n '1,160p'`

## Identity

- Repo root: `/Users/cyberteck/Desktop/EwasteKochi`
- Git branch: `master`
- Git remote: none configured
- Current checkout type: V2 Astro production rebuild, not the old 11k pSEO source checkout
- Local Vercel link after work: restored to staging project `ewastekochi-v2-staging` / `prj_FvHPByEMUjCejy5w9kph4neqy9Eq`
- Production project used only for the focused redirect patch deploy: `ewaste-kochi-main` / `prj_Lrt5wSinYlavz837nxkvM8T9qkzW`

## Old-Site Folders Checked

Expected old source folders:

- `ewk-site/`: not present
- `astro-site/`: not present
- `ewk-prod/`: not present
- `content/`: not present
- old generated pSEO source folders: not present as deployed source
- old SQLite `content.db`: not present in this checkout

Legacy/local artifacts present but not active V2 source:

- `.content-quarantine/blog-drafts/`: quarantined drafts, not live routes
- `ewastekochi-amp.html`: ignored legacy AMP/static artifact with unsafe old claims and review schema
- `ewastekochi-v3-chatbot.zip`: ignored old/generated artifact
- `SWARM/`: ignored unrelated artifact

## Deployment Safety

This checkout is safe to deploy as V2 only. It is not safe to treat it as the old website source, and it does not contain the old `ewk-site/` + `astro-site/` legacy deployment tree from the earlier OLD-P0B task.

No old website deployment was made. The only production deployment in this phase was a focused V2 `vercel.json` redirect hygiene patch to reduce current post-cutover Googlebot crawl waste.

Deployment target risk:

- Deploying this checkout to `www.ewastekochi.com` deploys V2, not the old site.
- Attaching any legacy old-site deployment back to `www.ewastekochi.com` remains prohibited unless explicitly approved.
- The ignored `ewastekochi-amp.html` file should not be uploaded or served from any production host.
