const ALLOWED_TOP_LEVEL_TYPES = new Set([
  "Organization",
  "LocalBusiness",
  "WebSite",
  "WebPage",
  "Service",
  "BreadcrumbList",
  "FAQPage",
  "BlogPosting",
  "Article",
]);

// GeoCoordinates/geo/latitude/longitude were denied until a verified pin
// (matching the existing BUSINESS.address) was available — see
// src/pages/index.astro's Organization block for the one place this is used.
const DENIED_TYPES = new Set([
  "AggregateRating",
  "Review",
  "QAPage",
  "HowTo",
  "HowToStep",
  "Certification",
]);

const DENIED_KEYS = new Set([
  "aggregateRating",
  "review",
  "reviews",
  "rating",
  "ratingValue",
  "reviewCount",
  "bestRating",
  "worstRating",
  "award",
  "awards",
  "certification",
  "hasCertification",
  "hasCredential",
  "identifier",
]);

function values(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : typeof value === "string" ? [value] : [];
}

function hasDeniedType(value: unknown): boolean {
  return values(value).some((type) => DENIED_TYPES.has(type));
}

function hasAllowedTopLevelType(value: unknown): boolean {
  return values(value).some((type) => ALLOWED_TOP_LEVEL_TYPES.has(type));
}

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeValue(item))
      .filter((item) => item !== undefined);
  }

  if (!value || typeof value !== "object") return value;

  const record = value as Record<string, unknown>;
  if (hasDeniedType(record["@type"])) return undefined;

  const clean: Record<string, unknown> = {};
  for (const [key, nestedValue] of Object.entries(record)) {
    if (DENIED_KEYS.has(key)) continue;
    const sanitized = sanitizeValue(nestedValue);
    if (sanitized !== undefined) clean[key] = sanitized;
  }

  return clean;
}

export function sanitizeJsonLdBlocks(blocks: Record<string, unknown>[]): Record<string, unknown>[] {
  return blocks
    .filter((block) => hasAllowedTopLevelType(block["@type"]) && !hasDeniedType(block["@type"]))
    .map((block) => sanitizeValue(block))
    .filter((block): block is Record<string, unknown> => Boolean(block && typeof block === "object"));
}

export function sanitizeJsonLdBlock(block: Record<string, unknown>): Record<string, unknown> | undefined {
  return sanitizeJsonLdBlocks([block])[0];
}
