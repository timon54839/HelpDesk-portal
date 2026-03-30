// Edit ticket – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { fetchApi, ApiError } from '@/lib/api'
import { updateTicket } from '@/lib/actions'
import TicketForm from '@/components/admin/TicketForm'
import type { Ticket, Person, Device, CreateTicketDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Upravit tiket' }
export const dynamic = 'force-dynamic'

export default async function EditTicketPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params

  let ticket: Ticket
  try {
    ticket = await fetchApi<Ticket>(`/ticket/${id}`)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  const [persons, devices] = await Promise.all([
    fetchApi<Person[]>('/person'),
    fetchApi<Device[]>('/device'),
  ])

  async function handleUpdate(data: CreateTicketDto) {
    'use server'
    await updateTicket(id, data)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/tickets" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na tikety
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 line-clamp-1">
        Upravit: {ticket.title}
      </h1>
      <div className="card">
        <TicketForm initial={ticket} persons={persons} devices={devices} onSubmit={handleUpdate} />
      </div>
    </div>
  )
}
