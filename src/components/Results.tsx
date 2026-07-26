import { useI18n } from '@/i18n'
import { IMAGES } from '@/lib/images'
import { Reveal, RevealLines } from './ui/motion-primitives'

export function Results() {
  const { t } = useI18n()
  const regions = t.results.regions
  const maxHa = Math.max(...regions.map((r) => Number(r.ha.replace(/[^\d]/g, ''))))

  return (
    <section id="natijalar" className="border-t border-line py-24 md:py-32">
      <div className="shell">
        <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <RevealLines lines={[t.results.h2]} />
        </h2>
        <Reveal>
          <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-soft">
            {t.results.lead}
          </p>
        </Reveal>

        {/* Seven regions in an eight-cell grid: the largest takes two cells,
            so the row closes exactly and no blank tile is left over. */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r, i) => {
            const ha = Number(r.ha.replace(/[^\d]/g, ''))
            return (
              /* The cell itself never fades. The grid uses a 1px gap over a
                 --line background to draw its rules, so a cell at opacity 0
                 exposes that background and the whole block flashes grey
                 during the stagger. Only the contents reveal. */
              <div
                key={r.name}
                className={`bg-bg p-6 md:p-7 ${i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <Reveal delay={i * 0.05}>
                <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.03em]">
                  {r.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-mono text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium leading-none tracking-[-0.04em] tnum">
                    {r.ha}
                  </span>
                  <span className="text-[0.8125rem] text-faint">{t.results.colHa}</span>
                </div>

                {/* Bar without a track: the line itself is the value. */}
                <div
                  className="mt-4 h-[3px] bg-accent transition-[width] duration-700"
                  style={{ width: `${Math.round((ha / maxHa) * 100)}%` }}
                  aria-hidden="true"
                />

                <div className="mt-4 font-mono text-[0.8125rem] text-soft tnum">
                  {r.save}
                  <span className="ml-2 font-sans text-faint">{t.results.colSave}</span>
                </div>
                </Reveal>
              </div>
            )
          })}
        </div>

        <Reveal as="figure" className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <img
              src={IMAGES.tilework.src}
              alt={t.results.imageAlt}
              width={IMAGES.tilework.w}
              height={IMAGES.tilework.h}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between md:col-span-8">
            <blockquote>
              <p className="font-display text-[clamp(1.5rem,3.1vw,2.35rem)] font-medium leading-[1.22] tracking-[-0.035em]">
                {t.results.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8">
              <div className="text-[0.9375rem] font-medium">{t.results.author}</div>
              <div className="mt-1 text-[0.9375rem] text-soft">{t.results.role}</div>
            </figcaption>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
