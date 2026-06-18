import type { Variants } from "framer-motion";

/**
 * Shared framer-motion variants. Kept subtle and consistent across the site.
 * Components that consume these are client components ("use client").
 * Motion is automatically reduced for users with `prefers-reduced-motion`
 * via framer-motion's `useReducedMotion` and our global CSS override.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

/** Parent container that staggers its children on scroll into view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Sensible defaults for whileInView reveals. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
