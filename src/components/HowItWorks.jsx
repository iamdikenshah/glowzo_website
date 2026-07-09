import { STEPS } from '../data/content';

export default function HowItWorks() {
  return (
    <section className="how section" id="how" aria-labelledby="how-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title" id="how-title">How It Works</h2>
          <p className="section-subtitle">
            From sign-up to a spotless car in four easy steps — no calls, no queues.
          </p>
        </header>

        <div className="how__grid">
          {STEPS.map((s, i) => (
            <div className={`how-step reveal${i ? ` reveal-d${i}` : ''}`} key={s.num}>
              <span className="how-step__num">{s.num}</span>
              <h3 className="how-step__title">{s.title}</h3>
              <p className="how-step__text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
