import type { APIRoute } from "astro";
import { BUSINESS, SITE_URL } from "../../data/site";

// Machine-readable Organization graph served at /schema/organization.json.
// Sourced exclusively from the verified BUSINESS record in src/data/site.ts
// so it cannot drift from the JSON-LD emitted by SeoHead.astro.
export const GET: APIRoute = () => {
  const body = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS.legalName,
      alternateName: BUSINESS.name,
      url: SITE_URL,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      sameAs: [...BUSINESS.sameAs],
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.streetAddress,
        addressLocality: BUSINESS.address.addressLocality,
        addressRegion: BUSINESS.address.addressRegion,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: BUSINESS.phone,
          contactType: "customer service",
          email: BUSINESS.email,
          areaServed: "IN",
          availableLanguage: ["English", "Malayalam"],
        },
      ],
    },
    null,
    2,
  );
  return new Response(body, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
