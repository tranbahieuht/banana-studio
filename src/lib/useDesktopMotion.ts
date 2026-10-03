import { useSyncExternalStore } from "react";

const query = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
