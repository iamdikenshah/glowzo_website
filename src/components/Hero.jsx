import HeroIllustration from './HeroIllustration';
import { CalendarIcon, PlayIcon } from './icons';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Hero({ onLearnMore }) {
  const { openEnquiry } = useEnquiryModal();
  return (
    <section className="hero" id="home" aria-label="Hero — Glowzo car wash service">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Now Serving Bopal, Ahmedabad
          </span>

          <h1 className="hero__title">
            Premium Car Wash,
            <br />
            <span className="hero__title-grad">
              Right at Your
              <br />
              Doorstep
            </span>
          </h1>

          <p className="hero__subtitle">
            Professional, eco-friendly car wash delivered to your home or office.
            Spotless results — no queues, no hassle, just a sparkling clean car.
          </p>

          <div className="hero__actions">
            <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
              <CalendarIcon />
              Book Now
            </button>
            <a href="/#services" onClick={onLearnMore} className="btn btn-ghost btn-lg">
              Learn More
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">500+</span>
              <span className="hero__stat-label">Cars Washed</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">4.9★</span>
              <span className="hero__stat-label">Avg. Rating</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">60 min</span>
              <span className="hero__stat-label">Avg. Time</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__illustration">
            <HeroIllustration />
          </div>

          <div className="hero__float-card" aria-hidden="true">
            <div className="hero__float-icon">
              <PlayIcon />
            </div>
            <div>
              <span className="hero__float-label">Next Slot</span>
              <strong className="hero__float-value">Today, 4:00 PM</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
