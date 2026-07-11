import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import Reveal from "./Reveal";
import { SERVICES as SEED } from "../data/content";
import { loadServices } from "../data/api";

/**
 * Homepage "What We Do" section. Renders the seed catalog instantly (no flash of
 * empty state) and swaps in merged Firestore data once it resolves.
 */
export default function ServicesSection({ limit = 8 }) {
  const [services, setServices] = useState(SEED);

  useEffect(() => {
    let alive = true;
    loadServices().then((list) => { if (alive && list.length) setServices(list); });
    return () => { alive = false; };
  }, []);

  return (
    <section className="section section-sage" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">Every home service, under one roof</h2>
          <p className="section-sub">
            From a sparkling deep clean to a same-day repair, our specialists cover it all —
            booked in minutes, done right the first time.
          </p>
        </div>

        <div className="card-grid">
          {services.slice(0, limit).map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} showCategory />
            </Reveal>
          ))}
        </div>

        <div className="center-cta">
          <Link to="/services" className="btn btn-teal btn-lg">View All Services</Link>
        </div>
      </div>
    </section>
  );
}
