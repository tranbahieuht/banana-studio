"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function StoryChapter({
  number,
  eyebrow,
  title,
  body,
  index,
}: {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="grid min-h-[60svh] items-center gap-10 border-t border-[#d8d8d0] py-16 lg:grid-cols-2 lg:gap-20 lg:py-24"
      aria-labelledby={`chapter-${number}`}
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={index % 2 === 1 ? "lg:order-2" : ""}
      >
        <p         className="mb-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#877100]">
          <span>{number}</span>
          <span className="h-px w-8 bg-[#e5cc00]" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={`chapter-${number}`} className="max-w-xl text-3xl font-medium leading-[1.15] tracking-tight text-[#171814] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#65665e] sm:text-base">{body}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reduceMotion ? 0 : index % 2 === 0 ? 16 : -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduceMotion ? 0.01 : 0.75, delay: reduceMotion ? 0 : 0.12 }}
        className={`relative flex aspect-[1.2/1] items-center justify-center overflow-hidden border border-[#d8d8d0] bg-[#f1f1eb] p-8 ${
          index % 2 === 1 ? "lg:order-1" : ""
        }`}
        aria-hidden="true"
      >
        {index === 0 ? (
          <div className="relative flex w-full max-w-sm flex-col items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#65665e]">
              CÂU HỎI KHỞI ĐẦU
            </span>
            <span className="h-px w-full bg-[#deded6]" />
            <span className="max-w-xs text-center text-xl font-medium text-[#171814]">
              Mục đích
              <br />
              <span className="text-[#877100]">trước giao diện</span>
            </span>
            <span className="h-px w-2/3 bg-[#deded6]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#77786f]">
              NGƯỜI DÙNG / BỐI CẢNH / NHU CẦU
            </span>
          </div>
        ) : index === 1 ? (
          <div className="relative grid w-full max-w-sm grid-cols-2 gap-3">
            {["Nhu cầu", "Cấu trúc", "Nội dung", "Tương tác"].map((item, itemIndex) => (
              <motion.div
                key={item}
                initial={{ opacity: 0.35, y: reduceMotion ? 0 : 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : 0.15 + itemIndex * 0.08 }}
                className="flex min-h-20 items-center justify-center border border-[#d8d8d0] bg-white text-xs font-mono uppercase tracking-[0.12em] text-[#55564f]"
              >
                {item}
              </motion.div>
            ))}
            <span className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#e5cc00]/70" />
            <span className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#e5cc00]/70" />
          </div>
        ) : (
          <div className="relative w-full max-w-sm space-y-3">
            {["Trải nghiệm", "Ngữ cảnh", "Cấu trúc", "Điểm chạm"].map((item, itemIndex) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : 0.12 + itemIndex * 0.1 }}
                className="flex items-center gap-4 border border-[#d8d8d0] bg-white px-4 py-3"
              >
                <span className="h-2 w-2 shrink-0 bg-[#e5cc00]" />
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-[#55564f]">{item}</span>
                <span className="h-px flex-1 bg-[#e0e0d9]" />
                <span className="text-[9px] text-[#77786f]">0{itemIndex + 1}</span>
              </motion.div>
            ))}
          </div>
        )}
        <span className="absolute bottom-4 right-4 text-[8px] font-mono tracking-[0.15em] text-[#77786f]">
          BẢN CONCEPT
        </span>
      </motion.div>
    </section>
  );
}
