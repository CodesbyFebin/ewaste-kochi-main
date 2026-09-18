export type GuideCategory = "definitions" | "how-to" | "locations" | "business" | "devices";

export type IntentBucket = "commercial" | "local" | "informational" | "transactional" | "compliance";

export type SchemaType = "FAQPage" | "HowTo" | "Article" | "WebPage";

export interface CtaBlock {
  headline: string;
  text: string;
  url: string;
  label: string;
}

export interface DiscoveryGuide {
  slug: string;
  category: GuideCategory;
  title: string;
  description: string;
  answer: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  steps?: { name: string; text: string }[];
  tools?: string[];
  timeline?: string;
  faq: { q: string; a: string }[];
  // UGC-style follow-up questions: scenario-framed Q&A written from the kinds of
  // situations readers describe when arranging collections. Not quotes from
  // identifiable users and not reviews or testimonials.
  readerQuestions: { role: string; q: string; a: string }[];
  related: { label: string; path: string }[];
  sources: { title: string; href: string; publisher: string; note?: string }[];
  // Data contract fields for Matrix 2+ guides
  module?: string;
  bucket?: IntentBucket;
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeyword?: string;
  internalLinks?: string[];
  cta?: CtaBlock;
  lastUpdated?: string;
}
