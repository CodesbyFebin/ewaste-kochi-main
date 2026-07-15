# V2 SEO Expansion Safety Report

Date: 2026-07-18

## Request Interpreted

The latest SEO request covered schema expansion, content gaps, local SEO, blog
content, video, internal linking, user-generated content, tools/calculators,
voice search, image optimisation, mobile/Core Web Vitals, backlinks, FAQ schema,
HowTo schema, Product schema, LocalBusiness schema, Service schema and
Breadcrumb schema.

## Implemented in This Patch

- Added `/tools/` hub as a canonical route.
- Added `/tools/scrap-value-calculator/` for quote-potential planning.
- Added `/tools/data-destruction-cost-estimator/` for data-handling scope.
- Added `/tools/pickup-eligibility-checker/` for pickup feasibility planning.
- Added `/tools/sell-or-recycle-decision-tool/` for resale versus recycling
  routing.
- Added `/tools/battery-safety-checker/` for swollen, leaking or damaged battery
  preparation guidance.
- Added tool pages to the route registry, sitemap, content-index, footer,
  header and `llms.txt`.
- Kept FAQPage schema through the existing visible FAQ component.
- Kept WebPage schema on tool pages.
- Added internal links from tool pages into the active service silos:
  recycling, pickup, battery recycling, sell electronics, marketplace, data
  destruction and ITAD.

## Schema Policy Applied

The project safety gate still allows only supported safe schema:

- Organization
- WebSite
- WebPage
- Service
- BreadcrumbList
- FAQPage where visible FAQ content matches
- BlogPosting or Article for real articles

The following were deliberately not added in this patch:

- Review or AggregateRating schema, because no verified user review dataset was
  supplied.
- Product or Offer schema for buyback, because no real product catalogue,
  inventory, offer availability or inspected device records were supplied.
- LocalBusiness or GeoCoordinates expansion, because coordinates and branch
  locations must be verified before publishing.
- HowTo schema, because the current schema safety gate strips HowTo/HowToStep
  after the old-site claim cleanup. Visible how-to content can still exist, but
  markup should only be enabled after the schema policy is intentionally updated.
- Awards, certificates, authorization and certification schema without verified
  source documents.

## Content Gap Coverage

Already addressed in the surrounding expansion work:

- `/blog/recycling-basics/`
- `/blog/pickup-service/`
- `/blog/battery-recycling/`
- `/blog/sell-electronics/`
- `/blog/data-destruction/`
- `/blog/itad/`
- `/blog/tv-monitor-recycling/`
- `/blog/mobile-phone-recycling/`
- `/blog/laptop-computer-recycling/`
- `/blog/printer-peripheral-recycling/`
- `/blog/scrap-price-guide/`
- `/blog/preparation-safety-guides/`
- `/blog/corporate-ewaste/`
- `/ewaste/`
- `/e-waste-rules-2022-india/`
- Safe refreshed indexed legacy `/blog/` URLs from the GSC exports.

## Deferred Non-Code Work

These are not safe to fabricate in code:

- Google Business Profile changes.
- Local citations.
- Backlink outreach.
- Social media signals.
- Real reviews/testimonials.
- Real YouTube videos and transcripts.
- Real branch coordinates or GBP embeds.
- Verified certifications, media mentions and awards.

## Next Safe Engineering Candidates

- Add a `/videos/` or `/resources/` section only after real videos or PDFs exist.
- Add industry pages under `/services/for-industries/` with no fake case studies.
- Add a Core Web Vitals report after running PageSpeed/Lighthouse on production.
- Add real Review schema only if first-party or platform review data is provided
  and the project safety policy is updated to allow it.
