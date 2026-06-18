export type Package = {
  name: string;
  tagline: string;
  priceFrom: string;
  /** Currency + amount shown large on the card. */
  price: string;
  bestFor: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
};

export const packages: Package[] = [
  {
    name: "Starter",
    tagline: "Free Zone Trade License",
    price: "AED 5,999",
    priceFrom: "from",
    bestFor: "Freelancers, solopreneurs & early-stage startups",
    features: [
      "Free Zone trade licence (1 activity group)",
      "Company registration & incorporation documents",
      "Trade name reservation & initial approval",
      "Digital company formation — set up remotely",
      "Guidance on bank account options",
      "Dedicated formation advisor",
    ],
    ctaLabel: "Start with Starter",
  },
  {
    name: "Growth",
    tagline: "Free Zone + Visas + Banking",
    price: "AED 12,999",
    priceFrom: "from",
    bestFor: "Growing teams ready to hire and operate on the ground",
    features: [
      "Everything in Starter",
      "Free Zone licence with visa allocation",
      "1–2 residence visas (investor / employee)",
      "Establishment card processing",
      "Corporate bank account assistance",
      "Emirates ID & medical coordination",
      "VAT registration guidance",
    ],
    ctaLabel: "Choose Growth",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise / Mainland",
    tagline: "Mainland Trade License",
    price: "AED 19,999",
    priceFrom: "from",
    bestFor: "Established businesses trading across the UAE market",
    features: [
      "Mainland (DED) trade licence",
      "Memorandum of Association (MOA) drafting",
      "Ejari / virtual office arrangement",
      "Establishment card",
      "Priority PRO & government liaison",
      "Corporate bank account assistance",
      "Corporate Tax & VAT registration support",
    ],
    ctaLabel: "Go Enterprise",
  },
];
