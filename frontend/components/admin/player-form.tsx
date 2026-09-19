'use client'

import { useActionState } from 'react'

import { savePlayerAction, type PlayerFormValues } from '@/app/admin/(protected)/players/actions'
import { Button, LinkButton } from '@/components/ui/button'
import { FormError, Input, Label, Select } from '@/components/ui/form'
import type { Team } from '@/lib/data/types'

export function PlayerForm({ id, initialValues, teams }: { id: string | null; initialValues: PlayerFormValues; teams: Team[] }) {
  const [state, action, pending] = useActionState(savePlayerAction.bind(null, id), { values: initialValues, errors: {}, formError: null })
  const field = (name: keyof PlayerFormValues, label: string, input: React.ReactNode) => (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {input}
      {state.errors[name] ? <FormError className="mt-2" id={`${name}-error`}>{state.errors[name]}</FormError> : null}
    </div>
  )
  const inputProps = (name: keyof PlayerFormValues) => ({
    'aria-describedby': state.errors[name] ? `${name}-error` : undefined,
    'aria-invalid': Boolean(state.errors[name]), id: name, name, disabled: pending,
  })

  return (
    <form action={action} className="mt-8 space-y-8">
      {state.formError ? <FormError className="border-l-4 border-danger bg-surface p-4">{state.formError}</FormError> : null}
      <fieldset className="grid gap-5 border border-border bg-surface p-5 sm:grid-cols-2 sm:p-7" disabled={pending}>
        <legend className="px-2 text-label">Player profile</legend>
        {field('fullName', 'Full Name', <Input {...inputProps('fullName')} defaultValue={state.values.fullName} maxLength={120} required />)}
        {field('teamId', 'Team', <Select {...inputProps('teamId')} defaultValue={state.values.teamId} required><option value="">Select team</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</Select>)}
        {field('position', 'Position', <Input {...inputProps('position')} defaultValue={state.values.position} maxLength={60} placeholder="e.g. Goalkeeper" required />)}
        {field('jerseyNumber', 'Jersey Number', <Input {...inputProps('jerseyNumber')} defaultValue={state.values.jerseyNumber} min="1" placeholder="Not assigned" type="number" />)}
        {field('dateOfBirth', 'Date of Birth', <Input {...inputProps('dateOfBirth')} defaultValue={state.values.dateOfBirth} max={new Date().toISOString().slice(0, 10)} type="date" />)}
        {field('nationality', 'Nationality', <Input {...inputProps('nationality')} defaultValue={state.values.nationality} maxLength={80} />)}
        {field('strongFoot', 'Strong Foot', <Select {...inputProps('strongFoot')} defaultValue={state.values.strongFoot}><option value="">Not provided</option><option>Left</option><option>Right</option><option>Both</option></Select>)}
        {field('photoUrl', 'Photo URL', <Input {...inputProps('photoUrl')} defaultValue={state.values.photoUrl} placeholder="https://" type="url" />)}
        <p className="text-sm text-muted-foreground sm:col-span-2">Secure file upload will be added with the approved media storage integration. A photo is optional.</p>
      </fieldset>

      <fieldset className="grid gap-5 border border-border bg-surface p-5 sm:grid-cols-3 sm:p-7" disabled={pending}>
        <legend className="px-2 text-label">Statistics</legend>
        {field('appearances', 'Appearances', <Input {...inputProps('appearances')} defaultValue={state.values.appearances} min="0" required type="number" />)}
        {field('goals', 'Goals', <Input {...inputProps('goals')} defaultValue={state.values.goals} min="0" required type="number" />)}
        {field('assists', 'Assists', <Input {...inputProps('assists')} defaultValue={state.values.assists} min="0" required type="number" />)}
      </fieldset>

      <label className="flex min-h-12 items-center gap-3 border border-border bg-surface px-4 py-3 text-sm font-semibold">
        <input defaultChecked={state.values.isActive} disabled={pending} name="isActive" type="checkbox" /> Active player
      </label>

      <div className="flex flex-wrap gap-3">
        <Button disabled={pending} size="lg" type="submit">{pending ? 'Saving...' : id ? 'Update Player' : 'Create Player'}</Button>
        <LinkButton href="/admin/players" size="lg" variant="outline">Cancel</LinkButton>
      </div>
    </form>
  )
}
