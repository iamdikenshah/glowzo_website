import { Link } from "react-router-dom";
import Icon from "./Icon";
import { BRAND, telLink } from "../config/brand";

export default function CtaBanner() {
  return (
    <section className="section section-teal cta-banner">
      <div className="container">
        <h2>Ready to get started?</h2>
        <p>
          Book a vetted professional in minutes. Tell us what you need and we'll get back to you
          with a free, no-obligation quote.
        </p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary btn-lg">Get a Free Quote</Link>
          <a href={telLink} className="cta-phone">
            <Icon name="phone" /> {BRAND.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
