import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(), // Icon name or SVG path
    price: z.string().optional(), // Price string for display
    priority: z.number().min(0).max(1).default(0.7),
    canonical: z.string().url().optional(),
    published: z.date(),
    featured: z.boolean().default(false),
    category: z.enum(['e-waste','itad','data-destruction','buyback','battery']).default('e-waste'),
  }),
});

const buyback = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    brand: z.enum(['dell','hp','lenovo','apple','samsung','oneplus']),
    priority: z.number().default(0.6),
    canonical: z.string().url().optional(),
    published: z.date(),
    priceRange: z.string().optional(),
  }),
});

const locations = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    area: z.string(),
    pincode: z.string().optional(),
    priority: z.number().default(0.7),
    canonical: z.string().url().optional(),
    pickupType: z.enum(['free','same-day','48-hour','walk-in']).default('free'),
    coordinates: z.object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    }).optional(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('EWaste Kochi Team'),
    published: z.date(),
    canonical: z.string().url().optional().or(z.literal('')),
    priority: z.number().default(0.6),
    category: z.enum(['compliance','regulation','data-security','sustainability','case-study']).default('compliance'),
    featured: z.boolean().default(false),
    readTime: z.number().optional(),
  }),
});

const testimonials = defineCollection({
  schema: z.object({
    author: z.string(),
    role: z.string(),
    company: z.string(),
    rating: z.number().min(1).max(5).default(5),
    text: z.string(),
    featured: z.boolean().default(false),
    published: z.date().optional(),
  }),
});

const faq = defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(['compliance','pricing','pickup','data-destruction','general']).default('general'),
    priority: z.number().default(0.5),
  }),
});

export const collections = { services, buyback, locations, blog, testimonials, faq };
