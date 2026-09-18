import 'server-only'

import { createClient } from '@/lib/supabase/server'

import { throwPublicDataError } from './errors'
import type { Team } from './types'

const TEAM_COLUMNS = 'id, name, slug, description, created_at, updated_at'

export async function getTeams(): Promise<Team[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('teams')
    .select(TEAM_COLUMNS)
    .order('name', { ascending: true })

  if (error) throwPublicDataError('teams', error)
  return data
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('teams')
    .select(TEAM_COLUMNS)
    .eq('slug', slug)
    .maybeSingle()

  if (error) throwPublicDataError('team', error)
  return data
}
