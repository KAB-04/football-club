import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { Container } from '@/components/layout/container'
import { PlayerDetails } from '@/components/players/player-details'
import { PlayerProfileHero } from '@/components/players/player-profile-hero'
import { PlayerStats } from '@/components/players/player-stats'
import { LinkButton } from '@/components/ui/button'
import { ErrorState } from '@/components/ui/states'
import { getPlayerBySlug } from '@/lib/data/players'

type PlayerPageProps = {
  params: Promise<{ slug: string }>
}

const getPublicPlayer = cache(getPlayerBySlug)

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const player = await getPublicPlayer(slug)
    if (!player) return { title: 'Player Not Found | StandFast FC' }

    const context = [player.position, player.team.name].filter(Boolean).join(' for ')
    return {
      title: `${player.full_name} | StandFast FC`,
      description: `${player.full_name}${context ? `, ${context}` : ''} at StandFast Football Club.`,
    }
  } catch {
    return {
      title: 'StandFast FC Player',
      description: 'StandFast Football Club player profile.',
    }
  }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { slug } = await params
  let player

  try {
    player = await getPublicPlayer(slug)
  } catch {
    return <PlayerUnavailable />
  }

  if (!player) notFound()

  return (
    <article>
      <PlayerProfileHero player={player} />
      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:py-20">
        <PlayerDetails player={player} />
        <PlayerStats player={player} />
      </Container>
      <section className="border-t border-border bg-surface-muted py-10">
        <Container className="flex flex-wrap gap-3">
          <LinkButton href={`/teams/${player.team.slug}`}>Back to {player.team.name}</LinkButton>
          <LinkButton href="/teams" variant="outline">View Teams</LinkButton>
          <LinkButton href="/fixtures" variant="outline">Fixtures &amp; Results</LinkButton>
        </Container>
      </section>
    </article>
  )
}

function PlayerUnavailable() {
  return (
    <section className="flex min-h-[34rem] items-center bg-background py-16">
      <Container>
        <ErrorState
          action={<Link href="/teams" className="font-semibold text-success hover:text-foreground">View teams</Link>}
          description="Player information is temporarily unavailable. Please try again later."
          headingLevel="h1"
          title="Unable to load this player"
        />
      </Container>
    </section>
  )
}
