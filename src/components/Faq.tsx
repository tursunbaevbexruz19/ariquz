import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Minus, Plus } from '@phosphor-icons/react'
import { useI18n } from '@/i18n'
import { Reveal, RevealLines } from './ui/motion-primitives'

export function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(0)
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-4">
          <h2 className="font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.045em] md:sticky md:top-28">
            <RevealLines lines={[t.faq.h2]} />
          </h2>
        </div>

        <div className="md:col-span-8">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-[1.0625rem] font-medium leading-snug tracking-[-0.02em] transition-colors group-hover:text-accent-ink md:text-[1.1875rem]">
                        {item.q}
                      </span>
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-soft transition-colors group-hover:border-accent group-hover:text-accent-ink">
                        {isOpen ? <Minus size={13} weight="bold" /> : <Plus size={13} weight="bold" />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="panel"
                        initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-7 pr-10 text-[0.9375rem] leading-relaxed text-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
