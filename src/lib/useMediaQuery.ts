import { useEffect, useState } from 'react'

/** Subscribes to a media query. Used to render genuinely different markup
 *  for the pinned desktop experience and the stacked mobile one, rather
 *  than trying to bend one layout into both with CSS. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
