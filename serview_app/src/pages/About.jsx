import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import Photo from "../components/Photo";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { DIFFERENTIATORS, STATS, HOW_IT_WORKS } from "../data/content";
import { BRAND } from "../config/brand";

export default function About() {
  return (
    <main>
      <Seo
        title="About Us"
        description={`Learn how ${BRAND.name} is raising the bar for home services in ${BRAND.serviceArea} — with vetted, insured professionals, transparent pricing and a satisfaction guarantee.`}
        path="/about"
      />

      <section className="page-hero">
        <div className="container">
          <h1>About {BRAND.name}</h1>
          <p>
            We're on a mission to make home care effortless and trustworthy — one honest,
            well-done job at a time.
          </p>
        </div>
      </section>

      {/* Story + media */}
      <section className="section">
        <div className="container why-grid">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="section-title">Home services, done the honest way</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
              {BRAND.name} began with a simple frustration: booking help for your home shouldn't mean
              no-shows, surprise bills or work you have to redo. So we built a company around the
              opposite — dependable people, transparent prices and accountability on every job.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
              Today, our network of vetted cleaners, handymen, electricians, plumbers and painters
              serves hundreds of homes across {BRAND.serviceArea}. Every professional is background-checked,
              trained and insured before they ever knock on your door — because trust is the whole point.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg mt-lg">Book a Service</Link>
          </Reveal>

          <Reveal className="why-media" delay={0.1}>
            <figure><Photo alt="A ServView professional greeting a homeowner" icon="user-check" /></figure>
            <figure><Photo alt="A cleaner at work" icon="sparkle" /></figure>
            <figure><Photo alt="A technician making a repair" icon="wrench" /></figure>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">By the numbers</span>
            <h2 className="section-title">Trusted by homeowners, job after job</h2>
          </div>
          <div className="stat-cards">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we stand for</span>
            <h2 className="section-title">The promises behind every booking</h2>
          </div>
          <div className="card-grid">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.08}>
                <div className="service-card">
                  <span className="icon-chip"><Icon name={d.icon} /></span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works recap */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title">Simple from start to finish</h2>
          </div>
          <div className="steps">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal className="step" key={step.title} delay={i * 0.08}>
                <div className="step-num">
                  <Icon name={step.icon} />
                  <span className="step-index">{i + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
