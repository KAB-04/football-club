'use client'

import { useActionState, useState } from 'react'
import { saveFixtureAction, type FixtureFormValues } from '@/app/admin/(protected)/fixtures/actions'
import { Button, LinkButton } from '@/components/ui/button'
import { FormError, Input, Label, Select } from '@/components/ui/form'
import type { Team } from '@/lib/data/types'

export function FixtureForm({ id, initialValues, teams }: { id: string | null; initialValues: FixtureFormValues; teams: Team[] }) {
  const [state, action, pending] = useActionState(saveFixtureAction.bind(null, id), { values: initialValues, errors: {}, formError: null })
  const [status, setStatus] = useState(initialValues.status)
  const input = (name: keyof FixtureFormValues) => ({ id:name, name, disabled:pending, 'aria-invalid':Boolean(state.errors[name]), 'aria-describedby':state.errors[name]?`${name}-error`:undefined })
  const field=(name:keyof FixtureFormValues,label:string,node:React.ReactNode)=><div><Label htmlFor={name}>{label}</Label>{node}{state.errors[name]?<FormError className="mt-2" id={`${name}-error`}>{state.errors[name]}</FormError>:null}</div>
  return <form action={action} className="mt-8 space-y-8">
    {state.formError?<FormError className="border-l-4 border-danger bg-surface p-4">{state.formError}</FormError>:null}
    <fieldset className="grid gap-5 border border-border bg-surface p-5 sm:grid-cols-2 sm:p-7" disabled={pending}><legend className="px-2 text-label">Match details</legend>
      {field('teamId','StandFast Team',<Select {...input('teamId')} defaultValue={state.values.teamId} required><option value="">Select team</option>{teams.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</Select>)}
      {field('opponent','Opponent',<Input {...input('opponent')} defaultValue={state.values.opponent} maxLength={120} required />)}
      {field('competition','Competition',<Input {...input('competition')} defaultValue={state.values.competition} maxLength={120} />)}
      {field('venue','Venue',<Input {...input('venue')} defaultValue={state.values.venue} maxLength={160} />)}
      {field('matchDate','Match Date and Kickoff Time (GMT)',<Input {...input('matchDate')} defaultValue={state.values.matchDate} required type="datetime-local" />)}
      {field('homeOrAway','Home / Away',<Select {...input('homeOrAway')} defaultValue={state.values.homeOrAway} required><option value="home">Home</option><option value="away">Away</option></Select>)}
      {field('status','Status',<Select {...input('status')} defaultValue={state.values.status} onChange={e=>setStatus(e.target.value)} required><option value="scheduled">Scheduled</option><option value="completed">Completed</option><option value="postponed">Postponed</option><option value="cancelled">Cancelled</option></Select>)}
    </fieldset>
    {status==='completed'?<fieldset className="grid gap-5 border border-border bg-surface p-5 sm:grid-cols-2 sm:p-7" disabled={pending}><legend className="px-2 text-label">Final result</legend>
      {field('standfastScore','StandFast Score',<Input {...input('standfastScore')} defaultValue={state.values.standfastScore} min="0" required type="number" />)}
      {field('opponentScore','Opponent Score',<Input {...input('opponentScore')} defaultValue={state.values.opponentScore} min="0" required type="number" />)}
    </fieldset>:<><input name="standfastScore" type="hidden" value=""/><input name="opponentScore" type="hidden" value=""/></>}
    <div className="flex flex-wrap gap-3"><Button disabled={pending} size="lg" type="submit">{pending?'Saving...':id?'Update Fixture':'Create Fixture'}</Button><LinkButton href="/admin/fixtures" size="lg" variant="outline">Cancel</LinkButton></div>
  </form>
}
