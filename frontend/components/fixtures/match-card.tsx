import Link from 'next/link'

import { ClubLogo } from '@/components/branding/club-logo'
import { Badge } from '@/components/ui/badge'
import type { FixtureWithTeam } from '@/lib/data/types'
import { formatMatchDate, formatMatchTime, getFixturePresentation, getResultOutcome } from '@/lib/formatters/fixtures'

export function MatchCard({ fixture }: { fixture: FixtureWithTeam }) {
  const completed = fixture.status === 'completed'
  const sides = getFixturePresentation(fixture)
  const outcome = getResultOutcome(fixture)

  return (
    <article className="border border-border bg-surface">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <Link className="text-sm font-bold text-success hover:text-foreground" href={`/teams/${fixture.team.slug}`}>
          {fixture.team.name}
        </Link>
        <div className="flex items-center gap-2">
          {outcome ? <Badge variant={outcome === 'Win' ? 'success' : outcome === 'Loss' ? 'danger' : 'neutral'}>{outcome}</Badge> : null}
          <Badge variant={completed ? 'neutral' : 'brand'}>{completed ? 'Completed' : 'Scheduled'}</Badge>
        </div>
      </header>
      <div className="px-5 py-6 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-bold text-foreground">{formatMatchDate(fixture.match_date)}</p>
          {!completed ? <p className="text-sm font-semibold text-muted-foreground">{formatMatchTime(fixture.match_date)}</p> : null}
        </div>
        <div className="mt-6 divide-y divide-border border-y border-border">
          <MatchSide label="Home" side={sides.home} showScore={completed} />
          <MatchSide label="Away" side={sides.away} showScore={completed} />
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {fixture.competition ? <span>{fixture.competition}</span> : null}
          {fixture.venue ? <span>{fixture.venue}</span> : null}
        </div>
      </div>
    </article>
  )
}

type MatchSideData = ReturnType<typeof getFixturePresentation>['home']

function MatchSide({ label, side, showScore }: { label: 'Home' | 'Away'; side: MatchSideData; showScore: boolean }) {
  return (
    <div className="grid min-h-20 grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
      <span className="text-meta text-muted-foreground">{label}</span>
      <div className="flex min-w-0 items-center gap-3">
        {side.standfast ? (
          <ClubLogo className="w-9 shrink-0" />
        ) : (
          <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-black text-muted-foreground">
            {getInitials(side.name)}
          </span>
        )}
        <span className="break-words font-bold text-foreground">{side.name}</span>
      </div>
      {showScore ? (
        <strong aria-label={`${side.name}, ${side.score} goals`} className="pl-2 text-3xl font-black tabular-nums text-foreground">
          {side.score}
        </strong>
      ) : null}
    </div>
  )
}

function getInitials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'OP'
}
