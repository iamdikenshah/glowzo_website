import { useState } from 'react';
import { SITE } from '../data/site';
import { PhoneIcon, MailIcon, MapPinIcon } from './icons';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const RULES = {
  name: { required: true, minLen: 2, label: 'Full name' },
  phone: { required: true, pattern: /^[6-9]\d{9}$/, patternMsg: 'Enter a valid 10-digit Indian mobile number.' },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMsg: 'Enter a valid email address.' },
  message: { required: true, minLen: 10, label: 'Message' },
};

const EMPTY = { name: '', phone: '', email: '', message: '' };

function validate(field, value) {
  const rule = RULES[field];
  const val = value.trim();
  if (!rule) return '';
  const label = rule.label || field.charAt(0).toUpperCase() + field.slice(1);
  if (rule.required && !val) return `${label} is required.`;
  if (rule.minLen && val.length < rule.minLen) return `Must be at least ${rule.minLen} characters.`;
  if (rule.pattern && val && !rule.pattern.test(val.replace(/\s/g, ''))) return rule.patternMsg;
  return '';
}

export default function Contact() {
  const { openEnquiry } = useEnquiryModal();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const setField = (field) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: validate(field, value) }));
  };

  const onBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((er) => ({ ...er, [field]: validate(field, values[field]) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = Object.keys(RULES).reduce((acc, f) => {
      acc[f] = validate(f, values[f]);
      return acc;
    }, {});
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.values(nextErrors).some(Boolean)) return;

    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setValues(EMPTY);
    setTouched({});
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const fieldClass = (f) =>
    `form-input${errors[f] ? ' is-error' : touched[f] && values[f] ? ' is-success' : ''}`;

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title" id="contact-title">Contact Us</h2>
          <p className="section-subtitle">
            Have a question or feedback? Send us a message. Ready to book?{' '}
            <button
              type="button"
              onClick={openEnquiry}
              style={{ color: 'var(--color-primary-dark)', fontWeight: 600, font: 'inherit' }}
            >
              Register your car →
            </button>
          </p>
        </header>

        <div className="contact__inner">
          <div className="reveal">
            <p className="contact__subtitle">
              Reach out via the form, WhatsApp, or email and we'll get back to you within minutes.
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
            <form className="contact-form" onSubmit={onSubmit} noValidate aria-label="Contact form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name <span aria-hidden="true">*</span></label>
                  <input
                    type="text" id="contact-name" name="name"
                    className={fieldClass('name')}
                    placeholder="e.g. Rahul Mehta" autoComplete="name" aria-required="true"
                    value={values.name} onChange={setField('name')} onBlur={onBlur('name')}
                  />
                  {errors.name && <span className="form-msg error-msg">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">Mobile Number <span aria-hidden="true">*</span></label>
                  <input
                    type="tel" id="contact-phone" name="phone"
                    className={fieldClass('phone')}
                    placeholder="10-digit mobile number" autoComplete="tel" maxLength={10} aria-required="true"
                    value={values.phone} onChange={setField('phone')} onBlur={onBlur('phone')}
                  />
                  {errors.phone && <span className="form-msg error-msg">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address <span aria-hidden="true">*</span></label>
                <input
                  type="email" id="contact-email" name="email"
                  className={fieldClass('email')}
                  placeholder="you@example.com" autoComplete="email" aria-required="true"
                  value={values.email} onChange={setField('email')} onBlur={onBlur('email')}
                />
                {errors.email && <span className="form-msg error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message <span aria-hidden="true">*</span></label>
                <textarea
                  id="contact-message" name="message" rows={4}
                  className={fieldClass('message')}
                  placeholder="Tell us how we can help…"
                  aria-required="true"
                  value={values.message} onChange={setField('message')} onBlur={onBlur('message')}
                />
                {errors.message && <span className="form-msg error-msg">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg form-submit" style={{ width: '100%' }} disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
              </button>

              {sent && (
                <div className="form__alert form__alert--success" role="alert" aria-live="polite">
                  ✓ Thanks! We've received your message and will contact you within minutes.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
