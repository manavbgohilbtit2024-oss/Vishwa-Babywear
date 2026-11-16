'use client'

import { FormEvent, InputHTMLAttributes, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useBag, useLanguage } from '@/lib/context'
import { getProductById } from '@/lib/products'
import { submitOrder } from '@/lib/orders'
import { TRANSLATIONS } from '@/lib/translations'

export default function CheckoutPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const { bag, ready, bagSubtotal, deliveryFee, bagTotal, clearBag } = useBag()
  const t = TRANSLATIONS[language]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    area: '',
    city: SHOP_CITY,
    state: 'Gujarat',
    pincode: '',
    note: '',
  })

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const digits = form.mobile.replace(/\D/g, '')
    if (digits.length !== 10) {
      setError(t.mobileNumber)
      return
    }

    const orderItems = bag.flatMap((item) => {
      const product = getProductById(item.productId)
      if (!product) return []
      return [{
        productId: product.id,
        name: product.name,
        gujaratiName: product.gujaratiName,
        size: item.size,
        quantity: item.quantity,
        price: product.price,
      }]
    })
    if (orderItems.length !== bag.length) {
      setError(t.orderFailed)
      return
    }

    setLoading(true)
    try {
      const order = await submitOrder({
        items: orderItems,
        customer: { ...form, mobile: digits },
        subtotal: bagSubtotal,
        deliveryFee,
        total: bagTotal,
        paymentMethod: 'COD',
        paymentStatus: 'Pay on delivery',
      })
      clearBag()
      router.push(`/orders/${encodeURIComponent(order.id)}`)
    } catch (submitError) {
      console.error('Failed to place COD order', submitError)
      setError(t.orderFailed)
      setLoading(false)
    }
  }

  if (!ready) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-[#846e68]" aria-live="polite">
        Loading your shopping bag…
      </main>
    )
  }

  if (bag.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-semibold text-[#382d2d]">{t.emptyBagTitle}</h1>
        <p className="mt-3 text-sm text-[#846e68]">{t.emptyBagDesc}</p>
        <Link
          href="/collections"
          className="mt-6 inline-flex rounded-full bg-[#382d2d] px-6 py-3 text-sm font-semibold text-white"
        >
          {t.startShopping}
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <Link
        href="/cart"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#846e68] hover:text-[#db6e78]"
      >
        <ArrowLeft size={16} />
        {t.shoppingBagTitle}
      </Link>
      <h1 className="mb-8 font-serif text-3xl font-semibold text-[#382d2d] sm:text-4xl">
        {t.checkoutTitle}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <form onSubmit={handleSubmit} className="space-y-7">
          <section className="rounded-[24px] border border-[#f0ded8] bg-white/80 p-5 sm:p-7">
            <h2 className="font-serif text-xl font-semibold text-[#382d2d]">{t.deliveryDetails}</h2>
            <p className="mt-1 text-sm text-[#846e68]">{t.guestCheckoutNote}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={t.fullName} value={form.fullName} onChange={(v) => updateField('fullName', v)} required autoComplete="name" />
              <Field label={t.mobileNumber} value={form.mobile} onChange={(v) => updateField('mobile', v)} required type="tel" autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} />
              <Field label={t.emailOptional} value={form.email} onChange={(v) => updateField('email', v)} type="email" autoComplete="email" />
              <Field label={t.address} value={form.address} onChange={(v) => updateField('address', v)} required autoComplete="address-line1" />
              <Field label={t.areaLandmark} value={form.area} onChange={(v) => updateField('area', v)} required autoComplete="address-line2" />
              <Field label={t.city} value={form.city} onChange={(v) => updateField('city', v)} required autoComplete="address-level2" />
              <Field label={t.state} value={form.state} onChange={(v) => updateField('state', v)} required autoComplete="address-level1" />
              <Field label={t.pincode} value={form.pincode} onChange={(v) => updateField('pincode', v)} required autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} />
              <label className="text-sm font-medium text-[#382d2d] sm:col-span-2">
                {t.orderNote}
                <textarea
                  value={form.note}
                  onChange={(event) => updateField('note', event.target.value)}
                  placeholder={t.orderNotePlaceholder}
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border border-[#ebd9d3] bg-[#fffaf6] px-4 py-3 text-sm outline-none focus:border-[#db6e78] focus:ring-2 focus:ring-[#db6e78]/20"
                />
              </label>
            </div>
          </section>

          <section className="rounded-[24px] border border-[#f0ded8] bg-white/80 p-5 sm:p-7">
            <h2 className="font-serif text-xl font-semibold text-[#382d2d]">{t.paymentMethod}</h2>
            <div className="mt-4 rounded-2xl border border-[#db6e78] bg-[#fff8f5] p-4">
              <p className="font-semibold text-[#382d2d]">{t.codTitle}</p>
              <p className="mt-1 text-sm leading-6 text-[#846e68]">{t.codDesc}</p>
            </div>
          </section>

          {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#382d2d] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#594341] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? t.placingOrder : `${t.placeOrder} · ₹${bagTotal}`}
          </button>
        </form>

        <aside className="rounded-[24px] border border-[#f0ded8] bg-white/80 p-5 sm:p-6">
          <h2 className="font-serif text-xl font-semibold text-[#382d2d]">{t.orderSummary}</h2>
          <div className="mt-5 space-y-3 border-b border-[#f0ded8] pb-5 text-sm">
            {bag.map((item) => {
              const product = getProductById(item.productId)
              if (!product) return null
              return (
                <div key={item.id} className="flex justify-between gap-4 text-[#684f4b]">
                  <span>{product.name} · {item.size} × {item.quantity}</span>
                  <span className="shrink-0 font-medium text-[#382d2d]">₹{product.price * item.quantity}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <SummaryRow label={t.subtotal} value={`₹${bagSubtotal}`} />
            <SummaryRow label={t.delivery} value={deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`} />
            <SummaryRow label={language === 'ગુ' ? 'કુલ' : 'Total'} value={`₹${bagTotal}`} bold />
          </div>
        </aside>
      </div>
    </main>
  )
}

const SHOP_CITY = 'Palanpur'

function Field({
  label,
  value,
  onChange,
  ...props
}: {
  label: string
  value: string
  onChange: (value: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <label className="text-sm font-medium text-[#382d2d]">
      {label}
      <input
        {...props}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 h-11 w-full rounded-xl border border-[#ebd9d3] bg-[#fffaf6] px-4 text-sm outline-none focus:border-[#db6e78] focus:ring-2 focus:ring-[#db6e78]/20"
      />
    </label>
  )
}

function SummaryRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 text-[#382d2d] ${bold ? 'border-t border-[#f0ded8] pt-3 text-base font-bold' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
