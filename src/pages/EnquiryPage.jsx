import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import { CheckIcon } from '../components/icons';
import useScrollReveal from '../hooks/useScrollReveal';

const PERKS = [
  'Doorstep service — we come to your society',
  'Eco-friendly, pH-neutral products',
  'Flexible slots, 7 days a week',
  'No advance payment required',
];

export default function EnquiryPage() {
  useScrollReveal([]);

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb navigation">
        <div className="container">
          <ol className="breadcrumb__list">
            <li className="breadcrumb__item"><Link to="/">Home</Link></li>
            <li className="breadcrumb__sep" aria-hidden="true">›</li>
            <li className="breadcrumb__item breadcrumb__item--active" aria-current="page">
              Register / Enquiry
            </li>
          </ol>
        </div>
      </nav>

      <section className="enquiry-hero" aria-labelledby="enquiry-title">
        <div className="container">
          <div className="enquiry-hero__inner">
            <div className="enquiry-hero__intro">
              <span className="hero__badge">
                <span className="hero__badge-dot" aria-hidden="true" />
                Free Registration
              </span>
              <h1 className="section-title" id="enquiry-title" style={{ textAlign: 'left' }}>
                Register Your Car<br />
                <span className="hero__title-grad">for Doorstep Care</span>
              </h1>
              <p className="section-subtitle" style={{ margin: '0 0 var(--sp-xl)', textAlign: 'left' }}>
                Share your details and our team will reach out to schedule your first
                Glowzo wash — right where your car is parked.
              </p>
              <ul className="enquiry-perks">
                {PERKS.map((p) => (
                  <li key={p} className="enquiry-perk">
                    <span className="enquiry-perk__check" aria-hidden="true"><CheckIcon /></span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="enquiry-card">
              <h2 className="enquiry-card__title">Car Registration Form</h2>
              <p className="enquiry-card__sub">Fields marked * are required.</p>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
