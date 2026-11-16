'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { useFavorites, useLanguage } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'
import { getAllProducts } from '@/lib/products'

export default function FavoritesPage() {
  const { favorites, ready } = useFavorites()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language]
  const products = getAllProducts().filter((product) => favorites.includes(product.id))

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <header className="mb-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#db6e78]">
          {t.favorites}
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[#382d2d]">
          {t.favoritesTitle}
        </h1>
        <p className="mt-3 text-sm text-[#846e68]">{t.favoritesSubtitle}</p>
      </header>

      {!ready ? (
        <section className="flex min-h-[300px] items-center justify-center rounded-[28px] border border-[#f0ded8] bg-white/70 px-6 py-12 text-sm text-[#846e68]" aria-live="polite">
          Loading saved favorites…
        </section>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <section className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-[#f0ded8] bg-white/70 px-6 py-12 text-center">
          <Heart size={30} className="mb-4 text-[#db6e78]" />
          <h2 className="font-serif text-2xl font-semibold text-[#382d2d]">
            {t.emptyFavoritesTitle}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#846e68]">
            {t.emptyFavoritesDesc}
          </p>
          <Link
            href="/collections"
            className="mt-6 rounded-full bg-[#382d2d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#594341]"
          >
            {t.browseCollections}
          </Link>
        </section>
      )}
    </main>
  )
}
