'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  Package,
} from 'lucide-react'
import { useLanguage, useFavorites, useBag } from '@/lib/context'
import { useAuth } from '@/lib/auth-context'
import { TRANSLATIONS } from '@/lib/translations'
import { COLLECTIONS, SPECIAL_COLLECTIONS } from '@/lib/collections'

export function SiteHeader() {
  const { language, toggleLanguage } = useLanguage()
  const { favoritesCount } = useFavorites()
  const { bagCount } = useBag()
  const { user, profile, signOut } = useAuth()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const t = TRANSLATIONS[language]
  const isLoggedIn = !!user
  const firstName = (profile?.full_name ?? user?.email ?? '').split(' ')[0]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/collections/all?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleLogout() {
    setUserMenuOpen(false)
    setMenuOpen(false)
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="bg-[#ef806f] px-4 py-2 text-center text-[11px] font-semibold tracking-[0.16em] text-white sm:text-xs">
        {t.topBanner}
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-[#f0ded8]/70 bg-[#fffaf6]/95 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-10">
          {/* Mobile hamburger menu toggle */}
          <button
            className="flex size-11 items-center justify-center rounded-full text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78] lg:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col leading-none focus:outline-none focus:ring-2 focus:ring-[#db6e78] rounded-lg p-1">
            <span className="font-serif text-[26px] font-semibold tracking-[-0.05em] text-[#db6e78]">
              વિશ્વા
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#6b5a54]">
              BABYWEAR · PALANPUR
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            <Link
              href="/collections"
              className="text-sm font-semibold text-[#db6e78] transition-colors hover:text-[#ef806f]"
            >
              {t.shop}
            </Link>
            <div className="group relative">
              <Link
                href="/collections"
                className="flex items-center gap-1 text-sm font-medium text-[#6b5a54] transition-colors hover:text-[#db6e78]"
              >
                <span>{language === 'ગુ' ? 'કલેક્શન્સ' : 'Collections'}</span>
                <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </Link>
              {/* Dropdown menu */}
              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="w-64 rounded-2xl border border-[#f0ded8] bg-[#fffaf6] p-3 shadow-xl">
                  {COLLECTIONS.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/collections/${c.slug}`}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50"
                    >
                      <span>{c.label}</span>
                      <span className="text-[11px] font-normal text-[#846e68]">{c.gujarati}</span>
                    </Link>
                  ))}
                  <div className="my-1.5 border-t border-[#f0ded8]" />
                  <Link
                    href="/collections/new-arrivals"
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-[#db6e78] transition-colors hover:bg-[#f7dcd4]/50"
                  >
                    <Sparkles size={13} />
                    <span>{t.newArrivals}</span>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/#story"
              className="text-sm font-medium text-[#6b5a54] transition-colors hover:text-[#db6e78]"
            >
              {t.story}
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-[#6b5a54] transition-colors hover:text-[#db6e78]"
            >
              {t.visit}
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex size-11 items-center justify-center rounded-full text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
              aria-label="Search items"
            >
              <Search size={19} strokeWidth={1.8} />
            </button>

            {/* Favorites Icon with Real Badge */}
            <Link
              href="/favorites"
              className="relative flex size-11 items-center justify-center rounded-full text-[#382d2d] transition-transform hover:scale-105 hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
              aria-label={`Favorites: ${favoritesCount} items`}
            >
              <Heart
                size={20}
                strokeWidth={1.8}
                fill={favoritesCount > 0 ? '#db6e78' : 'none'}
                color={favoritesCount > 0 ? '#db6e78' : '#382d2d'}
                className="transition-colors"
              />
              {favoritesCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-[#db6e78] text-[9px] font-bold text-white transition-all">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Bag Icon with Real Count */}
            <Link
              href="/cart"
              className="relative flex size-11 items-center justify-center rounded-full bg-[#382d2d] text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
              aria-label={`Shopping bag: ${bagCount} items`}
            >
              <ShoppingBag size={18} strokeWidth={1.9} />
              {bagCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#ef806f] text-[10px] font-bold text-white shadow-sm transition-all">
                  {bagCount}
                </span>
              )}
            </Link>

            {/* User Icon / Account dropdown */}
            <div className="relative" ref={userMenuRef}>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex size-11 items-center justify-center rounded-full border border-[#ebd9d3] text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
                    aria-label="Account menu"
                    aria-expanded={userMenuOpen}
                  >
                    <User size={18} strokeWidth={1.8} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[#f0ded8] bg-[#fffaf6] py-2 shadow-xl">
                      <div className="border-b border-[#f0ded8] px-4 py-2.5">
                        <p className="text-xs font-bold text-[#382d2d]">
                          {t.hiUser.replace('{name}', firstName)}
                        </p>
                        <p className="truncate text-[10px] text-[#846e68]">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#382d2d] hover:bg-[#f7dcd4]/40"
                      >
                        <User size={13} /> {t.myAccount}
                      </Link>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#382d2d] hover:bg-[#f7dcd4]/40"
                      >
                        <Package size={13} /> {t.myOrders}
                      </Link>
                      <div className="my-1 border-t border-[#f0ded8]" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50"
                      >
                        <LogOut size={13} /> {t.logoutButton}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex size-11 items-center justify-center rounded-full border border-[#ebd9d3] text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
                  aria-label="Login"
                >
                  <User size={18} strokeWidth={1.8} />
                </Link>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex h-11 items-center gap-1 rounded-full border border-[#ebd9d3] px-3.5 text-xs font-bold text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
              aria-label="Toggle language between English and Gujarati"
            >
              <span>{language === 'EN' ? 'ગુ' : 'EN'}</span>
              <ChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-[#f0ded8] bg-[#fffaf6] px-4 py-3 sm:px-6 lg:px-10">
            <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-2xl items-center gap-2">
              <div className="relative flex-1">
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#846e68]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  autoFocus
                  className="w-full rounded-full border border-[#ebd9d3] bg-white py-2.5 pl-10 pr-4 text-sm text-[#382d2d] outline-none transition focus:border-[#db6e78] focus:ring-2 focus:ring-[#db6e78]/20"
                />
              </div>
              <button
                type="submit"
                className="h-10 rounded-full bg-[#382d2d] px-5 text-xs font-bold text-white hover:bg-[#4a3b3b]"
              >
                {t.search}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="flex size-10 items-center justify-center rounded-full text-[#846e68] hover:bg-[#f7dcd4]/40"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="border-t border-[#f0ded8] bg-[#fffaf6] px-5 py-6 shadow-xl lg:hidden">
            <div className="mb-4 flex items-center justify-between border-b border-[#f0ded8] pb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#db6e78]">
                {language === 'ગુ' ? 'દુકાનના વિભાગો' : 'Browse Collections'}
              </p>
              <span className="text-xs text-[#846e68]">Palanpur Showroom</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex flex-col rounded-2xl ${c.bg} p-3 transition-transform active:scale-95`}
                >
                  <span className="text-lg text-[#76605a]">{c.icon}</span>
                  <span className="mt-1 font-serif text-base font-semibold">{c.label}</span>
                  <span className="text-[11px] text-[#846e68]">{c.gujarati}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-1 border-t border-[#f0ded8] pt-4">
              <Link
                href="/collections/new-arrivals"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#db6e78] hover:bg-[#f7dcd4]/40"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  {t.newArrivals}
                </span>
                <span className="text-xs font-normal">નવું આગમન</span>
              </Link>
              <Link
                href="/collections"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#382d2d] hover:bg-[#f7dcd4]/40"
              >
                {t.allCollections}
              </Link>
              <Link
                href="/#story"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b5a54] hover:bg-[#f7dcd4]/40"
              >
                {t.story}
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#6b5a54] hover:bg-[#f7dcd4]/40"
              >
                {t.visit}
              </Link>
            </div>

            {/* Auth section in mobile menu */}
            <div className="mt-4 flex flex-col gap-1 border-t border-[#f0ded8] pt-4">
              {isLoggedIn ? (
                <>
                  <div className="rounded-xl bg-[#f7dcd4]/30 px-3 py-2">
                    <p className="text-xs font-bold text-[#382d2d]">
                      {t.hiUser.replace('{name}', firstName)}
                    </p>
                    <p className="truncate text-[10px] text-[#846e68]">{user.email}</p>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#382d2d] hover:bg-[#f7dcd4]/40"
                  >
                    <User size={15} /> {t.myAccount}
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#382d2d] hover:bg-[#f7dcd4]/40"
                  >
                    <Package size={15} /> {t.myOrders}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={15} /> {t.logoutButton}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#db6e78] hover:bg-[#f7dcd4]/40"
                >
                  <User size={15} /> {language === 'ગુ' ? 'લૉગ ઇન' : 'Log in / Sign up'}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
