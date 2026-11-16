'use client'

import Link from 'next/link'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useBag, useLanguage } from '@/lib/context'
import { SHOP_CONFIG, whatsappLink } from '@/lib/config'
import { getProductById } from '@/lib/products'
import { TRANSLATIONS } from '@/lib/translations'

export default function CartPage() {
  const { language } = useLanguage()
  const {
    bag,
    ready,
    bagCount,
    bagSubtotal,
    deliveryFee,
    bagTotal,
    updateQuantity,
    removeFromBag,
  } = useBag()
  const t = TRANSLATIONS[language]
  const totalLabel = language === 'ગુ' ? 'કુલ' : 'Total'
  const freeDeliveryAmount = Math.max(0, SHOP_CONFIG.freeDeliveryThreshold - bagSubtotal)
  const orderMessage = [
    language === 'ગુ' ? 'નમસ્તે, હું આ વસ્તુઓ ઓર્ડર કરવા માંગુ છું:' : 'Hello, I would like to order:',
    ...bag.map((item) => {
      const product = getProductById(item.productId)
      const name = product
        ? language === 'ગુ' ? product.gujaratiName : product.name
        : item.productId
      return `• ${name} (${item.size}) × ${item.quantity}`
    }),
    `${t.subtotal}: ₹${bagSubtotal}`,
    `${t.delivery}: ${deliveryFee === 0 ? t.freeDeliveryUnlocked : `₹${deliveryFee}`}`,
    `${totalLabel}: ₹${bagTotal}`,
  ].join('\n')

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#846e68] transition-colors hover:text-[#db6e78]"
        >
          <ArrowLeft size={16} />
          {t.continueShopping}
        </Link>
        <h1 className="font-serif text-3xl font-semibold text-[#382d2d] sm:text-4xl">
          {t.shoppingBagTitle}
        </h1>
      </div>

      {!ready ? (
        <section className="flex min-h-[340px] items-center justify-center rounded-[28px] border border-[#f0ded8] bg-white/70 px-6 py-12 text-center text-sm text-[#846e68]" aria-live="polite">
          Loading your shopping bag…
        </section>
      ) : bag.length === 0 ? (
        <section className="flex min-h-[340px] flex-col items-center justify-center rounded-[28px] border border-[#f0ded8] bg-white/70 px-6 py-12 text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#f7dcd4]/60 text-[#db6e78]">
            <ShoppingBag size={28} strokeWidth={1.6} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#382d2d]">
            {t.emptyBagTitle}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#846e68]">
            {t.emptyBagDesc}
          </p>
          <Link
            href="/collections"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-[#382d2d] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#594341] focus:outline-none focus:ring-2 focus:ring-[#db6e78] focus:ring-offset-2"
          >
            {t.startShopping}
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <section aria-label={t.shoppingBagTitle} className="space-y-4">
            {bag.map((item) => {
              const product = getProductById(item.productId)
              const productName = product
                ? language === 'ગુ' ? product.gujaratiName : product.name
                : item.productId
              const imageStyle = product
                ? {
                    backgroundImage: `url("${product.image}")`,
                    backgroundSize:
                      product.image === '/vishwa-products.png' && product.crop
                        ? '200% 200%'
                        : 'cover',
                    backgroundPosition: product.crop || 'center',
                  }
                : undefined
              const maxQuantity = product?.stock[item.size] ?? Number.POSITIVE_INFINITY

              return (
                <article
                  key={item.id}
                  className="flex gap-4 rounded-[24px] border border-[#f0ded8] bg-white/80 p-4 sm:gap-5 sm:p-5"
                >
                  <div
                    role="img"
                    aria-label={productName}
                    className="size-24 shrink-0 rounded-2xl bg-[#f0e9e4] sm:size-32"
                    style={imageStyle}
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="min-w-0">
                      <h2 className="font-medium leading-snug text-[#382d2d]">
                        {productName}
                      </h2>
                      <p className="mt-1 text-sm text-[#846e68]">
                        {t.selectSize}: {item.size}
                      </p>
                      {product && (
                        <p className="mt-2 font-semibold text-[#382d2d]">
                          ₹{product.price}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="inline-flex h-9 items-center rounded-full border border-[#ddc9c0]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label={`${t.quantity} -`}
                          className="flex size-9 items-center justify-center rounded-l-full text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-[#382d2d]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= maxQuantity}
                          aria-label={`${t.quantity} +`}
                          className="flex size-9 items-center justify-center rounded-r-full text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        {product && (
                          <span className="font-semibold text-[#382d2d]">
                            ₹{product.price * item.quantity}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFromBag(item.id)}
                          aria-label={`${t.remove} ${productName}`}
                          title={t.remove}
                          className="flex size-9 items-center justify-center rounded-full text-[#927c75] transition-colors hover:bg-[#fbe8e4] hover:text-[#db6e78] focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </section>

          <aside className="rounded-[24px] border border-[#f0ded8] bg-white/80 p-5 sm:p-6">
            <h2 className="font-serif text-xl font-semibold text-[#382d2d]">
              {t.orderSummary}
            </h2>
            <p className="mt-1 text-sm text-[#927c75]">
              {bagCount} {t.quantity.toLowerCase()}
            </p>

            <div className="mt-5 space-y-4 border-t border-[#f0ded8] pt-5 text-sm">
              <div className="flex justify-between gap-4 text-[#684f4b]">
                <span>{t.subtotal}</span>
                <span className="font-medium text-[#382d2d]">₹{bagSubtotal}</span>
              </div>
              <div className="flex justify-between gap-4 text-[#684f4b]">
                <span>{t.delivery}</span>
                <span className="text-right font-medium text-[#382d2d]">
                  {deliveryFee === 0 ? (language === 'ગુ' ? 'મફત' : 'Free') : `₹${deliveryFee}`}
                </span>
              </div>

              {deliveryFee === 0 ? (
                <p className="rounded-xl bg-[#edf4eb] px-3 py-2.5 text-xs leading-5 text-[#3d6840]">
                  {t.freeDeliveryUnlocked}
                </p>
              ) : (
                <p className="rounded-xl bg-[#fff4ed] px-3 py-2.5 text-xs leading-5 text-[#8a5d44]">
                  {t.addMoreForFreeDelivery.replace('{amount}', String(freeDeliveryAmount))}
                </p>
              )}

              <div className="flex justify-between border-t border-[#f0ded8] pt-4 text-base font-bold text-[#382d2d]">
                <span>{totalLabel}</span>
                <span>₹{bagTotal}</span>
              </div>
            </div>

            <a
              href={whatsappLink(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-[#382d2d] px-5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#594341] focus:outline-none focus:ring-2 focus:ring-[#db6e78] focus:ring-offset-2"
            >
              {t.sendWhatsApp}
            </a>
            <Link
              href="/checkout"
              className="mt-3 flex min-h-12 w-full items-center justify-center rounded-full border border-[#382d2d] px-5 text-center text-sm font-semibold text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78] focus:ring-offset-2"
            >
              {t.proceedToCheckout} · {t.codCheckoutOption}
            </Link>
            <p className="mt-3 text-center text-xs leading-5 text-[#927c75]">
              {t.reassurance}
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}
