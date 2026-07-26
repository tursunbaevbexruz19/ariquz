import { useEffect } from 'react'
import { IconContext } from '@phosphor-icons/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { I18nProvider, useI18n } from '@/i18n'
import { ThemeProvider } from '@/lib/theme'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { Grain } from './components/ui/Grain'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { StatsBand } from './components/StatsBand'
import { Problem } from './components/Problem'
import { DropJourney } from './components/DropJourney'
import { Method } from './components/Method'
import { Platform } from './components/Platform'
import { CompareSlider } from './components/CompareSlider'
import { Results } from './components/Results'
import { Pricing } from './components/Pricing'
import { Faq } from './components/Faq'
import { Calculator } from './components/Calculator'
import { Footer } from './components/Footer'

/**
 * Switching locale rewrites most of the copy on the page, which changes
 * the height of nearly every pinned section. Without this, ScrollTrigger
 * keeps the old measurements and the descent ends in the wrong place.
 */
function RefreshOnLocaleChange() {
  const { locale } = useI18n()
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => window.clearTimeout(id)
  }, [locale])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <IconContext.Provider value={{ weight: 'regular' }}>
          <SmoothScroll>
            <RefreshOnLocaleChange />
            <Grain />
            <Nav />
            <main>
              <Hero />
              <StatsBand />
              <Problem />
              <DropJourney />
              <Method />
              <Platform />
              <CompareSlider />
              <Results />
              <Pricing />
              <Faq />
              <Calculator />
            </main>
            <Footer />
          </SmoothScroll>
        </IconContext.Provider>
      </I18nProvider>
    </ThemeProvider>
  )
}
