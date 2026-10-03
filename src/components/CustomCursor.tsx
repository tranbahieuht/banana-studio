"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState("");
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { damping: 30, stiffness: 380, mass: 0.35 });
  const y = useSpring(pointerY, { damping: 30, stiffness: 380, mass: 0.35 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      const target = event.target;
      const nextState = target instanceof Element
        ? target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? ""
        : "";
      setCursorState(
        (current) => current === nextState ? current : nextState,
      );
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [pointerX, pointerY]);

  return (
    <>
      <style>{`@media (hover: hover) and (pointer: fine) { body, body * { cursor: none !important; } }`}</style>
      <motion.div
        aria-hidden="true"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9998] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-[#171814] font-mono text-[7px] tracking-[0.08em] text-[#171814] md:flex"
        style={{ x: reduceMotion ? pointerX : x, y: reduceMotion ? pointerY : y }}
        animate={{
          width: cursorState ? (cursorState === "view" ? 86 : 74) : 8,
          height: cursorState ? 28 : 8,
          backgroundColor: cursorState ? "var(--banana)" : "var(--foreground)",
        }}
        transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        {cursorState === "view"
          ? "XEM DỰ ÁN ↗"
          : cursorState === "explore"
            ? "KHÁM PHÁ"
            : cursorState === "hover"
              ? "↗"
              : cursorState === "drag"
                ? "KÉO →"
                : ""}
      </motion.div>
    </>
  );
}
