"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { WHY_US } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STACK_LAYERS = [
  {
    level: "01",
    name: "Khung ứng dụng",
    category: "NỀN TẢNG",
    techs: ["Next.js"],
    rationale: "Tổ chức trang, định tuyến và những phần giao diện được kết xuất trên máy chủ.",
  },
  {
    level: "02",
    name: "Giao diện",
    category: "THÀNH PHẦN",
    techs: ["React"],
    rationale: "Ghép trải nghiệm thành các thành phần có thể tái sử dụng và tương tác.",
  },
  {
    level: "03",
    name: "Kiểu dữ liệu",
    category: "TÍNH NHẤT QUÁN",
    techs: ["TypeScript"],
    rationale: "Giúp cấu trúc dữ liệu và hợp đồng giữa các phần trong mã nguồn rõ ràng hơn.",
  },
  {
    level: "04",
    name: "Trình bày",
    category: "HỆ THỐNG THỊ GIÁC",
    techs: ["Tailwind CSS"],
    rationale: "Xây dựng các quy tắc bố cục, màu sắc và khoảng cách cho giao diện.",
  },
  {
    level: "05",
    name: "Chuyển động",
    category: "TƯƠNG TÁC",
    techs: ["Framer Motion"],
    rationale: "Dùng chuyển động để phản hồi thao tác và dẫn dắt nhịp khám phá.",
  },
];

export default function About() {
  const [activeLayer, setActiveLayer] = useState(0);
  const reduceMotion = useReducedMotion();
  const currentLayer = STACK_LAYERS[activeLayer] ?? STACK_LAYERS[0];

  return (
    <section id="about" className="section-divider bg-[#080808] py-24 lg:py-40" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.24em] text-[#d4af37]">
              VỀ BANANA STUDIO
            </p>
            <h2 id="about-title" className="text-display text-[#f3efe6]">
              Thiết kế
              <br />
              gặp <span className="text-gold">kỹ thuật.</span>
            </h2>
            <div className="mt-7 max-w-lg space-y-4 text-sm leading-relaxed text-[#8e8a83] sm:text-base">
              <p>
                Banana Studio kết nối thiết kế, sản phẩm và kỹ thuật trong cùng một trải nghiệm số.
              </p>
              <p>
                Không bắt đầu bằng hiệu ứng hay danh sách tính năng. Bắt đầu bằng câu hỏi: điều gì
                sẽ khiến sản phẩm này hữu ích hơn?
              </p>
            </div>
          </div>

          <div className="grid content-start gap-0 border-y border-white/[0.08]">
            {WHY_US.slice(0, 4).map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, delay: reduceMotion ? 0 : index * 0.07 }}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/[0.08] py-5 last:border-b-0 sm:py-6"
              >
                <span className="pt-1 font-mono text-[10px] text-[#d4af37]">0{index + 1}</span>
                <div>
                  <h3 className="text-base font-medium text-[#f3efe6]">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#8e8a83]">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="stack" className="mt-24 border-t border-white/[0.08] pt-12 lg:mt-36 lg:pt-16">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.22em] text-[#d4af37]">
                HỆ THỐNG CÔNG NGHỆ
              </p>
              <h3 className="text-3xl font-medium tracking-tight text-[#f3efe6] sm:text-4xl">
                Những lớp tạo nên trang này.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#8e8a83] md:text-right">
              Chỉ những công nghệ đang được dùng trong website mới xuất hiện ở đây.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-2">
              {STACK_LAYERS.map((layer, index) => {
                const active = activeLayer === index;
                return (
                  <button
                    key={layer.level}
                    type="button"
                    onMouseEnter={() => setActiveLayer(index)}
                    onFocus={() => setActiveLayer(index)}
                    onClick={() => setActiveLayer(index)}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-4 border px-4 py-4 text-left transition-colors ${
                      active
                        ? "border-[#d4af37]/35 bg-[#11100d]"
                        : "border-white/[0.06] bg-transparent hover:border-white/[0.14]"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#d4af37]">{layer.level}</span>
                    <span className="flex-1">
                      <span className={`block text-sm font-medium ${active ? "text-[#f3efe6]" : "text-[#8e8a83]"}`}>
                        {layer.name}
                      </span>
                      <span className="mt-1 block text-[9px] font-mono tracking-[0.15em] text-[#4e4a44]">
                        {layer.category}
                      </span>
                    </span>
                    <ArrowDownRight
                      size={15}
                      className={`transition-transform ${active ? "rotate-[-45deg] text-[#d4af37]" : "text-[#4e4a44]"}`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-64 overflow-hidden border border-white/[0.08] bg-[#0c0b0a] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.12]" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLayer.level}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
                  className="relative flex h-full min-h-48 flex-col justify-between"
                  aria-live="polite"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8e8a83]">
                    LỚP {currentLayer.level} / {currentLayer.category}
                  </span>
                  <div className="my-8">
                    <h4 className="text-2xl font-medium text-[#f3efe6]">{currentLayer.name}</h4>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8e8a83]">
                      {currentLayer.rationale}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentLayer.techs.map((tech) => (
                      <span key={tech} className="border border-[#d4af37]/25 bg-black/40 px-3 py-1.5 text-xs font-mono text-[#f5e6b3]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
