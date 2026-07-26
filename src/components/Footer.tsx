import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '@/i18n'
import { AriqMark } from './ui/marks'

export function Footer() {
  const { t } = useI18n()
  const reduce = useReducedMotion()

  return (
    <footer className="border-t border-line pt-20">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {t.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-[0.9375rem] font-semibold tracking-[-0.02em]">
                {col.title}
              </h3>
              {/* gap-1 plus py-2 rather than gap-3 on a 20px link: same
                  visual rhythm, but a thumb-sized hit area. */}
              <ul className="mt-4 grid gap-1">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#asosiy"
                      className="inline-block py-2 text-[0.9375rem] text-soft transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-display text-[0.9375rem] font-semibold tracking-[-0.02em]">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 grid gap-1 text-[0.9375rem] text-soft">
              <li>
                <a
                  href={`tel:${t.footer.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-block py-2 font-mono transition-colors hover:text-ink tnum"
                >
                  {t.footer.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t.footer.email}`}
                  className="inline-block py-2 transition-colors hover:text-ink"
                >
                  {t.footer.email}
                </a>
              </li>
              <li className="max-w-[22ch] py-2 leading-snug">{t.footer.address}</li>
            </ul>
          </div>
        </div>

        <p className="mt-16 font-display text-[clamp(1.125rem,2.2vw,1.75rem)] font-medium tracking-[-0.035em]">
          {t.footer.tagline}
        </p>
      </div>

      {/* The wordmark, set as large as the page will allow, cropped by the
          viewport edge. It is the last thing on the page and the only place
          the brand is allowed to shout. */}
      <div className="mt-10 overflow-hidden px-[2vw]">
        <motion.div
          className="flex items-center justify-center gap-[0.06em]"
          initial={reduce ? false : { y: '18%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <AriqMark className="h-[13vw] w-[13vw] shrink-0 text-accent-ink" />
          <span
            className="font-display leading-[0.8] text-ink"
            style={{ fontSize: '19.5vw', fontWeight: 700, letterSpacing: '-0.055em' }}
          >
            ARIQ
          </span>
        </motion.div>
      </div>

      <div className="shell border-t border-line py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[62ch] text-[0.8125rem] leading-relaxed text-faint">
            {t.footer.legal}
          </p>
          <p className="shrink-0 font-mono text-[0.8125rem] text-faint tnum">
            2026 ARIQ. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
