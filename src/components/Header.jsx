import { Shield, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-rose-500 text-white grid place-items-center shadow">
            <Shield className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Safeguard</span>
        </div>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-sm text-gray-700"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </header>
  )
}
