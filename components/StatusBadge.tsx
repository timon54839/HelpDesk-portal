import type { TicketStatus, TicketPriority } from '@/types'

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  OPEN: { label: 'Otevřený', className: 'bg-emerald-900/60 text-emerald-300 ring-1 ring-emerald-700' },
  IN_PROGRESS: { label: 'Probíhá', className: 'bg-yellow-900/60 text-yellow-300 ring-1 ring-yellow-700' },
  DONE: { label: 'Hotovo', className: 'bg-gray-800 text-gray-400 ring-1 ring-gray-700' },
}

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  LOW: { label: 'Nízká', className: 'bg-blue-900/60 text-blue-300 ring-1 ring-blue-700' },
  MEDIUM: { label: 'Střední', className: 'bg-orange-900/60 text-orange-300 ring-1 ring-orange-700' },
  HIGH: { label: 'Vysoká', className: 'bg-red-900/60 text-red-300 ring-1 ring-red-700' },
}

export function StatusBadge({ status }: { status: TicketStatus }) {
  const config = statusConfig[status]
  return <span className={`badge ${config.className}`}>{config.label}</span>
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = priorityConfig[priority]
  return <span className={`badge ${config.className}`}>{config.label}</span>
}
