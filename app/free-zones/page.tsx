import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { FreeZoneCard } from "@/components/FreeZoneCard";
import { CTABanner } from "@/components/home/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import { freeZones } from "@/data/freezones";

export const metadata: Metadata = {
  title: "UAE Free Zones",
  description:
    "Compare leading UAE free zones — DMCC, IFZA, Meydan, DSO, DAFZA, JAFZA, RAKEZ, and SHAMS — and find the right fit for your activity and budget.",
};

const benefits = [
  "100% foreign ownership",
  "Full repatriation of capital and profits",
  "Zero personal income tax",
  "Fast, often remote, setup",
  "Industry-specialised ecosystems",
  "Flexi-desk to full-office options",
];

export default function FreeZonesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Zones"
        title={
          <>
            Choose Your <GradientText>Free Zone</GradientText>
          </>
        }
        subtitle="The UAE has 40+ free zones, each with its own pricing, activities, and advantages. We help you pick the one that fits your business — here are the most popular."
      />

      {/* Benefits strip */}
      <section className="border-b border-border bg-surface/40 py-12">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <Reveal key={b} className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
                <Check className="h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                <span className="text-sm font-medium text-ink/90">{b}</span>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Zone grid */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Popular Zones"
            title={<>Where Will You Set Up?</>}
            subtitle="Not sure which is right for you? Book a free consultation and we'll compare options side by side."
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {freeZones.map((zone) => (
              <Reveal key={zone.abbr}>
                <FreeZoneCard zone={zone} />
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
