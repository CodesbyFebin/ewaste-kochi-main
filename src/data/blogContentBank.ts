// Content bank powering scripts/generate-remaining-posts.ts.
//
// Written once per cluster (not per post) and assembled programmatically —
// same architecture as the image generator (scripts/generate_blog_images.py):
// real, keyword-matched building blocks, not a single fill-in-the-blank
// template repeated 466 times. Each cluster gets real answers to all 20 of
// its roadmap FAQ questions (src/data/blogRoadmap20.ts) and a pool of
// genuine content modules that the generator selects from by relevance to
// each specific topic title.
//
// All wording here follows the same safe-claims conventions used throughout
// src/pages/blog/*: no fabricated ratings/certifications/named clients, no
// far-city service claims, the standard service-area/quote/pickup/compliance
// disclaimer lines reused verbatim where relevant.

export interface ContentModule {
  keywords: RegExp;
  heading: string;
  body: string;
}

export interface ClusterContentBank {
  clusterSlug: string;
  keyTakeaways: string[];
  modules: ContentModule[];
  faqAnswers: Record<string, string>;
  extraRelatedLinks: { label: string; href: string }[];
}

const SERVICE_AREA_LINE =
  "Ewaste Kochi primarily supports Kochi, Ernakulam, Kakkanad, Kalamassery, Ernakulam South, Aluva and nearby Kochi-metro enquiry areas. For other Kerala districts, contact us to check pickup feasibility.";
const QUOTE_LINE =
  "Final quote depends on item type, quantity, condition, location and current market rate.";
const PICKUP_LINE =
  "Pickup feasibility depends on item type, quantity, condition and location.";
const COMPLIANCE_LINE =
  "This is general educational information, not legal advice — verify specific requirements with official sources or a qualified advisor.";

export { SERVICE_AREA_LINE, QUOTE_LINE, PICKUP_LINE, COMPLIANCE_LINE };

export const CONTENT_BANK: ClusterContentBank[] = [
  // ─── 1. E-Waste Recycling Basics ────────────────────────────────────────
  {
    clusterSlug: "e-waste-recycling-basics",
    keyTakeaways: [
      "Doorstep pickup covers most of Kochi-metro — no drop-off point needed.",
      "Data wiping and battery separation apply to almost every pickup.",
      "A rough item list and location is usually enough to start.",
      "Working devices may be worth selling instead of recycling — check first.",
      "Even a single small item is fine to include in a pickup request.",
    ],
    modules: [
      {
        keywords: /basics|introduction|what is|beginner|first.time|new to/i,
        heading: "The basics, in short",
        body: "E-waste recycling means collecting, sorting and processing discarded electronics so materials can be recovered and hazardous components — mainly batteries — are handled safely, instead of everything ending up mixed into general waste. For most people in Kochi, that starts with a WhatsApp message describing what you have.",
      },
      {
        keywords: /checklist|prepare|before|ready/i,
        heading: "What to have ready",
        body: "A rough list of items, your area or address, and photos of anything damaged or battery-related speeds up confirmation. Data-bearing devices should be backed up and wiped or factory reset before the team arrives, and batteries should be kept in their own bag rather than mixed in with everything else.",
      },
      {
        keywords: /mistake|myth|wrong|avoid/i,
        heading: "Where people go wrong",
        body: "The most common issues are batteries mixed in with general electronics, personal data left on a device, and vague messages with no item list or location. All three are easy to avoid with a few minutes of preparation before you reach out.",
      },
      {
        keywords: /family|household|home|apartment|flat/i,
        heading: "For households and families",
        body: "A household cleanout usually turns up more electronics than expected — old phones, chargers, a forgotten laptop, a dead power bank. Gather everything in one place, sort batteries out separately, and send one combined list rather than booking multiple small pickups.",
      },
      {
        keywords: /responsible|informal|authoriz|legitimate|trust/i,
        heading: "Why the collector matters",
        body: "Not all collection is equal. A legitimate recycler can explain how data is handled, how batteries are separated, and where materials end up. Informal scrap dealers typically can't answer these questions with any specifics, which is the clearest sign to look elsewhere.",
      },
      {
        keywords: /reuse|resale|sell|donate|value/i,
        heading: "Reuse before recycling",
        body: "If a device still works, reuse or resale is usually the better first option — it extends the device's life before recycling becomes necessary. Non-working or badly damaged devices are the clearer candidates for straightforward recycling.",
      },
    ],
    faqAnswers: {
      "What is e-waste recycling?":
        "It's the process of collecting, sorting and processing discarded electronics to recover reusable materials and safely handle hazardous components like battery cells, rather than sending them to landfill or informal scrap dealers.",
      "Where can I recycle old electronics in Kochi?":
        "Book a pickup with Ewaste Kochi. Share your item list, location and photos on WhatsApp, and the team confirms feasibility and the right handling route.",
      "What electronics can be recycled?":
        "Laptops, desktops, monitors, phones, tablets, printers, routers, cables, batteries, TVs, servers and mixed IT scrap are all accepted. If you're unsure about a specific item, send a photo.",
      "Can broken electronics be recycled?":
        "Yes. A device not powering on or physically damaged doesn't disqualify it — mention the damage so it can be handled appropriately.",
      "Is e-waste pickup available in Kochi?":
        `Yes, doorstep pickup is the standard route. ${PICKUP_LINE}`,
      "What should I send before booking pickup?":
        "Your item list, approximate quantity, area, and photos — especially for batteries or anything damaged or bulky.",
      "Do I need to remove data before recycling?":
        "For anything with storage — laptops, hard drives, phones — yes, ideally beforehand. Ask about data destruction support if you're not confident doing it yourself.",
      "Can batteries be mixed with e-waste?":
        "They can be collected in the same pickup but are processed separately from general electronics for safety. Mention batteries specifically when you book.",
      "Can old cables and chargers be recycled?":
        "Yes, cables, chargers and adapters are accepted as part of general e-waste, including on their own without an accompanying device.",
      "What happens after e-waste is collected?":
        "Items are sorted by type. Data-bearing devices go through data handling first if requested, batteries are separated, and anything reusable may be routed toward resale rather than recycling.",
      "Is recycling better than dumping?":
        "Yes. Dumping electronics with household waste risks unsafe informal handling and environmental harm; proper recycling keeps materials out of landfill and handles hazardous components correctly.",
      "Can reusable devices be resold instead?":
        "Yes. Working or repairable devices may have resale value — condition-based quotes are available before you commit to recycling.",
      "Does Ewaste Kochi collect from homes?":
        "Yes, home pickups are a standard part of the service, from a single old phone to a full household cleanout.",
      "Does pickup depend on location?":
        `Yes. ${SERVICE_AREA_LINE}`,
      "Is recycling available for offices?":
        "Yes. Office and bulk pickups are supported, and larger jobs with data destruction or documentation needs typically route through ITAD.",
      "Are TVs and monitors accepted?":
        "Yes, including damaged screens — share photos and location so the team can confirm handling.",
      "Should I share photos before pickup?":
        "It helps a lot, particularly for batteries, damaged items, or anything bulky — it speeds up confirmation and avoids surprises on pickup day.",
      "What items need special handling?":
        "Batteries (especially swollen, leaking or damaged ones) and any device holding personal or business data need separate, careful handling.",
      "Can I recycle mixed electronics?":
        "Yes, a single pickup can include a mix of item types — just list everything together when you book.",
      "How do I start?":
        "Message Ewaste Kochi on WhatsApp with your item list, location and photos, or use the Book Pickup button on this page.",
    },
    extraRelatedLinks: [
      { label: "E-Waste Recycling", href: "/recycling/" },
      { label: "Book Pickup", href: "/pickup/" },
    ],
  },

  // ─── 2. E-Waste Pickup Near Me ──────────────────────────────────────────
  {
    clusterSlug: "e-waste-pickup-near-me",
    keyTakeaways: [
      "WhatsApp is the fastest way to book — item list, location, photos.",
      "Most Kochi-metro addresses are serviceable; message us to confirm yours.",
      "Complete details upfront reduce back-and-forth and speed up confirmation.",
      "Home and office pickups follow the same core process.",
      "There's no minimum quantity for a standard household pickup.",
    ],
    modules: [
      {
        keywords: /book|schedul|whatsapp|message|request/i,
        heading: "Booking in practice",
        body: "Message your item list, location and photos on WhatsApp. The team confirms feasibility and any quote details, then you agree on a slot — usually within a few days for standard household pickups, with larger jobs needing a bit more lead time.",
      },
      {
        keywords: /apartment|flat|housing society|building/i,
        heading: "For apartments and housing societies",
        body: "Apartment pickups work the same way as standalone homes — just include the building name, floor and any access instructions. A combined pickup with neighbours is often more efficient than several individual visits.",
      },
      {
        keywords: /office|business|shop|corporate/i,
        heading: "For offices and small businesses",
        body: "Office pickups more often involve larger quantities and multiple desks or floors. Sharing a rough asset list or inventory in advance helps the team plan the right vehicle and crew size.",
      },
      {
        keywords: /photo|confirm|faster/i,
        heading: "Why photos speed things up",
        body: "A photo of anything damaged, bulky, or battery-related gives the team real information to plan around before arriving, rather than discovering it on the day. Standard household items like phones and cables don't need photos — a written description is enough.",
      },
      {
        keywords: /heavy|bulky|large|server rack/i,
        heading: "Heavy or bulky items",
        body: "Old CRT TVs, server racks and large UPS batteries need advance notice — mention size, weight and access details (floor, lift) when you first message so the visit can be planned properly.",
      },
      {
        keywords: /same.day|urgent|fast|quick/i,
        heading: "Same-day and urgent requests",
        body: "Same-day pickup isn't guaranteed — it depends on current scheduling and your location. Contacting early in the day with complete details gives the best chance of a quick slot.",
      },
      {
        keywords: /mistake|delay|avoid/i,
        heading: "What slows a booking down",
        body: "A vague message with no item list or location is the single biggest cause of delay. Leaving out a damaged battery until pickup day, or not mentioning data-bearing devices until the team arrives, are the next most common issues.",
      },
    ],
    faqAnswers: {
      "How do I book e-waste pickup?":
        "Message your item list, location and photos on WhatsApp. The team confirms feasibility and any quote details, then you agree a slot.",
      "Is pickup available near me in Kochi?":
        `Very likely. ${SERVICE_AREA_LINE}`,
      "What items can I include in pickup?":
        "Laptops, desktops, monitors, phones, batteries, cables, printers, TVs and mixed IT scrap — send a list and we'll confirm anything unclear.",
      "Is pickup always free?":
        "Standard doorstep pickup is free for qualifying quantities. Unusual or very large jobs are discussed upfront.",
      "What affects pickup feasibility?":
        `${PICKUP_LINE}`,
      "Can I book pickup through WhatsApp?":
        "Yes, WhatsApp is the primary and fastest way to book — message your item list, location and photos to start.",
      "Should I send photos?":
        "It helps, especially for batteries, damaged items, or anything bulky — photos speed up confirmation.",
      "Can apartments request pickup?":
        "Yes. Include building name, floor and access instructions when you message.",
      "Can offices request pickup?":
        "Yes. Larger office jobs benefit from a rough asset list shared in advance.",
      "Is same-day pickup possible?":
        "Not guaranteed — it depends on current scheduling and location. Message early in the day with complete details for the best chance.",
      "Can I reschedule pickup?":
        "Yes, contact us as early as possible so the slot can be reallocated smoothly.",
      "Are batteries accepted in pickup?":
        "Yes, but they're kept physically separate from general electronics for safety — mention them specifically when booking.",
      "Are TVs accepted in pickup?":
        "Yes, including damaged screens — share photos and approximate size.",
      "Are broken items accepted?":
        "Yes. Broken or non-working devices are accepted; just mention the condition when you book.",
      "Can I include mixed electronics?":
        "Yes, a single pickup can cover a mix of item types listed together.",
      "What location details should I send?":
        "Area or address, building name and floor for apartments, and any access notes — a WhatsApp location pin adds precision.",
      "Do I need to pack items?":
        "Most items don't need packing — just have them accessible. Small items and batteries are easier in a bag.",
      "Can heavy items be collected?":
        "Yes, with advance notice — mention size, weight and floor/lift access when you first message.",
      "Is pickup available outside Kochi?":
        `${SERVICE_AREA_LINE}`,
      "What happens after pickup?":
        "Items are sorted, data-bearing devices go through data handling if requested, batteries are separated, and materials are routed to reuse, resale or recycling as appropriate.",
    },
    extraRelatedLinks: [
      { label: "Book Pickup", href: "/pickup/" },
      { label: "Electronics Recycling Near Me", href: "/services/electronics-recycling-near-me/" },
    ],
  },

  // ─── 3. Sell Old Electronics ────────────────────────────────────────────
  {
    clusterSlug: "sell-old-electronics",
    keyTakeaways: [
      "Working and non-working devices can both have value — ask either way.",
      "Quotes are condition-based, confirmed after inspection, not fixed in advance.",
      "Wipe your data before handover, or ask about data destruction support.",
      "You can always choose recycling instead if the quote doesn't work for you.",
    ],
    modules: [
      {
        keywords: /value|worth|factor|affect/i,
        heading: "What actually drives value",
        body: "Working condition, age, specifications, physical condition and current market demand all factor into a quote. Brand and model matter less on their own than whether the device actually powers on and functions normally.",
      },
      {
        keywords: /photo|quote|estimate/i,
        heading: "Getting an accurate quote",
        body: "Clear photos and an honest condition description — front, back, any damage — lead to a more reliable preliminary estimate. The confirmed number is always set at inspection, since condition can look different once the item is actually seen.",
      },
      {
        keywords: /data|wipe|privacy|personal/i,
        heading: "Data comes first",
        body: "Before selling any device with storage, back up what you want to keep and either wipe it yourself or ask about data destruction support. This applies to laptops, phones and tablets alike, working or not.",
      },
      {
        keywords: /broken|damaged|non.working|repair/i,
        heading: "Broken devices still have value",
        body: "A device that doesn't power on isn't automatically worthless — component and scrap value can still apply. Describe the condition honestly rather than assuming it disqualifies the item.",
      },
      {
        keywords: /office|bulk|business/i,
        heading: "Selling in bulk",
        body: "Clearing out multiple devices from an office upgrade is common — share the full list with quantities for a consolidated quote rather than handling items one at a time.",
      },
      {
        keywords: /recycl.*better|when.*recycl|instead of sell/i,
        heading: "When recycling makes more sense",
        body: "Very old, badly damaged, or extremely low-demand devices may be better suited to straightforward recycling than the extra step of a resale conversation. If a quote comes back lower than expected, recycling is always the fallback with no obligation.",
      },
    ],
    faqAnswers: {
      "Can I sell old electronics in Kochi?":
        "Yes. Message the device type, condition and photos on WhatsApp for a preliminary quote, then arrange doorstep pickup and payment if you accept it.",
      "What electronics may have resale value?":
        "Laptops, phones, tablets and some desktop components most commonly have resale value, but it depends on condition and demand — ask about any specific device.",
      "Can broken electronics be sold?":
        "Yes, non-working devices can still have component or scrap value. Mention the condition honestly when you message.",
      "How is quote value decided?":
        `${QUOTE_LINE}`,
      "Is the quote guaranteed?":
        "A preliminary estimate is possible from photos and details, but the final number is confirmed after physical inspection.",
      "What photos should I send?":
        "Front and back of the device, the screen if applicable, and any visible damage.",
      "Can I sell old laptops?":
        "Yes, working and non-working laptops are both accepted for a condition-based quote.",
      "Can I sell mobile phones?":
        "Yes, phones are accepted for resale quotes — mention brand, age and condition.",
      "Can offices sell bulk electronics?":
        "Yes, message the full list with quantities for a consolidated quote.",
      "What affects old laptop value?":
        "Working condition, age, specifications, screen and battery health, and whether the original charger is included.",
      "Should I remove data first?":
        "Yes, ideally before handover. Data destruction support is available if you'd rather not handle it yourself.",
      "Is resale better than recycling?":
        "For working devices, resale is usually worth checking first since it captures more value than recycling. Non-working or very old devices are often better suited to recycling.",
      "What happens if the item has no value?":
        "It can still be recycled responsibly at no cost to you — there's no obligation to sell just because you sent details.",
      "Can batteries be sold?":
        "Batteries are generally handled through battery recycling rather than resale, given the different safety and handling requirements.",
      "Are cables and accessories accepted?":
        "Yes, and including original accessories like a charger can add a small amount to a device's quote.",
      "Does pickup depend on quantity?":
        `${PICKUP_LINE}`,
      "Is cash guaranteed?":
        "Payment is arranged once a quote is accepted, confirmed at the time of inspection rather than promised in advance.",
      "What is condition-based value?":
        "It means the quote reflects the device's actual working status, physical condition and completeness rather than a flat rate by model alone.",
      "How do I avoid unsafe buyers?":
        "Ask how data is handled before sale, whether documentation is available, and be cautious of a buyer offering a fixed price without ever inspecting the item.",
      "How do I request a quote?":
        "Message the item type, condition and photos on WhatsApp for a preliminary estimate.",
    },
    extraRelatedLinks: [
      { label: "Sell Electronics", href: "/sell-electronics/" },
      { label: "Scrap Price Guide", href: "/e-waste-scrap-prices-kochi/" },
    ],
  },

  // ─── 4. Battery Recycling ───────────────────────────────────────────────
  {
    clusterSlug: "battery-recycling",
    keyTakeaways: [
      "Batteries should never be mixed with general household or e-waste bins.",
      "Swollen, leaking or damaged batteries need photos before pickup.",
      "Lead-acid (UPS/inverter) and lithium batteries carry different risks.",
      "Keep batteries dry, upright and away from heat until collected.",
    ],
    modules: [
      {
        keywords: /swollen|leak|damaged|risk|fire/i,
        heading: "Damaged batteries need extra care",
        body: "A swollen battery has already started to fail internally — don't puncture it, don't try to flatten it back into shape, and keep it away from other items and heat. Photograph it and flag it specifically when booking so the team can plan safe handling.",
      },
      {
        keywords: /ups|inverter|lead.acid/i,
        heading: "UPS and inverter batteries",
        body: "These are heavy, sealed lead-acid batteries and one of the largest single battery items most households or offices deal with. Keep them upright, note the approximate size, and mention floor or lift access if they need to be moved.",
      },
      {
        keywords: /lithium|laptop battery|mobile|phone battery|power bank/i,
        heading: "Lithium batteries",
        body: "Laptop, phone and power bank batteries use lithium-ion cells, which carry a different risk profile from lead-acid — they can swell or, if damaged, pose a fire risk. Keep them separate from lead-acid batteries as well as from general electronics.",
      },
      {
        keywords: /store|storage|before collection|safe/i,
        heading: "Safe storage before pickup",
        body: "Keep batteries dry, away from direct heat and sunlight, and don't stack heavy items on top. Separate anything visibly damaged from healthy batteries rather than storing them together.",
      },
      {
        keywords: /office|business|bulk/i,
        heading: "Battery pickup for offices",
        body: "Offices with UPS rooms or multiple backup batteries can request bulk pickup — mention the quantity and types so the visit can be planned for the right vehicle and handling.",
      },
      {
        keywords: /mistake|avoid|should not/i,
        heading: "Common mistakes to avoid",
        body: "Throwing any battery into household waste, storing damaged cells in a closed cupboard, and mixing UPS batteries in with mixed electronic scrap are the most common — and most avoidable — issues.",
      },
    ],
    faqAnswers: {
      "Where can I recycle batteries in Kochi?":
        "Book a pickup with Ewaste Kochi for UPS, inverter, laptop, mobile and lithium batteries — mention the type and condition on WhatsApp.",
      "Are UPS batteries accepted?":
        "Yes, sealed lead-acid UPS batteries are accepted — note the approximate size and quantity when booking.",
      "Are inverter batteries accepted?":
        "Yes, inverter batteries are accepted and handled with the same care as UPS batteries.",
      "Are lithium batteries accepted?":
        "Yes, lithium-ion batteries from laptops, phones and power banks are accepted, handled separately from lead-acid types.",
      "What should I do with swollen batteries?":
        "Don't puncture or move it more than necessary — keep it in a cool, ventilated spot away from other items and flag it with a photo before pickup.",
      "Can leaking batteries be collected?":
        "Yes — place it in a sealed plastic bag if possible and flag it clearly when booking.",
      "Should I send battery photos?":
        "Yes, especially for anything swollen, leaking or damaged — it helps the team plan safe handling in advance.",
      "Can batteries be mixed with other e-waste?":
        "They can be collected in the same visit but must be kept physically separate throughout, since they're processed differently.",
      "How should batteries be stored?":
        "Keep them dry, upright, away from heat, and don't stack heavy items on top before pickup.",
      "Are laptop batteries accepted?":
        "Yes, both batteries still inside a laptop and removed battery packs are accepted.",
      "Are mobile batteries accepted?":
        "Yes, phone batteries are accepted, whether removed or still inside the device.",
      "Are power banks accepted?":
        "Yes, power banks are accepted — flag any that are swollen, hot, or no longer charging properly.",
      "Is battery pickup available for offices?":
        "Yes, including bulk pickup for UPS rooms and server room batteries.",
      "Is battery recycling free?":
        `${PICKUP_LINE}`,
      "What affects pickup feasibility?":
        `${PICKUP_LINE}`,
      "Can damaged batteries be recycled?":
        "Yes, damaged batteries are accepted but need to be flagged in advance for safe handling.",
      "What should I not do with batteries?":
        "Don't throw them in household waste, don't puncture a swollen cell, and don't mix damaged batteries in with healthy ones.",
      "Are batteries hazardous?":
        "Damaged batteries specifically carry fire and chemical risk, which is why they're always processed separately from general electronics.",
      "How do I book battery pickup?":
        "Message the battery type, quantity and condition on WhatsApp, with photos for anything damaged.",
      "What happens after battery collection?":
        "Batteries are kept separate from general e-waste throughout and routed to processing appropriate to their chemistry — lead-acid and lithium are handled differently.",
    },
    extraRelatedLinks: [
      { label: "Battery Recycling", href: "/battery-recycling/" },
      { label: "Book Pickup", href: "/pickup/" },
    ],
  },

  // ─── 5. Laptop & Computer Recycling ─────────────────────────────────────
  {
    clusterSlug: "laptop-computer-recycling",
    keyTakeaways: [
      "Working laptops may have resale value — check before recycling.",
      "Data should be wiped or destroyed before the device leaves your hands.",
      "A broken screen or dead battery doesn't disqualify a device from pickup.",
      "Offices clearing multiple computers should share a rough count upfront.",
    ],
    modules: [
      {
        keywords: /resale|sell|value|worth/i,
        heading: "Resale or recycling",
        body: "If a laptop or desktop still powers on and functions, it's worth checking resale value before assuming recycling is the only option. Non-working or severely outdated devices are the clearer candidates for straightforward recycling.",
      },
      {
        keywords: /data|wipe|hard drive|privacy/i,
        heading: "Data comes before anything else",
        body: "Computers are one of the most common sources of leftover personal or business data. A factory reset removes a lot, but for certainty — especially on a device that held business files — ask about data destruction before the device changes hands.",
      },
      {
        keywords: /monitor|screen|display/i,
        heading: "Monitors and displays",
        body: "Monitors are accepted alongside computers, including CRT and LCD types. Note the approximate size, and flag any cracked or damaged screens when booking.",
      },
      {
        keywords: /accessor|keyboard|mouse|cable/i,
        heading: "Accessories and peripherals",
        body: "Keyboards, mice, cables and docking stations can be included with a computer pickup or recycled on their own — no need to sort them separately from the main device.",
      },
      {
        keywords: /office|business|IT team|bulk/i,
        heading: "Office computer pickups",
        body: "Clearing out multiple computers from an office is common during upgrades — share the rough count and whether data destruction documentation is needed, since this often routes through ITAD rather than a standard pickup.",
      },
      {
        keywords: /student|home user/i,
        heading: "For students and home users",
        body: "A single old laptop is a straightforward pickup — no need to wait for a larger batch. Back up what you need, wipe accounts and personal files, and book whenever it's convenient.",
      },
      {
        keywords: /broken|damaged|not (turning|powering) on/i,
        heading: "Broken or non-working computers",
        body: "A cracked screen, dead battery, or a laptop that won't power on doesn't stop it from being collected — it may still have component or scrap value. Mention the condition honestly when you book.",
      },
    ],
    faqAnswers: {
      "Can laptops be recycled?":
        "Yes, working and non-working laptops are both accepted — mention the condition when you book.",
      "Can old computers be recycled?":
        "Yes, desktops, towers and all-in-ones are accepted alongside laptops.",
      "Should I remove data first?":
        "Yes, ideally before handover. Back up what you need and factory reset or wipe the device, or ask about data destruction support.",
      "Can broken laptops be collected?":
        "Yes, a broken screen or non-working laptop is still accepted and may have component value.",
      "Can monitors be recycled?":
        "Yes, LCD, LED and CRT monitors are all accepted.",
      "Are keyboards and mice accepted?":
        "Yes, they can be included with a computer pickup or recycled separately.",
      "Can computer accessories be recycled?":
        "Yes, cables, docking stations and other accessories are accepted.",
      "Can offices recycle old PCs?":
        "Yes, share a rough count and whether data destruction documentation is needed for larger jobs.",
      "What affects laptop value?":
        "Working condition, age, specifications, screen and battery health, and whether original accessories are included.",
      "Is resale better than recycling?":
        "For a working device, resale is usually worth checking first — non-working or very old devices are typically better suited to recycling.",
      "Can hard drives be destroyed?":
        "Yes, data destruction — wiping, degaussing or physical shredding — is available for hard drives on request.",
      "What should I remove before pickup?":
        "Personal accounts, saved passwords, and any accessories you want to keep for yourself.",
      "Should I send photos?":
        "It helps, especially for damaged devices or larger office quantities.",
      "Can desktops be picked up?":
        "Yes, desktop towers are accepted alongside laptops and monitors.",
      "Are printers included?":
        "Printers can be included in the same pickup as computers — mention them in your item list.",
      "Is pickup available in Kochi?":
        `${SERVICE_AREA_LINE}`,
      "Can students recycle old laptops?":
        "Yes, a single laptop is a straightforward pickup with no minimum quantity.",
      "Can old CPUs be sold?":
        "Yes, desktop towers and components can have resale or scrap value depending on specifications and condition.",
      "How do I prepare a computer for pickup?":
        "Back up your files, sign out of accounts, factory reset or wipe the drive, and remove anything you want to keep like an external drive.",
      "How do I book laptop recycling?":
        "Message the device type, condition and location on WhatsApp.",
    },
    extraRelatedLinks: [
      { label: "Computer Scrap Buyers", href: "/computer-scrap-buyers-kochi/" },
      { label: "Data Destruction", href: "/data-destruction/" },
    ],
  },

  // ─── 6. TV, Monitor & Appliance Disposal ────────────────────────────────
  {
    clusterSlug: "tv-monitor-appliance-disposal",
    keyTakeaways: [
      "CRT, LED, LCD and plasma TVs are all accepted for recycling.",
      "CRT sets are heavy and need advance notice, especially without lift access.",
      "Broken screens and damaged casings don't disqualify an item from pickup.",
      "Small appliances with a plug, motor or circuit board count as e-waste too.",
    ],
    modules: [
      {
        keywords: /crt|heavy|weight|large/i,
        heading: "CRT and heavy displays",
        body: "Older CRT televisions and monitors are significantly heavier than flat screens and contain leaded glass. Mention the approximate size and whether there's lift access when booking so the visit can be planned properly.",
      },
      {
        keywords: /broken|damaged|crack|screen/i,
        heading: "Broken screens",
        body: "A cracked or non-functional screen doesn't stop a TV or monitor from being collected — a piece of cardboard over sharp edges is helpful but not required. Flag the damage when you book so the team knows what to expect.",
      },
      {
        keywords: /appliance|kitchen|small appliance/i,
        heading: "Small appliances count too",
        body: "Any appliance with a plug, battery, circuit board or motor is e-waste — mixers, kettles, irons and similar items are accepted alongside TVs and monitors, not just large electronics.",
      },
      {
        keywords: /apartment|flat/i,
        heading: "TV disposal for apartments",
        body: "Apartment pickups for TVs and monitors work the same as any other pickup — mention floor and lift access, since larger displays are harder to move without one.",
      },
      {
        keywords: /office|business/i,
        heading: "Office monitor recycling",
        body: "Offices replacing multiple monitors at once can request a bulk pickup — a rough count is enough to get started.",
      },
      {
        keywords: /repair|resale|resale value/i,
        heading: "Repair or resale first?",
        body: "A working TV or monitor with no major issues may be worth checking for resale before recycling. Once a display has failed or the repair cost outweighs the value, recycling is the more practical route.",
      },
    ],
    faqAnswers: {
      "Can old TVs be recycled?":
        "Yes, CRT, LED, LCD and plasma TVs are all accepted.",
      "Can broken TVs be collected?":
        "Yes, a broken or non-functional TV is still accepted — mention the damage when booking.",
      "Are monitors accepted?":
        "Yes, LCD, LED and CRT monitors are all accepted.",
      "What photos should I send?":
        "A photo of the screen condition and the back panel showing ports helps confirm pickup faster.",
      "Is pickup available for large TVs?":
        "Yes, with advance notice for size and access — mention approximate screen size and floor/lift details.",
      "Can damaged screens be recycled?":
        "Yes, cracked or non-functional screens are accepted.",
      "Are remotes and cables accepted?":
        "Yes, they can be included with the TV or monitor pickup.",
      "Can offices recycle monitors?":
        "Yes, bulk monitor pickups are supported for offices replacing multiple units.",
      "Does TV pickup depend on location?":
        `${SERVICE_AREA_LINE}`,
      "Can apartments request TV pickup?":
        "Yes, mention floor and lift access since larger displays are harder to move without one.",
      "Should I pack the TV?":
        "Original packaging helps if you still have it, but it isn't required — the team can handle unpackaged units.",
      "Can CRT TVs be collected?":
        "Yes, though they're heavier — mention approximate size and access details in advance.",
      "Can LED TVs be collected?":
        "Yes, LED and LCD TVs are lighter and straightforward to collect.",
      "Is there a quote for TV scrap?":
        `${QUOTE_LINE}`,
      "What affects pickup feasibility?":
        `${PICKUP_LINE}`,
      "Can appliances be collected with e-waste?":
        "Yes, small appliances with a plug, battery or motor can be included in the same pickup.",
      "What should I avoid before pickup?":
        "Avoid leaving the TV in a spot with no clear access path, and don't assume a working display has zero resale value without checking.",
      "Is repair better than recycling?":
        "For a working display with a minor issue, repair may be worth exploring first. Once it's failed or repair costs too much, recycling is the practical route.",
      "How do I book TV disposal?":
        "Message the TV type, approximate size, condition and location on WhatsApp.",
      "What happens after TV collection?":
        "Materials are separated for recovery — glass, metals and plastics are processed appropriately, with hazardous components like CRT glass handled through authorized channels.",
    },
    extraRelatedLinks: [
      { label: "TV Recycling", href: "/tv-recycling-kochi/" },
      { label: "E-Waste Recycling", href: "/recycling/" },
    ],
  },

  // ─── 7. Data Destruction & ITAD ─────────────────────────────────────────
  {
    clusterSlug: "data-destruction-itad",
    keyTakeaways: [
      "A factory reset alone is not the same as certified data destruction.",
      "Method depends on the device and whether it will be reused.",
      "Documentation may be available for business requests — ask upfront.",
      "Raise data destruction needs before pickup, not after.",
    ],
    modules: [
      {
        keywords: /method|wipe|degauss|shred/i,
        heading: "The three main methods",
        body: "Wiping (overwriting data) suits drives that will be reused or resold. Degaussing scrambles magnetic media that won't be reused. Physical shredding is for drives that must never be readable again. Which one applies depends on the device and what happens to it afterward.",
      },
      {
        keywords: /certificate|documentation|proof|audit/i,
        heading: "Documentation for businesses",
        body: "Documentation covering what was destroyed and how may be available depending on the service type and what's agreed in advance. Raise this requirement at the start of the conversation, since it shapes which method and process gets used.",
      },
      {
        keywords: /server|itad|enterprise|business/i,
        heading: "ITAD for larger deployments",
        body: "Offices retiring computers, servers or storage arrays usually need more than a one-off wipe — an asset list, a documented handling process, and a clear record of what happened to each device. This is what ITAD combines into a single process.",
      },
      {
        keywords: /ssd|hard drive|hdd/i,
        heading: "SSDs vs traditional hard drives",
        body: "Solid-state drives don't behave the same way as spinning hard drives when it comes to data destruction — some wiping methods that work well for one don't apply cleanly to the other. Mention the drive type so the right method gets recommended.",
      },
      {
        keywords: /deleted|delete|gone|recoverable/i,
        heading: "Why \"deleted\" doesn't mean gone",
        body: "Deleting a file typically just removes the pointer to it — the actual data often remains on the drive until it's overwritten by something else, which may never happen on a drive headed for recycling. This is the gap genuine data destruction closes.",
      },
      {
        keywords: /chain of custody|custody|tracking/i,
        heading: "Chain of custody",
        body: "For business disposals, a documented chain of custody tracks a device from collection through to final processing, giving an auditable record of what happened and when — relevant for compliance-driven disposal.",
      },
    ],
    faqAnswers: {
      "What is data destruction?":
        "The process of making data on a storage device unrecoverable — through wiping, degaussing, or physical shredding — before it's recycled, resold or disposed of.",
      "Which devices need data destruction?":
        "Any device with storage: laptops, desktops, hard drives, SSDs, servers, and some printers or network devices with internal memory.",
      "What is hard drive shredding?":
        "Physical destruction of the drive using industrial equipment, rendering the platters permanently unreadable — one of the most secure destruction methods.",
      "What is degaussing?":
        "Using a strong magnetic field to scramble data on magnetic media, suited to drives that won't be reused afterward.",
      "Is overwriting different from shredding?":
        "Yes. Overwriting (wiping) makes a drive reusable afterward; shredding physically destroys it so it can never be reused or read again.",
      "Can laptops need data destruction?":
        "Yes, any laptop with a hard drive or SSD can go through data destruction on request.",
      "Can servers need data destruction?":
        "Yes, server storage is a common candidate for certified destruction, particularly for compliance-driven disposal.",
      "Is documentation available?":
        "Documentation may be available depending on the service type — raise this requirement when you first get in touch.",
      "What is chain of custody?":
        "A documented record tracking a device from collection through to final processing, used for compliance and audit purposes.",
      "Should businesses prepare an asset list?":
        "Yes, it helps streamline larger jobs — device type, model and quantity is usually enough detail.",
      "Can offices book bulk data destruction?":
        "Yes, this typically routes through ITAD, which combines bulk collection with data destruction and documentation.",
      "What should I remove before pickup?":
        "Back up anything you want to keep — once a drive is wiped or destroyed, the data can't be recovered.",
      "Can SSDs be destroyed?":
        "Yes, though the method differs from traditional hard drives — mention the drive type so the right approach is used.",
      "Is data destruction legal advice?":
        `${COMPLIANCE_LINE}`,
      "Can I get a certificate sample?":
        "Contact us directly to see what documentation looks like for the specific service you need.",
      "What affects service feasibility?":
        `${PICKUP_LINE}`,
      "How do I prepare hard drives?":
        "Back up any data you want to keep, and mention whether the drive is functional or physically damaged.",
      "Is recycling enough for data-bearing devices?":
        "No — recycling processes materials after data is removed. Data destruction is a separate, specific step that should happen first.",
      "How do I request data destruction?":
        "Message what you have (hard drives, laptops, servers) and the sensitivity level for a recommended method.",
      "What happens after data destruction?":
        "The device or drive is then routed to standard recycling once data has been confirmed handled according to the agreed method.",
    },
    extraRelatedLinks: [
      { label: "Data Destruction", href: "/data-destruction/" },
      { label: "ITAD for Business", href: "/itad/" },
    ],
  },

  // ─── 8. Business / Corporate E-Waste ────────────────────────────────────
  {
    clusterSlug: "business-corporate-ewaste",
    keyTakeaways: [
      "Bulk office pickups need more planning than a household pickup.",
      "An asset list, even rough, speeds up quoting and scheduling.",
      "Data-bearing devices should be flagged before, not during, pickup.",
      "Documentation availability depends on the service and what's agreed.",
    ],
    modules: [
      {
        keywords: /asset|inventory|list/i,
        heading: "Asset lists speed everything up",
        body: "A rough count by device type — desktops, laptops, servers, UPS units — is enough to start planning a bulk pickup. Raising documentation or compliance requirements early shapes how the visit gets structured.",
      },
      {
        keywords: /server|network|ups/i,
        heading: "Servers and network equipment",
        body: "Server racks, UPS systems and networking gear are all part of typical corporate pickups, alongside desktops and laptops. Flag these specifically so the team can plan for weight and access.",
      },
      {
        keywords: /lead time|schedule|planning|coordinat/i,
        heading: "Why office pickups need more lead time",
        body: "A household pickup can often be arranged within a day or two. Office pickups usually involve more coordination — building access approvals, the right vehicle for the volume, and sometimes a specific loading dock or time window.",
      },
      {
        keywords: /documentation|compliance|audit|record/i,
        heading: "Documentation and compliance",
        body: "For offices that need a record of what was collected — common for internal audit or compliance purposes — an inventory-style pickup can capture asset details as part of the process. Raise this early since it changes how the pickup is structured.",
      },
      {
        keywords: /small business|small office|shop/i,
        heading: "Small businesses and shops",
        body: "You don't need enterprise-scale quantities to request a corporate-style pickup — small offices and shops with a handful of devices are welcome to the same process, just at a smaller scale.",
      },
      {
        keywords: /mistake|avoid/i,
        heading: "Mistakes that slow things down",
        body: "Underestimating quantities when first reaching out, and not mentioning data-bearing devices until the team arrives, are the two most common issues that create delays on pickup day.",
      },
    ],
    faqAnswers: {
      "Can companies book e-waste pickup?":
        "Yes, corporate pickups are a standard part of the service for offices of any size.",
      "What items can offices include?":
        "Desktops, laptops, monitors, servers, UPS systems, network equipment, printers and general IT peripherals.",
      "Is bulk pickup available?":
        "Yes, share rough quantities in advance so a dedicated visit can be planned.",
      "Should we prepare an asset list?":
        "It helps — device type, model and quantity is usually enough detail to start.",
      "Is documentation available?":
        "Documentation may be available depending on the service type — raise this requirement early.",
      "Can servers be collected?":
        "Yes, along with racks, UPS systems and networking gear.",
      "Can UPS systems be collected?":
        "Yes, UPS and backup batteries are accepted as part of corporate pickups.",
      "Can network devices be collected?":
        "Yes, switches, routers and related networking equipment are accepted.",
      "Is data destruction available?":
        "Yes, for data-bearing devices — mention this requirement when planning the pickup.",
      "Can small businesses use ITAD?":
        "Yes, ITAD-style handling is available at smaller scale for small businesses and shops too.",
      "Does pickup depend on quantity?":
        `${PICKUP_LINE}`,
      "Can offices request scheduled pickup?":
        "Yes, recurring or scheduled arrangements can be discussed for regular office turnover.",
      "What should IT teams prepare?":
        "A rough asset list, data-bearing device flags, and any access or building requirements.",
      "Are printers accepted?":
        "Yes, printers and multifunction devices are accepted alongside other office IT equipment.",
      "Are batteries accepted?":
        "Yes, UPS and other office batteries are accepted, kept separate from general electronics.",
      "Is pickup available in Kochi?":
        `${SERVICE_AREA_LINE}`,
      "Can shops request pickup?":
        "Yes, shops and small businesses can request the same pickup process as larger offices.",
      "What affects quote or pickup?":
        `${PICKUP_LINE}`,
      "What happens after collection?":
        "Items are sorted, data destruction is applied where requested, and materials are routed to reuse, resale or compliant recycling.",
      "How do businesses book?":
        "Message rough quantities, device types and any data destruction needs on WhatsApp to start planning.",
    },
    extraRelatedLinks: [
      { label: "ITAD for Business", href: "/itad/" },
      { label: "Asset Inventory Audit", href: "/services/it-asset-inventory-audit/" },
    ],
  },

  // ─── 9. Kerala E-Waste Rules & Compliance ───────────────────────────────
  {
    clusterSlug: "kerala-ewaste-rules-compliance",
    keyTakeaways: [
      "This content is general educational information, not legal advice.",
      "Formal compliance obligations sit mainly with producers and recyclers, not individual consumers.",
      "A legitimate recycler should answer authorization questions clearly and directly.",
      "For anything you need to rely on formally, check official sources or a qualified advisor.",
    ],
    modules: [
      {
        keywords: /epr|extended producer/i,
        heading: "What EPR means",
        body: "Extended Producer Responsibility is the idea that manufacturers, brand owners and importers of electronics share responsibility for what happens to products once discarded — not just consumers who eventually throw them away.",
      },
      {
        keywords: /rules 2022|e-waste rules|framework/i,
        heading: "The regulatory framework",
        body: "India's e-waste rules set out registration requirements for producers, recyclers and dismantlers, along with collection and recycling obligations. Compliance monitoring runs through the Central Pollution Control Board and state boards like KSPCB.",
      },
      {
        keywords: /consumer|individual|household/i,
        heading: "What this means for individuals",
        body: "Formal compliance obligations sit mainly with producers and recyclers rather than individual consumers. Choosing a recycler that operates within this formal system still matters, since it affects how your e-waste is actually handled downstream.",
      },
      {
        keywords: /business|documentation|record/i,
        heading: "What businesses should know",
        body: "Keeping a record of how IT assets and e-waste were disposed of — what was collected and where it went — is good practice for internal audits and client assurance, even where it isn't always a strict legal requirement.",
      },
      {
        keywords: /informal|check|verify|legitimate|authoriz/i,
        heading: "Checking a recycler is legitimate",
        body: "Ask directly about authorization status, how data is handled, and whether documentation is available. A legitimate recycler answers these clearly; vague or evasive responses are a warning sign.",
      },
      {
        keywords: /dismantler|recycler|difference/i,
        heading: "Recycler vs dismantler",
        body: "Recyclers process materials for recovery under required environmental standards; dismantlers break down devices into components. Both roles have registration requirements within the same regulatory system.",
      },
    ],
    faqAnswers: {
      "What are the E-Waste Rules 2022?":
        "India's updated e-waste regulatory framework, centred on Extended Producer Responsibility, replacing the earlier 2016 rules with a stronger compliance structure.",
      "What is EPR?":
        "The principle that producers of electronics share responsibility for collection and recycling of their products at end of life.",
      "Is this legal advice?":
        `${COMPLIANCE_LINE}`,
      "Who regulates e-waste in India?":
        "The Ministry of Environment, Forest and Climate Change and the Central Pollution Control Board, with state boards like KSPCB at the state level.",
      "What should consumers know?":
        "That formal compliance sits mainly with producers and recyclers, but choosing a legitimate, authorized recycler still affects how e-waste is handled downstream.",
      "What should businesses know?":
        "That documented, compliant disposal — an asset list, data handling record, and where applicable a destruction certificate — is good practice for audits and client assurance.",
      "What is responsible recycling?":
        "Routing e-waste through registered, authorized channels that follow required handling and reporting standards, rather than informal scrap dealers.",
      "What is informal disposal?":
        "Handling by unregistered scrap dealers who typically skip environmental safeguards and documentation.",
      "How do I check a recycler?":
        "Ask about their authorization status, data handling process, and documentation options — a legitimate operator answers clearly.",
      "What documents may be needed?":
        "Depending on the service, a pickup record or data destruction certificate may be available on request.",
      "Do individuals need compliance documents?":
        "Rarely — this applies mainly to businesses for internal audit or client assurance purposes.",
      "Do businesses need records?":
        "Often useful, though not always a strict legal requirement — check with official sources for your specific situation.",
      "Are batteries covered separately?":
        "Yes, batteries fall under their own handling requirements distinct from general e-waste, given the different safety considerations.",
      "What is a recycler?":
        "An operator authorized to process e-waste for material recovery under required environmental standards.",
      "What is a dismantler?":
        "An operator that breaks devices into components, typically as part of the wider authorized recycling chain.",
      "What is documentation?":
        "Records — such as a pickup receipt or destruction certificate — confirming what was collected and how it was handled.",
      "What should I ask before pickup?":
        "Authorization status, data handling process, and what documentation (if any) will be provided.",
      "Are Kerala rules different?":
        "Kerala follows the national framework, with the Kerala State Pollution Control Board handling state-level oversight — verify specifics with official sources.",
      "Where should I verify rules?":
        "The Ministry of Environment, Forest and Climate Change and Central Pollution Control Board publish official guidance directly.",
      "How do I stay safe?":
        "Choose a recycler who answers authorization and data-handling questions clearly, and keep records of what you hand over if it matters for your situation.",
    },
    extraRelatedLinks: [
      { label: "E-Waste Management Rules 2022", href: "/blog/e-waste-management-rules-2022/" },
      { label: "Trust & Compliance", href: "/trust/" },
    ],
  },

  // ─── 10. Local Kochi Area Guides ────────────────────────────────────────
  {
    clusterSlug: "local-kochi-area-guides",
    keyTakeaways: [
      "Most Kochi-metro addresses are serviceable — message to confirm yours.",
      "Kakkanad, Kalamassery and Ernakulam South have dedicated location pages.",
      "A precise address or WhatsApp location pin speeds up confirmation.",
      "Areas outside the core Kochi-metro zone should always be checked first.",
    ],
    modules: [
      {
        keywords: /kakkanad|infopark|smartcity/i,
        heading: "Kakkanad and Infopark area",
        body: "Kakkanad, including the Infopark and SmartCity zones, is a core part of the service area covering both residential and office pickups.",
      },
      {
        keywords: /kalamassery/i,
        heading: "Kalamassery",
        body: "Kalamassery is a core service area with a dedicated location page — homes, apartments and small offices in the area are all covered.",
      },
      {
        keywords: /ernakulam south/i,
        heading: "Ernakulam South",
        body: "Ernakulam South is a core service area with a dedicated location page, including areas near the railway station and central Ernakulam.",
      },
      {
        keywords: /aluva/i,
        heading: "Aluva",
        body: "Aluva town and surrounding residential areas are within the Kochi-metro service zone — message your specific area to confirm.",
      },
      {
        keywords: /feasib|check|serviceable|confirm/i,
        heading: "Checking your specific area",
        body: "The fastest way to confirm coverage is to message your address or area name on WhatsApp — most Kochi-metro addresses are serviceable, and confirmation is usually quick.",
      },
      {
        keywords: /apartment|flat|office|business/i,
        heading: "Apartments and offices",
        body: "Both residential and commercial pickups are supported across the service area — include building name and floor, or business address, when you message.",
      },
    ],
    faqAnswers: {
      "Which Kochi areas are supported?":
        `${SERVICE_AREA_LINE}`,
      "Is Kakkanad supported?":
        "Yes, Kakkanad including Infopark and SmartCity areas is a core service zone with a dedicated location page.",
      "Is Kalamassery supported?":
        "Yes, Kalamassery is a core service zone with a dedicated location page.",
      "Is Ernakulam South supported?":
        "Yes, Ernakulam South is a core service zone with a dedicated location page.",
      "Is Aluva supported?":
        "Yes, Aluva is within the Kochi-metro service zone — message your specific area to confirm.",
      "Is Infopark nearby pickup possible?":
        "Yes, the Infopark and surrounding Kakkanad business area is covered for both office and residential pickups.",
      "Is pickup guaranteed in every area?":
        `${PICKUP_LINE}`,
      "How do I check area feasibility?":
        "Message your address or area name on WhatsApp for a quick confirmation.",
      "Should I share location?":
        "Yes, a specific address or WhatsApp location pin speeds up confirmation significantly.",
      "Can apartments request pickup?":
        "Yes, include building name and floor when you message.",
      "Can offices request pickup?":
        "Yes, business addresses are covered the same way as residential ones.",
      "Are far districts supported?":
        `For districts outside the Kochi metro, contact us to check pickup feasibility — we do not currently guarantee pickup in those areas.`,
      "What is Kochi-metro enquiry area?":
        "The broader zone around Kochi and Ernakulam district where pickup is typically feasible, beyond the specific areas with dedicated pages.",
      "Does quantity affect pickup?":
        `${PICKUP_LINE}`,
      "Does location affect quote?":
        `${QUOTE_LINE}`,
      "Can I request pickup from nearby towns?":
        "Message the specific area name and we'll confirm feasibility rather than assuming coverage either way.",
      "What if my area is not listed?":
        "Most Kochi-metro addresses are still serviceable even without a dedicated page — message to confirm.",
      "How do I send map location?":
        "Use WhatsApp's location-sharing feature to send a precise pin alongside a text description of the building.",
      "Are local pages available?":
        "Yes, for Kakkanad, Kalamassery and Ernakulam South — other areas are confirmed individually on request.",
      "How do I book?":
        "Message your area, item list and photos on WhatsApp to get started.",
    },
    extraRelatedLinks: [
      { label: "Locations", href: "/locations/" },
      { label: "Kakkanad Location", href: "/locations/kakkanad/" },
    ],
  },

  // ─── 11. Mobile & Small Device Recycling ────────────────────────────────
  {
    clusterSlug: "mobile-small-device-recycling",
    keyTakeaways: [
      "Factory reset and sign out of accounts before handing over any phone.",
      "Small items like chargers and earbuds are e-waste too — include them.",
      "Working phones may have resale value — check before recycling.",
      "Swollen batteries in any small device should never be removed yourself.",
    ],
    modules: [
      {
        keywords: /data|wipe|reset|privacy/i,
        heading: "Data on small devices",
        body: "Phones and tablets store photos, messages, accounts and saved passwords. A factory reset and signing out of accounts (Google, Apple ID, social media) is the essential step before any device changes hands.",
      },
      {
        keywords: /sell|resale|value|worth/i,
        heading: "Resale for phones and tablets",
        body: "A working phone, even a few years old, may still have resale value — brand, model, condition and battery health all factor in. Non-working devices can still have component value.",
      },
      {
        keywords: /battery|swollen|power bank/i,
        heading: "Battery safety in small devices",
        body: "Phone, tablet and power bank batteries are lithium-ion and can swell or become hazardous if damaged. Never attempt to remove a swollen battery yourself — flag it with a photo instead.",
      },
      {
        keywords: /accessor|charger|cable|earbud|headphone/i,
        heading: "Accessories and small accessories",
        body: "Chargers, cables, earbuds and headphones are genuine e-waste, even though they're easy to overlook — include them in the same pickup rather than putting them in general waste.",
      },
      {
        keywords: /family|household/i,
        heading: "For families",
        body: "Households often accumulate phones from several replacement cycles, plus tablets, chargers and dead power banks. Gather everything in one place and wipe data on each device before pickup.",
      },
      {
        keywords: /student/i,
        heading: "For students",
        body: "A single old phone or tablet is a straightforward pickup — no need for a large batch. Wipe accounts and school data before handing the device over.",
      },
    ],
    faqAnswers: {
      "Can old phones be recycled?":
        "Yes, working and non-working phones are both accepted.",
      "Can phones be sold?":
        "Yes, working phones may have resale value depending on brand, model and condition.",
      "Should I remove data first?":
        "Yes, factory reset and sign out of all accounts before handing the device over.",
      "Are tablets accepted?":
        "Yes, tablets are accepted alongside phones for both recycling and resale.",
      "Are chargers accepted?":
        "Yes, chargers and cables are accepted, including on their own without an accompanying device.",
      "Are power banks accepted?":
        "Yes — flag any that are swollen, hot or no longer charging properly.",
      "Are earbuds accepted?":
        "Yes, earbuds and headphones are accepted as part of general e-waste.",
      "Can broken phones be collected?":
        "Yes, a broken or non-working phone is still accepted and may have component value.",
      "What affects phone value?":
        "Brand, model, age, working condition and screen/battery health.",
      "Should I send photos?":
        "It helps for quotes and for anything damaged — front and back photos are usually enough.",
      "Are mobile batteries risky?":
        "A swollen or damaged one carries fire risk — never remove it yourself, flag it with a photo instead.",
      "Can accessories be recycled?":
        "Yes, chargers, cases and cables can all be recycled alongside or separately from the device.",
      "Is pickup available?":
        `${SERVICE_AREA_LINE}`,
      "Can families recycle mixed gadgets?":
        "Yes, a household pickup covering multiple phones, tablets and accessories together is completely normal.",
      "What should I remove before pickup?":
        "SIM cards, memory cards, and anything personal you want to keep like a case.",
      "Is resale better than recycling?":
        "For a working phone, resale is usually worth checking first — non-working devices are typically better suited to recycling.",
      "Can damaged power banks be collected?":
        "Yes, flag any damage or swelling with a photo before pickup.",
      "How do I book mobile recycling?":
        "Message the device type, condition and location on WhatsApp.",
      "What happens after collection?":
        "Devices are assessed for reuse or resale where possible; batteries are separated and processed according to their chemistry.",
      "Can small items be included with other e-waste?":
        "Yes, phones, chargers and other small devices can be included in a general household or office pickup.",
    },
    extraRelatedLinks: [
      { label: "Sell Electronics", href: "/sell-electronics/" },
      { label: "E-Waste Recycling", href: "/recycling/" },
    ],
  },

  // ─── 12. Printer, Scanner & Office Peripheral Recycling ─────────────────
  {
    clusterSlug: "printer-scanner-office-peripheral-recycling",
    keyTakeaways: [
      "Printers, scanners, copiers and routers are all accepted for recycling.",
      "Cartridges don't need to be removed first, but it helps if easily done.",
      "Routers can store Wi-Fi passwords — factory reset before handover.",
      "Mixed peripherals can be collected together, no need to sort by type.",
    ],
    modules: [
      {
        keywords: /printer|scanner|copier/i,
        heading: "Printers, scanners and copiers",
        body: "These are accepted individually or as part of an office clearout. Ink and toner cartridges can stay installed if not easily removable — mention this when booking.",
      },
      {
        keywords: /router|network|wifi|wi-fi/i,
        heading: "Routers and network devices",
        body: "Routers can store Wi-Fi passwords and configuration data — a factory reset through the settings page clears this before the device is handed over.",
      },
      {
        keywords: /keyboard|mouse|peripheral/i,
        heading: "Keyboards, mice and small peripherals",
        body: "These are accepted alongside larger equipment or on their own — no need to sort by type before pickup, general grouping is enough.",
      },
      {
        keywords: /office|business|desk/i,
        heading: "Office peripheral cleanouts",
        body: "A desk or storeroom accumulation of printers, cables and small IT accessories is a common pickup — a rough count by type is enough to plan the visit.",
      },
      {
        keywords: /cartridge|ink|toner/i,
        heading: "Cartridges and consumables",
        body: "Used ink and toner cartridges can be included with a printer pickup or bagged separately to prevent leaks — mention the quantity if you have several.",
      },
    ],
    faqAnswers: {
      "Can printers be recycled?":
        "Yes, printers of all types are accepted.",
      "Are scanners accepted?":
        "Yes, scanners are accepted alongside printers and other office equipment.",
      "Are copiers accepted?":
        "Yes, copiers and multifunction devices are accepted.",
      "Are routers accepted?":
        "Yes — factory reset a router before handing it over, since it can store Wi-Fi and configuration data.",
      "Are keyboards accepted?":
        "Yes, keyboards and mice are accepted individually or with a computer pickup.",
      "Are cables accepted?":
        "Yes, cables and adapters from office peripherals are accepted.",
      "Should cartridges be separated?":
        "It helps to bag them separately to prevent leaks, but they can stay installed if not easily removable.",
      "Can offices request pickup?":
        "Yes, office peripheral cleanouts are a common request — a rough count is enough to start.",
      "Can homes recycle printers?":
        "Yes, home printers are accepted the same way as office equipment.",
      "Should I send photos?":
        "It helps for larger quantities or anything damaged.",
      "What affects pickup feasibility?":
        `${PICKUP_LINE}`,
      "Are network devices accepted?":
        "Yes, routers, switches and related networking equipment are accepted.",
      "Is data stored in routers?":
        "Yes, Wi-Fi credentials and configuration settings — reset the device before handover.",
      "Are peripherals included in ITAD?":
        "Yes, for larger office jobs peripherals can be included as part of an ITAD-style bulk pickup.",
      "Can mixed accessories be collected?":
        "Yes, mixed peripherals can be collected together without needing to sort by type first.",
      "How should offices sort items?":
        "General grouping — printers together, cables together — is enough; detailed sorting isn't required.",
      "Can damaged printers be collected?":
        "Yes, non-working or damaged printers are still accepted.",
      "Is pickup available in Kochi?":
        `${SERVICE_AREA_LINE}`,
      "What happens after collection?":
        "Items are sorted by type and routed to appropriate recycling channels; any data-bearing components are flagged for data handling.",
      "How do I book?":
        "Message the item types, rough quantity and location on WhatsApp.",
    },
    extraRelatedLinks: [
      { label: "E-Waste Recycling", href: "/recycling/" },
      { label: "ITAD for Business", href: "/itad/" },
    ],
  },

  // ─── 13. Environmental Impact & Sustainability ──────────────────────────
  {
    clusterSlug: "environmental-impact-sustainability",
    keyTakeaways: [
      "Electronics mix recoverable value with genuinely hazardous materials.",
      "Reuse and repair reduce e-waste more than recycling alone.",
      "Battery separation is both a safety and an environmental measure.",
      "Small household habits — not mixing e-waste with general trash — add up.",
    ],
    modules: [
      {
        keywords: /landfill|dump|pollution|environment/i,
        heading: "What happens when e-waste is dumped",
        body: "Hazardous substances — lead, mercury, cadmium — can leach into soil and groundwater when electronics end up in landfills. Burning to extract metals, common in informal handling, releases toxic fumes.",
      },
      {
        keywords: /reuse|repair|extend|life/i,
        heading: "Reuse comes before recycling",
        body: "A device that still works and gets reused avoids the energy cost of disassembly and material recovery entirely. Repair, when practical, extends a device's life further still — recycling is the right path only once neither is realistic.",
      },
      {
        keywords: /battery|separat/i,
        heading: "Why battery separation matters environmentally",
        body: "Batteries left in general waste can leak chemicals or, if damaged, cause fires in collection vehicles. Separating them protects both the environment and the people handling waste.",
      },
      {
        keywords: /household|family|home/i,
        heading: "What households can do",
        body: "Small habits make a real difference: don't mix electronics with general trash, separate batteries as you find them, and consider donation or resale before recycling a working device.",
      },
      {
        keywords: /business|office|corporate/i,
        heading: "What businesses can do",
        body: "Routing office e-waste through a compliant recycler, keeping devices out of general waste streams, and choosing reuse or resale for working equipment all reduce a business's e-waste footprint.",
      },
      {
        keywords: /informal|risk/i,
        heading: "Why informal handling is riskier",
        body: "Informal scrap processing typically skips safety measures for both hazardous materials and worker protection. Choosing a compliant recycler avoids this entirely.",
      },
    ],
    faqAnswers: {
      "Why is e-waste a problem?":
        "It mixes valuable recoverable materials with genuinely hazardous substances — mishandling either wastes resources or creates environmental and safety risks.",
      "Why should electronics not be dumped?":
        "Hazardous materials can leach into soil and groundwater, and batteries pose a fire risk when crushed in general waste collection.",
      "How does recycling help?":
        "It recovers valuable materials like copper and aluminium while safely handling hazardous components, rather than losing both to a landfill.",
      "Why should batteries be separated?":
        "Different battery chemistries need different processing, and damaged cells pose a fire risk if mixed with general electronics.",
      "Is reuse better than recycling?":
        "Generally yes, where a device still works — it avoids the energy cost of disassembly and material recovery.",
      "What is responsible disposal?":
        "Routing electronics through an authorized recycler that handles hazardous materials, batteries and data correctly.",
      "What is informal scrap handling?":
        "Processing by unregistered dealers who typically skip environmental and safety safeguards.",
      "Can households reduce e-waste?":
        "Yes — extending device life through care and repair, and choosing reuse or resale over recycling when a device still works.",
      "Can businesses reduce e-waste?":
        "Yes — routing surplus equipment through compliant recyclers and choosing resale for working devices reduces the footprint.",
      "Are environmental statistics needed?":
        "Not for a household decision — the practical steps (don't dump, separate batteries, consider reuse) matter more than specific figures.",
      "Is e-waste unsafe?":
        "Certain components — batteries, older CRT glass, some circuit board materials — carry real risk if mishandled, which is why separate, authorized handling matters.",
      "How does data privacy connect?":
        "Devices dumped without wiping can expose personal data, which is a parallel risk alongside the environmental one.",
      "What should families do?":
        "Keep electronics out of general waste, separate batteries, and consider donation or resale for working devices.",
      "What should offices do?":
        "Route surplus IT equipment through a compliant recycler and consider resale for working devices before recycling.",
      "Can repair reduce e-waste?":
        "Yes, repairing a device with a minor issue extends its life and delays the need for recycling.",
      "Can donation help?":
        "Yes, donating a working device to someone who can use it is a genuine form of reuse.",
      "When is recycling better?":
        "Once a device is broken beyond practical repair or has no further working life left.",
      "What questions should I ask?":
        "Whether the recycler handles batteries separately, how data is managed, and where materials end up.",
      "How do I start responsibly?":
        "Message your item list and location to book a pickup through an authorized recycler rather than an informal collector.",
      "How do I book pickup?":
        "Message your item list, location and photos on WhatsApp.",
    },
    extraRelatedLinks: [
      { label: "Trust & Compliance", href: "/trust/" },
      { label: "E-Waste Recycling", href: "/recycling/" },
    ],
  },

  // ─── 14. Scrap Price Guides & Market Updates ────────────────────────────
  {
    clusterSlug: "scrap-price-guides-market-updates",
    keyTakeaways: [
      "Quotes are confirmed at inspection, not fixed from a description.",
      "Condition, quantity and current market rate all factor into value.",
      "Scrap value and resale value are calculated differently.",
      "Clear photos and honest condition details give the best estimate.",
    ],
    modules: [
      {
        keywords: /market|price change|fluctuat/i,
        heading: "Why prices move over time",
        body: "Scrap value for electronics isn't fixed — it moves with material and component demand, similar to other commodity markets. A quote today can differ from one given months ago for a similar item.",
      },
      {
        keywords: /scrap.*resale|resale.*scrap|difference/i,
        heading: "Scrap value vs resale value",
        body: "Scrap value reflects the materials and components inside a device being recycled. Resale value reflects what a working device sells for as a functioning product — the two aren't calculated the same way.",
      },
      {
        keywords: /photo|condition|estimate/i,
        heading: "What determines a quote",
        body: "Item type, quantity, condition and current market rate all factor in. Clear photos and honest condition details lead to a more reliable preliminary estimate ahead of physical inspection.",
      },
      {
        keywords: /bulk|office|quantity/i,
        heading: "Bulk and office quantities",
        body: "For a larger batch, quotes are usually built from an itemized or estimated list rather than one flat number for everything — a rough breakdown by item type is useful upfront.",
      },
      {
        keywords: /laptop|computer|battery|monitor|tv|mobile/i,
        heading: "Value by item type",
        body: "Different item types carry different value factors — a laptop's value hinges on specs and working condition, a battery's on type and condition, a monitor or TV's on size and display type.",
      },
    ],
    faqAnswers: {
      "How are e-waste scrap quotes calculated?":
        `${QUOTE_LINE}`,
      "Is price guaranteed?":
        "A preliminary estimate can be given from photos and details, but the confirmed number is set after inspection.",
      "What affects quote value?":
        "Item type, quantity, condition, location and current market rate.",
      "Does condition matter?":
        "Yes, condition is one of the biggest factors — working, damaged or non-functional changes the outcome.",
      "Does quantity matter?":
        "Yes, bulk quantities are often quoted differently than single items.",
      "Does location matter?":
        `${QUOTE_LINE}`,
      "Does working status matter?":
        "Yes, working devices generally command higher value than non-working ones, though non-working items can still have scrap value.",
      "Should I send photos?":
        "Yes, clear photos lead to a more accurate preliminary estimate.",
      "Is resale different from scrap?":
        "Yes — resale reflects a working device's market demand; scrap reflects material and component value.",
      "Can laptops have value?":
        "Yes, working or non-working — condition and specifications determine the range.",
      "Can batteries have value?":
        "Some batteries, especially lead-acid types, may have scrap value depending on condition and quantity.",
      "Can cables have value?":
        "Cables and wire can have modest scrap value, mainly from copper content, more so in bulk quantities.",
      "Are prices fixed daily?":
        "No, scrap value is market-linked and can shift over time rather than staying fixed.",
      "Can offices request bulk quote?":
        "Yes, share an itemized or estimated list for a consolidated quote.",
      "Is inspection needed?":
        "Yes, the final number is always confirmed once the item is physically seen.",
      "Can non-working items have value?":
        "Yes, component and material value can still apply even if a device doesn't power on.",
      "What is condition-based quote?":
        "A quote that reflects the device's actual working status and physical condition rather than a flat rate by model alone.",
      "What is market-linked estimate?":
        "An estimate that reflects current material and component demand, which can shift over time.",
      "How do I request quote?":
        "Message the item type, condition and photos on WhatsApp for a preliminary estimate.",
      "What if item has no value?":
        "It can still be recycled responsibly at no cost to you.",
    },
    extraRelatedLinks: [
      { label: "Scrap Price Guide", href: "/e-waste-scrap-prices-kochi/" },
      { label: "Sell Electronics", href: "/sell-electronics/" },
    ],
  },

  // ─── 15. Preparation & Safety Guides Before Recycling ───────────────────
  {
    clusterSlug: "preparation-safety-guides-before-recycling",
    keyTakeaways: [
      "Data and battery preparation matter more than exact item sorting.",
      "Photos of damaged, bulky or battery items speed up confirmation.",
      "You can add items after booking — just mention them before pickup day.",
      "A rough list (type + quantity) is enough; serial numbers aren't needed.",
    ],
    modules: [
      {
        keywords: /checklist|prepare|ready/i,
        heading: "The essentials",
        body: "Back up and wipe data-bearing devices, separate batteries into their own bag, flag anything damaged or bulky, and note your pickup address and preferred timeframe. Not everything on a general checklist applies to every pickup.",
      },
      {
        keywords: /data|hard drive|privacy/i,
        heading: "Data safety before handover",
        body: "Any device with storage should be backed up and wiped, or flagged for data destruction, before it leaves your hands — this applies to laptops, phones, hard drives and some office equipment alike.",
      },
      {
        keywords: /battery|swollen|damaged/i,
        heading: "Battery preparation specifically",
        body: "Identify all battery-containing items, keep them in a separate bag, and flag anything swollen, leaking or unusually warm before pickup rather than during it.",
      },
      {
        keywords: /office|business|IT team/i,
        heading: "Preparation for offices",
        body: "A rough asset list, labelled data-bearing devices, and clear access details (floor, loading dock) help a business pickup run smoothly, especially for larger quantities.",
      },
      {
        keywords: /apartment|home|household/i,
        heading: "Preparation at home",
        body: "Gather items in one accessible place, separate batteries, and back up devices with storage — a single afternoon of preparation is usually enough for a standard household pickup.",
      },
      {
        keywords: /photo|whatsapp|message/i,
        heading: "What to send on WhatsApp",
        body: "A rough item list, your location, and photos of anything damaged, bulky or battery-related — sending this together in one message gets the fastest response.",
      },
    ],
    faqAnswers: {
      "How should I prepare e-waste?":
        "Back up and wipe data-bearing devices, separate batteries, and flag anything damaged or bulky before you message us.",
      "What details should I send?":
        "Item list, rough quantity, your location, and photos of anything unusual.",
      "Should I send photos?":
        "It helps, especially for batteries, damaged items, or anything bulky.",
      "Should batteries be separated?":
        "Yes, always keep batteries in their own bag, separate from other electronics.",
      "Should hard drives be separated?":
        "It helps to flag them specifically if they need data destruction, though they don't need physical separation otherwise.",
      "Should data be removed?":
        "Yes, back up and wipe or factory reset any device with storage before handover.",
      "How do I pack small items?":
        "Small items and batteries are easiest in a bag — no special packaging is required for most electronics.",
      "How do I handle damaged items?":
        "Flag the damage with a photo when you first message, and keep sharp or fragile items contained if possible.",
      "What should offices prepare?":
        "A rough asset list, data-bearing devices flagged, and access details for the pickup location.",
      "What should homes prepare?":
        "Items gathered in one place, batteries separated, and data wiped from anything with storage.",
      "Can I include mixed electronics?":
        "Yes, a single pickup can cover a mix of item types.",
      "What should I avoid?":
        "Avoid mixing batteries with general electronics and leaving data unwiped on devices you're handing over.",
      "Can heavy items be collected?":
        "Yes, with advance notice — mention size, weight and access details.",
      "How do I reduce pickup delays?":
        "Send a complete first message — item list, location and photos — rather than partial details followed by back-and-forth.",
      "What affects feasibility?":
        `${PICKUP_LINE}`,
      "Should I label business assets?":
        "It helps for larger office jobs, particularly for data-bearing devices that need special handling.",
      "How do I store batteries safely?":
        "Keep them dry, away from heat, upright, and separate from other items until pickup.",
      "What should I confirm before pickup?":
        "Your pickup slot, any access details, and whether data destruction is included if needed.",
      "Can I prepare items for resale?":
        "Yes, the same preparation — wiping data, honest condition notes, photos — applies whether you're recycling or selling.",
      "How do I book pickup?":
        "Message your item list, location and photos on WhatsApp.",
    },
    extraRelatedLinks: [
      { label: "Book Pickup", href: "/pickup/" },
      { label: "Battery Recycling", href: "/battery-recycling/" },
    ],
  },

  // ─── 16. Server & Network Equipment Recycling ───────────────────────────
  {
    clusterSlug: "server-network-equipment-recycling",
    keyTakeaways: [
      "Servers, switches, storage arrays and racks are all accepted.",
      "Data destruction is available for business-critical storage.",
      "An asset list streamlines server room cleanouts.",
      "Even small offices with just a few servers can request pickup.",
    ],
    modules: [
      {
        keywords: /data|storage|drive/i,
        heading: "Data safety for servers",
        body: "Server storage devices contain business-critical data. Before disposal, data should be securely erased or the storage media physically destroyed — this is a separate step from general recycling.",
      },
      {
        keywords: /rack|room|cleanout/i,
        heading: "Server room cleanouts",
        body: "A retired server rack, along with cabling, UPS units and networking gear, is a common single pickup — an asset list with device types and quantities helps plan the visit.",
      },
      {
        keywords: /small business|small office/i,
        heading: "For smaller setups",
        body: "You don't need enterprise-scale quantities to request server or network equipment pickup — even a few retired servers or switches from a small office are welcome.",
      },
      {
        keywords: /itad|documentation|chain of custody/i,
        heading: "ITAD and documentation",
        body: "For business-critical equipment, ITAD combines bulk pickup with data destruction and documentation in one process, including chain of custody tracking where needed.",
      },
      {
        keywords: /network|switch|router|firewall/i,
        heading: "Network equipment specifically",
        body: "Switches, routers and firewalls are accepted alongside servers — mention configuration data concerns so the right handling is applied.",
      },
      {
        keywords: /value|resale/i,
        heading: "Server hardware value",
        body: "Some server hardware retains resale or component value depending on age and specifications — mention this if you'd like a quote alongside recycling.",
      },
    ],
    faqAnswers: {
      "Can servers be recycled?":
        "Yes, rack and tower servers are both accepted.",
      "Can network switches be collected?":
        "Yes, switches, routers and firewalls are accepted alongside servers.",
      "Is data destruction needed?":
        "For business-critical storage, yes — wiping, degaussing or shredding is available on request.",
      "Should drives be removed?":
        "You can remove them yourself if you plan to keep them separate, or leave them for us to handle as part of data destruction.",
      "Can server racks be collected?":
        "Yes, including cabinets and mounting hardware — mention size and access details.",
      "Can UPS batteries be included?":
        "Yes, server room UPS batteries are accepted, kept separate from other equipment.",
      "Can offices request server pickup?":
        "Yes, from a single retired server to a full room cleanout.",
      "What is ITAD?":
        "IT Asset Disposition — secure disposal combining data destruction, asset tracking and documentation, designed for business IT equipment.",
      "Is documentation available?":
        "Documentation may be available depending on the service type — raise this requirement early.",
      "What affects quote?":
        `${QUOTE_LINE}`,
      "What affects pickup feasibility?":
        `${PICKUP_LINE}`,
      "Should I prepare asset list?":
        "It helps — device type, model and quantity is usually enough detail.",
      "Can firewalls be recycled?":
        "Yes, firewalls and other security appliances are accepted.",
      "Can storage arrays be collected?":
        "Yes, NAS and storage array devices are accepted, with data destruction available.",
      "Is resale possible?":
        "Some server hardware retains resale value depending on age and specifications — ask for a quote.",
      "How do I prepare server room e-waste?":
        "Create a rough asset list, flag data-bearing devices, and note access details like floor and loading bay.",
      "Can small businesses use this?":
        "Yes, server and network equipment pickup is available at any scale.",
      "What safety steps matter?":
        "Data destruction for storage devices, and careful handling for heavy rack equipment.",
      "How do I request server pickup?":
        "Message device types, rough quantities and any data destruction needs on WhatsApp.",
      "What happens after collection?":
        "Data-bearing components go through destruction first if requested, then materials are routed to compliant recycling or resale assessment.",
    },
    extraRelatedLinks: [
      { label: "Server Recycling", href: "/server-recycling-kochi/" },
      { label: "ITAD for Business", href: "/itad/" },
    ],
  },

  // ─── 17. Cable, Wire & Charger Recycling ─────────────────────────────────
  {
    clusterSlug: "cable-wire-charger-recycling",
    keyTakeaways: [
      "Cables, chargers and adapters are accepted on their own, no device needed.",
      "Copper content gives cables modest scrap value, more so in bulk.",
      "No need to sort cables by type before pickup — general grouping is enough.",
      "Old cables shouldn't go in household waste any more than larger electronics.",
    ],
    modules: [
      {
        keywords: /copper|value|scrap|worth/i,
        heading: "Do cables have value?",
        body: "Cables and wire carry modest scrap value, mainly from copper content — more noticeable in bulk quantities than for a handful of chargers.",
      },
      {
        keywords: /sort|separate|before pickup/i,
        heading: "Sorting isn't required",
        body: "Cables don't need to be sorted by type before pickup — grouping them loosely in a bag is enough. The team handles detailed sorting after collection.",
      },
      {
        keywords: /office|bulk|business/i,
        heading: "Bulk cable pickup for offices",
        body: "An accumulated tangle of network cables, power cords and adapters from an office move or upgrade is a common single pickup — a rough quantity estimate is enough.",
      },
      {
        keywords: /charger|adapter/i,
        heading: "Chargers and adapters",
        body: "Old chargers and adapters, even without a matching device, are accepted as standard e-waste — no need to find their original device first.",
      },
      {
        keywords: /home|household/i,
        heading: "The home cable drawer",
        body: "Most households accumulate a drawer of old cables and chargers for devices long gone — this is one of the simplest items to include in a pickup since there's no data or battery concern.",
      },
    ],
    faqAnswers: {
      "Can old cables be recycled?":
        "Yes, cables of all types are accepted as standard e-waste.",
      "Can chargers be recycled?":
        "Yes, including chargers without a matching device.",
      "Can adapters be collected?":
        "Yes, adapters are accepted alongside cables and chargers.",
      "Do cables have scrap value?":
        "Modestly, mainly from copper content — more noticeable in bulk quantities.",
      "Is quote guaranteed?":
        `${QUOTE_LINE}`,
      "Does quantity matter?":
        "Yes, bulk cable quantities are typically quoted differently than a handful of items.",
      "Should cables be sorted?":
        "Not necessarily — general grouping is enough, detailed sorting happens after collection.",
      "Can offices request cable pickup?":
        "Yes, especially useful after an office move or network upgrade.",
      "Can mixed wires be collected?":
        "Yes, mixed cable types can be collected together.",
      "Are power cords accepted?":
        "Yes, power cords are accepted as standard e-waste.",
      "Are USB cables accepted?":
        "Yes, USB and other small cables are accepted.",
      "Are network cables accepted?":
        "Yes, ethernet and other network cables are accepted.",
      "Should I send photos?":
        "Not typically required for cables — a rough description and quantity is enough.",
      "Can cables be included with other e-waste?":
        "Yes, cables can be part of a general household or office pickup.",
      "What affects cable quote?":
        "Quantity and copper content mainly — condition matters less than for other electronics.",
      "How do I store cables?":
        "No special storage is needed — a bag or box until pickup is fine.",
      "Can broken chargers be collected?":
        "Yes, broken or non-functional chargers are accepted.",
      "Is pickup available in Kochi?":
        `${SERVICE_AREA_LINE}`,
      "What happens after collection?":
        "Cables are sorted and processed for material recovery, primarily copper and other metals.",
      "How do I book?":
        "Message a rough quantity and your location on WhatsApp.",
    },
    extraRelatedLinks: [
      { label: "E-Waste Recycling", href: "/recycling/" },
      { label: "Scrap Price Guide", href: "/e-waste-scrap-prices-kochi/" },
    ],
  },

  // ─── 18. Solar, Inverter & Power Electronics Recycling ──────────────────
  {
    clusterSlug: "solar-inverter-power-electronics-recycling",
    keyTakeaways: [
      "Inverter batteries and power backup equipment are accepted for recycling.",
      "Solar equipment is handled case-by-case — contact us to check feasibility.",
      "Heavy batteries need advance notice for floor and access details.",
      "Damaged power backup batteries should be flagged with photos before pickup.",
    ],
    modules: [
      {
        keywords: /inverter|ups/i,
        heading: "Inverter and UPS batteries",
        body: "Inverter batteries are heavy, sealed lead-acid units and one of the largest single items most households deal with. Keep them upright, note the approximate size, and flag any damage.",
      },
      {
        keywords: /solar|panel/i,
        heading: "Solar equipment",
        body: "Solar panels, inverters and charge controllers are handled on a case-by-case basis — contact us with the equipment type, quantity and condition for a feasibility check before assuming pickup is possible.",
      },
      {
        keywords: /damaged|risk|safety/i,
        heading: "Damaged power backup batteries",
        body: "A swollen or leaking inverter or backup battery needs the same careful handling as any damaged battery — don't move it more than necessary and share photos before pickup.",
      },
      {
        keywords: /office|business|ups room/i,
        heading: "Office UPS rooms",
        body: "Offices with server room UPS systems or multiple backup batteries can request bulk pickup — mention quantity and type so the visit is planned for the right handling.",
      },
      {
        keywords: /heavy|weight|access/i,
        heading: "Weight and access",
        body: "Power backup batteries can be genuinely heavy — mention floor level and lift access when booking so the team can plan safely.",
      },
    ],
    faqAnswers: {
      "Can inverter batteries be recycled?":
        "Yes, inverter batteries are accepted for recycling.",
      "Can old inverters be collected?":
        "Yes, the inverter unit itself along with its battery is accepted.",
      "Can solar equipment be recycled?":
        "Handled case-by-case — contact us with the equipment type, quantity and condition to check feasibility.",
      "Are solar panels accepted?":
        "Possibly, depending on type and quantity — send details for confirmation rather than assuming either way.",
      "Are UPS batteries different?":
        "Both are typically sealed lead-acid batteries and handled similarly, though mention the specific type when booking.",
      "What if battery is damaged?":
        "Keep it isolated, don't move it more than necessary, and share a photo before pickup.",
      "Should I send photos?":
        "Yes, especially for any damage, swelling or leakage.",
      "Are heavy batteries accepted?":
        "Yes, with advance notice for floor and access details.",
      "Does location affect pickup?":
        `${PICKUP_LINE}`,
      "Does quantity affect pickup?":
        `${PICKUP_LINE}`,
      "Is quote guaranteed?":
        `${QUOTE_LINE}`,
      "Can offices request pickup?":
        "Yes, including bulk UPS room cleanouts.",
      "Can homes request pickup?":
        "Yes, a single inverter battery is a straightforward pickup.",
      "Should batteries be stored separately?":
        "Yes, always keep batteries separate from other electronics.",
      "Can cables be included?":
        "Yes, inverter wiring and cables can be included in the same pickup.",
      "What power electronics count as e-waste?":
        "Inverters, charge controllers, power supply units and related backup power equipment.",
      "Are lithium backup batteries risky?":
        "They carry a different risk profile from lead-acid and should be flagged specifically when booking.",
      "How do I prepare inverter batteries?":
        "Disconnect from power if safe to do so, keep upright, and photograph any damage.",
      "How do I book pickup?":
        "Message the equipment type, quantity and condition on WhatsApp.",
      "What happens after collection?":
        "Batteries are processed according to their chemistry; other power electronics are assessed for material recovery.",
    },
    extraRelatedLinks: [
      { label: "Battery Recycling", href: "/battery-recycling/" },
      { label: "Book Pickup", href: "/pickup/" },
    ],
  },

  // ─── 19. CCTV, Security & Smart Device Recycling ────────────────────────
  {
    clusterSlug: "cctv-security-smart-device-recycling",
    keyTakeaways: [
      "CCTV cameras, DVRs and NVRs are accepted for recycling.",
      "DVRs and NVRs can store footage — data handling applies before disposal.",
      "Smart home devices should be removed from their app and factory reset first.",
      "Security equipment cleanouts for offices are supported at any scale.",
    ],
    modules: [
      {
        keywords: /dvr|nvr|footage|recorder/i,
        heading: "DVRs, NVRs and stored footage",
        body: "Recorders can hold stored footage and configuration data. Before disposal, this should be handled the same way as any data-bearing device — wiped or flagged for data destruction.",
      },
      {
        keywords: /camera|cctv/i,
        heading: "Cameras and CCTV systems",
        body: "Security cameras, whether analog or network-connected, are accepted individually or as a full system pickup — cables and mounting hardware can be included.",
      },
      {
        keywords: /smart|doorbell|hub/i,
        heading: "Smart home and smart security devices",
        body: "Smart doorbells, hubs and sensors often store account and Wi-Fi data — remove the device from its companion app and factory reset it before handover.",
      },
      {
        keywords: /office|business/i,
        heading: "Office security equipment",
        body: "A full office security system upgrade or removal is a common pickup — mention the equipment types and quantities, and flag any devices with stored footage.",
      },
      {
        keywords: /access control|biometric/i,
        heading: "Access control and biometric devices",
        body: "Access control panels and biometric readers can store enrollment data — treat them as data-bearing devices and flag this when booking.",
      },
    ],
    faqAnswers: {
      "Can CCTV cameras be recycled?":
        "Yes, cameras of all types are accepted.",
      "Can DVRs be collected?":
        "Yes, DVRs are accepted — data handling can be arranged if they held stored footage.",
      "Can NVRs be collected?":
        "Yes, NVRs are accepted the same way as DVRs.",
      "Do CCTV devices store data?":
        "Yes, recorders in particular can hold stored footage and configuration settings.",
      "Is data destruction needed?":
        "For devices with stored footage or sensitive configuration, it's worth requesting — mention this when booking.",
      "Can cables be included?":
        "Yes, CCTV cabling and mounting hardware can be included in the pickup.",
      "Can offices request pickup?":
        "Yes, full security system cleanouts are supported.",
      "Can apartments request pickup?":
        "Yes, apartment-level security equipment is accepted the same way as any other pickup.",
      "Are smart devices accepted?":
        "Yes, smart doorbells, hubs and sensors are accepted.",
      "Are access control devices accepted?":
        "Yes, treat them as data-bearing and flag this when booking.",
      "Are biometric devices accepted?":
        "Yes, the same data-handling care applies as with access control panels.",
      "Should I send photos?":
        "It helps for larger systems or anything damaged.",
      "What affects pickup feasibility?":
        `${PICKUP_LINE}`,
      "Can broken cameras be collected?":
        "Yes, non-working cameras are still accepted.",
      "Can old security systems be collected?":
        "Yes, a full legacy system replacement is a common single pickup.",
      "How should I prepare devices?":
        "Remove smart devices from their companion app, factory reset where possible, and flag any devices with stored footage.",
      "Is documentation available?":
        "Documentation may be available for business pickups on request.",
      "What happens after collection?":
        "Data-bearing components are handled first if requested, then materials are routed to recycling.",
      "How do I book?":
        "Message the equipment types, quantities and location on WhatsApp.",
      "Can these be included with IT scrap?":
        "Yes, security equipment can be part of a broader office IT or ITAD pickup.",
    },
    extraRelatedLinks: [
      { label: "Data Destruction", href: "/data-destruction/" },
      { label: "ITAD for Business", href: "/itad/" },
    ],
  },

  // ─── 20. School, Apartment & Community E-Waste Drives ───────────────────
  {
    clusterSlug: "school-apartment-community-ewaste-drives",
    keyTakeaways: [
      "A resident or association can coordinate a combined collection for a building.",
      "Individual flats can still book their own pickup — a drive isn't mandatory.",
      "Batteries need separate, well-ventilated storage at a community collection point.",
      "Community and school drives are handled case-by-case — contact us to plan one.",
    ],
    modules: [
      {
        keywords: /apartment|housing society|flat|building/i,
        heading: "Organizing a building-wide collection",
        body: "A resident or the apartment association contacts us with an estimated item count and address. Residents bring items to a common area at an agreed time, and the team collects from that single point.",
      },
      {
        keywords: /school|awareness/i,
        heading: "School and community awareness drives",
        body: "Schools and community groups interested in an e-waste awareness or collection day should contact us directly to discuss scope and feasibility — this is handled case-by-case rather than as a standard advertised service.",
      },
      {
        keywords: /battery|safety/i,
        heading: "Battery safety at a community collection point",
        body: "Don't store large quantities of batteries in an enclosed common area without ventilation. Flag any damaged batteries in advance and keep them isolated from other collected items.",
      },
      {
        keywords: /organize|plan|announce/i,
        heading: "Planning a collection day",
        body: "Decide on a date and common collection point, announce it to residents with a rough list of accepted items, and share the estimated total with us in advance so the visit can be planned.",
      },
      {
        keywords: /individual|single flat/i,
        heading: "Individual pickups still work",
        body: "A community drive isn't required — any individual flat can book its own pickup at any time, the same as a standalone home.",
      },
    ],
    faqAnswers: {
      "Can apartments organize e-waste pickup?":
        "Yes, either as an individual flat pickup or a combined building-wide collection.",
      "Can housing societies request collection?":
        "Yes, contact us with an estimated item count and the building address to discuss scheduling.",
      "Can schools run awareness drives?":
        "Contact us directly to discuss scope and feasibility — this is handled case-by-case.",
      "Is this a confirmed school client service?":
        "No specific school partnerships are claimed here — each community or school drive is discussed and confirmed individually.",
      "What items can residents bring?":
        "Phones, laptops, cables, batteries and general household electronics — check with organizers for the specific drive's scope.",
      "Are batteries accepted?":
        "Yes, but they need separate, ventilated storage at the collection point — never left in an enclosed space in bulk.",
      "Should data-bearing devices be separated?":
        "Yes, residents should back up and wipe devices with storage before bringing them to a collection point.",
      "How should collection be announced?":
        "Set a date and common area, and share a rough list of accepted items with residents in advance.",
      "Can pickup be scheduled?":
        "Yes, an agreed date and time is set with the organizer once feasibility is confirmed.",
      "Does quantity affect feasibility?":
        `${PICKUP_LINE}`,
      "Are damaged batteries allowed?":
        "Yes, but they should be flagged and kept isolated from other items at the collection point.",
      "Should photos be shared first?":
        "It helps, especially for the estimated scale of the drive and any damaged items.",
      "Can TVs be included?":
        "Yes, TVs and other larger items can be part of a community drive with advance notice.",
      "Can laptops be included?":
        "Yes, laptops and other computers are commonly part of community collections.",
      "Can offices join community drives?":
        "Office park or co-working space collections are handled the same way as residential ones — contact us to plan.",
      "What should not be accepted?":
        "Organizers should check with us on anything unusual in advance rather than accepting items they're unsure about.",
      "Is documentation available?":
        "Documentation may be available for larger organized drives on request.",
      "How do we avoid informal handling?":
        "Route the collected items through an authorized recycler like Ewaste Kochi rather than an informal collector, even for a one-off community drive.",
      "What details should organizers send?":
        "Estimated item count, the collection date and location, and any known battery or bulky items.",
      "How do we book a community pickup?":
        "Contact us with the estimated scale and building or community address to discuss scheduling.",
    },
    extraRelatedLinks: [
      { label: "Book Pickup", href: "/pickup/" },
      { label: "Locations", href: "/locations/" },
    ],
  },
];
