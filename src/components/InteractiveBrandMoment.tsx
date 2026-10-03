"use client";

import { useState } from "react";
import { ArrowDownRight } from "lucide-react";

const CELLS = [
  "Gợi mở", "01", "02", "03",
  "04", "Kết nối", "05", "06",
  "07", "08", "Trải nghiệm", "09",
  "10", "11", "12", "Sản phẩm",
];

export default function InteractiveBrandMoment() {
  const [activeCell, setActiveCell] = useState(5);

  return (
    <section className="bg-[#fafaf7] px-5 py-24 sm:px-8 lg:px-14 lg:py-36" aria-labelledby="grid-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.18em] text-[#877100]">04 / Một lưới, nhiều khả năng</p>
          <h2 id="grid-title" className="text-[clamp(2.7rem,6vw,5.6rem)] font-medium leading-[0.94] tracking-[-0.07em] text-[#171814]">
            Mọi thứ
            <br />
            <span className="text-[#958000]">liên kết.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#65665e]">
            Một sản phẩm tốt không phải tập hợp những màn hình rời. Hãy thử chọn một ô — mỗi điểm chạm mở ra một kết nối mới.
          </p>
          <div aria-live="polite" className="mt-10 flex items-center gap-3 border-t border-[#deded6] pt-4 text-xs text-[#65665e]">
            <span className="flex h-8 w-8 items-center justify-center bg-[#f0db3b] text-[#171814]"><ArrowDownRight size={15} /></span>
            <span>{CELLS[activeCell]} · Một phần của trải nghiệm</span>
          </div>
        </div>

        <div className="grid aspect-square w-full max-w-[680px] grid-cols-4 border-l border-t border-[#d8d8d0]" role="group" aria-label="Lưới tương tác">
          {CELLS.map((cell, index) => (
            <button
              key={`${cell}-${index}`}
              type="button"
              onMouseEnter={() => setActiveCell(index)}
              onFocus={() => setActiveCell(index)}
              onClick={() => setActiveCell(index)}
              aria-pressed={activeCell === index}
              aria-label={`Ô ${index + 1}: ${cell}`}
              className={`motion-fast relative flex min-h-0 items-end justify-start border-b border-r border-[#d8d8d0] p-2 text-left text-[9px] font-mono transition-colors focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#877100] sm:p-4 sm:text-[10px] ${
                activeCell === index ? "bg-[#f0db3b] text-[#171814]" : "bg-transparent text-[#85867d] hover:bg-[#f0f0e9]"
              }`}
            >
              <span>{cell}</span>
              {activeCell === index && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#171814]" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
