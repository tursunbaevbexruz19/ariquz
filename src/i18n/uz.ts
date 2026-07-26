/**
 * Uzbek (Latin) — source of truth for the whole site.
 *
 * Orthography notes for anyone editing this file:
 *   oʻ / gʻ  use U+02BB MODIFIER LETTER TURNED COMMA (ʻ), not a straight quote
 *   anʼana   uses U+02BC MODIFIER LETTER APOSTROPHE (ʼ) for the tutuq belgisi
 * Both render correctly in Onest and Unbounded.
 */
export const uz = {
  code: 'uz',
  htmlLang: 'uz',
  label: 'Oʻzbekcha',
  short: 'UZ',
  numberLocale: 'uz-UZ',

  a11y: {
    skip: 'Asosiy qismga oʻtish',
    themeToLight: 'Kunduzgi rejimga oʻtish',
    themeToDark: 'Tungi rejimga oʻtish',
    langLabel: 'Sayt tili',
    openMenu: 'Menyuni ochish',
    closeMenu: 'Menyuni yopish',
    scrollRegion: 'Chuqurlik boʻyicha harakat',
  },

  nav: {
    links: [
      { id: 'muammo', label: 'Muammo' },
      { id: 'yol', label: 'Yoʻl' },
      { id: 'platforma', label: 'Platforma' },
      { id: 'natijalar', label: 'Natijalar' },
      { id: 'narxlar', label: 'Narxlar' },
    ],
    cta: 'Hisob-kitob qilish',
  },

  hero: {
    eyebrow: 'Oʻzbekiston dalalari uchun',
    line1: 'Har bir tomchi',
    line2: 'ildizgacha',
    sub: 'ARIQ paxta va bogʻ xoʻjaliklariga tuproq sensorlari boshqaradigan yer osti tomchilatish tarmogʻini oʻrnatadi. Suv sarfi 41% ga kamayadi.',
    ctaSecondary: 'Yoʻlni koʻrish',
    imageAlt: 'Dalalar orasidan ufqqa qarab choʻzilgan sugʻorish arigʻi, kun botishida',
  },

  stats: {
    items: [
      { value: 12400, suffix: '', unit: 'gektar', label: 'tarmoqqa ulangan yer' },
      { value: 41, suffix: '%', unit: '', label: 'kamroq suv sarfi' },
      { value: 18, suffix: '%', unit: '', label: 'koʻproq hosil' },
      { value: 36, suffix: '', unit: 'mln m³', label: 'mavsumda tejalgan suv' },
    ],
    note: 'Koʻrsatkichlar 2024 va 2025 mavsumlari boʻyicha oʻrtacha qiymatlar.',
  },

  partners: {
    caption: 'Klaster va xoʻjaliklar',
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
    h2Line1: 'Suv kamaymoqda.',
    h2Line2: 'Yoʻqotish dalada qolmoqda.',
    body: 'Oʻzbekistonda olinadigan suvning qariyb 90% i qishloq xoʻjaligiga ketadi. Egat usulida sugʻorilganda uning katta qismi ildizga umuman yetib bormaydi: bir qismi yuzadan bugʻlanadi, bir qismi ildiz zonasidan pastga oʻtib ketadi, yana bir qismi kanalda yoʻqoladi.',
    body2: 'Orol dengizining qurishi shu hisobning eng koʻrinadigan qismi. Koʻrinmagan qismi esa har yili har bir dalada takrorlanadi.',
    stats: [
      { value: '90%', label: 'suv olishning qishloq xoʻjaligiga ulushi' },
      { value: '~35%', label: 'sugʻorish jarayonida yoʻqoladigan suv' },
      { value: '2 mln ga', label: 'shoʻrlanish taʼsiridagi sugʻoriladigan yer' },
    ],
    note: 'FAO va Jahon banki ochiq hisobotlaridagi sektor koʻrsatkichlari.',
    imageAlt: 'Moʻynoqda, qurib qolgan Orol tubida qolib ketgan zanglagan baliqchi kemalari',
    imageCaption: 'Moʻynoq. Bir vaqtlar bu yerda port boʻlgan.',
  },

  journey: {
    eyebrow: 'Bosh tarmoqdan ildizgacha',
    h2: 'Bir tomchining yoʻli',
    intro: 'Nasos bilan paxta ildizi orasida toʻqson santimetr bor. ARIQ boshqaradigan masofa aynan shu.',
    readouts: {
      depth: 'Chuqurlik',
      moisture: 'Namlik',
      salinity: 'Shoʻrlanish',
      temp: 'Harorat',
    },
    stages: [
      {
        depth: 0,
        title: 'Bosh tarmoq',
        body: 'Suv filtrlanadi, bosim 1.2 bargacha tushiriladi va uchastkalarga boʻlinadi.',
      },
      {
        depth: 18,
        title: 'Quruq yuza',
        body: 'Quvur yer ostida yotadi. Yuza quruq qoladi, shuning uchun bugʻlanish deyarli nolga teng.',
      },
      {
        depth: 35,
        title: 'Tomchilatgich',
        body: 'Soatiga 1.6 litr. Klapan jadval boʻyicha emas, sensor buyrugʻi bilan ochiladi.',
      },
      {
        depth: 52,
        title: 'Namlik sensori',
        body: 'Ataylab tomchilatgichdan pastda turadi: har oʻn besh daqiqada namlik, shoʻrlanish va harorat oʻlchanadi.',
      },
      {
        depth: 70,
        title: 'Ildiz zonasi',
        body: 'Paxta ildizining asosiy qismi shu qatlamda. Suv aynan shu yerda kerak.',
      },
      {
        depth: 90,
        title: 'Yoʻqotish chegarasi',
        body: 'Bu chuqurlikdan pastga oʻtgan suv qaytmaydi. ARIQ shu chegarani nazorat qiladi.',
      },
    ],
  },

  method: {
    h2: 'Bir mavsum ichida ishga tushadi',
    lead: 'Oʻlchovdan avtomatik boshqaruvgacha toʻrt bosqich.',
    steps: [
      {
        title: 'Oʻlchov',
        body: 'Dala relyefi dron bilan skanerlanadi, tuproq namunalari uchta chuqurlikdan olinadi.',
        meta: '3-5 kun',
        alt: 'Namangan viloyatida dala tadqiqoti olib borayotgan oʻzbek fermerlari',
      },
      {
        title: 'Loyiha',
        body: 'Har bir uchastka uchun bosim, quvur oraligʻi va tomchilatgich turi alohida hisoblanadi.',
        meta: '1 hafta',
        alt: 'Quruq yerlar orasidagi sugʻoriladigan maydonning havodan koʻrinishi',
      },
      {
        title: 'Oʻrnatish',
        body: 'Yer osti tarmogʻi va klapan tugunlari yotqiziladi. Ish ekish oldidan tugaydi.',
        meta: '9-14 kun',
        alt: 'Tuproqqa yotqizilgan tomchilatib sugʻorish quvuri va yosh nihol',
      },
      {
        title: 'Boshqaruv',
        body: 'Klapanlar sensor maʼlumotiga qarab ochiladi. Agronom uni Telegramda tasdiqlaydi.',
        meta: 'butun mavsum',
        alt: 'Zamonaviy issiqxonada avtomatlashtirilgan yetishtirish qatorlari',
      },
    ],
  },

  platform: {
    h2: 'Agronom koʻradigan hamma narsa telefonda',
    body: 'ARIQ Aqli har bir uchastkaning namlik tarixini, suv balansini va klapan jurnalini yuritadi. Ogohlantirishlar Telegram orqali oʻzbek tilida keladi.',
    chart: {
      title: 'Bir gektarga suv sarfi',
      unit: 'm³',
      legendA: 'Anʼanaviy egat',
      legendB: 'ARIQ tarmogʻi',
      axisX: 'Mavsum haftalari',
      totalLabel: 'Mavsum boʻyicha jami',
      deltaLabel: 'kamroq',
      week: 'hafta',
    },
    features: [
      { title: 'Uchastka xaritasi', body: 'Har bir klapan va sensor real vaqtda koʻrinadi.' },
      { title: 'Suv balansi', body: 'Berilgan va talab qilingan suv kunlik solishtiriladi.' },
      { title: 'Shoʻrlanish nazorati', body: 'EC chegaradan oshsa, yuvish rejasi tuziladi.' },
      { title: 'Telegram ogohlantirish', body: 'Bosim tushsa yoki quvur yorilsa, xabar darhol keladi.' },
    ],
  },

  compare: {
    h2: 'Bir gektar paxta, bir mavsum',
    hint: 'Tutqichni suring',
    aLabel: 'Anʼanaviy egat',
    bLabel: 'ARIQ tarmogʻi',
    aAlt: 'Qurib, yorilib ketgan va shoʻrlangan tuproq yuzasi',
    bAlt: 'Nam tuproq ichida keng tarqalgan oʻsimlik ildizlari',
    rows: [
      { key: 'Suv sarfi', a: '7 200 m³', b: '4 250 m³' },
      { key: 'Sugʻorish', a: '11 marta qoʻlda', b: 'sensor boʻyicha' },
      { key: 'Hosil', a: '3.1 t/ga', b: '3.7 t/ga' },
      { key: 'Mehnat', a: 'kuniga 2 kishi', b: 'haftada 1 marta' },
    ],
  },

  results: {
    h2: 'Yetti viloyat, 12 400 gektar',
    lead: 'Tarmoq eng koʻp suv talab qiladigan hududlardan boshlandi.',
    colHa: 'gektar',
    colSave: 'mavsumda tejaldi',
    regions: [
      { name: 'Qashqadaryo', ha: '3 180', save: '9.4 mln m³' },
      { name: 'Buxoro', ha: '2 240', save: '6.8 mln m³' },
      { name: 'Xorazm', ha: '1 760', save: '5.1 mln m³' },
      { name: 'Sirdaryo', ha: '1 590', save: '4.6 mln m³' },
      { name: 'Jizzax', ha: '1 420', save: '4.1 mln m³' },
      { name: 'Samarqand', ha: '1 210', save: '3.3 mln m³' },
      { name: 'Fargʻona', ha: '1 000', save: '2.7 mln m³' },
    ],
    quote:
      'Birinchi mavsumda suv uchun toʻlov uchdan biriga tushdi. Ikkinchisida hosil koʻtarildi.',
    author: 'Rustam Xoʻjayev',
    role: '“Zarafshon Agro” klasteri, bosh agronom',
    imageAlt:
      'Samarqanddagi Sher-Dor madrasasi peshtoqidagi koʻk va feruza rangli koshin naqshi',
  },

  pricing: {
    eyebrow: 'Narxlar',
    h2: 'Gektar va mavsum boʻyicha',
    note: 'Davlat subsidiyasi kapital xarajatning 50% igacha qoplanishi mumkin. Narxlar QQS bilan koʻrsatilgan.',
    perUnit: 'soʻm / gektar / mavsum',
    negotiated: 'Kelishuv',
    negotiatedUnit: 'asosida',
    popular: 'Koʻp tanlanadi',
    plans: [
      {
        id: 'dala',
        name: 'Dala',
        range: '5-50 gektar',
        price: 1850000,
        featured: false,
        features: [
          'Yer osti tomchilatish tarmogʻi',
          'Har 5 gektarga bitta sensor tugun',
          'Telegram ogohlantirish',
          'Mavsumiy texnik xizmat',
        ],
      },
      {
        id: 'klaster',
        name: 'Klaster',
        range: '50-1000 gektar',
        price: 1450000,
        featured: true,
        features: [
          'Dala tarifidagi hamma narsa',
          'Har 2 gektarga bitta sensor tugun',
          'Avtomatik klapan boshqaruvi',
          'Shoʻrlanish va yuvish rejasi',
          'Biriktirilgan agronom',
          'Suv tejash kafolati',
        ],
      },
      {
        id: 'yirik',
        name: 'Yirik loyihalar',
        range: '1000 gektardan yuqori',
        price: null,
        featured: false,
        features: [
          'Loyiha-smeta hujjatlari',
          'Suv isteʼmoli auditi',
          'API va maʼlumot eksporti',
        ],
      },
    ],
  },

  faq: {
    h2: 'Koʻp beriladigan savollar',
    items: [
      {
        q: 'Davlat subsidiyasi qanday rasmiylashtiriladi?',
        a: 'Hujjatlarni biz tayyorlaymiz. Xoʻjalikdan faqat yer hujjatlari va bank rekvizitlari talab qilinadi. Subsidiya tasdiqlangach, summa toʻgʻridan-toʻgʻri qoplanadi.',
      },
      {
        q: 'Tuproq shoʻrlangan boʻlsa, tomchilatish ish beradimi?',
        a: 'Ha. Tomchilatish tuzni ildiz zonasidan chetga suradi, lekin mavsumda kamida bir marta yuvish kerak boʻladi. Sensorlar EC koʻrsatkichini kuzatib, yuvish vaqtini oʻzi aniqlaydi.',
      },
      {
        q: 'Tarmoq necha yil xizmat qiladi?',
        a: 'Yer osti quvurlari 8-12 yil ishlaydi. Filtr va klapan tugunlari har 3-4 yilda almashtiriladi, bu obuna narxiga kiritilgan.',
      },
      {
        q: 'Dala maʼlumoti kimga tegishli?',
        a: 'Maʼlumot xoʻjalikka tegishli. Uni istalgan vaqtda CSV yoki API orqali toʻliq olib chiqish mumkin. Biz uni uchinchi tomonga sotmaymiz.',
      },
      {
        q: 'Internet yoʻq dalada ishlaydimi?',
        a: 'Sensor tugunlari oʻzaro LoRa orqali bogʻlanadi, bitta shlyuz uyali tarmoqqa chiqadi. Aloqa uzilsa, klapanlar oxirgi tasdiqlangan reja boʻyicha ishlashda davom etadi.',
      },
    ],
  },

  calc: {
    h2: 'Dalangizni hisoblang',
    body: 'Maydon, ekin va viloyatni tanlang. Taxminiy suv tejash va mavsumiy toʻlov darhol koʻrinadi.',
    area: { label: 'Maydon', unit: 'gektar', help: '5 dan 2000 gektargacha' },
    crop: { label: 'Ekin turi' },
    region: { label: 'Viloyat' },
    name: { label: 'Ism va familiya', placeholder: 'Nodira Ergasheva' },
    phone: { label: 'Telefon', placeholder: '+998 90 123 45 67', help: 'Agronomimiz shu raqamga qoʻngʻiroq qiladi' },
    email: { label: 'Elektron pochta', placeholder: 'nodira@klaster.uz' },
    crops: [
      { id: 'paxta', name: 'Paxta' },
      { id: 'bugdoy', name: 'Bugʻdoy' },
      { id: 'bog', name: 'Bogʻ (olma, oʻrik)' },
      { id: 'uzum', name: 'Uzum' },
      { id: 'sabzavot', name: 'Sabzavot' },
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
      { id: 'toshkent', name: 'Toshkent viloyati' },
      { id: 'qoraqalpogiston', name: 'Qoraqalpogʻiston' },
    ],
    out: {
      water: 'Mavsumda tejaladigan suv',
      waterUnit: 'm³',
      cost: 'Mavsumiy toʻlov',
      costUnit: 'soʻm',
      yieldUp: 'Hosil oʻsishi',
      payback: 'Qoplanish muddati',
      seasons: 'mavsum',
    },
    submit: 'Taklif olish',
    submitting: 'Yuborilmoqda',
    doneTitle: 'Soʻrov qabul qilindi',
    doneBody: 'Bir ish kuni ichida agronomimiz bogʻlanadi va dala uchun aniq hisob tayyorlaydi.',
    again: 'Yana hisoblash',
    errors: {
      name: 'Ism va familiyangizni kiriting',
      phone: 'Raqamni +998 formatida toʻliq kiriting',
      email: 'Elektron pochta manzili notoʻgʻri',
      network: 'Yuborib boʻlmadi. Biroz kutib, qaytadan urinib koʻring.',
    },
    disclaimer: 'Hisob taxminiy. Aniq raqam dala oʻlchovidan keyin beriladi.',
  },

  footer: {
    tagline: 'Har bir tomchi hisobda.',
    columns: [
      {
        title: 'Kompaniya',
        links: ['Biz haqimizda', 'Jamoa', 'Vakansiyalar', 'Matbuot uchun'],
      },
      {
        title: 'Xizmatlar',
        links: ['Dala oʻlchovi', 'Tarmoq oʻrnatish', 'ARIQ Aqli', 'Texnik xizmat'],
      },
      {
        title: 'Hujjatlar',
        links: ['Subsidiya boʻyicha qoʻllanma', 'Texnik shartlar', 'Maxfiylik siyosati'],
      },
    ],
    contactTitle: 'Bogʻlanish',
    phone: '+998 (71) 207 64 18',
    email: 'salom@ariq.uz',
    address: 'Toshkent, Buyuk Ipak Yoʻli 12',
    legal:
      'ARIQ konsept loyihasi. Brend, matnlar va koʻrsatkichlar namoyish maqsadida yaratilgan va mavjud kompaniyaga tegishli emas.',
    rights: 'Barcha huquqlar himoyalangan',
  },
}

export type Dict = typeof uz
