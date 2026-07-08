import { BUSINESS, whatsappLink, telLink } from "../data/site";
import type { Lead, FlowType } from "../types/lead";

/**
 * Stage 1 lead-funnel chatbot: a fixed decision-tree, no LLM calls, no paid API.
 * Every question and option is authored here — nothing is generated at runtime.
 * Stage 2 (WhatsApp Cloud API, backend, follow-up automation) is documented in
 * docs/roadmap/whatsapp-ai-admin-worker-roadmap.md, not implemented.
 */

type Step =
  | { id: string; kind: "choice"; question: string; options: string[] }
  | { id: string; kind: "text"; question: string; placeholder: string };

interface QuickLink {
  label: string;
  href: string;
}

interface FlowDef {
  id: Exclude<FlowType, "malayalam">;
  menuLabel: string;
  steps: Step[];
  safeNotice?: string;
  quickLinksAfter?: QuickLink[];
  buildMessage(answers: Record<string, string>, pagePath: string): string;
}

const LEAD_STORAGE_KEY = "ewLeadFunnel:lastLead";

const FLOWS: Record<Exclude<FlowType, "malayalam">, FlowDef> = {
  pickup: {
    id: "pickup",
    menuLabel: "Book a pickup",
    steps: [
      { id: "pickupType", kind: "choice", question: "What type of pickup do you need?", options: ["Home pickup", "Office pickup", "Bulk pickup", "Apartment/society pickup"] },
      { id: "itemDetails", kind: "text", question: "What items do you have?", placeholder: "e.g. 2 laptops, 1 printer" },
      { id: "quantity", kind: "choice", question: "Approximate quantity?", options: ["1–3 items", "4–10 items", "10+ items", "Bulk office items"] },
      { id: "location", kind: "text", question: "Your location / area?", placeholder: "e.g. Kakkanad, Edappally" },
      { id: "preferredTime", kind: "choice", question: "Preferred pickup time?", options: ["Today", "Tomorrow", "This week", "Call me first"] },
      { id: "dataDestructionNeeded", kind: "choice", question: "Any data destruction needed?", options: ["Yes", "No", "Not sure"] },
    ],
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I want to book an e-waste pickup.\n` +
      `Pickup type: ${a.pickupType}\n` +
      `Items: ${a.itemDetails}\n` +
      `Quantity: ${a.quantity}\n` +
      `Location: ${a.location}\n` +
      `Preferred time: ${a.preferredTime}\n` +
      `Data destruction needed: ${a.dataDestructionNeeded}\n` +
      `Page source: ${pagePath}\n` +
      `Please call/message me.`,
  },

  "scrap-price": {
    id: "scrap-price",
    menuLabel: "Get a scrap price quote",
    steps: [
      { id: "itemCategory", kind: "choice", question: "What do you want to sell?", options: ["Laptop/computer", "Server/IT equipment", "Mobile/tablet", "Battery/UPS", "Mixed electronics"] },
      { id: "condition", kind: "choice", question: "Working condition?", options: ["Working", "Not working", "Damaged", "Mixed/unknown"] },
      { id: "quantity", kind: "text", question: "Quantity?", placeholder: "e.g. 3 units" },
      { id: "location", kind: "text", question: "Your location / area?", placeholder: "e.g. Kakkanad" },
      { id: "notes", kind: "choice", question: "Can you share photos on WhatsApp?", options: ["Yes", "I will send later"] },
    ],
    safeNotice: "Final quote depends on inspection, item condition, quantity, working status, pickup location and current market rate.",
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I want a scrap price quote.\n` +
      `Items: ${a.itemCategory}\n` +
      `Condition: ${a.condition}\n` +
      `Quantity: ${a.quantity}\n` +
      `Location: ${a.location}\n` +
      `Photos: ${a.notes}\n` +
      `Page source: ${pagePath}\n` +
      `Please share an indicative quote. I understand final price depends on inspection.`,
  },

  "sell-electronics": {
    id: "sell-electronics",
    menuLabel: "Sell old electronics",
    steps: [
      { id: "itemCategory", kind: "text", question: "What item do you want to sell?", placeholder: "e.g. laptop, phone" },
      { id: "itemDetails", kind: "text", question: "Brand/model if known?", placeholder: "e.g. Dell Latitude 7440" },
      { id: "condition", kind: "choice", question: "Working or damaged?", options: ["Working", "Damaged", "Not sure"] },
      { id: "quantity", kind: "text", question: "Quantity?", placeholder: "e.g. 1" },
      { id: "location", kind: "text", question: "Your location / area?", placeholder: "e.g. Edappally" },
      { id: "notes", kind: "choice", question: "Need pickup?", options: ["Yes", "No", "Not sure"] },
    ],
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I want to sell my ${a.itemCategory}.\n` +
      `Brand/model: ${a.itemDetails}\n` +
      `Condition: ${a.condition}\n` +
      `Quantity: ${a.quantity}\n` +
      `Location: ${a.location}\n` +
      `Pickup needed: ${a.notes}\n` +
      `Page source: ${pagePath}\n` +
      `I can send photos on WhatsApp.`,
  },

  "data-destruction": {
    id: "data-destruction",
    menuLabel: "Data destruction",
    steps: [
      { id: "itemCategory", kind: "choice", question: "Device type?", options: ["HDD", "SSD", "Laptop", "Server", "Mobile", "Mixed office devices"] },
      { id: "quantity", kind: "text", question: "Quantity?", placeholder: "e.g. 10 drives" },
      { id: "notes", kind: "choice", question: "Preferred method?", options: ["Wiping", "Shredding", "Degaussing", "Not sure"] },
      { id: "dataDestructionNeeded", kind: "choice", question: "Need documentation/certificate sample?", options: ["Yes", "No"] },
      { id: "businessType", kind: "text", question: "Company/location?", placeholder: "e.g. Infopark, Kakkanad" },
    ],
    safeNotice: "Documentation available on request. Suitable method depends on device type and inspection.",
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I need data destruction support.\n` +
      `Device type: ${a.itemCategory}\n` +
      `Quantity: ${a.quantity}\n` +
      `Preferred method: ${a.notes}\n` +
      `Documentation needed: ${a.dataDestructionNeeded}\n` +
      `Company/location: ${a.businessType}\n` +
      `Page source: ${pagePath}\n` +
      `Please advise on process and confirm details.`,
  },

  "battery-recycling": {
    id: "battery-recycling",
    menuLabel: "Battery recycling",
    steps: [
      { id: "itemCategory", kind: "choice", question: "Battery type?", options: ["Laptop/mobile battery", "UPS battery", "Inverter battery", "Lithium battery", "Swollen/damaged battery", "Not sure"] },
      { id: "quantity", kind: "text", question: "Quantity?", placeholder: "e.g. 2 batteries" },
      { id: "condition", kind: "choice", question: "Condition?", options: ["Normal", "Swollen", "Leaking", "Damaged", "Not sure"] },
      { id: "location", kind: "text", question: "Your location / area?", placeholder: "e.g. Thrippunithura" },
    ],
    safeNotice: "Damaged, swollen or leaking batteries should not be mixed with regular waste. Handle carefully and avoid heat, puncture or pressure.",
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I need to recycle batteries.\n` +
      `Battery type: ${a.itemCategory}\n` +
      `Quantity: ${a.quantity}\n` +
      `Condition: ${a.condition}\n` +
      `Location: ${a.location}\n` +
      `Page source: ${pagePath}\n` +
      `Please advise on safe collection.`,
  },

  "business-itad": {
    id: "business-itad",
    menuLabel: "Business / ITAD pickup",
    steps: [
      { id: "businessType", kind: "choice", question: "Organization type?", options: ["IT company", "Office", "School/college", "Hospital/clinic", "Bank/finance", "Other"] },
      { id: "itemCategory", kind: "text", question: "Asset type?", placeholder: "e.g. laptops, desktops, servers" },
      { id: "quantity", kind: "text", question: "Approximate count?", placeholder: "e.g. 120 laptops" },
      { id: "notes", kind: "choice", question: "Inventory list available?", options: ["Yes", "No"] },
      { id: "dataDestructionNeeded", kind: "choice", question: "Data destruction required?", options: ["Yes", "No", "Not sure"] },
      { id: "location", kind: "text", question: "Location/contact person?", placeholder: "e.g. Infopark, contact: ..." },
    ],
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I need business/ITAD pickup support.\n` +
      `Organization type: ${a.businessType}\n` +
      `Asset type: ${a.itemCategory}\n` +
      `Approximate count: ${a.quantity}\n` +
      `Inventory list available: ${a.notes}\n` +
      `Data destruction required: ${a.dataDestructionNeeded}\n` +
      `Location/contact person: ${a.location}\n` +
      `Page source: ${pagePath}\n` +
      `Please share next steps.`,
  },

  "service-area": {
    id: "service-area",
    menuLabel: "Check my service area",
    steps: [
      { id: "location", kind: "text", question: "Which area are you in?", placeholder: "e.g. Kalamassery" },
      { id: "itemDetails", kind: "text", question: "What items need collection?", placeholder: "e.g. old laptops, batteries" },
    ],
    quickLinksAfter: [
      { label: "All service areas", href: "/locations/" },
      { label: "Kakkanad", href: "/locations/kakkanad/" },
      { label: "Ernakulam South", href: "/locations/ernakulam-south/" },
      { label: "Kalamassery", href: "/locations/kalamassery/" },
    ],
    buildMessage: (a, pagePath) =>
      `Hi Ewaste Kochi, I need e-waste collection.\n` +
      `Area: ${a.location}\n` +
      `Items needing collection: ${a.itemDetails}\n` +
      `Page source: ${pagePath}\n` +
      `Please confirm if you serve my area and next steps.`,
  },
};

const MALAYALAM_GREETING =
  "നമസ്കാരം. ഇ-വേസ്റ്റ് പിക്കപ്പ് / വില / ബാറ്ററി റീസൈക്ലിംഗ് / ഡാറ്റ ഡിസ്‌ട്രക്ഷൻ സഹായം വേണോ?";

const MALAYALAM_ROUTE: Record<string, Exclude<FlowType, "malayalam">> = {
  Pickup: "pickup",
  "Price quote": "scrap-price",
  "Battery recycling": "battery-recycling",
  "Data destruction": "data-destruction",
};

const CONSENT_TEXT =
  "By continuing to WhatsApp, you agree to share these details with Ewaste Kochi so we can respond to your pickup or quote request.";

// ---- state ----
let isOpen = false;
let mlMode = false;
let currentFlow: FlowDef | null = null;
let stepIndex = 0;
let answers: Record<string, string> = {};

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function scrollToBottom(container: HTMLElement) {
  container.scrollTop = container.scrollHeight;
}

function addBotBubble(container: HTMLElement, text: string) {
  const msg = el("div", "ewlf-msg ewlf-msg-bot");
  const bubble = el("div", "ewlf-bubble");
  bubble.textContent = text;
  msg.appendChild(bubble);
  container.appendChild(msg);
  scrollToBottom(container);
}

function addUserBubble(container: HTMLElement, text: string) {
  const msg = el("div", "ewlf-msg ewlf-msg-user");
  const bubble = el("div", "ewlf-bubble");
  bubble.textContent = text;
  msg.appendChild(bubble);
  container.appendChild(msg);
  scrollToBottom(container);
}

function clearActionArea(actionArea: HTMLElement) {
  actionArea.innerHTML = "";
}

function renderMenu(messages: HTMLElement, actionArea: HTMLElement) {
  clearActionArea(actionArea);
  const options: { label: string; onSelect: () => void }[] = [];

  for (const flow of Object.values(FLOWS)) {
    options.push({
      label: flow.menuLabel,
      onSelect: () => startFlow(messages, actionArea, flow.id, false),
    });
  }
  options.push({
    label: "Malayalam support / മലയാളം",
    onSelect: () => startMalayalam(messages, actionArea),
  });

  for (const opt of options) {
    const btn = el("button", "ewlf-choice-btn");
    btn.type = "button";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      addUserBubble(messages, opt.label);
      opt.onSelect();
    });
    actionArea.appendChild(btn);
  }
}

function isFlowId(value: string | null): value is Exclude<FlowType, "malayalam"> {
  return Boolean(value && value in FLOWS);
}

function startMalayalam(messages: HTMLElement, actionArea: HTMLElement) {
  addBotBubble(messages, MALAYALAM_GREETING);
  clearActionArea(actionArea);
  for (const label of Object.keys(MALAYALAM_ROUTE)) {
    const btn = el("button", "ewlf-choice-btn");
    btn.type = "button";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      addUserBubble(messages, label);
      startFlow(messages, actionArea, MALAYALAM_ROUTE[label], true);
    });
    actionArea.appendChild(btn);
  }
}

function startFlow(messages: HTMLElement, actionArea: HTMLElement, flowId: Exclude<FlowType, "malayalam">, isMalayalam: boolean) {
  currentFlow = FLOWS[flowId];
  mlMode = isMalayalam;
  stepIndex = 0;
  answers = {};
  renderStep(messages, actionArea);
}

function renderStep(messages: HTMLElement, actionArea: HTMLElement) {
  if (!currentFlow) return;
  if (stepIndex >= currentFlow.steps.length) {
    finishFlow(messages, actionArea);
    return;
  }

  const step = currentFlow.steps[stepIndex];
  addBotBubble(messages, step.question);
  clearActionArea(actionArea);

  if (step.kind === "choice") {
    for (const option of step.options) {
      const btn = el("button", "ewlf-choice-btn");
      btn.type = "button";
      btn.textContent = option;
      btn.addEventListener("click", () => {
        addUserBubble(messages, option);
        answers[step.id] = option;
        stepIndex++;
        renderStep(messages, actionArea);
      });
      actionArea.appendChild(btn);
    }
  } else {
    const row = el("div", "ewlf-text-row");
    const input = el("input", "ewlf-text-input");
    input.type = "text";
    input.placeholder = step.placeholder;
    const submit = el("button", "ewlf-text-submit");
    submit.type = "button";
    submit.textContent = "Send";
    const submitValue = () => {
      const value = input.value.trim();
      if (!value) return;
      addUserBubble(messages, value);
      answers[step.id] = value;
      stepIndex++;
      renderStep(messages, actionArea);
    };
    submit.addEventListener("click", submitValue);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitValue();
      }
    });
    row.appendChild(input);
    row.appendChild(submit);
    actionArea.appendChild(row);
    input.focus();
  }
}

function finishFlow(messages: HTMLElement, actionArea: HTMLElement) {
  if (!currentFlow) return;
  const pagePath = window.location.pathname;
  let whatsappMessage = currentFlow.buildMessage(answers, pagePath);
  if (mlMode) {
    whatsappMessage = `${MALAYALAM_GREETING} (Malayalam support request)\n\n${whatsappMessage}`;
  }

  const lead: Lead = {
    leadId: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    pagePath,
    pageTitle: document.title,
    flowType: currentFlow.id,
    pickupType: answers.pickupType,
    itemDetails: answers.itemDetails,
    itemCategory: answers.itemCategory,
    condition: answers.condition,
    quantity: answers.quantity,
    location: answers.location,
    preferredTime: answers.preferredTime,
    dataDestructionNeeded: answers.dataDestructionNeeded,
    businessType: answers.businessType,
    notes: answers.notes,
    language: mlMode ? "ml" : "en",
    whatsappMessage,
  };

  // Stage 1 lead backup: localStorage only, for the visitor's own convenience.
  // This is NOT a business backup — no backend endpoint exists in this static
  // site. See docs/roadmap/whatsapp-ai-admin-worker-roadmap.md for Stage 2.
  try {
    window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // localStorage can throw in private-browsing/quota-exceeded cases; the
    // WhatsApp handoff below must not depend on this succeeding.
  }

  if (currentFlow.safeNotice) {
    addBotBubble(messages, currentFlow.safeNotice);
  }

  clearActionArea(actionArea);

  const consent = el("p", "ewlf-consent");
  consent.textContent = CONSENT_TEXT;
  actionArea.appendChild(consent);

  const waLink = el("a", "ewlf-wa-cta");
  waLink.href = whatsappLink(whatsappMessage);
  waLink.target = "_blank";
  waLink.rel = "noopener";
  waLink.textContent = "Continue on WhatsApp";
  actionArea.appendChild(waLink);

  if (currentFlow.quickLinksAfter) {
    const linkRow = el("div", "ewlf-quick-links");
    for (const link of currentFlow.quickLinksAfter) {
      const a = el("a", "ewlf-quick-link");
      a.href = link.href;
      a.textContent = link.label;
      linkRow.appendChild(a);
    }
    actionArea.appendChild(linkRow);
  }

  const restartBtn = el("button", "ewlf-choice-btn ewlf-restart");
  restartBtn.type = "button";
  restartBtn.textContent = "Start over";
  restartBtn.addEventListener("click", () => {
    currentFlow = null;
    mlMode = false;
    renderMenu(messages, actionArea);
  });
  actionArea.appendChild(restartBtn);
}

function openPanel(root: HTMLElement) {
  isOpen = true;
  root.classList.add("ewlf-open");
  const launcher = root.querySelector<HTMLButtonElement>(".ewlf-launcher");
  launcher?.setAttribute("aria-expanded", "true");
  const panel = root.querySelector<HTMLElement>(".ewlf-panel");
  panel?.setAttribute("aria-hidden", "false");
}

function closePanel(root: HTMLElement) {
  isOpen = false;
  root.classList.remove("ewlf-open");
  const launcher = root.querySelector<HTMLButtonElement>(".ewlf-launcher");
  launcher?.setAttribute("aria-expanded", "false");
  const panel = root.querySelector<HTMLElement>(".ewlf-panel");
  panel?.setAttribute("aria-hidden", "true");
  launcher?.focus();
}

function init() {
  const root = document.getElementById("ew-lead-chat-root");
  if (!root) return;
  if (root.dataset.ewlfInitialized === "true") return;
  root.dataset.ewlfInitialized = "true";

  root.innerHTML = `
    <button type="button" class="ewlf-launcher" aria-haspopup="dialog" aria-expanded="false" aria-controls="ewlf-panel" aria-label="Open chat to book a pickup or get a quote">
      Chat
    </button>
    <div class="ewlf-panel" id="ewlf-panel" role="dialog" aria-modal="false" aria-label="Ewaste Kochi lead chat" aria-hidden="true" tabindex="-1">
      <div class="ewlf-panel-header">
        <span>Ewaste Kochi</span>
        <div class="ewlf-header-actions">
          <a href="${telLink()}" class="ewlf-header-link" aria-label="Call Ewaste Kochi">Call</a>
          <button type="button" class="ewlf-close" aria-label="Close chat">×</button>
        </div>
      </div>
      <div class="ewlf-messages" id="ewlf-messages" aria-live="polite"></div>
      <div class="ewlf-actions" id="ewlf-actions"></div>
    </div>
  `;

  const launcher = root.querySelector<HTMLButtonElement>(".ewlf-launcher")!;
  const closeBtn = root.querySelector<HTMLButtonElement>(".ewlf-close")!;
  const messages = root.querySelector<HTMLElement>("#ewlf-messages")!;
  const actionArea = root.querySelector<HTMLElement>("#ewlf-actions")!;

  const focusFirstInteractive = () => {
    const target =
      actionArea.querySelector<HTMLElement>("button, a[href]") ?? closeBtn;
    target?.focus();
  };

  const openLeadFunnel = (flowId?: Exclude<FlowType, "malayalam">) => {
    openPanel(root);
    if (flowId) {
      messages.innerHTML = "";
      addBotBubble(messages, `Let's get the right details for ${BUSINESS.name}.`);
      startFlow(messages, actionArea, flowId, false);
      focusFirstInteractive();
      return;
    }
    if (messages.children.length === 0) {
      addBotBubble(messages, `Hi, I'm here to help with pickups, quotes, and recycling questions for ${BUSINESS.name}. What do you need?`);
      renderMenu(messages, actionArea);
    }
    focusFirstInteractive();
  };

  launcher.addEventListener("click", () => {
    if (isOpen) {
      closePanel(root);
    } else {
      openLeadFunnel();
    }
  });

  document.querySelectorAll<HTMLElement>("[data-ewlf-open]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const requestedFlow = trigger.dataset.ewlfFlow ?? null;
      openLeadFunnel(isFlowId(requestedFlow) ? requestedFlow : undefined);
    });
  });

  closeBtn.addEventListener("click", () => closePanel(root));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closePanel(root);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
