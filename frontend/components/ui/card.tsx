import type { HTMLAttributes } from 'react'

import { classNames } from '@/lib/class-names'

type SurfaceTone = 'default' | 'muted' | 'dark'

const tones: Record<SurfaceTone, string> = {
  default: 'border-border bg-surface text-foreground',
  muted: 'border-border bg-surface-muted text-foreground',
  dark: 'border-structural bg-structural text-structural-foreground',
}

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: SurfaceTone
}

export function Card({ className, tone = 'default', ...props }: CardProps) {
  return (
    <div
      className={classNames('rounded-sm border', tones[tone], className)}
      {...props}
    />
  )
}
