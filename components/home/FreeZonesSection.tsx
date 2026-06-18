import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FreeZoneCard } from "@/components/FreeZoneCard";
import { freeZones } from "@/data/freezones";

export function FreeZonesSection() {
  return (
    <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Free Zones"
          title={<>Set Up in the UAE&apos;s Top Free Zones</>}
          subtitle="We work with 40+ free zones. Here are some of the most popular — we'll help you pick the one that fits your activity and budget."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {freeZones.map((zone) => (
            <Reveal key={zone.abbr}>
              <FreeZoneCard zone={zone} />
            </Reveal>
          ))}
        </RevealGroup>

        <div className="mt-12 text-center">
          <Button href="/free-zones" variant="secondary" size="lg">
            Compare Free Zones
          </Button>
        </div>
      </Container>
    </section>
  );
}
