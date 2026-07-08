// Light-theme car-wash illustration, redrawn for the modern palette.
export default function HeroIllustration({
  viewBox = '0 0 520 360',
  label = 'Car wash service illustration',
}) {
  return (
    <svg viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={label}>
      <defs>
        <linearGradient id="bgG" x1="0" y1="0" x2="520" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EAF6FF" />
          <stop offset="1" stopColor="#D6EEFF" />
        </linearGradient>
        <linearGradient id="carG" x1="80" y1="180" x2="440" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="winG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0F2FE" />
          <stop offset="1" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id="floorG" x1="0" y1="290" x2="0" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CFE8FB" />
          <stop offset="1" stopColor="#EAF6FF" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="520" height="360" fill="url(#bgG)" rx="16" />

      {/* Sun / glow */}
      <circle cx="430" cy="80" r="46" fill="#FDE68A" opacity=".45" />
      <circle cx="430" cy="80" r="30" fill="#FCD34D" opacity=".55" />

      {/* Floor */}
      <rect x="0" y="292" width="520" height="68" fill="url(#floorG)" />
      <ellipse cx="260" cy="308" rx="205" ry="16" fill="#0284C7" opacity=".10" />

      {/* Car body */}
      <rect x="75" y="220" width="370" height="72" rx="14" fill="url(#carG)" />
      <path d="M155 220 L185 155 L335 155 L365 220Z" fill="#0EA5E9" />
      <path d="M165 220 L192 162 L330 162 L360 220Z" fill="#38BDF8" opacity=".7" />

      {/* Windows */}
      <path d="M200 218 L218 163 L255 163 L255 218Z" fill="url(#winG)" />
      <path d="M260 218 L260 163 L302 163 L320 218Z" fill="url(#winG)" />
      <rect x="256" y="163" width="4" height="55" fill="#0369A1" opacity=".5" />
      <path d="M203 218 L220 168 L234 168 L216 218Z" fill="#FFFFFF" opacity=".35" />

      {/* Hood / headlight */}
      <rect x="380" y="236" width="65" height="18" rx="4" fill="#0369A1" />
      <rect x="425" y="232" width="20" height="12" rx="4" fill="#FEF9C3" />
      <rect x="428" y="234" width="14" height="8" rx="3" fill="#FFFFFF" />
      <rect x="430" y="252" width="15" height="8" rx="3" fill="#075985" />

      {/* Tail light */}
      <rect x="76" y="232" width="20" height="12" rx="4" fill="#F87171" />
      <rect x="76" y="232" width="10" height="12" rx="3" fill="#FCA5A5" />

      {/* Trim + handles */}
      <path d="M90 250 Q260 244 430 250" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
      <rect x="195" y="248" width="20" height="5" rx="2.5" fill="#FFFFFF" opacity=".55" />
      <rect x="295" y="248" width="20" height="5" rx="2.5" fill="#FFFFFF" opacity=".55" />

      {/* Wheels */}
      {[158, 362].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="292" r="32" fill="#1F2937" />
          <circle cx={cx} cy="292" r="22" fill="#374151" />
          <circle cx={cx} cy="292" r="12" fill="#6B7280" />
          <circle cx={cx} cy="292" r="5" fill="#E5E7EB" />
        </g>
      ))}

      {/* Water sprays */}
      <g opacity=".9">
        <path d="M260 6 Q258 46 255 86 Q252 106 248 121" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="6 5" opacity=".7" />
        <path d="M275 6 Q278 46 280 86 Q282 106 284 121" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="5 6" opacity=".6" />
        <path d="M245 6 Q240 41 238 76 Q236 101 237 121" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="4 7" opacity=".5" />
        <path d="M370 60 Q395 40 410 20" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7" />
        <path d="M150 60 Q125 40 110 20" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7" />
        <circle cx="410" cy="18" r="5" fill="#22D3EE" opacity=".9" />
        <circle cx="420" cy="38" r="3.5" fill="#38BDF8" opacity=".8" />
        <circle cx="110" cy="18" r="5" fill="#22D3EE" opacity=".9" />
        <circle cx="100" cy="38" r="3.5" fill="#38BDF8" opacity=".8" />
        <circle cx="255" cy="2" r="4" fill="#22D3EE" opacity=".85" />
        <circle cx="275" cy="2" r="3" fill="#38BDF8" opacity=".75" />
      </g>

      {/* Soap bubbles */}
      <g opacity=".8">
        <circle cx="80" cy="80" r="16" stroke="#38BDF8" strokeWidth="1.5" fill="#FFFFFF" fillOpacity=".55" />
        <circle cx="55" cy="115" r="9" stroke="#22D3EE" strokeWidth="1.2" fill="#FFFFFF" fillOpacity=".5" />
        <circle cx="448" cy="130" r="12" stroke="#38BDF8" strokeWidth="1.5" fill="#FFFFFF" fillOpacity=".55" />
        <circle cx="470" cy="95" r="7" stroke="#22D3EE" strokeWidth="1" fill="#FFFFFF" fillOpacity=".5" />
        <circle cx="490" cy="55" r="9" stroke="#38BDF8" strokeWidth="1.2" fill="#FFFFFF" fillOpacity=".5" />
      </g>

      {/* Sparkles */}
      <g fill="#0EA5E9" opacity=".75">
        <path d="M45 195 L47 190 L49 195 L54 197 L49 199 L47 204 L45 199 L40 197Z" />
        <path d="M470 185 L471.5 181 L473 185 L477 186.5 L473 188 L471.5 192 L470 188 L466 186.5Z" opacity=".7" />
      </g>

      <text x="260" y="348" textAnchor="middle" fill="#0284C7" opacity=".18" fontSize="9" fontFamily="'Open Sans', sans-serif" fontWeight="700" letterSpacing="4">
        GLOWZO
      </text>
    </svg>
  );
}
