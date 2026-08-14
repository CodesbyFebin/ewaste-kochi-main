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
  // From the verified Google Business Profile pin (maps.app.goo.gl/WvVq5q78v8LKrMDH7),
  // cross-checked against the address above — both place this in Thrippunithura.
  geo: {
    latitude: 9.9453044,
    longitude: 76.3501359,
  },
  mapUrl: "https://maps.app.goo.gl/WvVq5q78v8LKrMDH7",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125744.63273804834!2d76.2447004890625!3d9.973853345731698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873e1e02e1053%3A0xc6baa7e9228b3049!2sKochi%20Secure%20E-Waste%20%26%20Certified%20ITAD%20-%20Data%20Destruction%20Solutions!5e0!3m2!1sen!2sin!4v1779116858396!5m2!1sen!2sin",
  sameAs: [
    "https://www.instagram.com/ewaste_kochi/",
    "https://www.facebook.com/profile.php?id=61578578860978",
    "https://x.com/EwasteKochi",
    "https://in.pinterest.com/EwasteKochi/",
    "https://www.linkedin.com/in/ewaste-kochi-891423419/",
  ],
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
