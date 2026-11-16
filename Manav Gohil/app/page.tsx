import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Truck,
  Star,
  MapPin,
} from 'lucide-react'
import { COLLECTIONS } from '@/lib/collections'
import { getAllProducts } from '@/lib/products'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const allProducts = getAllProducts()
  // Featured / newest 4 products
  const featuredProducts = allProducts.filter((p) => p.isNewArrival).slice(0, 4)
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4)

  return (
    <HomeClient collections={COLLECTIONS} featuredProducts={displayProducts} />
  )
}
