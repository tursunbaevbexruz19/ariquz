import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'
import { useI18n } from '@/i18n'
import { IMAGES } from '@/lib/images'
import { RevealLines } from './ui/motion-primitives'
import { ButtonLink } from './ui/Button'

/**
 * Asymmetric split. The photograph is taken out of the grid and bled to
 * the right edge of the viewport, which buys the headline a wider column
 * than a 6/6 split would.
 *
 * The display size is set by the longest headline line across all three
 * locales. In Unbounded that is the Uzbek "Har bir tomchi" at 8.8em, so a
 * 52% column holds two lines in every language up to 4.8rem.
 */
export function Hero() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // The photograph drifts slower than the page. A depth cue, nothing more.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.07])

  return (
    <section
      ref={ref}
      id="asosiy"
      className="relative overflow-hidden pt-[68px] lg:min-h-[100dvh]"
    >
      {/* Two anchors, not one floating block: the headline hangs off the
          nav, the sub and CTAs sit on the base line, and the space between
          them is the composition rather than left-over room. */}
      {/* The full-viewport lockup is a desktop idea. On a phone it would push
          the photograph an entire screen below the fold, so the text block
          takes its natural height and the image follows immediately. */}
      <div className="shell relative z-10 flex flex-col justify-center gap-10 py-12 lg:min-h-[calc(100dvh-68px)] lg:justify-between lg:gap-6 lg:pb-[9vh] lg:pt-[9vh]">
        <div className="lg:w-[56%]">
          <motion.p
            className="eyebrow"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="mt-5 font-display text-[clamp(2.1rem,5.6vw,5.1rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
            <RevealLines lines={[t.hero.line1, t.hero.line2]} delay={0.28} />
          </h1>
        </div>

        <div className="lg:w-[46%]">
          <motion.p
            className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-soft md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.76, ease: [0.16, 1, 0.3, 1] }}
          >
            <ButtonLink href="#hisob" size="lg" magnetic>
              {t.nav.cta}
              <ArrowUpRight size={17} weight="bold" />
            </ButtonLink>
            <ButtonLink href="#yol" size="lg" variant="outline">
              {t.hero.ctaSecondary}
              <ArrowDown size={16} weight="bold" />
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <motion.figure
        className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[16/10] lg:absolute lg:right-0 lg:top-0 lg:aspect-auto lg:h-full lg:w-[40vw]"
        initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 1.15, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={IMAGES.hero.src}
          alt={t.hero.imageAlt}
          width={IMAGES.hero.w}
          height={IMAGES.hero.h}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y: imageY, scale: imageScale }}
        />
        {/* Sits the photograph into the page palette in both themes, and
            keeps the header controls legible where they cross the sky. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--bg)_65%,transparent),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 hidden h-32 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--bg)_72%,transparent),transparent)] lg:block" />
      </motion.figure>
    </section>
  )
}
