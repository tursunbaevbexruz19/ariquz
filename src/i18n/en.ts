import type { Dict } from './uz'

/** English — for investors, partners and export buyers. */
export const en: Dict = {
  code: 'en',
  htmlLang: 'en',
  label: 'English',
  short: 'EN',
  numberLocale: 'en-US',

  a11y: {
    skip: 'Skip to main content',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    langLabel: 'Site language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    scrollRegion: 'Depth walkthrough',
  },

  nav: {
    links: [
      { id: 'muammo', label: 'Problem' },
      { id: 'yol', label: 'The path' },
      { id: 'platforma', label: 'Platform' },
      { id: 'natijalar', label: 'Results' },
      { id: 'narxlar', label: 'Pricing' },
    ],
    cta: 'Run the numbers',
  },

  hero: {
    eyebrow: 'Built for Uzbek farmland',
    // Kept short on purpose: this is the longest display line of the three
    // locales, so it sets the hero type scale for the whole site. It is also
    // the closer translation, since "ildizgacha" is literally "to the root".
    line1: 'Every drop',
    line2: 'to the root',
    sub: 'ARIQ installs sensor-controlled subsurface drip networks on cotton and orchard farms. Water use drops by 41%.',
    ctaSecondary: 'Follow the drop',
    imageAlt: 'An irrigation canal running to the horizon between fields at sunset',
  },

  stats: {
    items: [
      { value: 12400, suffix: '', unit: 'hectares', label: 'connected to the network' },
      { value: 41, suffix: '%', unit: '', label: 'less water used' },
      { value: 18, suffix: '%', unit: '', label: 'higher yield' },
      { value: 36, suffix: '', unit: 'M m³', label: 'water saved per season' },
    ],
    note: 'Averages across the 2024 and 2025 growing seasons.',
  },

  partners: {
    caption: 'Clusters and farms',
    names: [
      'Zarafshon Agro',
      'Qashqa Tola',
      'Xorazm Bogʻ',
      'Sirdaryo Klaster',
      'Buxoro Paxta',
      'Fargʻona Meva',
      'Jizzax Don',
    ],
  },

  problem: {
    h2Line1: 'Water is running short.',
    h2Line2: 'The losses stay in the field.',
    body: 'Roughly 90% of all water withdrawn in Uzbekistan goes to agriculture. Under furrow irrigation much of it never reaches a root at all: some evaporates off the surface, some drains below the root zone, some is lost in the canal before it arrives.',
    body2: 'The shrinking Aral Sea is the visible part of that ledger. The invisible part repeats every year, on every field.',
    stats: [
      { value: '90%', label: 'of water withdrawal goes to farming' },
      { value: '~35%', label: 'of irrigation water is lost in transit' },
      { value: '2M ha', label: 'of irrigated land affected by salinity' },
    ],
    note: 'Sector figures drawn from published FAO and World Bank reporting.',
    imageAlt: 'Rusting fishing vessels stranded on the dry former seabed of the Aral Sea at Moʻynoq',
    imageCaption: 'Moʻynoq. This was a port.',
  },

  journey: {
    eyebrow: 'From the main line to the root',
    h2: 'The path of one drop',
    intro: 'Ninety centimetres separate the pump from a cotton root. That distance is the whole product.',
    readouts: {
      depth: 'Depth',
      moisture: 'Moisture',
      salinity: 'Salinity',
      temp: 'Temperature',
    },
    stages: [
      {
        depth: 0,
        title: 'Main line',
        body: 'Water is filtered, dropped to 1.2 bar and split across the blocks.',
      },
      {
        depth: 18,
        title: 'Dry surface',
        body: 'The pipe sits below ground. The surface stays dry, so evaporation is close to nothing.',
      },
      {
        depth: 35,
        title: 'Emitter',
        body: '1.6 litres per hour. The valve opens on a sensor reading, not on a schedule.',
      },
      {
        depth: 52,
        title: 'Moisture sensor',
        body: 'Deliberately below the emitter: moisture, salinity and temperature, every fifteen minutes.',
      },
      {
        depth: 70,
        title: 'Root zone',
        body: 'Most of the cotton root mass sits in this layer. This is where the water is needed.',
      },
      {
        depth: 90,
        title: 'Loss threshold',
        body: 'Water that passes below this line does not come back. ARIQ holds the line.',
      },
    ],
  },

  method: {
    h2: 'Live within a single season',
    lead: 'Four stages from survey to automatic control.',
    steps: [
      {
        title: 'Survey',
        body: 'Field topography is flown by drone and soil is sampled at three depths.',
        meta: '3-5 days',
        alt: 'Uzbek farmers carrying out a field survey in Namangan province',
      },
      {
        title: 'Design',
        body: 'Pressure, pipe spacing and emitter type are calculated block by block.',
        meta: '1 week',
        alt: 'Aerial view of an irrigated block surrounded by dry farmland',
      },
      {
        title: 'Install',
        body: 'The subsurface network and valve nodes go in before sowing starts.',
        meta: '9-14 days',
        alt: 'Drip irrigation pipe laid into the soil beside a young seedling',
      },
      {
        title: 'Operate',
        body: 'Valves open on sensor data. The agronomist confirms it in Telegram.',
        meta: 'full season',
        alt: 'Rows of plants in a modern automated greenhouse',
      },
    ],
  },

  platform: {
    h2: 'Everything the agronomist sees fits in a phone',
    body: 'ARIQ Aqli keeps the moisture history, water balance and valve log for every block. Alerts arrive over Telegram in Uzbek and Russian.',
    chart: {
      title: 'Water applied per hectare',
      unit: 'm³',
      legendA: 'Furrow irrigation',
      legendB: 'ARIQ network',
      axisX: 'Weeks of the season',
      totalLabel: 'Season total',
      deltaLabel: 'less',
      week: 'week',
    },
    features: [
      { title: 'Block map', body: 'Every valve and sensor, live.' },
      { title: 'Water balance', body: 'Applied against required, compared daily.' },
      { title: 'Salinity control', body: 'When EC crosses the limit, a leaching plan is issued.' },
      { title: 'Telegram alerts', body: 'Pressure drops and pipe breaks are reported instantly.' },
    ],
  },

  compare: {
    h2: 'One hectare of cotton, one season',
    hint: 'Drag the handle',
    aLabel: 'Furrow irrigation',
    bLabel: 'ARIQ network',
    aAlt: 'A parched, cracked and salt-crusted soil surface',
    bAlt: 'Plant roots spreading through moist dark earth',
    rows: [
      { key: 'Water used', a: '7,200 m³', b: '4,250 m³' },
      { key: 'Irrigations', a: '11, by hand', b: 'sensor driven' },
      { key: 'Yield', a: '3.1 t/ha', b: '3.7 t/ha' },
      { key: 'Labour', a: '2 people daily', b: 'once a week' },
    ],
  },

  results: {
    h2: 'Seven regions, 12,400 hectares',
    lead: 'The network started where water is scarcest.',
    colHa: 'hectares',
    colSave: 'saved per season',
    regions: [
      { name: 'Qashqadaryo', ha: '3,180', save: '9.4M m³' },
      { name: 'Buxoro', ha: '2,240', save: '6.8M m³' },
      { name: 'Xorazm', ha: '1,760', save: '5.1M m³' },
      { name: 'Sirdaryo', ha: '1,590', save: '4.6M m³' },
      { name: 'Jizzax', ha: '1,420', save: '4.1M m³' },
      { name: 'Samarqand', ha: '1,210', save: '3.3M m³' },
      { name: 'Fargʻona', ha: '1,000', save: '2.7M m³' },
    ],
    quote:
      'In the first season the water bill fell to a third. In the second the yield went up.',
    author: 'Rustam Xoʻjayev',
    role: 'head agronomist, Zarafshon Agro cluster',
    imageAlt:
      'Blue and turquoise tile mosaic on the portal of the Sher-Dor madrasah, Samarqand',
  },

  pricing: {
    eyebrow: 'Pricing',
    h2: 'Per hectare, per season',
    note: 'State subsidy can cover up to 50% of the capital cost. Prices include VAT.',
    perUnit: 'UZS / hectare / season',
    negotiated: 'On request',
    negotiatedUnit: '',
    popular: 'Most chosen',
    plans: [
      {
        id: 'dala',
        name: 'Field',
        range: '5-50 hectares',
        price: 1850000,
        featured: false,
        features: [
          'Subsurface drip network',
          'One sensor node per 5 hectares',
          'Telegram alerts',
          'Seasonal servicing',
        ],
      },
      {
        id: 'klaster',
        name: 'Cluster',
        range: '50-1,000 hectares',
        price: 1450000,
        featured: true,
        features: [
          'Everything in Field',
          'One sensor node per 2 hectares',
          'Automatic valve control',
          'Salinity and leaching plan',
          'Dedicated agronomist',
          'Water saving guarantee',
        ],
      },
      {
        id: 'yirik',
        name: 'Large projects',
        range: 'above 1,000 hectares',
        price: null,
        featured: false,
        features: [
          'Full engineering documentation',
          'Water consumption audit',
          'API and data export',
        ],
      },
    ],
  },

  faq: {
    h2: 'Common questions',
    items: [
      {
        q: 'How is the state subsidy arranged?',
        a: 'We prepare the paperwork. The farm only supplies land documents and bank details. Once approved, the amount is reimbursed directly.',
      },
      {
        q: 'Does drip irrigation work on saline soil?',
        a: 'Yes. Drip pushes salt away from the root zone, though at least one leaching irrigation per season is still needed. The sensors track EC and set the timing themselves.',
      },
      {
        q: 'How long does the network last?',
        a: 'Subsurface pipe runs 8-12 years. Filters and valve nodes are replaced every 3-4 years, which is already covered by the subscription.',
      },
      {
        q: 'Who owns the field data?',
        a: 'The farm does. It can be exported in full at any time as CSV or over the API. We do not sell it to third parties.',
      },
      {
        q: 'Does it work where there is no internet?',
        a: 'Sensor nodes talk to each other over LoRa and a single gateway reaches the cellular network. If the link drops, valves keep running the last approved plan.',
      },
    ],
  },

  calc: {
    h2: 'Size your field',
    body: 'Pick area, crop and region. Water saving and the seasonal fee are calculated as you type.',
    area: { label: 'Area', unit: 'hectares', help: 'between 5 and 2,000 hectares' },
    crop: { label: 'Crop' },
    region: { label: 'Region' },
    name: { label: 'Full name', placeholder: 'Nodira Ergasheva' },
    phone: { label: 'Phone', placeholder: '+998 90 123 45 67', help: 'Our agronomist will call this number' },
    email: { label: 'Email', placeholder: 'nodira@klaster.uz' },
    crops: [
      { id: 'paxta', name: 'Cotton' },
      { id: 'bugdoy', name: 'Wheat' },
      { id: 'bog', name: 'Orchard (apple, apricot)' },
      { id: 'uzum', name: 'Grapes' },
      { id: 'sabzavot', name: 'Vegetables' },
    ],
    regions: [
      { id: 'qashqadaryo', name: 'Qashqadaryo' },
      { id: 'buxoro', name: 'Buxoro' },
      { id: 'xorazm', name: 'Xorazm' },
      { id: 'sirdaryo', name: 'Sirdaryo' },
      { id: 'jizzax', name: 'Jizzax' },
      { id: 'samarqand', name: 'Samarqand' },
      { id: 'fargona', name: 'Fargʻona' },
      { id: 'navoiy', name: 'Navoiy' },
      { id: 'surxondaryo', name: 'Surxondaryo' },
      { id: 'andijon', name: 'Andijon' },
      { id: 'namangan', name: 'Namangan' },
      { id: 'toshkent', name: 'Toshkent region' },
      { id: 'qoraqalpogiston', name: 'Karakalpakstan' },
    ],
    out: {
      water: 'Water saved per season',
      waterUnit: 'm³',
      cost: 'Seasonal fee',
      costUnit: 'UZS',
      yieldUp: 'Yield increase',
      payback: 'Payback period',
      seasons: 'seasons',
    },
    submit: 'Request a quote',
    submitting: 'Sending',
    doneTitle: 'Request received',
    doneBody: 'An agronomist will be in touch within one working day with an exact figure for your field.',
    again: 'Calculate again',
    errors: {
      name: 'Enter your full name',
      phone: 'Enter the full number in +998 format',
      email: 'That email address is not valid',
      network: 'Could not send. Wait a moment and try again.',
    },
    disclaimer: 'This estimate is indicative. The exact figure follows the field survey.',
  },

  footer: {
    tagline: 'Every drop accounted for.',
    columns: [
      {
        title: 'Company',
        links: ['About', 'Team', 'Careers', 'Press'],
      },
      {
        title: 'Services',
        links: ['Field survey', 'Network install', 'ARIQ Aqli', 'Servicing'],
      },
      {
        title: 'Documents',
        links: ['Subsidy guide', 'Technical specification', 'Privacy policy'],
      },
    ],
    contactTitle: 'Contact',
    phone: '+998 (71) 207 64 18',
    email: 'salom@ariq.uz',
    address: 'Tashkent, Buyuk Ipak Yoli 12',
    legal:
      'ARIQ is a concept project. The brand, copy and figures were created for demonstration, and do not describe an existing company.',
    rights: 'All rights reserved',
  },
}
