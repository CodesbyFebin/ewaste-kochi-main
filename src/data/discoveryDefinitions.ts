import type { DiscoveryGuide } from "./discoveryGuideTypes";

const ewasteSource = {
  title: "E-Waste (Management) Rules, 2022: frequently asked questions",
  href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf",
  publisher: "Central Pollution Control Board",
  note: "Read with subsequent amendments and current portal notices; applicability depends on the entity and equipment.",
};
const batterySource = {
  title: "EPR portal for Battery Waste Management",
  href: "https://eprbattery.cpcb.gov.in/",
  publisher: "Central Pollution Control Board",
};
const nistSource = {
  title: "SP 800-88 Rev. 2: Guidelines for Media Sanitization",
  href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final",
  publisher: "National Institute of Standards and Technology",
  note: "Consult the official publication page and its supplementary guidance for updates.",
};

export const DEFINITION_GUIDES: DiscoveryGuide[] = [
  {
    slug: "what-is-e-waste",
    category: "definitions",
    title: "What Is E-Waste?",
    description: "Understand discarded electronics, the difference between reuse and recycling, and why batteries need a separate waste route in India.",
    answer: "E-waste is electrical or electronic equipment discarded as waste, including relevant components, parts and production or repair rejects. In India, the E-Waste (Management) Rules, 2022 apply to specified equipment; waste batteries have a separate regulatory framework.",
    sections: [
      {
        heading: "Recognising electronics at the end of use",
        paragraphs: [
          "Examples include unwanted computers, mobile phones, printers, televisions and covered household appliances. A device does not have to be completely broken before its owner discards it. Conversely, a working laptop genuinely transferred for continued use is not automatically a consignment for material recycling. Record the intended destination rather than describing every old item as scrap.",
          "For a household cleanout, list the device, quantity, condition and whether it stores personal information. Organisations should also identify ownership and asset numbers. Check unfamiliar equipment against the current rules and Schedule I instead of assuming that every object containing a wire has identical obligations.",
        ],
      },
      {
        heading: "Misconceptions about ordinary waste and batteries",
        paragraphs: [
          "A recycling symbol does not mean an electronic device belongs in the household recycling bin. Mixed-waste collection can damage batteries and lose valuable materials. Keep electronics dry and intact while arranging an appropriate collection route; do not dismantle appliances or open sealed battery packs.",
          "Waste batteries are governed separately by the Battery Waste Management Rules, 2022, as amended. A laptop and its battery can therefore require coordinated but distinct downstream handling. Leave an embedded battery in place and disclose its condition so the receiving provider can arrange safe professional separation.",
        ],
      },
    ],
    faq: [
      { q: "Is an old charger e-waste?", a: "An unwanted charger should go through an appropriate electronics collection route, not mixed rubbish. Confirm acceptance with the recipient, including damaged cables and accessories." },
      { q: "Must I recycle a working computer?", a: "Not necessarily. Assess safe repair, resale or donation first, protect stored data, and use recycling when further use is unsuitable." },
    ],
    related: [
      { label: "E-waste examples and categories", path: "/wiki/technical/what-is-e-waste/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "Why recycle electronics?", path: "/why-recycle-electronics/" },
    ],
    sources: [ewasteSource, batterySource],
  },
  {
    slug: "what-is-lithium-battery-recycling",
    category: "definitions",
    title: "What Is Lithium Battery Recycling?",
    description: "Learn what specialist lithium battery recycling recovers, why chemistry matters, and how safe collection differs from household recycling.",
    answer: "Lithium battery recycling is specialist treatment of discarded batteries to recover usable materials while controlling electrical, fire and chemical hazards. In India, it belongs under the Battery Waste Management Rules, 2022, as amended, rather than being treated simply as ordinary e-waste.",
    sections: [
      {
        heading: "Recovery depends on the battery chemistry",
        paragraphs: [
          "Lithium batteries appear in phones, laptops, power tools, electric vehicles and stationary storage. Rechargeable lithium-ion batteries differ from single-use lithium metal cells, and lithium-ion chemistries also differ from one another. Available recovery processes and material outputs depend on these differences, so not every pack contains the same valuable metals.",
          "Specialist facilities assess incoming batteries and use controlled processing to recover materials such as copper, aluminium and relevant battery metals. The useful question for a collector is which registered downstream facility accepts that chemistry and condition. Collection alone does not establish that recovery has already taken place.",
        ],
      },
      {
        heading: "Misconceptions that create handling risks",
        paragraphs: [
          "A battery that no longer powers a device can still retain enough energy to start a fire. Do not deliberately discharge it, puncture it, crush it or open the pack to recover individual cells. A recycling symbol indicates a recovery possibility, not permission to place it with paper, glass or household rubbish.",
          "For intact loose consumer batteries, protect exposed terminals with non-conductive tape where safe and follow the recipient's instructions. Swollen, leaking or damaged batteries need specialist advice before movement. Stop using or charging affected equipment. If it is hot, smoking or hissing, keep away, move people to safety and contact emergency services rather than attempting a routine pickup.",
        ],
      },
    ],
    faq: [
      { q: "Should I remove a glued-in laptop battery?", a: "No. Leave sealed equipment intact and tell the provider that it contains a battery. Professional separation avoids damage during removal." },
      { q: "Can an e-waste registration cover every battery?", a: "Do not assume so. Verify the separate battery registration and acceptance scope for the actual receiving facility and waste stream." },
    ],
    related: [
      { label: "Battery disposal locations", path: "/wiki/disposal/where-to-recycle-batteries/" },
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Recycle batteries safely", path: "/how-to-recycle-batteries-safely/" },
    ],
    sources: [batterySource, { title: "Frequent questions on lithium-ion batteries", href: "https://www.epa.gov/recycle/frequent-questions-lithium-ion-batteries", publisher: "US Environmental Protection Agency", note: "Technical safety background, not Indian legal requirements." }],
  },
  {
    slug: "what-is-itad",
    category: "definitions",
    title: "What Is ITAD?",
    description: "IT asset disposition explained: ownership checks, data sanitization, reuse decisions, recycling and evidence for retired business equipment.",
    answer: "ITAD means IT asset disposition: the controlled retirement of computers, servers, storage and other IT equipment. It combines asset accounting, data protection, reuse or resale decisions and responsible recycling rather than treating an office clearout as a simple scrap sale.",
    sections: [
      {
        heading: "A lifecycle process with separate decisions",
        paragraphs: [
          "Start with an inventory showing asset identifiers, ownership, location, condition and storage media. Leased equipment may need to be returned, while purchased equipment may be eligible for internal redeployment or sale. Finance, IT and the information owner should agree which assets can leave and which records must be preserved before any sanitization occurs.",
          "Each device then needs an approved data treatment and destination. A usable server may be redeployed after appropriate sanitization; a failed drive may need specialist destruction. Equipment unsuitable for reuse should enter a verified recycling route. Batteries require their own compliant downstream handling, even when collected within an IT asset batch.",
        ],
      },
      {
        heading: "Misconceptions about certificates and vendor labels",
        paragraphs: [
          "ITAD is a service description, not a government licence or proof of a particular certification. Ask who performs transport, sanitization and recycling, and verify documents against those exact entities and facilities. A logo or a generic statement about secure disposal is not a substitute for scoped evidence.",
          "A recycling receipt does not establish that every drive was sanitized. Reconcile collection records, media-level results, exceptions and final disposition against the original inventory. Agree how missing labels, inaccessible drives, failed wipes and downstream transfers will be reported. Keep unresolved assets open in the register rather than closing the entire batch when the vehicle leaves.",
        ],
      },
    ],
    faq: [
      { q: "Is ITAD only for large companies?", a: "No. Smaller offices can use the same controls with a short asset list and clear ownership approvals. The process should match the data sensitivity and equipment volume." },
      { q: "Does ITAD guarantee resale income?", a: "No. Condition, demand, data treatment and logistics affect the outcome. Obtain written terms separating any recovery value from service charges." },
    ],
    related: [
      { label: "Choosing an ITAD vendor", path: "/wiki/sales/choose-secure-itad-vendor/" },
      { label: "ITAD service", path: "/itad/" },
      { label: "What is data destruction?", path: "/what-is-data-destruction/" },
    ],
    sources: [ewasteSource, nistSource],
  },
  {
    slug: "what-is-cpcb-registration",
    category: "definitions",
    title: "What Is CPCB Registration for E-Waste?",
    description: "Understand role-specific CPCB portal registration, how to check a recycling partner, and why one registration does not cover every activity.",
    answer: "CPCB registration under India's e-waste framework records an eligible entity in its applicable role on the official portal. Manufacturers, producers, refurbishers and recyclers have distinct responsibilities. It is not a blanket environmental certification for every service offered by a business.",
    sections: [
      {
        heading: "Registration follows the regulated activity",
        paragraphs: [
          "The E-Waste (Management) Rules, 2022 establish portal registration for covered manufacturers, producers, refurbishers and recyclers. A producer bringing covered equipment to market is not interchangeable with the facility processing discarded equipment. Check the legal definitions, applicable exclusions and current CPCB instructions before deciding which registration an organisation needs.",
          "For vendor due diligence, request the legal entity name, registration number, registered role, facility address, scope and validity information. Match these against official records and identify the actual downstream processor if the person collecting the equipment is only coordinating transport. A document for another company or location needs an explained contractual connection, not an assumption.",
        ],
      },
      {
        heading: "Misconceptions about what registration proves",
        paragraphs: [
          "GST registration, a trade licence and a website saying 'CPCB approved' do not establish the relevant e-waste registration. Likewise, a producer registration does not establish permission to operate a recycling plant. State pollution-control consents and other applicable permissions may need separate verification for the facility and its activities.",
          "Battery waste has a separate framework and portal. An e-waste document is not automatic evidence of battery recycling registration. Registration also does not prove that your particular consignment was processed or that its data was erased. Keep batch receipts and sanitization evidence separately, and recheck official status when selecting or renewing a provider.",
        ],
      },
    ],
    faq: [
      { q: "Does a household need portal registration to recycle a phone?", a: "Ordinary ownership and disposal do not make a household a producer or recycler. Use an appropriate collection route; business activities may create different obligations." },
      { q: "Is an old certificate sufficient?", a: "Not by itself. Check current validity, scope and any suspension or change of entity, using official records or clarification from the regulator." },
    ],
    related: [
      { label: "Choosing a recycler", path: "/wiki/technical/choose-recycler/" },
      { label: "ITAD enquiries", path: "/itad/" },
      { label: "Comply with e-waste rules", path: "/how-to-comply-with-e-waste-rules/" },
    ],
    sources: [ewasteSource, batterySource, { title: "E-waste EPR management system", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" }],
  },
  {
    slug: "what-is-epr",
    category: "definitions",
    title: "What Is EPR in E-Waste Management?",
    description: "Extended Producer Responsibility explained through producer obligations, registered recycling and the difference between receipts and EPR certificates.",
    answer: "Extended Producer Responsibility, or EPR, assigns specified end-of-life responsibilities to producers bringing covered products to market. Under India's e-waste framework, covered producers meet assigned obligations through the regulated recycling-certificate system. Consumers do not become EPR-obligated producers simply by owning electronics.",
    sections: [
      {
        heading: "How responsibility connects products and recycling",
        paragraphs: [
          "A producer can include an own-brand manufacturer, an own-brand seller of equipment made by another supplier, or an importer offering covered equipment for sale. The precise definition and product coverage matter more than the size of a disposal batch. A business should map its activities before assuming that it is only a user of electronics.",
          "The CPCB system links eligible recycling by registered recyclers to EPR certificates and producer obligations. Product categories, relevant sales information, reporting periods and current rules affect compliance. A producer needs reconciled records and valid portal transactions, not merely photographs of an awareness event or evidence that some old computers were collected.",
        ],
      },
      {
        heading: "Misconceptions about universal duties and certificates",
        paragraphs: [
          "EPR is not a universal requirement for every consumer to buy recycling credits. Bulk consumers have their own channelisation responsibilities, while manufacturers, refurbishers and recyclers have different duties. An organisation can occupy more than one role, so separate those responsibilities in its compliance register.",
          "A provider-issued recycling certificate for a pickup is not automatically a CPCB portal EPR certificate. The two documents serve different purposes and should not be described interchangeably. Waste batteries also operate under separate Battery Waste Management Rules and their own EPR system; electronics and battery obligations must not be merged into a single unsupported claim.",
        ],
      },
    ],
    faq: [
      { q: "Does selling my personal used laptop make me a producer?", a: "A household resale does not by itself create the role of a producer placing covered branded or imported equipment on the market. Commercial activities need their own assessment." },
      { q: "Can a consultant take over legal responsibility?", a: "A consultant may assist with records and filings, but outsourcing administration does not remove the regulated entity's responsibility for accurate information and compliance." },
    ],
    related: [
      { label: "EPR in India", path: "/wiki/technical/epr-india-rules/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "Why EPR is mandatory", path: "/why-epr-is-mandatory/" },
    ],
    sources: [ewasteSource, batterySource, { title: "E-waste EPR management system", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" }],
  },
  {
    slug: "what-is-data-destruction",
    category: "definitions",
    title: "What Is Data Destruction?",
    description: "Distinguish deleting files, media sanitization and physical destruction, with practical checks for data-bearing electronics leaving your control.",
    answer: "Data destruction commonly describes making stored information inaccessible through an appropriate sanitization process. Depending on the media, sensitivity and intended reuse, that may involve logical sanitization or professional physical destruction. Deleting files, damaging a screen or collecting a device for recycling does not establish that outcome.",
    sections: [
      {
        heading: "Choose the outcome before the method",
        paragraphs: [
          "Identify the information owner, retention requirements and every storage device involved. Computers may contain multiple drives; printers, network appliances and security recorders may also retain information. Confirm that backups work and that no legal hold or contractual restriction prevents disposal. Sanitization of one local device does not delete separate cloud copies or archived backups.",
          "NIST SP 800-88 provides a risk-based framework using clear, purge and destroy methods. Selection depends on media characteristics, data sensitivity, equipment condition and whether reuse is allowed. Magnetic hard disks and flash-based SSDs do not respond identically to the same technique, so require a method justified for the actual medium rather than a generic pass-count claim.",
        ],
      },
      {
        heading: "Misconceptions about visible damage and proof",
        paragraphs: [
          "A broken computer can still contain readable storage. Formatting or an unverified reset should not automatically be treated as suitable sanitization for sensitive information. Do not drill, burn, smash or dismantle devices yourself; specialist physical processing needs controlled equipment and a safe route for the resulting waste.",
          "Evidence should connect a media identifier to the selected method, execution result, verification and approval. Ask how failures and inaccessible devices are handled. A certificate without an asset list or result details may be difficult to reconcile, while a recycling receipt normally records material handling rather than proof of information removal.",
        ],
      },
    ],
    faq: [
      { q: "Must every drive be physically destroyed?", a: "No. Suitable verified sanitization can permit reuse when policy and risk allow it. Failed media or higher-sensitivity cases may need professional destruction." },
      { q: "Is encryption alone enough?", a: "Not automatically. Cryptographic erase requires appropriate encryption coverage, key management and implementation assurance. Have the method assessed against current guidance and the device's capabilities." },
    ],
    related: [
      { label: "Data security during recycling", path: "/wiki/technical/data-security-recycling/" },
      { label: "Data destruction service", path: "/data-destruction/" },
      { label: "Plan hard-drive data destruction", path: "/how-to-destroy-hard-drive-data/" },
    ],
    sources: [nistSource],
  },
  {
    slug: "what-is-form-6",
    category: "definitions",
    title: "What Is Form 6 for E-Waste?",
    description: "Understand the legacy 2016 e-waste manifest, its limits as evidence, and why current transport documentation must be checked for the actual waste stream.",
    answer: "Form 6 was the e-waste transport manifest under India's E-Waste (Management) Rules, 2016. It documented movement between sender, transporter and receiver. Those rules were superseded by the 2022 framework; Form 6 must not be presented as a universal current requirement for every e-waste pickup.",
    sections: [
      {
        heading: "What the legacy manifest recorded",
        paragraphs: [
          "The 2016 manifest captured sender and receiver details, transport information, a description of the consignment and acknowledgements. Its purpose was traceability during movement, not proof that recycling or data sanitization had been completed. Historical files can legitimately contain it, and some organisational templates still use familiar manifest terminology.",
          "When reviewing an old record, check the shipment date, equipment description, quantity and parties against the corresponding asset list and receipt. Preserve the original document rather than relabelling it as a modern certificate. A signed transport record can support a chain of custody but cannot establish every later processing event.",
        ],
      },
      {
        heading: "Misconceptions about today's paperwork",
        paragraphs: [
          "Do not copy a 2016 checklist into a current disposal contract without reviewing the E-Waste (Management) Rules, 2022, amendments and applicable regulator directions. Ask the provider to identify which present requirement, facility condition or contractual control supports each requested document. Practical movement records remain useful even when an old statutory form is not the applicable requirement.",
          "Form 10 is the manifest associated with the Hazardous and Other Wastes framework; it is not a universal replacement form for every e-waste shipment. Waste batteries are separately regulated too. Classify the actual waste and transport circumstances before choosing documents, and obtain regulator or qualified compliance advice when mixed streams or unusual residues are involved.",
        ],
      },
    ],
    faq: [
      { q: "Does Form 6 prove my hard drive was erased?", a: "No. Seek a separate media-level sanitization record tied to the drive identifier, method and outcome, regardless of the movement document used." },
      { q: "Should a provider refuse all legacy-style manifests?", a: "Not necessarily. A contract may use one for traceability, but the provider should distinguish voluntary recordkeeping from a current statutory obligation." },
    ],
    related: [
      { label: "Indian e-waste law overview", path: "/wiki/technical/indian-laws/" },
      { label: "ITAD service", path: "/itad/" },
      { label: "Request recycling evidence", path: "/how-to-get-certificate-of-recycling/" },
    ],
    sources: [
      { title: "Form 6: E-Waste Manifest under the 2016 rules", href: "https://kspcb.karnataka.gov.in/sites/default/files/inline-files/FORM-6-E-waste-Rules-2016_0.pdf", publisher: "Karnataka State Pollution Control Board", note: "Historical form, not a statement of universal current applicability." },
      ewasteSource,
      { title: "Form 10: Manifest for Hazardous and Other Waste", href: "https://ddnocmms.nic.in/SPCB_DOCUMENTS/Foms%2010-%20HW.pdf", publisher: "Pollution Control Committee, Daman and Diu", note: "Separate hazardous-waste framework; applicability must be assessed." },
    ],
  },
  {
    slug: "what-is-nist-800-88",
    category: "definitions",
    title: "What Is NIST SP 800-88?",
    description: "A practical introduction to NIST media sanitization guidance, clear/purge/destroy decisions and the evidence needed beyond a compliance label.",
    answer: "NIST SP 800-88 is guidance for establishing a media sanitization programme that makes access to target data infeasible for a defined level of effort. Consult NIST's official publication page for the current revision, supplementary guidance and status rather than relying on old vendor summaries.",
    sections: [
      {
        heading: "A decision framework, not one wiping command",
        paragraphs: [
          "The guidance connects information sensitivity, storage technology, reuse plans and organisational controls. Clear, purge and destroy describe different sanitization approaches. The correct choice depends on the actual medium and risk: a magnetic hard disk, an SSD and a managed storage service have different characteristics and boundaries.",
          "A sanitization programme also assigns responsibilities, chooses suitable techniques, handles exceptions and retains evidence. Verification checks execution, while validation considers whether the result adequately protects the information for its intended disposition. Read the current publication and referenced technical standards alongside device-specific documentation before accepting a proposed method.",
        ],
      },
      {
        heading: "Misconceptions about certification and pass counts",
        paragraphs: [
          "Saying 'NIST compliant' does not establish that NIST certified a recycling business or a particular sanitization job. Ask for the publication version, selected method, media identification and recorded results. A vendor's marketing language should not replace a documented explanation of how the process fits your information and equipment.",
          "There is no universal number of overwrite passes that solves every storage problem. Flash storage can contain areas not addressed like ordinary files, and failed devices may not execute commands successfully. Physical destruction also needs a defined professional process. Do not treat a damaged enclosure or a photograph of broken equipment as sufficient assurance of sanitization.",
        ],
      },
    ],
    faq: [
      { q: "Is NIST SP 800-88 an Indian recycling licence?", a: "No. It concerns information sanitization. Indian waste-management registration, facility permissions and downstream recycling controls remain separate matters." },
      { q: "Can I keep using an older policy?", a: "Review it against the official current publication, contractual requirements and your risk assessment. Document any differences rather than assuming an old revision remains the latest guidance." },
    ],
    related: [
      { label: "Hard-drive destruction overview", path: "/wiki/technical/hard-drive-destruction/" },
      { label: "Data destruction service", path: "/data-destruction/" },
      { label: "What is data destruction?", path: "/what-is-data-destruction/" },
    ],
    sources: [nistSource, { title: "Frequently asked questions for SP 800-88r2", href: "https://csrc.nist.gov/files/pubs/sp/800/88/r2/final/docs/sp800-88r2-faq.pdf", publisher: "National Institute of Standards and Technology" }],
  },
  {
    slug: "why-recycle-electronics",
    category: "definitions",
    title: "Why Recycle Electronics?",
    description: "Understand material recovery, pollution prevention and responsible reuse without assuming that every collected device is fully recycled.",
    answer: "Responsible electronics recycling recovers useful materials and directs hazardous components into controlled treatment instead of mixed rubbish or crude processing. Reuse and repair can be preferable for suitable equipment, while recycling provides an end-of-life route when continued use is no longer appropriate.",
    sections: [
      {
        heading: "Recover materials without passing on hidden risks",
        paragraphs: [
          "Electronics contain metals, plastics and glass whose extraction and manufacture require resources and energy. Recovering usable material can reduce demand for virgin inputs. The benefit depends on actual treatment and downstream outlets; collecting a box of devices is only the beginning of the process, not the same as completed recovery.",
          "Some equipment also contains substances or components needing special handling. Batteries can ignite if damaged, and refrigeration equipment needs professional attention to refrigerants and oils. Informal burning, uncontrolled breaking and dumping can transfer risks to workers and neighbours. Keep products intact and ask how the receiving facility handles these components and remaining residues.",
        ],
      },
      {
        heading: "Misconceptions about replacement and total recovery",
        paragraphs: [
          "Recycling is not a reason to replace functioning electronics prematurely. Check whether maintenance, a suitable upgrade or a genuine recipient can extend useful life. For very inefficient appliances, consider operating energy and safety as well as repairability. Donation only helps when the recipient wants usable equipment rather than inheriting a disposal problem.",
          "Not every material in every device is recovered, and a generic environmental claim cannot establish your batch's outcome. Request a traceable destination and suitable documentation instead of assuming 'zero waste' or a fixed carbon saving. Protect stored information separately, and remember that waste batteries in India follow their own rules even when embedded in discarded electronics.",
        ],
      },
    ],
    faq: [
      { q: "Does storing old electronics at home count as recycling?", a: "No. Temporary dry, secure storage can support safe collection, but it does not recover materials. Arrange an accepted reuse or recycling destination rather than accumulating devices indefinitely." },
      { q: "Should I choose the highest scrap offer?", a: "Value is only one factor. Verify downstream handling, data protection and collection terms so the transaction does not lose important safety or traceability controls." },
    ],
    related: [
      { label: "Environmental impact", path: "/wiki/technical/environmental-impact/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "Schedule an e-waste pickup", path: "/how-to-schedule-e-waste-pickup/" },
    ],
    sources: [ewasteSource, batterySource, { title: "Electronics basic information, research and initiatives", href: "https://www.epa.gov/electronics-batteries-management/electronics-basic-information-research-and-initiatives", publisher: "US Environmental Protection Agency", note: "Environmental background; US regulatory and tax provisions are not Indian requirements." }],
  },
  {
    slug: "why-epr-is-mandatory",
    category: "definitions",
    title: "Why Is EPR Mandatory?",
    description: "Learn why covered producers have statutory EPR obligations, how responsibilities differ by role, and why charitable collection cannot replace compliance.",
    answer: "EPR is mandatory for entities covered by the relevant producer definition because India's waste rules assign them end-of-life obligations for products placed on the market. It shifts responsibility beyond voluntary collection. It does not impose identical recycling targets or portal duties on every household or consumer.",
    sections: [
      {
        heading: "Why a legal obligation exists",
        paragraphs: [
          "Without defined producer responsibility, the costs of discarded equipment can fall on users, municipalities and poorly controlled scrap handling. The e-waste framework connects covered producers to a formal recycling system, with registration, assigned obligations and reporting. This creates an accountable route beyond occasional campaigns or voluntary promises to take back unwanted products.",
          "Mandatory does not mean every organisation has the same task. An own-brand seller or covered importer may be a producer, a recycling plant has processing duties, and a bulk consumer has channelisation responsibilities. Determine the actual activity and product coverage, including relevant exclusions, before building a compliance calendar or buying certificates.",
        ],
      },
      {
        heading: "Misconceptions about donations and outsourcing",
        paragraphs: [
          "An awareness drive, cash donation or ordinary collection receipt does not automatically satisfy an assigned producer EPR obligation. The relevant evidence and transactions must meet the current rules and CPCB system requirements. Paying an intermediary also does not excuse inaccurate product data, unsupported certificate claims or missed reporting duties.",
          "Battery EPR operates under separate Battery Waste Management Rules and a separate portal. An enterprise selling equipment containing batteries may need to assess both frameworks rather than assuming one registration resolves everything. Non-compliance can attract environmental compensation and regulatory action, but the applicable response depends on the violation and current provisions; avoid generic penalty figures or blanket compliance guarantees.",
        ],
      },
    ],
    faq: [
      { q: "Do all businesses buying computers have EPR targets?", a: "No. Buying equipment for use does not alone make a business a producer. Assess any manufacturing, own-brand selling or import activity separately from its role as a user." },
      { q: "Can a recycler guarantee my company's compliance?", a: "A recycler can provide relevant services and evidence, but your company must still establish its role, maintain accurate records and meet its own applicable obligations." },
    ],
    related: [
      { label: "EPR rules overview", path: "/wiki/technical/epr-india-rules/" },
      { label: "ITAD service", path: "/itad/" },
      { label: "What is EPR?", path: "/what-is-epr/" },
      { label: "E-waste compliance workflow", path: "/how-to-comply-with-e-waste-rules/" },
    ],
    sources: [ewasteSource, batterySource, { title: "Environmental compensation guidelines under the e-waste rules", href: "https://eprewaste.cpcb.gov.in/assets/PDF/EC-Guidelines-under-E-Waste-Management-Rules-2022-25.08.25.pdf.pdf", publisher: "Central Pollution Control Board", note: "Consult current provisions for the specific entity and violation." }],
  },
];
