#!/usr/bin/env python3
"""
generate-batch-gsc-gap.py
=========================

Batch driver over scripts/generate-pillar-page.py for 9 blog posts that
correspond to GSC-tracked URLs with real impressions but no content yet
(pulled from data/gsc-url-presence-gap-map.json, Kochi region, imp>=20).

Kept separate from generate-batch-blogs.py so the GSC-gap batch is easy
to review as its own unit before promotion.

9 blog specs — all writing to /blog/<slug>/, sitemap_group="blog":

Content gaps (GSC demand + no equivalent page anywhere)
  1. pcb-and-motherboard-scrap-buyers-in-kochi         (~48 imp)
  2. nist-800-88-vs-dod-5220-22-explained              (~40 imp)
  3. server-decommissioning-checklist                  (~33 imp)
  4. electronics-recycling-in-edappally                (~26 imp) [location helper]
  5. how-to-choose-an-itad-provider                    (~20 imp)

Loosely covered by a pillar but user chose to build distinct blog posts
at the search-term URLs (rather than 301-redirect the old .html paths)
  6. e-waste-laws-in-kerala                            (~46 imp) [regulatory angle]
  7. mobile-recycling-in-kochi                         (~35 imp)
  8. sell-old-phone-in-kochi                           (~31 imp)
  9. battery-recycling-in-vyttila                      (~21 imp) [location helper]

Usage:
    python3 scripts/generate-batch-gsc-gap.py --validate-only
    python3 scripts/generate-batch-gsc-gap.py             # quarantine
    python3 scripts/generate-batch-gsc-gap.py --live --register-routes --force
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
GENERATOR = SCRIPT_DIR / "generate-pillar-page.py"
LAST_UPDATED = "2026-07-28"

CORE = {
    "home":           ("/",                            "Home — Ewaste Kochi"),
    "recycling":      ("/recycling/",                  "General e-waste recycling"),
    "battery":        ("/battery-recycling/",          "Battery recycling"),
    "pickup":         ("/pickup/",                     "Pickup — how doorstep collection works"),
    "sell":           ("/sell-electronics/",           "Sell electronics"),
    "data":           ("/data-destruction/",           "Data destruction"),
    "hdd":            ("/hard-drive-shredding/",       "Hard drive shredding"),
    "itad":           ("/itad/",                       "ITAD for offices"),
    "laptop":         ("/laptop-recycling/",           "Laptop recycling"),
    "computer":       ("/computer-recycling/",         "Computer recycling"),
    "mobile":         ("/mobile-phone-recycling/",     "Mobile phone recycling"),
    "corporate":      ("/corporate-e-waste-recycling/", "Corporate e-waste recycling"),
    "office_pickup":  ("/office-e-waste-pickup/",      "Office e-waste pickup"),
    "scrap":          ("/e-waste-scrap-prices-kochi/", "Scrap prices"),
    "rules":          ("/e-waste-rules-2022-india/",   "E-waste rules 2022 (India)"),
    "server":         ("/server-recycling-kochi/",     "Server recycling"),
    "locations":      ("/locations/",                  "Locations served"),
    "kakkanad":       ("/locations/kakkanad/",         "Kakkanad"),
    "edappally":      ("/locations/edappally/",        "Edappally"),
    "infopark":       ("/locations/infopark-kochi/",   "Infopark Kochi"),
    "phone_buyback":  ("/phone-buyback/",              "Phone buyback"),
    "sell_mobile":    ("/sell-old-mobile/",            "Sell old mobile"),
    "batt_pickup":    ("/battery-pickup/",             "Battery pickup"),
    "it_asset":       ("/it-asset-disposal/",          "IT asset disposal"),
    "rules_kerala":   ("/blog/e-waste-rules-in-kerala/", "E-waste rules in Kerala (practical guide)"),
    "blog":           ("/blog/",                       "Blog"),
    "contact":        ("/contact/",                    "Contact"),
    "trust":          ("/trust/",                      "Trust and compliance"),
}

def rel(*items) -> list[dict[str, str]]:
    return [{"path": p, "label": l} for p, l in items]

def _blog_route(pri: float = 0.7) -> dict:
    return {"changefreq": "monthly", "priority": pri,
            "type": "blog", "sitemap_group": "blog", "lang": "en-IN"}


# ---------------------------------------------------------------------------
# 1. PCB and motherboard scrap buyers in Kochi (48 imp) — scrap-value explainer
# ---------------------------------------------------------------------------

def spec_pcb_motherboard_scrap() -> dict:
    return {
        "path": "/blog/pcb-and-motherboard-scrap-buyers-in-kochi/",
        "title": "PCB & Motherboard Scrap Buyers in Kochi (Practical Guide)",
        "description": "PCB and motherboard scrap in Kochi — who actually buys it, what condition matters, how the material value is estimated, and how to book a pickup.",
        "h1": "PCB and Motherboard Scrap Buyers in Kochi",
        "breadcrumb_label": "PCB & Motherboard Scrap",
        "service_type": "PCB and motherboard scrap collection guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Printed circuit boards and motherboards are the highest-value fraction of most "
            "e-waste streams — they carry small quantities of recoverable copper, tin, "
            "sometimes gold and silver on connectors. This blog covers who actually buys "
            "PCB and motherboard scrap in Kochi, what condition matters for a real quote, "
            "how the material value is estimated, and how to book a pickup without ending "
            "up at a roadside scrap dealer who lowballs everything."
        ),
        "direct_answer": (
            "For PCB and motherboard scrap in Kochi, WhatsApp Ewaste Kochi with the board "
            "types, approximate weight, and a photo or two. The team returns a "
            "condition-based estimate based on board category, then confirms at physical "
            "inspection at pickup. Doorstep pickup applies for eligible collections; "
            "buyback payment is on the spot when the confirmed quote is accepted."
        ),
        "key_takeaways": [
            "PCBs and motherboards are the highest-value fraction in typical e-waste.",
            "Board category matters more than raw weight — CPU boards outclass generic PCBs.",
            "Condition-based estimate from photos + specs; confirmed quote at pickup.",
            "Skip roadside scrap dealers if you want a real category-aware quote.",
            "Doorstep pickup covers Kochi and the wider Ernakulam district.",
        ],
        "accepted_items": {
            "columns": ["Board type", "Value tier", "Notes"],
            "rows": [
                ["Server / workstation motherboards", "High", "Dense connectors, larger boards"],
                ["Desktop PC motherboards", "Medium-high", "Common; CPU socket condition matters"],
                ["Laptop motherboards", "Medium", "Compact; RAM and CPU often integrated"],
                ["RAM sticks, GPU cards", "Medium-high", "Sold as complete cards typically"],
                ["Mixed consumer PCBs (TV, router, appliance)", "Low-medium", "Higher volume, lower per-kg value"],
                ["Broken boards, obvious damage", "Low", "Material recovery only, no buyback"],
            ],
        },
        "how_to_steps": [
            {"name": "Sort your boards by rough category",
             "text": "Motherboards in one pile, RAM sticks in another, GPU cards in another, generic PCBs (from old routers, TVs, appliances) in a fourth pile. Doesn't need to be perfect."},
            {"name": "Take clear photos of each category",
             "text": "Overhead shots showing the pile. Individual close-ups of larger or unusual boards. This lets the team return a category-aware estimate, not a generic per-kg number."},
            {"name": "Message the estimate request",
             "text": "WhatsApp Ewaste Kochi with the photos, rough weight by category, and your Kochi address. Include quantity notes if you have multiples of the same type."},
            {"name": "Receive the condition-based estimate",
             "text": "Estimate returned via WhatsApp, broken down by board category. If the range works for you, agree a doorstep slot."},
            {"name": "Doorstep pickup + on-the-spot verification",
             "text": "Team arrives, verifies the boards against the photos, confirms the quote at physical inspection, and pays out on acceptance. Decline without obligation if the confirmed quote doesn't match the estimate."},
        ],
        "sections": [
            {"h2": "Why board category matters more than weight",
             "body": (
                "Roadside scrap dealers typically price PCBs by weight — a flat per-kg number "
                "regardless of what's on the board. That's convenient for them and unfair to "
                "you when your pile includes high-value boards mixed with generic ones.\n\n"
                "A category-aware quote splits the pile:\n\n"
                "Server and workstation motherboards carry dense, high-quality connectors "
                "and more layers of copper. They price at the top tier.\n\n"
                "Desktop and laptop motherboards are the workhorse category — most homes and "
                "small offices dispose of these. Mid-tier value; CPU socket condition and "
                "board age matter.\n\n"
                "RAM sticks and GPU cards trade as complete components, not raw PCBs. If they "
                "still work, they may qualify for a resale route (higher value) instead of "
                "material recovery.\n\n"
                "Generic consumer PCBs (from old routers, TVs, appliances, chargers) are lower "
                "value per kg but often make up bulk. Still worth including in the pickup.\n\n"
                "Ask for a category-broken quote if you're bringing a mixed batch."
             )},
            {"h2": "What condition actually changes the number",
             "body": (
                "For high-value boards, condition changes the estimate significantly:\n\n"
                "Complete boards vs stripped — a motherboard with the CPU socket, capacitors, "
                "and connectors intact is worth more than a stripped shell. If you've already "
                "pulled the CPU, mention it — the quote adjusts.\n\n"
                "Water damage, corrosion, burnt spots — visible damage typically drops the "
                "quote to the material-recovery baseline. Not a dealbreaker, just an "
                "adjustment.\n\n"
                "Age — a modern server board (recent generation) is worth more than a "
                "twenty-year-old vintage board with obsolete connectors, even if both weigh "
                "the same.\n\n"
                "Quantity — larger batches often price slightly better because handling and "
                "transport per-kg drop. If you have 5 kg+ of PCBs, mention the volume."
             )},
            {"h2": "Skip the roadside scrap dealer route for PCBs",
             "body": (
                "Roadside scrap dealers exist in Kochi and buy PCBs — but they typically:\n\n"
                "Quote a flat per-kg rate that lumps high-value boards with generic ones — "
                "you lose the premium for good motherboards.\n\n"
                "Don't do certified material recovery — the actual recycling stream is opaque, "
                "which matters if you want compliance documentation.\n\n"
                "Don't provide any documentation — no pickup acknowledgement, no invoice, no "
                "trace. Fine for a one-off sale, poor for a business or repeat volume.\n\n"
                "For occasional home clearouts, either route works. For repeat volume — "
                "computer shops, IT service providers, refurbishers, offices with recurring "
                "hardware refresh — go with a category-aware authorised recycler for both "
                "the better rate and the documentation trail."
             )},
        ],
        "faqs": [
            {"q": "How much is a motherboard worth as scrap?",
             "a": "Depends on the board category. A modern server or desktop motherboard sits in the mid-to-high tier; a generic consumer PCB from a router or appliance is much lower. Send photos for a real category-aware estimate rather than a flat per-kg number."},
            {"q": "Do I get paid at pickup or later?",
             "a": "On the spot at pickup, once the confirmed quote (based on physical inspection) is agreed. Cash, UPI, or bank transfer — your preference. No advance payments and no wait-and-see follow-ups."},
            {"q": "Will you buy loose CPU chips, RAM sticks, GPUs on their own?",
             "a": "Yes. Loose CPUs price by generation and condition; RAM sticks price by capacity, speed, and working status; GPUs price by model and working status. Send photos so the estimate can factor in specs, not just weight."},
            {"q": "What's the minimum quantity to book a pickup for PCB scrap?",
             "a": "No hard minimum — a single motherboard is fine if you're on the standard pickup route. Small quantities usually combine with a nearby scheduled route rather than a dedicated visit. Larger batches (5 kg+) usually get a dedicated slot."},
            {"q": "Do you take PCBs with visible damage — water, burns, corrosion?",
             "a": "Yes, still accepted. Damaged boards go to material recovery rather than component resale, so the quote drops to the material-recovery baseline rather than the premium tier. Free pickup still applies."},
            {"q": "Can I get a GST invoice for a bulk PCB pickup?",
             "a": "Yes — flag when booking that you need a GST invoice. Standard for business pickups. Personal pickups get a pickup acknowledgement by default; GST invoice available on request."},
        ],
        "related_pages": rel(
            CORE["scrap"], CORE["computer"], CORE["laptop"],
            CORE["recycling"], CORE["itad"], CORE["pickup"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I have some PCBs / motherboards to sell as scrap — details below:",
    }


# ---------------------------------------------------------------------------
# 2. NIST 800-88 vs DoD 5220.22-M explained (40 imp)
# ---------------------------------------------------------------------------

def spec_nist_vs_dod() -> dict:
    return {
        "path": "/blog/nist-800-88-vs-dod-5220-22-explained/",
        "title": "NIST 800-88 vs DoD 5220.22-M — Which Data Wipe Standard to Choose",
        "description": "NIST 800-88 vs DoD 5220.22-M explained plainly — what each standard actually specifies, when each applies, and what to ask an ITAD provider for.",
        "h1": "NIST 800-88 vs DoD 5220.22-M — Which Data Wipe Standard to Choose",
        "breadcrumb_label": "NIST 800-88 vs DoD 5220.22-M",
        "service_type": "Data sanitization standards explainer",
        "last_updated": LAST_UPDATED,
        "lede": (
            "If you're commissioning ITAD or data destruction for an office in Kochi and "
            "the vendor keeps throwing around NIST 800-88 and DoD 5220.22-M as if you should "
            "already know the difference — you're not alone. This blog explains what each "
            "standard actually specifies, when each one applies, why the industry has largely "
            "moved to NIST for modern drives, and what to specifically ask your ITAD "
            "provider for so you get sanitisation appropriate to your data."
        ),
        "direct_answer": (
            "For modern drives (any SSD, and most HDDs manufactured in the last decade), "
            "ask for NIST SP 800-88 Rev. 1 sanitisation — either Clear, Purge, or Destroy "
            "level depending on data sensitivity. DoD 5220.22-M's three-pass overwrite is a "
            "legacy standard designed for older magnetic media; it isn't a fit for SSDs and "
            "is overkill for most modern HDDs. For any doubt, Purge or Destroy level under "
            "NIST is the safe choice — the ITAD provider issues a per-drive Certificate."
        ),
        "key_takeaways": [
            "NIST SP 800-88 Rev. 1 is the modern reference — Clear, Purge, or Destroy tiers.",
            "DoD 5220.22-M's three-pass overwrite is legacy; doesn't apply to SSDs.",
            "Match the sanitisation tier to the data sensitivity, not to industry buzzwords.",
            "Per-drive Certificate should list serial + method — insist on it.",
            "Physical destruction (shredding) satisfies the Destroy tier under NIST.",
        ],
        "accepted_items": {
            "columns": ["Standard / method", "Best fit", "What to ask for"],
            "rows": [
                ["NIST 800-88 Clear (single overwrite)", "Low-sensitivity data, drive reused within org", "Software wipe log"],
                ["NIST 800-88 Purge (crypto erase / secure erase)", "Standard business data, SSDs, drives leaving org", "Per-drive certificate"],
                ["NIST 800-88 Destroy (physical destruction)", "High-sensitivity data (financial, medical, legal)", "Serialised shred certificate"],
                ["DoD 5220.22-M three-pass overwrite", "Legacy magnetic HDDs only; largely superseded", "Only if specifically required"],
                ["Degaussing (magnetic erasure)", "Magnetic HDDs, tape media", "Not effective on SSDs"],
                ["Physical shredding", "Any drive, any data sensitivity", "Serialised per-drive certificate"],
            ],
        },
        "how_to_steps": [
            {"name": "Classify your data sensitivity",
             "text": "Low (public / already-published info), Standard (typical business records, customer data), or High (financial, medical, legal, IP)? The sanitisation tier follows this."},
            {"name": "Identify the drive type",
             "text": "SSDs and modern HDDs get NIST 800-88 handling — either Purge (crypto erase) or Destroy (shred). Older magnetic HDDs can technically use DoD 5220.22-M but Purge is faster and equally effective."},
            {"name": "Specify the required tier to the ITAD provider",
             "text": "Say it explicitly: 'NIST 800-88 Purge level per-drive certificate' or 'NIST 800-88 Destroy — physical shredding with serialised certificate'. Written into the SOW if formal."},
            {"name": "Choose on-site or off-site processing",
             "text": "On-site: witnessed at your office, drives don't leave premises intact. Off-site: chain of custody documented, drives processed at the ITAD facility. On-site costs more; matches audit requirements."},
            {"name": "Verify each per-drive certificate",
             "text": "Each certificate should list drive serial, sanitisation method, and date. Match the certificates against your asset register. Store with the audit trail."},
        ],
        "sections": [
            {"h2": "What NIST SP 800-88 Rev. 1 actually says",
             "body": (
                "NIST SP 800-88 Rev. 1 (published 2014, still current) defines three "
                "sanitisation levels — Clear, Purge, and Destroy — chosen based on the data "
                "sensitivity and whether the media is being reused inside the organisation, "
                "leaving the organisation, or being permanently retired.\n\n"
                "Clear applies logical techniques — a single overwrite pass, or a reset "
                "command. Suitable when the drive stays within the organisation and low-"
                "sensitivity data is being cleared for internal reuse.\n\n"
                "Purge applies techniques that render data recovery infeasible even with "
                "state-of-the-art laboratory attacks — cryptographic erase for self-encrypting "
                "drives, ATA Secure Erase for HDDs and SSDs that support it, degaussing for "
                "magnetic media. Suitable when the drive leaves the organisation intact.\n\n"
                "Destroy applies physical destruction — shredding, disintegration, "
                "incineration. The media is unusable afterward. Suitable for high-sensitivity "
                "data or when Purge isn't feasible.\n\n"
                "The choice depends on data + destination, not vendor preference."
             )},
            {"h2": "Why DoD 5220.22-M is largely obsolete",
             "body": (
                "DoD 5220.22-M is the US Department of Defense's older reference — the "
                "well-known 'three-pass overwrite' spec (write zeros, write ones, write "
                "random). It was designed for the magnetic HDDs of that era and works fine "
                "for that hardware.\n\n"
                "The problem: SSDs don't work that way. SSD controllers use wear-levelling "
                "and over-provisioning, so a software overwrite command doesn't necessarily "
                "touch every physical NAND cell where data lived. Three passes of overwrite "
                "on an SSD gives you three passes of writes to whatever cells the controller "
                "chose — not a guaranteed full erasure.\n\n"
                "For SSDs, the correct approach is either cryptographic erase (if the drive "
                "is self-encrypting), ATA Secure Erase (uses the drive's own controller), or "
                "physical destruction — all covered under NIST 800-88.\n\n"
                "DoD 5220.22-M can still satisfy specific contractual requirements that "
                "reference it by name. If a client contract requires it, comply. Otherwise "
                "NIST is the modern default."
             )},
            {"h2": "What to insist on from your ITAD provider",
             "body": (
                "When you're arranging data destruction for an office refresh:\n\n"
                "Written sanitisation method — the SOW should specify which NIST tier "
                "(Clear / Purge / Destroy) or that DoD 5220.22-M applies. Don't leave it "
                "as 'we'll wipe them properly'.\n\n"
                "Per-drive certificates with serial numbers — not a batch certificate for "
                "'20 laptops'. Individual drive-level trace lets you match certificates "
                "against your asset register.\n\n"
                "Chain-of-custody documentation for off-site processing — who received the "
                "drives, at what time, in what condition, with what count.\n\n"
                "Serialised shred certificates for physical destruction — each certificate "
                "lists the drive serial and destruction method (shred, disintegration, etc). "
                "If a drive was on the pickup list but not on the certificates, that's a "
                "reconciliation problem you'd want to catch immediately.\n\n"
                "Photos or video of destruction if on-site witnessed — some clients require "
                "this, and providers set up for it can accommodate."
             )},
        ],
        "faqs": [
            {"q": "Do I need NIST 800-88 or is DoD 5220.22-M fine for my office?",
             "a": "For any office refresh with modern drives (SSDs and recent HDDs), NIST 800-88 is the right reference. DoD 5220.22-M is legacy and doesn't apply to SSDs. If a specific client contract or regulator requires DoD by name, comply — otherwise NIST is the modern default."},
            {"q": "Is cryptographic erase really as safe as physical shredding?",
             "a": "For self-encrypting drives, yes — cryptographic erase destroys the encryption key, rendering the ciphertext unrecoverable. NIST 800-88 explicitly recognises crypto erase at the Purge level. For high-sensitivity data with an auditor who prefers physical evidence, choose Destroy level anyway."},
            {"q": "What's the point of on-site witnessed destruction?",
             "a": "Chain of custody. Drives don't leave your premises intact — the shredder is brought on-site, drives are shredded in front of a nominated witness, the certificates are issued the same day. Costs more than off-site; matches audit and insurance requirements for high-sensitivity data."},
            {"q": "Can degaussing satisfy NIST 800-88 Purge?",
             "a": "For magnetic media (magnetic HDDs, tape) — yes, provided the degausser field strength matches the media coercivity. For SSDs — no, degaussing does nothing because SSD storage is not magnetic."},
            {"q": "How is the per-drive certificate different from a bulk certificate?",
             "a": "A per-drive certificate lists the individual drive serial and its sanitisation method. A bulk certificate says 'we processed 20 drives from your pickup on this date'. The per-drive form lets you reconcile against your asset register; the bulk form does not."},
            {"q": "Who provides NIST 800-88 sanitisation in Kochi?",
             "a": "Authorised ITAD providers with the appropriate equipment (secure-erase workstations, on-site shredders, chain-of-custody paperwork). Ewaste Kochi handles it for offices in Kochi and the wider Ernakulam district — mention the required tier when booking so the correct workflow is planned."},
        ],
        "related_pages": rel(
            CORE["data"], CORE["hdd"], CORE["itad"],
            CORE["it_asset"], CORE["server"], CORE["computer"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I need data sanitisation for an office refresh — questions on NIST vs DoD:",
    }


# ---------------------------------------------------------------------------
# 3. Server decommissioning checklist (33 imp)
# ---------------------------------------------------------------------------

def spec_server_decommissioning() -> dict:
    return {
        "path": "/blog/server-decommissioning-checklist/",
        "title": "Server Decommissioning Checklist for Kochi Data Centres and Offices",
        "description": "Server decommissioning checklist — data sanitisation, physical retirement, chain of custody, and disposal paperwork for Kochi offices and data centres.",
        "h1": "Server Decommissioning Checklist for Kochi Offices",
        "breadcrumb_label": "Server Decommissioning Checklist",
        "service_type": "Server decommissioning guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Decommissioning a server (or a whole rack, or a small server room) is more than "
            "'shut it down and haul it away' — there's data sanitisation, chain of custody, "
            "physical retirement, asset write-off paperwork, and disposal documentation to "
            "line up. This checklist walks a Kochi-based team through the actual sequence, "
            "what documentation to demand from the disposal partner, and how to avoid the "
            "usual gaps (a forgotten drive, an unreconciled certificate, a missing pickup "
            "acknowledgement) that surface later in audit."
        ),
        "direct_answer": (
            "For server decommissioning in Kochi, plan the sequence in this order: back up + "
            "verify → power down → remove and inventory drives → sanitise or shred per NIST "
            "800-88 → physical de-racking → itemised pickup by an authorised ITAD provider → "
            "reconcile certificates against the asset register. Ewaste Kochi handles the "
            "physical pickup + sanitisation + certification portion for offices and data "
            "centres in the Ernakulam district."
        ),
        "key_takeaways": [
            "Sanitise or destroy drives before physical de-racking — not after.",
            "Inventory each drive by serial before it leaves the rack — you'll need it for the certificate reconciliation.",
            "Chain of custody starts at the rack, not at pickup — document handoffs internally too.",
            "Per-drive certificates, not batch certificates, so you can reconcile.",
            "Asset register write-off happens after certificates are received and matched.",
        ],
        "accepted_items": {
            "columns": ["Stage", "What happens", "Documentation"],
            "rows": [
                ["Backup verification", "Confirm data migrated / archived correctly", "Migration sign-off"],
                ["Power down + BIOS disable", "Clean shutdown; iDRAC / iLO wiped", "Internal ticket"],
                ["Drive inventory", "Each drive pulled, serial recorded", "Drive inventory sheet"],
                ["Sanitisation / shredding", "NIST 800-88 Purge or Destroy tier", "Per-drive certificate"],
                ["De-racking", "Server removed from rack, labels retained", "De-racking log"],
                ["ITAD pickup", "Authorised recycler collects, itemised", "Pickup acknowledgement"],
                ["Asset write-off", "Register updated once certificates match", "Auditor-ready trail"],
            ],
        },
        "how_to_steps": [
            {"name": "Confirm backup + migration completion",
             "text": "Any data on the server needs to be migrated / archived and verified before decommissioning starts. Don't power down until the migration owner has signed off that the destination copy is verified."},
            {"name": "Inventory drives by serial before pulling",
             "text": "Open the drive bay, record the drive serial and slot number for each drive still in the rack. This inventory is what you'll reconcile against the sanitisation certificates later."},
            {"name": "Sanitise per NIST 800-88 tier",
             "text": "Choose Clear (single overwrite, low sensitivity) or Purge (crypto erase / secure erase, standard business data) or Destroy (physical shred, high sensitivity) per the data classification. Sanitisation happens with the drives out of the server, on a workstation with the right equipment."},
            {"name": "De-rack and label",
             "text": "Server removed from rack after sanitisation is complete. Retain asset tags and rack position labels — they help with the disposal itemisation and any warranty return."},
            {"name": "Handoff to ITAD provider with itemised acknowledgement",
             "text": "The provider picks up an itemised list of servers + drives (by serial). Pickup acknowledgement signed on the spot. Per-drive certificates follow within a few working days."},
            {"name": "Reconcile and write off",
             "text": "Match every drive serial from your inventory against the sanitisation certificates. Any gaps get chased down immediately. Only after full reconciliation do the assets get written off the register."},
        ],
        "sections": [
            {"h2": "Why sanitisation happens BEFORE de-racking",
             "body": (
                "A common sequencing mistake: pull the servers, ship them to the ITAD "
                "provider, wait for the certificates to come back later. That leaves your "
                "drives outside your custody with residual data on them, in transit, for "
                "hours or days.\n\n"
                "The right sequencing: sanitise (or physically destroy) the drives in-house "
                "before the server leaves your premises. Alternatively, arrange for on-site "
                "witnessed shredding — the ITAD provider brings the shredder to your office / "
                "data centre, drives are destroyed there, only the emptied server chassis "
                "leaves the building.\n\n"
                "Which route depends on volume, budget, and data sensitivity:\n\n"
                "In-house software sanitisation is cheapest and fine for standard business "
                "data — provided your team has the equipment and the process is documented.\n\n"
                "On-site witnessed shredding is the highest-assurance option — costs more, "
                "gives you a signed chain of custody from rack to destruction.\n\n"
                "Off-site processing (drives shipped intact to the provider) is fastest for "
                "your team but weakest for chain of custody — only appropriate for low-"
                "sensitivity data or with an established, trusted vendor relationship."
             )},
            {"h2": "Chain of custody — the piece that gets missed",
             "body": (
                "Every handoff of a drive or a server between the moment it leaves the rack "
                "and the moment it's sanitised is a chain-of-custody event. In practice:\n\n"
                "From the rack to a staging area — who moved it, when, count against the "
                "inventory sheet.\n\n"
                "From staging to the sanitisation workstation — who processed each drive, "
                "which sanitisation tier was applied.\n\n"
                "From sanitisation to the ITAD pickup — count, itemisation, pickup "
                "acknowledgement.\n\n"
                "From ITAD pickup to the disposal facility — the ITAD provider's own chain "
                "of custody, which they should document.\n\n"
                "For high-sensitivity environments (financial services, healthcare, legal, "
                "government), every one of these handoffs is signed off in writing. For "
                "typical corporate environments, the first three are internal (a single "
                "operations team) and only the last two produce external paperwork."
             )},
            {"h2": "Certificates that actually stand up in audit",
             "body": (
                "A certificate that just says 'we sanitised 20 drives from your pickup on "
                "this date' is not audit-ready — you can't map it to your asset register.\n\n"
                "What an audit-ready sanitisation certificate lists:\n\n"
                "Drive serial number (not just capacity / make).\n\n"
                "Sanitisation method (which NIST tier, which tool if software-based).\n\n"
                "Date and location of sanitisation.\n\n"
                "Operator name or ID.\n\n"
                "Any anomalies (a drive that failed to sanitise cleanly and was routed to "
                "physical destruction instead, for example).\n\n"
                "For physical destruction (shredding), the certificate lists the same drive "
                "serial plus the destruction method (shred, disintegration, incineration) "
                "and the shred size / equipment used.\n\n"
                "Insist on this level of detail up-front. Providers set up for enterprise "
                "ITAD produce it as standard; providers new to that segment sometimes push "
                "back — that's a signal to reconsider the choice."
             )},
        ],
        "faqs": [
            {"q": "How long does a typical server decommissioning take?",
             "a": "Depends on scale. A single-server retirement can be done in a day if drives are sanitised in parallel. A rack of 20-40 servers is typically a week's work including inventory, sanitisation, de-racking, pickup, and certificate reconciliation. A full server room (100+ units) is a multi-week planned project."},
            {"q": "Do you handle on-site shredding in Kochi?",
             "a": "For qualifying enterprise pickups — yes, on-site shredding can be arranged with advance scheduling. Requires site access for the shredder unit and a nominated witness from your side. Not standard for small batches; standard for high-sensitivity or high-volume decommissioning."},
            {"q": "What about servers with RAID — do drives need to be broken out of the array first?",
             "a": "Yes. RAID configurations can leave data striped across multiple drives; each drive needs to be sanitised individually. Break the array, mount drives on the sanitisation workstation one at a time, apply the chosen NIST tier per drive."},
            {"q": "Who reconciles the certificates against my asset register?",
             "a": "You do, in-house. The ITAD provider issues the certificates; the reconciliation is your team's audit trail. If the volume is large enough, we can pre-format certificates to match your asset register schema (CSV, Excel, or JSON) — flag the format when booking."},
            {"q": "What happens to the empty server chassis after sanitisation?",
             "a": "Goes to material recovery — steel and aluminium chassis, copper wiring, PSU components, any residual boards. All the standard e-waste recovery streams. Nothing lands in general waste. Certificate of Destruction available on request if the disposal itself needs documenting."},
            {"q": "Can you handle a mixed pickup — servers plus laptops plus desktops?",
             "a": "Yes. Mixed corporate pickups are routine — mixing servers, laptops, desktops, monitors, and networking gear in one scheduled ITAD collection. Each drive category still gets per-drive sanitisation and certification. Combined pickup acknowledgement lists all items."},
        ],
        "related_pages": rel(
            CORE["server"], CORE["itad"], CORE["it_asset"],
            CORE["data"], CORE["hdd"], CORE["corporate"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, we're planning a server decommissioning in Kochi — need ITAD pickup:",
    }


# ---------------------------------------------------------------------------
# 4. Electronics recycling in Edappally (26 imp) — location blog helper
# ---------------------------------------------------------------------------

def _location_blog_spec(*, slug, city, device, service_h1,
                        related_service_link, related_location_link) -> dict:
    return {
        "path": f"/blog/{slug}/",
        "title": f"{service_h1} — Doorstep Pickup",
        "description": f"{service_h1} — Ewaste Kochi doorstep pickup for {city}. Buyback for viable units, free recycling for the rest.",
        "h1": service_h1,
        "breadcrumb_label": service_h1,
        "service_type": f"{device.capitalize()} recycling in {city}",
        "last_updated": LAST_UPDATED,
        "lede": (
            f"{service_h1} is a routine pickup for Ewaste Kochi — WhatsApp with the item "
            f"details and address, the team confirms a doorstep slot, and collects the "
            f"{device} at the confirmed time. This blog covers what's specifically involved "
            f"for {city} pickups, common local scenarios, and what to expect at the doorstep."
        ),
        "direct_answer": (
            f"For {device} recycling in {city}, WhatsApp Ewaste Kochi with the {device} "
            f"details (brand, model, condition), your address, and photos if the {device} "
            f"is bulky or damaged. The team confirms a doorstep pickup slot based on the "
            f"current route through {city}. Pickup is free for eligible collections; "
            f"working recent {device} units may qualify for a condition-based buyback quote."
        ),
        "key_takeaways": [
            f"Doorstep {device} pickup covers {city} on the standard route schedule.",
            f"WhatsApp with brand + model + condition + address for slot confirmation.",
            f"Working recent {device} units may qualify for buyback quote.",
            f"Non-working / older {device} units go to free recycling.",
            f"Data-bearing devices route through data destruction on request.",
        ],
        "accepted_items": {
            "columns": ["Type", "Route", "Notes"],
            "rows": [
                [f"Working recent {device}", "Buyback check first", "Send photos + specs"],
                [f"Working older {device}", "Recycling; sometimes reduced buyback", "Condition-dependent"],
                [f"Non-working {device}", "Free recycling", "No payment; still collected"],
                [f"Physically damaged {device}", "Recycling; data destruction if applicable", "Photo of damage helps"],
                [f"Batches of {device} (office refresh, apartment cleanout)", "Bulk pickup workflow", "Advance scheduling"],
                [f"Accessories (charger, cable, case)", "Batch with the {device}", "Included in same pickup"],
            ],
        },
        "how_to_steps": [
            {"name": f"Message the {device} details + address",
             "text": f"Brand, model, condition, quantity if more than one. Include {city} area / building name / floor for apartment addresses. Photos help for anything bulky or damaged."},
            {"name": "Get slot confirmation",
             "text": f"Team confirms a doorstep slot based on the current pickup route through {city}. Single-item pickups may combine with a nearby route; larger batches usually get a dedicated slot."},
            {"name": "Prepare on the pickup day",
             "text": f"For {device} with data: back up + sign out of accounts + factory reset if you can. For {device} in general: group items in one accessible location before the team arrives."},
            {"name": "Doorstep collection",
             "text": f"Team arrives within the confirmed window, verifies items, and collects. Pickup acknowledgement signed on the spot. Buyback payment (if any) on the spot."},
            {"name": "Follow-up documentation if requested",
             "text": "Certificate of Destruction for data-bearing devices, GST invoice for business pickups, and any other requested documentation issue within a few working days of pickup."},
        ],
        "sections": [
            {"h2": f"What's typical for {device} recycling in {city}",
             "body": (
                f"{city} is on the standard doorstep pickup route for Ewaste Kochi, so "
                f"{device} recycling is a routine booking rather than a specialised job. "
                f"Common local scenarios:\n\n"
                f"Household {device} pickup — one or two {device} units from a home cleanout. "
                f"Batched with any other e-waste in the same pickup.\n\n"
                f"Office {device} pickup — small-office fleet retirement, typically 5-15 "
                f"units, often as part of a broader IT refresh.\n\n"
                f"Apartment complex {device} pickup — coordinated cleanout across multiple "
                f"flats, sometimes organised by the building admin. Bulk workflow with a "
                f"single scheduled slot.\n\n"
                f"For each scenario, the booking flow is similar — WhatsApp with details, "
                f"slot confirmation, doorstep pickup. What changes is scale and any "
                f"documentation preferences."
             )},
            {"h2": f"Buyback for {device} — when it applies",
             "body": (
                f"For {device} recycling specifically, buyback qualification depends on brand, "
                f"model, age, and condition. Recent working units from known brands usually "
                f"qualify for a condition-based buyback quote; older or non-working units "
                f"typically go to free recycling.\n\n"
                f"The estimate is calculated from photos + specs and returned via WhatsApp; "
                f"confirmed quote comes at physical inspection at pickup. If the confirmed "
                f"quote is lower than the estimate (because inspection revealed something "
                f"the photos didn't show), you can decline the pickup without obligation.\n\n"
                f"Buyback payment is on the spot for accepted quotes — cash, UPI, or bank "
                f"transfer, your preference."
             )},
            {"h2": f"Data handling for {device} with storage",
             "body": (
                f"Anything with storage — laptops, phones, tablets, computers, some printers, "
                f"DVRs — routes through data handling before either buyback or recycling. "
                f"Options:\n\n"
                f"Factory-reset before pickup — cleanest transaction for buyback. Sign out of "
                f"accounts, back up what you want, factory reset the {device}. Skip only if "
                f"you can't (forgotten password, device won't boot).\n\n"
                f"Software wipe at facility — {device} handed over intact; drive wiped at the "
                f"processing facility. Certificate available on request.\n\n"
                f"Physical drive destruction — for sensitive data (business, medical, "
                f"financial, legal). Serialised per-drive Certificate available on request.\n\n"
                f"Flag your choice when booking so the team routes the {device} appropriately."
             )},
        ],
        "faqs": [
            {"q": f"Do you cover {city} for {device} pickup?",
             "a": f"Yes. {city} is on the standard doorstep pickup route. WhatsApp with your {device} details and {city} address, and the team confirms a slot based on the current route schedule."},
            {"q": f"How much notice do you need for {device} pickup in {city}?",
             "a": f"For a single-{device} pickup: 1-2 working days is usually enough. For batches (office fleet, apartment complex): 3-5 working days so the pickup can be planned properly."},
            {"q": f"Is {device} pickup free in {city}?",
             "a": f"Doorstep pickup is free for eligible collections in {city}. Some scenarios (urgent same-day, remote locations, oversized single items) may need a small transport quote confirmed before the job."},
            {"q": f"Can I get money for my old {device}?",
             "a": f"Depends on brand, model, age, and condition. Working recent {device} units usually qualify for a condition-based buyback quote. Older or non-working {device} units go to free recycling with no payment."},
            {"q": f"What about broken or non-working {device} units?",
             "a": f"Still accepted for free pickup and material recovery. Non-working units don't qualify for buyback but still route through proper recycling rather than general waste."},
            {"q": f"Do I need to be at home during {device} pickup?",
             "a": f"Yes, or someone authorised on your behalf, so the {device} can be verified against what was quoted and pickup acknowledgement can be signed. For business pickups, an IT lead or facility manager."},
        ],
        "related_pages": rel(
            related_service_link, related_location_link,
            CORE["pickup"], CORE["recycling"], CORE["locations"],
        ),
        "route": _blog_route(0.6),
        "whatsapp_message": f"Hi, I'd like to recycle a {device} in {city} — here are the details:",
    }


def spec_electronics_recycling_edappally():
    return _location_blog_spec(
        slug="electronics-recycling-in-edappally",
        city="Edappally",
        device="electronics batch",
        service_h1="Electronics Recycling in Edappally, Kochi",
        related_service_link=CORE["recycling"],
        related_location_link=CORE["edappally"],
    )


def spec_battery_recycling_vyttila():
    return _location_blog_spec(
        slug="battery-recycling-in-vyttila",
        city="Vyttila",
        device="battery",
        service_h1="Battery Recycling in Vyttila, Kochi",
        related_service_link=CORE["battery"],
        related_location_link=CORE["locations"],
    )


# ---------------------------------------------------------------------------
# 5. How to choose an ITAD provider (20 imp)
# ---------------------------------------------------------------------------

def spec_choose_itad_provider() -> dict:
    return {
        "path": "/blog/how-to-choose-an-itad-provider/",
        "title": "How to Choose an ITAD Provider (Kochi Buyer's Guide)",
        "description": "How to choose an ITAD provider — the questions to ask, the documentation to demand, the red flags to watch for, and what a good SOW should specify.",
        "h1": "How to Choose an ITAD Provider — A Kochi Buyer's Guide",
        "breadcrumb_label": "Choosing an ITAD Provider",
        "service_type": "ITAD provider selection guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "IT Asset Disposition (ITAD) is a category where the differences between "
            "providers matter — one provider gets you audit-ready per-drive certificates "
            "and a clean chain of custody, another leaves you with a batch receipt for "
            "'20 laptops picked up on Tuesday' and no way to reconcile. This blog covers "
            "the specific questions to ask an ITAD provider, the documentation to demand, "
            "the red flags that suggest walking away, and what a well-scoped ITAD SOW "
            "actually specifies."
        ),
        "direct_answer": (
            "Choose an ITAD provider on four criteria: state pollution control board "
            "authorisation (KSPCB for Kerala), per-drive sanitisation certificate capability "
            "(NIST 800-88 tiers), documented chain of custody from pickup to disposal, and "
            "willingness to sign a written SOW that specifies method, tier, and "
            "documentation format. Any provider that pushes back on the SOW ask is a signal "
            "to keep looking."
        ),
        "key_takeaways": [
            "State pollution control board authorisation is the first filter.",
            "Per-drive certificates (not batch) are the second.",
            "Chain of custody documented from pickup to disposal is the third.",
            "Written SOW that specifies method, tier, format is the fourth.",
            "Any pushback on the SOW ask is a red flag.",
        ],
        "accepted_items": {
            "columns": ["Criterion", "What to ask for", "Red flag if..."],
            "rows": [
                ["Regulatory status", "State pollution control board authorisation reference", "Vague answer, no reference provided"],
                ["Sanitisation capability", "NIST 800-88 tier options, per-drive certificate sample", "Only 'we wipe them properly'"],
                ["Chain of custody", "Documented handoffs from pickup to disposal", "No chain-of-custody paperwork"],
                ["Written SOW", "Method, tier, documentation format specified", "Only email confirmation"],
                ["Physical destruction", "On-site witnessed option, serialised certificates", "Only off-site, no serial trace"],
                ["Reporting format", "Match to your asset register schema (CSV, Excel)", "PDF-only, no serial matching"],
            ],
        },
        "how_to_steps": [
            {"name": "Shortlist based on regulatory status",
             "text": "Ask for the provider's state pollution control board authorisation reference up-front. For Kerala offices, that's KSPCB. Any provider that can't or won't share the reference is off the list."},
            {"name": "Request a sample per-drive certificate",
             "text": "Ask for a redacted sample certificate from a past job. It should list drive serial, sanitisation method, date, and any anomalies. If the sample is just a batch acknowledgement, that's the level of documentation you'll get."},
            {"name": "Ask about chain-of-custody documentation",
             "text": "How is custody documented from pickup to disposal? Who signs at each handoff? For off-site processing, what's the vehicle-to-facility trace? The answers tell you the maturity of the operation."},
            {"name": "Draft a written SOW",
             "text": "Method (software wipe / physical shred), tier (NIST 800-88 Clear / Purge / Destroy), documentation format (per-drive certificate schema, reporting format), timeline (pickup date, certificate delivery date), and pricing. Providers set up for enterprise ITAD sign this without pushback."},
            {"name": "Pilot small before committing large",
             "text": "For a first-time relationship: run a small pilot pickup (5-10 units) and evaluate the paperwork before committing to a full office decommissioning. Cheap way to test operational fit."},
        ],
        "sections": [
            {"h2": "The four filter criteria explained",
             "body": (
                "State pollution control board authorisation is the first filter because it's "
                "the baseline legal requirement — a recycler operating without it isn't "
                "operating legally, and any documentation they issue has no regulatory "
                "standing. For Kerala, that's KSPCB. For other states, the equivalent state "
                "pollution board.\n\n"
                "Per-drive sanitisation certificates are the second filter because they're "
                "what makes your ITAD paperwork audit-ready. A batch certificate says 'we "
                "processed 20 drives'; a per-drive certificate lists each drive's serial and "
                "sanitisation method. The latter reconciles against your asset register; the "
                "former does not.\n\n"
                "Chain-of-custody documentation is the third filter because it's what "
                "distinguishes a mature ITAD operation from a general recycler. Every handoff "
                "documented, every transport leg traceable.\n\n"
                "Written SOW is the fourth filter because it forces the specifics into "
                "writing. Providers that operate maturely sign it as standard. Providers new "
                "to enterprise ITAD sometimes push back with 'we don't usually do that' — "
                "which is exactly why you ask."
             )},
            {"h2": "Red flags that mean walk away",
             "body": (
                "Vague answers about regulatory status — 'we're authorised' with no "
                "reference number, or 'the paperwork's coming' with no ETA.\n\n"
                "Reluctance to share a sample certificate. Providers with per-drive "
                "certificates as standard share the format on request. Providers without it "
                "get defensive.\n\n"
                "'We'll wipe them properly' with no reference to a standard. Every provider "
                "should be able to name the standard (NIST 800-88, or specific tools with "
                "documented capability).\n\n"
                "No willingness to sign a written SOW. If the whole engagement rests on WhatsApp "
                "confirmations, you have no formal record.\n\n"
                "Only off-site processing offered. For high-sensitivity data, on-site witnessed "
                "shredding is the highest-assurance option. Providers who can't offer it are "
                "limited in what work they can serve.\n\n"
                "Pricing significantly below market. ITAD done properly has real costs (equipment, "
                "documentation, staff training). Prices that undercut the market by half usually "
                "reflect corners being cut somewhere in the chain."
             )},
            {"h2": "What a good ITAD SOW actually specifies",
             "body": (
                "Scope — asset count and category (servers, laptops, desktops, monitors, "
                "phones, network gear), pickup address, planned pickup date.\n\n"
                "Sanitisation method — which NIST 800-88 tier applies to each category, and "
                "which specific tool or process. For physical destruction, the destruction "
                "method (shred, disintegration).\n\n"
                "Chain of custody — how custody is documented at each handoff, who signs, "
                "what happens if a drive count mismatches between pickup and processing.\n\n"
                "Documentation deliverables — per-drive certificate format (per-drive PDF, or "
                "a CSV with serials and methods for asset register import), pickup "
                "acknowledgement, chain-of-custody log, invoice / GST invoice.\n\n"
                "Timeline — pickup date, certificate delivery deadline, asset register "
                "reconciliation deadline.\n\n"
                "Pricing — either fixed-price for the scope or a per-unit rate with a total "
                "cap. Payment terms.\n\n"
                "Anomaly handling — what happens if a drive fails to sanitise cleanly, or a "
                "device count doesn't match. Escalation path.\n\n"
                "For most Kochi-office ITAD engagements, this fits on one page. Providers "
                "set up for the work sign it without editing."
             )},
        ],
        "faqs": [
            {"q": "Do I actually need a formal SOW, or is a quote email enough?",
             "a": "For low-value / low-sensitivity pickups, an email quote is fine. For anything that touches sensitive data or that will be audited later, a written SOW that specifies method, tier, and documentation format is worth the extra half-hour up-front. Ambiguity is where problems surface later."},
            {"q": "Is 'certified' the same as 'authorised'?",
             "a": "No. 'Authorised' has a specific regulatory meaning — the recycler holds a state pollution control board authorisation for the specific waste category. 'Certified' is vaguer — often refers to ISO certifications (ISO 9001, ISO 14001) which are about management systems, not about waste-handling authorisation. Both are useful; only the first is the regulatory floor."},
            {"q": "How do I verify a provider's KSPCB authorisation?",
             "a": "Ask the provider for their KSPCB reference and the category of the authorisation. For your own record, cross-check on the Kerala State Pollution Control Board website if the register is publicly listed. Most providers happy to share their reference are also happy to point you to how to verify it."},
            {"q": "Should I use one provider for everything or split by category?",
             "a": "Usually one provider is simpler — single pickup, single documentation trail, single reconciliation. Split only if the specialisation matters (a dedicated server-decommissioning specialist for a big data centre wind-down, for example, plus a general e-waste provider for everything else)."},
            {"q": "How much does ITAD typically cost for a Kochi office?",
             "a": "Depends heavily on scope. A small office refresh (5-15 units) with software sanitisation and per-drive certificates is a modest project cost. A large decommissioning with on-site witnessed shredding and enterprise documentation is significantly more. Ask providers to quote against your specific scope; unit prices vary widely by exact requirements."},
            {"q": "What if the ITAD provider I choose turns out to be poor?",
             "a": "That's the reason to pilot small before committing large. Run a 5-10 unit pilot pickup, evaluate the paperwork against your requirements, then decide whether to expand. Switching mid-project is possible but painful; catching operational-fit issues at the pilot stage is much cheaper."},
        ],
        "related_pages": rel(
            CORE["itad"], CORE["data"], CORE["hdd"],
            CORE["it_asset"], CORE["corporate"], CORE["trust"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'm evaluating ITAD providers in Kochi — questions on the process:",
    }


# ---------------------------------------------------------------------------
# 6. E-waste laws in Kerala (46 imp) — REGULATORY / LEGAL angle
#    Distinct from blog/e-waste-rules-in-kerala/ which is a practical guide.
# ---------------------------------------------------------------------------

def spec_ewaste_laws_kerala() -> dict:
    return {
        "path": "/blog/e-waste-laws-in-kerala/",
        "title": "E-Waste Laws in Kerala — What Businesses and Residents Should Know",
        "description": "E-waste laws in Kerala explained plainly — the E-Waste Rules 2022, EPR, KSPCB authorisation, penalties, and what compliance actually looks like for offices.",
        "h1": "E-Waste Laws in Kerala — A Plain-English Overview",
        "breadcrumb_label": "E-Waste Laws in Kerala",
        "service_type": "E-waste regulatory overview for Kerala",
        "last_updated": LAST_UPDATED,
        "lede": (
            "E-waste in India is regulated under the E-Waste (Management) Rules 2022, "
            "administered at state level by the respective pollution control boards. This "
            "blog explains what those rules mean specifically for Kerala — who's affected, "
            "what Extended Producer Responsibility (EPR) obligations exist, what KSPCB "
            "authorisation covers, what the practical penalties look like for non-compliance, "
            "and what a Kochi-based office needs to actually do to stay on the right side "
            "of the framework. Not legal advice — a plain-English orientation."
        ),
        "direct_answer": (
            "In Kerala, e-waste generators (offices, institutions, bulk consumers) must "
            "route their e-waste through recyclers authorised by the Kerala State Pollution "
            "Control Board (KSPCB), maintain records of the disposal, and obtain "
            "acknowledgements. Producers and importers additionally carry Extended Producer "
            "Responsibility (EPR) obligations administered by the Central Pollution Control "
            "Board (CPCB). Households are not directly regulated but are strongly advised "
            "to use authorised routes."
        ),
        "key_takeaways": [
            "E-Waste (Management) Rules 2022 is the current national framework.",
            "KSPCB administers authorisation and enforcement for Kerala.",
            "EPR is a producer-side obligation, not a consumer-side one.",
            "Bulk consumers must maintain records and use authorised routes.",
            "Households are advised (not compelled) to use authorised recyclers.",
        ],
        "accepted_items": {
            "columns": ["Category", "Regulatory obligation", "Practical requirement"],
            "rows": [
                ["Producer / brand owner", "EPR target (collection + recycling quota)", "Register with CPCB, meet annual targets"],
                ["Importer", "EPR + import authorisation", "Register with CPCB before import"],
                ["Bulk consumer (office, institution)", "Route via authorised recycler, keep records", "Pickup acknowledgement + register"],
                ["Recycler / dismantler", "State pollution control board authorisation", "Facility audit, category authorisation"],
                ["Household consumer", "No direct obligation", "Advised to use authorised routes"],
                ["Retailer / e-commerce platform", "Facilitate consumer take-back", "Take-back mechanism"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify which category applies to you",
             "text": "Households: no direct obligation but strong advisory. Small businesses generating low volumes: bulk-consumer category applies once you cross the threshold defined in the rules. Producers, importers: EPR applies from the point of first import / manufacture."},
            {"name": "For bulk consumers: keep a disposal register",
             "text": "Every e-waste disposal event (pickup date, item categories, recycler name, KSPCB reference of the recycler, acknowledgement / certificate reference). Maintain for the period specified in the rules; produce on inspection."},
            {"name": "Use only authorised recyclers",
             "text": "The recycler must hold a valid KSPCB authorisation for the categories of waste being collected. Ask for the authorisation reference before the first pickup; keep on record."},
            {"name": "Retain acknowledgements + certificates",
             "text": "Pickup acknowledgement at pickup; Certificate of Destruction (for data-bearing devices) after processing. These are your evidence of compliant disposal."},
            {"name": "For producers: track EPR fulfillment",
             "text": "Producers register with CPCB, get an EPR authorisation, and meet the annual collection + recycling targets set by the framework. Detailed process is in the rules themselves."},
        ],
        "sections": [
            {"h2": "What the E-Waste (Management) Rules 2022 changed",
             "body": (
                "The 2022 rules replaced the 2016 framework and made several changes:\n\n"
                "EPR was formalised on a target-based system administered by CPCB. Producers "
                "receive an EPR registration and annual targets; failure to meet the targets "
                "triggers environmental compensation.\n\n"
                "The producer category was broadened to include importers explicitly.\n\n"
                "Digital reporting was introduced — the CPCB portal is the primary interface "
                "for producer registrations and returns, replacing paper-based filings for "
                "most interactions.\n\n"
                "The categories of e-waste covered were updated to reflect the current device "
                "landscape (more IT and consumer electronics categories, more granular "
                "battery categories).\n\n"
                "Refurbishment was recognised as a distinct category from recycling — a "
                "producer can partially meet targets through documented refurbishment.\n\n"
                "For an office in Kochi, the operational impact is limited if you were "
                "already using an authorised recycler — the framework is more explicit but "
                "the workflow is unchanged. For producers and importers, the compliance "
                "load is heavier."
             )},
            {"h2": "What KSPCB authorisation actually covers",
             "body": (
                "A KSPCB authorisation for an e-waste recycler is category-specific — the "
                "authorisation lists which e-waste categories the recycler can handle and, "
                "sometimes, at what facility.\n\n"
                "Categories in common use: IT and telecom equipment (computers, laptops, "
                "phones, printers, networking gear), consumer electronics (TVs, refrigerators, "
                "washing machines, air conditioners), lighting (CFL, LED with mercury), "
                "batteries (lead-acid, lithium-ion, other chemistries).\n\n"
                "A recycler authorised for IT + telecom is not automatically authorised for "
                "batteries — you'd check the specific category coverage when the disposal "
                "includes mixed categories.\n\n"
                "The authorisation is time-limited and renewable — a lapsed authorisation is "
                "effectively no authorisation. When picking a recycler for repeat business, "
                "confirming the current validity is a routine check.\n\n"
                "KSPCB conducts periodic facility inspections and can revoke authorisations "
                "on serious non-compliance."
             )},
            {"h2": "Penalties + practical enforcement in Kerala",
             "body": (
                "Environmental compensation under the E-Waste Rules is administered at the "
                "central level for producers (failure to meet EPR targets) and at the state "
                "level by KSPCB for other categories of non-compliance.\n\n"
                "For a Kochi office, the practical enforcement questions are:\n\n"
                "Are you generating e-waste at a scale that puts you in the bulk-consumer "
                "category? If yes, records + authorised-recycler use are the two hard "
                "requirements.\n\n"
                "Are you disposing of e-waste through informal or unauthorised routes "
                "(roadside scrap dealers, general waste, staff take-home)? That's the "
                "specific practice the framework is trying to displace.\n\n"
                "Are you being asked for evidence of compliant disposal — by an auditor, an "
                "insurance underwriter, a bank due-diligence process, a customer? "
                "Increasingly common; the records you keep are what you'd produce.\n\n"
                "Direct penalties on bulk consumers are less common than on producers, but "
                "the reputational and audit-trail consequences of non-compliance are real. "
                "The framework is designed to make compliance the low-friction default — "
                "which, with an authorised recycler in the mix, it usually is."
             )},
        ],
        "faqs": [
            {"q": "Do household residents have to use an authorised e-waste recycler?",
             "a": "There is no direct penalty on a household for using a non-authorised route. The rules are structured around producers and bulk consumers; households are strongly advised to use authorised recyclers but not legally compelled at the individual level. Practical reasons still apply: data destruction, battery safety, actual recycling versus dumping."},
            {"q": "What counts as a 'bulk consumer' in Kerala?",
             "a": "The rules define bulk consumer thresholds by category. For most office electronics, if you generate more than a small threshold of e-waste per year (specified in the rules), the bulk-consumer obligations apply. Practically, most offices with more than a handful of staff cross the threshold within a year of any hardware refresh."},
            {"q": "Is EPR my responsibility as a consumer or an office?",
             "a": "EPR is a producer-side obligation, not a consumer or bulk-consumer one. The producer or importer of the equipment is responsible for meeting EPR targets. As a consumer or office, your obligation is to route the disposal through an authorised channel — which itself supports the producer's EPR fulfilment."},
            {"q": "What documentation should my office actually keep?",
             "a": "For each e-waste disposal: date, item categories and quantities, recycler name, KSPCB authorisation reference of the recycler, and the pickup acknowledgement or certificate reference. Simple register — spreadsheet is fine — retained for the period specified in the rules."},
            {"q": "Do the rules cover batteries the same way as electronics?",
             "a": "Batteries are covered under a separate but parallel framework — the Battery Waste Management Rules 2022. Similar structure (EPR for producers, authorisation for recyclers), separate registration. In practice, an authorised e-waste recycler often also holds battery-recycling authorisation or partners with one; check the specific category coverage."},
            {"q": "Is not-following the rules going to result in a fine on my office?",
             "a": "Direct fines on bulk consumers for non-compliance are less common than on producers, but the framework does provide for environmental compensation and enforcement action. More practically: audit findings, insurance issues, customer due-diligence gaps. Using an authorised recycler solves all of these at low cost."},
        ],
        "related_pages": rel(
            CORE["rules"], CORE["rules_kerala"], CORE["trust"],
            CORE["itad"], CORE["corporate"], CORE["recycling"],
        ),
        "route": _blog_route(0.75),
        "whatsapp_message": "Hi, I have questions about e-waste compliance in Kerala for my office:",
    }


# ---------------------------------------------------------------------------
# 7. Mobile recycling in Kochi (35 imp)
# ---------------------------------------------------------------------------

def spec_mobile_recycling_kochi() -> dict:
    return {
        "path": "/blog/mobile-recycling-in-kochi/",
        "title": "Mobile Phone Recycling in Kochi — Doorstep Pickup Guide",
        "description": "Mobile phone recycling in Kochi — doorstep pickup for old, broken, or unused phones. Data wipe options, buyback for working phones, free recycling for the rest.",
        "h1": "Mobile Phone Recycling in Kochi",
        "breadcrumb_label": "Mobile Phone Recycling",
        "service_type": "Mobile phone recycling in Kochi",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Old mobile phones pile up in a drawer somewhere in almost every home in Kochi "
            "— a working spare, a broken screen from two upgrades ago, an ancient feature "
            "phone still in the box. This blog covers how mobile phone recycling actually "
            "works in Kochi: doorstep pickup, data wipe options for the phones you're "
            "handing over, when a working phone qualifies for buyback versus straight "
            "recycling, and how to book without any fuss."
        ),
        "direct_answer": (
            "For mobile phone recycling in Kochi, WhatsApp Ewaste Kochi with brand, model, "
            "condition, and quantity. Working phones from recent models may qualify for a "
            "condition-based buyback quote (returned via WhatsApp); older or broken phones "
            "go to free recycling. Doorstep pickup at your Kochi address; data destruction "
            "options available (factory reset, software wipe, or physical destruction) "
            "depending on what's on the phone."
        ),
        "key_takeaways": [
            "Doorstep pickup across Kochi and the wider Ernakulam district.",
            "Working recent phones: condition-based buyback estimate first.",
            "Older or broken phones: free recycling, no payment.",
            "Data wipe options — factory reset, software wipe, physical destruction.",
            "Multiple phones in one pickup is fine — batch them.",
        ],
        "accepted_items": {
            "columns": ["Phone type", "Route", "Notes"],
            "rows": [
                ["Working recent smartphone (iPhone, Samsung, Pixel, OnePlus, etc.)", "Buyback estimate first", "Send model + condition photos"],
                ["Working older smartphone", "Reduced buyback or free recycling", "Age + condition dependent"],
                ["Broken screen but powers on", "Reduced buyback if repairable; else recycling", "Photo of damage helps"],
                ["Dead / doesn't power on", "Free recycling", "No payment"],
                ["Feature phones, very old phones", "Free recycling", "Material recovery only"],
                ["Chargers, cables, cases", "Batch with the phones", "Included in same pickup"],
            ],
        },
        "how_to_steps": [
            {"name": "Gather the phones + their chargers",
             "text": "Include any chargers, cables, and cases for the phones you're recycling. Chargers alone are worth recycling — they contain recoverable copper."},
            {"name": "Back up + sign out for phones you can",
             "text": "For any working phone: back up what you want to keep (photos, contacts), sign out of iCloud / Google account, factory reset. This is the cleanest transaction for buyback and prevents any account lock issues later."},
            {"name": "Message the pickup request",
             "text": "WhatsApp Ewaste Kochi with the phone details (brand, model, condition, quantity), your Kochi address, and photos for buyback candidates. Include a note if any phone has data destruction requirements."},
            {"name": "Receive estimate + slot",
             "text": "For working recent phones: condition-based estimate returned via WhatsApp. Team confirms a doorstep pickup slot based on the current route through your Kochi area."},
            {"name": "Doorstep collection + payment",
             "text": "Team arrives within the confirmed window. Working phones get physical inspection; confirmed quote at inspection may adjust from the estimate. Payment on the spot for accepted quotes — cash, UPI, or bank transfer."},
        ],
        "sections": [
            {"h2": "When your old phone qualifies for buyback",
             "body": (
                "Buyback qualification depends on brand, model, age, and condition. Broad "
                "guidelines:\n\n"
                "Recent models (last 3-5 years) from major brands (Apple, Samsung, Google, "
                "OnePlus, Xiaomi, Realme, Oppo, Vivo) usually qualify for a condition-based "
                "buyback estimate. The estimate is calculated from photos + specs; confirmed "
                "quote comes at physical inspection.\n\n"
                "Older but working smartphones from major brands sometimes qualify at a "
                "reduced rate — depends on the specific model's continued resale value.\n\n"
                "Phones with a cracked screen but otherwise working: buyback still possible "
                "at a reduced rate if the phone is repairable; otherwise routed to material "
                "recovery.\n\n"
                "Phones with major damage (water, motherboard failure, dead) go to material "
                "recovery — free recycling with no buyback.\n\n"
                "Feature phones, very old phones, unbranded phones: material recovery only.\n\n"
                "The buyback estimate is genuinely condition-based — no flat per-model number "
                "that gets slashed at pickup on invented reasons. What the estimate says, the "
                "confirmed quote broadly matches unless physical inspection reveals a real "
                "difference."
             )},
            {"h2": "Data wipe options for phones",
             "body": (
                "Any phone you're recycling has some data on it — accounts signed in, photos, "
                "messages, contacts. The options:\n\n"
                "Factory reset before pickup — cleanest transaction. Back up what you want, "
                "sign out of iCloud / Google account, then reset. The phone is handed over "
                "logged out and empty. This is what to aim for if the phone still works and "
                "you remember the passwords.\n\n"
                "Software wipe at facility — for phones you can't factory reset (forgotten "
                "password, screen unresponsive but device boots). Phone handed over intact; "
                "wiped at the processing facility. Certificate available on request.\n\n"
                "Physical destruction — for high-sensitivity data phones (business phones, "
                "phones with sensitive personal information, phones you specifically want to "
                "be sure are irrecoverable). Serialised Certificate of Destruction "
                "available.\n\n"
                "iPhones specifically: iCloud sign-out is critical. An iPhone that's been "
                "factory-reset but not signed out of iCloud is locked by Activation Lock — "
                "it becomes worthless for buyback because no one can reactivate it. Sign out "
                "of iCloud in Settings, then reset. Same principle applies to Android with "
                "Google account lock."
             )},
            {"h2": "Booking a pickup for phones (single vs batch)",
             "body": (
                "Single-phone pickup — fine, but usually combines with a nearby scheduled "
                "route rather than a dedicated visit. If your area is on the standard route, "
                "the slot is quick; if you're in a less-served corner, timing depends on "
                "when a route is passing.\n\n"
                "Batch of phones from a home (5-10 phones from a family drawer clear-out) — "
                "standard household pickup workflow, doorstep slot, single visit.\n\n"
                "Office phone batch (retired corporate handsets, 10-50+ units) — office "
                "pickup workflow with per-drive data destruction certificates if required. "
                "Advance scheduling and any documentation requirements agreed up-front.\n\n"
                "Retailer or distributor bulk return — arranged directly through the "
                "corporate pickup workflow, itemised acknowledgement, GST invoicing.\n\n"
                "For any scenario, the entry point is the same WhatsApp message. Scale and "
                "documentation adjust based on what's actually being picked up."
             )},
        ],
        "faqs": [
            {"q": "How much can I get for a used iPhone in Kochi?",
             "a": "Depends on the model, year, storage, and condition. Recent iPhones in good condition qualify for a real condition-based estimate; older iPhones or those with damage price lower. Send the model, IMEI area storage capacity, and photos for a specific estimate rather than a flat per-model number."},
            {"q": "Do you take iPhones with iCloud lock still active?",
             "a": "Only for material recovery — an iCloud-locked iPhone can't be reactivated by anyone, so it has no resale or buyback value. Sign out of iCloud (Settings > Apple ID > Sign Out) before factory reset to preserve the buyback value. Skip this step and the phone routes to free recycling."},
            {"q": "What about Android phones with Google account lock (FRP)?",
             "a": "Same principle as iCloud lock on iPhone. Remove your Google account from the phone's settings, then factory reset. This clears Factory Reset Protection and preserves the buyback value. If you can't remove the account (forgotten password), the phone routes to free recycling."},
            {"q": "Can I sell just a phone charger or cable on its own?",
             "a": "Not really — chargers and cables don't have individual buyback value. They're accepted for free recycling (material recovery — copper, plastic) and are usually batched with any other e-waste in the same pickup. Batch a drawer of old chargers with a phone or two for a single pickup."},
            {"q": "How long does a phone pickup take at the doorstep?",
             "a": "Short — usually under 10 minutes for a single phone or small batch. Team arrives, verifies the phone against the estimate, physically inspects, confirms the quote, signs the pickup acknowledgement, pays on the spot. Longer for larger batches or if data-destruction paperwork is being generated."},
            {"q": "What if my phone won't power on — can it still be recycled?",
             "a": "Yes. A dead phone is a routine free-recycling pickup — no buyback, no payment, but the phone is properly recycled rather than going to general waste. Dead phones still contain recoverable materials (steel, aluminium, copper, small amounts of precious metals from the boards) and their batteries route through separate chemistry-specific recycling."},
        ],
        "related_pages": rel(
            CORE["mobile"], CORE["phone_buyback"], CORE["sell_mobile"],
            CORE["recycling"], CORE["data"], CORE["pickup"],
        ),
        "route": _blog_route(0.75),
        "whatsapp_message": "Hi, I want to recycle a mobile phone in Kochi — here are the details:",
    }


# ---------------------------------------------------------------------------
# 8. Sell old phone in Kochi (31 imp) — sell-focused blog
# ---------------------------------------------------------------------------

def spec_sell_old_phone_kochi() -> dict:
    return {
        "path": "/blog/sell-old-phone-in-kochi/",
        "title": "Sell Old Phone in Kochi — How Buyback Actually Works",
        "description": "Sell your old phone in Kochi — how doorstep buyback works, how the quote is calculated, what condition means for the price, and how to get paid on the spot.",
        "h1": "Sell Old Phone in Kochi — Doorstep Buyback Guide",
        "breadcrumb_label": "Sell Old Phone in Kochi",
        "service_type": "Used mobile phone buyback in Kochi",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Selling an old phone in Kochi has three main routes: post it yourself on "
            "OLX / Cashify / Facebook Marketplace and manage buyers directly; trade it in "
            "at a retailer during a new-phone purchase; or use a doorstep buyback service. "
            "This blog walks through how the third option specifically works — how the "
            "quote is calculated, what condition actually changes the number, when the "
            "confirmed quote might differ from the estimate, and how you get paid at "
            "pickup without the back-and-forth of a private sale."
        ),
        "direct_answer": (
            "To sell an old phone in Kochi via doorstep buyback: WhatsApp Ewaste Kochi "
            "with brand, model, storage, condition, and 2-3 photos (front, back, "
            "close-ups of any damage). The team returns a condition-based estimate. "
            "Agree a doorstep pickup slot; the phone is physically inspected at pickup; "
            "confirmed quote is paid on the spot in cash, UPI, or bank transfer. If the "
            "confirmed quote doesn't match the estimate, you can decline without obligation."
        ),
        "key_takeaways": [
            "Condition-based estimate from photos + specs, not a flat per-model number.",
            "Doorstep pickup — no travel, no meeting a stranger at a public spot.",
            "On-the-spot payment (cash, UPI, or bank transfer).",
            "Decline without obligation if the confirmed quote doesn't match the estimate.",
            "Sign out of iCloud / Google account before pickup to preserve the price.",
        ],
        "accepted_items": {
            "columns": ["Sell route", "Best for", "Trade-offs"],
            "rows": [
                ["Doorstep buyback (this service)", "No hassle, guaranteed sale, on-the-spot payment", "Buyback rate is fair but not the peak of what a patient private sale might get"],
                ["OLX / Facebook Marketplace", "Highest possible price if buyer patient", "Multiple messages, price haggling, safety of meeting strangers"],
                ["Cashify / online buyback aggregator", "Convenient online quote", "Courier the phone; confirmed quote may differ from initial"],
                ["Retailer trade-in during new phone purchase", "Immediate discount on new phone", "Trade-in value credited against purchase; not cash"],
                ["Roadside second-hand phone shop", "Immediate cash", "Rate is usually lower than dedicated buyback"],
                ["Sell to a friend or family member", "Simple, trusted, fair", "Limited by who's actually looking to buy"],
            ],
        },
        "how_to_steps": [
            {"name": "Check the phone's condition honestly",
             "text": "Screen (any cracks, scratches, dead pixels?), body (dents, scratches, back-glass damage?), battery health (Settings > Battery on iPhone; various tools on Android), any known issues (charging port, speakers, camera)? Note everything before you request an estimate."},
            {"name": "Take clear photos",
             "text": "Front of the phone (screen on), back of the phone, close-up of any damage or wear. Good lighting matters. Photos are the estimate's main input — accurate photos get accurate estimates."},
            {"name": "Message the estimate request",
             "text": "WhatsApp Ewaste Kochi with brand, model, storage capacity, condition summary, and the photos. Also mention any accessories (original box, charger, earphones — sometimes affects the estimate)."},
            {"name": "Sign out of accounts before pickup",
             "text": "Critical step. iPhone: Settings > Apple ID > Sign Out. Android: remove Google account from Settings. This clears Activation Lock / FRP so the confirmed quote at pickup is preserved. Then factory reset the phone."},
            {"name": "Doorstep pickup + on-the-spot payment",
             "text": "Team arrives within the confirmed window. Physical inspection of the phone. If it matches the estimate, confirmed quote is paid on the spot — cash, UPI, or bank transfer, your preference. If it doesn't match, decline without obligation."},
        ],
        "sections": [
            {"h2": "How the buyback estimate is actually calculated",
             "body": (
                "The estimate combines several factors:\n\n"
                "Model + storage — the base price starts from what your specific model + "
                "storage variant is currently reselling for in the secondary market. Prices "
                "shift over time (new model launches drop the resale value of the previous "
                "generation).\n\n"
                "Age — a two-year-old phone in good condition prices higher than a five-year-"
                "old phone of the same model, because expected remaining useful life matters.\n\n"
                "Screen condition — the single biggest condition factor. A pristine screen "
                "supports the top of the range for the model; a cracked screen drops the "
                "estimate significantly.\n\n"
                "Body condition — dents, scratches, back-glass damage each nudge the "
                "estimate down but usually less than screen damage.\n\n"
                "Battery health — for iPhones especially, the reported battery health "
                "percentage matters. Below 80% and the buyback rate drops.\n\n"
                "Functional issues — charging port problems, speaker issues, camera "
                "failures, boot loops — each is a substantial reduction.\n\n"
                "Accessories — original box, unused charger, earphones sometimes add a "
                "small bump. Rarely material.\n\n"
                "The estimate is a range, not a single number. The confirmed quote at "
                "physical inspection lands within the range if the phone matches the "
                "description."
             )},
            {"h2": "Estimate vs confirmed quote — when they differ",
             "body": (
                "The confirmed quote at physical inspection can differ from the estimate for "
                "specific reasons:\n\n"
                "Photos didn't show everything — a hairline crack visible only under angled "
                "light, a dent hidden by the case in the photo, water damage indicator "
                "showing red inside the SIM tray. These are legitimate reasons for a lower "
                "confirmed quote.\n\n"
                "Battery health lower than described — the phone reports lower battery "
                "capacity than what was mentioned in the message.\n\n"
                "Functional issue discovered at inspection — a speaker that doesn't work, a "
                "camera focus problem, a charging port issue.\n\n"
                "Account lock still active — Activation Lock or FRP still enabled on the "
                "phone at pickup. This drops the phone's value to material-recovery level.\n\n"
                "The right behaviour on your side: describe the phone accurately, take honest "
                "photos, sign out of accounts before pickup. The right behaviour on the "
                "buyback side: any variance from the estimate is explained on the spot with "
                "the specific reason; you can decline the pickup without obligation if the "
                "explanation doesn't sit right.\n\n"
                "Confirmed quote matching the estimate exactly is the standard case, not the "
                "exception."
             )},
            {"h2": "Doorstep buyback vs private sale — the honest comparison",
             "body": (
                "Doorstep buyback trades peak price for convenience. What you're paying for:\n\n"
                "No listing, no photos-for-strangers, no back-and-forth messaging.\n\n"
                "No meeting a random buyer at a public spot with your phone in hand.\n\n"
                "No 'buyer changes their mind after seeing it' scenario.\n\n"
                "No haggling in real time — the estimate is what you agreed; the confirmed "
                "quote is what you get paid.\n\n"
                "No wait — the phone is off your hands and the money is in your account "
                "the same day.\n\n"
                "Private sale on OLX / Facebook Marketplace can occasionally beat the "
                "buyback quote — a patient seller with a highly desirable model (recent "
                "iPhone Pro in pristine condition, for example) can sometimes get 10-20% more "
                "if the right buyer turns up. For most phones — mid-range, older, or with "
                "any wear — the buyback quote is competitive with what a private sale "
                "actually closes at, once you factor in the multiple listings, no-show "
                "buyers, and time spent.\n\n"
                "Retailer trade-in usually undercuts both — the trade-in value is typically "
                "conservative because it's bundled with a new-phone purchase discount rather "
                "than being a real second-hand market price."
             )},
        ],
        "faqs": [
            {"q": "How fast can I sell my old phone in Kochi?",
             "a": "Same-day is possible for most Kochi areas — WhatsApp the details in the morning, doorstep pickup in the afternoon if a route is passing. Slower for less-served areas or if slots are booked out. Larger batches (5+ phones) usually get a dedicated slot in 1-2 days."},
            {"q": "Do I get paid in cash or bank transfer?",
             "a": "Your choice at pickup — cash, UPI, or bank transfer. Whatever's most convenient. Payment is on the spot once the confirmed quote is agreed; not a wait-and-see 'we'll transfer tomorrow' arrangement."},
            {"q": "What if I don't have the original box or charger?",
             "a": "Fine. Original box and charger sometimes add a small premium but aren't required. Most phones being sold as second-hand don't come with the original box; the estimate is calibrated for that."},
            {"q": "Can I sell a phone that's on EMI / instalment plan?",
             "a": "You can sell it only if the EMI is cleared and the phone isn't under any lock imposed by the finance provider (some retailers install anti-theft software on financed phones that locks the device if the account is delinquent). Clear these before pickup; otherwise the phone can't be resold."},
            {"q": "Do you buy phones that were originally bought abroad?",
             "a": "Yes, provided the phone is unlocked and works on Indian bands. Some models sold in specific regions have band limitations that reduce their Indian resale value. Mention the country of purchase and, if you know, the model number (visible in settings) so the estimate factors it in."},
            {"q": "What if I want to sell multiple phones together?",
             "a": "Batch pickup is straightforward. Message the models + conditions for each phone; the estimate comes back per-phone plus a total. Same doorstep pickup, same on-the-spot payment for the total. If any phone in the batch doesn't match its estimate, only that phone's quote adjusts."},
        ],
        "related_pages": rel(
            CORE["sell_mobile"], CORE["phone_buyback"], CORE["mobile"],
            CORE["sell"], CORE["pickup"], CORE["data"],
        ),
        "route": _blog_route(0.75),
        "whatsapp_message": "Hi, I want to sell an old phone in Kochi — here are the details:",
    }


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

ALL_GAP_BLOGS = [
    ("pcb-and-motherboard-scrap-buyers-in-kochi",   spec_pcb_motherboard_scrap),
    ("nist-800-88-vs-dod-5220-22-explained",        spec_nist_vs_dod),
    ("server-decommissioning-checklist",            spec_server_decommissioning),
    ("electronics-recycling-in-edappally",          spec_electronics_recycling_edappally),
    ("how-to-choose-an-itad-provider",              spec_choose_itad_provider),
    ("e-waste-laws-in-kerala",                      spec_ewaste_laws_kerala),
    ("mobile-recycling-in-kochi",                   spec_mobile_recycling_kochi),
    ("sell-old-phone-in-kochi",                     spec_sell_old_phone_kochi),
    ("battery-recycling-in-vyttila",                spec_battery_recycling_vyttila),
]


def run_one(spec_dict, extra_args):
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False, encoding="utf-8") as f:
        json.dump(spec_dict, f, indent=2)
        spec_path = f.name
    try:
        result = subprocess.run(
            ["/usr/local/bin/python3", str(GENERATOR), spec_path, *extra_args],
            capture_output=True, text=True,
        )
        return result.returncode, result.stdout, result.stderr
    finally:
        try:
            Path(spec_path).unlink()
        except OSError:
            pass


def main():
    parser = argparse.ArgumentParser(description="Batch driver for 9 GSC-gap blog posts.")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--validate-only", action="store_true")
    parser.add_argument("--live", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--register-routes", action="store_true")
    parser.add_argument("--only")
    args = parser.parse_args()

    if args.register_routes and not args.live:
        print("✗ --register-routes requires --live", file=sys.stderr)
        return 1

    extra = []
    if args.dry_run:        extra.append("--dry-run")
    if args.validate_only:  extra.append("--validate-only")
    if args.live:           extra.append("--live")
    if args.force:          extra.append("--force")
    if args.register_routes: extra.append("--register-route")

    only_set = set(s.strip() for s in args.only.split(",")) if args.only else None

    print(f"{'='*76}")
    print(f"gsc-gap batch: {len(ALL_GAP_BLOGS)} specs; extra: {extra or 'none'}")
    print(f"{'='*76}")

    passed, failed = [], []
    for slug, fn in ALL_GAP_BLOGS:
        if only_set and slug not in only_set:
            continue
        print(f"\n--- {slug} ---")
        rc, out, err = run_one(fn(), extra)
        if rc == 0:
            passed.append(slug)
            if out and not args.dry_run:
                for line in out.strip().splitlines()[-4:]:
                    print(f"  {line}")
        else:
            failed.append((slug, rc, err.strip() or out.strip()))
            for line in (err or out).strip().splitlines()[-10:]:
                print(f"    {line}")

    print(f"\n{'='*76}")
    print(f"gsc-gap batch summary: {len(passed)} passed, {len(failed)} failed")
    if failed:
        for slug, rc, msg in failed:
            print(f"  - {slug} (exit {rc}): {msg[:180]}")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
