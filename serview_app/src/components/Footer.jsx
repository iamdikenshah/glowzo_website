import { Link } from "react-router-dom";
import Icon from "./Icon";
import { BRAND, telLink } from "../config/brand";
import { SERVICES } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="brand">
              <img src="/favicon.svg" alt="" className="brand-mark" />
              <span>Serv<b>View</b></span>
            </Link>
            <p className="footer-blurb">{BRAND.blurb}</p>
            <div className="footer-social">
              <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href={BRAND.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Icon name="facebook" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/testimonials">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul className="footer-contact">
              <li><Icon name="phone" /><a href={telLink}>{BRAND.phoneDisplay}</a></li>
              <li><Icon name="mail" /><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
              <li><Icon name="map-pin" /><span>{BRAND.serviceAreaLong}</span></li>
              <li><Icon name="clock" /><span>{BRAND.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {BRAND.name}. All rights reserved.</span>
          <nav>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
