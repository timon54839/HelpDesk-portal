'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

interface Props {
  placeholder?: string
  paramName?: string
}

export default function SearchFilter({
  placeholder = 'Hledat...',
  paramName = 'q',
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const currentValue = searchParams.get(paramName) ?? ''

  function handleSearch() {
    const value = inputRef.current?.value.trim() ?? ''
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(paramName, value)
    } else {
      params.delete(paramName)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch()
  }

  function handleClear() {
    if (inputRef.current) inputRef.current.value = ''
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          defaultValue={currentValue}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input pr-8"
        />
        {currentValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            title="Vymazat"
          >
            &times;
          </button>
        )}
      </div>
      <button onClick={handleSearch} className="btn-primary">
        Hledat
      </button>
    </div>
  )
}
