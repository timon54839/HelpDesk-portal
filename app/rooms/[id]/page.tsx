// Room detail – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRoom, getDevices } from '@/lib/cache'
import { ApiError } from '@/lib/api'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const room = await getRoom(id)
    return { title: room.name, description: `Detail místnosti ${room.name}` }
  } catch {
    return { title: 'Místnost nenalezena' }
  }
}

const deviceTypeLabels: Record<string, string> = {
  PC: 'PC',
  NOTEBOOK: 'Notebook',
  PRINTER: 'Tiskárna',
  OTHER: 'Ostatní',
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let room
  try {
    room = await getRoom(id)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  const allDevices = await getDevices()
  const roomDevices = allDevices.filter((d) => d.roomId === id)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/rooms" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na místnosti
      </Link>
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl">
            🏫
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
            <p className="text-gray-500">Patro {room.floor}</p>
          </div>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-gray-900 font-mono text-xs break-all">{room.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Vytvořeno</dt>
            <dd className="mt-1 text-gray-900">
              {new Date(room.createdAt).toLocaleString('cs-CZ')}
            </dd>
          </div>
        </dl>
      </div>

      {roomDevices.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Zařízení v místnosti ({roomDevices.length})
          </h2>
          <div className="space-y-2">
            {roomDevices.map((device) => (
              <Link
                key={device.id}
                href={`/devices/${device.id}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">💻</span>
                <div>
                  <p className="font-medium text-gray-900">{device.name}</p>
                  <p className="text-sm text-gray-500">
                    {deviceTypeLabels[device.type] ?? device.type}
                    {device.serialNumber && ` · ${device.serialNumber}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
