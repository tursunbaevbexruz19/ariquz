/**
 * Brand marks.
 *
 * The ARIQ glyph is the cross-section of an irrigation channel: a trapezoid
 * cut into the ground, with a drop falling into it. Every partner mark below
 * is built from the same construction grid used in Central Asian tilework
 * (square, rotated square, hexagon, circle), one stroke weight, one colour,
 * so a row of them reads as a set rather than seven borrowed logos.
 */

export function AriqMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.5 8.5 L7 18.5 H17 L21.5 8.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M12 2.5 C12 2.5 15 6.1 15 8.1 A3 3 0 0 1 9 8.1 C9 6.1 12 2.5 12 2.5 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string
  markClassName?: string
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <AriqMark className={markClassName ?? 'h-[1.15em] w-[1.15em] text-accent-ink'} />
      <span
        className="font-display"
        style={{ fontWeight: 700, letterSpacing: '-0.04em' }}
      >
        ARIQ
      </span>
    </span>
  )
}

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const

const PARTNER_SHAPES = [
  // rotated square over square: the eight-point girih star
  <>
    <rect x="7" y="7" width="18" height="18" {...S} />
    <rect x="7" y="7" width="18" height="18" {...S} transform="rotate(45 16 16)" />
  </>,
  // hexagon within hexagon
  <>
    <path d="M16 3 L27 9.5 V22.5 L16 29 L5 22.5 V9.5 Z" {...S} />
    <path d="M16 11 L20.5 13.7 V19.3 L16 22 L11.5 19.3 V13.7 Z" {...S} />
  </>,
  // three furrows rising, inside a frame
  <>
    <rect x="4" y="4" width="24" height="24" {...S} />
    <path d="M10 23 V17 M16 23 V13 M22 23 V9" {...S} />
  </>,
  // square split on the diagonal, half filled
  <>
    <rect x="4" y="4" width="24" height="24" {...S} />
    <path d="M4 28 L28 4" {...S} />
    <path d="M4 28 L28 28 L28 4 Z" fill="currentColor" opacity="0.16" />
  </>,
  // ripples spreading from a point
  <>
    <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    <path d="M16 7 A9 9 0 0 1 16 25" {...S} />
    <path d="M16 2.5 A13.5 13.5 0 0 1 16 29.5" {...S} />
  </>,
  // four-cell field grid with one cell marked
  <>
    <rect x="4" y="4" width="24" height="24" {...S} />
    <path d="M16 4 V28 M4 16 H28" {...S} />
    <rect x="16" y="16" width="12" height="12" fill="currentColor" opacity="0.16" />
  </>,
  // circle crossed by a channel band
  <>
    <circle cx="16" cy="16" r="12" {...S} />
    <path d="M4.6 12 H27.4 M4.6 20 H27.4" {...S} />
  </>,
]

export function PartnerMark({ index, className }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      {PARTNER_SHAPES[index % PARTNER_SHAPES.length]}
    </svg>
  )
}

/**
 * A girih tile fragment, tiled as a very low-contrast page texture.
 * Rendered once and referenced by <use>, so the pattern costs one path.
 */
export function GirihTexture({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        {/* Eight-point star tessellation. No full-bleed cross lines: they
            turned the field into a grid of crosshairs rather than tilework. */}
        <pattern id="ariq-girih" width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="18" y="18" width="36" height="36" />
            <rect x="18" y="18" width="36" height="36" transform="rotate(45 36 36)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ariq-girih)" />
    </svg>
  )
}
