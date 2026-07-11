import { useEffect, useMemo, useState } from "react";
import Modal from "../components/Modal";
import { getEnquiries, markEnquiryStatus, deleteEnquiry } from "../../firebase/firestore";

const STATUSES = ["new", "contacted", "scheduled", "completed"];

const fmtDate = (ts) => {
  const d = ts?.toDate ? ts.toDate() : ts instanceof Date ? ts : null;
  return d ? d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
};

export default function EnquiriesInbox() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewing, setViewing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getEnquiries());
      setError("");
    } catch {
      setError("Couldn't load enquiries. Check your Firebase config.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (e, status) => {
    // Optimistic update.
    setItems((list) => list.map((x) => (x.id === e.id ? { ...x, status } : x)));
    try { await markEnquiryStatus(e.id, status); }
    catch { setError("Couldn't update status."); load(); }
  };

  const remove = async (e) => {
    if (!confirm(`Delete enquiry from ${e.name}?`)) return;
    try { await deleteEnquiry(e.id); setViewing(null); await load(); }
    catch { setError("Delete failed."); }
  };

  const counts = useMemo(() => {
    const c = { all: items.length };
    for (const s of STATUSES) c[s] = items.filter((i) => (i.status || "new") === s).length;
    return c;
  }, [items]);

  const filtered = filter === "all" ? items : items.filter((i) => (i.status || "new") === filter);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Enquiries</h1>
          <p>Leads submitted through your website.</p>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="filter-tabs" style={{ justifyContent: "flex-start", marginBottom: "1.25rem" }}>
        {["all", ...STATUSES].map((s) => (
          <button key={s} className={`filter-tab ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
            {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)} ({counts[s] ?? 0})
          </button>
        ))}
      </div>

      <div className="admin-panel">
        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="admin-empty">No enquiries {filter !== "all" ? `with status "${filter}"` : "yet"}.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Received</th><th>Name</th><th>Service</th><th>Contact</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{fmtDate(e.createdAt)}</td>
                    <td><b>{e.name}</b></td>
                    <td>{e.serviceRequested || "—"}</td>
                    <td>{e.phone}<div className="admin-hint">{e.email}</div></td>
                    <td>
                      <select className="pill" value={e.status || "new"}
                        onChange={(ev) => setStatus(e, ev.target.value)}
                        style={{ border: "1px solid var(--admin-border)", padding: "0.25rem 0.4rem", borderRadius: 8 }}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="abtn abtn-ghost" onClick={() => setViewing(e)}>View</button>
                        <button className="abtn abtn-danger" onClick={() => remove(e)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewing && (
        <Modal title={`Enquiry from ${viewing.name}`} onClose={() => setViewing(null)}>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <Row label="Received" value={fmtDate(viewing.createdAt)} />
            <Row label="Name" value={viewing.name} />
            <Row label="Phone" value={<a href={`tel:${viewing.phone}`}>{viewing.phone}</a>} />
            <Row label="Email" value={viewing.email ? <a href={`mailto:${viewing.email}`}>{viewing.email}</a> : "—"} />
            <Row label="Service" value={viewing.serviceRequested || "—"} />
            <Row label="Preferred date" value={viewing.preferredDate || "—"} />
            <Row label="Message" value={viewing.message || "—"} />
            <Row label="Status" value={<span className={`pill pill-${viewing.status || "new"}`}>{viewing.status || "new"}</span>} />
          </div>
          <div className="admin-modal-actions">
            <button className="abtn abtn-danger" onClick={() => remove(viewing)}>Delete</button>
            <button className="abtn abtn-primary" onClick={() => setViewing(null)}>Close</button>
          </div>
        </Modal>
      )}
    </>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "0.75rem" }}>
      <span className="admin-hint">{label}</span>
      <span>{value}</span>
    </div>
  );
}
