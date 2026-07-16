import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoginPageProps {
  navigate: (p: any) => void
}

export default function LoginPage({ navigate }: LoginPageProps) {
  const [tab, setTab] = useState<'signin' | 'register'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'volunteer', org: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      const dest =
        form.email.startsWith('admin') || form.role === 'admin' ? 'admin' :
        form.role === 'donor' || form.role === 'partner' ? 'donor' :
        'portal'
      setTimeout(() => navigate(dest), 1200)
    }, 1600)
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-100/95 to-navy-900/20" />
      </div>

      {/* Floating orb */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 rounded-full pointer-events-none hidden lg:block"
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.4) 0%, transparent 70%)' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-56 h-56 rounded-full pointer-events-none hidden lg:block"
        animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ background: 'radial-gradient(circle, rgba(11,29,58,0.4) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / back */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-navy-900 rounded-sm flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="#C49A2E"/>
              </svg>
            </div>
            <div>
              <div className="text-navy-900 font-display font-bold text-sm leading-tight">SCPHD</div>
              <div className="text-slate-400 text-[10px] tracking-widest uppercase">Member Portal</div>
            </div>
          </button>
          <button
            onClick={() => navigate('home')}
            className="text-slate-400 hover:text-navy-900 text-xs transition-colors flex items-center gap-1"
          >
            ← Back to site
          </button>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="bg-white rounded-sm shadow-xl shadow-navy-900/8 border border-slate-100 overflow-hidden"
        >
          {/* Tab switcher */}
          <div className="flex border-b border-slate-100">
            {(['signin', 'register'] as const).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setSuccess(false) }}
                className={`flex-1 py-4 text-sm font-bold tracking-wide transition-all duration-300 relative ${
                  tab === t ? 'text-navy-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
                {tab === t && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-navy-900 text-2xl font-bold">✓</span>
                  </motion.div>
                  <h3 className="text-navy-900 font-display font-bold text-xl mb-2">Welcome!</h3>
                  <p className="text-slate-400 text-sm">Redirecting to your dashboard…</p>
                </motion.div>
              ) : (
                <motion.form
                  key={tab}
                  initial={{ opacity: 0, x: tab === 'signin' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: tab === 'signin' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-navy-900 font-display font-bold text-2xl mb-1">
                      {tab === 'signin' ? 'Welcome back' : 'Join our mission'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {tab === 'signin'
                        ? 'Sign in to access your volunteer dashboard.'
                        : 'Create an account to volunteer, donate, and track your impact.'}
                    </p>
                  </div>

                  {tab === 'register' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1.5 tracking-wide uppercase">Full Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Dr. Amara Diallo"
                          className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-navy-900 placeholder-slate-300 focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-900 mb-1.5 tracking-wide uppercase">I am a</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { val: 'volunteer', label: 'Volunteer' },
                            { val: 'donor', label: 'Donor' },
                            { val: 'partner', label: 'Partner Org' },
                            { val: 'admin', label: 'Staff/Admin' },
                          ].map(({ val, label }) => (
                            <button
                              type="button"
                              key={val}
                              onClick={() => setForm(f => ({ ...f, role: val }))}
                              className={`py-2.5 text-xs font-bold rounded-sm border transition-all duration-200 ${
                                form.role === val
                                  ? 'bg-navy-900 text-white border-navy-900'
                                  : 'border-slate-200 text-slate-500 hover:border-navy-400'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1.5 tracking-wide uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-navy-900 placeholder-slate-300 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-navy-900 tracking-wide uppercase">Password</label>
                      {tab === 'signin' && (
                        <button type="button" className="text-gold-600 text-xs hover:text-gold-700 transition-colors">
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={form.password}
                        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-navy-900 placeholder-slate-300 focus:outline-none focus:border-gold-500 transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors text-xs"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {tab === 'signin' && (
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" className="w-3.5 h-3.5 accent-gold-500" />
                      <span className="text-slate-500 text-xs group-hover:text-slate-700 transition-colors">Keep me signed in</span>
                    </label>
                  )}

                  {tab === 'register' && (
                    <p className="text-slate-400 text-xs leading-relaxed">
                      By creating an account you agree to our{' '}
                      <a href="#" className="text-gold-600 hover:text-gold-700">Terms of Service</a>{' '}
                      and{' '}
                      <a href="#" className="text-gold-600 hover:text-gold-700">Privacy Policy</a>.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02, boxShadow: '0 0 30px rgba(196,154,46,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-navy-900 text-white font-bold text-sm py-3.5 rounded-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        {tab === 'signin' ? 'Signing in…' : 'Creating account…'}
                      </>
                    ) : (
                      tab === 'signin' ? 'Sign In to Portal' : 'Create Account'
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-slate-300 text-xs">or continue with</span>
                    <div className="flex-1 h-px bg-slate-100" />
                  </div>

                  {/* Social */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Google', icon: 'G' },
                      { name: 'LinkedIn', icon: 'in' },
                    ].map(({ name, icon }) => (
                      <motion.button
                        key={name}
                        type="button"
                        whileHover={{ borderColor: '#C49A2E', scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 border border-slate-200 rounded-sm py-2.5 text-sm text-slate-600 hover:text-slate-800 transition-all duration-200"
                      >
                        <span className="font-bold text-navy-900">{icon}</span>
                        {name}
                      </motion.button>
                    ))}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-400 text-xs mt-6"
        >
          Protected by 256-bit encryption · SCPHD Member Portal v2.0
        </motion.p>
      </div>
    </div>
  )
}
