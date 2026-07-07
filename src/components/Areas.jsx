import { AREAS } from '../data/content';

export default function Areas() {
  return (
    <section className="areas section" id="areas" aria-labelledby="areas-title">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-tag">Coverage</span>
          <h2 className="section-title" id="areas-title">Where We Operate</h2>
          <p className="section-subtitle">
            Currently serving Bopal, Ahmedabad — expanding to more areas soon!
          </p>
        </header>

        <div className="areas__inner">
          <div className="reveal">
            <p className="areas__desc">
              Glowzo currently operates in <strong>Bopal, Ahmedabad</strong>. Our team is ready to
              service your vehicle wherever you are within our coverage zone — home, office, or any
              convenient location. We're actively working to expand to more neighbourhoods in Ahmedabad.
            </p>

            <div className="areas__badges" role="list" aria-label="Service areas">
              {AREAS.map((a) =>
                a.active ? (
                  <span
                    key={a.name}
                    className="area-badge area-badge--active"
                    role="listitem"
                    aria-label={`Currently serving: ${a.name}`}
                  >
                    <span className="badge-dot" aria-hidden="true" />
                    {a.name}
                  </span>
                ) : (
                  <span
                    key={a.name}
                    className="area-badge area-badge--soon"
                    role="listitem"
                    aria-label={`${a.name} — Coming soon`}
                  >
                    {a.name} <span className="badge-soon-pill" aria-hidden="true">Soon</span>
                  </span>
                )
              )}
            </div>
          </div>

          <div className="areas__map-wrap reveal reveal-d1" aria-label="Map showing Bopal, Ahmedabad service area">
            <iframe
              src="https://maps.google.com/maps?q=Bopal,Ahmedabad,Gujarat&output=embed&z=14"
              title="Map of Bopal, Ahmedabad — Glowzo service area"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
