import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqs } from "@/data/faqs";

export function FAQSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions, Answered</>}
          subtitle="Everything you need to know about forming and running a business in Dubai. Still curious? Just ask."
        />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <FAQAccordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
