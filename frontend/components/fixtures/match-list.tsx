import { MatchCard } from '@/components/fixtures/match-card'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { FixtureWithTeam } from '@/lib/data/types'

export function MatchList({ fixtures, type }: { fixtures: FixtureWithTeam[] | null; type: 'upcoming' | 'results' }) {
  const upcoming = type === 'upcoming'

  if (fixtures === null) {
    return (
      <ErrorState
        className="mt-8"
        description={`${upcoming ? 'Fixture' : 'Result'} information is temporarily unavailable. Please try again later.`}
        title={`Unable to load ${upcoming ? 'upcoming fixtures' : 'recent results'}`}
      />
    )
  }

  if (fixtures.length === 0) {
    return (
      <EmptyState
        className="mt-8"
        description={upcoming ? 'No upcoming fixtures have been published.' : 'No results have been published yet.'}
        title={upcoming ? 'No upcoming fixtures' : 'No recent results'}
      />
    )
  }

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {fixtures.map((fixture) => <MatchCard fixture={fixture} key={fixture.id} />)}
    </div>
  )
}
