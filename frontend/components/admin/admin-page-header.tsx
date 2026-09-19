export function AdminPageHeader({ eyebrow, title, description }: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <header className="border-l-4 border-brand pl-5">
      <p className="text-meta text-success">{eyebrow}</p>
      <h1 className="text-page-title mt-2">{title}</h1>
      {description ? <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p> : null}
    </header>
  )
}
