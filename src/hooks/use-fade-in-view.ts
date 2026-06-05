import { useMemo } from "react";
import type { Variants } from "framer-motion";

interface FadeInViewOptions {
  delay?: number;
  x?: number;
  y?: number;
  duration?: number;
}

export function useFadeInView(options: FadeInViewOptions = {}) {
  const { delay = 0, x = 0, y = 20, duration = 0.6 } = options;

  return useMemo(
    () => ({
      initial: { opacity: 0, x, y },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true },
      transition: { duration, delay },
    }),
    [delay, duration, x, y]
  );
}

export const hoverLift = {
  whileHover: { y: -10, transition: { duration: 0.2 } },
} as const;
