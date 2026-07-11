// =============================================================================
// ICON — single inline-SVG icon set (no icon-font dependency)
// =============================================================================
// One <Icon name="…" /> component renders every glyph the site uses: service
// category icons, UI chrome and social marks. Line icons inherit `currentColor`
// via stroke; filled marks (star, brand logos) set their own fill. Keeping them
// inline means zero network cost and crisp rendering at any size.
// =============================================================================

// Stroke-style icons — 24x24 viewBox, drawn with currentColor.
const STROKE = {
  // --- Service categories ---
  sparkle: <><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 00-5.4 5.2L4 16.8 7.2 20l5.3-5.3a4 4 0 005.2-5.4l-2.6 2.6-2.3-.6-.6-2.3 2.5-2.7z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  droplet: <path d="M12 3s6 6.4 6 10.5A6 6 0 016 13.5C6 9.4 12 3 12 3z" />,
  roller: <><rect x="4" y="4" width="13" height="6" rx="1.5" /><path d="M17 7h2.5A1.5 1.5 0 0121 8.5V11a1.5 1.5 0 01-1.5 1.5H12a1.5 1.5 0 00-1.5 1.5V16" /><rect x="8.5" y="16" width="4" height="5" rx="1" /></>,
  plug: <><path d="M9 2v5M15 2v5" /><path d="M6 7h12v3a6 6 0 01-6 6 6 6 0 01-6-6V7z" /><path d="M12 16v6" /></>,
  chair: <><path d="M6 4v7h12V4" /><path d="M4 11h16l-1 5H5l-1-5z" /><path d="M6 16v4M18 16v4" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" /><path d="M9.5 12l2 2 3.5-4" /></>,
  // --- Differentiators / how-it-works ---
  "badge-check": <><path d="M12 3l2 1.7 2.6-.4 1 2.4 2.3 1.2-.5 2.6L21 14l-1.6 2.1.5 2.6-2.3 1.2-1 2.4-2.6-.4L12 23l-2-1.5-2.6.4-1-2.4-2.3-1.2.5-2.6L3 14l1.6-2.1L4.1 9.3l2.3-1.2 1-2.4L10 6l2-3z" /><path d="M9 12l2 2 4-4.5" /></>,
  tag: <><path d="M3 12l8.5-8.5H20V12l-8.5 8.5L3 12z" /><circle cx="15.5" cy="8.5" r="1.5" /></>,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /><path d="M9 14l2 2 4-4" /></>,
  chat: <path d="M4 5h16v11H9l-5 4V5z" />,
  "user-check": <><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-6 6-6 1.4 0 2.6.5 3.6 1.2" /><path d="M15 17l2 2 4-4" /></>,
  "check-circle": <><circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  "thumbs-up": <><path d="M7 10v10H4V10h3z" /><path d="M7 10l4-7c1.4 0 2.5 1.1 2.5 2.5V9h5a2 2 0 012 2.3l-1.2 7A2 2 0 0117.3 20H7" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 6.5" />,
  // --- UI chrome ---
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: <path d="M4 5c0 8.3 6.7 15 15 15v-3.3l-4-1.3-1.8 1.8a12 12 0 01-6.4-6.4L8.6 9 7.3 5H4z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></>,
  "map-pin": <><path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M4 17l5-5 4 4 3-3 4 4" /></>,
};

// Filled icons that set their own fill.
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
};

/**
 * @param {{ name: string, size?: number, className?: string }} props
 */
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
