import { SITE } from '../data/site';

const ITEMS = [
  { em: '📅', text: '7 Days a Week' },
  { em: '🚗', text: 'Doorstep Service' },
  { em: '🌿', text: 'Eco-Friendly Clean' },
  { em: '⭐', text: '4.9 Rated by 500+' },
];

export default function AvailabilityBand() {
  return (
    <section className="trustbar" aria-label="Availability highlights">
      <div className="container trustbar-inner">
        <div className="trustbar-items">
          {ITEMS.map((i) => (
            <span className="trustbar-item" key={i.text}>
              <span className="em" aria-hidden="true">{i.em}</span> {i.text}
            </span>
          ))}
        </div>
        <a href={SITE.whatsapp} className="trustbar-cta" target="_blank" rel="noopener noreferrer">
          Chat with us →
        </a>
      </div>
    </section>
  );
}
