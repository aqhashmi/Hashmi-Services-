import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronBackdrop } from "@/components/ui/ChevronTiles";
import { company, whatsappLink } from "@/data/company";

export function CTABanner() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary-deep via-primary to-primary-deep px-6 py-14 text-center sm:px-12 sm:py-20">
          <ChevronBackdrop />
          {/* Soft inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.18),transparent_70%)]" aria-hidden="true" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
              Ready to Launch Your Dubai Business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/85">
              Book a free, no-obligation consultation. We&apos;ll map out your
              licence, costs, and timeline in a single call.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="/contact"
                size="lg"
                className="bg-white text-primary-deep hover:bg-white/90"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href={whatsappLink(
                  "Hi Hashmi, I'd like a free consultation about setting up my business in Dubai."
                )}
                size="lg"
                className="border border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us
              </Button>
            </div>
            <p className="mt-5 text-sm text-white/70">
              Or call us directly at{" "}
              <a href={`tel:${company.phoneHref}`} className="font-semibold text-white underline-offset-2 hover:underline">
                {company.phoneDisplay}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
