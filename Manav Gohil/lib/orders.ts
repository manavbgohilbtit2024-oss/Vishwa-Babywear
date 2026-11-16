// Orders store and persistence
// - When logged in: inserts into Supabase orders table (optimistic, localStorage fallback)
// - When logged out (guest): localStorage only
// Card details are NEVER stored anywhere.

import { SHOP_CONFIG } from './config'
import { createClient } from './supabase/client'

export interface OrderItem {
  productId: string
  name: string
  gujaratiName?: string
  size: string
  quantity: number
  price: number
}

export interface CustomerDetails {
  fullName: string
  mobile: string
  email?: string
  address: string
  area: string
  city: string
  state: string
  pincode: string
  note?: string
}

export interface Order {
  id: string // Format: VBW-YYMMDD-####
  date: string // e.g. "8 Oct 2026, 8:45 PM"
  items: OrderItem[]
  customer: CustomerDetails
  subtotal: number
  deliveryFee: number
  total: number
  paymentMethod: 'COD' | 'Card'
  paymentStatus: 'Pay on delivery' | 'Paid'
  estimatedDelivery: string
}

export function generateOrderId(): string {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `VBW-${yy}${mm}${dd}-${rand}`
}

/**
 * Submits an order.
 * - Always stores in localStorage (for the confirmation page immediate lookup)
 * - When logged in, also inserts into Supabase orders table
 * - Never stores card details
 */
export async function submitOrder(
  orderData: Omit<Order, 'id' | 'date' | 'estimatedDelivery'>
): Promise<Order> {
  const id = generateOrderId()
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const order: Order = {
    ...orderData,
    id,
    date: dateStr,
    estimatedDelivery: SHOP_CONFIG.estimatedDelivery,
  }

  // Always store in localStorage for immediate confirmation page access
  try {
    const existingRaw = localStorage.getItem('vbw_orders')
    const existingList: Order[] = existingRaw ? JSON.parse(existingRaw) : []
    const updated = [order, ...existingList]
    localStorage.setItem('vbw_orders', JSON.stringify(updated))
  } catch (err) {
    console.error('Failed to store order in localStorage', err)
  }

  // Also persist to Supabase when user is logged in
  try {
    const supabase = createClient()
    if (supabase) {
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user) {
        await supabase.from('orders').insert({
          id: order.id,
          user_id: userData.user.id,
          data: order,
          total: order.total,
          payment_method: order.paymentMethod,
          payment_status: order.paymentStatus,
        })
      }
    }
  } catch (err) {
    // Non-fatal — order is already in localStorage
    console.error('Failed to store order in Supabase', err)
  }

  return order
}

export function getOrderById(id: string): Order | null {
  if (typeof window === 'undefined') return null
  try {
    const existingRaw = localStorage.getItem('vbw_orders')
    if (!existingRaw) return null
    const list: Order[] = JSON.parse(existingRaw)
    return list.find((o) => o.id === id) || null
  } catch (err) {
    console.error('Failed to read order from localStorage', err)
    return null
  }
}

/**
 * Looks up an order by ID first from localStorage, and if not found, from Supabase.
 */
export async function fetchOrderByIdAsync(id: string): Promise<Order | null> {
  const local = getOrderById(id)
  if (local) return local
  try {
    const supabase = createClient()
    if (!supabase) return null
    const { data } = await supabase
      .from('orders')
      .select('data')
      .eq('id', id)
      .maybeSingle()
    if (data && data.data) {
      return data.data as Order
    }
  } catch (err) {
    console.error('Failed to fetch order from Supabase', err)
  }
  return null
}

/**
 * Fetches orders for a logged-in user from Supabase.
 * Falls back to localStorage on error.
 */
export async function getOrdersForUser(): Promise<Order[]> {
  try {
    const supabase = createClient()
    if (!supabase) return getLocalOrders()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return getLocalOrders()

    const { data } = await supabase
      .from('orders')
      .select('data')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false })

    return (data ?? []).map((row: { data: Order }) => row.data)
  } catch {
    return getLocalOrders()
  }
}

function getLocalOrders(): Order[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('vbw_orders')
    if (!raw) return []
    return JSON.parse(raw) as Order[]
  } catch {
    return []
  }
}
