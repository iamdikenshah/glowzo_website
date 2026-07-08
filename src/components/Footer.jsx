import { Link } from 'react-router-dom';
import { SITE } from '../data/site';
import { useEnquiryModal } from '../context/EnquiryModalContext';
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  YouTubeIcon,
} from './icons';

export default function Footer() {
  const year = new Date().getFullYear();
  const { openEnquiry } = useEnquiryModal();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="logo-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="white" />
                </svg>
              </span>
              Glow<span className="logo-accent">zo</span>
            </div>
            <p className="footer__tagline">
              Premium doorstep car wash service — clean cars, happy owners.
            </p>

            <nav className="footer__social" aria-label="Social media links">
              <a href={SITE.social.instagram} className="footer__soc-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <InstagramIcon />
              </a>
              <a href={SITE.social.facebook} className="footer__soc-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <FacebookIcon />
              </a>
              <a href={SITE.social.twitter} className="footer__soc-link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)">
                <TwitterIcon />
              </a>
              <a href={SITE.social.youtube} className="footer__soc-link" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel">
                <YouTubeIcon />
              </a>
            </nav>
          </div>

          <div>
            <h3 className="footer__col-title">Quick Links</h3>
            <nav className="footer__links" aria-label="Footer navigation">
              <Link to="/#home" className="footer__lnk">Home</Link>
              <Link to="/#services" className="footer__lnk">Services</Link>
              <Link to="/#testimonials" className="footer__lnk">Testimonials</Link>
              <Link to="/#areas" className="footer__lnk">Areas We Serve</Link>
              <Link to="/#contact" className="footer__lnk">Contact</Link>
              <button type="button" onClick={openEnquiry} className="footer__lnk footer__lnk--btn">Register / Book</button>
              <Link to="/service" className="footer__lnk">Car Wash Details</Link>
            </nav>
          </div>

          <div>
            <h3 className="footer__col-title">Services</h3>
            <nav className="footer__links" aria-label="Services links">
              <Link to="/service" className="footer__lnk">Car Wash</Link>
              <Link to="/#services" className="footer__lnk">
                Interior Clean <small style={{ opacity: 0.5 }}>(Soon)</small>
              </Link>
              <Link to="/#services" className="footer__lnk">
                Ceramic Coating <small style={{ opacity: 0.5 }}>(Soon)</small>
              </Link>
              <button type="button" onClick={openEnquiry} className="footer__lnk footer__lnk--btn">Book a Service</button>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <p>Made with ♥ in Ahmedabad, Gujarat</p>
        </div>
      </div>
    </footer>
  );
}
