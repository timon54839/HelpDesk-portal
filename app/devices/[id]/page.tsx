// Device detail – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDevice, getRoom } from '@/lib/cache'
import { ApiError } from '@/lib/api'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const device = await getDevice(id)
    return { title: device.name, description: `Detail zařízení ${device.name}` }
  } catch {
    return { title: 'Zařízení nenalezeno' }
  }
}

const deviceTypeLabels: Record<string, string> = {
  PC: 'PC',
  NOTEBOOK: 'Notebook',
  PRINTER: 'Tiskárna',
  OTHER: 'Ostatní',
}

const typeIcons: Record<string, string> = {
  PC: '🖥️',
  NOTEBOOK: '💻',
  PRINTER: '🖨️',
  OTHER: '🔧',
}

export default async function DeviceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let device
  try {
    device = await getDevice(id)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  let room = null
  try {
    room = await getRoom(device.roomId)
  } catch {
    // room might not be found
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/devices" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline mb-4 inline-block">
        ← Zpět na zařízení
      </Link>
      <div className="card">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-900/80 text-3xl">
            {typeIcons[device.type] ?? '🔧'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-100">{device.name}</h1>
            <span className="badge bg-purple-900/60 text-purple-300 ring-1 ring-purple-700 mt-1">
              {deviceTypeLabels[device.type] ?? device.type}
            </span>
          </div>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {device.serialNumber && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Sériové číslo</dt>
              <dd className="mt-1 text-gray-200 font-mono">{device.serialNumber}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-medium text-gray-500">Místnost</dt>
            <dd className="mt-1">
              {room ? (
                <Link href={`/rooms/${room.id}`} className="text-indigo-400 hover:underline">
                  {room.name} (patro {room.floor})
                </Link>
              ) : (
                <span className="text-gray-500 font-mono text-xs">{device.roomId}</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-gray-400 font-mono text-xs break-all">{device.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Vytvořeno</dt>
            <dd className="mt-1 text-gray-200">
              {new Date(device.createdAt).toLocaleString('cs-CZ')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
