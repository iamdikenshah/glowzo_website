import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import Photo from "../components/Photo";
import ServiceCard from "../components/ServiceCard";
import EnquiryForm from "../components/EnquiryForm";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import { SERVICES as SEED, getServiceBySlug } from "../data/content";
import { loadServices } from "../data/api";

export default function ServiceDetail() {
  const { slug } = useParams();
  // Start from the seed match (instant) and refine with merged CMS data.
  const [service, setService] = useState(() => getServiceBySlug(slug) || null);
  const [all, setAll] = useState(SEED);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let alive = true;
    setService(getServiceBySlug(slug) || null);
    loadServices().then((list) => {
      if (!alive) return;
      if (list.length) setAll(list);
      setService(list.find((s) => s.slug === slug) || getServiceBySlug(slug) || null);
      setResolved(true);
    });
    return () => { alive = false; };
  }, [slug]);

  // Unknown slug: only 404 once we've confirmed against loaded data.
  if (!service) {
    return resolved ? <NotFound /> : <div style={{ minHeight: "60vh" }} />;
  }

  const related = all.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const includes = service.includes?.length ? service.includes : [];

  return (
    <main>
      <Seo
        title={service.name}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
      />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/services">Services</Link> <Icon name="arrow-right" size={14} /> <span>{service.name}</span>
          </div>
          <h1>{service.name}</h1>
          <p>{service.shortDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <div className="detail-media" style={{ marginBottom: "2rem" }}>
              <Photo src={service.imageUrl} alt={`${service.name} by ServView`} icon={service.icon} />
            </div>

            <h2 className="section-title" style={{ fontSize: "1.6rem" }}>About this service</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>{service.fullDescription}</p>

            {includes.length > 0 && (
              <>
                <h2 className="section-title" style={{ fontSize: "1.6rem", marginTop: "1.5rem" }}>
                  What's included
                </h2>
                <ul className="includes-list">
                  {includes.map((item) => (
                    <li key={item}><Icon name="check-circle" /> <span>{item}</span></li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="sticky-cta">
            {service.startingPrice && (
              <div className="price-box">
                <div className="from">Starting from</div>
                <div className="amount">{service.startingPrice}</div>
                <div className="unit">Final price confirmed in your free quote.</div>
              </div>
            )}
            <EnquiryForm defaultService={service.name} source={`service:${service.slug}`} compact />
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-sage">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">You might also need</span>
              <h2 className="section-title">Related services</h2>
            </div>
            <div className="card-grid">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
