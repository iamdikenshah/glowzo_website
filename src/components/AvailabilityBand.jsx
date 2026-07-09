import { SITE } from '../data/site';

const ITEMS = [
  { icon: '📅', text: '7 Days a Week' },
  { icon: '🚗', text: 'Doorstep Service' },
  { icon: '🌿', text: 'Eco-Friendly Clean' },
  { icon: '⭐', text: '4.9 Rated by 500+' },
];

export default function AvailabilityBand() {
  return (
    <section className="availability" aria-label="Availability highlights">
      <div className="container availability__inner">
        <ul className="availability__items">
          {ITEMS.map((i) => (
            <li key={i.text}>
              <span aria-hidden="true">{i.icon}</span> {i.text}
            </li>
          ))}
        </ul>
        <a href={SITE.whatsapp} className="availability__cta" target="_blank" rel="noopener noreferrer">
          Chat with us →
        </a>
      </div>
    </section>
  );
}
