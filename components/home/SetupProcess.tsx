import {
  ClipboardList,
  Map,
  FileCheck2,
  Users,
  Landmark,
  Rocket,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const steps = [
  { icon: ClipboardList, title: "Choose Business Activity", desc: "Pick the right activities for your licence." },
  { icon: Map, title: "Select Jurisdiction", desc: "Mainland, free zone, or offshore." },
  { icon: FileCheck2, title: "Register & License", desc: "Name approval and licence issuance." },
  { icon: Users, title: "Visa & PRO", desc: "Residence visas and Emirates ID." },
  { icon: Landmark, title: "Bank Account", desc: "Corporate account opening support." },
  { icon: Rocket, title: "Go Live", desc: "Start trading — fully compliant." },
];

export function SetupProcess() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Process"
          title={<>Your Setup in Six Simple Steps</>}
          subtitle="A clear, guided path from idea to launch — we handle the paperwork at every stage."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} className="relative">
                {/* Connector line (desktop only, between steps) */}
                {i < steps.length - 1 && (
                  <span
                    className="absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] bg-gradient-to-r from-primary/50 to-border lg:block"
                    aria-hidden="true"
                  />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Chevron-tile numbered badge */}
                  <div className="relative">
                    <div className="flex h-14 w-14 -skew-x-[12deg] items-center justify-center rounded-xl bg-chevron-gradient shadow-glow">
                      <Icon className="h-6 w-6 skew-x-[12deg] text-white" aria-hidden="true" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-base text-xs font-bold text-primary-light">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold uppercase tracking-brand">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
