import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache'
import { fetchApi } from './api'
import type { Person, Room, Device, Ticket } from '@/types'

export async function getPersons(): Promise<Person[]> {
  'use cache'
  cacheTag('persons')
  cacheLife({ revalidate: 300, stale: 60, expire: 3600 })
  return fetchApi<Person[]>('/person')
}

export async function getPerson(id: string): Promise<Person> {
  'use cache'
  cacheTag('persons', `person-${id}`)
  cacheLife({ revalidate: 60, stale: 30, expire: 600 })
  return fetchApi<Person>(`/person/${id}`)
}

export async function getRooms(): Promise<Room[]> {
  'use cache'
  cacheTag('rooms')
  cacheLife({ revalidate: 300, stale: 60, expire: 3600 })
  return fetchApi<Room[]>('/room')
}

export async function getRoom(id: string): Promise<Room> {
  'use cache'
  cacheTag('rooms', `room-${id}`)
  cacheLife({ revalidate: 60, stale: 30, expire: 600 })
  return fetchApi<Room>(`/room/${id}`)
}

export async function getDevices(): Promise<Device[]> {
  'use cache'
  cacheTag('devices')
  cacheLife({ revalidate: 300, stale: 60, expire: 3600 })
  return fetchApi<Device[]>('/device')
}

export async function getDevice(id: string): Promise<Device> {
  'use cache'
  cacheTag('devices', `device-${id}`)
  cacheLife({ revalidate: 60, stale: 30, expire: 600 })
  return fetchApi<Device>(`/device/${id}`)
}

export async function getTickets(): Promise<Ticket[]> {
  'use cache'
  cacheTag('tickets')
  cacheLife({ revalidate: 120, stale: 30, expire: 600 })
  return fetchApi<Ticket[]>('/ticket')
}

export async function getTicket(id: string): Promise<Ticket> {
  'use cache'
  cacheTag('tickets', `ticket-${id}`)
  cacheLife({ revalidate: 60, stale: 30, expire: 600 })
  return fetchApi<Ticket>(`/ticket/${id}`)
}

export async function getLandingStats() {
  'use cache'
  cacheTag('persons', 'rooms', 'devices', 'tickets', 'landing')
  cacheLife({ revalidate: 600, stale: 120, expire: 7200 })

  const [persons, rooms, devices, tickets] = await Promise.all([
    fetchApi<Person[]>('/person'),
    fetchApi<Room[]>('/room'),
    fetchApi<Device[]>('/device'),
    fetchApi<Ticket[]>('/ticket'),
  ])

  return {
    personsCount: persons.length,
    roomsCount: rooms.length,
    devicesCount: devices.length,
    ticketsCount: tickets.length,
    openTickets: tickets.filter((t) => t.status === 'OPEN').length,
    highPriorityTickets: tickets.filter((t) => t.priority === 'HIGH').length,
  }
}
