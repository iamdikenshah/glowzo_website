// =============================================================================
// FIRESTORE DATA ACCESS — services, testimonials, enquiries
// =============================================================================
// Low-level Firestore reads/writes. Public pages call the fetch* helpers (which
// never throw — they return [] on failure so the UI can fall back to bundled
// seed content in ../data/content.js). The admin CMS uses the full CRUD.
//
// This module is loaded on demand (dynamic import from the public data layer,
// static import from the admin chunk), which keeps the Firestore SDK off the
// public site's critical bundle.
// =============================================================================

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app, isConfigured } from "./config";

const db = app ? getFirestore(app) : null;

const SERVICES = "services";
const TESTIMONIALS = "testimonials";
const ENQUIRIES = "enquiries";

// Attach the Firestore doc id as `id`.
const withId = (snap) => ({ id: snap.id, ...snap.data() });

// Comparators tolerant of Firestore Timestamps, Dates, or missing values.
const millis = (ts) => (ts?.toMillis ? ts.toMillis() : ts instanceof Date ? ts.getTime() : 0);
const byNewest = (a, b) => millis(b.createdAt) - millis(a.createdAt);
// Services sort by an explicit `order` field (fallback to name).
const byOrder = (a, b) =>
  (a.order ?? 999) - (b.order ?? 999) || (a.name || "").localeCompare(b.name || "");

function assertDb() {
  if (!db) {
    throw new Error("Firebase is not configured (missing VITE_FB_* env). Cannot reach Firestore.");
  }
}

// -----------------------------------------------------------------------------
// SERVICES
// -----------------------------------------------------------------------------

/** Public: all services, ordered by `order`. Returns [] (never throws) on failure. */
export async function fetchServices() {
  if (!isConfigured || !db) return [];
  try {
    const snap = await getDocs(collection(db, SERVICES));
    return snap.docs.map(withId).sort(byOrder);
  } catch {
    return [];
  }
}

/** Admin: all services (same data, but throws when unconfigured so errors show). */
export async function getServices() {
  assertDb();
  const snap = await getDocs(collection(db, SERVICES));
  return snap.docs.map(withId).sort(byOrder);
}

export async function addService(data) {
  assertDb();
  const ref = await addDoc(collection(db, SERVICES), {
    order: 999,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateService(id, data) {
  assertDb();
  const { id: _omit, createdAt: _omit2, ...rest } = data;
  await updateDoc(doc(db, SERVICES, id), { ...rest, updatedAt: serverTimestamp() });
}

export async function deleteService(id) {
  assertDb();
  await deleteDoc(doc(db, SERVICES, id));
}

// -----------------------------------------------------------------------------
// TESTIMONIALS
// -----------------------------------------------------------------------------

/** Public: only APPROVED testimonials, newest-first. Returns [] on failure. */
export async function fetchTestimonials() {
  if (!isConfigured || !db) return [];
  try {
    const snap = await getDocs(collection(db, TESTIMONIALS));
    return snap.docs
      .map(withId)
      .filter((t) => t.approved)
      .sort(byNewest);
  } catch {
    return [];
  }
}

/** Admin: every testimonial including unapproved, newest-first. */
export async function getTestimonials() {
  assertDb();
  const snap = await getDocs(collection(db, TESTIMONIALS));
  return snap.docs.map(withId).sort(byNewest);
}

export async function addTestimonial(data) {
  assertDb();
  const ref = await addDoc(collection(db, TESTIMONIALS), {
    approved: false,
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTestimonial(id, data) {
  assertDb();
  const { id: _omit, createdAt: _omit2, ...rest } = data;
  await updateDoc(doc(db, TESTIMONIALS, id), rest);
}

export async function deleteTestimonial(id) {
  assertDb();
  await deleteDoc(doc(db, TESTIMONIALS, id));
}

// -----------------------------------------------------------------------------
// ENQUIRIES
// -----------------------------------------------------------------------------

/**
 * Public: record a website enquiry. Best-effort — resolves silently when Firebase
 * isn't configured so the form can still show a success state in local/demo builds.
 * `source` lets a future WhatsApp/CRM integration write into the same collection.
 * @param {{name:string, phone:string, email?:string, serviceRequested?:string,
 *          preferredDate?:string, message?:string}} data
 */
export async function addEnquiry(data) {
  if (!isConfigured || !db) return; // no-op when Firebase isn't configured
  await addDoc(collection(db, ENQUIRIES), {
    name: data.name ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    serviceRequested: data.serviceRequested ?? "",
    preferredDate: data.preferredDate ?? "",
    message: data.message ?? "",
    source: "website",
    status: "new",
    createdAt: serverTimestamp(),
  });
}

/** Admin: all enquiries, newest-first. */
export async function getEnquiries() {
  assertDb();
  const snap = await getDocs(collection(db, ENQUIRIES));
  return snap.docs.map(withId).sort(byNewest);
}

/**
 * Admin: move an enquiry through its lifecycle.
 * @param {string} id
 * @param {"new"|"contacted"|"scheduled"|"completed"} status
 */
export async function markEnquiryStatus(id, status) {
  assertDb();
  await updateDoc(doc(db, ENQUIRIES, id), { status });
}

export async function deleteEnquiry(id) {
  assertDb();
  await deleteDoc(doc(db, ENQUIRIES, id));
}
