import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { signOutAdmin } from "../firebase/auth";
import { useAuth } from "./useAuth";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: "home", end: true },
  { to: "/admin/services", label: "Services", icon: "wrench" },
  { to: "/admin/testimonials", label: "Reviews", icon: "star" },
  { to: "/admin/enquiries", label: "Enquiries", icon: "chat" },
  { to: "/admin/settings", label: "Settings", icon: "badge-check" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSignOut = async () => {
    await signOutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/favicon.svg" alt="" />
          <span style={{ color: "#fff" }}>Serv<b style={{ color: "var(--amber)" }}>View</b></span>
        </div>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className="admin-nav-link">
            <Icon name={n.icon} /> {n.label}
          </NavLink>
        ))}
        <div className="admin-sidebar-foot">
          <a href="/" target="_blank" rel="noreferrer" className="admin-nav-link">
            <Icon name="arrow-right" /> View site
          </a>
          <button className="admin-nav-link admin-signout" onClick={onSignOut}>
            <Icon name="close" /> Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
