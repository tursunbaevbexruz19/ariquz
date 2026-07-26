import { useCallback, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { ArrowsHorizontal } from '@phosphor-icons/react'
import { useI18n } from '@/i18n'
import { IMAGES } from '@/lib/images'
import { clamp } from '@/lib/format'
import { Reveal, RevealLines } from './ui/motion-primitives'

/**
 * Before and after on one hectare.
 *
 * The divider position lives in a motion value, so dragging never re-renders
 * the React tree. Only the crossing of the 50% mark is lifted into state,
 * because the spec rows below shift emphasis at that point.
 *
 * Fully operable from the keyboard: the handle is a real slider with arrow
 * key support, Home and End.
 */
export function CompareSlider() {
  const { t } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const pct = useMotionValue(52)
  const [leaning, setLeaning] = useState<'a' | 'b'>('b')
  const [dragging, setDragging] = useState(false)

  useMotionValueEvent(pct, 'change', (v) => {
    const next = v < 50 ? 'a' : 'b'
    setLeaning((prev) => (prev === next ? prev : next))
  })

  const clip = useTransform(pct, (v) => `inset(0 0 0 ${v}%)`)
  const left = useTransform(pct, (v) => `${v}%`)

  const setFromClientX = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      pct.set(clamp(((clientX - rect.left) / rect.width) * 100, 2, 98))
    },
    [pct],
  )

  const nudge = (delta: number) => pct.set(clamp(pct.get() + delta, 2, 98))

  return (
    <section className="py-24 md:py-32">
      <div className="shell">
        <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <RevealLines lines={[t.compare.h2]} />
        </h2>

        <Reveal className="mt-12">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] w-full select-none overflow-hidden bg-sunk sm:aspect-[16/9]"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId)
              setDragging(true)
              setFromClientX(e.clientX)
            }}
            onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
            onPointerUp={(e) => {
              e.currentTarget.releasePointerCapture(e.pointerId)
              setDragging(false)
            }}
            onPointerCancel={() => setDragging(false)}
          >
            <img
              src={IMAGES.compareA.src}
              alt={t.compare.aAlt}
              width={IMAGES.compareA.w}
              height={IMAGES.compareA.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.img
              src={IMAGES.compareB.src}
              alt={t.compare.bAlt}
              width={IMAGES.compareB.w}
              height={IMAGES.compareB.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: clip }}
            />

            {/* Side labels sit outside the photographs, on their own plates. */}
            <div className="pointer-events-none absolute left-0 top-0 bg-bg px-4 py-2.5 font-mono text-[0.75rem] tracking-wide">
              {t.compare.aLabel}
            </div>
            <div className="pointer-events-none absolute right-0 top-0 bg-accent px-4 py-2.5 font-mono text-[0.75rem] tracking-wide text-accent-on">
              {t.compare.bLabel}
            </div>

            <motion.div
              className="absolute inset-y-0 w-px bg-bg"
              style={{ left }}
              aria-hidden="true"
            />

            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label={t.compare.hint}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pct.get())}
                aria-valuetext={leaning === 'a' ? t.compare.aLabel : t.compare.bLabel}
                onKeyDown={(e) => {
                  const step: Record<string, () => void> = {
                    ArrowLeft: () => nudge(-3),
                    ArrowRight: () => nudge(3),
                    Home: () => pct.set(2),
                    End: () => pct.set(98),
                  }
                  const action = step[e.key]
                  if (!action) return
                  e.preventDefault()
                  action()
                }}
                className={`grid h-12 w-12 cursor-ew-resize place-items-center rounded-full bg-bg text-ink shadow-[var(--shadow-lift)] transition-transform duration-200 ${
                  dragging ? 'scale-95' : 'hover:scale-105'
                }`}
              >
                <ArrowsHorizontal size={19} weight="bold" />
              </div>
            </motion.div>
          </div>

          <p className="mt-3 text-sm text-faint">{t.compare.hint}</p>
        </Reveal>

        {/* Spec comparison. Grouped rows, one hairline family, no boxes. */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 md:grid-cols-2">
          {(['a', 'b'] as const).map((side) => (
            <div
              key={side}
              className={`pt-6 transition-opacity duration-500 ${
                side === 'b' ? 'border-t border-accent' : 'border-t border-line'
              } ${leaning === side ? 'opacity-100' : 'opacity-55'}`}
            >
              <div
                className={`font-mono text-[0.75rem] tracking-wide ${
                  side === 'b' ? 'text-accent-ink' : 'text-faint'
                }`}
              >
                {side === 'a' ? t.compare.aLabel : t.compare.bLabel}
              </div>
              <dl className="mt-5 divide-y divide-line">
                {t.compare.rows.map((r) => (
                  <div key={r.key} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="text-[0.9375rem] text-soft">{r.key}</dt>
                    <dd
                      className={`font-mono text-[1.0625rem] tnum ${
                        side === 'b' ? 'text-accent-ink' : ''
                      }`}
                    >
                      {side === 'a' ? r.a : r.b}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
