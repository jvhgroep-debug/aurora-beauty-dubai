# Aurora Beauty Lounge — pSEO Site

Programmatic SEO website for **aurorasalon.ae**, targeting 60 Dubai neighborhoods.

## Architecture

| Type | Slug | Example |
|------|------|---------|
| **Home Base** | `/beautysalon-azizi-riviera/` | Full LocalBusiness JSON-LD |
| **Area pages** | `/beautysalon-[wijk]/` | Service + Breadcrumb schema |

## Project Structure

```
src/data/
  locaties.json          # 60 wijken (generated)
  services.json
  testimonials.json
  images.json            # Section images (generated)
  site.json

scripts/
  wijken-content.mjs     # Unique content per wijk (source of truth)
  generate-locaties.mjs  # Builds locaties.json

src/
  pages/
    index.astro                    → redirects to home base
    beautysalon-[wijk].astro       → pSEO template
  components/
    Hero.astro, WijkIntro.astro, ServiceGrid.astro
    Testimonials.astro, NearbyAreas.astro, Footer.astro
  utils/schema.ts                  # LocalBusiness + area schemas
```

## Commands

```bash
npm install
node scripts/generate-locaties.mjs   # Regenerate content
npm run dev                          # http://localhost:4321
npm run build                        # 60 pages + sitemap
```

## SEO Features

- Unique H1, title & meta description per page with "Beauty Salon" + wijknaam
- Full LocalBusiness schema on Azizi Riviera home base
- Service + BreadcrumbList schema on area pages
- Nearby Areas internal linking (3–5 links per page)
- All pages link to `/beautysalon-azizi-riviera/`
- Auto-generated `sitemap-index.xml` (60 pages)

## Note on Meydan

The physical salon is in **Azizi Riviera, Meydan**. The home base page covers Meydan; a separate `/beautysalon-meydan/` page was omitted to avoid duplicate content. Meydan is referenced throughout Azizi Riviera content.
