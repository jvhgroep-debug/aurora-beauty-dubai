/**
 * Official Aurora Beauty Lounge images from aurorasalon.info
 * - `url`: direct source URL (fallback)
 * - `local`: path under public/ — preferred when file exists
 */

const OFFICIAL = 'https://www.aurorasalon.info';
const GALLERY = 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery';

export const sectionImages = {
  defaultHero: {
    url: `${OFFICIAL}/hero-bg.webp`,
    local: '/images/hero/hero-bg.webp',
    alt: 'Beautiful woman with skincare cream — Aurora Beauty Lounge Dubai',
  },
  ctaBanner: {
    url: `${OFFICIAL}/glow.jpg`,
    local: '/images/sections/glow.jpg',
    alt: 'Luxury beauty treatment at Aurora Beauty Lounge',
  },
  ogImage: {
    url: `${OFFICIAL}/hero-bg.webp`,
    local: '/images/hero/hero-bg.webp',
    alt: 'Aurora Beauty Lounge — luxury beauty salon in Dubai',
  },
};

/** Hero images — official salon photography */
export const heroImages = [
  {
    url: `${OFFICIAL}/hero-bg.webp`,
    local: '/images/hero/hero-bg.webp',
    alt: 'Beautiful woman with skincare cream — Aurora Beauty Lounge',
  },
  {
    url: `${OFFICIAL}/glow.jpg`,
    local: '/images/sections/glow.jpg',
    alt: 'Beauty treatment at Aurora Beauty Lounge Dubai',
  },
  {
    url: `${OFFICIAL}/face-cream.jpg`,
    local: '/images/sections/face-cream.jpg',
    alt: 'Facial skincare treatment — Aurora Beauty Lounge',
  },
];

/** Service card images — matched to aurorasalon.info gallery */
export const serviceImages = {
  'vip-facial': {
    url: `${GALLERY}/gallery_1776077225106_et8lozkeb.jpg`,
    local: '/images/services/vip-facial.jpg',
    alt: 'VIP Facial — Aurora Beauty Lounge',
  },
  'lash-lift': {
    url: `${GALLERY}/gallery_1776076838878_okjak6jug.jpeg`,
    local: '/images/services/lash-lift.jpeg',
    alt: 'Extension - Full Set Classic — Aurora Beauty Lounge',
  },
  'volume-lash': {
    url: `${GALLERY}/gallery_1776082949476_bhz3d8u40.webp`,
    local: '/images/services/volume-lash.webp',
    alt: 'Volume Lash Infill Extensions — Aurora Beauty Lounge',
  },
  'mega-volume': {
    url: `${GALLERY}/gallery_1776084977634_ufzidza61.jpeg`,
    local: '/images/services/mega-volume.jpeg',
    alt: 'Mega Volume Extension — Aurora Beauty Lounge',
  },
  'vip-special': {
    url: `${GALLERY}/gallery_1776078663178_pmg35lc4b.jpg`,
    local: '/images/services/vip-special.jpg',
    alt: 'VIP Special — Manicure, Pedicure & Lashes',
  },
  'lm-curl': {
    url: `${GALLERY}/gallery_1776087576875_bdlejfvwg.webp`,
    local: '/images/services/lm-curl.webp',
    alt: 'L/M Curl Extensions — Aurora Beauty Lounge',
  },
  'kk-style': {
    url: `${GALLERY}/gallery_1776087858491_l8yauz5ra.jpeg`,
    local: '/images/services/kk-style.jpeg',
    alt: 'Kim Kardashian (K.K) Style Lash Extensions',
  },
  'brow-lamination': {
    url: `${GALLERY}/gallery_1776079387338_l8wtwcf9y.jpeg`,
    local: '/images/services/brow-lamination.jpeg',
    alt: 'Eyebrow Lamination — Aurora Beauty Lounge',
  },
};

/** Base service data — images merged at generate time */
export const serviceDefinitions = [
  {
    id: 'vip-facial',
    price: 450,
    currency: 'AED',
    tag: 'Glow & Radiance',
    title: 'VIP Facial',
    description:
      'Complete luxury facial including deep cleansing, exfoliation, extraction, mask and relaxing facial massage for glowing skin.',
  },
  {
    id: 'lash-lift',
    price: 185,
    currency: 'AED',
    tag: 'Effortless Beauty',
    title: 'Extension - Full Set Classic',
    description:
      'A full set of classic lash extensions, with individual extensions applied to natural lashes for added length and definition. This treatment is different from a lash lift.',
  },
  {
    id: 'volume-lash',
    price: 220,
    currency: 'AED',
    tag: 'Dramatic Glamour',
    title: 'Volume Lash Infill Extensions',
    description:
      'Refresh an existing set of volume lash extensions by filling gaps and restoring fullness. Contact the salon before booking to check whether an infill or a new full set is suitable.',
  },
  {
    id: 'mega-volume',
    price: 285,
    currency: 'AED',
    tag: 'Ultimate Glam',
    title: 'Mega Volume Extension',
    description:
      'Indulge in the ultimate lash transformation with Mega Volume Extensions. Ultra-fine lashes create intense volume and a rich, dark lash line.',
  },
  {
    id: 'vip-special',
    price: 550,
    currency: 'AED',
    tag: 'VIP Special',
    title: 'VIP Special',
    description:
      'Manicure + Pedicure + Lashes — all services can be done at the same time for the ultimate pampering experience.',
  },
  {
    id: 'lm-curl',
    price: 315,
    currency: 'AED',
    tag: 'L/M Curl',
    title: 'L/M Curl Extensions',
    description:
      'Achieve a beautifully lifted and defined look with L and M Curl Extensions — perfect for enhancing eye shape and correcting lash direction.',
  },
  {
    id: 'kk-style',
    price: 330,
    currency: 'AED',
    tag: 'Kim Kardashian Style',
    title: 'Kim Kardashian (K.K) Style',
    description:
      'High-impact, textured lash design featuring dense volume and signature wispy spikes for a dramatic yet refined finish.',
  },
  {
    id: 'brow-lamination',
    price: 200,
    currency: 'AED',
    tag: 'Fluffy & Full',
    title: 'Eyebrow Lamination',
    description:
      'Achieve the coveted brushed-up brow look with our brow lamination treatment. Tames unruly brows and creates fuller-looking arches.',
  },
];

/**
 * Resolve image src: prefer local file in public/ when it exists.
 */
export function resolveImageSync(imageDef, publicDir, fs, path) {
  if (imageDef.local) {
    const localFile = path.join(publicDir, imageDef.local.replace(/^\//, ''));
    if (fs.existsSync(localFile)) {
      return { src: imageDef.local, alt: imageDef.alt };
    }
  }
  return { src: imageDef.url, alt: imageDef.alt };
}
