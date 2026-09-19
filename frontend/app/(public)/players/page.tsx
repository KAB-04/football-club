import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { PlayerResults } from '@/components/players/player-results'
import { PlayerSearchForm, type PlayerSearchValues } from '@/components/players/player-search-form'
import { searchActivePlayers } from '@/lib/data/players'
import type { PlayerWithTeam } from '@/lib/data/types'

export const metadata: Metadata = {
  title: 'StandFast FC Players',
  description: 'Explore active players across the U10, U13, U15 and U17 divisions of StandFast Football Club in Ashaiman, Ghana.',
}

type PlayersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PlayersPage({ searchParams }: PlayersPageProps) {
  const params = await searchParams
  const values: PlayerSearchValues = {
    name: normalizeTextParam(params.name),
    position: normalizeTextParam(params.position),
    age: normalizeTextParam(params.age, 10),
  }
  const parsedAge = parseAge(values.age)
  const ageError = values.age && parsedAge === undefined
    ? 'Enter a whole age from 0 to 120.'
    : undefined
  const filtered = Boolean(values.name || values.position || values.age)
  let players: PlayerWithTeam[] | null = null
  let positions: string[] = []

  try {
    const result = await searchActivePlayers({
      name: values.name || undefined,
      position: values.position || undefined,
      age: parsedAge,
    })
    players = result.players
    positions = result.positions
  } catch {
    // The data layer logs sanitized context; the public page keeps a distinct
    // unavailable state rather than presenting a failed query as zero results.
  }

  return (
    <>
      <section className="border-b border-border bg-structural py-14 text-structural-foreground sm:py-16">
        <Container>
          <p className="text-meta text-brand">Players</p>
          <h1 className="text-page-title mt-3 text-white">StandFast Players</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/70">
            Explore active players across StandFast FC&apos;s U10, U13, U15 and U17 divisions.
          </p>
        </Container>
      </section>
      <div className="bg-background py-12 sm:py-16">
        <Container>
          <PlayerSearchForm ageError={ageError} positions={positions} values={values} />
          <PlayerResults filtered={filtered} players={players} />
        </Container>
      </div>
    </>
  )
}

function normalizeTextParam(value: string | string[] | undefined, maxLength = 100) {
  const normalized = Array.isArray(value) ? value[0] : value
  return normalized?.trim().slice(0, maxLength) ?? ''
}

function parseAge(value: string): number | undefined {
  if (!/^\d{1,3}$/.test(value)) return undefined
  const age = Number(value)
  return age <= 120 ? age : undefined
}
