import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll hook. Returns a ref to attach and a boolean that flips to true
 * the first time the element enters the viewport (then the observer disconnects,
 * so it never re-hides). Respects prefers-reduced-motion by starting "shown".
 * @param {{ threshold?: number, rootMargin?: string }} [opts]
 */
export function useReveal({ threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = {}) {
  const ref = useRef(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = useState(prefersReduced);

  useEffect(() => {
    if (prefersReduced || shown) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, threshold, rootMargin, prefersReduced]);

  return [ref, shown];
}
