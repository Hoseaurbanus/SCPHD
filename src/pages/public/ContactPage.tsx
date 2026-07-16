import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { contactSchema, type ContactFormData } from '@/utils/validators'
import { CONTACT_SUBJECTS } from '@/utils/constants'

const quickContacts = [
  { title: 'General Inquiries', description: 'For general questions and information', icon: '✉', action: 'mailto:info@scphd.org', detail: 'info@scphd.org' },
  { title: 'Media & Press', description: 'Press inquiries and media requests', icon: '📰', action: 'mailto:media@scphd.org', detail: 'media@scphd.org' },
  { title: 'Partnerships', description: 'Explore collaboration opportunities', icon: '🤝', action: 'mailto:partners@scphd.org', detail: 'partners@scphd.org' },
  { title: 'Donor Support', description: 'Questions about your donations', icon: '💝', action: 'mailto:donors@scphd.org', detail: 'donors@scphd.org' },
]

const offices = [
  { city: 'Springfield', country: 'United States', address: '1200 Peace Boulevard, Suite 400', phone: '+1 (555) 234-5678', type: 'Global HQ' },
  { city: 'Nairobi', country: 'Kenya', address: 'Westlands Business Park, Tower B', phone: '+254 20 345 678', type: 'Africa Regional' },
  { city: 'Amman', country: 'Jordan', address: '3rd Circle, Al-Kindi Street 14', phone: '+962 6 461 2345', type: 'Middle East Regional' },
  { city: 'Geneva', country: 'Switzerland', address: 'Rue de la Paix 22, 1202', phone: '+41 22 345 6789', type: 'Europe Liaison' },
]

const faqs = [
  { question: 'How is my donation used?', answer: '96¢ of every dollar donated goes directly to our programs. The remaining 4¢ covers essential administrative costs, which are largely covered by institutional grants. We publish detailed financial reports annually.' },
  { question: 'Is my donation tax-deductible?', answer: 'Yes. SCPHD is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law. You will receive an instant receipt via email.' },
  { question: 'How can I volunteer with SCPHD?', answer: 'We welcome volunteers with diverse skills. Visit our Volunteer page to browse open positions or contact us at volunteers@scphd.org. We offer both field-based and remote volunteering opportunities.' },
  { question: 'Can I make a recurring donation?', answer: 'Absolutely. During the donation process, select "Monthly" to set up a recurring donation. Monthly donors save 10% on processing fees and receive exclusive impact reports.' },
  { question: 'How can my organization partner with SCPHD?', answer: 'We partner with governments, corporations, foundations, and other NGOs. Contact our Partnerships team at partners@scphd.org to discuss collaboration opportunities.' },
  { question: 'Where does SCPHD operate?', answer: 'SCPHD currently operates in 47 countries across Africa, the Middle East, South Asia, Southeast Asia, Eastern Europe, and the Americas. Our headquarters is in Springfield, with regional offices in Nairobi, Amman, and Geneva.' },
]

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise(r => setTimeout(r, 1500))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — SCPHD | Get in Touch</title>
        <meta name="description" content="Contact SCPHD for general inquiries, media requests, partnerships, or donor support. Our offices span Springfield, Nairobi, Amman, and Geneva." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden bg-navy-950 flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=900&fit=crop&auto=format" alt="Contact" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/80 to-navy-900/40" />
        <div className="absolute inset-0 lines-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label mb-4">
            Contact Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-[family-name:var(--font-display)] font-bold leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Let's Start a<br />
            <em className="not-italic gradient-text">Conversation</em>
          </motion.h1>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2.5 h-2.5 bg-white rounded-full" />
            <p className="text-white text-sm font-semibold">
              Emergency? Call our 24/7 Crisis Line: <strong>+1 (555) 911-HELP</strong>
            </p>
          </div>
          <a href="tel:+15559114357" className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors">
            Call Now →
          </a>
        </div>
      </section>

      {/* Contact Form & Quick Contacts */}
      <section ref={headerRef} className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="section-label mb-4">
                Send a Message
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold leading-tight mb-8"
              >
                How Can We <em className="not-italic text-navy-600 dark:text-gold-400">Help You?</em>
              </motion.h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-sm p-8 text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-navy-900 dark:text-white font-bold text-lg mb-2">Message Sent!</h3>
                    <p className="text-slate-500 dark:text-white/50 text-sm">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-8"
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Full Name *</label>
                          <input
                            {...register('name')}
                            className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Email Address *</label>
                          <input
                            {...register('email')}
                            type="email"
                            className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Subject *</label>
                        <select
                          {...register('subject')}
                          className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all appearance-none dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                        >
                          <option value="">Select a subject</option>
                          {CONTACT_SUBJECTS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy-900 dark:text-white mb-1.5">Message *</label>
                        <textarea
                          {...register('message')}
                          rows={5}
                          className="w-full px-4 py-2.5 rounded-sm border bg-white text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all resize-none dark:bg-navy-800 dark:text-white dark:border-navy-700 border-navy-200"
                          placeholder="Tell us how we can help..."
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
                        Send Message →
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
                <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-lg font-bold mb-4">Quick Contact</h3>
              </motion.div>
              {quickContacts.map((contact, i) => (
                <motion.a
                  key={contact.title}
                  href={contact.action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={headerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  whileHover={{ x: -4 }}
                  className="block bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-5 hover:shadow-lg hover:border-navy-200 dark:hover:border-navy-700 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{contact.icon}</div>
                    <div>
                      <h4 className="text-navy-900 dark:text-white font-semibold text-sm group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{contact.title}</h4>
                      <p className="text-slate-400 dark:text-white/35 text-xs mt-0.5">{contact.description}</p>
                      <p className="text-gold-600 dark:text-gold-400 text-xs font-semibold mt-2">{contact.detail}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-white dark:bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label justify-center mb-4">
              Our Offices
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Global <em className="not-italic text-navy-600 dark:text-gold-400">Presence</em>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -6 }}
                className="bg-cream-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-sm p-6"
              >
                <Badge variant="info" size="sm">{office.type}</Badge>
                <h3 className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] text-xl font-bold mt-3 mb-1">{office.city}</h3>
                <p className="text-slate-400 dark:text-white/35 text-xs mb-3">{office.country}</p>
                <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed mb-3">{office.address}</p>
                <p className="text-gold-600 dark:text-gold-400 text-sm font-semibold">{office.phone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-100 dark:bg-navy-950 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(11,29,58,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label justify-center mb-4">
              FAQ
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="text-navy-900 dark:text-white font-[family-name:var(--font-display)] font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Frequently Asked <em className="not-italic text-navy-600 dark:text-gold-400">Questions</em>
            </motion.h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                >
                  <span className="text-navy-900 dark:text-white font-semibold text-sm group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-400 dark:text-white/30 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 border-t border-navy-100 dark:border-navy-800">
                        <p className="text-slate-500 dark:text-white/45 text-sm leading-relaxed pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
