import type { TicketStatus, TicketPriority } from '@/types'

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  OPEN: { label: 'Otevřený', className: 'bg-green-100 text-green-800' },
  IN_PROGRESS: { label: 'Probíhá', className: 'bg-yellow-100 text-yellow-800' },
  DONE: { label: 'Hotovo', className: 'bg-gray-100 text-gray-700' },
}

const priorityConfig: Record<TicketPriority, { label: string; className: string }> = {
  LOW: { label: 'Nízká', className: 'bg-blue-100 text-blue-800' },
  MEDIUM: { label: 'Střední', className: 'bg-orange-100 text-orange-800' },
  HIGH: { label: 'Vysoká', className: 'bg-red-100 text-red-800' },
}

export function StatusBadge({ status }: { status: TicketStatus }) {
  const config = statusConfig[status]
  return <span className={`badge ${config.className}`}>{config.label}</span>
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = priorityConfig[priority]
  return <span className={`badge ${config.className}`}>{config.label}</span>
}
