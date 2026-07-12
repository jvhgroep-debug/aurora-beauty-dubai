import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const locaties = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'locaties.json'), 'utf-8'),
);

const expectedOgImage = 'https://aurorasalon.ae/images/hero/hero-bg.webp';

let withFaq = 0;
let withFaqSchema = 0;
let withOgImage = 0;
let withTwitterImage = 0;
let minFaqCount = Infinity;
const issues = [];

for (const locatie of locaties) {
  const htmlPath = path.join(distDir, locatie.slug, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    issues.push(`Missing page: ${locatie.slug}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');

  const hasFaqSection = html.includes('id="faq"') && html.includes('Questions & Answers');
  const faqDetails = (html.match(/<details class="group border/g) ?? []).length;
  const hasFaqSchema = html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"');
  const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
  const twitterMatch = html.match(/name="twitter:image"\s+content="([^"]+)"/);

  if (hasFaqSection && faqDetails >= 5) withFaq++;
  else issues.push(`${locatie.slug}: FAQ section missing or <5 items (${faqDetails})`);

  if (hasFaqSchema) withFaqSchema++;
  else issues.push(`${locatie.slug}: FAQPage schema missing`);

  if (ogMatch?.[1] === expectedOgImage) withOgImage++;
  else issues.push(`${locatie.slug}: og:image wrong or missing (${ogMatch?.[1] ?? 'none'})`);

  if (twitterMatch?.[1] === expectedOgImage) withTwitterImage++;
  else issues.push(`${locatie.slug}: twitter:image wrong or missing`);

  if (faqDetails < minFaqCount) minFaqCount = faqDetails;

  // Preserve SEO fields
  if (!html.includes(`<title>${locatie.seoTitle}</title>`)) {
    issues.push(`${locatie.slug}: seoTitle changed`);
  }
  if (!html.includes(`content="${locatie.metaDescription}"`)) {
    issues.push(`${locatie.slug}: metaDescription changed`);
  }
  if (!html.includes(`href="https://aurorasalon.ae/${locatie.slug}/"`)) {
    issues.push(`${locatie.slug}: canonical changed`);
  }
  if (!html.includes(locatie.h1)) {
    issues.push(`${locatie.slug}: H1 changed`);
  }
}

console.log(JSON.stringify({
  totalPages: locaties.length,
  withFaq,
  withFaqSchema,
  withOgImage,
  withTwitterImage,
  minFaqItemsPerPage: minFaqCount,
  issueCount: issues.length,
  issues: issues.slice(0, 10),
}, null, 2));

process.exit(issues.length > 0 ? 1 : 0);
