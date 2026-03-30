'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card text-center max-w-md">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Chyba v administraci</h2>
        <p className="text-gray-600 mb-6">{error.message || 'Nastala neočekávaná chyba.'}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-primary">Zkusit znovu</button>
          <Link href="/admin/dashboard" className="btn-secondary">Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
