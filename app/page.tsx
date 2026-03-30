// Landing page – SSG (staticky generovaná, revalidace po 10 minutách)
import type { Metadata } from 'next'
import Link from 'next/link'
import { getLandingStats } from '@/lib/cache'

export const metadata: Metadata = {
  title: 'Helpdesk Portal – Úvod',
  description:
    'Firemní helpdesk portál pro správu tiketů, zařízení, místností a zaměstnanců. Přehledný systém pro IT oddělení.',
}

// SSG – stránka se generuje staticky, cache se obnovuje přes revalidateTag('landing')
export const dynamic = 'force-static'

const tiles = [
  {
    key: 'personsCount',
    label: 'Osoby',
    icon: '👤',
    href: '/persons',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100',
  },
  {
    key: 'roomsCount',
    label: 'Místnosti',
    icon: '🏫',
    href: '/rooms',
    color: 'bg-green-50 border-green-200 text-green-700',
    iconBg: 'bg-green-100',
  },
  {
    key: 'devicesCount',
    label: 'Zařízení',
    icon: '💻',
    href: '/devices',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    iconBg: 'bg-purple-100',
  },
  {
    key: 'ticketsCount',
    label: 'Tikety celkem',
    icon: '🎫',
    href: '/tickets',
    color: 'bg-orange-50 border-orange-200 text-orange-700',
    iconBg: 'bg-orange-100',
  },
  {
    key: 'openTickets',
    label: 'Otevřené tikety',
    icon: '🔓',
    href: '/tickets',
    color: 'bg-red-50 border-red-200 text-red-700',
    iconBg: 'bg-red-100',
  },
  {
    key: 'highPriorityTickets',
    label: 'Tikety – vysoká priorita',
    icon: '🚨',
    href: '/tickets',
    color: 'bg-rose-50 border-rose-200 text-rose-700',
    iconBg: 'bg-rose-100',
  },
] as const

export default async function HomePage() {
  const stats = await getLandingStats()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
          <span className="text-2xl">🛟</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Helpdesk Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Centrální systém pro správu IT tiketů, inventáře zařízení, místností a osob.
          Rychlý přehled vše na jednom místě.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/tickets" className="btn-primary">
            Zobrazit tikety
          </Link>
          <Link href="/admin" className="btn-secondary">
            Administrace
          </Link>
        </div>
      </div>

      {/* Stats tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tiles.map((tile) => (
          <Link
            key={tile.key}
            href={tile.href}
            className={`card border ${tile.color} hover:shadow-md transition-shadow group`}
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${tile.iconBg} text-2xl flex-shrink-0`}>
                {tile.icon}
              </div>
              <div>
                <p className="text-sm font-medium opacity-75">{tile.label}</p>
                <p className="text-3xl font-bold">
                  {stats[tile.key]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Správa tiketů
          </h2>
          <p className="text-gray-600 mb-4">
            Sledujte stav požadavků, přiřazujte odpovědné osoby a nastavujte priority.
            Přehledný systém pro IT podporu.
          </p>
          <Link href="/tickets" className="btn-primary">
            Přehled tiketů
          </Link>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Inventář zařízení
          </h2>
          <p className="text-gray-600 mb-4">
            Evidence počítačů, notebooků, tiskáren a dalšího IT vybavení. Každé zařízení
            je přiřazeno ke konkrétní místnosti.
          </p>
          <Link href="/devices" className="btn-primary">
            Přehled zařízení
          </Link>
        </div>
      </div>
    </div>
  )
}
