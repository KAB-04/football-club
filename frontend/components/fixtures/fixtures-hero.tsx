import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'

export function FixturesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b-2 border-brand bg-structural py-14 text-structural-foreground sm:py-16">
      <Container className="relative">
        <div className="max-w-3xl">
          <p className="text-meta text-brand">Match centre</p>
          <h1 className="text-page-title mt-3 text-white">Fixtures &amp; Results</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/70">
            Follow upcoming and completed StandFast FC matches across the club&apos;s U10, U13, U15 and U17 divisions.
          </p>
        </div>
        <ClubLogo className="absolute -bottom-24 right-5 -z-10 w-64 opacity-10 sm:right-8 sm:w-80 lg:right-10" priority />
      </Container>
    </section>
  )
}
