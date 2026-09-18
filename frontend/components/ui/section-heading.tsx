import type { ReactNode } from 'react'

import { classNames } from '@/lib/class-names'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'text-center sm:block',
        className,
      )}
    >
      <div className={classNames('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? <p className="text-meta mb-2 text-success">{eyebrow}</p> : null}
        <h2 className="text-section-title text-foreground">{title}</h2>
        {description ? (
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
