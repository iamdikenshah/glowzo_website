// =============================================================================
// FIREBASE — shared app instance
// =============================================================================
// Single source of truth for the Firebase app. Config comes from VITE_FB_* env
// vars — copy .env.example to .env.local and fill in the values from your
// Firebase console (Project settings → your web app → SDK config).
//
// Only the tiny firebase/app SDK is imported here. Firestore, Auth and Storage
// live in their own modules and are pulled in on demand, so the heavy SDKs stay
// off the critical path (public pages dynamic-import Firestore after first paint;
// Auth/Storage ship only in the code-split admin chunk).
//
// When config is missing (e.g. a local build with no .env.local), `app` is null
// and `isConfigured` is false; callers fall back gracefully rather than throwing.
// =============================================================================

import { initializeApp, getApps, getApp } from "firebase/app";

const config = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};

/** True when the minimum Firebase config is present in this build. */
export const isConfigured = Boolean(config.apiKey && config.projectId);

/** Raw config object — also consumed by analytics.js for the analytics SDK. */
export const firebaseConfig = config;

// Reuse an already-initialised app if one exists (analytics may have created it
// first, and initializeApp() throws on a duplicate default app).
export const app = isConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(config)
  : null;
