import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import Icon from './Icon';

export default function Footer() {
  const year = new Date().getFullYear();
  const { openEnquiry } = useEnquiryModal();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="brand">
              <img src="/logo.jpeg" alt="" className="brand-mark" />
              <span>Glow<b>zo</b></span>
            </Link>
            <p className="footer-blurb">
              Daily doorstep car cleaning in Bopal, Ahmedabad — clean cars, happy owners.
            </p>
            <div className="footer-social">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon name="facebook" />
              </a>
              <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <Icon name="twitter" />
              </a>
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Icon name="youtube" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
              <li><Link to="/#areas">Service Areas</Link></li>
              <li><Link to="/#testimonials">Testimonials</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <ul className="footer-contact">
              <li><Icon name="phone" size={18} /><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></li>
              <li><Icon name="mail" size={18} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Icon name="map-pin" size={18} /><span>{SITE.address}</span></li>
              <li><Icon name="clock" size={18} /><span>{SITE.hours}</span></li>
            </ul>
          </div>

          <div className="footer-col footer-news">
            <h4>Newsletter</h4>
            <p>Get car-care tips &amp; launch updates for new areas.</p>
            {subscribed ? (
              <p className="footer-news-ok">✓ Subscribed — thanks!</p>
            ) : (
              <form
                className="footer-news-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) { setSubscribed(true); setEmail(''); }
                }}
              >
                <input
                  type="email"
                  className="footer-news-input"
                  placeholder="Your email"
                  aria-label="Email for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-accent btn-sm" aria-label="Subscribe">→</button>
              </form>
            )}
            <button type="button" onClick={openEnquiry} className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
              Register / Book
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {SITE.name}. All rights reserved.</span>
          <nav>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span aria-hidden="true">·</span>
            <span>Made with ♥ in Ahmedabad, Gujarat</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
