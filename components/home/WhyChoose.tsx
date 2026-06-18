import {
  BadgeDollarSign,
  UserRound,
  Rocket,
  Landmark,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const features = [
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    body: "Clear, all-in quotes with no hidden government-fee surprises. You'll know exactly what you pay before you commit.",
  },
  {
    icon: UserRound,
    title: "Dedicated Advisor",
    body: "One expert point of contact who knows your case from day one — not a call-centre queue.",
  },
  {
    icon: Rocket,
    title: "Fast Turnaround",
    body: "Most free zone licences issued within 1–3 weeks, with several zones approving in just a few working days.",
  },
  {
    icon: Landmark,
    title: "Government Relations",
    body: "Established relationships with free zone authorities and the DED keep your application moving smoothly.",
  },
  {
    icon: LifeBuoy,
    title: "End-to-End Support",
    body: "Licence, visas, Emirates ID, banking, and office — one team handles the entire journey for you.",
  },
  {
    icon: ShieldCheck,
    title: "Post-Setup Compliance",
    body: "We keep you compliant after launch with Corporate Tax, VAT, accounting, and timely renewals.",
  },
];

export function WhyChoose() {
  return (
    <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Hashmi"
          title={<>Why Entrepreneurs Choose Us</>}
          subtitle="We combine local expertise with a genuinely founder-first approach — honest advice, fast execution, and support that doesn't stop at the licence."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <Reveal
              key={title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-chevron-gradient/10 text-primary-light ring-1 ring-inset ring-primary/20">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
