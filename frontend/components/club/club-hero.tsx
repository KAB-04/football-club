import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'

export function ClubHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-surface">
      <Container className="grid min-h-[34rem] items-center gap-10 py-16 lg:grid-cols-[1fr_22rem] lg:py-20">
        <div className="relative z-10 max-w-4xl">
          <p className="text-meta text-success">The Club</p>
          <h1 className="text-display mt-5 text-foreground">
            StandFast Football Club
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground">
            StandFast FC is based in Ashaiman, Ghana, and represented by
            four age divisions: U10, U13, U15 and U17.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-l-4 border-brand pl-5">
            <span className="font-bold text-foreground">Ashaiman, Ghana</span>
            <span className="font-bold text-success">Horse Power</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div aria-hidden="true" className="absolute -inset-6 -z-10 border border-border bg-background" />
          <ClubLogo className="w-full" priority />
        </div>
      </Container>
    </section>
  )
}
