import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-500/3 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)'
        }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/images/favicon/Logo.jpg" alt="Springfield Centre" className="h-14 w-auto object-contain" />
          </Link>
        </div>

        <div className="bg-navy-900/50 backdrop-blur-xl border border-navy-800 rounded-sm p-8">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
