import type { ServicePage } from '../types';
import site from '/src/data/site.json';

const SITE_URL = site.siteUrl;

export function buildServicePageSchema(page: ServicePage) {
  const pageUrl = `${SITE_URL}/${page.slug}/`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.seoTitle,
      description: page.metaDescription,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: {
        '@type': 'Place',
        name: page.locationNaam,
        containedInPlace: { '@type': 'City', name: 'Dubai' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${page.serviceName} in ${page.locationShortName}`,
      description: page.metaDescription,
      serviceType: page.serviceType,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: {
        '@type': 'Place',
        name: page.locationNaam,
        containedInPlace: { '@type': 'City', name: 'Dubai' },
      },
      url: pageUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Aurora Beauty Lounge',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.h1,
          item: pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      url: pageUrl,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];
}
