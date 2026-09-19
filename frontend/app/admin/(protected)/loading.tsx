export default function AdminLoading() {
  return (
    <main aria-busy="true" aria-label="Loading administration" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl animate-pulse motion-reduce:animate-none">
        <div className="h-24 max-w-xl rounded-sm bg-muted" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="h-36 rounded-sm border border-border bg-surface" key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
