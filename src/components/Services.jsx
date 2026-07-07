import { Link } from 'react-router-dom';

const CarWashIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.5 8H3L5 14H16L17.5 8ZM16.5 14.5C16.5 15.3 15.8 16 15 16C14.2 16 13.5 15.3 13.5 14.5H9.5C9.5 15.3 8.8 16 8 16C7.2 16 6.5 15.3 6.5 14.5H5V16H18V14.5H16.5Z" />
    <path d="M19 5H17.5L16 2H6L4.5 5H3C2.4 5 2 5.4 2 6C2 6.6 2.4 7 3 7H19C19.6 7 20 6.6 20 6C20 5.4 19.6 5 19 5Z" />
    <path d="M21 10C20.4 10 20 10.4 20 11V14H22V11C22 10.4 21.6 10 21 10Z" />
  </svg>
);

const InteriorIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM20 20H4V8H20V20ZM6 10H18V12H6ZM6 14H14V16H6Z" />
    <path d="M8 2H16V4H8Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 21.93V12H5V6.3L12 3.19V11.99Z" />
  </svg>
);

export default function Services() {
  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title" id="services-title">Our Services</h2>
          <p className="section-subtitle">
            Professional car care delivered to your doorstep — more services launching soon!
          </p>
        </header>

        <div className="services__grid">
          <article className="service-card reveal">
            <div className="service-card__icon" aria-hidden="true">
              <CarWashIcon />
            </div>
            <h3 className="service-card__title">Car Wash Service</h3>
            <p className="service-card__desc">
              Full-service doorstep car wash using eco-friendly products. Exterior wash,
              interior vacuum, window cleaning, tyre shine &amp; more — all at your home or office.
            </p>
            <div className="service-card__footer">
              <p className="service-card__price">From ₹299 <span>/ wash</span></p>
              <Link to="/service" className="btn btn-primary btn-sm" aria-label="View car wash service details">
                View Details
              </Link>
            </div>
          </article>

          <article className="service-card service-card--soon reveal reveal-d1" aria-label="Interior Deep Clean — Coming Soon">
            <span className="coming-soon-badge">Coming Soon</span>
            <div className="service-card__icon" aria-hidden="true">
              <InteriorIcon />
            </div>
            <h3 className="service-card__title">Interior Deep Clean</h3>
            <p className="service-card__desc">
              Steam cleaning, fabric shampooing, dashboard polishing, odour treatment,
              and a complete interior refresh.
            </p>
            <div className="service-card__footer">
              <p className="service-card__price">Coming Soon</p>
              <button className="btn btn-outline btn-sm btn--disabled" disabled aria-disabled="true">
                Notify Me
              </button>
            </div>
          </article>

          <article className="service-card service-card--soon reveal reveal-d2" aria-label="Ceramic Coating — Coming Soon">
            <span className="coming-soon-badge">Coming Soon</span>
            <div className="service-card__icon" aria-hidden="true">
              <ShieldIcon />
            </div>
            <h3 className="service-card__title">Ceramic Coating</h3>
            <p className="service-card__desc">
              Long-lasting nano-ceramic protection for your car's paint — deep gloss,
              scratch resistance, and hydrophobic finish.
            </p>
            <div className="service-card__footer">
              <p className="service-card__price">Coming Soon</p>
              <button className="btn btn-outline btn-sm btn--disabled" disabled aria-disabled="true">
                Notify Me
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
