import Icon from "./Icon";
import { BRAND, whatsappLink } from "../config/brand";

export default function WhatsAppFloat() {
  const msg = `Hi ${BRAND.name}, I'd like to book a home service.`;
  return (
    <a
      className="wa-float"
      href={whatsappLink(msg)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" />
    </a>
  );
}
