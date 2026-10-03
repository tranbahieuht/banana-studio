"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = SERVICES[activeIdx] ?? SERVICES[0];

  return (
    <section id="services" className="bg-[#fafaf7] px-5 py-24 sm:px-8 lg:px-14 lg:py-36" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 0 18% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#877100]">05 / Những gì có thể tạo ra</p>
            <h2 id="services-title" className="text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.07em] text-[#171814]">
              Từ bài toán
              <br />
              đến trải nghiệm.
            </h2>
          </motion.div>
          <p className="max-w-sm text-sm leading-relaxed text-[#65665e] md:text-right">
            Không đóng gói sẵn giải pháp. Bắt đầu từ điều bạn cần làm tốt hơn.
          </p>
        </div>

        <div className="grid gap-8 border-t border-[#d8d8d0] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="services-list">
            {SERVICES.map((service, index) => (
              <motion.button
                key={service.number}
                type="button"
                onMouseEnter={() => setActiveIdx(index)}
                onFocus={() => setActiveIdx(index)}
                onClick={() => setActiveIdx(index)}
                aria-pressed={activeIdx === index}
                data-cursor="explore"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : index * 0.055, ease: [0.22, 1, 0.36, 1] }}
                className={`service-option motion-medium group flex w-full items-center gap-4 border-b border-[#d8d8d0] py-4 text-left transition-all sm:py-5 ${activeIdx === index ? "is-active" : ""}`}
              >
                <span className={`w-8 font-mono text-[10px] transition-colors ${activeIdx === index ? "text-[#877100]" : "text-[#93948b]"}`}>
                  {service.number}
                </span>
                <span className={`flex-1 text-xl font-medium tracking-[-0.04em] transition-all sm:text-2xl ${activeIdx === index ? "translate-x-1 text-[#171814]" : "text-[#818279] group-hover:text-[#171814]"}`}>
                  {service.title}
                </span>
                <span className={`text-xs text-[#65665e] transition-all ${activeIdx === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  Khám phá
                </span>
                <ArrowUpRight size={16} className={`transition-transform ${activeIdx === index ? "rotate-45 text-[#877100]" : "text-[#96978e]"}`} />
              </motion.button>
            ))}
          </div>

          <div className="services-detail relative flex min-h-[300px] flex-col justify-between border-l pl-5 py-6 sm:pl-7 lg:sticky lg:top-28 lg:min-h-[420px]">
            <div className="mb-7 flex items-center justify-between border-b pb-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#77786f]">
              <span>Capability / {active.number}</span>
              <span>Design → Delivery</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
                aria-live="polite"
              >
                <span className="font-mono text-xs text-[#877100]">{active.number} / CÓ THỂ BAO GỒM</span>
                <h3 className="mt-5 max-w-lg text-3xl font-medium leading-tight tracking-[-0.055em] text-[#171814] sm:text-4xl">
                  {active.detail}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#65665e]">{active.description}</p>
                <div className="service-flow mt-9 flex flex-wrap items-center gap-2.5" aria-hidden="true">
                  {active.code.split(" / ").map((step, index) => (
                    <span key={step} className="contents">
                      <span className="service-flow-step border-b border-[#e3d222] pb-2 text-xs text-[#474840]">{step}</span>
                      {index < active.code.split(" / ").length - 1 && <span className="text-[#a5a69e]">→</span>}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <a href="#contact" className="mt-10 inline-flex w-fit items-center gap-2 border-b border-[#d7d7cf] pb-2 text-sm text-[#171814] hover:border-[#8d7400]">
              Cùng trao đổi <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
