import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import ServiceCard from "../components/ServiceCard";
import Reveal from "../components/Reveal";
import CtaBanner from "../components/CtaBanner";
import { SERVICES as SEED, SERVICE_CATEGORIES } from "../data/content";
import { loadServices } from "../data/api";

export default function Services() {
  const [services, setServices] = useState(SEED);
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "All";

  useEffect(() => {
    let alive = true;
    loadServices().then((list) => { if (alive && list.length) setServices(list); });
    return () => { alive = false; };
  }, []);

  const tabs = ["All", ...SERVICE_CATEGORIES];
  const filtered = useMemo(
    () => (active === "All" ? services : services.filter((s) => s.category === active)),
    [services, active]
  );

  const selectTab = (tab) => {
    if (tab === "All") setParams({}, { replace: true });
    else setParams({ category: tab }, { replace: true });
  };

  return (
    <main>
      <Seo
        title="Our Home Services"
        description="Browse ServView's full range of home services — cleaning, handyman repairs, plumbing, electrical, painting, appliance installation, furniture assembly and pest control."
        path="/services"
      />

      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>
            Whatever your home needs, we've got a vetted specialist for it. Filter by category to
            find the right service, then request a free quote.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-tabs" role="tablist" aria-label="Filter services by category">
            {tabs.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={active === tab}
                className={`filter-tab ${active === tab ? "active" : ""}`}
                onClick={() => selectTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {filtered.length ? (
            <div className="card-grid">
              {filtered.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                  <ServiceCard service={s} showCategory />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: "var(--text-muted)" }}>
              No services in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
