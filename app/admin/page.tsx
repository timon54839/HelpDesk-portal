// Admin login – SSR
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminLogin } from '@/lib/actions'

export const metadata: Metadata = {
  title: 'Admin přihlášení',
  description: 'Přihlášení do administrace helpdesk portálu.',
}

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (session?.value === 'authenticated') {
    redirect('/admin/dashboard')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="card w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg mx-auto mb-3">
            HP
          </div>
          <h1 className="text-xl font-bold text-gray-900">Administrace</h1>
          <p className="text-sm text-gray-500 mt-1">Zadejte heslo pro vstup</p>
        </div>

        <form action={adminLogin} className="space-y-4">
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
          <button type="submit" className="btn-primary w-full">
            Přihlásit se
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Výchozí heslo: <code className="bg-gray-100 px-1 rounded">admin123</code>
          <br />
          (nastavte <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code> v .env)
        </p>
      </div>
    </div>
  )
}
