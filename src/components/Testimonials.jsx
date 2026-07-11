import { TESTIMONIALS } from '../data/content';
import Icon from './Icon';

function Stars({ count }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="star" size={18} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Reviews</span>
          <h2 className="section-title" id="testimonials-title">What our customers say</h2>
          <p className="section-sub">
            Real feedback from happy Glowzo customers in Bopal, Ahmedabad.
          </p>
        </div>

        <div className="card-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className={`testimonial-card reveal${i % 3 ? ` reveal-d${i % 3}` : ''}`} key={t.name}>
              <Stars count={t.stars} />
              <blockquote>{t.text}</blockquote>
              <figcaption className="testimonial-meta">
                <span className="avatar" style={{ background: t.gradient }} aria-hidden="true">
                  {t.initial}
                </span>
                <span>
                  <b>{t.name}</b>
                  <span>{t.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
