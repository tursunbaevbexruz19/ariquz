import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
} from 'motion/react'
import { formatNumber } from '@/lib/format'

const EASE_OUT: Transition['ease'] = [0.16, 1, 0.3, 1]

/** Fade and rise on entry. The workhorse reveal for body content. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'figure'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  )
}

/**
 * Display headlines rise line by line out of a clipping mask. Lines are
 * passed in explicitly rather than auto-split, so the break points are a
 * typographic decision and never shift with the locale.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.3 })

  return (
    /*
     * Two things this has to survive, both of which broke the obvious
     * implementation:
     *
     * 1. The observer belongs on this wrapper, never on the lines. A line
     *    starts translated 105% down, outside its own overflow-hidden mask.
     *    Ancestor clipping counts toward the intersection rect, so an
     *    observer on the line itself reports zero visible area, never fires,
     *    and the line stays hidden for good. The wrapper is never
     *    transformed, so it is always observable.
     *
     * 2. Switching locale gives the lines new keys, so they remount. With
     *    whileInView plus once, the trigger has already spent itself and the
     *    fresh children mount straight into "hidden" and stay there, which
     *    blanked every headline on the page. Latching the state in useInView
     *    and driving `animate` means remounted children land on "visible"
     *    whatever else has happened.
     */
    <motion.span
      ref={ref}
      className={className}
      initial={reduce ? false : 'hidden'}
      animate={reduce ? undefined : seen ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="reveal-line">
          <motion.span
            className={lineClassName}
            variants={{ hidden: { y: '105%' }, visible: { y: '0%' } }}
            transition={{ duration: 0.95, ease: EASE_OUT }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Counts up once, on entry. The value is written straight to the DOM node
 * so a 1.4s count does not re-render the React tree ~84 times.
 */
export function Counter({
  to,
  locale,
  digits = 0,
  className,
}: {
  to: number
  locale: string
  digits?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  // Start at zero before the first paint so the final value never flashes.
  useLayoutEffect(() => {
    if (ref.current && !reduce) ref.current.textContent = formatNumber(0, locale, digits)
  }, [locale, digits, reduce])

  useEffect(() => {
    if (!inView || !ref.current) return
    // No animation frames in a hidden tab, so counting there would leave
    // the figure stuck at zero. Jump straight to the value.
    if (reduce || document.hidden) {
      ref.current.textContent = formatNumber(to, locale, digits)
      return
    }
    const controls = animate(0, to, {
      duration: 1.5,
      ease: EASE_OUT,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatNumber(v, locale, digits)
      },
    })
    return () => controls.stop()
  }, [inView, to, locale, digits, reduce])

  return (
    <span ref={ref} className={className}>
      {formatNumber(to, locale, digits)}
    </span>
  )
}

/**
 * Pulls toward the cursor. Driven by motion values, never state, so the
 * React tree is untouched while the pointer moves.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 })
  const ref = useRef<HTMLSpanElement>(null)

  if (reduce) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onPointerMove={(e) => {
        // Coarse pointers have no hover, and dragging the button is worse
        // than leaving it still.
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
