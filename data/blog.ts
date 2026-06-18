export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readTime: string;
  /** Body is an array of simple blocks for lightweight rendering. */
  body: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mainland-vs-free-zone-dubai",
    title: "Mainland vs Free Zone: Which Is Right for Your Dubai Business?",
    excerpt:
      "The single most important decision when forming a company in Dubai. We break down ownership, cost, market access, and visas so you can choose with confidence.",
    category: "Company Formation",
    author: "Hashmi Advisory Team",
    date: "2026-05-28",
    readTime: "6 min read",
    body: [
      {
        type: "p",
        text: "Choosing between a mainland and a free zone company is the first major fork in the road for any entrepreneur setting up in Dubai. Both now allow 100% foreign ownership for most activities, so the right choice comes down to how and where you plan to do business.",
      },
      { type: "h2", text: "Market access" },
      {
        type: "p",
        text: "A mainland licence lets you trade anywhere in the UAE, work directly with government bodies, and open branches without restriction. A free zone company is optimised for international trade and services, but selling directly into the UAE mainland usually requires a local distributor or a mainland branch.",
      },
      { type: "h2", text: "Cost and speed" },
      {
        type: "p",
        text: "Free zones typically offer lower entry costs and faster setup — sometimes within a few working days. Mainland setups involve a few extra steps such as MOA notarisation and an Ejari tenancy, which can add time and cost.",
      },
      { type: "h2", text: "Quick comparison" },
      {
        type: "ul",
        items: [
          "Choose a free zone for international trade, services, e-commerce, and lean startups.",
          "Choose mainland to sell directly across the UAE, take government contracts, and scale visa numbers.",
          "Both offer 100% ownership and zero personal income tax.",
        ],
      },
      {
        type: "p",
        text: "Still unsure? Our advisors will map your activity and growth plans to the right structure in a free consultation.",
      },
    ],
  },
  {
    slug: "uae-corporate-tax-explained",
    title: "UAE Corporate Tax Explained: What Business Owners Need to Know",
    excerpt:
      "Corporate Tax is now active in the UAE. Here's who pays, the rates and thresholds, and how Free Zone companies can preserve their advantages.",
    category: "Tax & Compliance",
    author: "Hashmi Advisory Team",
    date: "2026-05-12",
    readTime: "7 min read",
    body: [
      {
        type: "p",
        text: "The UAE introduced a federal Corporate Tax to align with global standards while keeping the country highly competitive. The headline rate is 9% — still one of the lowest in the world — and there are important reliefs for smaller businesses and qualifying free zone companies.",
      },
      { type: "h2", text: "The basics" },
      {
        type: "ul",
        items: [
          "0% on taxable income up to the AED 375,000 threshold.",
          "9% on taxable income above the threshold.",
          "Registration with the Federal Tax Authority is mandatory for taxable persons.",
        ],
      },
      { type: "h2", text: "Free zone qualifying income" },
      {
        type: "p",
        text: "Qualifying Free Zone Persons may benefit from a 0% rate on qualifying income if they meet substance and other requirements. Getting this right requires careful structuring — and accurate accounting records.",
      },
      { type: "h2", text: "Staying compliant" },
      {
        type: "p",
        text: "Compliance starts with proper bookkeeping and timely registration. We register your business, advise on your tax position, and manage filings so you avoid penalties and keep more of what you earn.",
      },
    ],
  },
  {
    slug: "documents-needed-to-start-a-business-in-dubai",
    title: "The Documents You Need to Start a Business in Dubai",
    excerpt:
      "A simple checklist of what to prepare — from your passport copy to your MOA — so your company formation moves quickly and without surprises.",
    category: "Getting Started",
    author: "Hashmi Advisory Team",
    date: "2026-04-30",
    readTime: "4 min read",
    body: [
      {
        type: "p",
        text: "One of the most common reasons setups slow down is missing paperwork. The good news: the core requirements are straightforward. Here's what most applicants need.",
      },
      { type: "h2", text: "Core documents" },
      {
        type: "ul",
        items: [
          "Passport copy (valid for at least six months).",
          "Passport-size photograph with a white background.",
          "Proof of address (a recent utility bill or bank statement).",
        ],
      },
      { type: "h2", text: "Sometimes required" },
      {
        type: "ul",
        items: [
          "No Objection Certificate (NOC) if you're a current UAE resident on a sponsored visa.",
          "A short business plan for certain activities or banking applications.",
          "Memorandum of Association (MOA) for mainland LLCs.",
          "Emirates ID and existing visa copy if applicable.",
        ],
      },
      {
        type: "p",
        text: "We'll send you a precise, activity-specific checklist at the start so nothing holds up your licence.",
      },
    ],
  },
  {
    slug: "how-to-open-a-corporate-bank-account-in-the-uae",
    title: "How to Open a Corporate Bank Account in the UAE",
    excerpt:
      "Banking can be the trickiest part of setup. Learn how to present a strong application and pick the right bank for your business profile.",
    category: "Banking",
    author: "Hashmi Advisory Team",
    date: "2026-04-15",
    readTime: "5 min read",
    body: [
      {
        type: "p",
        text: "UAE banks apply rigorous compliance (KYC/AML) checks, so a well-prepared application makes all the difference. The aim is to present a clear, credible picture of your business and its activity.",
      },
      { type: "h2", text: "What banks look for" },
      {
        type: "ul",
        items: [
          "A clear description of your business activity and clients.",
          "Expected turnover and source of funds.",
          "Shareholder background and supporting documents.",
          "A valid trade licence and incorporation documents.",
        ],
      },
      { type: "h2", text: "Choosing the right bank" },
      {
        type: "p",
        text: "Banks differ in their appetite for different nationalities, industries, and turnover levels. We match you to banks where your profile fits best, prepare your company profile, and follow up with relationship managers to keep things moving.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
