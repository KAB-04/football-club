import type { Metadata } from 'next'

import { GalleryFilters, type GalleryFilter } from '@/components/gallery/gallery-filters'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { GalleryHero } from '@/components/gallery/gallery-hero'
import { Container } from '@/components/layout/container'
import { getPublishedGalleryItems } from '@/lib/data/gallery'
import type { GalleryItem } from '@/lib/data/types'

export const metadata: Metadata = {
  title: 'Gallery | StandFast FC',
  description: 'Published photos and videos from StandFast Football Club in Ashaiman, Ghana.',
}

type GalleryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const GALLERY_LIMIT = 30

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams
  const filter = normalizeFilter(params.type)
  let items: GalleryItem[] | null = null

  try {
    items = await getPublishedGalleryItems({
      limit: GALLERY_LIMIT,
      type: filter === 'all' ? undefined : filter,
    })
  } catch {
    // Sanitized context is logged by the data layer. Null retains the
    // distinction between an unavailable query and a successful empty list.
  }

  return (
    <>
      <GalleryHero />
      <div className="bg-background py-12 sm:py-16">
        <Container>
          <GalleryFilters active={filter} />
          <section aria-labelledby="gallery-items-heading" className="mt-10">
            <h2 className="sr-only" id="gallery-items-heading">Published gallery items</h2>
            <GalleryGrid filter={filter} items={items} />
          </section>
        </Container>
      </div>
    </>
  )
}

function normalizeFilter(value: string | string[] | undefined): GalleryFilter {
  const candidate = Array.isArray(value) ? value[0] : value
  return candidate === 'photo' || candidate === 'video' ? candidate : 'all'
}
