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
    color: 'bg-indigo-950/60 border-indigo-800 text-indigo-300',
    iconBg: 'bg-indigo-900/80',
  },
  {
    key: 'roomsCount',
    label: 'Místnosti',
    icon: '🏫',
    href: '/rooms',
    color: 'bg-emerald-950/60 border-emerald-800 text-emerald-300',
    iconBg: 'bg-emerald-900/80',
  },
  {
    key: 'devicesCount',
    label: 'Zařízení',
    icon: '💻',
    href: '/devices',
    color: 'bg-purple-950/60 border-purple-800 text-purple-300',
    iconBg: 'bg-purple-900/80',
  },
  {
    key: 'ticketsCount',
    label: 'Tikety celkem',
    icon: '🎫',
    href: '/tickets',
    color: 'bg-orange-950/60 border-orange-800 text-orange-300',
    iconBg: 'bg-orange-900/80',
  },
  {
    key: 'openTickets',
    label: 'Otevřené tikety',
    icon: '🔓',
    href: '/tickets',
    color: 'bg-red-950/60 border-red-800 text-red-300',
    iconBg: 'bg-red-900/80',
  },
  {
    key: 'highPriorityTickets',
    label: 'Tikety – vysoká priorita',
    icon: '🚨',
    href: '/tickets',
    color: 'bg-rose-950/60 border-rose-800 text-rose-300',
    iconBg: 'bg-rose-900/80',
  },
] as const

export default async function HomePage() {
  const stats = await getLandingStats()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-900/50">
          <span className="text-2xl">🛟</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-100 mb-4">
          Helpdesk Portal
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
            className={`card border ${tile.color} hover:brightness-110 transition-all group`}
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
          <h2 className="text-xl font-semibold text-gray-100 mb-3">
            Správa tiketů
          </h2>
          <p className="text-gray-400 mb-4">
            Sledujte stav požadavků, přiřazujte odpovědné osoby a nastavujte priority.
            Přehledný systém pro IT podporu.
          </p>
          <Link href="/tickets" className="btn-primary">
            Přehled tiketů
          </Link>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-100 mb-3">
            Inventář zařízení
          </h2>
          <p className="text-gray-400 mb-4">
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
