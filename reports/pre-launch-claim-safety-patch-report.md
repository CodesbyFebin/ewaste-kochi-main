# Pre-Launch Claim Safety Patch — ISO / Pollution Control Board Wording

Date: 2026-07-14
Status: **Complete. Not deployed.**

## Scope: 5 pages, not 4

The task named 4 pages (`/trust/`, `/certifications/`, `/ml/recycling/`, `/contact/`). Before declaring the sweep done, ran the source-wide search Task 4 specifies and found a **5th page with the same unqualified claim**: `/about/` ("Our recycling and data destruction processes follow ISO 14001:2015-aligned environmental management practices, and we operate under Pollution Control Board authorization..."). Fixed it too, since leaving it would have meant the sweep's own stated expectation — "no unverified certification/authorization claim remains in rendered public pages" — was false the moment `/about/` was checked.

## Pages changed

| Page | What changed |
| --- | --- |
| `/trust/` | FAQ answer (1) + "Our compliance approach" body section — both softened |
| `/certifications/` | 2 of 3 FAQ answers + both body sections ("Environmental management," "Pollution control authorization") — softened. 3rd FAQ answer also adjusted (removed the implicit promise that specific certificates definitely exist) |
| `/ml/recycling/` | The "അനുസരണം (Compliance)" section — full Malayalam rewrite |
| `/contact/` | "Documentation requests" section — removed the `(ISO 14001:2015 / Pollution Control Board authorization)` parenthetical and the "we'll arrange it" promise |
| `/about/` (not in original scope, found during the sweep) | "Compliance" section — softened |

`/recycling/` (already fixed in the prior turn, commit `a274774`) is unchanged this pass.

## Claims removed/softened

Removed or reworded everywhere found:
- "ISO 14001:2015-aligned" / "ISO 14001:2015 environmental management practices"
- "we operate under Pollution Control Board authorization"
- "Do you have Pollution Control Board authorization? ... Yes"
- The `(ISO 14001:2015 / Pollution Control Board authorization)` parenthetical on `/contact/`

Replaced with the two safe-wording variants supplied: the longer version ("Our recycling process follows documented environmental handling practices, with pickup, sorting and documentation support depending on the service type...") for body sections, the shorter version for FAQ answers and the `/contact/` mention.

Two FAQ **questions** were also reworded (not just answers), because the originals were leading yes/no questions that presupposed the claim ("Is Ewaste Kochi ISO certified?", "Do you have Pollution Control Board authorization?") — answering them any other way while keeping the question verbatim would have read as evasive rather than genuinely softened. New questions ask what practices/documentation are followed, which the new answers address honestly. This is a content change within the existing FAQ slot, not a structural change to the page (same section, same number of FAQs, same heading).

## Schema fields updated

`/trust/` and `/certifications/` both use the `Faq.astro` component, which generates `FAQPage` JSON-LD directly from the same `faqItems` array rendered on the page — so editing the answer text updates both the visible copy and the schema in one place, by construction. Verified directly against the built output (not assumed): fetched both pages' `FAQPage` schema, extracted every `acceptedAnswer.text`, and confirmed none contain "ISO 1400", "Pollution Control Board authoriz", "CPCB authoriz", or "KSPCB authoriz". Confirmed clean on both.

## Malayalam page status

`/ml/recycling/`'s Compliance section was rewritten in Malayalam preserving the English safe wording's meaning (documented environmental handling practices; pickup/sorting/documentation support depending on service type; contact before pickup for business/ITAD compliance documentation) — no mention of ISO, CPCB, KSPCB, or Pollution Control Board authorization. Rendered output checked directly and confirmed. Per this project's standing, already-documented caveat (see `PROJECT_TRACKER.md` Known Risks — "Malayalam content is AI-written, not yet native-speaker reviewed"), this new Malayalam text carries the same caveat: functionally correct and meaning-preserving, but not verified by a fluent Malayalam speaker for natural phrasing. Not a new limitation introduced by this patch — it applies to all Malayalam content on the site already.

## Source sweep result

Searched all of `src/pages/**/*.astro` for: `ISO 14001`, `ISO certified`, `Pollution Control Board authoriz`, `CPCB authoriz`, `KSPCB authoriz`, `government authoriz`, `authorized recycler`, `certified recycler`.

3 files still contain matches — all reviewed individually and confirmed to be **general educational/regulatory context, not a claim about Ewaste Kochi**, per Task 4's explicit exception:
- `blog/e-waste-collection-near-me/index.astro` — "Do you operate under Pollution Control Board authorization?" is a question the post tells the *reader* to ask of any prospective recycler, not a claim about Ewaste Kochi's own status.
- `blog/e-waste-management-rules-2022/index.astro` — "Formal disposal goes through registered, authorized recyclers..." is a general definition of the formal/informal disposal distinction in an educational post about the E-Waste Management Rules, not a claim about Ewaste Kochi specifically.
- `blog/what-is-epr-in-e-waste/index.astro` — references the real Central Pollution Control Board (CPCB) as the government body that publishes official EPR guidance, and directs readers to CPCB's own resources — factual information about a real government body, not a claim about Ewaste Kochi.

## Built-output sweep result

Built (60 pages) and swept `dist/**/*.html` for the same pattern set. **1 hit**, exactly the one confirmed-safe occurrence above (`e-waste-collection-near-me`'s "questions to ask" checklist item). **0 unsafe claims about Ewaste Kochi remain anywhere in the rendered site.**

## Validation result

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (104 files) |
| `npm run build` | 60 pages |
| `npm run validate` | **526/526** passed |
| `FAQPage` schema vs. visible content (`/trust/`, `/certifications/`) | Verified identical — schema generated from the same data as visible copy, no drift possible by construction, independently confirmed against built HTML |
| Site-wide broken-link sweep | 0 |

## Production recommendation

**Clear to proceed to Phase 2L.** This was the one outstanding content-trust item; it's now resolved across every page it appeared on (5, not the originally-scoped 4), in both languages, in both visible copy and structured data. Not deployed, not submitted to GSC — per the task's own instruction, stopping here.
