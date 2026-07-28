#!/usr/bin/env python3
"""
generate-batch-pillars.py
=========================

Batch driver on top of scripts/generate-pillar-page.py.

Contains N inline pillar specs, feeds each through the single-page generator,
reports success/failure per page. Every page is written to
.content-quarantine/generated/ by default (--live to promote batch to
src/pages/, --register-routes to append routes.ts entries).

Every spec here was authored to respect the same anti-fabrication discipline
as the 5 pillar pages shipped 2026-07-27:
  * "condition-based estimate" language, not "instant/on-the-spot quote"
  * "free for eligible collections" language, not blanket "always free"
  * no invented KSPCB/CPCB/ISO numbers
  * no claimed customer counts, review counts, years-in-business, or ratings
  * every internal-link target must actually exist (checked at commit time)

Priority order in this batch (10 pages):
  1. /appliance-recycling/        — recycling pillar child; captures
                                    appliance-specific queries
  2. /printer-recycling/          — recycling pillar child; office+home
  3. /home-e-waste-pickup/        — pickup pillar child; consumer entry
  4. /bulk-e-waste-pickup/        — pickup pillar child; SMB entry
  5. /battery-pickup/             — pickup pillar child; safety-first
  6. /laptop-scrap-price/         — selling pillar child; captures
                                    "laptop scrap price" query cluster
  7. /phone-buyback/              — selling pillar child; captures
                                    "phone buyback" query cluster
  8. /it-asset-disposal/          — compliance pillar child; SMB entry
                                    to ITAD workflow
  9. /school-e-waste-recycling/   — compliance pillar child; education
                                    vertical
 10. /hospital-e-waste-recycling/ — compliance pillar child; healthcare
                                    vertical, high data-destruction stakes

Follow-ups for future sessions (~20 more pages):
  * remaining pickup children (scheduled, same-day, corporate)
  * remaining selling children (sell-old-{laptop,computer,mobile,office-electronics},
    computer-scrap-price, electronics-scrap-value)
  * remaining recycling children (network-equipment, electronics-recycling)
  * remaining compliance children (office-clearance, bulk-electronics-disposal,
    retail-e-waste, business-e-waste-recycling)
  * 20 supporting blog topics from GSC-demand list

Usage:
    # Validate all specs, dry-run every render
    python3 scripts/generate-batch-pillars.py --dry-run

    # Write all to quarantine (default, safe)
    python3 scripts/generate-batch-pillars.py

    # Promote validated batch to live + register routes
    python3 scripts/generate-batch-pillars.py --live --register-routes

    # Regenerate over existing files
    python3 scripts/generate-batch-pillars.py --force
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
GENERATOR = SCRIPT_DIR / "generate-pillar-page.py"

WA_CTA_DEFAULT = "Hi, I'd like a pickup — here are the details:"

LAST_UPDATED = "2026-07-28"


# ---------------------------------------------------------------------------
# Reusable content fragments
# ---------------------------------------------------------------------------

def rel(*items: tuple[str, str]) -> list[dict[str, str]]:
    """Build a related_pages list from (path, label) tuples."""
    return [{"path": p, "label": l} for p, l in items]


# Pages that are safe to link to (verified to exist live 2026-07-28).
CORE_LINKS = {
    "recycling":       ("/recycling/",              "General e-waste recycling — parent pillar"),
    "battery":         ("/battery-recycling/",      "Battery recycling"),
    "sell":            ("/sell-electronics/",       "Sell electronics — buyback flow"),
    "pickup":          ("/pickup/",                 "Pickup — how doorstep collection works"),
    "data":            ("/data-destruction/",       "Data destruction"),
    "hdd":             ("/hard-drive-shredding/",   "Hard drive shredding"),
    "itad":            ("/itad/",                   "ITAD for offices"),
    "marketplace":     ("/marketplace/",            "Marketplace (refurbished electronics)"),
    "laptop":          ("/laptop-recycling/",       "Laptop recycling"),
    "computer":        ("/computer-recycling/",     "Computer recycling"),
    "mobile":          ("/mobile-phone-recycling/", "Mobile phone recycling"),
    "corporate":       ("/corporate-e-waste-recycling/", "Corporate e-waste recycling"),
    "office_pickup":   ("/office-e-waste-pickup/",  "Office e-waste pickup"),
    "server":          ("/server-recycling-kochi/", "Server recycling"),
    "tv":              ("/tv-recycling-kochi/",     "TV recycling"),
    "near_me":         ("/services/electronics-recycling-near-me/", "Electronics recycling near me"),
    "scrap_prices":    ("/e-waste-scrap-prices-kochi/", "E-waste scrap prices"),
    "computer_scrap":  ("/computer-scrap-buyers-kochi/", "Computer scrap buyers"),
    "itad_it":         ("/services/itad-for-it-companies/", "ITAD for IT companies"),
    "audit":           ("/services/it-asset-inventory-audit/", "IT asset inventory audit"),
    "rules":           ("/e-waste-rules-2022-india/",  "E-waste rules 2022 (India)"),
    "trust":           ("/trust/",                     "Trust and compliance"),
    "locations":       ("/locations/",                 "Locations served"),
    "cert_sample":     ("/data-destruction-certificate-sample/", "Certificate of Destruction sample"),
    "calc":            ("/tools/scrap-value-calculator/", "Scrap value calculator"),
    "decision":        ("/tools/sell-or-recycle-decision-tool/", "Sell-or-recycle decision tool"),
    "eligibility":     ("/tools/pickup-eligibility-checker/", "Pickup eligibility checker"),
    "battery_safety":  ("/tools/battery-safety-checker/", "Battery safety checker"),
    "faq":             ("/faq/",                       "FAQ"),
    "contact":         ("/contact/",                   "Contact"),
    "about":           ("/about/",                     "About Ewaste Kochi"),
}


# ---------------------------------------------------------------------------
# Per-page specs (10 pages in this batch)
# ---------------------------------------------------------------------------

def spec_appliance_recycling() -> dict:
    return {
        "path": "/appliance-recycling/",
        "title": "Where to Recycle Appliances in Kochi | Free Pickup",
        "description": "Where to recycle old washing machines, fridges, ACs, microwaves and kitchen appliances in Kochi — doorstep pickup with refrigerant handling and material recovery.",
        "h1": "Where to Recycle Appliances in Kochi",
        "breadcrumb_label": "Appliance Recycling",
        "service_type": "Home appliance recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Home appliances — washing machines, refrigerators, air conditioners, microwaves, "
            "water heaters — sit differently from small electronics. They are heavier, they often "
            "carry refrigerant or oil, and after 8-10 years of use their resale value is usually "
            "limited. This page covers what appliances get accepted, how bulky-item transport is "
            "planned, and what happens to refrigerant-carrying units before the metal, plastic and "
            "copper are separated for recovery."
        ),
        "direct_answer": (
            "To recycle a home appliance in Kochi, WhatsApp Ewaste Kochi with the appliance type, "
            "brand, approximate age, and your address. Pickup is scheduled based on the item, its "
            "condition (working or not) and transport requirements. Refrigerant-carrying units "
            "(fridges, ACs) route through a certified refrigerant handling step before material "
            "recovery. Doorstep pickup is free for eligible collections."
        ),
        "key_takeaways": [
            "Washing machines, fridges, ACs, microwaves, water heaters — all accepted.",
            "Refrigerant-carrying units need certified handling before recycling.",
            "Bulk (multi-appliance) pickups are common during apartment moves.",
            "Working units may qualify for a condition-based buyback quote, checked on inspection.",
            "Pickup slot is confirmed after area, item and transport review.",
        ],
        "accepted_items": {
            "columns": ["Appliance", "Route", "Notes"],
            "rows": [
                ["Washing machines (any brand, any age)", "Material recovery; buyback for recent working units", "Photo of the model plate helps"],
                ["Refrigerators", "Certified refrigerant handling + material recovery", "Do not attempt to remove gas yourself"],
                ["Air conditioners (split + window)", "Certified refrigerant handling + material recovery", "Coordinate copper pipe removal with the technician"],
                ["Microwaves", "Material recovery", "Include the turntable and rack"],
                ["Water heaters (electric + gas)", "Material recovery; gas heaters may need advance transport plan", "Flag if the tank shows corrosion"],
                ["Mixers, grinders, small kitchen appliances", "Material recovery", "Batch with other e-waste in one pickup"],
                ["Chimneys, water purifiers, dishwashers", "Material recovery + filter separation where applicable", "Bulky items — advance planning"],
            ],
        },
        "how_to_steps": [
            {"name": "Message the appliance details",
             "text": "Type, brand, approximate age, and whether it still powers on. Photos of the model plate and the appliance in situ help transport planning."},
            {"name": "Flag refrigerant status",
             "text": "Fridges and ACs contain refrigerant gas that must not be released into the atmosphere during recycling. The team plans certified handling before pickup — do not attempt DIY refrigerant removal."},
            {"name": "Confirm access and transport requirements",
             "text": "Floor, lift access, stairs, and whether the appliance is inside or already moved to a common area. Bulky items sometimes need advance transport arrangement."},
            {"name": "Doorstep pickup at the confirmed slot",
             "text": "The team arrives with the right equipment, disconnects the appliance where needed, and collects it. Pickup acknowledgement paperwork is signed on the spot."},
            {"name": "Downstream processing",
             "text": "Refrigerant is recovered separately; metal, plastic and copper are separated for material recovery. Working units with resale demand may route to marketplace after inspection."},
        ],
        "sections": [
            {"h2": "Refrigerant handling — why fridges and ACs are different",
             "body": (
                "Refrigerators and air conditioners contain refrigerant gas (R-134a, R-410A, R-22 "
                "or R-32 depending on age and type). Under Indian environmental rules, this gas "
                "must not be released into the atmosphere during recycling. The practical "
                "implication: do not attempt DIY refrigerant removal, do not let untrained scrap "
                "collectors take these units, and expect a certified handling step to be scheduled "
                "between pickup and material recovery.\n\n"
                "Default workflow: pickup at your location, transport to a facility equipped for "
                "refrigerant recovery, gas recovery under closed-loop equipment, then the shell of "
                "the unit routes to standard material recovery. This is why fridge and AC pickup "
                "is treated as a scheduled job rather than a same-day route — the downstream "
                "handling has to be lined up."
             )},
            {"h2": "Buyback vs recycling for appliances",
             "body": (
                "For most appliances older than about 5-7 years, resale demand is limited and the "
                "route is straight to material recovery — no payment received, though pickup "
                "remains free. For recent, working appliances (last 2-3 years, common brand, no "
                "visible damage) a condition-based buyback quote is possible. Send photos of the "
                "model plate, the front, and any visible damage; the team returns a condition-"
                "based estimate. Final quote is confirmed at inspection.\n\n"
                "Two common cases where buyback surprises people: recent inverter refrigerators, "
                "and working split-AC outdoor units even when the indoor unit is being replaced. "
                "Both can carry meaningful resale value."
             )},
            {"h2": "Bulk appliance pickup — apartment moves and cleanouts",
             "body": (
                "A single old washing machine is a routine pickup. A full apartment cleanout — "
                "fridge, washing machine, AC, microwave, water heater all going at once — is a "
                "different scheduling problem. Bulk appliance pickups need advance planning "
                "because the transport vehicle, the refrigerant handling slot, and the item "
                "manifest all have to be coordinated. Give 3-5 working days notice for a full "
                "cleanout, longer if the address is outside the Ernakulam district core."
             )},
        ],
        "faqs": [
            {"q": "Where can I recycle an old washing machine in Kochi?",
             "a": "Message Ewaste Kochi with the brand, age and address. Pickup is scheduled based on area and current transport route. Recent working machines may qualify for a condition-based buyback quote; older ones go to material recovery, with pickup free either way."},
            {"q": "How does refrigerator recycling work with the refrigerant?",
             "a": "The fridge is picked up intact and routed to a facility equipped for refrigerant recovery. The gas is captured under closed-loop equipment before the shell enters material recovery. Do not attempt DIY refrigerant removal — it is environmentally regulated and technically risky."},
            {"q": "Can I recycle an air conditioner during monsoon?",
             "a": "Yes. Wet-season pickup is fine for indoor collection; if the outdoor unit needs to be removed from a wall or balcony, the team confirms on the day whether the site condition allows safe dismantling. Reschedule is free if weather forces it."},
            {"q": "Do you accept damaged or broken appliances?",
             "a": "Yes. A washing machine that will not spin, a fridge that stopped cooling, a microwave with a broken door — all accepted for pickup and material recovery. Note the damage in your message so the team knows what to expect on site."},
            {"q": "How much notice do I need for an appliance pickup?",
             "a": "For a single appliance, 1-2 working days is usually enough. For a full apartment cleanout (fridge + washing machine + AC + more), plan 3-5 working days so the transport and refrigerant handling can be scheduled properly."},
            {"q": "Do I need to be present at pickup?",
             "a": "Someone authorised — you, a family member, a property manager — should be present so the appliance list can be verified against what was quoted and the pickup acknowledgement can be signed."},
            {"q": "Is there a charge for bulky-item transport?",
             "a": "Doorstep pickup is free for eligible collections. Some scenarios — very high floors without lift access, remote locations, urgent same-day requests — may need a transport-cost quote confirmed before the job. Quoted before, never after."},
        ],
        "related_pages": rel(
            CORE_LINKS["recycling"], CORE_LINKS["battery"], CORE_LINKS["pickup"],
            CORE_LINKS["locations"], CORE_LINKS["calc"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like to recycle a home appliance — here are the details:",
    }


def spec_printer_recycling() -> dict:
    return {
        "path": "/printer-recycling/",
        "title": "Where to Recycle Old Printers in Kochi | Free Pickup",
        "description": "Where to recycle old printers, scanners, copiers and multifunction devices in Kochi — free doorstep pickup with cartridge separation and material recovery.",
        "h1": "Where to Recycle Printers in Kochi",
        "breadcrumb_label": "Printer Recycling",
        "service_type": "Printer and multifunction device recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Old printers, scanners, copiers and multifunction devices are among the most "
            "commonly-abandoned office electronics — heavy, no resale demand once a model is "
            "3-4 years old, cartridges everywhere. This page covers what gets accepted, why "
            "multifunction printers often carry unrecognised data risk, and how bulk printer "
            "collection is planned for offices."
        ),
        "direct_answer": (
            "To recycle a printer in Kochi, WhatsApp Ewaste Kochi with the brand, model, and "
            "your location. Cartridges and toner should be flagged; multifunction printers "
            "(with scan/copy/fax) often hold a hard drive that needs data destruction before "
            "recycling. Doorstep pickup is free for eligible collections; bulk office printer "
            "batches usually route through the ITAD workflow."
        ),
        "key_takeaways": [
            "Printers, scanners, copiers, and multifunction devices — all accepted.",
            "Multifunction printers often hold hard drives — treat as data-bearing devices.",
            "Cartridges and toner are separated at pickup for specific recovery streams.",
            "Bulk office printer batches usually route through ITAD for asset tracking.",
            "Pickup is free for eligible collections; bulky items may need advance transport planning.",
        ],
        "accepted_items": {
            "columns": ["Item", "Route", "Notes"],
            "rows": [
                ["Inkjet printers (home / small office)", "Material recovery; cartridges separated", "Include chargers if present"],
                ["Laser printers (single-function)", "Material recovery + toner cartridge separation", "Toner powder is a specific waste stream"],
                ["Multifunction printers (scan/copy/fax)", "Material recovery + data destruction for internal HDD", "Confirm serial for asset tracking if office"],
                ["Photocopiers (small + large)", "Material recovery + data destruction", "Bulky — advance transport planning"],
                ["Scanners (flatbed, sheetfed)", "Material recovery", "Include the power supply"],
                ["3D printers", "Material recovery + resin/filament handling if present", "Flag any resin bottles"],
                ["Loose ink/toner cartridges", "Cartridge return / material recovery", "Sealed if possible to avoid spills"],
                ["Fax machines", "Material recovery", "Increasingly rare — still accepted"],
            ],
        },
        "how_to_steps": [
            {"name": "Message the model and count",
             "text": "One printer, or a batch of 12 from an office IT refresh — both fine, just say which. Brand and rough age help the team confirm downstream routing."},
            {"name": "Flag any data-bearing units",
             "text": "Multifunction printers, copiers, and enterprise-grade laser printers often have internal storage that holds scan/print history. Say if you want data destruction handled or done in-house first."},
            {"name": "Note cartridge and toner state",
             "text": "Sealed cartridges are easy. Leaking or partially-used toner is fine but needs the team to bring appropriate handling — flag it."},
            {"name": "Confirm access for bulky units",
             "text": "Photocopiers and large multifunction printers may not fit through standard doorways. Note floor, lift dimensions and the largest unit."},
            {"name": "Doorstep pickup",
             "text": "The team arrives at the confirmed slot, verifies the item list, and collects. Pickup acknowledgement paperwork is signed on the spot; data destruction certificates issue separately after the destruction step."},
        ],
        "sections": [
            {"h2": "Why multifunction printers are the most-overlooked data risk in offices",
             "body": (
                "A modern multifunction printer that scans, copies, faxes, and prints is a small "
                "computer with a hard drive that has been buffering every scan and copy job for "
                "years. Copies of contracts, medical records, HR documents, financial statements "
                "— all can sit on that drive. When the printer is retired, that drive goes with "
                "it unless someone specifically calls for data destruction.\n\n"
                "The default assumption for any multifunction printer in service more than 12 "
                "months should be: it has an internal HDD, it has been storing job history, and "
                "it needs to route through data destruction before material recovery. Flag it "
                "when you book, and — for compliance-sensitive offices — request a per-drive "
                "Certificate of Destruction."
             )},
            {"h2": "Cartridges and toner — separate handling",
             "body": (
                "Ink and toner cartridges are not recycled the same way as the printer body. "
                "Cartridges have their own waste stream: sealed cartridges route to remanufacturer "
                "partners where possible; damaged or leaking cartridges route to specialised "
                "handling. Toner powder in particular is a fine particulate that needs contained "
                "handling — the team brings appropriate containers when you flag toner-heavy loads.\n\n"
                "Home users often batch a printer with 4-6 old cartridges when they finally clear "
                "out the drawer. Office batches can have hundreds. Both are fine; just include an "
                "approximate cartridge count in your initial message so the team knows what to "
                "expect."
             )},
            {"h2": "Bulk printer collection for offices",
             "body": (
                "IT refresh cycles often produce 5-30 printers at once — usually a mix of laser "
                "printers from meeting rooms and multifunction devices from copy rooms. Bulk "
                "printer batches typically route through the ITAD workflow, which adds per-device "
                "serial capture and consolidated documentation. For offices with formal audit "
                "trails or client-data-sensitive workflows (law firms, medical practices, "
                "financial services), this route is worth the small process overhead."
             )},
        ],
        "faqs": [
            {"q": "Where can I recycle an old printer in Kochi?",
             "a": "Message Ewaste Kochi with the brand, model, and your address. Pickup is scheduled based on area and item count. Cartridges are separated at pickup; multifunction printers route through data destruction if requested."},
            {"q": "Do you accept broken or non-working printers?",
             "a": "Yes. Working, non-working, physically damaged, missing cartridges — all accepted. Note the condition in your message so the team can plan accordingly."},
            {"q": "What about old cartridges I have piled up?",
             "a": "Bring them in the same pickup as the printer, or send them alone if you have a large batch. Sealed cartridges route to remanufacturer partners where possible; damaged ones go to material recovery."},
            {"q": "Should I worry about data on a multifunction printer?",
             "a": "Yes, for any device in service more than 12 months. Multifunction printers hold internal hard drives that buffer scan and copy jobs. Route them through data destruction if you have handled client, medical, financial or personal records — a Certificate of Destruction is available on request."},
            {"q": "Can offices book bulk printer recycling — say 20 printers?",
             "a": "Yes. Bulk batches usually route through ITAD, which adds per-serial asset capture and consolidated documentation. Common with IT refresh cycles."},
            {"q": "Do I need to remove ink or toner before pickup?",
             "a": "No. Cartridges can stay in the printer, or be batched separately. Flag any leaking or damaged cartridges so the team brings appropriate containment."},
            {"q": "What about old photocopiers — they are huge and heavy?",
             "a": "Photocopiers are accepted. Because of size and weight, confirm floor, lift access and doorway dimensions in your message so the team can plan transport. May need 3-5 working days notice."},
        ],
        "related_pages": rel(
            CORE_LINKS["recycling"], CORE_LINKS["office_pickup"], CORE_LINKS["itad"],
            CORE_LINKS["data"], CORE_LINKS["pickup"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like to recycle a printer — here are the details:",
    }


def spec_home_e_waste_pickup() -> dict:
    return {
        "path": "/home-e-waste-pickup/",
        "title": "Home E-Waste Pickup in Kochi | Free Doorstep Collection",
        "description": "Home e-waste pickup in Kochi — free doorstep collection for old laptops, phones, cables, batteries, TVs and appliances from your house or apartment.",
        "h1": "Home E-Waste Pickup in Kochi",
        "breadcrumb_label": "Home Pickup",
        "service_type": "Home e-waste pickup",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Home pickup is how most consumer requests start — an old laptop from a drawer, "
            "a phone with a cracked screen, an inverter battery that is finally beyond repair. "
            "This page covers what you can request as a household, how apartment vs independent-"
            "house pickup is planned differently, and what to have ready before the team arrives."
        ),
        "direct_answer": (
            "To book a home e-waste pickup in Kochi, WhatsApp Ewaste Kochi with your item list, "
            "address, and photos. The team confirms feasibility based on your area and current "
            "route schedule, then agrees a doorstep slot. Pickup is free for eligible household "
            "collections. Small single-item pickups often combine with a nearby scheduled route."
        ),
        "key_takeaways": [
            "Single-item and combined household pickups both supported.",
            "Apartment pickups need building name, floor and access notes at booking.",
            "Batteries and data-bearing devices are handled separately in the same pickup.",
            "Small pickups often combine with a nearby route rather than a dedicated visit.",
            "Doorstep pickup is free for eligible household collections.",
        ],
        "accepted_items": {
            "columns": ["Household item", "Route", "Notes"],
            "rows": [
                ["Old laptops, phones, tablets", "Buyback check + data destruction + recycling", "Factory reset if possible"],
                ["Chargers, cables, adapters", "Recycling", "Batch with the parent device"],
                ["Household appliances (mixers, kettles, small kitchen electronics)", "Recycling", "Include broken units"],
                ["Old inverter/UPS batteries", "Battery recycling (separate handling)", "Flag swelling or leakage"],
                ["Remote controls, digital clocks, old radios", "Recycling", "Remove batteries first if possible"],
                ["Old routers, modems, TV set-top boxes", "Recycling", "Common apartment-cleanout items"],
                ["CFL/LED tube-lights (broken or old)", "Specialised handling for mercury-containing lights", "Ask before booking; not always same-day"],
            ],
        },
        "how_to_steps": [
            {"name": "Message your item list and address",
             "text": "One WhatsApp message with what you have, your area, floor if apartment, and any access instructions. Photos help, especially for bulky or damaged items."},
            {"name": "Confirm any batteries or data-bearing items",
             "text": "Say if the pickup includes any battery types (UPS, inverter, laptop, phone) or devices with sensitive data (laptop, phone with data on it). The team plans separate handling for each."},
            {"name": "Get a slot confirmation",
             "text": "Timing depends on your area's route schedule. Small single-item pickups may be combined with a nearby scheduled pickup rather than a dedicated visit."},
            {"name": "Prepare the items",
             "text": "Group items in one accessible location. Factory reset any phones or laptops you can. Keep swollen batteries separately in a cool, dry place."},
            {"name": "Doorstep collection",
             "text": "The team arrives at the confirmed slot, checks the items against what was messaged, and collects. Pickup acknowledgement is signed on the spot; buyback payment (if any) is on the spot too."},
        ],
        "sections": [
            {"h2": "Apartment vs independent house — what changes",
             "body": (
                "Independent-house pickups are simple: park, ring the bell, collect. Apartment "
                "pickups add a few coordination steps that are easier to plan in advance than "
                "solve on the day:\n\n"
                "For apartment pickups, include in your message: building name, floor, whether "
                "there is a lift and its size (some old apartments have lifts too small for a "
                "large item), security gate access requirements (some societies need pre-"
                "approved entry), and preferred timing that fits any building rules about "
                "commercial vehicle entry.\n\n"
                "Multi-flat pickups within one building can often be combined into one visit — "
                "worth mentioning to neighbours if you know they also have items to recycle."
             )},
            {"h2": "Single item vs household cleanout",
             "body": (
                "A single old laptop is a routine request. A full household cleanout — moving "
                "out, downsizing, sorting years of accumulated electronics — is a different "
                "scale of job.\n\n"
                "For household cleanouts, give 2-3 working days notice, share photos of the "
                "collection area, and mention if there are any oversized items (old CRT TVs, "
                "large speakers, defunct refrigerators). Cleanouts often benefit from a longer "
                "on-site visit rather than the fast in-and-out of a single-item pickup."
             )},
            {"h2": "Payment for items that qualify for buyback",
             "body": (
                "For working phones, laptops, and some appliances with resale demand, the team "
                "returns a condition-based estimate from your photos. The final quote is "
                "confirmed at physical inspection. If accepted, payment is on the spot — cash, "
                "UPI, or bank transfer, your preference. If you decline the quote (because it "
                "came in lower than the estimate due to damage the photos did not show), the "
                "device goes to recycling instead — no obligation to accept."
             )},
        ],
        "faqs": [
            {"q": "How do I book a home e-waste pickup?",
             "a": "WhatsApp Ewaste Kochi with your item list, your address (including floor if apartment), and photos of anything bulky or damaged. The team confirms a slot based on your area's route schedule."},
            {"q": "Is home pickup really free?",
             "a": "Yes, for eligible household collections. Some scenarios — very small single-item pickups from remote locations, urgent same-day requests, oversized single items — may sometimes need a small transport-cost quote, which is confirmed before the job."},
            {"q": "Can I combine multiple things in one pickup?",
             "a": "That is the norm. A typical household pickup includes a mix of old phones, chargers, cables, one or two small appliances, and sometimes a laptop. Batteries and data-bearing devices route through separate handling within the same pickup."},
            {"q": "What about apartment security gate approval?",
             "a": "Some apartment societies require pre-approval for commercial vehicle entry. If yours does, mention it when you book and coordinate the approval with your building's admin office — the team can share vehicle details for the approval form."},
            {"q": "Do you accept broken items?",
             "a": "Yes. Working, non-working, cracked screens, dead batteries, damaged casings — all accepted for pickup and material recovery. Non-working items usually will not qualify for a buyback quote, but pickup itself is still free and the items still route through proper e-waste handling rather than ending up in general waste."},
            {"q": "How much notice do I need?",
             "a": "For a single small item, 1 working day is often enough (depending on route schedule). For a full household cleanout with multiple items, 2-3 working days lets the team plan the visit properly."},
            {"q": "What if I have just one small item?",
             "a": "Still bookable. Small single-item pickups usually combine with a nearby scheduled route rather than a dedicated visit — so timing depends on when a route is passing your area."},
            {"q": "Do you take old CRT TVs and large appliances?",
             "a": "Yes. CRT TVs and large appliances are collected but need advance transport planning because of size and weight. Give 2-3 working days notice for these."},
        ],
        "related_pages": rel(
            CORE_LINKS["pickup"], CORE_LINKS["battery"], CORE_LINKS["laptop"],
            CORE_LINKS["mobile"], CORE_LINKS["tv"], CORE_LINKS["locations"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like a home pickup — here are the items and address:",
    }


def spec_bulk_e_waste_pickup() -> dict:
    return {
        "path": "/bulk-e-waste-pickup/",
        "title": "Bulk E-Waste Pickup in Kochi | Scheduled Collection",
        "description": "Bulk e-waste pickup in Kochi for offices, apartments and cleanouts — scheduled collection for large batches of laptops, monitors, appliances and batteries.",
        "h1": "Bulk E-Waste Pickup in Kochi",
        "breadcrumb_label": "Bulk Pickup",
        "service_type": "Bulk e-waste pickup and collection",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Bulk pickup means anything that does not fit into a routine single-visit doorstep "
            "collection: 30 laptops from an office IT refresh, a full apartment cleanout, a "
            "school store-room clearance, a hospital retiring old imaging workstations. This "
            "page covers what qualifies as bulk, how scheduling differs from routine pickup, "
            "and what documentation is available for bulk jobs."
        ),
        "direct_answer": (
            "For a bulk e-waste pickup in Kochi, WhatsApp Ewaste Kochi with rough counts by "
            "category, your address, and preferred slot window. The team confirms feasibility, "
            "schedules a slot around transport and route constraints, and arrives with the "
            "right equipment. Pickup is free for eligible bulk collections; data destruction "
            "and per-device asset tracking are optional add-ons quoted before the job."
        ),
        "key_takeaways": [
            "Bulk = anything not a routine single-visit collection.",
            "Scheduling needs 3-5 working days notice for most bulk jobs.",
            "Documentation options: pickup acknowledgement, GST invoice, per-device asset log, Certificate of Destruction.",
            "Bulk with per-serial tracking = ITAD workflow; bulk without = standard bulk pickup.",
            "Pickup is free for eligible collections; specific compliance services are quoted before the job.",
        ],
        "accepted_items": {
            "columns": ["Bulk scenario", "Typical route", "Notes"],
            "rows": [
                ["Office IT refresh (20-50 laptops/desktops)", "ITAD workflow with per-device tracking", "Include lease-return docs if applicable"],
                ["Apartment / house cleanout (mixed items)", "Standard bulk pickup", "Include an item list; oversized items need advance notice"],
                ["School / college store-room clearance", "Standard bulk pickup; ITAD if data-bearing", "Old projectors, printers, computers common"],
                ["Hospital / clinic decommissioning", "ITAD with physical drive shredding", "Medical data requires certified destruction"],
                ["Retail chain POS retirement", "Multi-site ITAD scheduling", "Terminals hold card-data records"],
                ["Startup / office closure", "Full bulk pickup + Certificate for closure docs", "Often needed for tax/dissolution paperwork"],
                ["Data-centre decommissioning", "High-security ITAD + physical shredding", "Rack-mount + storage arrays"],
            ],
        },
        "how_to_steps": [
            {"name": "Message an approximate inventory",
             "text": "Categories and rough counts — 'about 30 laptops, 15 monitors, 10 UPS units, 40 phones'. An exact per-serial inventory is not required upfront."},
            {"name": "Say what documentation you need",
             "text": "Pickup acknowledgement is standard. GST invoice, per-device asset log, Certificate of Destruction — all optional, name what applies."},
            {"name": "Confirm the site details",
             "text": "Multi-floor pickup, multi-building pickup, security requirements, preferred slot window, any deadlines (lease expiry, audit date)."},
            {"name": "Agree scope and scheduling",
             "text": "The team returns a feasibility answer + a proposed slot. For jobs above roughly 50 devices or with per-serial tracking needs, ITAD workflow is proposed."},
            {"name": "Scheduled collection + documentation",
             "text": "The team arrives at the confirmed slot with the right transport and paperwork. Documentation is issued during and after the pickup depending on scope."},
        ],
        "sections": [
            {"h2": "When bulk pickup fits vs when ITAD fits",
             "body": (
                "Two workflows exist for bulk collections. Choosing the right one at the start "
                "avoids re-scoping mid-job:\n\n"
                "Standard bulk pickup fits when the job is a one-off (office cleanout, single "
                "relocation, school store-room clearance), per-device asset tracking is not "
                "required, data destruction is either handled in-house before pickup or a bulk-"
                "batch certificate is enough, and the device count is roughly 10 to 50 items.\n\n"
                "ITAD workflow fits when you are inside a formal IT refresh cycle, need per-"
                "serial disposition records for finance / audit / insurance, need per-drive "
                "certified data destruction (DPDP compliance, medical data, financial data, "
                "government data), or the job is large enough (50+ devices) that the ITAD "
                "process overhead pays off."
             )},
            {"h2": "Documentation options for bulk jobs",
             "body": (
                "Bulk pickups often need more paperwork than home pickups. Options available on "
                "request:\n\n"
                "Pickup acknowledgement — signed at collection, showing categories and rough "
                "counts. Standard for every bulk pickup.\n\n"
                "GST invoice — for GST-registered organisations that want the pickup on the "
                "books for tax or audit purposes.\n\n"
                "Per-device asset log — serial, model, condition and disposition captured per "
                "unit. Used for insurance disposal records, corporate audit trails, and end-of-"
                "lease records. This is the ITAD workflow.\n\n"
                "Certificate of Destruction — issued per drive or per batch after data "
                "destruction is complete. Serialised for high-security workflows.\n\n"
                "Environmental disposal record — for CSR reports, ESG filings, and "
                "sustainability audits."
             )},
            {"h2": "Multi-site and multi-floor coordination",
             "body": (
                "Multi-site bulk pickups (retail chains, campus environments, multi-office "
                "companies) can be planned as a single multi-visit engagement rather than "
                "several independent bookings. This means one point of contact, consolidated "
                "documentation across sites, and coordinated scheduling around each site's "
                "access constraints.\n\n"
                "Multi-floor pickups within one building are straightforward — mention floor "
                "count, lift access, and any building-level rules about commercial vehicle "
                "entry timing. Some office buildings have restrictions on freight-lift use "
                "outside specific hours."
             )},
        ],
        "faqs": [
            {"q": "What counts as bulk pickup?",
             "a": "Anything not a routine single-visit collection. Rough thresholds: 10+ devices, full apartment/office cleanout, or any pickup that needs advance scheduling because of size, quantity or documentation requirements."},
            {"q": "How much notice do you need for bulk pickup?",
             "a": "Standard bulk (10-30 devices): 3-5 working days. Large bulk (50+ devices, full-office decommissioning, server-room clearance): 1-2 weeks so the route, transport and destruction slots can be lined up."},
            {"q": "Is bulk pickup free?",
             "a": "Pickup itself is free for eligible bulk collections. Additional services — certified data destruction with per-device serialised certificates, on-site destruction, urgent scheduling, multi-location scheduling — may carry costs quoted before the job."},
            {"q": "Do I need an exact inventory to book?",
             "a": "No. An approximate count by category is enough for booking. Exact per-device inventory happens at pickup, either informally (pickup acknowledgement) or formally (ITAD asset log)."},
            {"q": "Can you handle multi-location bulk pickup?",
             "a": "Yes. Retail chains, campus environments, multi-office companies can be planned as multi-visit engagements with one point of contact and consolidated documentation."},
            {"q": "What if items are on different floors?",
             "a": "Multi-floor pickup within one building is straightforward. Include floor count and lift access in your message. Some buildings restrict commercial vehicle timing — mention if yours does."},
            {"q": "Do you invoice for bulk pickups?",
             "a": "GST invoice is available on request. Standard bulk pickup produces a pickup acknowledgement signed at collection; formal invoicing is added when you say so at booking."},
        ],
        "related_pages": rel(
            CORE_LINKS["pickup"], CORE_LINKS["office_pickup"], CORE_LINKS["corporate"],
            CORE_LINKS["itad"], CORE_LINKS["data"], CORE_LINKS["locations"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like a bulk e-waste pickup — here are the details:",
    }


def spec_battery_pickup() -> dict:
    return {
        "path": "/battery-pickup/",
        "title": "Battery Pickup in Kochi | Safe Collection for UPS, Laptop, Inverter",
        "description": "Battery pickup in Kochi — safe doorstep collection for UPS, inverter, laptop, phone, lithium and lead-acid batteries. Swollen batteries handled with advance notice.",
        "h1": "Battery Pickup in Kochi",
        "breadcrumb_label": "Battery Pickup",
        "service_type": "Battery collection and safe transport",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Batteries need different handling from general e-waste — different transport rules, "
            "different storage precautions, different downstream processing. This page covers "
            "how battery pickup is booked separately from general pickup, what to do with "
            "swollen or damaged batteries before the team arrives, and how bulk battery batches "
            "(from offices with UPS/inverter systems) get scheduled."
        ),
        "direct_answer": (
            "To book a battery pickup in Kochi, WhatsApp Ewaste Kochi with the battery type "
            "(UPS, inverter, laptop, phone, lithium, lead-acid), quantity, condition, and your "
            "address. Swollen or leaking batteries need a photo and advance notice so the team "
            "can bring appropriate containment. Doorstep pickup is free for eligible "
            "collections; large bulk battery jobs may need scheduled transport."
        ),
        "key_takeaways": [
            "UPS, inverter, laptop, phone, lithium, lead-acid — all accepted.",
            "Swollen or damaged batteries need photo + advance flag before pickup.",
            "Battery-only pickup is a valid booking; does not need to be bundled with other e-waste.",
            "Bulk battery jobs (office UPS retirement, e-vehicle) may need scheduled transport.",
            "Store batteries away from heat and other metals until pickup.",
        ],
        "accepted_items": {
            "columns": ["Battery type", "Route", "Notes"],
            "rows": [
                ["Laptop batteries (loose or in laptop)", "Lithium-ion recycling", "Flag if swollen"],
                ["Phone batteries (loose or in phone)", "Lithium-ion recycling", "Flag if swollen"],
                ["UPS batteries (small office, home)", "Lead-acid recycling", "Heavy — advance access planning"],
                ["Inverter batteries (home solar/backup)", "Lead-acid recycling", "May need multi-battery bank pickup"],
                ["Lithium-ion power banks", "Lithium-ion recycling", "Include cable if present"],
                ["Car / two-wheeler batteries", "Lead-acid recycling", "Confirm current-charge state"],
                ["Electric-vehicle (e-bike/e-scooter) batteries", "Specialised lithium handling", "Advance notice; may need site inspection"],
                ["Button cells, watch batteries", "Small-cell recycling", "Batch multiple in one pickup"],
                ["Damaged / swollen / leaking batteries", "Contained transport + specialised handling", "Photo required at booking"],
            ],
        },
        "how_to_steps": [
            {"name": "Message the battery details",
             "text": "Type, approximate size, quantity, and — importantly — condition (working, worn, swollen, leaking, damaged). One photo helps route the right transport containment."},
            {"name": "Store safely before pickup",
             "text": "Keep batteries in a cool, dry place. Away from direct sunlight, away from other metal objects (which could short across terminals), and away from anything flammable. Do not stack heavy items on top."},
            {"name": "Flag any damage explicitly",
             "text": "Swollen phone battery, leaking inverter cell, cracked laptop battery — these need the team to bring specific containment. Do not attempt to puncture, crush or take apart a damaged battery yourself."},
            {"name": "Confirm slot and access",
             "text": "Battery-only pickup is a valid single booking. Small pickups may combine with a nearby scheduled route. Bulk battery batches (office UPS refresh) usually need dedicated transport."},
            {"name": "Doorstep collection",
             "text": "The team arrives with appropriate containment for the battery types you flagged, verifies the items, and collects. Batteries route to specific recycling streams by chemistry — lead-acid, lithium-ion, alkaline, mercury-cell."},
        ],
        "sections": [
            {"h2": "Swollen batteries — what to do, what not to do",
             "body": (
                "A swollen lithium battery is a real fire and burn risk if punctured, crushed, "
                "or shorted. The safe sequence:\n\n"
                "Do: leave the battery inside the device (do not try to remove a swollen laptop "
                "battery yourself); place the device on a non-flammable surface (tile, ceramic, "
                "concrete); keep away from direct sunlight, heat, and other metals; take a "
                "photo; message the team with the photo and flag 'swollen battery'.\n\n"
                "Do not: puncture, crush, bend, take apart, submerge in water, or throw into "
                "regular trash. Do not store in an enclosed metal container (which could short "
                "the terminals across the case).\n\n"
                "The team brings appropriate containment (thermally-stable containers with "
                "vermiculite or similar) for damaged battery pickup — flagging in advance is "
                "what makes this work."
             )},
            {"h2": "Bulk battery pickup — offices with UPS/inverter systems",
             "body": (
                "Offices, factories, hospitals, apartment societies and telecom sites often "
                "retire whole battery banks at once — 4, 8, 20 or more heavy lead-acid units. "
                "Bulk battery jobs are a different scheduling problem from single-battery "
                "pickup because of weight and transport constraints. A lead-acid battery bank "
                "cannot be tumbled around in a small vehicle — it needs proper vehicle capacity "
                "and load securing.\n\n"
                "For bulk battery jobs, share the count, individual battery specs (rated Ah), "
                "any documentation you need (typical for facilities with maintenance audit "
                "requirements), and preferred slot window. The team plans transport and, if "
                "needed, an on-site inspection before the pickup slot is confirmed."
             )},
            {"h2": "Downstream: what happens to the battery after collection",
             "body": (
                "Different battery chemistries route to different recycling streams. Lead-acid "
                "batteries (UPS, inverter, car, two-wheeler) route to lead-acid recycling — "
                "well-established in India, with lead recovered for reuse and acid neutralised. "
                "Lithium-ion batteries (laptop, phone, power bank, e-vehicle) route to lithium-"
                "ion recycling, which recovers cobalt, nickel, lithium, and copper depending on "
                "the cell chemistry. Alkaline and button cells route to specialised handling for "
                "the mercury and heavy metals they can contain.\n\n"
                "None of this happens by dumping batteries into general recycling — which is why "
                "battery pickup is booked separately even when it is part of a larger e-waste "
                "collection."
             )},
        ],
        "faqs": [
            {"q": "Where can I recycle batteries in Kochi?",
             "a": "Message Ewaste Kochi with the battery type, quantity, condition and your location. Doorstep pickup is arranged based on area, and batteries route to chemistry-specific recycling streams (lead-acid, lithium-ion, alkaline, mercury-cell)."},
            {"q": "My laptop battery is swollen — what do I do?",
             "a": "Leave it inside the laptop. Place the laptop on a non-flammable surface (tile, ceramic), away from heat, direct sunlight, and other metals. Take a photo. Message the team flagging 'swollen battery' with the photo — they bring appropriate containment for pickup."},
            {"q": "Can I book a pickup for just batteries?",
             "a": "Yes. Battery-only pickup is a valid single booking; it does not need to be bundled with other e-waste. Small pickups may combine with a nearby scheduled route rather than a dedicated visit."},
            {"q": "How are UPS batteries picked up?",
             "a": "Lead-acid UPS batteries are heavy — a small home UPS is manageable in a routine pickup, but bank of 4+ UPS units usually needs advance planning for vehicle capacity and load securing. Mention count in your message so transport can be planned."},
            {"q": "Do you take e-vehicle batteries (e-bike, e-scooter)?",
             "a": "Yes, with advance notice. E-vehicle batteries route through specialised lithium handling because of their capacity. Some cases may need a site inspection before pickup — the team confirms this after seeing the specs."},
            {"q": "What about damaged or leaking batteries?",
             "a": "Accepted, with advance flag and a photo at booking. The team brings thermally-stable containment. Do not attempt to puncture, crush or take apart damaged batteries yourself — they are a real fire and burn risk."},
            {"q": "How should I store batteries before pickup?",
             "a": "Cool, dry place. Away from direct sunlight, away from other metal objects (short-circuit risk), away from anything flammable. Do not stack heavy items on top. For damaged batteries, keep on a non-flammable surface."},
            {"q": "Do old car and two-wheeler batteries count?",
             "a": "Yes — accepted and route to lead-acid recycling. Confirm the current-charge state in your message (some pickups may need a load-transport check for heavily-discharged units)."},
        ],
        "related_pages": rel(
            CORE_LINKS["battery"], CORE_LINKS["pickup"], CORE_LINKS["battery_safety"],
            CORE_LINKS["locations"], CORE_LINKS["home_e_waste_pickup"] if False else ("/home-e-waste-pickup/", "Home e-waste pickup"),
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like a battery pickup — here are the details:",
    }


def spec_laptop_scrap_price() -> dict:
    return {
        "path": "/laptop-scrap-price/",
        "title": "Laptop Scrap Price in Kochi | Condition-Based Estimate",
        "description": "Laptop scrap price in Kochi — condition-based estimate by brand, model, generation and drive state. Send photos on WhatsApp for a quote; confirmed at inspection.",
        "h1": "Laptop Scrap Price in Kochi",
        "breadcrumb_label": "Laptop Scrap Price",
        "service_type": "Laptop scrap valuation and buyback",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Laptop scrap price is not a fixed per-kg number. What actually moves the quote is "
            "brand, model, generation (year), condition (working / cracked screen / dead / "
            "water-damaged), and whether the drive stays with the laptop. This page covers how "
            "the estimate is calculated, what actually influences the number, and why the "
            "confirmed quote can only be given after physical inspection."
        ),
        "direct_answer": (
            "To get a laptop scrap price estimate in Kochi, WhatsApp Ewaste Kochi with the "
            "brand, model, year of manufacture (approximate is fine), condition, and whether "
            "the storage drive is included. A condition-based estimate is returned from the "
            "photos and specs; the confirmed quote is given after physical inspection at "
            "pickup. There is no fixed per-kg laptop scrap rate — buyback value depends on "
            "resale demand, not weight."
        ),
        "key_takeaways": [
            "There is no fixed per-kg laptop scrap price — value depends on resale, not weight.",
            "Brand + model + year + condition + drive state are the five variables.",
            "The estimate you get from photos is deliberately labelled 'estimate', not final.",
            "Confirmed quote is at physical inspection; if it comes in lower than the estimate you can decline without obligation.",
            "Non-working / very old / heavily damaged laptops usually recycle without a payment — pickup remains free.",
        ],
        "accepted_items": {
            "columns": ["Laptop condition", "Typical route", "Estimate approach"],
            "rows": [
                ["Working, last 3 years, common brand", "Buyback quote first", "Full estimate from photos + specs"],
                ["Working, 3-5 years old, mid-range", "Buyback quote possible", "Estimate range, narrower after inspection"],
                ["Working but 5-8 years old", "Buyback rarely; usually recycling", "Low or nil buyback estimate"],
                ["Working, 8+ years old", "Recycling", "No buyback typically"],
                ["Not working (won't power on)", "Recycling + data destruction", "No buyback; free pickup"],
                ["Cracked screen but works", "Reduced buyback OR recycling", "Estimate reduced; final at inspection"],
                ["Water-damaged", "Recycling; data destruction essential", "No buyback typically"],
                ["Physically damaged (cracked case, spilled)", "Recycling", "Photo required for accurate estimate"],
                ["MacBook (any age)", "Model-specific buyback check", "Higher retained value in this bracket"],
                ["Gaming laptop (any brand, discrete GPU)", "Buyback for recent working units", "GPU model heavily affects the quote"],
                ["Enterprise / workstation grade (Dell Precision, HP Z, ThinkPad P)", "Buyback more likely to be viable", "CPU/GPU specs move the number"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model information",
             "text": "The model number is on a sticker on the base of the laptop, or under Settings → About in Windows / About This Mac on macOS. Include the year if you know it."},
            {"name": "Photograph the laptop",
             "text": "Front (screen), back (base), and the model sticker. If there is visible damage (cracked screen, missing keys, scratches), include a close-up."},
            {"name": "State the drive status",
             "text": "Say whether the drive stays with the laptop or you have removed it. If it stays, say whether you want data wiping / physical destruction / handled in-house. This changes the quote."},
            {"name": "Send the message + get an estimate",
             "text": "The team returns a condition-based estimate from the photos and specs — labelled clearly as 'estimate', not final. If the number works, you agree to a pickup slot."},
            {"name": "Physical inspection at pickup",
             "text": "The team checks the laptop against the estimate. If it matches, quote confirmed and payment on the spot. If it comes in lower (visible damage not in photos), the revised quote is stated and you can decline pickup without obligation. If it comes in higher (better condition than estimated), the quote goes up."},
        ],
        "sections": [
            {"h2": "Why there is no fixed per-kg laptop scrap price",
             "body": (
                "You may see 'laptop scrap price per kg' quoted online, but for laptops "
                "specifically, weight-based pricing does not reflect actual value. A brand-new "
                "MacBook Pro weighs about the same as a 10-year-old plastic Compaq. Their "
                "buyback values differ by a factor of ~100x, because value comes from resale "
                "demand and material recovery, not from raw kilograms of plastic and metal.\n\n"
                "For pure material recovery — a dead, unsellable laptop going straight to "
                "recycling — the recovered materials (aluminium chassis, copper in cables, some "
                "precious metals in the mainboard) do have a bulk value, but it is not the "
                "buyback figure you get. The buyback figure is a resale-based estimate for the "
                "working device; material recovery covers pickup logistics without a payment "
                "to the seller."
             )},
            {"h2": "The five things that actually move the quote",
             "body": (
                "1. Brand — Apple, ThinkPad, Dell, HP business, Lenovo, ASUS, Acer, MSI, and "
                "generic no-brand each command different second-hand prices.\n\n"
                "2. Model + generation — a specific model matters. A 2022 XPS 13 is not the "
                "same product as a 2015 XPS 13, even though both are 'XPS 13'.\n\n"
                "3. Age — approximate year of manufacture. Working laptops from the last 3 "
                "years have the highest buyback likelihood; 3-5 years is possible; beyond 5 "
                "years is uncommon.\n\n"
                "4. Condition — powers on / does not power on; screen intact or cracked; keys "
                "working; casing intact; any water damage.\n\n"
                "5. Drive state — stays with the laptop (higher buyback but more data "
                "destruction work) or removed (lower buyback but you keep control of the data)."
             )},
            {"h2": "The estimate vs the confirmed quote",
             "body": (
                "Every quote before physical inspection is a condition-based estimate, and it "
                "is labelled that way in the WhatsApp reply. This is deliberate.\n\n"
                "Physical inspection almost always reveals something the photos did not: keys "
                "that stick, a battery that will not hold charge for more than an hour, a "
                "hinge that grinds when opened, a subtle screen tint, a fan that runs at "
                "startup and never quiets. Sometimes it reveals things in the other direction "
                "too — the laptop is in noticeably better condition than the photos "
                "suggested, and the quote adjusts up.\n\n"
                "If the confirmed quote comes in lower than the estimate and you would rather "
                "not sell at that number, you can decline the pickup without any obligation. "
                "The laptop stays with you. No pickup fee, no restocking fee, no consequence "
                "for declining."
             )},
        ],
        "faqs": [
            {"q": "How is laptop scrap price actually calculated?",
             "a": "There is no per-kg formula. The estimate is calculated from brand + model + year + condition + drive state, referenced against current second-hand market data. Photos and specs give an estimate; physical inspection produces the confirmed quote."},
            {"q": "Is there a per-kg rate for laptop scrap?",
             "a": "Not a meaningful one for buyback. A modern laptop and a 10-year-old plastic model weigh similarly but have very different resale value. For pure material recovery (a dead unsellable laptop) the recovered materials do have bulk value, but pickup covers the logistics — you do not receive a per-kg payment."},
            {"q": "What if my laptop does not power on?",
             "a": "Still accepted. Non-working laptops usually do not qualify for buyback and route straight to material recovery. Pickup is free, no payment received. Data destruction still applies if the drive is present."},
            {"q": "How much is a MacBook worth as scrap?",
             "a": "MacBooks retain resale value longer than most Windows laptops. A working MacBook from the last 3-4 years usually receives a meaningful buyback estimate. Send the model (About This Mac shows year and configuration) for a specific number."},
            {"q": "Does removing the SSD before pickup change the quote?",
             "a": "Yes, slightly. A working laptop with the drive included receives a higher estimate than the same laptop with the drive removed (a buyer would need to source a new drive). But some sellers prefer to remove drives for data security reasons, and this is often the right trade-off."},
            {"q": "What if the confirmed quote is lower than the estimate?",
             "a": "You can decline the pickup without any obligation. The laptop stays with you. Common reasons for a downward revision: keys sticking, battery not holding charge, screen defect only visible in person, hinge damage."},
            {"q": "Do you buy broken laptops?",
             "a": "Yes for pickup (free), rarely for buyback. Physically damaged, water-damaged, or otherwise non-viable laptops usually recycle without payment. Cracked-screen laptops that still work may qualify for a reduced buyback quote."},
        ],
        "related_pages": rel(
            CORE_LINKS["laptop"], CORE_LINKS["sell"], CORE_LINKS["calc"],
            CORE_LINKS["decision"], CORE_LINKS["data"], CORE_LINKS["scrap_prices"],
        ),
        "route": {
            "changefreq": "weekly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like a laptop scrap price estimate — here are the details:",
    }


def spec_phone_buyback() -> dict:
    return {
        "path": "/phone-buyback/",
        "title": "Phone Buyback in Kochi | Condition-Based Quote for iPhones and Android",
        "description": "Phone buyback in Kochi — condition-based quote for iPhones and Android phones, working or damaged. Free doorstep pickup, payment on the spot after inspection.",
        "h1": "Phone Buyback in Kochi",
        "breadcrumb_label": "Phone Buyback",
        "service_type": "Mobile phone buyback and valuation",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Phone buyback works differently from laptop or computer buyback because phone "
            "resale is a much more active second-hand market. Working iPhones and mid-to-high-"
            "range Androids from the last 3-4 years usually receive a meaningful quote. This "
            "page covers what actually moves the number, why factory-resetting the phone "
            "matters, and what happens with cracked, water-damaged or dead phones."
        ),
        "direct_answer": (
            "To get a phone buyback quote in Kochi, WhatsApp Ewaste Kochi with the brand, "
            "model, storage size, colour, condition, and photos of the front, back and "
            "About/Settings screen. A condition-based estimate is returned; the final quote "
            "is confirmed at physical inspection. Payment on the spot for accepted quotes. "
            "Factory-reset the phone before pickup if you can; if you cannot, flag it for "
            "data destruction routing."
        ),
        "key_takeaways": [
            "iPhones and mid-to-high-range Androids from the last 3-4 years get meaningful quotes.",
            "Storage size, colour, and condition all move the number.",
            "Factory-reset before pickup if you can; if not, data destruction is routed instead.",
            "Cracked-screen phones may still qualify at a reduced quote.",
            "Payment on the spot for accepted quotes — cash, UPI, or bank transfer.",
        ],
        "accepted_items": {
            "columns": ["Phone type", "Buyback likelihood", "Notes"],
            "rows": [
                ["iPhone (last 3 years, working)", "High — usually a meaningful quote", "Storage size and colour affect quote"],
                ["iPhone (older but working)", "Medium — reduced quote possible", "Battery health matters"],
                ["High-end Android (Samsung S, Pixel, OnePlus) — last 3 years, working", "High — usually a meaningful quote", "Model + year specifics"],
                ["Mid-range Android (any brand, last 3 years, working)", "Medium — reduced quote", "Bulk-market resale less predictable"],
                ["Older Android (5+ years old) — working", "Low — often recycling only", "Free pickup, no payment typical"],
                ["Cracked screen but works", "Reduced buyback OR recycling", "Photo of the crack helps"],
                ["Water-damaged", "Recycling; data destruction essential", "Usually no buyback"],
                ["Dead phone (won't power on)", "Recycling only; free pickup", "May be salvageable for parts"],
                ["Swollen or leaking battery", "Recycling with separate battery handling", "Photo required at booking"],
                ["Feature phones, BlackBerry-era devices", "Recycling only", "Free pickup, no buyback typical"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model + storage information",
             "text": "iPhone: Settings → General → About shows model, storage, iOS version. Android: Settings → About phone. Include colour and any obvious wear."},
            {"name": "Photograph the phone",
             "text": "Front (screen), back, and the About/Settings screen (which shows the model unambiguously). If there is damage, include a close-up of the damage."},
            {"name": "Factory-reset if you can",
             "text": "Back up first (iCloud/Google/local copy), then sign out of iCloud (iPhone) or remove the Google account (Android), then factory reset. This makes the buyback transaction clean and avoids any residual data risk."},
            {"name": "Get the estimate",
             "text": "The team returns a condition-based estimate. If it works for you, agree to a pickup slot."},
            {"name": "Pickup + physical inspection + payment",
             "text": "The team inspects the phone against the estimate. Final quote confirmed on the spot; payment (cash, UPI, or bank transfer) on the spot for accepted quotes. Decline is fine — no obligation."},
        ],
        "sections": [
            {"h2": "What moves the phone buyback number",
             "body": (
                "For iPhones: model + storage size + colour + battery health (visible in "
                "Settings → Battery → Battery Health) + cosmetic condition. iCloud sign-out is "
                "required for buyback — the team will not proceed with a locked device.\n\n"
                "For Androids: brand + model + storage + condition. Samsung Galaxy S series and "
                "Google Pixels tend to retain more resale value than mid-range brands. Google "
                "account removal is required for buyback.\n\n"
                "For both: cracked screens, dead pixels, dents, missing charging port function, "
                "battery health below ~80% all move the estimate down. Original box, charger, "
                "and accessories move it up (marginally)."
             )},
            {"h2": "Why factory-resetting matters",
             "body": (
                "A factory-reset phone is a much cleaner buyback transaction than a phone "
                "handed over with your account still logged in. If you factory-reset before "
                "pickup:\n\n"
                "The team can inspect the phone unambiguously (turn on, verify boot to setup "
                "screen, confirm no lock).\n\n"
                "There is no residual data risk to you — even if something went wrong "
                "downstream, there is nothing on the device.\n\n"
                "The buyback transaction closes on the spot rather than needing follow-up "
                "coordination for account removal.\n\n"
                "If you cannot factory-reset (phone does not power on, forgotten passcode, "
                "iCloud/Google account locked with an unrecoverable email), flag it when "
                "booking. The phone routes through data destruction at the facility instead of "
                "buyback — the buyback quote does not apply, but pickup is still free."
             )},
            {"h2": "Damaged and non-working phones",
             "body": (
                "Cracked screens: still often qualify for a reduced buyback quote if the phone "
                "still functions. The estimate accounts for the cost of screen replacement in "
                "the second-hand market. Some cracks are cosmetic (rear glass); others are "
                "functional (touch input failing) — flag which type in the photo.\n\n"
                "Water damage: almost never qualifies for buyback (internal corrosion is "
                "unpredictable, and second-hand buyers cannot verify function long-term). "
                "Route: recycling. Data destruction is essential because the storage may still "
                "be technically recoverable even if the phone will not boot.\n\n"
                "Dead phones: no buyback, but still accepted for free pickup and recycling. "
                "Occasionally salvageable for parts.\n\n"
                "Swollen battery: separate handling in the same pickup. Photo required at "
                "booking. Do not attempt to remove the swollen battery yourself."
             )},
        ],
        "faqs": [
            {"q": "How much is my old iPhone worth?",
             "a": "Depends on model, storage size, colour, battery health, and cosmetic condition. Recent iPhones (last 3 years) usually receive a meaningful buyback estimate. Send the model (from Settings → General → About) and photos on WhatsApp for a specific number."},
            {"q": "Do you buy Android phones too?",
             "a": "Yes. Higher-end Android (Samsung Galaxy S, Google Pixel, OnePlus flagship) from the last 3 years typically qualify for a meaningful quote. Mid-range Android may qualify for a reduced quote. Older Android usually goes to recycling only."},
            {"q": "What if my phone screen is cracked?",
             "a": "If the phone still works despite the crack, a reduced buyback quote is often possible — the estimate accounts for replacement screen cost. If the crack has made the phone unusable, it goes to recycling only. Photo of the damage helps the estimate."},
            {"q": "Can I sell a water-damaged phone?",
             "a": "Buyback is rare for water-damaged phones — internal corrosion is unpredictable and second-hand buyers cannot verify long-term function. Recycling is the typical route. Data destruction is essential because storage may still be technically recoverable."},
            {"q": "Do I need to factory-reset before pickup?",
             "a": "If you can, yes — a factory reset makes the buyback transaction clean and removes any residual data risk. If you cannot (phone dead, forgotten passcode, account locked), flag it when booking so the phone routes through data destruction instead."},
            {"q": "Do I get paid on the spot?",
             "a": "Yes for accepted quotes. Payment options: cash, UPI, or bank transfer — your preference. If the confirmed quote at inspection is lower than the estimate and you decline, no payment; you keep the phone."},
            {"q": "Do I need the original box and charger?",
             "a": "Not required. Missing box and charger is fine — the phone is still accepted for buyback or recycling. Having the original box, cable and charger does move the buyback quote up slightly because it improves the second-hand resale story, but the difference is usually small unless the phone is a high-value recent model."},
            {"q": "What about bulk phone recycling from an office?",
             "a": "Yes — offices retiring company-issued phones (contract renewals, end-of-lease) can book bulk phone pickups. Bulk batches usually route through ITAD with IMEI logging and consolidated documentation."},
        ],
        "related_pages": rel(
            CORE_LINKS["mobile"], CORE_LINKS["sell"], CORE_LINKS["calc"],
            CORE_LINKS["decision"], CORE_LINKS["data"], CORE_LINKS["marketplace"],
        ),
        "route": {
            "changefreq": "weekly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like a phone buyback quote — here are the details:",
    }


def spec_it_asset_disposal() -> dict:
    return {
        "path": "/it-asset-disposal/",
        "title": "IT Asset Disposal in Kochi | Secure Decommissioning for Businesses",
        "description": "IT asset disposal in Kochi — secure decommissioning for laptops, servers, storage and networking equipment. Data destruction, asset tracking, disposal documentation.",
        "h1": "IT Asset Disposal in Kochi",
        "breadcrumb_label": "IT Asset Disposal",
        "service_type": "Corporate IT asset disposal (ITAD)",
        "last_updated": LAST_UPDATED,
        "lede": (
            "IT asset disposal covers the full end-of-life workflow for corporate IT — not just "
            "'get the old laptops picked up', but the whole chain: inventory, secure data "
            "destruction, disposition (buyback / redeploy / recycle), documentation, and audit-"
            "ready records. This page is the entry point for offices that need more than a "
            "routine pickup but do not yet have a formal ITAD engagement."
        ),
        "direct_answer": (
            "For IT asset disposal in Kochi, WhatsApp Ewaste Kochi with your office location, "
            "an approximate device count by category (laptops, desktops, servers, phones, "
            "networking), and any specific compliance needs. The team confirms a scheduled "
            "pickup, agrees the workflow (standard bulk disposal or full ITAD with per-serial "
            "tracking), and produces the requested documentation. Doorstep pickup is free for "
            "eligible collections; certified data destruction and per-device tracking are "
            "optional add-ons quoted before the job."
        ),
        "key_takeaways": [
            "Full end-of-life workflow: inventory + data destruction + disposition + documentation.",
            "Fits offices between routine pickup and full ongoing ITAD engagements.",
            "Data destruction options: software wiping, physical shredding, or on-site destruction.",
            "Documentation: pickup acknowledgement, per-device asset log, Certificate of Destruction.",
            "Pickup is free for eligible collections; specific services quoted before the job.",
        ],
        "accepted_items": {
            "columns": ["IT asset class", "Typical route", "Notes"],
            "rows": [
                ["Laptops (fleet retirement)", "Buyback check → data destruction → recycling", "Per-serial tracking under ITAD"],
                ["Desktops and workstations", "Component recovery + data destruction", "Include monitors if bundled"],
                ["Servers (rack, tower)", "Data destruction + component recovery", "See /server-recycling-kochi/"],
                ["Storage arrays (SAN, NAS)", "Physical shredding recommended for drives", "High-security data typical"],
                ["Networking (switches, routers, firewalls, WAPs)", "Component recovery; configuration data on switches worth flagging", "Enterprise units may have resale value"],
                ["Mobile phones (company-issued)", "IMEI logging + buyback check + data destruction", "Bulk phone batch"],
                ["Point-of-sale terminals", "Data destruction (card-data records) + component recovery", "Retail chain typical"],
                ["Docking stations, monitors, keyboards", "Component recovery", "Batch with the parent device"],
                ["Backup tapes and legacy media", "Physical destruction recommended", "Rarely resellable"],
            ],
        },
        "how_to_steps": [
            {"name": "Send an initial scope message",
             "text": "Office address, approximate device counts by category, and any deadlines (lease expiry, audit date, office closure). A rough count is enough for scoping — exact inventory happens later."},
            {"name": "Flag compliance and documentation needs",
             "text": "Any specific compliance framework (DPDP Act, ISO 27001, internal corporate policy, insurance disposal records), any per-drive certification needs, and any client-contract requirements for data handling."},
            {"name": "Agree the workflow — standard bulk or full ITAD",
             "text": "Standard bulk disposal fits smaller jobs without per-serial tracking. Full ITAD adds per-device asset capture, per-drive Certificates of Destruction, and consolidated reporting. Choice depends on scope and compliance requirements."},
            {"name": "Scheduled pickup + on-site verification",
             "text": "The team arrives at the confirmed slot, verifies the device list, captures serials (if ITAD workflow), and collects. Pickup acknowledgement is signed on the spot."},
            {"name": "Data destruction + documentation follow-up",
             "text": "Data destruction happens after collection (or on-site if that scope was agreed). Certificates of Destruction and consolidated asset disposition reports issue after the destruction step is complete."},
        ],
        "sections": [
            {"h2": "Standard bulk disposal vs full ITAD — how to choose",
             "body": (
                "Two workflow options depending on job scope:\n\n"
                "Standard bulk disposal fits when the job is a one-off (single office cleanout, "
                "single project decommissioning), per-device serial tracking is not required, "
                "data destruction can be a bulk-batch certificate rather than per-serial, and "
                "the device count is roughly 10 to 50.\n\n"
                "Full ITAD workflow fits when you are inside a formal IT refresh cycle (annual, "
                "biannual), need per-serial disposition records for finance / audit / "
                "insurance, need per-drive certified data destruction (DPDP compliance, medical "
                "data, financial data, government data), the job is large enough (50+ devices) "
                "that ITAD process overhead pays off, or you are a listed company or subject "
                "to formal compliance frameworks."
             )},
            {"h2": "Data destruction options for corporate IT disposal",
             "body": (
                "Three practical options, in ascending formality:\n\n"
                "Software-based wiping — drives are wiped using accepted overwrite methods "
                "(NIST 800-88 clear/purge level as reference). Drives remain intact and "
                "reusable in refurbished units. Suitable for most business data.\n\n"
                "Physical shredding — drives are physically shredded, cannot be reused. "
                "Recommended for high-security data (medical, financial, legal, government). "
                "Serialised Certificate of Destruction available on request.\n\n"
                "On-site destruction — mobile shredder at your premises, so drives never leave "
                "the building. Highest control, typically used for the most sensitive data. "
                "Separately scoped and quoted.\n\n"
                "For every option, request the documentation you need at the start — Certificate "
                "of Destruction (per-drive or per-batch), asset disposition log, environmental "
                "disposal record for ESG filings. See /data-destruction-certificate-sample/ for "
                "the format."
             )},
            {"h2": "Common IT asset disposal scenarios",
             "body": (
                "IT refresh — end-of-lease Dell/HP fleet replacement. Typical workflow: ITAD "
                "with per-serial tracking, buyback for viable units, recycling for the rest, "
                "documentation for lease-return records.\n\n"
                "Server-room decommission — old server + storage retirement. Physical "
                "shredding recommended for storage arrays; consolidated Certificate of "
                "Destruction.\n\n"
                "Office closure — full IT clearance for a shutting-down or relocating office. "
                "Standard bulk disposal + Certificate for closure/dissolution records.\n\n"
                "POS terminal retirement (retail) — multi-location scheduling, data destruction "
                "essential (terminals hold card data records).\n\n"
                "Startup shutdown — full-office bulk pickup + documentation for tax and "
                "dissolution paperwork.\n\n"
                "Data-centre migration — high-security ITAD workflow, physical shredding of "
                "storage, serialised Certificates."
             )},
        ],
        "faqs": [
            {"q": "What is IT asset disposal?",
             "a": "The full end-of-life workflow for corporate IT: inventory of retiring assets, secure data destruction, disposition (buyback / redeploy / recycle), and audit-ready documentation. Wider scope than a routine pickup — designed for offices with compliance or audit requirements."},
            {"q": "How does this differ from a normal e-waste pickup?",
             "a": "A normal pickup collects items and issues an acknowledgement. IT asset disposal adds per-serial asset capture, per-drive data destruction certification, and consolidated disposition reporting — designed for corporate audit trails, insurance disposal records, and compliance frameworks like DPDP Act."},
            {"q": "Do you handle single-office disposal or only large corporates?",
             "a": "Both. Small-office cleanouts (10-30 devices) route through standard bulk disposal. Larger jobs (50+ devices, per-serial tracking, per-drive certification) route through full ITAD."},
            {"q": "What data destruction options do you offer?",
             "a": "Software wiping (drives stay intact and reusable), physical shredding (drives cannot be reused, recommended for high-security data), and on-site destruction (mobile shredder at your premises). Choose based on data sensitivity and compliance requirements."},
            {"q": "Do we get a Certificate of Destruction for each drive?",
             "a": "Yes on request, under the full ITAD workflow. Certificates are serialised per drive (or per batch, depending on scope) and issued after the destruction step is complete. See /data-destruction-certificate-sample/ for the format."},
            {"q": "How much notice do you need for a scheduled disposal?",
             "a": "Small jobs (10-30 devices) usually need a few working days notice. Larger jobs (100+ devices, server-room decommissioning, multi-site) typically need 1-2 weeks so route, transport, and destruction slots can all be lined up. Urgent jobs (audit deadline, lease expiry) reviewed case-by-case."},
            {"q": "Is IT asset disposal free?",
             "a": "Pickup is free for eligible corporate collections. Additional services — certified data destruction with per-device serialised certificates, on-site destruction, urgent scheduling, multi-location scheduling — carry costs depending on scope. Quoted before the job."},
            {"q": "What documentation is included?",
             "a": "Standard: pickup acknowledgement. With ITAD: per-device asset log (serial, model, condition, disposition). With data destruction: Certificate of Destruction per drive or per batch. Additional formats (CSR reports, ESG filings, insurance records) available on request."},
        ],
        "related_pages": rel(
            CORE_LINKS["itad"], CORE_LINKS["corporate"], CORE_LINKS["data"],
            CORE_LINKS["hdd"], CORE_LINKS["itad_it"], CORE_LINKS["audit"],
            CORE_LINKS["cert_sample"], CORE_LINKS["server"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like to arrange IT asset disposal for our office — here's the scope:",
    }


def spec_school_e_waste_recycling() -> dict:
    return {
        "path": "/school-e-waste-recycling/",
        "title": "School E-Waste Recycling in Kochi | Computer Lab + Office IT Clearance",
        "description": "School e-waste recycling in Kochi — computer lab retirement, office IT clearance, projector and printer disposal for schools, colleges and educational campuses.",
        "h1": "School E-Waste Recycling in Kochi",
        "breadcrumb_label": "School E-Waste",
        "service_type": "School and educational institution e-waste recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Schools, colleges and educational campuses have a distinct e-waste profile — "
            "computer labs with 30-100 near-identical desktops, admin offices with a small IT "
            "fleet, projectors and interactive whiteboards from classrooms, printers and copiers "
            "from staff rooms. This page covers how educational e-waste is scheduled around "
            "term calendars, what documentation schools typically need, and how a computer lab "
            "refresh differs from a mixed clearance."
        ),
        "direct_answer": (
            "For school e-waste recycling in Kochi, WhatsApp Ewaste Kochi with the campus "
            "location, an approximate inventory (computer lab count, admin devices, projectors, "
            "printers), and preferred scheduling window (vacations usually work best). The team "
            "confirms a scheduled pickup and produces the documentation your finance office "
            "typically needs. Pickup is free for eligible collections; per-device tracking and "
            "data destruction are optional add-ons quoted before the job."
        ),
        "key_takeaways": [
            "Computer labs, admin IT, projectors, printers — all accepted.",
            "Scheduling around school vacations is standard and preferred.",
            "Documentation options: pickup acknowledgement, GST invoice, per-device asset log, disposal record for finance.",
            "Data destruction routing for admin machines and shared-drive lab computers.",
            "Bulk scheduling for full-lab refresh; single-visit clearance for mixed items.",
        ],
        "accepted_items": {
            "columns": ["School item", "Route", "Notes"],
            "rows": [
                ["Desktop PCs (computer lab)", "Buyback check + data destruction + material recovery", "Per-machine serial capture useful"],
                ["Laptops (admin, teacher-issued)", "Buyback + data destruction", "May hold student records"],
                ["Projectors (classroom, presentation)", "Material recovery", "Include remote controls and cables"],
                ["Interactive whiteboards / SMART boards", "Material recovery + display handling", "Bulky — advance planning"],
                ["Printers, scanners, copiers (staff rooms)", "Material recovery; MFPs need data destruction", "See /printer-recycling/"],
                ["Old CRT monitors (older labs)", "Material recovery; bulky", "Advance transport planning"],
                ["UPS units and inverter batteries (server room)", "Battery recycling (separate handling)", "Flag battery bank size"],
                ["Networking gear (lab switches, WAPs)", "Material recovery; configuration data worth flagging", "Enterprise-grade may have resale value"],
                ["Old TVs from AV rooms", "See /tv-recycling-kochi/", "CRT vs LCD — flag which"],
                ["Old lab equipment with electronics", "Case-by-case; message with photo", "Not all lab equipment is standard e-waste"],
            ],
        },
        "how_to_steps": [
            {"name": "Message an initial scope",
             "text": "Campus name, address, approximate inventory (rough counts by category), and preferred scheduling window (school vacation dates typically work best)."},
            {"name": "Confirm what documentation your finance office needs",
             "text": "GST invoice, per-device asset log for asset-register update, disposal record for annual audit, Certificate of Destruction for admin devices — name what applies."},
            {"name": "Agree the workflow",
             "text": "Small clearance (mixed items, no per-serial needed) is standard bulk pickup. Computer lab refresh (30-100 similar machines with per-serial capture) is closer to the ITAD workflow."},
            {"name": "Scheduled pickup during vacation",
             "text": "The team arrives during the agreed vacation slot to avoid disrupting term activity. Multi-day pickups possible for large labs; single-visit for smaller clearances."},
            {"name": "Documentation follow-up",
             "text": "Pickup acknowledgement on the spot. GST invoice, asset disposition log, and Certificates of Destruction (for admin data-bearing devices) issue after collection."},
        ],
        "sections": [
            {"h2": "Why school pickup timing matters",
             "body": (
                "Educational campuses have unusual scheduling constraints. Term-time pickup is "
                "disruptive — computer labs, staff rooms, and admin offices are all in active "
                "use, students and staff are on campus, and moving equipment through corridors "
                "affects the school day. Vacation pickup — summer break, mid-term breaks, "
                "annual holidays — is much easier for everyone.\n\n"
                "Most educational bookings coordinate around the school calendar: computer lab "
                "refresh is planned for the long summer break, mixed office clearance is "
                "planned for shorter mid-term breaks, and admin-only pickups (single laptop "
                "replacement, printer retirement) can slot into normal working days without "
                "much disruption.\n\n"
                "Give 2-3 weeks notice for pickups tied to vacation windows — the specific "
                "slots fill up quickly, and access coordination with the school's estate/"
                "facility team takes time."
             )},
            {"h2": "Computer lab refresh vs mixed clearance",
             "body": (
                "Two common scenarios drive most school bookings:\n\n"
                "Computer lab refresh — 30 to 100 similar desktops being replaced with a new "
                "batch. Straightforward from an inventory perspective (largely uniform), but "
                "logistically substantial. Typically routes through ITAD workflow with per-"
                "machine serial capture (useful for the school's asset register update). "
                "Buyback check for viable units; recycling for the rest. Certificate of "
                "Destruction for the shared-drive lab machines if they held student data.\n\n"
                "Mixed office clearance — a heterogeneous batch: an old projector from a "
                "seminar hall, a broken printer from the staff room, three retired laptops "
                "from the admin office, some UPS batteries from the server room. Routes "
                "through standard bulk pickup — no per-serial capture needed unless the school "
                "specifically wants it. Single visit usually sufficient."
             )},
            {"h2": "Documentation typical schools request",
             "body": (
                "School finance and administration offices usually need more paperwork than a "
                "consumer pickup for compliance, audit, and asset-register purposes:\n\n"
                "GST invoice — for schools that need the pickup on the books for accounting.\n\n"
                "Per-device asset log — for updating the school's asset register when specific "
                "machines are retired. Shows serial, model, condition, and disposition per "
                "device.\n\n"
                "Certificate of Destruction — for any admin machines that held student "
                "records, staff records, financial data, or exam papers. Serialised per drive "
                "for high-sensitivity data.\n\n"
                "Annual disposal record — for finance audit trails, showing the categories, "
                "counts, and disposition of e-waste retired during the financial year.\n\n"
                "For grants, CSR reports, or ESG filings some campuses need — the "
                "environmental disposal record can be issued in the requested format."
             )},
        ],
        "faqs": [
            {"q": "Do you handle computer lab refresh for schools?",
             "a": "Yes — a common booking. 30 to 100 similar desktops in one visit (or multi-day for very large labs), with per-machine serial capture for the school's asset register and Certificates of Destruction for the shared-drive machines. Typically scheduled around vacation windows."},
            {"q": "When is the best time to schedule a school pickup?",
             "a": "School vacations — summer break, mid-term breaks, annual holidays. Term-time pickup is disruptive to computer labs, staff rooms, and admin offices. Give 2-3 weeks notice for vacation-window pickups since slots fill quickly."},
            {"q": "What about old projectors and interactive whiteboards?",
             "a": "Both accepted. Projectors are straightforward; interactive whiteboards / SMART boards are bulky and need advance transport planning. Include remote controls, cables, and any wall-mount hardware."},
            {"q": "Do you provide documentation for the school's finance office?",
             "a": "Yes on request. Standard options: GST invoice, per-device asset log for asset-register updates, Certificate of Destruction for admin data-bearing devices, annual disposal record for audit trails. Name what your finance office needs when booking."},
            {"q": "Is data destruction needed for school computers?",
             "a": "For admin machines and shared-drive lab computers, yes. Admin laptops may hold staff records, student records, financial data, or exam papers. Shared-drive lab machines may hold student work. Route through data destruction with Certificate for the sensitive units."},
            {"q": "What about old UPS batteries from the server room?",
             "a": "Battery recycling — accepted, and often bundled into a school clearance. Flag the battery count (single UPS vs bank of 4+ vs full inverter system) in your message so transport can be planned. See /battery-recycling/ for details."},
            {"q": "Do you serve colleges and higher-education campuses too?",
             "a": "Yes. The workflow is similar; scale is often larger (multiple labs, department servers, library computers). ITAD workflow with per-serial capture is typical for higher-education asset-register updates."},
            {"q": "Is pickup free for schools?",
             "a": "Pickup itself is free for eligible collections. Additional services — certified data destruction with per-device serialised certificates, urgent scheduling, multi-day large-lab pickups — may carry costs quoted before the job."},
        ],
        "related_pages": rel(
            CORE_LINKS["corporate"], CORE_LINKS["office_pickup"], CORE_LINKS["itad"],
            CORE_LINKS["data"], CORE_LINKS["computer"], CORE_LINKS["locations"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like to arrange e-waste recycling for our school — here's the scope:",
    }


def spec_hospital_e_waste_recycling() -> dict:
    return {
        "path": "/hospital-e-waste-recycling/",
        "title": "Hospital E-Waste Recycling in Kochi | Medical IT + Data Destruction",
        "description": "Hospital e-waste recycling in Kochi — retiring medical IT equipment with certified data destruction, per-device tracking, and compliance-focused documentation.",
        "h1": "Hospital E-Waste Recycling in Kochi",
        "breadcrumb_label": "Hospital E-Waste",
        "service_type": "Hospital and healthcare e-waste recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Healthcare e-waste sits in a different risk category from other office e-waste. "
            "Patient records, medical imaging archives, biometric data, and prescription "
            "systems all leave residue on the storage in retired hospital equipment. This "
            "page covers how hospital e-waste recycling in Kochi routes through certified "
            "data destruction by default, why physical shredding is the default recommendation "
            "for medical-data drives, and what documentation typical hospital compliance "
            "workflows need."
        ),
        "direct_answer": (
            "For hospital e-waste recycling in Kochi, WhatsApp Ewaste Kochi with the hospital "
            "location, an approximate inventory (imaging workstations, admin PCs, patient-"
            "record terminals, servers, printers, medical devices with electronics), and any "
            "compliance requirements (DPDP Act, internal medical records policy, insurance "
            "audit needs). Data destruction — usually physical shredding of storage — is "
            "the default for medical-data drives. Serialised Certificates of Destruction "
            "issued after destruction. Doorstep pickup free for eligible collections; "
            "certification, per-serial tracking, and on-site destruction quoted before the "
            "job."
        ),
        "key_takeaways": [
            "Medical data on retired hospital IT is a distinct risk class — treat every drive as sensitive by default.",
            "Physical shredding recommended for medical-data drives; software wiping only for lower-sensitivity assets.",
            "Serialised Certificate of Destruction per drive is typical for hospital compliance.",
            "On-site destruction (mobile shredder at your premises) available when drives cannot leave the building.",
            "Scheduling accommodates hospital operational constraints; no disruption to patient areas.",
        ],
        "accepted_items": {
            "columns": ["Hospital item", "Route", "Notes"],
            "rows": [
                ["Patient-record terminals (reception, wards)", "Physical shredding of drive + material recovery", "Per-drive Certificate typical"],
                ["Medical imaging workstations (radiology, PACS)", "Physical shredding + material recovery", "May hold DICOM archives"],
                ["Admin PCs (finance, HR, procurement)", "Software wiping or physical shredding + material recovery", "Sensitivity depends on role"],
                ["Doctor and staff laptops", "Physical shredding of drive + buyback check for hardware", "Assume data-bearing"],
                ["Servers (EMR, RIS, PACS, admin)", "See /server-recycling-kochi/ + physical shredding", "High-value data typical"],
                ["Storage arrays (imaging archives)", "Physical shredding recommended", "Highest-sensitivity typically"],
                ["Networking gear (switches, WAPs, firewalls)", "Component recovery; configuration data may be sensitive", "Enterprise units"],
                ["Printers and multifunction devices (patient discharge forms, prescriptions)", "Data destruction for MFP internal HDDs + material recovery", "See /printer-recycling/"],
                ["Point-of-care devices with electronics", "Case-by-case; message with photo and model", "Some medical devices are not standard e-waste"],
                ["Old UPS batteries (server room, ICU backup)", "Battery recycling (separate handling)", "Flag battery bank size"],
            ],
        },
        "how_to_steps": [
            {"name": "Initial scope + confidentiality contact",
             "text": "Message the hospital's IT lead or facility manager as the point of contact. Send approximate device count by category and any compliance requirements. Hospital enquiries are handled with the confidentiality expected for medical operational data."},
            {"name": "Agree the data destruction workflow",
             "text": "Default recommendation for medical-data drives: physical shredding with per-drive serialised Certificate of Destruction. Software wiping is an option for lower-sensitivity assets. On-site destruction (mobile shredder at your premises) is available when drives cannot leave the building."},
            {"name": "Confirm compliance documentation needs",
             "text": "DPDP Act 2023 compliance records, internal medical records policy trail, insurance audit disposal records, per-drive Certificates for individual device retirement, consolidated batch reports for periodic disposal. Name what applies."},
            {"name": "Schedule around hospital operations",
             "text": "Pickup timing avoids patient-facing hours where possible. Multi-department pickups can be planned as multi-visit to avoid disrupting any single ward or department. Direct access to server rooms coordinated with hospital IT."},
            {"name": "Scheduled pickup + certified destruction + documentation",
             "text": "Team arrives at agreed slot, verifies device list (per-serial for ITAD workflow), collects. Data destruction (off-site or on-site depending on scope) happens after collection. Serialised Certificates of Destruction issue after destruction is complete."},
        ],
        "sections": [
            {"h2": "Why medical data is a distinct risk class",
             "body": (
                "Retired hospital IT can hold DICOM imaging archives (X-rays, MRIs, CT scans), "
                "electronic medical records (EMR), patient histories, biometric data, "
                "insurance records, prescription systems, laboratory results, and mental "
                "health notes. Under DPDP Act 2023 and standard medical records policy, this "
                "data has a much higher sensitivity classification than typical business data."
                "\n\n"
                "Software wiping — the standard for general business data — is technically "
                "sufficient for medical data if done correctly with certified overwrite tools "
                "and per-drive verification. However, physical shredding is the default "
                "recommendation for medical-data drives because it removes the failure modes "
                "that software wiping still has (wipe fails silently, drive has unaddressable "
                "bad sectors, drive was already partially failed before wiping).\n\n"
                "For the highest-sensitivity data (mental health records, DNA/genetic data, "
                "certain research trial data), on-site destruction with a mobile shredder — "
                "so drives never leave the hospital premises — provides the most defensible "
                "chain of custody. This is a separately-scoped and separately-quoted service."
             )},
            {"h2": "What hospital compliance documentation typically covers",
             "body": (
                "Hospital procurement, compliance, and audit teams typically need "
                "documentation that supports:\n\n"
                "DPDP Act 2023 — record of secure disposal for personal data processed by the "
                "hospital. Certificate of Destruction per drive is the standard artefact.\n\n"
                "Medical records policy trail — some hospitals have internal policies (or are "
                "subject to accreditation body policies like NABH) that require documented "
                "disposal of any device holding patient records. Per-drive Certificates support "
                "this.\n\n"
                "Insurance disposal records — hospitals with cyber-liability insurance often "
                "have policy language requiring documented certified destruction of retired "
                "storage. Consolidated batch reports plus per-drive Certificates support "
                "insurance renewals and any incident-response demonstration.\n\n"
                "Asset-register updates — finance and procurement need per-serial disposition "
                "records to remove retired devices from the hospital's asset register. ITAD "
                "workflow provides this."
             )},
            {"h2": "Scheduling around hospital operations",
             "body": (
                "Hospitals cannot pause. Pickup timing is planned to avoid disruption:\n\n"
                "Patient-facing areas (reception, wards, OPD, imaging) — pickup happens outside "
                "peak clinical hours where practical. Multi-department pickups planned across "
                "several visits rather than one large disruption.\n\n"
                "Server rooms — direct access coordinated with the hospital IT lead. Server-"
                "room work often happens during planned maintenance windows.\n\n"
                "Confidentiality — hospital enquiries and the resulting device lists are "
                "handled with the confidentiality expected for medical operational data. "
                "Serials, device counts, and disposition records are shared only with the "
                "hospital's designated point of contact.\n\n"
                "Multi-site hospitals — chains and multi-campus hospitals can plan disposal "
                "as one coordinated engagement across sites, with consolidated documentation."
             )},
        ],
        "faqs": [
            {"q": "How do you handle patient data on retired hospital equipment?",
             "a": "By default: physical shredding of the drive, with per-drive serialised Certificate of Destruction issued after the destruction step. This is the recommendation for any drive that held medical records, imaging archives, or patient data — software wiping is an option for lower-sensitivity assets but not the default for medical-data drives."},
            {"q": "Do you offer on-site destruction so drives don't leave the hospital?",
             "a": "Yes — mobile shredder at your premises, drives destroyed on-site with your compliance officer present. Highest chain-of-custody control, typically used for the most sensitive data (mental health records, DNA/genetic data, high-value research). Separately scoped and quoted."},
            {"q": "What documentation do you provide for DPDP Act compliance?",
             "a": "Serialised Certificate of Destruction per drive as the standard artefact. Consolidated batch reports for periodic disposal. Asset disposition log tied to the hospital's asset register. Additional formats available on request — name what your compliance or audit team needs."},
            {"q": "Can you handle medical imaging workstations (radiology, PACS)?",
             "a": "Yes. Imaging workstations may hold local DICOM archives; storage arrays holding PACS data are highest-sensitivity typically. Route: physical shredding of storage, per-drive Certificates, and coordinated pickup around imaging department operational needs."},
            {"q": "What about older medical equipment with embedded electronics?",
             "a": "Case-by-case. Some point-of-care devices and older diagnostic equipment have embedded storage that holds patient data; some are simply e-waste with no data component. Message the model and a photo — the team confirms handling."},
            {"q": "How is confidentiality maintained during a hospital pickup?",
             "a": "Hospital enquiries, device lists, serials, and disposition records are shared only with the hospital's designated point of contact (usually IT lead or compliance officer). The team's staff handling hospital pickups are briefed on the confidentiality expected for medical operational data."},
            {"q": "Do you serve multi-campus hospitals or hospital chains?",
             "a": "Yes. Multi-site pickup can be planned as one coordinated engagement across sites, with a single point of contact and consolidated documentation covering all sites. Common for hospital chains with several branches in Kochi and Ernakulam district."},
            {"q": "Is pickup free for hospitals?",
             "a": "Pickup itself is free for eligible collections. The additional services hospitals typically need — physical shredding with per-drive Certificates, on-site destruction, urgent scheduling around operational needs, multi-site coordination — carry costs quoted before the job."},
        ],
        "related_pages": rel(
            CORE_LINKS["corporate"], CORE_LINKS["itad"], CORE_LINKS["data"],
            CORE_LINKS["hdd"], CORE_LINKS["cert_sample"], CORE_LINKS["server"],
        ),
        "route": {
            "changefreq": "monthly", "priority": 0.9,
            "type": "service", "sitemap_group": "services", "lang": "en-IN",
        },
        "whatsapp_message": "Hi, I'd like to arrange e-waste recycling for our hospital — here's the scope:",
    }


# ---------------------------------------------------------------------------
# Batch runner
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Batch 2 — 15 additional pillar cluster children (2026-07-28)
# ---------------------------------------------------------------------------
# Compact structure: each spec at ~120-180 lines Python, targeting ~900-1,100
# rendered words. Follows the same anti-fabrication discipline as Batch 1.


def _std_route(sitemap_group: str = "services", freq: str = "monthly", pri: float = 0.9):
    return {"changefreq": freq, "priority": pri, "type": "service",
            "sitemap_group": sitemap_group, "lang": "en-IN"}


def spec_electronics_recycling() -> dict:
    return {
        "path": "/electronics-recycling/",
        "title": "Electronics Recycling in Kochi | Free Doorstep Pickup",
        "description": "Electronics recycling in Kochi — free doorstep pickup for consumer, home and office electronics with material recovery and data destruction where needed.",
        "h1": "Electronics Recycling in Kochi",
        "breadcrumb_label": "Electronics Recycling",
        "service_type": "General electronics recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "'Electronics recycling' is the broader umbrella for what most people call e-waste — "
            "the mix of phones, chargers, cables, small home appliances, laptops, computer "
            "peripherals, remotes, routers and old electronic bits accumulated over years. This "
            "page explains what the category includes, how it differs from more specialised "
            "flows (battery, ITAD, large appliances), and how a routine electronics pickup "
            "actually works from message to collection."
        ),
        "direct_answer": (
            "To recycle electronics in Kochi, WhatsApp Ewaste Kochi with your item list, "
            "location and photos. The team confirms feasibility, agrees a doorstep slot, and "
            "collects. Working devices with resale value get a condition-based buyback quote; "
            "non-working ones go to material recovery. Pickup is free for eligible collections; "
            "batteries and data-bearing devices are handled separately within the same visit."
        ),
        "key_takeaways": [
            "Phones, chargers, cables, small appliances, laptops, peripherals, routers, remotes — all accepted.",
            "Broader umbrella than dedicated pillar pages (battery, ITAD, appliances have their own workflow).",
            "Working items with resale demand get a condition-based buyback quote.",
            "Batteries and data-bearing devices route through separate handling in the same pickup.",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["Category", "Where it goes", "Notes"],
            "rows": [
                ["Small electronics (phones, chargers, cables)", "Material recovery + resale check", "Batch in one pickup"],
                ["Kitchen electronics (mixer, kettle, small appliances)", "Material recovery", "Include broken units"],
                ["Computer peripherals (keyboards, mice, docks)", "Material recovery", "Batch with parent device"],
                ["Old routers, modems, set-top boxes", "Material recovery", "Common apartment items"],
                ["Digital clocks, remotes, calculators", "Material recovery", "Remove batteries first if possible"],
                ["CFL / LED tube-lights (broken or old)", "Specialised mercury handling", "Ask before booking"],
                ["Small AV equipment (speakers, headphones, chargers)", "Material recovery + component recovery", "Bluetooth devices carry embedded batteries"],
            ],
        },
        "how_to_steps": [
            {"name": "Message an item list and location",
             "text": "One WhatsApp with what you have, area, floor if apartment, and any access notes. Photos help for anything bulky, damaged or unusual."},
            {"name": "Flag batteries and data-bearing items",
             "text": "Say if the pickup includes phones with data, laptops with drives, or any battery types. Both route through separate handling in the same pickup."},
            {"name": "Get slot confirmation",
             "text": "Small pickups may combine with a nearby scheduled route; larger household batches usually get a dedicated slot."},
            {"name": "Prepare items",
             "text": "Group in one accessible location. Factory-reset devices you can. Keep any damaged battery items separately in a cool, dry spot."},
            {"name": "Doorstep collection",
             "text": "Team arrives at the confirmed slot, verifies items against what was messaged, and collects. Buyback payment (if any) is on the spot."},
        ],
        "sections": [
            {"h2": "What 'electronics recycling' covers vs specialised flows",
             "body": (
                "The broader term covers most consumer and small-office e-waste. But some categories have "
                "their own dedicated flow because they need specific handling:\n\n"
                "Batteries — separate transport and chemistry-specific recycling (see /battery-recycling/).\n\n"
                "Home appliances (fridges, ACs, washing machines) — refrigerant and bulk transport (see "
                "/appliance-recycling/).\n\n"
                "Corporate IT batches — per-serial tracking, formal data destruction, audit documentation "
                "(see /itad/).\n\n"
                "TVs and large monitors — bulky transport, CRT hazardous-material handling (see "
                "/tv-recycling-kochi/).\n\n"
                "'Electronics recycling' is where everything else lives — the mixed household or small-"
                "office batch that doesn't fit neatly into one specialised category."
             )},
            {"h2": "What actually happens after pickup",
             "body": (
                "After collection, items are sorted by category at the facility. Working devices with resale "
                "demand route to inspection and refurbishment. Non-working devices, damaged units, and old "
                "consumer electronics route to material recovery — metals (steel, aluminium, copper) and "
                "plastics are separated by type for downstream processing. Data-bearing devices route "
                "through data destruction before either flow. Batteries route to chemistry-specific "
                "recycling.\n\n"
                "None of this involves landfill or dumping. That's the entire point of routing electronics "
                "through an authorised recycler rather than general waste."
             )},
            {"h2": "When to use this page vs a more specific one",
             "body": (
                "Use this page as the starting point if your pickup is a mixed batch of small electronics — "
                "the typical household or office-desk-drawer cleanout. If you're specifically recycling "
                "laptops, use /laptop-recycling/. Specifically phones — /mobile-phone-recycling/. "
                "Specifically batteries — /battery-recycling/. Specifically an office IT refresh — /itad/. "
                "The category-specific pages have more detail on the specific device type."
             )},
        ],
        "faqs": [
            {"q": "What counts as electronics for recycling?",
             "a": "Any device that runs on electricity — phones, chargers, cables, laptops, small appliances, remotes, routers, digital clocks, calculators, speakers, headphones, and so on. If it has a plug, battery, or circuit board, it's electronics for recycling purposes."},
            {"q": "Do I have to sort by category before pickup?",
             "a": "No. A mixed batch is fine — that's actually the typical pickup. What helps is flagging any batteries (separate handling), any data-bearing devices (routed through data destruction if you request), and anything bulky or damaged."},
            {"q": "Are old chargers and cables really worth collecting?",
             "a": "Yes. Cables and chargers contain copper, plastic, and small amounts of other recoverable materials. Batching a drawer full of old chargers into one pickup with other items is much better than throwing them in general waste."},
            {"q": "What about broken items?",
             "a": "All accepted. Working, non-working, cracked, damaged — the pickup handles them the same way. Non-working items usually don't qualify for a buyback quote but still route to proper material recovery."},
            {"q": "Do you accept CFL and LED tube-lights?",
             "a": "Yes, but ask before booking. CFL and older tube-lights contain small amounts of mercury and need specialised handling. LED tube-lights are easier but still route separately from general electronics."},
            {"q": "Can I recycle just one item?",
             "a": "Yes, though single-item pickups usually combine with a nearby scheduled route rather than a dedicated visit. Timing depends on when a route is passing your area."},
            {"q": "Is there a fee for electronics recycling pickup?",
             "a": "Doorstep pickup is free for eligible collections. Some scenarios — very remote locations, urgent same-day requests, oversized single items — may need a small transport-cost quote confirmed before the job."},
        ],
        "related_pages": rel(
            CORE_LINKS["recycling"], CORE_LINKS["pickup"], CORE_LINKS["battery"],
            CORE_LINKS["laptop"], CORE_LINKS["mobile"], CORE_LINKS["locations"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle a batch of electronics — here are the details:",
    }


def spec_network_equipment_recycling() -> dict:
    return {
        "path": "/network-equipment-recycling/",
        "title": "Network Equipment Recycling in Kochi | Switches, Routers, WAPs",
        "description": "Network equipment recycling in Kochi — switches, routers, wireless access points, firewalls, cables. Free pickup with config-data awareness for enterprise gear.",
        "h1": "Network Equipment Recycling in Kochi",
        "breadcrumb_label": "Network Equipment",
        "service_type": "Network equipment recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Old network gear — routers, switches, wireless access points, firewalls, structured "
            "cabling — accumulates in server rooms, IT store cupboards and network cabinets long "
            "after it's been replaced. This page covers what's accepted, why enterprise switches "
            "sometimes carry configuration data that's worth flagging, and how bulk network-"
            "refresh pickups are planned."
        ),
        "direct_answer": (
            "To recycle network equipment in Kochi, WhatsApp Ewaste Kochi with the equipment "
            "type (router, switch, WAP, firewall), rough count, and your address. Enterprise-"
            "grade units may still have configuration data — flag if you want it wiped. "
            "Pickup is free for eligible collections; bulk network-refresh batches route "
            "through ITAD workflow for per-device tracking."
        ),
        "key_takeaways": [
            "Routers, switches, WAPs, firewalls, structured cabling — all accepted.",
            "Enterprise switches and firewalls often hold configuration data worth flagging.",
            "Working enterprise units may qualify for buyback.",
            "Bulk network-refresh batches usually route through ITAD.",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["Item", "Route", "Notes"],
            "rows": [
                ["Home routers, modems, mesh Wi-Fi units", "Material recovery", "Include power adapters"],
                ["Small-office switches (5-24 port)", "Material recovery; resale for recent models", "Configuration data usually not sensitive"],
                ["Enterprise switches (Cisco, Juniper, Aruba)", "Data wipe + material recovery; buyback for recent units", "Config on stacked switches worth wiping"],
                ["Wireless access points (WAPs)", "Material recovery; resale for recent enterprise models", "Include mounting brackets"],
                ["Firewalls, VPN appliances", "Data wipe + material recovery", "Configuration and rules sensitive"],
                ["Rack-mount networking (patch panels, PDUs)", "Material recovery", "Bulky — advance transport"],
                ["Structured cabling (Cat5/Cat6 rolls, patch cables)", "Copper recovery", "Batch by volume"],
                ["Old ISDN, ATM, legacy telecom gear", "Material recovery", "Rare but accepted"],
            ],
        },
        "how_to_steps": [
            {"name": "Message the equipment inventory",
             "text": "Rough count by category (routers, switches, WAPs, firewalls). Model info helps for enterprise units where buyback might apply."},
            {"name": "Flag any configuration data",
             "text": "Enterprise switches with saved configs, firewalls with rule sets, VPN appliances with certificates — say if you want these wiped before recycling or if you've done it in-house."},
            {"name": "Confirm site access",
             "text": "Server-room and network-cabinet access usually coordinated with IT. Rack-mount units need advance transport planning."},
            {"name": "Doorstep or on-site collection",
             "text": "Small batches: doorstep. Rack decommissioning: on-site with proper equipment for rack removal."},
            {"name": "Downstream: buyback or recovery",
             "text": "Working enterprise units checked for resale value first. Non-viable units go to material recovery — networking gear has good copper content."},
        ],
        "sections": [
            {"h2": "Why enterprise networking gear needs a data-awareness flag",
             "body": (
                "Consumer routers and small-office switches don't hold much data worth worrying about. "
                "Enterprise gear is different:\n\n"
                "Managed switches hold running configs, VLAN definitions, port assignments, ACLs, SNMP "
                "communities. Not usually a compliance-level risk, but worth wiping before disposal.\n\n"
                "Firewalls hold rule sets, VPN configurations, certificates, sometimes credentials for "
                "connected services. This is more sensitive — treat as data-bearing.\n\n"
                "VPN concentrators and remote-access appliances hold user credentials, certificates, and "
                "sometimes logs.\n\n"
                "Wireless controllers hold SSID configs, RADIUS credentials, guest-network policies.\n\n"
                "For any of these, either wipe in-house (usually a factory reset via the console) or flag "
                "at booking so the team routes them through configuration wipe before material recovery."
             )},
            {"h2": "Buyback for enterprise network gear",
             "body": (
                "Working enterprise networking equipment from Cisco, Juniper, Aruba, HPE and similar has "
                "an active second-hand market. Recent switches, WAPs and small firewalls often qualify "
                "for a condition-based buyback quote. Very old equipment (roughly a decade or more in "
                "service) usually doesn't — it goes to material recovery, and networking gear has good "
                "copper density so it's still worth collecting.\n\n"
                "Send model numbers with your enquiry — buyback for network gear is very model-specific."
             )},
            {"h2": "Bulk network refresh — planning",
             "body": (
                "Office network refresh, campus Wi-Fi upgrade, data-centre migration — these all produce "
                "batches of old networking equipment. Bulk batches usually route through ITAD with per-"
                "device serial capture (useful for IT asset register updates). Rack-mounted equipment "
                "needs on-site collection because units are bolted into the rack.\n\n"
                "Give 1-2 weeks notice for full network refresh so transport and configuration-wipe slots "
                "can be planned."
             )},
        ],
        "faqs": [
            {"q": "Where can I recycle old office switches and routers?",
             "a": "Message Ewaste Kochi with rough counts, model info if available, and your office address. Small batches are routine doorstep pickup; bulk batches (network refresh, campus upgrade) route through the ITAD workflow with per-device tracking."},
            {"q": "Do you accept home routers and modems?",
             "a": "Yes, all accepted. Batch with other home electronics in one pickup if possible. Include power adapters, and if the router was provided by your ISP that you no longer subscribe to, you can typically dispose of it here rather than returning it — check your ISP terms first."},
            {"q": "What about firewall appliances with sensitive configuration?",
             "a": "Flag at booking. Firewalls hold rule sets, VPN configs, sometimes credentials — either wipe in-house first or route through configuration wipe at the facility. Treat as data-bearing for compliance-sensitive environments."},
            {"q": "Can we get buyback for enterprise switches?",
             "a": "Working, recent (last 5 years) Cisco/Juniper/Aruba/HPE switches often qualify for a condition-based buyback quote. Older equipment usually doesn't but is still collected for material recovery — networking gear has good copper content."},
            {"q": "Do you handle rack-mounted equipment removal?",
             "a": "Yes. Rack-mounted networking gear usually needs on-site collection because units are bolted into the rack. Give 1-2 weeks notice for full rack decommissioning so transport and removal equipment can be arranged."},
            {"q": "What about old copper cabling?",
             "a": "Copper structured cabling is accepted for material recovery. Batch by rough volume in your message (a few patch cables vs a full patch cabinet vs a spool of unused cable)."},
            {"q": "Is there a minimum quantity for network equipment pickup?",
             "a": "No hard minimum. Single-item pickups combine with nearby scheduled routes. Large batches (10+ enterprise units or full-rack decommissioning) usually route through ITAD."},
        ],
        "related_pages": rel(
            CORE_LINKS["itad"], CORE_LINKS["corporate"], CORE_LINKS["office_pickup"],
            CORE_LINKS["data"], CORE_LINKS["server"], CORE_LINKS["computer"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle network equipment — here are the details:",
    }


def spec_sell_old_laptop() -> dict:
    return {
        "path": "/sell-old-laptop/",
        "title": "Sell Old Laptop in Kochi | Condition-Based Buyback + Free Pickup",
        "description": "Sell your old laptop in Kochi — condition-based buyback quote for working laptops, free doorstep pickup, and payment on the spot after inspection.",
        "h1": "Sell Old Laptop in Kochi",
        "breadcrumb_label": "Sell Old Laptop",
        "service_type": "Laptop buyback and sale",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Selling an old laptop in Kochi is different from junking one — it's a buyback flow "
            "with a quote, an inspection, and a payment. This page covers what determines the "
            "quote you get, how the doorstep inspection actually works, and what happens if the "
            "confirmed number is lower than the initial estimate."
        ),
        "direct_answer": (
            "To sell an old laptop in Kochi, WhatsApp Ewaste Kochi with the brand, model, "
            "year, condition and photos. A condition-based buyback estimate is returned; the "
            "team collects at the confirmed slot, physically inspects the laptop, and pays on "
            "the spot for accepted quotes. If the confirmed quote is lower than the estimate "
            "and you decline, no charge — the laptop stays with you."
        ),
        "key_takeaways": [
            "Working laptops from the last 5 years usually qualify for a meaningful buyback quote.",
            "Photos + specs get an estimate; final quote at physical inspection.",
            "Payment on the spot for accepted quotes — cash, UPI, or bank transfer.",
            "Decline the confirmed quote if it's lower than expected — no obligation.",
            "Non-working or older laptops route to recycling instead — pickup still free.",
        ],
        "accepted_items": {
            "columns": ["Laptop", "Buyback likelihood", "Notes"],
            "rows": [
                ["MacBook, last 3-4 years", "High — usually meaningful quote", "Configuration + year specific"],
                ["Business laptops (Dell Latitude, HP EliteBook, ThinkPad)", "Medium-high — recent models", "Enterprise buyers prefer these"],
                ["Consumer laptops (Dell Inspiron, HP Pavilion, ASUS)", "Medium — depends on age and specs", "Spec sheet helps"],
                ["Gaming laptops (recent, working)", "High for recent — GPU model matters", "Include specs of GPU/CPU"],
                ["Chromebooks", "Low-medium — narrower buyer pool", "Enterprise/education models better"],
                ["Older laptops (5+ years old)", "Low — often recycling only", "Free pickup, no payment typical"],
                ["Non-working or damaged", "None — recycling instead", "Free pickup remains"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model + specs",
             "text": "About This Mac (macOS) or Settings → System → About (Windows). Include: model, year, RAM, storage, GPU if any, battery health if you know it."},
            {"name": "Take clear photos",
             "text": "Front (screen on if you can), back, sides. Close-ups of any damage. Ideally a photo of the About/Settings screen showing model info."},
            {"name": "Send WhatsApp with brand + model + specs + condition + photos",
             "text": "One message with everything. The team returns a condition-based estimate — labelled as 'estimate', not final."},
            {"name": "Agree pickup slot if the estimate works",
             "text": "Timing depends on your area and the team's route schedule. Bring the laptop plus charger to the door at the agreed time."},
            {"name": "Inspection + payment (or decline)",
             "text": "Team inspects the laptop against the estimate. If it matches or is better, quote confirmed and payment on the spot. If lower, you can decline without obligation — laptop stays with you."},
        ],
        "sections": [
            {"h2": "How the buyback estimate is actually calculated",
             "body": (
                "The number is based on second-hand market data for that specific model plus condition "
                "adjustments. Five variables move it:\n\n"
                "Brand — Apple retains value best; ThinkPad, Dell business, HP EliteBook next; consumer "
                "brands lower; no-brand laptops usually recycling only.\n\n"
                "Model + year — a 2022 XPS 13 is not the same product as a 2015 XPS 13. Year matters "
                "significantly for the resale market.\n\n"
                "Condition — powers on cleanly, screen intact, keys working, casing OK, battery holds "
                "reasonable charge.\n\n"
                "Drive — laptop with SSD/HDD included is worth more than one without.\n\n"
                "Cosmetics — dents, scratches, worn keyboard, faded screen all reduce the number."
             )},
            {"h2": "Estimate vs confirmed quote — and declining",
             "body": (
                "Every quote before physical inspection is an estimate, labelled that way in the "
                "message. Physical inspection almost always reveals something the photos didn't:\n\n"
                "Keys that stick, a battery that drains in an hour, a hinge that grinds, a subtle screen "
                "defect, a fan that never quiets down — small things that materially affect resale value.\n\n"
                "Sometimes inspection reveals better condition than the photos suggested — the quote "
                "goes up.\n\n"
                "If the confirmed quote comes in lower than the estimate and you'd rather not sell at "
                "that number, you can decline. The team doesn't collect the laptop, no pickup fee, no "
                "restocking fee, no consequence. The laptop stays with you."
             )},
            {"h2": "Data on the laptop",
             "body": (
                "For clean buyback, factory-reset the laptop before pickup: back up what you want, sign "
                "out of iCloud/Apple ID (macOS) or Microsoft account (Windows), then factory reset. "
                "This makes the transaction cleaner and removes any residual data risk to you.\n\n"
                "If you can't (forgotten password, laptop won't boot, admin lock), flag it when booking. "
                "The laptop routes through data destruction — the drive is wiped or physically shredded "
                "before the laptop enters any resale flow. Certificate of Destruction available on "
                "request. See /data-destruction/ for the full workflow."
             )},
        ],
        "faqs": [
            {"q": "How much can I get for an old laptop?",
             "a": "Depends on brand, model, year, condition, and current second-hand market. Working laptops from the last 3-5 years usually get a meaningful quote. Send brand, model, year, and photos on WhatsApp for a condition-based estimate."},
            {"q": "Do you buy MacBooks?",
             "a": "Yes. MacBooks retain resale value well — recent working MacBook Air and Pro models usually get meaningful quotes. Send About This Mac (which shows model, year, configuration) for the specific estimate."},
            {"q": "What if my laptop screen is cracked?",
             "a": "Reduced buyback quote if the laptop still works, or recycling only if it doesn't. Photo of the crack helps the team give a fair estimate."},
            {"q": "Do I need original box, charger, and accessories?",
             "a": "Charger increases the quote (a laptop without charger is worth less). Original box is a small bonus but not required. Missing accessories are fine."},
            {"q": "What happens with the data on my hard drive?",
             "a": "Factory-reset before pickup if you can — cleanest transaction. If you can't, flag it and the laptop routes through data destruction (wipe or shredding) before entering any resale flow. Certificate of Destruction available on request."},
            {"q": "When do I get paid?",
             "a": "On the spot at pickup, after the physical inspection confirms the quote. Cash, UPI, or bank transfer — your preference."},
            {"q": "What if I don't like the confirmed quote?",
             "a": "Decline without obligation. The laptop stays with you, no pickup fee, no charge. Common reasons for decline: confirmed number came in lower than estimate due to damage the photos didn't show clearly."},
            {"q": "Can I sell a batch of laptops from an office?",
             "a": "Yes. Office batches (5+ laptops) usually route through ITAD workflow — buyback for viable units, recycling for the rest, per-device asset tracking, and Certificate of Destruction for the drives."},
        ],
        "related_pages": rel(
            CORE_LINKS["sell"], CORE_LINKS["laptop"], ("/laptop-scrap-price/", "Laptop scrap price — how the number is calculated"),
            CORE_LINKS["decision"], CORE_LINKS["calc"], CORE_LINKS["data"],
        ),
        "route": _std_route("services", "weekly"),
        "whatsapp_message": "Hi, I'd like to sell an old laptop — here are the details:",
    }


def spec_sell_old_computer() -> dict:
    return {
        "path": "/sell-old-computer/",
        "title": "Sell Old Computer in Kochi | Desktop, Laptop, Workstation Buyback",
        "description": "Sell your old desktop, laptop, workstation or server in Kochi — condition-based buyback quote, free doorstep pickup, and payment on the spot after inspection.",
        "h1": "Sell Old Computer in Kochi",
        "breadcrumb_label": "Sell Old Computer",
        "service_type": "Computer buyback and sale",
        "last_updated": LAST_UPDATED,
        "lede": (
            "'Computer' covers a lot when it comes to buyback — desktops, laptops, all-in-ones, "
            "workstations, servers. All can potentially qualify for a quote depending on model, "
            "age and condition. This page covers what generally qualifies, how the process "
            "works for each type, and when a computer is worth more sold than recycled."
        ),
        "direct_answer": (
            "To sell an old computer in Kochi, WhatsApp Ewaste Kochi with the type (desktop, "
            "laptop, workstation, server), brand, model, specs and photos. A condition-based "
            "estimate is returned; the team picks up at the confirmed slot, inspects, and pays "
            "on the spot for accepted quotes. Non-viable computers route to free recycling "
            "instead — no obligation to accept a lower confirmed quote."
        ),
        "key_takeaways": [
            "Desktops, laptops, all-in-ones, workstations, servers — all considered for buyback.",
            "Working machines from the last 3-5 years most likely to qualify.",
            "Workstations (Dell Precision, HP Z, ThinkPad P) often retain higher value.",
            "Payment on the spot for accepted quotes; decline is fine.",
            "Non-viable machines go to free recycling.",
        ],
        "accepted_items": {
            "columns": ["Type", "Buyback likelihood", "Notes"],
            "rows": [
                ["Recent MacBook, MacBook Pro", "High", "Configuration + year specific"],
                ["Business laptops (Dell Latitude, HP EliteBook, ThinkPad)", "Medium-high", "Enterprise buyer demand"],
                ["Workstations (Precision, Z, P-series)", "High if recent — GPU/CPU matters", "Include full specs"],
                ["Gaming laptops with discrete GPU", "High if recent", "GPU model heavily affects quote"],
                ["Consumer desktops (recent, working)", "Medium — depends on config", "Include specs"],
                ["Enterprise servers (recent, working)", "Medium — narrower buyer pool", "Model + year matter"],
                ["All-in-one PCs (iMac and similar)", "Medium — display condition matters", "Photo of screen important"],
                ["Older / very old / non-working", "Low or none — recycling instead", "Free pickup remains"],
            ],
        },
        "how_to_steps": [
            {"name": "Send type + brand + model + specs",
             "text": "Desktop / laptop / workstation / server. Brand and specific model. Specs: CPU, RAM, storage, GPU if any."},
            {"name": "Photograph the machine",
             "text": "Front, back, model plate or sticker. Screen on for laptops and all-in-ones. Close-ups of any damage."},
            {"name": "Receive condition-based estimate",
             "text": "Team returns an estimate from the specs and photos. Labelled as estimate, not final."},
            {"name": "Agree pickup slot",
             "text": "Doorstep pickup for single machines. Multi-machine batches (office) may schedule differently."},
            {"name": "Inspection + payment",
             "text": "Physical inspection confirms the quote. Payment on the spot for accepted quotes. Decline without obligation if the confirmed number is lower than expected."},
        ],
        "sections": [
            {"h2": "Which types most often qualify for buyback",
             "body": (
                "Not all computers qualify. Rough guide:\n\n"
                "Almost always qualify: recent MacBooks (last 3-4 years), recent workstations with meaningful "
                "GPU/CPU specs, recent gaming laptops with discrete graphics, business laptops from the last "
                "3 years.\n\n"
                "Sometimes qualify: consumer laptops from the last 3-4 years (depends on brand and specs), "
                "desktop towers with recent CPU/GPU, all-in-ones from the last 3 years, enterprise servers "
                "with current-generation CPUs.\n\n"
                "Rarely qualify: consumer desktops 5 years old or older, business machines 6 years old or "
                "older, older MacBooks (7 years old or older), machines with heavy visible wear or "
                "non-working components.\n\n"
                "Don't qualify: non-working machines, physically broken machines, machines with major "
                "cosmetic damage, obsolete-generation hardware."
             )},
            {"h2": "Workstations, servers, and specialised hardware",
             "body": (
                "Workstation-class machines — Dell Precision, HP Z, ThinkPad P — often retain value longer "
                "than consumer machines because they have a specific enterprise buyer market. Same for "
                "gaming laptops with discrete GPUs (RTX cards especially) and video-editing workstations "
                "with high-end CPU/GPU/RAM configurations.\n\n"
                "Enterprise servers are more niche. Buyback exists but the market is narrower and quotes "
                "vary widely by generation. Send full model info (Dell PowerEdge Rxxx, HPE ProLiant DLxxx, "
                "Cisco UCS Cxxx) plus CPU generation and RAM for the specific estimate."
             )},
            {"h2": "Deciding: sell or recycle",
             "body": (
                "Rough rule of thumb: if the machine is under 5 years old, works, and was reasonably "
                "specced when new, get a buyback estimate before assuming it's recycling-only. Estimates "
                "are free and non-committal.\n\n"
                "If the machine is over 8-10 years old or doesn't work, it's almost certainly recycling. "
                "That's not a bad outcome — free pickup and proper material recovery is still worth doing.\n\n"
                "The /tools/sell-or-recycle-decision-tool/ walks through this without needing to know "
                "current pricing."
             )},
        ],
        "faqs": [
            {"q": "Do you buy old desktops?",
             "a": "Yes — recent desktops (last 3-4 years) with reasonable specs may qualify for a buyback quote. Older desktops usually go to recycling only, with free pickup."},
            {"q": "What about all-in-one PCs like iMac?",
             "a": "Yes. Screen condition matters — a scratched or dim display reduces the quote. Photo of the screen (on, if possible) helps the estimate."},
            {"q": "Can I sell a broken computer?",
             "a": "Almost never for buyback — non-working or physically broken machines don't have meaningful resale demand. Route: free recycling — pickup is still arranged, but no payment. The materials are properly recovered rather than dumped, which is worth doing even without a buyback quote attached."},
            {"q": "How much is a used server worth?",
             "a": "Depends heavily on model, generation, and configuration. Recent enterprise servers (Dell PowerEdge, HPE ProLiant last 3-4 years) may qualify. Older or specialised units usually don't. Send full model + specs for the estimate."},
            {"q": "Do you buy old workstations?",
             "a": "Yes, and workstations often retain value better than consumer PCs. Dell Precision, HP Z-series, ThinkPad P-series from the last 4-5 years commonly qualify for meaningful quotes. Include full CPU/GPU specs."},
            {"q": "What's the difference between selling and recycling?",
             "a": "Selling: buyback quote for working machines with resale demand, payment on the spot. Recycling: free pickup for non-viable machines, no payment, material recovery. Same team, same pickup; the difference is what happens to the specific machine downstream."},
            {"q": "Do I need to wipe the drive before pickup?",
             "a": "Recommended: yes. Factory reset before pickup for a clean transaction. If you can't (won't boot, forgotten password, admin lock), flag it — the machine routes through data destruction before entering resale."},
            {"q": "Can offices sell bulk retired hardware?",
             "a": "Yes. Office batches (10+ machines) route through ITAD — buyback for viable units, recycling for the rest, per-device asset tracking, consolidated documentation."},
        ],
        "related_pages": rel(
            CORE_LINKS["sell"], CORE_LINKS["computer"], CORE_LINKS["laptop"],
            CORE_LINKS["decision"], CORE_LINKS["calc"], CORE_LINKS["itad"],
        ),
        "route": _std_route("services", "weekly"),
        "whatsapp_message": "Hi, I'd like to sell an old computer — here are the details:",
    }


def spec_sell_old_mobile() -> dict:
    return {
        "path": "/sell-old-mobile/",
        "title": "Sell Old Mobile Phone in Kochi | Free Pickup + Cash",
        "description": "Sell your old mobile phone in Kochi — buyback for iPhones and Android phones, free doorstep pickup, and payment on the spot after inspection.",
        "h1": "Sell Old Mobile Phone in Kochi",
        "breadcrumb_label": "Sell Old Mobile",
        "service_type": "Mobile phone buyback and sale",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Selling an old mobile phone in Kochi is often quicker and easier than most people "
            "expect — the second-hand phone market is active, and even mid-range phones from the "
            "last 3-4 years usually get a real quote. This page covers what determines the price, "
            "how the pickup works, and why factory-resetting the phone before handover matters."
        ),
        "direct_answer": (
            "To sell an old mobile phone in Kochi, WhatsApp Ewaste Kochi with the brand, model, "
            "storage size, condition and photos. A condition-based estimate is returned; the "
            "team picks up at the confirmed slot, inspects the phone, and pays on the spot for "
            "accepted quotes. Factory-reset before pickup if you can. Non-viable phones route "
            "to free recycling."
        ),
        "key_takeaways": [
            "iPhones and mid-to-high Android from the last 3-4 years usually get a meaningful quote.",
            "Factory-reset before pickup for a clean transaction.",
            "Photos of front, back, and About screen help the estimate.",
            "Payment on the spot for accepted quotes.",
            "Dead or heavily damaged phones route to free recycling.",
        ],
        "accepted_items": {
            "columns": ["Phone", "Buyback likelihood", "Notes"],
            "rows": [
                ["iPhone, last 3 years", "High", "Storage + colour + battery health matter"],
                ["Older iPhone (working)", "Medium — reduced quote", "Battery health important"],
                ["Flagship Android (Samsung S/Note, Pixel, OnePlus)", "High — recent models", "Include model and year"],
                ["Mid-range Android (recent, working)", "Medium — reduced quote", "Photos help refine estimate"],
                ["Older Android (5+ years old)", "Low — often recycling only", "Free pickup, no payment typical"],
                ["Cracked-screen but working", "Reduced buyback OR recycling", "Photo of damage helps"],
                ["Water-damaged, dead", "Recycling only — no buyback", "Data destruction essential"],
                ["Feature phones, BlackBerry", "Recycling only", "Free pickup remains"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model + storage details",
             "text": "iPhone: Settings → General → About shows model, storage, iOS version. Android: Settings → About phone. Include colour and any visible condition notes."},
            {"name": "Photograph the phone",
             "text": "Front (screen on, showing home screen or About screen), back, sides. Close-up of any damage. Screenshot of the About screen also works."},
            {"name": "Send WhatsApp with brand + model + storage + condition + photos",
             "text": "One message. Team returns a condition-based estimate."},
            {"name": "Factory-reset before pickup (if you can)",
             "text": "Back up, sign out of iCloud/Google, factory reset. Makes the transaction clean and removes residual data risk."},
            {"name": "Pickup + inspection + payment",
             "text": "Team collects, inspects, and pays on the spot for accepted quotes. Cash, UPI, or bank transfer."},
        ],
        "sections": [
            {"h2": "What drives the mobile buyback quote",
             "body": (
                "For iPhones: model + storage + colour + battery health + cosmetic condition. Battery "
                "health (visible in Settings → Battery → Battery Health) matters more than most sellers "
                "realise — a phone with 78% battery health quotes lower than the same phone at 92%.\n\n"
                "For Androids: brand + model + storage + condition. Samsung Galaxy S/Note and Google "
                "Pixel retain more value than mid-range Androids from generic brands.\n\n"
                "For both: iCloud sign-out (iPhone) or Google account removal (Android) is required for "
                "buyback — the team won't proceed with a locked device. Factory-reset before pickup handles "
                "this cleanly."
             )},
            {"h2": "Why factory-reset before pickup matters",
             "body": (
                "A reset phone is a clean transaction:\n\n"
                "Team can confirm the phone boots cleanly to the setup screen. No lingering account. "
                "No residual data risk to you even in the (very unlikely) case something went sideways "
                "downstream. The buyback closes on the spot.\n\n"
                "If you can't reset (phone doesn't power on, forgotten passcode, iCloud/Google account "
                "locked with an unrecoverable email), flag it when booking. The phone routes through "
                "data destruction at the facility instead of buyback — no buyback payment, but pickup "
                "is still free."
             )},
            {"h2": "Damaged phones",
             "body": (
                "Cracked screens: often still qualify for a reduced quote if the phone works. Some cracks "
                "are cosmetic (rear glass); others are functional (touch input failing). Flag which type "
                "in your photo.\n\n"
                "Water damage: almost never qualifies for buyback — internal corrosion is unpredictable, "
                "and second-hand buyers can't verify long-term function. Route: recycling. Data destruction "
                "essential because storage may still be technically recoverable.\n\n"
                "Swollen battery: separate handling within the same pickup. Photo required at booking. "
                "Do not attempt to remove the swollen battery yourself — leave it in the phone, keep "
                "the phone on a non-flammable surface, book pickup with the flag."
             )},
        ],
        "faqs": [
            {"q": "How do I sell my old iPhone in Kochi?",
             "a": "WhatsApp brand, model, storage, colour, battery health, and photos. Get an estimate. Factory-reset before pickup. Team collects and pays on the spot for accepted quotes."},
            {"q": "How much is my old iPhone worth?",
             "a": "Depends on model, storage size, battery health, and cosmetic condition. Recent iPhones (last 3 years) usually get meaningful quotes. Send model info from Settings → General → About for a specific number."},
            {"q": "Do you buy old Android phones?",
             "a": "Yes. Flagship Android (Samsung Galaxy S/Note, Google Pixel, OnePlus flagship) from the last 3 years usually gets a meaningful quote. Mid-range Android may qualify for reduced quote. Older Android usually goes to recycling only."},
            {"q": "Can I sell a phone with a cracked screen?",
             "a": "If it still works, often yes — at a reduced quote that accounts for replacement screen cost. If the crack has made the phone unusable, it's recycling only. Photo of the damage helps the estimate."},
            {"q": "What about a water-damaged phone?",
             "a": "Buyback is rare — internal corrosion is unpredictable. Recycling is the typical route. Data destruction is essential because storage may still be technically recoverable even if the phone won't boot."},
            {"q": "Do I need to reset the phone first?",
             "a": "If you can, yes — cleanest transaction and no residual data risk. If you can't (phone dead, forgotten passcode, account locked), flag it — the phone routes through data destruction instead of buyback."},
            {"q": "How and when do I get paid?",
             "a": "On the spot at pickup, right after physical inspection confirms the quote. Payment options are cash, UPI, or bank transfer — your preference. No waiting period, no follow-up transfer, no invoicing delay. If you decline the confirmed quote, there's no payment (and no obligation to accept)."},
            {"q": "Do I need the original box and charger?",
             "a": "Not required — missing box and charger is fine. Having them moves the quote up slightly because it improves the second-hand resale story, but the difference is usually modest unless the phone is a high-value recent model. Charger alone (without box) is the most useful accessory to include."},
        ],
        "related_pages": rel(
            CORE_LINKS["mobile"], CORE_LINKS["sell"], ("/phone-buyback/", "Phone buyback — how the number is calculated"),
            CORE_LINKS["marketplace"], CORE_LINKS["decision"], CORE_LINKS["data"],
        ),
        "route": _std_route("services", "weekly"),
        "whatsapp_message": "Hi, I'd like to sell an old mobile phone — here are the details:",
    }


def spec_sell_office_electronics() -> dict:
    return {
        "path": "/sell-office-electronics/",
        "title": "Sell Office Electronics in Kochi | Bulk Buyback for Retired IT",
        "description": "Sell office electronics in Kochi — bulk buyback for retired laptops, desktops, phones and networking gear. Per-device tracking, GST invoicing, spot payment.",
        "h1": "Sell Office Electronics in Kochi",
        "breadcrumb_label": "Sell Office Electronics",
        "service_type": "Office electronics bulk buyback",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Offices retiring IT — end-of-lease returns, IT refresh cycles, department "
            "restructures — often have a batch worth selling rather than dumping. This page "
            "covers how bulk office buyback works, what documentation is available for finance "
            "and asset-register purposes, and how the process fits alongside recycling for "
            "non-viable units in the same batch."
        ),
        "direct_answer": (
            "To sell office electronics in Kochi, WhatsApp Ewaste Kochi with an approximate "
            "inventory (laptops, desktops, phones, networking), your office location, and any "
            "documentation needs (GST invoice, per-device asset log, Certificate of "
            "Destruction). The team returns a per-category estimate, schedules a pickup, and "
            "pays consolidated for accepted units. Non-viable units in the same batch route "
            "to free recycling."
        ),
        "key_takeaways": [
            "Bulk buyback for laptops, desktops, phones, workstations, networking gear.",
            "Per-device inspection at pickup; consolidated payment for accepted units.",
            "GST invoice, per-device asset log, Certificate of Destruction — available on request.",
            "Non-viable units in the same batch route to free recycling.",
            "IT-refresh, end-of-lease, office closure, department retirement — all common scenarios.",
        ],
        "accepted_items": {
            "columns": ["Office IT class", "Buyback flow", "Notes"],
            "rows": [
                ["Laptop fleet (Dell, HP, Lenovo, MacBook)", "Per-device buyback quote", "Include lease-return docs if applicable"],
                ["Desktop PCs and workstations", "Buyback for recent viable units", "Include full specs"],
                ["Company phones (iPhone, Android)", "Per-device buyback + IMEI logging", "Common at contract renewal"],
                ["Enterprise servers (recent)", "Case-by-case buyback", "Model + year matter"],
                ["Networking gear (switches, WAPs, firewalls)", "Buyback for recent enterprise units", "Model-specific"],
                ["Monitors (LCD, LED — recent, working)", "Reduced buyback", "Screen condition matters"],
                ["Older / non-working units in the same batch", "Free recycling", "Split within one visit"],
            ],
        },
        "how_to_steps": [
            {"name": "Message rough inventory + office location",
             "text": "Approximate counts by category. Full asset list not required upfront — captured at pickup."},
            {"name": "Flag documentation needs",
             "text": "GST invoice for the sale, per-device asset log for asset-register update, Certificate of Destruction for drives, insurance disposal records — name what applies."},
            {"name": "Agree the workflow",
             "text": "Small batches (10-30 units) fit standard bulk buyback. Larger jobs or per-serial audit needs route through ITAD workflow."},
            {"name": "Scheduled pickup + on-site inspection",
             "text": "Team arrives at agreed slot, per-device inspection to confirm quotes, captures serials for ITAD if applicable."},
            {"name": "Consolidated payment + documentation",
             "text": "Payment (cash, UPI, bank transfer, or against GST invoice) for accepted quotes on the spot or on invoice terms. Non-viable units in the same batch go to recycling. Documentation issued after collection."},
        ],
        "sections": [
            {"h2": "Common office buyback scenarios",
             "body": (
                "IT refresh — laptop fleet replaced with new units. Buyback for viable laptops (typically "
                "the last 2-3 years of the fleet); recycling for the older units.\n\n"
                "End-of-lease return prep — devices coming off lease that lease company won't accept (or "
                "that lease is being bought out). Buyback for viable units, documentation for lease-return "
                "records.\n\n"
                "Department restructure — one department shutting down or relocating, IT going with. Bulk "
                "buyback + recycling in one visit.\n\n"
                "Office closure or downsizing — full office IT clearance. Split into buyback stream + "
                "recycling stream. Documentation for tax/dissolution records.\n\n"
                "Phone contract renewal — company phones from previous contract cycle. IMEI logging plus "
                "per-device buyback. See /phone-buyback/ for the phone-specific flow."
             )},
            {"h2": "Documentation options",
             "body": (
                "GST invoice — for the sale (with the buyback payment). Standard for any GST-registered "
                "organisation.\n\n"
                "Per-device asset log — serial, model, condition, disposition per unit. Used for updating "
                "the office asset register, insurance records, and end-of-lease documentation.\n\n"
                "Certificate of Destruction — for any drives that were routed through data destruction "
                "before resale. Serialised per drive for high-security data.\n\n"
                "Environmental disposal record — for the non-viable units in the batch that went to "
                "recycling. Used in CSR reports and ESG filings."
             )},
            {"h2": "Data destruction before resale",
             "body": (
                "Every drive from an office machine that's being resold should be wiped or physically "
                "destroyed first. Two options:\n\n"
                "Drive stays with the machine, gets wiped at the facility before the machine enters "
                "resale — quicker, doesn't reduce buyback quote much. Wipe method and Certificate on "
                "request. Suitable for most business data.\n\n"
                "Drive removed at pickup, physically shredded, replacement drive supplied for resale "
                "(or resale value adjusted to reflect missing drive). Slower, drive can't be recovered. "
                "Recommended for high-security data (medical, financial, legal, government).\n\n"
                "For the full data-destruction workflow, see /data-destruction/."
             )},
        ],
        "faqs": [
            {"q": "How does bulk office buyback work?",
             "a": "Message rough inventory + location + documentation needs. Team returns per-category estimate. Scheduled pickup with per-device inspection to confirm each quote. Consolidated payment for accepted units. Non-viable units in the same batch route to free recycling."},
            {"q": "Can I get one invoice for the whole batch?",
             "a": "Yes — GST invoice available on request. Payment can be on the spot (cash/UPI/bank transfer) or on standard invoice terms depending on your office's payment process."},
            {"q": "What about drives that had company data?",
             "a": "Every drive from an office machine going through buyback should be wiped or physically shredded first. Two options: wipe at facility (drive stays intact, faster), or removal + physical shredding (higher security, drive can't be recovered). Certificate of Destruction available on request."},
            {"q": "How is buyback different from ITAD?",
             "a": "Buyback is the sale side — you get paid for viable units. ITAD is the broader workflow (inventory + data destruction + disposition + documentation) that often includes buyback for viable units and recycling for the rest. Buyback is a component of ITAD for jobs that need the full workflow."},
            {"q": "Do you handle end-of-lease returns?",
             "a": "Yes. Buyback for viable end-of-lease units, documentation for lease-return records. Some leases have specific disposal-documentation requirements — mention when booking."},
            {"q": "Do you buy old office phones?",
             "a": "Yes. Company phones from contract renewal cycles are a common bulk buyback. Per-device with IMEI logging. See /phone-buyback/ for phone-specific flow."},
            {"q": "How much notice do you need?",
             "a": "Small batches (10-30 devices): a few working days. Large batches (50+, full office IT clearance): 1-2 weeks so the team can plan transport, inspection time, and documentation properly."},
            {"q": "What happens to units that don't qualify for buyback?",
             "a": "Free recycling in the same visit. Not a separate booking or an extra step — the pickup covers both the buyback units and the recycling units."},
        ],
        "related_pages": rel(
            CORE_LINKS["sell"], CORE_LINKS["itad"], CORE_LINKS["corporate"],
            CORE_LINKS["office_pickup"], CORE_LINKS["data"], ("/it-asset-disposal/", "IT asset disposal — full end-of-life workflow"),
        ),
        "route": _std_route("services", "weekly"),
        "whatsapp_message": "Hi, I'd like to sell bulk office electronics — here's the inventory:",
    }


def spec_electronics_scrap_value() -> dict:
    return {
        "path": "/electronics-scrap-value/",
        "title": "Electronics Scrap Value in Kochi | How Old Devices Are Priced",
        "description": "Electronics scrap value in Kochi — how buyback and material recovery pricing actually works, why per-kg rates don't apply, and how to get a real estimate.",
        "h1": "Electronics Scrap Value in Kochi",
        "breadcrumb_label": "Electronics Scrap Value",
        "service_type": "Electronics scrap valuation and pricing",
        "last_updated": LAST_UPDATED,
        "lede": (
            "The most common question when someone thinks about selling old electronics: 'what "
            "is it worth as scrap?' This page explains why there's no single 'scrap rate per kg' "
            "for most electronics, what actually drives value for different device categories, "
            "and how to get an honest estimate before you commit to a pickup."
        ),
        "direct_answer": (
            "Electronics scrap value in Kochi is calculated in two different ways depending on "
            "the device: (a) resale-based buyback for working devices with second-hand demand, "
            "estimated from brand + model + condition; (b) material-recovery value for non-"
            "viable devices, based on recoverable copper/aluminium/plastic. There's no useful "
            "'per-kg' rate for laptops/phones/computers — value comes from resale, not weight. "
            "WhatsApp specs + photos for an estimate."
        ),
        "key_takeaways": [
            "Two calculation methods: resale-based buyback (working, has demand) vs material recovery (everything else).",
            "'Per-kg scrap rate' is not meaningful for most electronics — value is resale-driven, not weight-driven.",
            "Estimate = photos + specs on WhatsApp. Confirmed quote = physical inspection.",
            "Different categories work differently — laptops, phones, appliances, cables all priced by different logic.",
            "Non-viable devices route to free recycling — you don't pay, but you also don't receive payment.",
        ],
        "accepted_items": {
            "columns": ["Device category", "Pricing basis", "Notes"],
            "rows": [
                ["Working laptops, computers, phones", "Second-hand resale market", "Brand + model + year + condition"],
                ["Working enterprise servers, networking gear", "Enterprise resale market", "Model-specific; narrower buyer pool"],
                ["Non-working laptops, computers, phones", "Material recovery (no buyback typical)", "Free pickup, no payment"],
                ["Small appliances (mixers, kettles, kitchen electronics)", "Material recovery", "No buyback typical"],
                ["Large appliances (working fridges, washing machines under 3 years)", "Reduced resale-based quote possible", "Refrigerant handling separate"],
                ["Cables, chargers, adapters", "Copper recovery (bulk)", "Batch by rough volume"],
                ["Circuit boards, motherboards (loose)", "Component recovery", "Depends on volume and grade"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify the device category",
             "text": "Is it a working device with resale demand? A non-working device for recovery? An appliance with refrigerant? A cable/copper batch? Different categories have different pricing logic."},
            {"name": "Gather brand + model + specs (for potentially-sellable items)",
             "text": "Brand, model, year of manufacture (approximate is fine), specs (for computers/laptops), condition (works/doesn't/damage). The more accurate the specs, the more accurate the estimate."},
            {"name": "Photograph the item",
             "text": "Front, back, and model plate or About screen. Damage close-ups if any. Photos are what turn a specs list into an accurate estimate."},
            {"name": "WhatsApp brand + model + specs + condition + photos",
             "text": "Team returns a condition-based estimate. Range or point number depending on how much information is in the message."},
            {"name": "Inspection + confirmed quote at pickup",
             "text": "Physical inspection produces the confirmed quote. Payment on the spot for accepted quotes. Decline without obligation if the confirmed quote is lower than expected."},
        ],
        "sections": [
            {"h2": "Why 'per-kg scrap rate' doesn't work for most electronics",
             "body": (
                "You'll see 'laptop scrap price per kg' quoted online. For laptops (and phones and "
                "computers), weight-based pricing doesn't reflect real value. A brand-new MacBook Pro "
                "weighs about the same as a 10-year-old plastic Compaq. Their buyback values differ by a "
                "factor of ~100x because value comes from resale demand for the specific model, not from "
                "raw kilograms of plastic and metal.\n\n"
                "For cables, loose motherboards, and pure copper recovery items, weight-based pricing does "
                "roughly apply — copper has a market rate per kg, and cables are priced against that. "
                "But this is a small slice of the overall category. For anything with a model number and "
                "a second-hand market, weight is not the right variable."
             )},
            {"h2": "How buyback pricing actually works",
             "body": (
                "For working devices with resale demand:\n\n"
                "The estimate references current second-hand market data for that specific brand, model, "
                "and year. It adjusts for condition (screen intact / cracked, battery health, cosmetic "
                "wear), drive/RAM configuration where applicable, and included accessories.\n\n"
                "The final confirmed quote is at physical inspection — the estimate is deliberately "
                "labelled 'estimate' because inspection almost always reveals something the photos didn't "
                "capture. Sometimes better condition than expected (quote goes up); sometimes worse "
                "(quote goes down, you can decline).\n\n"
                "This process is the same across devices — laptops, phones, computers, workstations, "
                "servers, appliances that qualify. What changes is the underlying market data the "
                "estimate references."
             )},
            {"h2": "How material recovery pricing works",
             "body": (
                "For non-viable devices (dead, too old for resale, damaged beyond viability):\n\n"
                "There's no per-device payment. Pickup is free — the team collects, transports and "
                "material-recovers the device, and the recoverable materials (metals, plastics, small "
                "amounts of precious metals from circuit boards) are what covers the logistics.\n\n"
                "For high-volume material streams — a large batch of cables, a bin of loose motherboards, "
                "a truckload of old CRT monitors — there can be per-batch pricing because the volume "
                "justifies the transaction. Smaller amounts fall under the free-pickup-recycling model.\n\n"
                "This is why some scrap dealers who quote 'per kg' rates only accept large volumes — "
                "they're doing pure material recovery at bulk scale, not the mixed buyback + recycling "
                "workflow that fits most consumer and small-office collections."
             )},
        ],
        "faqs": [
            {"q": "What's the scrap rate per kg for laptops?",
             "a": "There isn't a meaningful one. Laptop value comes from resale demand for the specific model, not from raw weight. A recent working MacBook and a 10-year-old plastic laptop weigh similarly but their values differ by ~100x. Send brand + model + year + photos for a real estimate."},
            {"q": "How is electronics scrap actually priced?",
             "a": "Two ways: (a) working devices with resale demand get a buyback estimate based on second-hand market data for that specific model; (b) non-viable devices route to free recycling — no per-device payment, material recovery covers logistics."},
            {"q": "Do I get paid for non-working electronics?",
             "a": "Usually not. Non-working devices route to free recycling — no payment, but pickup is free and the materials are properly recovered. For large volumes of specific materials (copper cables, loose motherboards in bulk), per-batch pricing may apply."},
            {"q": "Why can't you just quote a per-kg rate?",
             "a": "Because it wouldn't reflect real value for most electronics. A per-kg rate would either massively underprice modern devices (which are worth more than their weight in plastic) or massively overprice old ones. Model-specific estimates are more accurate for everyone."},
            {"q": "What about a large batch of old cables?",
             "a": "Copper cables can be priced against the current copper market rate. Mention rough volume in your message — a small drawer of chargers is different from a spool of unused Cat6."},
            {"q": "Can I get a quote before pickup?",
             "a": "Yes — that's the estimate step. Send brand + model + specs + photos on WhatsApp; the team returns a condition-based estimate. The confirmed quote comes at physical inspection."},
            {"q": "What if the confirmed quote is much lower than the estimate?",
             "a": "You can decline without obligation — the device stays with you, no charge. This is the whole point of the 'estimate vs confirmed quote' distinction. It happens when inspection reveals damage the photos didn't clearly show."},
        ],
        "related_pages": rel(
            CORE_LINKS["scrap_prices"], CORE_LINKS["calc"], ("/laptop-scrap-price/", "Laptop scrap price"),
            ("/computer-scrap-price/", "Computer scrap price"), CORE_LINKS["sell"], CORE_LINKS["decision"],
        ),
        "route": _std_route("services", "monthly", 0.8),
        "whatsapp_message": "Hi, I'd like an electronics scrap value estimate — here are the details:",
    }


def spec_computer_scrap_price() -> dict:
    return {
        "path": "/computer-scrap-price/",
        "title": "Computer Scrap Price in Kochi | Desktop, Laptop, Workstation, Server",
        "description": "Computer scrap price in Kochi — condition-based estimate for desktops, laptops, workstations and servers. Send specs and photos for a quote confirmed at inspection.",
        "h1": "Computer Scrap Price in Kochi",
        "breadcrumb_label": "Computer Scrap Price",
        "service_type": "Computer scrap valuation",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Computer scrap price depends on what kind of computer, how old, and what condition. "
            "Desktops, laptops, workstations, and servers all price differently. This page covers "
            "the pricing logic for each category, what specs actually move the number, and why "
            "sending model info on WhatsApp gets you a much more accurate estimate than any "
            "'per-kg' or online-calculator number."
        ),
        "direct_answer": (
            "Computer scrap price in Kochi is a condition-based estimate — no fixed per-kg rate. "
            "For working machines from the last 3-5 years, a buyback quote is calculated from "
            "brand + model + specs + condition. For older or non-working machines, pickup is "
            "free but no buyback payment applies. WhatsApp brand + model + specs + photos for "
            "the estimate; confirmed quote at physical inspection."
        ),
        "key_takeaways": [
            "Working desktops, laptops, workstations, servers get condition-based estimates.",
            "No per-kg rate — value comes from model-specific resale demand.",
            "Working workstations and servers with recent CPUs retain more value.",
            "Non-working or older machines route to free recycling.",
            "Estimate = specs + photos; confirmed quote = physical inspection.",
        ],
        "accepted_items": {
            "columns": ["Computer type", "Pricing basis", "Notes"],
            "rows": [
                ["Recent MacBook (last 3-4 years)", "High resale demand", "Configuration + year specific"],
                ["Business laptop (Dell/HP/Lenovo, last 3 years)", "Medium-high resale", "Enterprise buyer market"],
                ["Recent workstation (Precision, Z, ThinkPad P)", "Higher retained value", "Include full CPU/GPU"],
                ["Consumer laptop (last 3 years)", "Medium resale", "Brand + specs matter"],
                ["Recent desktop tower with viable CPU/GPU", "Medium resale", "Include specs"],
                ["Enterprise server (last 3-4 years, working)", "Narrower resale market", "Model-specific quote"],
                ["Old desktop / laptop (5+ years old)", "Recycling — no buyback typical", "Free pickup"],
                ["Non-working / broken", "Recycling only", "Free pickup remains"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify the computer type + get model info",
             "text": "Desktop, laptop, workstation, server. Brand and specific model. For laptops: About This Mac (macOS) or Settings → System → About (Windows). For desktops: model on the tower or in BIOS."},
            {"name": "Gather the specs",
             "text": "CPU (generation and clock speed if you know), RAM (size), storage (type and size), GPU if any. Complete specs = more accurate estimate."},
            {"name": "Take photos",
             "text": "Front, back, model plate. For laptops: screen on with the About screen visible. Damage close-ups."},
            {"name": "WhatsApp everything to Ewaste Kochi",
             "text": "Brand + model + year + specs + condition + photos in one message. Team returns a condition-based estimate."},
            {"name": "Pickup + inspection + confirmed quote",
             "text": "Physical inspection at pickup produces the confirmed quote. Payment on the spot for accepted quotes. Decline is fine if the confirmed number is lower than expected."},
        ],
        "sections": [
            {"h2": "Pricing logic by computer type",
             "body": (
                "Laptops: brand + model + year + condition drive the number. Business laptops from the "
                "last 3 years (Dell Latitude, HP EliteBook, ThinkPad) tend to retain more than consumer "
                "brands. See /laptop-scrap-price/ for the deeper laptop-specific breakdown.\n\n"
                "Desktops: full specs matter more than for laptops. A well-specced recent desktop with "
                "current-gen CPU and a viable GPU can qualify for meaningful buyback; a bare-bones office "
                "desktop from 5 years ago usually doesn't.\n\n"
                "Workstations: Dell Precision, HP Z-series, ThinkPad P-series retain value longer than "
                "consumer machines because they have an active enterprise buyer market. Include full CPU "
                "and GPU specs for the estimate.\n\n"
                "Servers: narrower buyer market. Recent enterprise servers (Dell PowerEdge Rxxx, HPE "
                "ProLiant DLxxx, Cisco UCS Cxxx from the last 3-4 years) may qualify. Include full model "
                "and CPU generation."
             )},
            {"h2": "What actually moves the estimate up or down",
             "body": (
                "Up: recent generation, complete specs, working condition, drive included, RAM at "
                "spec-max, original accessories, no cosmetic damage, business/workstation grade over "
                "consumer.\n\n"
                "Down: older generation, missing components, non-working state, cracked screen, worn "
                "keyboard, dead battery, cosmetic damage, water damage, missing charger.\n\n"
                "Doesn't matter much either way: original box (small bonus), plastic scratches, "
                "software installed (buyer will reset anyway)."
             )},
            {"h2": "Data destruction — how it affects the quote",
             "body": (
                "Two options that affect the estimate differently:\n\n"
                "Drive included, wiped at facility: minimal impact on quote. Drive stays intact and "
                "reusable in the resold machine. Team wipes before resale. Certificate on request.\n\n"
                "Drive removed before pickup: modest reduction in quote because the buyer needs to "
                "source a new drive. Recommended for high-security data where you want the drive "
                "physically destroyed rather than wiped.\n\n"
                "Either way, factory-reset the machine before pickup if you can. It doesn't change the "
                "quote but makes the transaction cleaner."
             )},
        ],
        "faqs": [
            {"q": "What's the scrap price of a used desktop computer?",
             "a": "No fixed rate. Depends on brand, specs, generation, and condition. Recent working desktops with viable specs may get a meaningful quote; older or non-viable desktops go to free recycling with no payment."},
            {"q": "How much for an old office server?",
             "a": "Depends on model and generation. Recent enterprise servers (Dell PowerEdge, HPE ProLiant last 3-4 years) may qualify. Older or specialised units usually route to recycling. Send full model + CPU generation for the estimate."},
            {"q": "Is there a per-kg computer scrap rate?",
             "a": "Not for whole machines. Value comes from model-specific resale demand, not weight. For loose motherboards or high-volume component recovery, some per-batch pricing may apply — depends on volume and grade."},
            {"q": "Do you buy workstation-class computers?",
             "a": "Yes, and workstations (Dell Precision, HP Z, ThinkPad P) often retain value better than consumer PCs. Include full CPU/GPU/RAM specs for the estimate."},
            {"q": "What about used enterprise servers?",
             "a": "Buyback exists but the market is narrower and quotes vary widely by generation. Send full model info (Dell PowerEdge Rxxx, HPE ProLiant DLxxx, Cisco UCS Cxxx) plus CPU generation and RAM."},
            {"q": "Should I remove the hard drive before selling?",
             "a": "Optional. Drive included = higher quote; drive removed = slightly reduced quote (buyer needs to source replacement). Recommended to remove if you want physical destruction rather than software wiping — then hand the drive over separately for shredding with a Certificate."},
            {"q": "What if the computer doesn't work?",
             "a": "Free recycling instead — no payment. Pickup is still free, and the materials are properly recovered. Data destruction still applies if the drive is present and you want it certified."},
        ],
        "related_pages": rel(
            CORE_LINKS["computer"], CORE_LINKS["sell"], ("/laptop-scrap-price/", "Laptop scrap price"),
            ("/electronics-scrap-value/", "Electronics scrap value overview"), CORE_LINKS["calc"], CORE_LINKS["decision"],
        ),
        "route": _std_route("services", "weekly"),
        "whatsapp_message": "Hi, I'd like a computer scrap price estimate — here are the details:",
    }


def spec_scheduled_pickup() -> dict:
    return {
        "path": "/scheduled-pickup/",
        "title": "Scheduled E-Waste Pickup in Kochi | Book a Specific Day and Time",
        "description": "Scheduled e-waste pickup in Kochi — book a specific day and time window for doorstep collection of laptops, phones, batteries, appliances and office IT.",
        "h1": "Scheduled E-Waste Pickup in Kochi",
        "breadcrumb_label": "Scheduled Pickup",
        "service_type": "Scheduled doorstep e-waste pickup",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Most doorstep pickups are 'route-based' — the team calls when a route is passing your "
            "area, timing loosely confirmed within a day or two. Scheduled pickup is different: you "
            "book a specific day and time window, and the team commits to that slot rather than "
            "combining with a passing route. This page covers when scheduled pickup makes sense, "
            "how much notice each type of job needs, what constraints affect which slots are "
            "actually bookable, and how recurring scheduled pickup works for offices that generate "
            "steady IT turnover."
        ),
        "direct_answer": (
            "To book a scheduled e-waste pickup in Kochi, WhatsApp Ewaste Kochi with your item "
            "list, address, and preferred day and time window. The team returns a confirmation "
            "for the closest workable slot. Scheduled pickup usually needs 1-3 working days "
            "notice; larger jobs or specific slot needs may need 1-2 weeks."
        ),
        "key_takeaways": [
            "Book a specific day and time window rather than open-ended 'whenever' scheduling.",
            "Small pickups: 1-3 working days notice usually enough.",
            "Larger jobs (office batches, apartment cleanout): 1-2 weeks notice.",
            "Preferred slot windows within a day (morning, evening, weekend) reviewable.",
            "Scheduled pickup fits offices, apartment communities, and time-sensitive collections.",
        ],
        "accepted_items": {
            "columns": ["Scenario", "Typical notice", "Notes"],
            "rows": [
                ["Household single-item scheduled pickup", "1-3 working days", "Preferred day + morning/evening"],
                ["Small office batch (5-15 devices)", "3-5 working days", "Often outside business hours"],
                ["Large office batch (30+ devices)", "1-2 weeks", "Transport + team scheduling"],
                ["Apartment building shared pickup (multiple flats)", "1-2 weeks", "Coordinated with building admin"],
                ["Recurring scheduled pickup (monthly office collection)", "Set up once, recurring", "Contract-style"],
                ["Time-sensitive (lease expiry, event, audit)", "As much notice as possible", "Slot pressure highest"],
            ],
        },
        "how_to_steps": [
            {"name": "Message items + preferred slot",
             "text": "One message: item list, address, preferred day and time window. If flexible, say so — that opens more slot options."},
            {"name": "Get slot confirmation or alternative",
             "text": "Team responds with confirmation for the requested slot, or the closest workable alternative if the exact slot isn't available."},
            {"name": "Prepare for the confirmed slot",
             "text": "Have items ready, arrange access if apartment, be available at the slot time (or arrange for someone authorised to be)."},
            {"name": "Doorstep pickup at the confirmed slot",
             "text": "Team arrives within the confirmed window, collects, and issues pickup acknowledgement."},
            {"name": "Reschedule if needed",
             "text": "Life happens. Message as early as possible if you need to move the slot — usually straightforward if given notice."},
        ],
        "sections": [
            {"h2": "When scheduled pickup makes more sense than route-based pickup",
             "body": (
                "Routine 'whenever a route is passing' pickup is fine for single small items — it just "
                "means you don't know exactly which day it'll be, only that it'll be soon.\n\n"
                "Scheduled pickup fits better when:\n\n"
                "You need pickup outside business hours (office pickups outside working time).\n\n"
                "Multiple people need to be available (apartment building coordinated pickup, office "
                "team member with drive-destruction access).\n\n"
                "Access is restricted to specific times (some buildings limit commercial vehicles to "
                "certain hours).\n\n"
                "There's a deadline (lease expiry, tax year-end, audit date, event date).\n\n"
                "The batch is large enough that route flexibility doesn't compensate for the "
                "coordination cost."
             )},
            {"h2": "What affects slot availability",
             "body": (
                "Your area — some Kochi neighbourhoods have more frequent scheduled routes than others.\n\n"
                "Job size — a 5-device pickup slots more easily than a 50-device pickup.\n\n"
                "Notice — 3-day-out requests have more slot options than same-day.\n\n"
                "Time preference — mid-day weekday slots are usually easier than early morning or "
                "weekends.\n\n"
                "Additional services — if the pickup includes on-site data destruction or requires "
                "specific transport (bulky items, refrigerant handling), fewer slots fit."
             )},
            {"h2": "Recurring scheduled pickup for offices",
             "body": (
                "Some offices set up recurring scheduled pickup — a monthly slot on a fixed day, so "
                "retired IT accumulates in a designated spot and gets picked up on a predictable "
                "schedule. Reduces admin overhead compared to booking each time.\n\n"
                "Common for offices with steady turnover of laptops (support desks, sales-team fleet "
                "management, contractor onboarding/offboarding). Contact if you'd like to set up "
                "recurring scheduling."
             )},
        ],
        "faqs": [
            {"q": "How much notice do I need for a scheduled pickup?",
             "a": "Small pickups (1-5 items): 1-3 working days is usually enough. Small office batches (10-30 devices): 3-5 working days. Large jobs (50+ devices, apartment cleanout, full-office): 1-2 weeks."},
            {"q": "Can I book pickup for a specific time?",
             "a": "You can request a specific time window (morning, afternoon, evening). The team confirms whether that specific window is available or offers the closest workable alternative. Exact-hour bookings are harder than window-based."},
            {"q": "Can I book weekend pickup?",
             "a": "Reviewable case-by-case — say so when booking. Weekend slots exist but are fewer than weekdays, so notice matters more. Sunday slots are the least common; Saturday is somewhat easier. If you specifically need a weekend pickup, message with 2-3 weekend-date preferences to increase feasibility."},
            {"q": "Is scheduled pickup more expensive?",
             "a": "Standard scheduled pickup is free for eligible collections, same as routine pickup. Some scenarios — urgent same-day, out-of-hours, on-site destruction — may carry additional costs quoted before the job."},
            {"q": "What if I need to reschedule?",
             "a": "Message as early as you can. Rescheduling with 24+ hours notice is usually easy; same-day changes are harder but reviewable."},
            {"q": "Do you offer recurring scheduled pickup for offices?",
             "a": "Yes — monthly or quarterly fixed slots so retired IT accumulates in one spot and gets predictable collection. Common for offices with steady laptop turnover."},
            {"q": "What if I don't have exact item count yet — can I still book a slot?",
             "a": "Yes. Rough count at booking is fine; exact inventory happens at pickup. If the count changes significantly (10 devices booked, 40 at pickup), flag it so transport can be verified."},
        ],
        "related_pages": rel(
            CORE_LINKS["pickup"], CORE_LINKS["office_pickup"], ("/bulk-e-waste-pickup/", "Bulk pickup"),
            ("/same-day-pickup/", "Same-day pickup — when feasibility check applies"), CORE_LINKS["locations"], CORE_LINKS["eligibility"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to schedule an e-waste pickup — here are the details and preferred slot:",
    }


def spec_same_day_pickup() -> dict:
    return {
        "path": "/same-day-pickup/",
        "title": "Same-Day E-Waste Pickup in Kochi | Feasibility Check",
        "description": "Same-day e-waste pickup in Kochi — feasibility check for urgent collections. Availability depends on area, route, item type. WhatsApp for a same-day slot check.",
        "h1": "Same-Day E-Waste Pickup in Kochi",
        "breadcrumb_label": "Same-Day Pickup",
        "service_type": "Same-day e-waste pickup (subject to feasibility)",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Sometimes pickup can't wait a few days — a lease expiring today, an office relocating "
            "this evening, an appliance suddenly failing and needing to go before the replacement "
            "arrives. Same-day pickup is a feasibility check, not a guaranteed service. This page "
            "covers when same-day is actually possible, what makes it more or less likely, and "
            "what to do if same-day isn't feasible for your specific situation."
        ),
        "direct_answer": (
            "Same-day e-waste pickup in Kochi is possible but not guaranteed — it depends on your "
            "area, current route schedule, item type, and how early in the day you message. "
            "WhatsApp Ewaste Kochi with your items, address, and 'same-day if possible' as the "
            "request. The team checks feasibility and confirms either same-day slot or the "
            "closest workable alternative."
        ),
        "key_takeaways": [
            "Same-day is a feasibility check, not guaranteed availability.",
            "Message before mid-morning for best same-day chances.",
            "Areas closer to Kochi metro core have more same-day feasibility than distant areas.",
            "Small pickups more feasible same-day than large batches.",
            "If same-day isn't feasible, the alternative confirmed slot is usually next working day.",
        ],
        "accepted_items": {
            "columns": ["Scenario", "Same-day likelihood", "Notes"],
            "rows": [
                ["Small pickup (1-3 items), Kochi metro area, early morning message", "Medium-high", "Team route may pass your area"],
                ["Small pickup, distant area (outside metro), any time", "Low", "Dedicated route not typical"],
                ["Bulk pickup (10+ items), any area", "Low", "Transport planning usually needs advance"],
                ["Emergency (lease expiry, office relocation today)", "Case-by-case — WhatsApp with urgency", "Team does what's feasible"],
                ["Late-day message (after 2pm)", "Low for same-day", "Usually next-day slot"],
                ["Items needing special handling (refrigerant, swollen battery)", "Low for same-day", "Special transport advance planning"],
            ],
        },
        "how_to_steps": [
            {"name": "Message early with clear items + address",
             "text": "Message before mid-morning for best same-day chances. Include item list, address, and 'same-day if feasible' in the request."},
            {"name": "Get feasibility answer quickly",
             "text": "Team returns feasibility answer within a short window — either same-day slot confirmation or the closest alternative (usually next working day)."},
            {"name": "Prepare items immediately if confirmed",
             "text": "Have items ready and accessible. Same-day slots don't have much cushion for delay."},
            {"name": "Pickup at the confirmed same-day slot",
             "text": "Team arrives within the confirmed window. Pickup acknowledgement signed on the spot."},
            {"name": "If not feasible: agree the closest workable slot",
             "text": "Next working day is the typical fallback. If it's a true emergency (lease expiry today), say so — some workarounds may be possible."},
        ],
        "sections": [
            {"h2": "What makes same-day feasible or not",
             "body": (
                "Feasibility comes down to whether a team is already in your area or can be diverted "
                "there without breaking other confirmed pickups. Factors:\n\n"
                "Time of day — messages before 10am have much better same-day chances than after 2pm.\n\n"
                "Your area — Kochi metro core (Kaloor, Vyttila, Kadavanthra, Palarivattom, Ernakulam, "
                "Kadavanthra) has more same-day feasibility than distant areas (Aluva, Angamaly, or "
                "outside Ernakulam district).\n\n"
                "Batch size — 1-3 items may fit into an existing route; 15+ items usually need "
                "dedicated transport and can't be same-day.\n\n"
                "Special requirements — items needing refrigerant handling, swollen-battery containment, "
                "or on-site destruction all need transport preparation that isn't feasible same-day.\n\n"
                "Existing schedule — some days the team is fully booked; the honest answer is 'not "
                "feasible today' rather than promising something that won't happen."
             )},
            {"h2": "When same-day matters and when scheduled is fine",
             "body": (
                "Genuinely same-day: today-only lease expiry, event ending today, appliance blocking a "
                "critical use (fridge failed and needs to go before delivery of replacement in 2 hours), "
                "office relocation completing today.\n\n"
                "Not actually same-day: 'I want it gone soon' (2-day scheduled fits), 'weekend cleanup' "
                "(scheduled for tomorrow works), 'we're planning to move next week' (scheduled with "
                "notice works better).\n\n"
                "For most requests, scheduled pickup with 1-3 days notice actually works better than "
                "same-day — better slot options, better transport planning, less pressure."
             )},
            {"h2": "If same-day isn't feasible",
             "body": (
                "The typical fallback is next working day. Message an honest picture of the urgency — "
                "'today is genuinely the last day for lease compliance' vs 'today would be convenient' "
                "changes what workarounds might apply.\n\n"
                "For lease-expiry emergencies where the schedule is genuinely locked, sometimes "
                "storage-transfer arrangements can bridge the gap (move items to a shared building "
                "storage today, actual pickup tomorrow). Not always possible but worth asking about."
             )},
        ],
        "faqs": [
            {"q": "Can I get same-day e-waste pickup in Kochi?",
             "a": "Same-day is a feasibility check, not a guaranteed service. WhatsApp before mid-morning for best chances, include items + address + urgency reason. Team confirms same-day slot or the closest alternative (usually next working day)."},
            {"q": "What makes same-day pickup more likely to work?",
             "a": "Early message (before 10am), small pickup (1-5 items), Kochi metro core address, no special handling needs, and a real reason for urgency. All those factors together — feasibility is usually high. Any one missing — feasibility drops."},
            {"q": "Is there an extra charge for same-day pickup?",
             "a": "Same-day pickup that fits an existing route: no extra charge. Same-day that needs dedicated transport diversion or resource reallocation: may have a small urgency-transport quote confirmed before the job."},
            {"q": "What if I need pickup today for a lease expiry?",
             "a": "Message with 'lease expiring today' in the request. Team does what's feasible. If truly not feasible, storage-transfer workarounds may be possible for some scenarios — worth asking."},
            {"q": "Can bulk pickup be same-day?",
             "a": "Rarely. Bulk pickup (10+ items or requiring dedicated transport) typically needs advance planning. If your batch is small enough to fit an existing route, maybe — send count and ask."},
            {"q": "What if same-day isn't possible?",
             "a": "Next working day is the typical fallback. If it needs to be sooner, say why — genuine emergencies may have workarounds; convenience-requests don't."},
            {"q": "Does same-day cover appliances like fridges?",
             "a": "Rarely — refrigerant handling needs advance transport planning that doesn't fit into a same-day slot. For fridge, AC, or other refrigerant-carrying appliance pickup, scheduled pickup with 2-3 working days notice is the typical minimum. Same-day is much more feasible for smaller electronics without special handling requirements."},
        ],
        "related_pages": rel(
            CORE_LINKS["pickup"], ("/scheduled-pickup/", "Scheduled pickup — plan ahead"),
            CORE_LINKS["eligibility"], CORE_LINKS["locations"], CORE_LINKS["contact"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like same-day pickup if feasible — here are the details:",
    }


def spec_corporate_pickup() -> dict:
    return {
        "path": "/corporate-pickup/",
        "title": "Corporate E-Waste Pickup in Kochi | Scheduled + Documented Collection",
        "description": "Corporate e-waste pickup in Kochi — scheduled collection for offices, IT decommissioning, per-device asset tracking, and audit-ready documentation.",
        "h1": "Corporate E-Waste Pickup in Kochi",
        "breadcrumb_label": "Corporate Pickup",
        "service_type": "Corporate e-waste pickup and collection",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Corporate pickup is what happens when a normal doorstep pickup isn't enough — when "
            "the batch is large, the paperwork matters, and the compliance framework has "
            "requirements the pickup team needs to satisfy. This page covers the corporate "
            "pickup workflow, how it fits between routine office pickup and full ITAD, and what "
            "documentation is standard."
        ),
        "direct_answer": (
            "For corporate e-waste pickup in Kochi, WhatsApp Ewaste Kochi with your office "
            "location, approximate device inventory, and any compliance requirements (DPDP Act, "
            "ISO, insurance disposal records). The team confirms a scheduled slot, agrees the "
            "workflow (standard bulk vs full ITAD), and produces requested documentation. "
            "Pickup is free for eligible collections; per-device tracking and certified data "
            "destruction are optional add-ons quoted before the job."
        ),
        "key_takeaways": [
            "Between routine office pickup and full ITAD in scope and formality.",
            "Scheduled, documented, and often paired with data destruction.",
            "Documentation options: pickup acknowledgement, GST invoice, per-device asset log, Certificate of Destruction.",
            "Multi-location coordination for chains, campuses, and multi-office companies.",
            "Pickup is free for eligible collections; specific services quoted before the job.",
        ],
        "accepted_items": {
            "columns": ["Corporate scenario", "Typical workflow", "Notes"],
            "rows": [
                ["Office IT refresh (20-100 devices)", "ITAD with per-serial tracking", "Buyback for viable units"],
                ["Department restructure / retirement", "Standard bulk pickup", "Documentation on request"],
                ["End-of-lease device return prep", "Buyback + documentation for lease records", "Some leases have specific requirements"],
                ["Office closure / relocation", "Full bulk pickup + Certificate for tax/dissolution", "Scheduled around closing date"],
                ["Recurring corporate pickup (monthly/quarterly)", "Set up once, recurring on fixed schedule", "Contract-style"],
                ["Multi-site pickup (chains, campuses)", "Coordinated multi-visit engagement", "One point of contact"],
                ["Emergency pickup (audit deadline, lease expiry)", "Case-by-case; give as much notice as possible", "Slot pressure highest"],
            ],
        },
        "how_to_steps": [
            {"name": "Send initial scope + compliance requirements",
             "text": "Office address, approximate device count by category, and any compliance framework requirements (DPDP Act, ISO 27001, internal policy, insurance)."},
            {"name": "Agree the workflow",
             "text": "Standard corporate pickup fits smaller jobs. Full ITAD workflow adds per-device asset capture and per-drive Certificate of Destruction — used when audit or per-serial documentation is needed."},
            {"name": "Confirm scheduling",
             "text": "Corporate pickups usually schedule outside peak business hours. Multi-location or multi-day pickups planned across the calendar to fit each site."},
            {"name": "Scheduled pickup with on-site inspection",
             "text": "Team arrives at the confirmed slot, verifies inventory, captures serials if ITAD workflow, collects. Pickup acknowledgement signed on the spot."},
            {"name": "Documentation delivery",
             "text": "Pickup acknowledgement on the spot. GST invoice, per-device asset log, Certificate of Destruction (for drives that went through data destruction) issued after the destruction step is complete."},
        ],
        "sections": [
            {"h2": "Standard corporate pickup vs full ITAD — how to choose",
             "body": (
                "Two workflows fit different scopes:\n\n"
                "Standard corporate pickup fits when: job is a one-off (single office cleanout, single "
                "project decommissioning), per-device serial tracking isn't required, data destruction "
                "can be a bulk-batch certificate rather than per-serial, device count is roughly 10-50.\n\n"
                "Full ITAD workflow fits when: you're inside a formal IT refresh cycle, need per-serial "
                "disposition records for finance/audit/insurance, need per-drive certified data "
                "destruction (DPDP compliance, medical data, financial data, government data), the job "
                "is large enough (50+ devices) that ITAD process overhead pays off, or you're a listed "
                "company or subject to formal compliance frameworks.\n\n"
                "The routing decision doesn't cost anything to change if you're not sure — book as "
                "corporate pickup and the team suggests ITAD if the scope warrants it."
             )},
            {"h2": "Documentation typical corporate pickups need",
             "body": (
                "Pickup acknowledgement — signed at collection, showing categories and rough counts. "
                "Standard for every corporate pickup.\n\n"
                "GST invoice — for the sale side of buyback and/or as an accounting record for the "
                "pickup itself. Standard for GST-registered organisations.\n\n"
                "Per-device asset log — serial, model, condition, disposition per unit. Used for asset-"
                "register updates, insurance disposal records, end-of-lease records, and corporate "
                "audit trails. This is the ITAD workflow.\n\n"
                "Certificate of Destruction — issued per drive or per batch after data destruction is "
                "complete. Serialised for high-security workflows. Required for DPDP compliance and "
                "most enterprise policy frameworks.\n\n"
                "Environmental disposal record — for CSR reports, ESG filings, and sustainability "
                "audits. Categories, counts, and disposition of e-waste retired during the reporting "
                "period."
             )},
            {"h2": "Multi-location corporate pickup",
             "body": (
                "Retail chains, campus environments (universities, hospitals with multiple branches), "
                "multi-office companies — all can plan corporate disposal as one coordinated engagement "
                "rather than several independent bookings.\n\n"
                "Benefits: single point of contact (usually a central IT lead or facility manager), "
                "consolidated documentation across sites, coordinated scheduling around each site's "
                "constraints, and typically lower coordination overhead per site than one-by-one "
                "booking.\n\n"
                "Common for: retail chains retiring POS terminals across branches, banks retiring old "
                "ATM computers, hospital chains decommissioning medical IT, universities refreshing "
                "computer labs across departments."
             )},
        ],
        "faqs": [
            {"q": "What's a corporate pickup vs a normal office pickup?",
             "a": "Corporate pickup adds scheduled slotting, formal documentation (GST invoice, per-device asset log, Certificate of Destruction), and often per-serial tracking. Normal office pickup is lighter — pickup acknowledgement + basic disposal. Difference is scale and compliance requirements."},
            {"q": "How does this differ from ITAD?",
             "a": "Corporate pickup is often the entry point to ITAD but doesn't always need the full ITAD workflow. If per-serial audit trails and per-drive certification aren't required, standard corporate pickup fits. If they are, the workflow escalates to full ITAD."},
            {"q": "What documentation do you provide?",
             "a": "Pickup acknowledgement (standard), GST invoice (on request), per-device asset log (with ITAD workflow), Certificate of Destruction (for data-destroyed drives), environmental disposal record (for CSR/ESG). Name what you need at booking."},
            {"q": "Can you handle multi-location pickup for our chain?",
             "a": "Yes. Multi-location engagement with one point of contact, consolidated documentation across sites, and coordinated scheduling. Common for retail chains, campus environments, and multi-office companies."},
            {"q": "Do you offer recurring corporate pickup?",
             "a": "Yes — monthly or quarterly fixed slots. Common for offices with steady IT turnover (contractor onboarding/offboarding, support-desk fleet management). Set up once, runs on schedule."},
            {"q": "How much notice do you need?",
             "a": "Small corporate pickup (10-30 devices): 3-5 working days. Large (50+ devices, full-office decommissioning, server-room retirement): 1-2 weeks so route + transport + destruction slots can be lined up. Emergency (audit, lease): case-by-case."},
            {"q": "Is corporate pickup free?",
             "a": "Pickup itself is free for eligible collections. Additional services — certified data destruction with per-drive certificates, on-site destruction, urgent scheduling, multi-location coordination — carry costs quoted before the job."},
            {"q": "Which locations do you serve for corporate pickup?",
             "a": "Kochi's IT and business corridor — Infopark, SmartCity, Kakkanad, Edappally, Aluva, Kadavanthra, Kalamassery, Vyttila. Other Ernakulam-district and Kerala cities reviewable case-by-case; see /locations/."},
        ],
        "related_pages": rel(
            CORE_LINKS["corporate"], CORE_LINKS["itad"], CORE_LINKS["office_pickup"],
            CORE_LINKS["data"], ("/it-asset-disposal/", "IT asset disposal — full workflow"),
            CORE_LINKS["locations"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to arrange corporate e-waste pickup — here's the scope:",
    }


def spec_business_e_waste_recycling() -> dict:
    return {
        "path": "/business-e-waste-recycling/",
        "title": "Business E-Waste Recycling in Kochi | Compliance-Focused Collection",
        "description": "Business e-waste recycling in Kochi — for offices, retail, hospitality, and small business — with GST invoicing, data destruction and compliance documentation.",
        "h1": "Business E-Waste Recycling in Kochi",
        "breadcrumb_label": "Business E-Waste",
        "service_type": "Small and medium business e-waste recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Business e-waste covers everything between a home pickup and a full corporate ITAD "
            "engagement — small offices, single-location retail stores, restaurants, hospitality "
            "operators, clinics, professional practices, workshops, and mid-size services companies. "
            "This page is the entry point for businesses that need slightly more than a routine "
            "consumer pickup — GST invoicing, data destruction for computers and phones, formal "
            "disposal records for accounts — but don't have the compliance overhead of a listed "
            "enterprise or the scale that justifies a full ITAD engagement. It covers what "
            "documentation is standard, how business pickup is scheduled around operating hours, "
            "and where the workflow shades into corporate ITAD when scope grows."
        ),
        "direct_answer": (
            "For business e-waste recycling in Kochi, WhatsApp Ewaste Kochi with your business "
            "location, approximate item list, and any documentation needs (GST invoice, "
            "disposal record for accounts, data destruction for computers/phones). Scheduled "
            "pickup with paperwork on the spot. Pickup is free for eligible collections; data "
            "destruction and per-device tracking are optional add-ons quoted before the job."
        ),
        "key_takeaways": [
            "Fits small and mid-size business between home pickup and corporate ITAD.",
            "GST invoice for accounting/audit purposes standard.",
            "Data destruction for business computers and phones — flag when booking.",
            "Scheduled pickup outside operating hours where useful.",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["Business scenario", "Typical items", "Notes"],
            "rows": [
                ["Small office (5-20 person)", "Laptops, desktops, phones, printers, UPS", "GST invoice standard"],
                ["Retail store", "POS terminals, back-office computers, printers", "Card-data destruction essential for POS"],
                ["Restaurant / hospitality", "POS, kitchen electronics, back-office", "Include CCTV DVRs if being retired"],
                ["Clinic / small medical practice", "Reception PCs, printers, imaging devices", "Medical data — physical shredding recommended"],
                ["Professional practice (law, accounting, consulting)", "Laptops, printers, servers", "Client data — Certificate of Destruction typical"],
                ["Small manufacturer / workshop", "Office computers + workshop electronics", "Mixed batch"],
                ["Startup shutdown or closure", "Full office IT clearance", "Documentation for tax/dissolution"],
            ],
        },
        "how_to_steps": [
            {"name": "Message business type + item list + location",
             "text": "Business type (office, retail, clinic, etc.), approximate item counts by category, and address. Include operating hours so pickup can be planned around them."},
            {"name": "Flag data-bearing items + destruction needs",
             "text": "Any device with client data (laptops, phones, servers, POS terminals with card records, medical devices with patient data). Say if you want Certificate of Destruction and at what level (per-drive or per-batch)."},
            {"name": "Confirm invoicing and documentation needs",
             "text": "GST invoice for the pickup and any buyback, disposal record for annual accounts, Certificate of Destruction for compliance. Name what applies."},
            {"name": "Scheduled pickup outside operating hours (where useful)",
             "text": "Restaurants, retail, and clinics often prefer pickup before opening or after closing. Say so when booking."},
            {"name": "Pickup + paperwork + payment (for buyback units)",
             "text": "Team collects at the agreed slot, verifies items, signs pickup acknowledgement, and pays for accepted buyback units. GST invoice and other documentation issue after collection."},
        ],
        "sections": [
            {"h2": "Business e-waste vs home pickup — what changes",
             "body": (
                "Home pickup is designed for individual consumer collections — one household, one "
                "person coordinating, one pickup slot. Documentation is minimal (pickup "
                "acknowledgement) because it doesn't usually need to be more.\n\n"
                "Business e-waste adds: GST invoicing for the pickup and any buyback, disposal records "
                "for annual accounts, data destruction with formal documentation for compliance, "
                "scheduling around business hours to avoid disrupting operations, and multi-person "
                "coordination (business owner, IT contact, office manager).\n\n"
                "The pickup team's process is similar; the paperwork and scheduling change."
             )},
            {"h2": "Business e-waste vs corporate ITAD — what changes",
             "body": (
                "Business e-waste fits small and mid-size businesses that need documentation but don't "
                "have the compliance overhead of a listed company or an enterprise IT department. "
                "GST invoice, disposal record, Certificate of Destruction for the sensitive items — "
                "enough for accounts, insurance, and basic compliance.\n\n"
                "Corporate ITAD is the escalated workflow: per-device serial capture, per-drive "
                "certification, formal chain of custody records, integration with corporate audit "
                "processes. Fits when you're subject to formal frameworks (DPDP Act as a data "
                "processor, ISO 27001, industry regulator requirements).\n\n"
                "If in doubt, book as business e-waste. The team suggests ITAD if the scope warrants it."
             )},
            {"h2": "Common business e-waste scenarios",
             "body": (
                "Office IT refresh (small business) — 5-15 laptops or desktops replaced. Buyback for "
                "viable units + recycling for the rest + Certificate of Destruction for drives.\n\n"
                "Retail POS retirement — card-data destruction essential. Bulk pickup with per-terminal "
                "Certificate of Destruction.\n\n"
                "Clinic decommissioning — medical data on retiring devices requires physical shredding "
                "of drives with per-drive certificates.\n\n"
                "Professional practice server retirement — client data on retiring server storage "
                "requires certified destruction for compliance.\n\n"
                "Business closure — full IT clearance for dissolution documentation."
             )},
        ],
        "faqs": [
            {"q": "Do you handle e-waste for small businesses?",
             "a": "Yes — that's the core of business e-waste. WhatsApp your business type, approximate item list, and location. Scheduled pickup with GST invoice and any needed documentation (data destruction, disposal records)."},
            {"q": "Can I get a GST invoice for the pickup?",
             "a": "Yes on request. Standard for GST-registered businesses. The invoice covers the pickup (and any buyback payment) so it goes on the books for accounting/audit."},
            {"q": "What about data on our office laptops and computers?",
             "a": "Route through data destruction. Options: software wiping (drives stay intact, faster), physical shredding (drives destroyed, more secure), or handled in-house before pickup. Certificate of Destruction available on request — per-drive or per-batch depending on your needs."},
            {"q": "We're a retail store retiring POS terminals — anything special?",
             "a": "Yes. POS terminals hold card-data records; treat as sensitive data. Recommendation: physical shredding of storage with per-terminal Certificate. Common for retail chains, especially with PCI DSS obligations."},
            {"q": "Can pickup happen outside our business hours?",
             "a": "Yes — say so when booking. Before opening, after closing, or on the weekly closing day are all reviewable slots. Common for restaurants and retail businesses that can't disrupt operating hours."},
            {"q": "What about clinics and small medical practices?",
             "a": "Yes. Medical data on retired devices needs physical shredding — recommended default for any drive that held patient records, imaging, or medical billing. Per-drive Certificate typical for compliance."},
            {"q": "Do you handle multi-location small businesses (chain of 3-5 stores)?",
             "a": "Yes. Multi-location coordination with one point of contact, consolidated documentation, scheduled across your locations. Common for small retail chains and hospitality groups."},
            {"q": "How does this differ from corporate ITAD?",
             "a": "Business e-waste fits small/mid-size businesses with straightforward documentation needs. Corporate ITAD is the escalated workflow with per-serial capture, per-drive certification, and formal chain-of-custody records — used by listed companies and organisations under specific compliance frameworks."},
        ],
        "related_pages": rel(
            CORE_LINKS["corporate"], CORE_LINKS["office_pickup"], CORE_LINKS["itad"],
            CORE_LINKS["data"], ("/it-asset-disposal/", "IT asset disposal — full workflow"),
            CORE_LINKS["locations"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like business e-waste pickup for our office — here are the details:",
    }


def spec_office_clearance() -> dict:
    return {
        "path": "/office-clearance/",
        "title": "Office Clearance in Kochi | Full IT + E-Waste Removal",
        "description": "Office clearance in Kochi — full e-waste and IT removal for office closures, relocations, downsizing. Documentation for tax, dissolution, and lease-return records.",
        "h1": "Office Clearance in Kochi",
        "breadcrumb_label": "Office Clearance",
        "service_type": "Office clearance and IT removal",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Office clearance is what happens when an office is closing, moving, or "
            "significantly downsizing — the whole IT footprint needs to be dealt with in a "
            "compressed window, often against a lease deadline. This page covers how full "
            "office clearance is planned, what documentation typical clearances need (tax, "
            "dissolution, insurance, lease return), and how to compress the workflow when "
            "deadlines are tight."
        ),
        "direct_answer": (
            "For office clearance in Kochi, WhatsApp Ewaste Kochi with your office address, "
            "approximate inventory (laptops, desktops, servers, phones, printers, furniture-"
            "with-electronics, appliances), clearance deadline, and documentation needs. The "
            "team confirms a multi-day pickup plan, agrees the workflow (standard clearance "
            "or full ITAD), and executes against the deadline. Documentation for closure, "
            "dissolution, tax, and lease-return records issues after collection."
        ),
        "key_takeaways": [
            "Full office IT + e-waste + electronics removal in a compressed window.",
            "Documentation for tax, dissolution, insurance, and lease-return records.",
            "Multi-day pickup for larger offices; single-visit for smaller ones.",
            "Data destruction routing for all data-bearing devices.",
            "Deadline-driven scheduling — as much notice as possible is worth it.",
        ],
        "accepted_items": {
            "columns": ["Office item class", "Route", "Notes"],
            "rows": [
                ["Laptops, desktops, workstations", "Buyback for viable + recycling for rest + data destruction", "Standard IT clearance"],
                ["Servers, storage arrays, networking", "Data destruction + material recovery", "See /server-recycling-kochi/"],
                ["Phones (company-issued)", "Buyback + IMEI logging + data destruction", "Common bulk phone batch"],
                ["Printers, scanners, MFPs, copiers", "Material recovery + data destruction for MFP HDDs", "MFPs often overlooked as data-bearing"],
                ["Point-of-care / point-of-sale devices", "Data destruction + material recovery", "Card-data or patient-data risk"],
                ["Old CRT monitors, projectors, AV equipment", "Material recovery — bulky", "Advance transport planning"],
                ["UPS / inverter batteries (server room)", "Battery recycling — separate handling", "Flag battery bank size"],
                ["Electronic furniture (powered desks, chairs)", "Electronics separated for recycling", "Furniture handled separately"],
                ["Small appliances (kitchen electronics, water dispensers)", "Material recovery", "Batch with office electronics"],
            ],
        },
        "how_to_steps": [
            {"name": "Send scope + deadline + inventory",
             "text": "Office address, clearance deadline, approximate inventory by category. If deadline is under 1 week, mark 'urgent' — feasibility is checked against transport and team availability."},
            {"name": "Agree the workflow and documentation set",
             "text": "Standard clearance for smaller offices without per-serial audit; ITAD workflow for larger jobs or per-serial requirements. Documentation set: GST invoice, pickup acknowledgement, per-device asset log, Certificate of Destruction, closure-record documentation."},
            {"name": "Multi-day pickup plan (for larger clearances)",
             "text": "Large office clearances typically span 2-5 days: day 1 large-item removal, day 2 IT decommissioning, day 3 data destruction and cleanup. Small clearances fit into single visits."},
            {"name": "Execute against the deadline",
             "text": "Team arrives on the agreed schedule, verifies each day's pickup, and signs off. On-site data destruction available if drives cannot leave the premises."},
            {"name": "Documentation delivery after collection",
             "text": "Documentation issued after the destruction step is complete. Full set typically delivered within a few working days of the last pickup visit."},
        ],
        "sections": [
            {"h2": "Typical office clearance scenarios",
             "body": (
                "Office closure — the business is shutting down or the office is being fully "
                "shuttered. Full IT + electronics + appliance removal. Documentation for tax, "
                "dissolution, and insurance records.\n\n"
                "Office relocation — company is moving, but the new office needs less than the current "
                "one (or needs to start fresh). Old IT goes; new IT comes. Buyback for viable current-"
                "office IT, recycling for the rest.\n\n"
                "Office downsizing — company keeping a smaller footprint. Half the current IT stays; "
                "the other half is retired. Documentation for asset-register update.\n\n"
                "Lease expiry / return — landlord requires the office to be cleared of tenant IT before "
                "return. Deadline-driven, sometimes very short notice.\n\n"
                "Startup shutdown — early-stage company closing. Full IT clearance + documentation for "
                "founder tax records and any investor closure requirements."
             )},
            {"h2": "Documentation typical clearances need",
             "body": (
                "Pickup acknowledgement — signed at each pickup visit, showing categories and rough "
                "counts collected. Standard for every clearance day.\n\n"
                "GST invoice — for the total pickup (and buyback payment if any). Standard for "
                "GST-registered businesses.\n\n"
                "Per-device asset log — serial, model, condition, disposition per unit. Used for "
                "final asset-register write-off, insurance records, and end-of-lease documentation.\n\n"
                "Certificate of Destruction — issued per drive or per batch after data destruction "
                "is complete. Required for compliance (DPDP Act, ISO 27001, sector regulators) and "
                "for insurance renewals.\n\n"
                "Closure-record documentation — for office closures, a consolidated document showing "
                "'all IT and e-waste from this address collected and disposed on [dates]' — useful for "
                "dissolution paperwork, tax filings, and any investor/lender closure requirements."
             )},
            {"h2": "When the deadline is very short",
             "body": (
                "Sometimes office clearance has to happen in 3-7 days rather than 3-4 weeks — "
                "unexpected lease non-renewal, sudden closure decision, or a landlord requirement "
                "surfacing late. Feasibility for short-deadline clearance depends on:\n\n"
                "Team availability during your deadline window.\n\n"
                "Transport capacity for the volume you have.\n\n"
                "Data destruction slot availability if per-drive certificates are needed.\n\n"
                "How compressed the multi-day pickup can be (some clearances can compress to 2 days; "
                "others really need 5).\n\n"
                "Message with the actual deadline and 'urgent' flag; the team returns a feasibility "
                "answer within a short window. Not every deadline is feasible, but many are."
             )},
        ],
        "faqs": [
            {"q": "How does office clearance work?",
             "a": "Message scope + deadline + inventory. Team plans a multi-day pickup that fits your deadline, agrees the workflow and documentation set, executes against the schedule. Documentation issues after collection. Fits closures, relocations, downsizing, and lease returns."},
            {"q": "How much notice do you need?",
             "a": "Ideally 2-4 weeks for a smooth clearance with time for data destruction and documentation. Short-notice (3-7 days) clearance is feasibility-dependent — worth asking, sometimes possible for smaller jobs."},
            {"q": "What documentation do you provide for office closure?",
             "a": "Pickup acknowledgement per visit, consolidated GST invoice for the clearance, per-device asset log, Certificate of Destruction for data-bearing devices, and a closure-record document for dissolution/tax/investor purposes. Name what your accountant or lawyer needs."},
            {"q": "Do you handle the data destruction as part of clearance?",
             "a": "Yes — recommended default for any office clearance. Options: software wiping (drives stay intact), physical shredding (drives destroyed), on-site destruction (drives never leave your premises). Per-drive or per-batch Certificate available on request."},
            {"q": "Can pickup happen after we've moved out of the office?",
             "a": "Yes, with landlord coordination. Some landlords allow the outgoing tenant a few post-move days for e-waste pickup; others require pickup during the notice period. Confirm with your landlord and factor into scheduling."},
            {"q": "Do you take office furniture that has electronics built in?",
             "a": "Yes for the electronics component — powered desks, powered chairs, electronic locks. The furniture itself is a separate flow. Say what furniture is included so we can decide what fits your clearance."},
            {"q": "What if the office has old UPS batteries?",
             "a": "Battery recycling — separate handling within the same clearance. Flag battery bank size in your inventory so transport can be planned. See /battery-recycling/."},
            {"q": "Is office clearance more expensive than routine pickup?",
             "a": "Pickup itself is free for eligible collections. The additional services typical for clearances — data destruction with per-drive Certificates, on-site destruction, urgent deadline compliance, multi-day scheduling, dissolution-record documentation — carry costs quoted before the job."},
        ],
        "related_pages": rel(
            CORE_LINKS["itad"], CORE_LINKS["corporate"], CORE_LINKS["office_pickup"],
            CORE_LINKS["data"], ("/bulk-electronics-disposal/", "Bulk electronics disposal"),
            CORE_LINKS["cert_sample"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, we're clearing our office — here's the scope and deadline:",
    }


def spec_bulk_electronics_disposal() -> dict:
    return {
        "path": "/bulk-electronics-disposal/",
        "title": "Bulk Electronics Disposal in Kochi | Volume Collection + Recovery",
        "description": "Bulk electronics disposal in Kochi — scheduled collection for large-volume electronics from offices, warehouses, apartment cleanouts and organisational retirement.",
        "h1": "Bulk Electronics Disposal in Kochi",
        "breadcrumb_label": "Bulk Disposal",
        "service_type": "Bulk electronics disposal and recovery",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Bulk electronics disposal covers scenarios where the volume is large enough that "
            "the usual pickup logistics don't apply — warehouses clearing accumulated stock, "
            "organisations retiring large batches of electronics, apartment complexes with "
            "shared cleanout drives. This page covers how bulk disposal is planned, what "
            "volumes typically qualify, and how it relates to the more familiar bulk pickup "
            "workflow."
        ),
        "direct_answer": (
            "For bulk electronics disposal in Kochi, WhatsApp Ewaste Kochi with the approximate "
            "volume (rough count or estimated cubic metres), the item categories, the location, "
            "and any deadline. The team confirms transport feasibility and schedules pickup. "
            "Pickup is free for eligible collections; specialised handling (refrigerant, data-"
            "destruction, on-site sorting) is quoted separately."
        ),
        "key_takeaways": [
            "For volumes beyond routine pickup — full truckloads, warehouse batches, organisational retirement.",
            "Notice: 1-2 weeks typical; 3+ weeks for very large or specialised volumes.",
            "Free pickup for eligible collections; special handling quoted separately.",
            "Rough volume estimate at booking (cubic metres or approximate item count) — exact captured at pickup.",
            "Fits warehouses, organisational retirement, apartment complex cleanout drives.",
        ],
        "accepted_items": {
            "columns": ["Bulk scenario", "Typical workflow", "Notes"],
            "rows": [
                ["Warehouse clearing accumulated electronics stock", "Multi-truck coordinated pickup", "Include category breakdown if possible"],
                ["Organisation retiring large batch of computers/phones", "ITAD workflow with per-device tracking", "Per-serial capture typical"],
                ["Apartment complex shared cleanout drive", "Scheduled pickup — multiple flats consolidated", "Building admin coordination"],
                ["Corporate CSR e-waste collection drive", "Timed pickup at the event location", "Public collection event"],
                ["Retail chain product return / end-of-life stock", "Bulk pickup per location, consolidated across chain", "Multi-location coordination"],
                ["Government / institutional bulk retirement", "Documentation-heavy workflow", "Formal disposal records"],
            ],
        },
        "how_to_steps": [
            {"name": "Message volume + categories + location + deadline",
             "text": "Rough count or estimated volume (cubic metres approximate), item categories (mixed electronics, laptops, phones, etc.), location, and any deadline."},
            {"name": "Team confirms transport feasibility",
             "text": "Very large volumes may need multi-truck coordination or multiple pickup days. Team returns a feasibility answer and slot proposal."},
            {"name": "Agree the workflow",
             "text": "For unspecified bulk (mixed materials) — standard bulk disposal. For per-device tracking (organisational retirement of specific IT) — ITAD workflow."},
            {"name": "Scheduled pickup",
             "text": "Team arrives at agreed slot(s) with appropriate transport. Multi-day pickups possible for very large volumes. Rough sorting on-site if useful."},
            {"name": "Documentation + delivery",
             "text": "Pickup acknowledgement per visit. Consolidated documentation issued after collection is complete. Certificate of Destruction for any data-bearing devices in the batch."},
        ],
        "sections": [
            {"h2": "When bulk disposal fits vs bulk pickup",
             "body": (
                "Bulk pickup (see /bulk-e-waste-pickup/) fits scenarios in the 10-50 device range or a "
                "full-apartment / full-small-office cleanout — meaningful volume, but fits into a "
                "single-visit or two-visit workflow.\n\n"
                "Bulk disposal fits scenarios where the volume is genuinely large: multiple truckloads, "
                "warehouse stock, organisational retirement of hundreds of devices, apartment complex "
                "coordinated cleanouts, public collection events.\n\n"
                "The distinction matters for planning: bulk disposal often needs multi-truck "
                "coordination, multi-day pickup, or event-day timed collection. Bulk pickup usually "
                "fits within a single team's day with routine transport."
             )},
            {"h2": "Volume estimation for booking",
             "body": (
                "The most useful volume information for bulk disposal:\n\n"
                "Cubic metres approximate — even a rough estimate ('about the size of a small car' or "
                "'2-3 cubic metres') is useful for transport planning.\n\n"
                "Category breakdown — mixed general electronics vs specifically 200 laptops vs "
                "specifically retiring 50 UPS batteries all need different transport.\n\n"
                "Container currently used — 'stored in cardboard boxes in a corner', 'stacked on 3 "
                "pallets', 'filling half a shipping container' — all give useful shape to the volume.\n\n"
                "Exact count comes at pickup, not booking. The booking-time estimate is for scheduling "
                "and transport planning."
             )},
            {"h2": "Common bulk disposal scenarios",
             "body": (
                "Warehouse accumulated stock — a warehouse or distribution centre has accumulated "
                "damaged, returned, or end-of-life electronics over months or years. Full clearance "
                "typically needs multi-truck coordinated pickup.\n\n"
                "Corporate CSR collection event — company runs an internal e-waste collection week; "
                "hundreds of employees drop electronics at a designated point. Pickup at the event "
                "close.\n\n"
                "Apartment complex shared cleanout — a residential association organises a coordinated "
                "e-waste drive across dozens of flats. Consolidated pickup on a scheduled day.\n\n"
                "Organisational IT retirement — large offices, government departments, educational "
                "institutions, hospitals retiring bulk devices. Per-serial tracking and formal "
                "documentation typical.\n\n"
                "Retail chain end-of-life stock — retailer clearing product return stock or end-of-"
                "life inventory across locations. Multi-location coordinated pickup."
             )},
        ],
        "faqs": [
            {"q": "What counts as 'bulk' for disposal purposes?",
             "a": "Anything genuinely large: multiple truckloads, warehouse stock, organisational retirement of hundreds of devices, coordinated apartment complex cleanouts, corporate CSR collection events. Smaller volumes fit under bulk pickup (see /bulk-e-waste-pickup/) rather than bulk disposal."},
            {"q": "How much notice do you need for bulk disposal?",
             "a": "1-2 weeks typical for scheduled bulk. 3+ weeks for very large volumes or multi-location coordination. Emergency bulk (deadline-driven closure) reviewable case-by-case."},
            {"q": "Is bulk disposal free?",
             "a": "Pickup itself is free for eligible bulk collections. Multi-truck coordination, specialised handling (refrigerant, on-site data destruction), or urgent deadlines carry costs quoted before the job."},
            {"q": "Do you handle warehouse-scale electronics clearance?",
             "a": "Yes. Warehouse clearance typically needs multi-truck coordinated pickup or multi-day scheduling. Message with rough volume, category breakdown, and warehouse address — team returns feasibility and scheduling proposal."},
            {"q": "Can you pick up from a corporate CSR e-waste collection event?",
             "a": "Yes — event-day timed pickup at the event close. Common for company weeks/months where employees are encouraged to drop electronics at a central point. Coordinate the event date and drop-off close time with the pickup slot."},
            {"q": "What about apartment complex cleanouts?",
             "a": "Yes. Residential associations sometimes organise coordinated e-waste drives across dozens of flats. Building admin coordinates the drop-off; team schedules consolidated pickup on the agreed day."},
            {"q": "Do you handle multi-location bulk disposal for retail chains?",
             "a": "Yes. Multi-location bulk with one point of contact and consolidated documentation across sites. Common for retail chains and hospitality groups clearing end-of-life stock or IT."},
            {"q": "What documentation is available?",
             "a": "Pickup acknowledgement per visit, consolidated GST invoice, per-device asset log (with ITAD workflow), Certificate of Destruction (for data-bearing devices), environmental disposal record (for CSR/ESG). Name what applies at booking."},
        ],
        "related_pages": rel(
            ("/bulk-e-waste-pickup/", "Bulk pickup — smaller-scale bulk"),
            CORE_LINKS["corporate"], CORE_LINKS["itad"], ("/office-clearance/", "Office clearance"),
            ("/it-asset-disposal/", "IT asset disposal"),
            CORE_LINKS["locations"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, we have a bulk electronics disposal scope — here are the details:",
    }


def spec_retail_e_waste_recycling() -> dict:
    return {
        "path": "/retail-e-waste-recycling/",
        "title": "Retail E-Waste Recycling in Kochi | POS + Store IT + Multi-Location",
        "description": "Retail e-waste recycling in Kochi — POS terminal retirement, store IT clearance, and multi-location chain coordination with card-data destruction and documentation.",
        "h1": "Retail E-Waste Recycling in Kochi",
        "breadcrumb_label": "Retail E-Waste",
        "service_type": "Retail sector e-waste recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Retail e-waste has distinct patterns that don't fit general office pickup — POS "
            "terminals with card-data records that need certified destruction, back-office "
            "computers with customer records, CCTV DVRs with video archives, signage electronics, "
            "chain-wide equipment refresh cycles, and multi-store scheduling around each location's "
            "operating hours. This page covers how retail e-waste is planned differently, why POS "
            "data destruction matters specifically (PCI DSS and general customer-data policy), how "
            "multi-store retail chains coordinate collection across branches, and what "
            "documentation typical retail compliance workflows need."
        ),
        "direct_answer": (
            "For retail e-waste recycling in Kochi, WhatsApp Ewaste Kochi with store location(s), "
            "device inventory (POS terminals, back-office PCs, printers, CCTV DVRs), and any "
            "compliance requirements (PCI DSS card-data destruction, insurance, corporate "
            "audit). Multi-store chains get one point of contact and consolidated documentation. "
            "Pickup is free for eligible collections; per-terminal Certificate of Destruction "
            "and multi-location scheduling are optional add-ons quoted before the job."
        ),
        "key_takeaways": [
            "POS terminals hold card-data records — physical drive destruction recommended.",
            "Multi-store chains get one point of contact and consolidated documentation.",
            "Coordinated pickup outside store operating hours where useful.",
            "Common items: POS, back-office PCs, printers, CCTV DVRs, signage electronics.",
            "PCI DSS-compliant destruction workflow available.",
        ],
        "accepted_items": {
            "columns": ["Retail item", "Route", "Notes"],
            "rows": [
                ["POS terminals (any brand, any age)", "Physical drive shredding + per-terminal Certificate + material recovery", "Card data risk — default recommendation"],
                ["Back-office computers (management, admin)", "Buyback check + data destruction + recycling", "Customer data typical"],
                ["Cash-drawer + receipt printers", "Material recovery", "Batch with POS"],
                ["Retail printers, label printers, thermal printers", "Material recovery", "Included with store IT batch"],
                ["CCTV DVRs (retiring surveillance systems)", "Physical drive shredding + material recovery", "Video-record data on internal drives"],
                ["Signage electronics (digital price tags, kiosks)", "Material recovery", "May hold config data"],
                ["Old iPads/tablets used as POS or inventory devices", "Data destruction + buyback check for hardware", "Factory reset + iCloud sign-out required"],
                ["Store network gear (switches, WAPs, routers)", "See /network-equipment-recycling/", "Config data worth flagging"],
            ],
        },
        "how_to_steps": [
            {"name": "Send store location(s) + device inventory",
             "text": "Single store: one address + inventory. Chain: list of store locations + inventory per location. Include POS terminal count specifically (highest-sensitivity items)."},
            {"name": "Flag compliance requirements",
             "text": "PCI DSS card-data destruction, corporate audit trail requirements, insurance disposal records — say what applies. Retail chains often have specific policy requirements around POS device retirement."},
            {"name": "Agree the workflow — standard or ITAD",
             "text": "Small single-store clearance fits standard bulk. Multi-store or per-terminal certification needs ITAD workflow with per-device serial capture."},
            {"name": "Coordinate scheduling around store hours",
             "text": "Retail pickup usually outside operating hours to avoid customer disruption. Before opening, after closing, or on off-days. Multi-store chains scheduled across days."},
            {"name": "Pickup + on-site verification + documentation",
             "text": "Team collects at agreed slot, verifies device list, captures serials if ITAD workflow. Pickup acknowledgement per store. Consolidated documentation and Certificates issued after the destruction step."},
        ],
        "sections": [
            {"h2": "Why POS terminal data destruction matters specifically",
             "body": (
                "POS terminals in service more than 6 months have processed thousands of card "
                "transactions. Even 'tokenised' payment systems often have residual data on the local "
                "storage — logs, customer identifiers, transaction records, receipt copies. Under PCI "
                "DSS (payment card industry data security standard) and general customer-data policy, "
                "this data must be handled with certified destruction when the terminal is retired.\n\n"
                "The default recommendation for retail POS retirement: physical shredding of the "
                "internal storage, per-terminal Certificate of Destruction. Software wiping is "
                "technically an option for lower-risk cases (older cash-only POS without card "
                "processing), but for anything that touched payment cards, physical is the safer "
                "default.\n\n"
                "For chains with formal PCI DSS obligations, per-terminal Certificate is essentially "
                "required for compliance evidence."
             )},
            {"h2": "Multi-store chain coordination",
             "body": (
                "Retail chains retiring POS or IT equipment across multiple stores get one coordinated "
                "engagement rather than individual per-store bookings:\n\n"
                "One point of contact — usually the chain's IT lead or facility manager. All "
                "communication routes through them; individual store managers don't each need to book "
                "their own pickup.\n\n"
                "Consolidated documentation — one asset log covering all stores, one set of "
                "Certificates covering all destroyed drives, one final report. Simpler for chain audit "
                "and finance.\n\n"
                "Scheduled across days — chains typically don't do all-stores-same-day. Pickup routes "
                "sequentially across stores over 1-2 weeks, planned around each store's operating "
                "hours.\n\n"
                "Common for: retail chains refreshing POS across all branches (payment system "
                "upgrade), retail chains closing older-format stores, hospitality chains retiring "
                "kitchen POS or reservation systems, jewellery/pharmacy/specialty retail with formal "
                "data-handling requirements."
             )},
            {"h2": "Store IT beyond POS",
             "body": (
                "Retail e-waste includes more than POS:\n\n"
                "Back-office computers (management, admin, inventory) hold customer data, employee "
                "records, financial data — treat as data-bearing.\n\n"
                "CCTV DVRs hold video records — often overlooked but definitely data-bearing. Physical "
                "drive destruction recommended.\n\n"
                "Signage electronics (digital price tags, self-service kiosks) hold configuration "
                "data.\n\n"
                "iPad-based POS / inventory devices need factory reset + iCloud sign-out. If the iPad "
                "is retiring rather than being redeployed, buyback check + data destruction routing.\n\n"
                "Store network gear (managed switches, WAPs, firewalls) may hold configuration data "
                "worth wiping."
             )},
        ],
        "faqs": [
            {"q": "How do we handle retiring POS terminals for our retail chain?",
             "a": "POS terminals need physical drive shredding with per-terminal Certificate of Destruction as the default recommendation — card-data risk. Book bulk pickup with ITAD workflow for chain-wide coordination and consolidated documentation across stores."},
            {"q": "Are we PCI DSS compliant if we recycle POS terminals normally?",
             "a": "Depends on your specific PCI DSS scope. Most PCI DSS obligations require certified destruction of card-data-bearing devices with evidence (per-terminal Certificate of Destruction). Software wiping is generally not sufficient; physical shredding with documented Certificate is the safer default. Consult your PCI QSA for your specific chain's requirements."},
            {"q": "Can you coordinate pickup across our chain of stores?",
             "a": "Yes. Multi-store engagement with one point of contact, consolidated documentation, and scheduled pickup across days/weeks planned around each store's operating hours."},
            {"q": "Do you handle old CCTV DVRs when we upgrade surveillance?",
             "a": "Yes. CCTV DVRs hold video records on internal drives — physical drive destruction recommended as default. Common when chains upgrade to cloud-based surveillance."},
            {"q": "What about back-office computers in stores?",
             "a": "Standard IT retirement workflow — buyback check for viable machines, data destruction for the drives (customer/employee data typical), recycling for the rest."},
            {"q": "Can pickup happen when stores are closed?",
             "a": "Yes — usually preferred. Before opening, after closing, or on the weekly off-day. Multi-store chains coordinate pickup across each store's operating schedule."},
            {"q": "What about signage electronics — digital price tags, kiosks?",
             "a": "Accepted. May hold configuration data worth wiping if the units connect to your inventory or customer systems. Flag when booking."},
            {"q": "Do you handle iPad-based POS systems?",
             "a": "Yes. iPads need factory reset + iCloud sign-out for clean buyback. If they can't be reset (locked to a lost management account), data destruction routing instead. Buyback check for the iPad hardware."},
        ],
        "related_pages": rel(
            CORE_LINKS["corporate"], CORE_LINKS["itad"], CORE_LINKS["data"],
            CORE_LINKS["hdd"], ("/business-e-waste-recycling/", "Business e-waste"),
            CORE_LINKS["cert_sample"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, we're retiring retail store equipment — here's the scope:",
    }


# ---------------------------------------------------------------------------
# Update ALL_SPECS with the extended set (Batch 1 + Batch 2 = 25 total)
# ---------------------------------------------------------------------------

ALL_SPECS = [
    # Batch 1 (2026-07-28 initial)
    ("appliance-recycling",        spec_appliance_recycling),
    ("printer-recycling",          spec_printer_recycling),
    ("home-e-waste-pickup",        spec_home_e_waste_pickup),
    ("bulk-e-waste-pickup",        spec_bulk_e_waste_pickup),
    ("battery-pickup",             spec_battery_pickup),
    ("laptop-scrap-price",         spec_laptop_scrap_price),
    ("phone-buyback",              spec_phone_buyback),
    ("it-asset-disposal",          spec_it_asset_disposal),
    ("school-e-waste-recycling",   spec_school_e_waste_recycling),
    ("hospital-e-waste-recycling", spec_hospital_e_waste_recycling),
    # Batch 2 (2026-07-28 continuation — 15 more pillar children)
    ("electronics-recycling",         spec_electronics_recycling),
    ("network-equipment-recycling",   spec_network_equipment_recycling),
    ("sell-old-laptop",               spec_sell_old_laptop),
    ("sell-old-computer",             spec_sell_old_computer),
    ("sell-old-mobile",               spec_sell_old_mobile),
    ("sell-office-electronics",       spec_sell_office_electronics),
    ("electronics-scrap-value",       spec_electronics_scrap_value),
    ("computer-scrap-price",          spec_computer_scrap_price),
    ("scheduled-pickup",              spec_scheduled_pickup),
    ("same-day-pickup",               spec_same_day_pickup),
    ("corporate-pickup",              spec_corporate_pickup),
    ("business-e-waste-recycling",    spec_business_e_waste_recycling),
    ("office-clearance",              spec_office_clearance),
    ("bulk-electronics-disposal",     spec_bulk_electronics_disposal),
    ("retail-e-waste-recycling",      spec_retail_e_waste_recycling),
]


# ---------------------------------------------------------------------------
# Batch 3 — 5 additional pillar cluster children (2026-07-28)
# ---------------------------------------------------------------------------
# Device-specific pages capturing query surface not yet covered:
# monitors, tablets, CCTV, UPS units, gaming consoles.

def spec_monitor_recycling() -> dict:
    return {
        "path": "/monitor-recycling/",
        "title": "Where to Recycle Old Monitors in Kochi | Free Pickup",
        "description": "Where to recycle old monitors in Kochi — LCD, LED, CRT and gaming monitors. Free doorstep pickup with material recovery and bulky-item transport planning.",
        "h1": "Where to Recycle Monitors in Kochi",
        "breadcrumb_label": "Monitor Recycling",
        "service_type": "Monitor recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Old monitors accumulate the way old TVs used to — bulky, no resale value once a "
            "model is a few years old, but too big to sit in a corner forever. This page covers "
            "what monitor types get accepted, why CRTs need special handling, and how a "
            "monitor pickup is typically planned differently from smaller electronics."
        ),
        "direct_answer": (
            "To recycle a monitor in Kochi, WhatsApp Ewaste Kochi with the type (LCD/LED/CRT), "
            "size, condition and your address. Doorstep pickup is scheduled based on area and "
            "the size of the monitor. CRT monitors are bulky and need advance transport "
            "planning. Recent working monitors may qualify for a small buyback quote; older "
            "monitors go to free recycling."
        ),
        "key_takeaways": [
            "LCD, LED, CRT, gaming monitors — all accepted.",
            "CRT monitors need advance transport planning (bulky, heavy, hazardous materials).",
            "Recent working monitors may qualify for reduced buyback; older ones recycling only.",
            "Batch with computers if you're retiring a whole desktop setup.",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["Monitor type", "Route", "Notes"],
            "rows": [
                ["LCD/LED monitors (any age, working)", "Material recovery; reduced buyback for recent", "Batch with desktop if bundled"],
                ["LCD/LED monitors (not working)", "Material recovery", "Free pickup, no payment"],
                ["Gaming monitors (144Hz+, recent)", "Buyback check first for recent working units", "Include model and specs"],
                ["Ultrawide / curved monitors (recent)", "Buyback check; material recovery otherwise", "Bulky — advance planning"],
                ["CRT monitors (older tube type)", "Specialised material recovery (hazardous handling)", "Very bulky, very heavy"],
                ["Portable / travel monitors", "Material recovery + buyback for recent working", "Small enough for routine pickup"],
                ["Cracked-screen monitors", "Material recovery — no buyback", "Note the damage in your message"],
            ],
        },
        "how_to_steps": [
            {"name": "Message monitor type, size, condition",
             "text": "LCD/LED/CRT, screen size (24-inch, 27-inch, 32-inch, etc.), whether it works, and any damage. Photo of the model plate on the back helps."},
            {"name": "Flag if CRT or very large",
             "text": "CRT monitors need advance transport planning. Large ultrawides (32-inch+) may also need larger vehicle access."},
            {"name": "Confirm access details",
             "text": "Floor, lift access, whether the monitor is already disconnected or still on the desk. Bulky monitors sometimes need two-person transport."},
            {"name": "Doorstep pickup at confirmed slot",
             "text": "Team arrives, disconnects if needed, collects. Cables and monitor stand batched with the same pickup."},
            {"name": "Downstream: recycling or resale check",
             "text": "Working recent monitors checked for resale value. Older or damaged monitors route to material recovery — LCD panels are separated from the frame and electronics."},
        ],
        "sections": [
            {"h2": "Why CRT monitors need special handling",
             "body": (
                "Cathode ray tube (CRT) monitors — the old boxy tube-type monitors from the 1990s "
                "and early 2000s — contain small amounts of lead in the glass and phosphors in the "
                "coating that need specialised handling during recycling. They're also physically "
                "heavy (a 17-inch CRT can weigh 15-20 kg) and awkward to transport.\n\n"
                "Practical implication: CRT pickup usually needs 2-3 working days notice for "
                "transport planning, and the pickup team brings appropriate lifting equipment. "
                "Don't try to disassemble a CRT yourself — the vacuum tube can implode if broken, "
                "and the internal circuitry can retain charge even when unplugged."
             )},
            {"h2": "Buyback for monitors — when it applies",
             "body": (
                "Monitor buyback is a smaller market than laptop or phone buyback because monitor "
                "prices depreciate quickly. Rough guide for what might qualify:\n\n"
                "Recent (last 2-3 years) working LCD/LED monitors, 27-inch or larger, from known "
                "brands (Dell, LG, Samsung, ASUS, HP) may qualify for a modest buyback quote.\n\n"
                "Gaming monitors with high refresh rates (144Hz, 240Hz) or specialty features (G-Sync, "
                "FreeSync Premium, OLED) retain more value than standard office monitors.\n\n"
                "Ultrawide and curved monitors from the last 2 years retain some value.\n\n"
                "Standard office monitors more than 3 years old typically don't qualify — route to "
                "material recovery, no payment, free pickup."
             )},
            {"h2": "Bulk monitor pickup — office IT refresh",
             "body": (
                "Offices retiring 10+ monitors at once (IT refresh, department downsizing, monitor "
                "upgrade across a team) are a common bulk scenario. Bulk monitor pickup usually "
                "routes through standard bulk workflow — recent working units checked for buyback, "
                "older units go to recovery, everything picked up in one visit.\n\n"
                "For monitor-heavy offices (video production, engineering, trading floors) with "
                "specialty displays (colour-calibrated, 4K/5K, professional-grade), buyback "
                "likelihood is higher — mention specs when booking."
             )},
        ],
        "faqs": [
            {"q": "Where can I recycle an old monitor in Kochi?",
             "a": "Message Ewaste Kochi with the monitor type, size, condition and your location. Pickup is scheduled based on area and size. Recent working monitors may qualify for reduced buyback; older monitors go to free recycling."},
            {"q": "Do you take old CRT monitors?",
             "a": "Yes. CRT monitors need advance transport planning because they're heavy, bulky, and contain small amounts of lead requiring specialised material recovery. Give 2-3 working days notice; the team brings appropriate lifting equipment."},
            {"q": "Can I get money for an old monitor?",
             "a": "Sometimes — recent (last 2-3 years) large working LCD/LED monitors from known brands may qualify for a modest buyback quote. Gaming monitors with high refresh rates retain more value. Standard office monitors more than three years old typically don't qualify — free pickup, no payment."},
            {"q": "Should I disconnect the monitor before pickup?",
             "a": "If you can, yes. If you can't (part of a large desk setup, cables tangled behind equipment), flag it and the team helps with disconnection at pickup."},
            {"q": "What about bulk monitor pickup for an office IT refresh?",
             "a": "Yes — 10+ monitors at once is a standard bulk scenario. Batched with desktops if you're retiring whole setups. Buyback for recent working units, recycling for the rest, one visit."},
            {"q": "Do you accept damaged or cracked-screen monitors?",
             "a": "Yes. Cracked-screen or damaged monitors don't qualify for buyback but are accepted for free material recovery. Note the damage in your message so the team knows what to expect."},
            {"q": "What happens to the monitor after pickup?",
             "a": "Recent working units may go to resale after inspection. Older or damaged units route to material recovery — LCD panel separated from frame, electronics separated for component recovery, plastic housing recycled."},
        ],
        "related_pages": rel(
            CORE_LINKS["recycling"], CORE_LINKS["computer"], CORE_LINKS["tv"],
            CORE_LINKS["pickup"], CORE_LINKS["sell"], CORE_LINKS["locations"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle a monitor — here are the details:",
    }


def spec_tablet_recycling() -> dict:
    return {
        "path": "/tablet-recycling/",
        "title": "Where to Recycle Old Tablets in Kochi | iPad, Android Tablet Buyback",
        "description": "Where to recycle old tablets in Kochi — iPads and Android tablets, working or damaged. Free doorstep pickup, condition-based buyback quote, data destruction.",
        "h1": "Where to Recycle Tablets in Kochi",
        "breadcrumb_label": "Tablet Recycling",
        "service_type": "Tablet recycling and buyback",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Tablets fall between phones and laptops in the buyback market — iPads retain "
            "meaningful value longer than most Android tablets, but the second-hand tablet "
            "market is real. This page covers what tablets qualify for buyback, why "
            "factory-resetting matters (especially for iPads with Activation Lock), and how "
            "damaged or dead tablets get handled."
        ),
        "direct_answer": (
            "To recycle a tablet in Kochi, WhatsApp Ewaste Kochi with the brand, model, "
            "storage size, condition and photos. Working iPads and recent Android tablets "
            "usually qualify for a condition-based buyback quote. Factory-reset before pickup "
            "(iPad: sign out of Apple ID; Android: remove Google account). Damaged or dead "
            "tablets route to free recycling with data destruction."
        ),
        "key_takeaways": [
            "iPad, Android tablets, Samsung Galaxy Tab, Amazon Fire — all accepted.",
            "iPads retain resale value best; recent Android tablets qualify too.",
            "Factory-reset + sign out of Apple ID / Google account before pickup.",
            "Cracked screens, dead tablets, water damage — all still accepted (recycling only).",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["Tablet", "Buyback likelihood", "Notes"],
            "rows": [
                ["iPad (last 3-4 years, working)", "High — usually meaningful quote", "iCloud sign-out required for buyback"],
                ["Older iPad (working)", "Medium — reduced quote", "iOS support cutoff affects value"],
                ["iPad Pro (any recent generation)", "High — enterprise buyer market", "Include storage + cellular/WiFi info"],
                ["Samsung Galaxy Tab (recent, working)", "Medium — depends on model", "Higher-end S-series retains more"],
                ["Android tablet (mid-range, working)", "Low-medium", "Depends on brand and specs"],
                ["Amazon Fire tablet", "Low — narrow resale market", "Free pickup for recycling"],
                ["Cracked screen but works", "Reduced buyback OR recycling", "Photo of damage helps"],
                ["Not working / water-damaged", "Recycling only — no buyback", "Data destruction essential"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model + storage info",
             "text": "iPad: Settings → General → About shows model and storage. Android tablet: Settings → About tablet. Include colour and any accessories (keyboard, Apple Pencil, S-Pen)."},
            {"name": "Photograph front, back, About screen",
             "text": "Screen on with About page visible is the cleanest identification for buyback estimate."},
            {"name": "Factory reset before pickup",
             "text": "iPad: back up, sign out of Apple ID, then Settings → General → Reset → Erase All Content. Android: sign out of Google, then factory reset. This clears Activation Lock (iPad) or FRP (Android) which blocks resale otherwise."},
            {"name": "Send WhatsApp with details + photos",
             "text": "Brand + model + storage + condition + factory-reset status. Team returns condition-based estimate."},
            {"name": "Doorstep pickup + inspection + payment",
             "text": "Team collects, inspects, and pays on the spot for accepted quotes. Cash, UPI, or bank transfer."},
        ],
        "sections": [
            {"h2": "Why iPad Activation Lock and Android FRP matter for buyback",
             "body": (
                "Every iPad from 2013 onward has Activation Lock tied to the original owner's Apple ID. If "
                "the tablet still has Activation Lock enabled when handed over, no one can set it "
                "up — the buyer effectively receives a paperweight. Same for Android tablets since "
                "roughly 2015 with Factory Reset Protection (FRP): removing the Google account after "
                "reset unlocks the device for the next owner.\n\n"
                "For buyback to work: factory reset first, sign out of the account, then hand over. "
                "The team verifies the tablet reaches the setup screen unlocked before confirming "
                "the buyback quote.\n\n"
                "If you can't reset (forgotten Apple ID password, locked out of Google account, "
                "device won't power on), flag it when booking. The tablet routes through data "
                "destruction instead of buyback — no buyback payment, but pickup is still free and "
                "the storage is properly destroyed."
             )},
            {"h2": "Accessories — Apple Pencil, keyboards, cases",
             "body": (
                "iPad accessories often have meaningful independent value. Apple Pencil (both "
                "generations), Magic Keyboard, Smart Keyboard Folio, first-party Smart Covers all "
                "retain some resale value.\n\n"
                "Include accessories in the pickup — either they add to the buyback quote (for "
                "the working iPad + accessories bundle) or they get their own smaller quote if the "
                "iPad itself doesn't qualify. Third-party keyboards and cases usually don't have "
                "meaningful buyback value but are still accepted for recycling."
             )},
            {"h2": "Damaged tablets — cracked screens, dead batteries",
             "body": (
                "Cracked-screen tablets: often still qualify for reduced buyback if the tablet "
                "works despite the crack. Touch input failing (partial dead zones, ghost touches) "
                "reduces the quote significantly.\n\n"
                "Dead battery: swelling is a real risk with older iPads and Android tablets kept in "
                "hot conditions. If the battery is swelling (screen popping out of the frame, "
                "casing curved), flag it and photograph — battery pickup goes through separate "
                "safe-transport handling.\n\n"
                "Water-damaged: usually no buyback (internal corrosion unpredictable). Route: "
                "recycling with data destruction — assume storage may still be technically "
                "recoverable."
             )},
        ],
        "faqs": [
            {"q": "How much is my old iPad worth?",
             "a": "Depends on model, storage size, cellular/WiFi variant, and condition. Recent iPads (last 3-4 years) usually get meaningful quotes; iPad Pro retains more value than base iPad or iPad Mini. Send About screen + photos for a specific number."},
            {"q": "Do you buy old Android tablets too?",
             "a": "Yes. Recent Samsung Galaxy Tab (S-series especially) qualifies. Mid-range Android tablets get reduced quotes. Very old or low-end tablets usually go to recycling only."},
            {"q": "What about my old iPad with a cracked screen?",
             "a": "If it still works, reduced buyback quote is possible. If touch input is failing or the crack has made the tablet unusable, recycling only. Photo of the damage helps the estimate."},
            {"q": "Do I need to remove Activation Lock before pickup?",
             "a": "Yes for buyback — factory reset + sign out of Apple ID clears Activation Lock. If you can't (forgotten Apple ID password, device won't power on), flag it — the tablet routes through data destruction instead of buyback."},
            {"q": "What about Apple Pencil and iPad keyboard accessories?",
             "a": "Include them in the pickup. First-party accessories (Apple Pencil, Magic Keyboard, Smart Keyboard) have their own resale value — either bundled into the iPad quote or separately quoted."},
            {"q": "Do you take Amazon Fire tablets?",
             "a": "Yes for recycling. Amazon Fire tablets have a much narrower second-hand resale market than iPads or high-end Android tablets, so meaningful buyback quotes are rare — free pickup, material recovery. If you're deregistering the tablet from your Amazon account first (Settings → My Account → Deregister), that's the cleanest handover; if you can't, flag it and the tablet routes through data destruction before recycling."},
            {"q": "What if the battery is swollen?",
             "a": "Flag it when booking and include a photo showing the swelling. Swollen batteries need separate safe-transport handling — the team brings appropriate containment. Leave the swollen battery inside the tablet (do not try to remove or puncture it) and keep the tablet on a non-flammable surface until pickup."},
        ],
        "related_pages": rel(
            CORE_LINKS["mobile"], CORE_LINKS["sell"], CORE_LINKS["marketplace"],
            CORE_LINKS["data"], CORE_LINKS["battery"], CORE_LINKS["pickup"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle a tablet — here are the details:",
    }


def spec_cctv_recycling() -> dict:
    return {
        "path": "/cctv-recycling/",
        "title": "CCTV Recycling in Kochi | DVR/NVR Disposal + Video Data Destruction",
        "description": "CCTV recycling in Kochi — DVR, NVR, cameras and cabling. Video-record data on internal drives requires physical destruction. Free pickup for eligible collections.",
        "h1": "CCTV Recycling in Kochi",
        "breadcrumb_label": "CCTV Recycling",
        "service_type": "CCTV and surveillance equipment recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Old CCTV equipment — cameras, DVRs, NVRs, cabling, monitors, storage drives — is "
            "one of the most-overlooked data-bearing e-waste categories. A DVR retiring from a "
            "shop or apartment complex holds months or years of video records on its internal "
            "drive. This page covers what CCTV equipment gets accepted, why DVR/NVR drives need "
            "certified destruction, and how large surveillance-system upgrades get scheduled."
        ),
        "direct_answer": (
            "To recycle CCTV equipment in Kochi, WhatsApp Ewaste Kochi with the equipment "
            "type (DVR/NVR, cameras, monitors), rough count and your location. DVR/NVR "
            "internal drives hold video records and need physical destruction before recycling. "
            "Certificate of Destruction available on request. Doorstep pickup is free for "
            "eligible collections; on-site drive destruction available for high-sensitivity "
            "surveillance data."
        ),
        "key_takeaways": [
            "DVRs and NVRs hold video records on internal drives — treat as data-bearing.",
            "Physical drive destruction recommended default for retiring surveillance systems.",
            "Cameras, cabling, monitors, power supplies — all accepted.",
            "Common upgrade scenarios: analog to IP, on-site to cloud, standard to AI-enabled.",
            "Certificate of Destruction available on request for compliance.",
        ],
        "accepted_items": {
            "columns": ["CCTV item", "Route", "Notes"],
            "rows": [
                ["DVRs (analog CCTV recorder)", "Physical drive destruction + material recovery", "Video record data on internal drive"],
                ["NVRs (IP CCTV recorder)", "Physical drive destruction + material recovery", "Larger storage typically"],
                ["Analog CCTV cameras", "Material recovery", "Include mounting brackets"],
                ["IP CCTV cameras (bullet, dome, PTZ)", "Material recovery; recent PoE models sometimes buyback", "Include lenses"],
                ["Structured cabling (coax, Cat5/Cat6 CCTV runs)", "Copper recovery", "Batch by rough volume"],
                ["CCTV monitors (dedicated surveillance displays)", "Material recovery", "Include stand and cables"],
                ["Power supplies, PoE switches (CCTV-dedicated)", "Material recovery", "Batch with main equipment"],
                ["Video analytics servers (AI-enabled CCTV)", "Data destruction + material recovery", "Higher sensitivity"],
            ],
        },
        "how_to_steps": [
            {"name": "Message equipment list + install location",
             "text": "Rough count by type (cameras, DVR/NVR, monitors, PoE switches). Location where the system is installed (business, apartment, campus)."},
            {"name": "Flag video-record sensitivity",
             "text": "Say if the video records held anything sensitive (medical, financial, security-controlled premises). This determines whether physical shredding with Certificate is needed or software wiping is sufficient."},
            {"name": "Confirm scheduling",
             "text": "Multi-camera system removal usually needs an installer + our pickup team coordinated. Scheduling around business hours where relevant."},
            {"name": "System removal + pickup",
             "text": "For active systems being decommissioned, cabling and mounting removal typically happens first (often by your CCTV vendor); Ewaste Kochi collects the removed equipment. Sometimes both happen in one coordinated visit."},
            {"name": "Drive destruction + documentation",
             "text": "DVR/NVR drives route to physical destruction after pickup. Certificate of Destruction issued for the drive(s) after the destruction step. Cabling and cameras go to material recovery."},
        ],
        "sections": [
            {"h2": "Why DVR and NVR drives specifically need certified destruction",
             "body": (
                "A DVR or NVR in service for 1-3 years has recorded thousands of hours of video "
                "from your premises. Depending on where the cameras are installed, that video may "
                "include: customers, employees, patients, students, delivery drivers, security "
                "incidents, or restricted-access areas.\n\n"
                "When the DVR/NVR is retired, that internal drive goes with it unless someone "
                "specifically routes it through data destruction. Software wiping is technically "
                "an option but physical shredding is the safer default for surveillance data "
                "because the failure modes of software wiping (silent wipe failures, bad sectors, "
                "already-failed drives) are unacceptable when the data is video of people.\n\n"
                "For commercial premises with data-protection obligations under DPDP Act 2023 or "
                "internal policy — retail stores with customer video, offices with employee video, "
                "medical premises with patient video — physical drive shredding with per-drive "
                "Certificate of Destruction is the recommended approach."
             )},
            {"h2": "Common CCTV recycling scenarios",
             "body": (
                "Analog-to-IP upgrade — replacing old analog CCTV with modern IP-based cameras. "
                "Both the old DVR (with video records) and the old analog cameras retire together. "
                "New IP system installed separately. DVR routed through certified drive destruction.\n\n"
                "On-site-to-cloud upgrade — replacing the local DVR/NVR with cloud-based storage. "
                "Cameras often stay in place; the DVR/NVR retires. Drive destruction essential.\n\n"
                "Standard-to-AI upgrade — replacing standard CCTV with AI-enabled cameras and "
                "analytics servers. Bigger project; retiring both the old DVR/NVR and any old "
                "analytics servers.\n\n"
                "Business closure / relocation — full CCTV system decommissioning as part of an "
                "office move or shutdown. Combined with the general office clearance pickup, but "
                "the DVR/NVR handling is flagged separately for certified destruction."
             )},
            {"h2": "Scheduling CCTV system removal",
             "body": (
                "Removing an active CCTV system usually involves two parties: your CCTV vendor "
                "(who removes cameras from walls, uninstalls DVR/NVR from rack, disconnects "
                "cabling) and Ewaste Kochi (who collects the removed equipment and routes for "
                "recycling + drive destruction).\n\n"
                "Coordination options:\n\n"
                "1. Vendor removes and stages the equipment; Ewaste Kochi pickup scheduled after "
                "removal is complete.\n\n"
                "2. Coordinated single-visit — vendor removes while Ewaste Kochi team is on-site, "
                "equipment transferred directly.\n\n"
                "For sensitive premises (banks, hospitals, jewellery stores, government), option 2 "
                "with chain-of-custody documentation is preferred so drives don't sit in interim "
                "storage."
             )},
        ],
        "faqs": [
            {"q": "How do I dispose of an old CCTV DVR?",
             "a": "Message Ewaste Kochi with equipment details and location. The DVR's internal drive is routed through physical destruction (recommended default for video records) before the rest of the DVR enters material recovery. Certificate of Destruction available on request."},
            {"q": "Is data on a DVR really sensitive?",
             "a": "Depends on where the cameras are installed. A DVR from an active business, medical facility, school, or apartment complex has video of people — customers, patients, students, residents, staff. Under DPDP Act 2023, this is personal data and should be handled with certified destruction when the DVR is retired."},
            {"q": "Can you take old CCTV cameras separately from the DVR?",
             "a": "Yes. Cameras alone (no DVR) don't hold data on their own — they stream to the DVR/NVR. Pickup and material recovery is straightforward, no drive-destruction step needed."},
            {"q": "What about wireless CCTV cameras with local SD card storage?",
             "a": "Flag if the camera has an SD card. SD cards from CCTV cameras have the same video-record sensitivity as DVR drives — either remove and destroy separately or hand over with the camera for destruction."},
            {"q": "Do you handle CCTV removal from the wall / uninstallation?",
             "a": "That's usually the CCTV vendor's role. Ewaste Kochi collects the equipment after removal. Some coordinated pickups schedule the vendor's removal and our collection together (chain-of-custody control)."},
            {"q": "What certificate can I get for the DVR drive destruction?",
             "a": "Per-drive Certificate of Destruction — serialised, showing the drive serial number, destruction method (physical shredding), date, and destruction operator reference. See /data-destruction-certificate-sample/ for the format."},
            {"q": "How much notice do I need for CCTV pickup?",
             "a": "For a single DVR pickup: 1-2 working days. For a full CCTV system decommissioning (multiple cameras + DVR + cabling): 3-5 working days, coordinated with your CCTV vendor's removal schedule."},
        ],
        "related_pages": rel(
            CORE_LINKS["data"], CORE_LINKS["hdd"], CORE_LINKS["cert_sample"],
            CORE_LINKS["corporate"], CORE_LINKS["pickup"], ("/retail-e-waste-recycling/", "Retail e-waste (POS + CCTV context)"),
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle CCTV equipment — here are the details:",
    }


def spec_ups_recycling() -> dict:
    return {
        "path": "/ups-recycling/",
        "title": "UPS Recycling in Kochi | Home + Office UPS Battery Disposal",
        "description": "UPS recycling in Kochi — home and office UPS units, single and battery-bank installations. Safe battery separation, material recovery for the electronics.",
        "h1": "UPS Recycling in Kochi",
        "breadcrumb_label": "UPS Recycling",
        "service_type": "UPS unit recycling",
        "last_updated": LAST_UPDATED,
        "lede": (
            "UPS units — the battery-backed power supplies protecting computers, servers, "
            "network cabinets and home electronics from power fluctuations — retire on a "
            "steady cycle because internal batteries wear out every 3-5 years. This page "
            "covers what UPS types get accepted, why battery separation matters, and how "
            "bulk UPS retirement (server rooms, offices with battery banks) is planned."
        ),
        "direct_answer": (
            "To recycle a UPS unit in Kochi, WhatsApp Ewaste Kochi with the type (home / "
            "office small / rack-mount / battery bank), rough count and your location. "
            "Batteries are separated at pickup for lead-acid recycling; the electronics of "
            "the UPS route to material recovery. Doorstep pickup is free for eligible "
            "collections; large battery banks may need scheduled transport."
        ),
        "key_takeaways": [
            "Home UPS, office UPS, rack-mount UPS, industrial battery banks — all accepted.",
            "Internal batteries are separated at pickup for lead-acid recycling stream.",
            "Bulk battery banks (server rooms, telecom) need scheduled dedicated transport.",
            "Working recent UPS units rarely have buyback demand; usually recycling only.",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["UPS type", "Route", "Notes"],
            "rows": [
                ["Home UPS (small, 600-1500VA)", "Battery separation + material recovery", "Common: for TV, computer, router"],
                ["Office small UPS (line-interactive, 1-3 kVA)", "Battery separation + material recovery", "Under-desk or on-shelf typical"],
                ["Rack-mount UPS (1U, 2U, server-room)", "Battery separation + material recovery", "Coordinate with IT for removal"],
                ["Large tower UPS (5-10 kVA)", "Battery separation + material recovery", "Bulky — advance transport"],
                ["Industrial UPS with battery bank (10+ batteries)", "Bank-scale battery pickup + electronics recovery", "Dedicated transport"],
                ["Old inverter-UPS hybrid units", "Battery + electronics + inverter recovery", "Common in Kerala homes"],
                ["UPS batteries only (already removed)", "Lead-acid recycling stream", "Confirm quantity and battery specs"],
            ],
        },
        "how_to_steps": [
            {"name": "Message UPS type + count + location",
             "text": "Home UPS or office UPS or rack-mount or battery bank. Rough count. Address and floor/access notes if apartment or office."},
            {"name": "Flag battery condition",
             "text": "Battery leakage, swelling, or corrosion needs advance flag so the team brings appropriate containment. Photo helps."},
            {"name": "Confirm removal responsibility",
             "text": "For rack-mount and connected UPS: usually your IT handles rack removal and disconnection; Ewaste Kochi collects the removed unit. For plug-and-play home/office UPS: just unplug and hand over."},
            {"name": "Doorstep or on-site collection",
             "text": "Small UPS: routine doorstep. Rack-mount or large tower: sometimes on-site with removal support. Battery banks: dedicated transport."},
            {"name": "Downstream — battery + electronics separation",
             "text": "At the facility, batteries are separated from the UPS chassis. Lead-acid batteries route to established lead-acid recycling; the chassis electronics route to material recovery."},
        ],
        "sections": [
            {"h2": "Why battery separation matters for UPS recycling",
             "body": (
                "The UPS chassis (electronics, transformer, chassis metal) and the internal "
                "batteries (typically sealed lead-acid) route to completely different recycling "
                "streams. Lead-acid batteries have a well-established recycling infrastructure in "
                "India — lead is recovered for reuse in new batteries; acid is neutralised. UPS "
                "electronics route to standard e-waste material recovery.\n\n"
                "For safe transport, batteries are separated from the UPS chassis at pickup (or "
                "at the facility, depending on the UPS size). This is why UPS units aren't just "
                "'thrown in' with general e-waste — the separate-stream handling starts at the "
                "pickup itself."
             )},
            {"h2": "Bulk UPS retirement — server rooms and telecom",
             "body": (
                "Offices, telecom sites, apartment building generator-rooms, and small data "
                "centres retire full battery banks at once — 4, 8, 20, or more heavy lead-acid "
                "units at a time. Bulk battery pickup is a scheduling and transport problem "
                "different from single UPS pickup:\n\n"
                "Weight — a 100Ah SLA battery weighs ~30 kg. A bank of 8 is 240 kg. Bulk "
                "pickup needs proper vehicle capacity, load securing, and lifting equipment.\n\n"
                "Chain of custody — some sites have formal documentation requirements for battery "
                "disposal (particularly telecom, data centre, healthcare). Per-battery serial "
                "logging available under ITAD workflow.\n\n"
                "Scheduling — advance planning (3-5 working days minimum) so transport is lined "
                "up. Very large jobs may need multiple pickup visits."
             )},
            {"h2": "When UPS units might qualify for buyback",
             "body": (
                "Working, recent (last 2 years) UPS units in good condition may occasionally "
                "qualify for reduced buyback — the buyback market for UPS is smaller than for "
                "laptops or phones, but it exists. Enterprise-grade rack-mount UPS (APC, Eaton, "
                "Emerson) is more likely to have resale value than consumer-grade home UPS.\n\n"
                "For most UPS retirement scenarios, though, the internal battery has degraded to "
                "the point where the unit doesn't hold charge — which is why it's being retired "
                "in the first place. Free pickup + battery separation + material recovery is the "
                "typical route."
             )},
        ],
        "faqs": [
            {"q": "How do I recycle an old UPS in Kochi?",
             "a": "Message Ewaste Kochi with UPS type, count, and your location. Doorstep pickup is arranged based on area. Batteries are separated at pickup for lead-acid recycling; the electronics route to material recovery."},
            {"q": "Can I just recycle the UPS battery without the chassis?",
             "a": "Yes. UPS batteries can be recycled separately if you've already removed them from the chassis. Flag battery specs (voltage, capacity, count) in your message. Lead-acid batteries route to established recycling with lead recovery."},
            {"q": "What about battery leakage or swelling?",
             "a": "Flag it when booking and include a photo. Leaking or swollen batteries need appropriate containment for safe transport. Do not attempt to puncture, crush, or manually drain a leaking battery yourself."},
            {"q": "How does UPS pickup work for a server room?",
             "a": "Rack-mount UPS removal usually coordinated with your IT team (rack removal, disconnection). Ewaste Kochi collects the removed units. Battery banks need dedicated transport — 3-5 working days notice typical."},
            {"q": "Do you take old inverter batteries too?",
             "a": "Yes — same lead-acid recycling stream as UPS batteries. Inverter units (the electronics) recycle separately. See also /battery-recycling/ for the broader battery flow."},
            {"q": "Is there any buyback for working UPS units?",
             "a": "Rare, but possible for enterprise-grade rack-mount UPS from the last 2 years. Consumer-grade home UPS usually goes to recycling only. Most UPS retirement scenarios involve batteries that no longer hold charge — no buyback in those cases."},
            {"q": "How much notice for bulk battery bank pickup?",
             "a": "3-5 working days minimum for standard battery bank pickup (8-20 units). Larger banks (50+ batteries, telecom-scale) may need 1-2 weeks for transport and destination-facility coordination."},
        ],
        "related_pages": rel(
            CORE_LINKS["battery"], ("/battery-pickup/", "Battery pickup"),
            CORE_LINKS["itad"], CORE_LINKS["corporate"], CORE_LINKS["pickup"],
            CORE_LINKS["locations"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle UPS units — here are the details:",
    }


def spec_gaming_console_recycling() -> dict:
    return {
        "path": "/gaming-console-recycling/",
        "title": "Where to Recycle Gaming Consoles in Kochi | Buyback",
        "description": "Where to recycle old gaming consoles in Kochi — Xbox, PlayStation, Nintendo Switch, controllers and accessories. Buyback for recent working consoles, free pickup.",
        "h1": "Where to Recycle Gaming Consoles in Kochi",
        "breadcrumb_label": "Gaming Console Recycling",
        "service_type": "Gaming console recycling and buyback",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Old gaming consoles have an active second-hand market — a working PS4 or Xbox One "
            "from 5-7 years ago still finds buyers, and recent PS5/Xbox Series units retain "
            "meaningful value. This page covers what consoles qualify for buyback, how to "
            "handle the account sign-out step before pickup, and what happens to controllers "
            "and accessories."
        ),
        "direct_answer": (
            "To recycle a gaming console in Kochi, WhatsApp Ewaste Kochi with the console "
            "type (PlayStation / Xbox / Nintendo Switch / Wii / other), generation, condition "
            "and photos. Working consoles usually qualify for a condition-based buyback quote. "
            "Sign out of PlayStation Network / Xbox Live / Nintendo account before pickup. "
            "Non-working consoles route to free recycling."
        ),
        "key_takeaways": [
            "PlayStation, Xbox, Nintendo Switch, Wii, older consoles — all accepted.",
            "Working recent consoles (PS5, PS4, Xbox Series, Xbox One, Switch) usually get a buyback quote.",
            "Sign out of your gaming account (PSN, Xbox Live, Nintendo) before pickup.",
            "Controllers, cables, games, headsets — batch with the console pickup.",
            "Pickup is free for eligible collections.",
        ],
        "accepted_items": {
            "columns": ["Console / accessory", "Buyback likelihood", "Notes"],
            "rows": [
                ["PlayStation 5 (working)", "High — active resale market", "Include controller + cables"],
                ["PlayStation 4 (working)", "Medium — reduced quote", "Slim and Pro variants different"],
                ["Xbox Series X/S (working)", "High — active resale market", "Include controller"],
                ["Xbox One (working)", "Medium — reduced quote", "S, X variants different"],
                ["Nintendo Switch (working)", "High — sustained resale market", "Include Joy-Cons + dock"],
                ["Older consoles (PS3, Xbox 360, Wii, PSP)", "Low — often recycling only", "Some collector demand for specific models"],
                ["Non-working consoles (any generation)", "Recycling only", "Free pickup, no payment"],
                ["Controllers (loose or with console)", "Small buyback for recent + working", "Batch with console"],
                ["Games (physical discs / cartridges)", "Case-by-case", "Include game titles if selling"],
            ],
        },
        "how_to_steps": [
            {"name": "Get console details",
             "text": "Console type, generation (PS4 / PS4 Slim / PS4 Pro etc.), storage size if known, condition. Include a photo of the console + controller + About screen (Settings → System)."},
            {"name": "Sign out of your gaming account",
             "text": "PlayStation: Settings → Users and Accounts → Sign out. Xbox: Settings → Account → Sign-out. Nintendo Switch: Settings → User → Unlink Nintendo Account. This clears the console for the next owner."},
            {"name": "Factory reset (recommended for buyback)",
             "text": "PS: Settings → System → System Software → Reset Options → Restore Default Settings + delete user data. Xbox: Settings → System → Console info → Reset console → Reset and remove everything. Switch: Settings → System → Initialize."},
            {"name": "Batch controllers and accessories",
             "text": "Include original controllers, cables, headsets, external drives, and any physical games in the pickup. First-party accessories often add to the buyback quote."},
            {"name": "Doorstep pickup + inspection + payment",
             "text": "Team collects, inspects, and pays on the spot for accepted quotes. Payment options: cash, UPI, or bank transfer."},
        ],
        "sections": [
            {"h2": "Why signing out of your gaming account matters",
             "body": (
                "A gaming console signed into your account carries your purchase history, "
                "downloaded games (which are licensed to your account), payment methods, "
                "friend list, saved games, and — for PSN/Xbox Live — sometimes stored credit "
                "for future purchases.\n\n"
                "For buyback to work cleanly: sign out before pickup, factory reset, then hand "
                "over. The buyer receives a clean console; you don't leave any residual purchase "
                "authority or payment method risk.\n\n"
                "If you can't sign out (forgotten password, account issue, console not "
                "powering on to sign out), flag it when booking. The console routes through "
                "data destruction (internal storage wipe) instead of buyback — no buyback "
                "payment, but pickup is still free and no residual data risk to you."
             )},
            {"h2": "What consoles actually sell in the second-hand market",
             "body": (
                "Current-generation consoles (PS5, Xbox Series X/S) — active resale market. "
                "Recent working units get meaningful buyback quotes. Digital-only editions "
                "quote lower than disc editions.\n\n"
                "Last-generation consoles (PS4, Xbox One, Nintendo Switch) — still active resale "
                "market. Slim/Pro variants of PS4 and X variants of Xbox One command higher "
                "quotes than base models. Nintendo Switch has a particularly strong resale market "
                "because of the portable use case.\n\n"
                "Older consoles (PS3, Xbox 360, Wii, PSP, DS) — limited but existing resale "
                "market. Working units may qualify for small buyback; non-working usually "
                "recycling only. Some specific models have collector demand.\n\n"
                "Retro consoles (Nintendo 64, Super Nintendo, original PlayStation, Sega Genesis) — "
                "specialist collector market. Not typical buyback flow. Rare working units may "
                "have specific value — mention model and specific game/accessory bundles."
             )},
            {"h2": "Games, controllers, and accessories",
             "body": (
                "Original first-party controllers usually add small buyback value. Third-party "
                "controllers rarely do. Batch either way — all accepted.\n\n"
                "Physical games (disc for PS/Xbox, cartridge for Switch, older cartridge for "
                "retro consoles) can sometimes have their own resale value, especially for "
                "specific titles. Mention which games you're including if you're selling the "
                "console.\n\n"
                "First-party headsets, VR headsets (PSVR, PSVR2, Meta Quest with console pairing), "
                "and external drives paired with the console usually have some value. Batch with "
                "the console pickup.\n\n"
                "Chargers, cables, controller batteries, and generic accessories usually don't "
                "add buyback value but are still accepted for recycling."
             )},
        ],
        "faqs": [
            {"q": "How much can I get for an old PlayStation 4?",
             "a": "Depends on model (base / Slim / Pro), storage size, condition, and included accessories. Working PS4 units typically qualify for a reduced-but-meaningful buyback quote. Send About screen photo + condition + accessories info for a specific estimate."},
            {"q": "Do you buy old Xbox One consoles?",
             "a": "Yes. Working Xbox One S and X models have resale demand; base Xbox One quotes lower. Include controllers and any external drives paired with the console."},
            {"q": "What about my Nintendo Switch?",
             "a": "Nintendo Switch has particularly strong resale demand. Working Switch (regular, OLED, Lite) all qualify for meaningful buyback quotes. Include Joy-Cons and dock. Mention if it's a special edition (Zelda, Pokemon, etc.) — those retain extra value."},
            {"q": "Do you take really old consoles like PS2 or Xbox 360?",
             "a": "Yes for pickup. Working PS3 / Xbox 360 / Wii may qualify for small buyback. PS2 / original Xbox / older usually recycling only, though some specific models have collector demand — worth mentioning the specific model."},
            {"q": "Should I keep my games and account?",
             "a": "Digital games are tied to your account — if you sign out and reset, the new owner can't play your digital library (they'd need to buy them again on their own account). Physical games are separately tradeable. For account: back up saves to cloud (PSN/Xbox), then sign out and reset."},
            {"q": "What about VR headsets?",
             "a": "PSVR and PSVR2 (paired with PlayStation): accepted, often bundled with the console for buyback. Meta Quest (standalone): factory reset first (removes Facebook/Meta account), then pickup. Recent working headsets qualify for buyback."},
            {"q": "Can I recycle the games I have but not the console?",
             "a": "Physical game discs/cartridges: yes, though resale value is very title-specific. Mention which games you have. Damaged discs recycle as plastic."},
        ],
        "related_pages": rel(
            CORE_LINKS["sell"], CORE_LINKS["marketplace"], CORE_LINKS["recycling"],
            CORE_LINKS["data"], CORE_LINKS["pickup"], CORE_LINKS["decision"],
        ),
        "route": _std_route(),
        "whatsapp_message": "Hi, I'd like to recycle a gaming console — here are the details:",
    }


# Extend ALL_SPECS with Batch 3.
ALL_SPECS.extend([
    ("monitor-recycling",         spec_monitor_recycling),
    ("tablet-recycling",          spec_tablet_recycling),
    ("cctv-recycling",            spec_cctv_recycling),
    ("ups-recycling",             spec_ups_recycling),
    ("gaming-console-recycling",  spec_gaming_console_recycling),
])


def run_one(spec_dict: dict, extra_args: list[str]) -> tuple[int, str, str]:
    """
    Feed the spec through generate-pillar-page.py via a JSON temp file.
    Returns (exit_code, stdout, stderr).
    """
    import tempfile
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".json", delete=False, encoding="utf-8"
    ) as f:
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


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch driver over generate-pillar-page.py.")
    parser.add_argument("--dry-run", action="store_true", help="Render all to stdout without writing.")
    parser.add_argument("--validate-only", action="store_true", help="Validate every spec, do not render.")
    parser.add_argument("--live", action="store_true", help="Write to src/pages/ instead of quarantine.")
    parser.add_argument("--force", action="store_true", help="Overwrite existing files.")
    parser.add_argument("--register-routes", action="store_true", help="Register each route in routes.ts (requires --live).")
    parser.add_argument("--only", help="Only run the spec whose slug matches (comma-separated for multiple).")
    args = parser.parse_args()

    if args.register_routes and not args.live:
        print("✗ --register-routes requires --live", file=sys.stderr)
        return 1

    extra_args: list[str] = []
    if args.dry_run:
        extra_args.append("--dry-run")
    if args.validate_only:
        extra_args.append("--validate-only")
    if args.live:
        extra_args.append("--live")
    if args.force:
        extra_args.append("--force")
    if args.register_routes:
        extra_args.append("--register-route")

    only_set = set(s.strip() for s in args.only.split(",")) if args.only else None

    print(f"{'='*76}")
    print(f"batch: {len(ALL_SPECS)} specs; extra args: {extra_args or 'none'}")
    print(f"{'='*76}")

    passed = []
    failed = []
    for slug, spec_fn in ALL_SPECS:
        if only_set is not None and slug not in only_set:
            continue
        print(f"\n--- {slug} ---")
        spec = spec_fn()
        rc, stdout, stderr = run_one(spec, extra_args)
        if rc == 0:
            passed.append(slug)
            # Only print the tail of stdout (avoid dumping 5K lines of dry-run to console)
            if stdout and not args.dry_run:
                for line in stdout.strip().splitlines()[-6:]:
                    print(f"  {line}")
        else:
            failed.append((slug, rc, stderr.strip() or stdout.strip()))
            print(f"  ✗ exit {rc}")
            for line in (stderr or stdout).strip().splitlines()[-15:]:
                print(f"    {line}")

    print(f"\n{'='*76}")
    print(f"batch summary: {len(passed)} passed, {len(failed)} failed")
    if failed:
        print("  failed:")
        for slug, rc, msg in failed:
            print(f"    - {slug} (exit {rc}): {msg[:200]}")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
