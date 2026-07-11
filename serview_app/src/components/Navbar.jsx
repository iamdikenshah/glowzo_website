import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { BRAND } from "../config/brand";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
          <img src="/favicon.svg" alt="" className="brand-mark" />
          <span>Serv<b>View</b></span>
        </Link>

        <nav aria-label="Primary">
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mobile-cta" style={{ marginTop: "0.5rem" }}>
              <Link to="/contact" className="btn btn-primary btn-block">
                Get a Free Quote
              </Link>
            </li>
          </ul>
        </nav>

        <div className="nav-cta desktop-cta">
          <Link to="/contact" className="btn btn-primary">
            Get a Free Quote
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
