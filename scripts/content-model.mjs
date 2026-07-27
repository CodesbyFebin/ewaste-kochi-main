export const SITE = "https://blog.ewastekochi.com";
export const TODAY = "2026-07-24";

export const sources = {
  cpcb: { name: "Central Pollution Control Board — E-Waste", url: "https://cpcb.nic.in/e-waste/", accessed: TODAY },
  rules: { name: "E-Waste (Management) Rules, 2022", url: "https://moef.gov.in/", accessed: TODAY },
  kspcb: { name: "Kerala State Pollution Control Board", url: "https://kspcb.kerala.gov.in/", accessed: TODAY },
  dpdp: { name: "Digital Personal Data Protection Act, 2023", url: "https://www.meity.gov.in/data-protection-framework", accessed: TODAY },
  bess: { name: "CPCB Battery Waste Management", url: "https://cpcb.nic.in/battery-waste-management/", accessed: TODAY }
};

const clusters = [
  {
    key: "kochi-guides", label: "Kochi Local Guides", intent: "transactional", audience: ["households", "small businesses"],
    nouns: ["Kochi", "Kakkanad", "Edappally", "Vyttila", "Thrippunithura", "Aluva", "Kalamassery", "Fort Kochi", "Maradu", "Ernakulam"],
    title: (n) => `How to Dispose of E-Waste Responsibly in ${n}`,
    device: "mixed electronics", sourceKeys: ["cpcb", "kspcb"],
    focus: (n) => `a practical handover plan for homes and offices in ${n}`,
    risk: "mixing batteries, data-bearing equipment and ordinary scrap in one load",
    decision: "separate by hazard, data sensitivity and reuse potential before arranging collection"
  },
  {
    key: "laptop-computer", label: "Laptop & Computer Recycling", intent: "commercial", audience: ["device owners", "IT teams"],
    nouns: ["Old Laptop", "Desktop Computer", "Workstation", "Computer Monitor", "Office Printer", "Server", "Hard Drive", "SSD", "Mini PC", "MacBook"],
    title: (n) => `${n} Recycling in Kochi: Data, Reuse and Handover Guide`,
    device: (n) => n, sourceKeys: ["cpcb", "dpdp"],
    focus: (n) => `the decisions that matter before a ${n.toLowerCase()} leaves your control`,
    risk: "assuming a factory reset, deleted folder or quick format proves secure sanitisation",
    decision: "record the asset, choose reuse or recycling, sanitise appropriately, then retain handover evidence"
  },
  {
    key: "mobile-gadgets", label: "Mobile & Gadget Recycling", intent: "informational", audience: ["consumers", "repair shops"],
    nouns: ["Smartphone", "Tablet", "Smartwatch", "Earbuds", "Power Bank", "Charger", "Router", "Camera", "Gaming Console", "Bluetooth Speaker"],
    title: (n) => `Can You Recycle a ${n}? A Safe Kerala Disposal Guide`,
    device: (n) => n, sourceKeys: ["cpcb", "bess"],
    focus: (n) => `safe preparation, accessory separation and realistic reuse options for a ${n.toLowerCase()}`,
    risk: "placing hidden lithium batteries or damaged cells in household waste",
    decision: "remove accounts and personal data, isolate damaged batteries, and use an authorised channel"
  },
  {
    key: "battery-recycling", label: "Battery Recycling", intent: "informational", audience: ["households", "facility teams"],
    nouns: ["Lithium-ion Battery", "Laptop Battery", "Phone Battery", "UPS Battery", "Power-tool Battery", "E-bike Battery", "Button Cell", "Camera Battery", "Swollen Battery", "Damaged Battery Pack"],
    title: (n) => `${n} Disposal in Kerala: Storage, Safety and Recycling`,
    device: (n) => n, sourceKeys: ["bess", "kspcb"],
    focus: (n) => `short-term storage and handover precautions for a ${n.toLowerCase()}`,
    risk: "puncture, crushing, exposed terminals, heat or mixing incompatible battery chemistries",
    decision: "stop using damaged units, prevent terminal contact, keep them cool and dry, and arrange specialist collection"
  },
  {
    key: "itad", label: "IT Asset Disposition", intent: "commercial", audience: ["IT managers", "procurement teams"],
    nouns: ["Technology Company", "School", "Hospital", "Bank", "Hotel", "Retail Chain", "Government Office", "Startup", "Data Centre", "Design Studio"],
    title: (n) => `IT Asset Disposition for a ${n} in Kerala: Control Checklist`,
    device: "IT asset fleet", sourceKeys: ["cpcb", "dpdp"],
    focus: (n) => `a defensible ITAD workflow suited to a ${n.toLowerCase()}`,
    risk: "losing chain-of-custody visibility between inventory release, transport, sanitisation and final treatment",
    decision: "assign asset owners, reconcile serial numbers, approve the treatment path and close the job with evidence"
  },
  {
    key: "data-security", label: "Data Security & Destruction", intent: "compliance", audience: ["security teams", "data fiduciaries"],
    nouns: ["Hard Drive Erasure", "SSD Sanitisation", "Laptop Factory Reset", "Mobile Data Removal", "Server Decommissioning", "Backup Media Disposal", "Printer Memory Clearing", "Router Reset", "Encrypted Drive Disposal", "Certificate of Destruction"],
    title: (n) => `${n}: What a Verifiable Device Disposal Process Requires`,
    device: "data-bearing equipment", sourceKeys: ["dpdp", "cpcb"],
    focus: (n) => `the evidence and control questions behind ${n.toLowerCase()}`,
    risk: "treating a user-interface action as proof that data is irrecoverable",
    decision: "match sanitisation to media type and reuse plan, record the method and verify the result"
  },
  {
    key: "law-compliance", label: "E-Waste Law & Compliance", intent: "compliance", audience: ["producers", "business leaders"],
    nouns: ["E-Waste Rules 2022", "Extended Producer Responsibility", "CPCB Registration", "Recycler Authorisation", "Bulk Consumer Records", "E-Waste Returns", "Producer Responsibility", "Refurbisher Records", "Cross-State Movement", "Vendor Due Diligence"],
    title: (n) => `${n} in India: An Operational Guide for Organisations`,
    device: "regulated electronic equipment", sourceKeys: ["rules", "cpcb", "kspcb"],
    focus: (n) => `turning ${n.toLowerCase()} from a policy phrase into assigned operational controls`,
    risk: "copying a generic checklist without verifying the organisation’s legal role or current obligations",
    decision: "identify your role, check the current official text, assign evidence owners and obtain professional advice for edge cases"
  },
  {
    key: "scrap-value", label: "Scrap Value & Reuse", intent: "commercial", audience: ["device owners", "asset managers"],
    nouns: ["Laptop", "Desktop", "Server", "Smartphone", "Circuit Board", "Copper Cable", "Monitor", "Printer", "Network Switch", "Office Electronics Lot"],
    title: (n) => `${n} Scrap Value in Kochi: What Actually Changes the Quote`,
    device: (n) => n, sourceKeys: ["cpcb"],
    focus: (n) => `how condition, completeness, data risk and recovery route affect a ${n.toLowerCase()} quote`,
    risk: "publishing a fixed price that quickly becomes misleading or ignores transport, testing and compliance costs",
    decision: "request an itemised, date-stamped assessment and compare net value after secure handling"
  },
  {
    key: "circular-economy", label: "Circular Economy & ESG", intent: "informational", audience: ["sustainability teams", "executives"],
    nouns: ["Electronics Reuse", "Repair Before Recycling", "Zero-Landfill Claims", "ESG E-Waste Reporting", "Carbon Claims", "Circular Procurement", "Device Life Extension", "Refurbished IT Buying", "Material Recovery", "Responsible Exit Policy"],
    title: (n) => `${n}: A Practical Circular Electronics Framework`,
    device: "electronics portfolio", sourceKeys: ["cpcb", "rules"],
    focus: (n) => `measurable decisions behind ${n.toLowerCase()} rather than unsupported sustainability language`,
    risk: "counting collection as recycling or reporting estimates as verified environmental outcomes",
    decision: "prioritise prevention and reuse, define boundaries, retain downstream evidence and label estimates clearly"
  },
  {
    key: "recycling-technology", label: "Recycling Technology", intent: "informational", audience: ["engineers", "sustainability teams"],
    nouns: ["AI Waste Sorting", "Robotic Disassembly", "Urban Mining", "Precious Metal Recovery", "Battery Diagnostics", "X-Ray Sorting", "Hydrometallurgy", "Mechanical Separation", "Digital Product Passports", "GPU Lifecycle Management"],
    title: (n) => `${n} for Electronics: Capabilities, Limits and Kerala Relevance`,
    device: "electronic waste stream", sourceKeys: ["cpcb", "rules"],
    focus: (n) => `where ${n.toLowerCase()} fits in a responsible treatment chain and where it does not`,
    risk: "confusing laboratory potential, vendor claims and commercially available local capacity",
    decision: "separate proven deployment from emerging research and verify downstream capabilities before making claims"
  }
];

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const records = clusters.flatMap((cluster, clusterIndex) =>
  cluster.nouns.map((noun, index) => {
    const title = cluster.title(noun);
    const slug = slugify(title);
    const sourceList = cluster.sourceKeys.map((key) => sources[key]);
    return {
      id: `${cluster.key}-${String(index + 1).padStart(2, "0")}`,
      title,
      slug,
      cluster: cluster.label,
      clusterSlug: cluster.key,
      intent: cluster.intent,
      audience: cluster.audience,
      location: cluster.key === "kochi-guides" ? noun : "Kerala",
      device: typeof cluster.device === "function" ? cluster.device(noun) : cluster.device,
      priority: index < 3 ? 1 : index < 7 ? 2 : 3,
      keyword: title.replace(/:.*$/, ""),
      focus: cluster.focus(noun),
      risk: cluster.risk,
      decision: cluster.decision,
      sources: sourceList,
      canonical: `${SITE}/${cluster.key}/${slug}/`,
      publishedAt: `2026-07-${String(1 + ((clusterIndex * 10 + index) % 24)).padStart(2, "0")}`,
      reviewedBy: "EWaste Kochi Editorial Desk",
      safetyReview: cluster.key === "battery-recycling",
      legalReview: ["law-compliance", "data-security"].includes(cluster.key)
    };
  })
);
