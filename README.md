# Glowzo Website

Premium doorstep car-wash site for Glowzo (Bopal, Ahmedabad), built with
**React + Vite + React Router** in a light, modern theme.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  main.jsx            App entry (BrowserRouter)
  App.jsx             Routes + scroll manager
  index.css           Design tokens + all component styles (light theme)
  pages/
    Home.jsx          Hero · Services · Testimonials · Areas · Contact
    ServicePage.jsx   /service  — car-wash detail, includes, pricing
    EnquiryPage.jsx   /enquiry  — standalone car-registration form
  components/         Navbar, Footer, Hero, Contact, EnquiryForm, …
  data/
    site.js           Phone, email, address, social links (edit here)
    content.js        Testimonials, service areas, includes, pricing
    enquiry.js        Google Form field map + submit helper
```

Original static HTML/CSS/JS is preserved under [`legacy/`](legacy/).

## Enquiry popup → Google Sheet

The car-registration form is a **popup/modal** ([`EnquiryModal`](src/components/EnquiryModal.jsx)),
opened from any "Book Now" CTA, controlled via
[`EnquiryModalContext`](src/context/EnquiryModalContext.jsx). It also:

- opens **once per browser session** on first landing, and
- opens when someone visits **`glowzo.co.in/enquiry`** directly (the URL
  renders the home page with the popup open — still shareable).

On a successful submit it shows a confirmation and auto-closes so the
visitor can keep browsing. The form mirrors the **Glowzo Car Registration**
Google Form and POSTs directly into the same responses sheet — no backend
required. Field IDs live in [`src/data/enquiry.js`](src/data/enquiry.js).

To change the auto-open behaviour, edit `AUTO_OPEN_DELAY` / the
`sessionStorage` gate in [`src/App.jsx`](src/App.jsx).

To point it at a different Google Form, replace `FORM_ID` and the `entry.*`
ids there (open the form → *View source* → search `entry.`).

## Email on every enquiry

[`google-apps-script/NotifyOnEnquiry.gs`](google-apps-script/NotifyOnEnquiry.gs)
sends you a formatted email whenever someone submits. Setup steps are in the
file header — paste it into the Form's Script editor and add an
*On form submit* trigger.

## Direct links like `glowzo.co.in/enquiry`

This is a single-page app, so the host must serve `index.html` for any path.
Configs included:

- **Netlify** — [`public/_redirects`](public/_redirects)
- **Vercel** — [`vercel.json`](vercel.json)
- **Apache** — add a `.htaccess` fallback to `index.html`
- **Nginx** — `try_files $uri /index.html;`
- **GitHub Pages** — copy `dist/index.html` to `dist/404.html` after build

Without this, `/enquiry` works when navigating in-app but 404s on a hard refresh.
