export function ContactDetails({ email, location, socialLinks }: {
  email: string
  location: string
  socialLinks: Array<{ label: string; href: string }>
}) {
  return (
    <section aria-labelledby="contact-details-heading">
      <p className="text-meta text-success">StandFast Football Club</p>
      <h2 className="text-section-title mt-2" id="contact-details-heading">Club contact</h2>
      <dl className="mt-7 space-y-6 border-t border-border pt-6">
        <div><dt className="text-meta text-muted-foreground">Email</dt><dd className="mt-2"><a className="font-bold text-success hover:text-foreground" href={`mailto:${email}`}>{email}</a></dd></div>
        <div><dt className="text-meta text-muted-foreground">Location</dt><dd className="mt-2 font-bold">{location}</dd></div>
        <div><dt className="text-meta text-muted-foreground">Motto</dt><dd className="mt-2 font-bold">Horse Power</dd></div>
      </dl>
      {socialLinks.length ? (
        <div className="mt-8">
          <h3 className="text-label">Official social profiles</h3>
          <ul className="mt-3 flex flex-wrap gap-4">
            {socialLinks.map((link) => <li key={link.label}><a className="font-bold text-success hover:text-foreground" href={link.href} rel="noopener noreferrer" target="_blank">{link.label} <span aria-hidden="true">↗</span></a></li>)}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
