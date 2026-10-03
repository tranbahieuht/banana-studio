"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_BOTTOM = 24;
const FLOAT_SIZE = 60;

export default function FloatingZalo() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [bottom, setBottom] = useState(DEFAULT_BOTTOM);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updatePosition = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const link = linkRef.current;
        if (!link) return;

        const baseRect = {
          left: window.innerWidth - DEFAULT_BOTTOM - link.offsetWidth,
          right: window.innerWidth - DEFAULT_BOTTOM,
          top: window.innerHeight - DEFAULT_BOTTOM - link.offsetHeight,
          bottom: window.innerHeight - DEFAULT_BOTTOM,
        };
        const collides = [
          document.querySelector<HTMLElement>("[data-contact-submit]"),
          document.querySelector<HTMLElement>("footer"),
        ].filter((element): element is HTMLElement => Boolean(element))
          .map((element) => element.getBoundingClientRect())
          .filter((rect) => rect.bottom > 0 && rect.top < window.innerHeight)
          .filter((rect) => baseRect.left < rect.right && baseRect.right > rect.left && baseRect.top < rect.bottom && baseRect.bottom > rect.top)
          .sort((a, b) => a.top - b.top);

        const obstacle = collides[0];
        if (!obstacle) {
          setBottom((current) => current === DEFAULT_BOTTOM ? current : DEFAULT_BOTTOM);
          setHidden((current) => current ? false : current);
          return;
        }

        const nextBottom = window.innerHeight - obstacle.top + 12;
        const wouldLeaveViewport = obstacle.top - FLOAT_SIZE - 12 < 8;
        setHidden(wouldLeaveViewport);
        setBottom(nextBottom);
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href="https://zalo.me/0967586587"
      target="_blank"
      rel="noreferrer"
      aria-label="Nhắn tin với Banana Studio qua Zalo"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`floating-zalo group fixed right-5 z-[70] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#0068ff] shadow-[0_8px_24px_rgba(0,72,180,0.25)] outline-offset-4 transition-[transform,box-shadow,opacity] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,72,180,0.32)] focus-visible:-translate-y-1 sm:right-7 ${hidden ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ bottom }}
    >
      <span className="zalo-tooltip pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border px-3 py-2 text-[11px] font-medium opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
        Nhắn tin với Banana Studio
      </span>
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-9 w-9">
        <path fill="#fff" d="M9 8h30a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H21l-9 7v-7H9a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4Z" />
        <text x="24" y="27" fill="#0068ff" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="-.4">Zalo</text>
      </svg>
    </a>
  );
}
