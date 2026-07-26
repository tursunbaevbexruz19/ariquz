/**
 * Locale-aware number rendering.
 *
 * Intl is used for the digit grouping itself, but the separators are
 * applied by hand. Two reasons:
 *
 *   1. Chromium's ICU data returns comma grouping for uz-UZ ("1,234,567").
 *      Uzbek practice, in banking, price tags and official documents, is a
 *      space group and a decimal comma, the same as Russian.
 *   2. Intl emits a narrow no-break space, which renders inconsistently
 *      next to tabular figures. A regular no-break space is steadier.
 */
const NBSP = ' '

type Seps = { group: string; decimal: string }

const SEPARATORS: Record<string, Seps> = {
  'uz-UZ': { group: NBSP, decimal: ',' },
  'ru-RU': { group: NBSP, decimal: ',' },
  'en-US': { group: ',', decimal: '.' },
}

const fallback: Seps = { group: NBSP, decimal: ',' }

export function decimalSeparator(locale: string) {
  return (SEPARATORS[locale] ?? fallback).decimal
}

export function formatNumber(value: number, locale: string, digits = 0) {
  const seps = SEPARATORS[locale] ?? fallback
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
    .formatToParts(value)
    .map((part) => {
      if (part.type === 'group') return seps.group
      if (part.type === 'decimal') return seps.decimal
      return part.value
    })
    .join('')
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

/** Maps a value from one range to another, clamped at both ends. */
export function mapRange(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1)
  return outMin + t * (outMax - outMin)
}
