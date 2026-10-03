"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import DeveloperWorkspace from "@/components/DeveloperWorkspace";

const headline = ["Từ ý tưởng", "đến sản", "phẩm", "thực tế."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="home-hero relative overflow-hidden px-5 pb-9 pt-[98px] sm:px-8 sm:pt-[112px] lg:px-14 lg:pb-12 lg:pt-[124px]"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hero-meta"
        >
          <span className="hero-meta-item">Banana Studio / Việt Nam</span>
          <span className="hero-meta-item">Thiết kế có chủ đích · 2026</span>
          <span className="hero-meta-item">Sản phẩm số / 01</span>
        </motion.div>

        <div className="hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title" aria-label="Từ ý tưởng đến sản phẩm thực tế.">
              {headline.map((line, index) => (
                <span key={line} className="hero-title-line">
                  <motion.span
                    className={index === headline.length - 1 ? "hero-title-accent" : undefined}
                    initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: reduceMotion ? 0 : 0.62,
                      delay: reduceMotion ? 0 : 0.08 + index * 0.075,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 9 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="hero-description"
            >
              Chúng tôi kết nối thiết kế, kỹ thuật và tư duy sản phẩm để biến những ý tưởng có ích thành trải nghiệm số hoàn chỉnh.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.54, ease: [0.22, 1, 0.36, 1] }}
              className="hero-actions"
            >
              <Link href="#work" data-cursor="view" className="hero-primary group">
                Khám phá dự án <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#contact" className="hero-secondary group">
                Chia sẻ ý tưởng <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          <DeveloperWorkspace />
        </div>
      </div>
    </section>
  );
}
