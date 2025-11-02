import { useEffect, useRef, useState } from 'react'
import { MapPin, Send } from 'lucide-react'

export default function SOSPanel() {
  const [coords, setCoords] = useState(null)
  const [status, setStatus] = useState('idle') // idle | locating | ready | sending | sent | error
  const [message, setMessage] = useState('')
  const [countdown, setCountdown] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    // Attempt to prefetch location for faster SOS
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        })
        setStatus('ready')
      },
      () => setStatus('idle'),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 8000 }
    )
  }, [])

  const acquireLocation = async () => {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setMessage('Location not supported on this device/browser')
      return
    }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        })
        setStatus('ready')
      },
      err => {
        setStatus('error')
        setMessage(err.message || 'Unable to get your location')
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
    )
  }

  const startSOS = () => {
    if (!coords) {
      acquireLocation()
      return
    }
    setStatus('sending')
    setCountdown(5)
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timerRef.current)
          // Simulate sending; in the full app this will call your backend
          setTimeout(() => {
            setStatus('sent')
            setMessage('Your live location was shared with your trusted contact and local authorities.')
          }, 400)
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelSOS = () => {
    clearInterval(timerRef.current)
    setCountdown(null)
    setStatus('ready')
    setMessage('SOS cancelled')
  }

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
              Instant SOS with location
            </h2>
            <p className="mt-2 text-gray-600">
              If you feel unsafe, press the SOS button. We'll attach your live location and
              share it with your trusted contact and the nearest police desk. On supported
              devices, the mobile app can also trigger this by pressing the power button 3 times.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <div className="inline-flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-rose-600" />
                <span>
                  {coords
                    ? `Ready • ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)} (±${coords.accuracy}m)`
                    : 'Location not ready'}
                </span>
              </div>
              {status === 'locating' && (
                <span className="text-amber-600">Getting your location…</span>
              )}
              {status === 'error' && (
                <span className="text-rose-600">{message}</span>
              )}
              {status === 'sent' && (
                <span className="text-emerald-600">{message}</span>
              )}
              {status === 'sending' && countdown !== null && (
                <div className="text-amber-700">
                  Sending in {countdown}s…
                  <button onClick={cancelSOS} className="ml-3 underline">
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={startSOS}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <Send className="h-4 w-4" />
                {status === 'sending' ? 'Sending…' : 'Send SOS'}
              </button>
              <button
                onClick={acquireLocation}
                className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700"
              >
                Refresh location
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square w-full max-w-sm mx-auto rounded-full border-8 border-rose-100 grid place-items-center bg-rose-50">
              <button
                onClick={startSOS}
                className="h-48 w-48 md:h-56 md:w-56 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 transition text-white text-4xl font-extrabold tracking-widest shadow-lg"
                aria-label="SOS"
              >
                SOS
              </button>
            </div>
            <p className="text-center mt-4 text-xs text-gray-500">
              Note: Power button triple-press detection requires the native mobile app.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
