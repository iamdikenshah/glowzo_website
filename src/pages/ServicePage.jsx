import { Link } from 'react-router-dom';
import ServiceBanner from '../components/ServiceBanner';
import { CalendarIcon, BackIcon, CheckIcon } from '../components/icons';
import { INCLUDES, PLANS } from '../data/content';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ServicePage() {
  useScrollReveal([]);

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Home</Link></li>
            <li className="breadcrumb__sep" aria-hidden="true">›</li>
            <li className="breadcrumb__item"><Link to="/#services">Services</Link></li>
            <li className="breadcrumb__sep" aria-hidden="true">›</li>
            <li className="breadcrumb__item breadcrumb__item--active" aria-current="page">
              Car Wash Service
            </li>
          </ol>
        </div>
      </nav>

      <section className="svc-hero" aria-labelledby="svc-hero-title">
        <div className="container">
          <div className="svc-hero__inner">
            <div className="hero__content">
              <span className="hero__badge">
                <span className="hero__badge-dot" aria-hidden="true" />
                Available Now in Bopal
              </span>
              <h1 className="svc-hero__title" id="svc-hero-title">
                Car Wash<br />
                <span className="hero__title-grad">Service</span>
              </h1>
              <p className="svc-hero__desc">
                A full professional car wash delivered straight to your doorstep.
                Our trained team uses eco-friendly, pH-neutral products to give your
                car a spotless clean — inside and out — without a drop of wasted water.
              </p>
              <div className="hero__actions">
                <Link to="/#contact" className="btn btn-primary btn-lg">
                  <CalendarIcon />
                  Book This Service
                </Link>
                <Link to="/#services" className="btn btn-ghost btn-lg back-link" style={{ borderRadius: 9999 }}>
                  <BackIcon />
                  Back to Services
                </Link>
              </div>
            </div>

            <div className="svc-hero__img-wrap hero__visual">
              <ServiceBanner />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-surface)' }} aria-labelledby="svc-desc-title">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal">
            <span className="section-tag">About This Service</span>
            <h2 className="section-title" id="svc-desc-title" style={{ textAlign: 'left', maxWidth: 'none' }}>
              Professional Car Wash at Your Doorstep
            </h2>
            <div style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '.98rem', display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
              <p>
                Our <strong style={{ color: 'var(--color-primary-dark)' }}>Car Wash Service</strong> brings a full-service, salon-quality car wash experience
                directly to wherever your vehicle is parked — your home, apartment complex,
                or office. No more waiting at a car wash centre or battling queues.
              </p>
              <p>
                Our trained professionals arrive with all the equipment they need: water tanks,
                eco-friendly cleaning agents, microfibre cloths, and high-powered vacuum cleaners.
                We use pH-neutral, biodegradable shampoos that are safe for your car's paint,
                rubber seals, and the environment.
              </p>
              <p>
                Every wash follows a strict multi-step process to ensure nothing is missed —
                from the wheel arches to the headliner. Whether you drive a hatchback, an SUV,
                or a luxury sedan, our team is trained to handle all vehicle types with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="includes section" id="includes" aria-labelledby="includes-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="section-tag">Checklist</span>
            <h2 className="section-title" id="includes-title">What's Included</h2>
            <p className="section-subtitle">
              Every booking includes this comprehensive list of services — no hidden extras.
            </p>
          </header>

          <div className="includes__grid">
            {INCLUDES.map((item, i) => (
              <div key={item.label} className={`include-item reveal${i % 6 ? ` reveal-d${i % 6}` : ''}`}>
                <div className="include-item__check" aria-hidden="true"><CheckIcon /></div>
                <div>
                  <p className="include-item__label">{item.label}</p>
                  <p className="include-item__note">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
        <div className="container">
          <header className="section-header reveal">
            <span className="section-tag">Transparent Pricing</span>
            <h2 className="section-title" id="pricing-title">Choose Your Plan</h2>
            <p className="section-subtitle">Simple, upfront pricing — no hidden charges, no surprises.</p>
          </header>

          <div className="pricing__grid">
            {PLANS.map((plan, i) => (
              <div
                key={plan.tier}
                className={`pricing-card reveal${plan.popular ? ' pricing-card--popular reveal-d1' : ''}`}
              >
                {plan.popular && <span className="pricing-card__badge" aria-label="Most popular plan">⭐ Most Popular</span>}
                <p className="pricing-card__tier">{plan.tier}</p>
                <p className="pricing-card__price">{plan.price}</p>
                <p className="pricing-card__price-sub">{plan.sub}</p>
                <ul className="pricing-card__features" aria-label={`${plan.tier} features`}>
                  {plan.features.map((f) => (
                    <li key={f} className="pricing-card__feat">{f}</li>
                  ))}
                </ul>
                <Link to="/#contact" className={`btn ${plan.btnClass}`} aria-label={`Book the ${plan.tier} plan`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="reveal" style={{ textAlign: 'center', marginTop: 'var(--sp-xl)', fontSize: '.84rem', color: 'var(--color-text-muted)' }}>
            Prices are flat-rate for hatchbacks &amp; sedans. SUVs &amp; MUVs: add ₹100.
            All services include a 30-day satisfaction guarantee.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: 'var(--sp-2xl)', paddingBottom: 'var(--sp-3xl)' }}>
        <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-xl)' }}>
          <div className="reveal">
            <h2 className="section-title">Ready for a Sparkling Clean Car?</h2>
            <p className="section-subtitle">
              Book your doorstep car wash in 60 seconds via our contact form or WhatsApp.
            </p>
          </div>
          <div className="hero__actions reveal reveal-d1" style={{ marginBottom: 0 }}>
            <Link to="/#contact" className="btn btn-primary btn-lg">
              <CalendarIcon />
              Book Now
            </Link>
            <Link to="/#services" className="back-link" aria-label="Go back to all services">
              <BackIcon />
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
