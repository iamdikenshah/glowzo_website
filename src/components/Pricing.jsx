import { PRICING_TIERS } from '../data/content';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Pricing() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Monthly plans</span>
          <h2 className="section-title" id="pricing-title">Simple, transparent pricing</h2>
          <p className="section-sub">
            One flat monthly price based on your vehicle — daily cleaning included, no hidden charges.
          </p>
        </div>

        <div className="plan-grid">
          {PRICING_TIERS.map((t, i) => (
            <div
              className={`plan-card reveal${t.popular ? ' plan-card--popular' : ''}${i ? ` reveal-d${i}` : ''}`}
              key={t.tier}
            >
              {t.popular && <span className="plan-card__badge">Most Popular</span>}
              <p className="plan-card__tier">{t.tier}</p>
              <p className="plan-card__price">
                {t.price}<span className="plan-card__period"> {t.period}</span>
              </p>
              <p className="plan-card__caption">Covers</p>
              <p className="plan-card__list">{t.types}</p>
              <ul className="plan-card__features">
                <li>Daily doorstep cleaning</li>
                <li>Exterior wash &amp; glass</li>
                <li>Tyre &amp; rim care</li>
                <li>Cancel anytime</li>
              </ul>
              <button
                type="button"
                onClick={openEnquiry}
                className={`btn btn-block ${t.popular ? 'btn-primary' : 'btn-ghost'}`}
              >
                Choose {t.tier}
              </button>
            </div>
          ))}
        </div>

        <p className="pricing-note reveal">
          Prices are per vehicle, per month · includes daily doorstep cleaning · cancel anytime.
        </p>
      </div>
    </section>
  );
}
