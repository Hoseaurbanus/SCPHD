import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/helpers'
import Button from '@/components/ui/Button'

const presetAmounts = [25, 50, 100, 250, 500, 1000]

const steps = ['Amount', 'Details', 'Payment', 'Success']

export default function DonatePage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time')
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvv: '', nameOnCard: '' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const effectiveAmount = customAmount ? (parseInt(customAmount, 10) || 0) : amount

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleDonate = () => {
    setStep(4)
  }

  return (
    <>
      <Helmet>
        <title>Donate — SCPHD | Make a Difference Today</title>
        <meta name="description" content="Support SCPHD's humanitarian programs. Your donation provides emergency relief, education, healthcare, and peacebuilding." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-950" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            Make a Donation
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Your Gift Creates<br />
            <em className="not-italic gradient-text">Lasting Change</em>
          </motion.h1>
        </div>
      </section>

      {/* Donation Wizard */}
      <section className="bg-cream-100 dark:bg-navy-950 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Step indicators */}
          {step < 4 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: i + 1 === step ? 1.1 : 1 }}
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300',
                        i + 1 < step ? 'bg-emerald-500 text-white' : i + 1 === step ? 'bg-gold-500 text-navy-900' : 'bg-navy-200 dark:bg-navy-700 text-navy-500 dark:text-white/40'
                      )}
                    >
                      {i + 1 < step ? '✓' : i + 1}
                    </motion.div>
                    <span className={cn('text-xs font-semibold hidden sm:inline', i + 1 === step ? 'text-navy-900 dark:text-white' : 'text-slate-400 dark:text-white/30')}>{s}</span>
                    {i < steps.length - 1 && <div className={cn('w-8 lg:w-16 h-px mx-2', i + 1 < step ? 'bg-emerald-500' : 'bg-navy-200 dark:bg-navy-700')} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Amount */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-8"
              >
                <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Select Amount</h2>
                <p className="text-slate-500 dark:text-white/45 text-sm mb-8">Choose a donation amount or enter a custom value.</p>

                {/* Frequency */}
                <div className="flex gap-2 mb-6">
                  {(['one-time', 'monthly'] as const).map((f) => (
                    <motion.button
                      key={f}
                      onClick={() => setFrequency(f)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'flex-1 py-3 text-sm font-bold rounded-sm border transition-all duration-300 capitalize',
                        frequency === f
                          ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 border-navy-900 dark:border-gold-500'
                          : 'border-navy-200 dark:border-navy-700 text-slate-500 dark:text-white/40 hover:border-navy-400'
                      )}
                    >
                      {f === 'one-time' ? 'One-Time' : 'Monthly'}
                    </motion.button>
                  ))}
                </div>

                {/* Amount grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amt) => (
                    <motion.button
                      key={amt}
                      onClick={() => { setAmount(amt); setCustomAmount('') }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={cn(
                        'py-4 text-sm font-bold rounded-sm border-2 transition-all duration-200',
                        amount === amt && !customAmount
                          ? 'bg-gold-500 border-gold-500 text-navy-900 shadow-lg shadow-gold-500/30'
                          : 'border-navy-200 dark:border-navy-700 text-navy-700 dark:text-white/50 hover:border-navy-400 dark:hover:border-navy-500'
                      )}
                    >
                      {formatCurrency(amt)}
                    </motion.button>
                  ))}
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30 text-sm">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3.5 border border-navy-200 dark:border-navy-700 rounded-sm text-navy-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all bg-white dark:bg-navy-800"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
                  <Button variant="primary" size="md" onClick={nextStep} disabled={effectiveAmount < 1}>Continue →</Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-8"
              >
                <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Your Information</h2>
                <p className="text-slate-500 dark:text-white/45 text-sm mb-8">We'll send your tax-deductible receipt to your email.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData(f => ({ ...f, firstName: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData(f => ({ ...f, lastName: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all resize-none dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                      placeholder="Leave a note with your donation..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
                  <Button variant="primary" size="md" onClick={nextStep}>Continue to Payment →</Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-8"
              >
                <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Payment Details</h2>
                <p className="text-slate-500 dark:text-white/45 text-sm mb-8">Your payment is secured with 256-bit SSL encryption.</p>

                {/* Order summary */}
                <div className="bg-cream-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-sm p-5 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 dark:text-white/40 text-sm">Frequency</span>
                    <span className="text-navy-900 dark:text-white text-sm font-semibold capitalize">{frequency}</span>
                  </div>
                  <div className="border-t border-navy-200 dark:border-navy-700 mt-3 pt-3 flex justify-between items-center">
                    <span className="text-navy-900 dark:text-white font-bold">Total</span>
                    <span className="text-gold-600 dark:text-gold-400 font-[family-name:var(--font-display)] text-2xl font-bold">{formatCurrency(effectiveAmount)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      value={paymentData.nameOnCard}
                      onChange={(e) => setPaymentData(p => ({ ...p, nameOnCard: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData(p => ({ ...p, cardNumber: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData(p => ({ ...p, expiry: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData(p => ({ ...p, cvv: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400 dark:text-white/25 text-[10px] mt-6 mb-8">
                  <span className="flex items-center gap-1.5">🔒 SSL Encrypted</span>
                  <span>·</span>
                  <span>Tax Deductible</span>
                  <span>·</span>
                  <span>Instant Receipt</span>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" size="md" onClick={prevStep}>← Back</Button>
                  <Button variant="primary" size="lg" onClick={handleDonate} className="btn-primary">
                    Donate {formatCurrency(effectiveAmount)} Securely →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-3xl font-bold mb-3">Thank You!</h2>
                  <p className="text-slate-500 dark:text-white/50 text-base leading-relaxed mb-2 max-w-md mx-auto">
                    Your donation of <strong className="text-gold-600 dark:text-gold-400">{formatCurrency(effectiveAmount)}</strong> has been received successfully.
                  </p>
                  <p className="text-slate-400 dark:text-white/35 text-sm mb-8">
                    A tax-deductible receipt has been sent to <strong className="text-navy-900 dark:text-white">{formData.email || 'your email'}</strong>.
                  </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/donate">
                    <Button variant="primary" size="md">Make Another Donation</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" size="md">Return Home</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
