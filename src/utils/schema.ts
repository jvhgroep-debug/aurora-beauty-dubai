import type { Locatie } from '../types';
import site from '/src/data/site.json';

const SITE_URL = site.siteUrl;

export function buildLocalBusinessSchema(locatie: Locatie) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': `${SITE_URL}/beautysalon-azizi-riviera/#localbusiness`,
    name: site.name,
    description: locatie.metaDescription,
    url: `${SITE_URL}/beautysalon-azizi-riviera/`,
    telephone: site.phone,
    email: site.email,
    image: `${SITE_URL}${site.socialImage}`,
    priceRange: 'AED 150 - AED 550',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Azizi Riviera 40, Shop 10',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1565,
      longitude: 55.3028,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    sameAs: Object.values(site.social),
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Beauty Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VIP Facial' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lash Extensions' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eyebrow Lamination' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manicure & Pedicure' } },
      ],
    },
  };
}

export function buildAreaPageSchema(locatie: Locatie) {
  const pageUrl = `${SITE_URL}/beautysalon-${locatie.wijkSlug}/`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: locatie.seoTitle,
      description: locatie.metaDescription,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: {
        '@type': 'Place',
        name: locatie.naam,
        containedInPlace: { '@type': 'City', name: 'Dubai' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Beauty Salon Services in ${locatie.naam}`,
      description: locatie.metaDescription,
      provider: {
        '@id': `${SITE_URL}/beautysalon-azizi-riviera/#localbusiness`,
      },
      areaServed: {
        '@type': 'Place',
        name: locatie.naam,
        containedInPlace: { '@type': 'City', name: 'Dubai' },
      },
      serviceType: 'Beauty Salon',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Aurora Beauty Lounge',
          item: `${SITE_URL}/beautysalon-azizi-riviera/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `Beauty Salon in ${locatie.naam}`,
          item: pageUrl,
        },
      ],
    },
  ];
}

export function buildFaqPageSchema(locatie: Locatie) {
  const pageUrl = `${SITE_URL}/${locatie.slug}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: locatie.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildHomepageSchema() {
  const homepageUrl = `${SITE_URL}/`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${homepageUrl}#webpage`,
      url: homepageUrl,
      name: 'Luxury Beauty Salon Dubai | Aurora Beauty Lounge',
      description:
        'Aurora Beauty Lounge is a luxury beauty salon in Dubai offering hair, nails, facials, massage, brows and lashes. Visit us at Azizi Riviera, Meydan.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: {
        '@type': 'BeautySalon',
        '@id': `${homepageUrl}#organization`,
        name: site.name,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      publisher: { '@id': `${homepageUrl}#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      '@id': `${homepageUrl}#organization`,
      name: site.name,
      description:
        'Luxury beauty salon in Dubai offering hair, nails, facials, massage, brows and lash extensions at Azizi Riviera, Meydan.',
      url: homepageUrl,
      telephone: site.phone,
      email: site.email,
      image: `${SITE_URL}${site.socialImage}`,
      priceRange: 'AED 150 - AED 550',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Azizi Riviera 40, Shop 10',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.1565,
        longitude: 55.3028,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '22:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '10:00',
          closes: '17:00',
        },
      ],
      sameAs: Object.values(site.social),
      areaServed: {
        '@type': 'City',
        name: 'Dubai',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Beauty Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hair Styling' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manicure & Pedicure' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VIP Facial' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spa Massage' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Eyebrow Lamination' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lash Extensions' } },
        ],
      },
    },
  ];
}

export function buildHomepageFaqSchema(faqs: { question: string; answer: string }[]) {
  const homepageUrl = `${SITE_URL}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${homepageUrl}#faq`,
    url: homepageUrl,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildSchema(locatie: Locatie) {
  const faqSchema = buildFaqPageSchema(locatie);

  if (locatie.isHomeBase) {
    return [
      buildLocalBusinessSchema(locatie),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        publisher: { '@id': `${SITE_URL}/beautysalon-azizi-riviera/#localbusiness` },
      },
      faqSchema,
    ];
  }
  return [...buildAreaPageSchema(locatie), faqSchema];
}
