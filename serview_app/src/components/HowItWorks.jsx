import Reveal from "./Reveal";
import Icon from "./Icon";
import { HOW_IT_WORKS } from "../data/content";

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">Booked in minutes, sorted the same week</h2>
          <p className="section-sub">Four simple steps from "it needs fixing" to "it's done."</p>
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
  );
}
