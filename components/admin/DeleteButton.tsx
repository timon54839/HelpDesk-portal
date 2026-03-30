'use client'

import { useState, useTransition } from 'react'

interface Props {
  id: string
  label: string
  deleteAction: (id: string) => Promise<void>
}

export default function DeleteButton({ id, label, deleteAction }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-gray-600">Smazat?</span>
        <button
          onClick={() => startTransition(() => deleteAction(id))}
          disabled={isPending}
          className="btn-danger text-xs"
        >
          {isPending ? '...' : 'Ano'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="btn-secondary text-xs"
        >
          Ne
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="btn-danger text-xs"
    >
      Smazat
    </button>
  )
}
