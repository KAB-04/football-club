import { Button, LinkButton } from '@/components/ui/button'
import { FormError, Input, Label, Select } from '@/components/ui/form'

export type PlayerSearchValues = {
  name: string
  position: string
  age: string
}

export function PlayerSearchForm({
  values,
  positions,
  ageError,
}: {
  values: PlayerSearchValues
  positions: string[]
  ageError?: string
}) {
  return (
    <form action="/players" className="border border-border bg-surface p-5 sm:p-7" method="get">
      <div className="grid gap-5 md:grid-cols-[1.4fr_1fr_0.65fr]">
        <div>
          <Label htmlFor="player-name">Player Name</Label>
          <Input defaultValue={values.name} id="player-name" maxLength={100} name="name" placeholder="Search by name" type="search" />
        </div>
        <div>
          <Label htmlFor="player-position">Position</Label>
          <Select defaultValue={values.position} id="player-position" name="position">
            <option value="">All positions</option>
            {positions.map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="player-age">Age</Label>
          <Input
            aria-describedby={ageError ? 'player-age-error' : undefined}
            aria-invalid={ageError ? true : undefined}
            defaultValue={values.age}
            id="player-age"
            inputMode="numeric"
            max="120"
            min="0"
            name="age"
            placeholder="Any age"
            type="number"
          />
          {ageError ? <FormError className="mt-2" id="player-age-error">{ageError}</FormError> : null}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit">Apply Filters</Button>
        <LinkButton href="/players" variant="outline">Clear Filters</LinkButton>
      </div>
    </form>
  )
}
