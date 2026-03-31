// Admin devices list – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { fetchApi } from '@/lib/api'
import { deleteDevice } from '@/lib/actions'
import type { Device, Room } from '@/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Admin – Zařízení' }
export const dynamic = 'force-dynamic'

const deviceTypeLabels: Record<string, string> = {
  PC: 'PC',
  NOTEBOOK: 'Notebook',
  PRINTER: 'Tiskárna',
  OTHER: 'Ostatní',
}

export default async function AdminDevicesPage() {
  await requireAdmin()
  const [devices, rooms] = await Promise.all([
    fetchApi<Device[]>('/device'),
    fetchApi<Room[]>('/room'),
  ])
  const roomMap = new Map(rooms.map((r) => [r.id, r.name]))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Zařízení</h1>
        <Link href="/admin/devices/new" className="btn-primary">
          + Přidat zařízení
        </Link>
      </div>
      {devices.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Zatím žádná zařízení.</div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/60 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Název</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Typ</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Sér. číslo</th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">Místnost</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-100">{device.name}</td>
                  <td className="px-4 py-3">
                    <span className="badge bg-purple-900/60 text-purple-300 ring-1 ring-purple-700">
                      {deviceTypeLabels[device.type] ?? device.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    {device.serialNumber ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {roomMap.get(device.roomId) ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/devices/${device.id}/edit`} className="btn-secondary text-xs">
                        Upravit
                      </Link>
                      <DeleteButton id={device.id} label={device.name} deleteAction={deleteDevice} />
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
