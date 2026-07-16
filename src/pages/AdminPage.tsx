import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface AdminPageProps {
  navigate: (p: any) => void
}

const adminUser = {
  name: 'Dr. Miriam Osei',
  role: 'Executive Director',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format',
}

const overviewStats = [
  { label: 'Total Raised (MTD)', value: '$284,320', change: '+18.4%', up: true, icon: '💰', color: 'text-gold-500' },
  { label: 'Active Volunteers', value: '12,408', change: '+3.2%', up: true, icon: '◉', color: 'text-emerald-500' },
  { label: 'Programs Running', value: '47', change: '+2', up: true, icon: '◈', color: 'text-blue-400' },
  { label: 'Pending Approvals', value: '23', change: '-5', up: false, icon: '⏳', color: 'text-amber-400' },
]

const recentDonations = [
  { id: 'D-20248', donor: 'Anonymous', amount: 5000, campaign: 'Emergency Relief — Gaza', date: 'Jan 15', status: 'completed', type: 'one-time' },
  { id: 'D-20247', donor: 'Sarah Mitchell', amount: 250, campaign: 'Education for Refugees', date: 'Jan 15', status: 'completed', type: 'monthly' },
  { id: 'D-20246', donor: 'James Okafor', amount: 1200, campaign: 'Where Most Needed', date: 'Jan 14', status: 'completed', type: 'one-time' },
  { id: 'D-20245', donor: 'Yuki Tanaka Foundation', amount: 50000, campaign: 'Clean Water Initiative', date: 'Jan 14', status: 'pending', type: 'grant' },
  { id: 'D-20244', donor: 'Maria Chen', amount: 100, campaign: 'Peace Education', date: 'Jan 13', status: 'completed', type: 'monthly' },
  { id: 'D-20243', donor: 'Nordic Solidarity Fund', amount: 12500, campaign: 'Emergency Relief', date: 'Jan 13', status: 'completed', type: 'grant' },
]

const volunteers = [
  { name: 'Dr. Amara Diallo', role: 'Medical Lead', country: 'Ghana', hours: 847, status: 'active', level: 'Gold', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format' },
  { name: 'Carlos Mendez', role: 'Field Coordinator', country: 'Colombia', hours: 612, status: 'active', level: 'Silver', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format' },
  { name: 'Fatima Al-Rashid', role: 'Education Specialist', country: 'Jordan', hours: 1042, status: 'active', level: 'Platinum', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&auto=format' },
  { name: 'Thomas Wanjiru', role: 'Logistics', country: 'Kenya', hours: 389, status: 'pending', level: 'Bronze', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&auto=format' },
  { name: 'Soo-Jin Park', role: 'Data Analyst', country: 'South Korea', hours: 520, status: 'active', level: 'Silver', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format' },
]

const programs = [
  { name: 'Peace Education Initiative', region: 'Sub-Saharan Africa', budget: 8400000, spent: 6720000, beneficiaries: 240000, status: 'on-track' },
  { name: 'Mobile Health Clinics', region: 'MENA + Horn of Africa', budget: 12200000, spent: 7076000, beneficiaries: 890000, status: 'on-track' },
  { name: 'Emergency Relief Fund', region: 'Global', budget: 4500000, spent: 3870000, beneficiaries: 58000, status: 'urgent' },
  { name: "Women's Economic Empowerment", region: 'South & SE Asia', budget: 3100000, spent: 2108000, beneficiaries: 14200, status: 'on-track' },
  { name: 'Dialogue for Peace', region: 'Eastern Europe', budget: 2800000, spent: 2268000, beneficiaries: 12000, status: 'delayed' },
]

const monthlyRevenue = [320, 480, 290, 540, 620, 410, 580, 730, 660, 800, 720, 850]
const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']

type AdminTab = 'overview' | 'donations' | 'volunteers' | 'programs' | 'reports'

function StatCard({ stat, index }: { stat: typeof overviewStats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white border border-slate-100 rounded-sm p-5 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${stat.up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
          {stat.change}
        </span>
      </div>
      <div className="text-navy-900 font-display text-2xl font-bold mb-0.5">{stat.value}</div>
      <div className="text-slate-400 text-xs">{stat.label}</div>
    </motion.div>
  )
}

function RevenueChart() {
  const max = Math.max(...monthlyRevenue)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="bg-white border border-slate-100 rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-navy-900 font-display font-bold text-lg">Monthly Revenue</h3>
          <p className="text-slate-400 text-xs mt-0.5">Last 12 months — USD thousands</p>
        </div>
        <div className="text-right">
          <div className="text-navy-900 font-bold text-xl">$6.99M</div>
          <div className="text-emerald-600 text-xs font-semibold">+22% YoY</div>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-32">
        {monthlyRevenue.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: `${(v / max) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full rounded-t-sm ${i === monthlyRevenue.length - 1 ? 'bg-gold-500' : 'bg-navy-200 hover:bg-navy-400 transition-colors cursor-pointer'}`}
              title={`${months[i]}: $${v}K`}
            />
            <span className="text-[9px] text-slate-300">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminPage({ navigate }: AdminPageProps) {
  const [tab, setTab] = useState<AdminTab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [donationFilter, setDonationFilter] = useState<'all' | 'completed' | 'pending'>('all')
  const [notif, setNotif] = useState(true)

  const navItems: { id: AdminTab; label: string; icon: string; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: '◈' },
    { id: 'donations', label: 'Donations', icon: '💰', badge: 3 },
    { id: 'volunteers', label: 'Volunteers', icon: '◉', badge: 5 },
    { id: 'programs', label: 'Programs', icon: '◇' },
    { id: 'reports', label: 'Reports', icon: '📊' },
  ]

  const filteredDonations = donationFilter === 'all' ? recentDonations : recentDonations.filter(d => d.status === donationFilter)

  return (
    <div className="pt-[72px] min-h-screen bg-cream-100 flex">

      {/* Sidebar overlay (mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-900/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed top-[72px] left-0 bottom-0 w-64 bg-navy-900 z-40 lg:hidden overflow-y-auto"
      >
        <SidebarContent navItems={navItems} tab={tab} setTab={(t) => { setTab(t); setSidebarOpen(false) }} adminUser={adminUser} navigate={navigate} />
      </motion.aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 bg-navy-900 min-h-[calc(100vh-72px)] sticky top-[72px] self-start flex-shrink-0">
        <SidebarContent navItems={navItems} tab={tab} setTab={setTab} adminUser={adminUser} navigate={navigate} />
      </aside>

      {/* Main content */}
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
              <h1 className="text-navy-900 font-display font-bold text-lg leading-tight capitalize">{tab}</h1>
              <p className="text-slate-400 text-xs hidden sm:block">
                {tab === 'overview' ? 'Welcome back, Dr. Osei. Here\'s what\'s happening.' :
                 tab === 'donations' ? 'Manage and track all incoming donations.' :
                 tab === 'volunteers' ? 'Active volunteers and pending applications.' :
                 tab === 'programs' ? 'Program status, budgets, and impact.' :
                 'Analytics, exports, and audit logs.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {notif && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setNotif(false)}
                className="relative text-slate-400 hover:text-navy-900 transition-colors p-1.5"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 17H9a3 3 0 006 0zM18 13V9a6 6 0 00-12 0v4l-2 3h16l-2-3z" strokeLinecap="round"/>
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="hidden sm:flex items-center gap-2 bg-gold-500 text-navy-900 text-xs font-bold px-4 py-2 rounded-sm"
            >
              + New Entry
            </motion.button>
          </div>
        </div>

        {/* Page body */}
        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {tab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {overviewStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                  <div className="xl:col-span-2">
                    <RevenueChart />
                  </div>
                  {/* Donation breakdown donut */}
                  <div className="bg-white border border-slate-100 rounded-sm p-6">
                    <h3 className="text-navy-900 font-display font-bold text-lg mb-1">Campaign Split</h3>
                    <p className="text-slate-400 text-xs mb-5">Revenue by campaign (Jan)</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Emergency Relief', pct: 38, color: 'bg-red-500' },
                        { label: 'Education', pct: 24, color: 'bg-blue-500' },
                        { label: 'Where Most Needed', pct: 22, color: 'bg-navy-600' },
                        { label: 'Clean Water', pct: 10, color: 'bg-emerald-500' },
                        { label: 'Other', pct: 6, color: 'bg-slate-300' },
                      ].map(({ label, pct, color }) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-600">{label}</span>
                            <span className="text-navy-900 font-semibold">{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                              className={`h-full ${color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Recent donations preview */}
                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="text-navy-900 font-display font-bold">Recent Donations</h3>
                    <button onClick={() => setTab('donations')} className="text-gold-600 text-xs font-bold hover:text-gold-700 transition-colors">View all →</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-50">
                          {['ID', 'Donor', 'Amount', 'Campaign', 'Status'].map(h => (
                            <th key={h} className="text-left px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recentDonations.slice(0, 4).map((d, i) => (
                          <motion.tr
                            key={d.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="border-b border-slate-50 hover:bg-cream-50 transition-colors"
                          >
                            <td className="px-6 py-3 text-slate-400 font-mono text-xs">{d.id}</td>
                            <td className="px-6 py-3 text-navy-900 font-medium">{d.donor}</td>
                            <td className="px-6 py-3 text-navy-900 font-bold">${d.amount.toLocaleString()}</td>
                            <td className="px-6 py-3 text-slate-500 text-xs max-w-[160px] truncate">{d.campaign}</td>
                            <td className="px-6 py-3">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide ${d.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                {d.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'donations' && (
              <motion.div key="donations" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total This Month', value: '$284,320', sub: '142 transactions', color: 'border-gold-500' },
                    { label: 'Avg. Donation', value: '$1,002', sub: '+12% vs last month', color: 'border-blue-500' },
                    { label: 'Recurring Revenue', value: '$48,200', sub: '18% of total', color: 'border-emerald-500' },
                  ].map(c => (
                    <div key={c.label} className={`bg-white border-l-4 ${c.color} border border-slate-100 rounded-sm p-5`}>
                      <div className="text-navy-900 font-display font-bold text-2xl">{c.value}</div>
                      <div className="text-navy-900 font-semibold text-sm mt-0.5">{c.label}</div>
                      <div className="text-slate-400 text-xs mt-1">{c.sub}</div>
                    </div>
                  ))}
                </div>
                {/* Filter + table */}
                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-slate-100">
                    <div className="flex gap-2">
                      {(['all', 'completed', 'pending'] as const).map(f => (
                        <button
                          key={f}
                          onClick={() => setDonationFilter(f)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-sm capitalize transition-all ${donationFilter === f ? 'bg-navy-900 text-white' : 'text-slate-500 hover:text-navy-900'}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <button className="text-xs text-gold-600 font-bold hover:text-gold-700 transition-colors self-start sm:self-auto">
                      Export CSV ↓
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead>
                        <tr className="border-b border-slate-50">
                          {['ID', 'Donor', 'Amount', 'Type', 'Campaign', 'Date', 'Status', ''].map(h => (
                            <th key={h} className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {filteredDonations.map((d, i) => (
                            <motion.tr
                              key={d.id}
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="border-b border-slate-50 hover:bg-cream-50 transition-colors group"
                            >
                              <td className="px-4 sm:px-6 py-3.5 text-slate-400 font-mono text-xs">{d.id}</td>
                              <td className="px-4 sm:px-6 py-3.5 text-navy-900 font-medium whitespace-nowrap">{d.donor}</td>
                              <td className="px-4 sm:px-6 py-3.5 text-navy-900 font-bold">${d.amount.toLocaleString()}</td>
                              <td className="px-4 sm:px-6 py-3.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide ${d.type === 'grant' ? 'bg-purple-50 text-purple-700' : d.type === 'monthly' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {d.type}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-3.5 text-slate-500 text-xs max-w-[140px] truncate">{d.campaign}</td>
                              <td className="px-4 sm:px-6 py-3.5 text-slate-400 text-xs whitespace-nowrap">{d.date}</td>
                              <td className="px-4 sm:px-6 py-3.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${d.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                  {d.status}
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-3.5">
                                <button className="text-gold-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:text-gold-700 whitespace-nowrap">
                                  View →
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'volunteers' && (
              <motion.div key="volunteers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Active', value: '12,408', icon: '◉', color: 'text-emerald-500' },
                    { label: 'Pending Review', value: '23', icon: '⏳', color: 'text-amber-400' },
                    { label: 'Avg. Hours/Month', value: '28', icon: '⏱', color: 'text-blue-400' },
                    { label: 'Countries', value: '47', icon: '🌍', color: 'text-purple-400' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white border border-slate-100 rounded-sm p-4"
                    >
                      <span className={`text-xl ${s.color}`}>{s.icon}</span>
                      <div className="text-navy-900 font-display font-bold text-2xl mt-2">{s.value}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100">
                    <h3 className="text-navy-900 font-display font-bold">Volunteer Roster</h3>
                    <motion.button whileHover={{ scale: 1.03 }} className="text-xs bg-gold-500 text-navy-900 font-bold px-3 py-1.5 rounded-sm">+ Invite</motion.button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[540px]">
                      <thead>
                        <tr className="border-b border-slate-50">
                          {['Volunteer', 'Role', 'Country', 'Hours', 'Level', 'Status', ''].map(h => (
                            <th key={h} className="text-left px-4 sm:px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {volunteers.map((v, i) => (
                          <motion.tr
                            key={v.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="border-b border-slate-50 hover:bg-cream-50 transition-colors group"
                          >
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="flex items-center gap-3">
                                <img src={v.avatar} alt={v.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                                <span className="text-navy-900 font-medium text-sm">{v.name}</span>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5 text-slate-500 text-xs">{v.role}</td>
                            <td className="px-4 sm:px-6 py-3.5 text-slate-500 text-xs">{v.country}</td>
                            <td className="px-4 sm:px-6 py-3.5 text-navy-900 font-bold text-sm">{v.hours}</td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${v.level === 'Platinum' ? 'bg-purple-50 text-purple-700' : v.level === 'Gold' ? 'bg-gold-100 text-gold-800' : v.level === 'Silver' ? 'bg-slate-100 text-slate-600' : 'bg-amber-50 text-amber-700'}`}>
                                {v.level}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${v.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                {v.status}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-3.5">
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-[10px] font-bold text-gold-600 hover:text-gold-700">Edit</button>
                                {v.status === 'pending' && <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700">Approve</button>}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'programs' && (
              <motion.div key="programs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-navy-900 font-display font-bold text-xl">Active Programs</h2>
                    <p className="text-slate-400 text-sm mt-0.5">47 programs across 6 regions</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} className="self-start sm:self-auto bg-gold-500 text-navy-900 text-xs font-bold px-4 py-2 rounded-sm">
                    + New Program
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {programs.map((p, i) => {
                    const pct = Math.round((p.spent / p.budget) * 100)
                    return (
                      <motion.div
                        key={p.name}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white border border-slate-100 rounded-sm p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-navy-900 font-display font-bold">{p.name}</h3>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide ${p.status === 'on-track' ? 'bg-emerald-50 text-emerald-700' : p.status === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>
                                {p.status}
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs">📍 {p.region}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-navy-900 font-bold">{p.beneficiaries.toLocaleString()}</div>
                            <div className="text-slate-400 text-xs">beneficiaries</div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Budget used</span>
                              <span className="font-semibold text-navy-900">{pct}% · ${(p.spent / 1e6).toFixed(1)}M / ${(p.budget / 1e6).toFixed(1)}M</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                                className={`h-full rounded-full ${pct > 85 ? 'bg-red-500' : pct > 65 ? 'bg-gold-500' : 'bg-navy-600'}`}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-xs text-gold-600 font-bold hover:text-gold-700 transition-colors whitespace-nowrap">Edit →</button>
                            <button className="text-xs text-slate-400 hover:text-navy-900 transition-colors whitespace-nowrap">Report</button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {tab === 'reports' && (
              <motion.div key="reports" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {[
                    { title: 'Annual Impact Report 2024', desc: 'Full-year programmatic outcomes, financials, and case studies.', size: '4.2 MB', type: 'PDF', date: 'Jan 1, 2025', icon: '📋' },
                    { title: 'Q4 Financial Audit', desc: 'Independent audit by Deloitte covering October–December 2024.', size: '1.8 MB', type: 'PDF', date: 'Jan 10, 2025', icon: '🔍' },
                    { title: 'Volunteer Hours Summary', desc: 'Aggregated volunteer contributions by region and program.', size: '0.6 MB', type: 'XLSX', date: 'Jan 15, 2025', icon: '📊' },
                    { title: 'Donor Retention Analysis', desc: 'Cohort analysis: first-time vs. recurring donors Q1–Q4 2024.', size: '0.9 MB', type: 'PDF', date: 'Jan 12, 2025', icon: '📈' },
                  ].map((r, i) => (
                    <motion.div
                      key={r.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white border border-slate-100 rounded-sm p-5 flex gap-4 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="text-3xl flex-shrink-0">{r.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-navy-900 font-semibold text-sm group-hover:text-navy-600 transition-colors">{r.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed mt-1 mb-3">{r.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded text-[10px]">{r.type}</span>
                            <span>{r.size}</span>
                            <span>{r.date}</span>
                          </div>
                          <motion.button whileHover={{ x: 2 }} className="text-gold-600 text-xs font-bold hover:text-gold-700">Download ↓</motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Audit log */}
                <div className="bg-white border border-slate-100 rounded-sm">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="text-navy-900 font-display font-bold">Audit Log</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Recent system actions and changes</p>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { user: 'Dr. Osei', action: 'Approved donation #D-20244', time: '10 min ago', type: 'approve' },
                      { user: 'R. Monteiro', action: 'Updated Peace Education Initiative budget', time: '1h ago', type: 'edit' },
                      { user: 'System', action: 'Generated Q4 audit report', time: '3h ago', type: 'system' },
                      { user: 'A. Hassan', action: 'Added new volunteer — Soo-Jin Park', time: '5h ago', type: 'add' },
                      { user: 'Dr. Osei', action: 'Exported donor CSV (142 records)', time: 'Yesterday', type: 'export' },
                    ].map((log, i) => (
                      <div key={i} className="px-6 py-3 flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.type === 'approve' ? 'bg-emerald-500' : log.type === 'edit' ? 'bg-gold-500' : log.type === 'system' ? 'bg-blue-500' : log.type === 'add' ? 'bg-purple-500' : 'bg-slate-400'}`} />
                        <span className="text-navy-900 font-semibold text-xs flex-shrink-0">{log.user}</span>
                        <span className="text-slate-500 text-xs flex-1">{log.action}</span>
                        <span className="text-slate-300 text-xs flex-shrink-0">{log.time}</span>
                      </div>
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

function SidebarContent({
  navItems, tab, setTab, adminUser, navigate,
}: {
  navItems: { id: AdminTab; label: string; icon: string; badge?: number }[]
  tab: AdminTab
  setTab: (t: AdminTab) => void
  adminUser: { name: string; role: string; avatar: string }
  navigate: (p: any) => void
}) {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Admin badge */}
      <div className="px-2 mb-6">
        <div className="bg-gold-500/10 border border-gold-500/20 rounded-sm px-3 py-2">
          <div className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">Admin Dashboard</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(item => (
          <motion.button
            key={item.id}
            onClick={() => setTab(item.id)}
            whileHover={{ x: 3 }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 ${
              tab === item.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${tab === item.id ? 'text-gold-400' : ''}`}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-white/8 my-4" />

      {/* Quick links */}
      <div className="space-y-1 mb-4">
        {[
          { label: 'Volunteer Portal', page: 'portal' as const },
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

      {/* User */}
      <div className="flex items-center gap-3 px-2">
        <img src={adminUser.avatar} alt={adminUser.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-white text-sm font-semibold truncate">{adminUser.name.split(' ').slice(-1)[0]}</div>
          <div className="text-white/40 text-[10px] truncate">{adminUser.role}</div>
        </div>
        <button
          onClick={() => navigate('home')}
          className="ml-auto text-white/30 hover:text-white/70 transition-colors text-xs"
          title="Sign out"
        >
          ⏏
        </button>
      </div>
    </div>
  )
}
