import type { Fixture } from '@/lib/data/types'

const GHANA_TIME_ZONE = 'Africa/Accra'
const CLUB_NAME = 'StandFast FC'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  timeZone: GHANA_TIME_ZONE,
  weekday: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
  timeZone: GHANA_TIME_ZONE,
})

export function formatMatchDate(matchDate: string): string {
  return dateFormatter.format(new Date(matchDate))
}

export function formatMatchTime(matchDate: string): string {
  return `${timeFormatter.format(new Date(matchDate))} GMT`
}

export function formatScore(
  fixture: Pick<Fixture, 'home_or_away' | 'opponent_name' | 'opponent_score' | 'standfast_score' | 'status'>,
): string | null {
  if (
    fixture.status !== 'completed' ||
    fixture.standfast_score === null ||
    fixture.opponent_score === null
  ) {
    return null
  }

  const { home, away } = getFixturePresentation(fixture)
  return `${home.score}-${away.score}`
}

export function getFixtureSides(
  fixture: Pick<Fixture, 'home_or_away' | 'opponent_name'>,
) {
  const { home, away } = getFixturePresentation(fixture)
  return { home: home.name, away: away.name }
}

export function getFixturePresentation(
  fixture: Pick<Fixture, 'home_or_away' | 'opponent_name'> &
    Partial<Pick<Fixture, 'opponent_score' | 'standfast_score'>>,
) {
  const standfast = { name: CLUB_NAME, score: fixture.standfast_score ?? null, standfast: true }
  const opponent = { name: fixture.opponent_name, score: fixture.opponent_score ?? null, standfast: false }

  return fixture.home_or_away === 'home'
    ? { home: standfast, away: opponent }
    : { home: opponent, away: standfast }
}

export function getResultOutcome(
  fixture: Pick<Fixture, 'opponent_score' | 'standfast_score' | 'status'>,
): 'Win' | 'Draw' | 'Loss' | null {
  if (
    fixture.status !== 'completed' ||
    fixture.standfast_score === null ||
    fixture.opponent_score === null
  ) return null

  if (fixture.standfast_score > fixture.opponent_score) return 'Win'
  if (fixture.standfast_score < fixture.opponent_score) return 'Loss'
  return 'Draw'
}
