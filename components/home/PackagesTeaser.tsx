import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/PricingCard";
import { packages } from "@/data/packages";

export function PackagesTeaser() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Packages"
          title={<>Simple, Transparent Pricing</>}
          subtitle="Pick a starting point — we'll tailor it to your exact activity, visa, and banking needs."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {packages.map((pkg) => (
            <Reveal key={pkg.name} className="h-full">
              <PricingCard pkg={pkg} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
