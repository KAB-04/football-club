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
  fixture: Pick<Fixture, 'opponent_score' | 'standfast_score' | 'status'>,
): string | null {
  if (
    fixture.status !== 'completed' ||
    fixture.standfast_score === null ||
    fixture.opponent_score === null
  ) {
    return null
  }

  return `${fixture.standfast_score}–${fixture.opponent_score}`
}

export function getFixtureSides(
  fixture: Pick<Fixture, 'home_or_away' | 'opponent_name'>,
) {
  return fixture.home_or_away === 'home'
    ? { home: CLUB_NAME, away: fixture.opponent_name }
    : { home: fixture.opponent_name, away: CLUB_NAME }
}
