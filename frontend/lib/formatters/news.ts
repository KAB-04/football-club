const publicationDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  timeZone: 'Africa/Accra',
  year: 'numeric',
})

export function formatPublicationDate(value: string): string {
  return publicationDate.format(new Date(value))
}
