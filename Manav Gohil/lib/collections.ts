// Collections metadata and shopkeeper warm introductions

export interface Collection {
  slug: string
  label: string
  gujarati: string
  bg: string
  icon: string
  description: string
  gujaratiDescription: string
  subcategories: string[]
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'newborn',
    label: 'Newborn',
    gujarati: 'નવજાત',
    bg: 'bg-[#f7dcd4]',
    icon: '✦',
    description: 'Softest pure-cotton layers, cosy swaddles and gentle mittens picked with all the care a newborn deserves.',
    gujaratiDescription: 'નવજાત શિશુ માટે સૌથી નરમ સુતરાઉ કપડાં, સ્વેડલ અને કેપ - પ્રેમથી પસંદ કરેલ.',
    subcategories: ['Bodysuits', 'Swaddles', 'Caps', 'Mittens', 'Booties'],
  },
  {
    slug: 'boys',
    label: 'Boys',
    gujarati: 'બોયઝ',
    bg: 'bg-[#f8e5d0]',
    icon: '◒',
    description: 'Playful rompers, crisp little shirts and comfy everyday sets made for rolling around and exploring.',
    gujaratiDescription: 'રમતીયા રોમ્પર્સ, નાનકડાં શર્ટ અને કમ્ફર્ટેબલ સેટ્સ - રોજિંદા પહેરવેશ માટે.',
    subcategories: ['Rompers', 'Shirts & Shorts', 'Sets', 'Ethnic wear'],
  },
  {
    slug: 'girls',
    label: 'Girls',
    gujarati: 'ગર્લ્સ',
    bg: 'bg-[#e7e1ee]',
    icon: '✿',
    description: 'Twirl-ready frocks, soft coord sets and cheerful festive wear crafted to stay gentle on sensitive baby skin.',
    gujaratiDescription: 'સુંદર ફ્રોક, સોફ્ટ સેટ અને તહેવારના કપડાં - બાળકના કોમળ ત્વચા માટે ઉત્તમ.',
    subcategories: ['Frocks', 'Rompers', 'Sets', 'Ethnic wear'],
  },
  {
    slug: 'winterwear',
    label: 'Winterwear',
    gujarati: 'વિન્ટરવેર',
    bg: 'bg-[#dce7da]',
    icon: '❋',
    description: 'Snug knitted sweaters, feather-light jackets and warm woolen caps to keep little fingers warm in chilly weather.',
    gujaratiDescription: 'હૂંફાળા સ્વેટર, સોફ્ટ જેકેટ અને ગરમ વૂલન કેપ - ઠંડીની ઋતુમાં રક્ષણ માટે.',
    subcategories: ['Sweaters', 'Jackets', 'Woolen Caps', 'Socks'],
  },
  {
    slug: 'sleepwear',
    label: 'Sleepwear',
    gujarati: 'સ્લીપવેર',
    bg: 'bg-[#f5eac4]',
    icon: '☾',
    description: 'Breathable pure-cotton night suits and easy-zip sleepsuits for sweet dreams and restful sleep all night.',
    gujaratiDescription: 'આરામદાયક નાઈટ સૂટ અને સ્લીપસૂટ - બાળકને મળે મીઠી અને શાંત ઊંઘ.',
    subcategories: ['Night Suits', 'Sleepsuits'],
  },
  {
    slug: 'gifting',
    label: 'Gifting & Accessories',
    gujarati: 'ગિફ્ટિંગ અને એક્સેસરીઝ',
    bg: 'bg-[#dcebf0]',
    icon: '♢',
    description: 'Thoughtful baby shower hampers, soft blankets, bib sets and lovely welcome gifts packed with warmth.',
    gujaratiDescription: 'બેબી શાવર માટે હેમ્પર્સ, સોફ્ટ બ્લેન્કેટ અને સુંદર ગિફ્ટ સેટ્સ.',
    subcategories: ['Bibs', 'Blankets', 'Hampers', 'Gift sets'],
  },
]

export const SPECIAL_COLLECTIONS: Collection[] = [
  {
    slug: 'new-arrivals',
    label: 'New Arrivals',
    gujarati: 'નવું આગમન',
    bg: 'bg-[#f7dcd4]',
    icon: '✦',
    description: 'Fresh styles and newly unpacked cartons straight from our Palanpur showroom floor this week.',
    gujaratiDescription: 'અમારા પાલનપુર શોરૂમમાં આ અઠવાડિયે આવેલી તદ્દન નવી વેરાયટી.',
    subcategories: ['All New'],
  },
  {
    slug: 'all',
    label: 'All Products',
    gujarati: 'બધા ઉત્પાદનો',
    bg: 'bg-[#eaded6]',
    icon: '❖',
    description: 'Everything we keep on our shelves in Palanpur, curated thoughtfully for babies from day one to age three.',
    gujaratiDescription: 'પાલનપુર શોરૂમનો સંપૂર્ણ સંગ્રહ - નવજાતથી ૩ વર્ષ સુધીના બાળકો માટે.',
    subcategories: ['All Items'],
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return (
    COLLECTIONS.find((c) => c.slug === slug) ||
    SPECIAL_COLLECTIONS.find((c) => c.slug === slug)
  )
}
