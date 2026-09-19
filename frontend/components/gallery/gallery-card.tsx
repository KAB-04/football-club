import { GalleryMedia } from '@/components/gallery/gallery-media'
import { Badge } from '@/components/ui/badge'
import type { GalleryItem } from '@/lib/data/types'
import { formatGalleryEventDate, getSafeExternalUrl } from '@/lib/formatters/gallery'

export function GalleryCard({ item }: { item: GalleryItem }) {
  const video = item.media_type === 'video'
  const destination = video ? getSafeExternalUrl(item.media_url) : null
  const imageUrl = getSafeExternalUrl(video ? item.thumbnail_url : item.media_url)
  const eventDate = getEventDate(item.event_date)

  return (
    <article className="flex h-full flex-col border border-border bg-surface">
      <GalleryMedia
        alt={item.alt_text || item.title}
        className="aspect-[4/3]"
        label={video ? 'Video' : 'Photo'}
        src={imageUrl}
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant={video ? 'brand' : 'neutral'}>{video ? 'Video' : 'Photo'}</Badge>
          {eventDate ? <time className="text-xs font-semibold text-muted-foreground" dateTime={item.event_date || undefined}>{eventDate}</time> : null}
        </div>
        <h2 className="text-card-title mt-4 break-words">{item.title}</h2>
        {item.description ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p> : null}
        {video ? (
          destination ? (
            <a className="mt-5 inline-flex min-h-11 items-center self-start border-b-2 border-success text-sm font-bold text-success hover:border-foreground hover:text-foreground" href={destination} rel="noopener noreferrer" target="_blank">
              Watch Video <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          ) : (
            <p className="mt-5 text-sm font-semibold text-muted-foreground">Video link unavailable</p>
          )
        ) : null}
      </div>
    </article>
  )
}

function getEventDate(value: string | null): string | null {
  if (!value) return null
  try {
    return formatGalleryEventDate(value)
  } catch {
    return null
  }
}
