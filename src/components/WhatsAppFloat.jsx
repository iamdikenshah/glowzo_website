import { SITE } from '../data/site';
import { WhatsAppIcon } from './icons';

export default function WhatsAppFloat() {
  return (
    <div className="wa-float" aria-label="Chat with us on WhatsApp">
      <a
        href={SITE.whatsapp}
        className="wa-float__btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp to book a car wash service"
      >
        <WhatsAppIcon />
        <span className="wa-float__tip">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
