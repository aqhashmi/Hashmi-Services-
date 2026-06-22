import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CostCalculator } from "@/components/CostCalculator";

/** Home-page section housing the interactive cost calculator. */
export function CostCalculatorSection() {
  return (
    // scroll-mt offsets the sticky header when linked via #calculator.
    <section id="calculator" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Cost Calculator"
          title={<>Estimate Your Setup Cost</>}
          subtitle="Pick your jurisdiction, visas, and add-ons for an instant ballpark. No sign-up — just a quick estimate to plan with."
        />
        <Reveal className="mt-12">
          <CostCalculator />
        </Reveal>
      </Container>
    </section>
  );
}
