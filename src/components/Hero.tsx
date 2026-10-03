"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Layers3, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";

const galleryViews = [
  { id: "structure", label: "01 / CẤU TRÚC", title: "Ít hơn, nhưng", secondLine: "có lý do.", note: "Một hệ thống rõ ràng cho những ý tưởng đang thành hình." },
  { id: "interface", label: "02 / GIAO DIỆN", title: "Đẹp để", secondLine: "dễ dùng.", note: "Mỗi điểm chạm mở ra một bước tiếp theo thật tự nhiên." },
  { id: "flow", label: "03 / TƯƠNG TÁC", title: "Mọi thứ", secondLine: "liên kết.", note: "Thiết kế và công nghệ cùng kể một câu chuyện." },
] as const;

export default function Hero() {
  const [activeView, setActiveView] = useState(0);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { damping: 28, stiffness: 110, mass: 0.45 });
  const smoothY = useSpring(pointerY, { damping: 28, stiffness: 110, mass: 0.45 });
  const currentView = galleryViews[activeView];

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 10);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 7);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="home-hero relative overflow-hidden px-5 pb-10 pt-[88px] sm:px-8 lg:px-14 lg:pb-12 lg:pt-[112px]" aria-labelledby="hero-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="hero-meta flex items-center justify-between border-b pb-3 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]">
          <span className="flex items-center gap-2"><i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d8bf20]" />Digital product studio / Việt Nam</span>
          <span className="hidden sm:block">Independent by design · 2026</span>
          <span className="hidden md:block">Design × Code × AI</span>
        </div>

        <div className="hero-layout grid items-center gap-5 py-8 sm:gap-8 sm:py-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-4 lg:py-8">
          <div className="relative z-10 max-w-[590px]">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#877100] sm:text-[10px]"
            >
              <span aria-hidden="true" className="h-px w-7 bg-[#d8bf20]" />
              Từ ý tưởng đến trải nghiệm
            </motion.p>
            <h1 id="hero-title" className="hero-title text-[clamp(3.35rem,7.2vw,7rem)] font-medium leading-[0.89] tracking-[-0.085em]">
              <span className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" initial={reduceMotion ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}>Ý tưởng</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.04em] pl-[0.38em]">
                <motion.span className="block" initial={reduceMotion ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}>xứng đáng</motion.span>
              </span>
              <span className="hero-title-accent block overflow-hidden pb-[0.04em]">
                <motion.span className="block" initial={reduceMotion ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}>thành hình.</motion.span>
              </span>
            </h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.46, delay: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[390px] text-sm leading-relaxed text-[#65665e] sm:mt-7 sm:text-base"
            >
              Banana Studio kết nối thiết kế, công nghệ và sự tò mò để tạo nên những sản phẩm số có ích — và có cá tính.
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8"
            >
              <Link href="#work" data-cursor="view" className="hero-primary group inline-flex items-center gap-3 px-4 py-3 text-xs font-medium">
                Khám phá concept <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#contact" className="hero-secondary group inline-flex items-center gap-2 border-b pb-1.5 text-xs font-medium">
                Bắt đầu cuộc trò chuyện <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35, delay: reduceMotion ? 0 : 0.78 }}
              className="mt-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#77786f] sm:mt-11"
            >
              <span className="flex h-7 w-7 items-center justify-center border border-[#d8d8d0] text-[#877100]">01</span>
              <span>Thiết kế · Xây dựng · Tiếp tục</span>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12, clipPath: "inset(8% 0 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: reduceMotion ? 0.01 : 0.76, delay: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="hero-gallery relative min-w-0"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <div className="gallery-caption mb-2 flex items-center justify-between px-1 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
              <span>Không gian thử nghiệm / 001</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#c7a900]" />Concept in progress</span>
            </div>

            <div className="gallery-stage relative mx-auto w-full max-w-[780px]" role="group" aria-label="Một giao diện sản phẩm số đang được tạo thành">
              <div className="gallery-crosshair gallery-crosshair-top" aria-hidden="true" />
              <div className="gallery-crosshair gallery-crosshair-bottom" aria-hidden="true" />

              <motion.div className="gallery-window" style={reduceMotion ? undefined : { x: smoothX, y: smoothY }}>
                <div className="gallery-windowbar flex items-center justify-between border-b px-3 py-2 sm:px-4 sm:py-2.5">
                  <div className="flex items-center gap-1.5" aria-hidden="true"><i /><i /><i /></div>
                  <span className="font-mono text-[8px] tracking-[0.12em] sm:text-[9px]">FIELDNOTES / PRODUCT STUDY</span>
                  <span className="font-mono text-[8px] sm:text-[9px]">↗</span>
                </div>

                <div className="gallery-windowbody grid min-h-[258px] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] sm:min-h-[330px]">
                  <div className="gallery-copy flex flex-col justify-between p-3.5 sm:p-6 lg:p-7">
                    <div>
                      <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.16em] sm:text-[8px]">
                        <span>Digital objects / 2026</span><span>01—03</span>
                      </div>
                      <motion.div key={currentView.id} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.28 }} className="mt-7 sm:mt-11">
                        <p className="max-w-[330px] text-[clamp(1.35rem,3vw,3.2rem)] font-medium leading-[0.94] tracking-[-0.07em]">
                          {currentView.title}<br /><span className="gallery-accent">{currentView.secondLine}</span>
                        </p>
                        <p className="mt-3 max-w-[240px] text-[9px] leading-relaxed sm:mt-4 sm:text-[11px]">{currentView.note}</p>
                      </motion.div>
                    </div>
                    <div className="mt-4 flex items-end justify-between border-t pt-3 sm:pt-4">
                      <span className="font-mono text-[7px] uppercase tracking-[0.13em] sm:text-[8px]">Fieldnotes / interface study</span>
                      <span className="flex h-7 w-7 items-center justify-center bg-[#f0db3b] text-[#171814] sm:h-9 sm:w-9"><MoveUpRight size={15} /></span>
                    </div>
                  </div>

                  <div className="gallery-art relative m-2.5 overflow-hidden sm:m-4">
                    <div className="gallery-art-grid absolute inset-0" aria-hidden="true" />
                    <div className="gallery-art-label absolute left-3 top-3 z-10 font-mono text-[7px] uppercase tracking-[0.16em] sm:left-4 sm:top-4 sm:text-[8px]">Object / {String(activeView + 1).padStart(2, "0")}</div>
                    <div className={`gallery-object gallery-object-${activeView + 1}`} aria-hidden="true">
                      <span className="gallery-object-shape" />
                      <span className="gallery-object-cut" />
                      <span className="gallery-object-line" />
                    </div>
                    <div className="gallery-art-index absolute bottom-3 left-3 right-3 flex items-end justify-between border-t pt-2 font-mono text-[7px] uppercase tracking-[0.12em] sm:bottom-4 sm:left-4 sm:right-4 sm:pt-3 sm:text-[8px]">
                      <span>Form / function</span><span>01 — 03</span>
                    </div>
                  </div>
                </div>

                <div className="gallery-tabs flex items-center justify-between border-t px-3 py-2 sm:px-4">
                  <span className="hidden font-mono text-[8px] uppercase tracking-[0.14em] sm:block">Explore the system</span>
                  <div className="flex flex-1 justify-end gap-1.5 sm:flex-none sm:gap-2" role="tablist" aria-label="Chọn lớp giao diện">
                    {galleryViews.map((view, index) => (
                      <button key={view.id} type="button" role="tab" aria-selected={activeView === index} onClick={() => setActiveView(index)} className={`gallery-tab px-2 py-1.5 font-mono text-[7px] tracking-[0.08em] sm:px-2.5 sm:text-[8px] ${activeView === index ? "is-active" : ""}`}>
                        {view.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="gallery-note gallery-note-top absolute right-[-1%] top-[4%] z-20 hidden w-[150px] border p-3 sm:block lg:right-[-3%] lg:w-[170px] lg:p-3.5">
                <span className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.14em]"><Layers3 size={12} /> Layers / 03</span>
                <span className="mt-2 block border-t pt-2 font-mono text-[8px] leading-relaxed">interface.tsx<br />experience.css<br />product.flow</span>
              </div>

              <div className="gallery-note gallery-note-bottom absolute bottom-[3%] right-[-1%] z-20 hidden w-[142px] border p-3 sm:block lg:right-[-2%] lg:w-[158px]">
                <span className="block font-mono text-[7px] uppercase tracking-[0.14em]">Build status</span>
                <span className="mt-2 flex items-center justify-between border-t pt-2 font-mono text-[8px]"><span>UI → SYSTEM</span><span className="text-[#897300]">READY</span></span>
              </div>

              <div className="gallery-index absolute bottom-[14%] left-[-1%] z-20 hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] sm:flex lg:left-[-3%]">
                <span className="flex h-7 w-7 items-center justify-center border bg-[var(--surface)]">A</span>
                <span>One idea, many layers</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-footer flex items-center justify-between border-t pt-3 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
          <span className="hidden sm:block">Digital products shaped with intent.</span>
          <Link href="#statement" className="group inline-flex items-center gap-2">Cuộn để khám phá <ArrowDown size={13} className="transition-transform group-hover:translate-y-1" /></Link>
          <span className="hidden sm:block">01 / 08</span>
        </div>
      </div>
    </section>
  );
}
