// Admin login – SSR
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

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
      <div className="card w-full max-w-sm border-gray-700">
        <div className="text-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg mx-auto mb-3 shadow-lg shadow-indigo-900/50">
            HP
          </div>
          <h1 className="text-xl font-bold text-gray-100">Administrace</h1>
          <p className="text-sm text-gray-500 mt-1">Zadejte heslo pro vstup</p>
        </div>

        <AdminLoginForm />

        <p className="text-xs text-gray-600 text-center mt-4">
          Výchozí heslo: <code className="bg-gray-800 text-gray-300 px-1 rounded">admin123</code>
          <br />
          (nastavte <code className="bg-gray-800 text-gray-300 px-1 rounded">ADMIN_PASSWORD</code> v .env)
        </p>
      </div>
    </div>
  )
}
