import 'server-only'

import { createClient } from '@/lib/supabase/server'

import { throwPublicDataError } from './errors'
import type { FixtureWithTeam } from './types'

const FIXTURE_WITH_TEAM_COLUMNS = `
  id, team_id, opponent_name, competition, match_date, venue,
  home_or_away, standfast_score, opponent_score, status, created_at, updated_at,
  team:teams!inner(id, name, slug)
`

function applyLimit<T extends { limit: (count: number) => T }>(query: T, limit?: number) {
  return limit === undefined ? query : query.limit(Math.max(1, Math.floor(limit)))
}

export async function getUpcomingFixtures(limit?: number): Promise<FixtureWithTeam[]> {
  const supabase = await createClient()
  let query = supabase
    .from('fixtures')
    .select(FIXTURE_WITH_TEAM_COLUMNS)
    .eq('status', 'scheduled')
    .gte('match_date', new Date().toISOString())
    .order('match_date', { ascending: true })

  query = applyLimit(query, limit)
  const { data, error } = await query

  if (error) throwPublicDataError('upcoming fixtures', error)
  return data
}

export async function getRecentResults(limit?: number): Promise<FixtureWithTeam[]> {
  const supabase = await createClient()
  let query = supabase
    .from('fixtures')
    .select(FIXTURE_WITH_TEAM_COLUMNS)
    .eq('status', 'completed')
    .order('match_date', { ascending: false })

  query = applyLimit(query, limit)
  const { data, error } = await query

  if (error) throwPublicDataError('recent results', error)
  return data
}

export async function getFixturesByTeamSlug(
  teamSlug: string,
): Promise<FixtureWithTeam[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('fixtures')
    .select(FIXTURE_WITH_TEAM_COLUMNS)
    .eq('team.slug', teamSlug)
    .order('match_date', { ascending: false })

  if (error) throwPublicDataError('team fixtures', error)
  return data
}
