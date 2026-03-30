// Devices list – ISR (obnovuje se každých 60 sekund)
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getDevices } from '@/lib/cache'
import SearchFilter from '@/components/SearchFilter'
import TypeFilter from './TypeFilter'

export const metadata: Metadata = {
  title: 'Zařízení',
  description: 'Přehled všech zařízení v inventáři.',
}

export const revalidate = 60

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

export default async function DevicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>
}) {
  const { q, type } = await searchParams
  const devices = await getDevices()

  const filtered = devices.filter((d) => {
    const matchesQ = q ? d.name.toLowerCase().includes(q.toLowerCase()) : true
    const matchesType = type ? d.type === type : true
    return matchesQ && matchesType
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Zařízení</h1>
          <p className="text-sm text-gray-500 mt-1">
            Celkem {filtered.length} {filtered.length !== devices.length && `z ${devices.length}`} zařízení
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
          <TypeFilter currentType={type} />
        </Suspense>
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Žádná zařízení nenalezena.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((device) => (
            <Link
              key={device.id}
              href={`/devices/${device.id}`}
              className="card hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100 text-xl">
                  {typeIcons[device.type] ?? '🔧'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                    {device.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {deviceTypeLabels[device.type] ?? device.type}
                    {device.serialNumber && ` · ${device.serialNumber}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
