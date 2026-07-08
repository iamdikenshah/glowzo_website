import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import EnquiryModal from './components/EnquiryModal';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import { useEnquiryModal } from './context/EnquiryModalContext';

const AUTO_OPEN_DELAY = 1400; // ms after first load
const SESSION_KEY = 'glowzo_enquiry_seen';

/** Scrolls to a #hash target on navigation, or to top when there is none. */
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  const { isOpen, openEnquiry, closeEnquiry } = useEnquiryModal();
  const location = useLocation();
  const navigate = useNavigate();
  const onEnquiryRoute = location.pathname === '/enquiry';

  // Open the popup when the /enquiry link is visited directly.
  useEffect(() => {
    if (onEnquiryRoute) openEnquiry();
  }, [onEnquiryRoute, openEnquiry]);

  // Auto-open once per browser session on first landing.
  useEffect(() => {
    if (onEnquiryRoute) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => {
      openEnquiry();
      sessionStorage.setItem(SESSION_KEY, '1');
    }, AUTO_OPEN_DELAY);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    closeEnquiry();
    sessionStorage.setItem(SESSION_KEY, '1');
    // Return to a normal URL if the popup was opened via /enquiry.
    if (onEnquiryRoute) navigate('/', { replace: true });
  };

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<ServicePage />} />
          {/* /enquiry keeps the shareable link — it renders Home with the popup open */}
          <Route path="/enquiry" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <EnquiryModal open={isOpen} onClose={handleClose} />
    </>
  );
}
