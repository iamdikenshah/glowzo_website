import { useState, useEffect } from 'react';
import { FIELDS, FIELD_ORDER, submitEnquiry } from '../data/enquiry';
import { SITE } from '../data/site';

const MOBILE_RE = /^[6-9]\d{9}$/;

const INITIAL = {
  fullName: '', mobile: '', society: '', flat: '',
  vehicles: '', vehicleType: [], regNumber: '', carName: '',
  parking: '', parkingOther: '', notes: '',
};

function validateField(key, values) {
  const f = FIELDS[key];
  const value = values[key];

  if (f.type === 'checkbox') {
    if (f.required && (!value || value.length === 0)) return `Select at least one ${f.label.toLowerCase()}.`;
    return '';
  }

  const val = (value ?? '').toString().trim();
  if (f.required && !val) return `${f.label} is required.`;
  if (key === 'mobile' && val && !MOBILE_RE.test(val.replace(/\s/g, ''))) return 'Enter a valid 10-digit Indian mobile number.';
  if (key === 'fullName' && val && val.length < 2) return 'Please enter your full name.';
  if (f.hasOther && value === 'Other' && !(values[`${key}Other`] || '').trim()) return 'Please specify your parking location.';
  return '';
}

export default function EnquiryForm({ compact = false, onClose }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // In modal mode, auto-close a moment after a successful submit so the
  // visitor can carry on browsing the site.
  useEffect(() => {
    if (status === 'sent' && onClose) {
      const t = setTimeout(onClose, 2600);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  const setField = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validateField(key, { ...values, [key]: value }) }));
  };

  const toggleCheckbox = (key, option) => {
    setValues((v) => {
      const set = new Set(v[key]);
      set.has(option) ? set.delete(option) : set.add(option);
      const next = { ...v, [key]: [...set] };
      if (errors[key]) setErrors((e) => ({ ...e, [key]: validateField(key, next) }));
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    FIELD_ORDER.forEach((k) => {
      const msg = validateField(k, values);
      if (msg) nextErrors[k] = msg;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = document.querySelector('.form-input.is-error, .choice-group.is-error');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setStatus('sending');
    try {
      await submitEnquiry(values);
      setValues(INITIAL);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="enquiry-success" role="alert" aria-live="polite">
        <div className="enquiry-success__check" aria-hidden="true">✓</div>
        <h3>Registration received!</h3>
        <p>
          Thanks for registering with Glowzo. Our team will reach out on your mobile
          number shortly to confirm your first doorstep wash.
        </p>
        <div className="enquiry-success__actions">
          {onClose ? (
            <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
              Continue to Website
            </button>
          ) : (
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus('idle')}>
              Register Another Vehicle
            </button>
          )}
          <a href={SITE.whatsapp} className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const renderField = (key) => {
    const f = FIELDS[key];
    const err = errors[key];
    const id = `enq-${key}`;

    if (f.type === 'radio') {
      return (
        <div className="form-group" key={key}>
          <span className="form-label" id={`${id}-label`}>
            {f.label} {f.required && <span aria-hidden="true">*</span>}
          </span>
          <div className={`choice-group${err ? ' is-error' : ''}`} role="radiogroup" aria-labelledby={`${id}-label`}>
            {f.options.map((opt) => (
              <button
                type="button"
                key={opt}
                role="radio"
                aria-checked={values[key] === opt}
                className={`choice-pill${values[key] === opt ? ' selected' : ''}`}
                onClick={() => setField(key, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          {f.hasOther && values[key] === 'Other' && (
            <input
              type="text"
              className={`form-input${err ? ' is-error' : ''}`}
              style={{ marginTop: '.5rem' }}
              placeholder="Please specify your parking location"
              value={values[`${key}Other`]}
              onChange={(e) => setField(`${key}Other`, e.target.value)}
              aria-label="Other parking location"
            />
          )}
          {err && <span className="form-msg error-msg">{err}</span>}
        </div>
      );
    }

    if (f.type === 'checkbox') {
      return (
        <div className="form-group" key={key}>
          <span className="form-label" id={`${id}-label`}>
            {f.label} {f.required && <span aria-hidden="true">*</span>}
          </span>
          <div className={`choice-group${err ? ' is-error' : ''}`} role="group" aria-labelledby={`${id}-label`}>
            {f.options.map((opt) => (
              <button
                type="button"
                key={opt}
                role="checkbox"
                aria-checked={values[key].includes(opt)}
                className={`choice-pill${values[key].includes(opt) ? ' selected' : ''}`}
                onClick={() => toggleCheckbox(key, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          {err && <span className="form-msg error-msg">{err}</span>}
        </div>
      );
    }

    if (f.type === 'textarea') {
      return (
        <div className="form-group" key={key}>
          <label htmlFor={id} className="form-label">
            {f.label} {f.required && <span aria-hidden="true">*</span>}
          </label>
          <textarea
            id={id} rows={3}
            className={`form-input${err ? ' is-error' : ''}`}
            placeholder={f.placeholder}
            value={values[key]}
            onChange={(e) => setField(key, e.target.value)}
            onBlur={() => setErrors((er) => ({ ...er, [key]: validateField(key, values) }))}
          />
          {err && <span className="form-msg error-msg">{err}</span>}
        </div>
      );
    }

    // text / tel
    return (
      <div className="form-group" key={key}>
        <label htmlFor={id} className="form-label">
          {f.label} {f.required && <span aria-hidden="true">*</span>}
        </label>
        <input
          id={id}
          type={f.type}
          className={`form-input${err ? ' is-error' : ''}`}
          placeholder={f.placeholder}
          autoComplete={f.autoComplete}
          maxLength={f.maxLength}
          value={values[key]}
          onChange={(e) => setField(key, e.target.value)}
          onBlur={() => setErrors((er) => ({ ...er, [key]: validateField(key, values) }))}
        />
        {err && <span className="form-msg error-msg">{err}</span>}
      </div>
    );
  };

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate aria-label="Glowzo car registration form">
      <div className={`enquiry-grid${compact ? ' enquiry-grid--compact' : ''}`}>
        {renderField('fullName')}
        {renderField('mobile')}
        {renderField('society')}
        {renderField('flat')}
      </div>

      {renderField('vehicles')}
      {renderField('vehicleType')}

      <div className={`enquiry-grid${compact ? ' enquiry-grid--compact' : ''}`}>
        {renderField('regNumber')}
        {renderField('carName')}
      </div>

      {renderField('parking')}
      {renderField('notes')}

      {status === 'error' && (
        <div className="form__alert form__alert--error" role="alert">
          Something went wrong sending your registration. Please try again, or message us on WhatsApp.
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Register My Car'}
      </button>

      <p className="enquiry-form__note">
        By submitting, you agree to be contacted by Glowzo about your booking.
      </p>
    </form>
  );
}
