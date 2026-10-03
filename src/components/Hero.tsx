"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Braces, Check, CircleDot, Database, Layers3, Workflow, WandSparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const modules = [
  { id: "interface", index: "01", name: "Giao diện", key: "GIAO_DIEN", detail: "Nơi sản phẩm gặp người dùng.", icon: <Layers3 size={16} strokeWidth={1.5} /> },
  { id: "logic", index: "02", name: "Logic", key: "LOGIC", detail: "Quy tắc làm nên hành vi.", icon: <Workflow size={16} strokeWidth={1.5} /> },
  { id: "data", index: "03", name: "Dữ liệu", key: "DU_LIEU", detail: "Thông tin giữ ngữ cảnh.", icon: <Database size={16} strokeWidth={1.5} /> },
  { id: "api", index: "04", name: "API", key: "API", detail: "Các hệ thống trao đổi với nhau.", icon: <Braces size={16} strokeWidth={1.5} /> },
  { id: "ai", index: "05", name: "AI", key: "AI", detail: "Khả năng thông minh khi hữu ích.", icon: <WandSparkles size={16} strokeWidth={1.5} /> },
  { id: "product", index: "06", name: "Sản phẩm", key: "SAN_PHAM", detail: "Mọi lớp cùng tạo nên giá trị.", icon: <ArrowUpRight size={16} strokeWidth={1.5} /> },
] as const;

type ModuleId = (typeof modules)[number]["id"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const boardInView = useInView(boardRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<ModuleId>("product");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { damping: 30, stiffness: 75, mass: 0.55 });
  const parallaxY = useSpring(pointerY, { damping: 30, stiffness: 75, mass: 0.55 });
  const active = modules.find((module) => module.id === activeId) ?? modules[5];

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 4);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 3);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

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

        <div className="hero-layout grid items-center gap-8 py-9 sm:gap-10 sm:py-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8 lg:py-10">
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

          <motion.div
            ref={boardRef}
            initial={reduceMotion ? false : { opacity: 0, y: 12, clipPath: "inset(6% 0 0 0)" }}
            animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="hero-architecture relative min-w-0"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <div className="architecture-caption mb-2 flex items-center justify-between px-1 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
              <span>Kiến trúc sản phẩm / 01</span>
              <span className="inline-flex items-center gap-2"><i aria-hidden="true" className="architecture-live-dot h-1.5 w-1.5 rounded-full" />Mô hình minh họa</span>
            </div>

            <div className="architecture-board relative" role="group" aria-label="Sơ đồ các thành phần của một sản phẩm số">
              <div aria-hidden="true" className="architecture-corner architecture-corner-tl" />
              <div aria-hidden="true" className="architecture-corner architecture-corner-br" />
              <span aria-hidden="true" className="architecture-coordinate architecture-coordinate-tl">LƯỚI 12 × 08</span>
              <span aria-hidden="true" className="architecture-coordinate architecture-coordinate-br">6 THÀNH PHẦN</span>

              <motion.div className="architecture-parallax absolute inset-0" style={reduceMotion ? undefined : { x: parallaxX, y: parallaxY }}>
                <svg aria-hidden="true" className="architecture-lines architecture-lines-desktop absolute inset-0 h-full w-full" viewBox="0 0 700 560" preserveAspectRatio="none">
                  <ArchitecturePath d="M217 126 C280 126 420 126 483 126" active={activeId === "interface" || activeId === "logic"} inView={boardInView} delay={0.04} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M217 278 C280 278 420 278 483 278" active={activeId === "data" || activeId === "api"} inView={boardInView} delay={0.13} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M217 384 C280 384 420 384 483 384" active={activeId === "ai" || activeId === "product"} inView={boardInView} delay={0.22} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M140 170 C140 205 140 226 140 234" active={activeId === "interface" || activeId === "data"} inView={boardInView} delay={0.3} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M560 170 C560 205 560 226 560 234" active={activeId === "logic" || activeId === "api"} inView={boardInView} delay={0.38} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M140 322 C140 338 140 350 140 360" active={activeId === "data" || activeId === "ai"} inView={boardInView} delay={0.46} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M560 322 C560 338 560 350 560 360" active={activeId === "api" || activeId === "product"} inView={boardInView} delay={0.54} reduceMotion={reduceMotion} />
                  <ArchitectureGrid />
                </svg>

                <svg aria-hidden="true" className="architecture-lines architecture-lines-mobile absolute inset-0 h-full w-full" viewBox="0 0 400 620" preserveAspectRatio="none">
                  <ArchitecturePath d="M156 103 C184 103 214 103 244 103" active={activeId === "interface" || activeId === "logic"} inView={boardInView} delay={0.04} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M156 254 C184 254 214 254 244 254" active={activeId === "data" || activeId === "api"} inView={boardInView} delay={0.13} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M156 405 C184 405 214 405 244 405" active={activeId === "ai" || activeId === "product"} inView={boardInView} delay={0.22} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M100 140 C100 178 100 200 100 216" active={activeId === "interface" || activeId === "data"} inView={boardInView} delay={0.3} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M300 140 C300 178 300 200 300 216" active={activeId === "logic" || activeId === "api"} inView={boardInView} delay={0.38} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M100 291 C100 329 100 351 100 367" active={activeId === "data" || activeId === "ai"} inView={boardInView} delay={0.46} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M300 291 C300 329 300 351 300 367" active={activeId === "api" || activeId === "product"} inView={boardInView} delay={0.54} reduceMotion={reduceMotion} />
                  <ArchitectureGrid mobile />
                </svg>

                {modules.map((module, index) => (
                  <ArchitectureNode
                    key={module.id}
                    module={module}
                    index={index}
                    active={activeId === module.id}
                    onSelect={setActiveId}
                    inView={boardInView}
                    reduceMotion={reduceMotion}
                  />
                ))}

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" }}
                  animate={boardInView ? { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } : {}}
                  transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
                  className="architecture-code absolute"
                  role="group"
                  aria-label="Cửa sổ mã minh họa"
                >
                  <div className="architecture-code-bar flex items-center justify-between border-b px-3 py-2 font-mono text-[7px] uppercase tracking-[0.12em] sm:px-4 sm:text-[8px]">
                    <span className="flex items-center gap-2"><i aria-hidden="true" className="architecture-code-dot" />cau-truc-san-pham.ts</span>
                    <span>ĐANG XEM</span>
                  </div>
                  <pre className="overflow-hidden px-3 py-2 font-mono text-[6px] leading-[1.55] sm:px-3 sm:py-2 sm:text-[7px]"><code><span className="architecture-code-muted">01</span> <span className="architecture-code-key">const</span> sanPham = {'{'}<br /><span className="architecture-code-muted">02</span>   giaoDien: <span className="architecture-code-value">&quot;dễ dùng&quot;</span>,<br /><span className="architecture-code-muted">03</span>   duLieu: <span className="architecture-code-value">&quot;hữu ích&quot;</span>, ketNoi: <span className="architecture-code-value">&quot;linh hoạt&quot;</span><br /><span className="architecture-code-muted">04</span> {'}'};</code></pre>
                </motion.div>
              </motion.div>

              <div className="architecture-system absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 border-t pt-2.5 font-mono text-[6px] uppercase tracking-[0.11em] sm:bottom-4 sm:left-5 sm:right-5 sm:pt-3 sm:text-[8px]">
                <span className="flex min-w-0 items-center gap-1.5"><CircleDot size={10} className="shrink-0" /><span className="truncate">Thành phần / {active.name}</span></span>
                <span className="architecture-selected hidden min-w-0 items-center gap-1.5 text-right sm:flex"><Check size={10} />{active.detail}</span>
                <span className="shrink-0">Thông số minh họa</span>
              </div>
            </div>

            <p className="architecture-mobile-detail mt-3 min-h-8 text-[10px] leading-relaxed sm:hidden" aria-live="polite">
              <span className="font-mono uppercase tracking-[0.12em] text-[var(--accent-ink)]">{active.name} / </span>{active.detail}
            </p>
          </motion.div>
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

function ArchitecturePath({
  d,
  active,
  inView,
  delay,
  reduceMotion,
}: {
  d: string;
  active: boolean;
  inView: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.path
      d={d}
      initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.46 : 0 }}
      animate={inView ? { pathLength: 1, opacity: active ? 0.88 : 0.38 } : {}}
      transition={{ pathLength: { duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.24 } }}
      className={`architecture-connector ${active ? "is-active" : ""}`}
    />
  );
}

function ArchitectureGrid({ mobile = false }: { mobile?: boolean }) {
  const path = mobile
    ? "M0 155 H400 M0 310 H400 M0 465 H400 M200 0 V620"
    : "M0 140 H700 M0 280 H700 M0 420 H700 M140 0 V560 M280 0 V560 M420 0 V560 M560 0 V560";
  return <path d={path} className="architecture-grid-lines" />;
}

function ArchitectureNode({
  module,
  index,
  active,
  onSelect,
  inView,
  reduceMotion,
}: {
  module: (typeof modules)[number];
  index: number;
  active: boolean;
  onSelect: (id: ModuleId) => void;
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onMouseEnter={() => onSelect(module.id)}
      onFocus={() => onSelect(module.id)}
      onClick={() => onSelect(module.id)}
      initial={reduceMotion ? false : { opacity: 0, y: 7, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: reduceMotion ? 0 : 0.34, delay: reduceMotion ? 0 : 0.12 + index * 0.075, ease: [0.22, 1, 0.36, 1] }}
      className={`architecture-node architecture-node-${module.id} ${active ? "is-active" : ""}`}
    >
      <span className="architecture-node-top"><span>{module.index} / {module.key}</span><span className="architecture-node-icon">{module.icon}</span></span>
      <span className="architecture-node-name">{module.name}</span>
      <span className="architecture-node-state"><i aria-hidden="true" />{active ? "ĐANG CHỌN" : "ĐÃ KẾT NỐI"}</span>
    </motion.button>
  );
}
