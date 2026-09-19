'use client'

import { useFormStatus } from 'react-dom'

import { setPlayerStatusAction } from '@/app/admin/(protected)/players/actions'
import { Button } from '@/components/ui/button'

function Submit({ active }: { active: boolean }) {
  const { pending } = useFormStatus()
  return <Button disabled={pending} size="sm" type="submit" variant={active ? 'outline' : 'danger'}>{pending ? (active ? 'Reactivating...' : 'Deactivating...') : (active ? 'Reactivate' : 'Deactivate')}</Button>
}

export function PlayerStatusForm({ id, isActive }: { id: string; isActive: boolean }) {
  return (
    <form action={setPlayerStatusAction} onSubmit={(event) => {
      if (isActive && !window.confirm('Deactivate this player? They will leave the public active squad but remain in administration.')) event.preventDefault()
    }}>
      <input name="id" type="hidden" value={id} />
      <input name="active" type="hidden" value={String(!isActive)} />
      <Submit active={!isActive} />
    </form>
  )
}
