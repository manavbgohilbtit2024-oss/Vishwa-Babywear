'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useBag, useFavorites, useLanguage } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'

export function ProductDetails({ product }: { product: Product }) {
  const { language } = useLanguage()
  const { addToBag, ready: bagReady } = useBag()
  const { isFavorite, toggleFavorite, ready: favoritesReady } = useFavorites()
  const [size, setSize] = useState('')
  const [added, setAdded] = useState(false)
  const t = TRANSLATIONS[language]
  const name = language === 'ગુ' ? product.gujaratiName : product.name
  const availableSizes = product.sizes.filter((item) => (product.stock[item] ?? 1) > 0)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <Link
        href={`/collections/${product.collection}`}
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#846e68] hover:text-[#db6e78]"
      >
        <ArrowLeft size={16} />
        {t.continueShopping}
      </Link>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div
          role="img"
          aria-label={name}
          className="aspect-[0.9] rounded-[28px] bg-[#f0e9e4]"
          style={{
            backgroundImage: `url("${product.image}")`,
            backgroundSize:
              product.image === '/vishwa-products.png' && product.crop ? '200% 200%' : 'cover',
            backgroundPosition: product.crop || 'center',
          }}
        />
        <section className="flex flex-col items-start py-2">
          {product.tag && (
            <span className="rounded-full bg-[#f7dcd4] px-3 py-1 text-xs font-bold text-[#9d625d]">
              {product.tag}
            </span>
          )}
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#382d2d] sm:text-4xl">
            {name}
          </h1>
          <p className="mt-2 text-sm text-[#846e68]">
            {language === 'ગુ' ? product.name : product.gujaratiName}
          </p>
          <p className="mt-5 text-2xl font-bold text-[#382d2d]">₹{product.price}</p>
          {product.oldPrice && (
            <p className="mt-1 text-sm text-[#927c75] line-through">₹{product.oldPrice}</p>
          )}
          <p className="mt-6 text-sm leading-7 text-[#684f4b]">
            {language === 'ગુ' ? product.gujaratiDescription : product.description}
          </p>

          <div className="mt-7 w-full">
            <p className="mb-3 text-sm font-semibold text-[#382d2d]">{t.selectSize}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => {
                const inStock = availableSizes.includes(item)
                return (
                  <button
                    key={item}
                    type="button"
                    disabled={!inStock}
                    onClick={() => setSize(item)}
                    className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      size === item
                        ? 'border-[#382d2d] bg-[#382d2d] text-white'
                        : 'border-[#ddc9c0] text-[#382d2d] hover:border-[#db6e78]'
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          {product.colours.length > 0 && (
            <p className="mt-6 text-sm text-[#684f4b]">
              <span className="font-semibold text-[#382d2d]">{t.colours}: </span>
              {product.colours.join(', ')}
            </p>
          )}
          <p className="mt-3 text-sm text-[#684f4b]">
            <span className="font-semibold text-[#382d2d]">{t.fabricDetails}: </span>
            {product.fabric}
          </p>

          <div className="mt-8 flex w-full flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (!size) return
                addToBag(product.id, size)
                setAdded(true)
              }}
              disabled={!size || !bagReady}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#382d2d] px-5 text-sm font-bold text-white transition-colors hover:bg-[#594341] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {added ? <Check size={17} /> : <ShoppingBag size={17} />}
              {added ? t.addedToBag : t.addToBag}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              disabled={!favoritesReady}
              aria-label={isFavorite(product.id) ? t.remove : t.favorites}
              className="flex size-12 items-center justify-center rounded-full border border-[#ddc9c0] text-[#db6e78] hover:bg-[#f7dcd4]/50"
            >
              <Heart size={19} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          {added && (
            <Link
              href="/cart"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#db6e78] hover:underline"
            >
              {t.viewBag}
              <ArrowRight size={15} />
            </Link>
          )}
        </section>
      </div>
    </main>
  )
}
