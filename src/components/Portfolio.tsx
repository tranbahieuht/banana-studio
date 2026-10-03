"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useDesktopMotion } from "@/lib/useDesktopMotion";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const desktopMotion = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((PROJECTS.length - 1) / PROJECTS.length) * 100}%`]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(PROJECTS.length - 1, Math.round(progress * (PROJECTS.length - 1)));
    setActiveIndex((current) => current === index ? current : index);
  });

  const handleTrackScroll = () => {
    if (!trackRef.current || reduceMotion) return;
    const center = window.innerWidth / 2;
    const nearest = Array.from(trackRef.current.children).reduce(
      (best, child, index) => {
        const bounds = child.getBoundingClientRect();
        const distance = Math.abs(bounds.left + bounds.width / 2 - center);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setActiveIndex((current) => current === nearest.index ? current : nearest.index);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative bg-[#fafaf7] ${reduceMotion ? "py-20" : "py-20 md:min-h-[300svh] md:py-0"}`}
      aria-labelledby="work-title"
    >
      <div className={`${reduceMotion ? "justify-start gap-10 py-10" : "justify-between py-20 md:sticky md:top-0 md:min-h-[100svh] md:py-24"} flex flex-col overflow-hidden`}>
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#877100]">
                03 / Một vài hướng đang mở
              </p>
              <h2 id="work-title" className="text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.07em] text-[#171814]">
                Chúng tôi tạo ra
                <span className="text-[#968000]"> điều gì?</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#65665e] sm:text-right">
              Ba concept sản phẩm để khám phá cách một ý tưởng có thể thành trải nghiệm.
              <span className="block text-xs text-[#82837a]">Đây là concept, không phải dự án khách hàng.</span>
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 md:flex md:items-center">
          <motion.div
            ref={trackRef}
            style={{ x: desktopMotion && !reduceMotion ? x : 0 }}
            onScroll={handleTrackScroll}
            className={`flex ${reduceMotion ? "w-full flex-col items-stretch gap-10 overflow-visible" : "h-full items-center gap-0 overflow-x-auto overscroll-x-contain snap-x snap-mandatory md:w-[300vw] md:overflow-visible md:snap-none"}`}
          >
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                count={PROJECTS.length}
                progress={scrollYProgress}
                activeIndex={activeIndex}
                desktopMotion={desktopMotion}
                reduceMotion={reduceMotion}
              >
                <Link href={`/work/${project.id}`} data-cursor="view" className="group block" aria-label={`Khám phá concept ${project.title}`}>
                  <div
                    className="group/image relative flex aspect-[1.28/1] max-h-[54svh] min-h-[270px] items-center justify-center overflow-hidden border border-[#d7d7cf] bg-[#f0f0e9] sm:aspect-[1.8/1] md:aspect-[2.2/1]"
                    style={{ backgroundColor: index === 0 ? "#f0f0e9" : index === 1 ? "#edf3ef" : "#edf0f4" }}
                  >
                    <ProjectArt index={index} progress={scrollYProgress} desktopMotion={desktopMotion} reduceMotion={reduceMotion}>
                      <ConceptVisual index={index} />
                    </ProjectArt>
                    <span className="absolute left-4 top-4 z-10 text-[10px] font-mono tracking-[0.16em] text-[#52534d] sm:left-7 sm:top-7">
                      CONCEPT / {project.number}
                    </span>
                    <span className="absolute bottom-4 right-4 z-10 text-[9px] font-mono uppercase tracking-[0.14em] text-[#686960] sm:bottom-7 sm:right-7">
                      {project.category}
                    </span>
                    <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0db3b] text-[#171814] transition-transform duration-300 group-hover:rotate-45 sm:right-7 sm:top-7">
                      <ArrowUpRight size={17} />
                    </span>
                    <span className="absolute bottom-4 left-4 z-10 translate-y-2 border border-[#d7d7cf] bg-[#fafaf7]/90 px-3 py-2 text-[8px] font-mono uppercase tracking-[0.12em] text-[#45463f] opacity-0 transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100 sm:bottom-7 sm:left-7">
                      SYSTEM / {project.number} · READY TO EXPLORE
                    </span>
                    <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-[#e1c600] transition-all duration-500 group-hover/image:w-full" />
                  </div>
                  <div className="grid gap-4 border-b border-[#d7d7cf] py-4 sm:grid-cols-[1fr_auto] sm:items-end sm:py-5">
                    <div>
                      <span className="mb-1 block text-[10px] font-mono text-[#77786f]">{project.number} / {project.category}</span>
                      <h3 className="text-2xl font-medium tracking-[-0.04em] text-[#171814] sm:text-4xl">{project.title}</h3>
                      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#65665e] sm:text-sm">{project.description}</p>
                    </div>
                    <span className="flex items-center justify-between gap-6 text-[9px] font-mono uppercase tracking-[0.1em] text-[#77786f] sm:flex-col sm:items-end sm:gap-2">
                      <span>Concept độc lập · Chưa triển khai</span>
                      <span className="text-xs font-sans normal-case tracking-normal text-[#171814]">Xem concept <span aria-hidden="true">↗</span></span>
                    </span>
                  </div>
                </Link>
              </ProjectCard>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 pt-5 text-[9px] font-mono uppercase tracking-[0.15em] text-[#74756c] sm:px-8 lg:px-14">
          <span className="hidden md:inline">Cuộn dọc để dịch chuyển ngang</span>
          <span className="md:hidden">Vuốt ngang để xem dự án</span>
          <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  children,
  index,
  count,
  progress,
  activeIndex,
  desktopMotion,
  reduceMotion,
}: {
  children: React.ReactNode;
  index: number;
  count: number;
  progress: MotionValue<number>;
  activeIndex: number;
  desktopMotion: boolean;
  reduceMotion: boolean;
}) {
  const focus = index / Math.max(1, count - 1);
  const interval = 1 / Math.max(1, count - 1);
  const inputRange = index === 0
    ? [focus, Math.min(1, focus + interval)]
    : index === count - 1
      ? [Math.max(0, focus - interval), focus]
      : [focus - interval, focus, focus + interval];
  const outputScale = index === 0 ? [1, 0.965] : index === count - 1 ? [0.965, 1] : [0.965, 1, 0.965];
  const outputOpacity = index === 0 ? [1, 0.76] : index === count - 1 ? [0.76, 1] : [0.76, 1, 0.76];
  const scale = useTransform(progress, inputRange, outputScale);
  const opacity = useTransform(progress, inputRange, outputOpacity);
  const linked = desktopMotion && !reduceMotion;

  return (
    <motion.article
      style={linked ? { scale, opacity } : undefined}
      animate={!linked && !reduceMotion ? { scale: activeIndex === index ? 1 : 0.985, opacity: activeIndex === index ? 1 : 0.94 } : undefined}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={`${reduceMotion ? "w-full px-5 sm:px-8 lg:px-14" : "w-[88vw] snap-center px-5 sm:w-[76vw] sm:px-8 md:w-screen md:px-14 lg:px-[9vw]"} shrink-0`}
    >
      {children}
    </motion.article>
  );
}

function ProjectArt({
  children,
  index,
  progress,
  desktopMotion,
  reduceMotion,
}: {
  children: React.ReactNode;
  index: number;
  progress: MotionValue<number>;
  desktopMotion: boolean;
  reduceMotion: boolean;
}) {
  const focus = index / Math.max(1, PROJECTS.length - 1);
  const start = Math.max(0, focus - 1 / Math.max(1, PROJECTS.length - 1));
  const end = Math.max(start + 0.001, focus);
  const scale = useTransform(progress, [start, end], [1.045, 1]);
  const clipPath = useTransform(progress, [start, end], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const linked = desktopMotion && !reduceMotion && index > 0;

  return (
    <motion.div
      style={linked ? { scale, clipPath } : undefined}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

function ConceptVisual({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div aria-hidden="true" className="relative grid h-[84%] w-[88%] max-w-[680px] grid-cols-[0.8fr_1.2fr] gap-3">
        <div className="project-ui flex flex-col justify-between border border-[#c7d5ca] bg-white/70 p-4">
          <span className="h-2 w-10 bg-[#94c5a2]" />
          <div className="space-y-2">{[0, 1, 2, 3].map((n) => <span key={n} className="block h-1 w-full bg-[#dbe5dd]" />)}</div>
          <span className="h-7 w-7 rounded-full bg-[#c4e7cc]" />
        </div>
        <div className="project-ui grid grid-cols-2 gap-3 border border-[#c7d5ca] p-3">
          {[0, 1, 2, 3].map((n) => <span key={n} className={`border border-[#c7d5ca] ${n === 0 ? "bg-[#d9efdc]" : "bg-white/80"}`} />)}
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="relative flex h-[84%] w-[88%] max-w-[840px] items-center justify-center">
      <div className={`absolute inset-[7%] grid grid-cols-6 grid-rows-4 border border-[#d4d4cc] ${index === 2 ? "rotate-[-4deg]" : "rotate-[3deg]"}`}>
        {Array.from({ length: 24 }, (_, cell) => (
          <span key={cell} className={`border border-[#dadad2] ${cell === (index === 0 ? 8 : 15) ? "bg-[#f0db3b]" : ""}`} />
        ))}
      </div>
      <div className="project-ui relative grid w-[88%] grid-cols-[1fr_1.2fr] gap-4 border border-[#cfcfc6] bg-white/85 p-5 shadow-[8px_8px_0_rgba(20,20,15,0.06)] sm:gap-6 sm:p-9">
        <div className="flex flex-col justify-between gap-5">
          <span className="h-2 w-12 bg-[#e4cd19]" />
          <div className="space-y-2">
            {[0, 1, 2].map((line) => <span key={line} className={`block h-1 ${line === 0 ? "w-full bg-[#8d8e85]" : "w-3/4 bg-[#d7d7cf]"}`} />)}
          </div>
          <span className="h-7 w-16 bg-[#f2f2ec]" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((tile) => <span key={tile} className={`aspect-square border border-[#e0e0d9] ${tile === 2 ? "bg-[#f4e66f]" : "bg-[#f5f5f0]"}`} />)}
        </div>
      </div>
    </div>
  );
}
