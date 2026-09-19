const MISSING_VALUE = 'Not provided'

export function calculateAge(dateOfBirth: string, referenceDate = new Date()): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth)
  if (!match) throw new RangeError('dateOfBirth must use YYYY-MM-DD format')

  const birthYear = Number(match[1])
  const birthMonth = Number(match[2])
  const birthDay = Number(match[3])
  const validDate = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay))

  if (
    validDate.getUTCFullYear() !== birthYear ||
    validDate.getUTCMonth() !== birthMonth - 1 ||
    validDate.getUTCDate() !== birthDay
  ) {
    throw new RangeError('dateOfBirth is not a valid calendar date')
  }

  const referenceYear = referenceDate.getUTCFullYear()
  const referenceMonth = referenceDate.getUTCMonth() + 1
  const referenceDay = referenceDate.getUTCDate()
  let age = referenceYear - birthYear

  if (
    referenceMonth < birthMonth ||
    (referenceMonth === birthMonth && referenceDay < birthDay)
  ) {
    age -= 1
  }

  if (age < 0) throw new RangeError('dateOfBirth cannot be after referenceDate')
  return age
}

export function formatJerseyNumber(jerseyNumber: number | null): string {
  return jerseyNumber === null ? MISSING_VALUE : `#${jerseyNumber}`
}

export function formatOptionalPlayerValue(value: string | null): string {
  return value?.trim() || MISSING_VALUE
}

export function formatDateOfBirth(dateOfBirth: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth)
  if (!match) throw new RangeError('dateOfBirth must use YYYY-MM-DD format')

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new RangeError('dateOfBirth is not a valid calendar date')
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function getDateOfBirthBoundsForAge(
  age: number,
  referenceDate = new Date(),
): { after: string; onOrBefore: string } {
  if (!Number.isInteger(age) || age < 0) {
    throw new RangeError('age must be a nonnegative integer')
  }

  const month = referenceDate.getUTCMonth() + 1
  const day = referenceDate.getUTCDate()
  const year = referenceDate.getUTCFullYear()

  // Exact age A means the DOB is after the A+1 anniversary boundary and
  // on or before the A anniversary boundary. Clamp Feb 29 across leap years.
  return {
    after: formatClampedCalendarDate(year - age - 1, month, day),
    onOrBefore: formatClampedCalendarDate(year - age, month, day),
  }
}

function formatClampedCalendarDate(year: number, month: number, day: number) {
  const lastDayOfMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(Math.min(day, lastDayOfMonth)).padStart(2, '0'),
  ].join('-')
}
