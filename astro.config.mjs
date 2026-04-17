import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://ewastekochi.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        // Pillar pages get highest priority
        'https://ewastekochi.com/services/e-waste-recycling-kochi',
        'https://ewastekochi.com/services/itad-kochi',
        'https://ewastekochi.com/services/data-destruction-kochi',
        'https://ewastekochi.com/services/hard-drive-shredding-kochi',
        'https://ewastekochi.com/services/laptop-buyback-kochi',
        'https://ewastekochi.com/services/battery-recycling-kochi',
        'https://ewastekochi.com/services/server-recycling-kochi',
        'https://ewastekochi.com/services/mobile-recycling-kochi',
        'https://ewastekochi.com/sell-electronics-kochi/',
        'https://ewastekochi.com/cashify-vs-ewastekochi/',
        'https://ewastekochi.com/marketplace/',
        'https://ewastekochi.com/services/hard-drive-destruction-kochi/',
        'https://ewastekochi.com/services/it-asset-inventory-audit/',
        // New high-value service pages
        'https://ewastekochi.com/services/hard-drive-degaussing-kochi',
        'https://ewastekochi.com/services/computer-recycling-near-me',
        'https://ewastekochi.com/services/electronics-recycling-near-me',
        'https://ewastekochi.com/services/business-it-decommissioning',
        // Comprehensive pillar guides
        'https://ewastekochi.com/blog/complete-guide-ewaste-recycling-kochi/',
        'https://ewastekochi.com/blog/complete-guide-battery-recycling-kochi/',
        'https://ewastekochi.com/blog/complete-guide-hard-drive-destruction-kochi/',
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  build: {
    format: 'directory',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': [],
          },
        },
      },
    },
  },
});
