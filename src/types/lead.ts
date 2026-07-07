export type FlowType =
  | "pickup"
  | "scrap-price"
  | "sell-electronics"
  | "data-destruction"
  | "battery-recycling"
  | "business-itad"
  | "service-area"
  | "malayalam";

export interface Lead {
  leadId: string;
  timestamp: string;
  pagePath: string;
  pageTitle: string;
  flowType: FlowType;
  pickupType?: string;
  itemDetails?: string;
  itemCategory?: string;
  condition?: string;
  quantity?: string;
  location?: string;
  preferredTime?: string;
  dataDestructionNeeded?: string;
  businessType?: string;
  notes?: string;
  language: "en" | "ml";
  whatsappMessage: string;
}
