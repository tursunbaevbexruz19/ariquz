import { Drop, MapTrifold, TelegramLogo, Waves } from '@phosphor-icons/react'
import { useI18n } from '@/i18n'
import { Reveal, RevealLines } from './ui/motion-primitives'
import { WaterChart } from './WaterChart'

const ICONS = [MapTrifold, Drop, Waves, TelegramLogo]

export function Platform() {
  const { t } = useI18n()

  return (
    <section id="platforma" className="border-t border-line py-24 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-12">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] md:col-span-7">
            <RevealLines lines={[t.platform.h2]} />
          </h2>
          <Reveal className="md:col-span-5 md:pt-3">
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-soft">
              {t.platform.body}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 border border-line bg-surface p-6 md:mt-20 md:p-10">
          <WaterChart />
        </Reveal>

        {/* Spec strip, not a card row: hairlines and space do the grouping. */}
        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {t.platform.features.map((f, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal
                key={f.title}
                delay={i * 0.06}
                className={i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''}
              >
                <Icon size={22} weight="regular" className="text-accent-ink" />
                <h3 className="mt-4 font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
                  {f.title}
                </h3>
                <p className="mt-2 max-w-[30ch] text-[0.9375rem] leading-relaxed text-soft">
                  {f.body}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
