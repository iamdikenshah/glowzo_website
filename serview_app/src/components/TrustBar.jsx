import Icon from "./Icon";
import { TRUST_BADGES } from "../data/content";
import { BRAND } from "../config/brand";

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Our commitments">
      <div className="container trustbar-inner">
        <span className="trustbar-lead">Trusted by homeowners across {BRAND.serviceArea}</span>
        <div className="trustbar-items">
          {TRUST_BADGES.map((b) => (
            <span className="trustbar-item" key={b.label}>
              <Icon name={b.icon} size={18} /> {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
