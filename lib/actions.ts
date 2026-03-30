'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { fetchApi } from './api'
import type {
  CreatePersonDto,
  CreateRoomDto,
  CreateDeviceDto,
  CreateTicketDto,
} from '@/types'

// ─── Persons ────────────────────────────────────────────────────────────────

export async function createPerson(data: CreatePersonDto) {
  await fetchApi('/person', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  revalidateTag('persons')
  revalidateTag('landing')
  redirect('/admin/persons')
}

export async function updatePerson(id: string, data: Partial<CreatePersonDto>) {
  await fetchApi(`/person/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  revalidateTag('persons')
  revalidateTag(`person-${id}`)
  redirect('/admin/persons')
}

export async function deletePerson(id: string) {
  await fetchApi(`/person/${id}`, { method: 'DELETE' })
  revalidateTag('persons')
  revalidateTag('landing')
  redirect('/admin/persons')
}

// ─── Rooms ───────────────────────────────────────────────────────────────────

export async function createRoom(data: CreateRoomDto) {
  await fetchApi('/room', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  revalidateTag('rooms')
  revalidateTag('landing')
  redirect('/admin/rooms')
}

export async function updateRoom(id: string, data: Partial<CreateRoomDto>) {
  await fetchApi(`/room/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  revalidateTag('rooms')
  revalidateTag(`room-${id}`)
  redirect('/admin/rooms')
}

export async function deleteRoom(id: string) {
  await fetchApi(`/room/${id}`, { method: 'DELETE' })
  revalidateTag('rooms')
  revalidateTag('landing')
  redirect('/admin/rooms')
}

// ─── Devices ─────────────────────────────────────────────────────────────────

export async function createDevice(data: CreateDeviceDto) {
  await fetchApi('/device', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  revalidateTag('devices')
  revalidateTag('landing')
  redirect('/admin/devices')
}

export async function updateDevice(id: string, data: Partial<CreateDeviceDto>) {
  await fetchApi(`/device/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  revalidateTag('devices')
  revalidateTag(`device-${id}`)
  redirect('/admin/devices')
}

export async function deleteDevice(id: string) {
  await fetchApi(`/device/${id}`, { method: 'DELETE' })
  revalidateTag('devices')
  revalidateTag('landing')
  redirect('/admin/devices')
}

// ─── Tickets ─────────────────────────────────────────────────────────────────

export async function createTicket(data: CreateTicketDto) {
  await fetchApi('/ticket', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  revalidateTag('tickets')
  revalidateTag('landing')
  redirect('/admin/tickets')
}

export async function updateTicket(id: string, data: Partial<CreateTicketDto>) {
  await fetchApi(`/ticket/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  revalidateTag('tickets')
  revalidateTag(`ticket-${id}`)
  redirect('/admin/tickets')
}

export async function deleteTicket(id: string) {
  await fetchApi(`/ticket/${id}`, { method: 'DELETE' })
  revalidateTag('tickets')
  revalidateTag('landing')
  redirect('/admin/tickets')
}

// ─── Admin auth ──────────────────────────────────────────────────────────────

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123'

  if (password !== adminPassword) {
    return { error: 'Nesprávné heslo' }
  }

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })

  redirect('/admin/dashboard')
}

export async function adminLogout() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin')
}
