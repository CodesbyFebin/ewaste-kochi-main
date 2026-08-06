#!/usr/bin/env python3
"""
generate-encyclopedia-batch.py
==============================

Generates /encyclopedia/{slug}/index.astro files in
.content-quarantine/generated/encyclopedia/ from an inline data spec.

Batch 1: Battery Chemistries — 29 entries (lithium-ion-battery already exists
as the sample; not regenerated). Every entry follows the exact template
shape of the lithium-ion-battery sample:
  - DefinedTerm + Article + BreadcrumbList JSON-LD
  - 4 main sections (composition / uses / EOL / recycling)
  - 3-5 cross-references to other encyclopedia entries
  - 1-2 related service links
  - Category-aware messaging (all batteries: Kochi-doorstep only, no ship-in)
  - Anti-fabrication: ranges instead of fabricated exact numbers, no
    invented certification / partner claims

Usage:
    python3 scripts/generate-encyclopedia-batch.py

Idempotent — safe to re-run; overwrites the quarantined files.
"""

from __future__ import annotations
import pathlib
from textwrap import dedent

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_ROOT = REPO_ROOT / ".content-quarantine" / "generated" / "encyclopedia"

# ---------------------------------------------------------------------------
# BATCH 1 DATA — 29 Battery Chemistry entries
# Each entry: slug, title, one-sentence lead, 4 sections, cross-refs.
# All entries share: category "Battery Chemistries", kochi-only note,
# related-services link to /battery-recycling/.
# ---------------------------------------------------------------------------

ENTRIES = [
    {
        "slug": "lithium-polymer-battery",
        "title": "Lithium-Polymer Battery (LiPo)",
        "lead": "Lithium-ion variant using a polymer or gel electrolyte instead of liquid, allowing thinner, flexible cell geometry.",
        "sections": [
            ("Composition and operating principle", "LiPo cells use the same intercalation chemistry as standard Li-ion — lithium ions shuttling between a graphite anode and a lithium-metal-oxide cathode — but the electrolyte is a solid or gel polymer rather than a liquid organic solvent. This allows the cell to be packaged in a soft foil pouch rather than a rigid metal case, giving designers freedom over cell shape and thickness. Voltage per cell (nominally 3.7V) and energy density are broadly comparable to conventional Li-ion."),
            ("Where it's used", "Smartphones, tablets, ultrabooks, wireless earphones, drones, RC hobby vehicles, and other applications where cell shape needs to conform to a specific enclosure. The pouch format is the reason a modern smartphone can be 7mm thick — a cylindrical 18650 cell wouldn't fit."),
            ("End-of-life hazards", "Pouch cells are more vulnerable to physical damage than cylindrical or prismatic cells — a puncture directly exposes the reactive interior. Damaged LiPo cells can enter thermal runaway more readily and often visibly swell before failure. Swollen pouch cells in a device (phone back separating, laptop touchpad lifting) indicate an active failure mode and require careful handling."),
            ("Recycling and disposal", "LiPo cells follow the same recycling routes as other Li-ion chemistries — mechanical shredding under inert atmosphere, then pyrometallurgical or hydrometallurgical processing. The pouch packaging separates in size reduction. Cobalt, nickel, copper recoveries are commercially routine; lithium recovery is chemistry-dependent."),
        ],
        "cross_refs": ["lithium-ion-battery", "thermal-runaway-lithium", "cobalt-in-batteries", "hydrometallurgy"],
    },
    {
        "slug": "lithium-iron-phosphate-lfp",
        "title": "Lithium Iron Phosphate (LFP)",
        "lead": "Lithium-ion cathode variant using LiFePO4, favouring cycle life and safety over energy density.",
        "sections": [
            ("Composition and operating principle", "LFP uses lithium iron phosphate (LiFePO4) as the cathode material, paired with a graphite anode and standard lithium-salt electrolyte. Nominal cell voltage is 3.2V — lower than the ~3.7V of cobalt-based Li-ion variants — and gravimetric energy density is 90-140 Wh/kg range, meaningfully lower than LCO or NMC. In exchange: significantly better thermal stability, longer cycle life (routinely 2,000+ full cycles), and no cobalt content."),
            ("Where it's used", "Stationary energy storage (residential solar backup, grid storage), electric buses and light commercial EVs, e-bikes, some Tesla base models, LED torches, and industrial UPS applications. The energy-density penalty makes LFP less common in ultra-portable consumer electronics but well-suited anywhere weight matters less than lifetime cost per cycle."),
            ("End-of-life hazards", "LFP has the lowest thermal-runaway risk of any commercial Li-ion chemistry — the P-O bond in the cathode is much more thermally stable than the layered oxide cathodes. Cells will still burn if externally heated to failure, but self-propagating cell-to-cell cascade is much rarer than with NMC or NCA. This makes LFP the preferred chemistry where fire risk dominates the design decision."),
            ("Recycling and disposal", "LFP recycling is economically less attractive than cobalt-bearing Li-ion — there's no cobalt to recover and lithium concentration is similar. Iron and phosphate are low-value. Emerging processes focus on direct recycling (preserving the cathode structure) or lithium-first hydrometallurgy. Commercial LFP recycling infrastructure is expanding as EV / stationary storage volumes grow."),
        ],
        "cross_refs": ["lithium-ion-battery", "hydrometallurgy", "second-life-batteries", "cobalt-in-batteries"],
    },
    {
        "slug": "lithium-cobalt-oxide-lco",
        "title": "Lithium Cobalt Oxide (LCO)",
        "lead": "Lithium-ion cathode chemistry with the highest energy density; dominant in legacy consumer electronics.",
        "sections": [
            ("Composition and operating principle", "LCO uses LiCoO2 as the cathode, giving a nominal cell voltage of 3.7V and gravimetric energy density in the 150-220 Wh/kg range — the highest of common Li-ion variants. Cycle life is moderate (500-1000 full cycles) and thermal stability is the lowest among common cathodes."),
            ("Where it's used", "Historically dominant in laptops, smartphones, cameras, and other small consumer electronics from the mid-2000s through the mid-2010s. Modern devices increasingly use NMC or NCA for better cycle life and reduced cobalt, but LCO is still widely present in end-of-life devices reaching recyclers today."),
            ("End-of-life hazards", "Higher thermal-runaway propensity than NMC or LFP. Cobalt content is a health concern for informal-sector recyclers exposed to particulates during dismantling or open burning. Cells at end-of-life often still hold significant charge — proper discharge or containment before mechanical processing is important."),
            ("Recycling and disposal", "Cobalt recovery is the primary economic driver for LCO recycling. Pyrometallurgical smelting recovers cobalt, nickel, and copper as a mixed alloy. Hydrometallurgical routes offer higher cobalt selectivity and better lithium recovery. Recoveries of 90%+ for cobalt are commercially routine."),
        ],
        "cross_refs": ["lithium-ion-battery", "cobalt-in-batteries", "pyrometallurgy", "thermal-runaway-lithium"],
    },
    {
        "slug": "lithium-nickel-manganese-cobalt-nmc",
        "title": "Lithium NMC (Nickel Manganese Cobalt)",
        "lead": "Balanced lithium-ion cathode variant dominant in modern EVs and laptops.",
        "sections": [
            ("Composition and operating principle", "NMC cathodes combine nickel, manganese, and cobalt in various ratios — commonly designated NMC 111, NMC 532, NMC 622, NMC 811 by the elemental ratio. Higher nickel content increases energy density but reduces thermal stability. Nominal cell voltage 3.7V, gravimetric energy density 150-220 Wh/kg range depending on formulation."),
            ("Where it's used", "Modern EVs (most non-Tesla plug-in vehicles), high-end laptops, power tools, e-bikes, and increasingly grid storage. The chemistry family has largely displaced LCO in new consumer electronics because of better cycle life and reduced cobalt loading."),
            ("End-of-life hazards", "Thermal stability varies substantially with nickel content — NMC 811 is meaningfully more prone to thermal runaway than NMC 111. All NMC variants contain cobalt (a factor in end-of-life worker exposure) and nickel (allergy concern for skin contact with damaged cells). Standard Li-ion handling protocols apply."),
            ("Recycling and disposal", "NMC is the most valuable Li-ion chemistry to recycle — combined nickel and cobalt content gives high per-tonne recovery value. Pyrometallurgical, hydrometallurgical, and direct-recycling processes all target NMC batteries. Manganese recovery is less commercially significant."),
        ],
        "cross_refs": ["lithium-ion-battery", "cobalt-in-batteries", "nickel-in-batteries", "hydrometallurgy"],
    },
    {
        "slug": "lithium-nickel-cobalt-aluminum-nca",
        "title": "Lithium NCA (Nickel Cobalt Aluminum)",
        "lead": "High-energy lithium-ion cathode used in premium EVs including Tesla vehicles.",
        "sections": [
            ("Composition and operating principle", "NCA uses a lithium nickel cobalt aluminum oxide cathode, typically formulated at ~80% nickel, 15% cobalt, 5% aluminum. Higher nickel loading than most NMC variants gives NCA the highest practical energy density of common Li-ion cathodes — 200-260 Wh/kg range. Aluminum substitution improves structural stability and slightly reduces cobalt requirement compared to LCO."),
            ("Where it's used", "Tesla EVs (traditionally the primary NCA consumer), some premium consumer electronics, high-performance power tools. Panasonic has been the largest NCA cell producer historically."),
            ("End-of-life hazards", "High nickel content means higher thermal-runaway propensity than lower-nickel chemistries. Aluminum content introduces additional considerations during processing (aluminum contaminates iron recovery streams). Cell voltages and stored energy at end of life warrant standard Li-ion handling protocols."),
            ("Recycling and disposal", "Cobalt and nickel recovery are the primary economic drivers. Pyrometallurgical recovery of nickel-cobalt alloy is well-established; hydrometallurgical processes provide higher selectivity. Aluminum content requires specific handling in some flowsheets."),
        ],
        "cross_refs": ["lithium-ion-battery", "cobalt-in-batteries", "nickel-in-batteries", "second-life-batteries"],
    },
    {
        "slug": "lithium-titanate-lto",
        "title": "Lithium Titanate (LTO)",
        "lead": "Lithium-ion variant with lithium titanate anode, prized for fast charge and long cycle life.",
        "sections": [
            ("Composition and operating principle", "LTO replaces the standard graphite anode with lithium titanate (Li4Ti5O12), paired with various cathode chemistries. The distinctive anode raises nominal cell voltage to 2.2-2.4V (much lower than standard Li-ion) but dramatically improves fast-charge capability, low-temperature performance, and cycle life (routinely 10,000+ full cycles). Energy density is meaningfully lower — 50-90 Wh/kg range."),
            ("Where it's used", "Industrial applications requiring extreme cycle life or fast charging — electric buses, industrial UGVs, grid-scale storage, medical equipment. Less common in consumer electronics due to the energy density penalty."),
            ("End-of-life hazards", "Very high thermal stability — LTO cells are among the safest Li-ion chemistries at end of life. Cascade thermal-runaway is much less likely than with cobalt-based cathodes. Standard containment protocols still apply."),
            ("Recycling and disposal", "Recycling economics depend heavily on the paired cathode chemistry. The titanate anode itself has limited recovery value; the cathode drives the economics. LTO's very long service life means fewer batteries reach recycling per unit of service delivered."),
        ],
        "cross_refs": ["lithium-ion-battery", "second-life-batteries", "solid-state-battery", "hydrometallurgy"],
    },
    {
        "slug": "nickel-metal-hydride-nimh",
        "title": "Nickel-Metal Hydride (Ni-MH)",
        "lead": "Rechargeable battery chemistry using a nickel oxyhydroxide cathode and hydrogen-absorbing metal alloy anode.",
        "sections": [
            ("Composition and operating principle", "Ni-MH cells use nickel oxyhydroxide as the positive electrode and a hydrogen-absorbing alloy (typically rare-earth or nickel-based) as the negative electrode, with an alkaline electrolyte. Nominal cell voltage is 1.2V. Energy density is lower than Li-ion (60-120 Wh/kg range) but the chemistry is much safer, tolerates deep discharge, and has minimal environmental restrictions."),
            ("Where it's used", "Rechargeable AA and AAA batteries, hybrid vehicle batteries (Toyota Prius through the mid-2010s), some cordless tools, older portable electronics. Ni-MH is being displaced by Li-ion in most new applications but remains dominant in the rechargeable-consumer-cell segment."),
            ("End-of-life hazards", "Low toxicity compared to Ni-Cd or lead-acid — no cadmium, no lead. Rare-earth content in the anode alloy is a supply-chain concern but not a health hazard at end of life. Fire risk is minimal; cells vent hydrogen if severely overcharged or crushed."),
            ("Recycling and disposal", "Nickel recovery drives the economics. Pyrometallurgical smelting is standard, producing a nickel-rich alloy. The alkaline electrolyte requires neutralization. Rare-earth recovery from the anode alloy is technically feasible but not economically routine at current commodity prices."),
        ],
        "cross_refs": ["nickel-in-batteries", "rare-earth-elements-in-electronics", "nickel-cadmium-nicd", "pyrometallurgy"],
    },
    {
        "slug": "nickel-cadmium-nicd",
        "title": "Nickel-Cadmium (Ni-Cd)",
        "lead": "Legacy rechargeable chemistry, largely restricted for cadmium toxicity.",
        "sections": [
            ("Composition and operating principle", "Ni-Cd cells use nickel oxyhydroxide as the positive electrode and cadmium metal as the negative, with an alkaline electrolyte. Nominal cell voltage 1.2V. The chemistry tolerates very high discharge rates and extreme temperatures — historic reasons for use in power tools, aviation, and emergency lighting."),
            ("Where it's used", "Largely phased out of consumer applications in the EU (RoHS restriction with limited exceptions) and increasingly restricted worldwide. Still present in some legacy industrial equipment, aviation applications, and emergency lighting where regulatory exemptions apply. Old consumer devices reaching recyclers today may still contain Ni-Cd."),
            ("End-of-life hazards", "Cadmium is highly toxic — carcinogenic, teratogenic, kidney and bone toxicity from chronic exposure. This is the primary reason for the phase-out. Improperly disposed Ni-Cd cells leach cadmium into groundwater. Informal-sector processing (open dismantling, acid stripping) exposes workers to cadmium fumes and dust."),
            ("Recycling and disposal", "Recycling is regulated and mandatory in most jurisdictions where Ni-Cd cells are sold. Pyrometallurgical processing recovers cadmium (used again in new industrial cells where exemptions permit) and nickel. Never dispose in general household waste."),
        ],
        "cross_refs": ["nickel-in-batteries", "cadmium-in-electronics", "cadmium-poisoning-e-waste", "rohs-directive"],
    },
    {
        "slug": "nickel-zinc-battery",
        "title": "Nickel-Zinc (Ni-Zn)",
        "lead": "Rechargeable alkaline-family chemistry offering a cadmium-free alternative to Ni-Cd.",
        "sections": [
            ("Composition and operating principle", "Ni-Zn uses nickel oxyhydroxide as the positive electrode and zinc metal as the negative, with an alkaline electrolyte. Nominal cell voltage is 1.6V — higher than the 1.2V of Ni-MH or Ni-Cd. Historically, cycle life was limited by zinc electrode degradation but modern formulations have improved this substantially."),
            ("Where it's used", "Consumer rechargeable AA and AAA cells (a small segment of the market), some industrial applications, emerging grid-storage applications. Positioned as a lower-cost alternative to Li-ion for specific use cases."),
            ("End-of-life hazards", "Low toxicity — no cadmium, no lead. Zinc is a common metal with well-established recycling. Fire risk is very low relative to Li-ion. Environmental profile is favourable for end-of-life handling."),
            ("Recycling and disposal", "Zinc and nickel recovery are both economically viable. Standard pyrometallurgical processes handle Ni-Zn alongside Ni-MH batches. Alkaline electrolyte requires neutralization but is not particularly hazardous compared to other battery chemistries."),
        ],
        "cross_refs": ["nickel-in-batteries", "nickel-metal-hydride-nimh", "nickel-cadmium-nicd", "alkaline-battery-primary"],
    },
    {
        "slug": "sealed-lead-acid-sla",
        "title": "Sealed Lead-Acid (SLA)",
        "lead": "Maintenance-free lead-acid battery chemistry dominant in small UPS units and stationary backup applications.",
        "sections": [
            ("Composition and operating principle", "SLA cells use lead dioxide as the positive plate, spongy lead as the negative, and sulfuric acid electrolyte immobilised in a separator matrix or a gel. Nominal cell voltage 2V; typical 6V and 12V batteries stack multiple cells. Recombinant design captures oxygen released at the positive plate and reforms water, eliminating the need for water top-up (hence 'maintenance-free')."),
            ("Where it's used", "Small UPS units (computer / server backup), emergency lighting, alarm systems, some medical equipment, mobility scooters, small photovoltaic systems. Widely present in Kochi metro households and offices."),
            ("End-of-life hazards", "Lead is toxic and bioaccumulative — primary reason for careful end-of-life handling. Sulfuric acid electrolyte is corrosive but immobilised in SLA cells reduces spill risk. Damaged or crushed cells can leak acid and expose the lead components. Improper informal-sector processing (open smelting to recover lead) is a major environmental and worker-health hazard."),
            ("Recycling and disposal", "Lead-acid batteries have the highest recycling rate of any consumer battery chemistry globally — often 95%+ in mature markets. Established smelter infrastructure recovers lead, sulfuric acid is neutralised and processed, casing plastic is recovered. In Kochi: doorstep pickup routes SLA batteries to authorised lead-acid recyclers."),
        ],
        "cross_refs": ["flooded-lead-acid", "lead-in-electronics", "lead-poisoning-e-waste", "pyrometallurgy"],
    },
    {
        "slug": "flooded-lead-acid",
        "title": "Flooded Lead-Acid Battery",
        "lead": "Traditional wet-cell lead-acid chemistry used in inverter and automotive applications.",
        "sections": [
            ("Composition and operating principle", "Flooded lead-acid cells use liquid sulfuric acid electrolyte between lead-dioxide positive plates and lead negative plates. Nominal cell voltage 2V; 12V batteries stack six cells. Requires periodic water top-up to replace electrolyte lost to electrolysis during charging. Delivers high peak current, tolerates deep discharge (tubular variants), and has service life of 3-5 years in typical residential inverter use."),
            ("Where it's used", "Home inverter backup (dominant in Kerala households — 150Ah and 200Ah tubular batteries are common), automotive starter batteries, off-grid solar systems, industrial UPS installations, backup power for telecom towers."),
            ("End-of-life hazards", "Same lead-toxicity and acid-corrosivity concerns as SLA, amplified by the liquid electrolyte. Damaged or leaking batteries can pool sulfuric acid, damaging flooring and posing burn risk. Improper informal handling — draining and disposing of electrolyte on ground, open smelting — is a serious environmental hazard."),
            ("Recycling and disposal", "Recycling infrastructure is well-established globally. Battery is drained, cases are opened, lead plates and paste are separated and smelted, sulfuric acid is either neutralised or recovered for reuse in fertilizer production. Kochi doorstep pickup routes flooded lead-acid inverter batteries — including tubular battery banks — to authorised recyclers. See related /blog/inverter-battery-recycling-kochi/ for the household pickup process."),
        ],
        "cross_refs": ["sealed-lead-acid-sla", "lead-in-electronics", "lead-poisoning-e-waste", "pyrometallurgy"],
    },
    {
        "slug": "absorbent-glass-mat-agm",
        "title": "Absorbent Glass Mat (AGM)",
        "lead": "Advanced sealed lead-acid variant using fiberglass mat separators to hold electrolyte.",
        "sections": [
            ("Composition and operating principle", "AGM is a valve-regulated lead-acid (VRLA) design where the sulfuric acid electrolyte is absorbed into a fiberglass mat between plates. This eliminates free liquid, allowing the battery to be mounted in any orientation and reducing spill risk. Charge acceptance is faster than flooded lead-acid; cycle life is typically better than standard SLA."),
            ("Where it's used", "Modern automotive start-stop systems, motorcycles, marine applications, UPS units where mounting orientation matters, some solar-off-grid installations. Positioned between SLA and lithium in cost and performance for cyclic applications."),
            ("End-of-life hazards", "Same lead-toxicity concerns as any lead-acid chemistry. Physical damage to the mat separator can allow acid migration. Fiberglass separator requires appropriate handling during dismantling."),
            ("Recycling and disposal", "Standard lead-acid recycling processes handle AGM batteries. The fiberglass mat is separated during processing and routed to appropriate waste streams; lead recovery is unchanged from other lead-acid variants."),
        ],
        "cross_refs": ["sealed-lead-acid-sla", "flooded-lead-acid", "gel-lead-acid-battery", "lead-in-electronics"],
    },
    {
        "slug": "gel-lead-acid-battery",
        "title": "Gel Lead-Acid Battery",
        "lead": "Sealed lead-acid variant using silica-gelled electrolyte, favoured for deep-cycle applications.",
        "sections": [
            ("Composition and operating principle", "Gel batteries use sulfuric acid mixed with silica to form a stiff gel that immobilises the electrolyte. This eliminates spill risk and allows any-orientation mounting. Deep-discharge tolerance is generally better than AGM; charge acceptance is slower and requires specific charger profiles to avoid gel damage."),
            ("Where it's used", "Solar off-grid installations where deep cycling is routine, mobility scooters, some medical equipment, telecom backup where extended discharge is planned. Less common in general UPS applications than AGM."),
            ("End-of-life hazards", "Same lead-toxicity concerns as any lead-acid chemistry. Gelled electrolyte reduces acid-spill risk during handling and transport but doesn't affect lead-content hazards during processing."),
            ("Recycling and disposal", "Standard lead-acid recycling processes handle gel batteries. The silica gel is processed separately from the lead components; downstream lead recovery is unchanged."),
        ],
        "cross_refs": ["sealed-lead-acid-sla", "absorbent-glass-mat-agm", "flooded-lead-acid", "lead-in-electronics"],
    },
    {
        "slug": "alkaline-battery-primary",
        "title": "Alkaline Battery (Primary)",
        "lead": "Non-rechargeable zinc-manganese-dioxide chemistry — the dominant single-use household battery.",
        "sections": [
            ("Composition and operating principle", "Alkaline primary cells use zinc as the anode, manganese dioxide as the cathode, and potassium hydroxide as the electrolyte. Nominal cell voltage is 1.5V. Not rechargeable in general consumer practice. Energy density is comparable to Ni-MH rechargeables and better than zinc-carbon."),
            ("Where it's used", "Remote controls, toys, flashlights, kitchen scales, smoke detectors, and countless other low-drain household devices. AA and AAA are the dominant form factors; C, D, and 9V are also common."),
            ("End-of-life hazards", "Modern alkaline cells contain no mercury (unlike some legacy formulations). Zinc, manganese, potassium hydroxide are all relatively low-hazard at end of life. Cells can leak potassium hydroxide if severely discharged and left installed — the white crystalline residue seen in old remote controls."),
            ("Recycling and disposal", "Recycling is technically feasible (zinc and manganese recovery) but economically marginal — the recovered materials are worth less per cell than the collection and processing cost. Regulatory approaches vary: some jurisdictions require collection, others permit household disposal for modern mercury-free formulations. In Kochi: batch with other battery pickup rather than disposing separately."),
        ],
        "cross_refs": ["zinc-carbon-battery", "mercury-battery-legacy", "nickel-metal-hydride-nimh", "button-cell-battery"],
    },
    {
        "slug": "zinc-carbon-battery",
        "title": "Zinc-Carbon Battery",
        "lead": "Legacy dry-cell primary chemistry, largely displaced by alkaline cells.",
        "sections": [
            ("Composition and operating principle", "Zinc-carbon cells use a zinc case as the anode (which is also the container), a carbon rod cathode surrounded by manganese dioxide, and an ammonium chloride or zinc chloride electrolyte paste. Nominal cell voltage 1.5V. Energy density and shelf life are lower than alkaline cells."),
            ("Where it's used", "Low-cost consumer devices — cheap remote controls, clocks, torches, radios — where the price gap over alkaline matters more than performance. Still widely available in India at lower price points."),
            ("End-of-life hazards", "Zinc, carbon, and manganese dioxide are relatively low-hazard. Modern formulations do not contain mercury. Cells can leak when fully discharged, corroding the device battery compartment."),
            ("Recycling and disposal", "Similar to alkaline cells — technically recyclable but economically marginal for consumer-scale volumes. In Kochi: batch with other battery pickup."),
        ],
        "cross_refs": ["alkaline-battery-primary", "mercury-battery-legacy", "button-cell-battery", "coin-cell-battery"],
    },
    {
        "slug": "silver-oxide-battery",
        "title": "Silver Oxide Battery",
        "lead": "High-voltage, high-energy-density primary chemistry used in watch and hearing-aid button cells.",
        "sections": [
            ("Composition and operating principle", "Silver oxide cells use silver oxide as the cathode and zinc as the anode, with an alkaline (potassium hydroxide) or neutral electrolyte. Nominal cell voltage is 1.55V, very stable across the discharge curve. Energy density is high per unit volume, making the chemistry suitable for small button-cell form factors."),
            ("Where it's used", "Watch batteries (analog and digital), hearing aid batteries (some models), specialised precision electronics, some medical devices. Also found in aerospace and military applications where energy density per unit volume is critical."),
            ("End-of-life hazards", "Silver content makes proper recycling economically attractive but not universally practiced at consumer scale. Zinc and alkaline electrolyte are low-hazard. Historic silver oxide button cells were mercury-added (for improved discharge characteristics) — modern formulations are mercury-free."),
            ("Recycling and disposal", "Silver recovery is the primary economic driver. Bulk collection of button cells from watch shops, jewellers, and hearing-aid providers enables economically viable recovery. Individual consumer disposal in general waste is common but should be avoided."),
        ],
        "cross_refs": ["button-cell-battery", "watch-battery-types", "hearing-aid-battery", "mercury-battery-legacy"],
    },
    {
        "slug": "lithium-manganese-battery",
        "title": "Lithium-Manganese Battery",
        "lead": "Primary (non-rechargeable) lithium chemistry — the CR-family coin cells found in most consumer electronics.",
        "sections": [
            ("Composition and operating principle", "Lithium-manganese primary cells use metallic lithium as the anode and manganese dioxide as the cathode, with a lithium salt electrolyte in an organic solvent. Nominal cell voltage 3V — twice that of alkaline cells. Long shelf life (10+ years typical) and stable voltage across most of the discharge curve."),
            ("Where it's used", "CR2032, CR2025, CR2016 and other 'CR-family' coin cells are ubiquitous — motherboards (CMOS backup), remote car keys, blood glucose meters, small toys, greeting cards. The CR designation identifies this specific chemistry."),
            ("End-of-life hazards", "Metallic lithium content means the cells are moderately flammable if crushed or short-circuited. Small cell size limits the total hazard per cell but a bulk collection can amount to significant metallic lithium in one container. Not to be confused with lithium-ion rechargeable cells — different chemistry, similar naming."),
            ("Recycling and disposal", "Not economically recovered at consumer scale — small size and lithium content make processing marginal. Bulk collections (e.g., from car dealerships or repair shops) can be routed to specialised lithium primary recyclers. In Kochi: batch with other battery pickup."),
        ],
        "cross_refs": ["coin-cell-battery", "button-cell-battery", "lithium-metal", "lithium-ion-battery"],
    },
    {
        "slug": "zinc-air-battery",
        "title": "Zinc-Air Battery",
        "lead": "Primary chemistry using atmospheric oxygen as the cathode reactant — dominant in modern hearing aids.",
        "sections": [
            ("Composition and operating principle", "Zinc-air cells use zinc powder as the anode and oxygen from ambient air (drawn through pinholes in the case) as the cathode reactant. Nominal cell voltage 1.4V. Because the cathode reactant is external, the entire cell volume can be devoted to anode material — giving very high energy density per unit volume. Cells are activated by removing a seal that permits air ingress; once activated, the cell discharges regardless of use."),
            ("Where it's used", "Dominant chemistry in modern hearing aid batteries (colour-coded by size: yellow=10, brown=312, orange=13, blue=675). Also some emergency backup applications and specialised medical devices."),
            ("End-of-life hazards", "Zinc content is low-hazard; alkaline electrolyte is standard. The 'once activated, always discharging' characteristic means used cells reaching disposal have discharged fully with no remaining reactive content."),
            ("Recycling and disposal", "Zinc recovery is economically feasible for bulk collections but marginal for consumer-scale disposal. Hearing-aid clinics and audiologists are natural collection points for batching before recycling. In Kochi: batch with other battery pickup."),
        ],
        "cross_refs": ["hearing-aid-battery", "alkaline-battery-primary", "silver-oxide-battery", "button-cell-battery"],
    },
    {
        "slug": "mercury-battery-legacy",
        "title": "Mercury Battery (Legacy)",
        "lead": "Historical button-cell chemistry, phased out for mercury toxicity but still occasionally encountered in legacy equipment.",
        "sections": [
            ("Composition and operating principle", "Mercury cells used mercury oxide as the cathode and zinc as the anode, with an alkaline electrolyte. Nominal cell voltage was 1.35V, extremely stable across the discharge curve — the reason the chemistry was preferred for precision instruments before it was banned. Never rechargeable."),
            ("Where it's used", "Phased out of consumer applications globally by the late 1990s / early 2000s. Some specialised precision instruments, older cameras, older hearing aids, and legacy medical devices may still contain them. Any mercury cell reaching disposal today is decades old."),
            ("End-of-life hazards", "Mercury is highly toxic — bioaccumulative neurotoxin. Improper disposal (household waste, incineration) releases mercury to air, water, and soil. Even a single mercury cell can contaminate a substantial volume of general waste stream."),
            ("Recycling and disposal", "Mercury recovery is technically viable (distillation from cell contents) but the collection infrastructure has largely wound down alongside the chemistry's discontinuation. Any suspected mercury cell should be routed to a specialised hazardous-waste stream — WhatsApp us with the device details for guidance."),
        ],
        "cross_refs": ["mercury-in-electronics", "mercury-poisoning-e-waste", "silver-oxide-battery", "button-cell-battery"],
    },
    {
        "slug": "coin-cell-battery",
        "title": "Coin Cell Battery",
        "lead": "Form-factor descriptor for small round primary or secondary cells; various chemistries under this shape.",
        "sections": [
            ("Composition and operating principle", "'Coin cell' describes the physical form factor — a flat, round disc typically 5-25mm diameter and 1-5mm thick — rather than a specific chemistry. Most consumer coin cells today are lithium-manganese (CR series, 3V) or silver oxide (SR series, 1.55V), with occasional zinc-air (PR series, 1.4V) and rare mercury (MR series, historical)."),
            ("Where it's used", "Motherboards (CMOS backup, typically CR2032), key fobs, calculators, small toys, greeting cards, medical devices, hearing aids, watches, and hundreds of other small-electronics applications."),
            ("End-of-life hazards", "Choking and internal-injury risk to children and pets is significant — swallowed coin cells can cause severe internal chemical burns within hours. Chemistry-specific end-of-life hazards apply (metallic lithium fire risk for CR cells; mercury toxicity for historical MR cells)."),
            ("Recycling and disposal", "Bulk collection is the practical approach — individual cell recovery is uneconomic but batched collections can be routed to chemistry-specific processing. In Kochi: batch with other battery pickup rather than disposing individually."),
        ],
        "cross_refs": ["button-cell-battery", "lithium-manganese-battery", "silver-oxide-battery", "watch-battery-types"],
    },
    {
        "slug": "button-cell-battery",
        "title": "Button Cell Battery",
        "lead": "Small round cells similar to coin cells but generally thicker; alkaline, silver oxide, or zinc-air chemistries.",
        "sections": [
            ("Composition and operating principle", "'Button cell' overlaps with 'coin cell' terminology in casual use but historically refers to slightly thicker cells (5-10mm typical thickness) used in wristwatches and hearing aids. Common chemistries: silver oxide (SR series), alkaline (LR series), zinc-air (PR series). Voltages 1.4-1.55V range."),
            ("Where it's used", "Wristwatches, hearing aids, small medical devices, some specialised instruments, older electronic games."),
            ("End-of-life hazards", "Same swallowing risk as coin cells — significant hazard for children and pets. Chemistry-specific hazards apply."),
            ("Recycling and disposal", "Same batching approach as coin cells. Watch shops and hearing-aid providers are natural collection points."),
        ],
        "cross_refs": ["coin-cell-battery", "watch-battery-types", "hearing-aid-battery", "silver-oxide-battery"],
    },
    {
        "slug": "watch-battery-types",
        "title": "Watch Battery Types",
        "lead": "Common chemistries used in wristwatches: silver oxide, lithium primary, and alkaline.",
        "sections": [
            ("Composition and operating principle", "Watch batteries are almost universally button or coin cells 5-11mm diameter. Chemistry choice depends on watch requirements: silver oxide (SR) for stable voltage in analog quartz watches, lithium primary (CR) for higher voltage and longer life in digital / smart watches, occasionally alkaline (LR) for basic low-cost quartz movements."),
            ("Where it's used", "Analog quartz wristwatches (dominantly silver oxide), digital wristwatches and small smartwatches (mixed silver oxide and lithium), calculator watches (typically lithium), some smart-band applications (Li-ion rechargeable, not covered here)."),
            ("End-of-life hazards", "Swallowing risk. Silver oxide cells contain silver worth recovering at bulk scale. Lithium primary cells have low but non-zero fire risk if crushed."),
            ("Recycling and disposal", "Watch shops are natural collection points — they replace many cells and can batch used cells for periodic pickup. In Kochi: batch with other battery pickup."),
        ],
        "cross_refs": ["silver-oxide-battery", "lithium-manganese-battery", "coin-cell-battery", "button-cell-battery"],
    },
    {
        "slug": "hearing-aid-battery",
        "title": "Hearing Aid Battery",
        "lead": "Zinc-air primary cells sized specifically for hearing aid form factors, colour-coded by size.",
        "sections": [
            ("Composition and operating principle", "Nearly all modern hearing aid batteries are zinc-air chemistry — the high energy density per unit volume is ideal for the ear-worn form factor. Activated by removing a tab that admits air; once activated, the cell discharges within days to weeks depending on hearing-aid draw. Sizes are colour-coded to standard: yellow (10), brown (312), orange (13), blue (675)."),
            ("Where it's used", "Traditional (non-rechargeable) hearing aids. Modern rechargeable hearing aids use Li-ion cells sealed into the device."),
            ("End-of-life hazards", "Very low-hazard at end of life — used cells have discharged fully. Small size means swallowing risk for children."),
            ("Recycling and disposal", "Audiology clinics and hearing-aid providers are natural collection points — they see high volumes of used cells and can batch periodic pickups. Bulk zinc-air collections have some recovery value; individual consumer disposal is common but suboptimal."),
        ],
        "cross_refs": ["zinc-air-battery", "button-cell-battery", "silver-oxide-battery", "watch-battery-types"],
    },
    {
        "slug": "nickel-iron-battery",
        "title": "Nickel-Iron (Edison) Battery",
        "lead": "Historical rechargeable chemistry with exceptionally long service life — some Edison-era cells still operational.",
        "sections": [
            ("Composition and operating principle", "Ni-Fe cells use nickel oxyhydroxide as the positive electrode and iron as the negative, with alkaline electrolyte. Nominal cell voltage 1.2V. Distinctive characteristic: extreme durability — Ni-Fe cells tolerate deep discharge, overcharge, and mechanical abuse in a way no other chemistry matches. Documented service lives of 40+ years are not exceptional."),
            ("Where it's used", "Historic railway signalling, industrial backup, off-grid solar (niche modern applications where extreme longevity matters more than energy density or efficiency). Not present in consumer electronics."),
            ("End-of-life hazards", "Very low toxicity — no lead, no cadmium, no mercury. Iron and nickel are common metals. Alkaline electrolyte is standard."),
            ("Recycling and disposal", "Rare enough that recycling infrastructure is not organised for Ni-Fe specifically — cells are typically processed alongside other alkaline-family batteries. Given the extreme service life, very few reach recycling in any given year."),
        ],
        "cross_refs": ["nickel-in-batteries", "nickel-metal-hydride-nimh", "nickel-cadmium-nicd", "second-life-batteries"],
    },
    {
        "slug": "sodium-ion-battery",
        "title": "Sodium-Ion Battery",
        "lead": "Emerging lower-cost lithium-ion alternative using abundant sodium instead of lithium.",
        "sections": [
            ("Composition and operating principle", "Na-ion cells work on the same intercalation principle as Li-ion but use sodium instead of lithium as the shuttling ion. Cathodes typically use layered transition-metal oxides or Prussian-blue analogues. Nominal cell voltage 3-3.2V range. Energy density is lower than Li-ion (100-160 Wh/kg range) but sodium abundance and lower processing cost give a cost advantage."),
            ("Where it's used", "Emerging commercial applications in stationary grid storage, some EV pilot projects, and industrial applications where the energy-density penalty is acceptable. Not yet significant in consumer electronics."),
            ("End-of-life hazards", "Thermal stability characteristics are broadly comparable to LFP — safer than cobalt-heavy Li-ion but still requires proper handling. No cobalt content is a supply-chain and ethics advantage."),
            ("Recycling and disposal", "Recycling infrastructure is nascent — process approaches parallel Li-ion but the economics differ (no cobalt or nickel to recover). Direct-recycling approaches may prove more economically viable for Na-ion than for cobalt-Li chemistries."),
        ],
        "cross_refs": ["lithium-ion-battery", "lithium-iron-phosphate-lfp", "sodium-sulfur-battery", "solid-state-battery"],
    },
    {
        "slug": "sodium-sulfur-battery",
        "title": "Sodium-Sulfur (NaS) Battery",
        "lead": "High-temperature grid-storage chemistry using molten sodium and sulfur.",
        "sections": [
            ("Composition and operating principle", "NaS cells use molten sodium as the negative electrode and molten sulfur as the positive, separated by a solid beta-alumina electrolyte. Operating temperature 300-350°C — the cells must remain hot to function. Nominal cell voltage 2V. High energy density and long cycle life at scale."),
            ("Where it's used", "Grid-scale stationary storage (multi-MWh installations, dominantly in Japan). Not applicable to consumer electronics or small-scale applications."),
            ("End-of-life hazards", "Molten sodium and molten sulfur are both reactive. End-of-life batteries require carefully controlled cooling and specialised dismantling. Damaged cells during operation can cause fires."),
            ("Recycling and disposal", "Specialised industrial process — no consumer-scale disposal path. Battery-scale recycling operations recover sodium, sulfur, and beta-alumina."),
        ],
        "cross_refs": ["sodium-ion-battery", "redox-flow-battery", "solid-state-battery", "second-life-batteries"],
    },
    {
        "slug": "redox-flow-battery",
        "title": "Redox Flow Battery",
        "lead": "Grid-storage chemistry using liquid electrolytes pumped through a membrane cell.",
        "sections": [
            ("Composition and operating principle", "Flow batteries decouple energy (stored in liquid electrolyte tanks) from power (determined by cell membrane area). Vanadium redox is the most commercially deployed chemistry, using vanadium ions in two oxidation states as the positive and negative electrolytes. Other chemistries: iron-chromium, zinc-bromine, all-iron. Voltage and capacity scale independently — a distinctive advantage over solid-electrode batteries."),
            ("Where it's used", "Grid-scale stationary storage (typically 100 kW to multi-MW installations), particularly where long-duration discharge is required. Not applicable to consumer electronics."),
            ("End-of-life hazards", "Vanadium is toxic in some oxidation states. Zinc-bromine chemistries involve bromine, corrosive and toxic. Membrane materials are chemically robust but represent a specific end-of-life stream."),
            ("Recycling and disposal", "Vanadium electrolyte has high recovery value — often reused directly without processing when a battery is decommissioned. Other components (tanks, membranes, cell stacks) enter specialised industrial waste streams."),
        ],
        "cross_refs": ["sodium-sulfur-battery", "solid-state-battery", "second-life-batteries", "circular-economy-electronics"],
    },
    {
        "slug": "solid-state-battery",
        "title": "Solid-State Battery",
        "lead": "Emerging lithium chemistry replacing liquid electrolyte with a solid ionic conductor — improved safety and energy density.",
        "sections": [
            ("Composition and operating principle", "Solid-state Li-ion cells replace the flammable liquid organic electrolyte with a solid ionic conductor — ceramic, polymer, or composite. This eliminates most thermal-runaway risk (no flammable liquid to vent), enables use of a lithium-metal anode (higher energy density than graphite), and improves cycle life in principle. Commercial deployment is in early stages as of 2026 with several manufacturers targeting EV applications."),
            ("Where it's used", "Emerging in premium EVs and specialised consumer electronics; not yet dominant in any category. Prototype and pilot deployments are numerous; large-scale commercial cells are just entering the market."),
            ("End-of-life hazards", "Substantially safer than conventional Li-ion — the absence of liquid flammable electrolyte removes the primary thermal-runaway pathway. Lithium metal anode presents its own hazards if a cell is breached but overall safety profile is expected to be better."),
            ("Recycling and disposal", "Recycling processes are being developed alongside cell chemistry. The solid electrolyte requires different processing than liquid — hydrometallurgy is less applicable. Direct recycling (preserving the cathode) is a promising approach for high-value components."),
        ],
        "cross_refs": ["lithium-ion-battery", "lithium-titanate-lto", "thermal-runaway-lithium", "circular-economy-electronics"],
    },
    {
        "slug": "lead-crystal-battery",
        "title": "Lead-Crystal Battery",
        "lead": "Modified sealed lead-acid chemistry claiming improved cycle life and deep-discharge tolerance.",
        "sections": [
            ("Composition and operating principle", "Lead-crystal batteries are a modified VRLA design using a proprietary electrolyte formulation (typically sulfuric acid with additives that promote crystalline rather than amorphous plate structure during cycling). Manufacturer claims include extended cycle life, better deep-discharge tolerance, and wider temperature operating range compared to conventional AGM or gel batteries. Independent verification of these claims varies."),
            ("Where it's used", "Some off-grid solar installations, specialised UPS applications, marketed as a lithium-alternative in cost-sensitive applications. Market presence is modest."),
            ("End-of-life hazards", "Same lead-toxicity and sulfuric-acid concerns as any lead-acid chemistry. No special hazards beyond standard lead-acid handling."),
            ("Recycling and disposal", "Standard lead-acid recycling processes handle lead-crystal batteries — the modified electrolyte and plate structure don't affect downstream lead recovery."),
        ],
        "cross_refs": ["sealed-lead-acid-sla", "absorbent-glass-mat-agm", "gel-lead-acid-battery", "lead-in-electronics"],
    },
]

# ---------------------------------------------------------------------------
# TEMPLATE
# ---------------------------------------------------------------------------

TEMPLATE = '''\
---
// DRAFT — Quarantined. Auto-generated by scripts/generate-encyclopedia-batch.py
// Category: Battery Chemistries. Do NOT hand-edit; regenerate from the script's
// ENTRIES data if content needs to change (keeps the batch consistent).
import Layout from "../../../layouts/Layout.astro";
import Breadcrumbs from "../../../components/Breadcrumbs.astro";
import CtaBar from "../../../components/CtaBar.astro";
import {{ SITE_URL }} from "../../../data/site";
import {{ getHreflang }} from "../../../data/routes";

const term = "{title}";
const title = `${{term}} — E-Waste Encyclopedia | Ewaste Kochi`;
const description = "{description}";
const lastUpdated = "2026-08-05";

const breadcrumbItems = [
  {{ name: "Home", path: "/" }},
  {{ name: "Encyclopedia", path: "/encyclopedia/" }},
  {{ name: term, path: "/encyclopedia/{slug}/" }}
];

const crossReferences = {cross_refs_js};

const jsonLd = [
  {{
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${{SITE_URL}}/encyclopedia/{slug}/`,
    name: term,
    description,
    inDefinedTermSet: {{ "@type": "DefinedTermSet", name: "E-Waste Encyclopedia", "@id": `${{SITE_URL}}/encyclopedia/` }},
    url: `${{SITE_URL}}/encyclopedia/{slug}/`,
    termCode: "{slug}",
  }},
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: term,
    description,
    url: `${{SITE_URL}}/encyclopedia/{slug}/`,
    dateModified: lastUpdated,
    author: {{ "@id": `${{SITE_URL}}/#organization` }},
    publisher: {{ "@id": `${{SITE_URL}}/#organization` }},
    mainEntityOfPage: `${{SITE_URL}}/encyclopedia/{slug}/`,
    about: {{ "@type": "Thing", name: term }},
  }},
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((b, i) => ({{ "@type": "ListItem", position: i + 1, name: b.name, item: `${{SITE_URL}}${{b.path}}` }})),
  }},
];

const hreflangPairs = getHreflang("/encyclopedia/{slug}/");
---

<Layout title={{title}} description={{description}} canonical={{`${{SITE_URL}}/encyclopedia/{slug}/`}} hreflang={{hreflangPairs}} jsonLd={{jsonLd}}>
  <Breadcrumbs items={{breadcrumbItems}} />
  <article class="encyclopedia-entry">
    <header>
      <p class="term-category">Battery Chemistries</p>
      <h1>{{term}}</h1>
      <p class="term-summary">{lead}</p>
    </header>
{sections_html}
    <section>
      <h2>Related entries</h2>
      <ul>
        {{crossReferences.map((slug) => (
          <li><a href={{`/encyclopedia/${{slug}}/`}}>{{slug.replace(/-/g, " ")}}</a></li>
        ))}}
      </ul>
    </section>
    <section>
      <h2>Related services in Kochi</h2>
      <p>
        Batteries in this chemistry family are picked up under our{{" "}}
        <a href="/battery-recycling/">battery recycling</a> service in Kochi.
        Battery categories are <strong>Kochi doorstep only</strong> —
        dangerous-goods courier restrictions prevent pan-India ship-in for
        any battery type.
      </p>
    </section>
    <p class="last-updated">Last updated: {{lastUpdated}}</p>
    <CtaBar
      primaryHref="https://wa.me/917500555454?text=Hi%20Ewaste%20Kochi%2C%20I%20need%20battery%20recycling."
      primaryLabel="WhatsApp for battery pickup"
      secondaryHref="/battery-recycling/"
      secondaryLabel="All battery recycling"
    />
  </article>
</Layout>
'''

SECTION_TEMPLATE = '''\
    <section>
      <h2>{h2}</h2>
      <p>{body}</p>
    </section>
'''


def render_entry(entry: dict) -> str:
    sections_html = "".join(SECTION_TEMPLATE.format(h2=s[0], body=s[1]) for s in entry["sections"])
    # Build cross_refs as a JS array literal
    cross_refs_js = "[" + ", ".join(f'"{r}"' for r in entry["cross_refs"]) + "]"
    return TEMPLATE.format(
        title=entry["title"],
        slug=entry["slug"],
        description=entry["lead"][:160],
        lead=entry["lead"],
        cross_refs_js=cross_refs_js,
        sections_html=sections_html,
    )


def main():
    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    count = 0
    for entry in ENTRIES:
        out_dir = OUT_ROOT / entry["slug"]
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "index.astro"
        out_file.write_text(render_entry(entry))
        count += 1
    print(f"✓ generated {count} encyclopedia entries in {OUT_ROOT.relative_to(REPO_ROOT)}/")


if __name__ == "__main__":
    main()
