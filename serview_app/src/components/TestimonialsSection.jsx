import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestimonialCard from "./TestimonialCard";
import Reveal from "./Reveal";
import { TESTIMONIALS as SEED } from "../data/content";
import { loadTestimonials } from "../data/api";

/**
 * Homepage testimonials — a 3-card static grid. Seed reviews render instantly and
 * are replaced by approved Firestore testimonials once loaded.
 */
export default function TestimonialsSection({ limit = 3 }) {
  const [items, setItems] = useState(SEED);

  useEffect(() => {
    let alive = true;
    loadTestimonials().then((list) => { if (alive && list.length) setItems(list); });
    return () => { alive = false; };
  }, []);

  return (
    <section className="section section-sage" id="testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What our customers say</span>
          <h2 className="section-title">Homeowners who'd book us again</h2>
        </div>

        <div className="card-grid">
          {items.slice(0, limit).map((t, i) => (
            <Reveal key={t.id || i} delay={(i % 3) * 0.08}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>

        <div className="center-cta">
          <Link to="/testimonials" className="btn btn-ghost btn-lg">Read More Reviews</Link>
        </div>
      </div>
    </section>
  );
}
