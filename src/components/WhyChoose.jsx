import { WHY_CHOOSE } from '../data/content';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function WhyChoose() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="why section" id="why" aria-labelledby="why-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Why Glowzo</span>
          <h2 className="section-title" id="why-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Everything you'd want from a car care partner — reliable, affordable and always at your door.
          </p>
        </header>

        <div className="why__grid">
          {WHY_CHOOSE.map((w, i) => (
            <div className={`why-card reveal${i % 3 ? ` reveal-d${i % 3}` : ''}`} key={w.title}>
              <span className="why-card__icon" aria-hidden="true">{w.icon}</span>
              <div>
                <h3 className="why-card__title">{w.title}</h3>
                <p className="why-card__text">{w.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="why__cta reveal">
          <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
            Book Your Daily Clean
          </button>
        </div>
      </div>
    </section>
  );
}
