import { useState, useEffect } from 'react';
import {
  FIELDS,
  STATIC_FIELD_ORDER,
  VEHICLE_TYPES,
  MAX_VEHICLES,
  emptyVehicle,
  submitEnquiry,
} from '../data/enquiry';
import { SITE } from '../data/site';

const MOBILE_RE = /^[6-9]\d{9}$/;

const initialValues = () => ({
  fullName: '', mobile: '', society: '', flat: '',
  vehicles: [emptyVehicle()],
  parking: '', parkingOther: '', notes: '',
});

function validateStatic(key, values) {
  const f = FIELDS[key];
  const val = (values[key] ?? '').toString().trim();
  if (f.required && !val) return `${f.label} is required.`;
  if (key === 'mobile' && val && !MOBILE_RE.test(val.replace(/\s/g, ''))) return 'Enter a valid 10-digit Indian mobile number.';
  if (key === 'fullName' && val && val.length < 2) return 'Please enter your full name.';
  if (f.hasOther && values[key] === 'Other' && !(values[`${key}Other`] || '').trim()) return 'Please specify your parking location.';
  return '';
}

function validateVehicle(v) {
  return {
    type: v.type ? '' : 'Select a type.',
    reg: v.reg.trim() ? '' : 'Enter the registration number.',
    name: v.name.trim() ? '' : 'Enter the car name.',
  };
}

export default function EnquiryForm({ onClose }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [vehicleErrors, setVehicleErrors] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // In modal mode, auto-close a moment after a successful submit so the
  // visitor can carry on browsing the site.
  useEffect(() => {
    if (status === 'sent' && onClose) {
      const t = setTimeout(onClose, 2800);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  // ── field setters ──
  const setStatic = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validateStatic(key, { ...values, [key]: value }) }));
  };

  const setVehicle = (i, field, value) => {
    if (field === 'reg') value = value.toUpperCase();
    setValues((v) => {
      const vehicles = v.vehicles.map((veh, idx) => (idx === i ? { ...veh, [field]: value } : veh));
      return { ...v, vehicles };
    });
    setVehicleErrors((ve) => {
      if (!ve[i] || !ve[i][field]) return ve;
      const next = ve.slice();
      next[i] = { ...next[i], [field]: '' };
      return next;
    });
  };

  const addVehicle = () =>
    setValues((v) =>
      v.vehicles.length >= MAX_VEHICLES ? v : { ...v, vehicles: [...v.vehicles, emptyVehicle()] }
    );

  const removeVehicle = (i) =>
    setValues((v) => ({ ...v, vehicles: v.vehicles.filter((_, idx) => idx !== i) }));

  const onSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    STATIC_FIELD_ORDER.forEach((k) => {
      const msg = validateStatic(k, values);
      if (msg) nextErrors[k] = msg;
    });
    const nextVehicleErrors = values.vehicles.map(validateVehicle);
    const hasVehicleError = nextVehicleErrors.some((v) => v.type || v.reg || v.name);

    setErrors(nextErrors);
    setVehicleErrors(nextVehicleErrors);

    if (Object.keys(nextErrors).length || hasVehicleError) {
      requestAnimationFrame(() => {
        const first = document.querySelector('.enquiry-form .is-error, .enquiry-form .choice-group.is-error');
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    setStatus('sending');
    try {
      await submitEnquiry(values);
      setValues(initialValues());
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  // ── success view ──
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
              Register Another
            </button>
          )}
          <a href={SITE.whatsapp} className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // ── generic renderer for the simple fields ──
  const renderStatic = (key) => {
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
                type="button" key={opt} role="radio"
                aria-checked={values[key] === opt}
                className={`choice-pill${values[key] === opt ? ' selected' : ''}`}
                onClick={() => setStatic(key, opt)}
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
              onChange={(e) => setStatic(`${key}Other`, e.target.value)}
              aria-label="Other parking location"
            />
          )}
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
            onChange={(e) => setStatic(key, e.target.value)}
            onBlur={() => setErrors((er) => ({ ...er, [key]: validateStatic(key, values) }))}
          />
          {err && <span className="form-msg error-msg">{err}</span>}
        </div>
      );
    }

    return (
      <div className="form-group" key={key}>
        <label htmlFor={id} className="form-label">
          {f.label} {f.required && <span aria-hidden="true">*</span>}
        </label>
        <input
          id={id} type={f.type}
          className={`form-input${err ? ' is-error' : ''}`}
          placeholder={f.placeholder}
          autoComplete={f.autoComplete}
          maxLength={f.maxLength}
          value={values[key]}
          onChange={(e) => setStatic(key, e.target.value)}
          onBlur={() => setErrors((er) => ({ ...er, [key]: validateStatic(key, values) }))}
        />
        {err && <span className="form-msg error-msg">{err}</span>}
      </div>
    );
  };

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate aria-label="Glowzo car registration form">
      <div className="enquiry-grid">
        {renderStatic('fullName')}
        {renderStatic('mobile')}
        {renderStatic('society')}
        {renderStatic('flat')}
      </div>

      {/* ── Vehicles ── */}
      <div className="vehicle-section">
        <div className="vehicle-section__head">
          <span className="form-label" style={{ margin: 0 }}>
            Your Vehicle{values.vehicles.length > 1 ? 's' : ''} <span aria-hidden="true">*</span>
          </span>
          <span className="vehicle-section__count">{values.vehicles.length} of {MAX_VEHICLES}</span>
        </div>

        {values.vehicles.map((veh, i) => {
          const ve = vehicleErrors[i] || {};
          return (
            <div className="vehicle-card" key={i}>
              <div className="vehicle-card__head">
                <span className="vehicle-card__title">Vehicle {i + 1}</span>
                {values.vehicles.length > 1 && (
                  <button type="button" className="vehicle-remove" onClick={() => removeVehicle(i)} aria-label={`Remove vehicle ${i + 1}`}>
                    &times; Remove
                  </button>
                )}
              </div>

              <div className="form-group" style={{ marginBottom: '.6rem' }}>
                <label htmlFor={`veh-type-${i}`} className="form-label">Vehicle Type</label>
                <select
                  id={`veh-type-${i}`}
                  className={`form-input${ve.type ? ' is-error' : ''}`}
                  value={veh.type}
                  onChange={(e) => setVehicle(i, 'type', e.target.value)}
                >
                  <option value="" disabled>Select type…</option>
                  {VEHICLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {ve.type && <span className="form-msg error-msg">{ve.type}</span>}
              </div>

              <div className="enquiry-grid">
                <div className="form-group" style={{ marginBottom: '.6rem' }}>
                  <label htmlFor={`veh-reg-${i}`} className="form-label">Registration Number</label>
                  <input
                    id={`veh-reg-${i}`} type="text"
                    className={`form-input${ve.reg ? ' is-error' : ''}`}
                    placeholder="e.g. GJ01AB1234"
                    value={veh.reg}
                    onChange={(e) => setVehicle(i, 'reg', e.target.value)}
                  />
                  {ve.reg && <span className="form-msg error-msg">{ve.reg}</span>}
                </div>
                <div className="form-group" style={{ marginBottom: '.6rem' }}>
                  <label htmlFor={`veh-name-${i}`} className="form-label">Car Name</label>
                  <input
                    id={`veh-name-${i}`} type="text"
                    className={`form-input${ve.name ? ' is-error' : ''}`}
                    placeholder="e.g. Hyundai Creta"
                    value={veh.name}
                    onChange={(e) => setVehicle(i, 'name', e.target.value)}
                  />
                  {ve.name && <span className="form-msg error-msg">{ve.name}</span>}
                </div>
              </div>
            </div>
          );
        })}

        {values.vehicles.length < MAX_VEHICLES && (
          <button type="button" className="vehicle-add" onClick={addVehicle}>
            + Add Another Vehicle
          </button>
        )}
      </div>

      {renderStatic('parking')}
      {renderStatic('notes')}

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
