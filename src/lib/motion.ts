import type { Variants } from 'framer-motion';

/** Shared motion variants for the site. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Standard scroll-reveal props for sections. */
export const revealProps = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, amount: 0.15 },
};

/** Shared hover/tap interactions. */
export const hoverLift = {
  whileHover: { y: -6, scale: 1.015 },
  whileTap: { scale: 0.985 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
};

export const hoverPress = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 380, damping: 20 },
};
