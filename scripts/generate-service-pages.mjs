import fs, { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serviceLocations } from './service-locations.mjs';
import { serviceTypes } from './service-types.mjs';
import { wijken } from './wijken-content.mjs';
import { heroImages, resolveImageSync } from './images.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const dataDir = path.join(rootDir, 'src', 'data');
const BOOKING_URL = 'https://www.aurorasalon.info/booking';
const SALON_ADDRESS = 'Azizi Riviera 40, Shop 10, Meydan, Dubai';

const wijkMap = new Map(wijken.map((w) => [w.wijkSlug, w]));

function generateLocalContent(service, location) {
  const wijk = wijkMap.get(location.wijkSlug);
  const areaHook = wijk
    ? wijk.wijkBeschrijving.split('.')[0] + '.'
    : `${location.naam} is one of Dubai's most sought-after neighbourhoods for premium lifestyle services.`;

  return `${location.shortName} clients searching for a trusted ${service.name.toLowerCase()} choose Aurora Beauty Lounge for expert results and a luxury salon experience. ${areaHook} Our ${service.name.toLowerCase()} specialists at ${SALON_ADDRESS} deliver ${service.focusServices} tailored to your hair type, style goals and schedule — whether you live in ${location.shortName} or visit from nearby Dubai communities.`;
}

function generateIntro(service, location) {
  const wijk = wijkMap.get(location.wijkSlug);
  const localLine = wijk?.intro ?? `Clients from ${location.shortName} visit Aurora for premium beauty services in a welcoming salon atmosphere.`;

  return `Looking for a ${service.name.toLowerCase()} near ${location.shortName}? Aurora Beauty Lounge combines ${service.focusServices} with personalised care at our Azizi Riviera salon in Meydan. ${localLine.replace(/Aurora Beauty Lounge/g, 'Aurora').replace(/beauty salon/gi, service.name.toLowerCase())}`;
}

function generateFaqs(service, location, pageSlug) {
  const { shortName, naam } = location;
  const serviceName = service.name;
  const serviceLower = serviceName.toLowerCase();

  return [
    {
      question: `Where can I find a ${serviceLower} near ${shortName}?`,
      answer: `Aurora Beauty Lounge at ${SALON_ADDRESS} offers professional ${serviceLower} services for clients in ${shortName} and across Dubai. Book online at ${BOOKING_URL} or call +971 503181009.`,
    },
    {
      question: `Does Aurora Beauty Lounge offer ${serviceLower} for ${shortName} residents?`,
      answer: `Yes. Many clients from ${shortName} travel to our Azizi Riviera salon for ${service.focusServices}. Our experienced team delivers consistent, high-quality results for ${naam} residents and visitors.`,
    },
    {
      question: `How much does a ${serviceLower} cost at Aurora in Dubai?`,
      answer: `Pricing depends on your chosen treatment and hair or service requirements. ${serviceName} services at Aurora Beauty Lounge start from competitive Dubai rates. Contact us or book online at ${BOOKING_URL} for current pricing.`,
    },
    {
      question: `How do I book a ${serviceLower} appointment from ${shortName}?`,
      answer: `Booking from ${shortName} is easy — visit ${BOOKING_URL}, select your ${serviceLower} treatment, and choose your preferred time. Our salon in Azizi Riviera, Meydan is accessible from ${shortName} by car.`,
    },
    {
      question: `Why choose Aurora for ${serviceLower} near ${shortName}?`,
      answer: `Aurora Beauty Lounge is a luxury Dubai salon known for expert technicians, premium products and attentive service. ${shortName} clients choose us for ${service.focusServices} in a refined, relaxing environment.`,
    },
    {
      question: `What are Aurora's opening hours for ${shortName} clients?`,
      answer: `Aurora Beauty Lounge is open Monday–Saturday 8:00 AM–10:00 PM and Sunday 10:00 AM–5:00 PM. ${shortName} residents can ${service.bookingIntent} at a time that suits their schedule.`,
    },
  ];
}

function generateRelatedLinks(service, location, allPages) {
  const sameArea = allPages.filter(
    (p) => p.locationPageSlug === location.pageSlug && p.serviceKey !== service.key,
  );
  const sameService = allPages.filter(
    (p) => p.serviceKey === service.key && p.locationPageSlug !== location.pageSlug,
  );

  return {
    beautysalonSlug: `beautysalon-${location.wijkSlug}`,
    sameAreaServices: sameArea.slice(0, 4).map((p) => ({
      label: p.h1,
      slug: p.slug,
    })),
    sameServiceOtherAreas: sameService.slice(0, 3).map((p) => ({
      label: `${service.name} in ${p.locationShortName}`,
      slug: p.slug,
    })),
  };
}

const pages = [];
let imageIndex = 0;

for (const service of serviceTypes) {
  for (const location of serviceLocations) {
    const slug = `${service.routePrefix}-${location.pageSlug}`;
    const h1 = `${service.name} in ${location.shortName}`;
    const seoTitle = `${service.name} in ${location.shortName} | Aurora Beauty Lounge`;
    const metaDescription = `Looking for a ${service.name.toLowerCase()} in ${location.shortName}? Aurora Beauty Lounge in Azizi Riviera offers ${service.focusServices}. Book your appointment today.`;

    const heroDef = heroImages[imageIndex % heroImages.length];
    imageIndex++;
    const { src: heroImage, alt: heroImageAlt } = resolveImageSync(
      { ...heroDef, alt: `${service.name} in ${location.shortName} — Aurora Beauty Lounge Dubai` },
      publicDir,
      fs,
      path,
    );

    pages.push({
      serviceKey: service.key,
      serviceName: service.name,
      serviceType: service.serviceType,
      serviceTagline: service.tagline,
      locationPageSlug: location.pageSlug,
      locationNaam: location.naam,
      locationShortName: location.shortName,
      wijkSlug: location.wijkSlug,
      slug,
      h1,
      seoTitle,
      metaDescription,
      heroTagline: service.tagline,
      sectionTitle: `${service.name.toUpperCase()} SERVICES FOR ${location.shortName.toUpperCase()}`,
      localContent: generateLocalContent(service, location),
      intro: generateIntro(service, location),
      faqs: generateFaqs(service, location, slug),
      heroImage,
      heroImageAlt,
    });
  }
}

for (const page of pages) {
  const service = serviceTypes.find((s) => s.key === page.serviceKey);
  const location = serviceLocations.find((l) => l.pageSlug === page.locationPageSlug);
  page.relatedLinks = generateRelatedLinks(service, location, pages);
}

writeFileSync(path.join(dataDir, 'service-pages.json'), JSON.stringify(pages, null, 2), 'utf-8');
console.log(`Generated ${pages.length} service pages → src/data/service-pages.json`);
