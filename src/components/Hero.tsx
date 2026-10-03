"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import DeveloperWorkspace from "@/components/DeveloperWorkspace";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="home-hero relative overflow-hidden px-5 pb-8 pt-[98px] sm:px-8 sm:pt-[112px] lg:px-14 lg:pb-10 lg:pt-[124px]"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hero-meta flex items-center justify-between border-b pb-3 font-mono text-[9px] uppercase tracking-[0.15em] sm:text-[10px]"
        >
          <span className="flex items-center gap-2"><i aria-hidden="true" className="hero-live-dot h-1.5 w-1.5 rounded-full" />Banana Studio / Việt Nam</span>
          <span className="hidden sm:block">Thiết kế có chủ đích · 2026</span>
          <span className="hidden md:block">Sản phẩm số / 01</span>
        </motion.div>

        <div className="hero-layout grid items-center gap-8 py-9 sm:gap-10 sm:py-12 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:py-10 min-[1280px]:grid-cols-[0.724fr_1fr] min-[1280px]:gap-[clamp(3rem,4vw,4.5rem)]">
          <div className="relative z-10 max-w-[600px]">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-ink)] sm:text-[10px]"
            >
              <span aria-hidden="true" className="h-px w-7 bg-[var(--banana)]" />Tư duy sản phẩm · Từ đầu đến cuối
            </motion.p>

            <h1 id="hero-title" aria-label="Từ ý tưởng đến sản phẩm thực tế." className="hero-title text-[clamp(3.1rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.085em]">
              {["Từ ý tưởng", "đến sản phẩm", "thực tế."].map((line, index) => (
                <span key={line} className={`block overflow-hidden pb-[0.05em] ${index === 1 ? "pl-[0.28em]" : ""}`}>
                  <motion.span
                    className={`block ${index === 2 ? "hero-title-accent" : ""}`}
                    initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : 0.12 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >{line}</motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 9 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[420px] text-sm leading-relaxed text-[var(--foreground-muted)] sm:mt-7 sm:text-base"
            >
              Chúng tôi kết nối thiết kế, kỹ thuật và tư duy sản phẩm để biến những ý tưởng có ích thành trải nghiệm số hoàn chỉnh.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8"
            >
              <Link href="#work" data-cursor="view" className="hero-primary group inline-flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-medium">
                Khám phá dự án <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#contact" className="hero-secondary group inline-flex items-center gap-2 border-b pb-1.5 text-xs font-medium">
                Chia sẻ ý tưởng <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.32, delay: reduceMotion ? 0 : 0.76 }}
              className="mt-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--foreground-muted)] sm:mt-11"
            >
              <span className="flex h-7 w-7 items-center justify-center border border-[var(--rule)] text-[var(--accent-ink)]">01</span>
              <span>Khám phá · Thiết kế · Phát triển</span>
            </motion.div>
          </div>

          <DeveloperWorkspace />
        </div>

        <div className="hero-footer flex items-center justify-between border-t pt-3 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
          <span className="hidden sm:block">Ý tưởng được tạo nên từ nhiều lớp.</span>
          <Link href="#statement" className="group inline-flex items-center gap-2">Cuộn để khám phá <ArrowDownRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></Link>
          <span className="hidden sm:block">01 / 08</span>
        </div>
      </div>
    </section>
  );
}
