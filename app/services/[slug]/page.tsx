import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABanner } from "@/components/home/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { services, getServiceBySlug } from "@/data/services";
import { company } from "@/data/company";

// Statically generate a page for each service at build time.
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Per-service SEO metadata.
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.excerpt,
    openGraph: {
      title: `${service.title} | ${company.shortName}`,
      description: service.excerpt,
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = service.icon;
  // Suggest a few other services at the bottom.
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  // Service-specific structured data.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    provider: { "@type": "ProfessionalService", name: company.name },
    areaServed: "AE",
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <PageHero eyebrow="Service" title={service.title} subtitle={service.excerpt} />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary-light"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All services
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-chevron-gradient text-white shadow-glow">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="mt-6 text-lg leading-relaxed text-ink/90">
                  {service.intro}
                </p>
              </Reveal>

              {/* Detail blocks */}
              <div className="mt-12 space-y-8">
                {service.details.map((block, i) => (
                  <Reveal key={block.heading} delay={i * 0.05}>
                    <div className="rounded-2xl border border-border bg-card p-7">
                      <h2 className="text-xl font-bold tracking-tight">
                        {block.heading}
                      </h2>
                      <p className="mt-3 leading-relaxed text-muted">
                        {block.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-5 text-xl font-bold tracking-tight">
                    Frequently asked
                  </h2>
                  <FAQAccordion items={service.faqs} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-border bg-card p-7">
                  <h2 className="text-sm font-semibold uppercase tracking-brand text-primary-light">
                    What&apos;s included
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-ink/90">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-deep/40 to-card p-7">
                  <h2 className="text-lg font-bold">Talk to an advisor</h2>
                  <p className="mt-2 text-sm text-muted">
                    Get a free, tailored quote for {service.title.toLowerCase()}.
                  </p>
                  <Button href="/contact" variant="gradient" className="mt-5 w-full">
                    Free Consultation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related services */}
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight">
              Related services
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
                  >
                    <RIcon className="h-6 w-6 text-primary-light" aria-hidden="true" />
                    <h3 className="mt-4 font-bold">{r.title}</h3>
                    <p className="mt-1.5 text-sm text-muted">{r.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
