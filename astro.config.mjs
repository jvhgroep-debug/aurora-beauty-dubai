// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://aurorasalon.ae',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) => page !== 'https://aurorasalon.ae/' && !page.endsWith('/index'),
    }),
  ],
});