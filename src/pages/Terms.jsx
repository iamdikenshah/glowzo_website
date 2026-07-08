import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

const UPDATED = 'July 2026';

export default function Terms() {
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Home</Link></li>
            <li className="breadcrumb__sep" aria-hidden="true">›</li>
            <li className="breadcrumb__item breadcrumb__item--active" aria-current="page">
              Terms &amp; Conditions
            </li>
          </ol>
        </div>
      </nav>

      <section className="section legal">
        <div className="container legal__inner">
          <header className="legal__head">
            <img src="/logo.jpeg" alt="Glowzo" className="legal__logo" />
            <h1 className="legal__title">Terms &amp; Conditions</h1>
            <p className="legal__updated">Last updated: {UPDATED}</p>
          </header>

          <p>
            Welcome to Glowzo. These Terms &amp; Conditions ("Terms") govern your use of our
            doorstep car cleaning services and website. By registering for a plan or booking a
            service, you agree to these Terms.
          </p>

          <h2>1. Services</h2>
          <p>
            Glowzo provides doorstep car cleaning services, including daily exterior cleaning and
            interior foam cleaning, on a monthly subscription basis. Service availability depends on
            your location falling within our active service areas.
          </p>

          <h2>2. Subscription &amp; Billing</h2>
          <ul>
            <li>Plans are billed per vehicle, per month, based on the vehicle category selected.</li>
            <li>Prices are as listed on our website and may be revised with prior notice.</li>
            <li>Applicable taxes, if any, are additional.</li>
            <li>SUV, premium and luxury vehicles are charged as per their respective tiers.</li>
          </ul>

          <h2>3. Scheduling &amp; Access</h2>
          <p>
            Daily cleaning is performed at your registered parking location. You are responsible for
            ensuring the vehicle is accessible and that any society/building access is arranged.
            Missed cleanings due to an inaccessible vehicle are not carried forward or refunded.
          </p>

          <h2>4. Cancellation &amp; Refunds</h2>
          <ul>
            <li>You may cancel your subscription at any time; cancellation takes effect from the next billing cycle.</li>
            <li>Fees already paid for the current cycle are non-refundable unless required by law.</li>
            <li>Glowzo may pause or cancel service in areas we no longer cover, with prior notice.</li>
          </ul>

          <h2>5. Customer Responsibilities</h2>
          <p>
            Please remove valuables and personal belongings from the vehicle before cleaning. Glowzo
            is not responsible for items left inside. Inform us in advance of any delicate finishes,
            wraps, or modifications requiring special care.
          </p>

          <h2>6. Liability</h2>
          <p>
            Our team takes utmost care of your vehicle. In the unlikely event of damage directly and
            demonstrably caused by our service, our liability is limited to the reasonable cost of
            repair of the affected area. Glowzo is not liable for pre-existing damage or normal wear.
          </p>

          <h2>7. Privacy</h2>
          <p>
            Details you share (name, contact number, address and vehicle information) are used solely
            to provide and improve our services and to contact you about your booking. We do not sell
            your personal information.
          </p>

          <h2>8. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of our services after changes
            are posted constitutes acceptance of the revised Terms.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these Terms? Reach us at{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{' '}
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>

          <p className="legal__back">
            <Link to="/" className="back-link">← Back to Home</Link>
          </p>
        </div>
      </section>
    </>
  );
}
