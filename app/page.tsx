import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { SetupProcess } from "@/components/home/SetupProcess";
import { FreeZonesSection } from "@/components/home/FreeZonesSection";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { CostCalculatorSection } from "@/components/home/CostCalculatorSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { CTABanner } from "@/components/home/CTABanner";
import { ContactSection } from "@/components/ContactSection";

// The home page composes the marketing sections in the order from the brief.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <WhyChoose />
      <SetupProcess />
      <FreeZonesSection />
      <PackagesTeaser />
      <CostCalculatorSection />
      <Testimonials />
      <FAQSection />
      <CTABanner />
      <ContactSection />
    </>
  );
}
