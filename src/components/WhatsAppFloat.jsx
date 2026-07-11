import { SITE } from '../data/site';
import Icon from './Icon';

export default function WhatsAppFloat() {
  return (
    <div className="wa-float">
      <a
        href={SITE.whatsapp}
        className="wa-float__btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon name="whatsapp" />
        <span className="wa-float__tip">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
