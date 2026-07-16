import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface DonorPageProps {
  navigate: (p: any) => void
}

const donor = {
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@example.com',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
  memberSince: 'March 2021',
  level: 'Gold Donor',
  totalGiven: 18750,
  livesImpacted: 842,
  countriesSupported: 9,
  streak: 18,
}

const donorStats = [
  { label: 'Total Given', value: '$18,750', icon: '💰', color: 'text-gold-500' },
  { label: 'Lives Impacted', value: '842', icon: '◉', color: 'text-emerald-500' },
  { label: 'Countries Supported', value: '9', icon: '🌍', color: 'text-blue-400' },
  { label: 'Month Streak', value: '18', icon: '🔥', color: 'text-orange-400' },
]

const donationHistory = [
  { id: 'D-20247', amount: 250, campaign: 'Education for Refugees', date: 'Jan 15, 2025', type: 'monthly', status: 'completed', receipt: true },
  { id: 'D-19843', amount: 500, campaign: 'Emergency Relief — Gaza', date: 'Dec 15, 2024', type: 'monthly', status: 'completed', receipt: true },
  { id: 'D-19204', amount: 1000, campaign: 'Where Most Needed', date: 'Nov 22, 2024', type: 'one-time', status: 'completed', receipt: true },
  { id: 'D-18991', amount: 250, campaign: 'Education for Refugees', date: 'Nov 15, 2024', type: 'monthly', status: 'completed', receipt: true },
  { id: 'D-18301', amount: 250, campaign: 'Education for Refugees', date: 'Oct 15, 2024', type: 'monthly', status: 'completed', receipt: true },
  { id: 'D-17650', amount: 750, campaign: 'Clean Water Initiative', date: 'Sep 10, 2024', type: 'one-time', status: 'completed', receipt: true },
]

const recurringDonations = [
  { id: 'R-001', amount: 250, campaign: 'Education for Refugees', frequency: 'Monthly', nextDate: 'Feb 15, 2025', status: 'active', color: 'bg-blue-600' },
]

const impactStories = [
  {
    title: "Amara's Story",
    quote: "Thanks to donors like you, I now have access to a safe classroom and proper learning materials for the first time.",
    person: 'Amara, 12, South Sudan',
    campaign: 'Education for Refugees',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&auto=format',
  },
  {
    title: "A Community Transformed",
    quote: "Our mobile clinic visited 14 villages last month — 890 patients received care who otherwise would have gone without.",
    person: 'Dr. Yusuf, Mobile Health Clinics program',
    campaign: 'Mobile Health Clinics',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop&auto=format',
  },
]

const suggestedPrograms = [
  { name: 'Dialogue for Peace', region: 'Eastern Europe', pct: 81, raised: 2268000, goal: 2800000, urgent: false },
  { name: 'Green Futures Initiative', region: 'Sub-Saharan Africa', pct: 58, raised: 1450000, goal: 2500000, urgent: false },
  { name: 'Emergency Relief Fund', region: 'Global', pct: 86, raised: 3870000, goal: 4500000, urgent: true },
]

type DonorTab = 'dashboard' | 'history' | 'recurring' | 'impact' | 'receipts'

function StatCard({ stat, index }: { stat: typeof donorStats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className="bg-white border border-slate-100 rounded-sm p-5 hover:shadow-md transition-shadow duration-300"
    >
      <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
      <div className="text-navy-900 font-display text-2xl font-bold mt-2">{stat.value}</div>
      <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
    </motion.div>
  )
}

export default function DonorPage({ navigate }: DonorPageProps) {
  const [tab, setTab] = useState<DonorTab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [cancelConfirm, setCancelConfirm] = useState(false)

  const navItems: { id: DonorTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
    { id: 'history', label: 'Donation History', icon: '📋' },
    { id: 'recurring', label: 'Recurring Gifts', icon: '🔄' },
    { id: 'impact', label: 'My Impact', icon: '◉' },
    { id: 'receipts', label: 'Tax Receipts', icon: '📄' },
  ]

  return (
    <div className="pt-[72px] min-h-screen bg-cream-100 flex">

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-900/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed top-[72px] left-0 bottom-0 w-64 bg-navy-900 z-40 lg:hidden overflow-y-auto"
      >
        <DonorSidebar navItems={navItems} tab={tab} setTab={(t) => { setTab(t); setSidebarOpen(false) }} navigate={navigate} />
      </motion.aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-navy-900 min-h-[calc(100vh-72px)] sticky top-[72px] self-start flex-shrink-0">
        <DonorSidebar navItems={navItems} tab={tab} setTab={setTab} navigate={navigate} />
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-[72px] z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-navy-900 p-1.5 hover:bg-slate-100 rounded-sm transition-colors"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
              </svg>
            </button>
            <div>
              <h1 className="text-navy-900 font-display font-bold text-lg leading-tight">
                {tab === 'dashboard' ? `Welcome, ${donor.name.split(' ')[0]}` :
                 tab === 'history' ? 'Donation History' :
                 tab === 'recurring' ? 'Recurring Gifts' :
                 tab === 'impact' ? 'My Impact' :
                 'Tax Receipts'}
              </h1>
              <p className="text-slate-400 text-xs hidden sm:block">
                {tab === 'dashboard' ? `${donor.level} · Member since ${donor.memberSince}` :
                 tab === 'history' ? 'Your complete giving record.' :
                 tab === 'recurring' ? 'Manage your ongoing monthly contributions.' :
                 tab === 'impact' ? 'See how your generosity changes lives.' :
                 'Download receipts for tax purposes.'}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('donate')}
            className="bg-gold-500 text-navy-900 text-xs font-bold px-4 py-2 rounded-sm hidden sm:block"
          >
            + Donate Again
          </motion.button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">

            {/* Dashboard */}
            {tab === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {donorStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
                </div>

                {/* Giving progress */}
                <div className="bg-white border border-slate-100 rounded-sm p-6 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-navy-900 font-display font-bold text-lg">Annual Giving Progress</h3>
                      <p className="text-slate-400 text-xs mt-0.5">2025 goal: $3,000</p>
                    </div>
                    <div className="text-right">
                      <div className="text-navy-900 font-bold text-xl">$250</div>
                      <div className="text-slate-400 text-xs">donated this year</div>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '8.3%' }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$0</span>
                    <span className="text-gold-600 font-semibold">8% reached · $2,750 to go</span>
                    <span>$3,000</span>
                  </div>
                </div>

                {/* Next payment + impact side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Next payment */}
                  <div className="bg-navy-900 rounded-sm p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/8 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-4">Next Scheduled Gift</div>
                      <div className="text-white font-display text-3xl font-bold mb-1">$250</div>
                      <div className="text-white/50 text-sm mb-4">Education for Refugees · Monthly</div>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                        Processes Feb 15, 2025
                      </div>
                      <div className="mt-5 flex gap-2">
                        <button onClick={() => setTab('recurring')} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-sm transition-colors">Manage →</button>
                      </div>
                    </div>
                  </div>

                  {/* Quick impact */}
                  <div className="bg-white border border-slate-100 rounded-sm p-6">
                    <h3 className="text-navy-900 font-display font-bold mb-4">Your $250/month has…</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'School kits for children', value: '54', unit: 'students', icon: '📚' },
                        { label: 'Safe learning months', value: '18', unit: 'months', icon: '🏫' },
                        { label: 'Families supported', value: '12', unit: 'families', icon: '👨‍👩‍👧‍👦' },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-3">
                          <span className="text-lg">{item.icon}</span>
                          <div className="flex-1">
                            <div className="text-slate-500 text-xs">{item.label}</div>
                          </div>
                          <div className="text-right">
                            <span className="text-navy-900 font-bold">{item.value}</span>
                            <span className="text-slate-400 text-xs ml-1">{item.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggested programs */}
                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-navy-900 font-display font-bold">Programs That Need You</h3>
                    <button onClick={() => navigate('programs')} className="text-gold-600 text-xs font-bold hover:text-gold-700">View All →</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {suggestedPrograms.map((p, i) => (
                      <motion.div
                        key={p.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="px-6 py-4 hover:bg-cream-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-navy-900 font-semibold text-sm">{p.name}</span>
                              {p.urgent && (
                                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                                  className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                                  Urgent
                                </motion.span>
                              )}
                            </div>
                            <div className="text-slate-400 text-xs">📍 {p.region}</div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => navigate('donate')}
                            className="text-xs bg-gold-500 text-navy-900 font-bold px-3 py-1.5 rounded-sm flex-shrink-0 ml-4"
                          >
                            Give →
                          </motion.button>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${p.pct}%` }}
                              transition={{ duration: 1, delay: i * 0.1 + 0.4, ease: 'easeOut' }}
                              className={`h-full rounded-full ${p.pct > 80 ? 'bg-red-500' : 'bg-navy-600'}`}
                            />
                          </div>
                          <span className="text-navy-900 font-bold text-xs">{p.pct}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* History */}
            {tab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total Donated', value: '$18,750', sub: 'All time' },
                    { label: 'Transactions', value: '84', sub: 'Since Mar 2021' },
                    { label: 'Tax Deductible', value: '$18,750', sub: '100% eligible' },
                  ].map(c => (
                    <div key={c.label} className="bg-white border border-slate-100 rounded-sm p-5">
                      <div className="text-navy-900 font-display font-bold text-2xl">{c.value}</div>
                      <div className="text-navy-900 font-medium text-sm mt-0.5">{c.label}</div>
                      <div className="text-slate-400 text-xs mt-1">{c.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-navy-900 font-display font-bold">Transaction History</h3>
                    <button className="text-gold-600 text-xs font-bold hover:text-gold-700">Export CSV ↓</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                      <thead>
                        <tr className="border-b border-slate-50">
                          {['Date', 'ID', 'Amount', 'Campaign', 'Type', ''].map(h => (
                            <th key={h} className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {donationHistory.map((d, i) => (
                          <motion.tr
                            key={d.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.06 }}
                            className="border-b border-slate-50 hover:bg-cream-50 transition-colors"
                          >
                            <td className="px-4 sm:px-6 py-3.5 text-slate-400 text-xs whitespace-nowrap">{d.date}</td>
                            <td className="px-4 sm:px-6 py-3.5 text-slate-400 font-mono text-xs">{d.id}</td>
                            <td className="px-4 sm:px-6 py-3.5 text-navy-900 font-bold">${d.amount}</td>
                            <td className="px-4 sm:px-6 py-3.5 text-slate-600 text-xs max-w-[160px] truncate">{d.campaign}</td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${d.type === 'monthly' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                {d.type}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <motion.button whileHover={{ x: 2 }} className="text-[10px] font-bold text-gold-600 hover:text-gold-700 whitespace-nowrap">
                                Receipt ↓
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recurring */}
            {tab === 'recurring' && (
              <motion.div key="recurring" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="max-w-2xl">
                  <div className="bg-white border border-slate-100 rounded-sm mb-6">
                    <div className="px-6 py-4 border-b border-slate-100">
                      <h3 className="text-navy-900 font-display font-bold">Active Recurring Gifts</h3>
                      <p className="text-slate-400 text-xs mt-0.5">Charged automatically on the scheduled date.</p>
                    </div>
                    {recurringDonations.map(r => (
                      <div key={r.id} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 ${r.color} rounded-sm flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>$</div>
                            <div>
                              <div className="text-navy-900 font-display font-bold text-2xl">${r.amount}<span className="text-sm text-slate-400 font-normal ml-1">/mo</span></div>
                              <div className="text-slate-500 text-sm">{r.campaign}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-sm uppercase tracking-wide self-start sm:self-auto">
                            {r.status}
                          </span>
                        </div>
                        <div className="bg-cream-100 rounded-sm p-4 mb-5">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Frequency</span>
                            <span className="text-navy-900 font-semibold">{r.frequency}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-slate-500">Next charge</span>
                            <span className="text-navy-900 font-semibold">{r.nextDate}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-slate-500">Payment method</span>
                            <span className="text-navy-900 font-semibold">•••• 4242</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <motion.button whileHover={{ scale: 1.03 }} className="px-4 py-2 text-xs font-bold bg-navy-900 text-white rounded-sm">
                            Update Amount
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.03 }} className="px-4 py-2 text-xs font-bold border border-slate-200 text-slate-600 rounded-sm hover:border-slate-300">
                            Change Campaign
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            onClick={() => setCancelConfirm(true)}
                            className="px-4 py-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                          >
                            Cancel Gift
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence>
                    {cancelConfirm && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-red-50 border border-red-200 rounded-sm p-5 mb-6"
                      >
                        <h4 className="text-red-800 font-bold text-sm mb-2">Cancel this recurring gift?</h4>
                        <p className="text-red-600 text-xs mb-4 leading-relaxed">
                          Your $250/month supports 3 children's education. Cancelling will stop future charges but won't affect past gifts.
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => setCancelConfirm(false)} className="px-4 py-2 text-xs font-bold bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors">
                            Yes, Cancel
                          </button>
                          <button onClick={() => setCancelConfirm(false)} className="px-4 py-2 text-xs font-bold border border-red-200 text-red-600 rounded-sm hover:bg-red-50 transition-colors">
                            Keep My Gift
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-gold-50 border border-gold-200 rounded-sm p-5">
                    <h4 className="text-navy-900 font-semibold text-sm mb-1">Start a New Recurring Gift</h4>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">Monthly donors create sustained impact — set it once and give all year.</p>
                    <motion.button whileHover={{ scale: 1.02 }} onClick={() => navigate('donate')} className="bg-gold-500 text-navy-900 text-xs font-bold px-4 py-2 rounded-sm">
                      Set Up Monthly Gift →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Impact */}
            {tab === 'impact' && (
              <motion.div key="impact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {/* Impact banner */}
                <div className="bg-navy-900 rounded-sm p-6 sm:p-8 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/8 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-3">Your Total Impact</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { value: '$18,750', label: 'Given', icon: '💰' },
                        { value: '842', label: 'Lives reached', icon: '◉' },
                        { value: '9', label: 'Countries', icon: '🌍' },
                        { value: '48mo', label: 'Of giving', icon: '🔥' },
                      ].map(s => (
                        <div key={s.label}>
                          <div className="text-2xl mb-1">{s.icon}</div>
                          <div className="text-white font-display font-bold text-2xl">{s.value}</div>
                          <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact stories */}
                <div className="mb-6">
                  <h3 className="text-navy-900 font-display font-bold text-xl mb-4">Stories from the Field</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {impactStories.map((s, i) => (
                      <motion.div
                        key={s.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 rounded-sm overflow-hidden group hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                          <div className="absolute bottom-3 left-4">
                            <span className="bg-gold-500 text-navy-900 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">{s.campaign}</span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="text-navy-900 font-display font-bold text-base mb-2">{s.title}</h4>
                          <blockquote className="text-slate-600 text-sm leading-relaxed italic mb-3">"{s.quote}"</blockquote>
                          <div className="text-gold-600 text-xs font-semibold">— {s.person}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Breakdown by campaign */}
                <div className="bg-white border border-slate-100 rounded-sm p-6">
                  <h3 className="text-navy-900 font-display font-bold mb-5">Giving Breakdown by Campaign</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Education for Refugees', amount: 11000, pct: 59, color: 'bg-blue-500' },
                      { name: 'Emergency Relief', amount: 3500, pct: 19, color: 'bg-red-500' },
                      { name: 'Where Most Needed', amount: 2500, pct: 13, color: 'bg-navy-600' },
                      { name: 'Clean Water Initiative', amount: 1750, pct: 9, color: 'bg-emerald-500' },
                    ].map((c, i) => (
                      <div key={c.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 font-medium">{c.name}</span>
                          <div className="text-right">
                            <span className="text-navy-900 font-bold">${c.amount.toLocaleString()}</span>
                            <span className="text-slate-400 text-xs ml-2">({c.pct}%)</span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.pct}%` }}
                            transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                            className={`h-full ${c.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Receipts */}
            {tab === 'receipts' && (
              <motion.div key="receipts" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-gold-50 border border-gold-200 rounded-sm p-5 mb-6 flex items-start gap-3">
                  <span className="text-gold-500 text-xl flex-shrink-0">ℹ</span>
                  <div>
                    <p className="text-navy-900 font-semibold text-sm">All donations to SCPHD are tax-deductible</p>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">SCPHD is a registered 501(c)(3). EIN: 47-1234567. Please consult your tax advisor for eligibility.</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-navy-900 font-display font-bold">Annual Tax Receipts</h3>
                    <button className="text-gold-600 text-xs font-bold hover:text-gold-700">Download All ↓</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { year: '2024', total: 3000, transactions: 18, issued: 'Jan 15, 2025' },
                      { year: '2023', total: 3000, transactions: 15, issued: 'Jan 12, 2024' },
                      { year: '2022', total: 2750, transactions: 14, issued: 'Jan 10, 2023' },
                      { year: '2021 (partial)', total: 500, transactions: 2, issued: 'Jan 8, 2022' },
                    ].map((r, i) => (
                      <motion.div
                        key={r.year}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-cream-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-navy-900 rounded-sm flex items-center justify-center text-gold-400 font-bold text-xs flex-shrink-0">📄</div>
                          <div>
                            <div className="text-navy-900 font-semibold text-sm">Tax Year {r.year}</div>
                            <div className="text-slate-400 text-xs">{r.transactions} transactions · Issued {r.issued}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="text-navy-900 font-bold">${r.total.toLocaleString()}</div>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            className="text-xs bg-navy-900 text-white font-bold px-3 py-1.5 rounded-sm"
                          >
                            Download PDF
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function DonorSidebar({
  navItems, tab, setTab, navigate,
}: {
  navItems: { id: DonorTab; label: string; icon: string }[]
  tab: DonorTab
  setTab: (t: DonorTab) => void
  navigate: (p: any) => void
}) {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      <div className="px-2 mb-6">
        <div className="bg-gold-500/10 border border-gold-500/20 rounded-sm px-3 py-2">
          <div className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">Donor Portal</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(item => (
          <motion.button
            key={item.id}
            onClick={() => setTab(item.id)}
            whileHover={{ x: 3 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 ${
              tab === item.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={tab === item.id ? 'text-gold-400' : ''}>{item.icon}</span>
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="border-t border-white/8 my-4" />

      <div className="space-y-1 mb-4">
        {[
          { label: 'Donate Again', page: 'donate' as const },
          { label: 'Public Site', page: 'home' as const },
        ].map(link => (
          <button
            key={link.label}
            onClick={() => navigate(link.page)}
            className="w-full text-left px-3 py-2 text-white/40 hover:text-white/70 text-xs transition-colors"
          >
            ↗ {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-2">
        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format" alt="Sarah" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-white text-sm font-semibold truncate">Sarah M.</div>
          <div className="text-white/40 text-[10px] truncate">Gold Donor</div>
        </div>
        <button onClick={() => navigate('home')} className="ml-auto text-white/30 hover:text-white/70 transition-colors text-xs" title="Sign out">⏏</button>
      </div>
    </div>
  )
}
