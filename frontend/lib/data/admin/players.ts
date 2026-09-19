import 'server-only'

import { createClient } from '@/lib/supabase/server'
import type { PlayerWithTeam, Team } from '@/lib/data/types'
import type { Database } from '@/types/database'

const PLAYER_COLUMNS = `
  id, team_id, full_name, slug, photo_url, jersey_number, position,
  date_of_birth, nationality, strong_foot, appearances, goals, assists,
  is_active, created_at, updated_at,
  team:teams!inner(id, name, slug)
`

export class AdminPlayerDataError extends Error {}

export type AdminPlayerFilters = {
  name?: string
  team?: string
  status?: 'active' | 'inactive'
}

export type PlayerWriteValues = Omit<Database['public']['Tables']['players']['Insert'], 'slug'>

export async function getAdminPlayers(filters: AdminPlayerFilters): Promise<PlayerWithTeam[]> {
  const supabase = await createClient()
  let query = supabase.from('players').select(PLAYER_COLUMNS).order('full_name')

  if (filters.name) query = query.ilike('full_name', `%${escapeLike(filters.name)}%`)
  if (filters.team) query = query.eq('team.slug', filters.team)
  if (filters.status) query = query.eq('is_active', filters.status === 'active')

  const { data, error } = await query
  if (error) throw new AdminPlayerDataError('Players are unavailable.')
  return data
}

export async function getAdminPlayerById(id: string): Promise<PlayerWithTeam | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('players').select(PLAYER_COLUMNS).eq('id', id).maybeSingle()
  if (error) throw new AdminPlayerDataError('Player is unavailable.')
  return data
}

export async function getAdminTeams(): Promise<Team[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('teams').select('id, name, slug, description, created_at, updated_at').order('name')
  if (error) throw new AdminPlayerDataError('Teams are unavailable.')
  return data
}

export async function createAdminPlayer(values: PlayerWriteValues) {
  const supabase = await createClient()
  const base = slugify(values.full_name) || 'player'
  let slug = base
  let available = false

  for (let suffix = 1; suffix <= 100; suffix += 1) {
    const { data, error } = await supabase.from('players').select('id').eq('slug', slug).maybeSingle()
    if (error) throw new AdminPlayerDataError('Unable to create player.')
    if (!data) {
      available = true
      break
    }
    slug = `${base}-${suffix + 1}`
  }
  if (!available) throw new AdminPlayerDataError('Unable to create player.')

  const { data, error } = await supabase.from('players').insert({ ...values, slug }).select('id, slug').single()
  if (error) throw new AdminPlayerDataError('Unable to create player.')
  return data
}

export async function updateAdminPlayer(id: string, values: PlayerWriteValues) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('players').update(values).eq('id', id).select('id, slug').single()
  if (error) throw new AdminPlayerDataError('Unable to update player.')
  return data
}

export async function setAdminPlayerActive(id: string, isActive: boolean) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('players').update({ is_active: isActive }).eq('id', id).select('id, slug').single()
  if (error) throw new AdminPlayerDataError('Unable to update player status.')
  return data
}

export async function adminTeamExists(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('teams').select('id').eq('id', id).maybeSingle()
  if (error) throw new AdminPlayerDataError('Unable to validate team.')
  return Boolean(data)
}

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, '\\$&')
}

function slugify(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
