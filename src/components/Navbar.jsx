import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';

const NAVBAR_H = 70;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

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
        // wait for Home to mount before scrolling
        setTimeout(scroll, 60);
      }
    },
    [onHome, navigate]
  );

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Glowzo home">
          <img src="/logo.jpeg" alt="Glowzo" className="logo-image" />
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <a
              key={l.hash}
              href={`/${l.hash}`}
              onClick={goTo(l.hash)}
              className={`navbar__link${
                onHome && activeId === l.hash.slice(1) ? ' active' : ''
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link to="/enquiry" className="btn btn-primary navbar__cta" aria-label="Book a car wash">
          Book Now
        </Link>

        <button
          className={`navbar__hamburger${open ? ' open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`navbar__mobile${open ? ' open' : ''}`}
        id="mobile-menu"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((l) => (
          <a key={l.hash} href={`/${l.hash}`} onClick={goTo(l.hash)} className="navbar__link">
            {l.label}
          </a>
        ))}
        <Link to="/enquiry" className="btn btn-primary btn-sm">
          Book Now
        </Link>
      </nav>
    </header>
  );
}
