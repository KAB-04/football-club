import Link from 'next/link'

import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'

import { PublicNavigation } from './public-navigation'

export function PublicHeader({ leagueTableUrl }: { leagueTableUrl: string | null }) {
  return (
    <header className="relative z-40 border-b-4 border-brand bg-structural text-structural-foreground">
      <Container className="flex min-h-18 items-center justify-between gap-5">
        <Link
          aria-label="StandFast FC home"
          className="flex min-w-0 items-center gap-3 py-3"
          href="/"
        >
          <ClubLogo className="w-12 shrink-0" priority />
          <span className="min-w-0">
            <span className="block truncate text-lg font-black uppercase text-white">
              StandFast FC
            </span>
            <span className="text-meta block text-brand">Horse Power</span>
          </span>
        </Link>
        <PublicNavigation leagueTableUrl={leagueTableUrl} />
      </Container>
    </header>
  )
}
