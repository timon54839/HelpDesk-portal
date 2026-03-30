// Admin rooms list – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { fetchApi } from '@/lib/api'
import { deleteRoom } from '@/lib/actions'
import type { Room } from '@/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Admin – Místnosti' }
export const dynamic = 'force-dynamic'

export default async function AdminRoomsPage() {
  await requireAdmin()
  const rooms = await fetchApi<Room[]>('/room')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Místnosti</h1>
        <Link href="/admin/rooms/new" className="btn-primary">
          + Přidat místnost
        </Link>
      </div>
      {rooms.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Zatím žádné místnosti.</div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Název</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Patro</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{room.name}</td>
                  <td className="px-4 py-3 text-gray-600">{room.floor}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/rooms/${room.id}/edit`} className="btn-secondary text-xs">
                        Upravit
                      </Link>
                      <DeleteButton id={room.id} label={room.name} deleteAction={deleteRoom} />
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
