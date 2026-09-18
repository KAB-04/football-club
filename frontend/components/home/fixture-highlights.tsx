import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { FixtureWithTeam } from '@/lib/data/types'
import {
  formatMatchDate,
  formatMatchTime,
  formatScore,
  getFixtureSides,
} from '@/lib/formatters/fixtures'

type FixtureHighlightsProps = {
  nextFixture: FixtureWithTeam | null
  latestResult: FixtureWithTeam | null
  nextFixtureUnavailable: boolean
  latestResultUnavailable: boolean
}

export function FixtureHighlights({
  nextFixture,
  latestResult,
  nextFixtureUnavailable,
  latestResultUnavailable,
}: FixtureHighlightsProps) {
  return (
    <section aria-labelledby="fixtures-heading" className="bg-background py-14 sm:py-18">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-meta text-success">Match centre</p>
            <h2 className="text-section-title mt-2" id="fixtures-heading">Fixtures &amp; Results</h2>
          </div>
          <Link className="text-sm font-bold text-success hover:text-foreground" href="/fixtures">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {nextFixtureUnavailable ? (
            <ErrorState description="Fixture information is temporarily unavailable." title="Next match" />
          ) : nextFixture ? (
            <FixturePanel fixture={nextFixture} label="Next match" />
          ) : (
            <EmptyState
              description="No upcoming fixture has been announced yet."
              title="Next match"
            />
          )}
          {latestResultUnavailable ? (
            <ErrorState description="Result information is temporarily unavailable." title="Latest result" />
          ) : latestResult ? (
            <FixturePanel fixture={latestResult} label="Latest result" result />
          ) : (
            <EmptyState
              description="No completed result is available yet."
              title="Latest result"
            />
          )}
        </div>
      </Container>
    </section>
  )
}

function FixturePanel({
  fixture,
  label,
  result = false,
}: {
  fixture: FixtureWithTeam
  label: string
  result?: boolean
}) {
  const sides = getFixtureSides(fixture)
  const score = formatScore(fixture)

  return (
    <article className="border border-border bg-surface">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
        <p className="text-meta text-success">{label}</p>
        <p className="text-xs font-semibold text-muted-foreground">{fixture.team.name}</p>
      </div>
      <div className="px-5 py-7 sm:px-7 sm:py-9">
        <p className="text-center text-sm text-muted-foreground">
          {fixture.competition || formatMatchDate(fixture.match_date)}
        </p>
        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
          <p className="text-card-title">{sides.home}</p>
          <p className="text-2xl font-black text-foreground">
            {result && score ? score : <span className="text-sm text-muted-foreground">vs</span>}
          </p>
          <p className="text-card-title">{sides.away}</p>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>{formatMatchDate(fixture.match_date)}</span>
          {!result ? <span>{formatMatchTime(fixture.match_date)}</span> : null}
          {fixture.venue ? <span>{fixture.venue}</span> : null}
        </div>
      </div>
    </article>
  )
}
