"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const principles = [
  {
    number: "01",
    label: "Khám phá",
    title: "Hiểu đúng vấn đề.",
    description: "Lắng nghe con người và bối cảnh trước khi quyết định nên xây điều gì.",
  },
  {
    number: "02",
    label: "Thiết kế",
    title: "Thiết kế trải nghiệm.",
    description: "Sắp xếp nội dung, tương tác và công nghệ thành một hành trình tự nhiên.",
  },
  {
    number: "03",
    label: "Phát triển",
    title: "Xây sản phẩm thực tế.",
    description: "Đưa giải pháp vào sử dụng với nền tảng đủ vững để tiếp tục phát triển.",
  },
];

export default function Statement() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="statement"
      className="statement-section overflow-hidden border-y border-[var(--rule)] bg-[var(--surface-alt)] px-5 py-16 text-[var(--foreground)] sm:px-8 sm:py-20 lg:px-14 lg:py-24"
      aria-labelledby="statement-title"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 grid gap-7 md:mb-14 md:grid-cols-[1.12fr_0.68fr] md:items-end md:gap-12 lg:mb-16"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-ink)] sm:text-[10px]">
              <span aria-hidden="true" className="h-px w-7 bg-[var(--banana)]" />MỘT WEBSITE CHỈ LÀ ĐIỂM BẮT ĐẦU
            </p>
            <h2 id="statement-title" className="max-w-4xl text-[clamp(2.6rem,6vw,5.8rem)] font-medium leading-[0.94] tracking-[-0.075em]">
              Sản phẩm số tốt
              <br className="hidden sm:block" />
              <span className="text-[var(--accent-ink)]">giải quyết việc thật.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-base md:pb-1">
            Giá trị không nằm ở giao diện đẹp đơn thuần. Nó đến từ việc hiểu đúng nhu cầu, tạo trải nghiệm rõ ràng và kết nối mọi thành phần thành một sản phẩm hữu ích.
          </p>
        </motion.div>

        <div className="grid border-y border-[var(--rule)] md:grid-cols-3 md:divide-x md:divide-[var(--rule)]">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: reduceMotion ? 0 : 0.44, delay: reduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative min-h-[205px] border-b border-[var(--rule)] py-6 last:border-b-0 sm:min-h-[220px] sm:py-7 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0 lg:min-h-[230px] lg:px-8 lg:py-8"
            >
              <div className="mb-8 flex items-center justify-between sm:mb-10">
                <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--accent-ink)]">{principle.number} / 03</span>
                <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
                  <i aria-hidden="true" className="statement-step-dot h-1.5 w-1.5 rounded-full" />{principle.label}
                </span>
              </div>
              <h3 className="max-w-[310px] text-[clamp(1.45rem,2.2vw,2rem)] font-medium leading-[1.05] tracking-[-0.055em]">
                {principle.title}
              </h3>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="max-w-[330px] text-xs leading-relaxed text-[var(--foreground-muted)] sm:text-sm">
                  {principle.description}
                </p>
                <span aria-hidden="true" className="statement-step-arrow mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--rule)] text-[var(--foreground-muted)] transition-all duration-200 group-hover:border-[var(--accent-ink)] group-hover:text-[var(--accent-ink)]">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.18 }}
          className="mt-5 flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.13em] text-[var(--foreground-muted)] sm:mt-6 sm:text-[9px]"
        >
          <span>Con người / Nhu cầu / Sản phẩm</span>
          <span className="hidden items-center gap-2 sm:flex"><span className="h-px w-8 bg-[var(--rule)]" /><span className="text-[var(--accent-ink)]">Từ ý tưởng đến giá trị</span><ArrowDownRight size={12} /></span>
          <span>Banana Studio</span>
        </motion.div>
      </div>
    </section>
  );
}
