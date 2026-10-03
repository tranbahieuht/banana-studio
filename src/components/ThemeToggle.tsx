"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const STORAGE_KEY = "banana-studio-theme";

function getSavedTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#10110F" : "#F7F7F3");
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const readTheme = () => {
      const saved = getSavedTheme();
      const next: Theme = saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };

    readTheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!getSavedTheme()) readTheme();
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    applyTheme(next);
    setTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Keep the selected theme for this session when storage is unavailable.
    }
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 360);
  };

  const nextLabel = theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle inline-flex items-center justify-center gap-2 border px-3 transition-colors ${compact ? "h-10 w-10 px-0" : "h-9"}`}
      aria-label={nextLabel}
      title={nextLabel}
      aria-pressed={theme === "dark"}
    >
      <Icon aria-hidden="true" size={15} className="theme-toggle-icon" />
      {!compact && <span className="text-[10px] font-mono uppercase tracking-[0.1em]">{theme === "dark" ? "Tối" : "Sáng"}</span>}
    </button>
  );
}
