import { SERVICE_AREAS } from '../data/content';
import { MapPinIcon } from './icons';

export default function ServiceAreas() {
  const active = SERVICE_AREAS.filter((a) => a.active);
  const soon = SERVICE_AREAS.filter((a) => !a.active);

  return (
    <section className="areas section" id="areas" aria-labelledby="areas-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Coverage</span>
          <h2 className="section-title" id="areas-title">Where We Operate</h2>
          <p className="section-subtitle">
            Doorstep car cleaning across Ahmedabad — with more neighbourhoods launching soon.
          </p>
        </header>

        <div className="areas-panel reveal">
          <div className="areas-group">
            <p className="areas-group__label">
              <span className="areas-group__dot" aria-hidden="true" /> Available Now
            </p>
            <div className="areas-live" role="list">
              {active.map((a) => (
                <div className="area-live" role="listitem" key={a.name}>
                  <span className="area-live__pin" aria-hidden="true"><MapPinIcon /></span>
                  <span className="area-live__name">{a.name}</span>
                  <span className="area-live__tag">Live</span>
                </div>
              ))}
            </div>
          </div>

          <div className="areas-group">
            <p className="areas-group__label areas-group__label--muted">Coming Soon</p>
            <div className="areas-soon" role="list">
              {soon.map((a) => (
                <span className="area-soon" role="listitem" key={a.name}>{a.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
