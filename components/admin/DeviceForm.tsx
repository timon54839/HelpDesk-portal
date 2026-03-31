'use client'

import { useState, useTransition } from 'react'
import type { Device, CreateDeviceDto, DeviceType, Room } from '@/types'

interface Props {
  initial?: Device
  rooms: Room[]
  onSubmit: (data: CreateDeviceDto) => Promise<void>
}

const deviceTypes: { value: DeviceType; label: string }[] = [
  { value: 'PC', label: 'PC' },
  { value: 'NOTEBOOK', label: 'Notebook' },
  { value: 'PRINTER', label: 'Tiskárna' },
  { value: 'OTHER', label: 'Ostatní' },
]

export default function DeviceForm({ initial, rooms, onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const data: CreateDeviceDto = {
      name: fd.get('name') as string,
      type: fd.get('type') as DeviceType,
      serialNumber: (fd.get('serialNumber') as string) || undefined,
      roomId: fd.get('roomId') as string,
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
        <label htmlFor="name" className="label">Název zařízení *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initial?.name}
          className="input"
          placeholder="PC učitele"
        />
      </div>
      <div>
        <label htmlFor="type" className="label">Typ *</label>
        <select
          id="type"
          name="type"
          required
          defaultValue={initial?.type ?? 'PC'}
          className="input"
        >
          {deviceTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="serialNumber" className="label">Sériové číslo</label>
        <input
          id="serialNumber"
          name="serialNumber"
          type="text"
          defaultValue={initial?.serialNumber}
          className="input"
          placeholder="SN-123456"
        />
      </div>
      <div>
        <label htmlFor="roomId" className="label">Místnost *</label>
        <select
          id="roomId"
          name="roomId"
          required
          defaultValue={initial?.roomId}
          className="input"
        >
          <option value="">-- Vyberte místnost --</option>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} (patro {r.floor})
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? 'Ukládám...' : initial ? 'Uložit změny' : 'Vytvořit zařízení'}
        </button>
        <a href="/admin/devices" className="btn-secondary">Zrušit</a>
      </div>
    </form>
  )
}
