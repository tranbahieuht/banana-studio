"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useDesktopMotion } from "@/lib/useDesktopMotion";

const LAYERS = [
  { code: "01", name: "UI", label: "Giao diện", note: "Điểm chạm người dùng nhìn thấy và sử dụng." },
  { code: "02", name: "API", label: "Logic", note: "Kết nối luồng thao tác với các phần của hệ thống." },
  { code: "03", name: "DATA", label: "Dữ liệu", note: "Giữ thông tin có cấu trúc và ngữ cảnh." },
  { code: "04", name: "AI", label: "Hỗ trợ thông minh", note: "Tăng cường khả năng sản phẩm khi có ích." },
  { code: "05", name: "INFRA", label: "Nền tảng", note: "Phần nền giúp các lớp phối hợp ổn định." },
];

const ASSEMBLY_STAGES = ["LAYERS ALIGN", "CONNECTIONS DRAW", "INTERFACE FORMS", "PRODUCT READY"];

export default function DigitalBlueprint() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [assemblyStage, setAssemblyStage] = useState(0);
  const reduceMotion = useReducedMotion();
  const desktopMotion = useDesktopMotion();
  const scrollLinked = desktopMotion && !reduceMotion;
  const displayStage = scrollLinked ? assemblyStage : ASSEMBLY_STAGES.length - 1;
  const current = LAYERS[activeLayer] ?? LAYERS[0];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!scrollLinked) return;
    const nextStage = progress < 0.2 ? 0 : progress < 0.43 ? 1 : progress < 0.72 ? 2 : 3;
    setAssemblyStage((currentStage) => currentStage === nextStage ? currentStage : nextStage);
  });

  return (
    <section
      id="blueprint"
      ref={sectionRef}
      className={`blueprint-section overflow-clip px-5 sm:px-8 lg:px-14 ${scrollLinked ? "py-20 md:min-h-[190svh] md:py-0" : "py-20 lg:py-24"}`}
      aria-labelledby="blueprint-title"
    >
      <div className={`mx-auto max-w-[1440px] ${scrollLinked ? "md:sticky md:top-[70px] md:flex md:min-h-[calc(100svh-70px)] md:flex-col md:justify-center md:py-12" : ""}`}>
        <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="blueprint-accent mb-4 text-[10px] font-mono uppercase tracking-[0.18em]">07 / Product philosophy</p>
            <h2 id="blueprint-title" className="max-w-3xl text-[clamp(2.7rem,6.4vw,6rem)] font-medium leading-[0.92] tracking-[-0.075em] text-[#171814]">
              Giao diện là
              <br />
              phần mở đầu.
            </h2>
          </div>
          <p className="blueprint-copy max-w-sm text-sm leading-relaxed">
            Một sản phẩm có chủ đích được ghép từ nhiều lớp. Cuộn để thấy chúng kết nối thành một trải nghiệm; chọn từng lớp để khám phá vai trò của nó.
          </p>
        </div>

        <div className="grid gap-8 border-t border-[#171814]/25 pt-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="divide-y divide-[#171814]/20">
            {LAYERS.map((layer, index) => (
              <button
                key={layer.code}
                type="button"
                onMouseEnter={() => setActiveLayer(index)}
                onFocus={() => setActiveLayer(index)}
                onClick={() => setActiveLayer(index)}
                aria-pressed={activeLayer === index}
                data-cursor="explore"
                className="group flex w-full items-center gap-4 py-3.5 text-left sm:py-4"
              >
                <span className="blueprint-accent w-7 font-mono text-[10px]">{layer.code}</span>
                <span className={`flex-1 text-xl font-medium tracking-[-0.04em] transition-transform group-hover:translate-x-1 ${activeLayer === index ? "text-[#171814]" : "text-[#55513a]"}`}>
                  {layer.label}
                </span>
                <span className="blueprint-copy font-mono text-[9px] tracking-[0.1em]">{layer.name}</span>
                <ArrowUpRight size={14} className={activeLayer === index ? "text-[#171814]" : "text-[#6c674a]"} />
              </button>
            ))}
          </div>

          <div className="blueprint-board relative flex min-h-[340px] flex-col justify-between overflow-hidden border p-4 sm:min-h-[390px] sm:p-6">
            <div className="flex items-center justify-between border-b border-[#171814]/20 pb-3 text-[8px] font-mono uppercase tracking-[0.14em] text-[#514900]">
              <span>Product system / assembly</span>
              <span className="blueprint-stage-label">{ASSEMBLY_STAGES[displayStage]} / 0{displayStage + 1}</span>
            </div>

            <div className="blueprint-assembly relative mx-auto my-5 flex w-full max-w-[640px] flex-1 flex-col items-center justify-center gap-2.5 sm:my-6 sm:gap-3.5">
              <AssemblySpine progress={scrollYProgress} scrollLinked={scrollLinked} />
              {LAYERS.map((layer, index) => (
                <div key={layer.code} className="relative z-10 flex w-full flex-col items-center">
                  <BlueprintPiece
                    layer={layer}
                    index={index}
                    active={activeLayer === index}
                    progress={scrollYProgress}
                    scrollLinked={scrollLinked}
                  />
                  {index < LAYERS.length - 1 && (
                    <BlueprintRule progress={scrollYProgress} active={activeLayer === index || activeLayer === index + 1} scrollLinked={scrollLinked} />
                  )}
                </div>
              ))}
              <motion.div
                aria-hidden="true"
                className="blueprint-piece absolute -right-1 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border text-[8px] font-mono sm:flex"
                animate={{ rotate: activeLayer % 2 ? 45 : 0, y: activeLayer * 4 - 8 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              >
                INPUT
              </motion.div>
              <ProductPreview progress={scrollYProgress} scrollLinked={scrollLinked} />
            </div>

            <div aria-live="polite" className="flex flex-col justify-between gap-3 border-t border-[#171814]/20 pt-3 sm:flex-row sm:items-end sm:pt-4">
              <div>
                <span className="blueprint-accent text-[9px] font-mono uppercase tracking-[0.14em]">LỚP {current.code} / {current.name}</span>
                <h3 className="mt-1 text-lg font-medium text-[#171814]">{current.label}</h3>
              </div>
              <p className="blueprint-copy max-w-xs text-xs leading-relaxed">{current.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssemblySpine({ progress, scrollLinked }: { progress: MotionValue<number>; scrollLinked: boolean }) {
  const pathLength = useTransform(progress, [0.06, 0.46], [0, 1]);
  const opacity = useTransform(progress, [0.05, 0.24], [0.25, 0.65]);

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" viewBox="0 0 640 260" preserveAspectRatio="none">
      <motion.path
        d="M320 0 L320 260"
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="1"
        pathLength={scrollLinked ? pathLength : 1}
        style={{ opacity: scrollLinked ? opacity : 0.55 }}
      />
    </svg>
  );
}

function BlueprintPiece({
  layer,
  index,
  active,
  progress,
  scrollLinked,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  active: boolean;
  progress: MotionValue<number>;
  scrollLinked: boolean;
}) {
  const x = useTransform(progress, [0, 0.46], [index % 2 === 0 ? -86 : 86, 0]);
  const y = useTransform(progress, [0, 0.46], [index % 2 === 0 ? -20 : 20, 0]);
  const opacity = useTransform(progress, [0.7, 0.92], [1, 0.08]);

  return (
    <motion.div
      style={scrollLinked ? { x, y, opacity } : undefined}
      className={`blueprint-piece flex w-full items-center justify-between border px-3.5 py-2 sm:px-5 sm:py-2.5 ${active ? "is-active" : ""}`}
    >
      <span className="font-mono text-[9px] tracking-[0.15em]">{layer.name}</span>
      <span className="text-xs">{layer.label}</span>
      <span className="font-mono text-[9px]">{layer.code}</span>
    </motion.div>
  );
}

function BlueprintRule({ progress, active, scrollLinked }: { progress: MotionValue<number>; active: boolean; scrollLinked: boolean }) {
  const scaleY = useTransform(progress, [0.08, 0.46], [0.18, 1]);

  return (
    <div className="blueprint-rule relative h-2.5 w-px" aria-hidden="true">
      <motion.span
        className="blueprint-accent-bar absolute left-0 top-0 h-full w-px origin-top"
        style={{ scaleY: scrollLinked ? scaleY : active ? 1 : 0.3 }}
      />
    </div>
  );
}

function ProductPreview({ progress, scrollLinked }: { progress: MotionValue<number>; scrollLinked: boolean }) {
  const opacity = useTransform(progress, [0.36, 0.78, 0.9], [0, 1, 1]);
  const clipPath = useTransform(progress, [0.36, 0.78], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const y = useTransform(progress, [0.36, 0.78], [18, 0]);

  return (
    <motion.div
      aria-hidden="true"
      style={scrollLinked ? { opacity, clipPath, y } : undefined}
      className={`blueprint-product z-20 w-full max-w-[640px] overflow-hidden border ${scrollLinked ? "absolute inset-x-[5%] inset-y-[3%] mt-0 md:w-[90%] md:max-w-none" : "relative mt-5"}`}
    >
      <div className="flex items-center justify-between border-b px-3 py-2 font-mono text-[7px] uppercase tracking-[0.14em] sm:px-4 sm:text-[8px]">
        <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#d8bf20]" /> Banana / product preview</span>
        <span>LIVE SYSTEM · 2026</span>
      </div>
      <div className="grid min-h-[142px] grid-cols-[1.05fr_0.95fr] gap-3 p-3 sm:min-h-[150px] sm:gap-5 sm:p-5">
        <div className="flex flex-col justify-between py-1">
          <div>
            <span className="blueprint-accent text-[7px] font-mono uppercase tracking-[0.14em] sm:text-[8px]">One idea, connected</span>
            <h4 className="mt-2 max-w-[250px] text-[clamp(1.2rem,2.5vw,2.2rem)] font-medium leading-[0.94] tracking-[-0.06em]">Một ý tưởng<br />thành hình.</h4>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="max-w-[180px] text-[8px] leading-relaxed text-[var(--foreground-muted)] sm:text-[9px]">Giao diện, dữ liệu và logic cùng tạo nên một trải nghiệm hoàn chỉnh.</p>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#f0db3b] text-[#171814]"><ArrowUpRight size={13} /></span>
          </div>
        </div>
        <div className="blueprint-product-visual relative overflow-hidden border">
          <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(to right, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
          <div className="absolute inset-[14%] grid grid-cols-2 gap-2">
            <span className="border bg-[var(--surface)]" />
            <span className="border bg-[#f0db3b]/80" />
            <span className="border bg-[var(--surface)]" />
            <span className="border bg-[var(--surface-alt)]" />
          </div>
          <span className="absolute bottom-2 right-2 font-mono text-[7px] text-[var(--foreground-muted)]">INTERFACE / 01</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-3 py-2 font-mono text-[7px] uppercase tracking-[0.12em] text-[var(--foreground-muted)] sm:px-4">
        <span>UI + API + DATA + AI + INFRA</span><span>ASSEMBLY COMPLETE</span>
      </div>
    </motion.div>
  );
}
