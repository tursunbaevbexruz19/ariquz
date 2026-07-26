import { useI18n } from '@/i18n'
import { Counter, Reveal } from './ui/motion-primitives'
import { PartnerMark } from './ui/marks'

export function StatsBand() {
  const { t } = useI18n()

  return (
    <section className="relative border-t border-line pt-14 md:pt-20">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={
                i % 2 === 1
                  ? 'border-l border-line pl-6 lg:pl-8'
                  : 'lg:border-l lg:border-line lg:pl-8 lg:first:border-l-0 lg:first:pl-0'
              }
            >
              <div className="flex items-baseline gap-1.5 font-mono text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.04em] tnum">
                <Counter to={s.value} locale={t.numberLocale} />
                {s.suffix && <span className="text-accent-ink">{s.suffix}</span>}
              </div>
              {s.unit && (
                <div className="mt-2 font-mono text-[0.8125rem] text-accent-ink">{s.unit}</div>
              )}
              <div className="mt-2 max-w-[22ch] text-[0.9375rem] leading-snug text-soft">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-[0.8125rem] text-faint">{t.stats.note}</p>
      </div>

      <PartnerMarquee />
    </section>
  )
}

/**
 * The one marquee on this page. Partner names are invented, so each gets a
 * geometric mark drawn on the same construction grid rather than a bare
 * text wordmark. Duplicated once and translated by exactly -50%, which is
 * what makes the loop seamless.
 */
function PartnerMarquee() {
  const { t } = useI18n()
  const row = [...t.partners.names, ...t.partners.names]

  return (
    <div className="mt-16 md:mt-24">
      <div className="shell">
        <p className="text-sm text-faint">{t.partners.caption}</p>
      </div>

      <div
        className="group relative mt-6 overflow-hidden border-y border-line py-7"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max items-center gap-14 pl-14 md:gap-20 md:pl-20">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-3 text-soft transition-colors duration-300 hover:text-ink"
              aria-hidden={i >= t.partners.names.length}
            >
              <PartnerMark index={i} className="h-7 w-7 opacity-80" />
              <span className="whitespace-nowrap text-[0.9375rem] font-medium tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ariq-marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        .marquee-track {
          animation: ariq-marquee 46s linear infinite;
          will-change: transform;
        }
        .group:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  )
}
