"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRICING_TIERS } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();

  return (
    <section id="engagement" className="bg-[#f1f1eb] px-5 py-24 sm:px-8 lg:px-14 lg:py-36" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#877100]">08 / Cách cùng bắt đầu</p>
            <h2 id="pricing-title" className="text-[clamp(2.7rem,6vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.07em] text-[#171814]">
              Rõ phạm vi.
              <br />
              Rõ điều cần làm.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#65665e] md:text-right">
            Mỗi bài toán có điểm bắt đầu khác nhau. Phạm vi và chi phí sẽ được trao đổi sau khi hiểu rõ điều bạn cần.
          </p>
        </motion.div>

        <div className="border-t border-[#d2d2ca]">
          {PRICING_TIERS.map((tier, index) => (
            <motion.article
              key={tier.tier}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35, delay: reduceMotion ? 0 : index * 0.06 }}
              className="grid gap-5 border-b border-[#d2d2ca] py-7 lg:grid-cols-[0.65fr_1fr_1.2fr_auto] lg:items-center lg:gap-10"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#877100]">{tier.tier}</span>
                <span className="text-xs text-[#77786f]">{tier.scope}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.04em] text-[#171814]">{tier.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#65665e]">{tier.tagline}</p>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#55564f]">
                {tier.deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href="#contact" className="inline-flex w-fit items-center gap-2 text-xs font-medium text-[#171814] hover:text-[#877100]">
                {tier.cta} <ArrowUpRight size={14} />
              </a>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#77786f]">
          Chưa rõ hướng phù hợp? <a href="mailto:bananagroup3108@gmail.com" className="text-[#171814] underline underline-offset-4">Hãy kể cho chúng tôi nghe.</a>
        </p>
      </div>
    </section>
  );
}
