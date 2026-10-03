"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Dự án", href: "#work" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Quy trình", href: "#process" },
  { label: "Triết lý", href: "#blueprint" },
  { label: "Về studio", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (current?.target instanceof HTMLElement) setActiveSection(`#${current.target.id}`);
    }, { rootMargin: "-24% 0px -66% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const goTo = (href: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[70px] lg:px-14">
          <Link href="/" className="brand-lockup inline-flex items-center gap-2" aria-label="Banana Studio — về đầu trang">
            <span className="relative h-6 w-6 sm:h-[26px] sm:w-[26px]">
              <Image src="/assets/logo-emblem.png" alt="" fill priority sizes="26px" className="object-contain" />
            </span>
            <span className="text-[13px] font-semibold tracking-[-0.045em] text-[#171814] sm:text-sm">Banana Studio</span>
          </Link>

          <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => goTo(link.href)} aria-current={pathname === "/" && activeSection === link.href ? "location" : undefined} className={`nav-link relative py-2 text-xs text-[#55564f] transition-colors hover:text-[#171814] ${pathname === "/" && activeSection === link.href ? "is-active" : ""}`}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block"><ThemeToggle /></div>
            <button
              onClick={() => goTo("#contact")}
              className="hidden items-center gap-2 border-b border-[#b49a00] pb-1 text-xs font-medium text-[#171814] transition-colors hover:text-[#8c7400] lg:inline-flex"
            >
              Bắt đầu dự án <ArrowRight size={13} />
            </button>
            <div className="lg:hidden"><ThemeToggle compact /></div>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center text-[#171814] lg:hidden"
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="mobile-navigation fixed inset-0 z-40 flex flex-col justify-between px-6 pb-8 pt-24 lg:hidden"
          >
            <nav aria-label="Điều hướng trên thiết bị di động" className="divide-y divide-[#deded6]">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  aria-current={pathname === "/" && activeSection === link.href ? "location" : undefined}
                  className={`mobile-nav-link flex w-full items-center justify-between py-5 text-left text-3xl font-medium tracking-[-0.06em] text-[#171814] ${pathname === "/" && activeSection === link.href ? "is-active" : ""}`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#888980]">0{index + 1}</span>
                </button>
              ))}
            </nav>
            <div className="border-t border-[#deded6] pt-5">
              <button onClick={() => goTo("#contact")} className="inline-flex items-center gap-2 text-sm font-medium text-[#171814]">
                Bắt đầu dự án <ArrowRight size={15} />
              </button>
              <a href="mailto:bananagroup3108@gmail.com" className="mt-5 block text-xs text-[#77786f]">bananagroup3108@gmail.com</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
