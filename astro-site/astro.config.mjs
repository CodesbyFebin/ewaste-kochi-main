import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ewastekochi.com',
  output: 'hybrid',
  adapter: vercel({
    maxDuration: 10,
  }),
  trailingSlash: 'always',
  integrations: [mdx(), tailwind()],
});
