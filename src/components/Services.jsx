import { SERVICES } from '../data/content';
import { useEnquiryModal } from '../context/EnquiryModalContext';

const CarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.5 8H3L5 14H16L17.5 8ZM16.5 14.5C16.5 15.3 15.8 16 15 16C14.2 16 13.5 15.3 13.5 14.5H9.5C9.5 15.3 8.8 16 8 16C7.2 16 6.5 15.3 6.5 14.5H5V16H18V14.5H16.5Z" />
    <path d="M19 5H17.5L16 2H6L4.5 5H3C2.4 5 2 5.4 2 6C2 6.6 2.4 7 3 7H19C19.6 7 20 6.6 20 6C20 5.4 19.6 5 19 5Z" />
    <path d="M21 10C20.4 10 20 10.4 20 11V14H22V11C22 10.4 21.6 10 21 10Z" />
  </svg>
);

const FoamIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2a3 3 0 0 0-2.83 2A3.5 3.5 0 0 0 5 7.5a3.5 3.5 0 0 0 .5 1.8A3 3 0 0 0 4 12a3 3 0 0 0 2 2.83V15a6 6 0 0 0 12 0v-.17A3 3 0 0 0 20 12a3 3 0 0 0-1.5-2.7A3.5 3.5 0 0 0 19 7.5 3.5 3.5 0 0 0 14.83 4 3 3 0 0 0 12 2Z" />
    <circle cx="9" cy="19.5" r="1.6" />
    <circle cx="14.5" cy="20.5" r="1.2" />
  </svg>
);

const ICONS = { car: CarIcon, foam: FoamIcon };

export default function Services() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title" id="services-title">Our Car Cleaning Services</h2>
          <p className="section-subtitle">
            Professional doorstep car care that keeps your vehicle spotless — inside and out.
          </p>
        </header>

        <div className="services__grid services__grid--2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <article className={`service-card reveal${i ? ' reveal-d1' : ''}`} key={s.key}>
                <div className="service-card__icon" aria-hidden="true"><Icon /></div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <ul className="service-card__points">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="service-card__footer">
                  <button type="button" onClick={openEnquiry} className="btn btn-primary btn-sm">
                    Book Now
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
