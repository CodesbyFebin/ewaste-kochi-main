export const SITE_URL = "https://www.ewastekochi.com";

export const BUSINESS = {
  name: "Ewaste Kochi",
  legalName: "E-Waste Kochi",
  phone: "+917500555454",
  phoneDisplay: "+91 75005 55454",
  whatsapp: "917500555454",
  email: "info@ewastekochi.com",
  address: {
    streetAddress: "710A Hill Palace Road",
    addressLocality: "Thrippunithura, Ernakulam",
    addressRegion: "Kerala",
    postalCode: "682301",
    addressCountry: "IN",
  },
  hours: "Mo-Sa 09:00-18:00",
  hoursDisplay: "Mon–Sat, 9:00 AM – 6:00 PM",
  // Carried forward from the live production site's public claims (ISO 14001:2015,
  // CPCB/KSPCB authorization). Not independently verified by this build — do not
  // add specific certificate numbers, validity dates, or scope details until the
  // user supplies the real documents (see PROJECT_TRACKER.md "Known Risks").
  complianceClaims: {
    iso14001: true,
    pollutionControlAuthorized: true,
  },
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${BUSINESS.phone}`;
}
