import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useI18n } from '@/i18n'
import { IMAGES } from '@/lib/images'
import { Reveal, RevealLines } from './ui/motion-primitives'
import { GirihTexture } from './ui/marks'

export function Problem() {
  const { t } = useI18n()
  const figureRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section id="muammo" className="relative py-28 md:py-40">
      {/* Girih tiling, held at the threshold of visibility. */}
      <GirihTexture className="pointer-events-none absolute inset-0 h-full w-full text-ink opacity-[0.045]" />

      <div className="shell relative">
        <h2 className="max-w-[19ch] font-display text-[clamp(2.1rem,5.2vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <RevealLines lines={[t.problem.h2Line1, t.problem.h2Line2]} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-y-6 md:grid-cols-12">
          <div className="md:col-start-6 md:col-end-13">
            <Reveal>
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-soft">
                {t.problem.body}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink">
                {t.problem.body2}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal as="figure" className="relative mt-20 md:mt-28">
        <div ref={figureRef as never} className="relative h-[46vh] overflow-hidden md:h-[68vh]">
          <motion.img
            src={IMAGES.aral.src}
            alt={t.problem.imageAlt}
            width={IMAGES.aral.w}
            height={IMAGES.aral.h}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-[116%] w-full object-cover"
            style={{ y }}
          />
        </div>
        <figcaption className="shell mt-4 text-sm text-faint">
          {t.problem.imageCaption}
        </figcaption>
      </Reveal>

      <div className="shell relative mt-20 md:mt-28">
        <div className="grid grid-cols-1 gap-y-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-x-8">
          {t.problem.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className={i > 0 ? 'sm:border-l sm:border-line sm:pl-8' : ''}>
              <div className="font-mono text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-none tracking-[-0.04em] tnum">
                {s.value}
              </div>
              <p className="mt-3 max-w-[26ch] text-[0.9375rem] leading-snug text-soft">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-[0.8125rem] text-faint">{t.problem.note}</p>
      </div>
    </section>
  )
}
