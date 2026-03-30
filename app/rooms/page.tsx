// Rooms list – ISR (obnovuje se každých 120 sekund)
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getRooms } from '@/lib/cache'
import SearchFilter from '@/components/SearchFilter'

export const metadata: Metadata = {
  title: 'Místnosti',
  description: 'Přehled všech místností v evidenci.',
}

export const revalidate = 120

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const rooms = await getRooms()

  const filtered = q
    ? rooms.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
    : rooms

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Místnosti</h1>
          <p className="text-sm text-gray-500 mt-1">
            Celkem {filtered.length} {filtered.length !== rooms.length && `z ${rooms.length}`} místností
          </p>
        </div>
      </div>

      <div className="mb-6 max-w-md">
        <Suspense>
          <SearchFilter placeholder="Hledat podle názvu (Enter)" />
        </Suspense>
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">Žádné místnosti nenalezeny.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="card hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 text-xl">
                  🏫
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {room.name}
                  </p>
                  <p className="text-sm text-gray-500">Patro: {room.floor}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
