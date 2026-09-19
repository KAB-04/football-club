import { Container } from '@/components/layout/container'

export function GalleryHero() {
  return (
    <section className="border-b-2 border-brand bg-structural py-14 text-structural-foreground sm:py-16">
      <Container>
        <p className="text-meta text-brand">Gallery</p>
        <h1 className="text-page-title mt-3 text-white">StandFast in Pictures &amp; Video</h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/70">
          Explore published photos and external video highlights from StandFast Football Club.
        </p>
      </Container>
    </section>
  )
}
