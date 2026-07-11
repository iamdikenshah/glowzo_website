import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import TestimonialCard from "../components/TestimonialCard";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { TESTIMONIALS as SEED } from "../data/content";
import { loadTestimonials } from "../data/api";
import { BRAND } from "../config/brand";

export default function Testimonials() {
  const [items, setItems] = useState(SEED);

  useEffect(() => {
    let alive = true;
    loadTestimonials().then((list) => { if (alive && list.length) setItems(list); });
    return () => { alive = false; };
  }, []);

  return (
    <main>
      <Seo
        title="Customer Reviews"
        description={`Read what homeowners across ${BRAND.serviceArea} say about ${BRAND.name}'s cleaning, repair and maintenance services.`}
        path="/testimonials"
      />

      <section className="page-hero">
        <div className="container">
          <h1>What Our Customers Say</h1>
          <p>
            Real feedback from homeowners we've helped. Our 4.9★ average is built one honest,
            well-done job at a time.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {items.map((t, i) => (
              <Reveal key={t.id || i} delay={(i % 3) * 0.06}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
