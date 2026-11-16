'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useBag, useFavorites } from '@/lib/context'
import { AuthCard } from '@/components/AuthCard'

export default function AccountPage() {
  const { user, profile, loading, signOut } = useAuth()
  const { bagCount } = useBag()
  const { favoritesCount } = useFavorites()

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center text-sm text-[#846e68]" aria-live="polite">
        Loading your account…
      </main>
    )
  }

  if (!user) {
    return (
      <AuthCard>
        <h1 className="font-serif text-2xl font-semibold text-[#382d2d]">Your account</h1>
        <p className="mt-2 text-sm leading-6 text-[#846e68]">
          Sign in to view your account. Your shopping bag and favorites are available without signing in.
        </p>
        <Link
          href="/login"
          className="mt-6 flex h-12 items-center justify-center rounded-full bg-[#382d2d] text-sm font-bold text-white hover:bg-[#4a3b3b]"
        >
          Sign in
        </Link>
      </AuthCard>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <section className="rounded-[28px] border border-[#f0ded8] bg-white p-7 sm:p-10">
        <h1 className="font-serif text-3xl font-semibold text-[#382d2d]">Your account</h1>
        <p className="mt-3 text-sm text-[#684f4b]">{profile?.full_name || user.email}</p>
        {profile?.full_name && <p className="mt-1 text-sm text-[#846e68]">{user.email}</p>}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link href="/favorites" className="rounded-2xl bg-[#f7dcd4]/50 p-4 text-sm font-semibold text-[#382d2d] hover:bg-[#f7dcd4]">
            Saved favorites: {favoritesCount}
          </Link>
          <Link href="/cart" className="rounded-2xl bg-[#f7dcd4]/50 p-4 text-sm font-semibold text-[#382d2d] hover:bg-[#f7dcd4]">
            Shopping bag: {bagCount}
          </Link>
        </div>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-7 rounded-full border border-[#ddc9c0] px-5 py-2.5 text-sm font-semibold text-[#382d2d] hover:bg-[#fffaf6]"
        >
          Sign out
        </button>
      </section>
    </main>
  )
}
