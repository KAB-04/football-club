import 'server-only'

import { createClient } from '@/lib/supabase/server'

import { throwPublicDataError } from './errors'
import type { GalleryItem } from './types'

const GALLERY_COLUMNS = `
  id, title, description, media_type, media_url, thumbnail_url,
  alt_text, event_date, is_published, created_at, updated_at
`

export async function getPublishedGalleryItems(
  options?: number | { limit?: number; type?: 'photo' | 'video' },
): Promise<GalleryItem[]> {
  const supabase = await createClient()
  let query = supabase
    .from('gallery_items')
    .select(GALLERY_COLUMNS)
    .eq('is_published', true)
    .order('event_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  const type = typeof options === 'number' ? undefined : options?.type
  const limit = typeof options === 'number' ? options : options?.limit

  if (type) {
    query = query.eq('media_type', type)
  }

  if (limit !== undefined) {
    query = query.limit(Math.max(1, Math.floor(limit)))
  }

  const { data, error } = await query
  if (error) throwPublicDataError('gallery', error)
  return data
}
