import { useEnquiryModal } from '../context/EnquiryModalContext';
import { SITE } from '../data/site';

export default function CtaBand() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band__inner reveal">
          <div className="cta-band__text">
            <span className="cta-band__eyebrow">Ready when you are</span>
            <h2 className="cta-band__title" id="cta-title">
              Ready for a spotless car, every single day?
            </h2>
            <p className="cta-band__sub">
              Register in 60 seconds and start your doorstep daily cleaning plan today.
            </p>
          </div>
          <div className="cta-band__actions">
            <button type="button" onClick={openEnquiry} className="btn btn-accent btn-lg">
              Register Your Car
            </button>
            <a href={SITE.whatsapp} className="btn btn-ghost-light btn-lg" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
