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
  // Contact details (placeholders — replace with real values).
  phoneDisplay: "+971 4 000 0000",
  phoneHref: "+97140000000",
  whatsappDisplay: "+971 50 000 0000",
  whatsappHref: "971500000000", // digits only for wa.me links
  email: "hello@hashmisetup.ae",
  address: {
    line1: "Office 000, Business Bay Tower",
    line2: "Business Bay, Dubai",
    country: "United Arab Emirates",
  },
  hours: "Sun–Thu, 9:00 AM – 6:00 PM (GST)",
  // Base URL used for metadata / canonical / Open Graph.
  url: "https://www.hashmisetup.ae",
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
