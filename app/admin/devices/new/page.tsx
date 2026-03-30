// Create device – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { fetchApi } from '@/lib/api'
import { createDevice } from '@/lib/actions'
import DeviceForm from '@/components/admin/DeviceForm'
import type { Room, CreateDeviceDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Nové zařízení' }
export const dynamic = 'force-dynamic'

async function handleCreate(data: CreateDeviceDto) {
  'use server'
  await createDevice(data)
}

export default async function NewDevicePage() {
  await requireAdmin()
  const rooms = await fetchApi<Room[]>('/room')

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/devices" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na zařízení
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nové zařízení</h1>
      <div className="card">
        <DeviceForm rooms={rooms} onSubmit={handleCreate} />
      </div>
    </div>
  )
}
