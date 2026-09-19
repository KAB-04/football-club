import { Card } from '@/components/ui/card'

type StatCardProps = {
  label: string
  value: number | null
}

export function StatCard({ label, value }: StatCardProps) {
  const unavailable = value === null

  return (
    <Card className="flex min-h-36 flex-col justify-between p-5">
      <p className="text-meta text-muted-foreground">{label}</p>
      <div className="mt-6">
        <p className="text-3xl font-black tabular-nums" aria-label={unavailable ? `${label} unavailable` : undefined}>
          {unavailable ? '-' : value}
        </p>
        {unavailable ? <p className="mt-1 text-xs text-warning">Unavailable</p> : null}
      </div>
    </Card>
  )
}
