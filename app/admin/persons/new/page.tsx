// Create person – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { createPerson } from '@/lib/actions'
import PersonForm from '@/components/admin/PersonForm'
import type { CreatePersonDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Nová osoba' }
export const dynamic = 'force-dynamic'

async function handleCreate(data: CreatePersonDto) {
  'use server'
  await createPerson(data)
}

export default async function NewPersonPage() {
  await requireAdmin()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/persons" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na osoby
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nová osoba</h1>
      <div className="card">
        <PersonForm onSubmit={handleCreate} />
      </div>
    </div>
  )
}
