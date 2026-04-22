/**
 * src/utils/meta.js
 * ─────────────────────────────────────────────────────────
 * Comprehensive SEO metadata system for EWaste Kochi website
 *
 * Why this exists:
 *   Each page previously constructed its own title/description/schema
 *   independently, making it impossible to enforce site-wide rules
 *   (e.g. max title length, canonical slash normalization, OG defaults).
 *   This module is a single source of truth for all metadata shapes.
 *
 * Features:
 *   - Title/description truncation to prevent Google truncation
 *   - Canonical URL normalization with consistent formatting
 *   - Schema generation for LocalBusiness, Article, Service pages
 *   - Organization data for NAP consistency across all pages
 *   - Open Graph and Twitter Card metadata
 *   - Metadata presets for different page types
 *
 * Usage:
 *   import { buildMetadata, metadataPresets } from '../utils/meta.js';
 *   const meta = buildMetadata({ title: 'Page Title', description: '...', pageType: 'Article' });
 *   const homepageMeta = metadataPresets.homepage();
 * ─────────────────────────────────────────────────────────
 */

const SITE_ORIGIN = 'https://ewastekochi.com';
const SITE_NAME = 'EWaste Kochi';
const DEFAULT_OG_IMAGE = '/img/ewaste-guide-hero.webp';
const DEFAULT_LOCALE = 'en_IN';

const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 155;

// Organization Data for NAP Consistency (Name, Address, Phone)
const organizationData = {
  name: SITE_NAME,
  description: 'Leading e-waste recycling and IT asset disposition company in Kochi, Kerala',
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/brand/ewastekochi-logo.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9876543210',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Malayalam'],
    areaServed: 'Kochi, Kerala'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Infopark Phase 1, Kakkanad',
    addressLocality: 'Kakkanad',
    addressRegion: 'Kochi',
    postalCode: '682037',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 10.0185,
    longitude: 76.3451
  },
  sameAs: [
    'https://www.facebook.com/ewastekochi',
    'https://www.linkedin.com/company/ewastekochi',
    'https://twitter.com/ewastekochi'
  ],
  openingHours: [
    'Mo-Fr 09:00-18:00',
    'Sa 09:00-14:00',
    'Su Closed'
  ],
  priceRange: '₹₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer'],
  areaServed: 'Kochi, Ernakulam, Aluva, Kakkanad, Thrippunithura, Kerala'
};

/**
 * Normalize a URL path to always have a trailing slash
 * and ensure it is lowercase.
 * @param {string} path - Relative or absolute URL path
 * @returns {string} Normalized absolute URL
 */
export function buildCanonical(path) {
  // If already absolute, normalize it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const url = new URL(path);
    url.pathname = normalizePath(url.pathname);
    return url.toString();
  }

  // Relative path — prefix site origin
  const normalized = normalizePath(path);
  return `${SITE_ORIGIN}${normalized}`;
}

/**
 * Normalize a path: lowercase, trailing slash, no double slashes.
 * @param {string} path
 * @returns {string}
 */
function normalizePath(path) {
  let normalized = path.toLowerCase();
  // Remove duplicate slashes
  normalized = normalized.replace(/\/+/g, '/');
  // Add trailing slash if missing (unless it's a file extension)
  if (!normalized.endsWith('/') && !normalized.includes('.')) {
    normalized = `${normalized}/`;
  }
  return normalized;
}

/**
 * Build an absolute OG image URL. Accepts a relative path or
 * returns the site default.
 * @param {string} [image]
 * @returns {string}
 */
export function buildOGImage(image) {
  if (!image) return `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`;
  if (image.startsWith('http')) return image;
  return `${SITE_ORIGIN}${image.startsWith('/') ? '' : '/'}${image}`;
}

/**
 * Truncate a string to a max length with ellipsis.
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
function truncate(str, max) {
  if (!str) return '';
  return str.length > max ? `${str.slice(0, max - 3).trim()}...` : str;
}

/**
 * Build a BreadcrumbList array with normalized canonical URLs.
 * @param {Array<{name: string, url: string}>} crumbs
 * @returns {Array<{name: string, url: string}>}
 */
export function buildBreadcrumbs(crumbs) {
  return crumbs.map(crumb => ({
    name: crumb.name,
    url: buildCanonical(crumb.url),
  }));
}

/**
 * Core metadata builder. Accepts page-level overrides and
 * returns a complete, validated metadata object safe to pass
 * to BaseLayout.
 *
 * @param {object} opts
 * @param {string} opts.title          - Page title (will have site name appended)
 * @param {string} opts.description    - Meta description
 * @param {string} [opts.canonical]    - Explicit canonical URL (default: normalized current path)
 * @param {string} [opts.ogImage]      - OG image path
 * @param {string} [opts.ogImageAlt]   - OG image alt text
 * @param {boolean} [opts.noIndex]     - Set true for noindex pages
 * @param {'website'|'article'|'product'} [opts.pageType]
 * @param {string} [opts.publishedTime] - ISO date for articles
 * @param {string} [opts.dateModified]  - ISO date
 * @param {string[]} [opts.keywords]    - Additional keywords
 * @param {string} [opts.locale]        - og:locale override
 * @param {string} [opts.chatbotContext] - Chatbot page context
 * @returns {object} Complete metadata object for BaseLayout
 */
export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  noIndex = false,
  pageType = 'website',
  publishedTime,
  dateModified,
  keywords,
  locale = DEFAULT_LOCALE,
  chatbotContext = 'service',
} = {}) {
  if (!title) throw new Error('[meta.js] buildMetadata: title is required');
  if (!description) throw new Error('[meta.js] buildMetadata: description is required');

  // Enforce max lengths
  const safeTitle = truncate(title, MAX_TITLE_LENGTH);
  const safeDescription = truncate(description, MAX_DESCRIPTION_LENGTH);

  // Warn in dev if title was truncated
  if (title.length > MAX_TITLE_LENGTH) {
    console.warn(`[meta.js] Title truncated (${title.length} chars): "${title}"`);
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    console.warn(`[meta.js] Description truncated (${description.length} chars)`);
  }

  return {
    title: safeTitle,
    description: safeDescription,
    canonical: canonical ? buildCanonical(canonical) : undefined, // undefined = BaseLayout auto-derives from current URL
    ogImage: buildOGImage(ogImage),
    ogImageAlt: ogImageAlt || `${SITE_NAME} - ${safeTitle}`,
    noIndex,
    pageType,
    publishedTime,
    dateModified: dateModified || new Date().toISOString().split('T')[0],
    keywords: Array.isArray(keywords) ? keywords : [],
    locale,
    chatbotContext,
    openGraph: generateOpenGraph(safeTitle, safeDescription, ogImage, canonical ? buildCanonical(canonical) : SITE_ORIGIN),
    twitter: generateTwitterCard(safeTitle, safeDescription, ogImage),
    structuredData: generateStructuredData(pageType, {
      title: safeTitle,
      description: safeDescription,
      url: canonical ? buildCanonical(canonical) : SITE_ORIGIN,
      image: ogImage,
      publishedTime,
      dateModified,
      faqItems
    }),
    organizationData
  };
}

/**
 * Build a service page metadata object with sensible defaults
 * sourced from the services.js data entry.
 * @param {object} service - Full service object from services.js
 * @returns {object}
 */
export function buildServiceMetadata(service) {
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    canonical: `/services/${service.slug}/`,
    keywords: service.keywords,
    chatbotContext: 'service',
  });
}

/**
 * Build a blog post metadata object from a blog data entry.
 * @param {object} blog - Blog object from blogs.js or programmaticBlogEngine
 * @returns {object}
 */
export function buildBlogMetadata(blog) {
  return buildMetadata({
    title: blog.metaTitle || `${blog.title} | ${SITE_NAME}`,
    description: blog.metaDescription || blog.excerpt?.slice(0, 155) || blog.summary?.slice(0, 155),
    canonical: blog.canonical || `/blog/${blog.slug}/`,
    keywords: blog.keywords || [],
    pageType: 'article',
    publishedTime: blog.date,
    chatbotContext: 'blog',
  });
}

/**
 * Generate JSON-LD structured data for different page types
 */
export function generateStructuredData(pageType, data = {}) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: SITE_NAME,
    url: data.url || SITE_ORIGIN,
    description: data.description || organizationData.description
  };

  // Add page-specific structured data
  switch (pageType) {
    case 'LocalBusiness':
      return {
        ...baseStructuredData,
        ...organizationData,
        '@type': 'LocalBusiness',
        'currenciesAccepted': 'INR',
        'paymentAccepted': ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer'],
        'areaServed': 'Kochi, Ernakulam, Aluva, Kakkanad, Thrippunithura',
        'knowsLanguage': ['English', 'Hindi', 'Malayalam', 'Tamil']
      };

    case 'Article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Organization',
          name: SITE_NAME
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: organizationData.logo
        },
        datePublished: data.publishedTime,
        dateModified: data.dateModified,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        }
      };

    case 'Service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          ...organizationData
        },
        areaServed: 'Kochi, Kerala',
        availableChannel: ['Online', 'Phone', 'Email', 'On-site']
      };

    case 'FAQPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqItems || []
      };

    case 'WebPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: data.url,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_ORIGIN
        }
      };

    default:
      return baseStructuredData;
  }
}

/**
 * Generate Open Graph metadata
 */
export function generateOpenGraph(title, description, image, url) {
  return {
    'og:title': title,
    'og:description': description,
    'og:image': image || `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`,
    'og:url': url,
    'og:type': 'website',
    'og:locale': DEFAULT_LOCALE,
    'og:site_name': SITE_NAME,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': title
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(title, description, image) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image || `${SITE_ORIGIN}${DEFAULT_OG_IMAGE}`,
    'twitter:site': '@ewastekochi',
    'twitter:creator': '@ewastekochi'
  };
}

/**
 * Generate robots meta tags
 */
export function generateRobotsMeta(noIndex, follow = true) {
  if (noIndex) {
    return 'noindex, nofollow';
  }
  return follow ? 'index, follow' : 'noindex, follow';
}

/**
 * Metadata presets for different page types
 */
export const metadataPresets = {
  homepage: () => buildMetadata({
    title: 'EWaste Recycling Kochi | Electronic Waste Disposal Services',
    description: 'Professional e-waste recycling and IT asset disposition services in Kochi, Kerala. Free pickup, data destruction, and certified recycling. Call +91-9876543210.',
    canonical: '/',
    pageType: 'LocalBusiness',
    keywords: 'e-waste recycling Kochi, electronic waste disposal, IT asset disposition, data destruction, laptop recycling, battery recycling'
  }),

  service: (serviceName, serviceDescription) => buildMetadata({
    title: `${serviceName} Services in Kochi | EWaste Kochi`,
    description: serviceDescription || `Professional ${serviceName.toLowerCase()} services in Kochi, Kerala. Certified recycling and data destruction.`,
    canonical: `/services/${serviceName.toLowerCase().replace(/\s+/g, '-')}/`,
    pageType: 'Service',
    keywords: `${serviceName.toLowerCase()} Kochi, ${serviceName.toLowerCase()} services, e-waste ${serviceName.toLowerCase()}, electronic waste ${serviceName.toLowerCase()}`
  }),

  location: (locationName, locationDescription) => buildMetadata({
    title: `E-Waste Recycling in ${locationName} | EWaste Kochi`,
    description: locationDescription || `E-waste recycling and pickup services in ${locationName}, Kochi. Free electronic waste disposal and IT asset recycling.`,
    canonical: `/locations/${locationName.toLowerCase().replace(/\s+/g, '-')}/`,
    pageType: 'LocalBusiness',
    keywords: `e-waste ${locationName.toLowerCase()}, recycling ${locationName.toLowerCase()}, electronic waste ${locationName.toLowerCase()}, ${locationName.toLowerCase()} e-waste pickup`
  }),

  blog: (blogTitle, blogDescription, blogSlug, publishDate, modifiedDate) => buildMetadata({
    title: `${blogTitle} | EWaste Kochi Blog`,
    description: blogDescription,
    canonical: `/blog/${blogSlug}/`,
    pageType: 'Article',
    publishedTime: publishDate,
    dateModified: modifiedDate,
    keywords: 'e-waste blog, electronic waste guide, recycling tips, IT disposal, data security'
  }),

  contact: () => buildMetadata({
    title: 'Contact EWaste Kochi | E-Waste Recycling Services',
    description: 'Contact EWaste Kochi for professional e-waste recycling and IT asset disposition services in Kochi, Kerala. Call +91-9876543210 for free pickup.',
    canonical: '/contact/',
    pageType: 'WebPage',
    keywords: 'contact e-waste Kochi, electronic waste contact, recycling services contact, IT disposal contact'
  }),

  about: () => buildMetadata({
    title: 'About EWaste Kochi | Leading E-Waste Recycling Company',
    description: 'Learn about EWaste Kochi, Kerala\'s leading e-waste recycling and IT asset disposition company. Certified, professional, and environmentally responsible.',
    canonical: '/about/',
    pageType: 'Organization',
    keywords: 'about e-waste Kochi, EWaste Kochi company, electronic waste recycling Kerala, IT asset disposition'
  }),

  faq: (faqTitle, faqDescription, faqItems) => buildMetadata({
    title: `${faqTitle} | EWaste Kochi FAQ`,
    description: faqDescription,
    canonical: '/faq/',
    pageType: 'FAQPage',
    faqItems,
    keywords: 'e-waste FAQ, recycling questions, electronic waste guide, IT disposal FAQ'
  })
};

/**
 * Utility functions for metadata validation
 */
export const metadataUtils = {
  truncate,
  buildCanonical,
  normalizePath,
  organizationData,
  MAX_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  SITE_NAME,
  SITE_URL: SITE_ORIGIN,
  DEFAULT_LOCALE,
  generateStructuredData,
  generateOpenGraph,
  generateTwitterCard,
  generateRobotsMeta
};

/**
 * Build a location page metadata object.
 * @param {object} location - Location object from locations.js
 * @returns {object}
 */
export function buildLocationMetadata(location) {
  return buildMetadata({
    title: `${location.heroHeadline} | ${SITE_NAME}`,
    description: `${location.heroSubline} ${location.description}`.slice(0, 155),
    canonical: `/locations/${location.slug}/`,
    chatbotContext: 'location',
  });
}
