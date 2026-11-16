'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Check, X, ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useLanguage, useFavorites, useBag } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'

interface ProductCardProps {
  product: Product
}

/** Resolve the display image for a product.
 *  Priority: first uploaded image → static /vishwa-products.png with crop → neutral placeholder
 */
function ProductImage({ product, className }: { product: Product; className?: string }) {
  const hasUploadedImage =
    product.image && !product.image.startsWith('/vishwa-products.png') && product.image !== '/vishwa-products.png'
  const hasStaticPlaceholder = product.image === '/vishwa-products.png' && product.crop

  if (hasUploadedImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${className ?? ''}`}
      />
    )
  }

  if (hasStaticPlaceholder) {
    return (
      <div
        className={`absolute inset-0 bg-[url('/vishwa-products.png')] bg-[length:200%_200%] transition-transform duration-500 ease-out group-hover:scale-105 ${className ?? ''}`}
        style={{ backgroundPosition: product.crop }}
      />
    )
  }

  // Neutral placeholder
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-[#f0e9e4] ${className ?? ''}`}>
      <span className="font-serif text-4xl text-[#c9b9b2]">✦</span>
    </div>
  )
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage()
  const { isFavorite, toggleFavorite, ready: favoritesReady } = useFavorites()
  const { addToBag, ready: bagReady } = useBag()

  const [sizePickerOpen, setSizePickerOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [addedNotice, setAddedNotice] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const favorite = isFavorite(product.id)
  const t = TRANSLATIONS[language]

  const handleOpenPicker = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Auto-select first in-stock size if available
    const firstInStock = product.sizes.find((s) => (product.stock[s] ?? 1) > 0)
    setSelectedSize(firstInStock || product.sizes[0] || null)
    setSizePickerOpen(true)
    setErrorMessage(null)
  }

  const handleConfirmAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!selectedSize) {
      setErrorMessage(t.chooseSizeFirst)
      return
    }

    addToBag(product.id, selectedSize, 1)
    setSizePickerOpen(false)
    setAddedNotice(true)
    setTimeout(() => {
      setAddedNotice(false)
    }, 4500)
  }

  return (
    <article className="group relative flex flex-col justify-between">
      {/* Product Image and badges */}
      <div className="relative aspect-[0.84] w-full overflow-hidden rounded-[20px] bg-[#eaded6]">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
          aria-label={`View ${product.name}`}
        >
          <ProductImage product={product} />
        </Link>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(product.id)
          }}
          disabled={!favoritesReady}
          className="absolute right-2.5 top-2.5 z-10 flex size-9 items-center justify-center rounded-full bg-[#fffaf6]/90 p-2 shadow-sm backdrop-blur-sm transition-transform active:scale-90 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
          aria-label={favorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
        >
          <Heart
            size={16}
            strokeWidth={1.8}
            fill={favorite ? '#db6e78' : 'none'}
            color={favorite ? '#db6e78' : '#382d2d'}
            className="transition-colors"
          />
        </button>

        {/* Tag badge */}
        {product.tag && (
          <span className="pointer-events-none absolute bottom-2.5 left-2.5 rounded-full bg-[#fffaf6]/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#382d2d] shadow-sm backdrop-blur-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between pt-3">
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="block focus:outline-none focus:ring-1 focus:ring-[#db6e78]"
          >
            <h3 className="line-clamp-1 font-medium leading-snug text-[#382d2d] transition-colors group-hover:text-[#db6e78]">
              {language === 'ગુ' ? product.gujaratiName : product.name}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-xs text-[#927c75]">
              {language === 'ગુ' ? product.name : product.gujaratiName}
            </p>
          </Link>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-bold text-[#382d2d]">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-[#aa958e] line-through">₹{product.oldPrice}</span>
            )}
          </div>
        </div>

        {/* Action Button: triggers size picker */}
        <div className="mt-3">
          {addedNotice ? (
            <div className="flex items-center justify-between rounded-full bg-[#dce7da] px-3 py-1.5 text-[11px] font-bold text-[#2d4d30] shadow-sm animate-in fade-in zoom-in-95">
              <span className="flex items-center gap-1">
                <Check size={13} className="text-[#327038]" />
                {t.addedToBag}
              </span>
              <Link
                href="/cart"
                className="inline-flex items-center gap-0.5 text-[#2d4d30] underline hover:text-[#18331b]"
              >
                {t.viewBag}
                <ArrowRight size={11} />
              </Link>
            </div>
          ) : (
            <button
              onClick={handleOpenPicker}
              disabled={!bagReady}
              className="flex h-9 w-full items-center justify-center rounded-full border border-[#ddc9c0] bg-transparent text-xs font-bold text-[#382d2d] transition-all hover:border-[#382d2d] hover:bg-[#382d2d] hover:text-white active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
            >
              {t.addToBag}
            </button>
          )}
        </div>
      </div>

      {/* Size Picker Modal / Bottom Sheet */}
      {sizePickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSizePickerOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-t-[26px] bg-[#fffaf6] p-5 shadow-2xl sm:rounded-[24px] animate-in slide-in-from-bottom-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#f0ded8] pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#db6e78]">
                  {t.selectSize}
                </p>
                <h4 className="mt-0.5 font-serif text-base font-semibold text-[#382d2d]">
                  {language === 'ગુ' ? product.gujaratiName : product.name}
                </h4>
              </div>
              <button
                onClick={() => setSizePickerOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-[#846e68] hover:bg-[#f7dcd4]/50"
                aria-label="Close size picker"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4">
              <p className="mb-2.5 text-xs font-medium text-[#6b5a54]">
                {language === 'ગુ' ? 'ઉપલબ્ધ સાઇઝ:' : 'Available sizes:'}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((sz) => {
                  const stockCount = product.stock[sz] ?? 1
                  const isOutOfStock = stockCount === 0
                  const isSelected = selectedSize === sz

                  return (
                    <button
                      key={sz}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => {
                        setSelectedSize(sz)
                        setErrorMessage(null)
                      }}
                      className={`flex flex-col items-center justify-center rounded-xl border p-2 text-xs font-bold transition-all ${
                        isOutOfStock
                          ? 'cursor-not-allowed border-dashed border-[#d9c9c2] bg-[#f5ebe6]/50 text-[#b5a39c] opacity-50'
                          : isSelected
                            ? 'border-[#382d2d] bg-[#382d2d] text-white shadow-sm'
                            : 'border-[#ebd9d3] bg-white text-[#382d2d] hover:border-[#db6e78]'
                      }`}
                    >
                      <span>{sz}</span>
                      <span className="text-[10px] font-normal opacity-80">
                        {isOutOfStock ? t.outOfStock : stockCount < 3 ? `${stockCount} left` : ''}
                      </span>
                    </button>
                  )
                })}
              </div>

              {errorMessage && (
                <p className="mt-2.5 text-center text-xs font-semibold text-[#db6e78]">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#f0ded8]">
              <button
                type="button"
                onClick={() => setSizePickerOpen(false)}
                className="flex-1 rounded-full border border-[#ebd9d3] py-2.5 text-xs font-semibold text-[#6b5a54] hover:bg-white"
              >
                {language === 'ગુ' ? 'રદ કરો' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmAdd}
                className="flex-1 rounded-full bg-[#db6e78] py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:bg-[#d05c66] active:scale-98"
              >
                {t.addToBag}
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
