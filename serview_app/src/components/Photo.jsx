import Icon from "./Icon";

/**
 * Image with a graceful placeholder. When `src` is provided it renders a real,
 * lazy-loaded <img>; otherwise it shows a branded sage gradient tile with an
 * icon so the layout reads correctly before real photography is added (see the
 * "Content Placeholders to Replace" checklist in the project spec).
 *
 * @param {{ src?: string, alt: string, icon?: string, className?: string, eager?: boolean }} props
 */
export default function Photo({ src, alt, icon = "image", className = "", eager = false }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }
  return (
    <div className={`ph ${className}`.trim()} role="img" aria-label={alt}>
      <Icon name={icon} />
    </div>
  );
}
