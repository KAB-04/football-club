'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/auth/admin'
import { adminTeamExists } from '@/lib/data/admin/players'
import { createAdminFixture, updateAdminFixture } from '@/lib/data/admin/fixtures'
import { ghanaInputToTimestamp } from '@/lib/formatters/admin-fixture'

export type FixtureFormValues = { teamId: string; opponent: string; competition: string; matchDate: string; venue: string; homeOrAway: string; status: string; standfastScore: string; opponentScore: string }
export type FixtureFormState = { values: FixtureFormValues; errors: Record<string, string>; formError: string | null }

export async function saveFixtureAction(id: string | null, _state: FixtureFormState, data: FormData): Promise<FixtureFormState> {
  const values = read(data); const errors = validate(values)
  if (Object.keys(errors).length) return { values, errors, formError: null }
  const admin = await getCurrentAdmin().catch(() => null)
  if (!admin) return { values, errors: {}, formError: 'Your administrator session is not authorized.' }
  try {
    if (!(await adminTeamExists(values.teamId))) return { values, errors: { teamId: 'Select an available team.' }, formError: null }
    const completed = values.status === 'completed'
    const payload = { team_id: values.teamId, opponent_name: values.opponent.trim(), competition: optional(values.competition), match_date: ghanaInputToTimestamp(values.matchDate)!, venue: optional(values.venue), home_or_away: values.homeOrAway, status: values.status, standfast_score: completed ? Number(values.standfastScore) : null, opponent_score: completed ? Number(values.opponentScore) : null }
    if (id) await updateAdminFixture(id, payload); else await createAdminFixture(payload)
    for (const path of ['/admin/fixtures', '/admin/dashboard', '/fixtures', '/']) revalidatePath(path)
  } catch { return { values, errors: {}, formError: 'The fixture could not be saved. Please try again.' } }
  redirect(`/admin/fixtures?success=${successCode(id, values.status)}`)
}

function read(d: FormData): FixtureFormValues { const s=(k:string)=>typeof d.get(k)==='string'?String(d.get(k)).trim():''; return { teamId:s('teamId'), opponent:s('opponent'), competition:s('competition'), matchDate:s('matchDate'), venue:s('venue'), homeOrAway:s('homeOrAway'), status:s('status'), standfastScore:s('standfastScore'), opponentScore:s('opponentScore') } }
function validate(v: FixtureFormValues) { const e:Record<string,string>={}; if(!uuid(v.teamId))e.teamId='Select a team.'; if(!v.opponent)e.opponent='Enter the opponent name.'; else if(v.opponent.length>120)e.opponent='Use 120 characters or fewer.'; if(v.competition.length>120)e.competition='Use 120 characters or fewer.'; if(v.venue.length>160)e.venue='Use 160 characters or fewer.'; if(!ghanaInputToTimestamp(v.matchDate))e.matchDate='Enter a valid match date and time.'; if(!['home','away'].includes(v.homeOrAway))e.homeOrAway='Select Home or Away.'; if(!['scheduled','completed','postponed','cancelled'].includes(v.status))e.status='Select a valid status.'; if(v.status==='completed'){if(!score(v.standfastScore))e.standfastScore='Enter a nonnegative whole number.';if(!score(v.opponentScore))e.opponentScore='Enter a nonnegative whole number.'} return e }
function score(v:string){return /^\d+$/.test(v)&&Number.isSafeInteger(Number(v))} function uuid(v:string){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)} function optional(v:string){return v||null}
function successCode(id:string|null,status:string){if(!id)return'created';if(status==='completed')return'result';if(status==='postponed')return'postponed';if(status==='cancelled')return'cancelled';return'updated'}
