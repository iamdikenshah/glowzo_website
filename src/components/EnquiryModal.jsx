import { useEffect, useRef } from 'react';
import EnquiryForm from './EnquiryForm';

export default function EnquiryModal({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enq-modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal__close" aria-label="Close enquiry form" onClick={onClose}>
          &times;
        </button>
        <div className="modal__head">
          <span className="modal__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            Free Registration
          </span>
          <h2 id="enq-modal-title" className="modal__title">Register Your Car</h2>
          <p className="modal__sub">
            Book a doorstep wash — share your details and we'll call to confirm your slot.
          </p>
        </div>
        <div className="modal__body">
          <EnquiryForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
