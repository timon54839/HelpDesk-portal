import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
              HP
            </div>
            <span className="text-lg font-semibold text-gray-900">Helpdesk Portal</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/persons"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Osoby
            </Link>
            <Link
              href="/rooms"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Místnosti
            </Link>
            <Link
              href="/devices"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Zařízení
            </Link>
            <Link
              href="/tickets"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Tikety
            </Link>
            <Link
              href="/admin"
              className="btn-primary text-sm"
            >
              Administrace
            </Link>
          </div>
          {/* Mobile menu */}
          <div className="flex md:hidden gap-3 text-sm">
            <Link href="/tickets" className="text-gray-600 hover:text-blue-600">Tikety</Link>
            <Link href="/admin" className="btn-primary">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
