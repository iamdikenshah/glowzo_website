import { useReveal } from "../hooks/useReveal";

/**
 * Wraps children in a scroll-reveal container. `as` picks the element (default
 * div), `delay` staggers grouped items (seconds). Purely presentational.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
