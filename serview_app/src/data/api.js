// =============================================================================
// PUBLIC DATA LAYER — Firestore-with-seed-fallback
// =============================================================================
// The single entry point the public pages use to read content. It dynamic-imports
// the Firestore module (keeping that SDK off the critical bundle) and, when data
// is available, merges it over the bundled seed so the site is never empty. When
// Firebase is unconfigured or a read fails, it silently returns the seed.
// =============================================================================

import { SERVICES as SEED_SERVICES, TESTIMONIALS as SEED_TESTIMONIALS } from "./content";

/**
 * All services, ordered. Firestore records are merged over the seed by slug so
 * CMS edits win, seed-only services still appear, and the catalog is never empty.
 * @returns {Promise<object[]>}
 */
export async function loadServices() {
  try {
    const { fetchServices } = await import("../firebase/firestore");
    const remote = await fetchServices();
    if (!remote.length) return SEED_SERVICES;

    const bySlug = new Map(SEED_SERVICES.map((s) => [s.slug, s]));
    for (const svc of remote) {
      if (!svc.slug) continue;
      bySlug.set(svc.slug, { ...bySlug.get(svc.slug), ...svc });
    }
    return [...bySlug.values()].sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999) || (a.name || "").localeCompare(b.name || "")
    );
  } catch {
    return SEED_SERVICES;
  }
}

/** A single service by slug (merged Firestore-over-seed), or null. */
export async function loadServiceBySlug(slug) {
  const all = await loadServices();
  return all.find((s) => s.slug === slug) || null;
}

/** Approved testimonials, falling back to seed placeholders when none exist. */
export async function loadTestimonials() {
  try {
    const { fetchTestimonials } = await import("../firebase/firestore");
    const remote = await fetchTestimonials();
    return remote.length ? remote : SEED_TESTIMONIALS;
  } catch {
    return SEED_TESTIMONIALS;
  }
}
