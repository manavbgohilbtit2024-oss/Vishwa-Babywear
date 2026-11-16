'use client'

// Shared warm auth card layout used by login, signup, forgot-password and reset-password pages.

import React from 'react'
import Link from 'next/link'

interface AuthCardProps {
  children: React.ReactNode
  /** Gujarati tagline shown below the wordmark */
  tagline?: string
}

export function AuthCard({ children, tagline }: AuthCardProps) {
  return (
    <main className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">
        {/* Wordmark */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex flex-col items-center leading-none focus:outline-none focus:ring-2 focus:ring-[#db6e78] rounded-lg p-1"
          >
            <span className="font-serif text-[34px] font-semibold tracking-[-0.05em] text-[#db6e78]">
              વિશ્વા
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#6b5a54]">
              BABYWEAR · PALANPUR
            </span>
          </Link>
          {tagline && (
            <p className="mt-3 text-sm text-[#846e68] italic">{tagline}</p>
          )}
        </div>

        {/* Card */}
        <div className="rounded-[28px] border border-[#f0ded8] bg-white px-7 py-8 shadow-[0_4px_32px_rgba(56,45,45,0.07)] sm:px-10 sm:py-10">
          {children}
        </div>
      </div>
    </main>
  )
}

/** Reusable labelled input */
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  rightElement?: React.ReactNode
}

export function AuthInput({ label, error, rightElement, id, ...props }: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-[#382d2d]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`h-11 w-full rounded-xl border bg-[#fffaf6] px-4 text-sm text-[#382d2d] outline-none transition focus:ring-2 ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
              : 'border-[#ebd9d3] focus:border-[#db6e78] focus:ring-[#db6e78]/20'
          } ${rightElement ? 'pr-11' : ''}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p role="alert" aria-live="polite" className="mt-1 text-[11px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

/** Primary submit button with spinner */
interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export function AuthButton({ loading, children, disabled, ...props }: AuthButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#382d2d] text-sm font-bold text-white transition-all hover:bg-[#4a3b3b] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#db6e78] focus:ring-offset-2"
      {...props}
    >
      {loading && (
        <svg
          className="size-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

/** Divider with "or" text */
export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="relative my-5 flex items-center">
      <div className="flex-1 border-t border-[#f0ded8]" />
      <span className="mx-3 text-xs text-[#846e68]">{label}</span>
      <div className="flex-1 border-t border-[#f0ded8]" />
    </div>
  )
}

/** Google sign-in button */
export function GoogleButton({ onClick, disabled, label }: { onClick?: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-[#ebd9d3] bg-white text-sm font-semibold text-[#382d2d] transition-all hover:bg-[#f7dcd4]/30 hover:border-[#db6e78] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#db6e78] focus:ring-offset-2"
    >
      {/* Google G logo SVG */}
      <svg viewBox="0 0 48 48" className="size-4 flex-none" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.2 0 5.7 1.1 7.6 2.9l5.7-5.7C33.7 3.5 29.2 1.5 24 1.5 14.8 1.5 7 7.3 3.9 15.3l6.7 5.2C12.3 14.2 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.2 24.6c0-1.6-.1-2.7-.4-3.9H24v7.5h12.7c-.3 1.8-1.3 4.5-3.8 6.3l5.9 4.6C42.7 35.6 46.2 30.7 46.2 24.6z"/>
        <path fill="#FBBC05" d="M10.6 28.6A14.4 14.4 0 019.5 24c0-1.6.3-3.2.7-4.6l-6.7-5.2A22.3 22.3 0 001.5 24c0 3.6.9 7 2.4 10z"/>
        <path fill="#34A853" d="M24 46.5c5.2 0 9.5-1.7 12.7-4.6l-5.9-4.6c-1.7 1.1-3.9 1.9-6.8 1.9-6.3 0-11.7-4.7-13.4-11L4 33.4C7 41.5 14.8 46.5 24 46.5z"/>
      </svg>
      {label}
    </button>
  )
}

/** "Login isn't available" fallback card for when Supabase is unconfigured */
export function AuthUnavailable({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#ddc9c0] bg-white p-8 text-center sm:p-12">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#f7dcd4]/50 text-[#ef806f]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-7" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h1 className="font-serif text-2xl font-semibold text-[#382d2d]">{title}</h1>
      <p className="mt-2 text-sm text-[#846e68]">{desc}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#ebd9d3] bg-[#fffaf6] px-6 py-3 text-xs font-bold text-[#382d2d] hover:border-[#db6e78]"
      >
        ← Back to shop
      </Link>
    </div>
  )
}
