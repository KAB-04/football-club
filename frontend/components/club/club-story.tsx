import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/ui/section-heading'

export function ClubStory() {
  return (
    <>
      <section className="bg-background py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="StandFast FC"
            title="One club, four age divisions"
          />
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              Standfast Football Club is a football club in Ashaiman,
              Ghana. Its current structure brings together U10, U13, U15
              and U17 teams under the StandFast FC public identity.
            </p>
            <p>
              This website provides one place for confirmed information
              about the club, its teams, players, fixtures, results, news
              and activities as that content is published.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="story-heading" className="border-y border-border bg-surface py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="text-meta text-success">Club history</p>
            <h2 className="text-section-title mt-3" id="story-heading">Our Story</h2>
          </div>
          <div className="border-l-4 border-brand pl-6 sm:pl-8">
            <p className="text-xl font-bold leading-8 text-foreground sm:text-2xl">
              The full story of StandFast FC is being documented.
            </p>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Approved historical details will be added here when they are
              supplied by the club. This space is reserved for the club&apos;s
              own account, without assumptions or invented milestones.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}

export function ClubIdentity() {
  return (
    <section aria-labelledby="identity-heading" className="relative isolate overflow-hidden bg-structural py-20 text-structural-foreground sm:py-24">
      <Container className="relative">
        <p className="text-meta text-brand">Club identity</p>
        <h2 className="mt-4 text-5xl font-black text-white sm:text-7xl lg:text-8xl" id="identity-heading">
          Horse Power
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          The words carried by the StandFast crest and shared across every
          age division.
        </p>
        <div aria-hidden="true" className="absolute -bottom-24 right-0 text-[11rem] font-black leading-none text-white/[0.035] sm:text-[16rem]">
          SF
        </div>
      </Container>
    </section>
  )
}
