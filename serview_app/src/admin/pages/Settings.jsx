import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateAdminProfile } from "../../firebase/auth";

export default function Settings() {
  const { user } = useOutletContext();
  const [name, setName] = useState(user?.displayName || "");
  const [status, setStatus] = useState("idle"); // idle | saving | done | error

  const save = async (e) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await updateAdminProfile({ displayName: name });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Settings</h1>
          <p>Manage your admin account.</p>
        </div>
      </div>

      <div className="admin-panel" style={{ maxWidth: 520 }}>
        <h2>Profile</h2>
        <form className="admin-form" onSubmit={save}>
          <div className="field">
            <label>Signed in as</label>
            <input value={user?.email || ""} disabled />
          </div>
          <div className="field">
            <label>Display name</label>
            <input value={name} onChange={(e) => { setName(e.target.value); setStatus("idle"); }}
              placeholder="e.g. Priya" />
          </div>
          {status === "done" && <p className="admin-hint" style={{ color: "var(--teal)" }}>Saved.</p>}
          {status === "error" && <div className="admin-error">Couldn't save. Please try again.</div>}
          <button type="submit" className="abtn abtn-primary" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>

      <div className="admin-panel" style={{ maxWidth: 520 }}>
        <h2>About the CMS</h2>
        <p className="admin-hint">
          This admin panel manages the content on your live site. Services and reviews you add here
          replace the built-in placeholders. Password changes and new admin accounts are managed from
          the Firebase console.
        </p>
      </div>
    </>
  );
}
