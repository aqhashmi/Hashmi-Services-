"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <section className="border-y border-border bg-surface/40 py-20 sm:py-24" aria-roledescription="carousel" aria-label="Client testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Trusted by Founders Worldwide</>}
          subtitle="Real businesses, launched with Hashmi. Here's what our clients say."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
            <Quote className="absolute right-8 top-8 h-12 w-12 text-primary/15" aria-hidden="true" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex gap-1" aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < active.rating
                          ? "fill-primary-light text-primary-light"
                          : "text-border"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="mt-6 text-pretty text-lg leading-relaxed text-ink/90 sm:text-xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6">
                  <div className="font-bold text-ink">{active.name}</div>
                  <div className="text-sm text-muted">
                    {active.role} · {active.country}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary-light"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-6 bg-chevron-gradient" : "w-2 bg-border hover:bg-muted"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary-light"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
