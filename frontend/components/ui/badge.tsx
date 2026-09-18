import type { HTMLAttributes } from 'react'

import { classNames } from '@/lib/class-names'

type BadgeVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'danger'

const variants: Record<BadgeVariant, string> = {
  brand: 'border-brand bg-brand text-brand-foreground',
  neutral: 'border-border bg-surface-muted text-muted-foreground',
  success: 'border-success bg-success text-success-foreground',
  warning: 'border-warning bg-warning text-warning-foreground',
  danger: 'border-danger bg-danger text-danger-foreground',
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex min-h-6 items-center rounded-sm border px-2 py-0.5 text-xs font-bold',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
