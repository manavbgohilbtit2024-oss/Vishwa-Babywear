// Vishwa Babywear - Store Configuration & Contact Information

export const STORE_NAME = 'Vishwa Babywear'
export const STORE_NAME_GU = 'વિશ્વા બેબીવેર'
export const OWNER = 'Sachin Gohil'

export const ADDRESS_EN = 'Shop No. 10, Kashiba Complex, Citylight Road, Palanpur, Gujarat'
export const ADDRESS_GU = 'દુ.નં.૧૦, કાશીબા કોમ્પ્લેક્ષ, સીટીલાઈટ રોડ, પાલનપુર'

export const PHONE_DISPLAY = '+91 97141 02151'
export const PHONE_TEL = '+919714102151'
export const WHATSAPP_NUMBER = '919714102151'

export const HOURS_EN = 'Mon – Sun: 10:30 am – 8:30 pm'
export const HOURS_GU = 'સોમ – રવિ: સવારે ૧૦:૩૦ થી રાત્રે ૮:૩૦'
export const HOURS_CONFIRMED = false
export const HOURS_UNCONFIRMED_NOTE_EN = 'Hours to be confirmed'
export const HOURS_UNCONFIRMED_NOTE_GU = 'સમયની પુષ્ટિ બાકી છે'

// The store owner should replace MAP_QUERY with their exact Google Maps place pin or CID when available
export const MAP_QUERY = 'Vishwa Babywear, Kashiba Complex, Citylight Road, Palanpur, Gujarat'

export function whatsappLink(text?: string): string {
  if (!text) {
    return `https://wa.me/${WHATSAPP_NUMBER}`
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function directionsLink(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`
}

export function mapsLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`
}

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`

// Legacy SHOP_CONFIG compatibility object
export const SHOP_CONFIG = {
  name: STORE_NAME,
  gujaratiName: STORE_NAME_GU,
  owner: OWNER,
  tagline: 'Babywear for every little beginning',
  address: ADDRESS_EN,
  addressGu: ADDRESS_GU,
  city: 'Palanpur',
  state: 'Gujarat',
  phone: PHONE_DISPLAY,
  phoneRaw: PHONE_TEL,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: whatsappLink(),
  hours: HOURS_EN,
  hoursGu: HOURS_GU,
  hoursConfirmed: HOURS_CONFIRMED,
  gstin: '',
  freeDeliveryThreshold: 999,
  deliveryFee: 60,
  estimatedDelivery: '2–4 days',
  cardPaymentsLive: false,
}
