"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Lightbulb, PenTool, Rocket } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import DeveloperWorkspace from "@/components/DeveloperWorkspace";

const strengths = [
  { icon: Lightbulb, eyebrow: "01 · TƯ DUY SẢN PHẨM", detail: "Hiểu đúng vấn đề" },
  { icon: PenTool, eyebrow: "02 · THIẾT KẾ TRẢI NGHIỆM", detail: "Tối giản, hiệu quả" },
  { icon: Code2, eyebrow: "03 · PHÁT TRIỂN & VẬN HÀNH", detail: "Sản phẩm thực tế" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="home-hero relative isolate overflow-hidden px-5 sm:px-8 lg:px-12" aria-labelledby="hero-title">
      <div className="hero-blueprint-grid" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100svh-76px)] max-w-[1600px] flex-col pt-[94px] sm:pt-[102px] lg:pt-[88px]">
        <div className="hero-meta">
          <span className="hero-meta-item">Banana Studio / Việt Nam</span>
          <span className="hero-meta-item">Thiết kế có chủ đích · 2026</span>
          <span className="hero-meta-item">Sản phẩm số / 01</span>
        </div>

        <div className="hero-layout">
          <div className="hero-copy">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.06 }}
              className="hero-eyebrow"
            >
              <span className="hero-eyebrow-rule" />Nơi hiện thực ý tưởng của bạn
            </motion.p>

            <h1 id="hero-title" className="hero-title" aria-label="Từ ý tưởng đến sản phẩm thực tế.">
              {["Từ ý tưởng", "đến sản", "phẩm thực tế."].map((line, index) => (
                <span key={line} className="hero-title-line">
                  <motion.span
                    className={index === 2 ? "hero-title-accent" : undefined}
                    initial={reduceMotion ? false : { opacity: 0, y: "105%" }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >{line}</motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.42 }}
              className="hero-description"
            >
              Chúng tôi đồng hành từ ý tưởng, thiết kế, phát triển đến vận hành để biến những ý tưởng có giá trị thành sản phẩm số hoàn chỉnh.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 9 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.53 }}
              className="hero-actions"
            >
              <Link href="#work" data-cursor="view" className="hero-primary group">
                Khám phá dự án <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#contact" className="hero-secondary group">
                Chia sẻ ý tưởng <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <div className="hero-strengths">
              {strengths.map(({ icon: Icon, eyebrow, detail }, index) => (
                <motion.div
                  key={eyebrow}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.64 + index * 0.1 }}
                  className="hero-strength"
                >
                  <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                  <div><span>{eyebrow}</span><strong>{detail}</strong></div>
                </motion.div>
              ))}
            </div>
          </div>

          <DeveloperWorkspace />
        </div>

        <div className="hero-bottomline" aria-hidden="true">
          <span><Rocket size={12} />TỪ KHÁM PHÁ ĐẾN VẬN HÀNH</span>
          <span>THIẾT KẾ · KỸ THUẬT · SẢN PHẨM</span>
          <span>VIỆT NAM&nbsp; / &nbsp;01</span>
        </div>
      </div>
    </section>
  );
}
