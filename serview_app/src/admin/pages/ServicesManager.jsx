import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { getServices, addService, updateService, deleteService } from "../../firebase/firestore";
import { SERVICE_CATEGORIES } from "../../data/content";

const ICONS = ["sparkle", "wrench", "bolt", "droplet", "roller", "plug", "chair", "shield"];
const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const BLANK = {
  name: "", slug: "", category: SERVICE_CATEGORIES[0], icon: "wrench",
  shortDescription: "", fullDescription: "", startingPrice: "", imageUrl: "",
  order: 99, includesText: "",
};

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // service object or BLANK (new) or null
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setServices(await getServices());
      setError("");
    } catch {
      setError("Couldn't load services. Check your Firebase config.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(BLANK); setEditing("new"); };
  const openEdit = (s) => {
    setForm({ ...BLANK, ...s, includesText: (s.includes || []).join("\n") });
    setEditing(s);
  };
  const close = () => { setEditing(null); setSaving(false); };

  const set = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => {
      const next = { ...f, [k]: v };
      // Auto-suggest a slug from the name until the user edits the slug directly.
      if (k === "name" && (!f.slug || f.slug === slugify(f.name))) next.slug = slugify(v);
      return next;
    });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      slug: slugify(form.slug || form.name),
      category: form.category,
      icon: form.icon,
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      startingPrice: form.startingPrice.trim(),
      imageUrl: form.imageUrl.trim(),
      order: Number(form.order) || 99,
      includes: form.includesText.split("\n").map((l) => l.trim()).filter(Boolean),
    };
    try {
      if (editing === "new") await addService(payload);
      else await updateService(editing.id, payload);
      await load();
      close();
    } catch (err) {
      setError("Save failed. Please try again.");
      setSaving(false);
    }
  };

  const remove = async (s) => {
    if (!confirm(`Delete "${s.name}"? This can't be undone.`)) return;
    try {
      await deleteService(s.id);
      await load();
    } catch {
      setError("Delete failed. Please try again.");
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Services</h1>
          <p>Create and edit the services shown on your website.</p>
        </div>
        <button className="abtn abtn-primary" onClick={openNew}>+ New service</button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-panel">
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : services.length === 0 ? (
          <p className="admin-empty">
            No services in the CMS yet. Your site is showing the built-in seed catalog until you add
            some here. Click “New service” to start.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Order</th><th>Name</th><th>Category</th><th>From</th><th></th></tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <td>{s.order ?? "—"}</td>
                    <td><b>{s.name}</b><div className="admin-hint">/{s.slug}</div></td>
                    <td>{s.category}</td>
                    <td>{s.startingPrice || "—"}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="abtn abtn-ghost" onClick={() => openEdit(s)}>Edit</button>
                        <button className="abtn abtn-danger" onClick={() => remove(s)}>Delete</button>
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
        <Modal title={editing === "new" ? "New service" : `Edit: ${editing.name}`} onClose={close}>
          <form className="admin-form" onSubmit={save}>
            <div className="admin-form-row">
              <div className="field">
                <label>Name</label>
                <input value={form.name} onChange={set("name")} required />
              </div>
              <div className="field">
                <label>Slug (URL)</label>
                <input value={form.slug} onChange={set("slug")} placeholder="house-cleaning" required />
              </div>
            </div>
            <div className="admin-form-row">
              <div className="field">
                <label>Category</label>
                <select value={form.category} onChange={set("category")}>
                  {SERVICE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Icon</label>
                <select value={form.icon} onChange={set("icon")}>
                  {ICONS.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div className="admin-form-row">
              <div className="field">
                <label>Starting price</label>
                <input value={form.startingPrice} onChange={set("startingPrice")} placeholder="₹799" />
              </div>
              <div className="field">
                <label>Display order</label>
                <input type="number" value={form.order} onChange={set("order")} />
              </div>
            </div>
            <div className="field">
              <label>Short description</label>
              <input value={form.shortDescription} onChange={set("shortDescription")} required />
            </div>
            <div className="field">
              <label>Full description</label>
              <textarea value={form.fullDescription} onChange={set("fullDescription")} />
            </div>
            <div className="field">
              <label>What's included <span className="admin-hint">(one per line)</span></label>
              <textarea value={form.includesText} onChange={set("includesText")} rows={5} />
            </div>
            <div className="field">
              <label>Image URL <span className="admin-hint">(optional)</span></label>
              <input value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://…" />
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="abtn abtn-ghost" onClick={close}>Cancel</button>
              <button type="submit" className="abtn abtn-primary" disabled={saving}>
                {saving ? "Saving…" : "Save service"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
