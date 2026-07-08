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
            <Link to="/" className="footer__logo" aria-label="Glowzo home">
              <img src="/logo.jpeg" alt="Glowzo" className="footer__logo-img" />
            </Link>
            <p className="footer__tagline">
              Daily doorstep car cleaning — clean cars, happy owners.
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
              <Link to="/#pricing" className="footer__lnk">Pricing</Link>
              <Link to="/#areas" className="footer__lnk">Service Areas</Link>
              <Link to="/#testimonials" className="footer__lnk">Testimonials</Link>
              <Link to="/#about" className="footer__lnk">About Us</Link>
              <button type="button" onClick={openEnquiry} className="footer__lnk footer__lnk--btn">Register / Book</button>
            </nav>
          </div>

          <div>
            <h3 className="footer__col-title">Services</h3>
            <nav className="footer__links" aria-label="Services links">
              <button type="button" onClick={openEnquiry} className="footer__lnk footer__lnk--btn">Daily Car Cleaning</button>
              <button type="button" onClick={openEnquiry} className="footer__lnk footer__lnk--btn">Interior Foam Cleaning</button>
              <Link to="/#pricing" className="footer__lnk">Monthly Plans</Link>
              <button type="button" onClick={openEnquiry} className="footer__lnk footer__lnk--btn">Book a Service</button>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} {SITE.name}. All rights reserved.</p>
          <nav className="footer__legal" aria-label="Legal">
            <Link to="/terms" className="footer__lnk">Terms &amp; Conditions</Link>
            <span aria-hidden="true">·</span>
            <span>Made with ♥ in Ahmedabad, Gujarat</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
