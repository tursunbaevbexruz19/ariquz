import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/i18n'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { decimalSeparator, mapRange } from '@/lib/format'
import { Reveal, RevealLines } from './ui/motion-primitives'

gsap.registerPlugin(ScrollTrigger)

/* Geometry of the descent, in viewport heights.
   A stage at depth d reaches the measurement line exactly at scroll
   progress d / MAX_DEPTH, which is what keeps the readouts honest. */
const MAX_DEPTH = 100 // cm
const FOCUS_VH = 44 // measurement line, from the top of the viewport
const TRAVEL_VH = 230 // vertical travel across the full depth range
const STRATA_VH = FOCUS_VH + TRAVEL_VH + 56 // plus run-out below the last stage

const DEPTH_UNIT: Record<string, string> = { uz: 'sm', ru: 'см', en: 'cm' }

/** Piecewise-linear sensor curves. Salinity is highest at the surface
 *  because that is where salt accumulates under evaporation. */
const CURVES = {
  moisture: [
    [0, 9],
    [18, 12],
    [35, 28],
    [52, 31],
    [70, 29],
    [90, 20],
    [100, 16],
  ],
  salinity: [
    [0, 2.9],
    [18, 2.2],
    [35, 1.5],
    [52, 1.2],
    [70, 1.1],
    [100, 1.4],
  ],
  temp: [
    [0, 34],
    [18, 27],
    [35, 22],
    [52, 20],
    [70, 18],
    [100, 17],
  ],
} as const

function sample(points: readonly (readonly [number, number])[], d: number) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[i + 1]
    if (d <= x1) return mapRange(d, x0, x1, y0, y1)
  }
  return points[points.length - 1][1]
}

export function DropJourney() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <section id="yol" className="relative">
      {isDesktop ? <Pinned /> : <Stacked />}
    </section>
  )
}

/* ── The pinned descent ───────────────────────────────────────── */

function Pinned() {
  const { t, locale } = useI18n()
  const root = useRef<HTMLDivElement>(null)
  const strata = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLSpanElement>(null)
  const moistRef = useRef<HTMLSpanElement>(null)
  const saltRef = useRef<HTMLSpanElement>(null)
  const tempRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !root.current || !strata.current) return

    const unit = DEPTH_UNIT[locale] ?? 'cm'
    const dec = decimalSeparator(t.numberLocale)
    const write = (p: number) => {
      const d = p * MAX_DEPTH
      if (depthRef.current) depthRef.current.textContent = `${Math.round(d)} ${unit}`
      if (moistRef.current)
        moistRef.current.textContent = `${sample(CURVES.moisture, d).toFixed(0)} %`
      if (saltRef.current)
        saltRef.current.textContent = `${sample(CURVES.salinity, d).toFixed(1).replace('.', dec)} dS/m`
      if (tempRef.current)
        tempRef.current.textContent = `${sample(CURVES.temp, d).toFixed(0)} °C`
    }
    write(0)

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-stage]')

      /* Squash and stretch. A falling drop that never deforms reads as a
         sticker; tying the deformation to scroll velocity is what makes it
         feel like liquid. quickTo keeps the easing off the scrub timeline,
         so the drop settles smoothly even when the scroll stops dead. */
      const stretchY = gsap.quickTo('[data-drop]', 'scaleY', {
        duration: 0.4,
        ease: 'power3.out',
      })
      const stretchX = gsap.quickTo('[data-drop]', 'scaleX', {
        duration: 0.4,
        ease: 'power3.out',
      })
      const trailFade = gsap.quickTo('[data-trail]', 'opacity', {
        duration: 0.45,
        ease: 'power2.out',
      })
      const trailScale = gsap.quickTo('[data-trail]', 'scaleY', {
        duration: 0.45,
        ease: 'power2.out',
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${TRAVEL_VH * 1.05}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            write(self.progress)
            const v = Math.min(Math.abs(self.getVelocity()) / 2600, 1)
            stretchY(1 + v * 0.6)
            stretchX(1 - v * 0.3)
            trailFade(v * 0.85)
            trailScale(0.25 + v * 0.75)
          },
        },
      })

      tl.to(
        strata.current,
        { yPercent: -(TRAVEL_VH / STRATA_VH) * 100, ease: 'none', duration: 1 },
        0,
      )

      // Soil particles travel slower than the strata, which is what gives
      // the descent a sense of depth rather than a sliding backdrop.
      tl.to(
        '[data-grain]',
        { yPercent: -(TRAVEL_VH / STRATA_VH) * 100 * 0.84, ease: 'none', duration: 1 },
        0,
      )

      /* One card at a time. Each arrives from below just before its depth
         crosses the line and leaves upward exactly as the next arrives, so
         the hand-over reads as a single column descending with the drop.
         The states are set up front and every tween is immediateRender
         false, otherwise the tweens fight over the initial frame and an
         arbitrary card wins. */
      const LEAD = 0.04
      const enterAt = (i: number) =>
        i === 0 ? 0 : Number(cards[i].dataset.stage) / MAX_DEPTH - LEAD

      gsap.set(cards, { autoAlpha: 0, y: 34 })
      gsap.set(cards[0], { autoAlpha: 1, y: 0 })

      cards.forEach((card, i) => {
        if (i > 0) {
          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.045,
              ease: 'power2.out',
              immediateRender: false,
            },
            enterAt(i),
          )
        }
        if (cards[i + 1]) {
          tl.to(
            card,
            {
              autoAlpha: 0,
              y: -34,
              duration: 0.045,
              ease: 'power2.in',
              immediateRender: false,
            },
            enterAt(i + 1),
          )
        }
      })

      // The wetted bulb only exists once water has left the emitter.
      tl.fromTo(
        '[data-bulb]',
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
        0.26,
      )

      // One slow ripple at the measurement point. The only looping animation
      // on the page, and it is the thing the section is about.
      gsap.fromTo(
        '[data-ripple]',
        { scale: 0.45, opacity: 0.45 },
        {
          scale: 2.6,
          opacity: 0,
          duration: 2.8,
          ease: 'power2.out',
          repeat: -1,
          repeatDelay: 0.5,
        },
      )
    }, root)

    return () => ctx.revert()
  }, [locale, t.numberLocale])

  const readouts = [
    { label: t.journey.readouts.depth, ref: depthRef, initial: `0 ${DEPTH_UNIT[locale] ?? 'cm'}` },
    { label: t.journey.readouts.moisture, ref: moistRef, initial: '9 %' },
    {
      label: t.journey.readouts.salinity,
      ref: saltRef,
      initial: `2${decimalSeparator(t.numberLocale)}9 dS/m`,
    },
    { label: t.journey.readouts.temp, ref: tempRef, initial: '34 °C' },
  ]

  return (
    <div
      ref={root}
      className="relative h-[100dvh] overflow-hidden"
      aria-label={t.a11y.scrollRegion}
    >
      {/* Strata. Translated upward, so the ground moves past a fixed line. */}
      <div
        ref={strata}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{
          height: `${STRATA_VH}vh`,
          background: `linear-gradient(to bottom,
            var(--bg) 0,
            var(--bg) ${FOCUS_VH}vh,
            var(--soil-0) ${FOCUS_VH}vh,
            var(--soil-1) ${FOCUS_VH + TRAVEL_VH * 0.1}vh,
            var(--soil-2) ${FOCUS_VH + TRAVEL_VH * 0.3}vh,
            var(--soil-3) ${FOCUS_VH + TRAVEL_VH * 0.6}vh,
            var(--soil-4) ${FOCUS_VH + TRAVEL_VH}vh,
            var(--soil-4) ${STRATA_VH}vh)`,
        }}
      >
        {/* Ground line */}
        <div
          className="absolute inset-x-0 h-px bg-ink/35"
          style={{ top: `${FOCUS_VH}vh` }}
        />

        {/* Soil particles, parallaxed against the strata */}
        <div
          data-grain
          aria-hidden="true"
          className="absolute inset-x-0 opacity-70"
          style={{
            top: `${FOCUS_VH}vh`,
            height: `${STRATA_VH}vh`,
            backgroundImage:
              'radial-gradient(color-mix(in oklab, var(--ink) 16%, transparent) 1px, transparent 1.2px)',
            backgroundSize: '27px 27px',
            maskImage: `linear-gradient(to bottom, transparent, #000 6%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent, #000 6%)`,
          }}
        />

        {/* Depth ruler, every 10 cm */}
        {Array.from({ length: 11 }, (_, i) => i * 10).map((d) => (
          <div
            key={d}
            className="absolute left-0 flex items-center gap-3"
            style={{ top: `${FOCUS_VH + (d / MAX_DEPTH) * TRAVEL_VH}vh` }}
          >
            <div className={`h-px bg-ink/40 ${d % 20 === 0 ? 'w-14' : 'w-7'}`} />
            {d % 20 === 0 && (
              <span className="font-mono text-[0.6875rem] text-ink/60 tnum">
                {d} {DEPTH_UNIT[locale] ?? 'cm'}
              </span>
            )}
          </div>
        ))}

        {/* Wetted bulb around the emitter. Centred on the drop's own column
            so it reads as water spreading from the emitter rather than as a
            smudge sitting off to one side. */}
        <div
          data-bulb
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            top: `${FOCUS_VH + (35 / MAX_DEPTH) * TRAVEL_VH}vh`,
            width: '21vh',
            height: '40vh',
            marginTop: '-5vh',
            background:
              'radial-gradient(closest-side, color-mix(in oklab, var(--accent) 42%, transparent), color-mix(in oklab, var(--accent) 14%, transparent) 55%, transparent 80%)',
          }}
        />

      </div>

      {/* Stage cards.
          Deliberately NOT positioned inside the strata at their own depth:
          the surface stage sits 5 cm below the main line, which at this
          scale is a hundred pixels, and the cards collided. They live in a
          fixed slot level with the measurement line instead and hand over
          one at a time, so the reader's eye never has to chase them. */}
      <div
        className="pointer-events-none absolute right-[5vw] w-[min(30rem,38vw)] xl:right-[8vw]"
        style={{ top: `${FOCUS_VH}vh` }}
      >
        {t.journey.stages.map((s) => (
          <article
            key={s.depth}
            data-stage={s.depth}
            className="absolute inset-x-0 top-6 border-l border-ink/30 pl-6"
          >
            <div className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink/70 tnum">
              {s.depth} {DEPTH_UNIT[locale] ?? 'cm'}
            </div>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.04em]">
              {s.title}
            </h3>
            {/* Full ink, no alpha: this is the reading content of the
                section and it sits on five different soil values. */}
            <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink">
              {s.body}
            </p>
          </article>
        ))}
      </div>

      {/* ── Fixed instrument layer ───────────────────────────── */}

      {/* Measurement line and the drop riding it */}
      <div
        className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
        style={{ top: `${FOCUS_VH}vh` }}
      >
        <div className="h-px flex-1 bg-accent/45" />

        <div className="relative flex h-8 w-7 shrink-0 items-center justify-center">
          {/* The path already travelled, brightening with scroll speed */}
          <div
            data-trail
            aria-hidden="true"
            className="absolute bottom-1/2 h-[38vh] w-px origin-bottom opacity-0"
            style={{
              background:
                'linear-gradient(to top, var(--accent), color-mix(in oklab, var(--accent) 0%, transparent))',
            }}
          />
          <span
            data-ripple
            aria-hidden="true"
            className="absolute h-7 w-7 rounded-full border border-accent"
          />
          <svg
            data-drop
            viewBox="0 0 24 30"
            className="relative h-7 w-6 text-accent"
            style={{ transformOrigin: '50% 45%' }}
            aria-hidden="true"
          >
            <path
              d="M12 1 C12 1 22 12.4 22 19 A10 10 0 0 1 2 19 C2 12.4 12 1 12 1 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="h-px flex-1 bg-accent/45" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="shell flex h-full flex-col justify-between py-10">
          <header className="max-w-[34rem]">
            <p className="eyebrow">{t.journey.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.045em]">
              {t.journey.h2}
            </h2>
            <p className="mt-4 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink/80">
              {t.journey.intro}
            </p>
          </header>

          <dl className="grid max-w-3xl grid-cols-4 gap-x-4 border-t border-ink/25 pt-5">
            {readouts.map((r) => (
              <div key={r.label}>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/70">
                  {r.label}
                </dt>
                <dd className="mt-1.5 font-mono text-[clamp(1.05rem,1.9vw,1.6rem)] font-medium tracking-tight tnum">
                  <span ref={r.ref}>{r.initial}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

/* ── Mobile: no pin, no hijack, same story ────────────────────── */

function Stacked() {
  const { t, locale } = useI18n()
  const unit = DEPTH_UNIT[locale] ?? 'cm'

  return (
    <div className="py-24">
      <div className="shell">
        <p className="eyebrow">{t.journey.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,8vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <RevealLines lines={[t.journey.h2]} />
        </h2>
        <p className="mt-4 max-w-[44ch] leading-relaxed text-soft">{t.journey.intro}</p>

        <ol className="mt-12">
          {t.journey.stages.map((s, i) => (
            <Reveal
              as="li"
              key={s.depth}
              delay={i * 0.05}
              className="relative grid grid-cols-[auto_1fr] gap-x-5 pb-10"
            >
              <div className="relative flex w-12 justify-center">
                <div
                  className="absolute inset-y-0 w-px"
                  style={{
                    background: `linear-gradient(to bottom, var(--soil-${Math.min(4, i)}), var(--soil-${Math.min(4, i + 1)}))`,
                  }}
                />
                {/* Depth tick, same instrument language as the desktop ruler. */}
                <span className="relative z-10 mt-2 h-px w-full bg-accent" />
              </div>
              <div>
                <div className="font-mono text-[0.6875rem] tracking-[0.16em] text-faint tnum">
                  {s.depth} {unit}
                </div>
                <h3 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  )
}
