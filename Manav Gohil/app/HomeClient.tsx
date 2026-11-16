'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Truck,
  Star,
  MapPin,
} from 'lucide-react'
import { useLanguage } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'
import { ProductCard } from '@/components/ProductCard'
import type { Collection } from '@/lib/collections'
import type { Product } from '@/lib/products'

interface HomeClientProps {
  collections: Collection[]
  featuredProducts: Product[]
}

export function HomeClient({ collections, featuredProducts }: HomeClientProps) {
  const { language } = useLanguage()
  const t = TRANSLATIONS[language]

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 pt-3 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-20 lg:pt-7"
      >
        <div className="flex min-h-[500px] flex-col justify-between rounded-[28px] bg-[#f7dcd4] p-7 sm:p-12 lg:min-h-[570px] lg:p-14">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#c86870]">
            <Sparkles size={15} />
            <span>{t.heroEyebrow}</span>
          </div>

          <div className="max-w-xl">
            <p className="mb-4 font-serif text-lg text-[#9d625d]">વિશ્વા બેબીવેર</p>
            <h1 className="max-w-[560px] font-serif text-[clamp(3.5rem,6.8vw,6.5rem)] leading-[.88] tracking-[-0.07em] text-[#382d2d]">
              {t.heroTitle}
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-7 text-[#6e5550]">
              {t.heroText}
            </p>
            <Link
              href="/collections"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#382d2d] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:translate-x-1 hover:bg-[#4a3b3b]"
            >
              <span>{t.browse}</span>
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-[#8a625c]">
            <span className="flex -space-x-2">
              <span className="size-7 rounded-full border-2 border-[#f7dcd4] bg-[#e7b9a8]" />
              <span className="size-7 rounded-full border-2 border-[#f7dcd4] bg-[#9fb4a1]" />
              <span className="size-7 rounded-full border-2 border-[#f7dcd4] bg-[#f0c86c]" />
            </span>
            <span>{t.lovedBy}</span>
          </div>
        </div>

        <div className="relative min-h-[400px] overflow-hidden rounded-[28px] bg-[#dce7da] lg:min-h-[570px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vishwa-showroom.png"
            alt="Warm interior of the Vishwa Babywear showroom on Citylight Road, Palanpur"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-[#fffaf6]/90 px-4 py-3 shadow-sm backdrop-blur-sm">
            <p className="font-serif text-lg font-medium">{t.comeSayHello}</p>
            <p className="text-xs text-[#806b65]">{t.showroomAddress}</p>
          </div>
        </div>
      </section>

      {/* Shop by Collections */}
      <section id="shop" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#db6e78]">
              {t.findSomethingLovely}
            </p>
            <h2 className="font-serif text-3xl tracking-[-0.05em] sm:text-5xl">
              {t.shopByWorlds}
            </h2>
          </div>
          <Link
            href="/collections"
            className="flex items-center gap-1.5 text-sm font-bold text-[#db6e78] transition-transform hover:translate-x-1"
          >
            <span>{t.viewAll}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {collections.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className={`group rounded-[22px] ${category.bg} p-4 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-md sm:p-5`}
            >
              <div className="mb-8 text-4xl text-[#76605a] transition-transform group-hover:rotate-12">
                {category.icon}
              </div>
              <p className="font-serif text-xl font-medium">{category.label}</p>
              <p className="mt-1 text-xs font-medium text-[#846e68]">{category.gujarati}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Fresh Picks from the Showroom */}
      <section id="products" className="bg-[#f4eee9] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#db6e78]">
                {t.freshEyebrow}
              </p>
              <h2 className="font-serif text-3xl tracking-[-0.05em] sm:text-5xl">
                {t.freshPicks}
              </h2>
            </div>
            <Link
              href="/collections/all"
              className="hidden items-center gap-2 rounded-full border border-[#d9c9c2] px-4 py-2 text-sm font-bold text-[#382d2d] transition-colors hover:bg-white sm:flex"
            >
              <span>{t.viewAll}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 rounded-full border border-[#d9c9c2] bg-white px-6 py-3 text-xs font-bold text-[#382d2d]"
            >
              <span>{t.viewAll}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Story & Showroom Section */}
      <section
        id="story"
        className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-24"
      >
        <div className="relative mx-auto max-w-sm">
          <div className="absolute -left-5 -top-5 size-24 rounded-full border border-[#e9b9af]" />
          <div className="relative rounded-[24px] bg-[#e8d8c8] p-7 shadow-xs">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#db6e78]">
              A note from Sachin
            </p>
            <p className="mt-8 font-serif text-3xl leading-tight">"દરેક બાળક માટે કંઈક સુંદર."</p>
            <p className="mt-5 text-sm leading-6 text-[#78625b]">
              Something beautiful for every little one.
            </p>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#db6e78]">
            Our little corner
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-[-0.05em] sm:text-5xl">
            A real shop, with real care.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-[#6e5a54]">
            From a first cap to a favourite party frock, we help families find the right little things. Visit our showroom on Citylight Road, or browse from home — we are always happy to help you choose.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f7dcd4] px-4 py-2.5 text-xs font-bold text-[#382d2d]">
              <Truck size={15} /> COD available
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#dce7da] px-4 py-2.5 text-xs font-bold text-[#382d2d]">
              <Star size={15} fill="currentColor" /> Easy exchange
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f5eac4] px-4 py-2.5 text-xs font-bold text-[#382d2d]">
              <MapPin size={15} /> Palanpur local
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
