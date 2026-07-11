import Reveal from "./Reveal";
import Icon from "./Icon";
import Photo from "./Photo";
import { DIFFERENTIATORS } from "../data/content";
import { BRAND } from "../config/brand";

export default function WhyChooseUs() {
  return (
    <section className="section" id="why">
      <div className="container why-grid">
        <Reveal>
          <span className="eyebrow">Why choose {BRAND.name}</span>
          <h2 className="section-title">One trusted team for every job around the home</h2>
          <p className="section-sub">
            We started {BRAND.name} to fix what's broken about home services: no-shows, surprise
            bills and work that has to be redone. Every professional we send is vetted, trained and
            accountable — so you can book once and relax.
          </p>
          <div className="feature-list">
            {DIFFERENTIATORS.map((d) => (
              <div className="feature" key={d.title}>
                <span className="icon-chip"><Icon name={d.icon} /></span>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="why-media" delay={0.1}>
          <figure><Photo alt="A ServView professional at work in a home" icon="user-check" /></figure>
          <figure><Photo alt="A cleaner tidying a living room" icon="sparkle" /></figure>
          <figure><Photo alt="A technician assembling furniture" icon="chair" /></figure>
        </Reveal>
      </div>
    </section>
  );
}
