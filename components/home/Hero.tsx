"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { ChevronBackdrop, ChevronTiles } from "@/components/ui/ChevronTiles";
import { HeroPackageSlider } from "./HeroPackageSlider";

const trustBadges = [
  "10,000+ Companies Formed",
  "100% Foreign Ownership",
  "1–3 Week Setup",
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Layered glow + chevron motif behind the hero. */}
      <div className="pointer-events-none absolute inset-0 bg-mesh-hero" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-purple-glow" aria-hidden="true" />
      <ChevronBackdrop />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur"
          >
            <ChevronTiles count={3} tileClassName="h-3 w-1.5" />
            <span className="text-xs font-medium uppercase tracking-brand text-muted">
              Dubai Company Formation Experts
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Start Your Business in Dubai with{" "}
            <GradientText>Confidence</GradientText>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
          >
            End-to-end company formation made simple. From trade licence and
            visas to banking and tax compliance, our advisors handle every step
            so you can launch fast — with 100% ownership and zero personal income tax.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/contact" variant="gradient" size="lg">
              Get a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#calculator" variant="secondary" size="lg">
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Calculate Your Cost
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/90"
              >
                <CheckCircle2 className="h-4 w-4 text-primary-light" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </motion.ul>

          {/* Pricing packages slider */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
          >
            <HeroPackageSlider />
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient divider */}
      <div className="divider-gradient" />
    </section>
  );
}
