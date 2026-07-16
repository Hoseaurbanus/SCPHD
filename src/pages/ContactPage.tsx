import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp, slideLeft, slideRight } from '../hooks/useScrollReveal'

const offices = [
  { city: 'Springfield, IL', role: 'Global Headquarters', address: '123 Peace Boulevard, Springfield, IL 62701', phone: '+1 (217) 555-0100', email: 'info@scphd.org', hours: 'Mon–Fri, 8 AM – 6 PM CT' },
  { city: 'Nairobi, Kenya', role: 'Africa Regional Office', address: 'Upper Hill, Nairobi 00100', phone: '+254 20 555 0200', email: 'africa@scphd.org', hours: 'Mon–Fri, 9 AM – 5 PM EAT' },
  { city: 'Geneva, Switzerland', role: 'European Liaison', address: 'Rue de Lausanne 44, Geneva CH-1202', phone: '+41 22 555 0300', email: 'europe@scphd.org', hours: 'Mon–Fri, 9 AM – 5 PM CET' },
  { city: 'Amman, Jordan', role: 'MENA Regional Office', address: '4th Circle, Jabal Amman, Jordan', phone: '+962 6 555 0400', email: 'mena@scphd.org', hours: 'Sun–Thu, 9 AM – 5 PM AST' },
]

const faqs = [
  { q: 'How is my donation used?', a: "96 cents of every dollar you donate goes directly to our programs. The remaining 4% covers essential administrative costs. You'll receive a full impact report within 30 days." },
  { q: 'Is my donation tax-deductible?', a: 'Yes. SCPHD is a 501(c)(3) organization. All donations from US taxpayers are fully tax-deductible to the extent permitted by law.' },
  { q: 'How can I volunteer?', a: 'Visit our Volunteer page and complete the online application. We review applications quarterly and match volunteers based on skills and geography.' },
  { q: "Can I partner with SCPHD for my company's CSR program?", a: 'Absolutely. Contact our Partnerships team at partners@scphd.org to explore co-branding, volunteer matching, and grant opportunities.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-navy-900 py-20 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ originX: 0, display: 'block' }} className="w-6 h-0.5 bg-gold-500" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase">Contact Us</span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ originX: 1, display: 'block' }} className="w-6 h-0.5 bg-gold-500" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-white font-display text-3xl sm:text-5xl font-bold mb-4">
            We're Here to <em className="text-gold-400 not-italic">Help</em>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/55 text-base max-w-lg mx-auto">
            Whether you have a question, want to partner, need media information, or require urgent humanitarian assistance — reach out.
          </motion.p>
        </motion.div>
      </section>

      {/* Emergency banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-red-700 py-3 px-6 text-center"
      >
        <p className="text-white text-sm">
          <strong>Emergency 24/7 Line:</strong> Crisis situation?{' '}
          <a href="tel:+12175550911" className="underline font-bold hover:text-red-200 transition-colors">+1 (217) 555-0911</a>
          {' '}or{' '}
          <a href="mailto:emergency@scphd.org" className="underline hover:text-red-200 transition-colors">emergency@scphd.org</a>
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-20">
        {/* Form + Quick contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={slideLeft}
            className="bg-white rounded-sm shadow-sm p-5 sm:p-8 lg:p-10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                  <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-emerald-600 text-2xl">✓</span>
                  </motion.div>
                  <h3 className="text-navy-900 font-display text-2xl font-bold mb-3">Message Received!</h3>
                  <p className="text-slate-500 text-sm mb-6">We'll respond within 1–2 business days. For urgent matters, please call our emergency line.</p>
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-sm hover:border-navy-300 transition-colors">
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-navy-900 font-display text-2xl font-bold mb-6">Send Us a Message</h2>
                  <div className="space-y-4">
                    {[{ k: 'name', l: 'Full Name', ph: 'Jane Smith', t: 'text' }, { k: 'email', l: 'Email', ph: 'jane@example.com', t: 'email' }, { k: 'subject', l: 'Subject', ph: 'How can we help?', t: 'text' }].map(({ k, l, ph, t }) => (
                      <div key={k}>
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">{l}</label>
                        <input type={t} placeholder={ph} value={form[k as keyof typeof form]} onChange={(e) => setForm(f => ({ ...f, [k]: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors" />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Message</label>
                      <textarea placeholder="Tell us what's on your mind..." rows={5} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy-900 transition-colors resize-none" />
                    </div>
                    <motion.button whileHover={{ scale: 1.02, backgroundColor: '#1a3050' }} whileTap={{ scale: 0.98 }} onClick={() => setSubmitted(true)}
                      className="w-full py-3.5 bg-navy-900 text-white font-semibold text-sm rounded-sm tracking-wide transition-colors">
                      Send Message →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quick contacts */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="space-y-5"
          >
            <motion.h2 variants={slideRight} className="text-navy-900 font-display text-2xl font-bold">Quick Contact</motion.h2>
            {[
              { dept: 'General Inquiries', email: 'info@scphd.org', desc: 'Questions about our work and organization' },
              { dept: 'Media & Press', email: 'media@scphd.org', desc: 'Interview requests, press releases, media kits' },
              { dept: 'Partnerships', email: 'partners@scphd.org', desc: 'Institutional and corporate partnerships' },
              { dept: 'Donations & Finance', email: 'giving@scphd.org', desc: 'Donation inquiries, receipts, planned giving' },
              { dept: 'Volunteer Programs', email: 'volunteer@scphd.org', desc: 'Applications and opportunities' },
            ].map(({ dept, email, desc }) => (
              <motion.div
                key={dept}
                variants={fadeUp}
                whileHover={{ x: 4, boxShadow: '0 4px 20px rgba(11,29,58,0.06)' }}
                className="bg-cream-100 rounded-sm px-5 py-4 border border-cream-200 hover:border-navy-200 transition-all"
              >
                <div className="text-navy-900 font-semibold text-sm mb-0.5">{dept}</div>
                <a href={`mailto:${email}`} className="text-gold-600 text-sm hover:text-gold-700 transition-colors">{email}</a>
                <p className="text-slate-500 text-xs mt-0.5">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Offices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-navy-900 font-display text-3xl font-bold mb-8">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {offices.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(11,29,58,0.1)' }}
                className="bg-white border border-slate-200 rounded-sm p-6 transition-all"
              >
                <div className="text-gold-600 text-[10px] font-semibold tracking-widest uppercase mb-1">{o.role}</div>
                <h4 className="text-navy-900 font-display text-lg font-bold mb-3">{o.city}</h4>
                <div className="space-y-2 text-xs text-slate-500">
                  <p>{o.address}</p>
                  <a href={`tel:${o.phone}`} className="block text-navy-600 hover:text-navy-900 transition-colors">{o.phone}</a>
                  <a href={`mailto:${o.email}`} className="block text-gold-600 hover:text-gold-700 transition-colors">{o.email}</a>
                  <p className="text-slate-400">{o.hours}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-navy-900 font-display text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-sm overflow-hidden">
                <motion.button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  whileHover={{ backgroundColor: '#F8F7F4' }}
                  className="w-full text-left px-6 py-4 flex items-center justify-between transition-colors"
                >
                  <span className="text-navy-900 font-semibold text-sm pr-4">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-slate-400 text-xl flex-shrink-0"
                  >
                    +
                  </motion.span>
                </motion.button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed pt-3">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
