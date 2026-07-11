// =============================================================================
// ICON — single inline-SVG icon set (no icon-font dependency)
// =============================================================================
// One <Icon name="…" /> renders every glyph the site uses. Line icons inherit
// `currentColor` via stroke; filled marks (star, brand logos) set their own fill.
// Adapted from the ServView reference kit, with twitter/youtube added.
// =============================================================================

const STROKE = {
  sparkle: <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" /></>,
  car: <><path d="M3 13l1.8-5.1A2 2 0 016.7 6.5h10.6a2 2 0 011.9 1.4L21 13v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-5z" /><path d="M3 13h18" /><circle cx="7" cy="16" r="1" /><circle cx="17" cy="16" r="1" /></>,
  droplet: <path d="M12 3s6 6.4 6 10.5A6 6 0 016 13.5C6 9.4 12 3 12 3z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9.5 12l2 2 3.5-4" /></>,
  leaf: <><path d="M4 20s0-8 8-12c4-2 8-2 8-2s0 4-2 8c-4 8-12 8-12 8z" /><path d="M4 20c4-6 8-8 12-9" /></>,
  "badge-check": <><path d="M12 3l2 1.7 2.6-.4 1 2.4 2.3 1.2-.5 2.6L21 14l-1.6 2.1.5 2.6-2.3 1.2-1 2.4-2.6-.4L12 23l-2-1.5-2.6.4-1-2.4-2.3-1.2.5-2.6L3 14l1.6-2.1L4.1 9.3l2.3-1.2 1-2.4L10 6l2-3z" /><path d="M9 12l2 2 4-4.5" /></>,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /><path d="M9 14l2 2 4-4" /></>,
  "user-check": <><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-6 6-6 1.4 0 2.6.5 3.6 1.2" /><path d="M15 17l2 2 4-4" /></>,
  "check-circle": <><circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 6.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: <path d="M4 5c0 8.3 6.7 15 15 15v-3.3l-4-1.3-1.8 1.8a12 12 0 01-6.4-6.4L8.6 9 7.3 5H4z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></>,
  "map-pin": <><path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
};

const FILLED = {
  star: <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" fill="currentColor" />,
  whatsapp: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.1-.6 3.3.5 1.5 1.6 2.9 3.4 4 .5.3 1.9 1 2.6 1 .4 0 .8 0 1.1-.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1z"
    />
  ),
  instagram: (
    <><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1.2" fill="currentColor" /></>
  ),
  facebook: <path fill="currentColor" d="M14 8.5V7c0-.8.2-1 1-1h1.5V3H14c-2.2 0-3.5 1.3-3.5 3.6V8.5H8V11h2.5v9H14v-9h2.3l.4-2.5H14z" />,
  twitter: <path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26L23 21.75h-6.17l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23 4.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />,
  youtube: <path fill="currentColor" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />,
};

export default function Icon({ name, size = 24, className, ...rest }) {
  const stroke = STROKE[name];
  const filled = FILLED[name];
  if (!stroke && !filled) return null;

  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": "true",
    focusable: "false",
    ...rest,
  };

  if (filled) {
    return <svg xmlns="http://www.w3.org/2000/svg" {...shared}>{filled}</svg>;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...shared}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {stroke}
    </svg>
  );
}
