/**
 * Single source of truth for company-wide contact details and copy.
 * Update these values to reflect the real business information.
 */
export const company = {
  name: "Hashmi Business Setup Services",
  shortName: "Hashmi",
  tagline: "Start Your Business in Dubai with Confidence",
  description:
    "Hashmi Business Setup Services is a Dubai-based company-formation consultancy offering end-to-end support for mainland, free zone, and offshore company setup, visas, banking, and ongoing compliance.",
  // Contact details.
  phoneDisplay: "+971 4 351 5125", // office landline
  phoneHref: "+97143515125",
  // Mobile & WhatsApp are the same number.
  whatsappDisplay: "+971 50 996 1724",
  whatsappHref: "971509961724", // digits only for wa.me links
  email: "info@hashmiservices.com",
  address: {
    line1: "Office M09, Al Sajaya 6",
    line2: "Abu Bakr Al Siddique Road, Dubai",
    country: "United Arab Emirates",
  },
  hours: "Sun–Thu, 9:00 AM – 6:00 PM (GST)",
  // Base URL used for metadata / canonical / Open Graph.
  url: "https://www.hashmiservices.com",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${company.whatsappHref}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
