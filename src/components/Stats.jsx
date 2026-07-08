import { STATS } from '../data/content';

export default function Stats() {
  return (
    <section className="stats" aria-label="Glowzo by the numbers">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div className="stat-card reveal" key={s.label}>
              <span className="stat-card__num">{s.num}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
