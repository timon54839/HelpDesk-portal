// Edit room – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { fetchApi, ApiError } from '@/lib/api'
import { updateRoom } from '@/lib/actions'
import RoomForm from '@/components/admin/RoomForm'
import type { Room, CreateRoomDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Upravit místnost' }
export const dynamic = 'force-dynamic'

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params

  let room: Room
  try {
    room = await fetchApi<Room>(`/room/${id}`)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  async function handleUpdate(data: CreateRoomDto) {
    'use server'
    await updateRoom(id, data)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/rooms" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na místnosti
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upravit: {room.name}</h1>
      <div className="card">
        <RoomForm initial={room} onSubmit={handleUpdate} />
      </div>
    </div>
  )
}
