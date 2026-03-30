'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const types = [
  { value: '', label: 'Vše' },
  { value: 'PC', label: 'PC' },
  { value: 'NOTEBOOK', label: 'Notebook' },
  { value: 'PRINTER', label: 'Tiskárna' },
  { value: 'OTHER', label: 'Ostatní' },
]

export default function TypeFilter({ currentType }: { currentType?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('type', value)
    } else {
      params.delete('type')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      value={currentType ?? ''}
      onChange={(e) => handleChange(e.target.value)}
      className="input w-auto"
    >
      {types.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  )
}
