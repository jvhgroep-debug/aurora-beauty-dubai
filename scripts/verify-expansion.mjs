import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const baselineExisting = 61;
const expectedServicePages = 120;

const requiredUrls = [
  '/',
  '/beautysalon-azizi-riviera/',
  '/beautysalon-dubai-marina/',
  '/index.html',
  '/beautysalon-dubai-marina/index.html',
  '/beautysalon-azizi-riviera/index.html',
];

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, files);
    else if (entry.name === 'index.html') files.push(full);
  }
  return files;
}

const htmlFiles = walkHtml(distDir);
const beautysalonPages = htmlFiles.filter((f) => f.includes(`${path.sep}beautysalon-`));
const servicePages = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'service-pages.json'), 'utf-8'),
);

const sitemap = fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf-8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const missingRequired = requiredUrls.filter((url) => {
  if (url.endsWith('/')) {
    const file = path.join(distDir, url.slice(1), 'index.html');
    return !fs.existsSync(file);
  }
  return !fs.existsSync(path.join(distDir, url));
});

const missingService = servicePages.filter(
  (p) => !fs.existsSync(path.join(distDir, p.slug, 'index.html')),
);

const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const azHtml = fs.readFileSync(path.join(distDir, 'beautysalon-azizi-riviera', 'index.html'), 'utf-8');

const report = {
  totalHtmlPages: htmlFiles.length,
  beautysalonPageCount: beautysalonPages.length,
  servicePageCount: htmlFiles.length - beautysalonPages.length - 1,
  baselinePreserved: beautysalonPages.length === 60 && fs.existsSync(path.join(distDir, 'index.html')),
  existingPagesNotDecreased: htmlFiles.length >= baselineExisting,
  expectedTotal: baselineExisting + expectedServicePages,
  missingRequired,
  missingServiceCount: missingService.length,
  sitemapUrlCount: sitemapUrls.length,
  homepageUnchanged: homeHtml.includes('Luxury Beauty Salon in Dubai'),
  aziziUnchanged: azHtml.includes('Beauty Salon in Azizi Riviera — Aurora Beauty Lounge'),
  sampleHairSalon: fs.existsSync(path.join(distDir, 'hair-salon-dubai-marina', 'index.html')),
  sampleNailSalon: fs.existsSync(path.join(distDir, 'nail-salon-jbr', 'index.html')),
};

console.log(JSON.stringify(report, null, 2));

const ok =
  report.baselinePreserved &&
  report.existingPagesNotDecreased &&
  report.missingRequired.length === 0 &&
  report.missingServiceCount === 0 &&
  report.homepageUnchanged &&
  report.aziziUnchanged &&
  report.sitemapUrlCount === report.expectedTotal;

process.exit(ok ? 0 : 1);
