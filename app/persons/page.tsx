// Persons list – ISR (obnovuje se každých 60 sekund nebo přes revalidateTag)
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { getPersons } from '@/lib/cache'
import SearchFilter from '@/components/SearchFilter'
import PersonList from './PersonList'

export const metadata: Metadata = {
  title: 'Osoby',
  description: 'Přehled všech registrovaných osob v systému.',
}

// ISR – revaliduje se každých 60 sekund nebo po admin akci (revalidateTag)
export const revalidate = 60

export default async function PersonsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const persons = await getPersons()

  const filtered = q
    ? persons.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.email.toLowerCase().includes(q.toLowerCase())
      )
    : persons

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Osoby</h1>
          <p className="text-sm text-gray-500 mt-1">
            Celkem {filtered.length} {filtered.length !== persons.length && `z ${persons.length}`} osob
          </p>
        </div>
      </div>

      <div className="mb-6 max-w-md">
        <Suspense>
          <SearchFilter placeholder="Hledat podle jména nebo e-mailu (Enter)" />
        </Suspense>
      </div>

      <Suspense fallback={<div className="text-gray-500">Načítání...</div>}>
        <PersonList persons={filtered} />
      </Suspense>
    </div>
  )
}
