import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CaretDown, CircleNotch, Check, Warning } from '@phosphor-icons/react'
import { useI18n } from '@/i18n'
import { clamp, formatNumber } from '@/lib/format'
import { Reveal, RevealLines } from './ui/motion-primitives'

/* ── The estimate model ───────────────────────────────────────────
   Seasonal water demand and the share a subsurface drip network can
   remove, per crop. Region coefficients scale the saving by local
   evaporative demand: Xorazm and Qoraqalpogʻiston lose more to the air
   than the Fargʻona valley does. Every figure is an illustrative model
   for this concept project, which is what the disclaimer states.       */

type CropId = 'paxta' | 'bugdoy' | 'bog' | 'uzum' | 'sabzavot'

const CROP: Record<CropId, { base: number; drip: number; yieldUp: number; benefit: number }> = {
  paxta: { base: 7200, drip: 0.59, yieldUp: 18, benefit: 2_100_000 },
  bugdoy: { base: 4200, drip: 0.66, yieldUp: 12, benefit: 1_250_000 },
  bog: { base: 6800, drip: 0.55, yieldUp: 22, benefit: 3_400_000 },
  uzum: { base: 6100, drip: 0.57, yieldUp: 19, benefit: 3_000_000 },
  sabzavot: { base: 8300, drip: 0.62, yieldUp: 24, benefit: 3_800_000 },
}

const REGION_COEF: Record<string, number> = {
  qoraqalpogiston: 1.1,
  xorazm: 1.08,
  navoiy: 1.07,
  buxoro: 1.06,
  qashqadaryo: 1.05,
  jizzax: 1.04,
  sirdaryo: 1.03,
  surxondaryo: 1.02,
  samarqand: 1.0,
  toshkent: 0.98,
  andijon: 0.96,
  namangan: 0.96,
  fargona: 0.95,
}

/** Capital cost per hectare left with the farm after the state subsidy. */
const NET_CAPEX_PER_HA = 4_900_000

function tierPrice(area: number) {
  if (area < 50) return 1_850_000
  if (area <= 1000) return 1_450_000
  return 1_250_000
}

/* ── Small pieces ─────────────────────────────────────────────── */

function LiveNumber({
  value,
  locale,
  digits = 0,
  className,
}: {
  value: number
  locale: string
  digits?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    const settle = () => {
      if (ref.current) ref.current.textContent = formatNumber(value, locale, digits)
    }
    // A hidden tab gets no animation frames, so counting there would leave
    // the readout frozen on a stale figure. Jump straight to the result.
    if (reduce || document.hidden) {
      settle()
      prev.current = value
      return
    }
    const from = prev.current
    prev.current = value
    const controls = animate(from, value, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatNumber(v, locale, digits)
      },
    })
    return () => {
      controls.stop()
      settle()
    }
  }, [value, locale, digits, reduce])

  return (
    <span ref={ref} className={className}>
      {formatNumber(value, locale, digits)}
    </span>
  )
}

function Field({
  id,
  label,
  help,
  error,
  children,
}: {
  id: string
  label: string
  help?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-soft">
        {label}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-danger">
          <Warning size={14} weight="fill" />
          {error}
        </p>
      ) : help ? (
        <p className="text-[0.8125rem] text-faint">{help}</p>
      ) : null}
    </div>
  )
}

const inputBase =
  'h-12 w-full border bg-surface px-4 text-[0.9375rem] outline-none transition-colors ' +
  'placeholder:text-faint focus:border-accent'

/* ── The section ──────────────────────────────────────────────── */

type Status = 'idle' | 'sending' | 'done' | 'failed'

export function Calculator() {
  const { t } = useI18n()

  const [area, setArea] = useState(120)
  const [crop, setCrop] = useState<CropId>('paxta')
  const [region, setRegion] = useState('qashqadaryo')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')

  const result = useMemo(() => {
    const c = CROP[crop]
    const coef = REGION_COEF[region] ?? 1
    return {
      water: Math.round(area * c.base * (1 - c.drip) * coef),
      fee: Math.round(area * tierPrice(area)),
      yieldUp: c.yieldUp,
      payback: Math.round((NET_CAPEX_PER_HA / c.benefit) * 10) / 10,
    }
  }, [area, crop, region])

  function validate() {
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = t.calc.errors.name
    const digits = phone.replace(/\D/g, '')
    if (!(digits.length === 12 && digits.startsWith('998'))) next.phone = t.calc.errors.phone
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = t.calc.errors.email
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      // Stands in for POST /api/leads. The concept build has no backend.
      await new Promise((resolve) => setTimeout(resolve, 1100))
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  function reset() {
    setStatus('idle')
    setName('')
    setPhone('')
    setEmail('')
    setErrors({})
  }

  const outputs = [
    {
      label: t.calc.out.water,
      value: result.water,
      unit: t.calc.out.waterUnit,
      digits: 0,
      accent: true,
    },
    { label: t.calc.out.cost, value: result.fee, unit: t.calc.out.costUnit, digits: 0 },
    { label: t.calc.out.yieldUp, value: result.yieldUp, unit: '%', digits: 0 },
    {
      label: t.calc.out.payback,
      value: result.payback,
      unit: t.calc.out.seasons,
      digits: 1,
    },
  ]

  return (
    <section id="hisob" className="border-t border-line py-24 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-12">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em] md:col-span-6">
            <RevealLines lines={[t.calc.h2]} />
          </h2>
          <Reveal className="md:col-span-5 md:col-start-8 md:pt-3">
            <p className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-soft">
              {t.calc.body}
            </p>
          </Reveal>
        </div>

        {/* Instrument row: the three inputs that drive the estimate. */}
        <Reveal className="mt-14 grid grid-cols-1 gap-6 border-t border-line pt-10 md:grid-cols-3 md:gap-8">
          <Field id="area" label={t.calc.area.label} help={t.calc.area.help}>
            <div className="flex items-center gap-4">
              <input
                id="area"
                type="number"
                min={5}
                max={2000}
                value={area}
                onChange={(e) => setArea(clamp(Number(e.target.value) || 5, 5, 2000))}
                className={`${inputBase} border-line w-32 font-mono tnum`}
              />
              <span className="text-[0.8125rem] text-faint">{t.calc.area.unit}</span>
            </div>
            <input
              type="range"
              min={5}
              max={2000}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              aria-label={t.calc.area.label}
              className="h-11 w-full sm:h-6"
            />
          </Field>

          <Field id="crop" label={t.calc.crop.label}>
            <div className="relative">
              <select
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value as CropId)}
                className={`${inputBase} border-line cursor-pointer pr-11`}
              >
                {t.calc.crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <CaretDown
                size={15}
                weight="bold"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-soft"
              />
            </div>
          </Field>

          <Field id="region" label={t.calc.region.label}>
            <div className="relative">
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={`${inputBase} border-line cursor-pointer pr-11`}
              >
                {t.calc.regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <CaretDown
                size={15}
                weight="bold"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-soft"
              />
            </div>
          </Field>
        </Reveal>

        {/* Readout band */}
        <div
          className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
          aria-live="polite"
        >
          {outputs.map((o) => (
            <div key={o.label} className="bg-surface p-6 md:p-8">
              <div className="text-[0.8125rem] text-soft">{o.label}</div>
              <div
                className={`mt-3 font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-none tracking-[-0.04em] tnum ${
                  o.accent ? 'text-accent-ink' : ''
                }`}
              >
                <LiveNumber value={o.value} locale={t.numberLocale} digits={o.digits} />
              </div>
              <div className="mt-2 font-mono text-[0.75rem] text-faint">{o.unit}</div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[0.8125rem] text-faint">{t.calc.disclaimer}</p>

        {/* Contact */}
        <div className="mt-14 border-t border-line pt-10">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start gap-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-on">
                  <Check size={20} weight="bold" />
                </span>
                <div>
                  <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.035em]">
                    {t.calc.doneTitle}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-soft">
                    {t.calc.doneBody}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-line-strong px-5 py-2.5 text-[0.9375rem] transition-colors hover:border-ink hover:bg-accent-wash"
                >
                  {t.calc.again}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <Field id="name" label={t.calc.name.label} error={errors.name}>
                    <input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.calc.name.placeholder}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      className={`${inputBase} ${errors.name ? 'border-danger' : 'border-line'}`}
                    />
                  </Field>
                </div>

                <div className="md:col-span-4">
                  <Field
                    id="phone"
                    label={t.calc.phone.label}
                    help={t.calc.phone.help}
                    error={errors.phone}
                  >
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.calc.phone.placeholder}
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      className={`${inputBase} font-mono ${errors.phone ? 'border-danger' : 'border-line'}`}
                    />
                  </Field>
                </div>

                <div className="md:col-span-4">
                  <Field id="email" label={t.calc.email.label} error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.calc.email.placeholder}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className={`${inputBase} ${errors.email ? 'border-danger' : 'border-line'}`}
                    />
                  </Field>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:col-span-12">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex h-13 items-center gap-2 rounded-full bg-accent px-7 font-medium text-accent-on transition-[transform,filter] duration-200 hover:brightness-[1.08] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <CircleNotch size={17} weight="bold" className="animate-spin" />
                        {t.calc.submitting}
                      </>
                    ) : (
                      <>
                        {t.calc.submit}
                        <ArrowUpRight size={17} weight="bold" />
                      </>
                    )}
                  </button>

                  {status === 'failed' && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-[0.875rem] text-danger"
                    >
                      <Warning size={15} weight="fill" />
                      {t.calc.errors.network}
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
