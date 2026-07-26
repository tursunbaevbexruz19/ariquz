import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from 'motion/react'
import { List, MoonStars, SunDim, X } from '@phosphor-icons/react'
import { useI18n, LOCALE_ORDER, LOCALES, type LocaleCode } from '@/i18n'
import { useTheme } from '@/lib/theme'
import { Wordmark } from './ui/marks'
import { ButtonLink } from './ui/Button'

function LocaleSwitch({
  locale,
  setLocale,
  label,
  size = 'sm',
}: {
  locale: LocaleCode
  setLocale: (l: LocaleCode) => void
  label: string
  size?: 'sm' | 'lg'
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border border-line p-0.5 ${
        size === 'lg' ? 'text-sm' : 'text-[0.8125rem]'
      }`}
    >
      {LOCALE_ORDER.map((code) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={LOCALES[code].label}
            className={`relative rounded-full font-mono tracking-wide transition-colors ${
              size === 'lg' ? 'px-4 py-2' : 'px-2.5 py-1'
            } ${active ? 'text-accent-on' : 'text-soft hover:text-ink'}`}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{LOCALES[code].short}</span>
          </button>
        )
      })}
    </div>
  )
}

function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? t.a11y.themeToLight : t.a11y.themeToDark}
      className={`grid h-11 w-11 place-items-center rounded-full border border-line text-soft transition-colors hover:border-ink hover:text-ink sm:h-9 sm:w-9 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          {dark ? <SunDim size={18} weight="bold" /> : <MoonStars size={17} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export function Nav() {
  const { t, locale, setLocale } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  // Threshold crossing only, so this sets state twice per page, not per frame.
  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  return (
    <>
      <a
        href="#asosiy"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-accent-on"
      >
        {t.a11y.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? 'border-b border-line bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <a
            href="#asosiy"
            className="-my-2 shrink-0 py-2 text-[1.0625rem] tracking-tight"
            aria-label="ARIQ"
          >
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="ARIQ">
            {t.nav.links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="rounded-full px-3.5 py-2 text-[0.9375rem] text-soft transition-colors hover:bg-accent-wash hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block">
              <LocaleSwitch
                locale={locale}
                setLocale={setLocale}
                label={t.a11y.langLabel}
              />
            </div>
            <ThemeToggle />
            {/* Visibility lives on the wrapper, never on the button: the
                button already sets its own display and the two utilities
                would resolve by stylesheet order, not by class order. */}
            <div className="hidden lg:block">
              <ButtonLink href="#hisob" magnetic>
                {t.nav.cta}
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.a11y.openMenu}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink sm:h-9 sm:w-9 lg:hidden"
            >
              <List size={18} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] bg-bg lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex h-[68px] items-center justify-between">
              <Wordmark className="text-[1.0625rem]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.a11y.closeMenu}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink sm:h-9 sm:w-9"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="shell flex flex-col gap-10 pt-8">
              <nav className="flex flex-col">
                {t.nav.links.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line py-4 font-display text-[1.75rem] tracking-tight"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col gap-6">
                <LocaleSwitch
                  locale={locale}
                  setLocale={setLocale}
                  label={t.a11y.langLabel}
                  size="lg"
                />
                <ButtonLink href="#hisob" size="lg" onClick={() => setOpen(false)}>
                  {t.nav.cta}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
