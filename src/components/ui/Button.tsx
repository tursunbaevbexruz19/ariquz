import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Magnetic } from './motion-primitives'

/**
 * Radius rule: every interactive control on the page is a full pill,
 * every surface is square. There are no other radii.
 *
 * Contrast: the accent fill carries --accent-on as its label colour,
 * which is 4.85:1 in light and 10.1:1 in dark.
 */
const base =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ' +
  'font-medium transition-[transform,background-color,border-color,color] duration-200 ' +
  'ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55'

const sizes = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
} as const

const variants = {
  primary: 'bg-accent text-accent-on hover:brightness-[1.08]',
  outline: 'border border-line-strong text-ink hover:border-ink hover:bg-accent-wash',
  quiet: 'text-soft hover:text-ink hover:bg-accent-wash',
} as const

type Common = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  magnetic?: boolean
  children: ReactNode
  className?: string
}

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...rest
}: Common & ComponentPropsWithoutRef<'button'>) {
  const node = (
    <button className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  )
  return magnetic ? <Magnetic strength={0.22}>{node}</Magnetic> : node
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...rest
}: Common & ComponentPropsWithoutRef<'a'>) {
  const node = (
    <a className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </a>
  )
  return magnetic ? <Magnetic strength={0.22}>{node}</Magnetic> : node
}
