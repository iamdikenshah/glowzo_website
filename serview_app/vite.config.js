import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed to a custom domain (serview.com) at the site root, so base stays "/".
// The admin CMS is code-split into its own chunk (see src/router.jsx) — Vite's
// dynamic-import splitting keeps firebase/auth + firebase/storage out of the
// public bundle automatically.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
