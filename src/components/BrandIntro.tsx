"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 80 : 660);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--background)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.08 : 0.34, delay: reduceMotion ? 0 : 0.28, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 text-[var(--foreground)]"
      >
        <Image src="/assets/logo-emblem.png" alt="" width={28} height={28} priority className="h-7 w-7 object-contain" />
        <span className="text-sm font-medium tracking-[-0.04em]">Banana Studio</span>
      </motion.div>
    </motion.div>
  );
}
