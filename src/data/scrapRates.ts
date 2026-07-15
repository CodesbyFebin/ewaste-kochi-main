export interface ScrapCategory {
  id: string;
  label: string;
  baseRate: number;
  typicalWeight: number;
  description: string;
}

export interface MultiplierOption {
  id: string;
  label: string;
  multiplier: number;
}

export const SCRAP_CATEGORIES: ScrapCategory[] = [
  { id: "laptop", label: "Laptop / notebook", baseRate: 70, typicalWeight: 2.5, description: "Working, non-working or damaged laptops" },
  { id: "desktop", label: "Desktop / CPU", baseRate: 60, typicalWeight: 8, description: "Complete CPU towers or desktop units" },
  { id: "monitor", label: "Monitor / display", baseRate: 30, typicalWeight: 5, description: "LCD, LED and older display units" },
  { id: "mobile", label: "Mobile phone", baseRate: 85, typicalWeight: 0.2, description: "Smartphones and feature phones" },
  { id: "tablet", label: "Tablet", baseRate: 65, typicalWeight: 0.6, description: "Tablets and similar small devices" },
  { id: "printer", label: "Printer / scanner", baseRate: 40, typicalWeight: 6, description: "Printers, scanners and peripherals" },
  { id: "battery", label: "UPS / inverter battery", baseRate: 55, typicalWeight: 15, description: "Lead-acid and larger power batteries" },
  { id: "cables", label: "Cables & wires", baseRate: 120, typicalWeight: 3, description: "Copper cables, wires and adapters" },
  { id: "server", label: "Server / networking", baseRate: 50, typicalWeight: 12, description: "Servers, routers, switches and network hardware" },
  { id: "mixed", label: "Mixed IT scrap", baseRate: 35, typicalWeight: 10, description: "Mixed electronics and accessories" },
];

export const SCRAP_CONDITIONS: MultiplierOption[] = [
  { id: "working", label: "Working with accessories", multiplier: 1.25 },
  { id: "used", label: "Used / average", multiplier: 1 },
  { id: "non-working", label: "Non-working", multiplier: 0.75 },
  { id: "damaged", label: "Damaged or incomplete", multiplier: 0.6 },
];

export const SCRAP_LOCATIONS: MultiplierOption[] = [
  { id: "kochi", label: "Kochi metro / nearby", multiplier: 1 },
  { id: "ernakulam", label: "Ernakulam district", multiplier: 0.95 },
  { id: "kerala", label: "Other Kerala district", multiplier: 0.8 },
];
