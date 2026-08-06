# E-Waste Encyclopedia — 500 canonical slugs, categorized

**Status:** DRAFT — quarantined. Zero pages published. Review the slug list,
trim/rename/reorder as needed, then approve batches of ~25-50 for content
generation.

**URL pattern:** `/encyclopedia/{slug}/` — flat namespace. Chosen over
`/glossary/{slug}/` (thin connotation), `/encyclopedia/{category}/{slug}/`
(unnecessary depth, hurts crawlability), or `/e-waste-glossary/{slug}/`
(keyword-stuffed).

**Content standard per entry (Phase 2):**
- 200-400 words of genuine definition + explanation
- Cross-references to at least 2 related encyclopedia entries + 1 service/blog page
- Passage-level source citation for regulatory / scientific / statistical claims
- `Article` + `DefinedTerm` + `BreadcrumbList` JSON-LD
- Passes similarity gate against existing V2 pages (no re-writing of existing blogs under an encyclopedia URL)
- `draft: true` frontmatter until reviewed

**Similarity gate — must pass before promotion:**
Any entry whose primary intent overlaps an existing V2 page (`/blog/*`,
`/battery-recycling/*`, service pages, tools) must EITHER (a) have a
substantively narrower/deeper angle (e.g., a Wikipedia-style definition
distinct from a how-to blog), OR (b) be dropped in favor of enhancing the
existing canonical.

**Category counts (total 500):**
1. Materials & Substances — 45
2. Battery Chemistries — 30
3. Device Categories — 40
4. Components & Parts — 45
5. Recycling Processes — 35
6. Data Destruction & Security — 30
7. Standards & Frameworks — 35
8. Legal & Regulatory (India-focused) — 40
9. Hazards, Health & Occupational Safety — 35
10. Business, ITAD & Corporate Terms — 35
11. Materials Recovery — 30
12. Sustainability & Circular Economy — 30
13. Global E-Waste Facts & Geography — 30
14. India-Specific (Cities, Terms, Institutions) — 40

---

## 1. Materials & Substances (45)

- `lead-in-electronics` — Toxic heavy metal historically used in solder and CRT glass; primary concern under RoHS.
- `mercury-in-electronics` — Used in older LCDs, fluorescent tubes, thermometers; potent neurotoxin.
- `cadmium-in-electronics` — Ni-Cd batteries, some plastics stabilizers; carcinogenic.
- `hexavalent-chromium` — Corrosion-inhibitor coatings on steel components; restricted under RoHS.
- `arsenic-in-electronics` — Gallium arsenide semiconductors, some legacy displays.
- `beryllium-in-electronics` — Springs, connectors, thermal management; occupational hazard.
- `polybrominated-biphenyls-pbb` — Legacy flame retardants in casings; restricted worldwide.
- `polybrominated-diphenyl-ethers-pbde` — Modern flame retardants; environmental persistence concern.
- `polyvinyl-chloride-pvc-in-cables` — Cable insulation; releases dioxins if burned.
- `brominated-flame-retardants` — Category of flame retardants across plastics.
- `phthalates-in-electronics` — Plasticizers in cable insulation and casings.
- `lithium-metal` — Alkali metal in Li-ion batteries; fire hazard when damaged.
- `cobalt-in-batteries` — Cathode material in Li-ion; ethical sourcing concerns.
- `nickel-in-batteries` — NMC / NCA / Ni-MH cathode / current collector material.
- `copper-in-electronics` — Primary conductor; highest-volume recovered metal by weight.
- `aluminum-in-electronics` — Chassis, heatsinks, current collectors.
- `gold-in-electronics` — Contact plating, bond wires; concentrated in ICs and connectors.
- `silver-in-electronics` — Contacts, conductive adhesives, solder paste.
- `palladium-in-electronics` — MLCC capacitors, plating.
- `platinum-in-electronics` — Some hard drive platters, catalytic surfaces.
- `tin-in-solder` — Primary solder component; often alloyed with silver / copper.
- `indium-in-displays` — Indium tin oxide (ITO) transparent conductive layer.
- `gallium-in-electronics` — GaN / GaAs semiconductors.
- `germanium-in-electronics` — Some fiber-optic and infrared applications.
- `tantalum-in-capacitors` — High-density capacitors; conflict-mineral concern.
- `rare-earth-elements-in-electronics` — Neodymium, dysprosium, etc.; magnets and phosphors.
- `neodymium-in-hard-drives` — Voice coil motor magnets in HDDs.
- `dysprosium-in-magnets` — Additive to Nd magnets for high-temperature stability.
- `yttrium-in-phosphors` — Red phosphor in older CRT and fluorescent displays.
- `europium-in-phosphors` — Red / blue phosphor in displays.
- `terbium-in-phosphors` — Green phosphor.
- `phosphorus-in-electronics` — Phosphor coatings, flame retardants.
- `tungsten-in-electronics` — Interconnects in ICs; hard-drive components.
- `bismuth-in-solder` — Lead-free solder alloy component.
- `antimony-in-electronics` — Flame retardant synergist; lead-acid battery grids.
- `selenium-in-electronics` — Legacy rectifiers, some solar cells.
- `tellurium-in-electronics` — Thin-film solar (CdTe), some phase-change memory.
- `abs-plastic-in-electronics` — Common casing plastic; recyclable.
- `hips-plastic-in-electronics` — TV / monitor casings; recyclable.
- `polycarbonate-in-electronics` — Optical media substrate, some casings.
- `crt-glass-lead-content` — Cathode ray tubes contain up to 3-4 kg of lead per unit.
- `ferrite-in-electronics` — Inductor cores, EMI suppressors.
- `silicon-in-electronics` — Semiconductor substrate; abundant, low toxicity.
- `sapphire-glass-in-electronics` — Camera lens covers, some watch faces.
- `graphite-in-batteries` — Li-ion anode material.

## 2. Battery Chemistries (30)

- `lithium-ion-battery` — Rechargeable chemistry dominant in consumer electronics; various cathodes.
- `lithium-polymer-battery` — LiPo variant with polymer electrolyte, flexible form factor.
- `lithium-iron-phosphate-lfp` — Safer, lower-density cathode; long-cycle applications.
- `lithium-cobalt-oxide-lco` — High-density cathode; laptops, phones.
- `lithium-nickel-manganese-cobalt-nmc` — Balanced cathode; EVs and modern laptops.
- `lithium-nickel-cobalt-aluminum-nca` — High-energy cathode; Tesla and premium EVs.
- `lithium-titanate-lto` — Fast-charge, long-cycle, low-density.
- `nickel-metal-hydride-nimh` — Rechargeable AA/AAA, hybrid vehicles.
- `nickel-cadmium-nicd` — Legacy rechargeable; restricted for cadmium content.
- `nickel-zinc-battery` — Newer alkaline-family rechargeable.
- `sealed-lead-acid-sla` — Maintenance-free lead-acid; UPS units.
- `flooded-lead-acid` — Wet-cell lead-acid; traditional inverter and automotive.
- `absorbent-glass-mat-agm` — Advanced sealed lead-acid variant.
- `gel-lead-acid-battery` — Gelled electrolyte lead-acid; deep-cycle applications.
- `alkaline-battery-primary` — Zinc-manganese-dioxide non-rechargeable.
- `zinc-carbon-battery` — Legacy dry-cell primary.
- `silver-oxide-battery` — Watch and hearing-aid button cells.
- `lithium-manganese-battery` — CR-family coin cells; primary chemistry.
- `zinc-air-battery` — Hearing aids and some emergency applications.
- `mercury-battery-legacy` — Historical button cell; phased out for toxicity.
- `coin-cell-battery` — Form factor descriptor for various small chemistries.
- `button-cell-battery` — Alternative name for coin cells.
- `watch-battery-types` — Common chemistries: silver oxide, lithium, alkaline.
- `hearing-aid-battery` — Zinc-air primaries with removable tabs.
- `nickel-iron-battery` — Legacy Edison cell; very long service life.
- `sodium-ion-battery` — Emerging lower-cost alternative to Li-ion.
- `sodium-sulfur-battery` — High-temperature grid storage chemistry.
- `redox-flow-battery` — Liquid-electrolyte grid storage.
- `solid-state-battery` — Emerging Li-ion successor with solid electrolyte.
- `lead-crystal-battery` — Modified lead-acid chemistry.

## 3. Device Categories (40)

- `smartphone-e-waste` — Modern mobile phones; small format, high material value.
- `feature-phone-e-waste` — Basic mobile phones; low-value but common.
- `tablet-e-waste` — Slate-form devices; ship-in eligible via Shiprocket.
- `laptop-e-waste` — Portable computers; ship-in eligible via Shiprocket.
- `ultrabook-e-waste` — Thin-form laptop subcategory.
- `desktop-computer-e-waste` — Tower and small-form PCs; Kochi-doorstep only.
- `workstation-e-waste` — High-performance desktop class; often ITAD candidates.
- `server-e-waste` — Rack and tower servers; typically ITAD flow.
- `mainframe-e-waste` — Enterprise-scale legacy compute.
- `network-router-e-waste` — Consumer and enterprise routing equipment.
- `network-switch-e-waste` — Layer-2 / layer-3 switches; ITAD common.
- `modem-e-waste` — DSL / cable / fiber modems.
- `printer-inkjet-e-waste` — Consumer inkjet devices.
- `printer-laser-e-waste` — Toner-based printers.
- `all-in-one-printer-e-waste` — Combined print/scan/copy units.
- `scanner-e-waste` — Standalone document / photo scanners.
- `cctv-camera-e-waste` — Analog and IP surveillance cameras.
- `dvr-nvr-e-waste` — Digital / network video recorders.
- `television-crt-e-waste` — Cathode-ray-tube TVs; lead-glass handling required.
- `television-lcd-e-waste` — LCD-panel televisions.
- `television-oled-e-waste` — Organic-LED televisions.
- `television-led-lcd-e-waste` — LED-backlit LCD televisions.
- `computer-monitor-lcd` — Desktop LCD monitors.
- `computer-monitor-crt` — Legacy CRT monitors; lead-glass handling.
- `computer-monitor-oled` — OLED monitors.
- `projector-e-waste` — LCD / DLP / laser projectors.
- `refrigerator-e-waste` — Home refrigeration; refrigerant recovery required.
- `washing-machine-e-waste` — Top / front load; motor and control PCB.
- `microwave-oven-e-waste` — Magnetron requires specialised handling.
- `air-conditioner-e-waste` — Split / window; refrigerant recovery critical.
- `water-purifier-e-waste` — RO / UV units; filter cartridge separate stream.
- `mixer-grinder-e-waste` — Small kitchen appliance category.
- `electric-iron-e-waste` — Small appliance; heating element + wiring.
- `hair-dryer-e-waste` — Motor + heating element.
- `gaming-console-e-waste` — PlayStation, Xbox, Nintendo family.
- `handheld-gaming-e-waste` — Nintendo Switch, Steam Deck, legacy handhelds.
- `e-reader-e-waste` — Kindle, Kobo, other E-Ink devices.
- `smartwatch-e-waste` — Wearable smart devices.
- `fitness-tracker-e-waste` — Wristband and clip trackers.
- `smart-speaker-e-waste` — Echo, Google Home, HomePod class.

## 4. Components & Parts (45)

- `printed-circuit-board-pcb` — Substrate carrying electronic components.
- `motherboard-e-waste` — Main system board of a computer.
- `cpu-chip-e-waste` — Central processing unit; recoverable gold content.
- `gpu-chip-e-waste` — Graphics processing unit; high-value recovery.
- `ram-module-e-waste` — Memory modules; DDR generations differ.
- `ssd-solid-state-drive` — NAND-flash storage; requires specific data destruction.
- `hard-disk-drive-hdd` — Magnetic platter storage; degauss or shred for data destruction.
- `optical-disk-drive` — CD / DVD / Blu-ray drives.
- `power-supply-unit-psu` — AC-DC converter; contains capacitors, transformer.
- `electrolytic-capacitor` — Polarized capacitor; can leak or explode when aged.
- `ceramic-capacitor` — Non-polarized; MLCC contains palladium.
- `film-capacitor` — Various dielectrics; less environmentally hazardous.
- `resistor-e-waste` — Passive component; low individual value, bulk recovery.
- `transistor-e-waste` — Amplifying / switching semiconductor.
- `transformer-e-waste` — Wound magnetic component; copper recovery.
- `inductor-e-waste` — Wound coil; copper + ferrite core.
- `diode-e-waste` — One-way current component.
- `integrated-circuit-ic` — Chip housing multiple components.
- `connector-e-waste` — Physical interface components; often gold-plated.
- `coaxial-cable-e-waste` — RF cable; copper conductor.
- `ethernet-cable-e-waste` — Cat5/6/7 twisted-pair.
- `hdmi-cable-e-waste` — Digital video cable.
- `usb-cable-e-waste` — Universal serial bus cabling.
- `power-cord-e-waste` — Mains AC power cables.
- `lcd-panel-e-waste` — Liquid crystal display panel.
- `oled-panel-e-waste` — Organic LED display panel.
- `lcd-backlight-ccfl` — Legacy cold-cathode fluorescent backlight; mercury content.
- `lcd-backlight-led` — Modern LED-lit backlight.
- `camera-sensor-e-waste` — CCD / CMOS image sensor.
- `camera-lens-e-waste` — Optical assembly.
- `magnetic-tape-e-waste` — Data storage tape media.
- `floppy-disk-e-waste` — Legacy magnetic diskette.
- `cd-rom-e-waste` — Optical disc storage.
- `dvd-media-e-waste` — Digital versatile disc.
- `blu-ray-media-e-waste` — High-density optical media.
- `memory-stick-e-waste` — USB flash storage.
- `sd-card-e-waste` — Secure digital removable storage.
- `microsd-card-e-waste` — Miniature SD variant.
- `cf-card-e-waste` — CompactFlash storage.
- `sim-card-e-waste` — Subscriber identity module.
- `mechanical-keyboard-e-waste` — Switch-based keyboards.
- `membrane-keyboard-e-waste` — Common budget keyboards.
- `optical-mouse-e-waste` — Optical / laser pointing device.
- `wired-headphones-e-waste` — 3.5mm / USB audio devices.
- `wireless-earphones-e-waste` — Bluetooth earbuds; embedded batteries.

## 5. Recycling Processes (35)

- `manual-dismantling` — Human-labor disassembly at fixed stations.
- `mechanical-shredding` — Hammer mill / shear-based size reduction.
- `cryogenic-shredding` — Cooled shredding of plastics for cleaner separation.
- `granulation-recycling` — Fine particle reduction after shredding.
- `air-classification` — Density-based separation using airflow.
- `magnetic-separation` — Ferrous metal extraction.
- `eddy-current-separation` — Non-ferrous metal extraction using induced currents.
- `density-separation` — Fluid-based (water, heavy media) separation.
- `gravity-separation` — Density difference in gravitational or centrifugal field.
- `flotation-recycling` — Selective wetting to separate materials.
- `pyrometallurgy` — High-temperature smelting for metal recovery.
- `hydrometallurgy` — Solution-chemistry-based metal recovery.
- `electrometallurgy` — Electrolytic metal refining.
- `bioleaching` — Microorganism-mediated metal recovery.
- `biosorption` — Biological materials bind metal ions from solution.
- `solvent-extraction` — Liquid-liquid selective metal transfer.
- `ion-exchange-recycling` — Resin-based metal ion capture.
- `electrowinning` — Metal deposition on cathode from solution.
- `smelting-e-waste` — High-temperature metal recovery from ore or scrap.
- `refining-recycled-metal` — Purification of recovered metals.
- `controlled-incineration-e-waste` — High-temp thermal treatment with emissions control.
- `plasma-arc-recycling` — Extreme-temperature ionized-gas processing.
- `pyrolysis-e-waste` — Thermal decomposition in absence of oxygen.
- `gasification-e-waste` — Thermal conversion to syngas.
- `cementation-metal-recovery` — Displacement precipitation of one metal by another.
- `precipitation-recycling` — Solution chemistry to form solid metal compounds.
- `distillation-recycling` — Vaporization-condensation separation.
- `sintering-recovery` — Compaction under heat.
- `calcination` — High-temperature oxidation or decomposition.
- `roasting-metallurgy` — Oxidative heating of ore.
- `open-burning-e-waste` — Informal-sector combustion; environmentally destructive.
- `acid-stripping-e-waste` — Informal acid baths to strip metals; hazardous.
- `mercury-amalgamation` — Historical gold recovery method; banned in many contexts.
- `cyanide-leaching` — Gold recovery method; regulated for toxicity.
- `zero-waste-processing` — Aspirational full-material-recovery approach.

## 6. Data Destruction & Security (30)

- `degaussing-hard-drive` — Magnetic field application to erase magnetic media.
- `physical-shredding-drive` — Mechanical destruction into small fragments.
- `disintegration-media` — Fine-particle destruction beyond shredding.
- `incineration-data-media` — Thermal destruction of media.
- `cryptographic-erase` — Deleting encryption keys to render data unreadable.
- `secure-erase-ata` — Firmware-level drive erasure command.
- `block-level-overwrite` — Writing patterns to every addressable block.
- `single-pass-overwrite` — One-pattern pass (modern recommended standard for HDDs).
- `multi-pass-overwrite` — Multiple pattern passes (legacy standard).
- `gutmann-method` — 35-pass overwrite algorithm; largely obsolete.
- `dod-5220-22-m` — US Dept of Defense overwrite standard.
- `nist-800-88-purge` — NIST recommended erasure guideline.
- `nist-800-88-clear` — NIST lower-security erasure category.
- `nist-800-88-destroy` — NIST physical destruction guideline.
- `hmg-infosec-standard-5` — UK government erasure standard.
- `csec-canada-standard` — Canadian government standard.
- `common-criteria-eal` — Evaluation Assurance Levels for security products.
- `data-remanence` — Residual data after nominal erasure.
- `wear-leveling-ssd` — SSD controller feature that complicates overwrite.
- `over-provisioning-ssd` — Reserved capacity making some data un-addressable.
- `trim-command-ssd` — Marks blocks as unused; not equivalent to secure erase.
- `fips-140-2-compliance` — US crypto module standard.
- `aes-encryption-drives` — Advanced Encryption Standard for storage.
- `self-encrypting-drive-sed` — Hardware-encrypted drive.
- `opal-standard-drives` — TCG standard for SED management.
- `chain-of-custody-data` — Documented custody transitions for data-bearing media.
- `certificate-of-destruction` — Signed evidence document of destruction.
- `witnessed-destruction` — On-site third-party observation of destruction.
- `paper-shredder-security-levels` — DIN 66399 P-levels for document destruction.
- `data-erasure-vs-destruction` — Distinction between logical erasure and physical destruction.

## 7. Standards & Frameworks (35)

- `iso-14001-e-waste` — Environmental management systems standard.
- `iso-27001-data-security` — Information security management standard.
- `r2-standard-recycling` — Responsible Recycling certification.
- `e-stewards-standard` — Basel Action Network recycling certification.
- `weeelabex-standard` — European WEEE labelling standard.
- `cenelec-e-waste-standards` — European Committee for Electrotechnical Standardisation.
- `rohs-directive` — EU Restriction of Hazardous Substances directive.
- `weee-directive` — EU Waste Electrical and Electronic Equipment directive.
- `basel-convention` — International hazardous waste transport treaty.
- `basel-ban-amendment` — Ban on hazardous waste export to developing countries.
- `bamako-convention` — African hazardous waste import ban.
- `stockholm-convention` — Persistent Organic Pollutants treaty.
- `epr-extended-producer-responsibility` — Producer accountability for post-consumer waste.
- `take-back-scheme` — Manufacturer-organized product return.
- `product-stewardship` — Shared responsibility across product lifecycle.
- `cradle-to-cradle-certification` — Product-level circular design certification.
- `circular-economy-framework` — Economic model minimizing waste through closed loops.
- `epeat-certification` — Environmental IT product registry.
- `energy-star-electronics` — US EPA energy efficiency standard.
- `tco-certified` — Sustainability certification for IT products.
- `ce-marking-electronics` — European conformity marking.
- `fcc-part-15-electronics` — US electromagnetic compatibility rules.
- `ul-listing-electronics` — Underwriters Laboratories safety certification.
- `gri-standards-reporting` — Global Reporting Initiative sustainability standards.
- `sasb-standards` — Sustainability Accounting Standards Board.
- `tcfd-recommendations` — Climate-related financial disclosures framework.
- `brsr-india-reporting` — SEBI Business Responsibility and Sustainability Report.
- `gri-306-waste` — GRI waste and effluent standard.
- `cdp-climate-disclosure` — Carbon Disclosure Project reporting.
- `iso-45001-safety` — Occupational health and safety management.
- `iso-9001-quality` — Quality management systems.
- `iec-62430-eco-design` — Ecodesign of electrical / electronic products.
- `ipc-a-610-electronics` — Acceptability of electronic assemblies.
- `astm-standards-recycling` — American materials testing standards.
- `wbcsd-guidelines` — World Business Council sustainable development guidance.

## 8. Legal & Regulatory (India-focused) (40)

- `e-waste-management-rules-2022-india` — Current Indian e-waste regulation framework.
- `e-waste-management-rules-2016-india` — Previous framework, superseded.
- `cpcb-guidelines-e-waste` — Central Pollution Control Board authority.
- `kspcb-authorization` — Kerala State Pollution Control Board recycler authorization.
- `spcb-authorization-generic` — Any State Pollution Control Board authorization.
- `epr-registration-india` — Extended Producer Responsibility portal registration.
- `cpcb-epr-portal` — Central portal for EPR filings and certificates.
- `epr-target-calculation` — Producer obligation calculation methodology.
- `epr-certificate-purchase` — Compliance mechanism via recycler-issued certificates.
- `moefcc-india` — Ministry of Environment, Forest and Climate Change.
- `hazardous-waste-rules-india` — HOWM Rules 2016 covering hazardous waste.
- `batteries-waste-management-rules-2022` — Separate battery waste regulation.
- `plastic-waste-management-rules-india` — Plastic waste regulation and EPR.
- `bis-certification-electronics` — Bureau of Indian Standards product certification.
- `rti-e-waste-india` — Right to Information queries on e-waste enforcement.
- `national-green-tribunal-e-waste` — Environmental judicial body decisions.
- `environmental-clearance-india` — MoEFCC clearance for large operations.
- `consent-to-establish` — SPCB pre-construction consent.
- `consent-to-operate` — SPCB operational consent.
- `factories-act-e-waste` — Occupational safety framework relevant to recycling facilities.
- `environmental-protection-act-1986` — Parent Indian environmental legislation.
- `water-act-1974-india` — Prevention and control of water pollution.
- `air-act-1981-india` — Prevention and control of air pollution.
- `forest-conservation-act-india` — Land-use approval framework.
- `wildlife-protection-act-india` — Adjacent environmental regulation.
- `biological-diversity-act-india` — Biodiversity protection framework.
- `national-environment-policy-2006` — Policy framework document.
- `environmental-impact-assessment-eia` — Pre-project environmental evaluation.
- `environmental-audit-india` — Post-implementation compliance evaluation.
- `pollution-control-board-hierarchy` — CPCB / SPCB / District structure.
- `import-of-e-waste-india` — Basel Convention implementation in Indian law.
- `epa-notification-e-waste` — Environment Protection Act notifications.
- `weee-notification-india` — Historical WEEE-related notifications.
- `state-e-waste-rules` — State-specific implementations of central rules.
- `dpdp-act-2023-data` — Digital Personal Data Protection Act, relevant to data destruction.
- `it-act-2000-data` — Information Technology Act data-related provisions.
- `srg-secure-response-guidelines` — Data breach response frameworks.
- `crime-investigation-e-waste` — CBI / state investigation of e-waste crimes.
- `custom-duty-e-waste-import` — Import duty and restrictions on e-waste.
- `gst-e-waste-recycling` — Tax implications of e-waste recycling business.

## 9. Hazards, Health & Occupational Safety (35)

- `lead-poisoning-e-waste` — Chronic exposure symptoms and remediation.
- `mercury-poisoning-e-waste` — Neurotoxicity from occupational exposure.
- `cadmium-poisoning-e-waste` — Kidney and bone toxicity from chronic exposure.
- `chromium-toxicity-hexavalent` — Respiratory and skin effects.
- `brominated-flame-retardant-exposure` — Endocrine and developmental effects.
- `dioxin-exposure-open-burning` — Carcinogenic byproducts of PVC combustion.
- `furan-exposure-e-waste` — Related to dioxins; combustion byproducts.
- `silicosis-e-waste-workers` — Silica dust exposure from mechanical processing.
- `respiratory-hazards-e-waste` — Dust, fumes, VOCs affecting recycler workers.
- `dermatological-hazards-e-waste` — Skin contact hazards from solvents and metals.
- `developmental-toxicity-e-waste` — Reproductive and childhood exposure impacts.
- `neurotoxicity-heavy-metals` — Lead, mercury, cadmium neurological effects.
- `endocrine-disruption-e-waste` — Hormone-system disruption from BFRs and phthalates.
- `carcinogens-in-e-waste` — Category of cancer-causing substances present.
- `teratogens-in-e-waste` — Birth-defect-causing substances.
- `informal-recycling-hazards` — Health impacts on informal sector workers.
- `open-burning-hazards` — Community-wide impact of open cable burning.
- `acid-stripping-hazards` — Sulfuric/nitric acid gold recovery risks.
- `cyanide-leaching-hazards` — Gold recovery method with acute toxicity.
- `groundwater-contamination-e-waste` — Leachate pathway from dump sites.
- `soil-contamination-e-waste` — Long-term land degradation from dumping.
- `air-pollution-e-waste-sites` — Community air quality impact.
- `occupational-safety-e-waste` — OSH management for recyclers.
- `ppe-e-waste-workers` — Personal protective equipment requirements.
- `respirator-selection-e-waste` — Choosing appropriate respiratory protection.
- `first-aid-heavy-metal-exposure` — Immediate response protocols.
- `battery-fire-safety` — Lithium and lead-acid fire hazards.
- `thermal-runaway-lithium` — Lithium battery cascading heat failure.
- `chemical-spill-response-e-waste` — Acid, solvent, mercury spill protocols.
- `emergency-response-e-waste-facility` — Facility-level incident preparation.
- `heat-stress-recycling-worker` — Occupational heat exposure risks.
- `noise-exposure-shredder` — Hearing conservation in mechanical processing areas.
- `ergonomic-injury-dismantling` — Repetitive strain from manual disassembly.
- `child-labor-informal-recycling` — Global concern in informal e-waste sector.
- `womens-health-e-waste-informal` — Reproductive health impacts specifically.

## 10. Business, ITAD & Corporate Terms (35)

- `itad-it-asset-disposition` — End-of-life IT asset management service category.
- `reverse-logistics-e-waste` — Backward flow from consumer to recycler.
- `asset-recovery-value` — Financial return from decommissioned IT assets.
- `refurbishment-electronics` — Restoration to working condition for resale.
- `remanufacturing-electronics` — Systematic rebuild to like-new specification.
- `upcycling-electronics` — Repurposing for higher-value use.
- `resale-refurbished-devices` — Secondary market for restored electronics.
- `buyback-program` — Purchase of used devices from consumers or enterprises.
- `trade-in-program` — Credit against new purchase for old device.
- `leased-asset-return` — End-of-lease device disposition workflow.
- `decommissioning-it-asset` — Formal retirement of enterprise IT.
- `secure-disposal-service` — Chain-of-custody-controlled disposal.
- `itad-chain-of-custody` — Documented transfer trail through ITAD workflow.
- `serialized-tracking-itad` — Per-asset-identifier tracking through disposition.
- `batch-processing-itad` — Aggregate handling with batch-level documentation.
- `itad-workflow-standard` — Established sequence of ITAD operations.
- `itad-audit-report` — End-of-cycle disposition documentation.
- `itad-reporting-metrics` — KPIs for ITAD provider performance.
- `data-sanitization-services` — Category of data-destruction service offerings.
- `secure-data-erasure` — Certified erasure meeting audit requirements.
- `on-site-destruction` — Destruction performed at client location.
- `off-site-destruction` — Destruction at ITAD provider facility.
- `bulk-collection-corporate` — Large-volume single-cycle pickup.
- `corporate-recycling-program` — Ongoing enterprise disposal partnership.
- `enterprise-e-waste-strategy` — Company-wide approach to e-waste generation and disposal.
- `e-waste-management-plan-corporate` — Formal documented approach for a company.
- `environmental-management-system-e-waste` — ISO 14001-style formalized EMS covering e-waste.
- `sustainability-report-e-waste-section` — E-waste line in corporate sustainability reports.
- `csr-e-waste-programs` — Corporate Social Responsibility initiatives in e-waste space.
- `cost-per-asset-itad` — Unit economics of ITAD service.
- `reverse-supply-chain` — Broader term for backward materials flow.
- `product-take-back-obligations` — Manufacturer-side reverse-logistics requirements.
- `warranty-return-e-waste` — RMA-flow disposition of returned devices.
- `bulk-buyback-pricing` — Volume-based purchase pricing structure.
- `enterprise-mobile-buyback` — Corporate device fleet buyback programs.

## 11. Materials Recovery (30)

- `material-recovery-facility-mrf` — Sorting facility for mixed recyclables.
- `secondary-raw-materials` — Recovered materials re-entering supply chains.
- `urban-mining-concept` — Metal recovery from consumer waste vs virgin ore.
- `resource-efficiency-e-waste` — Maximizing material output per unit input.
- `precious-metals-recovery` — Gold, silver, palladium, platinum from e-waste.
- `rare-earth-recovery-e-waste` — Neodymium, dysprosium, etc. recovery challenges.
- `plastic-resin-identification-code` — 7-category recyclable plastic marking.
- `ferrous-metal-recovery` — Steel and iron recovery streams.
- `non-ferrous-metal-recovery` — Copper, aluminum, brass recovery.
- `copper-recovery-e-waste` — Primary volume metal recovered from e-waste.
- `aluminum-recovery-e-waste` — Second-most-abundant recovered metal.
- `gold-recovery-e-waste` — Concentrated in ICs, connectors; ~200-300 mg/tonne.
- `silver-recovery-e-waste` — Contacts, adhesives; lower concentration than gold.
- `palladium-recovery-e-waste` — MLCC capacitors primary source.
- `platinum-recovery-e-waste` — Limited to specific applications.
- `cobalt-recovery-batteries` — Increasingly important for EV battery loop.
- `lithium-recovery-batteries` — Emerging processes at commercial scale.
- `nickel-recovery-batteries` — From NMC/NCA cathodes.
- `manganese-recovery-batteries` — From various Li-ion chemistries.
- `crt-glass-recycling` — Leaded and unleaded fraction handling.
- `abs-plastic-recovery` — Common recovered plastic from device casings.
- `hips-plastic-recovery` — Common in TV/monitor casings.
- `polycarbonate-recovery` — Optical media and some casings.
- `pcb-refining-process` — Board-level metal recovery workflow.
- `component-harvesting` — Salvaging working ICs, connectors for reuse.
- `refurbishment-supply-chain` — Sourcing and grading refurbishment inputs.
- `remanufactured-components-market` — Secondary market for refurbished parts.
- `battery-second-life` — Retired EV batteries in stationary storage.
- `chip-level-recovery` — Individual IC salvage from PCBs.
- `board-level-refining` — Whole-PCB smelting/leaching approaches.

## 12. Sustainability & Circular Economy (30)

- `circular-economy-electronics` — Closed-loop model for electronics industry.
- `waste-hierarchy-e-waste` — Prevention > reuse > recycle > recover > dispose.
- `reduce-reuse-recycle-electronics` — Consumer-facing waste hierarchy.
- `right-to-repair-electronics` — Movement / legislation enabling repair.
- `product-lifecycle-assessment-lca` — Cradle-to-grave environmental accounting.
- `environmental-footprint-electronics` — Comprehensive impact measure.
- `carbon-footprint-electronics` — CO2-equivalent emissions from lifecycle.
- `water-footprint-electronics` — Water use in electronics manufacturing.
- `ecodesign-electronics` — Design methodology minimizing lifecycle impact.
- `design-for-disassembly` — Design principle enabling end-of-life separation.
- `design-for-recycling` — Broader design-for-environment discipline.
- `modular-design-electronics` — Fairphone-style user-replaceable modules.
- `planned-obsolescence` — Design practice limiting product lifespan.
- `tech-repair-culture` — Community around independent repair.
- `refurbisher-network-global` — Global independent refurbishment ecosystem.
- `upcycling-e-waste-projects` — Creative reuse initiatives.
- `second-life-batteries-applications` — EV batteries in stationary storage.
- `third-party-repair-support` — Independent repair shop ecosystem.
- `oem-repair-programs` — Manufacturer-authorized repair channels.
- `ifixit-repairability-score` — Standardized repair-friendliness rating.
- `weee-recovery-target` — Regulatory recovery quotas.
- `e-waste-collection-rate-metric` — Percentage of generated e-waste collected.
- `extended-warranty-programs` — Warranty extension reducing early disposal.
- `product-take-back-programs` — Manufacturer collection initiatives.
- `closed-loop-recycling-electronics` — Material recovered goes back into same product.
- `open-loop-recycling` — Material recovered goes into different product.
- `dematerialization-electronics` — Reducing material use per unit function.
- `service-based-electronics-models` — Device-as-a-service reducing ownership churn.
- `product-service-systems` — Business models replacing product sale with service.
- `sharing-economy-electronics` — Shared-use models reducing device count.

## 13. Global E-Waste Facts & Geography (30)

- `global-e-waste-monitor-report` — UN university tri-annual global assessment.
- `un-e-waste-report-summary` — Key findings from UN e-waste reports.
- `e-waste-generation-global-tonnes` — Annual worldwide generation figures.
- `e-waste-per-capita-country-comparison` — Cross-country intensity metrics.
- `guiyu-china-e-waste-history` — Historical global e-waste processing hub.
- `agbogbloshie-ghana-e-waste` — West African processing site.
- `delhi-seelampur-e-waste` — Indian informal-sector hub.
- `mumbai-dharavi-e-waste` — Mumbai informal-sector concentration.
- `e-waste-informal-sector-global` — Worker and volume estimates.
- `e-waste-trafficking-illegal-trade` — Illegal transboundary movement.
- `transboundary-movement-e-waste` — Basel-Convention-regulated flows.
- `e-waste-exports-developed-countries` — OECD-to-non-OECD flows.
- `e-waste-imports-developing-countries` — Import destinations and impacts.
- `e-waste-recycling-rate-global` — Percentage globally recycled formally.
- `e-waste-recycling-rate-india` — Indian formal recycling percentage.
- `e-waste-recycling-rate-europe` — EU recycling performance.
- `e-waste-recycling-rate-usa` — US recycling performance.
- `e-waste-recycling-rate-japan` — Japanese recycling performance.
- `e-waste-recycling-rate-china` — Chinese recycling performance.
- `basel-convention-secretariat` — UN body administering Basel.
- `step-initiative-un` — Solving the E-Waste Problem initiative.
- `wefx-forum` — World E-Waste Forum.
- `international-e-waste-day` — Annual awareness event (October 14).
- `e-waste-management-hierarchy-un` — UN-endorsed hierarchy of handling options.
- `basel-annex-viii-list` — Hazardous waste categories under Basel.
- `basel-annex-ix-list` — Non-hazardous waste categories under Basel.
- `oecd-e-waste-guidance` — OECD guidelines for e-waste management.
- `international-labour-organization-e-waste` — ILO informal-sector worker protection.
- `who-e-waste-health` — WHO health impact assessments.
- `unido-e-waste-programs` — UN Industrial Development Organization programs.

## 14. India-Specific (Cities, Terms, Institutions) (40)

- `india-e-waste-generation-annual` — Annual Indian e-waste generation estimates.
- `mumbai-e-waste-scenario` — Mumbai city-level context.
- `delhi-e-waste-scenario` — Delhi NCR context.
- `bangalore-e-waste-scenario` — Bangalore / Bengaluru context.
- `chennai-e-waste-scenario` — Chennai context.
- `hyderabad-e-waste-scenario` — Hyderabad context.
- `kochi-e-waste-scenario` — Kochi / Ernakulam context.
- `thiruvananthapuram-e-waste` — TVM city context.
- `kerala-e-waste-scenario` — State-level Kerala context.
- `tamil-nadu-e-waste-scenario` — State-level Tamil Nadu context.
- `karnataka-e-waste-scenario` — State-level Karnataka context.
- `andhra-pradesh-e-waste` — State-level AP context.
- `telangana-e-waste-scenario` — State-level Telangana context.
- `west-bengal-e-waste-scenario` — State-level WB context.
- `maharashtra-e-waste-scenario` — State-level MH context.
- `gujarat-e-waste-scenario` — State-level GJ context.
- `punjab-e-waste-scenario` — State-level PB context.
- `madhya-pradesh-e-waste` — State-level MP context.
- `uttar-pradesh-e-waste` — State-level UP context.
- `bihar-e-waste-scenario` — State-level BR context.
- `rajasthan-e-waste-scenario` — State-level RJ context.
- `odisha-e-waste-scenario` — State-level OR context.
- `assam-e-waste-scenario` — State-level AS context.
- `northeast-e-waste-india` — Northeast region context.
- `indian-informal-scrap-workers` — Informal sector demographic and economic.
- `kabadiwala-network-india` — Traditional Indian scrap collector network.
- `seelampur-e-waste-market` — Delhi informal e-waste market.
- `mustafabad-e-waste-hub` — Adjacent Delhi hub.
- `indian-authorized-refurbishers` — CPCB-listed refurbishment operators.
- `indian-authorized-recyclers-list` — CPCB registered recycler landscape.
- `india-repair-cafes` — Community repair movement in India.
- `bhopal-electronics-scrap` — Regional scrap hub context.
- `indore-scrap-market` — Regional scrap hub context.
- `jaipur-e-waste-scrap` — Regional scrap hub context.
- `mustard-oil-cable-burning` — Informal-sector Indian practice.
- `indian-e-waste-startups` — Formal-sector Indian e-waste ventures.
- `gharwapsi-electronics` — Return-to-manufacturer concept in Indian context.
- `swacch-bharat-e-waste` — Government cleanliness mission and e-waste.
- `digital-india-e-waste` — Government digitalization program's e-waste implications.
- `swachhta-hi-seva-e-waste` — Government cleanliness campaigns.

---

## Total: 500 slugs

**Distribution:**
- Materials & Substances: 45
- Battery Chemistries: 30
- Device Categories: 40
- Components & Parts: 45
- Recycling Processes: 35
- Data Destruction & Security: 30
- Standards & Frameworks: 35
- Legal & Regulatory (India-focused): 40
- Hazards, Health & Occupational Safety: 35
- Business, ITAD & Corporate Terms: 35
- Materials Recovery: 30
- Sustainability & Circular Economy: 30
- Global E-Waste Facts & Geography: 30
- India-Specific (Cities, Terms, Institutions): 40

**Sum: 500 ✓**

---

## Editorial gates before promotion (per approved 2026-08-05 content controls)

Every entry must pass, before promotion from
`.content-quarantine/generated/encyclopedia/{slug}/index.astro` to
`src/pages/encyclopedia/{slug}/index.astro`:

- [ ] Distinct search intent (not a rewrite of existing V2 page — similarity gate)
- [ ] 200-400 words of substantive content (not a stub)
- [ ] No fabricated statistics, dates, or partner claims
- [ ] Every regulatory / scientific / statistical claim carries a passage-level source
- [ ] Cross-references: 2+ other encyclopedia entries, 1+ service or blog page
- [ ] `Article` + `DefinedTerm` + `BreadcrumbList` JSON-LD
- [ ] Self-referencing canonical
- [ ] Quality ≥85 (evaluator to be defined)
- [ ] `draft: true` frontmatter until reviewed
- [ ] Human editorial approval
- [ ] Batch registered in `src/data/routes.ts`

## Phase 2 batching plan

At ~200-400 words per entry, 500 entries = 100,000-200,000 words. That's a
substantive content project, not a single-turn task. Realistic batching:

| Batch | Terms | Categories | Approx build time |
|---|---|---|---|
| 1 | 30 | Highest-priority sample across all 14 categories | ~1 turn |
| 2-10 | 50/batch | Sequential by category | ~1 turn each |
| Total | 500 | All | ~10-11 turns |

Trim first, then approve batches one at a time to keep quality high and allow
mid-course correction.
