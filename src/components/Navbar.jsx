import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { NAV_LINKS } from '../data/site';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const NAVBAR_H = 72;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const { openEnquiry } = useEnquiryModal();
  const onHome = location.pathname === '/' || location.pathname === '/enquiry';

  /* Sticky shadow + active-section highlight (home only) */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!onHome) return;
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  /* Close mobile drawer on route change */
  useEffect(() => setOpen(false), [location.pathname]);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const goTo = useCallback(
    (hash) => (e) => {
      e.preventDefault();
      setOpen(false);
      const id = hash.replace('#', '');
      const scroll = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_H;
        window.scrollTo({ top, behavior: 'smooth' });
      };
      if (onHome) {
        scroll();
      } else {
        navigate('/');
        setTimeout(scroll, 60);
      }
    },
    [onHome, navigate]
  );

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Glowzo home">
          <img src="/logo.jpeg" alt="" className="brand-mark" />
          <span>Glow<b>zo</b></span>
        </Link>

        <nav aria-label="Primary">
          <ul className={`nav-links${open ? ' open' : ''}`}>
            {NAV_LINKS.map((l) => (
              <li key={l.hash}>
                <a
                  href={`/${l.hash}`}
                  onClick={goTo(l.hash)}
                  className={onHome && activeId === l.hash.slice(1) ? 'active' : ''}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mobile-cta">
              <button
                type="button"
                onClick={() => { setOpen(false); openEnquiry(); }}
                className="btn btn-primary btn-block"
              >
                Book Now
              </button>
            </li>
          </ul>
        </nav>

        <div className="nav-cta desktop-cta">
          <button type="button" onClick={openEnquiry} className="btn btn-primary">
            Book Now
          </button>
        </div>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
