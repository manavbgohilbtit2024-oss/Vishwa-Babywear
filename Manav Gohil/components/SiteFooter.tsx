'use client'

import React from 'react'
import Link from 'next/link'
import { SHOP_CONFIG } from '@/lib/config'
import { COLLECTIONS } from '@/lib/collections'
import { useLanguage } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'

export function SiteFooter() {
  const { language } = useLanguage()
  const t = TRANSLATIONS[language]

  return (
    <footer id="contact" className="bg-[#382d2d] px-5 py-14 text-[#fffaf6] lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        {/* Brand and contact info */}
        <div>
          <p className="font-serif text-3xl font-semibold text-[#f7c3bd]">વિશ્વા</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-[#efaa9f]">
            BABYWEAR · PALANPUR
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#d8c5bd]">
            {t.aboutShop}
          </p>
          <div className="mt-6 flex flex-col gap-1.5">
            <a
              href={`tel:${SHOP_CONFIG.phoneRaw}`}
              className="inline-block text-sm font-bold text-[#f7c3bd] transition-colors hover:text-white"
            >
              {SHOP_CONFIG.phone}
            </a>
            <a
              href={SHOP_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-[#d8c5bd] underline-offset-4 hover:underline"
            >
              {language === 'ગુ' ? 'વોટ્સએપ પર સહાય મેળવો' : 'Chat with us on WhatsApp'}
            </a>
          </div>
        </div>

        {/* Explore all collections */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#efaa9f]">
            {t.explore}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm text-[#d8c5bd]">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className="transition-colors hover:text-[#f7c3bd]"
              >
                {c.label}
              </Link>
            ))}
            <Link
              href="/collections/new-arrivals"
              className="font-medium text-[#f7c3bd] transition-colors hover:text-white"
            >
              {t.newArrivals}
            </Link>
            <Link
              href="/collections"
              className="font-medium text-[#f7c3bd] transition-colors hover:text-white"
            >
              {t.allCollections}
            </Link>
          </div>
        </div>

        {/* Showroom visit hours */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#efaa9f]">
            {t.showroomTimings}
          </p>
          <p className="text-sm leading-6 text-[#d8c5bd]">
            Mon – Sun
            <br />
            10:30 am – 8:30 pm
            <br />
            <span className="text-[#f7c3bd]">
              {language === 'ગુ' ? 'કાશીબા કોમ્પ્લેક્સ, સિટીલાઇટ રોડ' : 'Kashiba Complex, Citylight Road'}
            </span>
          </p>
          <div className="mt-5 rounded-2xl bg-[#4a3b3b] p-3.5 text-xs text-[#d8c5bd]">
            <p className="font-semibold text-white">
              {language === 'ગુ' ? 'પાલનપુરમાં સીઓડી ઉપલબ્ધ' : 'Local Delivery in Palanpur'}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#bfa9a1]">
              {language === 'ગુ'
                ? 'ઘરે બેઠા ઓર્ડર કરો અથવા શોરૂમ પર આવીને મનપસંદ વસ્તુઓ ચકાસો.'
                : 'Order online with Cash on Delivery or drop by our showroom anytime.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between border-t border-white/10 pt-6 text-xs text-[#a9958e] sm:flex-row">
        <span>{t.allRightsReserved}</span>
        <span className="mt-2 text-[11px] sm:mt-0">
          {language === 'ગુ' ? 'બાળકો માટે નરમ અને વિશ્વસનીય કપડાં' : 'Soft clothes made for every sweet beginning'}
        </span>
      </div>
    </footer>
  )
}
