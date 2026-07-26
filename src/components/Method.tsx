import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/i18n'
import { IMAGES } from '@/lib/images'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { RevealLines } from './ui/motion-primitives'

gsap.registerPlugin(ScrollTrigger)

const STEP_IMAGES = [
  IMAGES.methodSurvey,
  IMAGES.methodDesign,
  IMAGES.methodInstall,
  IMAGES.methodOperate,
]

export function Method() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  return isDesktop ? <Panned /> : <Snapped />
}

function StepCard({ index, className = '' }: { index: number; className?: string }) {
  const { t } = useI18n()
  const step = t.method.steps[index]
  const img = STEP_IMAGES[index]

  return (
    <article className={`flex shrink-0 flex-col ${className}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sunk">
        <img
          src={img.src}
          alt={step.alt}
          width={img.w}
          height={img.h}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
        />
      </div>
      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[1.75rem] font-semibold tracking-[-0.04em]">
            {step.title}
          </h3>
          <span className="font-mono text-[0.75rem] text-accent-ink tnum">{step.meta}</span>
        </div>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-soft">{step.body}</p>
      </div>
    </article>
  )
}

/* ── Desktop: vertical scroll drives a horizontal pan ─────────── */

function Panned() {
  const { t } = useI18n()
  const wrap = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !wrap.current || !track.current) return

    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth

      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          // Horizontal hijack is disorienting without a position cue.
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100dvh] w-max items-center gap-16 pr-[8vw] xl:gap-24">
        <header className="flex w-[40vw] shrink-0 flex-col justify-center pl-[4vw] xl:pl-[8vw]">
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            <RevealLines lines={[t.method.h2]} />
          </h2>
          <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed text-soft">
            {t.method.lead}
          </p>
        </header>

        {t.method.steps.map((s, i) => (
          <StepCard key={s.title} index={i} className="w-[min(26rem,30vw)]" />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div
          ref={bar}
          className="h-px origin-left bg-accent"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  )
}

/* ── Mobile and tablet: native scroll-snap, no hijack ─────────── */

function Snapped() {
  const { t } = useI18n()

  return (
    <section className="py-24">
      <div className="shell">
        <h2 className="font-display text-[clamp(2rem,7vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <RevealLines lines={[t.method.h2]} />
        </h2>
        <p className="mt-4 max-w-[40ch] leading-relaxed text-soft">{t.method.lead}</p>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-10">
        {t.method.steps.map((s, i) => (
          <StepCard key={s.title} index={i} className="w-[76vw] snap-start sm:w-[52vw]" />
        ))}
        <div className="w-px shrink-0" aria-hidden="true" />
      </div>
    </section>
  )
}
