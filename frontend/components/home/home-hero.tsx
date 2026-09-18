import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'
import { LinkButton } from '@/components/ui/button'

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-structural text-structural-foreground">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-white/10 bg-white/[0.025] lg:block" />
      <Container className="relative flex min-h-[38rem] items-center py-16 sm:py-20 lg:min-h-[42rem]">
        <div className="max-w-4xl">
          <p className="text-meta text-brand">Ashaiman, Ghana</p>
          <h1 className="text-display mt-5 max-w-4xl text-white">
            StandFast Football Club
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            Home of StandFast FC&apos;s U10, U13, U15 and U17 teams.
            One club, one identity: Horse Power.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/teams" size="lg">Explore Our Teams</LinkButton>
            <LinkButton
              className="border-white/35 text-white hover:border-brand hover:bg-transparent hover:text-brand"
              href="/fixtures"
              size="lg"
              variant="outline"
            >
              Fixtures &amp; Results
            </LinkButton>
          </div>
        </div>

        <ClubLogo
          className="absolute -bottom-12 -right-12 -z-10 w-72 opacity-[0.12] sm:w-96 lg:bottom-10 lg:right-10 lg:w-[30rem] lg:opacity-20"
          priority
        />
      </Container>
      <div aria-hidden="true" className="h-2 bg-brand" />
    </section>
  )
}
