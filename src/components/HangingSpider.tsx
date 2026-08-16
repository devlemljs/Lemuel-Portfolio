import { motion } from 'motion/react';

interface HangingSpiderProps {
  className?: string;
  animate?: boolean;
}

/**
 * Hanging Spider vector illustration based on reference image:
 * - Suspended by vertical silk thread
 * - Sharp polygonal abdomen and cephalothorax
 * - 8 distinct angular legs
 * - Pure black in light mode, pure white in dark mode
 */
export function HangingSpider({ className = '', animate = true }: HangingSpiderProps) {
  const spiderSvg = (
    <svg
      viewBox="0 0 140 190"
      className="w-full h-full overflow-visible pointer-events-none drop-shadow-xs"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Silk Thread from Top (y=0 to y=60) */}
      <line
        x1="70"
        y1="0"
        x2="70"
        y2="60"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      {/* Spider Abdomen (Pointing upwards into thread) */}
      <polygon
        points="
          70,60 
          59,70 
          54,92 
          62,110 
          66,116 
          74,116 
          78,110 
          86,92 
          81,70
        "
      />

      {/* Thorax / Head (Pointing downwards) */}
      <polygon
        points="
          66,117 
          74,117 
          77,128 
          70,138 
          63,128
        "
      />

      {/* Spider Legs */}
      <g stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter">
        {/* === PAIR 1: High Vertical Outer Legs === */}
        <polyline
          points="56,99 22,96 25,24"
          strokeWidth="2.8"
          fill="none"
        />
        <polyline
          points="84,99 118,96 115,24"
          strokeWidth="2.8"
          fill="none"
        />

        {/* === PAIR 2: High Angled Inner Legs === */}
        <polyline
          points="57,86 38,64 58,16"
          strokeWidth="2.6"
          fill="none"
        />
        <polyline
          points="83,86 102,64 82,16"
          strokeWidth="2.6"
          fill="none"
        />

        {/* === PAIR 3: Lateral Spread Downward Legs === */}
        <polyline
          points="63,112 28,124 38,166"
          strokeWidth="2.8"
          fill="none"
        />
        <polyline
          points="77,112 112,124 102,166"
          strokeWidth="2.8"
          fill="none"
        />

        {/* === PAIR 4: Lowest Downward Legs === */}
        <polyline
          points="65,122 46,142 58,185"
          strokeWidth="2.6"
          fill="none"
        />
        <polyline
          points="75,122 94,142 82,185"
          strokeWidth="2.6"
          fill="none"
        />
      </g>
    </svg>
  );

  if (!animate) {
    return (
      <div className={`text-slate-900 dark:text-white transition-colors duration-300 ${className}`}>
        {spiderSvg}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ 
        y: [0, 5, 0],
        rotate: [0, 1.2, -1.2, 0]
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5
        }
      }}
      className={`text-slate-900 dark:text-white transition-colors duration-300 ${className}`}
    >
      {spiderSvg}
    </motion.div>
  );
}
