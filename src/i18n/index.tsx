import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { uz, type Dict } from './uz'
import { ru } from './ru'
import { en } from './en'

export const LOCALES = { uz, ru, en } as const
export type LocaleCode = keyof typeof LOCALES
export const LOCALE_ORDER: LocaleCode[] = ['uz', 'ru', 'en']

const STORAGE_KEY = 'ariq.locale'

/**
 * Uzbek first, always, until the visitor chooses otherwise.
 *
 * Browser language is deliberately ignored here. Plenty of devices in
 * Uzbekistan report ru-RU or en-US while their owner reads Uzbek, so
 * honouring navigator.language would hand the wrong language to a large
 * share of the actual audience. The switcher is in the header, and the
 * choice is remembered.
 */
function detectLocale(): LocaleCode {
  if (typeof window === 'undefined') return 'uz'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && stored in LOCALES) return stored as LocaleCode
  return 'uz'
}

type Ctx = {
  locale: LocaleCode
  setLocale: (l: LocaleCode) => void
  t: Dict
}

const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(detectLocale)

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].htmlLang
  }, [locale])

  const setLocale = useCallback((l: LocaleCode) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // private mode; the choice simply does not persist
    }
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale, t: LOCALES[locale] }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
