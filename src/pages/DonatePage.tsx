import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp } from '../hooks/useScrollReveal'

const amounts = [25, 50, 100, 250, 500, 1000]

const campaigns = [
  { id: 'general', title: 'Where Most Needed', description: 'Allocated to the programs with highest need and impact potential.', raised: 1240000, goal: 2000000, urgent: false, color: 'bg-navy-600' },
  { id: 'emergency', title: 'Emergency Relief Fund', description: 'Immediate life-saving assistance for communities struck by crisis.', raised: 847000, goal: 1200000, urgent: true, color: 'bg-red-600' },
  { id: 'education', title: 'Education for Refugees', description: '10,000 refugee children need school materials, teachers, and safe spaces.', raised: 320000, goal: 500000, urgent: false, color: 'bg-blue-600' },
  { id: 'water', title: 'Clean Water Initiative', description: 'Completing 8 remaining wells in Sahel communities without safe water.', raised: 67000, goal: 80000, urgent: false, color: 'bg-emerald-600' },
]

export default function DonatePage() {
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [amount, setAmount] = useState(100)
  const [custom, setCustom] = useState('')
  const [campaign, setCampaign] = useState('general')
  const [step, setStep] = useState<'amount' | 'info' | 'confirm' | 'success'>('amount')
  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvv: '' })

  const effectiveAmount = custom ? Number(custom) : amount

  const impactText = () => {
    if (effectiveAmount >= 1000) return 'funds an entire school program for one month'
    if (effectiveAmount >= 500) return 'provides clean water access for a family for a full year'
    if (effectiveAmount >= 250) return 'equips a mobile health clinic for one week'
    if (effectiveAmount >= 100) return 'provides school supplies for 3 children for a year'
    if (effectiveAmount >= 50) return 'emergency food rations for a family for one week'
    return 'provides one nutritious meal for 5 children'
  }

  const stepIndex = ['amount', 'info', 'confirm'].indexOf(step)

  return (
    <div className="pt-[72px] bg-cream-100 min-h-screen">
      {/* Header */}
      <section className="bg-navy-900 py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ originX: 0, display: 'block' }} className="w-6 h-0.5 bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase">Make a Donation</span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ originX: 1, display: 'block' }} className="w-6 h-0.5 bg-gold-500" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-white font-display text-3xl sm:text-5xl font-bold mb-4">
            Your Gift <em className="text-gold-400 not-italic">Changes Lives</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/55 text-base max-w-xl mx-auto">
            100% of your donation reaches our programs. Every contribution — large or small — has a real and measurable impact.
          </motion.p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campaign selector */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-1 space-y-4"
          >
            <motion.h3 variants={fadeUp} className="text-navy-900 font-display text-xl font-bold mb-4">Choose a Campaign</motion.h3>
            {campaigns.map((c, i) => {
              const pct = Math.round((c.raised / c.goal) * 100)
              return (
                <motion.button
                  key={c.id}
                  variants={fadeUp}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCampaign(c.id)}
                  className={`w-full text-left p-4 rounded-sm border-2 transition-all duration-200 ${
                    campaign === c.id ? 'border-navy-900 bg-white shadow-md' : 'border-slate-200 bg-white hover:border-navy-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 pr-2">
                      {c.urgent && (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wider mr-1.5"
                        >
                          ● Urgent
                        </motion.span>
                      )}
                      <span className="text-navy-900 font-semibold text-sm">{c.title}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${campaign === c.id ? 'border-navy-900 bg-navy-900' : 'border-slate-300'}`} />
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{c.description}</p>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.15 + 0.3 }}
                      className={`h-full ${c.color} rounded-full`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>${(c.raised / 1000).toFixed(0)}K raised</span>
                    <span>{pct}% of ${(c.goal / 1000).toFixed(0)}K</span>
                  </div>
                </motion.button>
              )
            })}

            {/* Trust signals */}
            <motion.div variants={fadeUp} className="bg-white rounded-sm p-5 border border-slate-200">
              <h4 className="text-navy-900 font-semibold text-sm mb-3">Why Trust SCPHD?</h4>
              <ul className="space-y-2">
                {['96¢ of every dollar to programs', 'Charity Navigator 4-star rated', 'GuideStar Platinum Seal', 'Annual independent audit', 'UN ECOSOC consultative status'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
                      className="text-gold-500 font-bold"
                    >
                      ✓
                    </motion.span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Donation form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {step === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="bg-white rounded-sm p-12 text-center shadow-sm"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <span className="text-emerald-600 text-4xl">✓</span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-navy-900 font-display text-3xl font-bold mb-3"
                  >
                    Thank You, {form.name || 'Friend'}!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-600 text-base mb-6 max-w-md mx-auto"
                  >
                    Your ${effectiveAmount} {frequency === 'monthly' ? 'monthly ' : ''}gift has been received. A receipt is on its way to {form.email || 'your email'}.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gold-50 border border-gold-200 rounded-sm p-5 max-w-sm mx-auto mb-8"
                  >
                    <p className="text-gold-800 text-sm font-semibold">Your impact:</p>
                    <p className="text-gold-700 text-sm mt-1">Your gift {impactText()}.</p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setStep('amount'); setForm({ name: '', email: '', card: '', expiry: '', cvv: '' }) }}
                    className="px-8 py-3 bg-navy-900 text-white text-sm font-semibold rounded-sm hover:bg-navy-700 transition-colors"
                  >
                    Make Another Donation
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-sm shadow-sm overflow-hidden"
                >
                  {/* Steps */}
                  <div className="border-b border-slate-100 px-5 sm:px-8 py-4">
                    <div className="flex gap-4 sm:gap-8">
                      {(['amount', 'info', 'confirm'] as const).map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                          <motion.div
                            animate={{
                              backgroundColor: step === s ? '#0B1D3A' : stepIndex > i ? '#C49A2E' : '#F1F5F9',
                              color: step === s || stepIndex > i ? '#fff' : '#94A3B8',
                            }}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          >
                            {stepIndex > i ? '✓' : i + 1}
                          </motion.div>
                          <span className={`text-xs font-medium capitalize hidden sm:block ${step === s ? 'text-navy-900' : 'text-slate-400'}`}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 sm:p-8">
                    <AnimatePresence mode="wait">
                      {/* Step 1 */}
                      {step === 'amount' && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <h3 className="text-navy-900 font-display text-2xl font-bold mb-6">Select Amount</h3>
                          <div className="flex rounded-sm overflow-hidden border border-slate-200 mb-6 w-fit">
                            {(['once', 'monthly'] as const).map((f) => (
                              <motion.button key={f} whileTap={{ scale: 0.96 }} onClick={() => setFrequency(f)}
                                className={`px-6 py-2.5 text-sm font-semibold transition-all capitalize ${frequency === f ? 'bg-navy-900 text-white' : 'text-slate-500 hover:text-slate-800'}`}>
                                {f === 'once' ? 'One-time' : 'Monthly'}
                              </motion.button>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                            {amounts.map((a) => (
                              <motion.button key={a} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}
                                onClick={() => { setAmount(a); setCustom('') }}
                                className={`py-4 text-sm font-bold rounded-sm border-2 transition-all ${amount === a && !custom ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-200 text-slate-700 hover:border-navy-300'}`}>
                                ${a}
                              </motion.button>
                            ))}
                          </div>
                          <div className="mb-6">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Custom Amount</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                              <input type="number" placeholder="Enter amount" value={custom} onChange={(e) => { setCustom(e.target.value); setAmount(0) }}
                                className="w-full pl-7 pr-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors" />
                            </div>
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.div key={effectiveAmount} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                              className="bg-gold-50 border border-gold-200 rounded-sm px-5 py-4 mb-8">
                              <p className="text-gold-800 text-sm"><strong>${effectiveAmount}</strong> {impactText()}.</p>
                            </motion.div>
                          </AnimatePresence>
                          <motion.button whileHover={{ scale: 1.02, backgroundColor: '#D4AA45' }} whileTap={{ scale: 0.98 }}
                            onClick={() => setStep('info')} className="w-full py-4 bg-gold-500 text-navy-900 font-bold text-sm rounded-sm tracking-wide">
                            Continue →
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Step 2 */}
                      {step === 'info' && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <h3 className="text-navy-900 font-display text-2xl font-bold mb-6">Your Information</h3>
                          <div className="space-y-4 mb-8">
                            {[{ k: 'name', l: 'Full Name', ph: 'Jane Smith', t: 'text' }, { k: 'email', l: 'Email Address', ph: 'jane@example.com', t: 'email' }].map(({ k, l, ph, t }) => (
                              <div key={k}>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">{l}</label>
                                <input type={t} placeholder={ph} value={form[k as keyof typeof form]} onChange={(e) => setForm(f => ({ ...f, [k]: e.target.value }))}
                                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors" />
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep('amount')} className="px-6 py-3 border border-slate-200 text-slate-600 text-sm rounded-sm hover:border-slate-300 transition-colors">← Back</motion.button>
                            <motion.button whileHover={{ scale: 1.02, backgroundColor: '#D4AA45' }} whileTap={{ scale: 0.98 }} onClick={() => setStep('confirm')} className="flex-1 py-3 bg-gold-500 text-navy-900 font-bold text-sm rounded-sm">Continue →</motion.button>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 */}
                      {step === 'confirm' && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                          <h3 className="text-navy-900 font-display text-2xl font-bold mb-6">Payment Details</h3>
                          <div className="bg-cream-100 rounded-sm p-4 mb-6">
                            <div className="flex justify-between text-sm"><span className="text-slate-600">Amount</span><span className="text-navy-900 font-bold">${effectiveAmount}{frequency === 'monthly' ? ' / month' : ''}</span></div>
                            <div className="flex justify-between text-sm mt-2"><span className="text-slate-600">Campaign</span><span className="text-navy-900 font-medium">{campaigns.find(c => c.id === campaign)?.title}</span></div>
                          </div>
                          <div className="space-y-4 mb-8">
                            <div>
                              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Card Number</label>
                              <input type="text" placeholder="4242 4242 4242 4242" value={form.card} onChange={(e) => setForm(f => ({ ...f, card: e.target.value }))}
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Expiry</label>
                                <input type="text" placeholder="MM / YY" value={form.expiry} onChange={(e) => setForm(f => ({ ...f, expiry: e.target.value }))}
                                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors" /></div>
                              <div><label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">CVV</label>
                                <input type="text" placeholder="•••" value={form.cvv} onChange={(e) => setForm(f => ({ ...f, cvv: e.target.value }))}
                                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors" /></div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep('info')} className="px-6 py-3 border border-slate-200 text-slate-600 text-sm rounded-sm hover:border-slate-300 transition-colors">← Back</motion.button>
                            <motion.button whileHover={{ scale: 1.02, backgroundColor: '#D4AA45' }} whileTap={{ scale: 0.98 }} onClick={() => setStep('success')}
                              className="flex-1 py-4 bg-gold-500 text-navy-900 font-bold text-sm rounded-sm tracking-wide">
                              🔒 Donate ${effectiveAmount}{frequency === 'monthly' ? ' / month' : ' Now'}
                            </motion.button>
                          </div>
                          <p className="text-center text-slate-400 text-xs mt-4">SSL encrypted · Tax deductible · Receipt via email</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
