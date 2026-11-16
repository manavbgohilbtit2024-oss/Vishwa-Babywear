import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { COLLECTIONS, SPECIAL_COLLECTIONS } from '@/lib/collections'
import { TRANSLATIONS } from '@/lib/translations'

export default function CollectionsPage() {
  const t = TRANSLATIONS.EN

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <header className="mb-9 max-w-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#db6e78]">
          {t.findSomethingLovely}
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[#382d2d] sm:text-5xl">
          {t.allCollections}
        </h1>
      </header>

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {SPECIAL_COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className={`group rounded-[24px] ${collection.bg} p-6 transition-transform hover:-translate-y-1`}
          >
            <Sparkles className="mb-8 text-[#db6e78]" size={22} />
            <h2 className="font-serif text-2xl font-semibold text-[#382d2d]">
              {collection.label}
            </h2>
            <p className="mt-1 text-sm text-[#846e68]">{collection.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#382d2d]">
              {t.browse}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className={`group rounded-[24px] ${collection.bg} p-6 transition-transform hover:-translate-y-1`}
          >
            <span className="text-4xl text-[#76605a]">{collection.icon}</span>
            <h2 className="mt-7 font-serif text-2xl font-semibold text-[#382d2d]">
              {collection.label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#846e68]">{collection.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#382d2d]">
              {t.browse}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}
