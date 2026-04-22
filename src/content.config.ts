import { z, defineCollection } from 'astro:content';

// Define blog collection schema
const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  publishDate: z.string().optional(),
  category: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  service: z.string().optional(),
  location: z.string().optional(),
  priority: z.number().optional(),
  published: z.union([z.string(), z.date()]).optional(),
});

// Define other collections
const caseStudySchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.string().optional(),
  industry: z.string().optional(),
  client: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
});

const faqSchema = z.object({
  question: z.string().optional(),
  answer: z.string().optional(),
  category: z.string().optional(),
});

const testimonialSchema = z.object({
  name: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  content: z.string().optional(),
  rating: z.number().optional(),
  date: z.string().optional(),
});

// Define collections
export const collections = {
  blog: {
    schema: blogSchema,
  },
  caseStudies: {
    schema: caseStudySchema,
  },
  faq: {
    schema: faqSchema,
  },
  testimonials: {
    schema: testimonialSchema,
  },
};
