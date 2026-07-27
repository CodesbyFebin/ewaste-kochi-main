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

ALL_SPECS = [
    ("appliance-recycling",       spec_appliance_recycling),
    ("printer-recycling",         spec_printer_recycling),
    ("home-e-waste-pickup",       spec_home_e_waste_pickup),
    ("bulk-e-waste-pickup",       spec_bulk_e_waste_pickup),
    ("battery-pickup",            spec_battery_pickup),
    ("laptop-scrap-price",        spec_laptop_scrap_price),
    ("phone-buyback",             spec_phone_buyback),
    ("it-asset-disposal",         spec_it_asset_disposal),
    ("school-e-waste-recycling",  spec_school_e_waste_recycling),
    ("hospital-e-waste-recycling", spec_hospital_e_waste_recycling),
]


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
