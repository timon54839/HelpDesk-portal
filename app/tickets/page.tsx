// Tickets list – ISR (obnovuje se každých 60 sekund – tikety se mění nejčastěji)
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getTickets } from '@/lib/cache'
import SearchFilter from '@/components/SearchFilter'
import { StatusBadge, PriorityBadge } from '@/components/StatusBadge'
import TicketFilters from './TicketFilters'
import type { TicketStatus, TicketPriority } from '@/types'

export const metadata: Metadata = {
  title: 'Tikety',
  description: 'Přehled všech helpdesk tiketů.',
}

export const revalidate = 60

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; priority?: string }>
}) {
  const { q, status, priority } = await searchParams
  const tickets = await getTickets()

  const filtered = tickets.filter((t) => {
    const matchesQ = q ? t.title.toLowerCase().includes(q.toLowerCase()) : true
    const matchesStatus = status ? t.status === status : true
    const matchesPriority = priority ? t.priority === priority : true
    return matchesQ && matchesStatus && matchesPriority
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Tikety</h1>
          <p className="text-sm text-gray-500 mt-1">
            Celkem {filtered.length} {filtered.length !== tickets.length && `z ${tickets.length}`} tiketů
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="max-w-md flex-1">
          <Suspense>
            <SearchFilter placeholder="Hledat podle názvu (Enter)" />
          </Suspense>
        </div>
        <Suspense>
          <TicketFilters currentStatus={status} currentPriority={priority} />
        </Suspense>
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Žádné tikety nenalezeny.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id}`}
              className="card hover:border-gray-700 hover:bg-gray-800/80 transition-all group flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-100 group-hover:text-indigo-400 truncate">
                  {ticket.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{ticket.description}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(ticket.createdAt).toLocaleDateString('cs-CZ')}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end flex-shrink-0">
                <StatusBadge status={ticket.status as TicketStatus} />
                <PriorityBadge priority={ticket.priority as TicketPriority} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
