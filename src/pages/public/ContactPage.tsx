import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/ui/Button'
import { contactSchema, type ContactFormData } from '@/utils/validators'
import { CONTACT_SUBJECTS } from '@/utils/constants'

const quickContacts = [
  { title: 'General Inquiries', description: 'For general questions and information', icon: '✉', action: 'mailto:scphd.ng@gmail.com', detail: 'scphd.ng@gmail.com' },
  { title: 'Phone', description: 'Call us during business hours', icon: '📞', action: 'tel:08080472194', detail: '0808 047 2194' },
  { title: 'Website', description: 'Visit our official website', icon: '🌐', action: 'https://springfield.org.ng', detail: 'springfield.org.ng' },
  { title: 'Social Media', description: 'Follow us @springfield.ng', icon: '📱', action: 'https://x.com/Springfield_NG', detail: '@springfield.ng' },
]

const offices = [
  { city: 'Abuja', country: 'Nigeria', type: 'Head Office', address: 'Suite 308, 3rd Floor, Anbeez Plaza, 900285' },
  { city: 'Gombe', country: 'Nigeria', type: 'Field Office', address: 'Gombe State' },
  { city: 'Kaduna', country: 'Nigeria', type: 'Field Office', address: 'Kaduna State' },
  { city: 'Bauchi', country: 'Nigeria', type: 'Field Office', address: 'Bauchi State' },
  { city: 'Jos', country: 'Nigeria', type: 'Field Office', address: 'Plateau State' },
  { city: 'Yola', country: 'Nigeria', type: 'Field Office', address: 'Adamawa State' },
  { city: 'Makurdi', country: 'Nigeria', type: 'Field Office', address: 'Benue State' },
  { city: 'Accra', country: 'Ghana', type: 'Regional Office', address: 'Greater Accra' },
  { city: 'Dar es Salaam', country: 'Tanzania', type: 'Regional Office', address: 'Dar es Salaam' },
  { city: 'Kampala', country: 'Uganda', type: 'Regional Office', address: 'Kampala' },
]

export default function ContactPage() {
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
        <meta name="description" content="Contact SCPHD for general inquiries, media requests, partnerships, or donor support." />
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
              Emergency? Call our 24/7 Crisis Line: <strong>0808 047 2194</strong>
            </p>
          </div>
          <a href="tel:08080472194" className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors">
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
                  target={contact.action.startsWith('http') ? '_blank' : undefined}
                  rel={contact.action.startsWith('http') ? 'noopener noreferrer' : undefined}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`p-5 rounded-sm border ${office.type === 'Head Office' ? 'bg-navy-900 dark:bg-navy-800 border-gold-500/30' : 'bg-cream-50 dark:bg-navy-800/50 border-navy-100 dark:border-navy-700'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-navy-900 dark:text-white font-bold text-sm">{office.city}</h4>
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm ${office.type === 'Head Office' ? 'bg-gold-500/15 text-gold-500' : office.type === 'Regional Office' ? 'bg-navy-500/15 text-navy-400' : 'bg-white/10 text-white/50 dark:bg-navy-700 dark:text-navy-300'}`}>
                    {office.type}
                  </span>
                </div>
                <p className="text-slate-400 dark:text-white/40 text-xs">{office.country}</p>
                {office.type === 'Head Office' && (
                  <p className="text-gold-400/70 text-xs mt-1">{office.address}</p>
                )}
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

          <div className="space-y-4">
            {[
              { q: 'What is the Springfield Centre for Peace and Humanitarian Development?', a: 'Springfield Centre (SCPHD) is a humanitarian NGO dedicated to peacebuilding, conflict resolution, and community development. We work at the intersection of peace, justice, and human dignity, primarily operating across Nigeria and Africa.' },
              { q: 'How can I support SCPHD\'s work?', a: 'You can support us through donations, volunteering, partnerships, or by spreading awareness about our programs. Visit our Donate page or contact us directly for more information.' },
              { q: 'Where does SCPHD operate?', a: 'SCPHD is headquartered in Abuja, Nigeria, with field offices across multiple Nigerian states including Gombe, Kaduna, Bauchi, Jos, Yola, and Makurdi. We also have regional offices in Accra (Ghana), Dar es Salaam (Tanzania), and Kampala (Uganda).' },
              { q: 'What programs does SCPHD run?', a: 'Our key programs include the Gombe Peace Project (interfaith harmony and community peacebuilding), Coalition Building for Preventing and Countering Violent Extremism (P/CVE), and various community resilience initiatives.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white dark:bg-navy-900 border border-navy-100 dark:border-navy-800 rounded-sm p-6"
              >
                <h4 className="text-navy-900 dark:text-white font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
