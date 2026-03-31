// Person detail – SSR (dynamická stránka, vždy čerstvá data)
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPerson } from '@/lib/cache'
import { ApiError } from '@/lib/api'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const person = await getPerson(id)
    return { title: person.name, description: `Profil osoby ${person.name}` }
  } catch {
    return { title: 'Osoba nenalezena' }
  }
}

const positionLabels: Record<string, string> = {
  STUDENT: 'Student',
  TEACHER: 'Učitel',
  TECHNICIAN: 'Technik',
  ADMIN: 'Admin',
}

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let person
  try {
    person = await getPerson(id)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/persons" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline mb-4 inline-block">
        ← Zpět na osoby
      </Link>
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-900 text-indigo-300 font-bold text-2xl">
            {person.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-100">{person.name}</h1>
            <span className="badge bg-indigo-900/60 text-indigo-300 ring-1 ring-indigo-700 mt-1">
              {positionLabels[person.jobPosition] ?? person.jobPosition}
            </span>
          </div>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">E-mail</dt>
            <dd className="mt-1 text-gray-200">
              <a href={`mailto:${person.email}`} className="text-indigo-400 hover:underline">
                {person.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-gray-400 font-mono text-xs break-all">{person.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Vytvořeno</dt>
            <dd className="mt-1 text-gray-200">
              {new Date(person.createdAt).toLocaleString('cs-CZ')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Aktualizováno</dt>
            <dd className="mt-1 text-gray-200">
              {new Date(person.updatedAt).toLocaleString('cs-CZ')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
