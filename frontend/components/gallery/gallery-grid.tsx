import { GalleryCard } from '@/components/gallery/gallery-card'
import type { GalleryFilter } from '@/components/gallery/gallery-filters'
import { LinkButton } from '@/components/ui/button'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { GalleryItem } from '@/lib/data/types'

export function GalleryGrid({ items, filter }: { items: GalleryItem[] | null; filter: GalleryFilter }) {
  if (items === null) {
    return <ErrorState description="Gallery media is temporarily unavailable. Please try again later." title="Unable to load gallery" />
  }

  if (items.length === 0) {
    const filtered = filter !== 'all'
    return (
      <EmptyState
        action={filtered ? <LinkButton href="/gallery" variant="outline">View All</LinkButton> : undefined}
        description={filtered
          ? `No published ${filter === 'photo' ? 'photos' : 'videos'} are available yet.`
          : 'Published club photos and videos will appear here.'}
        title={filtered ? `No ${filter === 'photo' ? 'photos' : 'videos'} found` : 'No gallery items have been published yet'}
      />
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => <GalleryCard item={item} key={item.id} />)}
    </div>
  )
}
