import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { GradientText } from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a free consultation with Hashmi Business Setup Services. Call, WhatsApp, or send us a message and we'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <GradientText>Talk</GradientText>
          </>
        }
        subtitle="Tell us about your plans and our advisors will map out your licence, costs, and timeline — free and with no obligation."
      />
      {/* Heading is provided by the PageHero above, so hide the section's own. */}
      <ContactSection withHeading={false} />
    </>
  );
}
