import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card text-center max-w-md">
        <div className="text-6xl font-bold text-gray-200 mb-2">404</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Stránka nenalezena</h2>
        <p className="text-gray-600 mb-6">Požadovaná stránka neexistuje nebo byla přesunuta.</p>
        <Link href="/" className="btn-primary">
          Zpět na úvod
        </Link>
      </div>
    </div>
  )
}
