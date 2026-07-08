import { PRICING_TIERS } from '../data/content';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function Pricing() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Monthly Plans</span>
          <h2 className="section-title" id="pricing-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            One flat monthly price based on your vehicle — daily cleaning included, no hidden charges.
          </p>
        </header>

        <div className="price-table reveal">
          <div className="price-table__head" aria-hidden="true">
            <span>Vehicle Type</span>
            <span>Monthly Price</span>
          </div>

          {PRICING_TIERS.map((t) => (
            <div className={`price-row${t.popular ? ' price-row--popular' : ''}`} key={t.tier}>
              <div className="price-row__type">
                <span className="price-row__tier">
                  {t.tier}
                  {t.popular && <span className="price-row__badge">Popular</span>}
                </span>
                <span className="price-row__list">{t.types}</span>
              </div>
              <div className="price-row__amount">
                <span className="price-row__price">{t.price}</span>
                <span className="price-row__period">{t.period}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pricing__cta reveal reveal-d1">
          <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
            Start Your Plan
          </button>
          <p className="pricing__note">
            Prices are per vehicle, per month. Includes daily doorstep cleaning · cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
