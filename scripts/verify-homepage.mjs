import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

function extract(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1] : null;
}

const home = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const az = fs.readFileSync(path.join(distDir, 'beautysalon-azizi-riviera', 'index.html'), 'utf-8');
const sitemap = fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf-8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const report = {
  homepage: {
    title: extract(home, /<title>([^<]+)<\/title>/),
    canonical: extract(home, /rel="canonical" href="([^"]+)"/),
    robots: extract(home, /name="robots" content="([^"]+)"/),
    h1: extract(home, /<h1[^>]*>([^<]+)<\/h1>/),
    schemaOrgId: extract(home, /"url":"(https:\/\/aurorasalondubai\.com\/)"[^}]*"@type":"BeautySalon"/) || extract(home, /"@type":"BeautySalon"[^}]*"url":"([^"]+)"/),
    faqUrl: extract(home, /"@type":"FAQPage"[^}]*"url":"([^"]+)"/),
    noindex: /noindex/i.test(home),
  },
  aziziRiviera: {
    title: extract(az, /<title>([^<]+)<\/title>/),
    canonical: extract(az, /rel="canonical" href="([^"]+)"/),
    h1: extract(az, /<h1[^>]*>([^<]+)<\/h1>/),
    schemaLocalBusiness: extract(az, /"@id":"(https:\/\/[^"]+#localbusiness)"/),
    unchanged: az.includes('Beauty Salon in Azizi Riviera, Meydan'),
  },
  uniqueMetadata: extract(home, /<title>([^<]+)<\/title>/) !== extract(az, /<title>([^<]+)<\/title>/),
  sitemapUrlCount: urls.length,
  sitemapHasHome: urls.includes('https://aurorasalondubai.com/'),
  sitemapHasAzizi: urls.includes('https://aurorasalondubai.com/beautysalon-azizi-riviera/'),
};

console.log(JSON.stringify(report, null, 2));
process.exit(
  report.homepage.robots === 'index,follow'
  && report.homepage.canonical === 'https://aurorasalondubai.com/'
  && !report.homepage.noindex
  && report.uniqueMetadata
  && report.aziziRiviera.canonical === 'https://aurorasalondubai.com/beautysalon-azizi-riviera/'
  && report.sitemapUrlCount === 61
  ? 0 : 1
);
