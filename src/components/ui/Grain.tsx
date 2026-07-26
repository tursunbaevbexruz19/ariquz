/**
 * Fixed, non-scrolling film grain. Kept on a fixed pointer-events-none
 * layer on purpose: applied to a scrolling container it forces a full GPU
 * repaint on every frame and collapses frame rate on mobile.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply dark:mix-blend-screen"
      style={{ opacity: 'var(--grain-opacity)' }}
    >
      <svg className="h-full w-full">
        <filter id="ariq-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ariq-grain)" />
      </svg>
    </div>
  )
}
