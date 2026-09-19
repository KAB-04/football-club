import Link from 'next/link'

import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'
import { LinkButton } from '@/components/ui/button'
import type { Team } from '@/lib/data/types'

export function TeamHero({ team }: { team: Team }) {
  return (
    <section className="relative isolate overflow-hidden bg-structural text-structural-foreground">
      <Container className="relative flex min-h-[30rem] items-center py-16 sm:py-20">
        <div className="max-w-4xl">
          <Link className="text-meta text-brand hover:text-white" href="/teams">
            <span aria-hidden="true">←</span> All Teams
          </Link>
          <h1 className="text-display mt-6 text-white">{team.name}</h1>
          <p className="mt-3 text-xl font-bold text-brand">StandFast Football Club</p>
          {team.description ? (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              {team.description}
            </p>
          ) : null}
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-sm font-semibold text-white/65">
            <span>Ashaiman, Ghana</span>
            <span>Horse Power</span>
          </div>
          <div className="mt-8">
            <LinkButton
              className="border-white/35 text-white hover:border-brand hover:bg-transparent hover:text-brand"
              href="/fixtures"
              variant="outline"
            >
              Fixtures &amp; Results
            </LinkButton>
          </div>
        </div>
        <ClubLogo className="absolute -bottom-12 right-6 -z-10 w-72 opacity-[0.12] sm:w-96 lg:right-16 lg:w-[28rem] lg:opacity-20" priority />
      </Container>
      <div aria-hidden="true" className="h-2 bg-brand" />
    </section>
  )
}
