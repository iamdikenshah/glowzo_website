import { useEnquiryModal } from '../context/EnquiryModalContext';

const HIGHLIGHTS = [
  { icon: '🚗', title: 'Doorstep Daily', text: 'We come to your home or office every day — you never move your car.' },
  { icon: '🌿', title: 'Eco-Friendly', text: 'pH-neutral, biodegradable products that are safe for your paint and the planet.' },
  { icon: '👨‍🔧', title: 'Trained Team', text: 'Professionals trained to care for every vehicle type, from hatchbacks to luxury.' },
  { icon: '💧', title: 'Water-Smart', text: 'Waterless & low-water techniques that keep your car spotless with minimal waste.' },
];

export default function About() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about__inner">
          <div className="about__intro reveal">
            <span className="section-tag">About Us</span>
            <h2 className="section-title" id="about-title" style={{ textAlign: 'left' }}>
              Car Care, Reimagined for Busy Lives
            </h2>
            <p className="about__text">
              Glowzo is a doorstep car cleaning service born in <strong>Bopal, Ahmedabad</strong>.
              We believe a clean car shouldn't cost you time or a trip to the wash centre.
              With a simple monthly plan, our team arrives at your parking spot and keeps your
              vehicle spotless — every single day.
            </p>
            <p className="about__text">
              From daily exterior cleaning to deep interior foam treatments, we use eco-friendly,
              paint-safe products and trained professionals who treat your car like their own.
              Hundreds of car owners across Bopal already start their day with a Glowzo-fresh ride.
            </p>
            <button type="button" onClick={openEnquiry} className="btn btn-primary btn-lg">
              Register Your Car
            </button>
          </div>

          <div className="about__highlights reveal reveal-d1">
            {HIGHLIGHTS.map((h) => (
              <div className="about-card" key={h.title}>
                <span className="about-card__icon" aria-hidden="true">{h.icon}</span>
                <div>
                  <p className="about-card__title">{h.title}</p>
                  <p className="about-card__text">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
