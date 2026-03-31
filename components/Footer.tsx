export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Helpdesk Portal. Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  )
}
