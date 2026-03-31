// Admin persons list – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { fetchApi } from '@/lib/api'
import { deletePerson } from '@/lib/actions'
import type { Person } from '@/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Admin – Osoby' }
export const dynamic = 'force-dynamic'

const positionLabels: Record<string, string> = {
  STUDENT: 'Student',
  TEACHER: 'Učitel',
  TECHNICIAN: 'Technik',
  ADMIN: 'Admin',
}

export default async function AdminPersonsPage() {
  await requireAdmin()
  const persons = await fetchApi<Person[]>('/person')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Osoby</h1>
        <Link href="/admin/persons/new" className="btn-primary">
          + Přidat osobu
        </Link>
      </div>

      {persons.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Zatím žádné osoby.</div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/60 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Jméno</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">E-mail</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Pozice</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {persons.map((person) => (
                <tr key={person.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-100">{person.name}</td>
                  <td className="px-4 py-3 text-gray-400">{person.email}</td>
                  <td className="px-4 py-3">
                    <span className="badge bg-indigo-900/60 text-indigo-300 ring-1 ring-indigo-700">
                      {positionLabels[person.jobPosition] ?? person.jobPosition}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/persons/${person.id}/edit`} className="btn-secondary text-xs">
                        Upravit
                      </Link>
                      <DeleteButton id={person.id} label={person.name} deleteAction={deletePerson} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
