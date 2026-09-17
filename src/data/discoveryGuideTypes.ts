export type GuideCategory = "definitions" | "how-to" | "locations" | "business" | "devices";

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
  related: { label: string; path: string }[];
  sources: { title: string; href: string; publisher: string; note?: string }[];
}
