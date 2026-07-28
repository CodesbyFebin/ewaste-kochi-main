#!/usr/bin/env python3
"""
generate-batch-blogs.py
========================

Batch driver over scripts/generate-pillar-page.py, tuned for blog posts
rather than pillar service pages.

Every spec has route.type="blog" and route.sitemap_group="blog", writing to
/blog/<slug>/ paths. Same anti-fabrication discipline, same JSON-LD stack,
same quarantine-by-default safety pattern. Uses the same underlying generator
so the schema, validation, forbidden-phrase scan, and Astro template are
identical.

20 blog specs in this batch — all from the GSC-demand list documented in
PROJECT_TRACKER.md and the pSEO recovery xlsx:

Consumer / how-to
  1.  Where to recycle old electronics in Kochi
  2.  Where to recycle batteries in Kochi
  3.  How electronics pickup works
  4.  What electronics are accepted for recycling
  5.  How to prepare devices before pickup

Valuation
  6.  How laptop scrap value is calculated
  7.  How mobile phone buyback value is calculated

Compliance / regulations
  8.  E-waste rules in Kerala

Safety
  9.  Safe battery storage before pickup

Business
  10. Office e-waste disposal checklist
  11. Data deletion before recycling computers
  12. Bulk e-waste collection for offices

Seasonal / regional
  13. Recycling electronics during Kerala monsoon

Location + device combinations (proven demand)
  14. Laptop recycling in Kakkanad
  15. Electronics recycling in Vyttila
  16. Office pickup in Infopark
  17. Computer recycling in Ernakulam
  18. Battery recycling in Thrippunithura
  19. Electronics recycling in Palarivattom

Explainer
  20. Difference between reuse, resale and recycling

Usage: same as generate-batch-pillars.py.
    python3 scripts/generate-batch-blogs.py --validate-only
    python3 scripts/generate-batch-blogs.py             # quarantine
    python3 scripts/generate-batch-blogs.py --live --register-routes --force
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
    "home":            ("/",                            "Home — Ewaste Kochi"),
    "recycling":       ("/recycling/",                  "General e-waste recycling"),
    "battery":         ("/battery-recycling/",          "Battery recycling"),
    "pickup":          ("/pickup/",                     "Pickup — how doorstep collection works"),
    "sell":            ("/sell-electronics/",           "Sell electronics"),
    "marketplace":     ("/marketplace/",                "Marketplace (refurbished electronics)"),
    "data":            ("/data-destruction/",           "Data destruction"),
    "hdd":             ("/hard-drive-shredding/",       "Hard drive shredding"),
    "itad":            ("/itad/",                       "ITAD for offices"),
    "laptop":          ("/laptop-recycling/",           "Laptop recycling"),
    "computer":        ("/computer-recycling/",         "Computer recycling"),
    "mobile":          ("/mobile-phone-recycling/",     "Mobile phone recycling"),
    "corporate":       ("/corporate-e-waste-recycling/", "Corporate e-waste recycling"),
    "office_pickup":   ("/office-e-waste-pickup/",      "Office e-waste pickup"),
    "near_me":         ("/services/electronics-recycling-near-me/", "Electronics recycling near me"),
    "scrap":           ("/e-waste-scrap-prices-kochi/", "Scrap prices"),
    "rules":           ("/e-waste-rules-2022-india/",   "E-waste rules 2022 (India)"),
    "tv":              ("/tv-recycling-kochi/",         "TV recycling"),
    "server":          ("/server-recycling-kochi/",     "Server recycling"),
    "kakkanad":        ("/locations/kakkanad/",         "Kakkanad"),
    "vyttila":         ("/locations/",                  "Locations"),
    "locations":       ("/locations/",                  "Locations served"),
    "aluva":           ("/locations/aluva/",            "Aluva"),
    "edappally":       ("/locations/edappally/",        "Edappally"),
    "kadavanthra":     ("/locations/kadavanthra/",      "Kadavanthra"),
    "kalamassery":     ("/locations/kalamassery/",      "Kalamassery"),
    "infopark":        ("/locations/infopark-kochi/",   "Infopark Kochi"),
    "about":           ("/about/",                      "About Ewaste Kochi"),
    "trust":           ("/trust/",                      "Trust and compliance"),
    "faq":             ("/faq/",                        "FAQ"),
    "blog":            ("/blog/",                       "Blog"),
    "contact":         ("/contact/",                    "Contact"),
    "calc":            ("/tools/scrap-value-calculator/", "Scrap value calculator"),
    "decision":        ("/tools/sell-or-recycle-decision-tool/", "Sell-or-recycle decision tool"),
    "eligibility":     ("/tools/pickup-eligibility-checker/", "Pickup eligibility checker"),
    "batt_safety":     ("/tools/battery-safety-checker/", "Battery safety checker"),
}

def rel(*items) -> list[dict[str, str]]:
    return [{"path": p, "label": l} for p, l in items]

def _blog_route(pri: float = 0.7) -> dict:
    return {"changefreq": "monthly", "priority": pri,
            "type": "blog", "sitemap_group": "blog", "lang": "en-IN"}


# ---------------------------------------------------------------------------
# 20 blog specs
# ---------------------------------------------------------------------------

def spec_where_to_recycle_old_electronics_kochi() -> dict:
    return {
        "path": "/blog/where-to-recycle-old-electronics-in-kochi/",
        "title": "Where to Recycle Old Electronics in Kochi (Practical Guide)",
        "description": "Where to actually recycle old electronics in Kochi — what qualifies, how doorstep pickup works, what you can and can't expect from a free collection service.",
        "h1": "Where to Recycle Old Electronics in Kochi — A Practical Guide",
        "breadcrumb_label": "Where to Recycle Old Electronics in Kochi",
        "service_type": "Consumer e-waste recycling guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "This is the question that starts most e-waste enquiries in Kochi: I have an old "
            "laptop / phone / TV / bunch of chargers — where do I actually take them? This "
            "guide walks through the practical options for Kochi residents and small offices, "
            "what makes a recycler worth using (versus a random scrap dealer), and how to book "
            "a pickup when you decide."
        ),
        "direct_answer": (
            "The practical answer for Kochi: use an authorised e-waste recycler that will "
            "collect from your door, handle any batteries or data-bearing devices separately, "
            "and give you at least a pickup acknowledgement. Ewaste Kochi is one option — "
            "WhatsApp with your items and address, get a slot confirmation, and the team "
            "collects. Free pickup for eligible collections."
        ),
        "key_takeaways": [
            "Use an authorised recycler, not a general scrap dealer, for anything with data or batteries.",
            "Doorstep pickup is standard — you should not need to transport heavy items yourself.",
            "Ask about data destruction if the pickup includes computers or phones with data on them.",
            "Free pickup is normal for eligible household and small-office collections.",
            "Batteries and data-bearing devices route through separate handling in the same pickup.",
        ],
        "accepted_items": {
            "columns": ["What you want to recycle", "How it fits the pickup", "Notes"],
            "rows": [
                ["Old laptop or desktop", "Included in routine pickup + data destruction option", "Send model + condition"],
                ["Old phone (any brand)", "Buyback check or recycling; data destruction available", "Factory reset before pickup if you can"],
                ["Chargers, cables, small electronics", "Batch in one pickup", "Common household drawer clear-out"],
                ["Batteries (UPS, inverter, laptop, phone)", "Separate handling stream in same pickup", "Flag if damaged/swollen"],
                ["Old TV, monitor, printer", "Bulky item — advance access planning", "Note if CRT (heavier)"],
                ["Broken or dead devices", "Recycling only — no payment", "Free pickup still applies"],
            ],
        },
        "how_to_steps": [
            {"name": "Take stock of what you have",
             "text": "A quick mental list — laptop, two phones, three chargers, an old inverter battery, whatever. Rough count is enough."},
            {"name": "Get photos of anything bulky, damaged, or unusual",
             "text": "For routine small items, no photos needed. For big items, damaged screens, swollen batteries, or 'not sure if you'll take it' items — send a photo."},
            {"name": "Message the recycler",
             "text": "WhatsApp Ewaste Kochi with the item list, your address (with floor if apartment), and photos if you have them."},
            {"name": "Confirm a slot",
             "text": "Team responds with slot options based on your area and current route schedule. Agree the day and time window."},
            {"name": "Have items ready + hand them over at pickup",
             "text": "Group items in one accessible location. Someone should be at home to hand them over — pickup acknowledgement is signed on the spot."},
        ],
        "sections": [
            {"h2": "What 'recycling' actually means for electronics",
             "body": (
                "Recycling for electronics is different from paper or plastic recycling. What "
                "happens after pickup:\n\n"
                "Working items with resale demand may go to inspection and refurbishment — they "
                "get a second life in the second-hand market rather than being broken down.\n\n"
                "Non-working or old items go to material recovery — the device is dismantled, "
                "metals (steel, aluminium, copper) and plastics are separated by type, "
                "electronics-specific materials (small amounts of precious metals from circuit "
                "boards, glass from CRT tubes) route to specialised recovery streams.\n\n"
                "Data-bearing devices (any computer or phone) route through data destruction "
                "before either flow — the storage is wiped or physically shredded so residual "
                "data doesn't leave with the device.\n\n"
                "Batteries route through chemistry-specific recycling — lead-acid batteries "
                "have well-established recycling; lithium-ion batteries route through "
                "specialised recovery.\n\n"
                "None of this involves landfill or general waste dumping. That is the whole "
                "point of using an authorised recycler."
             )},
            {"h2": "Why not just use a random scrap dealer?",
             "body": (
                "Roadside scrap dealers exist in Kochi and buy old electronics for cash. They "
                "serve a real market — quick sale of a working laptop, immediate cash. But "
                "they're not a great answer for:\n\n"
                "Anything with data — a phone, laptop, computer, or copier that had personal or "
                "business data on it. Scrap dealers don't do certified data destruction; you "
                "have no assurance the drive won't be resold intact.\n\n"
                "Batteries — swollen or leaking batteries need specific handling. Scrap dealers "
                "typically don't have the containment for damaged batteries.\n\n"
                "Compliance / documentation — if you need a pickup acknowledgement or "
                "Certificate of Destruction for insurance, business audit, or personal record "
                "keeping, scrap dealers don't provide those.\n\n"
                "For simple 'sell my working laptop for cash' cases, scrap dealer and Ewaste "
                "Kochi buyback flow both work. For anything else, authorised recycler is the "
                "safer default."
             )},
            {"h2": "How to check if a recycler is actually authorised",
             "body": (
                "Authorised e-waste recyclers in India operate under the E-Waste (Management) "
                "Rules 2022 and typically hold state pollution control board authorisations. "
                "For Kerala specifically, KSPCB authorisation is the relevant credential.\n\n"
                "Practical ways to check:\n\n"
                "Ask directly — an authorised recycler should be able to state their state "
                "pollution control board authorisation on request.\n\n"
                "Check for a physical business address and documented business identity, not "
                "just a phone number.\n\n"
                "Look for documentation options (pickup acknowledgement, Certificate of "
                "Destruction, GST invoice) — authorised recyclers offer these; unauthorised "
                "operators typically don't.\n\n"
                "For business collections in particular, ask for KSPCB reference before "
                "committing to a bulk pickup."
             )},
        ],
        "faqs": [
            {"q": "How do I find e-waste recycling near me in Kochi?",
             "a": "Message Ewaste Kochi via WhatsApp with your address and item list — the team confirms whether doorstep pickup fits your area's route schedule. Most of Kochi and the Ernakulam district have doorstep pickup coverage."},
            {"q": "Is e-waste pickup really free?",
             "a": "For eligible household and small-office collections, yes — free doorstep pickup is standard. Some scenarios (very remote locations, urgent same-day, oversized single items) may have a small transport quote confirmed before the job. Never after."},
            {"q": "What about really old electronics — a decade or more?",
             "a": "Still accepted. Old electronics usually don't have resale value, but material recovery still works — the metals, plastics, and electronics-specific materials are properly separated and processed. Free pickup remains for eligible collections."},
            {"q": "Do I need to sort my items into categories before pickup?",
             "a": "No. A mixed batch is fine — that's actually typical. What helps: flagging any batteries (separate handling) and any data-bearing devices (data destruction option) so the team plans the visit accordingly."},
            {"q": "What if I only have one small item?",
             "a": "Still possible — single-item pickups usually combine with a nearby scheduled route rather than a dedicated visit. Timing depends on when a route is passing your area."},
            {"q": "Can I recycle just chargers and cables?",
             "a": "Yes. Cables and chargers contain recoverable copper and plastic. Batch a drawer full of old chargers with any other e-waste in one pickup, or send them alone if you have a larger batch."},
        ],
        "related_pages": rel(
            CORE["recycling"], CORE["pickup"], CORE["battery"],
            CORE["laptop"], CORE["mobile"], CORE["locations"],
        ),
        "route": _blog_route(0.8),
        "whatsapp_message": "Hi, I have some old electronics to recycle — here are the details:",
    }


def spec_where_to_recycle_batteries_kochi() -> dict:
    return {
        "path": "/blog/where-to-recycle-batteries-in-kochi/",
        "title": "Where to Recycle Batteries in Kochi (UPS, Laptop, Inverter, Lithium)",
        "description": "Where to recycle batteries in Kochi — UPS, laptop, phone, inverter, lithium and lead-acid. Safe pickup for damaged and swollen batteries.",
        "h1": "Where to Recycle Batteries in Kochi",
        "breadcrumb_label": "Where to Recycle Batteries",
        "service_type": "Battery recycling guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Batteries are the trickiest category of e-waste. They can be dangerous to move "
            "if damaged, they need chemistry-specific recycling streams, and they should never "
            "be dropped into general waste. This guide covers where to actually recycle "
            "different battery types in Kochi and what to do if a battery has started swelling "
            "or leaking."
        ),
        "direct_answer": (
            "For battery recycling in Kochi, book a pickup with an authorised recycler — "
            "WhatsApp Ewaste Kochi with the battery type (UPS, inverter, laptop, phone, "
            "lithium), quantity, condition and your location. Swollen or damaged batteries "
            "need a photo and advance flag so the team brings appropriate containment. "
            "Battery-only pickup is a valid booking; it does not need to be bundled with "
            "other e-waste."
        ),
        "key_takeaways": [
            "Book battery pickup with an authorised recycler, not general scrap collection.",
            "Battery type matters — lead-acid vs lithium-ion route to different recycling streams.",
            "Swollen or damaged batteries need advance flag + photo before pickup.",
            "Store batteries in a cool, dry place away from other metals until pickup.",
            "Battery-only pickup is a valid booking — no need to bundle with other e-waste.",
        ],
        "accepted_items": {
            "columns": ["Battery type", "Recycling stream", "Notes"],
            "rows": [
                ["Laptop batteries", "Lithium-ion recycling", "Flag swelling"],
                ["Phone batteries", "Lithium-ion recycling", "Flag swelling"],
                ["UPS batteries (sealed lead-acid)", "Lead-acid recycling", "Heavy — access planning"],
                ["Inverter batteries (lead-acid)", "Lead-acid recycling", "May be a battery bank"],
                ["Lithium power banks", "Lithium-ion recycling", "Include cable if present"],
                ["Car / bike batteries", "Lead-acid recycling", "Confirm current-charge state"],
                ["Button cells, watch batteries", "Small-cell recycling", "Batch multiples in one pickup"],
                ["Swollen / leaking batteries (any type)", "Contained transport + specialised handling", "Photo required at booking"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify battery type and quantity",
             "text": "Laptop battery / phone battery / UPS battery / inverter battery / lithium power bank / lead-acid car battery / etc. Approximate count."},
            {"name": "Check condition — flag any damage",
             "text": "Working, worn (holds no charge), swollen, leaking, physically damaged, or hot to touch. Damage needs a photo and advance flag."},
            {"name": "Store safely until pickup",
             "text": "Cool, dry place. Away from direct sunlight and other metal objects (short-circuit risk). For damaged batteries, keep on a non-flammable surface (tile, ceramic) away from anything flammable."},
            {"name": "Message the recycler",
             "text": "WhatsApp Ewaste Kochi with battery details, condition, location. Include any photos of damage."},
            {"name": "Doorstep pickup with appropriate containment",
             "text": "Team arrives with containment matching the battery types flagged. Batteries route to chemistry-specific recycling streams."},
        ],
        "sections": [
            {"h2": "What to do with a swollen laptop or phone battery",
             "body": (
                "A swollen lithium battery — visible as the phone case popping outward, laptop "
                "keyboard rising up, or battery pack physically bulging — is a real fire and "
                "burn risk if punctured, crushed, or shorted. Safe sequence:\n\n"
                "Leave the battery inside the device. Do not try to remove a swollen laptop or "
                "phone battery yourself.\n\n"
                "Place the device on a non-flammable surface — ceramic tile, glass, concrete. "
                "Not on paper, carpet, wood, plastic.\n\n"
                "Keep away from direct sunlight, heat sources, and enclosed metal containers "
                "(which could short the battery across the case).\n\n"
                "Take a photo showing the swelling.\n\n"
                "Message the team with the photo and 'swollen battery' flag. They bring "
                "appropriate containment (thermally-stable containers) for damaged battery "
                "pickup.\n\n"
                "Do not: puncture, crush, bend, take apart, submerge in water, or throw into "
                "regular trash. Do not put a swollen battery into your car's boot without proper "
                "containment."
             )},
            {"h2": "Why different battery types route to different recycling streams",
             "body": (
                "Battery chemistry determines the recycling infrastructure. In India:\n\n"
                "Lead-acid batteries (UPS, inverter, car, two-wheeler) have well-established "
                "recycling. Lead is recovered for reuse in new batteries; acid is neutralised. "
                "This is a mature industry with regulated recyclers.\n\n"
                "Lithium-ion batteries (laptop, phone, power bank, e-vehicle) route through a "
                "more recent recycling infrastructure. Cobalt, nickel, lithium and copper are "
                "recovered depending on cell chemistry. Growing capacity in India.\n\n"
                "Alkaline and button cells (remote batteries, watch batteries, hearing aid "
                "batteries) route through specialised small-cell recycling for the mercury and "
                "heavy metals some contain.\n\n"
                "None of this happens by dropping mixed batteries into general recycling — the "
                "chemistry-specific streams need chemistry-specific input. Battery pickup routes "
                "each type to the correct stream."
             )},
            {"h2": "Storing batteries before pickup",
             "body": (
                "For batteries in working or worn condition (no damage), storage is easy:\n\n"
                "Cool, dry place — normal cupboard or shelf is fine. Not in direct sunlight, not "
                "in a hot balcony or window sill.\n\n"
                "Away from other metals — a drawer full of old batteries plus a metal spoon or "
                "coin can create a short circuit across a battery's terminals. Keep batteries "
                "separated from loose metal objects.\n\n"
                "Don't stack heavy items on top — pressure can damage cells over time.\n\n"
                "For batteries showing any damage — swelling, leakage, corrosion, unusual "
                "heat — the storage rules tighten: non-flammable surface, extra space around the "
                "battery, no combustible materials nearby, and get the pickup booked quickly "
                "rather than storing for weeks."
             )},
        ],
        "faqs": [
            {"q": "Can I put old batteries in general household waste?",
             "a": "No. Batteries need chemistry-specific recycling and can be dangerous in general waste (fire risk from lithium, environmental risk from lead-acid). Book a battery pickup with an authorised recycler — free for eligible collections."},
            {"q": "How do I recycle a laptop battery that won't hold charge anymore?",
             "a": "Message Ewaste Kochi with the battery type (loose or still in laptop), any signs of damage, and your location. Pickup routes the battery to lithium-ion recycling. Free for eligible collections."},
            {"q": "What if my UPS battery is leaking acid?",
             "a": "Flag it when booking and include a photo. The team brings appropriate containment for damaged lead-acid batteries. Do not attempt to move or neutralise the leak yourself. Keep the battery on a non-porous surface (tile, concrete) away from other items until pickup."},
            {"q": "Is battery-only pickup a valid booking?",
             "a": "Yes. You don't need to bundle batteries with other e-waste — a battery-only pickup is a normal booking. Small pickups may combine with a nearby scheduled route."},
            {"q": "Do you take car batteries?",
             "a": "Yes. Lead-acid car and two-wheeler batteries route to standard lead-acid recycling. Confirm the current-charge state (fully-discharged batteries may need specific load-transport handling)."},
            {"q": "Can I take batteries to a drop-off point instead?",
             "a": "Ewaste Kochi is primarily a pickup service, not a drop-off. Some larger facilities may accept walk-in drop-off by prior arrangement — worth asking if you're near a location convenient for you."},
        ],
        "related_pages": rel(
            CORE["battery"], ("/battery-pickup/", "Battery pickup"),
            CORE["batt_safety"], CORE["pickup"], CORE["locations"],
        ),
        "route": _blog_route(0.8),
        "whatsapp_message": "Hi, I'd like to recycle some batteries — here are the details:",
    }


def spec_how_electronics_pickup_works() -> dict:
    return {
        "path": "/blog/how-electronics-pickup-works/",
        "title": "How Electronics Pickup Works in Kochi (Step-by-Step)",
        "description": "How electronics pickup actually works in Kochi — from the WhatsApp message to doorstep collection and downstream recycling. What to expect at each step.",
        "h1": "How Electronics Pickup Works in Kochi",
        "breadcrumb_label": "How Pickup Works",
        "service_type": "Pickup process explainer",
        "last_updated": LAST_UPDATED,
        "lede": (
            "If you've never used a doorstep e-waste pickup service, the process can seem "
            "opaque — how do you book, what happens on the day, do you get paperwork, is "
            "there really no charge? This blog walks through the whole flow so there are no "
            "surprises when you actually try it."
        ),
        "direct_answer": (
            "Electronics pickup in Kochi works in five practical steps: message the recycler "
            "with your item list and address, get a slot confirmation, prepare items, "
            "doorstep collection at the confirmed slot, and pickup acknowledgement signed on "
            "the spot. Data destruction and payment (for buyback items) happen at pickup or "
            "shortly after. Total elapsed time from first message to items collected: "
            "typically 1-3 working days."
        ),
        "key_takeaways": [
            "Five steps: message → slot confirmation → prepare → doorstep collection → paperwork.",
            "First message via WhatsApp is easiest — include items, address, photos.",
            "Slot timing depends on your area and route schedule.",
            "Pickup acknowledgement is standard; Certificate of Destruction and GST invoice on request.",
            "Total elapsed time from first message to items collected: 1-3 working days typically.",
        ],
        "accepted_items": {
            "columns": ["What happens", "You do", "The team does"],
            "rows": [
                ["Initial contact", "WhatsApp item list + address", "Reviews feasibility, proposes slot"],
                ["Slot confirmation", "Agree slot", "Books the pickup"],
                ["Prepare items", "Group items, factory-reset devices you can", "Prepares appropriate transport"],
                ["Doorstep collection", "Hand over items, verify list", "Collects, weighs/counts, signs paperwork"],
                ["Follow-up", "Nothing (unless data destruction was booked)", "Issues Certificate + invoice if requested"],
            ],
        },
        "how_to_steps": [
            {"name": "Message with items + address + photos",
             "text": "One WhatsApp message: what you have, your area (including floor if apartment), and photos for anything bulky or damaged. Complete details upfront speeds slot confirmation."},
            {"name": "Get slot confirmation",
             "text": "Team responds with a proposed slot based on your area's route schedule. Small single items may combine with nearby pickup routes; larger batches usually get dedicated slots."},
            {"name": "Prepare items on the pickup day",
             "text": "Group items in one accessible location. Factory-reset any phones or laptops you can. Keep any swollen batteries separately on a non-flammable surface."},
            {"name": "Hand over at doorstep collection",
             "text": "Team arrives within the confirmed window. Item list is verified against what was messaged. Pickup acknowledgement is signed on the spot. Payment on the spot for any accepted buyback items."},
            {"name": "Post-pickup documentation (if requested)",
             "text": "GST invoice, Certificate of Destruction for data-bearing devices, environmental disposal record — all issued after collection is complete. Typically within a few working days."},
        ],
        "sections": [
            {"h2": "Why WhatsApp works better than a form or a phone call",
             "body": (
                "Most e-waste pickup requests in Kochi start via WhatsApp because it lets you "
                "attach photos, share your location as a pin, and have an asynchronous "
                "conversation without playing phone tag. Practical advantages:\n\n"
                "Photos capture damage, model info, or unusual items much more accurately than "
                "verbal description over the phone.\n\n"
                "Location pin removes address ambiguity — 'behind the Reliance building near "
                "Kaloor junction' is clearer as a pin than as text.\n\n"
                "Asynchronous back-and-forth — you can message in the evening, get a response the "
                "next morning, agree a slot for the day after. No need to sit on hold or call "
                "back during business hours.\n\n"
                "Voice call is still available for anyone who prefers it, but WhatsApp is the "
                "default entry point for a reason."
             )},
            {"h2": "What happens between pickup and downstream recycling",
             "body": (
                "After the pickup team collects your items, they route to a sorting and "
                "processing facility. Rough flow:\n\n"
                "Sort by category — laptops, phones, appliances, batteries, cables, mixed "
                "electronics. Different categories route to different downstream processes.\n\n"
                "Data destruction for anything that needs it — drives wiped or physically "
                "destroyed, Certificates issued.\n\n"
                "Resale check for working items with buyback demand — inspection and grading, "
                "then routing to refurbishment or resale.\n\n"
                "Material recovery for everything else — dismantling, separation of metals "
                "(steel, aluminium, copper), plastics by type, and electronics-specific "
                "materials (small amounts of precious metals from circuit boards).\n\n"
                "None of this happens overnight — the downstream processing takes days to "
                "weeks. But from your perspective, the pickup itself is the visible event; "
                "everything downstream is completed as part of the service."
             )},
            {"h2": "What to do if the pickup slot doesn't work out",
             "body": (
                "Sometimes slots need to change — you have to travel unexpectedly, the team's "
                "route runs behind, an item you thought you had turns out to be missing. "
                "Rescheduling is normal:\n\n"
                "Message as early as you can if you need to move the slot. 24+ hours notice is "
                "easy to accommodate; same-day changes are reviewable but harder.\n\n"
                "If the team is running late on their side, they message ahead — you don't "
                "need to guess whether they're coming.\n\n"
                "If items change materially between booking and pickup (you found 10 more phones "
                "you forgot, or half the batch is no longer being retired), flag it before "
                "the team arrives so transport can be verified."
             )},
        ],
        "faqs": [
            {"q": "How long does the whole pickup process take?",
             "a": "From first WhatsApp message to items collected: typically 1-3 working days for small pickups, 3-5 days for larger batches, 1-2 weeks for corporate scheduled pickup with per-serial documentation. The actual doorstep visit takes 15-30 minutes for small pickups, longer for bulk jobs."},
            {"q": "Do I need to be at home during the pickup?",
             "a": "Yes, or someone authorised on your behalf, so items can be verified against what was quoted and the pickup acknowledgement can be signed. For business pickups, an IT lead or facility manager typically."},
            {"q": "What if I forget to prepare items before the team arrives?",
             "a": "Not a problem for small pickups — the team can wait a few minutes while you gather items. For bulk pickups (10+ items), preparing in advance saves time on the day."},
            {"q": "What happens if items are heavier or more damaged than the photos showed?",
             "a": "For non-buyback items: still accepted. For buyback items: the confirmed quote may be revised at inspection; you can decline without obligation if the revision is more than you want to accept."},
            {"q": "Do I get any paperwork at pickup?",
             "a": "Yes — pickup acknowledgement is signed on the spot showing categories and rough counts collected. Additional documentation (GST invoice, Certificate of Destruction, per-device asset log) issues after collection is complete."},
            {"q": "How do I know the items really get recycled?",
             "a": "Reasonable question — you can't watch the downstream processing. Practical proxies: use an authorised recycler with a physical business identity and documented state pollution control board authorisation; request documentation options that create a paper trail; check the recycler's stated processes match what you actually see at pickup."},
        ],
        "related_pages": rel(
            CORE["pickup"], CORE["recycling"], CORE["eligibility"],
            CORE["data"], CORE["faq"], CORE["locations"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like to book an e-waste pickup — here are the details:",
    }


def spec_what_electronics_accepted() -> dict:
    return {
        "path": "/blog/what-electronics-are-accepted-for-recycling/",
        "title": "What Electronics Are Accepted for Recycling in Kochi",
        "description": "What electronics are accepted for recycling in Kochi — full category list from phones to large appliances, and the few things outside standard e-waste flows.",
        "h1": "What Electronics Are Accepted for Recycling in Kochi",
        "breadcrumb_label": "What Electronics Are Accepted",
        "service_type": "Accepted-items guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "'Will you take X?' is the second-most-common e-waste question after 'where do I "
            "recycle?'. This blog gives the plain answer: what's accepted, what needs special "
            "handling, and the small number of items that don't fit standard e-waste "
            "recycling flows at all. Almost every electronic or battery-powered item you can "
            "think of is accepted — from phones and chargers to servers and appliances — but "
            "a few categories (medical devices with regulated data, radioactive materials, "
            "specialised industrial chemistry) need routing through channels other than a "
            "general e-waste recycler. Read on for the full accepted list, the borderline "
            "cases worth asking about first, and the very short 'not accepted' list."
        ),
        "direct_answer": (
            "Almost every electronic or battery-powered item is accepted for recycling in "
            "Kochi through an authorised recycler like Ewaste Kochi. Small electronics, "
            "computers, phones, appliances, batteries, cables, printers, TVs, networking "
            "equipment, gaming consoles — all in scope. A small number of items (medical "
            "devices, hazardous chemistry batteries, industrial equipment) may need "
            "specialised handling — worth checking before booking."
        ),
        "key_takeaways": [
            "Working, non-working, damaged, cracked — condition doesn't determine acceptance.",
            "Almost every electronic item is accepted; a few need specialised routing.",
            "Batteries and data-bearing devices are handled separately within a general pickup.",
            "For borderline items (medical, industrial), send a photo before booking.",
            "Pickup is free for eligible collections regardless of item value.",
        ],
        "accepted_items": {
            "columns": ["Category", "Accepted?", "Notes"],
            "rows": [
                ["Small electronics (phones, chargers, cables, accessories)", "Yes", "Batch in one pickup"],
                ["Computers (laptops, desktops, workstations, servers)", "Yes", "Data destruction available"],
                ["Home appliances (washing machines, fridges, ACs, microwaves)", "Yes", "Refrigerant handling planned"],
                ["Batteries (all types — UPS, inverter, laptop, phone, lithium)", "Yes", "Separate handling stream"],
                ["Display equipment (TVs, monitors — LCD, LED, CRT)", "Yes", "CRT needs advance transport"],
                ["Printers, scanners, copiers, multifunction devices", "Yes", "MFPs treated as data-bearing"],
                ["Networking (routers, switches, WAPs, firewalls)", "Yes", "Enterprise configs worth flagging"],
                ["Gaming consoles (PlayStation, Xbox, Nintendo)", "Yes", "Sign out of gaming account first"],
                ["Old CCTV / surveillance equipment", "Yes", "DVRs need drive destruction"],
                ["Small kitchen electronics, hairdryers, remotes, digital clocks", "Yes", "Batch in one pickup"],
                ["CFL / LED tube-lights", "Yes — with prior arrangement", "Mercury handling for CFL"],
                ["Medical devices with electronics", "Case-by-case — check first", "Some need specialised handling"],
                ["Industrial electronics / heavy machinery", "Case-by-case — check first", "May need on-site inspection"],
            ],
        },
        "how_to_steps": [
            {"name": "For obviously-standard items — just book",
             "text": "Phones, laptops, chargers, appliances, batteries — no need to check first. WhatsApp with your item list and address."},
            {"name": "For unusual items — send a photo first",
             "text": "Medical devices, industrial equipment, unusual chemistry batteries, or anything you're not sure about — send a photo before booking. Team confirms acceptance and handling."},
            {"name": "Batch data-bearing items separately in your message",
             "text": "Say which items in your batch hold data (laptops, phones, servers, MFPs, CCTV DVRs) so the team plans data destruction routing."},
            {"name": "Flag any damaged items",
             "text": "Cracked screens, water damage, swollen batteries, physical damage — all still accepted, but flag them so the team knows what to expect on the day."},
            {"name": "Book the pickup — team confirms scope at slot confirmation",
             "text": "If any item in your list doesn't fit standard flow, the team lets you know at slot confirmation before pickup — no surprises on the day."},
        ],
        "sections": [
            {"h2": "What's actually never accepted",
             "body": (
                "Very short list. The typical exclusions:\n\n"
                "Radioactive materials — smoke detectors with americium sources, older medical "
                "equipment with radioisotopes. These have their own specialised disposal channels "
                "with atomic energy regulators, not general e-waste recyclers.\n\n"
                "Explosive or high-hazard chemistry — some industrial batteries, certain "
                "photographic chemicals with electronic housings. Case-by-case review.\n\n"
                "Wet-cell batteries with unknown chemistry — specialised chemistry batteries "
                "outside the standard lead-acid / lithium-ion / alkaline / mercury cell "
                "categories may need specific-recycler routing.\n\n"
                "Anything explicitly out of e-waste scope — general household waste, biological "
                "material, chemical waste, medical sharps, food waste. These are separate "
                "waste streams and don't fit e-waste collection at all."
             )},
            {"h2": "Borderline items — worth asking before booking",
             "body": (
                "A few categories are worth a quick 'do you take X?' message before adding to a "
                "pickup:\n\n"
                "Medical devices — CPAP machines, hearing aids, digital thermometers, glucose "
                "meters, home dialysis equipment. Most are accepted; a few have specialised "
                "medical-waste routing rules depending on where they were used and what data "
                "they carry.\n\n"
                "Industrial electronics — controllers, PLCs, industrial UPS, welding "
                "equipment. Usually accepted but often need on-site inspection because of size, "
                "power connections, or hazardous-material questions.\n\n"
                "Old scientific instruments — microscopes with digital components, older "
                "spectrometers, chemistry lab electronics. Case-by-case; some contain unusual "
                "materials that need specialised recovery.\n\n"
                "Vintage / retro electronics — 1970s-80s calculators, older stereo equipment, "
                "vintage computers. Accepted, though sometimes the materials mix (lead solder, "
                "specific plastics) affects the recycling stream."
             )},
            {"h2": "What 'condition doesn't determine acceptance' means in practice",
             "body": (
                "You don't need to worry about whether an item is 'good enough to be worth "
                "picking up'. Broken, dead, damaged, cracked, water-damaged, missing components, "
                "missing chargers, missing casing — all accepted. The condition doesn't "
                "determine whether it's collected; it determines what happens downstream.\n\n"
                "Working items with resale demand may go to buyback and resale — you might "
                "even get paid for them at pickup.\n\n"
                "Non-working or damaged items go to material recovery — no payment, but "
                "pickup is still free and the materials are properly separated.\n\n"
                "Data-bearing devices route through data destruction regardless of working "
                "status.\n\n"
                "So: if you're wondering 'is this too broken to recycle?' — the answer is "
                "almost always no. Book it."
             )},
        ],
        "faqs": [
            {"q": "Do you accept old TVs and CRT monitors?",
             "a": "Yes. CRT displays are bulky and heavy and need advance transport planning (2-3 working days notice), but they're accepted. LCD and LED displays are routine pickup items."},
            {"q": "What about broken items — will you still take them?",
             "a": "Yes. Working, non-working, cracked, damaged — all accepted. Condition affects what happens downstream (buyback vs material recovery) but not whether the item is collected."},
            {"q": "Do you take small kitchen electronics like mixers and kettles?",
             "a": "Yes. Small kitchen electronics batch into a routine pickup along with other household e-waste. Include broken units too — they still contain recoverable materials."},
            {"q": "What about CFL bulbs and tube-lights?",
             "a": "Accepted with prior arrangement. CFLs contain small amounts of mercury and need specialised handling — ask before booking so the team plans appropriately. LED tube-lights are easier but still route separately."},
            {"q": "Can you take medical devices?",
             "a": "Most consumer medical devices (thermometers, glucose meters, CPAP machines, hearing aids) are accepted — send a photo before booking so the team confirms handling. Some devices with regulated data or specialised materials may need specific routing."},
            {"q": "What about very old / vintage electronics?",
             "a": "Accepted. Vintage electronics (1970s-80s calculators, older stereo equipment, vintage computers) may sometimes have collector value — mention if you think it's collectible. Otherwise routes to material recovery."},
            {"q": "Anything you won't take at all?",
             "a": "Radioactive materials (smoke detectors with americium, older medical radioisotopes), explosive chemistries, general non-electronic household waste, biological/medical waste, chemical waste. Everything else is either standard or case-by-case."},
        ],
        "related_pages": rel(
            CORE["recycling"], CORE["pickup"], CORE["battery"],
            CORE["laptop"], CORE["mobile"], CORE["faq"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like to check if some items are accepted for recycling:",
    }


def spec_how_to_prepare_devices() -> dict:
    return {
        "path": "/blog/how-to-prepare-devices-before-pickup/",
        "title": "How to Prepare Devices Before E-Waste Pickup",
        "description": "How to prepare devices before e-waste pickup — back up data, factory-reset phones and laptops, safely package batteries, and get the most out of buyback.",
        "h1": "How to Prepare Devices Before E-Waste Pickup",
        "breadcrumb_label": "How to Prepare Devices",
        "service_type": "Pre-pickup device preparation guide",
        "last_updated": LAST_UPDATED,
        "lede": (
            "A few minutes of preparation before pickup can make the transaction smoother, "
            "protect your data, and — for buyback items — sometimes noticeably improve the "
            "final quote. This guide walks through what to actually do for each device type "
            "the day before or morning of pickup: backing up data, factory-resetting phones "
            "and laptops, safely storing damaged batteries, grouping items for quick handover, "
            "and (for business pickups) preparing GST information and asset numbers so "
            "documentation moves fast at the doorstep."
        ),
        "direct_answer": (
            "To prepare devices for e-waste pickup in Kochi: (1) back up any data you want to "
            "keep, (2) factory-reset phones, tablets, and laptops (sign out of accounts "
            "first), (3) keep damaged batteries on a non-flammable surface, (4) batch items "
            "into one accessible location, and (5) have any relevant documentation ready "
            "(GST info, asset numbers) for business pickups."
        ),
        "key_takeaways": [
            "Back up data first — everything else assumes what you want is saved elsewhere.",
            "Factory-reset phones, tablets, laptops if you can (sign out of accounts first).",
            "Damaged batteries stay on a non-flammable surface until pickup.",
            "Group items in one accessible location before the team arrives.",
            "For business: have GST info, asset numbers, and documentation preferences ready.",
        ],
        "accepted_items": {
            "columns": ["Device type", "Prep step", "Why it matters"],
            "rows": [
                ["Phones and tablets", "Back up + sign out + factory reset", "Removes activation lock, clears data"],
                ["Laptops and desktops", "Back up + sign out + factory reset (if you can)", "Cleaner buyback, removes account risk"],
                ["Printers and MFPs", "Remove any documents from tray; note if internal drive", "MFPs may have HDDs holding scan history"],
                ["UPS and inverter batteries", "Disconnect from load, keep dry", "Safety and easier pickup"],
                ["Damaged / swollen batteries", "Non-flammable surface, cool + dry, no metal contact", "Reduces fire risk"],
                ["Old appliances (fridge, AC)", "Unplug 24 hours before, note if refrigerant", "Refrigerant handling planning"],
                ["Chargers, cables, small electronics", "Just batch them in one place", "No prep needed"],
                ["Business office IT", "Note asset tags, agree documentation format", "Faster paperwork on the day"],
            ],
        },
        "how_to_steps": [
            {"name": "Back up any data you want to keep",
             "text": "Photos, documents, saved games, contacts, licence keys, anything else. Everything after this step assumes your data is already saved elsewhere. iCloud, Google Drive, OneDrive, or a local copy — whichever you prefer."},
            {"name": "Sign out of accounts on phones, tablets, laptops",
             "text": "Apple ID (iPhone/iPad/Mac), Google account (Android/Chromebook), Microsoft account (Windows). This clears activation locks (iPad/iPhone), FRP (Android), and account-linked device management (Windows/Mac) that would otherwise block resale."},
            {"name": "Factory reset the devices",
             "text": "Phone: Settings → General/System → Reset → Erase all content. Laptop: settings → recovery → reset PC (Windows) or Erase All Content and Settings (macOS). Skip this step only if you physically can't (device won't boot, forgotten password)."},
            {"name": "Handle batteries safely",
             "text": "Normal batteries: cool, dry place, away from metals. Damaged/swollen batteries: non-flammable surface (tile/concrete), away from heat and flammable items, don't puncture or crush."},
            {"name": "Group items and prep documentation",
             "text": "Everything in one accessible location before pickup. For business pickups, have GST info handy and know what documentation format you need (per-device asset log, per-drive Certificate, etc.)."},
        ],
        "sections": [
            {"h2": "Why signing out matters for laptops and phones",
             "body": (
                "Modern devices tie themselves to your identity in ways that persist after "
                "factory reset:\n\n"
                "iPhone / iPad: Apple's Activation Lock requires the original Apple ID password "
                "to set up the device after a reset. If you factory reset without signing out "
                "first, the device stays locked to your account and the next owner cannot use "
                "it.\n\n"
                "Android: Factory Reset Protection (FRP) requires the original Google account "
                "sign-in after reset. Same effect — the phone remains linked to your account "
                "unless you remove the Google account before resetting.\n\n"
                "Mac: 'Find My Mac' and Activation Lock behaviour similar to iPhone. Sign out of "
                "iCloud + Apple ID before wiping.\n\n"
                "Windows: Microsoft account and device management can persist. Sign out of the "
                "Microsoft account, then reset.\n\n"
                "The correct order is: back up → sign out → factory reset. Doing them in the "
                "wrong order (reset first, then trying to sign out) often doesn't work — the "
                "reset already tied the device to the account."
             )},
            {"h2": "Preparing batteries and appliances for safe pickup",
             "body": (
                "Standard batteries need no special preparation — keep them in normal storage "
                "conditions (cool, dry, away from metals) until pickup.\n\n"
                "Damaged batteries need active safe storage before pickup. Swollen phone or "
                "laptop batteries stay inside the device. Place the device on a non-flammable "
                "surface (ceramic tile, concrete, glass). Keep away from heat sources and "
                "flammable items. Book the pickup quickly rather than storing damaged batteries "
                "for weeks.\n\n"
                "Old appliances with refrigerant (fridges, ACs) can be unplugged 24 hours "
                "before pickup so the compressor is cool and any residual condensate drains. "
                "Do not attempt to remove the refrigerant yourself — that's done at the "
                "recycling facility with proper equipment."
             )},
            {"h2": "For business pickups: documentation prep",
             "body": (
                "Corporate and small-business pickups benefit from preparing documentation info "
                "before the team arrives:\n\n"
                "GST info — GST number, registered business name, invoice address. Ready to "
                "hand over so GST invoice generation is straightforward.\n\n"
                "Asset numbers — if your office tracks IT with per-device asset tags, having "
                "the tag list matched to your device inventory speeds ITAD per-serial capture.\n\n"
                "Documentation preferences — Certificate of Destruction (per-drive or per-"
                "batch), environmental disposal record for CSR, insurance disposal record. "
                "Confirm with the team what you need at booking so it's part of the plan.\n\n"
                "Authorised signer — who at your office is authorised to sign the pickup "
                "acknowledgement and any handover documents. Should be present at pickup or "
                "reachable by phone."
             )},
        ],
        "faqs": [
            {"q": "How much preparation do I really need to do?",
             "a": "For routine home pickups (a laptop, a few phones, some chargers): about 30-60 minutes if you factory-reset the devices. For business pickups: an hour or two depending on documentation prep. Most preparation is optional but pays off in cleaner buyback quotes and smoother pickup day."},
            {"q": "What if I can't factory-reset my phone / laptop?",
             "a": "Flag it when booking. The device routes through data destruction (drive wipe or physical shredding) instead of buyback — no buyback payment for that item, but pickup is still free and the storage is properly destroyed."},
            {"q": "Do I need to remove the hard drive from my laptop before pickup?",
             "a": "Not required. You can hand the laptop over with drive included (the team wipes or destroys the drive at the facility, per your choice) or hand the drive over separately if you want it physically destroyed. Removing the drive slightly reduces the buyback quote (buyer needs to source replacement) but improves data-security control on your end."},
            {"q": "Should I clean or box up the items?",
             "a": "Not required, but appreciated for buyback items — a clean phone or laptop with original box and charger sometimes moves the quote up slightly. For pure recycling items, no cleaning needed."},
            {"q": "What if I have a swollen laptop battery I can't get out?",
             "a": "Leave it inside the laptop. Place the laptop on a non-flammable surface. Do not try to pry the battery out — it can rupture. Flag 'swollen laptop battery' when booking and include a photo. The team brings appropriate containment for pickup."},
            {"q": "For business pickups, how far in advance should we prepare?",
             "a": "For a 20-50 device batch: prepare inventory and documentation 2-3 working days before pickup. For per-device wipe of drives in-house before pickup: plan a working day for the wiping process itself. For very large jobs (100+ devices, per-serial ITAD): 1-2 weeks lead time typical."},
        ],
        "related_pages": rel(
            CORE["pickup"], CORE["data"], CORE["laptop"],
            CORE["mobile"], CORE["battery"], CORE["itad"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like to prepare for an e-waste pickup — here are the details:",
    }


def spec_how_laptop_scrap_value_calculated() -> dict:
    return {
        "path": "/blog/how-laptop-scrap-value-is-calculated/",
        "title": "How Laptop Scrap Value Is Calculated in Kochi",
        "description": "How laptop scrap value is actually calculated in Kochi — brand, model, generation, condition, drive state. Why per-kg pricing doesn't apply to laptops.",
        "h1": "How Laptop Scrap Value Is Calculated in Kochi",
        "breadcrumb_label": "How Laptop Scrap Value Is Calculated",
        "service_type": "Laptop scrap pricing explainer",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Most laptop scrap price quotes online are variations on 'per kg' rates that don't "
            "reflect how buyback actually works. This blog explains the five variables that "
            "actually move the number, why an old plastic laptop weighs almost as much as a "
            "new MacBook but has 100x less value, and how to get an accurate estimate before "
            "committing to pickup."
        ),
        "direct_answer": (
            "Laptop scrap value in Kochi is calculated from brand + model + generation "
            "(year) + condition + drive state. There is no useful per-kg rate — value is "
            "resale-based, not weight-based. WhatsApp brand + model + year + specs + photos "
            "to Ewaste Kochi for a condition-based estimate; the confirmed quote is at "
            "physical inspection. Working laptops from the last 5 years usually qualify for "
            "a meaningful quote; older laptops go to free recycling."
        ),
        "key_takeaways": [
            "Five variables: brand, model, generation, condition, drive state.",
            "There is no useful per-kg laptop scrap rate — value is resale-based, not weight-based.",
            "Estimate = specs + photos on WhatsApp; confirmed quote = physical inspection.",
            "MacBook, ThinkPad, business Dell/HP retain value best.",
            "Non-working / very old laptops go to free recycling; no payment.",
        ],
        "accepted_items": {
            "columns": ["Variable", "How it moves the quote", "Example"],
            "rows": [
                ["Brand", "Apple → highest retention; ThinkPad, business Dell/HP → next", "MacBook Pro quotes higher than consumer Acer"],
                ["Model + year", "Newer / more recent models quote higher", "2022 XPS 13 ≠ 2015 XPS 13 in the buyback market"],
                ["Condition", "Powers on cleanly / screen intact / keys working / battery holds charge", "Sticky keys and dead battery reduce the number"],
                ["Drive state", "Drive included → higher quote; drive removed → slightly lower", "Buyer sources drive if not included"],
                ["Cosmetics", "Dents, scratches, worn keyboard, faded screen → reduce quote", "Physical wear matters"],
                ["Accessories", "Original charger → adds; original box → small bonus", "Missing charger reduces quote noticeably"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model + generation (year)",
             "text": "About This Mac (macOS) or Settings → System → About (Windows) shows model info. Include the year of manufacture — this significantly affects the quote."},
            {"name": "Note the condition honestly",
             "text": "Powers on cleanly? Screen intact? Keys all working? Battery holds charge for how long? Any cracks or damage? Honest description gets a more accurate estimate."},
            {"name": "State the drive plan",
             "text": "Drive included / drive removed / drive to be destroyed. Each affects the quote differently. Drive included = higher quote but data destruction routing needed."},
            {"name": "Send everything on WhatsApp with photos",
             "text": "Brand + model + year + specs + condition + drive plan + photos in one message. Team returns a condition-based estimate."},
            {"name": "Get the confirmed quote at physical inspection",
             "text": "Estimate ≠ final. Inspection at pickup produces the confirmed quote. If higher than estimate (better condition than expected), the quote goes up. If lower (visible damage not in photos), you can decline the pickup without obligation."},
        ],
        "sections": [
            {"h2": "Why weight-based scrap pricing doesn't apply to laptops",
             "body": (
                "You'll see 'laptop scrap price per kg' quoted online. Here's why that doesn't "
                "reflect real value:\n\n"
                "A 2022 MacBook Pro 14-inch weighs about 1.6 kg. A 2015 Compaq consumer laptop "
                "also weighs about 1.6 kg. Their second-hand buyback values differ by roughly "
                "100x — MacBook Pro could be worth around ₹40,000-50,000 in working condition; "
                "the Compaq is worth essentially nothing.\n\n"
                "A per-kg rate would either massively underprice the MacBook or massively "
                "overprice the Compaq. Neither serves the seller or the recycler.\n\n"
                "For material recovery specifically — a dead, unsellable laptop going straight "
                "to recycling — the recovered materials (aluminium chassis, copper in cables, "
                "small amounts of precious metals in the mainboard) do have a bulk value. But "
                "that's a wholesale-scale metric, not a consumer-facing quote."
             )},
            {"h2": "How the estimate is actually calculated",
             "body": (
                "The estimate references current second-hand market data for that specific brand "
                "+ model + year. Adjustments layer on top:\n\n"
                "Condition modifiers: powers on cleanly (+), screen intact (+), keys all working "
                "(+), battery holds meaningful charge (+), no visible damage (+), all "
                "components present (+), dents / scratches / cracks (-), missing keys (-), "
                "dead battery (-), water damage indicators (-).\n\n"
                "Drive modifiers: SSD/HDD included and in working condition (+), drive removed "
                "(slight -), drive present but non-working (-).\n\n"
                "Accessory modifiers: original charger present (+), original box (small +), "
                "additional RAM installed (+), replacement parts obvious (varies).\n\n"
                "Sum of modifiers against the baseline for that model + year = the estimate. "
                "Physical inspection at pickup either confirms it or adjusts it."
             )},
            {"h2": "What the confirmed quote at inspection reveals",
             "body": (
                "Physical inspection almost always shows something the photos didn't capture. "
                "Common reveals in either direction:\n\n"
                "Downward: keys that stick, battery that drains in under an hour, hinge that "
                "grinds when opening, screen defect only visible in specific angles, fan noise, "
                "port not working, missing keyboard function, subtle cosmetic damage.\n\n"
                "Upward: laptop cleaner than photos suggested, screen brighter/better than "
                "expected, battery health higher than assumed, unusual accessory included "
                "(spare battery, high-end sleeve), specific configuration (higher RAM, larger "
                "SSD) that adds value.\n\n"
                "If the confirmed quote comes in lower than the estimate and you'd rather not "
                "sell at that number, you can decline the pickup — the laptop stays with you, "
                "no charge, no obligation."
             )},
        ],
        "faqs": [
            {"q": "How is laptop scrap price actually calculated?",
             "a": "From brand + model + year + condition + drive state — referenced against current second-hand market data. Not from weight. Send full specs and photos on WhatsApp for a condition-based estimate; confirmed quote comes at physical inspection."},
            {"q": "Is there a per-kg rate for laptop scrap?",
             "a": "Not for whole-laptop buyback. Value depends on model-specific resale demand, not weight. A modern laptop and a 10-year-old laptop weigh similarly but can differ 100x in resale value. Per-kg pricing may apply for pure material recovery at wholesale scale, but not for consumer-facing quotes."},
            {"q": "What if my laptop is 8 years old?",
             "a": "Usually recycling only — no buyback. Older laptops (roughly six years old or more) are past the second-hand resale window for most brands. Free pickup, material recovery, no payment. Exceptions: some enterprise workstations and MacBooks retain value longer."},
            {"q": "Does removing the SSD before pickup change the quote?",
             "a": "Yes, slightly. Drive included = higher quote (buyer gets a functional laptop). Drive removed = slightly lower quote (buyer needs to source replacement). Removing the drive is often the right call for high-security data if you want physical destruction rather than software wiping."},
            {"q": "What matters more — brand or year?",
             "a": "Both matter, but brand + year interaction matters most. A recent MacBook has strong value; a recent low-end consumer laptop has modest value. A 5-year-old MacBook still has meaningful value; a 5-year-old consumer laptop has little. Model-specific resale market drives the number."},
            {"q": "What if the confirmed quote at inspection is much lower than the estimate?",
             "a": "You can decline the pickup — laptop stays with you, no charge, no obligation. Common causes: keys sticking, battery drain, hinge damage, subtle cosmetic issues not visible in the photos you sent. Sending clear photos of the laptop from multiple angles reduces this gap."},
        ],
        "related_pages": rel(
            CORE["laptop"], ("/laptop-scrap-price/", "Laptop scrap price page"),
            CORE["sell"], CORE["calc"], CORE["decision"], CORE["scrap"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like a laptop scrap value estimate — here are the details:",
    }


def spec_how_mobile_buyback_calculated() -> dict:
    return {
        "path": "/blog/how-mobile-phone-buyback-value-is-calculated/",
        "title": "How Mobile Phone Buyback Value Is Calculated in Kochi",
        "description": "How mobile phone buyback value is calculated in Kochi — brand, model, storage, condition, battery health. Why sending photos matters more than describing.",
        "h1": "How Mobile Phone Buyback Value Is Calculated in Kochi",
        "breadcrumb_label": "How Mobile Buyback Is Calculated",
        "service_type": "Mobile buyback pricing explainer",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Phone buyback prices vary a lot even for the same model — the difference "
            "between a 'good' quote and a low one usually comes down to how well you can "
            "communicate the phone's actual condition to the recycler. This blog covers what "
            "actually moves the phone buyback number and why sending photos of specific "
            "things beats describing them in words."
        ),
        "direct_answer": (
            "Phone buyback value in Kochi is calculated from brand + model + storage size + "
            "condition + battery health. Send the About screen (Settings → General/System → "
            "About) as a photo plus front/back photos to Ewaste Kochi on WhatsApp — the team "
            "returns a condition-based estimate. Confirmed quote at physical inspection. "
            "Recent iPhones and flagship Android usually get meaningful quotes; older or "
            "damaged phones go to free recycling."
        ),
        "key_takeaways": [
            "Brand + model + storage + condition + battery health drive the quote.",
            "Photos of front, back, and About screen — more accurate than words.",
            "iCloud sign-out (iPhone) / Google account removal (Android) required for buyback.",
            "Cracked-screen phones may still qualify at a reduced quote if they work.",
            "Water-damaged or dead phones go to free recycling — no buyback typical.",
        ],
        "accepted_items": {
            "columns": ["Variable", "How it moves the quote", "Example"],
            "rows": [
                ["Brand", "Apple retains best; Samsung Galaxy S/Note, Pixel next", "iPhone Pro quotes higher than mid-range Android"],
                ["Model + year", "Recent models quote higher", "iPhone 14 Pro ≠ iPhone 11 Pro"],
                ["Storage size", "Bigger storage → higher quote (marginal but real)", "256GB iPhone quotes higher than 128GB"],
                ["Colour", "Some colours retain value better (varies by model)", "Common colours often quote highest"],
                ["Condition", "Cosmetic wear, functional issues both matter", "Sticker residue vs cracked screen — very different impact"],
                ["Battery health", "Shown in Settings → Battery → Battery Health (iPhone)", "78% health quotes noticeably lower than 92%"],
                ["Accessories", "Original box and charger add small amount", "Missing box is fine; missing charger reduces marginally"],
            ],
        },
        "how_to_steps": [
            {"name": "Get the model + storage info",
             "text": "iPhone: Settings → General → About shows model number, storage, iOS version. Android: Settings → About phone shows model. Include colour."},
            {"name": "Check battery health (iPhone)",
             "text": "Settings → Battery → Battery Health shows the percentage. This significantly affects the quote — send it in the message. For Android, general battery-drain complaint from your daily use is informative."},
            {"name": "Photograph front, back, About screen",
             "text": "Front (screen on if possible), back (showing the case), About screen (showing model unambiguously). Damage close-ups if any."},
            {"name": "Send WhatsApp with everything",
             "text": "Brand + model + storage + colour + battery health + condition + photos in one message. Team returns condition-based estimate."},
            {"name": "Factory-reset before pickup",
             "text": "Back up first, sign out of iCloud (iPhone) or remove Google account (Android), factory reset. This clears Activation Lock / FRP that would otherwise block the buyer from setting up the phone."},
        ],
        "sections": [
            {"h2": "Why sending photos matters more than describing the phone",
             "body": (
                "Photos capture things descriptions miss. Common examples:\n\n"
                "'Small scratches on the screen' — actually visible only in specific lighting, "
                "or actually significant enough to affect touch sensitivity. Photo shows which "
                "one.\n\n"
                "'Some wear on the back' — actually a dent, a chip, or minor cosmetic scuffing. "
                "Very different impacts on the quote.\n\n"
                "'Screen crack in the corner' — actually a small crack, a spider-web pattern, "
                "or a full break with touch failing. Very different implications for buyback.\n\n"
                "'Basically new' — actually shows visible wear on the frame or back that the "
                "seller has stopped noticing.\n\n"
                "Three photos (front, back, About screen) plus close-ups of any damage covers "
                "almost everything the recycler needs to give an accurate estimate. Verbal "
                "descriptions alone almost always lead to bigger gaps between estimate and "
                "confirmed quote at inspection."
             )},
            {"h2": "Battery health — the underappreciated variable",
             "body": (
                "Battery health matters more than most sellers realise. On iPhone specifically, "
                "Settings → Battery → Battery Health shows a Maximum Capacity percentage. This "
                "is a first-order input to the buyback quote:\n\n"
                "Maximum Capacity 90%+ — phone functions like new; buyback quote reflects that.\n\n"
                "Maximum Capacity 80-89% — noticeable battery drain in daily use; buyback quote "
                "reduces to account for eventual replacement cost.\n\n"
                "Maximum Capacity below 80% — phone shows 'Service' notification and battery is "
                "past its ideal replacement threshold; buyback quote reduces more.\n\n"
                "For Android, there's no equivalent per-percentage indicator built-in, but "
                "general battery-drain experience from daily use is informative. If the phone "
                "goes from 100% to 50% in a couple of hours, mention it — the recycler needs "
                "to know."
             )},
            {"h2": "Cracks, water damage, and other reduction reasons",
             "body": (
                "Cracked screens: still often qualify for a reduced quote if the phone works. "
                "The reduction accounts for the cost of a replacement screen in the local "
                "second-hand market. Some cracks are cosmetic (rear glass on iPhone); others are "
                "functional (touch input failing). Flag which type in your photo.\n\n"
                "Bent frames: usually a significant reduction — often means the phone was dropped "
                "hard and internal components may be misaligned.\n\n"
                "Water damage indicators: iPhones and modern Androids have a small water "
                "indicator visible when a SIM tray is removed — if it's turned pink or red, the "
                "phone has been exposed to liquid. This significantly affects (usually "
                "eliminates) buyback qualification.\n\n"
                "Dead spots on screen or touch: often reduces quote significantly because "
                "second-hand buyers can't easily verify how bad the issue is.\n\n"
                "Missing SIM tray, damaged charging port, dead speakers: each reduces the quote "
                "proportional to repair cost."
             )},
        ],
        "faqs": [
            {"q": "How is phone buyback value calculated?",
             "a": "Brand + model + storage size + condition + battery health, referenced against current second-hand market data. Send front / back / About screen photos plus condition notes on WhatsApp for a condition-based estimate; confirmed at physical inspection."},
            {"q": "How much is my old iPhone worth?",
             "a": "Depends on model, storage, colour, battery health, and cosmetic condition. Recent iPhones (last 3 years) usually receive meaningful quotes. Send model + storage + Battery Health screen + front/back photos for a specific estimate."},
            {"q": "Does storage size really matter for the quote?",
             "a": "Yes, marginally but consistently. A 256GB iPhone quotes higher than a 128GB of the same model. A 512GB / 1TB iPhone Pro quotes higher than 128GB. The gap is usually modest but real."},
            {"q": "My iPhone battery health is 82% — how much does that reduce the quote?",
             "a": "Not dramatically at 82% (still above the 80% 'Service' threshold). Below 80% the reduction is more noticeable because the phone shows service notifications. Above 90% is essentially like-new for buyback purposes."},
            {"q": "What about phones with cracked screens?",
             "a": "Still often qualify for a reduced buyback quote if the phone works. The reduction accounts for the cost of screen replacement. Fully-non-functional phones (touch failing, screen broken beyond repair) usually go to recycling only."},
            {"q": "Should I keep the original box for buyback?",
             "a": "Not required — missing box is fine. Having the original box moves the quote up slightly because it improves the second-hand resale story. Original charger is more impactful than the box itself."},
        ],
        "related_pages": rel(
            CORE["mobile"], ("/phone-buyback/", "Phone buyback page"),
            CORE["sell"], CORE["calc"], CORE["marketplace"], CORE["decision"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like a phone buyback quote — here are the details:",
    }


def spec_e_waste_rules_kerala() -> dict:
    return {
        "path": "/blog/e-waste-rules-in-kerala/",
        "title": "E-Waste Rules in Kerala (Practical Summary for Homes and Offices)",
        "description": "E-waste rules in Kerala explained — what the E-Waste (Management) Rules 2022 mean for homes and offices, and how to check whether a recycler is authorised.",
        "h1": "E-Waste Rules in Kerala — What Homes and Offices Need to Know",
        "breadcrumb_label": "E-Waste Rules in Kerala",
        "service_type": "Regulatory guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "The E-Waste (Management) Rules 2022 govern e-waste handling across India, "
            "including Kerala. This blog summarises what those rules practically mean for "
            "consumers and small offices in Kochi — the actual obligations that apply to "
            "you as a household or small-business user, the practical steps to comply, how "
            "to check whether a recycler is authorised under the state pollution control "
            "board, and where to look for the current official text of the rules rather "
            "than relying on second-hand summaries that go stale as amendments happen."
        ),
        "direct_answer": (
            "For most Kerala consumers and small offices, the practical rules under the "
            "E-Waste (Management) Rules 2022 are: use an authorised recycler, do not throw "
            "e-waste in general waste, and (for businesses that produce or use significant "
            "electronics) keep basic records of disposal. Authorised recyclers in Kerala hold "
            "KSPCB-issued authorisation; check this before booking bulk pickup or requesting formal "
            "documentation. Always confirm current official rules via CPCB and KSPCB."
        ),
        "key_takeaways": [
            "E-Waste (Management) Rules 2022 govern national handling; Kerala falls under CPCB and KSPCB.",
            "Consumer obligation: don't dispose e-waste in general waste; use authorised recyclers.",
            "Business obligation: producers/manufacturers have EPR duties; users should keep disposal records.",
            "Authorised recyclers hold KSPCB-issued authorisation — verifiable before booking bulk pickup.",
            "This blog is guidance, not legal advice — check CPCB / KSPCB for current text.",
        ],
        "accepted_items": {
            "columns": ["Role", "Practical obligation", "Notes"],
            "rows": [
                ["Household consumer", "Use authorised recycler; don't dispose in general waste", "Pickup acknowledgement is sufficient documentation"],
                ["Small business (below EPR thresholds)", "Use authorised recycler; keep basic disposal records", "GST invoice + pickup acknowledgement typical"],
                ["Producer / manufacturer / brand owner", "EPR obligations, collection targets, filings", "Consult a compliance adviser for scope"],
                ["Bulk consumer (large office, campus)", "Authorised recycler + per-device tracking + Certificates", "ITAD workflow appropriate"],
                ["Hospital / clinic", "Data destruction essential for patient-record devices", "DPDP Act 2023 also applies"],
                ["Financial services / regulated sector", "Certified destruction + audit trail", "Sector regulator requirements may add"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify your role under the rules",
             "text": "Household consumer? Small business? Producer / manufacturer? User organisation with significant electronics? Each has different obligations."},
            {"name": "Consumer route — just use an authorised recycler",
             "text": "Book pickup with a recycler that holds KSPCB-issued authorisation. Doorstep collection + pickup acknowledgement covers your practical obligations. Free for eligible collections."},
            {"name": "Small business route — recycler + basic records",
             "text": "Same authorised recycler, but also request GST invoice and pickup acknowledgement for your accounts. Keep records for the current financial year."},
            {"name": "Producer / manufacturer route — get compliance advice",
             "text": "EPR obligations are complex and depend on your product category, sales volume, and jurisdictional scope. Consult a compliance adviser rather than relying on general summaries."},
            {"name": "Verify recycler authorisation before large pickups",
             "text": "Ask directly for KSPCB-issued authorisation; check for physical business identity and documentation options. Authorised recyclers offer per-drive Certificates, ITAD workflow, and formal invoicing — unauthorised operators typically don't."},
        ],
        "sections": [
            {"h2": "What the rules actually cover",
             "body": (
                "The E-Waste (Management) Rules 2022 (notified by the Ministry of Environment, "
                "Forest and Climate Change) cover the entire chain — producers, manufacturers, "
                "brand owners, importers, refurbishers, recyclers, and users of electronic and "
                "electrical equipment. Different actors have different obligations.\n\n"
                "For consumers, the rule is straightforward: e-waste should not go into general "
                "waste and should be handed over to authorised recyclers or collection centres. "
                "There's no penalty structure aimed at household consumers, but the framework "
                "assumes consumers will use authorised channels.\n\n"
                "For businesses that produce, import, or brand electronics, Extended Producer "
                "Responsibility (EPR) applies — meaning the producer is responsible for the "
                "collection and recycling of a proportion of the products they put on the "
                "market. This is a complex framework with filings, targets, and portal "
                "registration.\n\n"
                "For business users of electronics (offices that buy and eventually retire "
                "computers, phones, appliances), the rules encourage — and in some regulated "
                "sectors require — disposal through authorised channels with basic record-"
                "keeping."
             )},
            {"h2": "How to check if a recycler is actually KSPCB-authorised",
             "body": (
                "Kerala State Pollution Control Board issues authorisations to recyclers "
                "operating in the state. Practical checks:\n\n"
                "Ask directly — a KSPCB-authorised recycler should be able to state their "
                "registration number on request. Compliance-forward recyclers publish it on "
                "their website; others provide it on enquiry.\n\n"
                "Look for physical business identity — a registered business name, business "
                "address, phone number, GST registration. Not just a WhatsApp number without "
                "any identifying business information.\n\n"
                "Check for documentation options — authorised recyclers offer GST invoices, "
                "pickup acknowledgements, per-drive Certificates of Destruction, environmental "
                "disposal records. Operators without KSPCB authorisation typically don't offer "
                "these because they can't back them up.\n\n"
                "For large business pickups, ask for KSPCB reference in the initial enquiry — "
                "this filters out unauthorised operators before you commit to a bulk pickup."
             )},
            {"h2": "What the rules don't do",
             "body": (
                "Common misconceptions worth clearing up:\n\n"
                "The rules don't prescribe a specific price for scrap or buyback. Recycler "
                "pricing is a market activity, not a regulated one.\n\n"
                "The rules don't require households to obtain specific documentation for "
                "consumer-scale pickups. A pickup acknowledgement is sufficient for personal "
                "records.\n\n"
                "The rules don't cover general household waste, food waste, or biological "
                "waste — those are different waste streams under different frameworks.\n\n"
                "The rules don't guarantee that every recycler complies with what they claim — "
                "which is why verifying KSPCB authorisation and asking for documentation matters."
             )},
        ],
        "faqs": [
            {"q": "Do I need any special permission to dispose of my old laptop?",
             "a": "No permission or registration required for a household consumer. Just use an authorised recycler and get a pickup acknowledgement. That covers your practical obligations under the E-Waste (Management) Rules 2022."},
            {"q": "Is there a penalty for throwing e-waste in general waste?",
             "a": "The rules discourage it but don't have a household-consumer penalty structure. Larger organisations that dispose of significant e-waste through unauthorised channels can face regulatory action from KSPCB. Consumers should just use authorised channels — pickup is free for eligible collections anyway."},
            {"q": "How do I check if a recycler is KSPCB-authorised?",
             "a": "Ask directly for their KSPCB-issued authorisation number. Check for a documented business identity (business name, address, GST). Look for documentation options (pickup acknowledgement, GST invoice, Certificate of Destruction). Authorised operators offer these; unauthorised operators typically don't."},
            {"q": "What are EPR obligations under the rules?",
             "a": "Extended Producer Responsibility applies to producers, manufacturers, brand owners, and importers of electronic equipment. Complex compliance framework with filings, portal registration, and collection targets. Consult a compliance adviser if EPR applies to your organisation — not a topic for a general blog summary."},
            {"q": "Do businesses need to keep e-waste disposal records?",
             "a": "Recommended for any organisation that produces significant e-waste; sometimes required by sector regulators (financial services, healthcare, government). Practical minimum: pickup acknowledgement + GST invoice per pickup. For per-device audit trails, use ITAD workflow."},
            {"q": "Where can I check the current official rules?",
             "a": "CPCB (Central Pollution Control Board) publishes the current text of the E-Waste (Management) Rules and amendments. KSPCB (Kerala State Pollution Control Board) publishes state-specific implementation and authorisation lists. Always check the official sources rather than relying on second-hand summaries — including this one."},
        ],
        "related_pages": rel(
            CORE["rules"], CORE["itad"], CORE["data"],
            CORE["corporate"], ("/trust/", "Trust and compliance"), CORE["about"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like to arrange e-waste pickup and understand the compliance side:",
    }


def spec_safe_battery_storage() -> dict:
    return {
        "path": "/blog/safe-battery-storage-before-pickup/",
        "title": "Safe Battery Storage Before E-Waste Pickup",
        "description": "How to store batteries safely before e-waste pickup — normal, worn, swollen, leaking. Fire risk minimisation and what to do with damaged batteries.",
        "h1": "Safe Battery Storage Before E-Waste Pickup",
        "breadcrumb_label": "Safe Battery Storage",
        "service_type": "Battery safety guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Batteries stored badly before pickup can start fires. Most household batteries "
            "waiting for pickup are fine — but a swollen laptop battery, a leaking inverter "
            "battery, or a phone with a bulging back need specific storage precautions. This "
            "blog covers what safe storage actually means for the days between deciding to "
            "recycle and the pickup team arriving."
        ),
        "direct_answer": (
            "Store batteries in a cool, dry place, away from direct sunlight, away from other "
            "metal objects (short-circuit risk), and away from anything flammable. For "
            "damaged batteries (swollen, leaking, bulging), add: non-flammable surface like "
            "tile or concrete, extra space around the battery, and book the pickup quickly "
            "rather than storing for weeks. Never puncture, crush, or take apart damaged "
            "batteries."
        ),
        "key_takeaways": [
            "Normal batteries: cool, dry, away from other metals and flammables.",
            "Damaged batteries: non-flammable surface, extra clearance, quick pickup.",
            "Never puncture, crush, or take apart a damaged battery.",
            "Book pickup quickly if a battery is showing damage — don't store for weeks.",
            "Swollen phone/laptop battery: leave it inside the device, don't try to remove.",
        ],
        "accepted_items": {
            "columns": ["Battery condition", "Storage rule", "Time-to-pickup"],
            "rows": [
                ["Normal (works or worn)", "Cool, dry, away from metals", "No hurry"],
                ["Swollen (phone / laptop)", "Non-flammable surface, extra space, cool", "Book within days"],
                ["Leaking (UPS / inverter)", "Non-porous surface, ventilated area, gloves for handling", "Book quickly"],
                ["Overheating (unusually warm to touch)", "Non-flammable surface, monitor, ventilate", "Book urgently — this can precede fire"],
                ["Physically damaged (dropped, punctured, crushed)", "Non-flammable surface, isolated location", "Book urgently"],
                ["Multiple types batched together", "Same rules apply to the batch; segregate damaged from normal", "Book within a week"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify condition of each battery",
             "text": "Normal / worn / swollen / leaking / overheating / damaged. Look for: bulging cases, phone screen popping out, laptop keyboard rising, leakage staining, unusual heat, physical dents or punctures."},
            {"name": "Choose the storage location based on condition",
             "text": "Normal: any cool dry spot. Damaged: non-flammable surface (tile, concrete, glass), separated from other items, well-ventilated area."},
            {"name": "Separate damaged from normal batteries",
             "text": "A damaged battery can compromise the safe storage of nearby normal ones. Keep damaged batteries in their own location, not mixed with the general recycling batch."},
            {"name": "Book pickup with time appropriate to condition",
             "text": "Normal: whenever convenient. Damaged: within a few days. Overheating or actively-degrading: urgent pickup, message immediately with photo."},
            {"name": "Never attempt DIY intervention on damaged batteries",
             "text": "No puncturing, crushing, cutting, opening, submerging in water, freezing, or heating. Just contain and wait for pickup."},
        ],
        "sections": [
            {"h2": "Why battery storage matters for fire safety",
             "body": (
                "Lithium-ion batteries (in phones, laptops, tablets, power banks) can enter "
                "'thermal runaway' — an internal chemical reaction that generates its own heat, "
                "which triggers more reaction, which generates more heat. Once thermal runaway "
                "starts, the battery can reach several hundred degrees and ignite nearby "
                "materials.\n\n"
                "Triggers for thermal runaway: physical damage (puncture, crush, bend), "
                "short circuit (metal object across the terminals), extreme heat (leaving in "
                "direct sun, near a heat source), or internal defect (which is what causes "
                "swelling — internal degradation).\n\n"
                "Once a lithium-ion battery is swollen, it has an ongoing internal issue. Not "
                "every swollen battery will catch fire, but the probability increases if it's "
                "stored badly (near flammable material, in heat, next to metal).\n\n"
                "The whole point of safe storage rules is to reduce trigger conditions during "
                "the days between deciding to recycle and pickup happening. Simple containment "
                "is usually sufficient."
             )},
            {"h2": "What to do with a swollen phone or laptop battery specifically",
             "body": (
                "This is the most common damaged-battery scenario in Kochi households. Correct "
                "response:\n\n"
                "Do: leave the battery inside the phone / laptop (do not try to remove); place "
                "the device on a non-flammable surface (ceramic tile, glass, concrete); keep "
                "away from direct sunlight, heat, and other metals; place away from anything "
                "flammable (paper, carpet, curtains, wooden furniture); take a photo; book "
                "pickup within a few days.\n\n"
                "Don't: puncture the battery with a screwdriver or knife; crush the phone / "
                "laptop trying to make it flat again; bend the device; submerge in water; "
                "put in a metal container (which could short across the terminals); throw in "
                "regular trash; leave in a hot vehicle boot.\n\n"
                "If the phone / laptop is actively hot to touch or making unusual noises, move "
                "it outdoors to a non-flammable surface (concrete driveway, tile patio) and "
                "message the team urgently."
             )},
            {"h2": "Leaking UPS or inverter battery — different scenario",
             "body": (
                "Lead-acid batteries (UPS, inverter, car batteries) don't have the same thermal "
                "runaway risk as lithium-ion, but they have their own hazards — the acid inside "
                "is corrosive and the battery contents are toxic. Correct response for a "
                "leaking lead-acid battery:\n\n"
                "Use gloves (rubber or nitrile) if you need to move the battery. Skin contact "
                "with battery acid should be washed off with water for 15+ minutes.\n\n"
                "Place on a non-porous surface (ceramic tile, concrete). Not on carpet, wood, "
                "or absorbent surfaces that would soak up the acid.\n\n"
                "Ventilate the area — battery leakage can produce hydrogen gas.\n\n"
                "Contain any leaked acid with sand, kitty litter, or similar absorbent material "
                "(do not use water, which spreads the leak). Cardboard or newspaper works in a "
                "pinch.\n\n"
                "Book pickup quickly and flag 'leaking UPS/inverter battery' with a photo so "
                "the team brings appropriate handling equipment."
             )},
        ],
        "faqs": [
            {"q": "How should I store old batteries waiting for pickup?",
             "a": "Cool, dry place, away from direct sunlight, away from other metal objects (short-circuit risk), and away from anything flammable. Normal batteries are fine in a drawer or shelf. Damaged batteries need extra care — non-flammable surface, extra clearance, book pickup quickly."},
            {"q": "My laptop battery is swelling — is it dangerous?",
             "a": "Increased risk, not immediate danger. Leave the battery inside the laptop, place the laptop on a non-flammable surface (tile / concrete), keep away from heat and flammable items, book pickup within a few days. Don't try to remove the battery yourself — that increases the risk significantly."},
            {"q": "Can I store batteries in a metal box?",
             "a": "No — metal container can short-circuit multiple batteries across their terminals, especially if they touch each other or the container walls. Use a non-conductive container (cardboard, plastic bin, cloth bag) with batteries separated so they don't touch each other."},
            {"q": "What if my phone battery is actively hot?",
             "a": "Move the phone to a non-flammable surface immediately (concrete floor, ceramic tile, glass table). If possible, move outdoors — a covered outdoor spot in fresh air is safer than an indoor room. Do not put in water. Do not attempt to remove the battery. Message the team urgently with a photo."},
            {"q": "Is it safe to keep old batteries in a drawer with other stuff?",
             "a": "Fine for normal working or worn batteries. Not fine if there are damaged batteries mixed in, or if the drawer contains lots of metal objects (keys, coins, tools) that could contact battery terminals. When in doubt, separate the batteries into their own container."},
            {"q": "What about old batteries stored for years in a shed or garage?",
             "a": "Check condition before booking pickup. Long-stored batteries may have leaked, corroded, or degraded silently. Wear gloves when moving, take a photo of anything visibly damaged, flag condition in your message. Extreme heat cycles (Kerala shed in summer) accelerate battery degradation."},
        ],
        "related_pages": rel(
            CORE["battery"], ("/battery-pickup/", "Battery pickup"),
            CORE["batt_safety"], CORE["pickup"], CORE["faq"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I need to arrange battery pickup — here are the details:",
    }


def spec_office_ewaste_checklist() -> dict:
    return {
        "path": "/blog/office-e-waste-disposal-checklist/",
        "title": "Office E-Waste Disposal Checklist for Kochi Offices",
        "description": "Office e-waste disposal checklist for Kochi offices — inventory, data destruction, documentation, and pickup coordination for IT and general office electronics.",
        "h1": "Office E-Waste Disposal Checklist for Kochi Offices",
        "breadcrumb_label": "Office E-Waste Checklist",
        "service_type": "Office e-waste disposal checklist",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Office e-waste disposal isn't quite the same as household pickup — more items, "
            "more paperwork, more coordination, more decisions upfront about data destruction "
            "and documentation. This checklist walks through the actual steps from 'we should "
            "probably clear out that store cupboard' to signed pickup acknowledgement and "
            "filed documentation, covering inventory scoping, data destruction choices, "
            "documentation set selection, scheduling around operating hours, and pickup-day "
            "coordination so nothing gets missed on either end."
        ),
        "direct_answer": (
            "For office e-waste disposal in Kochi, work through: inventory (approximate "
            "counts by category), data destruction planning (for computers and phones), "
            "documentation decisions (GST invoice, per-device asset log, Certificate of "
            "Destruction), scheduling around business hours, and pickup with signed "
            "acknowledgement. Pickup is free for eligible collections; specific services "
            "(certified destruction, per-device tracking) are quoted before the job."
        ),
        "key_takeaways": [
            "Inventory first — approximate counts by category, not per-device serials.",
            "Decide data destruction level before booking (wipe vs physical shred vs on-site).",
            "Choose documentation format based on your audit needs.",
            "Schedule outside business hours where operational continuity matters.",
            "Signed pickup acknowledgement + follow-up documentation completes the workflow.",
        ],
        "accepted_items": {
            "columns": ["Checklist step", "Action", "Notes"],
            "rows": [
                ["1. Inventory", "Count items by category — laptops, desktops, phones, printers, batteries", "Rough count enough for booking"],
                ["2. Identify data-bearing devices", "List anything with a hard drive, SSD, or storage", "Phones, laptops, servers, MFPs, POS, CCTV DVRs"],
                ["3. Choose data destruction level", "Wipe / physical shred / on-site destruction", "Match to data sensitivity"],
                ["4. Choose documentation set", "GST invoice, asset log, Certificate — what you actually need", "Overrider by audit / compliance framework"],
                ["5. Book scheduled pickup", "WhatsApp with inventory + destruction + documentation + slot preference", "Outside business hours if operational"],
                ["6. Pre-pickup prep", "Group items, back up data, factory reset devices you can", "Prep list based on categories"],
                ["7. Pickup + signed acknowledgement", "Team collects, verifies, paperwork signed", "Point of contact on site"],
                ["8. Follow-up documentation", "Certificates and invoices issue after destruction complete", "File for your records"],
            ],
        },
        "how_to_steps": [
            {"name": "Inventory approximate counts by category",
             "text": "Walk through the store room / IT cupboard / decommissioned pile. Count roughly: how many laptops, how many desktops, how many phones, how many printers, how many batteries, etc. Exact per-serial inventory happens at pickup, not now."},
            {"name": "List data-bearing items and decide destruction level",
             "text": "Every laptop, desktop, phone, server, MFP, POS terminal, CCTV DVR: assume data-bearing. Decide: software wipe (drives stay intact), physical shred (drives destroyed), or on-site destruction. Match to your data's sensitivity."},
            {"name": "Choose the documentation set you need",
             "text": "GST invoice for accounts + pickup acknowledgement (standard). Per-device asset log for asset-register update (ITAD workflow). Certificate of Destruction per drive or per batch (for compliance / DPDP Act). Environmental disposal record (for CSR / ESG)."},
            {"name": "Book the pickup with all details",
             "text": "WhatsApp Ewaste Kochi with inventory + destruction level + documentation set + preferred slot window (outside business hours if that matters). Team returns feasibility and slot confirmation."},
            {"name": "Prep the office side",
             "text": "Assign a point of contact for pickup day (IT lead, admin manager, office manager). Communicate to staff (don't add items last-minute). Back up any data that shouldn't be destroyed. Factory-reset devices you can before pickup."},
            {"name": "Execute pickup + sign acknowledgement",
             "text": "Team arrives at agreed slot. Point of contact verifies item list against what was booked. Pickup acknowledgement signed on the spot. For ITAD workflow: per-serial capture happens here."},
            {"name": "File follow-up documentation",
             "text": "GST invoice, Certificate of Destruction, and any other requested documentation issue within a few working days of pickup (after the destruction step is complete). File for accounts, audit, and compliance records."},
        ],
        "sections": [
            {"h2": "Data destruction decision — the important choice",
             "body": (
                "This is the most consequential decision in the checklist. Three options with "
                "different trade-offs:\n\n"
                "Software wiping at the facility — drives are wiped after collection using "
                "accepted overwrite methods. Drives remain intact and reusable in refurbished "
                "units (some go back into resale). Faster process. Certificate available per "
                "drive or per batch on request. Appropriate for most business data (customer "
                "records, employee data, general operational files).\n\n"
                "Physical shredding at the facility — drives are physically shredded, cannot be "
                "reused. Slower process. Per-drive serialised Certificate of Destruction. "
                "Recommended for high-security data (medical records, financial data, legal "
                "case files, government data, HR records for sensitive roles).\n\n"
                "On-site destruction — mobile shredder brought to your premises, drives "
                "destroyed on-site with your compliance officer present. Drives never leave "
                "the building. Highest chain-of-custody control. Separately scoped and quoted. "
                "Used for the most sensitive data.\n\n"
                "Get the wrong choice and you either over-spend (physical shredding when "
                "software wiping would have been fine) or under-comply (software wiping when "
                "your compliance framework requires physical destruction). If in doubt, err "
                "toward more secure — the incremental cost is small compared to a data-breach "
                "incident."
             )},
            {"h2": "Scheduling around business operations",
             "body": (
                "Most offices don't want a pickup team walking through the workspace during "
                "peak business hours. Common scheduling approaches:\n\n"
                "Early morning pickup — team arrives before opening, collects, leaves before "
                "customers/staff arrive. Works for offices with clear early access.\n\n"
                "After-hours pickup — team arrives after office closes, collects while cleaning "
                "or security staff are present. Common for retail and hospitality.\n\n"
                "Weekend pickup — full weekend for larger jobs; typically Saturday morning for "
                "smaller ones.\n\n"
                "Off-day pickup — for retail with a fixed weekly off-day, pickup on that day is "
                "clean and undisrupted.\n\n"
                "Multi-day pickup for large jobs — server room decommission over 2-3 days, "
                "office clearance over 3-5 days, planned around operational constraints.\n\n"
                "Say your preferred slot window when booking. If the exact window isn't "
                "available, team proposes the closest workable alternative."
             )},
            {"h2": "What actually gets documented",
             "body": (
                "The documentation set depends on what your business needs. Common combinations:\n\n"
                "Small office, no formal compliance requirements: pickup acknowledgement + GST "
                "invoice. Enough for basic record-keeping and accounts.\n\n"
                "Small business with client data: add Certificate of Destruction (per-batch is "
                "usually sufficient) for the client-data-bearing devices.\n\n"
                "Mid-size office with IT asset register: add per-device asset log (ITAD "
                "workflow) so retired devices can be written off the asset register with per-"
                "serial disposition records.\n\n"
                "Regulated organisation (financial services, healthcare, government): per-"
                "drive Certificate of Destruction, per-device asset log, and typically an "
                "environmental disposal record. May also need to align with sector regulator "
                "requirements — check with your compliance team.\n\n"
                "For each documentation type, request at booking. Adding documentation "
                "requests post-pickup is possible but harder — better to specify in advance."
             )},
        ],
        "faqs": [
            {"q": "How do I start planning an office e-waste pickup?",
             "a": "Start with inventory — approximate counts of laptops, desktops, phones, printers, batteries, and other IT items. That's enough to book. WhatsApp Ewaste Kochi with the inventory plus your office address and any scheduling constraints; the team returns a feasibility answer and slot proposal."},
            {"q": "Do I need to know per-device asset numbers before booking?",
             "a": "No. Approximate count by category is enough for booking. If you want per-device asset tracking (for asset register updates), that happens at pickup as part of the ITAD workflow — you don't need to prepare it in advance."},
            {"q": "How do we decide between software wipe and physical shredding?",
             "a": "Match to data sensitivity. Software wipe for most business data (customer records, employee data, general files). Physical shredding for high-security data (medical, financial, legal, government, HR for sensitive roles). If in doubt, err toward physical destruction — small incremental cost, much lower breach risk."},
            {"q": "Can pickup happen outside business hours?",
             "a": "Yes — recommended for offices with operational continuity requirements. Early morning, after-hours, weekend, or off-day slots are all reviewable. Say your preferred slot window when booking."},
            {"q": "What paperwork do I get on pickup day?",
             "a": "Pickup acknowledgement signed on the spot showing categories and rough counts. For ITAD workflow: per-serial capture happens during pickup. GST invoice, Certificate of Destruction, and other requested documentation issue after collection (within a few working days, after the destruction step is complete)."},
            {"q": "How much notice do you need for office pickup?",
             "a": "Small office (10-30 devices): 3-5 working days. Larger (50+ devices, full-office decommissioning, per-serial documentation): 1-2 weeks so route, transport, and destruction slots line up. Urgent (deadline-driven): reviewed case-by-case, worth asking."},
            {"q": "Is office pickup free?",
             "a": "Pickup itself is free for eligible collections. Additional services — certified data destruction with per-drive certificates, on-site destruction, urgent scheduling, multi-location coordination — carry costs quoted before the job."},
        ],
        "related_pages": rel(
            CORE["office_pickup"], CORE["corporate"], CORE["itad"],
            CORE["data"], ("/business-e-waste-recycling/", "Business e-waste"),
            CORE["locations"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, we'd like to arrange office e-waste pickup — here's the inventory:",
    }


def spec_data_deletion_before_recycling() -> dict:
    return {
        "path": "/blog/data-deletion-before-recycling-computers/",
        "title": "Data Deletion Before Recycling Computers in Kochi",
        "description": "Data deletion before recycling computers in Kochi — factory reset, software wiping, physical drive destruction. What works for what data sensitivity.",
        "h1": "Data Deletion Before Recycling Computers in Kochi",
        "breadcrumb_label": "Data Deletion Before Recycling",
        "service_type": "Data destruction guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Sending a computer for recycling without dealing with the drive is one of the "
            "most common data-security oversights. Factory reset alone doesn't cover it — "
            "recoverable data can persist even after 'delete everything'. This blog covers "
            "the practical options for data deletion in Kochi and how to match them to what "
            "your data actually needs."
        ),
        "direct_answer": (
            "For data deletion before recycling computers in Kochi, choose one of: factory "
            "reset + software wipe (for most consumer data), physical drive destruction (for "
            "sensitive business/personal data), or on-site destruction (for the highest-"
            "sensitivity workflows). Ewaste Kochi handles all three at pickup — flag your "
            "choice when booking. Certificate of Destruction available for physical or on-"
            "site destruction on request."
        ),
        "key_takeaways": [
            "Factory reset alone often leaves recoverable data — not sufficient for sensitive data.",
            "Software wiping (proper overwrite methods) is sufficient for most consumer data.",
            "Physical drive destruction is the safer default for business or high-sensitivity data.",
            "On-site destruction available for workflows where drives cannot leave the premises.",
            "Certificate of Destruction issued on request for compliance / audit trail.",
        ],
        "accepted_items": {
            "columns": ["Method", "Data sensitivity", "Certificate available?"],
            "rows": [
                ["Factory reset (you do it)", "Very low — personal photos, browser history", "No — you did it"],
                ["Software wipe at facility (overwrite methods)", "Most consumer + basic business data", "Yes on request"],
                ["Physical drive shredding at facility", "Business data, medical, financial, legal, government", "Yes — serialised per drive"],
                ["On-site destruction (mobile shredder at your premises)", "Highest sensitivity — drives never leave the building", "Yes — serialised, witnessed"],
                ["Degaussing (for magnetic tapes and specific HDDs)", "Legacy magnetic media specifically", "Yes on request"],
                ["Combination (multiple methods for redundancy)", "Very high sensitivity", "Yes — layered certification"],
            ],
        },
        "how_to_steps": [
            {"name": "Identify what data was on the computer",
             "text": "Personal photos and browser history? General office documents? Client records with personal info? Medical records? Financial data? Legal case files? Government-classified? The sensitivity determines what deletion method is appropriate."},
            {"name": "Decide the deletion method",
             "text": "Consumer / low sensitivity: factory reset (do it yourself) or software wipe at facility. Business / general commercial: software wipe with Certificate. Sensitive personal or business data: physical drive shredding with per-drive Certificate. Very high sensitivity: on-site destruction."},
            {"name": "Prep the computer (for factory reset option)",
             "text": "Back up any data you want to keep. Sign out of accounts (Microsoft, Apple, Google). Factory reset via Settings → System → Recovery (Windows) or Erase All Content and Settings (macOS)."},
            {"name": "Book pickup with data destruction choice",
             "text": "WhatsApp Ewaste Kochi with the computer details plus your data destruction choice. Team confirms scheduling and any additional cost for certified destruction / on-site destruction."},
            {"name": "Execute at pickup + get documentation",
             "text": "Team collects the computer. Software wipe or physical destruction happens at the facility. On-site destruction happens at your premises with the mobile shredder. Certificate issues after destruction is complete."},
        ],
        "sections": [
            {"h2": "Why factory reset alone isn't enough",
             "body": (
                "The 'factory reset' or 'delete everything' function on Windows, macOS, iPhone, "
                "and Android varies significantly in what it actually does to the data on the "
                "storage:\n\n"
                "On some systems, factory reset only deletes the file allocation table — the "
                "list of where files are stored. The actual file content remains on the drive "
                "until it's overwritten by new data. Standard recovery tools can pull the files "
                "back.\n\n"
                "On other systems (recent iOS, recent macOS with T2/Apple silicon, recent "
                "Windows with encrypted drives), factory reset does effectively destroy access "
                "to the data — the encryption key is destroyed, so the data becomes cryptographic "
                "garbage.\n\n"
                "For household consumer data (photos, browser history, saved passwords in "
                "browser), factory reset is usually fine. For business data, sensitive personal "
                "data, or anything under regulated data-protection requirements (DPDP Act 2023, "
                "sector regulators), factory reset alone is not the right choice.\n\n"
                "Software wiping using proper overwrite methods (NIST 800-88 Clear or Purge "
                "level) is the industry-standard software approach for consumer-through-business "
                "data. Physical destruction removes the failure modes of software wiping."
             )},
            {"h2": "Software wipe vs physical destruction — how to choose",
             "body": (
                "Software wipe fits when: the drive is functional (can be wiped end-to-end), "
                "the data was consumer or basic business grade, some level of documented "
                "assurance is enough (Certificate on request), and drive reuse is fine.\n\n"
                "Physical destruction fits when: the drive is failing or unresponsive (software "
                "wipe can't complete reliably), the data is sensitive (medical, financial, "
                "legal, government, HR-sensitive), you need per-drive audit trail, or your "
                "compliance framework requires physical destruction (some DPDP-regulated "
                "scenarios, PCI DSS for payment data, medical records under HIPAA-equivalent "
                "frameworks).\n\n"
                "On-site destruction fits when: drives cannot leave your premises (legal, "
                "medical, government), you want chain-of-custody so tight that transport isn't "
                "even part of the picture, or your compliance officer needs to witness the "
                "destruction."
             )},
            {"h2": "What the Certificate of Destruction actually contains",
             "body": (
                "A serialised Certificate of Destruction is a document that shows:\n\n"
                "The drive that was destroyed — serial number, manufacturer, model.\n\n"
                "The date the destruction happened.\n\n"
                "The method used — software wipe (with reference to the overwrite standard "
                "used), physical shredding (with reference to particle size), degaussing (with "
                "reference to the gauss level), or on-site destruction (with witness reference).\n\n"
                "The organisation that requested the destruction.\n\n"
                "The operator who performed or supervised the destruction.\n\n"
                "This is what auditors, compliance officers, insurers, and (in incident cases) "
                "regulators want to see. Per-drive certificates are more defensible than per-"
                "batch certificates for high-security workflows because they show specific "
                "chain of custody."
             )},
        ],
        "faqs": [
            {"q": "Is factory reset enough before recycling a computer?",
             "a": "For household consumer data (personal photos, browser history), usually yes on recent systems with encrypted drives. For business data, sensitive personal data, or anything under regulated data-protection requirements: no. Use software wiping with Certificate or physical drive destruction instead."},
            {"q": "What's the difference between software wipe and physical drive destruction?",
             "a": "Software wipe overwrites the data using accepted methods; drive stays intact and can be reused. Physical destruction physically shreds the drive; drive can't be reused. Both produce Certificate of Destruction on request. Software wipe is faster; physical destruction removes the failure modes of software wiping."},
            {"q": "What is on-site destruction?",
             "a": "Mobile shredder brought to your premises. Drives are physically destroyed on-site with your compliance officer present (typically). Drives never leave the building. Highest chain-of-custody control. Used for the most sensitive workflows — medical records, financial data, government data, some legal contexts."},
            {"q": "How do I know the software wipe actually worked?",
             "a": "Certificate of Destruction references the standard used (e.g., NIST 800-88 Clear or Purge level). For higher assurance, physical destruction removes the 'trust me it was wiped' question entirely — the drive doesn't exist anymore."},
            {"q": "Do I need to remove the drive from my laptop before pickup?",
             "a": "Not required. You can hand the laptop over with drive included (the team wipes or destroys the drive at the facility, per your choice) or hand the drive over separately if you want more control. Removing the drive slightly reduces buyback quote (buyer needs to source replacement) but improves your data-security control."},
            {"q": "What about SSDs vs hard drives — different treatment?",
             "a": "Both are covered. SSDs are actually easier to destroy physically (smaller, simpler shredding) but harder to wipe reliably (wear-levelling can leave data on unaddressable sectors). For SSDs holding sensitive data, physical destruction is often the safer default. Certificate references the drive type."},
            {"q": "How much does data destruction cost?",
             "a": "Software wipe at the facility: usually included in the pickup (small charge per drive for the Certificate if requested). Physical shredding: quoted per drive or per batch depending on volume. On-site destruction: separately scoped. All quoted before the job — never after."},
        ],
        "related_pages": rel(
            CORE["data"], ("/hard-drive-shredding/", "Hard drive shredding"),
            ("/data-destruction-certificate-sample/", "Certificate sample"),
            CORE["laptop"], CORE["itad"], CORE["corporate"],
        ),
        "route": _blog_route(0.8),
        "whatsapp_message": "Hi, I'd like to arrange data destruction for computers being recycled:",
    }


def spec_kerala_monsoon() -> dict:
    return {
        "path": "/blog/recycling-electronics-during-kerala-monsoon/",
        "title": "Recycling Electronics During the Kerala Monsoon",
        "description": "Recycling electronics during the Kerala monsoon — safe storage, pickup scheduling, water-damaged devices, and battery handling in high-humidity conditions.",
        "h1": "Recycling Electronics During the Kerala Monsoon",
        "breadcrumb_label": "Monsoon Recycling",
        "service_type": "Monsoon-season recycling guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Kerala's monsoon season brings specific challenges for e-waste recycling — "
            "water-damaged devices from flooding, higher battery-swelling risk from humidity, "
            "scheduling around weather delays, and safe pickup logistics when doorstep "
            "transfer means moving devices through heavy rain. This blog covers how to handle "
            "e-waste during the monsoon, what actually changes for pickup operations, why "
            "water-damaged devices need urgent data destruction routing rather than assuming "
            "their drives are unrecoverable, and how post-flood cleanup pickups get planned."
        ),
        "direct_answer": (
            "During the Kerala monsoon, e-waste pickup continues but with some adjustments: "
            "water-damaged devices need urgent data destruction routing (data may still be "
            "recoverable), batteries showing signs of humidity damage need safe storage, and "
            "pickup timing may shift around heavy-rain days. WhatsApp Ewaste Kochi with your "
            "items — the team confirms feasible slots around weather constraints. Free "
            "pickup for eligible collections continues year-round."
        ),
        "key_takeaways": [
            "Water-damaged devices need urgent data destruction — data may still be recoverable.",
            "Humidity increases battery swelling risk; check stored batteries during monsoon.",
            "Pickup timing may shift around heavy-rain days; usually resumes next dry window.",
            "Cover items with plastic sheeting during pickup transfer if it's raining.",
            "Post-flood cleanup pickup — common scenario; keep flood-affected electronics separated for pickup.",
        ],
        "accepted_items": {
            "columns": ["Monsoon scenario", "How to handle", "Notes"],
            "rows": [
                ["Water-damaged laptop / phone from a leak", "Book urgent pickup + flag data destruction", "Data may still be recoverable"],
                ["Post-flood e-waste (from a flooded home/office)", "Separate flood-affected items; book bulk pickup", "Advance planning for transport"],
                ["Battery swelling during humid weeks", "Standard damaged-battery precautions apply", "Non-flammable surface, book quickly"],
                ["Rusting or corroding UPS batteries", "Book pickup — corrosion accelerates in monsoon", "Contain any leakage first"],
                ["Items you'd normally recycle but weather delays pickup", "Store safely; team reschedules for dry window", "No urgency unless damaged"],
                ["Wet electronics (recent water exposure)", "Do not power on; hand over as-is", "Powering on can spread damage"],
            ],
        },
        "how_to_steps": [
            {"name": "Assess water damage extent",
             "text": "Was the device submerged (severe), splashed (moderate), or just in a humid environment (mild)? Different levels need different urgency. Any device that was submerged should be flagged as water-damaged."},
            {"name": "Do not power on wet devices",
             "text": "Powering on a wet device can spread water damage, short internal components, or trigger battery issues. Leave it off. Do not try to dry it with heat (hair dryer, oven) — this can damage components further."},
            {"name": "Flag data destruction urgency",
             "text": "Water-damaged storage may still contain recoverable data. Flag 'water-damaged, needs data destruction' in your message so the drive routes for destruction (physical shredding recommended) rather than default recycling flow."},
            {"name": "Book pickup with weather flexibility",
             "text": "Pickup during heavy rain days may be rescheduled. Give a 3-5 day window rather than a specific hour, so team can slot around dry windows. Urgent water-damaged pickups take priority."},
            {"name": "Contain water/humidity issues in storage",
             "text": "Keep water-damaged items separated from unaffected items (moisture can spread). Store in a dry area (plastic bin with silica gel packets, dry cupboard). For batteries showing humidity damage, standard damaged-battery precautions apply."},
        ],
        "sections": [
            {"h2": "Water-damaged devices — data destruction implications",
             "body": (
                "A water-damaged laptop or phone that doesn't power on is often assumed to be a "
                "'total loss' from a data perspective — the drive is presumably dead, so data "
                "recovery is impossible. This is often wrong.\n\n"
                "Storage drives (especially SSDs and some HDDs) are more resilient to water "
                "damage than the rest of the device. The laptop may not boot, the screen may "
                "not work, the keyboard may be corroded, but the drive itself can often be "
                "removed and the data pulled off by a data-recovery service.\n\n"
                "Practical implication: if you're recycling a water-damaged device that held "
                "sensitive data, don't assume the water destroyed the data. Route the device "
                "through data destruction — physical shredding of the drive is the safe "
                "default. Certificate of Destruction available on request.\n\n"
                "For household consumer devices (personal photos, browser history), water "
                "damage is usually sufficient to make casual data recovery infeasible. But "
                "'casual recovery infeasible' isn't the same as 'data guaranteed inaccessible'."
             )},
            {"h2": "Post-flood e-waste — a specific scenario",
             "body": (
                "Kerala's monsoon flooding periodically produces large batches of water-damaged "
                "electronics — flooded homes, flooded offices, flooded shops. Post-flood e-"
                "waste has its own patterns:\n\n"
                "Volume is often high — a whole home's or office's worth of damaged "
                "electronics at once. Bulk pickup workflow rather than routine single-item "
                "pickup.\n\n"
                "Corrosion may be worse than initial appearance suggests — even devices that "
                "seem lightly affected can have salt-water damage inside that gets worse over "
                "days. Book pickup quickly rather than storing for weeks.\n\n"
                "Data destruction is often the right default for any flooded computer or "
                "phone — the drives may or may not be recoverable, but treating them as "
                "recoverable and routing through destruction is the safe choice.\n\n"
                "Insurance and dissolution documentation may be relevant — flood-related "
                "clearance sometimes needs disposal records for insurance claims or (for "
                "businesses) tax records. Request the appropriate documentation set when "
                "booking."
             )},
            {"h2": "Monsoon operational realities for pickup",
             "body": (
                "The pickup team continues operations year-round, but heavy-rain days sometimes "
                "delay slots:\n\n"
                "Pickup transfer needs to happen without soaking electronics — during heavy "
                "rain, transferring items from your doorstep to the pickup vehicle can be "
                "impractical without covered access. Team may reschedule to a dry window.\n\n"
                "Multi-day pickups (office clearance, bulk decommissioning) plan around "
                "monsoon patterns — Kerala's monsoon is predictable enough that pickups can "
                "usually be scheduled around known heavy-rain periods.\n\n"
                "Transport routes affected by flooding may need alternative access — pickup "
                "team may ask about site accessibility during monsoon if your address is in an "
                "area prone to waterlogging.\n\n"
                "For urgent pickups (data-security-critical, business-continuity-driven), "
                "monsoon is not an absolute barrier — team works to find feasible slots around "
                "weather. Flag urgency when booking."
             )},
        ],
        "faqs": [
            {"q": "Can I still book e-waste pickup during monsoon?",
             "a": "Yes. Pickup continues year-round; heavy-rain days may see slot rescheduling to dry windows. Give a wider slot window (3-5 days) rather than a specific hour, and the team fits within the available dry periods."},
            {"q": "What should I do with a water-damaged laptop or phone?",
             "a": "Do not power on. Book pickup with 'water-damaged, needs data destruction' flag. Water damage doesn't necessarily destroy the drive's data — physical drive destruction is the safe default for sensitive data. Certificate of Destruction available on request."},
            {"q": "Do you handle post-flood e-waste cleanup?",
             "a": "Yes. Post-flood pickup is a common bulk scenario — often a whole home or office of water-damaged electronics at once. Book bulk pickup with the flood context so transport and destruction are planned appropriately. Documentation for insurance claims available on request."},
            {"q": "Should I try to dry out a wet phone or laptop first?",
             "a": "For recycling purposes, no — the pickup team handles the item as-is. Don't power it on. Don't use heat (hair dryer, oven) to try to dry it — heat can damage components further. Just book pickup with 'water-damaged' flag."},
            {"q": "Is battery swelling more common during monsoon?",
             "a": "Yes, marginally — high humidity can accelerate battery degradation, particularly for older devices stored in poorly-ventilated areas. Check any stored spare batteries during humid weeks; if you see swelling, apply standard damaged-battery precautions and book pickup."},
            {"q": "What if pickup gets delayed by heavy rain?",
             "a": "Team reschedules to the next feasible dry window and messages you. For non-urgent items, the delay is usually 1-2 days. For urgent items (data-security-critical, business-continuity-driven), the team works to find feasible slots — flag urgency when booking."},
            {"q": "Do I need to package water-damaged items in any special way?",
             "a": "Keep water-damaged items separated from unaffected items (moisture spreads). Store in a dry area if possible (plastic bin, dry cupboard). Don't wrap wet electronics in plastic without ventilation — trapped moisture accelerates corrosion. Just handing over as-is is fine."},
        ],
        "related_pages": rel(
            CORE["pickup"], CORE["data"], CORE["battery"],
            CORE["laptop"], CORE["mobile"], CORE["faq"],
        ),
        "route": _blog_route(0.6),
        "whatsapp_message": "Hi, I have monsoon-season e-waste to arrange — here are the details:",
    }


# Location + device blog posts

def _location_blog_spec(*, slug: str, city: str, device: str, service_h1: str,
                        related_service_link: tuple[str, str],
                        related_location_link: tuple[str, str]) -> dict:
    """Compact helper for location + device blog posts."""
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


def spec_laptop_recycling_kakkanad():
    return _location_blog_spec(
        slug="laptop-recycling-in-kakkanad",
        city="Kakkanad",
        device="laptop",
        service_h1="Laptop Recycling in Kakkanad, Kochi",
        related_service_link=CORE["laptop"],
        related_location_link=CORE["kakkanad"],
    )


def spec_electronics_recycling_vyttila():
    return _location_blog_spec(
        slug="electronics-recycling-in-vyttila",
        city="Vyttila",
        device="electronics batch",
        service_h1="Electronics Recycling in Vyttila, Kochi",
        related_service_link=CORE["recycling"],
        related_location_link=CORE["locations"],
    )


def spec_office_pickup_infopark():
    return _location_blog_spec(
        slug="office-pickup-in-infopark-kochi",
        city="Infopark, Kochi",
        device="office IT batch",
        service_h1="Office E-Waste Pickup in Infopark, Kochi",
        related_service_link=CORE["office_pickup"],
        related_location_link=CORE["infopark"],
    )


def spec_computer_recycling_ernakulam():
    return _location_blog_spec(
        slug="computer-recycling-in-ernakulam",
        city="Ernakulam",
        device="computer",
        service_h1="Computer Recycling in Ernakulam",
        related_service_link=CORE["computer"],
        related_location_link=CORE["locations"],
    )


def spec_battery_recycling_thrippunithura():
    return _location_blog_spec(
        slug="battery-recycling-in-thrippunithura",
        city="Thrippunithura",
        device="battery",
        service_h1="Battery Recycling in Thrippunithura, Ernakulam",
        related_service_link=CORE["battery"],
        related_location_link=CORE["locations"],
    )


def spec_electronics_recycling_palarivattom():
    return _location_blog_spec(
        slug="electronics-recycling-in-palarivattom",
        city="Palarivattom",
        device="electronics batch",
        service_h1="Electronics Recycling in Palarivattom, Kochi",
        related_service_link=CORE["recycling"],
        related_location_link=CORE["locations"],
    )


def spec_bulk_office_collection() -> dict:
    return {
        "path": "/blog/bulk-e-waste-collection-for-offices/",
        "title": "Bulk E-Waste Collection for Kochi Offices (What Actually Works)",
        "description": "Bulk e-waste collection for Kochi offices — how large-batch pickup is planned, what documentation to request, and when ITAD workflow is the right choice.",
        "h1": "Bulk E-Waste Collection for Kochi Offices",
        "breadcrumb_label": "Bulk Office E-Waste",
        "service_type": "Bulk office e-waste collection guidance",
        "last_updated": LAST_UPDATED,
        "lede": (
            "Bulk office e-waste collection isn't just 'pickup for a lot of items' — it's a "
            "coordinated workflow with scheduling, transport, data destruction, and "
            "documentation all planned in advance. This blog covers how bulk collection "
            "actually works for Kochi offices and when the extra formality of ITAD workflow "
            "makes sense over standard bulk pickup."
        ),
        "direct_answer": (
            "For bulk e-waste collection at Kochi offices, WhatsApp Ewaste Kochi with "
            "approximate inventory by category, office address, deadline, and documentation "
            "needs. The team confirms a multi-day pickup plan if needed, agrees workflow "
            "(standard bulk or full ITAD), and executes with signed acknowledgement per "
            "visit plus follow-up documentation. Pickup is free for eligible collections; "
            "certified destruction and per-device tracking are optional add-ons quoted "
            "before the job."
        ),
        "key_takeaways": [
            "Bulk = anything not routine single-visit pickup; typically 10+ devices or full-office scope.",
            "Notice: 3-5 working days for small bulk; 1-2 weeks for large or per-serial jobs.",
            "Standard bulk pickup vs ITAD workflow — choice depends on documentation and audit needs.",
            "Multi-day pickups planned around office operational hours.",
            "Documentation options: pickup acknowledgement, GST invoice, per-device asset log, Certificate of Destruction.",
        ],
        "accepted_items": {
            "columns": ["Bulk scenario", "Typical workflow", "Notes"],
            "rows": [
                ["Office IT refresh (20-50 laptops/desktops)", "ITAD workflow with per-device tracking", "Common every 3-4 years"],
                ["End-of-lease device return", "Standard bulk + documentation for lease records", "Deadline-driven usually"],
                ["Office relocation cleanout", "Standard bulk — mixed categories in one visit", "Include heavy items"],
                ["Server-room decommission", "ITAD + data destruction; on-site sometimes", "High-security data typical"],
                ["Full office closure", "Multi-day bulk + closure documentation", "Tax / dissolution records"],
                ["Department restructure (partial IT retirement)", "Standard bulk pickup", "Small ITAD scale"],
                ["Retail chain POS refresh (multi-store)", "Multi-location coordinated pickup", "Card-data destruction essential"],
            ],
        },
        "how_to_steps": [
            {"name": "Approximate inventory by category",
             "text": "Rough counts: how many laptops, desktops, phones, printers, monitors, UPS batteries, servers, networking. Exact per-device inventory happens at pickup, not booking."},
            {"name": "Identify data-bearing devices + destruction level",
             "text": "Every laptop, desktop, phone, server, MFP, POS: assume data-bearing. Decide: software wipe, physical shredding, or on-site destruction. Match to your data's sensitivity."},
            {"name": "Choose documentation set",
             "text": "GST invoice + pickup acknowledgement (standard). Per-device asset log (ITAD workflow, for asset register update). Certificate of Destruction per drive or per batch. Environmental disposal record (for CSR / ESG)."},
            {"name": "Book with scope + scheduling preferences",
             "text": "WhatsApp Ewaste Kochi with inventory + destruction + documentation + preferred slot window (outside business hours if operational continuity matters). Team returns feasibility and slot proposal."},
            {"name": "Execute pickup(s) + collect documentation",
             "text": "Multi-day pickup if scope requires. Point of contact on-site for verification and paperwork sign-off. Follow-up documentation issues after destruction step is complete."},
        ],
        "sections": [
            {"h2": "Standard bulk pickup vs full ITAD — how to choose",
             "body": (
                "Two workflows for bulk collections. Wrong choice at the start creates re-work:\n\n"
                "Standard bulk pickup fits when: one-off job (single cleanout, single "
                "decommission), per-device serial tracking not required, data destruction "
                "can be bulk-batch certified, device count roughly 10-50.\n\n"
                "Full ITAD workflow fits when: recurring IT refresh cycle, need per-serial "
                "audit records for finance / audit / insurance, need per-drive certified data "
                "destruction (DPDP compliance, medical / financial / legal / government data), "
                "device count 50+ or full-office scope, listed company or under formal "
                "compliance framework.\n\n"
                "If in doubt, book as standard bulk — the team suggests ITAD if the scope "
                "actually warrants it, no routing lock-in until you agree."
             )},
            {"h2": "Multi-day pickup planning for large jobs",
             "body": (
                "Large office jobs — 100+ devices, full server-room decommission, complete "
                "office clearance — typically span multiple pickup days:\n\n"
                "Day 1: large-item removal (server racks, UPS banks, bulky printers). Team "
                "arrives with transport equipped for heavy items.\n\n"
                "Day 2: IT batch (laptops, desktops, phones, small networking). Team captures "
                "per-serial data if ITAD workflow.\n\n"
                "Day 3: cleanup pickup (cables, small electronics, remaining items). Final "
                "signed acknowledgement per your total inventory.\n\n"
                "Days 4-5 as needed for very large jobs.\n\n"
                "Data destruction happens after all pickup days are complete — Certificates "
                "issue after that final destruction step. Consolidated documentation covers "
                "the whole job."
             )},
            {"h2": "Documentation that actually helps for office bulk",
             "body": (
                "Different documentation serves different audit / compliance / accounting "
                "purposes:\n\n"
                "Pickup acknowledgement — signed at each pickup visit. Shows categories and "
                "rough counts. Standard record for all bulk pickups.\n\n"
                "GST invoice — for the pickup service (and any buyback payment). Standard for "
                "GST-registered organisations.\n\n"
                "Per-device asset log — serial, model, condition, and disposition per unit. "
                "Used for asset-register write-off, insurance disposal records, end-of-lease "
                "documentation, corporate audit trails.\n\n"
                "Certificate of Destruction — issued after data destruction is complete, "
                "per-drive or per-batch depending on scope. Required for DPDP compliance and "
                "most enterprise policy frameworks.\n\n"
                "Environmental disposal record — for CSR reports, ESG filings, sustainability "
                "audits. Categories, counts, and disposition summary.\n\n"
                "Request documentation at booking — adding post-pickup is possible but harder."
             )},
        ],
        "faqs": [
            {"q": "What counts as bulk for office pickup?",
             "a": "Anything not routine single-visit pickup. Rough thresholds: 10+ devices, full office cleanout, per-device tracking requirements, or any pickup needing scheduled coordination because of scope. Below that, standard doorstep office pickup usually fits."},
            {"q": "How much notice do you need for bulk office pickup?",
             "a": "Small bulk (10-30 devices): 3-5 working days. Large bulk (50+ devices, full-office decommissioning, server-room retirement): 1-2 weeks so route + transport + destruction slots line up. Multi-location or emergency bulk: reviewed case-by-case."},
            {"q": "Is bulk pickup free for offices?",
             "a": "Pickup itself is free for eligible collections. Additional services — certified data destruction with per-drive Certificates, on-site destruction, urgent scheduling, multi-location coordination, ITAD workflow overhead — carry costs quoted before the job. Never after."},
            {"q": "Do I need exact device inventory to book?",
             "a": "No. Approximate count by category is enough for booking and scoping. Exact per-device inventory happens at pickup — informal (pickup acknowledgement) or formal (ITAD asset log with per-serial capture)."},
            {"q": "Can pickup happen outside business hours?",
             "a": "Yes — often preferred for offices with operational continuity requirements. Early morning, after-hours, weekend, or off-day slots reviewable. Say preferred slot window at booking."},
            {"q": "What's the difference between standard bulk and ITAD?",
             "a": "Standard bulk pickup: rough counts, no per-serial tracking, batch-level documentation. Suitable for smaller offices without formal audit requirements. ITAD workflow: per-serial capture, per-drive certified destruction, consolidated audit-ready reporting. Suitable for larger offices, IT refresh cycles, and organisations under compliance frameworks."},
            {"q": "Can you handle multi-location bulk pickup for a retail chain?",
             "a": "Yes. Multi-location engagement with one point of contact, consolidated documentation across sites, coordinated scheduling around each location's operating hours. Common for retail chains, hospitality groups, and campus environments."},
        ],
        "related_pages": rel(
            ("/bulk-e-waste-pickup/", "Bulk pickup"), CORE["office_pickup"],
            CORE["corporate"], CORE["itad"], CORE["data"], CORE["locations"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, we'd like to arrange bulk e-waste collection for our office — here's the scope:",
    }


def spec_reuse_resale_recycling() -> dict:
    return {
        "path": "/blog/difference-between-reuse-resale-and-recycling/",
        "title": "Difference Between Reuse, Resale and Recycling for Electronics",
        "description": "Difference between reuse, resale and recycling for electronics — what each actually means, when each applies, and how to decide which route fits your old device.",
        "h1": "Difference Between Reuse, Resale and Recycling for Electronics",
        "breadcrumb_label": "Reuse, Resale, Recycling",
        "service_type": "E-waste route decision explainer",
        "last_updated": LAST_UPDATED,
        "lede": (
            "'Recycling' is often used as a catch-all term for anything you do with an old "
            "electronic device, but there are three distinct routes with different "
            "environmental impacts and outcomes: reuse (someone keeps using it), resale "
            "(someone else buys it), and recycling (materials recovered). This blog covers "
            "when each applies and how to decide which route fits your specific old device."
        ),
        "direct_answer": (
            "Reuse means the device continues its original function with a new owner or "
            "purpose (donating a working laptop, passing on a phone). Resale means selling "
            "the device to someone who will use it (buyback flow, second-hand marketplace). "
            "Recycling means recovering the materials because the device has no further "
            "practical use (dismantling, material separation). For most old electronics, "
            "resale first if there's demand, then recycling for what doesn't sell. Reuse "
            "sits ahead of both when applicable."
        ),
        "key_takeaways": [
            "Reuse > resale > recycling in terms of environmental impact hierarchy.",
            "Reuse means the device keeps its original function with a new owner.",
            "Resale means someone pays for the device to use themselves.",
            "Recycling means materials are recovered because the device is past use.",
            "Most workflows combine: buyback for viable units, recycling for the rest.",
        ],
        "accepted_items": {
            "columns": ["Route", "What happens", "When it applies"],
            "rows": [
                ["Reuse (donation, hand-me-down)", "Device continues original function with new owner", "Working, still useful, and someone wants it"],
                ["Refurbishment + resale", "Device inspected, cleaned, sometimes repaired, then sold", "Working with resale demand"],
                ["Buyback (recycler + resale market)", "You get paid; device goes to resale via refurbisher", "Working with clear resale value"],
                ["Second-hand marketplace (person-to-person)", "You sell directly to another consumer", "You have time and inclination"],
                ["Recycling (material recovery)", "Device dismantled, metals/plastics separated for reuse", "Non-working, obsolete, damaged"],
                ["Data destruction + recycling", "Drive wiped/destroyed, device recycled", "Data-bearing devices with no resale value"],
                ["Combined workflow (buyback + recycling)", "Viable units go to resale, others to recycling", "Mixed batches (office cleanout, bulk)"],
            ],
        },
        "how_to_steps": [
            {"name": "Check if the device still works",
             "text": "Powers on cleanly? Basic functions working? If yes, reuse or resale might be viable. If no, skip to recycling."},
            {"name": "For working devices — assess resale demand",
             "text": "Recent brand-name laptop / phone / device? Probably resale demand. Older, generic, or specialised device with no obvious buyer? Probably not."},
            {"name": "Decide: hand-off vs sell vs recycle",
             "text": "Reuse (donate, hand-me-down) if you know someone who genuinely wants it. Resale (buyback, marketplace) if there's demand and you want compensation. Recycling if there's no viable buyer."},
            {"name": "For sensitive-data devices — always destroy data first",
             "text": "Regardless of route, if the device holds personal or business data: factory reset (for consumer devices) or software wipe / physical destruction (for sensitive data) BEFORE the device leaves your possession."},
            {"name": "Use one workflow that combines routes if it's a batch",
             "text": "For office cleanouts or apartment-scale batches: buyback for viable units + recycling for the rest, all in one pickup. Ewaste Kochi handles both in a single visit."},
        ],
        "sections": [
            {"h2": "Why reuse ranks above resale ranks above recycling",
             "body": (
                "The environmental hierarchy — reduce, reuse, recycle — puts reuse ahead of "
                "recycling because reuse preserves the value already embedded in the device. "
                "Recycling recovers materials but requires energy (dismantling, transport, "
                "material processing) and loses the engineered value of the finished device.\n\n"
                "Resale sits between reuse and recycling — the device keeps functioning "
                "(preserving value) but the transaction involves refurbishment cost, transport, "
                "and often minor part replacement. Still better than recycling from a total-"
                "footprint perspective.\n\n"
                "In practice, most old electronics can only follow one or two of these routes. "
                "A working laptop that someone would actually use — reuse is best. A working "
                "laptop with no obvious taker but resale demand — resale is best. A dead "
                "laptop — recycling is the only option.\n\n"
                "The workflow you choose should match the device's actual situation, not just "
                "which route sounds best in principle."
             )},
            {"h2": "When resale is more work than it's worth",
             "body": (
                "Direct person-to-person resale (Facebook Marketplace, OLX, Cashify equivalents) "
                "gets you the highest price per device, but it takes time and effort:\n\n"
                "Listing the device with good photos and description.\n\n"
                "Responding to enquiries, often lots of them from non-serious buyers.\n\n"
                "Negotiating price.\n\n"
                "Meeting the buyer to transact.\n\n"
                "Handling payment and any post-sale disputes.\n\n"
                "For a single high-value device (recent iPhone, MacBook), this can be worth "
                "the effort — you may get 30-50% more than a buyback quote. For a batch of "
                "old devices, or for a single mid-value device, the buyback flow through an "
                "authorised recycler is usually more time-efficient even at a lower per-device "
                "price.\n\n"
                "Practical rule of thumb: if you'd rather spend an hour of your time selling "
                "the device than accept a lower quote, use direct resale. If you'd rather "
                "have it gone with minimal effort, use buyback."
             )},
            {"h2": "Data destruction sits alongside all three routes",
             "body": (
                "Regardless of whether a device goes to reuse, resale, or recycling, if it "
                "held sensitive data the data needs to be destroyed first — you don't want "
                "your data going with the device to the new owner.\n\n"
                "For reuse (donating a laptop to a family member or NGO): factory reset before "
                "handing over. Sign out of accounts first. Consider whether the recipient "
                "really needs a wiped drive or would benefit from your existing setup — some "
                "reuse scenarios (educational donation with specific software) work better "
                "with a curated device rather than a factory-reset one.\n\n"
                "For resale (buyback or direct): factory reset + sign out of accounts before "
                "handover. For business-data-bearing devices going through buyback, request "
                "software wipe or physical drive destruction with Certificate of Destruction "
                "before the device enters the resale flow.\n\n"
                "For recycling: same data destruction options apply — factory reset (you), "
                "software wipe (facility), physical shredding (facility), or on-site "
                "destruction (your premises)."
             )},
        ],
        "faqs": [
            {"q": "What's the difference between recycling and buyback?",
             "a": "Recycling means the device's materials are recovered (metals, plastics separated for reuse in new products). Buyback means the device is inspected, refurbished if viable, and resold to another user — device keeps functioning. Buyback preserves more value; recycling is the fallback for devices past their functional life."},
            {"q": "Should I donate my old laptop or sell it?",
             "a": "Depends. If you know someone who would genuinely use and value the laptop (student, family member, NGO with a real need), donation preserves the most value. If no obvious taker, buyback or direct resale gets you some compensation for the residual value."},
            {"q": "Is recycling worse than reuse or resale?",
             "a": "From an environmental perspective, yes — reuse and resale preserve the value already in the device; recycling only recovers raw materials. But recycling is essential for devices that genuinely can't be reused (non-working, obsolete, damaged) — it prevents landfill and recovers useful materials."},
            {"q": "Can one device combine reuse and recycling?",
             "a": "In a sense, yes — refurbishment often means reusing some components (screen, battery, casing) while recycling others (drive if data-destroyed, non-viable components). The whole-device buyback flow generally routes viable components to resale and non-viable ones to recycling."},
            {"q": "What if I'm not sure whether my device has resale value?",
             "a": "Send brand + model + year + condition + photos on WhatsApp for a condition-based buyback estimate. It's free and non-committal. If the estimate is meaningful, resale via buyback works. If the estimate is nil, recycling is the route — pickup is still free."},
            {"q": "For a batch of old office devices, do we choose one route for the whole batch?",
             "a": "No — mixed batches typically go through a combined workflow. Viable units go to buyback / resale (you get paid). Non-viable units go to free recycling. All in one pickup, per-unit routing based on condition."},
            {"q": "Does data destruction apply differently across reuse, resale, and recycling?",
             "a": "Same principle — data-bearing storage should be destroyed before the device leaves your possession, regardless of destination. Method varies: factory reset for consumer devices going to reuse; software wipe / physical destruction for sensitive-data devices going to resale or recycling."},
        ],
        "related_pages": rel(
            CORE["recycling"], CORE["sell"], CORE["marketplace"],
            CORE["decision"], CORE["laptop"], CORE["mobile"],
        ),
        "route": _blog_route(0.7),
        "whatsapp_message": "Hi, I'd like to figure out the right route for an old device — here are the details:",
    }


ALL_BLOGS = [
    ("where-to-recycle-old-electronics-in-kochi",   spec_where_to_recycle_old_electronics_kochi),
    ("where-to-recycle-batteries-in-kochi",         spec_where_to_recycle_batteries_kochi),
    ("how-electronics-pickup-works",                spec_how_electronics_pickup_works),
    ("what-electronics-are-accepted-for-recycling", spec_what_electronics_accepted),
    ("how-to-prepare-devices-before-pickup",        spec_how_to_prepare_devices),
    ("how-laptop-scrap-value-is-calculated",        spec_how_laptop_scrap_value_calculated),
    ("how-mobile-phone-buyback-value-is-calculated", spec_how_mobile_buyback_calculated),
    ("e-waste-rules-in-kerala",                     spec_e_waste_rules_kerala),
    ("safe-battery-storage-before-pickup",          spec_safe_battery_storage),
    ("office-e-waste-disposal-checklist",           spec_office_ewaste_checklist),
    ("data-deletion-before-recycling-computers",    spec_data_deletion_before_recycling),
    ("recycling-electronics-during-kerala-monsoon", spec_kerala_monsoon),
    ("laptop-recycling-in-kakkanad",                spec_laptop_recycling_kakkanad),
    ("electronics-recycling-in-vyttila",            spec_electronics_recycling_vyttila),
    ("office-pickup-in-infopark-kochi",             spec_office_pickup_infopark),
    ("computer-recycling-in-ernakulam",             spec_computer_recycling_ernakulam),
    ("battery-recycling-in-thrippunithura",         spec_battery_recycling_thrippunithura),
    ("electronics-recycling-in-palarivattom",       spec_electronics_recycling_palarivattom),
    ("bulk-e-waste-collection-for-offices",         spec_bulk_office_collection),
    ("difference-between-reuse-resale-and-recycling", spec_reuse_resale_recycling),
]


# ---------------------------------------------------------------------------
# Runner (same shape as generate-batch-pillars.py)
# ---------------------------------------------------------------------------

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
    parser = argparse.ArgumentParser(description="Batch driver for 20 blog posts.")
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
    print(f"blog batch: {len(ALL_BLOGS)} specs; extra: {extra or 'none'}")
    print(f"{'='*76}")

    passed, failed = [], []
    for slug, fn in ALL_BLOGS:
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
    print(f"blog batch summary: {len(passed)} passed, {len(failed)} failed")
    if failed:
        for slug, rc, msg in failed:
            print(f"  - {slug} (exit {rc}): {msg[:180]}")
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
