import { useEffect } from "react";
import Icon from "../../components/Icon";

/** Accessible-ish modal shell. Closes on Escape and backdrop click. */
export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="admin-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="admin-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="admin-modal-head">
          <h2>{title}</h2>
          <button className="admin-modal-close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
