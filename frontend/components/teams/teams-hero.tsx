import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'

export function TeamsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-structural text-structural-foreground">
      <Container className="relative flex min-h-[31rem] items-center py-16 sm:py-20">
        <div className="max-w-4xl">
          <p className="text-meta text-brand">Our Teams</p>
          <h1 className="text-display mt-5 text-white">StandFast Teams</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            StandFast FC currently has four age-group divisions: U10,
            U13, U15 and U17.
          </p>
        </div>

        <div aria-hidden="true" className="absolute -bottom-16 right-8 text-[16rem] font-black leading-none text-white/[0.04] sm:text-[22rem] lg:right-20">
          04
        </div>
        <ClubLogo className="absolute bottom-10 right-10 hidden w-40 opacity-20 lg:block" />
      </Container>
      <div aria-hidden="true" className="h-2 bg-brand" />
    </section>
  )
}
