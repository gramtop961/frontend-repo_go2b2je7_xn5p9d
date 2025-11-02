import { useEffect, useState } from 'react'
import { Phone, User, Shield } from 'lucide-react'

const STORAGE_KEY = 'safeguard_emergency_contact'

export default function RegistrationForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const data = JSON.parse(raw)
        setName(data.name || '')
        setPhone(data.phone || '')
        setConsent(true)
      } catch {}
    }
  }, [])

  const save = (e) => {
    e.preventDefault()
    const normalized = phone.replace(/[^\d+]/g, '')
    if (!consent) return
    if (normalized.length < 8) return
    const data = { name: name.trim(), phone: normalized }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold tracking-tight">Trusted contact</h3>
              <p className="text-gray-600 mt-1">
                Add a reference number to notify when you trigger SOS. You can update this any time.
              </p>
            </div>
          </div>

          <form onSubmit={save} className="mt-6 grid md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-sm text-gray-700">Contact name</span>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="e.g. Mom"
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-gray-700">Phone number</span>
              <div className="mt-1 relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+1 555 123 4567"
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">We recommend including your country code.</p>
            </label>

            <div className="flex flex-col justify-end">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                I consent to sharing my location with this contact during SOS
              </label>
              <button
                type="submit"
                disabled={!consent || phone.replace(/[^\d+]/g, '').length < 8}
                className="mt-3 inline-flex justify-center px-4 py-2 rounded-md bg-emerald-600 enabled:hover:bg-emerald-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saved ? 'Saved' : 'Save contact'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
