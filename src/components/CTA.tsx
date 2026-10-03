import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="overflow-hidden bg-[#fafaf7] px-5 py-24 sm:px-8 lg:px-14 lg:py-40" aria-labelledby="cta-title">
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[#877100]">09 / Điểm bắt đầu tiếp theo</p>
        <div className="grid gap-8 border-b border-[#d8d8d0] pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 id="cta-title" className="max-w-5xl text-[clamp(3.2rem,9vw,9rem)] font-medium leading-[0.88] tracking-[-0.08em] text-[#171814]">
            Có gì đó
            <br />
            <span className="text-[#9a8300]">đang trong đầu bạn?</span>
          </h2>
          <Link href="#contact" className="motion-medium group inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f0db3b] text-[#171814] transition-transform hover:rotate-45" aria-label="Chia sẻ ý tưởng">
            <ArrowUpRight size={25} />
          </Link>
        </div>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-[#65665e]">
          Kể về ý tưởng, điểm vướng hoặc điều bạn muốn thay đổi. Ta có thể bắt đầu từ một cuộc trò chuyện.
        </p>
      </div>
    </section>
  );
}
