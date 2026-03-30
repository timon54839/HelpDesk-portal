// Admin tickets list – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { fetchApi } from '@/lib/api'
import { deleteTicket } from '@/lib/actions'
import type { Ticket } from '@/types'
import DeleteButton from '@/components/admin/DeleteButton'
import { StatusBadge, PriorityBadge } from '@/components/StatusBadge'
import type { TicketStatus, TicketPriority } from '@/types'

export const metadata: Metadata = { title: 'Admin – Tikety' }
export const dynamic = 'force-dynamic'

export default async function AdminTicketsPage() {
  await requireAdmin()
  const tickets = await fetchApi<Ticket[]>('/ticket')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tikety</h1>
        <Link href="/admin/tickets/new" className="btn-primary">
          + Přidat tiket
        </Link>
      </div>
      {tickets.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Zatím žádné tikety.</div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Název</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Stav</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Priorita</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Vytvořeno</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 max-w-xs truncate">{ticket.title}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{ticket.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ticket.status as TicketStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={ticket.priority as TicketPriority} />
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {new Date(ticket.createdAt).toLocaleDateString('cs-CZ')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/tickets/${ticket.id}/edit`} className="btn-secondary text-xs">
                        Upravit
                      </Link>
                      <DeleteButton id={ticket.id} label={ticket.title} deleteAction={deleteTicket} />
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
