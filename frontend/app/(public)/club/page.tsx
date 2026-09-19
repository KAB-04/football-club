import type { Metadata } from 'next'

import { ClubDetails } from '@/components/club/club-details'
import { ClubHero } from '@/components/club/club-hero'
import { ClubIdentity, ClubStory } from '@/components/club/club-story'
import { ClubTeams } from '@/components/club/club-teams'
import { getTeams } from '@/lib/data/teams'
import type { Team } from '@/lib/data/types'

export const metadata: Metadata = {
  title: 'The Club | StandFast FC',
  description:
    'Learn about StandFast Football Club in Ashaiman, Ghana, its Horse Power identity and U10, U13, U15 and U17 teams.',
}

export default async function ClubPage() {
  let teams: Team[] | null = null

  try {
    teams = await getTeams()
  } catch {
    // The data layer logs sanitized query context. Confirmed club identity
    // remains available while the database-backed directory is unavailable.
  }

  return (
    <>
      <ClubHero />
      <ClubStory />
      <ClubIdentity />
      <ClubTeams teams={teams} />
      <ClubDetails />
    </>
  )
}
