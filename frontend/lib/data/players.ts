import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { getDateOfBirthBoundsForAge } from '@/lib/formatters/player'

import { throwPublicDataError } from './errors'
import type { PlayerWithTeam } from './types'

const PLAYER_WITH_TEAM_COLUMNS = `
  id, team_id, full_name, slug, photo_url, jersey_number, position,
  date_of_birth, nationality, strong_foot, appearances, goals, assists,
  is_active, created_at, updated_at,
  team:teams!inner(id, name, slug)
`

export type ActivePlayerSearchFilters = {
  name?: string
  position?: string
  age?: number
  referenceDate?: Date
}

export type ActivePlayerSearchResult = {
  players: PlayerWithTeam[]
  positions: string[]
}

export async function getActivePlayers(limit?: number): Promise<PlayerWithTeam[]> {
  const supabase = await createClient()
  let query = supabase
    .from('players')
    .select(PLAYER_WITH_TEAM_COLUMNS)
    .eq('is_active', true)
    .order('full_name', { ascending: true })

  if (limit !== undefined) {
    query = query.limit(Math.max(1, Math.floor(limit)))
  }

  const { data, error } = await query
  if (error) throwPublicDataError('players', error)
  return data
}

export async function getActivePlayersByTeamSlug(
  teamSlug: string,
): Promise<PlayerWithTeam[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('players')
    .select(PLAYER_WITH_TEAM_COLUMNS)
    .eq('is_active', true)
    .eq('team.slug', teamSlug)
    .order('jersey_number', { ascending: true, nullsFirst: false })
    .order('full_name', { ascending: true })

  if (error) throwPublicDataError('team players', error)
  return data
}

export async function getPlayerBySlug(
  slug: string,
): Promise<PlayerWithTeam | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('players')
    .select(PLAYER_WITH_TEAM_COLUMNS)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error) throwPublicDataError('player', error)
  return data
}

export async function searchActivePlayers(
  filters: ActivePlayerSearchFilters,
): Promise<ActivePlayerSearchResult> {
  const supabase = await createClient()
  let playersQuery = supabase
    .from('players')
    .select(PLAYER_WITH_TEAM_COLUMNS)
    .eq('is_active', true)
    .order('full_name', { ascending: true })

  if (filters.name) {
    playersQuery = playersQuery.ilike('full_name', `%${escapeLikePattern(filters.name)}%`)
  }

  if (filters.position) {
    playersQuery = playersQuery.eq('position', filters.position)
  }

  if (filters.age !== undefined) {
    const bounds = getDateOfBirthBoundsForAge(filters.age, filters.referenceDate)
    playersQuery = playersQuery
      .gt('date_of_birth', bounds.after)
      .lte('date_of_birth', bounds.onOrBefore)
  }

  const positionsQuery = supabase
    .from('players')
    .select('position')
    .eq('is_active', true)
    .order('position', { ascending: true })

  const [playersResult, positionsResult] = await Promise.all([
    playersQuery,
    positionsQuery,
  ])

  if (playersResult.error) throwPublicDataError('player search', playersResult.error)
  if (positionsResult.error) throwPublicDataError('player positions', positionsResult.error)

  const positions = [...new Set(
    positionsResult.data
      .map(({ position }) => position.trim())
      .filter(Boolean),
  )]

  return { players: playersResult.data, positions }
}

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, '\\$&')
}
