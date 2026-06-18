import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/home/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mainland, free zone, and offshore company formation, trade licences, visas & PRO, banking, VAT & Corporate Tax, accounting, and liquidation — all under one roof.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            End-to-End <GradientText>Business Setup</GradientText>
          </>
        }
        subtitle="From your first trade licence to ongoing tax compliance, explore the full range of services that take your business from idea to operational."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
