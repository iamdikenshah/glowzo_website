import { useEffect } from "react";
import { BRAND } from "../config/brand";

/**
 * Per-route SEO. Sets document.title and syncs the key meta/OG/canonical tags
 * client-side (the static index.html carries the homepage defaults; the build's
 * prerender step bakes correct tags for crawlable deep routes — this keeps the
 * in-app SPA navigations accurate for users and JS-running crawlers).
 *
 * Renders nothing.
 * @param {{ title?: string, description?: string, path?: string }} props
 */
export default function Seo({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
    document.title = fullTitle;

    const setMeta = (selector, attr, value) => {
      if (value == null) return;
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
      setMeta('meta[name="twitter:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);

    if (path != null) {
      const url = `${BRAND.siteUrl}${path}`;
      setMeta('link[rel="canonical"]', "href", url);
      setMeta('meta[property="og:url"]', "content", url);
    }
  }, [title, description, path]);

  return null;
}
