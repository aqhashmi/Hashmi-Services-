import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { PricingCard } from "@/components/PricingCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/home/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import { packages } from "@/data/packages";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Transparent business-setup packages for Dubai — Starter from AED 5,999, Growth from AED 12,999, and Enterprise/Mainland from AED 19,999. Prices are indicative.",
};

// Show the pricing/cost-related FAQs on this page.
const pricingFaqs = faqs.filter((f) =>
  /cost|tax|document|long|own/i.test(f.question)
);

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title={
          <>
            Transparent <GradientText>Pricing</GradientText>
          </>
        }
        subtitle="Clear starting points with no hidden surprises. Every package is tailored to your exact activity, visa, and banking needs after a free consultation."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
            {packages.map((pkg) => (
              <Reveal key={pkg.name} className="h-full">
                <PricingCard pkg={pkg} />
              </Reveal>
            ))}
          </RevealGroup>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
            All prices are indicative starting points and exclude government and
            third-party fees, which are payable directly to the relevant
            authorities. Your advisor will provide a precise, all-in quote based
            on your chosen jurisdiction, activities, and visa requirements.
          </p>
        </Container>
      </section>

      {/* What's the difference / comparison helper */}
      <section className="border-y border-border bg-surface/40 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Need Help Choosing?"
            title={<>Which Package Is Right for Me?</>}
            subtitle="A quick guide — and remember, we'll tailor any package to your situation."
          />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                name: "Starter",
                who: "You're a freelancer or solo founder testing an idea and want the leanest, fastest route to a legitimate UAE licence.",
              },
              {
                name: "Growth",
                who: "You're ready to relocate or hire, need residence visas and a corporate bank account, and want room to scale.",
              },
              {
                name: "Enterprise",
                who: "You need to trade across the UAE mainland, take on government contracts, or run a larger operation with full PRO support.",
              },
            ].map((item) => (
              <Reveal key={item.name} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold uppercase tracking-brand text-primary-light">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.who}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Pricing FAQ"
            title={<>Common Questions</>}
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <FAQAccordion items={pricingFaqs} />
          </Reveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
