// Create room – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { createRoom } from '@/lib/actions'
import RoomForm from '@/components/admin/RoomForm'
import type { CreateRoomDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Nová místnost' }
export const dynamic = 'force-dynamic'

async function handleCreate(data: CreateRoomDto) {
  'use server'
  await createRoom(data)
}

export default async function NewRoomPage() {
  await requireAdmin()
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/rooms" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na místnosti
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nová místnost</h1>
      <div className="card">
        <RoomForm onSubmit={handleCreate} />
      </div>
    </div>
  )
}
