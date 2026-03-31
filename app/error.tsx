'use client'

import { useEffect } from 'react'

export default function Error({
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
        <h2 className="text-xl font-semibold text-gray-100 mb-2">Něco se pokazilo</h2>
        <p className="text-gray-400 mb-6">{error.message || 'Nastala neočekávaná chyba.'}</p>
        <button onClick={reset} className="btn-primary">
          Zkusit znovu
        </button>
      </div>
    </div>
  )
}
