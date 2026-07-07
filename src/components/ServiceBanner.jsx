// Light-theme "wash tunnel" banner illustration for the service page.
export default function ServiceBanner() {
  return (
    <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Car being washed professionally">
      <defs>
        <linearGradient id="sb1" x1="0" y1="0" x2="480" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EAF6FF" />
          <stop offset="1" stopColor="#D6EEFF" />
        </linearGradient>
        <linearGradient id="sc1" x1="70" y1="170" x2="410" y2="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill="url(#sb1)" />

      {/* Wash-tunnel frame */}
      <rect x="30" y="50" width="12" height="220" rx="4" fill="#38BDF8" opacity=".35" />
      <rect x="30" y="50" width="12" height="18" rx="3" fill="#0EA5E9" opacity=".7" />
      <rect x="438" y="50" width="12" height="220" rx="4" fill="#38BDF8" opacity=".35" />
      <rect x="438" y="50" width="12" height="18" rx="3" fill="#0EA5E9" opacity=".7" />
      <rect x="30" y="50" width="420" height="10" rx="4" fill="#38BDF8" opacity=".3" />

      {/* Rotating brushes */}
      <g opacity=".5">
        <ellipse cx="120" cy="190" rx="20" ry="60" stroke="#0EA5E9" strokeWidth="2" fill="none" />
        <ellipse cx="120" cy="190" rx="12" ry="52" stroke="#22D3EE" strokeWidth="1" fill="none" />
        <ellipse cx="360" cy="190" rx="20" ry="60" stroke="#0EA5E9" strokeWidth="2" fill="none" />
        <ellipse cx="360" cy="190" rx="12" ry="52" stroke="#22D3EE" strokeWidth="1" fill="none" />
      </g>

      {/* Floor */}
      <rect x="0" y="255" width="480" height="45" fill="#CFE8FB" opacity=".7" />
      <ellipse cx="240" cy="264" rx="165" ry="13" fill="#0284C7" opacity=".12" />

      {/* Car */}
      <rect x="80" y="200" width="320" height="60" rx="12" fill="url(#sc1)" />
      <path d="M142 200 L168 148 L312 148 L338 200Z" fill="#0EA5E9" />
      <path d="M150 200 L174 155 L308 155 L334 200Z" fill="#38BDF8" opacity=".65" />
      <path d="M182 198 L198 157 L235 157 L235 198Z" fill="#E0F2FE" />
      <path d="M240 198 L240 157 L278 157 L294 198Z" fill="#E0F2FE" />
      <rect x="237" y="157" width="3" height="41" fill="#0369A1" opacity=".5" />

      <rect x="372" y="212" width="28" height="12" rx="5" fill="#FEF9C3" />
      <rect x="376" y="215" width="18" height="7" rx="3" fill="#FFFFFF" />
      <rect x="82" y="208" width="7" height="18" rx="3" fill="#F87171" />

      {[152, 328].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="260" r="28" fill="#1F2937" />
          <circle cx={cx} cy="260" r="18" fill="#374151" />
          <circle cx={cx} cy="260" r="9" fill="#6B7280" />
          <circle cx={cx} cy="260" r="4" fill="#E5E7EB" />
        </g>
      ))}

      {/* Water curtain */}
      <g opacity=".8">
        {[180, 200, 220, 240, 260, 280, 300].map((x, i) => (
          <line key={x} x1={x} y1="60" x2={x - (i % 2 ? -2 : 2)} y2="148" stroke={i % 2 ? '#38BDF8' : '#22D3EE'} strokeWidth="1.5" strokeDasharray="5 5" opacity=".55" />
        ))}
        <path d="M42 130 Q80 128 118 140" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
        <path d="M438 130 Q400 128 362 140" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7" />
        <circle cx="200" cy="175" r="2.5" fill="#22D3EE" opacity=".8" />
        <circle cx="290" cy="180" r="3" fill="#38BDF8" opacity=".7" />
      </g>

      {/* Bubbles */}
      <g opacity=".7">
        <circle cx="65" cy="110" r="14" stroke="#38BDF8" strokeWidth="1.2" fill="#FFFFFF" fillOpacity=".5" />
        <circle cx="416" cy="105" r="12" stroke="#38BDF8" strokeWidth="1.2" fill="#FFFFFF" fillOpacity=".5" />
        <circle cx="240" cy="75" r="8" stroke="#0EA5E9" strokeWidth="1" fill="#FFFFFF" fillOpacity=".5" />
      </g>

      {/* Eco badge */}
      <rect x="378" y="62" width="82" height="26" rx="13" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1" strokeOpacity=".4" />
      <text x="419" y="79" textAnchor="middle" fill="#15803D" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600">✓ Eco-Friendly</text>
    </svg>
  );
}
