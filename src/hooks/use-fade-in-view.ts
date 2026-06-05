/*
 * ============================================
 * useFadeInView — Hook de animación al hacer scroll
 * ============================================
 *
 * Elimina la repetición de objetos initial/whileInView/viewport/transition
 * de framer-motion en cada componente. Unifica la configuración en un hook.
 *
 * Uso:
 *   const anim = useFadeInView({ delay: 0.2, y: 30 });
 *   <motion.div {...anim}>...</motion.div>
 *
 * hoverLift:
 *   Objeto estático para el efecto de elevación al hover.
 *   Se usa con spread: <motion.div {...hoverLift}>
 */

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
      viewport: { once: true }, // Solo anima la primera vez que entra al viewport
      transition: { duration, delay },
    }),
    [delay, duration, x, y]
  );
}

/** Elevación al hacer hover: el elemento sube 10px */
export const hoverLift = {
  whileHover: { y: -10, transition: { duration: 0.2 } },
} as const;
