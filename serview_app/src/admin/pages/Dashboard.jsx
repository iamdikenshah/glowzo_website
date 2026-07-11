import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getServices, getTestimonials, getEnquiries } from "../../firebase/firestore";

export default function Dashboard() {
  const { user } = useOutletContext();
  const [metrics, setMetrics] = useState(null);
  const [recent, setRecent] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [services, testimonials, enquiries] = await Promise.all([
          getServices(),
          getTestimonials(),
          getEnquiries(),
        ]);
        setMetrics({
          services: services.length,
          testimonials: testimonials.length,
          pendingReviews: testimonials.filter((t) => !t.approved).length,
          newEnquiries: enquiries.filter((e) => e.status === "new").length,
          totalEnquiries: enquiries.length,
        });
        setRecent(enquiries.slice(0, 5));
      } catch (err) {
        setError("Couldn't load dashboard data. Check your Firebase config and connection.");
      }
    })();
  }, []);

  const greeting = user?.displayName ? `Welcome back, ${user.displayName}` : "Welcome back";

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>{greeting} — here's what's happening.</p>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <div className="admin-metrics">
        <div className="admin-metric"><b>{metrics?.services ?? "—"}</b><span>Services</span></div>
        <div className="admin-metric"><b>{metrics?.newEnquiries ?? "—"}</b><span>New enquiries</span></div>
        <div className="admin-metric"><b>{metrics?.pendingReviews ?? "—"}</b><span>Reviews to approve</span></div>
        <div className="admin-metric"><b>{metrics?.totalEnquiries ?? "—"}</b><span>Total enquiries</span></div>
      </div>

      <div className="admin-panel">
        <h2>Recent enquiries</h2>
        {recent.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Service</th><th>Phone</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.serviceRequested || "—"}</td>
                    <td>{e.phone}</td>
                    <td><span className={`pill pill-${e.status || "new"}`}>{e.status || "new"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-empty">No enquiries yet.</p>
        )}
        <div style={{ marginTop: "1rem" }}>
          <Link to="/admin/enquiries" className="abtn abtn-ghost">View all enquiries</Link>
        </div>
      </div>
    </>
  );
}
