import { company } from "@/data/company";

/**
 * Injects JSON-LD structured data. Render once in the root layout for the
 * LocalBusiness schema; pass custom `data` for page-specific schemas.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON in a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness schema describing the consultancy. */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  description: company.description,
  url: company.url,
  telephone: company.phoneDisplay,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.line1,
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: "AE",
  priceRange: "AED 5,999+",
  sameAs: Object.values(company.social),
};
