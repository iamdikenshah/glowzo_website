import { SERVICES } from '../data/content';
import Icon from './Icon';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const ICONS = { car: 'car', foam: 'droplet' };

export default function Services() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="section section-tint" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What we offer</span>
          <h2 className="section-title" id="services-title">Our car cleaning services</h2>
          <p className="section-sub">
            Professional doorstep car care that keeps your vehicle spotless — inside and out.
          </p>
        </div>

        <div className="card-grid cols-2">
          {SERVICES.map((s, i) => (
            <article className={`service-card reveal${i ? ' reveal-d1' : ''}`} key={s.key}>
              <span className="icon-chip"><Icon name={ICONS[s.icon] || 'sparkle'} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-points">
                {s.points.map((p) => (
                  <li key={p}><Icon name="check" size={18} /> {p}</li>
                ))}
              </ul>
              <div className="service-card__footer">
                <button type="button" onClick={openEnquiry} className="btn btn-primary">
                  Book Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
