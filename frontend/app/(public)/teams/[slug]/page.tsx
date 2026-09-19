import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { Container } from '@/components/layout/container'
import { TeamHero } from '@/components/teams/team-hero'
import { TeamNavigation } from '@/components/teams/team-navigation'
import { SquadSection } from '@/components/teams/squad-section'
import { ErrorState } from '@/components/ui/states'
import { getActivePlayersByTeamSlug } from '@/lib/data/players'
import { getTeamBySlug, getTeams } from '@/lib/data/teams'
import type { PlayerWithTeam, Team } from '@/lib/data/types'

type TeamPageProps = {
  params: Promise<{ slug: string }>
}

const getPublicTeam = cache(getTeamBySlug)

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const team = await getPublicTeam(slug)
    if (!team) return { title: 'Team Not Found | StandFast FC' }

    return {
      title: `${team.name} | StandFast FC`,
      description: team.description ||
        `Meet the active ${team.name} squad of StandFast Football Club in Ashaiman, Ghana.`,
    }
  } catch {
    return {
      title: 'StandFast FC Team',
      description: 'StandFast Football Club team information.',
    }
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params
  let team: Team | null

  try {
    team = await getPublicTeam(slug)
  } catch {
    return <TeamUnavailable />
  }

  if (!team) notFound()

  const [players, teams] = await Promise.all([
    loadPlayers(slug),
    loadTeamNavigation(),
  ])

  return (
    <>
      <TeamHero team={team} />
      {teams ? <TeamNavigation currentSlug={team.slug} teams={teams} /> : null}
      <SquadSection players={players} team={team} />
    </>
  )
}

async function loadPlayers(slug: string): Promise<PlayerWithTeam[] | null> {
  try {
    return await getActivePlayersByTeamSlug(slug)
  } catch {
    return null
  }
}

async function loadTeamNavigation(): Promise<Team[] | null> {
  try {
    return await getTeams()
  } catch {
    return null
  }
}

function TeamUnavailable() {
  return (
    <section className="flex min-h-[34rem] items-center bg-background py-16">
      <Container>
        <ErrorState
          description="Team information is temporarily unavailable. Please try again later."
          headingLevel="h1"
          title="Unable to load this team"
        />
      </Container>
    </section>
  )
}
