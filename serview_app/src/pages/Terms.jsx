import Seo from "../components/Seo";
import { BRAND } from "../config/brand";

export default function Terms() {
  return (
    <main>
      <Seo
        title="Terms & Conditions"
        description={`The terms governing use of the ${BRAND.name} website and services.`}
        path="/terms"
      />
      <section className="page-hero">
        <div className="container">
          <h1>Terms &amp; Conditions</h1>
          <p>The terms that govern your use of our website and services.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <p className="updated">Last updated: {new Date().getFullYear()}</p>

          <p>
            By using the {BRAND.name} website and requesting our services, you agree to the following terms.
            Please read them carefully.
          </p>

          <h2>Our services</h2>
          <p>
            {BRAND.name} arranges home services — including cleaning, repairs and maintenance — through
            vetted professionals in {BRAND.serviceArea}. Prices quoted are estimates; the final price is
            confirmed before work begins.
          </p>

          <h2>Bookings &amp; enquiries</h2>
          <ul>
            <li>Submitting an enquiry is a request for service, not a confirmed booking.</li>
            <li>We'll contact you to confirm availability, scope and pricing before scheduling.</li>
            <li>Please provide accurate contact and service details so we can serve you well.</li>
          </ul>

          <h2>Cancellations</h2>
          <p>
            You may reschedule or cancel a booking by contacting us in advance. Repeated last-minute
            cancellations may be subject to a fee, which we'll always tell you about beforehand.
          </p>

          <h2>Satisfaction guarantee</h2>
          <p>
            If you're not satisfied with completed work, let us know within a reasonable period and we'll
            make it right in line with our guarantee.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Our liability is limited to the value of the service provided. We are not liable for indirect
            or consequential losses to the extent permitted by law.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or call
            {" "}{BRAND.phoneDisplay}.
          </p>
        </div>
      </section>
    </main>
  );
}
