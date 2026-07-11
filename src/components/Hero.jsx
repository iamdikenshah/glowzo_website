import HeroIllustration from './HeroIllustration';
import Icon from './Icon';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Hero({ onLearnMore }) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="hero" id="home" aria-label="Glowzo — daily doorstep car cleaning">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">
            <span className="dot" aria-hidden="true" />
            Now serving Bopal, Ahmedabad
          </span>

          <h1>
            Daily car cleaning, <span className="hl">right at your doorstep</span>.
          </h1>

          <p className="hero-lead">
            A spotless car every single day — professional, eco-friendly doorstep cleaning on a
            simple monthly plan. No queues, no hassle, just a car that always looks its best.
          </p>

          <div className="hero-actions">
            <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
              <Icon name="calendar" size={18} /> Book Now
            </button>
            <a href="/#pricing" onClick={onLearnMore} className="btn btn-ghost btn-lg">
              View Plans
            </a>
          </div>

          <ul className="hero-highlights">
            <li><Icon name="check-circle" size={16} /> Eco-friendly products</li>
            <li><Icon name="check-circle" size={16} /> Trained professionals</li>
            <li><Icon name="check-circle" size={16} /> Cancel anytime</li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-illustration">
            <HeroIllustration />
          </div>

          <div className="hero-float hero-float--rating" aria-hidden="true">
            <span className="stars">★★★★★</span>
            <span>
              <b>4.9 / 5</b>
              <span className="sub">500+ happy customers</span>
            </span>
          </div>

          <div className="hero-float hero-float--eco" aria-hidden="true">
            <span className="emoji">🌿</span>
            <span>
              <b>Eco-friendly</b>
              <span className="sub">Water-smart clean</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
