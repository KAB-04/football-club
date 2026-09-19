'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logoutAction } from '@/app/admin/(protected)/actions'
import { ClubLogo } from '@/components/branding/club-logo'
import { Button } from '@/components/ui/button'
import { classNames } from '@/lib/class-names'

const navigation = [
  { href: '/admin/dashboard', label: 'Dashboard', available: true },
  { href: '/admin/players', label: 'Players', available: true },
  { href: '/admin/fixtures', label: 'Fixtures & Results', available: true },
  { href: '/admin/news', label: 'News', available: true },
  { href: '/admin/gallery', label: 'Gallery', available: true },
  { href: '/admin/messages', label: 'Messages', available: true },
  { href: '/admin/settings', label: 'Settings', available: true },
] as const

function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Administration" className="space-y-1">
      {navigation.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return item.available ? (
          <Link
            aria-current={active ? 'page' : undefined}
            className={classNames(
              'flex min-h-11 items-center justify-between border-l-4 px-4 py-2 text-sm font-semibold transition-colors',
              active
                ? 'border-brand bg-white/10 text-white'
                : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white',
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            <span>{item.label}</span>
            {active ? <span className="sr-only">Current page</span> : null}
          </Link>
        ) : (
          <div
            aria-disabled="true"
            className="flex min-h-11 items-center justify-between border-l-4 border-transparent px-4 py-2 text-sm text-white/45"
            key={item.href}
          >
            <span>{item.label}</span>
            <span className="text-[0.625rem] font-bold uppercase text-white/50">Soon</span>
          </div>
        )
      })}
    </nav>
  )
}

function AdminActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-2 border-t border-white/15 pt-4">
      <Link
        className="flex min-h-11 items-center px-4 text-sm font-semibold text-white/75 hover:text-brand"
        href="/"
        onClick={onNavigate}
      >
        View Public Website
      </Link>
      <form action={logoutAction}>
        <Button
          className="w-full justify-start border-white/25 px-4 text-white hover:border-brand hover:bg-transparent hover:text-brand"
          type="submit"
          variant="outline"
        >
          Log Out
        </Button>
      </form>
    </div>
  )
}

function AdminIdentity({ name }: { name: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <ClubLogo className="w-11 shrink-0" priority />
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-white">StandFast FC</p>
        <p className="text-[0.6875rem] font-bold uppercase text-brand">Administration</p>
        <p className="mt-1 truncate text-xs text-white/60">{name}</p>
      </div>
    </div>
  )
}

export function AdminShell({ children, name }: { children: React.ReactNode; name: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="hidden min-h-screen bg-structural px-4 py-6 text-structural-foreground lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="px-2"><AdminIdentity name={name} /></div>
        <div className="mt-9 flex min-h-0 flex-1 flex-col justify-between gap-6 overflow-y-auto">
          <AdminNav />
          <AdminActions />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
          <div className="min-w-0 lg:hidden">
            <p className="truncate text-sm font-bold">StandFast FC Administration</p>
            <p className="truncate text-xs text-muted-foreground">{name}</p>
          </div>
          <p className="hidden text-sm font-semibold text-muted-foreground lg:block">Club Content Management</p>
          <Button
            aria-controls="admin-mobile-navigation"
            aria-expanded={open}
            aria-label={open ? 'Close administration menu' : 'Open administration menu'}
            className="lg:hidden"
            onClick={() => setOpen((current) => !current)}
            size="sm"
            variant="outline"
          >
            {open ? 'Close' : 'Menu'}
          </Button>
        </header>

        {open ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              aria-label="Close administration menu"
              className="absolute inset-0 bg-black/55"
              onClick={() => setOpen(false)}
              type="button"
            />
            <aside
              aria-label="Mobile administration menu"
              aria-modal="true"
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-structural p-5 text-structural-foreground shadow-2xl"
              id="admin-mobile-navigation"
              role="dialog"
            >
              <div className="flex items-start justify-between gap-4">
                <AdminIdentity name={name} />
                <Button
                  aria-label="Close administration menu"
                  autoFocus
                  className="border-white/25 text-white hover:border-brand hover:bg-transparent hover:text-brand"
                  onClick={() => setOpen(false)}
                  size="sm"
                  variant="outline"
                >
                  Close
                </Button>
              </div>
              <div className="mt-8 flex min-h-0 flex-1 flex-col justify-between gap-6 overflow-y-auto">
                <AdminNav onNavigate={() => setOpen(false)} />
                <AdminActions onNavigate={() => setOpen(false)} />
              </div>
            </aside>
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}
