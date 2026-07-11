// =============================================================================
// ANALYTICS — Firebase Analytics (GA4), lazy + no-op when unconfigured
// =============================================================================
// Imported for its side effect from main.jsx. If VITE_FB_MEASUREMENT_ID is unset
// (or analytics isn't supported in this environment), every export becomes a
// safe no-op, so the site works identically without any analytics config.
// =============================================================================

import { isConfigured } from "./firebase/config";

let analyticsPromise = null;

// Lazily import the analytics SDK (kept out of the initial bundle). Resolves to
// the analytics instance, or null if unavailable/unsupported.
async function getAnalyticsInstance() {
  if (!isConfigured || !import.meta.env.VITE_FB_MEASUREMENT_ID) return null;
  if (analyticsPromise) return analyticsPromise;
  analyticsPromise = (async () => {
    try {
      const { app } = await import("./firebase/config");
      const { getAnalytics, isSupported } = await import("firebase/analytics");
      if (!app || !(await isSupported())) return null;
      return getAnalytics(app);
    } catch {
      return null;
    }
  })();
  return analyticsPromise;
}

/** Log a GA4 page_view for an SPA navigation. */
export async function trackPageView(path) {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  const { logEvent } = await import("firebase/analytics");
  logEvent(analytics, "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Log an arbitrary custom event (e.g. enquiry_submit, quote_click). */
export async function trackEvent(name, params = {}) {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;
  const { logEvent } = await import("firebase/analytics");
  logEvent(analytics, name, params);
}

// Warm up analytics on load (registers the initial page_view automatically).
getAnalyticsInstance();
