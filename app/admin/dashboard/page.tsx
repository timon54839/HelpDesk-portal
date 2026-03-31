// Admin dashboard – SSR (always fresh)
import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchApi } from '@/lib/api'
import type { Person, Room, Device, Ticket } from '@/types'

export const metadata: Metadata = { title: 'Admin – Dashboard' }
export const dynamic = 'force-dynamic'

async function getStats() {
  const [persons, rooms, devices, tickets] = await Promise.all([
    fetchApi<Person[]>('/person'),
    fetchApi<Room[]>('/room'),
    fetchApi<Device[]>('/device'),
    fetchApi<Ticket[]>('/ticket'),
  ])
  return { persons, rooms, devices, tickets }
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    redirect('/admin')
  }

  const { persons, rooms, devices, tickets } = await getStats()
  const openTickets = tickets.filter((t) => t.status === 'OPEN')

  const sections = [
    { label: 'Osoby', count: persons.length, href: '/admin/persons', newHref: '/admin/persons/new', icon: '👤', accent: 'bg-indigo-900/60 border-indigo-800' },
    { label: 'Místnosti', count: rooms.length, href: '/admin/rooms', newHref: '/admin/rooms/new', icon: '🏫', accent: 'bg-emerald-900/60 border-emerald-800' },
    { label: 'Zařízení', count: devices.length, href: '/admin/devices', newHref: '/admin/devices/new', icon: '💻', accent: 'bg-purple-900/60 border-purple-800' },
    { label: 'Tikety', count: tickets.length, href: '/admin/tickets', newHref: '/admin/tickets/new', icon: '🎫', accent: 'bg-orange-900/60 border-orange-800' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Admin Dashboard</h1>

      {openTickets.length > 0 && (
        <div className="mb-6 rounded-lg border border-orange-800 bg-orange-950/60 p-4">
          <p className="text-sm font-medium text-orange-300">
            Pozor: {openTickets.length} otevřených tiketů čeká na zpracování.
          </p>
          <Link href="/admin/tickets" className="text-sm text-orange-400 underline mt-1 inline-block hover:text-orange-300">
            Zobrazit tikety
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((s) => (
          <div key={s.label} className={`card border ${s.accent}`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <p className="text-3xl font-bold text-gray-100">{s.count}</p>
            <p className="text-sm text-gray-500 mb-4">{s.label}</p>
            <div className="flex gap-2">
              <Link href={s.href} className="btn-secondary text-xs flex-1 text-center">
                Přehled
              </Link>
              <Link href={s.newHref} className="btn-primary text-xs flex-1 text-center">
                + Přidat
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
