import fs, { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wijken } from './wijken-content.mjs';
import { generateFaqs } from './faq-generator.mjs';
import {
  heroImages,
  sectionImages,
  serviceImages,
  serviceDefinitions,
  resolveImageSync,
} from './images.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const dataDir = path.join(rootDir, 'src', 'data');

const HOME_BASE = 'azizi-riviera';

// ── Generate services.json with resolved image URLs ──
const services = serviceDefinitions.map((service) => {
  const imgDef = serviceImages[service.id];
  if (!imgDef) {
    console.warn(`⚠ No image defined for service: ${service.id}`);
    return service;
  }
  const { src, alt } = resolveImageSync(imgDef, publicDir, fs, path);
  return {
    ...service,
    image: src,
    imageAlt: alt,
    imageLocal: imgDef.local,
  };
});

writeFileSync(path.join(dataDir, 'services.json'), JSON.stringify(services, null, 2), 'utf-8');
console.log(`Generated ${services.length} services with images → src/data/services.json`);

// ── Generate locaties.json with hero images ──
const locaties = wijken.map((wijk, index) => {
  const isHomeBase = wijk.isHomeBase ?? wijk.wijkSlug === HOME_BASE;
  const h1 = isHomeBase
    ? 'Your Beauty Salon in Azizi Riviera, Meydan'
    : `Beauty Salon in ${wijk.naam}`;

  const seoTitle = isHomeBase
    ? 'Azizi Riviera Beauty Salon, Meydan | Aurora by Tolou'
    : `Beauty Salon in ${wijk.naam} | Aurora Beauty Lounge`;

  const metaDescription = isHomeBase
    ? 'Visit Aurora by Tolou at Azizi Riviera 40, Shop 10, Meydan. View facial, lash and brow treatments with prices, find directions and book your salon appointment.'
    : `Looking for a beauty salon in ${wijk.naam}? Aurora Beauty Lounge at Azizi Riviera, Meydan serves ${wijk.naam} with luxury facials, lashes, brows & spa treatments. Book now.`;

  const nearbySlugs = wijk.nearby
    .filter((slug) => slug !== wijk.wijkSlug)
    .slice(0, 5);

  const heroDef = isHomeBase
    ? sectionImages.defaultHero
    : heroImages[index % heroImages.length];
  const { src: heroImage, alt: heroImageAlt } = resolveImageSync(heroDef, publicDir, fs, path);
  const faqs = generateFaqs(wijk, isHomeBase);

  return {
    wijkSlug: wijk.wijkSlug,
    slug: `beautysalon-${wijk.wijkSlug}`,
    naam: wijk.naam,
    isHomeBase,
    h1,
    seoTitle,
    metaDescription,
    wijkBeschrijving: wijk.wijkBeschrijving,
    intro: wijk.intro,
    heroTagline: isHomeBase ? 'Your Home Salon in Meydan' : 'Glamour Redefined',
    sectionTitle: isHomeBase
      ? 'YOUR NEIGHBOURHOOD BEAUTY DESTINATION'
      : `PREMIUM BEAUTY SERVICES FOR ${wijk.naam.toUpperCase()}`,
    nearbySlugs,
    heroImage,
    heroImageAlt,
    faqs,
  };
});

writeFileSync(path.join(dataDir, 'locaties.json'), JSON.stringify(locaties, null, 2), 'utf-8');
console.log(`Generated ${locaties.length} locaties with hero images → src/data/locaties.json`);

// ── Generate images.json (section-level images for components) ──
const imagesManifest = {
  sections: {
    ctaBanner: resolveImageSync(sectionImages.ctaBanner, publicDir, fs, path),
    ogImage: resolveImageSync(sectionImages.ogImage, publicDir, fs, path),
  },
};

writeFileSync(path.join(dataDir, 'images.json'), JSON.stringify(imagesManifest, null, 2), 'utf-8');
console.log(`Generated images manifest → src/data/images.json`);

// ── Ensure public/images folder structure exists ──
const imageDirs = [
  'public/images',
  'public/images/hero',
  'public/images/services',
  'public/images/sections',
];
for (const dir of imageDirs) {
  const fullPath = path.join(rootDir, dir);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
  }
}
