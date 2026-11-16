'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { CheckCircle2, Download, ShoppingBag } from 'lucide-react'
import { getOrderById } from '@/lib/orders'
import type { Order } from '@/lib/orders'
import { generateInvoicePdf } from '@/lib/invoice'
import { useLanguage } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language]
  const [order, setOrder] = useState<Order | null>(null)
  const [ready, setReady] = useState(false)
  const [invoiceError, setInvoiceError] = useState('')

  useEffect(() => {
    setOrder(getOrderById(decodeURIComponent(params.id)))
    setReady(true)
  }, [params.id])

  function downloadInvoice() {
    if (!order) return
    setInvoiceError('')
    try {
      generateInvoicePdf(order)
    } catch (error) {
      console.error('Failed to generate invoice PDF', error)
      setInvoiceError(language === 'ગુ' ? 'ઇનવોઇસ ડાઉનલોડ થઈ શક્યું નથી.' : 'Could not download the invoice. Please try again.')
    }
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-[#846e68]" aria-live="polite">
        {language === 'ગુ' ? 'ઓર્ડરની વિગતો લોડ થઈ રહી છે…' : 'Loading order details…'}
      </main>
    )
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#382d2d]">{t.orderNotFoundTitle}</h1>
        <p className="mt-3 text-sm text-[#846e68]">{t.orderNotFoundDesc}</p>
        <Link href="/collections" className="mt-6 inline-flex rounded-full bg-[#382d2d] px-6 py-3 text-sm font-semibold text-white">
          {t.browseCollections}
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <section className="rounded-[28px] border border-[#f0ded8] bg-white/80 p-6 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 size={48} strokeWidth={1.6} className="text-[#638366]" />
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#382d2d]">{t.orderConfirmed}</h1>
          <p className="mt-2 text-sm text-[#846e68]">{t.orderThankYou}</p>
        </div>

        <dl className="mt-8 grid gap-4 rounded-2xl bg-[#fffaf6] p-5 text-sm sm:grid-cols-2">
          <OrderDetail label={t.orderIdLabel} value={order.id} />
          <OrderDetail label={t.orderDateLabel} value={order.date} />
          <OrderDetail label={t.estimatedDeliveryLabel} value={order.estimatedDelivery} />
          <OrderDetail label={t.paymentStatusLabel} value={`${order.paymentMethod} · ${order.paymentStatus}`} />
          <div className="sm:col-span-2">
            <OrderDetail
              label={t.deliveryAddress}
              value={`${order.customer.fullName}, ${order.customer.address}, ${order.customer.area}, ${order.customer.city}, ${order.customer.state} ${order.customer.pincode}`}
            />
          </div>
        </dl>

        <div className="mt-6 space-y-3 border-t border-[#f0ded8] pt-5">
          {order.items.map((item, index) => (
            <div key={`${item.productId}-${item.size}-${index}`} className="flex justify-between gap-4 text-sm text-[#684f4b]">
              <span>{language === 'ગુ' && item.gujaratiName ? item.gujaratiName : item.name} · {item.size} × {item.quantity}</span>
              <span className="shrink-0 font-medium text-[#382d2d]">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between border-t border-[#f0ded8] pt-4 font-bold text-[#382d2d]">
            <span>{language === 'ગુ' ? 'કુલ' : 'Total'}</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={downloadInvoice}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#382d2d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#594341] focus:outline-none focus:ring-2 focus:ring-[#db6e78] focus:ring-offset-2"
        >
          <Download size={17} />
          {t.downloadInvoice}
        </button>
        {invoiceError && <p role="alert" className="mt-3 text-center text-sm text-red-600">{invoiceError}</p>}
        <Link
          href="/collections"
          className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#ddc9c0] px-5 text-sm font-semibold text-[#382d2d] hover:bg-[#f7dcd4]/40"
        >
          <ShoppingBag size={17} />
          {t.continueShopping}
        </Link>
      </section>
    </main>
  )
}

function OrderDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-[#927c75]">{label}</dt>
      <dd className="mt-1 leading-6 text-[#382d2d]">{value}</dd>
    </div>
  )
}
