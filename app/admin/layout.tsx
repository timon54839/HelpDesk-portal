import { cookies } from 'next/headers'
import Link from 'next/link'
import { adminLogout } from '@/lib/actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const isAuthenticated = session?.value === 'authenticated'

  return (
    <div className="flex min-h-screen flex-col">
      {isAuthenticated && (
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-12 items-center justify-between">
              <nav className="flex items-center gap-1 text-sm">
                <Link
                  href="/admin/dashboard"
                  className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/persons"
                  className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
                >
                  Osoby
                </Link>
                <Link
                  href="/admin/rooms"
                  className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
                >
                  Místnosti
                </Link>
                <Link
                  href="/admin/devices"
                  className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
                >
                  Zařízení
                </Link>
                <Link
                  href="/admin/tickets"
                  className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
                >
                  Tikety
                </Link>
              </nav>
              <form action={adminLogout}>
                <button
                  type="submit"
                  className="text-sm text-gray-500 hover:text-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Odhlásit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  )
}
