import { Check } from '@phosphor-icons/react'
import { useI18n } from '@/i18n'
import { formatNumber } from '@/lib/format'
import { Reveal, RevealLines } from './ui/motion-primitives'
import { ButtonLink } from './ui/Button'

/**
 * Asymmetric on purpose. Three equal columns is the reflex layout for
 * pricing and it flattens the recommendation; here the cluster tier owns
 * the left half of the grid and the other two stack beside it.
 */
export function Pricing() {
  const { t } = useI18n()
  const featured = t.pricing.plans.find((p) => p.featured)!
  const rest = t.pricing.plans.filter((p) => !p.featured)

  const priceBlock = (price: number | null, big: boolean) =>
    price === null ? (
      <div className="flex items-baseline gap-2">
        <span
          className={`font-display font-semibold tracking-[-0.045em] ${
            big ? 'text-[clamp(2rem,3.4vw,2.75rem)]' : 'text-[1.75rem]'
          }`}
        >
          {t.pricing.negotiated}
        </span>
      </div>
    ) : (
      <div>
        <div
          className={`font-mono font-medium leading-none tracking-[-0.045em] tnum ${
            big ? 'text-[clamp(2.25rem,4vw,3.25rem)]' : 'text-[1.875rem]'
          }`}
        >
          {formatNumber(price, t.numberLocale)}
        </div>
        <div className="mt-2 font-mono text-[0.8125rem] text-soft">{t.pricing.perUnit}</div>
      </div>
    )

  return (
    <section id="narxlar" className="border-t border-line py-24 md:py-32">
      <div className="shell">
        <p className="eyebrow">{t.pricing.eyebrow}</p>
        <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
          <RevealLines lines={[t.pricing.h2]} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col border border-accent bg-surface p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.035em]">
                  {featured.name}
                </h3>
                <span className="rounded-full bg-accent px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent-on">
                  {t.pricing.popular}
                </span>
              </div>
              <p className="mt-1.5 text-[0.9375rem] text-soft">{featured.range}</p>

              <div className="mt-8">{priceBlock(featured.price, true)}</div>

              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {featured.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                    <Check size={16} weight="bold" className="mt-1 shrink-0 text-accent-ink" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* The subsidy line lives inside the featured tier rather than
                  as a footnote below the grid. It is the strongest thing in
                  the offer, and it fills the height this column inherits
                  from the two stacked tiers beside it. */}
              <div className="mt-auto border-t border-line pt-6">
                <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-soft">
                  {t.pricing.note}
                </p>
                <div className="mt-7">
                  <ButtonLink href="#hisob" size="lg" magnetic>
                    {t.nav.cta}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={0.08 + i * 0.08}>
                <div className="flex h-full flex-col border border-line p-8">
                  <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.035em]">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-soft">{p.range}</p>

                  <div className="mt-6">{priceBlock(p.price, false)}</div>

                  <ul className="mt-6 grid gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                        <Check size={15} weight="bold" className="mt-1 shrink-0 text-accent-ink" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <ButtonLink href="#hisob" variant="outline">
                      {t.nav.cta}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
