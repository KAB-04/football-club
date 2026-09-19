import Link from 'next/link'

import { classNames } from '@/lib/class-names'

export type GalleryFilter = 'all' | 'photo' | 'video'

const filters: Array<{ label: string; value: GalleryFilter; href: string }> = [
  { label: 'All', value: 'all', href: '/gallery' },
  { label: 'Photos', value: 'photo', href: '/gallery?type=photo' },
  { label: 'Videos', value: 'video', href: '/gallery?type=video' },
]

export function GalleryFilters({ active }: { active: GalleryFilter }) {
  return (
    <nav aria-label="Gallery filters">
      <ul className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const current = active === filter.value
          return (
            <li key={filter.value}>
              <Link
                aria-current={current ? 'page' : undefined}
                className={classNames(
                  'inline-flex min-h-11 items-center border px-4 text-sm font-bold transition-colors',
                  current
                    ? 'border-structural bg-structural text-white'
                    : 'border-border bg-surface text-foreground hover:border-success hover:text-success',
                )}
                href={filter.href}
              >
                {filter.label}{current ? <span className="sr-only"> (current)</span> : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
