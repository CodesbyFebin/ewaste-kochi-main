import type { DiscoveryGuide } from "./discoveryGuideTypes";
import { BUSINESS } from "./site";

const ewasteSource = {
  title: "E-Waste (Management) Rules, 2022: frequently asked questions",
  href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf",
  publisher: "Central Pollution Control Board",
  note: "Check current amendments and portal notices for role-specific requirements.",
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
  note: "Consult the official publication and supplementary guidance for the current recommendations.",
};
const batterySafetySource = {
  title: "Frequent questions on lithium-ion batteries",
  href: "https://www.epa.gov/recycle/frequent-questions-lithium-ion-batteries",
  publisher: "US Environmental Protection Agency",
  note: "Technical safety guidance, not a statement of Indian legal requirements.",
};

export const HOW_TO_GUIDES: DiscoveryGuide[] = [
  {
    slug: "how-to-recycle-laptop-in-india",
    category: "how-to",
    title: "How to Recycle a Laptop in India",
    description: "Prepare a laptop for responsible recycling with ownership checks, verified backups, storage sanitization and battery-safe collection.",
    answer: "Assess whether the laptop can be reused, protect its data, and arrange handover through a verified electronics collection route. Confirm the receiving recycler and battery handling before release. A non-working laptop may still contain readable data and a battery with stored energy.",
    sections: [
      {
        heading: "Separate the reuse decision from data treatment",
        paragraphs: ["Record the model, condition and ownership before deciding on recycling. A repairable laptop may suit refurbishment, while leased or employer-owned equipment needs the owner's approval. Check for all internal storage, not just the visible system drive. Verify important backups before any irreversible sanitization, and involve IT if business retention requirements apply."],
      },
      {
        heading: "Prepare an intact device for a verified route",
        paragraphs: ["Do not open the laptop to extract an embedded battery. Report swelling, liquid damage or unusual heat before booking, and stop using or charging an affected device. Indian battery waste rules are separate from e-waste rules, so confirm professional downstream handling for both streams. Request collection records and any agreed media-level sanitization evidence separately."],
      },
      {
        heading: "Avoid shortcuts when reuse or data access is uncertain",
        paragraphs: [
          "A laptop can have several independent problems: it may be too slow for its owner, locked to an organisation, unable to boot, or physically unsafe. These conditions should not be collapsed into a single label such as scrap. A slow but intact machine may deserve a repair assessment; a locked machine needs an authorised administrator; an inaccessible drive still needs a data decision. Record each issue separately and ask the recipient which ones its service actually covers. Do not authorise destructive treatment simply to remove an inconvenient account lock, or assume that accepting a machine for parts resolves confidentiality obligations.",
          "Keep safety ahead of demonstrations and backups. If the case is swollen, there is unusual heat or damage suggests a battery problem, do not charge the laptop to retrieve one last file. Ask a qualified provider to assess whether data recovery and safe handling can be coordinated. Do not press the enclosure shut, remove an embedded pack, or follow generic parcel advice for a damaged battery. If the device is smoking, hissing or becoming dangerously hot, move people away and contact emergency services rather than waiting for a routine collection response.",
          "Accessories deserve their own decision. An external drive may contain a duplicate backup, while a charger may belong to a different household member or have damaged insulation. List both rather than placing everything in the same bag without review. Ask whether the recipient wants working accessories for reuse and how unsuitable items will be managed. Keep personal memory cards and security tokens out of the recycling lot unless you have deliberately included them in an authorised disposal plan. A clear inventory prevents a convenient clear-out from becoming an accidental loss of data or someone else's property.",
        ],
      },
      {
        heading: "Compare the complete outcome and close the paperwork",
        paragraphs: [
          "Evaluate a reuse or recycling offer against the whole job. A higher stated value may exclude secure data treatment, collection or a faulty battery, while a lower offer may describe those responsibilities more clearly. Request separate explanations for device value, transport, assessment and any data service; do not infer that any element is free. If repair is proposed, compare the expected usefulness of the repaired laptop with the work required and your actual need for it. Avoid buying unnecessary repairs solely because an informal estimate suggests a future resale amount that no buyer has agreed.",
          "Decide in advance which evidence is proportionate. A household owner may need an identifier-linked receipt and a sanitization result, while an office may also need disposal approval, asset-register updates and downstream processing records. Ask for a sample of the promised reporting so you can see whether it describes collection, treatment or merely the provider's general services. A generic recycling statement does not establish that your particular drive was sanitized. Likewise, a media result does not show where the remaining laptop and battery went. Keep these outcomes distinct even if one provider coordinates them.",
          "After collection, reconcile the final records with the inventory and record any exceptions, including a retained charger, a rejected device or a change to the intended reuse route. Ask for corrections in writing and keep the original version so the history remains understandable. Store receipts securely because serial numbers and contact details can identify you or your organisation. Follow your own retention policy rather than keeping sensitive paperwork indefinitely without a reason. Close the task only when the agreed evidence is present or an unresolved issue has a named owner and a documented next action.",
        ],
      },
    ],
    steps: [
      { name: "Inventory and decide", text: "List the laptop, charger and accessories; note faults and obtain disposal approval where needed. Ask whether reuse assessment is appropriate. Record the model and asset identifier privately, distinguishing your observations from anything a technician has confirmed. Check purchase records, lease terms and employer asset registers before assuming an unused machine is yours to discard. Include external drives and docking stations as separate entries because their ownership, acceptance and data risks can differ. Use existing maintenance records to describe intermittent failures rather than repeatedly powering an unreliable device. Ask a qualified assessor whether a repair would support useful continued service, not merely whether the machine can turn on. Avoid promising a working battery or a complete specification when those details are unknown. Photograph accessible exterior condition without displaying documents or account information. Keep the ownership approval, inventory version and assessment together so a later change from reuse to recycling has a clear reason and does not silently change the agreed data treatment." },
      { name: "Protect information", text: "Check your backup, sign out of accounts and arrange a storage-appropriate sanitization method. Do not treat a failed reset as successful erasure. Open representative files from the backup on another trusted device and check that local folders, email archives and application exports have been included. Confirm that recovery credentials remain available without relying on the laptop being retired. For business equipment, ask IT to resolve retention requirements, legal holds and management enrolment before any irreversible action. Identify whether the device has more than one storage medium using records or qualified support, rather than assuming the advertised system capacity is the complete inventory. Follow current manufacturer and sanitization guidance appropriate to the media and sensitivity of the information. If the process stops, the drive is inaccessible or the outcome cannot be validated, keep the device in controlled custody and agree professional treatment. Retain a result record linked to the asset, but do not place passwords, recovery keys or copies of personal files in a collection email." },
      { name: "Confirm and hand over", text: "Verify the recipient, accepted condition, fees and documentation. Match the laptop identifier to the handover receipt and track unresolved data treatment. Ask whether the collection business is also the processor, and identify the receiving organisation if equipment passes through an intermediary. Confirm the route for the embedded battery and any separate accessories, particularly when the original enquiry described only a working laptop. Obtain written terms for transport, assessment, sanitization and rejected equipment rather than relying on an assumed all-inclusive collection service. Keep the laptop secure until the agreed collector arrives, and check unexpected changes of collector through the original booking contact. Reconcile the device and accessory count before signing; mark any item retained at home rather than allowing it to appear as collected. Save the booking, receipt and agreed reporting milestone in one private folder. If processing or data evidence is due later, assign a follow-up date and record the device as transferred with treatment pending, not as fully completed merely because it has left the premises." },
    ],
    tools: ["Asset list", "Verified backup destination", "Manufacturer support instructions", "Camera for exterior condition photos"],
    timeline: "Allow separate time for backup, sanitization and collection confirmation; device faults and provider availability can extend the process.",
    faq: [
      { q: "Can I recycle a laptop that will not boot?", a: "Usually a suitable recipient can assess it, but confirm acceptance first. Treat its storage as data-bearing until sanitization or destruction is documented." },
      { q: "Must I include the charger?", a: "Ask the recipient. List it separately so its presence, condition and intended reuse or recycling are clear." },
      { q: "Is deleting my user account enough?", a: "No. Removing an account does not demonstrate that every storage location has received suitable sanitization. Check the media inventory, follow current guidance for the device and retain the validated result. If you cannot establish what happened, agree professional treatment and keep custody controlled instead of assuming an empty desktop means an empty drive." },
      { q: "Can I recycle an employer's old laptop after leaving?", a: "Not without the owner's authority. Contact the employer or asset manager and ask whether the device must be returned, retained for records or released for disposal. Keep the written decision and do not remove management controls yourself. Personal files and company information may need separate decisions before any approved sanitization takes place." },
      { q: "What if the recycler changes the plan to refurbishment?", a: "Ask whether your approval and the agreed data controls still cover that outcome. Reuse can be appropriate, but a collection agreement for recycling should not silently become a resale agreement. Obtain the revised disposition in writing, confirm who validates sanitization and request records that describe what actually happened rather than a blanket recycling claim." },
    ],
    readerQuestions: [
      { role: "Student replacing a laptop", q: "My coursework is on the backup drive, but how do I know it is usable?", a: "Open a selection of recent and older files on another trusted computer and check application-specific exports as well as ordinary folders. Confirm you can access the backup without a password or recovery key stored only on the retiring laptop. Keep the laptop under your control until those checks and the data treatment are complete." },
      { role: "Small office manager", q: "One laptop is missing from the collection receipt. Can I close the asset list?", a: "Keep that asset open and compare the signed handover, collector count and internal inventory. Ask the provider to investigate and issue a traceable correction if the record is wrong. Do not edit your inventory simply to make it match an incomplete receipt." },
      { role: "Tenant moving out", q: "The case has started bulging and I need to leave soon. What takes priority?", a: "Stop using or charging the laptop and disclose the swelling when seeking specialist handling. Do not open it, compress it into luggage or send it through an ordinary courier arrangement. If there are active warning signs such as smoke or hissing, move people away and contact emergency services." },
      { role: "Family executor", q: "Can I arrange recycling before deciding which files the family needs?", a: "First establish authority to manage the device and resolve any relevant estate or retention questions. Keep it secure while authorised people decide whether information must be preserved. Recycling and irreversible sanitization should wait until that decision is documented." },
    ],
    related: [
      { label: "Laptop and computer disposal", path: "/wiki/disposal/laptop-and-computer-disposal/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "What is data destruction?", path: "/what-is-data-destruction/" },
    ],
    sources: [ewasteSource, batterySource, nistSource],
  },
  {
    slug: "how-to-recycle-mobile-phone",
    category: "how-to",
    title: "How to Recycle a Mobile Phone",
    description: "Move accounts and authentication safely, prepare phone storage, and choose a suitable collection route without opening the battery enclosure.",
    answer: "Back up the phone, transfer essential account access, follow the manufacturer's disposal preparation instructions and confirm a verified recycling destination. Remove accessible personal cards without opening the enclosure. If damage prevents erasure, arrange professional data handling instead of assuming the phone is unreadable.",
    sections: [
      {
        heading: "Keep access to your digital accounts",
        paragraphs: ["Photos are only part of a phone backup. Check contacts, messages, authenticator access and any locally stored documents. Transfer essential authentication before resetting the old device, and verify that the replacement works. Follow model-specific instructions for account sign-out, activation locks and eSIM removal; a physical SIM and an eSIM are not the same thing."],
      },
      {
        heading: "Handle damage without creating another hazard",
        paragraphs: ["A cracked display does not mean the storage is empty. A swollen case may indicate battery damage: stop using or charging it, do not press it flat, and seek specialist handling advice. Leave sealed batteries in place. Confirm that the recipient can manage the whole phone and route its battery under India's separate battery waste framework."],
      },
      {
        heading: "Prevent account migration and ownership mistakes",
        paragraphs: [
          "Build a short access checklist before treating the old phone as disposable. Banking, email, messaging and work accounts may use different recovery methods, and copying photos does not transfer those methods automatically. Test essential sign-ins on the replacement using your own trusted connection and official applications. Check whether an authenticator needs a supported transfer or a fresh enrolment, and preserve recovery information privately. Do not include recovery codes in photographs sent to a collector. If access fails, resolve it with the relevant service before erasing the device rather than assuming a reset can later be reversed.",
          "Distinguish the handset, telephone number and accounts associated with it. Removing a physical SIM does not cancel a mobile plan, and deleting an eSIM profile is not necessarily the same as transferring or ending service. Follow the carrier's and manufacturer's current instructions for your situation. Check removable memory cards separately because they can retain documents even after the phone itself is reset. Only use a normally accessible tray according to the manual; do not open a sealed enclosure or force a jammed tray. Leave uncertain or damaged hardware to qualified personnel and tell them which personal media may remain inside.",
          "Shared and managed phones need an explicit owner decision. A household device may contain several people's photographs, while a work phone may hold records subject to company retention controls. Ask the authorised owner or administrator to approve disposal and deal with management enrolment and activation restrictions. Avoid unofficial unlocking services or sharing account passwords to make handover easier. Record which person approved the action and what data preparation remains outstanding. If the phone is second-hand and ownership is unclear, resolve that issue before offering it for reuse or giving a collector authority to destroy its storage.",
        ],
      },
      {
        heading: "Compare service scope and retain useful evidence",
        paragraphs: [
          "A phone's age or cracked screen alone does not determine the best destination. Ask whether safe reuse assessment is available and whether faults, storage access or battery condition limit that option. Compare proposals on the same facts, including who collects, who receives the handset and who performs any agreed data treatment. Request a clear explanation of possible charges and conditional value rather than assuming that small devices are collected free. Do not power a damaged phone just to satisfy a valuation request; a provider should know that the condition prevents ordinary testing and should plan assessment accordingly.",
          "Prepare a private device record with the model, an appropriate identifier, visible condition and included accessories. Keep public listings and enquiry photos free of full identifiers, personal notifications and account screens. Before release, ask what evidence distinguishes receipt from completed sanitization or recycling. A generic acknowledgement of electronic waste may be useful for collection but insufficient to resolve an inaccessible phone containing sensitive information. Agree whether a later result will identify your handset, what happens if treatment fails and who will contact you if the destination changes. Avoid promises that a reset or a broken display makes every phone equally safe to release.",
          "At handover, check the collector against the confirmed booking and reconcile the handset and accessories with the receipt. Mark a retained SIM, memory card or charger clearly so the record is not misleading. Save the confirmation, ownership approval where relevant and any later processing evidence in a secure location. If a remote erase remains pending, do not mark data removal complete merely because the phone has been collected. Keep a follow-up action with the provider and preserve the custody record. Finally review account sessions through official settings where appropriate, without assuming that removing a session substitutes for treating local storage.",
        ],
      },
    ],
    steps: [
      { name: "Transfer and verify", text: "Test your backup and essential sign-ins on another device. Obtain employer approval before disposing of a managed phone. Make a checklist covering contacts, messages, local downloads, photographs and any applications that maintain their own backup process. Open representative restored items rather than relying only on a completed progress indicator. Test authentication and account recovery without needing the old handset, and consult official support if a service remains tied to it. Confirm which data belongs to other people or the organisation before copying it to a personal account. Avoid resetting the device while a needed export is still pending. If damage makes use unsafe, stop and ask qualified personnel about the remaining options instead of charging it for one last transfer. Record completion of each preparation task without recording secret credentials, and keep the disposal approval with the private inventory so the handover decision is easy to explain later." },
      { name: "Prepare personal data", text: "Remove accessible SIM and memory cards using manufacturer instructions. Complete the appropriate reset or approved sanitization and check the result. Check the model-specific procedure for account sign-out, activation restrictions, device management and eSIM profiles before starting irreversible work. A physical card, an embedded profile and cloud account data need separate decisions; do not assume one reset resolves all three. Use only normal user-accessible features on an intact phone and do not pry open the enclosure or remove its sealed battery. If a tray is damaged or the display cannot be used, report that limitation to the provider. Ask how successful treatment will be verified for this device and what evidence will be returned if professional handling is required. Treat interrupted resets and undelivered remote requests as unresolved. Keep any removed personal cards securely until you have deliberately decided on their continued use or authorised disposal, rather than placing them loose in an accessory box." },
      { name: "Arrange documented handover", text: "Disclose faults, confirm the receiving organisation and agree data handling for an inaccessible phone. Retain an identifier-linked receipt without publishing the identifier online. Specify whether the enquiry includes a charger, earbuds or a power bank because acceptance of the handset does not imply acceptance of every accessory. Report swelling, liquid exposure and unusual heat before packing or travel, and use specialist instructions for any damaged battery condition. Confirm collection costs, assessment terms and the downstream battery route in writing. On collection day, keep personal cards and unrelated devices out of the accepted lot and verify the collector through the agreed contact if anything changes. Count each accepted item and note exclusions on the handover record. Retain the booking and receipt together with any sanitization result, and follow up on outstanding treatment rather than treating physical collection as proof that the phone's data and materials have both been handled." },
    ],
    tools: ["Backup destination", "Manufacturer preparation instructions", "SIM tool if required by the device", "Private device inventory"],
    timeline: "Account migration, backup verification and collection are separate stages; allow for account-recovery delays and specialist assessment of damaged phones.",
    faq: [
      { q: "Does a remote erase request prove erasure?", a: "No. An offline phone may not receive the request. Confirm completion or treat the device as still containing information." },
      { q: "Can I include a power bank?", a: "Only after separate acceptance confirmation. A power bank is battery equipment and may need different handling, especially if damaged." },
      { q: "Does removing the SIM erase the phone?", a: "No. The handset can retain photographs, messages, application data and other local information independently of the SIM. Review removable storage and eSIM arrangements separately, then follow an appropriate, verified preparation process for the handset. Keep personal cards under your control and do not assume the collector will discover or return them after handover." },
      { q: "What if I cannot remove an activation lock?", a: "Use the manufacturer's official recovery process or contact the authorised owner or administrator. Do not give a collector your password or pay for an unofficial bypass. Tell the proposed recipient that the device remains locked and ask whether its accepted route changes. A lock does not prove that data has been erased." },
      { q: "Should I repair a broken screen just to reset the phone?", a: "Ask for an assessment rather than assuming repair is always necessary or worthwhile. Compare the scope of repair and verified data treatment with an appropriate professional alternative for inaccessible storage. Battery condition takes priority over testing, and no repair expense guarantees a particular resale value. Keep the data decision documented whichever route is selected." },
    ],
    readerQuestions: [
      { role: "Parent replacing a child's phone", q: "The phone uses a family account. Should I delete that account?", a: "Check the manufacturer's preparation guidance for the individual device rather than deleting a shared account used elsewhere. Preserve agreed photographs and resolve parental controls through the authorised account manager. Verify that the replacement and other family devices remain accessible before completing the old phone's preparation." },
      { role: "Freelancer with two numbers", q: "I removed one SIM, but my business number uses an eSIM. What next?", a: "Follow the carrier's supported transfer process and test the business number on the replacement. Check the manufacturer's disposal instructions for removing the old eSIM profile after access is secured. Keep service cancellation or transfer separate from the handset's storage sanitization." },
      { role: "Office administrator", q: "An employee returned a phone with an unusable display. Can it join the normal collection?", a: "Ask IT to resolve ownership, retention and management requirements, then disclose the inaccessible display to the provider. Agree data treatment and evidence for that particular handset before release. Do not label it sanitized because staff cannot unlock or read its screen." },
      { role: "Household decluttering", q: "One old phone is bulging inside a drawer. Can I put it with the others?", a: "Stop using or charging it and request specialist handling instructions before packing or moving it. Do not compress the case, open it or use ordinary collection packaging without explicit assessment. Active smoke, hissing or dangerous heat calls for moving people away and contacting emergency services." },
    ],
    related: [
      { label: "Phone and tablet recycling", path: "/wiki/disposal/mobile-phone-and-tablet-recycling/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "Lithium battery recycling explained", path: "/what-is-lithium-battery-recycling/" },
    ],
    sources: [ewasteSource, batterySource, batterySafetySource, nistSource],
  },
  {
    slug: "how-to-recycle-batteries-safely",
    category: "how-to",
    title: "How to Recycle Batteries Safely",
    description: "Identify batteries without opening packs, prevent terminal contact on intact cells, and arrange specialist advice for damaged or installed batteries.",
    answer: "Keep waste batteries out of mixed rubbish and household recycling, identify their type from external labels, and confirm an appropriate battery collection route. Intact loose batteries and damaged packs need different handling. Never open, puncture, crush, burn or deliberately discharge batteries to prepare them for recycling.",
    sections: [
      {
        heading: "Inspect visually, without dismantling",
        paragraphs: ["Use visible labels to distinguish small consumer cells, lithium packs and lead-acid equipment. Do not remove covers to discover the chemistry. Stop using or charging swollen, leaking or damaged batteries and seek professional instructions before moving them. If a battery is hot, smoking or hissing, move people away and contact emergency services; routine pickup arrangements are not an emergency response."],
      },
      {
        heading: "Match preparation to the condition",
        paragraphs: ["For intact loose consumer batteries only, insulate exposed terminals with non-conductive tape where safe and keep cells separated as the recipient directs. Store away from heat, moisture, metal objects and children. Do not apply ordinary packing advice to damaged cells. Installed UPS, vehicle or storage batteries need trained personnel; do not disconnect wiring or drain electrolyte yourself."],
      },
      {
        heading: "Keep uncertain and damaged items out of routine collection",
        paragraphs: [
          "Describe uncertainty honestly. A faded label, unfamiliar pack or battery found inside abandoned equipment is not a reason to guess its chemistry or open the casing. Tell the recipient what can be observed safely and what remains unknown. Existing purchase records, equipment manuals or maintenance documentation may identify the installed battery without physical investigation. Do not scrape corrosion away, touch leakage or connect a charger to discover whether a pack still works. An assessment based on incomplete information should remain provisional until qualified personnel confirm the appropriate handling route and any restrictions on collection.",
          "Condition can change after an enquiry. If an item starts swelling, leaking or heating, notify the provider and stop treating the original booking as suitable. Do not move an actively failing battery through an occupied building to reach a convenient collection point. Move people away from smoke, hissing or dangerous heat and contact emergency services; do not attempt to contain or treat the incident using improvised methods. Routine recyclers may not provide emergency response. Keep children and other people away from the area without approaching the item to obtain better photographs or retrieve nearby accessories.",
          "Large and installed systems require a different plan from loose household cells. A UPS, vehicle battery or building storage installation can involve electrical isolation, heavy lifting and equipment-specific hazards. Ask trained personnel to determine how removal, packaging and transport will be performed, and who is responsible at each stage. Do not disconnect terminals, drain electrolyte, break modules apart or deliberately run the equipment down for collection. A maintenance contractor's visit and a recycler's collection may need coordination, but neither should be assumed to cover the other's work without written confirmation.",
        ],
      },
      {
        heading: "Understand costs, records and the limits of a receipt",
        paragraphs: [
          "Compare services by the actual battery type, condition and location rather than by a general scrap quotation. Specialist assessment, trained removal, suitable transport and downstream processing can affect the terms. Request an explanation of what is included and what would change if the condition differs from the description. Do not assume a positive purchase value, free collection or acceptance of every chemistry. A recipient that takes intact consumer cells may not accept a damaged vehicle pack. If an item is rejected, agree a safe next step through qualified advice rather than taking it to a second unconfirmed address.",
          "Before booking, ask for the legal identity of the receiving entity and verify the relevant battery registration and activity through current official information. An electronics collection contact alone does not establish the complete battery route. Clarify whether the provider is collecting, refurbishing or recycling and which facility performs the relevant work. Keep the date and basis of your check, plus the written acceptance for the described items. Registration evidence should match the entity and service being discussed; a logo, old certificate image or unrelated partner's document is not a substitute for checking the actual arrangement.",
          "Agree how the handover will be recorded without requiring you to handle batteries for measurement. A household batch might be described by type and count, while a business installation may use equipment identifiers and quantities recorded by trained staff. Distinguish estimates supplied during the enquiry from measurements made at receipt. Keep the collection acknowledgement, any discrepancies and agreed later processing evidence together. A receipt shows transfer, not automatically completion of recycling or fulfilment of every business obligation. Assign someone to follow up missing records and review storage arrangements if collection is postponed, using professional instructions rather than improvising a new container or transport method.",
        ],
      },
    ],
    steps: [
      { name: "Describe the batteries", text: "Record label information, approximate quantity and visible condition from a safe position. Identify whether batteries remain inside equipment. Use maintenance records or accessible exterior labels for model and chemistry details, and mark unknown information as unknown. Distinguish intact loose cells from sealed packs, installed systems and anything swollen, leaking or heat-damaged. Do not collect extra photographs if doing so requires touching a suspect item or moving it closer to people. Note where equipment is located, whether trained removal is needed and whether stairs or restricted access affect the professional assessment. Avoid testing, charging or opening an item to improve the enquiry description. Keep a dated inventory and copies of the information sent so later acceptance can be checked against the actual condition described. If warning signs change, update the provider immediately and treat active smoke, hissing or dangerous heat as an emergency rather than waiting for a collection appointment." },
      { name: "Confirm specialist acceptance", text: "Check the recipient's battery registration and accepted chemistries. India regulates battery waste separately from e-waste; ask about damaged-pack arrangements explicitly. Confirm the legal entity receiving the batteries, the relevant facility and the activities covered by current registration information. Ask whether another contractor performs removal or transport and how responsibility transfers between them. Provide the condition report before agreeing a collection, and request explicit instructions for unknown or damaged items rather than relying on generic acceptance of batteries. For installed systems, have trained personnel assess isolation and removal; do not offer to disconnect wiring to reduce the cost. Clarify assessment charges, collection terms, any conditional valuation and the process for rejected items. Save the written acceptance, verification details and named contact for changes. Do not assume a provider's acceptance of small household cells extends to UPS units, vehicle batteries or damaged lithium packs simply because all appear on the same inventory." },
      { name: "Follow the transport plan", text: "Use the packaging and collection instructions approved for the actual batteries. Do not send damaged packs by ordinary courier or take them to an unconfirmed drop-off point. Limit ordinary terminal protection to intact loose consumer cells where it is safe and specifically appropriate; it is not a repair for a damaged casing. Leave large, installed and damaged batteries to the trained personnel identified in the plan, and do not improvise containers or combine incompatible items to save space. Confirm the collection team knows the latest condition and has agreed access arrangements before work begins. Keep bystanders away from the handling area and avoid participating in lifting or disconnection without the required competence. Match the handover record to the accepted inventory using observations and records that do not require unsafe handling. Note exclusions, changed quantities and the receiving entity, then retain any promised downstream evidence separately from the collection receipt and follow up unresolved items." },
    ],
    tools: ["Visible label details", "Non-conductive tape for intact loose cells only", "Recipient-approved packaging", "Collection record"],
    timeline: "Condition assessment must precede transport scheduling. Damaged, large or installed batteries may need specialist planning; no collection interval is guaranteed.",
    faq: [
      { q: "Should I empty a lead-acid battery?", a: "No. Leave electrolyte and casing intact and arrange professional handling. Report leakage without touching the liquid." },
      { q: "Is a completely flat battery harmless?", a: "No. Residual energy and chemical hazards can remain even when it cannot power equipment." },
      { q: "Can all household batteries share one container?", a: "Do not assume so. Ask the recipient for instructions based on chemistry, condition and whether cells are loose or installed. Ordinary separation and terminal protection advice applies only to appropriate intact loose cells, not leaking or swollen batteries. Do not mix damaged items into a routine collection container or improvise packaging for them." },
      { q: "What should I do when the label cannot be read?", a: "Report the battery as unidentified and provide only details visible safely or available from equipment records. Do not open it, scrape the surface or connect it to equipment to identify the chemistry. The recipient or qualified assessor should determine whether it can be accepted and what specialist arrangements are necessary before movement." },
      { q: "Does a battery collection receipt cover producer EPR duties?", a: "Not by itself. A receipt records a transfer, while producer responsibilities depend on the organisation's role and current Battery Waste Management requirements. Keep collection and processing records distinct from any applicable portal compliance evidence. Ask the responsible compliance professional to determine which records and reconciliations your organisation actually needs." },
    ],
    readerQuestions: [
      { role: "Apartment resident", q: "My power bank has swollen before our collection event. Can I leave it at the lobby desk?", a: "Do not add it to the shared collection or leave it with an uninformed receptionist. Stop using or charging it and seek specialist handling instructions before moving it. If it is smoking, hissing or dangerously hot, move people away and contact emergency services." },
      { role: "Small office manager", q: "We are replacing a UPS. Should our staff remove its batteries first?", a: "Arrange trained personnel to assess and carry out any isolation and removal. Confirm whether the maintenance contractor or collection provider is responsible for each stage and for the battery destination. Keep the equipment identifiers, work record and collection acknowledgement together." },
      { role: "School facilities coordinator", q: "We found mixed old cells in a cupboard. How should we describe them?", a: "Keep pupils away and use only safely visible labels and condition details for the enquiry. Identify unknown or damaged items explicitly and ask a suitable recipient for assessment and preparation instructions. Do not have pupils sort leaking cells or treat the activity as a classroom dismantling exercise." },
      { role: "Workshop owner", q: "A vehicle battery is leaking and a buyer wants me to empty it. Is that acceptable?", a: "Leave the casing and electrolyte intact and do not touch the leaked material. Request professional handling and a suitable battery route rather than complying with the buyer's instruction. Record the reported condition and agreed responsibilities without approaching the battery for extra evidence." },
    ],
    related: [
      { label: "Swollen battery guidance", path: "/wiki/technical/swollen-batteries/" },
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "What is lithium battery recycling?", path: "/what-is-lithium-battery-recycling/" },
    ],
    sources: [batterySource, batterySafetySource],
  },
  {
    slug: "how-to-sell-used-laptops",
    category: "how-to",
    title: "How to Sell Used Laptops",
    description: "Build an accurate laptop listing, compare conditional offers, protect personal data and document the final ownership transfer.",
    answer: "Describe the laptop honestly, compare offers on matching terms, sanitize its storage and complete a documented transfer after confirming payment. Resale value depends on specification, condition and demand. A quote is not final until the agreed inspection and deductions have been resolved.",
    sections: [
      {
        heading: "Make the condition report useful",
        paragraphs: ["Record the model, processor, memory, storage capacity and charger availability using existing records or system information. Note screen defects, keyboard faults, battery behaviour and repair history. Photograph exterior condition without exposing personal files or publicly posting serial numbers. Do not charge or run tests on a swollen or otherwise unsafe battery just to demonstrate the laptop."],
      },
      {
        heading: "Separate the sale from information removal",
        paragraphs: ["Check ownership, lease restrictions and company disposal approvals first. Compare whether offers include collection, accessories and any data service, and ask how inspection changes are agreed. Keep backups and use a storage-appropriate sanitization process before release. Remove organisation management or account locks through authorised administrators; never hand over passwords as a substitute for proper preparation."],
      },
      {
        heading: "Judge value using comparable evidence",
        paragraphs: [
          "Separate the laptop's specification from the buyer's assessment of its condition. Two machines with the same model name can have different memory, storage, displays and repair histories. Use system information or purchase records where available, and mark anything not established as unknown. Avoid copying specifications from an advertisement for a similar model. A realistic condition sheet describes cosmetic wear, functional faults and untested features separately, allowing buyers to explain their offers against the same evidence. Keep the version you sent so a later deduction can be compared with what was already disclosed rather than argued from memory.",
          "Compare the net transaction rather than only the headline offer. Ask whether the proposed amount assumes a working charger, successful inspection, particular components or collection from an easily accessible location. Establish who pays for transport, assessment and any separately agreed data service. A repair estimate is not a promise that resale will recover the expense, and replacing a component solely for sale can add cost without creating a matching offer. Obtain a condition-based assessment first and weigh the effort against useful continued ownership, an appropriate donation route or responsible recycling if there is no suitable buyer.",
          "Treat revised offers as decisions, not automatic deductions. Ask the buyer to identify the observed fault, explain how it changes the offer and obtain your approval before finalising the transfer. You can pause if a material term differs from the agreement. Do not accept pressure to release the laptop while payment or return arrangements remain unclear. For remote assessment, establish custody, responsibility for loss or damage and what happens if you decline the final offer. Keep those terms in writing, including whether the laptop will be returned and which charges may apply, without assuming a return is free.",
        ],
      },
      {
        heading: "Avoid privacy, safety and handover mistakes",
        paragraphs: [
          "A sales demonstration should not expose personal accounts. Use a documented preparation plan and avoid opening private files, email or saved passwords to prove the laptop works. If an authorised technician needs to assess it before sanitization, agree access limits and supervision appropriate to the information involved. Do not send copies of identity documents or full device identifiers publicly with the listing. Share only what is necessary through an appropriate private channel. Keep copies of enquiry messages and condition photographs without including unrelated people, documents or screen notifications that would create another privacy problem.",
          "Battery condition can override the normal sales process. Do not charge, stress-test or repeatedly power a laptop with swelling, unusual heat or suspected battery damage to improve a listing. Stop using it and seek specialist assessment; leave an embedded battery inside the enclosure. Explain the condition before anyone plans ordinary transport. A buyer willing to take the machine for parts still needs a suitable route for the battery and unusable electronics. Do not remove the battery yourself, compress a bulging case or assume a parcel service accepts damaged packs. Active smoke or hissing requires emergency action, not a sales appointment.",
          "Close the sale with a record that describes the actual outcome. Include the device identifier privately, accessories, disclosed condition, final agreed amount and transfer date, with the parties identified as appropriate. Record any retained storage or rejected accessory explicitly. A sale receipt documents ownership transfer but does not replace a sanitization result for the drive. Keep the relevant records together and follow any business retention requirements. If promised recycling or treatment evidence remains outstanding, assign a follow-up rather than describing the entire task as complete. Never hand over account passwords, recovery keys or a payment PIN as part of the sale.",
        ],
      },
    ],
    steps: [
      { name: "Prepare a consistent specification", text: "Send the same condition summary to potential buyers. Identify untested features as untested rather than describing the entire laptop as fully working. Record the exact model, memory, storage and included charger from reliable records or safe observations. Distinguish a reported intermittent fault from a technician's diagnosis and include relevant repairs without implying they restore the machine to new condition. Photograph exterior wear and accessible labels privately, keeping personal screens and full serial numbers out of public listings. Check ownership and permission before advertising a work or leased device. Avoid unsafe testing when the battery or electrical condition is suspect, and explain why a feature could not be checked. Keep a dated copy of the listing and each version of the condition sheet so the buyer's inspection can be reconciled with the original disclosure. Correct a discovered mistake promptly with every interested buyer rather than leaving different people to price different descriptions." },
      { name: "Agree the transaction", text: "Record the proposed amount, inspection conditions, included items, payment method and any collection costs. Confirm who buys the equipment. Ask which organisation or person takes ownership and whether an intermediary is arranging collection on someone else's behalf. Define how any inspection change will be explained and approved, and what happens if no final agreement is reached. For a device leaving your premises before payment, establish custody and return terms in advance rather than assuming a courier receipt is a sale contract. Compare the net amount after known charges and avoid offers that depend on unspecified deductions. Keep messages and the agreed inventory together, including whether any storage is excluded. Do not follow payment links or disclose authentication information to receive money. If the collector, payment destination or terms change unexpectedly, pause and verify through the contact already used for the agreement before releasing the laptop." },
      { name: "Sanitize and close", text: "Verify backups and approved erasure, check payment independently, and obtain a receipt linking the laptop to the transfer. Retain your own records securely. Open representative backup files and confirm recovery access before irreversible work. Account sign-out and removal of authorised management controls are separate from validating storage treatment, so check both rather than equating an empty welcome screen with complete assurance. Arrange qualified support for inaccessible storage and keep custody controlled if erasure fails. At handover, compare the device and accessories with the final terms and approve any revision explicitly. Verify payment through your own bank or payment account, not a screenshot, message or screen shown by the buyer. Save the receipt and sanitization evidence in a private location, and update an employer's asset register if applicable. Resolve any agreed later documentation and record a changed recycling destination if reuse proves unsuitable after assessment." },
    ],
    tools: ["Specification and condition sheet", "Exterior photographs", "Verified backup", "Sale receipt"],
    timeline: "Allow for enquiries, inspection and data preparation before handover. Buyer demand and device condition can change the sale timeline.",
    faq: [
      { q: "Can a broken laptop still be sold?", a: "Possibly for repair or parts, but disclose faults and data status. Confirm responsible recycling for anything the buyer cannot reuse." },
      { q: "Should I trust a payment screenshot?", a: "No. Verify receipt through your own payment account or bank before releasing the laptop, and never share an OTP or payment PIN." },
      { q: "Should I upgrade memory before seeking offers?", a: "Request an assessment of the current machine first. An upgrade costs money and may not change what a particular buyer is prepared to pay. Compare any proposed improvement with an actual conditional offer and useful continued ownership, not an assumed resale increase. Do not undertake internal work merely to make an uncertain specification more attractive." },
      { q: "Can I sell without the storage drive?", a: "Only if ownership, policy and the buyer's acceptance allow it. Have qualified personnel handle any necessary internal work and disclose clearly that storage is excluded, since this changes functionality and valuation. Retaining a drive does not sanitize it; keep a separate authorised data treatment plan and record the laptop's changed configuration on the receipt." },
      { q: "What if the buyer asks for my login password?", a: "Do not supply personal or work account credentials. Resolve locks through official owner or administrator procedures and agree a demonstration that does not expose private information. If the buyer cannot assess the device under appropriate access limits, pause the transaction or use a suitable professional assessment rather than handing over passwords as a shortcut." },
    ],
    readerQuestions: [
      { role: "Graduate selling a study laptop", q: "A buyer says it is worth less because the charger is missing, but that was in my listing. What should I do?", a: "Refer to the saved condition sheet and ask whether the original offer already accounted for the missing charger. Request the revised net amount and its basis in writing before agreeing. You do not need to release the laptop while the terms remain disputed." },
      { role: "Remote worker", q: "My former employer said I could keep the laptop. Can I sell it now?", a: "Obtain a clear ownership release and check whether company data, management enrolment or retention restrictions remain. Ask the authorised administrator to resolve those matters before preparing the sale. Keep that approval with your private transaction records." },
      { role: "Parent clearing a cupboard", q: "The battery case is swollen, but a buyer wants a video of it running. Should I test it?", a: "Do not use or charge it for a demonstration. Disclose the swelling and seek a specialist assessment and transport plan with the battery left in place. A normal sales enquiry is not a substitute for safe handling of a damaged device." },
      { role: "Freelancer changing equipment", q: "The buyer collected the laptop for inspection and lowered the offer. How do I respond?", a: "Ask for the findings and compare them with the agreed condition and deduction terms. Approve a revised sale only if you accept it, otherwise use the documented return arrangement. Keep custody correspondence and do not share credentials to speed up the dispute." },
    ],
    related: [
      { label: "Selling electronics locally", path: "/wiki/sales/where-to-sell-electronics-locally/" },
      { label: "Sell electronics", path: "/sell-electronics/" },
      { label: "Recycle a laptop in India", path: "/how-to-recycle-laptop-in-india/" },
    ],
    sources: [nistSource, batterySafetySource, ewasteSource],
  },
  {
    slug: "how-to-sell-computers-for-cash",
    category: "how-to",
    title: "How to Sell Computers for Cash",
    description: "Value desktop computers and office lots transparently, account for all storage devices and record payment and collection terms before release.",
    answer: "Inventory the computers and included peripherals, disclose their condition, compare itemised offers and agree payment before handover. Protect every storage device and retain a sale record. 'For cash' does not imply a guaranteed payout, a fixed scrap rate or the absence of business accounting requirements.",
    sections: [
      {
        heading: "Define exactly what the buyer is pricing",
        paragraphs: ["A desktop tower, monitor, keyboard and UPS are distinct items. List quantities and specifications separately so a complete-system quote is not confused with a tower-only offer. Distinguish tested working systems from untested units. For office batches, identify company ownership, disposal approvals and any leased equipment that must be returned rather than sold."],
      },
      {
        heading: "Control data and collection deductions",
        paragraphs: ["A desktop can contain multiple hard drives or SSDs, including secondary storage not shown in a simple capacity summary. Have IT reconcile media to each asset and document sanitization. Do not open monitors, power supplies or UPS enclosures. Ask whether inspection, lifting, transport, missing components or data handling change the net offer, and require approval before any revised price is accepted."],
      },
      {
        heading: "Resolve mixed-lot and valuation edge cases",
        paragraphs: [
          "Build groups that reflect meaningful differences, such as tested towers, untested towers, working displays and faulty peripherals. A single photograph of an office storeroom cannot establish quantities or specifications. Use asset records and safe exterior checks to reconcile what is actually present, and label uncertain details as unknown. Machines with the same case can contain different components after repairs or upgrades. Do not extrapolate one computer's specification across a whole batch without evidence. Preserve the inventory version supplied to buyers and ask them to price identifiable groups so differences between offers can be explained rather than hidden in one headline amount.",
          "Ask what the offer assumes about inspection and rejected items. A buyer may want only reusable towers while leaving damaged displays, cables or UPS units behind. Establish whether the whole lot must be accepted, whether different items take different routes and what charges apply to exclusions. Responsible management of low-value equipment remains necessary even if some machines have resale value. Avoid judging a proposal solely by the amount attached to its best devices. Compare the net result after transport, lifting, data services and agreed handling of unusable equipment, without treating any quoted amount as a guaranteed market rate.",
          "Business sales also require an ownership and accounting decision. Separate leased equipment, client property and employee-owned accessories from assets the organisation can sell. Ask finance which approval, invoice, payment and recordkeeping process applies to the transaction; the phrase cash sale does not remove those requirements. Establish who can approve a revised amount after inspection and who may sign the handover. If that person is unavailable, pause disputed transfers rather than allowing a collector's urgency to determine the sale. Keep a record of each approved change so the final payment can be reconciled with the exact assets released.",
        ],
      },
      {
        heading: "Document data outcomes and a controlled collection",
        paragraphs: [
          "Map storage to individual computers before they leave the office. Secondary drives, removable media and storage added during repairs can be missed if staff rely only on the original purchase specification. Have IT identify the media using approved records and qualified inspection where necessary. Do not assume a machine without an operating system has no information or that a missing system drive means every storage location is empty. Resolve backup, retention and legal-hold requirements before sanitization. Record each medium's approved treatment and validation, and keep any failed or unidentified device out of the release-ready group until its status is resolved.",
          "Collection preparation should not turn office staff into dismantlers or movers. Leave monitors, power supplies and UPS enclosures intact, and arrange trained handling for installed or damaged batteries. Describe heavy equipment, floor levels, lift restrictions and loading access in advance so the provider can plan appropriate personnel. Keep unrelated active assets physically separate from the approved lot and use clear inventory references rather than labels exposing confidential information. Do not stack unstable equipment in corridors or obstruct emergency routes while awaiting a vehicle. If the planned collection cannot proceed safely, revise it instead of improvising lifting or temporary outdoor storage.",
          "Use the final handover as a reconciliation point, not merely a signature exercise. Count released items by group and record asset identifiers where agreed, noting anything withheld, rejected or substituted. Verify the payment independently and have finance address any discrepancy through the agreed process. Store the inventory, approvals, inspection changes, payment evidence and receipt together with separate sanitization results. Where unusable items are sent for recycling, retain the promised processing evidence and distinguish it from the sale record. Update the asset register to reflect actual outcomes, leaving unresolved data or downstream documentation visible for follow-up rather than closing the whole lot automatically.",
        ],
      },
    ],
    steps: [
      { name: "Create an itemised lot", text: "Record towers, displays and accessories with condition and ownership. Flag UPS batteries separately for the appropriate battery handling route. Assign a reference to each asset or clearly defined group and distinguish confirmed specifications from assumptions based on a similar-looking case. Check the physical inventory against purchase, lease and asset records, involving the owner when equipment belongs to a client or employee. Have IT account for every data-bearing medium and mark preparation status separately from functional condition. Use safe exterior observations and existing diagnostic records rather than opening electrical enclosures or powering suspect equipment. Record accessories and missing components explicitly so a complete-system offer is not compared with a tower-only valuation. Keep a dated inventory copy and relevant disposal approvals, and identify which items cannot be released yet. If quantities change during office clearing, update the inventory sent to buyers before agreeing final collection rather than adding unreviewed machines at the loading point." },
      { name: "Compare net offers", text: "Use the same inventory for each buyer. Confirm the payment method, deductions, collection responsibilities and handling of rejected items in writing. Ask for a breakdown by meaningful equipment group, including any difference between reusable assets and items requiring recycling. Clarify whether assessment, secure data handling, lifting and transport are included or separately charged. Check the receiving buyer's identity and the downstream route for non-reusable equipment, not just the contact arranging the vehicle. Agree who can approve inspection changes and how declined offers or rejected devices will be handled. Consult finance about the payment and invoice requirements for the organisation rather than assuming physical cash is simpler. Keep each offer with the inventory version it prices so comparisons remain fair. Avoid promises based on an unspecified scrap rate, and do not let a high value for a few desirable computers conceal unresolved costs or unsafe arrangements for the remainder of the lot." },
      { name: "Reconcile the handover", text: "Release only approved, sanitized assets. Count items with the buyer, verify payment and retain the receipt and any business invoice or accounting record required. Check that the collector is expected and that the vehicle team knows the agreed scope, access restrictions and separately arranged battery handling. Compare the ready-for-release list with actual identifiers and quantities, keeping held or failed-sanitization assets out of the collection area. Note exclusions and authorised price changes before signing rather than relying on a later generic receipt. Verify funds through the organisation's own approved process and do not accept a screenshot as settlement evidence. Update asset and finance records using the final inventory, preserving a link to sanitization results for each medium. Request correction of mismatched quantities or identifiers and keep an owner assigned to pending processing evidence. A completed payment does not by itself resolve data treatment or establish responsible recycling of rejected equipment." },
    ],
    tools: ["Itemised asset spreadsheet", "Disposal approval", "Media sanitization records", "Payment verification and receipt"],
    timeline: "Bulk inspections and storage verification can take longer than a single-device sale. Agree collection only after the inventory and financial terms are settled.",
    faq: [
      { q: "Is cash always the best payment method?", a: "No. Choose a method that is safe, verifiable and consistent with applicable accounting and tax requirements; consult your finance team for business sales." },
      { q: "Should I accept one price for the whole office lot?", a: "Only after checking what it includes. An itemised assessment makes excluded equipment and deductions easier to understand." },
      { q: "Can monitors and UPS units be priced as ordinary accessories?", a: "List them separately because their condition, value and handling can differ substantially from a tower. A UPS contains batteries that require an appropriate separate assessment and route. Do not open either type of equipment to establish scrap content. Ask the buyer which items are accepted and what happens to any excluded or unsafe units." },
      { q: "What if the inventory shows more drives than the buyer counted?", a: "Pause release of affected assets and ask IT to reconcile the discrepancy using media and asset records. Do not assume the extra entries are obsolete or delete them to match a collection sheet. Resolve whether a drive is installed, retained, already transferred or missing, and preserve the investigation and approved outcome in the disposal record." },
      { q: "Can staff take unwanted computers before the bulk sale?", a: "Only through the organisation's approved ownership-transfer process. Apply the same retention, sanitization, accounting and safety checks rather than treating an internal recipient as an exception. Update the lot inventory and buyer's offer if assets are removed. Keep individual transfer records so the eventual collection and payment are reconciled against the equipment actually sold." },
    ],
    readerQuestions: [
      { role: "Small office manager", q: "The buyer wants only half the towers and none of the broken screens. How should I compare that offer?", a: "Calculate the net proposal against the exact accepted inventory and obtain a separate responsible route for the remaining equipment. Ask whether additional collections or handling charges apply. Do not treat the headline amount as a complete office-clearance offer when substantial items are excluded." },
      { role: "Finance coordinator", q: "The collector offers a different amount at the loading bay. Can the receptionist approve it?", a: "Use the approval authority agreed for the sale rather than assuming anyone present can accept deductions. Request the inspection basis and a revised itemised record. Hold the disputed transfer until the authorised person has approved or declined the change." },
      { role: "IT administrator", q: "One tower has an extra drive that was never on the asset register. Can the rest leave?", a: "Place that tower on hold and reconcile the additional medium before release. Other assets can follow the approved process only if their own inventories, data outcomes and sale terms are complete. Keep the exception visible so it is not accidentally included in the final count." },
      { role: "Coworking space operator", q: "Some monitors may belong to former tenants. Should I include them?", a: "Resolve ownership and any contractual or legal requirements before offering them for sale. Keep uncertain items separate from assets you are authorised to transfer. Record the owner's decision and update the buyer's inventory only after authority is established." },
    ],
    related: [
      { label: "Office equipment buyback", path: "/wiki/sales/office-equipment-buyback/" },
      { label: "Sell electronics", path: "/sell-electronics/" },
      { label: "What is ITAD?", path: "/what-is-itad/" },
    ],
    sources: [nistSource, ewasteSource, batterySource],
  },
  {
    slug: "how-to-sell-old-fridge",
    category: "how-to",
    title: "How to Sell an Old Fridge",
    description: "Assess an old refrigerator for resale, disclose cooling faults and organise safe professional moving or recycling without disturbing the refrigerant circuit.",
    answer: "Describe the fridge's model, capacity, condition and access requirements, then compare offers that clearly allocate inspection and moving costs. Choose reuse only when suitable; otherwise arrange specialist appliance recycling. Keep the refrigeration circuit intact and never cut pipes, remove the compressor or release refrigerant yourself.",
    sections: [
      {
        heading: "Describe more than the exterior appearance",
        paragraphs: ["A clean cabinet does not establish safe or efficient operation. Report cooling problems, damaged seals, unusual noise, rust and known repairs. Use existing observations rather than powering up equipment with damaged wiring or suspected leakage. Discuss whether repair and continued use are sensible given safety, condition and energy consumption; a working light alone does not prove the fridge cools properly."],
      },
      {
        heading: "Plan handling before accepting an offer",
        paragraphs: ["Share dimensions, floor level, lift size, stairs and parking constraints so the buyer can arrange suitable movers. If recycling is needed, confirm professional management of refrigerants, oils and insulation rather than a metal-only scrap route. Keep the appliance inaccessible to children while awaiting collection. Do not leave it unattended at the roadside or dismantle doors yourself."],
      },
      {
        heading: "Compare practical reuse value with the complete moving cost",
        paragraphs: [
          "Use the actual model and observed condition rather than the original purchase price as the starting point. Capacity, configuration, seal condition, corrosion and repair history can affect whether another household can use the fridge sensibly. A buyer also needs to know whether shelves, drawers and other ordinary removable fittings are present. Record missing or damaged pieces without taking apart the cabinet. Distinguish a cooling fault you have observed from a diagnosis that only a technician can make. Do not advertise a suspected compressor or refrigerant problem as a minor repair unless a qualified assessment supports that description.",
          "Ask whether the proposal is a purchase for reuse, a repair assessment or a chargeable recycling service. These are different outcomes, and an initial enquiry does not guarantee that any buyer will pay for the appliance. Compare the net terms after inspection, professional lifting, stairs, parking constraints and transport. A high headline offer can be less useful than a clear lower offer if substantial access costs remain unspecified. If a buyer revises the amount after inspection, ask for the reason and approve the final terms before the appliance is removed. Retain the original description and revised agreement together.",
          "Consider continued use realistically. A fridge that still cools may have poor seals, recurring faults or energy consumption that makes it unsuitable for the intended recipient. Use existing labels, manuals and qualified assessment when discussing these issues rather than claiming an exact saving or remaining lifespan. Repairs can be worthwhile in some cases, but repair expense does not guarantee a matching resale increase. Where reuse is unsuitable, choose a route that addresses refrigerants, oils and insulation as well as recoverable metals. Avoid a buyer who asks you to remove the compressor or release refrigerant to improve the scrap offer.",
        ],
      },
      {
        heading: "Prevent preparation mistakes and document the destination",
        paragraphs: [
          "Coordinate food removal with a confirmed collection plan and suitable alternative storage. Follow the manual for normal user preparation, but do not undertake electrical disconnection, plumbing work or repair when the process is unclear or unsafe. A hardwired appliance, damaged plug or inaccessible connection needs a technician. Do not use sharp tools, open flames or improvised heating to accelerate defrosting. Keep water away from electrical fittings and avoid moving the fridge yourself to reach a difficult connection. Report these constraints in advance so the professional team can decide what work and personnel are required.",
          "An empty fridge can still create entrapment and moving hazards. Keep it in a controlled area inaccessible to children and do not leave it unattended outside, even when collection is expected soon. Do not dismantle doors, disconnect internal parts or tip the cabinet as a preparation shortcut. Tell the moving team about narrow turns, fragile floors and any access restrictions, allowing them to assess the route and choose appropriate handling methods. If the agreed route proves unsuitable, pause and revise the plan rather than asking neighbours to improvise a lift. Leave transport orientation and eventual restart decisions to manufacturer guidance and the receiving technician.",
          "Ask for a receipt that identifies the appliance, its condition and whether ownership transferred for reuse or it was accepted for recycling. Record the final amount paid or charges agreed, the collection date and the receiving party. For recycling, ask what later evidence describes professional appliance treatment; a metal weight ticket alone does not explain refrigerant management. Keep the assessment, access description, booking and receipt together so damage disputes or missing records can be followed up. If the destination changes after inspection, obtain the revised outcome in writing rather than retaining a sale description that no longer matches what happened.",
        ],
      },
    ],
    steps: [
      { name: "Request a condition-based assessment", text: "Send exterior and label photos where safely accessible. Ask whether the offer is for reuse or recycling and what deductions may apply. Use existing observations to describe cooling performance, noises, damaged seals, rust and previous repairs, and mark uncertain diagnoses as unknown. Do not switch on a suspect appliance to create a sales demonstration or move it yourself to photograph a hidden label. Provide accessible dimensions, floor level, lift restrictions and parking information privately so the assessment includes the real moving job. Check ownership before offering a landlord's, employer's or leased appliance. Ask who will receive it and who performs specialist treatment if reuse is unsuitable. Keep the condition report and written offer, including inspection terms and responsibility for rejected equipment. Avoid accepting an arrangement that requires you to cut pipes, remove the compressor or otherwise dismantle the refrigeration system before collection, regardless of the suggested value." },
      { name: "Prepare according to the manual", text: "After confirming collection, remove food and follow manufacturer guidance for safe unplugging, defrosting and drying. Use a technician if disconnection is unsafe or unclear. Plan alternative food storage before preparation begins, and check whether a changed collection window affects that plan. Only carry out ordinary user tasks described for the model; refer hardwired connections, plumbing, damaged wiring and inaccessible fittings to qualified personnel. Do not scrape ice with sharp objects or use improvised heat to speed up defrosting. Keep children away from the appliance and ensure normal preparation does not create slippery floors or obstruct access. Leave the refrigerant circuit, compressor, insulation and doors intact. Tell the provider promptly if you discover leakage, electrical damage or a different condition from the original description. Keep the manual reference and any technician's work record with the booking so the receiving team knows what preparation has actually been completed rather than assuming the fridge is ready to move." },
      { name: "Let professionals move it", text: "Clear the access route and agree responsibility for lifting and transport. Confirm payment or charges, retain a receipt and leave restart instructions to the manufacturer and receiving technician. Move unrelated small belongings out of the way without attempting to shift or dismantle the fridge yourself. Check that building permissions and loading access match the agreed plan and inform the team about fragile surfaces or unexpected obstructions. If the team cannot safely use the proposed route, pause for professional reassessment rather than improvising a stair carry with untrained helpers. Reconfirm any changed inspection terms before removal and verify payment through your own account where applicable. Match the receipt to the model or private identifier and record whether the actual destination is reuse or recycling. Save any later appliance-processing evidence separately from the moving receipt, and pursue corrections if the document describes a different item, amount or outcome from the one agreed." },
    ],
    tools: ["Model details", "Tape measure for accessible dimensions", "Manufacturer manual", "Written collection and payment terms"],
    timeline: "Inspection, defrosting and specialist moving require coordination. Follow model-specific preparation guidance rather than assuming a universal pickup or restart interval.",
    faq: [
      { q: "Can a non-cooling fridge have value?", a: "Possibly, but repairability, materials and transport affect the offer. Confirm a responsible destination even when no purchase offer is available." },
      { q: "Should I remove the gas first?", a: "No. Refrigerant handling requires appropriate professional equipment and expertise; disclose the appliance condition and keep the system intact." },
      { q: "Does a working interior light prove the fridge is suitable for resale?", a: "No. A light does not establish cooling performance, electrical safety or overall condition. Describe existing observations and known faults honestly, and ask for a qualified assessment where needed. Do not power equipment with damaged wiring or suspected leakage merely to produce evidence for a listing, and avoid promising a particular remaining service life." },
      { q: "Can I leave the fridge outside after emptying it?", a: "Do not leave it unattended at the roadside or accessible to children. An empty cabinet can still create entrapment and public-access hazards, while weather can worsen its condition. Keep it controlled until the agreed professional handover. If suitable storage is unavailable, discuss the constraint before booking rather than dismantling doors or moving it outside yourself." },
      { q: "How long should the buyer wait before restarting it?", a: "There is no universal interval suitable for every model and transport situation. The receiving technician should follow the manufacturer's guidance and assess the actual handling history and condition. Pass on the manual and known faults where available. Do not invent a restart time or tell the buyer to switch on immediately to test the sale." },
    ],
    readerQuestions: [
      { role: "Tenant moving out", q: "The fridge belongs to the landlord, but they said to clear the flat. Can I sell it?", a: "Obtain explicit permission covering that appliance and the intended sale or recycling route. A general instruction to clear belongings may not transfer ownership or authorise disposal. Keep the written decision and agree who receives any payment or pays collection charges." },
      { role: "Apartment resident", q: "The lift is too small. Should I remove the doors to make the fridge fit?", a: "Do not dismantle the appliance yourself. Give the professional moving team the accessible dimensions and route constraints so they can assess a safe plan. If the proposed route is unsuitable, revise the arrangement rather than attempting an improvised carry." },
      { role: "Small cafe owner", q: "The fridge no longer cools and a scrap buyer only wants the compressor. What should I do?", a: "Keep the refrigeration system intact and choose a provider that can arrange appropriate whole-appliance handling. Do not cut pipes or remove the compressor to meet the offer. Ask how refrigerants, oils and insulation will be managed and what evidence is available." },
      { role: "Household replacing an appliance", q: "Collection has been postponed after I emptied the fridge. Can I leave it ready near the gate?", a: "Keep it in a controlled place inaccessible to children rather than leaving it unattended outside. Confirm a revised window and tell the provider about any safe-storage constraint. Do not move the appliance yourself or assume the earlier moving plan still applies." },
    ],
    related: [
      { label: "Reuse versus recycling", path: "/wiki/technical/reuse-vs-recycle/" },
      { label: "Sell electronics enquiries", path: "/sell-electronics/" },
      { label: "Why recycle electronics?", path: "/why-recycle-electronics/" },
    ],
    sources: [ewasteSource, { title: "Appliance disposal", href: "https://www.epa.gov/section608/appliance-disposal", publisher: "US Environmental Protection Agency", note: "Refrigerant and appliance environmental background; US legal provisions are not Indian requirements." }],
  },
  {
    slug: "how-to-schedule-e-waste-pickup",
    category: "how-to",
    title: "How to Schedule an E-Waste Pickup",
    description: "Prepare a useful pickup enquiry, confirm accepted items and access, and retain clear records without assuming availability or free collection.",
    answer: "Send an item list, condition details and location, then obtain explicit confirmation of acceptance, access, charges and a collection window. Complete data preparation before release and identify batteries or heavy appliances separately. An enquiry is not a confirmed booking, and collection is not necessarily free.",
    sections: [
      {
        heading: "Give the team enough information to assess the job",
        paragraphs: ["List device types and counts rather than describing everything as miscellaneous scrap. Mention embedded batteries, swelling, broken glass, heavy appliances and equipment holding sensitive data. Provide the locality, floor, lift availability and vehicle access privately. Exterior photographs help assessment, but avoid including personal screens, account details or unrelated documents."],
      },
      {
        heading: "Confirm the route and scope before collection",
        paragraphs: [`Use the site's contact options for ${BUSINESS.name}, or send your inventory to ${BUSINESS.email}. Ask who receives the waste, which downstream registrations apply and what records can be supplied. Battery waste needs its separate route. Confirm whether packing, lifting, data services or appliance handling require additional arrangements; do not assume these are included.`],
      },
      {
        heading: "Plan for access changes, exclusions and unsafe discoveries",
        paragraphs: [
          "A collection plan is only as accurate as the inventory and access description behind it. Check whether the lift can be booked, whether vehicles can stop at the loading point and whether building staff require advance permission. Include narrow stairs, restricted entry hours and equipment that cannot be moved by ordinary office staff. Do not promise the collector that everything will be downstairs if getting it there would require unsafe lifting. Have the provider assess responsibilities for movement from the actual storage location, and keep the building contact informed of the confirmed scope rather than a tentative enquiry.",
          "Late discoveries need reassessment, not a larger pile by the door. A power bank, swollen laptop or refrigerator can change the handling required even if it adds little to the item count. Notify the provider before packing or movement, and ask whether the existing collection remains suitable. Leave sealed batteries and appliance systems intact. If a battery is smoking, hissing or dangerously hot, move people away and contact emergency services; a future pickup is not an emergency response. Do not conceal damage to avoid rejection, because the team needs the real condition to plan safe acceptance.",
          "Shared collections need clear ownership and data boundaries. In an apartment or office event, nominate a coordinator but require each owner to decide what can be released and how personal information will be treated. Do not assume the coordinator has authority to erase devices or sell them. Keep unapproved, unidentified and active equipment separate from accepted items. Agree how individual receipts or a consolidated inventory will link to contributors without publicly exposing device identifiers or contact details. If an owner has not completed data preparation, arrange a separate decision rather than letting the convenience of one vehicle override confidentiality requirements.",
        ],
      },
      {
        heading: "Compare the full service and follow the evidence after pickup",
        paragraphs: [
          "Ask for terms that explain both the practical work and the financial outcome. Collection may involve route planning, loading, specialist packaging, appliance handling or data services, and those elements are not automatically included in a general recycling enquiry. Compare proposals using the same item list, condition and access facts. A possible material value may not offset every service cost, and no purchase amount or free pickup should be inferred from the size of the lot. Ask how additional charges or revised valuation will be explained and approved before the team starts removing equipment.",
          "Verify the organisations behind the service. Establish whether the contact is a collector, an intermediary or the actual processing facility, and ask which downstream entities handle electronics and batteries. Check relevant current registration information for the activities being offered instead of relying on an attractive certificate image or vehicle branding. Agree what documentation can be issued and at what stage: a booking confirms arrangements, a receipt records transfer, and a later statement may describe processing. Where storage sanitization matters, specify separate identifier-linked evidence and a failure process rather than relying on a generic promise of secure recycling.",
          "After pickup, compare the final receipt with the accepted inventory and record items that remained on site. Request prompt corrections for missing counts, incorrect identifiers or a receiving entity different from the agreement. Save the booking, access arrangements, approved changes and financial record in a private location. Track any later sanitization or processing report against an agreed milestone, with someone responsible for following up a delay. If the provider cannot supply a promised record, document the gap and seek clarification rather than filling it with an unsupported statement. Use the experience to improve the next inventory without treating unresolved paperwork as completed recycling.",
        ],
      },
    ],
    steps: [
      { name: "Send a complete enquiry", text: "Provide quantities, condition, location and access constraints. Flag damaged batteries before anyone attempts to pack or move them. Distinguish towers, laptops, monitors, phones, loose batteries and heavy appliances rather than using one miscellaneous category. Include approximate dimensions or quantities from safe observations, and mark estimates clearly so they are not mistaken for measured weights. State whether devices hold information that still needs authorised treatment and whether ownership approval is pending. Share location and access details privately, including floor level, lift restrictions, loading arrangements and building permissions. Do not move unsafe equipment or expose confidential screens merely to obtain photographs. Ask what additional information the provider needs before assessing feasibility, and keep the submitted inventory version with the enquiry. If a new item or changed condition appears later, send an update rather than assuming the original request already covers it. An informative enquiry supports assessment but is not evidence that collection has been accepted." },
      { name: "Agree the booking", text: "Obtain written confirmation of accepted items, charges or valuation terms, collection window and documentation. Resolve responsibility for excluded equipment. Ask who will collect, who will receive the waste and which relevant registrations apply to the actual downstream entities. Confirm separate battery handling, professional appliance requirements and any secure data service instead of assuming ordinary transport includes them. Check whether packing, lifting, assessment and failed-access visits affect the terms, and ask how changes will be approved. Agree the process for cancellation, rescheduling or rejection without assuming a guaranteed time or free service. For a building-managed collection, establish which person can authorise access and sign the receipt. Keep a booking reference, named contact and item list together so an unexpected collector or altered scope can be verified. Do not release unresolved data-bearing devices merely because a collection slot is available; either finish preparation or explicitly agree the required controlled professional treatment before handover." },
      { name: "Prepare and reconcile", text: "Keep accepted items secure and intact, finish approved data preparation and arrange building access. Check the collector's identity and match counts to the handover receipt. Separate approved equipment from items still in use or awaiting ownership decisions, using private inventory references rather than labels containing sensitive data. Follow recipient instructions suitable for the actual condition and leave damaged batteries, installed systems and heavy appliances to the agreed professionals. Do not block corridors or leave devices outside unattended while waiting for the vehicle. If access or condition has changed, contact the booking coordinator before handling begins. Count items with the team and record omissions, additions approved in advance and any items refused on arrival. Retain the signed acknowledgement, final financial terms and custody details. Request later processing or sanitization evidence according to the agreed milestones, keeping outstanding outcomes open instead of interpreting collection alone as proof that recycling and data treatment have both been completed." },
    ],
    tools: ["Item inventory", "Safe exterior photos", "Private location details", "Booking confirmation and handover record"],
    timeline: "Scheduling depends on route feasibility, load, access and specialist handling. Treat any proposed window as provisional until the provider confirms it.",
    faq: [
      { q: "Can I add extra items when the vehicle arrives?", a: "Ask beforehand. Extra volume, batteries or appliances may change acceptance, packing needs, vehicle capacity or charges." },
      { q: "Should I put everything outside overnight?", a: "No. Keep items protected from weather, theft and public access until agreed handover. Ask for guidance if safe indoor storage is unavailable." },
      { q: "Does submitting the pickup form reserve a vehicle?", a: "No. Treat it as an enquiry until the provider explicitly confirms acceptance, scope and a collection window. Check whether the confirmation depends on further photographs, access approval or specialist assessment. Keep the booking reference and contact details, and do not arrange unsafe staging or cancel other necessary plans based only on an automated acknowledgement." },
      { q: "What if the collector is different from the person named in the booking?", a: "Pause handover and verify the change through the original trusted contact. A subcontracted collection can be legitimate, but the receiving route and custody record still need to match the agreement. Do not rely solely on a logo, phone call from an unfamiliar number or pressure to load quickly. Record the confirmed collector on the receipt." },
      { q: "Can collection include data sanitization?", a: "Only if that service is explicitly agreed for the devices and information involved. Confirm where treatment occurs, how custody is controlled, what method and validation are appropriate, and what evidence will be returned. A pickup receipt does not establish erasure. If preparation remains unresolved, keep the asset on hold or arrange an approved professional treatment plan before release." },
    ],
    readerQuestions: [
      { role: "Tenant moving out", q: "I have only requested pickup and my handover date is approaching. Can I leave the items for the collector?", a: "Obtain a confirmed arrangement and permission for any continued storage rather than assuming the enquiry is a booking. Keep equipment secure and inaccessible to the public. Tell the provider about the deadline, but do not treat it as a guaranteed collection commitment." },
      { role: "Apartment association coordinator", q: "Residents want to add phones on collection morning. How should I manage that?", a: "Ask the provider to assess additions before acceptance, especially batteries or damaged devices. Require owners to resolve data preparation and ownership authority rather than treating the event as blanket permission. Update the agreed inventory and receipt arrangement so individual contributions remain traceable." },
      { role: "Small office manager", q: "Our lift stopped working after booking. Should staff carry the equipment downstairs?", a: "Notify the provider and building manager before handling begins. Let the collection team reassess safe access, staffing and any changed terms. Do not improvise lifting or obstruct stairways to preserve an earlier collection window." },
      { role: "Home business owner", q: "The pickup receipt lists five items, but one printer stayed behind. What should I keep?", a: "Retain the original receipt and request a corrected record describing the four collected items and the excluded printer. Update your inventory to show the printer remains in your custody. Arrange its next step separately rather than marking the whole enquiry complete." },
    ],
    related: [
      { label: "Collection planning", path: "/wiki/disposal/e-waste-pickup-services/" },
      { label: "Pickup enquiries", path: "/pickup/" },
      { label: "Recycling evidence checklist", path: "/how-to-get-certificate-of-recycling/" },
    ],
    sources: [ewasteSource, batterySource, batterySafetySource],
  },
  {
    slug: "how-to-get-certificate-of-recycling",
    category: "how-to",
    title: "How to Get a Certificate of Recycling",
    description: "Agree recycling documentation before pickup, connect records to your consignment and distinguish processing evidence from EPR and data sanitization certificates.",
    answer: "Ask the provider before collection what recycling evidence it can issue, who issues it and what event the document confirms. Supply an accurate inventory and reconcile the final record with the handover. A pickup receipt, recycling certificate, data sanitization record and portal EPR certificate serve different purposes.",
    sections: [
      {
        heading: "Specify the evidence you actually need",
        paragraphs: ["An internal asset audit may need serial numbers and disposition outcomes, while a material consignment may be tracked by category and measured weight. Agree the reporting unit, issuer's legal name, receiving facility, processing scope and link to the collection reference. A proposed sample can reveal missing fields before equipment leaves your control."],
      },
      {
        heading: "Check what the document does not establish",
        paragraphs: ["A collection acknowledgement proves receipt, not completed recycling. A recycler's batch statement is not automatically a CPCB portal EPR certificate for producer compliance, and neither proves hard-drive sanitization without separate evidence. Ask how reused equipment, batteries, residues and downstream transfers are distinguished. Avoid accepting a blanket statement that everything was recycled when some assets were resold or remain unprocessed."],
      },
    ],
    steps: [
      { name: "Agree reporting before release", text: "State your audit purpose and request the issuer, fields, supporting records and expected reporting stage. Verify relevant registration rather than relying on a certificate design." },
      { name: "Record the collection", text: "Match item counts or measured quantities, identifiers and the consignment reference. Note discrepancies and retain the signed handover acknowledgement." },
      { name: "Reconcile the final evidence", text: "Check dates, facility details, quantities and stated treatment against the inventory. Request correction of missing information and retain unresolved items for follow-up." },
    ],
    tools: ["Asset or material inventory", "Agreed reporting specification", "Handover receipt", "Document reconciliation checklist"],
    timeline: "Final evidence depends on receipt, actual processing and downstream reporting. Agree milestones, but do not assume the collection date is the certificate date.",
    faq: [
      { q: "Is there one universal certificate format?", a: "Do not assume so. Required evidence depends on the applicable rules, regulated role, contract and audit purpose." },
      { q: "Can Form 6 replace the certificate?", a: "No. Form 6 is a legacy 2016 e-waste movement document, not proof of completed recycling or a universal current requirement." },
    ],
    related: [
      { label: "Choosing a recycler", path: "/wiki/technical/choose-recycler/" },
      { label: "ITAD documentation enquiries", path: "/itad/" },
      { label: "What is Form 6?", path: "/what-is-form-6/" },
    ],
    sources: [ewasteSource, nistSource, { title: "E-waste EPR management system", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" }, { title: "Legacy Form 6 e-waste manifest", href: "https://kspcb.karnataka.gov.in/sites/default/files/inline-files/FORM-6-E-waste-Rules-2016_0.pdf", publisher: "Karnataka State Pollution Control Board", note: "Historical 2016 transport form." }],
  },
  {
    slug: "how-to-comply-with-e-waste-rules",
    category: "how-to",
    title: "How to Comply with E-Waste Rules in India",
    description: "Build a role-based compliance workflow using current official rules, verified recipients and records that keep battery waste and producer EPR duties distinct.",
    answer: "Identify your organisation's regulated roles and covered equipment, check current official requirements, verify receiving entities and maintain evidence of each applicable obligation. EPR duties are role-based, not imposed identically on all consumers. Battery waste requires a separate assessment under the Battery Waste Management Rules.",
    sections: [
      {
        heading: "Map activities before selecting registrations",
        paragraphs: ["Distinguish manufacturing, own-brand selling, importing, refurbishing, recycling and using equipment. One organisation can hold several roles, and product coverage or exclusions can affect applicability. Covered bulk consumers must channelise e-waste appropriately, but ownership alone does not create producer recycling targets. Use CPCB guidance and qualified advice for ambiguous activities rather than copying another company's checklist."],
      },
      {
        heading: "Use current evidence, not inherited form names",
        paragraphs: ["Review the 2022 e-waste rules with amendments, official portal notices and applicable state directions. Form 6 was the legacy 2016 e-waste manifest, not a universal current requirement. Form 10 belongs to the hazardous-and-other-wastes framework, not every electronics pickup. Establish the actual waste classification and movement requirements before deciding which documents are necessary."],
      },
    ],
    steps: [
      { name: "Create a responsibility register", text: "List legal entities, activities, equipment categories and applicable obligations. Assign an accountable owner and record the official basis for each requirement." },
      { name: "Verify partners and routes", text: "Check role-specific registrations, facility scope and applicable permissions. Record separate battery handling and identify downstream processors, not only the collection contact." },
      { name: "Reconcile and review", text: "Maintain inventories, transfers and processing evidence. Where producer duties apply, reconcile portal certificates and returns against current obligations; review notices and changes before each filing." },
    ],
    tools: ["Role and product matrix", "Official rules and portal notices", "Registration verification records", "Evidence register and compliance calendar"],
    timeline: "Review applicability before starting regulated activities or changing product lines. Filing dates and regulatory processing depend on current notices; this workflow guarantees no approval time.",
    faq: [
      { q: "Is a recycling receipt complete legal compliance?", a: "No. It supports a particular transfer; registrations, producer obligations, reporting or other duties may also apply to your role." },
      { q: "Can I combine battery and e-waste records?", a: "A shared inventory can help administration, but distinguish the streams and retain the evidence required by each separate framework." },
    ],
    related: [
      { label: "Indian e-waste laws", path: "/wiki/technical/indian-laws/" },
      { label: "ITAD service", path: "/itad/" },
      { label: "CPCB registration explained", path: "/what-is-cpcb-registration/" },
      { label: "EPR explained", path: "/what-is-epr/" },
    ],
    sources: [ewasteSource, batterySource, { title: "Legacy Form 6 e-waste manifest", href: "https://kspcb.karnataka.gov.in/sites/default/files/inline-files/FORM-6-E-waste-Rules-2016_0.pdf", publisher: "Karnataka State Pollution Control Board", note: "Historical 2016 form." }, { title: "Form 10: Manifest for Hazardous and Other Waste", href: "https://ddnocmms.nic.in/SPCB_DOCUMENTS/Foms%2010-%20HW.pdf", publisher: "Pollution Control Committee, Daman and Diu", note: "Separate waste framework; verify applicability." }],
  },
  {
    slug: "how-to-destroy-hard-drive-data",
    category: "how-to",
    title: "How to Destroy Hard-Drive Data Safely",
    description: "Plan authorised media sanitization with retention checks, drive identification, appropriate professional treatment and verified results before recycling.",
    answer: "For drives you own or are authorised to retire, verify backups and retention requirements, identify the storage medium and select an appropriate sanitization method with qualified support. Record and validate the result before release. Do not rely on deleting files or attempt DIY drilling, burning or shredding.",
    sections: [
      {
        heading: "Confirm authority and the exact media",
        paragraphs: ["Obtain the information owner's approval and check legal holds, retention policies and lease conditions before irreversible action. Identify every drive, including secondary disks, RAID members and removable storage. A failed computer does not imply a failed or unreadable drive. Keep unsanitized media secure and track custody until an approved outcome is documented."],
      },
      {
        heading: "Choose a method that fits the risk",
        paragraphs: ["Consult the official NIST SP 800-88 publication and current device guidance. Magnetic hard disks and SSDs require different technical considerations; do not assume overwriting, degaussing or encryption-based erasure suits every medium. Reuse may be possible after suitable verified sanitization. Failed media or restrictive policies may instead require professional physical destruction followed by responsible recycling."],
      },
    ],
    steps: [
      { name: "Approve and inventory", text: "Verify recoverable backups, resolve retention restrictions and record media identifiers. Separate approved drives from equipment still in use." },
      { name: "Agree the treatment and custody", text: "Ask a qualified provider to justify the method for each media type and sensitivity. Specify secure transport, result evidence and handling of failures before handover." },
      { name: "Validate and close the record", text: "Reconcile each identifier with execution results, verification and approval. Escalate failures rather than releasing the drive; retain sanitization and recycling evidence as distinct records." },
    ],
    tools: ["Approved media inventory", "Verified backup", "Current sanitization policy", "Provider method specification and result records"],
    timeline: "Duration depends on capacity, media health, selected treatment and validation. Do not schedule resale or disposal on an assumed universal wipe time.",
    faq: [
      { q: "Is quick formatting sufficient?", a: "Do not assume so. It generally changes filesystem structures rather than demonstrating sanitization of all target data to the required assurance level." },
      { q: "Does destroying this drive erase cloud backups?", a: "No. Separate copies and cloud storage require their own authorised retention and disposal decisions. Include them in the information inventory where relevant." },
    ],
    related: [
      { label: "Hard-drive destruction overview", path: "/wiki/technical/hard-drive-destruction/" },
      { label: "Data destruction service", path: "/data-destruction/" },
      { label: "What is NIST SP 800-88?", path: "/what-is-nist-800-88/" },
    ],
    sources: [nistSource, ewasteSource],
  },
];
