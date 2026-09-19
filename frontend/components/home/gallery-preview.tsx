import Link from 'next/link'

import { GalleryMedia } from '@/components/gallery/gallery-media'
import { Container } from '@/components/layout/container'
import { EmptyState, ErrorState } from '@/components/ui/states'
import type { GalleryItem } from '@/lib/data/types'

export function GalleryPreview({ items, unavailable }: { items: GalleryItem[]; unavailable: boolean }) {
  return (
    <section aria-labelledby="gallery-heading" className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-meta text-success">Club moments</p>
            <h2 className="text-section-title mt-2" id="gallery-heading">Gallery</h2>
          </div>
          <Link className="text-sm font-bold text-success hover:text-foreground" href="/gallery">
            View gallery <span aria-hidden="true">→</span>
          </Link>
        </div>

        {unavailable ? (
          <ErrorState className="mt-8" description="Gallery media is temporarily unavailable." title="Unable to load gallery" />
        ) : items.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const imageUrl = item.media_type === 'photo'
                ? item.media_url
                : item.thumbnail_url

              return (
                <article
                  className={`relative min-h-64 overflow-hidden bg-structural ${index === 0 ? 'sm:col-span-2 lg:row-span-2 lg:min-h-[33rem]' : ''}`}
                  key={item.id}
                >
                  <div className="absolute inset-0">
                    <GalleryMedia
                      alt={item.alt_text || item.title}
                      className="h-full w-full"
                      label={item.media_type === 'video' ? 'Video' : 'Photo'}
                      src={imageUrl}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-structural/90 p-4 text-white">
                    <p className="text-meta text-brand">{item.media_type}</p>
                    <h3 className="mt-1 font-bold">{item.title}</h3>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <EmptyState
            className="mt-8"
            description="Published photos and video highlights will appear here."
            title="Gallery updates coming soon"
          />
        )}
      </Container>
    </section>
  )
}
