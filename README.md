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

## Enquiry form → Google Sheet

The `/enquiry` page (and the home "Book Your Wash" section) mirror the
**Glowzo Car Registration** Google Form and POST directly into the same
responses sheet — no backend required. Field IDs live in
[`src/data/enquiry.js`](src/data/enquiry.js).

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
