# EwasteKochi V2 - 100 Pillar Pages + 500 FAQ Silo Plan

## Evidence Base

### GSC Data Analysis (2026-08-18)

**High-Value Zero-Click Opportunity:** 7 queries with 0 clicks, 23,050 impressions
- "where to donate electronics" – 6,293 impressions (0 clicks)
- "where to recycle old electronics" – 5,857 impressions (0 clicks)
- "where to recycle batteries" – 2,889 impressions (0 clicks)
- "where to sell electronics locally" – 2,360 impressions (0 clicks)
- "how to recycle electronics" – 2,026 impressions (0 clicks)
- "where to sell used electronics" – 1,926 impressions (0 clicks)
- "local recycling centers" – 1,691 impressions (0 clicks)

**Secondary Priority:** "e waste kochi" – 91 clicks, 203 impressions (44.83% CTR)
**Traffic Core:** "e waste collection kochi" – 60 clicks, 310 impressions (19.35% CTR)

### Current State (Built, Validated, 0 Failures)

**Routes Registry:** 885 total routes
- Core services: `/recycling/`, `/pickup/`, `/marketplace/`
- Location hubs: `/locations/kakkanad/` through `/locations/kalamassery/` (8 pages)
- Device-specific: `/tv-recycling-kochi/`, `/computer-recycling/`, `/battery-recycling/`, etc.
- Content pillars: `/blog/recycling-basics/` (723 lines, 16 published topics), `/blog/e-waste-management-rules-2022/` (217 lines), `/blog/e-waste-rules-in-kerala/` (194 lines)

**Validation Results:** 3,235 checks passed, 0 failures across:
- SEO/Canonical compliance
- Schema safety (no AggregateRating/Review/fake certificates)
- Internal linking (0 dangling links, 0 redirect chains)
- Mobile/accessibility (chatbot, hamburger menu, skip links)
- Content safety (0 forbidden phrases, 0 unsafe claims)

**Content Infrastructure (Ready-to-use)**
- **Components:** `Faq.astro`, `DirectAnswer.astro`, `LongformExpansion.astro`, `EntityTable.astro`, `CtaBar.astro`, `RelatedContent.astro`, `Sources.astro`
- **Data:** `blogClusters.ts` (1,898 clusters, 555 planned, 16 indexable), `blogRoadmap20.ts` (600 topics), `blogContentBank.ts` (structured FAQ answers)
- **Layout:** Proven pillar template (`src/pages/blog/recycling-basics/index.astro`), existing route registry (`src/data/routes.ts`)

## Design Decision: Silo Architecture

**Why not a single 10,000-word page**
1. Search intent diversity – The 100 keywords span 4 intent categories
2. Duplicate-content gate – ≥60% unique paragraphs required
3. Legal compliance – Each topic needs evidence-aware, source-cited content
4. User experience – Different queries lead to different answer depths
5. SEO performance – Pillar clusters support internal linking and topic authority

**Why silo of 100 pillar pages**
1. Intent alignment – Each pillar can target a specific keyword cluster
2. Scale management – 100 smaller pages are easier to validate than one massive page
3. Maintainability – Focused scope improves update speed and quality
4. Traffic distribution – Matches the GSC query distribution (donation, recycling, disposal, selling)

## Architecture Overview

### 4 Intent Categories × 25 Keywords

**Category 1: General/Intent (25 Keywords)**
- Already served by 8 existing pages
- Remaining gaps (17 keywords) → new pillar pages

**Category 2: Compliance/B2B (25 Keywords)**
- Already served by 7 content articles + 4 service pages
- Remaining gaps (14 keywords) → new pillar pages

**Category 3: Location-specific (25 Keywords)**
- Already served by 8 Kerala location pages
- Remaining gaps (17 keywords) → 15 verified service areas + 2 non-service areas (Delhi NCR, Mumbai) requiring feasibility-check pages

**Category 4: Product/Material (25 Keywords)**
- Already served by 13 device/service pages
- Remaining gaps (12 keywords) → new pillar pages

### 100 Pillar Pages Structure

**Hub Pages** (4):
- `/blog/general-ewaste/` – General intent hub
- `/blog/compliance-b2b/` – Compliance/B2B hub
- `/blog/locations-services/` – Location services hub
- `/blog/devices-materials/` – Devices/materials hub

**Pillar Pages** (96 new):
- 17 general intent pillars (e.g., `/blog/what-is-ewaste/`, `/blog/how-to-recycle-electronics/`, `/blog/where-to-donate-electronics/`)
- 14 compliance pillars (e.g., `/blog/epr-compliance-india/`, `/blog/cpcb-registration-guide/`, `/blog/recycling-certificate/`)
- 15 location pillars (existing 8 + 7 new feasibility-check pages)
- 12 device pillars (e.g., `/blog/lithium-battery-disposal/`, `/blog/server-rack-recycling/`, `/blog/solar-panel-ewaste/`)

**Total:** 96 new pillars + 4 hub pages = 100 pillar pages

### 500 FAQ Entries: Distributed Across the Silo

**Structure:** 5 collapsible `<details>` per pillar page (total: 100 × 5 = 500)

**Selection criteria:** High-traffic long-tail keywords from GSC + existing FAQ data

**Sample FAQ placement** (per pillar):
1. **Where to recycle [device/category] in [city/region]** – feasibility-check focus
2. **How to prepare [device] for recycling** – prep steps
3. **Do I need documentation for [service]** – compliance
4. **Is [service] certified/authorized** – claim safety
5. **How much is [device] worth** – price transparency

**FAQ Source:** Combine existing `blogContentBank.ts` (structured) + GSC query data (high-value long-tails) → fill 500 slots across all pillars

## Implementation Plan

### Phase 1: Foundations (Weeks 1-2)

**1.1 Extend Blog Silo Infrastructure**
- Add `existingPosts` links to hub pages (`/blog/general-ewaste/`, etc.)
- Update `blogClusters.ts` → map each pillar to its category hub
- Wire `RelatedContent.astro` → hub → pillar relationships
- Add FAQ hub (`/blog/faqs/`?) – optional, separate from pillar pages

**1.2 Pillar Template Development**
- Clone and adapt `/blog/recycling-basics/` template for all 100 pillars
- Configure per-pillar data: title/description, breadcrumb, FAQ list, related services
- Ensure consistent structure: Hero (pillar), Quick Answer, Longform Expansion, FAQ, Related Content

**1.3 Content Migration Mapping**
- **Existing content → pillar structure:** Map all 22 indexable blog posts to pillar slots (e.g., `/blog/recycling-basics/` → general pillar)
- **Content articles → compliance pillars:** Migrate `/src/content/articles/` → compliance category
- **Location pages → location pillars:** Align existing `/locations/` pages with new feasibility-check pages
- **Device pages → device pillars:** Integrate existing `/tv-recycling-kochi/` etc. into device pillars

**1.4 SEO Validation**
- Run `npm run validate` after each pillar deployment
- Check duplicate-content gate after each batch (50 pillars)
- Validate schema, canonicals, internal links

### Phase 2: Pillar Construction (Weeks 3-8)

**2.1 General Intent Pillars (Week 3-4)**
Target: 17 pillars covering the 17 general-intent gaps
Examples: 
- `/blog/what-is-ewaste/` (already exists but needs hub integration)
- `/blog/how-to-recycle-electronics/` (new)
- `/blog/where-to-donate-electronics/` (blocked – operational details needed)
- `/blog/local-recycling-centers/` (high-traffic GSC query)

**2.2 Compliance Pillars (Week 5-6)**
Target: 14 pillars covering compliance gaps
Examples:
- `/blog/epr-compliance-india/` (merges existing EPR articles)
- `/blog/cpcb-registration-guide/` (combines registration articles)
- `/blog/recycling-certificate/` (new)

**2.3 Location Feasibility-Check Pillars (Week 7)**
Target: 7 new feasibility pages + integrate existing 8 location pages
Examples (feasibility-check format):
- `/locations/bangalore/` – honest: "Contact us to check pickup feasibility in Bangalore"
- `/locations/mumbai/` – honest: "Contact us to check pickup feasibility in Mumbai"
- `/locations/delhi-near-me/` – honest: "Contact us to check pickup feasibility in Delhi NCR"

**2.4 Device/Material Pillars (Week 8)**
Target: 12 pillars covering product gaps
Examples:
- `/blog/lithium-battery-disposal/` (new)
- `/blog/solar-panel-ewaste/` (new)
- `/blog/server-rack-recycling/` (already exists – needs integration)

### Phase 3: QA & Validation (Weeks 9-10)

**3.1 Duplicate-Content Gate**
- Run `scripts/check-duplicate-content.ts` across all 100 pillars
- Ensure ≥60% unique paragraphs per pillar
- Cap FAQ reuse at 3 pages per answer

**3.2 Safety & Claims Sweep**
- Run `scripts/validate-seo-v2.ts` across all routes
- Forbidden claims scan: no "ISO 14001", no "certified", no "instant payment", no "best-price-guaranteed"
- Legal compliance: all compliance pillars cite official sources (CPCB, KSPCB)

**3.3 Cross-Linking**
- Hub pages → pillar pages (category navigation)
- Pillar pages → related services (CTA links)
- Pillar pages → FAQ hub (optional) – all FAQ details integrated per pillar

**3.4 Performance Measurement**
- Count metrics: 100 pillars, 500 FAQ entries
- Quality metrics: 0 validation failures, 0 duplicate-content failures
- SEO metrics: internal linking flow, breadcrumb depth, schema completeness

## Quality Gates

### Content Standards
- **Word count:** 800-2,500 words per pillar (validated by existing pillar templates)
- **FAQs:** Exactly 5 collapsible `<details>` per pillar, sourced from `blogContentBank.ts` + GSC long-tails
- **Sources:** Every compliance pillar → CPCB/KSPCB official links; every technical pillar → official guidelines
- **Claims:** No certifications, authorizations, or pricing guarantees without explicit evidence
- **Disclaimer:** All compliance content → "This is general information, not legal advice"

### SEO Standards
- **Canonicals:** Self-referencing canonical from each pillar page
- **Schema:** BlogPosting + WebPage schema, no disallowed types (AggregateRating, Review, QAPage)
- **Metadata:** Title/description matching keyword intent, hreflang for hub/pillar pairs
- **Sitemap:** All pillar pages → `src/data/routes.ts` → sitemap generation

### Technical Standards
- **Routes:** All pillars → `src/data/routes.ts` (sitemap registry)
- **Component usage:** Faq.astro, DirectAnswer.astro, RelatedContent.astro, LongformExpansion.astro
- **Linking:** Hub → pillar (category), pillar → services (conversion), pillar → FAQ (details)
- **Language:** English (en-IN) + Malayalam (ml-IN) hreflang triples

## Critical Path Dependencies

### 1. Donation Page (Blocker)
**Issue:** The single highest-value GSC query ("where to donate electronics", 6,293 impressions) points to `/donate-electronics/` which is BLOCKED per PROJECT_TRACKER lines 117-125.

**Status:** Awaiting operational details – named partners, accepted devices, data-erasure responsibility, pickup geography, transfer/receipt process, unsuitable-device handling.

**Impact:** Without this page, 6,293 zero-click impressions remain untapped.

**Resolution:** User must supply operational details for donation page → then integrate as pillar `/blog/where-to-donate-electronics/` (or hub-linked page) with proper safety wording.

### 2. location Keywords Outside Service Area
**Issue:** 17 location keywords target Delhi NCR, Mumbai, Bangalore, etc. – areas where Ewaste Kochi has no pickup service.

**Resolution:** Build them as feasibility-check pages (existing pattern: 8 far-city pages already use "contact us to check feasibility")

### 3. Content Quality Gates
**Issue:** The project's duplicate-content and safety gates will reject mass-generated content.

**Resolution:** Use existing high-quality templates + integrate verified content from quarantined drafts (contentSource: "legacy")

## Success Metrics

### Quantity
- **Pillar count:** 100 pillar pages (96 new + 4 hub pages)
- **FAQ entries:** 500 short FAQs across the silo (5 per pillar)
- **Routes:** 885 + 100 = 985 total routes (including new hubs)
- **Sitemap URLs:** 985 entries

### Quality
- **Validation:** 0 failures after full deployment
- **Duplicate-content:** Pass all checks (60% unique paragraphs, FAQ reuse ≤3 pages)
- **Safety:** 0 forbidden claims, 0 fabricated certifications
- **Internal linking:** 0 dangling links, 0 redirect chains

### SEO
- **Indexable coverage:** All 100 pillars + existing 885 routes
- **Keyword intent:** Each pillar targets its assigned keyword cluster
- **Authority:** Hub-and-spoke structure distributes link equity
- **Performance:** Existing CTRs preserved (no degradation)

## Risk Mitigation

### Content Quality Risks
- **Mitigation:** Continue using proven hand-written templates + verified legacy content
- **Mitigation:** Maintain human editorial review gate for all new pillars
- **Mitigation:** Apply anti-fabrication rules (FORBIDDEN_PHRASES, FORBIDDEN_PATTERNS)

### Technical Risks
- **Mitigation:** Gradual migration – keep existing working system intact
- **Mitigation:** Feature flags for new routing/system
- **Mitigation:** Comprehensive testing in staging before production

### SEO Risks
- **Mitigation:** Preserve existing high-ranking pages' URLs and structure
- **Mitigation:** Implement proper redirects for any URL changes
- **Mitigation:** Maintain existing schema.org implementation alongside new pillars

## Immediate Next Steps

1. **Review this plan with user** → approve/scope adjustments
2. **Update `blogClusters.ts`** → map pillar hubs and add pillar references
3. **Adapt hub template** (`/blog/recycling-basics/` → `/blog/general-ewaste/`, etc.)
4. **Create pillar templates** → copy hub template, configure per-pillar data
5. **Map content sources** → existing articles → pillar slots, legacy quarantined → compliance pillars
6. **Begin implementation** → Phase 1 → Phase 2 → Phase 3
7. **Run validation** → after each batch (50 pillars per batch)
8. **Deploy to staging** → after Phase 2 completes
9. **Production cutover** → after Phase 3 completes + user OK on donation page
10. **Monitor** → GSC data post-deployment → iterate

## Deliverables

### Files Modified
- `src/data/blogClusters.ts` → pillar → category mapping
- `src/data/routes.ts` → add 100 pillar route entries
- `src/pages/blog/[cluster]/[slug].astro` → pillar template (adapted from `/blog/recycling-basics/`)
- `src/components/` → ensure FAQ/RelatedContent components support per-pillar data
- `scripts/validate-seo-v2.ts` → ensure validation covers pillar-specific checks
- `scripts/check-duplicate-content.ts` → ensure duplicate-content gate applies to pillar pages

### Reports Created
- `reports/pillar-construction-plan.md` – this plan document
- `reports/pillar-mapping-matrix.csv` – keyword → pillar → content-source mapping
- `reports/pillar-qa-reports/` – validation results per batch

### Infrastructure
- 100 new pillar pages + 4 hub pages
- 500 FAQ entries distributed across the silo (5 per pillar)
- Updated blog hub (`/blog/`) → shows 4 category hubs + featured pillars
- Enhanced internal linking → hub ↔ pillar ↔ services
- Maintained existing quality gates and anti-fabrication rules

**Status:** Ready for user approval and implementation
**Priority:** High (addresses the 7 zero-click query opportunity + 100 keyword intent coverage)
**Dependencies:** User operational details for donation page, quality gate tools ready
**Budget:** Internal development (no external tools required)
**Timeline:** 10 weeks (Phase 1-3)

---

*Plan created: 2026-08-18*
*Target implementation: Post-user approval, Week 1-10*
*Critical path item: Donation page operational details*
*File location: `.kilo/plans/ewastekochi-v2-100-pillars-plan.md`