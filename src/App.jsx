import Header from './components/Header'
import SOSPanel from './components/SOSPanel'
import RegistrationForm from './components/RegistrationForm'
import HowItWorks from './components/HowItWorks'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-blue-50 text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-10 md:space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Feel safer with instant SOS
          </h1>
          <p className="mt-3 text-gray-600">
            A simple safety app for women: tap once to share your live location with your trusted
            contact and the nearest police desk. Fast, discreet, and built for real moments.
          </p>
        </div>

        <SOSPanel />
        <RegistrationForm />
        <HowItWorks />

        <p className="text-center text-xs text-gray-500">
          This web demo showcases the flow. Power button triple-press is available in the native app.
        </p>
      </main>
    </div>
  )
}

export default App
