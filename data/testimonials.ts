export type Testimonial = {
  name: string;
  country: string;
  role: string;
  rating: number; // 1–5
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Thompson",
    country: "United Kingdom",
    role: "Founder, E-commerce Brand",
    rating: 5,
    quote:
      "Hashmi made setting up my free zone company effortless. I had my licence and bank account within three weeks — all handled remotely before I even landed in Dubai.",
  },
  {
    name: "Rajesh Menon",
    country: "India",
    role: "Director, IT Consultancy",
    rating: 5,
    quote:
      "Transparent pricing and a dedicated advisor who actually picked up the phone. They mapped my activities perfectly and saved me from paying for things I didn't need.",
  },
  {
    name: "Amira Haddad",
    country: "Lebanon",
    role: "Co-founder, Marketing Agency",
    rating: 5,
    quote:
      "From the trade licence to our team's visas and Corporate Tax registration, Hashmi handled everything. It genuinely felt like having an in-house setup team.",
  },
  {
    name: "Daniel Kruger",
    country: "South Africa",
    role: "Managing Partner, Trading Co.",
    rating: 5,
    quote:
      "The mainland setup was complex on paper, but their PRO team made it smooth. Government relations and follow-through were excellent.",
  },
  {
    name: "Chen Wei",
    country: "Singapore",
    role: "CEO, Logistics Startup",
    rating: 5,
    quote:
      "They compared three free zones for me with clear pros and cons. No pressure, just honest advice. I'd recommend them to any founder eyeing Dubai.",
  },
  {
    name: "Olivia Rossi",
    country: "Italy",
    role: "Freelance Designer",
    rating: 5,
    quote:
      "As a freelancer the Starter package was perfect. Quick, affordable, and the team explained every step in plain English. Five stars.",
  },
];
