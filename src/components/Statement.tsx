"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Statement() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="statement"
      className="overflow-hidden bg-[#f1f1eb] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"
      aria-labelledby="statement-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-10 text-[10px] font-mono uppercase tracking-[0.18em] text-[#77786f]">
          Một website chỉ là điểm bắt đầu
        </p>
        <h2 id="statement-title" className="max-w-6xl text-[clamp(2.7rem,7.3vw,7rem)] font-medium leading-[0.97] tracking-[-0.07em] text-[#181914]">
          {["Sản phẩm tốt", "làm được", "nhiều hơn", "thế."].map((line, index) => (
            <motion.span
              key={line}
              initial={reduceMotion ? false : { opacity: 0, y: "0.42em", clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.58, delay: reduceMotion ? 0 : index * 0.085, ease: [0.16, 1, 0.3, 1] }}
              className={`block overflow-hidden pb-[0.025em] ${index === 1 ? "pl-[0.6em]" : ""} ${index === 3 ? "text-[#958000]" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h2>
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-[#d3d3cb] pt-5 text-xs text-[#696a62] sm:flex-row">
          <span>LẮNG NGHE TRƯỚC KHI XÂY DỰNG</span>
          <span>RÕ RÀNG · CÓ CHỦ ĐÍCH · DỄ SỬ DỤNG</span>
        </div>
      </div>
    </section>
  );
}
