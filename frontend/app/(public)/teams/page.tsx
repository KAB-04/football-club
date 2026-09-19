import type { Metadata } from 'next'

import { TeamsHero } from '@/components/teams/teams-hero'
import { TeamsOverview } from '@/components/teams/teams-overview'
import { getTeams } from '@/lib/data/teams'
import type { Team } from '@/lib/data/types'

export const metadata: Metadata = {
  title: 'StandFast FC Teams',
  description:
    'Explore the U10, U13, U15 and U17 teams of StandFast Football Club in Ashaiman, Ghana.',
}

export default async function TeamsPage() {
  let teams: Team[] | null = null

  try {
    teams = await getTeams()
  } catch {
    // Sanitized query context is logged in the data layer. The public route
    // stays available with an explicit unavailable state.
  }

  return (
    <>
      <TeamsHero />
      <TeamsOverview teams={teams} />
    </>
  )
}
