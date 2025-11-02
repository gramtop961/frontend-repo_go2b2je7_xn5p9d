import { Shield, Phone, MapPin } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Register safely',
      desc: 'Add a trusted contact with your consent. You control and can change it anytime.',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Quick trigger',
      desc: 'Press the SOS button (or power button 3 times on mobile) when you feel unsafe.',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Share live location',
      desc: 'Your coordinates are shared to your contact and nearest police desk within seconds.',
    },
  ]

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold tracking-tight">How it works</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <div className="h-9 w-9 rounded-md bg-rose-100 text-rose-700 grid place-items-center">
                  {s.icon}
                </div>
                <h4 className="mt-3 font-medium text-gray-900">{s.title}</h4>
                <p className="mt-1.5 text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
