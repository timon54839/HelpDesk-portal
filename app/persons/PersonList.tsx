import Link from 'next/link'
import type { Person } from '@/types'

const positionLabels: Record<string, string> = {
  STUDENT: 'Student',
  TEACHER: 'Učitel',
  TECHNICIAN: 'Technik',
  ADMIN: 'Admin',
}

export default function PersonList({ persons }: { persons: Person[] }) {
  if (persons.length === 0) {
    return (
      <div className="card text-center py-12 text-gray-500">
        Žádné osoby nenalezeny.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {persons.map((person) => (
        <Link
          key={person.id}
          href={`/persons/${person.id}`}
          className="card hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
              {person.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                {person.name}
              </p>
              <p className="text-sm text-gray-500 truncate">{person.email}</p>
              <span className="badge bg-blue-100 text-blue-800 mt-1">
                {positionLabels[person.jobPosition] ?? person.jobPosition}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
