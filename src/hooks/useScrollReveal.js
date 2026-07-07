import { useEffect } from 'react';

/**
 * Adds the `visible` class to every `.reveal` element as it enters the
 * viewport — a React port of the original IntersectionObserver logic.
 * Re-runs whenever `deps` change (e.g. on route change) so freshly mounted
 * sections are observed too.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
