// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const SITE = 'https://aurorasalondubai.com';

/** Paths excluded from sitemap (errors, drafts, admin). */
const EXCLUDED_PATHS = [
  '/404/',
  '/404',
];

const EXCLUDED_PREFIXES = ['/test', '/preview', '/admin', '/generator'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);

        if (EXCLUDED_PATHS.includes(pathname)) return false;
        if (pathname.endsWith('/index')) return false;
        if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;

        return true;
      },
    }),
  ],
});