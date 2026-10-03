"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STEPS = [
  { number: "01", title: "Ý tưởng", description: "Làm rõ nhu cầu và người sẽ dùng sản phẩm." },
  { number: "02", title: "Cấu trúc", description: "Kết nối các luồng, thông tin và điểm chạm." },
  { number: "03", title: "Thiết kế", description: "Định hình trải nghiệm và cách sản phẩm phản hồi." },
  { number: "04", title: "Code", description: "Xây dựng các phần thành một hệ thống có thể dùng." },
  { number: "05", title: "AI", description: "Đưa hỗ trợ thông minh vào nơi thực sự cần thiết." },
  { number: "06", title: "Sản phẩm", description: "Hoàn thiện một trải nghiệm liền mạch cho người dùng." },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
    setActiveStep((current) => current === index ? current : index);
  });

  const current = STEPS[activeStep] ?? STEPS[0];
  const currentIsProduct = activeStep === STEPS.length - 1;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-[#f1f1eb] py-12 sm:py-16"
      aria-labelledby="process-title"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-14">
        <div className="self-start lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#877100]">06 / Từ ý tưởng đến sản phẩm</p>
          <h2 id="process-title" className="max-w-xl text-[clamp(2.5rem,5.2vw,5rem)] font-medium leading-[0.96] tracking-[-0.07em] text-[#171814]">
            Sản phẩm
            <br />
            thành hình.
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.number}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
              className="mt-7 border-t border-[#d2d2ca] pt-4"
              aria-live="polite"
            >
              <span className="text-5xl font-light tracking-[-0.08em] text-[#9a8300]">{current.number}</span>
              <h3 className="mt-2 text-xl font-medium text-[#171814]">{current.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#65665e]">{current.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="relative mt-7 min-h-28 overflow-hidden border border-[#d8d8d0] bg-white p-3 sm:p-4" aria-label="Code chuyển thành giao diện">
            <div className="mb-3 flex items-center justify-between text-[8px] font-mono text-[#77786f]">
              <span>EXPERIENCE / BUILD</span>
              <span>{current.number} → UI</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIsProduct ? "product-ui" : `code-${activeStep > 2 ? "transform" : "fragment"}`}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
                className="flex min-h-14 items-center gap-2"
              >
                {currentIsProduct ? (
                  <div className="grid w-full grid-cols-[0.65fr_1fr] gap-2">
                    <div className="flex flex-col justify-between border border-[#deded6] p-2">
                      <span className="h-1 w-8 bg-[#e4cd19]" />
                      <span className="h-1 w-full bg-[#e5e5de]" />
                      <span className="h-1 w-2/3 bg-[#e5e5de]" />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {[0, 1, 2, 3].map((cell) => <span key={cell} className={`border border-[#deded6] ${cell === 0 ? "bg-[#f0db3b]" : "bg-[#f7f7f3]"}`} />)}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 font-mono text-[9px] text-[#65665e]">
                    <p><span className="text-[#8a7600]">const</span> experience =</p>
                    <p className="pl-4"><span className="text-[#8a7600]">&lt;Experience</span> clarity /&gt;</p>
                    {activeStep >= 3 && <p className="pl-4 text-[#8a7600]">→ interface.render()</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <motion.span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] origin-left bg-[#e3c900]"
              style={{ scaleX: reduceMotion ? (activeStep + 1) / STEPS.length : scrollYProgress, transformOrigin: "left" }}
            />
          </div>

          <p className="mt-5 hidden text-[9px] font-mono uppercase tracking-[0.14em] text-[#7a7b73] lg:block">Cuộn tiếp để đi qua từng chặng ↓</p>
        </div>

        <div className="divide-y divide-[#d2d2ca] border-y border-[#d2d2ca]">
          {STEPS.map((step, index) => (
            <article key={step.number} className="flex min-h-[31svh] flex-col justify-center py-6 md:min-h-[38svh] md:py-8">
              <span className={`font-mono text-xs ${activeStep === index ? "text-[#877100]" : "text-[#96978e]"}`}>CHẶNG {step.number}</span>
              <h3 className={`mt-4 text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.06em] transition-colors ${activeStep === index ? "text-[#171814]" : "text-[#85867d]"}`}>
                {step.title}
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#65665e]">{step.description}</p>
              <div className="mt-8 flex items-center gap-2" aria-hidden="true">
                {STEPS.map((item, dotIndex) => (
                  <span key={item.number} className={`h-1 w-8 transition-colors ${dotIndex === index ? "bg-[#e2c400]" : "bg-[#d1d1c9]"}`} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
