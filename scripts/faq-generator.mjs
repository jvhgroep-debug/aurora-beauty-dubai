const BOOKING_URL = 'https://www.aurorasalon.info/booking';
const SALON_ADDRESS = 'Azizi Riviera 40, Shop 10, Meydan, Dubai, UAE';
const SALON_NAME = 'Aurora Beauty Lounge';

/**
 * Generate at least 5 locally relevant FAQ items per wijk.
 * @param {{ naam: string, wijkSlug: string, wijkBeschrijving?: string }} wijk
 * @param {boolean} isHomeBase
 */
export function generateFaqs(wijk, isHomeBase) {
  const { naam } = wijk;

  if (isHomeBase) {
    return [
      {
        question: 'Where is Aurora Beauty Lounge located in Azizi Riviera?',
        answer: `Aurora Beauty Lounge is located at ${SALON_ADDRESS}. Our salon is in Shop 10, Building 40, within the Azizi Riviera community in Meydan — a convenient beauty destination for residents across Dubai.`,
      },
      {
        question: 'What beauty services does Aurora Beauty Lounge offer?',
        answer:
          'We offer VIP facials, classic and volume lash extensions, mega volume lashes, eyebrow lamination, manicure and pedicure packages, keratin treatments, bridal beauty packages, and luxury spa wellness services. All treatments use premium products for lasting results.',
      },
      {
        question: 'How do I book an appointment at Aurora Beauty Lounge?',
        answer: `You can book online anytime at ${BOOKING_URL}. Choose your preferred treatment, select an available time slot, and confirm your appointment in minutes. You can also call us at +971 503181009 or message us on WhatsApp.`,
      },
      {
        question: 'What are the opening hours of Aurora Beauty Lounge?',
        answer:
          'Aurora Beauty Lounge is open Monday to Saturday from 8:00 AM to 10:00 PM, and Sunday from 10:00 AM to 5:00 PM. We recommend booking in advance to secure your preferred time slot.',
      },
      {
        question: 'Does Aurora Beauty Lounge serve clients from other Dubai neighbourhoods?',
        answer: `Yes. While our home salon is in Azizi Riviera, Meydan, we proudly welcome clients from all across Dubai — including Dubai Marina, Downtown, JBR, Mirdif, and dozens of other neighbourhoods. Many clients visit us for our expert lash artistry and luxury facials.`,
      },
      {
        question: 'Is parking available near Aurora Beauty Lounge in Azizi Riviera?',
        answer:
          'Contact the salon before your visit for current parking and arrival advice. Use Azizi Riviera 40, Shop 10, Meydan, Dubai as your destination; parking availability and restrictions may vary.',
      },
    ];
  }

  return [
    {
      question: `Where can I find a beauty salon near ${naam}?`,
      answer: `${SALON_NAME} at ${SALON_ADDRESS} is a trusted beauty salon serving clients from ${naam} and surrounding areas. We offer luxury facials, lash extensions, brow treatments, and spa services in a welcoming Meydan location.`,
    },
    {
      question: `Does Aurora Beauty Lounge serve clients in ${naam}?`,
      answer: `Absolutely. Many of our clients travel from ${naam} to our Azizi Riviera salon for premium beauty treatments. ${naam} residents choose Aurora for expert lash extensions, VIP facials, and personalised beauty services they can rely on.`,
    },
    {
      question: `What beauty treatments are popular with ${naam} residents?`,
      answer: `Clients visiting us from ${naam} frequently book VIP facials, volume lash extensions, eyebrow lamination, and our VIP Special package combining manicure, pedicure, and lashes. We tailor every treatment to your skin type, lifestyle, and beauty goals.`,
    },
    {
      question: `How do I book a beauty appointment from ${naam}?`,
      answer: `Booking from ${naam} is simple — visit ${BOOKING_URL} to choose your treatment and preferred time. You can also call +971 503181009. Our team will confirm your appointment and welcome you at our Azizi Riviera salon.`,
    },
    {
      question: `How do I get to Aurora Beauty Lounge from ${naam}?`,
      answer: `From ${naam}, drive to Azizi Riviera in Meydan via the main Dubai road networks. Most clients from ${naam} reach our salon within a comfortable driving time. We are located at Shop 10, Azizi Riviera 40 — use "Aurora Beauty Lounge Azizi Riviera" in Google Maps for directions.`,
    },
    {
      question: `What are the opening hours for ${naam} clients visiting Aurora?`,
      answer: `${SALON_NAME} is open Monday to Saturday, 8:00 AM – 10:00 PM, and Sunday, 10:00 AM – 5:00 PM. ${naam} residents can book morning, afternoon, or evening appointments to fit their schedule.`,
    },
  ];
}
