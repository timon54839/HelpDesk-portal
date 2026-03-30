// Edit person – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { fetchApi, ApiError } from '@/lib/api'
import { updatePerson } from '@/lib/actions'
import PersonForm from '@/components/admin/PersonForm'
import type { Person, CreatePersonDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Upravit osobu' }
export const dynamic = 'force-dynamic'

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params

  let person: Person
  try {
    person = await fetchApi<Person>(`/person/${id}`)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  async function handleUpdate(data: CreatePersonDto) {
    'use server'
    await updatePerson(id, data)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/persons" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na osoby
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upravit: {person.name}</h1>
      <div className="card">
        <PersonForm initial={person} onSubmit={handleUpdate} />
      </div>
    </div>
  )
}
