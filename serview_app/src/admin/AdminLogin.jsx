import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signIn } from "../firebase/auth";
import { isConfigured } from "../firebase/config";
import { useAuth } from "./useAuth";

export default function AdminLogin() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in → straight to the dashboard.
  if (!loading && user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      // ProtectedRoute picks up the new auth state and renders the dashboard.
    } catch (err) {
      setError(
        err?.code === "auth/invalid-credential" || err?.code === "auth/wrong-password"
          ? "Incorrect email or password."
          : "Sign-in failed. Please try again."
      );
      setBusy(false);
    }
  };

  return (
    <div className="admin admin-login" style={{ display: "grid" }}>
      <div className="admin-login-card">
        <div className="admin-brand">
          <img src="/favicon.svg" alt="" />
          <span>Serv<b>View</b></span>
        </div>
        <h1>Admin Sign In</h1>
        <p className="sub">Manage services, reviews and enquiries.</p>

        {!isConfigured && (
          <div className="admin-error">
            Firebase isn't configured for this build. Add your <code>VITE_FB_*</code> values to
            <code> .env.local</code> to enable sign-in.
          </div>
        )}
        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={onSubmit} className="admin-form">
          <div className="field">
            <label htmlFor="al-email">Email</label>
            <input id="al-email" type="email" autoComplete="username" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="al-pass">Password</label>
            <input id="al-pass" type="password" autoComplete="current-password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="abtn abtn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.7rem" }}
            disabled={busy || !isConfigured}>
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
