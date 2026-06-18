import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { company, whatsappLink } from "@/data/company";

/**
 * Full contact block: form + contact details, WhatsApp button, and a map
 * placeholder. Reused on the home page and the dedicated /contact page.
 */
export function ContactSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <Container>
        {withHeading && (
          <SectionHeading
            eyebrow="Contact"
            title={<>Let&apos;s Start Your Setup</>}
            subtitle="Tell us about your plans and we'll get back to you within one business day with clear next steps."
          />
        )}

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
            <ContactForm />
          </div>

          {/* Details */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h3 className="text-lg font-bold uppercase tracking-brand">
                Get in Touch
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-ink">Office</p>
                    <p className="text-muted">
                      {company.address.line1}
                      <br />
                      {company.address.line2}
                      <br />
                      {company.address.country}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-ink">Phone</p>
                    <a href={`tel:${company.phoneHref}`} className="text-muted hover:text-primary-light">
                      {company.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-ink">Email</p>
                    <a href={`mailto:${company.email}`} className="text-muted hover:text-primary-light">
                      {company.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-ink">Working Hours</p>
                    <p className="text-muted">{company.hours}</p>
                  </div>
                </li>
              </ul>

              <a
                href={whatsappLink(
                  "Hi Hashmi, I'd like to chat about setting up my business in Dubai."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <div
                className="relative flex h-56 items-center justify-center bg-surface"
                role="img"
                aria-label="Map showing the Hashmi office location in Business Bay, Dubai (placeholder)"
              >
                {/* Decorative grid to suggest a map */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(#2A2730 1px, transparent 1px), linear-gradient(90deg, #2A2730 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-primary-light" aria-hidden="true" />
                  <p className="mt-2 text-sm font-medium text-ink">
                    {company.address.line2}
                  </p>
                  <p className="text-xs text-muted">
                    {/* Replace with an embedded Google Map iframe */}
                    Map embed placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
