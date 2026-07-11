import { WHY_CHOOSE } from '../data/content';
import { useEnquiryModal } from '../context/EnquiryModalContext';

export default function WhyChoose() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why Glowzo</span>
          <h2 className="section-title" id="why-title">Why choose us</h2>
          <p className="section-sub">
            Everything you'd want from a car-care partner — reliable, affordable and always at your door.
          </p>
        </div>

        <div className="card-grid">
          {WHY_CHOOSE.map((w, i) => (
            <div className={`why-card reveal${i % 3 ? ` reveal-d${i % 3}` : ''}`} key={w.title}>
              <span className="em" aria-hidden="true">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>

        <div className="center-cta reveal">
          <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
            Book Your Daily Clean
          </button>
        </div>
      </div>
    </section>
  );
}
