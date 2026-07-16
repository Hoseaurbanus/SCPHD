import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { Page } from '../App'

interface DonationBannerProps {
  navigate: (p: Page) => void
}

const amounts = [25, 50, 100, 250, 500]

const campaigns = [
  { title: 'Emergency Relief — Gaza', raised: 847000, goal: 1200000, urgent: true, color: 'bg-red-500' },
  { title: 'Education for 10,000 Refugees', raised: 320000, goal: 500000, urgent: false, color: 'bg-blue-500' },
  { title: 'Clean Water Initiative', raised: 67000, goal: 80000, urgent: false, color: 'bg-emerald-500' },
]

const impactLabels: Record<number, string> = {
  25: 'provides emergency food for a family for one week',
  50: 'covers school supplies for 2 children for a full year',
  100: 'trains a community health worker for one month',
  250: 'provides clean water access for a family of 4 for a year',
  500: 'funds a mobile clinic visit to a remote village',
}

export default function DonationBanner({ navigate }: DonationBannerProps) {
  const [selected, setSelected] = useState(100)
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const effective = custom ? Number(custom) : selected
  const impactText = impactLabels[effective] || (effective >= 1000 ? 'funds an entire school program for one month' : 'provides life-saving humanitarian support')

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: Campaigns */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-5"
            >
              Active Campaigns
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-navy-900 font-display font-bold leading-tight mb-10"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Your Gift Creates<br />
              <em className="not-italic text-navy-600">Lasting Change</em>
            </motion.h2>

            <div className="space-y-4 mb-8">
              {campaigns.map((c, i) => {
                const pct = Math.round((c.raised / c.goal) * 100)
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="border border-slate-200 rounded-sm p-5 hover:border-navy-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {c.urgent && (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-sm uppercase tracking-wider mr-2"
                          >
                            ● Urgent
                          </motion.span>
                        )}
                        <span className="text-navy-900 font-semibold text-sm">{c.title}</span>
                      </div>
                      <span className="text-navy-900 font-bold text-sm flex-shrink-0 ml-2">{pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                      <motion.div
                        className={`h-full ${c.color} rounded-full`}
                        initial={{ width: '0%' }}
                        animate={inView ? { width: `${pct}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span className="font-medium text-slate-600">${(c.raised / 1000).toFixed(0)}K raised</span>
                      <span>Goal: ${(c.goal / 1000).toFixed(0)}K</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="bg-gold-50 border-l-4 border-gold-500 px-5 py-4 rounded-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 font-bold text-xs flex-shrink-0">96%</div>
                <div>
                  <p className="text-navy-900 font-semibold text-sm">100% Program Guarantee</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-snug">
                    96¢ of every dollar goes directly to our programs. Overhead covered by institutional grants.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Donation widget */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="bg-navy-900 rounded-sm overflow-hidden relative"
            style={{ boxShadow: '0 32px 80px rgba(11,29,58,0.3)' }}
          >
            {/* Animated top gradient */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

            {/* Glow orb */}
            <motion.div
              className="absolute top-10 right-10 w-40 h-40 rounded-full pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.14, 0.06] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.6) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 p-8 lg:p-10">
              <h3 className="text-white font-display text-2xl font-bold mb-1.5">Make a Donation</h3>
              <p className="text-white/45 text-sm mb-7">Secure. Tax-deductible. Transformative.</p>

              {/* Frequency */}
              <div className="flex gap-2 mb-6">
                {(['once', 'monthly'] as const).map((f) => (
                  <motion.button
                    key={f}
                    onClick={() => setFrequency(f)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-sm border transition-all duration-300 capitalize ${
                      frequency === f
                        ? 'bg-gold-500 border-gold-500 text-navy-900'
                        : 'border-white/15 text-white/50 hover:border-white/35 hover:text-white/80'
                    }`}
                  >
                    {f === 'once' ? 'One-Time' : 'Monthly'}
                    {f === 'monthly' && <span className="ml-1.5 text-[10px] opacity-70">Save 10%</span>}
                  </motion.button>
                ))}
              </div>

              {/* Amount grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
                {amounts.map((amt) => (
                  <motion.button
                    key={amt}
                    onClick={() => { setSelected(amt); setCustom('') }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`py-3.5 text-sm font-bold rounded-sm border-2 transition-all duration-200 ${
                      selected === amt && !custom
                        ? 'bg-gold-500 border-gold-500 text-navy-900 shadow-lg shadow-gold-500/30'
                        : 'border-white/12 text-white/60 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    ${amt}
                  </motion.button>
                ))}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                  <input
                    type="number"
                    placeholder="Other"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(0) }}
                    className="w-full pl-7 pr-3 py-3.5 bg-transparent border-2 border-white/12 text-white text-sm placeholder-white/25 rounded-sm focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>

              {/* Impact chip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={effective}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/7 border border-white/10 rounded-sm px-4 py-3 mb-6 text-xs"
                >
                  <span className="text-gold-400">
                    <strong className="text-gold-300">${effective}</strong> {impactText}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Donate button */}
              <motion.button
                onClick={() => navigate('donate')}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(196,154,46,0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-4 bg-gold-500 text-navy-900 font-bold text-sm rounded-sm tracking-wide mb-4"
              >
                Donate ${effective} {frequency === 'monthly' ? '/ Month' : 'Securely'} →
              </motion.button>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-4 text-white/25 text-[10px]">
                <span className="flex items-center gap-1.5">🔒 SSL Encrypted</span>
                <span>·</span>
                <span>Tax Deductible</span>
                <span>·</span>
                <span>Instant Receipt</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
