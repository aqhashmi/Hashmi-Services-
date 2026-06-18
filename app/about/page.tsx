import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, ShieldCheck, Award, Globe2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/GradientText";
import { CTABanner } from "@/components/home/CTABanner";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Hashmi Business Setup Services is an independent Dubai consultancy helping entrepreneurs worldwide form companies, secure visas, and stay compliant in the UAE.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity First",
    body: "Honest advice and transparent pricing. We recommend what's right for your business — never what simply earns us more.",
  },
  {
    icon: HeartHandshake,
    title: "Client Obsession",
    body: "Your success is our metric. A dedicated advisor stays with you from first call to final licence and beyond.",
  },
  {
    icon: Award,
    title: "Expertise",
    body: "Years of hands-on experience across mainland, free zone, and offshore setups — and deep knowledge of UAE compliance.",
  },
  {
    icon: Globe2,
    title: "Global Mindset",
    body: "We serve founders from 90+ nationalities, and we understand the realities of relocating and operating internationally.",
  },
];

const stats = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 10000, suffix: "+", label: "Companies formed" },
  { value: 40, suffix: "+", label: "Free zones covered" },
  { value: 98, suffix: "%", label: "Client retention" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Hashmi"
        title={
          <>
            Your Partner in <GradientText>Dubai</GradientText>
          </>
        }
        subtitle="We turn the complexity of UAE company formation into a clear, guided path — so you can focus on building your business, not battling paperwork."
      />

      {/* Story */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  Dubai is one of the most exciting places on earth to start a
                  business — but for newcomers, the maze of jurisdictions,
                  activities, approvals, and compliance can be overwhelming.
                  Hashmi Business Setup Services was founded to fix that.
                </p>
                <p>
                  We&apos;ve helped thousands of entrepreneurs, freelancers, and
                  established companies establish their presence in the UAE.
                  Whether you need a lean free zone licence or a full mainland
                  operation with visas and banking, our advisors handle every
                  detail end to end.
                </p>
                <p>
                  Today, with UAE Corporate Tax and VAT in force, getting setup
                  right from day one matters more than ever. We don&apos;t just
                  open your company — we keep it compliant, so you can grow with
                  total confidence.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-7">
                  <Target className="h-8 w-8 text-primary-light" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold">Our Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    To make launching and running a business in the UAE simple,
                    transparent, and stress-free for entrepreneurs everywhere —
                    with expert guidance at every step.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-7">
                  <Eye className="h-8 w-8 text-primary-light" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold">Our Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    To be the most trusted business-setup partner in the region —
                    known for integrity, speed, and a genuine commitment to our
                    clients&apos; long-term success.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section className="border-y border-border bg-surface/40 py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl font-extrabold tracking-tight text-accent-gradient sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
                <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title={<>What We Stand For</>}
            subtitle="The principles that guide every consultation, every application, and every long-term relationship."
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, body }) => (
              <Reveal
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-chevron-gradient/10 text-primary-light ring-1 ring-inset ring-primary/20">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
