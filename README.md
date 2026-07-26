# ARIQ

**Har bir tomchi ildizgacha.** Every drop reaches the root.

A concept product site for a fictional Uzbek agritech company that installs
sensor-controlled subsurface drip irrigation on cotton and orchard farms, and
runs it as a per-hectare seasonal subscription.

Built as a portfolio piece. The brand, the copy, the pricing and the figures
were all created for this project and do not describe an existing company.

```bash
npm install
npm run dev
```

---

## Why this business

Roughly 90% of the water withdrawn in Uzbekistan goes to agriculture, and a
large share of it never reaches a root: it evaporates off the surface, drains
past the root zone, or is lost in the canal. The Aral Sea is the visible end of
that ledger. Subsurface drip plus soil telemetry is a real, funded, subsidised
intervention in that market, which makes it a brief with actual substance
rather than a styling exercise.

The name is the Uzbek word for an irrigation channel. Every Uzbek speaker knows
it, and it doubles as the product: infrastructure that moves water.

## Design direction

The reference language is a **field instrument**, not a green-tech startup:
depth rulers, sensor readouts, tabular figures, hairlines instead of cards.

| | |
|---|---|
| Accent | One colour for the whole page. A deep Timurid teal taken from Samarqand tilework, which also reads as water. |
| Type | **Unbounded** for display, **Onest** for text, **JetBrains Mono** for every number. All three carry Latin Extended and Cyrillic, which the Uzbek `ʻ` and the Russian locale both need. |
| Radius | Exactly two values. Surfaces, cards, inputs and images are square. Buttons, chips and toggles are full pills. Nothing else. |
| Theme | Light and dark, both fully designed, switchable in the header, remembered. No section inverts mid-page. |
| Contrast | The ink ramp is 16.7:1 / 7.3:1 / 4.7:1 in light and 16:1 / 7.8:1 / 4.8:1 in dark, so even the 11px eyebrows clear WCAG AA. |

Photography is real and licensed: Unsplash CDN plus Wikimedia Commons,
including the stranded fishing fleet at Moʻynoq and Sher-Dor tilework in
Samarqand. All URLs live in `src/lib/images.ts`.

## Motion

Every animation on the page answers to something. The list is short on purpose.

**The path of one drop** (`DropJourney.tsx`) is the centrepiece. The section
pins and the ground travels past a fixed measurement line, from the main line
at 0 cm to the loss threshold at 90 cm. Depth, moisture, salinity and
temperature update against piecewise-linear sensor curves as you descend, and
the geometry is arranged so that a stage at depth *d* crosses the line at
scroll progress exactly *d* / 100.

Everything else supports it: a horizontal pan for the four-stage rollout, a
drag-to-compare on one hectare, a chart whose shape carries the argument
(eleven flood events against one continuous demand-tracking curve), and
scroll-reveals elsewhere.

Under `prefers-reduced-motion` Lenis is never constructed, GSAP never runs, and
the page falls back to plain scrolling with static content. Below 768px the
pinned descent and the horizontal pan are replaced by genuinely different
components, not squeezed layouts.

Readouts and counters are written straight to the DOM through motion values.
Scrolling and dragging this page does not re-render the React tree.

## Localisation

Uzbek is the source of truth. Russian and English are full translations of the
same typed dictionary, so a missing key is a type error rather than a blank on
the page.

- **Uzbek first, always.** `navigator.language` is deliberately ignored. Plenty
  of phones in Uzbekistan report `ru-RU` or `en-US` while their owner reads
  Uzbek, so honouring it would hand the wrong language to much of the audience.
- **Orthography.** `oʻ` and `gʻ` use U+02BB, the tutuq belgisi uses U+02BC.
  134 and 10 occurrences respectively, no straight quotes anywhere.
- **Numbers.** Chromium's ICU returns comma grouping for `uz-UZ`. Uzbek banking
  and official practice is a space group and a decimal comma, so `format.ts`
  applies the separators itself instead of trusting the platform.
- **Type is sized for the longest locale.** The hero display scale is capped
  by whichever locale sets the widest line, measured in ems of Unbounded
  rather than guessed. The English headline was shortened to "Every drop / to
  the root" partly because it is the closer translation of *ildizgacha* and
  partly because the longer version was holding the whole hero two steps
  smaller than it wanted to be. Uzbek now sets the cap at 8.8em, and the
  headline holds two lines in all three languages at every breakpoint.
- Regions, crops, currency and the `+998` phone format are all local.

## Structure

```
src/
  i18n/         uz.ts is the source of truth; ru.ts and en.ts are typed against it
  lib/          theme, number formatting, image manifest, media query hook
  components/
    DropJourney.tsx   pinned scroll descent, desktop and mobile variants
    Method.tsx        horizontal pan, with a scroll-snap fallback
    WaterChart.tsx    season water chart, hover readout
    CompareSlider.tsx drag compare, keyboard operable
    Calculator.tsx    live estimate model and lead form
    ui/               buttons, marks, reveal primitives, Lenis bridge
```

The estimate model in `Calculator.tsx` is documented inline: seasonal demand
and drip saving per crop, a regional coefficient for evaporative demand, and
three pricing tiers by area. It is an illustrative model, and the page says so.

## Notes

- The lead form has no backend. Submission is a stubbed promise with real
  loading, success and failure states.
- `npm run build` splits the animation libraries into their own chunk so a copy
  edit does not invalidate them.
