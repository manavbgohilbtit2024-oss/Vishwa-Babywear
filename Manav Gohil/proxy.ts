// proxy.ts — Session-refresh proxy for Next.js App Router.
// In Next 16 this file replaces middleware.ts for Supabase SSR token refresh.
// It intercepts every navigation request, refreshes the Supabase session,
// and protects /account by redirecting logged-out users to /login?next=...
//
// Place this file at the project root (same level as package.json).

import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

/** Paths that require authentication */
const PROTECTED_PATHS = ['/account']

export async function proxy(request: NextRequest) {
  // If Supabase is not configured, pass through silently.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresh session — IMPORTANT: do not run arbitrary code between createServerClient and getUser.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname, searchParams } = request.nextUrl

  // Guard protected paths
  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p)) && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''))
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const middleware = proxy

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
