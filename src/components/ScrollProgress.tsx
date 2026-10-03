"use client";

import { motion, useScroll } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="site-scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
