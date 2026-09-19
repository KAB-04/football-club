import { Container } from '@/components/layout/container'

export function ArticleBody({ content }: { content: string }) {
  const paragraphs = content.split(/\r?\n\s*\r?\n/).filter((paragraph) => paragraph.trim())

  return (
    <section aria-label="Article content" className="bg-background py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-8 text-foreground sm:text-lg">
          {paragraphs.map((paragraph, index) => (
            <p className="whitespace-pre-line" key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  )
}
