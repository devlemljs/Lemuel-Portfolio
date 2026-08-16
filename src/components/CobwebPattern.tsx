interface CobwebPatternProps {
  corner?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function CobwebPattern({ corner = 'top-right', className = '' }: CobwebPatternProps) {
  // Transformations to place the base top-right spiderweb precisely into any corner
  let transform = '';
  if (corner === 'top-left') {
    transform = 'translate(400, 0) scale(-1, 1)';
  } else if (corner === 'bottom-left') {
    transform = 'translate(400, 400) scale(-1, -1)';
  } else if (corner === 'bottom-right') {
    transform = 'translate(0, 400) scale(1, -1)';
  }

  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none stroke-current overflow-visible ${className}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <g transform={transform}>
        {/* Main diagonal anchor line: from top-left screen edge (0,0) to Hub (228,104), then down to corner (400,400) */}
        <line x1="0" y1="0" x2="228" y2="104" strokeWidth="1.5" />
        <line x1="228" y1="104" x2="400" y2="400" strokeWidth="1.5" />

        {/* Radial spokes originating from Hub (228, 104) and reaching outer edges */}
        {/* Spoke 1: heading to top edge */}
        <line x1="228" y1="104" x2="180" y2="0" strokeWidth="1.3" />
        
        {/* Spoke 2: heading to upper-right top edge */}
        <line x1="228" y1="104" x2="350" y2="0" strokeWidth="1.3" />
        
        {/* Spoke 3: heading to upper right edge */}
        <line x1="228" y1="104" x2="400" y2="85" strokeWidth="1.3" />
        
        {/* Spoke 4: heading to middle right edge */}
        <line x1="228" y1="104" x2="400" y2="195" strokeWidth="1.3" />
        
        {/* Spoke 5: heading to lower right edge */}
        <line x1="228" y1="104" x2="400" y2="305" strokeWidth="1.3" />

        {/* Spoke 6: heading to bottom right edge */}
        <line x1="228" y1="104" x2="355" y2="400" strokeWidth="1.3" />

        {/* Trailing strand extension drawn from bottom tip as in reference image */}
        <path d="M 355 400 Q 363 422, 370 438 Q 380 460, 394 485 L 400 498" strokeWidth="1.3" />

        {/* --- CONCENTRIC SAGGING WEBS (AUTHENTIC SPIDERWEB ARCS) --- */}

        {/* Upper Hanging Arcs along top diagonal line */}
        <path d="M 0 0 Q 60 38, 90 41" strokeWidth="1.1" />
        <path d="M 180 0 Q 155 45, 148 68" strokeWidth="1.1" />
        <path d="M 192 26 Q 174 60, 178 81" strokeWidth="1.1" />
        <path d="M 204 52 Q 194 76, 204 93" strokeWidth="1.1" />
        <path d="M 216 78 Q 212 90, 218 99" strokeWidth="1.1" />

        {/* Sector 1: between Spoke 1 and Spoke 2 */}
        <path d="M 180 0 Q 265 42, 350 0" strokeWidth="1.1" />
        <path d="M 192 26 Q 256 60, 320 26" strokeWidth="1.1" />
        <path d="M 204 52 Q 248 76, 289 52" strokeWidth="1.1" />
        <path d="M 216 78 Q 236 90, 258 78" strokeWidth="1.1" />

        {/* Sector 2: between Spoke 2 and Spoke 3 */}
        <path d="M 350 0 Q 338 60, 400 85" strokeWidth="1.1" />
        <path d="M 320 26 Q 308 70, 357 89" strokeWidth="1.1" />
        <path d="M 289 52 Q 280 78, 314 94" strokeWidth="1.1" />
        <path d="M 258 78 Q 250 88, 271 99" strokeWidth="1.1" />

        {/* Sector 3: between Spoke 3 and Spoke 4 */}
        <path d="M 400 85 Q 355 140, 400 195" strokeWidth="1.1" />
        <path d="M 357 89 Q 324 130, 357 172" strokeWidth="1.1" />
        <path d="M 314 94 Q 292 122, 314 149" strokeWidth="1.1" />
        <path d="M 271 99 Q 258 112, 271 126" strokeWidth="1.1" />

        {/* Sector 4: between Spoke 4 and Spoke 5 */}
        <path d="M 400 195 Q 355 250, 400 305" strokeWidth="1.1" />
        <path d="M 357 172 Q 324 212, 357 250" strokeWidth="1.1" />
        <path d="M 314 149 Q 292 176, 314 200" strokeWidth="1.1" />
        <path d="M 271 126 Q 258 140, 271 152" strokeWidth="1.1" />

        {/* Sector 5: between Spoke 5 and Spoke 6 */}
        <path d="M 400 305 Q 345 280, 355 400" strokeWidth="1.1" />
        <path d="M 357 250 Q 315 280, 323 325" strokeWidth="1.1" />
        <path d="M 314 200 Q 285 225, 291 250" strokeWidth="1.1" />
        <path d="M 271 152 Q 258 165, 260 178" strokeWidth="1.1" />

        {/* Parallel cross-threads beneath the Hub along diagonal */}
        <line x1="170" y1="77" x2="246" y2="135" strokeWidth="1.1" />
        <line x1="186" y1="84" x2="256" y2="152" strokeWidth="1.1" />
        <line x1="202" y1="92" x2="266" y2="169" strokeWidth="1.1" />
        <line x1="216" y1="98" x2="274" y2="183" strokeWidth="1.1" />

        {/* Inner webbing anchors along lower diagonal */}
        <line x1="260" y1="178" x2="255" y2="150" strokeWidth="1.0" />
        <line x1="291" y1="250" x2="280" y2="193" strokeWidth="1.0" />
        <line x1="323" y1="325" x2="320" y2="262" strokeWidth="1.0" />
      </g>
    </svg>
  );
}
