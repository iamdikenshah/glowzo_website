# ServView — Home Services Website

Modern, trust-focused marketing site for **ServView**, a home-services company
(cleaning, repairs, maintenance). Built with Vite + React + React Router, with a
Firebase-backed CMS/admin, deployed to GitHub Pages behind a custom domain — the
same pattern as the Aagam Realty build.

> **Business name is a placeholder.** Everything the UI shows reads from a single
> `BRAND` object in [`src/config/brand.js`](src/config/brand.js). Change the name,
> phone, email and service area there and it updates everywhere. A few build-time
> constants (domain, SEO titles) also live in `index.html`, `CNAME`,
> `public/sitemap.xml` and `scripts/prerender-routes.js`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Firebase web-app config
npm run dev                  # http://localhost:5173
npm run build                # build + prerender deep-route SEO shells → dist/
npm run preview              # preview the production build
```

Without `.env.local`, the site still runs: services and reviews fall back to the
bundled seed content in `src/data/content.js`, the enquiry form shows a success
state without persisting, and `/admin` can't sign in.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | All services (filter by category) |
| `/services/:slug` | Service detail |
| `/about` | About |
| `/testimonials` | Reviews |
| `/contact` | Contact + enquiry form |
| `/privacy`, `/terms` | Legal |
| `/admin/*` | Lazy-loaded, auth-gated CMS |

## Firebase / CMS

Firestore collections: `services`, `testimonials`, `enquiries` (schemas in
[`src/firebase/firestore.js`](src/firebase/firestore.js)). Security rules are in
[`firestore.rules`](firestore.rules) / [`storage.rules`](storage.rules).

The admin panel is a single-admin CMS. Create the admin account in the Firebase
console and grant it the custom claim `admin: true` (via the Admin SDK) so the
security rules allow writes. There is no self-signup.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/`.
Add each `VITE_FB_*` value as a repo secret. SPA deep-linking works via the
`public/404.html` redirect + the restore snippet in `index.html`; crawlable deep
routes get real 200 HTML shells with per-route SEO from the prerender step.

The custom domain is set in [`CNAME`](CNAME).

## Content still to replace

See the checklist in the project spec: final logo, real photos (replace the
placeholder tiles by adding `imageUrl` on services / providing real hero images),
real reviews, real pricing, and the final phone/email/service-area in
`src/config/brand.js`.
