import { useState } from 'react';
import { FAQS } from '../data/content';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Got Questions?</span>
          <h2 className="section-title" id="faq-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about Glowzo's daily doorstep car cleaning.
          </p>
        </header>

        <div className="faq__list reveal">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={f.q}>
                <button
                  type="button"
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">{isOpen ? '–' : '+'}</span>
                </button>
                <div
                  className="faq-item__a"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!isOpen}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
