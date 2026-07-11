import { STEPS } from '../data/content';
import Icon from './Icon';

const STEP_ICONS = ['calendar', 'user-check', 'droplet', 'check-circle'];

export default function HowItWorks() {
  return (
    <section className="section section-tint" id="how" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Simple process</span>
          <h2 className="section-title" id="how-title">How it works</h2>
          <p className="section-sub">
            From sign-up to a spotless car in four easy steps — no calls, no queues.
          </p>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div className={`step reveal${i ? ` reveal-d${i}` : ''}`} key={s.num}>
              <div className="step-num">
                <Icon name={STEP_ICONS[i] || 'check'} />
                <span className="step-index">{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
