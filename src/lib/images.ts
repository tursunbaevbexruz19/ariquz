/**
 * Every photograph on the page, in one place.
 *
 * All URLs are real, hotlinkable and verified by download. Sources are the
 * Unsplash CDN and Wikimedia Commons.
 *
 * Note on Wikimedia: upload.wikimedia.org rejects arbitrary thumbnail
 * widths with a 400. Only the published sizes work (20, 40, 60, 120, 250,
 * 330, 500, 960, 1280, 1920, 3840), which is why those entries are pinned
 * at 1280px. Do not hand-edit them to another width.
 */
export type Img = { src: string; w: number; h: number }

const U = (id: string, w = 1600, q = 78) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const IMAGES = {
  /** An ariq running to the horizon at sunset. The brand is named for it. */
  hero: { src: U('photo-1777063012124-70f45044aacd', 1800), w: 1800, h: 1049 },

  /** Fishing vessels stranded on the dry seabed at Moʻynoq. */
  aral: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Moynaq%2C_Aral_Sea_%286226807306%29.jpg/1280px-Moynaq%2C_Aral_Sea_%286226807306%29.jpg',
    w: 1280,
    h: 853,
  },

  /** Compare slider: a parched, cracked surface against moist root-filled earth. */
  compareA: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Dry_Cracked_Mud_%284957b8b2-f52c-43b0-acc2-ead42cf6f03b%29.jpg/1280px-Dry_Cracked_Mud_%284957b8b2-f52c-43b0-acc2-ead42cf6f03b%29.jpg', w: 1280, h: 853 },
  compareB: { src: U('photo-1692148292961-210789f8d8c0', 1400), w: 1400, h: 933 },

  /** Method, in order: survey, design, install, operate. */
  methodSurvey: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Scientific_survey_in_carrot_fields_with_uzbek_farmers_%28Namangan_province%29.JPG/1280px-Scientific_survey_in_carrot_fields_with_uzbek_farmers_%28Namangan_province%29.JPG',
    w: 1280,
    h: 960,
  },
  methodDesign: { src: U('photo-1629301251438-573a715715bb', 1200), w: 1200, h: 674 },
  methodInstall: { src: U('photo-1662392559315-fb7035900d1f', 1200), w: 1200, h: 800 },
  methodOperate: { src: U('photo-1591754060004-f91c95f5cf05', 1200), w: 1200, h: 800 },

  /** Sher-Dor madrasah tilework, Samarqand. Sits beside the Samarqand quote. */
  tilework: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Detailed_view_of_the_mosaic_on_a_portal_inside_the_Sher-Dor_Madrasah_-_panoramio.jpg/1280px-Detailed_view_of_the_mosaic_on_a_portal_inside_the_Sher-Dor_Madrasah_-_panoramio.jpg',
    w: 1280,
    h: 960,
  },
} satisfies Record<string, Img>
