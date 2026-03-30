// Edit device – SSR
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { fetchApi, ApiError } from '@/lib/api'
import { updateDevice } from '@/lib/actions'
import DeviceForm from '@/components/admin/DeviceForm'
import type { Device, Room, CreateDeviceDto } from '@/types'

export const metadata: Metadata = { title: 'Admin – Upravit zařízení' }
export const dynamic = 'force-dynamic'

export default async function EditDevicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()
  const { id } = await params

  let device: Device
  try {
    device = await fetchApi<Device>(`/device/${id}`)
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) notFound()
    throw err
  }

  const rooms = await fetchApi<Room[]>('/room')

  async function handleUpdate(data: CreateDeviceDto) {
    'use server'
    await updateDevice(id, data)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/devices" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Zpět na zařízení
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upravit: {device.name}</h1>
      <div className="card">
        <DeviceForm initial={device} rooms={rooms} onSubmit={handleUpdate} />
      </div>
    </div>
  )
}
