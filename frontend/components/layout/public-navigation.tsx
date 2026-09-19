'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  publicNavigation,
  teamNavigation,
  type NavigationItem,
} from '@/lib/navigation'

function isActive(pathname: string, item: NavigationItem) {
  return item.match === '/'
    ? pathname === '/'
    : pathname === item.match || pathname.startsWith(`${item.match}/`)
}

function ExternalMark() {
  return <span aria-hidden="true">↗</span>
}

export function PublicNavigation({ leagueTableUrl }: { leagueTableUrl: string | null }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileTeamsOpen, setMobileTeamsOpen] = useState(false)
  const [desktopTeamsOpen, setDesktopTeamsOpen] = useState(false)

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setDesktopTeamsOpen(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  function closeMenus() {
    setMobileOpen(false)
    setDesktopTeamsOpen(false)
  }

  const navLinkClass = (item: NavigationItem) =>
    `flex min-h-11 items-center border-b-2 px-2 text-xs font-bold uppercase transition-colors ${
      isActive(pathname, item)
        ? 'border-brand text-brand'
        : 'border-transparent text-white hover:text-brand'
    }`

  return (
    <>
      <nav aria-label="Primary" className="hidden xl:block">
        <ul className="flex items-center gap-1">
          {publicNavigation.map((item) =>
            item.match === '/teams' ? (
              <li className="relative flex items-center" key={item.href}>
                <Link
                  aria-current={isActive(pathname, item) ? 'page' : undefined}
                  className={navLinkClass(item)}
                  href={item.href}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
                <button
                  aria-controls="desktop-teams-menu"
                  aria-expanded={desktopTeamsOpen}
                  aria-label="Toggle Teams menu"
                  className="flex size-9 items-center justify-center text-white hover:text-brand"
                  onClick={() => setDesktopTeamsOpen((open) => !open)}
                  type="button"
                >
                  <span aria-hidden="true" className={desktopTeamsOpen ? 'rotate-180' : ''}>
                    ▾
                  </span>
                </button>
                {desktopTeamsOpen ? (
                  <ul
                    className="absolute right-0 top-full z-30 min-w-40 border border-border bg-surface py-2 text-foreground shadow-lg"
                    id="desktop-teams-menu"
                  >
                    {teamNavigation.map((team) => (
                      <li key={team.href}>
                        <Link
                          className="block px-4 py-3 text-sm font-semibold hover:bg-surface-muted hover:text-success"
                          href={team.href}
                          onClick={closeMenus}
                        >
                          {team.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  aria-current={isActive(pathname, item) ? 'page' : undefined}
                  className={navLinkClass(item)}
                  href={item.href}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
          <li className="ml-1">
            {leagueTableUrl ? (
              <a
                className="flex min-h-11 items-center gap-1 px-2 text-xs font-bold uppercase text-white hover:text-brand"
                href={leagueTableUrl}
                rel="noreferrer"
                target="_blank"
              >
                League Table <ExternalMark />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="flex min-h-11 cursor-not-allowed items-center gap-1 px-2 text-xs font-bold uppercase text-white/45"
                title="League table link is not yet available"
              >
                League Table <ExternalMark />
              </span>
            )}
          </li>
        </ul>
      </nav>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="absolute right-5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white hover:border-brand hover:text-brand sm:right-8 lg:right-10 xl:hidden"
        onClick={() => setMobileOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </span>
      </button>

      {mobileOpen ? (
        <nav
          aria-label="Mobile primary"
          className="absolute inset-x-0 top-full z-30 max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/15 bg-structural px-5 pb-6 shadow-xl xl:hidden"
          id="mobile-navigation"
        >
          <ul className="mx-auto max-w-[var(--content-max)] divide-y divide-white/10">
            {publicNavigation.map((item) =>
              item.match === '/teams' ? (
                <li key={item.href}>
                  <div className="flex items-center">
                    <Link
                      aria-current={isActive(pathname, item) ? 'page' : undefined}
                      className={`flex min-h-12 flex-1 items-center text-sm font-bold uppercase ${isActive(pathname, item) ? 'text-brand' : 'text-white'}`}
                      href={item.href}
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                    <button
                      aria-controls="mobile-teams-menu"
                      aria-expanded={mobileTeamsOpen}
                      className="flex size-11 items-center justify-center border border-white/20 text-white"
                      onClick={() => setMobileTeamsOpen((open) => !open)}
                      type="button"
                    >
                      <span className="sr-only">Toggle team links</span>
                      <span aria-hidden="true">{mobileTeamsOpen ? '−' : '+'}</span>
                    </button>
                  </div>
                  {mobileTeamsOpen ? (
                    <ul className="mb-3 border-l-2 border-brand pl-4" id="mobile-teams-menu">
                      {teamNavigation.map((team) => (
                        <li key={team.href}>
                          <Link className="flex min-h-11 items-center text-sm font-semibold text-white/80 hover:text-brand" href={team.href} onClick={closeMenus}>
                            {team.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    aria-current={isActive(pathname, item) ? 'page' : undefined}
                    className={`flex min-h-12 items-center text-sm font-bold uppercase ${isActive(pathname, item) ? 'text-brand' : 'text-white'}`}
                    href={item.href}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <span
                aria-disabled="true"
                className="flex min-h-12 cursor-not-allowed items-center gap-1 text-sm font-bold uppercase text-white/45"
              >
                League Table <ExternalMark /> <span className="normal-case">(unavailable)</span>
              </span>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  )
}
