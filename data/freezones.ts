export type FreeZone = {
  name: string;
  abbr: string;
  description: string;
  /** Notable activity focus, shown as a small tag. */
  focus: string;
};

export const freeZones: FreeZone[] = [
  {
    name: "Dubai Multi Commodities Centre",
    abbr: "DMCC",
    description:
      "The world's most-awarded free zone — a prestigious base for commodities, trading, and crypto businesses in the heart of JLT.",
    focus: "Trading & Commodities",
  },
  {
    name: "International Free Zone Authority",
    abbr: "IFZA",
    description:
      "Flexible, cost-effective packages with a wide activity list — a popular choice for startups and consultants.",
    focus: "Startups & SMEs",
  },
  {
    name: "Meydan Free Zone",
    abbr: "Meydan",
    description:
      "A premium Dubai address with fast digital setup and strong banking access, ideal for service businesses.",
    focus: "Services & E-commerce",
  },
  {
    name: "Dubai Silicon Oasis",
    abbr: "DSO",
    description:
      "An integrated technology park offering an ecosystem for tech, IT, and innovation-driven companies.",
    focus: "Technology",
  },
  {
    name: "Dubai Airport Free Zone",
    abbr: "DAFZA",
    description:
      "Located beside Dubai International Airport — a logistics and trade hub with premium infrastructure.",
    focus: "Logistics & Trade",
  },
  {
    name: "Jebel Ali Free Zone",
    abbr: "JAFZA",
    description:
      "The flagship industrial and logistics zone connected to the region's largest port for import/export at scale.",
    focus: "Industrial & Logistics",
  },
  {
    name: "Ras Al Khaimah Economic Zone",
    abbr: "RAKEZ",
    description:
      "A highly competitive zone for manufacturing, trading, and SMEs with some of the lowest setup costs in the UAE.",
    focus: "Manufacturing & SMEs",
  },
  {
    name: "Sharjah Media City",
    abbr: "SHAMS",
    description:
      "Budget-friendly licensing with quick approvals — a favourite for media, creative, and freelance businesses.",
    focus: "Media & Creative",
  },
];
