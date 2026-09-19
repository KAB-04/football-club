import 'server-only'

import { createClient } from '@/lib/supabase/server'
import type { FixtureWithTeam } from '@/lib/data/types'
import type { Database } from '@/types/database'

const COLUMNS = `id, team_id, opponent_name, competition, match_date, venue,
home_or_away, standfast_score, opponent_score, status, created_at, updated_at,
team:teams!inner(id, name, slug)`

export class AdminFixtureDataError extends Error {}
export type FixtureStatus = 'scheduled' | 'completed' | 'postponed' | 'cancelled'
export type AdminFixtureFilters = { team?: string; status?: FixtureStatus }
export type FixtureWriteValues = Database['public']['Tables']['fixtures']['Insert']

export async function getAdminFixtures(filters: AdminFixtureFilters): Promise<FixtureWithTeam[]> {
  const supabase = await createClient()
  let query = supabase.from('fixtures').select(COLUMNS).order('match_date', { ascending: false }).order('id')
  if (filters.team) query = query.eq('team.slug', filters.team)
  if (filters.status) query = query.eq('status', filters.status)
  const { data, error } = await query
  if (error) throw new AdminFixtureDataError('Fixtures unavailable')
  return data
}

export async function getAdminFixtureById(id: string): Promise<FixtureWithTeam | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('fixtures').select(COLUMNS).eq('id', id).maybeSingle()
  if (error) throw new AdminFixtureDataError('Fixture unavailable')
  return data
}

export async function createAdminFixture(values: FixtureWriteValues) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('fixtures').insert(values).select('id').single()
  if (error) throw new AdminFixtureDataError('Create failed')
  return data
}

export async function updateAdminFixture(id: string, values: FixtureWriteValues) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('fixtures').update(values).eq('id', id).select('id').single()
  if (error) throw new AdminFixtureDataError('Update failed')
  return data
}
