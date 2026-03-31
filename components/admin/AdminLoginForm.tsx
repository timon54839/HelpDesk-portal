'use client'

import { useActionState } from 'react'
import { adminLogin } from '@/lib/actions'

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLogin, null)

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <div className="rounded-lg border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      )}
      <div>
        <label htmlFor="password" className="label">
          Heslo
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="input"
          placeholder="••••••••"
        />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? 'Přihlašování...' : 'Přihlásit se'}
      </button>
    </form>
  )
}
