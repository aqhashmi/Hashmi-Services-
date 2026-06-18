export type NavItem = {
  label: string;
  href: string;
};

/** Primary navigation shown in the header and footer. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Free Zones", href: "/free-zones" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Condensed "Quick links" list used in the footer. */
export const footerQuickLinks: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Packages & Pricing", href: "/packages" },
  { label: "Free Zones", href: "/free-zones" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
