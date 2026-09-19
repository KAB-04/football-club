'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentAdmin } from '@/lib/auth/admin'
import { adminTeamExists, createAdminPlayer, setAdminPlayerActive, updateAdminPlayer } from '@/lib/data/admin/players'

export type PlayerFormValues = {
  fullName: string; teamId: string; jerseyNumber: string; position: string
  dateOfBirth: string; nationality: string; strongFoot: string; appearances: string
  goals: string; assists: string; photoUrl: string; isActive: boolean
}
export type PlayerFormState = { values: PlayerFormValues; errors: Record<string, string>; formError: string | null }

export async function savePlayerAction(id: string | null, _state: PlayerFormState, formData: FormData): Promise<PlayerFormState> {
  const values = readValues(formData)
  const errors = validate(values)
  if (Object.keys(errors).length) return { values, errors, formError: null }

  const admin = await getCurrentAdmin().catch(() => null)
  if (!admin) return { values, errors: {}, formError: 'Your administrator session is not authorized.' }

  try {
    if (!(await adminTeamExists(values.teamId))) return { values, errors: { teamId: 'Select an available team.' }, formError: null }
    const payload = {
      full_name: values.fullName.trim(), team_id: values.teamId,
      jersey_number: nullableInteger(values.jerseyNumber), position: values.position.trim(),
      date_of_birth: values.dateOfBirth || null, nationality: nullableText(values.nationality),
      strong_foot: nullableText(values.strongFoot), appearances: Number(values.appearances),
      goals: Number(values.goals), assists: Number(values.assists), photo_url: nullableText(values.photoUrl),
      is_active: values.isActive,
    }
    const player = id ? await updateAdminPlayer(id, payload) : await createAdminPlayer(payload)
    revalidatePlayerRoutes(player.slug)
  } catch {
    return { values, errors: {}, formError: 'The player could not be saved. Please try again.' }
  }

  redirect(`/admin/players?success=${id ? 'updated' : 'created'}`)
}

export async function setPlayerStatusAction(formData: FormData) {
  const admin = await getCurrentAdmin().catch(() => null)
  if (!admin) redirect('/admin/login')
  const id = stringValue(formData, 'id')
  const active = stringValue(formData, 'active') === 'true'
  if (!isUuid(id)) redirect('/admin/players?error=status')
  try {
    const player = await setAdminPlayerActive(id, active)
    revalidatePlayerRoutes(player.slug)
  } catch {
    redirect('/admin/players?error=status')
  }
  redirect(`/admin/players?success=${active ? 'reactivated' : 'deactivated'}`)
}

function readValues(data: FormData): PlayerFormValues {
  return {
    fullName: stringValue(data, 'fullName'), teamId: stringValue(data, 'teamId'),
    jerseyNumber: stringValue(data, 'jerseyNumber'), position: stringValue(data, 'position'),
    dateOfBirth: stringValue(data, 'dateOfBirth'), nationality: stringValue(data, 'nationality'),
    strongFoot: stringValue(data, 'strongFoot'), appearances: stringValue(data, 'appearances'),
    goals: stringValue(data, 'goals'), assists: stringValue(data, 'assists'), photoUrl: stringValue(data, 'photoUrl'),
    isActive: data.get('isActive') === 'on',
  }
}

function validate(v: PlayerFormValues) {
  const e: Record<string, string> = {}
  if (!v.fullName.trim()) e.fullName = 'Enter the player full name.'
  else if (v.fullName.trim().length > 120) e.fullName = 'Use 120 characters or fewer.'
  if (!isUuid(v.teamId)) e.teamId = 'Select a team.'
  if (!v.position.trim()) e.position = 'Enter a position.'
  else if (v.position.trim().length > 60) e.position = 'Use 60 characters or fewer.'
  if (v.jerseyNumber && (!isInteger(v.jerseyNumber) || Number(v.jerseyNumber) <= 0)) e.jerseyNumber = 'Use a positive whole number or leave blank.'
  if (v.dateOfBirth && !validDate(v.dateOfBirth)) e.dateOfBirth = 'Enter a valid date of birth.'
  if (v.nationality.length > 80) e.nationality = 'Use 80 characters or fewer.'
  if (v.strongFoot && !['Left', 'Right', 'Both'].includes(v.strongFoot)) e.strongFoot = 'Select Left, Right or Both.'
  for (const key of ['appearances', 'goals', 'assists'] as const) if (!isInteger(v[key]) || Number(v[key]) < 0) e[key] = 'Use a nonnegative whole number.'
  if (v.photoUrl) try { const url = new URL(v.photoUrl); if (!['http:', 'https:'].includes(url.protocol)) throw new Error() } catch { e.photoUrl = 'Enter a valid HTTP or HTTPS image URL.' }
  return e
}

function stringValue(data: FormData, key: string) { const value = data.get(key); return typeof value === 'string' ? value.trim() : '' }
function nullableText(value: string) { return value || null }
function nullableInteger(value: string) { return value ? Number(value) : null }
function isInteger(value: string) { return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) }
function isUuid(value: string) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) }
function validDate(value: string) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value); if (!m) return false; const d = new Date(`${value}T00:00:00Z`); return !Number.isNaN(d.valueOf()) && d.toISOString().startsWith(value) && d <= new Date() }
function revalidatePlayerRoutes(slug: string) { for (const path of ['/admin/players', '/admin/dashboard', '/players', '/teams', `/players/${slug}`, '/']) revalidatePath(path) }
