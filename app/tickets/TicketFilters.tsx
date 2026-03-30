'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function TicketFilters({
  currentStatus,
  currentPriority,
}: {
  currentStatus?: string
  currentPriority?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      <select
        value={currentStatus ?? ''}
        onChange={(e) => update('status', e.target.value)}
        className="input w-auto"
      >
        <option value="">Všechny stavy</option>
        <option value="OPEN">Otevřený</option>
        <option value="IN_PROGRESS">Probíhá</option>
        <option value="DONE">Hotovo</option>
      </select>
      <select
        value={currentPriority ?? ''}
        onChange={(e) => update('priority', e.target.value)}
        className="input w-auto"
      >
        <option value="">Všechny priority</option>
        <option value="LOW">Nízká</option>
        <option value="MEDIUM">Střední</option>
        <option value="HIGH">Vysoká</option>
      </select>
    </div>
  )
}
