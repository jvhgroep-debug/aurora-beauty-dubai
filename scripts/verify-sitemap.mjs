import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const siteUrl = 'https://aurorasalondubai.com';

const sitemap0 = fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf-8');
const sitemapUrls = [...sitemap0.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') htmlFiles.push(full);
  }
}
walk(distDir);

let canonicalOk = 0;
let canonicalIssues = [];
let aurorasalonInfoInCanonical = 0;
let localhostInCanonical = 0;

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf-8');
  const canonicalMatch = html.match(/rel="canonical"\s+href="([^"]+)"/);
  const expectedPath = rel === 'index.html' ? '/' : `/${path.dirname(rel)}/`;

  if (!canonicalMatch) {
    if (rel !== 'index.html') canonicalIssues.push(`${rel}: missing canonical`);
    continue;
  }

  const canonical = canonicalMatch[1];
  if (canonical.includes('aurorasalon.info')) aurorasalonInfoInCanonical++;
  if (canonical.includes('localhost')) localhostInCanonical++;

  const expected = rel === 'index.html'
    ? `${siteUrl}/beautysalon-azizi-riviera/`
    : `${siteUrl}${expectedPath}`;

  // index.html is redirect page — skip canonical check
  if (rel === 'index.html') continue;

  if (canonical === expected) canonicalOk++;
  else canonicalIssues.push(`${rel}: expected ${expected}, got ${canonical}`);
}

console.log(JSON.stringify({
  sitemapIndex: `${siteUrl}/sitemap-index.xml`,
  sitemap0: `${siteUrl}/sitemap-0.xml`,
  sitemapUrlCount: sitemapUrls.length,
  duplicateUrls: sitemapUrls.length - new Set(sitemapUrls).size,
  excludedFromSitemap: ['/', '/404/', '/test/*', '/preview/*', '/admin/*', '/generator/*'],
  htmlPagesBuilt: htmlFiles.length,
  publicPagesInSitemap: sitemapUrls.length,
  canonicalsValid: canonicalOk,
  canonicalIssues: canonicalIssues.slice(0, 5),
  aurorasalonInfoInCanonical,
  localhostInCanonical,
  robotsTxt: fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf-8').trim(),
}, null, 2));
