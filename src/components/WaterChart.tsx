import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '@/i18n'
import { formatNumber } from '@/lib/format'

/**
 * Water applied per hectare across a 20 week cotton season.
 *
 * The whole argument of the product is in the shape: furrow irrigation is
 * eleven large events, the network is a continuous low curve tracking crop
 * demand. Both series total to the published season figures.
 *
 * Colour carries one distinction only. "Before" is neutral, "after" is the
 * page accent. No second accent is introduced for the sake of a legend.
 */
const WEEKS = 20
const FURROW_EVENTS = [2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17]
const FURROW_PER_EVENT = 655

const DEMAND = [
  0.2, 0.28, 0.36, 0.46, 0.58, 0.72, 0.86, 1.0, 1.1, 1.16, 1.18, 1.14, 1.05, 0.92, 0.78,
  0.62, 0.48, 0.36, 0.26, 0.18,
]
const ARIQ_TOTAL = 4250
const Y_MAX = 700
const W = 720

/** Catmull-Rom through the points, expressed as cubic beziers. */
function smooth(points: [number, number][]) {
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

export function WaterChart() {
  const { t } = useI18n()
  const c = t.platform.chart
  const reduce = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [rendered, setRendered] = useState(720)

  /* Text inside an SVG scales with the viewBox, so a fixed font-size renders
     at ~16px in the desktop panel and ~5px on a phone. Measuring the drawn
     width lets every label be specified in real pixels and stay legible at
     any size. A taller box on narrow screens keeps the bars from collapsing
     into a strip. */
  useEffect(() => {
    // Observe the HTML wrapper, not the SVG: contentRect on an SVG element
    // is unreliable across engines and reported nothing here.
    const el = wrapRef.current
    if (!el) return
    const apply = (w: number) => {
      if (w > 0) setRendered((prev) => (Math.abs(prev - w) < 2 ? prev : w))
    }
    apply(el.getBoundingClientRect().width)
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const g = useMemo(() => {
    const narrow = rendered < 560
    const H = narrow ? 430 : 300
    const pad = {
      top: 18,
      right: narrow ? 20 : 58,
      bottom: narrow ? 46 : 32,
      left: narrow ? 62 : 46,
    }
    const plotW = W - pad.left - pad.right
    const plotH = H - pad.top - pad.bottom
    const scale = rendered / W || 1
    // Every label declared in the pixels it should actually render at.
    const px = (target: number) => Math.round((target / scale) * 10) / 10
    return {
      narrow,
      H,
      pad,
      plotW,
      plotH,
      x: (i: number) => pad.left + (i / (WEEKS - 1)) * plotW,
      y: (v: number) => pad.top + plotH - (v / Y_MAX) * plotH,
      fs: px(11.5),
      fsLabel: px(12),
      barW: narrow ? 8 : 10,
    }
  }, [rendered])

  const { ariq, linePath, areaPath, furrowTotal } = useMemo(() => {
    const sum = DEMAND.reduce((a, b) => a + b, 0)
    const unit = ARIQ_TOTAL / sum
    const values = DEMAND.map((wt) => wt * unit)
    const pts = values.map((v, i) => [g.x(i), g.y(v)] as [number, number])
    const line = smooth(pts)
    return {
      ariq: values,
      linePath: line,
      areaPath: `${line} L${g.x(WEEKS - 1).toFixed(1)},${g.y(0).toFixed(1)} L${g.x(0).toFixed(1)},${g.y(0).toFixed(1)} Z`,
      furrowTotal: FURROW_EVENTS.length * FURROW_PER_EVENT,
    }
  }, [g])

  // One state write per week crossed, not per pointer frame.
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const rel = ((e.clientX - rect.left) / rect.width) * W
    const i = Math.round(((rel - g.pad.left) / g.plotW) * (WEEKS - 1))
    const clamped = Math.max(0, Math.min(WEEKS - 1, i))
    setHover((prev) => (prev === clamped ? prev : clamped))
  }

  const furrowAt = (i: number) => (FURROW_EVENTS.includes(i) ? FURROW_PER_EVENT : 0)

  return (
    <figure className="w-full">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="text-[0.9375rem] font-medium">{c.title}</span>
        <span className="font-mono text-[0.75rem] text-faint">{c.unit}</span>
      </figcaption>

      <div ref={wrapRef}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${g.H}`}
        className="w-full touch-pan-y"
        role="img"
        aria-label={`${c.title}. ${c.legendA}: ${furrowTotal} ${c.unit}. ${c.legendB}: ${ARIQ_TOTAL} ${c.unit}.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {/* Baseline and a single mid gridline. Nothing else. */}
        {[0, 350, 700].map((v) => (
          <g key={v}>
            <line
              x1={g.pad.left}
              x2={W - g.pad.right}
              y1={g.y(v)}
              y2={g.y(v)}
              stroke="var(--line)"
              strokeWidth="1"
            />
            <text
              x={g.pad.left - 10}
              y={g.y(v) + g.fs * 0.35}
              textAnchor="end"
              className="font-mono tnum"
              fontSize={g.fs}
              fill="var(--ink-faint)"
            >
              {v}
            </text>
          </g>
        ))}

        {[0, 4, 8, 12, 16].map((i) => (
          <text
            key={i}
            x={g.x(i)}
            y={g.H - g.pad.bottom + g.fs * 1.8}
            textAnchor="middle"
            className="font-mono tnum"
            fontSize={g.fs}
            fill="var(--ink-faint)"
          >
            {i + 1}
          </text>
        ))}

        {/* Furrow irrigation: eleven discrete events */}
        {FURROW_EVENTS.map((i, n) => (
          <motion.rect
            key={i}
            x={g.x(i) - g.barW / 2}
            width={g.barW}
            y={g.y(FURROW_PER_EVENT)}
            height={g.y(0) - g.y(FURROW_PER_EVENT)}
            fill="var(--ink-faint)"
            opacity={hover === null || hover === i ? 0.55 : 0.28}
            style={{ transformOrigin: `${g.x(i)}px ${g.y(0)}px` }}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.15 + n * 0.045, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* ARIQ: continuous supply tracking crop demand */}
        <motion.path
          d={areaPath}
          fill="var(--accent)"
          opacity={0.16}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 0.16 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={g.narrow ? 4 : 2.5}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Direct labels beat a detached legend. There is no room for them
            beside the plot on a phone, where the readout row carries it. */}
        {!g.narrow && (
          <>
            <text
              x={g.x(WEEKS - 1) + 10}
              y={g.y(ariq[WEEKS - 1]) + g.fsLabel * 0.35}
              fontSize={g.fsLabel}
              fill="var(--accent-ink)"
              fontWeight="600"
            >
              {c.legendB.split(' ')[0]}
            </text>
            <text
              x={g.x(FURROW_EVENTS[FURROW_EVENTS.length - 1]) + 10}
              y={g.y(FURROW_PER_EVENT) - 8}
              fontSize={g.fsLabel}
              fill="var(--ink-faint)"
            >
              {c.legendA.split(' ')[0]}
            </text>
          </>
        )}

        {hover !== null && (
          <g>
            <line
              x1={g.x(hover)}
              x2={g.x(hover)}
              y1={g.pad.top}
              y2={g.y(0)}
              stroke="var(--ink)"
              strokeWidth="1"
              opacity="0.28"
            />
            <circle cx={g.x(hover)} cy={g.y(ariq[hover])} r={g.narrow ? 7 : 4} fill="var(--accent)" />
          </g>
        )}
      </svg>
      </div>

      {/* Readout for the hovered week, and the season totals otherwise. */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
        <div>
          <div className="text-[0.8125rem] text-faint">{c.legendA}</div>
          <div className="mt-1 font-mono text-lg tnum">
            {hover === null
              ? `${formatNumber(furrowTotal, t.numberLocale)} ${c.unit}`
              : `${formatNumber(furrowAt(hover), t.numberLocale)} ${c.unit}`}
          </div>
        </div>
        <div>
          <div className="text-[0.8125rem] text-faint">{c.legendB}</div>
          <div className="mt-1 font-mono text-lg text-accent-ink tnum">
            {hover === null
              ? `${formatNumber(ARIQ_TOTAL, t.numberLocale)} ${c.unit}`
              : `${formatNumber(Math.round(ariq[hover]), t.numberLocale)} ${c.unit}`}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-[0.8125rem] text-faint">
            {hover === null ? c.totalLabel : `${c.week} ${hover + 1}`}
          </div>
          <div className="mt-1 font-mono text-lg tnum">
            {hover === null
              ? `41% ${c.deltaLabel}`
              : `${formatNumber(Math.max(0, furrowAt(hover) - Math.round(ariq[hover])), t.numberLocale)} ${c.unit}`}
          </div>
        </div>
      </div>
    </figure>
  )
}
