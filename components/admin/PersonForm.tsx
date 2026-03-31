'use client'

import { useState, useTransition } from 'react'
import type { Person, CreatePersonDto, JobPosition } from '@/types'

interface Props {
  initial?: Person
  onSubmit: (data: CreatePersonDto) => Promise<void>
}

const positions: { value: JobPosition; label: string }[] = [
  { value: 'STUDENT', label: 'Student' },
  { value: 'TEACHER', label: 'Učitel' },
  { value: 'TECHNICIAN', label: 'Technik' },
  { value: 'ADMIN', label: 'Admin' },
]

export default function PersonForm({ initial, onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const data: CreatePersonDto = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      jobPosition: fd.get('jobPosition') as JobPosition,
    }
    startTransition(async () => {
      try {
        await onSubmit(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nastala chyba')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="label">Jméno *</label>
        <input id="name" name="name" type="text" required maxLength={120}
          defaultValue={initial?.name} className="input" placeholder="Jan Novák" />
      </div>
      <div>
        <label htmlFor="email" className="label">E-mail *</label>
        <input id="email" name="email" type="email" required
          defaultValue={initial?.email} className="input" placeholder="jan.novak@skola.cz" />
      </div>
      <div>
        <label htmlFor="jobPosition" className="label">Pozice *</label>
        <select id="jobPosition" name="jobPosition" required
          defaultValue={initial?.jobPosition ?? 'STUDENT'} className="input">
          {positions.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? 'Ukládám...' : initial ? 'Uložit změny' : 'Vytvořit osobu'}
        </button>
        <a href="/admin/persons" className="btn-secondary">Zrušit</a>
      </div>
    </form>
  )
}
