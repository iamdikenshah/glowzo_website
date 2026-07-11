import { STATS } from '../data/content';

export default function Stats() {
  return (
    <section className="section section-tint" aria-label="Glowzo by the numbers">
      <div className="container">
        <div className="stat-cards">
          {STATS.map((s) => (
            <div className="stat-card reveal" key={s.label}>
              <b>{s.num}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
