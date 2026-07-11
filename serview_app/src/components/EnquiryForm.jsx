import { useState } from "react";
import Icon from "./Icon";
import { trackEvent } from "../analytics";
import { SERVICES } from "../data/content";
import { BRAND } from "../config/brand";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts 10-digit local or +country formats, ignoring spaces/dashes.
const PHONE_RE = /^[+]?[\d][\d\s-]{7,}$/;

const EMPTY = { name: "", phone: "", email: "", serviceRequested: "", preferredDate: "", message: "" };

/**
 * Enquiry / quote-request form. Writes to the Firestore `enquiries` collection
 * (best-effort — still shows success in unconfigured/demo builds) and swaps to a
 * confirmation state on submit.
 *
 * @param {{ defaultService?: string, source?: string, compact?: boolean }} props
 */
export default function EnquiryForm({ defaultService = "", source = "contact", compact = false }) {
  const [form, setForm] = useState({ ...EMPTY, serviceRequested: defaultService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    else if (!PHONE_RE.test(form.phone.trim())) e.phone = "Enter a valid phone number.";
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.serviceRequested) e.serviceRequested = "Please choose a service.";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    setStatus("submitting");
    try {
      // Dynamic-import Firestore so its SDK stays off the public critical bundle.
      const { addEnquiry } = await import("../firebase/firestore");
      await addEnquiry({ ...form });
      trackEvent("enquiry_submit", { source, service: form.serviceRequested });
      setStatus("done");
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="form-card form-success" role="status">
        <span className="icon-chip"><Icon name="check-circle" size={32} /></span>
        <h3>Thank you — we've got your request!</h3>
        <p>
          Our team will reach out shortly to confirm your booking. For anything urgent,
          call us at <a href={`tel:+${BRAND.phone}`}>{BRAND.phoneDisplay}</a>.
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => { setForm({ ...EMPTY, serviceRequested: defaultService }); setStatus("idle"); }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      {!compact && <h3 style={{ marginBottom: "1.25rem" }}>Request a Free Quote</h3>}

      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-name">Name <span className="req">*</span></label>
          <input id="ef-name" type="text" autoComplete="name" value={form.name}
            onChange={set("name")} className={errors.name ? "invalid" : ""} />
          {errors.name && <span className="err-msg">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="ef-phone">Phone <span className="req">*</span></label>
          <input id="ef-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone}
            onChange={set("phone")} className={errors.phone ? "invalid" : ""} />
          {errors.phone && <span className="err-msg">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="ef-email">Email</label>
          <input id="ef-email" type="email" autoComplete="email" value={form.email}
            onChange={set("email")} className={errors.email ? "invalid" : ""} />
          {errors.email && <span className="err-msg">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="ef-service">Service needed <span className="req">*</span></label>
          <select id="ef-service" value={form.serviceRequested}
            onChange={set("serviceRequested")} className={errors.serviceRequested ? "invalid" : ""}>
            <option value="">Select a service…</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
            <option value="Other / Not sure">Other / Not sure</option>
          </select>
          {errors.serviceRequested && <span className="err-msg">{errors.serviceRequested}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="ef-date">Preferred date</label>
        <input id="ef-date" type="date" value={form.preferredDate} onChange={set("preferredDate")} />
      </div>

      <div className="field">
        <label htmlFor="ef-message">Message</label>
        <textarea id="ef-message" placeholder="Tell us a little about what you need…"
          value={form.message} onChange={set("message")} />
      </div>

      {status === "error" && (
        <p className="err-msg" style={{ marginBottom: "0.75rem" }}>
          Something went wrong sending your enquiry. Please try again or call us directly.
        </p>
      )}

      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Get My Free Quote"}
      </button>
      <p className="form-note">We'll never share your details. No spam, ever.</p>
    </form>
  );
}
