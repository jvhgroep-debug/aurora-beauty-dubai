import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public', 'images');

const images = [
  {
    url: 'https://www.aurorasalon.info/hero-bg.webp',
    dest: 'hero/hero-bg.webp',
  },
  {
    url: 'https://www.aurorasalon.info/glow.jpg',
    dest: 'sections/glow.jpg',
  },
  {
    url: 'https://www.aurorasalon.info/face-cream.jpg',
    dest: 'sections/face-cream.jpg',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776077225106_et8lozkeb.jpg',
    dest: 'services/vip-facial.jpg',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776076838878_okjak6jug.jpeg',
    dest: 'services/lash-lift.jpeg',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776082949476_bhz3d8u40.webp',
    dest: 'services/volume-lash.webp',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776084977634_ufzidza61.jpeg',
    dest: 'services/mega-volume.jpeg',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776078663178_pmg35lc4b.jpg',
    dest: 'services/vip-special.jpg',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776087576875_bdlejfvwg.webp',
    dest: 'services/lm-curl.webp',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776087858491_l8yauz5ra.jpeg',
    dest: 'services/kk-style.jpeg',
  },
  {
    url: 'https://xnrhxbknxvrnhcmaqnlk.supabase.co/storage/v1/object/public/public-images/gallery/gallery_1776079387338_l8wtwcf9y.jpeg',
    dest: 'services/brow-lamination.jpeg',
  },
];

async function downloadImage(url, destPath, label) {
  const dir = path.dirname(destPath);
  fs.mkdirSync(dir, { recursive: true });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  console.log(`✓ ${label}`);
}

for (const dir of ['hero', 'services', 'sections']) {
  fs.mkdirSync(path.join(publicDir, dir), { recursive: true });
}

for (const image of images) {
  const destPath = path.join(publicDir, image.dest);
  try {
    await downloadImage(image.url, destPath, image.dest);
  } catch (error) {
    console.error(`✗ ${image.dest}:`, error.message);
    process.exitCode = 1;
  }
}

console.log(`\nDownloaded ${images.length} images to public/images/`);
