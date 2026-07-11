import { Link } from "react-router-dom";
import Icon from "./Icon";

/**
 * Service card used on the homepage grid and the services listing page.
 * @param {{ service: object, showCategory?: boolean }} props
 */
export default function ServiceCard({ service, showCategory = false }) {
  return (
    <Link to={`/services/${service.slug}`} className="service-card">
      {showCategory && <span className="cat-tag">{service.category}</span>}
      <span className="icon-chip"><Icon name={service.icon || "wrench"} /></span>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      <span className="learn">
        Learn more <Icon name="arrow-right" size={18} />
      </span>
    </Link>
  );
}
