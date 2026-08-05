# Placeholder Fill Sheet — Ship-in / Donation Content Migration

Every placeholder in the quarantined drafts below refers to an operational fact
that must be documented before the page can be promoted to `src/pages/` and made
indexable. Fill in the "Value" column and reply with this table; I'll run the
find-and-replace across all drafts in one pass.

Pages currently using these placeholders:
- `.content-quarantine/generated/blog/where-to-donate-electronics/index.astro`
  (more pages will be added to this list as they're drafted)

---

## Fill me in

| # | Placeholder | Suggested default (safe, honest) | Your value |
|---|---|---|---|
| 1 | `{{PICKUP_TIMELINE_KOCHI}}` | `24-48 hours` | |
| 2 | `{{PICKUP_TIMELINE_PANINDIA}}` | `24-72 hours depending on pincode (Shiprocket SLA)` | |
| 3 | `{{PINCODE_EXCLUSIONS_STATEMENT}}` | `Ship-in is available across most Indian pincodes via Shiprocket. Coverage exclusions apply for J&K, Ladakh, and some Northeast pincodes where the courier network doesn't reach — WhatsApp your pincode and we confirm eligibility before scheduling.` | |
| 4 | `{{DATA_ERASURE_STATEMENT}}` | `We ask every donor to perform a full factory reset and sign out of iCloud / Google / Microsoft accounts before handover or shipping. For ship-in donations this is your responsibility before the courier collects — we cannot recover accounts locked to a previous owner. For Kochi doorstep pickup, our team can walk you through the wipe on-site if you haven't done it. We recommend not shipping any device that still has personal data on it.` | |
| 5 | `{{COD_POLICY}}` | `Certificate of destruction available on request for laptops and tablets, at no charge, once the device is confirmed unusable for donation and routed to recycling.` | |
| 6 | `{{DONATION_PARTNERS}}` | *(requires actual named partners — see 2026-08-04 confirmation)* | |
| 7 | `{{ACCEPTED_DEVICE_CRITERIA}}` | `laptops less than about 7 years old that boot to a login screen; phones less than about 5 years old with a working screen and battery; tablets less than 5 years old with usable battery life. Cosmetic wear is fine. Broken screens, dead batteries, or won't-power-on flag as recycling instead.` | |
| 8 | `{{UNSUITABLE_DEVICE_HANDLING}}` | `if the device isn't suitable for donation, it routes to certified recycling and we message you within 24 hours to let you know. Nothing goes to general waste.` | |
| 9 | `{{DONATION_RECEIPT_PROCESS}}` | *(business decision — see options below)* | |

## Options for #9 — Donation receipt

Pick one policy and I'll bake it into the fill:

- **A. No receipt** — "We do not currently issue formal donation receipts. If you need one for CSR/tax purposes, mention it upfront and we'll confirm case-by-case."
- **B. Simple acknowledgement** — "You receive a WhatsApp acknowledgement listing the devices donated, once we confirm they've reached the partner. No formal tax receipt."
- **C. Formal receipt** — "Formal donation receipt issued for laptops, tablets, and bulk donations of 3+ devices. Sent by email within 5 business days. Not tax-deductible unless the receiving partner is a registered 80G organization."

## Options for #6 — Donation partners

You confirmed 2026-08-04 that named partners exist. Please supply:
- Partner organization names (2-4 that we can name publicly)
- Type of each (school, NGO, community program)
- Whether they accept devices from any donor or only from vetted flows
- If any partner requires 80G / registration disclosure

If any partner asks NOT to be named publicly, we omit them and use "school and community partners in Kerala" as a generic reference.

---

## Once filled

Reply with the completed table (or partial — I can promote pages that have all
their placeholders resolved even if others are still open). Batch find-and-
replace runs across every quarantined draft, then each page moves from
`.content-quarantine/generated/blog/{slug}/index.astro` →
`src/pages/blog/{slug}/index.astro`, gets its route registered in
`src/data/routes.ts`, gets a `dateModified` update, and ships in the next
deploy.
