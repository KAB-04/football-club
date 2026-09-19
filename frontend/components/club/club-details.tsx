import { Container } from '@/components/layout/container'
import { LinkButton } from '@/components/ui/button'

const clubFacts = [
  ['Official name', 'Standfast Football Club'],
  ['Public identity', 'StandFast FC'],
  ['Location', 'Ashaiman, Ghana'],
  ['Motto', 'Horse Power'],
  ['Teams', 'U10, U13, U15, U17'],
  ['Email', 'standfastfc@gmail.com'],
] as const

export function ClubDetails() {
  return (
    <>
      <section aria-labelledby="details-heading" className="border-y border-border bg-surface py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-meta text-success">Where we are</p>
            <h2 className="text-section-title mt-2" id="details-heading">Ashaiman, Ghana</h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              StandFast Football Club is based in Ashaiman. More detailed
              venue information will be published when it is confirmed by
              the club.
            </p>
            <a className="mt-6 inline-flex font-bold text-success hover:text-foreground" href="mailto:standfastfc@gmail.com">
              standfastfc@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-card-title">Club information</h2>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              {clubFacts.map(([label, value]) => (
                <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr]" key={label}>
                  <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
                  <dd className="font-semibold text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-brand py-14 text-brand-foreground sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div>
            <p className="text-meta">StandFast FC</p>
            <h2 className="text-section-title mt-2">Explore the club on the pitch.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/teams" variant="secondary">Explore Our Teams</LinkButton>
            <LinkButton href="/fixtures" variant="outline">Fixtures &amp; Results</LinkButton>
            <LinkButton href="/contact" variant="ghost">Contact the Club</LinkButton>
          </div>
        </Container>
      </section>
    </>
  )
}
