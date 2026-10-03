import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Dự án", href: "#work" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Quy trình", href: "#process" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fafaf7] px-5 pb-6 sm:px-8 lg:px-14" aria-label="Chân trang">
      <div className="mx-auto max-w-[1440px] border-t border-[#d8d8d0] pt-7">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Banana Studio — về đầu trang">
              <span className="relative h-6 w-6">
                <Image src="/assets/logo-emblem.png" alt="" fill sizes="24px" className="object-contain" />
              </span>
              <span className="text-[13px] font-semibold tracking-[-0.045em] text-[#171814]">Banana Studio</span>
            </Link>
            <p className="mt-2 text-[9px] font-mono uppercase tracking-[0.1em] text-[#77786f]">by Banana Group</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#55564f]">
            {FOOTER_LINKS.map((link) => <a key={link.href} href={link.href} className="hover:text-[#171814]">{link.label}</a>)}
            <a href="mailto:bananagroup3108@gmail.com" className="inline-flex items-center gap-1 text-[#171814]">
              bananagroup3108@gmail.com <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-2 border-t border-[#e2e2db] pt-4 text-[9px] font-mono uppercase tracking-[0.12em] text-[#85867d] sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Banana Studio</span>
          <span>Một sản phẩm số, bắt đầu từ một ý tưởng.</span>
        </div>
      </div>
    </footer>
  );
}
