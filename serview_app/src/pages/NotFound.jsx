import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <main>
      <Seo title="Page not found" description="The page you're looking for doesn't exist." />
      <section className="container notfound">
        <div className="big">404</div>
        <h1>We couldn't find that page</h1>
        <p>The page you're looking for may have moved or no longer exists.</p>
        <div className="cta-actions" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn-teal btn-lg">Back to Home</Link>
          <Link to="/services" className="btn btn-ghost btn-lg">Browse Services</Link>
        </div>
      </section>
    </main>
  );
}
