import { useEnquiryModal } from '../context/EnquiryModalContext';
import { SITE } from '../data/site';
import { SERVICE_AREAS } from '../data/content';
import Icon from './Icon';

export default function CtaBand() {
  const { openEnquiry } = useEnquiryModal();
  const active = SERVICE_AREAS.filter((a) => a.active);
  const soon = SERVICE_AREAS.filter((a) => !a.active);

  return (
    <section className="section section-blue cta-banner" id="areas" aria-labelledby="cta-title">
      <div className="container reveal">
        {/* Coverage */}
        <div className="cta-areas">
          <span className="eyebrow">Coverage</span>
          <h3 className="cta-areas__title">Where we operate</h3>
          <div className="cta-areas__live">
            {active.map((a) => (
              <span className="pill" key={a.name}>
                <Icon name="map-pin" size={16} /> {a.name}
              </span>
            ))}
          </div>
          <p className="cta-areas__soon">
            Coming soon: {soon.map((a) => a.name).join(' · ')}
          </p>
        </div>

        <hr className="cta-divider" />

        {/* Call to action */}
        <span className="eyebrow">Ready when you are</span>
        <h2 id="cta-title">
          Ready for a <span className="hl">spotless car</span>, every single day?
        </h2>
        <p>
          Register in 60 seconds and start your doorstep daily cleaning plan today.
        </p>
        <div className="cta-actions">
          <button type="button" onClick={openEnquiry} className="btn btn-accent btn-lg">
            Register Your Car
          </button>
          <a href={SITE.whatsapp} className="btn btn-ghost-light btn-lg" target="_blank" rel="noopener noreferrer">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
