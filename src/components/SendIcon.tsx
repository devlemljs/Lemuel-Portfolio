interface SendIconProps {
  className?: string;
}

/**
 * Modern rounded paper-plane / send dart icon matching the provided design:
 * - Thick rounded wing contours
 * - Central horizontal slit with rounded end-cap
 * - Rounded outer apex corners
 * - Uses currentColor to inherit theme text/fill
 */
export function SendIcon({ className = 'w-4 h-4' }: SendIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M 3.8 2.2 C 2.1 1.2 1.0 2.5 1.4 4.3 L 3.7 10.1 C 3.9 10.6 4.4 11 5.0 11 L 15.5 11 C 16.1 11 16.5 11.4 16.5 12 C 16.5 12.6 16.1 13 15.5 13 L 5.0 13 C 4.4 13 3.9 13.4 3.7 13.9 L 1.4 19.7 C 1.0 21.5 2.1 22.8 3.8 21.8 L 21.8 13.1 C 22.8 12.6 22.8 11.4 21.8 10.9 L 3.8 2.2 Z"
      />
    </svg>
  );
}
