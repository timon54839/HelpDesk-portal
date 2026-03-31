import { unstable_cache } from 'next/cache'
import { fetchApi } from './api'
import type { Person, Room, Device, Ticket } from '@/types'

export const getPersons = unstable_cache(
  () => fetchApi<Person[]>('/person'),
  ['persons'],
  { revalidate: 300, tags: ['persons'] }
)

export const getPerson = (id: string) =>
  unstable_cache(
    () => fetchApi<Person>(`/person/${id}`),
    [`person-${id}`],
    { revalidate: 60, tags: ['persons', `person-${id}`] }
  )()

export const getRooms = unstable_cache(
  () => fetchApi<Room[]>('/room'),
  ['rooms'],
  { revalidate: 300, tags: ['rooms'] }
)

export const getRoom = (id: string) =>
  unstable_cache(
    () => fetchApi<Room>(`/room/${id}`),
    [`room-${id}`],
    { revalidate: 60, tags: ['rooms', `room-${id}`] }
  )()

export const getDevices = unstable_cache(
  () => fetchApi<Device[]>('/device'),
  ['devices'],
  { revalidate: 300, tags: ['devices'] }
)

export const getDevice = (id: string) =>
  unstable_cache(
    () => fetchApi<Device>(`/device/${id}`),
    [`device-${id}`],
    { revalidate: 60, tags: ['devices', `device-${id}`] }
  )()

export const getTickets = unstable_cache(
  () => fetchApi<Ticket[]>('/ticket'),
  ['tickets'],
  { revalidate: 120, tags: ['tickets'] }
)

export const getTicket = (id: string) =>
  unstable_cache(
    () => fetchApi<Ticket>(`/ticket/${id}`),
    [`ticket-${id}`],
    { revalidate: 60, tags: ['tickets', `ticket-${id}`] }
  )()

export const getLandingStats = unstable_cache(
  async () => {
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
  },
  ['landing-stats'],
  { revalidate: 600, tags: ['persons', 'rooms', 'devices', 'tickets', 'landing'] }
)
