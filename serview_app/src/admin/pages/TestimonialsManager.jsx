import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Stars } from "../../components/TestimonialCard";
import {
  getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
} from "../../firebase/firestore";
import { SERVICES } from "../../data/content";

const BLANK = { customerName: "", quote: "", rating: 5, serviceType: "", approved: false };

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getTestimonials());
      setError("");
    } catch {
      setError("Couldn't load reviews. Check your Firebase config.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(BLANK); setEditing("new"); };
  const openEdit = (t) => { setForm({ ...BLANK, ...t }); setEditing(t); };
  const close = () => { setEditing(null); setSaving(false); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleApprove = async (t) => {
    try {
      await updateTestimonial(t.id, { approved: !t.approved });
      await load();
    } catch { setError("Update failed."); }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      customerName: form.customerName.trim(),
      quote: form.quote.trim(),
      rating: Number(form.rating) || 5,
      serviceType: form.serviceType,
      approved: !!form.approved,
    };
    try {
      if (editing === "new") await addTestimonial(payload);
      else await updateTestimonial(editing.id, payload);
      await load();
      close();
    } catch {
      setError("Save failed. Please try again.");
      setSaving(false);
    }
  };

  const remove = async (t) => {
    if (!confirm(`Delete this review from ${t.customerName}?`)) return;
    try { await deleteTestimonial(t.id); await load(); }
    catch { setError("Delete failed."); }
  };

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Reviews</h1>
          <p>Only approved reviews appear on the public site.</p>
        </div>
        <button className="abtn abtn-primary" onClick={openNew}>+ New review</button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-panel">
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : items.length === 0 ? (
          <p className="admin-empty">No reviews yet. The site shows placeholder reviews until you add real ones.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Customer</th><th>Quote</th><th>Rating</th><th>Live?</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((t) => (
                  <tr key={t.id}>
                    <td><b>{t.customerName}</b><div className="admin-hint">{t.serviceType}</div></td>
                    <td style={{ maxWidth: 320 }}>{t.quote}</td>
                    <td><Stars rating={t.rating} /></td>
                    <td><span className={`pill ${t.approved ? "pill-yes" : "pill-no"}`}>{t.approved ? "Approved" : "Pending"}</span></td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="abtn abtn-amber" onClick={() => toggleApprove(t)}>
                          {t.approved ? "Unpublish" : "Approve"}
                        </button>
                        <button className="abtn abtn-ghost" onClick={() => openEdit(t)}>Edit</button>
                        <button className="abtn abtn-danger" onClick={() => remove(t)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <Modal title={editing === "new" ? "New review" : `Edit review`} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <div className="admin-form-row">
              <div className="field">
                <label>Customer name</label>
                <input value={form.customerName} onChange={set("customerName")} required />
              </div>
              <div className="field">
                <label>Rating</label>
                <select value={form.rating} onChange={set("rating")}>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label>Service type</label>
              <select value={form.serviceType} onChange={set("serviceType")}>
                <option value="">Select…</option>
                {SERVICES.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Quote</label>
              <textarea value={form.quote} onChange={set("quote")} rows={4} required />
            </div>
            <div className="field">
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexDirection: "row" }}>
                <input type="checkbox" checked={form.approved} style={{ width: "auto" }}
                  onChange={(e) => setForm((f) => ({ ...f, approved: e.target.checked }))} />
                Approved (show on public site)
              </label>
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="abtn abtn-ghost" onClick={close}>Cancel</button>
              <button type="submit" className="abtn abtn-primary" disabled={saving}>
                {saving ? "Saving…" : "Save review"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
