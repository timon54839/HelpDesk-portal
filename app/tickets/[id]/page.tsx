// Ticket detail – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTicket } from '@/lib/cache'
import { ApiError } from '@/lib/api'
import { StatusBadge, PriorityBadge } from '@/components/StatusBadge'
import type { TicketStatus, TicketPriority } from '@/types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const ticket = await getTicket(id)
    return { title: ticket.title, description: ticket.description }
  } catch {
    return { title: 'Tiket nenalezen' }
  }
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let ticket
  try {
    ticket = await getTicket(id)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/tickets" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline mb-4 inline-block">
        ← Zpět na tikety
      </Link>
      <div className="card">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-100">{ticket.title}</h1>
          <div className="flex flex-col gap-1 items-end flex-shrink-0">
            <StatusBadge status={ticket.status as TicketStatus} />
            <PriorityBadge priority={ticket.priority as TicketPriority} />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2">Popis</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-800">
          {ticket.assignedPerson && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Přiřazená osoba</dt>
              <dd className="mt-1">
                <Link
                  href={`/persons/${ticket.assignedPersonId}`}
                  className="text-indigo-400 hover:underline"
                >
                  {ticket.assignedPerson.name}
                </Link>
              </dd>
            </div>
          )}
          {!ticket.assignedPerson && ticket.assignedPersonId && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Přiřazená osoba</dt>
              <dd className="mt-1">
                <Link
                  href={`/persons/${ticket.assignedPersonId}`}
                  className="text-indigo-400 hover:underline font-mono text-xs"
                >
                  {ticket.assignedPersonId}
                </Link>
              </dd>
            </div>
          )}
          {ticket.device && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Zařízení</dt>
              <dd className="mt-1">
                <Link
                  href={`/devices/${ticket.deviceId}`}
                  className="text-indigo-400 hover:underline"
                >
                  {ticket.device.name}
                </Link>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-medium text-gray-500">Vytvořeno</dt>
            <dd className="mt-1 text-gray-200">
              {new Date(ticket.createdAt).toLocaleString('cs-CZ')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Aktualizováno</dt>
            <dd className="mt-1 text-gray-200">
              {new Date(ticket.updatedAt).toLocaleString('cs-CZ')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-gray-400 font-mono text-xs break-all">{ticket.id}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
