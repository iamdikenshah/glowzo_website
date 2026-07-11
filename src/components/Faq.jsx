import { useState } from 'react';
import { FAQS } from '../data/content';
import { SITE } from '../data/site';
import Icon from './Icon';

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        {/* Left: heading + contact panel */}
        <div className="faq-aside reveal">
          <span className="eyebrow">Got questions?</span>
          <h2 className="section-title" id="faq-title">Frequently asked questions</h2>
          <div className="faq-panel">
            <b>Still need help?</b>
            <p>
              Can't find the answer you're looking for? Our team is a message away —
              we usually reply within minutes.
            </p>
            <a href={SITE.whatsapp} className="faq-phone" target="_blank" rel="noopener noreferrer">
              <Icon name="phone" /> {SITE.phone}
            </a>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="faq-list reveal reveal-d1">
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
