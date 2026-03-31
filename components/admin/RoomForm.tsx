'use client'

import { useState, useTransition } from 'react'
import type { Room, CreateRoomDto } from '@/types'

interface Props {
  initial?: Room
  onSubmit: (data: CreateRoomDto) => Promise<void>
}

export default function RoomForm({ initial, onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const floor = Number(fd.get('floor'))
    if (isNaN(floor) || floor < 0) {
      setError('Patro musí být kladné číslo nebo 0')
      return
    }
    const data: CreateRoomDto = {
      name: fd.get('name') as string,
      floor,
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
        <label htmlFor="name" className="label">Název místnosti *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initial?.name}
          className="input"
          placeholder="Učebna 302"
        />
      </div>
      <div>
        <label htmlFor="floor" className="label">Patro *</label>
        <input
          id="floor"
          name="floor"
          type="number"
          required
          min={0}
          defaultValue={initial?.floor ?? 0}
          className="input"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? 'Ukládám...' : initial ? 'Uložit změny' : 'Vytvořit místnost'}
        </button>
        <a href="/admin/rooms" className="btn-secondary">Zrušit</a>
      </div>
    </form>
  )
}
