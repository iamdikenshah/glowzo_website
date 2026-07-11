import Icon from "./Icon";

const initials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");

/** Renders 1–5 amber stars. */
export function Stars({ rating = 5 }) {
  const n = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }, (_, i) => <Icon key={i} name="star" size={18} />)}
    </span>
  );
}

export default function TestimonialCard({ testimonial: t }) {
  return (
    <figure className="testimonial-card">
      <Stars rating={t.rating} />
      <blockquote>“{t.quote}”</blockquote>
      <figcaption className="testimonial-meta">
        <span className="avatar" aria-hidden="true">{initials(t.customerName)}</span>
        <span>
          <b>{t.customerName}</b>
          {t.serviceType && <span>{t.serviceType}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
