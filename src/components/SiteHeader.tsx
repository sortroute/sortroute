export default function SiteHeader() {
  return (
    <header className="w-full border-b border-neutral-200 px-4 py-3">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <span className="text-lg font-semibold">Sortroute</span>
        <nav className="flex gap-6 text-sm">
          <a href="/" className="hover:underline">Home</a>
        </nav>
      </div>
    </header>
  )
}