import { SITE } from '../data/site';
import { PhoneIcon, MailIcon, MapPinIcon } from './icons';
import EnquiryForm from './EnquiryForm';

export default function Contact() {
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title" id="contact-title">Book Your Wash</h2>
          <p className="section-subtitle">
            Register your car below and our team will call you to confirm your slot —
            or reach us directly on WhatsApp, phone, or email.
          </p>
        </header>

        <div className="contact__inner">
          <div className="reveal">
            <p className="contact__subtitle">
              Fill in the registration form and we'll get back to you within minutes.
              Our team is available <strong>{SITE.hours}</strong>.
            </p>

            <div className="contact__details">
              <a className="contact__detail" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                <div className="contact__detail-icon" aria-hidden="true"><PhoneIcon /></div>
                <div>
                  <p className="contact__detail-label">Phone / WhatsApp</p>
                  <p className="contact__detail-value">{SITE.phone}</p>
                </div>
              </a>
              <a className="contact__detail" href={`mailto:${SITE.email}`}>
                <div className="contact__detail-icon" aria-hidden="true"><MailIcon /></div>
                <div>
                  <p className="contact__detail-label">Email</p>
                  <p className="contact__detail-value">{SITE.email}</p>
                </div>
              </a>
              <div className="contact__detail">
                <div className="contact__detail-icon" aria-hidden="true"><MapPinIcon /></div>
                <div>
                  <p className="contact__detail-label">Service Area</p>
                  <p className="contact__detail-value">{SITE.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap reveal reveal-d1">
            <EnquiryForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
