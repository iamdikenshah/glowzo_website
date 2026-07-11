import { Link } from "react-router-dom";
import Icon from "./Icon";
import Photo from "./Photo";
import { STATS } from "../data/content";
import { BRAND } from "../config/brand";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-badge">
            <Icon name="star" size={16} /> 4.9★ rated by 500+ homeowners in {BRAND.serviceArea}
          </span>
          <h1>
            Home care, handled — <span className="hl">cleaning &amp; repairs</span> from people you can trust.
          </h1>
          <p className="hero-lead">
            Vetted, insured professionals for everything your home needs, across {BRAND.serviceArea}.
            Transparent pricing, same-week scheduling, and a satisfaction guarantee on every job.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Get a Free Quote</Link>
            <Link to="/services" className="btn btn-ghost btn-lg">See Our Services</Link>
          </div>
          <div className="hero-stats">
            {STATS.map((s) => (
              <div className="hero-stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-collage">
            <figure><Photo alt="A ServView cleaner deep-cleaning a bright kitchen" icon="sparkle" eager /></figure>
            <figure><Photo alt="A ServView technician fixing a light fixture" icon="bolt" /></figure>
            <figure><Photo alt="A ServView plumber repairing a sink" icon="droplet" /></figure>
            <div className="hero-float">
              <span className="icon-chip"><Icon name="badge-check" size={20} /></span>
              <span>Insured &amp; background-checked pros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
