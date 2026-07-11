import Seo from "../components/Seo";
import { BRAND } from "../config/brand";

export default function Privacy() {
  return (
    <main>
      <Seo
        title="Privacy Policy"
        description={`How ${BRAND.name} collects, uses and protects your personal data.`}
        path="/privacy"
      />
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How we collect, use and protect the information you share with us.</p>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <p className="updated">Last updated: {new Date().getFullYear()}</p>

          <p>
            {BRAND.name} ("we", "us") is committed to protecting your privacy. This policy explains what
            personal information we collect when you use our website or request a service, and how we
            handle it.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Contact details you provide in an enquiry — name, phone number and email.</li>
            <li>Service details — the service requested, preferred date and any message you send.</li>
            <li>Basic, anonymised usage analytics to help us improve the website.</li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your enquiry and schedule the service you requested.</li>
            <li>To contact you about your booking and provide customer support.</li>
            <li>To improve our services and website experience.</li>
          </ul>

          <h2>Sharing</h2>
          <p>
            We do not sell your personal data. We share it only with the assigned service professional
            to the extent needed to complete your booking, and where required by law.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal data at any time by
            contacting us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or
            call {BRAND.phoneDisplay}.
          </p>
        </div>
      </section>
    </main>
  );
}
