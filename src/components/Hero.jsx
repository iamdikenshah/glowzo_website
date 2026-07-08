import HeroIllustration from './HeroIllustration';
import { CalendarIcon } from './icons';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Hero({ onLearnMore }) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="hero" id="home" aria-label="Hero — Glowzo car cleaning service">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Now Serving Bopal, Ahmedabad
          </span>

          <h1 className="hero__title">
            Daily Car Cleaning,
            <br />
            <span className="hero__title-grad">
              Right at Your
              <br />
              Doorstep
            </span>
          </h1>

          <p className="hero__subtitle">
            A spotless car every single day — professional, eco-friendly doorstep
            cleaning on a simple monthly plan. No queues, no hassle, just a car
            that always looks its best.
          </p>

          <div className="hero__actions">
            <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
              <CalendarIcon />
              Book Now
            </button>
            <a href="/#pricing" onClick={onLearnMore} className="btn btn-ghost btn-lg">
              View Plans
            </a>
          </div>

          <ul className="hero__highlights">
            <li>✓ Eco-friendly products</li>
            <li>✓ Trained professionals</li>
            <li>✓ Cancel anytime</li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__illustration">
            <HeroIllustration />
          </div>

          <div className="hero__chip hero__chip--rating" aria-hidden="true">
            <span className="hero__chip-stars">★★★★★</span>
            <div>
              <strong>4.9 / 5</strong>
              <span>500+ happy customers</span>
            </div>
          </div>

          <div className="hero__chip hero__chip--eco" aria-hidden="true">
            <span className="hero__chip-emoji">🌿</span>
            <div>
              <strong>Eco-friendly</strong>
              <span>Water-smart clean</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
