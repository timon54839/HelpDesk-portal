'use client'

import { useState, useTransition } from 'react'
import type { Ticket, CreateTicketDto, TicketStatus, TicketPriority, Person, Device } from '@/types'

interface Props {
  initial?: Ticket
  persons: Person[]
  devices: Device[]
  onSubmit: (data: CreateTicketDto) => Promise<void>
}

const statuses: { value: TicketStatus; label: string }[] = [
  { value: 'OPEN', label: 'Otevřený' },
  { value: 'IN_PROGRESS', label: 'Probíhá' },
  { value: 'DONE', label: 'Hotovo' },
]

const priorities: { value: TicketPriority; label: string }[] = [
  { value: 'LOW', label: 'Nízká' },
  { value: 'MEDIUM', label: 'Střední' },
  { value: 'HIGH', label: 'Vysoká' },
]

export default function TicketForm({ initial, persons, devices, onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const data: CreateTicketDto = {
      title: fd.get('title') as string,
      description: fd.get('description') as string,
      status: fd.get('status') as TicketStatus,
      priority: fd.get('priority') as TicketPriority,
      assignedPersonId: fd.get('assignedPersonId') as string,
      deviceId: (fd.get('deviceId') as string) || undefined,
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
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="title" className="label">Název tiketu *</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initial?.title}
          className="input"
          placeholder="Nefunguje tiskárna v A12"
        />
      </div>
      <div>
        <label htmlFor="description" className="label">Popis *</label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={initial?.description}
          className="input resize-y"
          placeholder="Po zapnutí hlásí chybu a netiskne..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="label">Stav</label>
          <select
            id="status"
            name="status"
            defaultValue={initial?.status ?? 'OPEN'}
            className="input"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="label">Priorita</label>
          <select
            id="priority"
            name="priority"
            defaultValue={initial?.priority ?? 'MEDIUM'}
            className="input"
          >
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="assignedPersonId" className="label">Přiřazená osoba *</label>
        <select
          id="assignedPersonId"
          name="assignedPersonId"
          required
          defaultValue={initial?.assignedPersonId}
          className="input"
        >
          <option value="">-- Vyberte osobu --</option>
          {persons.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.email})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="deviceId" className="label">Zařízení (volitelné)</label>
        <select
          id="deviceId"
          name="deviceId"
          defaultValue={initial?.deviceId ?? ''}
          className="input"
        >
          <option value="">-- Bez zařízení --</option>
          {devices.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.type})
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary">
          {isPending ? 'Ukládám...' : initial ? 'Uložit změny' : 'Vytvořit tiket'}
        </button>
        <a href="/admin/tickets" className="btn-secondary">Zrušit</a>
      </div>
    </form>
  )
}
