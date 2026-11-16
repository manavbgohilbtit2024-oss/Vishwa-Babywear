'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getProductById, Product } from './products'
import { SHOP_CONFIG } from './config'
import { useAuth } from './auth-context'
import { createClient } from './supabase/client'

export type Language = 'EN' | 'ગુ'

export interface BagItem {
  id: string // composite key e.g. "nb-01_0-3M"
  productId: string
  size: string
  quantity: number
}

// ---------------- Language Context ----------------
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// ---------------- Favorites Context ----------------
interface FavoritesContextType {
  favorites: string[] // product IDs
  ready: boolean
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  removeFavorite: (productId: string) => void
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

// ---------------- Bag Context ----------------
interface BagContextType {
  bag: BagItem[]
  ready: boolean
  bagCount: number
  bagSubtotal: number
  deliveryFee: number
  bagTotal: number
  addToBag: (productId: string, size: string, quantity?: number) => void
  updateQuantity: (itemId: string, quantity: number) => void
  removeFromBag: (itemId: string) => void
  clearBag: () => void
}

const BagContext = createContext<BagContextType | undefined>(undefined)

// ---------------- Combined Provider ----------------
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [language, setLanguageState] = useState<Language>('EN')
  const [favorites, setFavoritesState] = useState<string[]>([])
  const [bag, setBagState] = useState<BagItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage safely after mount
  useEffect(() => {
    try {
      const storedLang = localStorage.getItem('vbw_language') as Language | null
      if (storedLang === 'EN' || storedLang === 'ગુ') {
        setLanguageState(storedLang)
      }

      const storedFavs = localStorage.getItem('vbw_favorites')
      if (storedFavs) {
        const parsedFavs = JSON.parse(storedFavs)
        if (Array.isArray(parsedFavs)) setFavoritesState(parsedFavs)
      }

      const storedBag = localStorage.getItem('vbw_bag')
      if (storedBag) {
        const parsedBag = JSON.parse(storedBag)
        if (Array.isArray(parsedBag)) setBagState(parsedBag)
      }
    } catch (e) {
      console.error('Failed to parse localStorage store data', e)
    }
    setHydrated(true)
  }, [])

  // Sync with Supabase on user session change / login
  useEffect(() => {
    if (!hydrated) return
    const supabase = createClient()
    if (!supabase || !user) return

    // 1. Sync Favorites
    supabase
      .from('favorites')
      .select('product_id')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          const remoteIds = data.map((d: { product_id: string }) => d.product_id)
          setFavoritesState((prev) => {
            const merged = Array.from(new Set([...prev, ...remoteIds]))
            try {
              localStorage.setItem('vbw_favorites', JSON.stringify(merged))
            } catch {}
            // Upload local guest favorites that were not yet in remote
            const missingInRemote = prev.filter((id) => !remoteIds.includes(id))
            if (missingInRemote.length > 0) {
              supabase
                .from('favorites')
                .upsert(missingInRemote.map((pid) => ({ user_id: user.id, product_id: pid })))
                .then(() => {})
            }
            return merged
          })
        }
      })

    // 2. Sync Cart / Bag
    supabase
      .from('cart_items')
      .select('product_id, size, quantity')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          setBagState((prev) => {
            const mergedMap = new Map<string, BagItem>()
            data.forEach((row: { product_id: string; size: string; quantity: number }) => {
              const id = `${row.product_id}_${row.size}`
              mergedMap.set(id, {
                id,
                productId: row.product_id,
                size: row.size,
                quantity: row.quantity,
              })
            })
            const toUpload: { user_id: string; product_id: string; size: string; quantity: number }[] = []
            prev.forEach((item) => {
              if (mergedMap.has(item.id)) {
                const existing = mergedMap.get(item.id)!
                const newQty = Math.max(existing.quantity, item.quantity)
                mergedMap.set(item.id, { ...item, quantity: newQty })
                toUpload.push({ user_id: user.id, product_id: item.productId, size: item.size, quantity: newQty })
              } else {
                mergedMap.set(item.id, item)
                toUpload.push({ user_id: user.id, product_id: item.productId, size: item.size, quantity: item.quantity })
              }
            })
            if (toUpload.length > 0) {
              supabase.from('cart_items').upsert(toUpload).then(() => {})
            }
            const nextBag = Array.from(mergedMap.values())
            try {
              localStorage.setItem('vbw_bag', JSON.stringify(nextBag))
            } catch {}
            return nextBag
          })
        }
      })
  }, [hydrated, user])

  // Sync language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('vbw_language', lang)
    } catch {}
  }

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'ગુ' : 'EN')
  }

  // Sync favorites
  const toggleFavorite = (productId: string) => {
    setFavoritesState((prev) => {
      const isAdding = !prev.includes(productId)
      const next = isAdding
        ? [...prev, productId]
        : prev.filter((id) => id !== productId)
      try {
        localStorage.setItem('vbw_favorites', JSON.stringify(next))
      } catch {}

      const supabase = createClient()
      if (supabase && user) {
        if (isAdding) {
          supabase.from('favorites').upsert({ user_id: user.id, product_id: productId }).then(() => {})
        } else {
          supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', productId).then(() => {})
        }
      }
      return next
    })
  }

  const removeFavorite = (productId: string) => {
    setFavoritesState((prev) => {
      const next = prev.filter((id) => id !== productId)
      try {
        localStorage.setItem('vbw_favorites', JSON.stringify(next))
      } catch {}

      const supabase = createClient()
      if (supabase && user) {
        supabase.from('favorites').delete().eq('user_id', user.id).eq('product_id', productId).then(() => {})
      }
      return next
    })
  }

  const isFavorite = (productId: string) => favorites.includes(productId)

  // Sync bag
  const addToBag = (productId: string, size: string, quantity = 1) => {
    setBagState((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.size === size
      )
      let next: BagItem[]
      let finalQty = quantity
      if (existingIndex > -1) {
        finalQty = prev[existingIndex].quantity + quantity
        next = [...prev]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: finalQty,
        }
      } else {
        const id = `${productId}_${size}`
        next = [...prev, { id, productId, size, quantity }]
      }
      try {
        localStorage.setItem('vbw_bag', JSON.stringify(next))
      } catch {}

      const supabase = createClient()
      if (supabase && user) {
        supabase.from('cart_items').upsert({
          user_id: user.id,
          product_id: productId,
          size: size,
          quantity: finalQty,
        }).then(() => {})
      }
      return next
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setBagState((prev) => {
      let next: BagItem[]
      const itemToUpdate = prev.find((item) => item.id === itemId)
      if (quantity <= 0) {
        next = prev.filter((item) => item.id !== itemId)
        if (user && itemToUpdate) {
          const supabase = createClient()
          if (supabase) {
            supabase
              .from('cart_items')
              .delete()
              .eq('user_id', user.id)
              .eq('product_id', itemToUpdate.productId)
              .eq('size', itemToUpdate.size)
              .then(() => {})
          }
        }
      } else {
        next = prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
        if (user && itemToUpdate) {
          const supabase = createClient()
          if (supabase) {
            supabase
              .from('cart_items')
              .upsert({
                user_id: user.id,
                product_id: itemToUpdate.productId,
                size: itemToUpdate.size,
                quantity: quantity,
              })
              .then(() => {})
          }
        }
      }
      try {
        localStorage.setItem('vbw_bag', JSON.stringify(next))
      } catch {}
      return next
    })
  }

  const removeFromBag = (itemId: string) => {
    setBagState((prev) => {
      const itemToRemove = prev.find((item) => item.id === itemId)
      const next = prev.filter((item) => item.id !== itemId)
      try {
        localStorage.setItem('vbw_bag', JSON.stringify(next))
      } catch {}

      if (user && itemToRemove) {
        const supabase = createClient()
        if (supabase) {
          supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', itemToRemove.productId)
            .eq('size', itemToRemove.size)
            .then(() => {})
        }
      }
      return next
    })
  }

  const clearBag = () => {
    setBagState([])
    try {
      localStorage.removeItem('vbw_bag')
    } catch {}

    if (user) {
      const supabase = createClient()
      if (supabase) {
        supabase.from('cart_items').delete().eq('user_id', user.id).then(() => {})
      }
    }
  }

  // Calculations
  const bagCount = bag.reduce((sum, item) => sum + item.quantity, 0)

  const bagSubtotal = bag.reduce((sum, item) => {
    const product = getProductById(item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const deliveryFee =
    bagSubtotal === 0 || bagSubtotal >= SHOP_CONFIG.freeDeliveryThreshold
      ? 0
      : SHOP_CONFIG.deliveryFee

  const bagTotal = bagSubtotal + deliveryFee

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      <FavoritesContext.Provider
        value={{
          favorites,
          ready: hydrated,
          toggleFavorite,
          isFavorite,
          removeFavorite,
          favoritesCount: favorites.length,
        }}
      >
        <BagContext.Provider
          value={{
            bag,
            ready: hydrated,
            bagCount,
            bagSubtotal,
            deliveryFee,
            bagTotal,
            addToBag,
            updateQuantity,
            removeFromBag,
            clearBag,
          }}
        >
          {children}
        </BagContext.Provider>
      </FavoritesContext.Provider>
    </LanguageContext.Provider>
  )
}

// Hooks
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within StoreProvider')
  return context
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within StoreProvider')
  return context
}

export function useBag() {
  const context = useContext(BagContext)
  if (!context) throw new Error('useBag must be used within StoreProvider')
  return context
}
