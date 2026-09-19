import type { ReactNode } from 'react'

import { classNames } from '@/lib/class-names'

type StateProps = {
  title: string
  description?: string
  action?: ReactNode
  className?: string
  headingLevel?: 'h1' | 'h2' | 'h3'
}

function StateMessage({ title, description, action, className, headingLevel = 'h3' }: StateProps) {
  const Heading = headingLevel
  return (
    <div
      className={classNames(
        'rounded-sm border border-border bg-surface px-5 py-8 text-center',
        className,
      )}
    >
      <Heading className="text-card-title text-foreground">{title}</Heading>
      {description ? (
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

export function LoadingState({
  title = 'Loading',
  description,
  className,
}: Partial<StateProps>) {
  return (
    <div aria-busy="true" aria-live="polite">
      <StateMessage
        className={className}
        description={description}
        title={title}
      />
    </div>
  )
}

export function EmptyState(props: StateProps) {
  return <StateMessage {...props} />
}

export function ErrorState(props: StateProps) {
  return (
    <div role="alert">
      <StateMessage
        {...props}
        className={classNames('border-danger/40', props.className)}
      />
    </div>
  )
}
