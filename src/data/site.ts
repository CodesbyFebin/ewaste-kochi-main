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
  // Do not encode certification or authorization status as structured data until
  // real documents are supplied and independently reviewed for exact wording.
  documentationPolicy: "available-on-request-without-structured-claim",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${BUSINESS.phone}`;
}
