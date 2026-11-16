'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  AuthButton,
  AuthCard,
  AuthInput,
  AuthUnavailable,
} from '@/components/AuthCard'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/context'
import { TRANSLATIONS } from '@/lib/translations'

export default function LoginPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = TRANSLATIONS[language]
  const supabase = createClient()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  if (!supabase) {
    return (
      <AuthCard tagline="સ્વાગત છે">
        <AuthUnavailable
          title="Account sign-in is unavailable"
          desc="You can still browse, save favorites, and keep a shopping bag on this device. Contact the shop if you need account help."
        />
        <GuestCheckoutLink
          label={t.continueAsGuestCheckout}
          description={t.guestCheckoutAvailable}
        />
      </AuthCard>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setError('')
    setNotice('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName.trim() } },
        })
        if (authError) throw authError
        if (data.session) {
          router.replace(getSafeNextPath())
        } else {
          setNotice(`${t.checkEmailTitle} ${t.checkEmailDesc} ${email}.`)
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
        router.replace(getSafeNextPath())
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError, t.authConnectionError))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard tagline="સ્વાગત છે">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-[#382d2d]">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-1 text-sm text-[#846e68]">
          {mode === 'login' ? 'Sign in to your Vishwa Babywear account.' : 'Save your details for next time.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <AuthInput
            id="full-name"
            label="Full name"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        )}
        <AuthInput
          id="email"
          type="email"
          label="Email address"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <AuthInput
          id="password"
          type="password"
          label="Password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}
        <AuthButton type="submit" loading={loading}>
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </AuthButton>
      </form>

      <p className="mt-5 border-t border-[#f0ded8] pt-4 text-center text-xs leading-5 text-[#846e68]">
        {t.googleProviderUnavailable}
      </p>

      <div className="mt-5 text-center text-sm text-[#846e68]">
        {mode === 'login' ? 'New to Vishwa Babywear?' : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login')
            setError('')
            setNotice('')
          }}
          className="font-semibold text-[#db6e78] hover:underline"
        >
          {mode === 'login' ? 'Create account' : 'Sign in'}
        </button>
      </div>

      <GuestCheckoutLink
        label={t.continueAsGuestCheckout}
        description={t.guestCheckoutAvailable}
      />

      <p className="mt-6 border-t border-[#f0ded8] pt-5 text-center text-xs text-[#846e68]">
        <Link href="/" className="font-semibold text-[#db6e78] hover:underline">
          Continue shopping
        </Link>
      </p>
    </AuthCard>
  )
}

function GuestCheckoutLink({ label, description }: { label: string; description: string }) {
  return (
    <div className="mt-5 border-t border-[#f0ded8] pt-5 text-center">
      <p className="mb-3 text-xs text-[#846e68]">{description}</p>
      <Link
        href="/checkout"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#382d2d] px-5 text-sm font-semibold text-[#382d2d] transition-colors hover:bg-[#f7dcd4]/50 focus:outline-none focus:ring-2 focus:ring-[#db6e78]"
      >
        {label}
      </Link>
    </div>
  )
}

function getAuthErrorMessage(error: unknown, connectionError: string): string {
  if (error instanceof TypeError && /fetch|network/i.test(error.message)) return connectionError
  if (error instanceof Error && /failed to fetch|network error/i.test(error.message)) return connectionError
  return error instanceof Error ? error.message : 'Unable to continue. Please try again.'
}

function getSafeNextPath(): string {
  const requestedPath = new URLSearchParams(window.location.search).get('next')
  return requestedPath?.startsWith('/') && !requestedPath.startsWith('//') ? requestedPath : '/'
}
