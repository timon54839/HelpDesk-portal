// Create ticket – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { fetchApi } from '@/lib/api'
import { createTicket } from '@/lib/actions'
import TicketForm from '@/components/admin/TicketForm'
import type { Person, Device, CreateTicketDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Nový tiket' }
export const dynamic = 'force-dynamic'

async function handleCreate(data: CreateTicketDto) {
  'use server'
  await createTicket(data)
}

export default async function NewTicketPage() {
  await requireAdmin()
  const [persons, devices] = await Promise.all([
    fetchApi<Person[]>('/person'),
    fetchApi<Device[]>('/device'),
  ])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/tickets" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na tikety
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nový tiket</h1>
      <div className="card">
        <TicketForm persons={persons} devices={devices} onSubmit={handleCreate} />
      </div>
    </div>
  )
}
