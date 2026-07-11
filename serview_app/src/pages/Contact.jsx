import Seo from "../components/Seo";
import Icon from "../components/Icon";
import EnquiryForm from "../components/EnquiryForm";
import { BRAND, telLink, whatsappLink } from "../config/brand";

export default function Contact() {
  return (
    <main>
      <Seo
        title="Contact & Free Quote"
        description={`Get a free quote from ${BRAND.name}. Book home cleaning, repairs and maintenance across ${BRAND.serviceArea}, or reach us by phone, email or WhatsApp.`}
        path="/contact"
      />

      <section className="page-hero">
        <div className="container">
          <h1>Get a Free Quote</h1>
          <p>
            Tell us what your home needs and we'll get back to you with a free, no-obligation quote —
            usually within a few hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title" style={{ fontSize: "1.5rem" }}>Talk to us directly</h2>
            <ul className="contact-list">
              <li>
                <span className="icon-chip"><Icon name="phone" /></span>
                <div><b>Call us</b><a href={telLink}>{BRAND.phoneDisplay}</a></div>
              </li>
              <li>
                <span className="icon-chip"><Icon name="whatsapp" /></span>
                <div><b>WhatsApp</b><a href={whatsappLink(`Hi ${BRAND.name}, I'd like a quote.`)} target="_blank" rel="noreferrer">Chat with us</a></div>
              </li>
              <li>
                <span className="icon-chip"><Icon name="mail" /></span>
                <div><b>Email</b><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div>
              </li>
              <li>
                <span className="icon-chip"><Icon name="clock" /></span>
                <div><b>Hours</b><span>{BRAND.hours}</span></div>
              </li>
            </ul>

            <div className="area-card">
              <div className="area-head">
                <Icon name="map-pin" /> <b>Areas we serve in {BRAND.serviceArea}</b>
              </div>
              <ul className="area-list">
                {BRAND.areas.map((a) => <li key={a}>{a}</li>)}
              </ul>
              <p className="form-note">Not on the list? Get in touch — we're expanding across {BRAND.serviceArea}.</p>
            </div>
          </div>

          <div className="contact-form">
            <EnquiryForm source="contact-page" />
          </div>
        </div>
      </section>
    </main>
  );
}
