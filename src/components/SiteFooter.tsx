export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-neutral-200 px-4 py-6 text-sm text-neutral-600">
      <div className="mx-auto max-w-6xl flex items-center justify-center gap-3">
        <a href="/privacy" className="underline">Privacy Policy</a>
        <span>·</span>
        <a href="/terms" className="underline">Terms of Service</a>
      </div>
    </footer>
  )
}