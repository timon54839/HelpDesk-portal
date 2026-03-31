import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              HP
            </div>
            <span className="text-lg font-semibold text-gray-100">Helpdesk Portal</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <Link href="/persons" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg transition-colors">
              Osoby
            </Link>
            <Link href="/rooms" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg transition-colors">
              Místnosti
            </Link>
            <Link href="/devices" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg transition-colors">
              Zařízení
            </Link>
            <Link href="/tickets" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg transition-colors">
              Tikety
            </Link>
            <Link href="/admin" className="ml-3 btn-primary text-sm">
              Administrace
            </Link>
          </div>
          <div className="flex md:hidden gap-2 text-sm">
            <Link href="/tickets" className="px-3 py-2 text-gray-400 hover:text-gray-100">Tikety</Link>
            <Link href="/admin" className="btn-primary">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
