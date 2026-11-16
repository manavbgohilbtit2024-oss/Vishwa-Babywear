'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminShellProps {
  email: string
  children: React.ReactNode
}

export function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (nav: typeof NAV[0]) => {
    if (nav.exact) return pathname === nav.href
    return pathname.startsWith(nav.href)
  }

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col gap-1" aria-label="Admin navigation">
      {NAV.map((item) => {
        const active = isActive(item)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-[#382d2d] text-white'
                : 'text-[#5a4a44] hover:bg-[#f0e9e4] hover:text-[#382d2d]'
            }`}
          >
            <item.icon size={18} aria-hidden />
            <span>{item.label}</span>
            {active && <ChevronRight size={14} className="ml-auto opacity-60" aria-hidden />}
          </Link>
        )
      })}
    </nav>
  )

  const UserBar = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className={`border-t border-[#eaded6] pt-4 ${collapsed ? 'mt-4' : 'mt-auto'}`}>
      <p className="truncate text-xs text-[#846e68] mb-2 px-3" title={email}>
        Logged in as<br />
        <span className="font-semibold text-[#382d2d]">{email}</span>
      </p>
      <form action="/auth/signout" method="post">
        <input type="hidden" name="next" value="/admin/login" />
        <button
          type="submit"
          className="flex min-h-[44px] w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#5a4a44] hover:bg-[#f7dcd4] hover:text-[#382d2d] transition-colors"
          aria-label="Log out of admin"
        >
          <LogOut size={18} aria-hidden />
          Log out
        </button>
      </form>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#fffaf6] text-[#382d2d]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-shrink-0 md:flex-col md:border-r md:border-[#eaded6] md:bg-[#faf5f0]">
        <div className="flex flex-col h-full p-4">
          <div className="mb-6">
            <Link href="/admin" className="block">
              <p className="font-serif text-xl font-bold text-[#382d2d]">Vishwa Admin</p>
              <p className="text-xs text-[#846e68]">Store management</p>
            </Link>
          </div>
          <NavLinks />
          <UserBar />
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-[#eaded6] bg-[#faf5f0]/95 backdrop-blur-sm px-4 py-3">
          <Link href="/admin" className="font-serif text-lg font-bold text-[#382d2d]">
            Vishwa Admin
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex size-11 items-center justify-center rounded-xl border border-[#eaded6] text-[#382d2d]"
            aria-label="Open admin menu"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Mobile Drawer Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#faf5f0] p-5 flex flex-col shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="font-serif text-lg font-bold">Vishwa Admin</p>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex size-11 items-center justify-center rounded-xl border border-[#eaded6]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <NavLinks onClick={() => setMobileOpen(false)} />
              <UserBar collapsed />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
