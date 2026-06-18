import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title={<>Everything You Need, Under One Roof</>}
          subtitle="From your first trade licence to ongoing tax compliance, we cover the full lifecycle of your Dubai business."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </RevealGroup>

        <div className="mt-12 text-center">
          <Button href="/services" variant="secondary" size="lg">
            Explore All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
