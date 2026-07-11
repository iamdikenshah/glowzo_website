import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { trackPageView } from "./analytics";

// The entire admin CMS is code-split: this dynamic import is the only reference
// to it, so none of the admin bundle (or its firebase/auth dep) is downloaded
// until someone actually visits /admin.
const AdminApp = lazy(() => import("./admin/AdminApp"));

// Reset scroll + log a GA4 page_view on every SPA navigation.
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Defer so the target page can set document.title before we read it.
    const t = setTimeout(() => trackPageView(pathname), 0);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

// Chooses between the public site chrome and the standalone admin surface.
function Shell() {
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return (
      <Suspense
        fallback={
          <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#555" }}>
            Loading…
          </div>
        }
      >
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Shell />
    </BrowserRouter>
  );
}
