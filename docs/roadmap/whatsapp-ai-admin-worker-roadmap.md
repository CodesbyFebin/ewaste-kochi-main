# WhatsApp AI Admin Worker — Stage 2 Roadmap

Status: **planning document only. Nothing in this file is implemented.** This describes what a real, automated WhatsApp follow-up system would require, so a future phase can build it deliberately instead of faking it inside a static site.

## Why this is Stage 2, not Stage 1

Stage 1 (`src/components/LeadFunnelChatbot.astro`, `src/scripts/leadFunnelChatbot.ts`) is a pure frontend decision tree: it collects structured answers and hands off to `wa.me` with a prefilled message. That's the limit of what a static site with no backend, no database, and no paid API can honestly do.

Everything past that — automatic follow-up, tracking whether a lead replied, reminding a lead who went quiet, reporting lead status to staff — requires state that outlives a single page load, which means a real backend. There is no way to fake this inside client-side JavaScript without either lying about what happens (pretending a `localStorage` entry is a "backup") or silently failing.

## What WhatsApp's platform actually requires for automation

WhatsApp's Business Platform (Cloud API) draws a hard line around a **24-hour customer service window**:

- Once a customer messages the business, the business can send free-form replies for 24 hours.
- After 24 hours of no customer-initiated message, the business can **only** send pre-approved **message templates** — free-form messages are rejected by the platform.
- Templates must be submitted to Meta for approval before use, and must not be used to send unsolicited marketing without opt-in.
- Inbound messages and delivery/read status arrive via **webhooks**, not polling — the backend needs a publicly reachable HTTPS endpoint to receive them.
- Using the Cloud API requires a Meta Business/WhatsApp Business Account, phone number registration, and (usually) a Business Solution Provider or direct Meta developer setup.

This means "automatic next-day follow-up if the lead hasn't replied" is only possible via an **approved template message**, sent by backend code reacting to elapsed time — not by more frontend JavaScript.

## Recommended architecture

```
Website chatbot (Stage 1, exists today)
        │  wa.me handoff
        ▼
Lead lands in owner's WhatsApp inbox (human-operated, today)
        │
        ▼  (Stage 2, not built)
Backend database (Supabase or PostgreSQL)
        │
        ▼
WhatsApp Cloud API (outbound template messages)
        │
        ▼
Webhook receiver (inbound replies + delivery/read status)
        │
        ▼
Admin worker / dashboard (lead status, follow-up queue)
        │
        ▼
Human pickup/sales team (final action: schedule pickup, quote, close)
```

## Recommended backend

**Supabase** (managed Postgres + auth + edge functions) is a reasonable default for a business this size — no dedicated ops team needed, generous free tier, and edge functions can serve as the webhook receiver without a separate server to run 24/7. A self-hosted PostgreSQL + small Node/Python service is the alternative if there's a reason to avoid a third-party platform.

### Suggested tables

```sql
leads (
  id, lead_id, created_at, page_path, page_title, flow_type, language,
  pickup_type, item_details, item_category, condition, quantity, location,
  preferred_time, data_destruction_needed, business_type, notes,
  whatsapp_message, status
)

lead_events (
  id, lead_id, event_type, event_payload, created_at
  -- event_type: 'created' | 'whatsapp_opened' | 'inbound_reply' |
  --             'template_sent' | 'status_changed' | 'note_added'
)

follow_up_tasks (
  id, lead_id, due_at, task_type, status, created_at, completed_at
  -- task_type: 'next_day_follow_up' | 'quote_reminder' | 'manual_check'
  -- status: 'pending' | 'sent' | 'skipped' | 'failed'
)
```

### Lead status lifecycle

```
new → contacted → quoted → pickup_scheduled → picked_up → closed
                                                        └→ lost
                (needs_follow_up can apply at any stage before closed/lost)
```

## What the webhook receiver needs to do

1. Verify Meta's webhook signature (required, not optional — an unverified webhook endpoint can be spoofed).
2. On inbound message: match the sender's phone number to a lead (or create a new untracked-lead record if no match), log a `lead_events` row, reset the 24-hour window.
3. On delivery/read status: log to `lead_events` for visibility, not for decision-making (status webhooks are best-effort, not guaranteed).
4. Never send an outbound message directly from the webhook handler for a lead outside the 24-hour window — that must go through the approved-template path.

## Message templates needed before any automated follow-up ships

Each of these must be submitted to Meta and approved before use — draft wording only, not final:

| Template name | Purpose | Trigger |
|---|---|---|
| `pickup_follow_up_24h` | "Following up on your e-waste pickup request — still need help?" | 24h after lead created, no reply |
| `quote_follow_up_24h` | "Following up on your scrap price quote request." | 24h after quote-flow lead, no reply |
| `pickup_confirmed` | Pickup slot confirmation with date/time | Staff marks lead `pickup_scheduled` |
| `certificate_ready` | "Your Certificate of Destruction is ready." | Staff marks a data-destruction lead complete |

## Consent and opt-in

- The Stage 1 consent line ("By continuing to WhatsApp, you agree to share these details...") covers the initial handoff, not ongoing marketing.
- Before sending any template message beyond direct transactional follow-up on a lead the person themselves initiated, WhatsApp's policies require the business to have a documented opt-in — simply messaging `wa.me` once is not blanket consent for indefinite future marketing messages.
- Any future marketing-style template (not transactional follow-up) needs its own explicit opt-in capture, separate from the lead form.

## Admin dashboard (not built)

A minimal internal view for staff would need: a list of leads by status, the ability to change status manually, a view of `lead_events` per lead (did they reply, when), and a way to see pending `follow_up_tasks`. This does not need to be fancy — a simple authenticated internal page reading from the same Supabase tables would cover it.

## Data retention

Not decided yet. Recommend deciding, before building any of this, how long lead data (names, phone numbers, item details) is retained after a lead is closed or lost, consistent with the DPDP Act 2023 obligations already documented for corporate ITAD clients elsewhere on this site (`/itad/`, `/trust/`) — a business collecting personal data from its own leads has the same data-fiduciary obligations it advises its corporate clients about.

## Explicit non-goals until this is built

- No claim anywhere on the site that follow-up is automated, that leads are "tracked," or that a response is guaranteed within any specific time — until this infrastructure actually exists and is tested.
- No Cloud API credentials, webhook endpoint, or backend database should be added to this repository until this roadmap is reviewed and a specific implementation phase is explicitly requested.

## Out of scope note (2026-07-07)

A separate "12-agent AI swarm" business-automation concept (marketing/pricing/logistics/finance agents, an "orchestrator," a "dashboard.html") was shared alongside the request that produced this roadmap. It does not correspond to anything in this repository — no orchestrator, dashboard, or agent code exists here. If that broader automation concept is something you actually want to pursue, it would be a separate, much larger initiative (its own backend, its own architecture decisions, its own explicit scoping) — not an extension of this WhatsApp follow-up roadmap, and not something to fold in silently.
