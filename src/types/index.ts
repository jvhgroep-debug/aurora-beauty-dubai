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
