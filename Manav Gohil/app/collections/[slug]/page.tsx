import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { getCollectionBySlug } from '@/lib/collections'
import { getProductsByCollection } from '@/lib/products'
import { TRANSLATIONS } from '@/lib/translations'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q?: string }>
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const collection = getCollectionBySlug(slug)
  if (!collection) notFound()

  const search = query.q?.trim().toLocaleLowerCase() ?? ''
  const products = getProductsByCollection(slug).filter((product) => {
    if (!search) return true
    return [product.name, product.gujaratiName, product.slug, product.subcategory, product.tag]
      .filter(Boolean)
      .some((value) => value!.toLocaleLowerCase().includes(search))
  })
  const t = TRANSLATIONS.EN

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <Link
        href="/collections"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#846e68] hover:text-[#db6e78]"
      >
        <ArrowLeft size={16} />
        {t.allCollections}
      </Link>
      <header className="mb-8">
        <p className="mb-2 text-4xl text-[#76605a]">{collection.icon}</p>
        <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[#382d2d] sm:text-5xl">
          {collection.label}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#846e68]">
          {collection.description}
        </p>
        {search && (
          <p className="mt-3 text-sm text-[#846e68]">
            {products.length} results for “{query.q}”
          </p>
        )}
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <section className="rounded-[24px] border border-[#f0ded8] bg-white/70 px-6 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#382d2d]">
            {search ? 'No matching products found' : 'New products coming soon'}
          </h2>
          <p className="mt-2 text-sm text-[#846e68]">
            {search ? 'Try another search or browse all products.' : collection.description}
          </p>
          <Link
            href={search ? '/collections/all' : '/collections'}
            className="mt-5 inline-flex rounded-full bg-[#382d2d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#594341]"
          >
            {search ? t.allCollections : t.browse}
          </Link>
        </section>
      )}
    </main>
  )
}
