# Phase 2I-A — Lead Funnel Chatbot

Date: 2026-07-07
Status: **Complete.** No new routes, no deploy. Route/sitemap/content-index counts remain 43. Validation extended and green (469/469).

## Files created/modified

| File | Purpose |
|---|---|
| `src/types/lead.ts` | `Lead` interface + `FlowType` union — the structured shape of a completed funnel submission. |
| `src/scripts/leadFunnelChatbot.ts` | The entire flow engine: 8 flow definitions (questions, options, message templates), state machine, DOM rendering, WhatsApp handoff, localStorage lead save. No LLM calls, no external API, no dependencies beyond `src/data/site.ts`. |
| `src/components/LeadFunnelChatbot.astro` | Mounts the root div, imports the script, scoped styles reusing the site's existing `--color-*` design tokens (so it matches light/dark theme automatically), plus a `<noscript>` fallback (direct WhatsApp + call links). |
| `src/layouts/Layout.astro` | Added one line: `<LeadFunnelChatbot />` before `</body>` — since every one of the 43 pages already shares this one layout, this makes the chatbot appear globally without touching any individual page. |
| `docs/roadmap/whatsapp-ai-admin-worker-roadmap.md` | Stage 2 plan (backend, WhatsApp Cloud API, webhooks, follow-up automation) — documentation only, nothing implemented. |
| `scripts/validate-seo-v2.ts` | 5 new automated checks (see below). |

## Flows implemented (all 8, as specified)

1. **Book a pickup** — 6 steps (pickup type, items, quantity, location, preferred time, data-destruction need).
2. **Scrap price quote** — 5 steps, ends with the required safe-wording notice before WhatsApp handoff: *"Final quote depends on inspection, item condition, quantity, working status, pickup location and current market rate."*
3. **Sell old electronics** — 6 steps, message explicitly invites the user to send photos on WhatsApp (per spec, since no in-chat photo upload exists).
4. **Data destruction** — 5 steps, ends with: *"Documentation available on request. Suitable method depends on device type and inspection."*
5. **Battery recycling** — 4 steps, ends with the safety warning: *"Damaged, swollen or leaking batteries should not be mixed with regular waste. Handle carefully and avoid heat, puncture or pressure."*
6. **Business / ITAD pickup** — 6 steps (org type, asset type, count, inventory availability, data-destruction need, location/contact).
7. **Check my service area** — 2 steps, then shows quick links to the 4 real built location pages (`/locations/`, `/locations/kakkanad/`, `/locations/ernakulam-south/`, `/locations/kalamassery/`) — no unbuilt city page is ever linked.
8. **Malayalam support** — shows the exact Malayalam greeting provided in the instructions verbatim (not paraphrased or extended — this project's Malayalam copy has been flagged for native-speaker review since Phase 1.5, so no new Malayalam text was invented beyond what was explicitly supplied). Selecting one of the 4 options routes into the matching English flow (pickup / scrap-price / battery-recycling / data-destruction) tagged `language: "ml"`; the final WhatsApp message is prefixed with the Malayalam greeting line, then the same structured English field list — a deliberately conservative "mixed format" that doesn't fabricate additional unreviewed Malayalam field labels.

Where the instructions didn't specify quick-reply options for a step (e.g., some "Quantity?" and "Location?" steps), those became free-text inputs, consistent with how the instructions themselves distinguished free-text steps (no "Options:" sub-list) from choice steps elsewhere in the same spec.

## Data collected

Every completed flow builds a `Lead` object (`src/types/lead.ts`): `leadId`, `timestamp`, `pagePath`, `pageTitle`, `flowType`, `language`, `whatsappMessage`, plus whichever of `pickupType` / `itemDetails` / `itemCategory` / `condition` / `quantity` / `location` / `preferredTime` / `dataDestructionNeeded` / `businessType` / `notes` that flow's steps populated.

**Not collected, per instructions**: Aadhaar, PAN, passwords, bank details. Location prompts ask for "area" (e.g. "Kakkanad", "Edappally"), never a full street address — no field invites a complete home address.

## Privacy and consent

Every flow shows this line before the WhatsApp button, exactly as specified: *"By continuing to WhatsApp, you agree to share these details with Ewaste Kochi so we can respond to your pickup or quote request."* The user must click through to WhatsApp themselves — nothing auto-sends or auto-opens WhatsApp without that click.

## Lead backup behavior (Stage 1 — honest, not pretend)

No backend endpoint exists anywhere in this codebase (confirmed again during this phase — zero environment variables, zero `fetch()` calls to any lead-capture service). So, per instructions:
- The completed `Lead` object is saved to `localStorage` under `ewLeadFunnel:lastLead`, for the visitor's own browser convenience only.
- This is explicitly commented in the code and documented here as **not a business backup mechanism** — unlike the reference demo file's `fetch('https://formspree.io/f/YOUR_FORM_ID', ...)` call to a placeholder endpoint that doesn't point anywhere real, this build does not invent a fake POST to a non-existent service.
- The WhatsApp handoff never depends on the localStorage write succeeding (wrapped in try/catch, since private-browsing/quota conditions can throw).

## Stage 2 roadmap summary

`docs/roadmap/whatsapp-ai-admin-worker-roadmap.md` documents (not implements): recommended backend (Supabase/PostgreSQL), 3 tables (`leads`, `lead_events`, `follow_up_tasks`), the lead status lifecycle (`new → contacted → quoted → pickup_scheduled → picked_up → closed`/`lost`), WhatsApp Cloud API's 24-hour customer-service-window rule and the approved-template requirement for anything sent after that window, 4 draft template names, webhook signature-verification requirement, consent/opt-in boundaries (a single `wa.me` click is not blanket marketing consent), and a data-retention note tied to the same DPDP Act 2023 obligations already referenced on `/itad/` and `/trust/`.

## Flagged, not actioned, during this phase

1. **`ewastekochi-chatbot-demo.html`** (a reference file provided alongside this task): calls `https://api.anthropic.com/v1/messages` directly from browser JavaScript with `'anthropic-dangerous-allow-browser-access': 'true'` and **no `x-api-key` header at all**. As written, this is either non-functional (no key = every request 401s) or, if a key is ever pasted into that client-side code, a serious credential-leak risk — anyone who views page source gets a live Anthropic API key and can run up the account's bill or exhaust its quota. This build does not use that architecture: the Stage 1 chatbot here has zero LLM calls and zero API keys of any kind, client-side or otherwise.
2. **A "12-agent AI swarm" business-automation pitch** (MarketingManager/PricingAgent/LogisticsAgent/FinanceAgent/etc., referencing an "orchestrator.py" and "dashboard.html" it claims were already built and tested): none of this exists anywhere in this repository (confirmed by search — no `orchestrator.py`, no `dashboard.html`, no swarm-related file of any kind). It reads as unconnected to this actual codebase/session. Noted in `docs/roadmap/whatsapp-ai-admin-worker-roadmap.md`'s closing section and in `PROJECT_TRACKER.md` as explicitly out of scope for this phase — not built, not assumed to exist, and not something to fold into the WhatsApp Stage 2 plan without being scoped as its own separate initiative first.

## Validation

New checks added to `scripts/validate-seo-v2.ts`:
- `chatbot-link-not-built` / `chatbot-links-all-built` — every literal internal `href` in the chatbot source must match a route in `src/data/routes.ts`. **13 internal links checked, all built** (10 from the allowed list + the 3 location-specific links in the service-area flow).
- `chatbot-links-to-resolved-loser` / `chatbot-links-to-redirect-source` — chatbot must never reference any of the 7 resolved-loser paths or any of the 297 `vercel.json` redirect sources.
- `chatbot-forbidden-claim` — regex sweep for "guaranteed best price," "guaranteed same-day," "CPCB/KSPCB authorized," "ISO certified," "government authorized," "4.9 rating," "5,000+ customers," and named clients (Infosys/Wipro/Federal Bank) — **0 matches**.
- `chatbot-hardcoded-phone-number` / `chatbot-wrong-whatsapp-number` — confirms no stray phone-number literal exists outside the shared `BUSINESS.whatsapp` constant, and that constant equals `917500555454`.
- `chatbot-added-no-routes` — confirms no route matching "chat" or "lead" was added to the registry.

```
npx astro check   → 0 errors, 0 warnings, 0 hints
npx astro build   → 43 pages (unchanged)
npm run validate  → 469 checks passed, 0 failures (up from 464 — 5 new chatbot checks)
```

Route registry: 43 (unchanged). Sitemap total across all 6 sub-sitemaps: 43 (unchanged). `content-index.json` page count: 43 (unchanged).

### Manual end-to-end smoke test (real browser, not just HTML inspection)

No browser tool is available directly in this environment, so a headless Chromium was installed via Playwright specifically for this test (kept isolated in the session scratchpad, not added to the project's `package.json`) and driven against a local `astro preview` server:

- Full **Book a Pickup** flow (6 steps) end to end → correct question sequence, correct final WhatsApp URL (`https://wa.me/917500555454?text=...`), correctly decoded message, correct `localStorage` lead object.
- **Malayalam flow** → greeting shown verbatim, routed into Battery Recycling, final message correctly prefixed with the Malayalam line + structured English detail.
- **Service area flow** → quick links rendered exactly as the 4 built location URLs.
- **Sell Old Electronics flow** → correct message including the "I can send photos on WhatsApp" line; "Start over" button correctly returns to the main menu.
- **Mobile viewport** (375×667) → no horizontal overflow, panel and launcher both usable; screenshot confirmed clean layout.
- **Escape key** → closes the panel and returns focus to the launcher.
- **Zero console/page errors** across every test run.

## Remaining blockers for full automation (Stage 2)

- No WhatsApp Business Platform / Cloud API account, phone number registration, or approved message templates exist yet.
- No backend/database exists to track lead status or elapsed time since first contact.
- No webhook endpoint exists to receive inbound replies or delivery status.
- A documented opt-in/consent mechanism for any future marketing-style (non-transactional) message would need to be designed separately from this phase's transactional consent line.

None of this blocks Stage 1, which is fully functional today using only `wa.me` links.

## Not done in this phase (explicitly out of scope)

- No WhatsApp Cloud API, webhooks, or backend of any kind.
- No new SEO pages, no route/sitemap/content-index count change.
- No production deploy, no DNS change.
- No action on the reference chatbot demo file or the AI-swarm pitch beyond flagging them above.
