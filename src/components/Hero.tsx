"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Check, CircleDot, Command, Layers3, MousePointer2 } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const modules = [
  { id: "idea", index: "01", name: "Ý tưởng", code: "DISCOVER", detail: "Tìm đúng câu hỏi trước khi chọn giải pháp." },
  { id: "experience", index: "02", name: "Trải nghiệm", code: "DESIGN", detail: "Biến nhu cầu thành một hành trình dễ hiểu." },
  { id: "technology", index: "03", name: "Công nghệ", code: "ENGINEER", detail: "Xây nền tảng vững, đủ linh hoạt để phát triển." },
  { id: "product", index: "04", name: "Sản phẩm", code: "SHIP / LEARN", detail: "Đưa ý tưởng vào đời sống và tiếp tục hoàn thiện." },
] as const;

type ModuleId = (typeof modules)[number]["id"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const diagramInView = useInView(diagramRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [activeModule, setActiveModule] = useState<ModuleId>("product");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { damping: 28, stiffness: 90, mass: 0.5 });
  const parallaxY = useSpring(pointerY, { damping: 28, stiffness: 90, mass: 0.5 });
  const active = modules.find((module) => module.id === activeModule) ?? modules[3];

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
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
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hero-meta flex items-center justify-between border-b pb-3 font-mono text-[9px] uppercase tracking-[0.15em] sm:text-[10px]"
        >
          <span className="flex items-center gap-2"><i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d8bf20]" />Digital product studio / Việt Nam</span>
          <span className="hidden sm:block">Independent by design · 2026</span>
          <span className="hidden md:block">Design × Code × Product</span>
        </motion.div>

        <div className="hero-layout grid items-center gap-8 py-9 sm:gap-10 sm:py-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8 lg:py-10">
          <div className="relative z-10 max-w-[610px]">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent-ink)] sm:text-[10px]"
            >
              <span aria-hidden="true" className="h-px w-7 bg-[#d8bf20]" />Từ câu hỏi đến sản phẩm
            </motion.p>

            <h1 id="hero-title" className="hero-title text-[clamp(3.15rem,7.2vw,7.25rem)] font-medium leading-[0.88] tracking-[-0.085em]">
              {["Ý tưởng tốt", "cần được", "làm thành."].map((line, index) => (
                <span key={line} className={`block overflow-hidden pb-[0.045em] ${index === 1 ? "pl-[0.34em]" : ""}`}>
                  <motion.span
                    className={`block ${index === 2 ? "hero-title-accent" : ""}`}
                    initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.15 + index * 0.11, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[430px] text-sm leading-relaxed text-[var(--foreground-muted)] sm:mt-7 sm:text-base"
            >
              Chúng tôi kết nối tư duy sản phẩm, thiết kế và công nghệ để tạo ra những trải nghiệm số hữu ích, có chiều sâu và có lý do để tồn tại.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8"
            >
              <Link href="#work" data-cursor="view" className="hero-primary group inline-flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-medium">
                Xem dự án <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="#contact" className="hero-secondary group inline-flex items-center gap-2 border-b pb-1.5 text-xs font-medium">
                Bắt đầu một ý tưởng <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.82 }}
              className="mt-9 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--foreground-muted)] sm:mt-11"
            >
              <span className="flex h-7 w-7 items-center justify-center border border-[var(--rule)] text-[var(--accent-ink)]">01</span>
              <span>Khám phá · Thiết kế · Phát triển</span>
            </motion.div>
          </div>

          <motion.div
            ref={diagramRef}
            initial={reduceMotion ? false : { opacity: 0, y: 14, clipPath: "inset(7% 0 0 0)" }}
            animate={inView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="hero-architecture relative min-w-0"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <div className="architecture-caption mb-2 flex items-center justify-between px-1 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
              <span>Product architecture / 001</span>
              <span className="inline-flex items-center gap-2"><i aria-hidden="true" className="architecture-live-dot h-1.5 w-1.5 rounded-full bg-[#b39a00]" />System active</span>
            </div>

            <div className="architecture-board relative" role="group" aria-label="Sơ đồ tương tác quy trình phát triển sản phẩm">
              <div aria-hidden="true" className="architecture-corner architecture-corner-tl" />
              <div aria-hidden="true" className="architecture-corner architecture-corner-br" />
              <span aria-hidden="true" className="architecture-coordinate architecture-coordinate-tl">X 024 · Y 108</span>
              <span aria-hidden="true" className="architecture-coordinate architecture-coordinate-br">FIG 01 / 04</span>

              <motion.div className="architecture-parallax absolute inset-0" style={reduceMotion ? undefined : { x: parallaxX, y: parallaxY }}>
                <svg aria-hidden="true" className="architecture-lines architecture-lines-desktop absolute inset-0 h-full w-full" viewBox="0 0 700 480" preserveAspectRatio="none">
                  <ArchitecturePath d="M170 132 C220 132 242 205 292 222" active={activeModule === "idea" || activeModule === "experience"} inView={diagramInView} delay={0.05} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M170 350 C228 350 240 258 292 238" active={activeModule === "technology" || activeModule === "experience"} inView={diagramInView} delay={0.16} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M402 230 C445 230 465 230 510 230" active={activeModule === "experience" || activeModule === "product"} inView={diagramInView} delay={0.27} reduceMotion={reduceMotion} />
                  <motion.path d="M555 186 C632 104 320 38 170 94" initial={{ pathLength: 0, opacity: 0 }} animate={diagramInView ? { pathLength: 1, opacity: 0.42 } : {}} transition={{ pathLength: { duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.42 }, opacity: { duration: 0.4 } }} className="architecture-feedback" />
                  <ArchitectureGrid />
                </svg>

                <svg aria-hidden="true" className="architecture-lines architecture-lines-mobile absolute inset-0 h-full w-full" viewBox="0 0 400 360" preserveAspectRatio="none">
                  <ArchitecturePath d="M145 82 C178 82 218 82 255 82" active={activeModule === "idea" || activeModule === "experience"} inView={diagramInView} delay={0.05} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M300 120 C300 157 300 195 300 232" active={activeModule === "experience" || activeModule === "product"} inView={diagramInView} delay={0.17} reduceMotion={reduceMotion} />
                  <ArchitecturePath d="M145 270 C180 270 218 270 255 270" active={activeModule === "technology" || activeModule === "product"} inView={diagramInView} delay={0.29} reduceMotion={reduceMotion} />
                  <ArchitectureGrid />
                </svg>

                <ArchitectureNode module={modules[0]} active={activeModule === "idea"} onSelect={setActiveModule} inView={diagramInView} reduceMotion={reduceMotion} />
                <ArchitectureNode module={modules[1]} active={activeModule === "experience"} onSelect={setActiveModule} inView={diagramInView} reduceMotion={reduceMotion} />
                <ArchitectureNode module={modules[2]} active={activeModule === "technology"} onSelect={setActiveModule} inView={diagramInView} reduceMotion={reduceMotion} />
                <ArchitectureNode module={modules[3]} active={activeModule === "product"} onSelect={setActiveModule} inView={diagramInView} reduceMotion={reduceMotion} />
              </motion.div>

              <div className="architecture-system absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 border-t pt-3 font-mono text-[7px] uppercase tracking-[0.12em] sm:bottom-5 sm:left-6 sm:right-6 sm:pt-4 sm:text-[8px]">
                <span className="flex min-w-0 items-center gap-2" aria-live="polite"><Command size={11} className="shrink-0" /><span className="truncate">MODULE / {active.code}</span></span>
                <span className="architecture-selected hidden min-w-0 items-center gap-1.5 text-right sm:flex"><Check size={11} />{active.detail}</span>
                <span className="flex shrink-0 items-center gap-1.5"><MousePointer2 size={11} />SELECT NODE</span>
              </div>
            </div>

            <p className="architecture-mobile-detail mt-3 min-h-9 text-[10px] leading-relaxed text-[var(--foreground-muted)] sm:hidden" aria-live="polite">
              <span className="font-mono uppercase tracking-[0.12em] text-[var(--accent-ink)]">{active.name} / </span>{active.detail}
            </p>
          </motion.div>
        </div>

        <div className="hero-footer flex items-center justify-between border-t pt-3 font-mono text-[8px] uppercase tracking-[0.14em] sm:text-[9px]">
          <span className="hidden sm:block">Digital products shaped with intent.</span>
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
      initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.45 : 0 }}
      animate={inView ? { pathLength: 1, opacity: active ? 0.88 : 0.34 } : {}}
      transition={{ pathLength: { duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
      className={`architecture-connector ${active ? "is-active" : ""}`}
    />
  );
}

function ArchitectureGrid() {
  return <path d="M0 120 H700 M0 240 H700 M0 360 H700 M140 0 V480 M280 0 V480 M420 0 V480 M560 0 V480" className="architecture-grid-lines" />;
}

function ArchitectureNode({
  module,
  active,
  onSelect,
  inView,
  reduceMotion,
}: {
  module: (typeof modules)[number];
  active: boolean;
  onSelect: (id: ModuleId) => void;
  inView: boolean;
  reduceMotion: boolean;
}) {
  const icons = {
    idea: <CircleDot size={16} strokeWidth={1.5} />,
    experience: <MousePointer2 size={16} strokeWidth={1.5} />,
    technology: <Layers3 size={16} strokeWidth={1.5} />,
    product: <ArrowUpRight size={16} strokeWidth={1.5} />,
  };

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onMouseEnter={() => onSelect(module.id)}
      onFocus={() => onSelect(module.id)}
      onClick={() => onSelect(module.id)}
      initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.15 + Number(module.index) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`architecture-node architecture-node-${module.id} ${active ? "is-active" : ""}`}
    >
      <span className="architecture-node-top"><span>{module.index} / {module.code}</span><span className="architecture-node-icon">{icons[module.id]}</span></span>
      <span className="architecture-node-name">{module.name}</span>
      <span className="architecture-node-state"><i aria-hidden="true" />{active ? "ACTIVE MODULE" : "CONNECTED"}</span>
    </motion.button>
  );
}
