import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ewastekochi.com',
  output: 'hybrid',
  adapter: vercel({
    includeFiles: ['./src/data/content.db'],
    maxDuration: 10,
  }),
  trailingSlash: 'always',
  integrations: [mdx(), tailwind()],
});
