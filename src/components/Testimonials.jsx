import { TESTIMONIALS } from '../data/content';

function Stars({ count }) {
  return (
    <p className="t-card__stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </p>
  );
}

function Card({ t, ariaHidden }) {
  return (
    <article className="t-card" aria-hidden={ariaHidden || undefined}>
      <div className="t-card__head">
        <div className="t-card__avatar" style={{ background: t.gradient }} aria-hidden="true">
          {t.initial}
        </div>
        <div>
          <p className="t-card__name">{t.name}</p>
          <p className="t-card__place">{t.place}</p>
        </div>
      </div>
      <Stars count={t.stars} />
      <p className="t-card__text">{t.text}</p>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Reviews</span>
          <h2 className="section-title" id="testimonials-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Real feedback from happy Glowzo customers in Bopal, Ahmedabad.
          </p>
        </header>
      </div>

      <div className="testimonials__marquee">
        {/* Track holds two copies for a seamless -50% loop */}
        <div className="testimonials__track" aria-label="Customer testimonials">
          {TESTIMONIALS.map((t, i) => (
            <Card key={`a-${i}`} t={t} />
          ))}
          {TESTIMONIALS.map((t, i) => (
            <Card key={`b-${i}`} t={t} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  );
}
