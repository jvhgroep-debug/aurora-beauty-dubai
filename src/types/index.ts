export interface Locatie {
  wijkSlug: string;
  slug: string;
  naam: string;
  isHomeBase: boolean;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  wijkBeschrijving: string;
  intro: string;
  heroTagline: string;
  sectionTitle: string;
  nearbySlugs: string[];
  heroImage: string;
  heroImageAlt: string;
  faqs: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  price: number;
  currency: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageLocal?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
}

export interface SiteConfig {
  siteUrl: string;
  name: string;
  tagline: string;
  phone: string;
  email: string;
  homeBaseSlug: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  hours: {
    weekdays: string;
    sunday: string;
  };
  social: Record<string, string>;
  bookingUrl: string;
  socialImage: string;
}

export interface NearbyLocatie {
  wijkSlug: string;
  naam: string;
  slug: string;
}

export interface ServicePageLink {
  label: string;
  slug: string;
}

export interface ServicePage {
  serviceKey: string;
  serviceName: string;
  serviceType: string;
  serviceTagline: string;
  locationPageSlug: string;
  locationNaam: string;
  locationShortName: string;
  wijkSlug: string;
  slug: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  heroTagline: string;
  sectionTitle: string;
  localContent: string;
  intro: string;
  faqs: FaqItem[];
  heroImage: string;
  heroImageAlt: string;
  relatedLinks: {
    beautysalonSlug: string;
    sameAreaServices: ServicePageLink[];
    sameServiceOtherAreas: ServicePageLink[];
  };
}
