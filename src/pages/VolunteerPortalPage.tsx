import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const user = {
  name: 'Dr. Amara Diallo',
  role: 'Field Volunteer · Healthcare',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format',
  location: 'Accra, Ghana',
  memberSince: 'March 2022',
  level: 'Gold Volunteer',
  hoursLogged: 847,
  hoursGoal: 1000,
  impactScore: 92,
  nextMission: 'Gulu Health Camp — Feb 18',
}

const stats = [
  { label: 'Hours Contributed', value: '847', icon: '⏱', color: 'text-gold-500' },
  { label: 'Missions Completed', value: '14', icon: '✓', color: 'text-emerald-500' },
  { label: 'Lives Impacted', value: '3,240', icon: '◉', color: 'text-blue-400' },
  { label: 'Countries Visited', value: '7', icon: '🌍', color: 'text-purple-400' },
]

const assignments = [
  {
    id: 1, status: 'upcoming', priority: 'high',
    title: 'Gulu Community Health Camp',
    location: 'Gulu, Uganda', date: 'Feb 18–24, 2025',
    role: 'Medical Lead', team: 8,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=200&fit=crop&auto=format',
    desc: 'Providing primary healthcare, vaccinations, and nutritional screening to 1,200+ residents.',
  },
  {
    id: 2, status: 'upcoming', priority: 'medium',
    title: 'Peace Education Workshop',
    location: 'Bamako, Mali', date: 'Mar 5–7, 2025',
    role: 'Facilitator', team: 4,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&auto=format',
    desc: 'Facilitating conflict resolution training for 120 secondary school teachers.',
  },
  {
    id: 3, status: 'completed', priority: 'low',
    title: 'Emergency Food Distribution',
    location: 'Niamey, Niger', date: 'Jan 10–12, 2025',
    role: 'Logistics Coordinator', team: 12,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=200&fit=crop&auto=format',
    desc: 'Coordinated emergency food packages for 840 displaced families.',
  },
]

const activity = [
  { date: 'Jan 12', event: 'Completed Emergency Food Distribution in Niamey', icon: '✓', color: 'bg-emerald-500' },
  { date: 'Jan 8', event: 'Submitted field report: Niger Emergency Response', icon: '📄', color: 'bg-blue-500' },
  { date: 'Dec 28', event: 'Received Gold Volunteer badge — 800+ hours milestone', icon: '★', color: 'bg-gold-500' },
  { date: 'Dec 15', event: 'Training completed: Trauma-Informed Community Leadership', icon: '🎓', color: 'bg-purple-500' },
  { date: 'Nov 30', event: 'Joined Gulu Health Camp team — Feb mission', icon: '+', color: 'bg-navy-600' },
]

const resources = [
  { title: 'Field Safety Manual 2025', type: 'PDF', size: '2.4 MB', icon: '📋' },
  { title: 'Volunteer Code of Conduct', type: 'PDF', size: '0.8 MB', icon: '📜' },
  { title: 'Medical Protocols Handbook', type: 'PDF', size: '4.1 MB', icon: '🏥' },
  { title: 'Cultural Sensitivity Guide — East Africa', type: 'PDF', size: '1.6 MB', icon: '🌍' },
]

type DashTab = 'dashboard' | 'missions' | 'impact' | 'resources' | 'profile'

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-100 rounded-sm p-6 cursor-default"
    >
      <div className={`text-2xl mb-3 ${stat.color}`}>{stat.icon}</div>
      <div className="text-navy-900 font-display text-3xl font-bold mb-1">{stat.value}</div>
      <div className="text-slate-400 text-xs">{stat.label}</div>
    </motion.div>
  )
}

function AssignmentCard({ a, index }: { a: typeof assignments[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-slate-100 rounded-sm overflow-hidden group hover:shadow-lg hover:border-navy-200 transition-all duration-300"
    >
      <div className="relative h-32 overflow-hidden">
        <motion.img
          src={a.image} alt={a.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
            a.status === 'completed' ? 'bg-emerald-500 text-white' :
            a.priority === 'high' ? 'bg-red-500 text-white' : 'bg-gold-500 text-navy-900'
          }`}>
            {a.status === 'completed' ? '✓ Done' : a.priority === 'high' ? 'Urgent' : 'Upcoming'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="text-white/70 text-[10px] flex items-center gap-1">
            <span>👥</span> {a.team} team members
          </div>
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-navy-900 font-display font-bold text-base mb-1 leading-snug group-hover:text-navy-600 transition-colors">{a.title}</h4>
        <div className="flex gap-3 text-xs text-slate-400 mb-3">
          <span>📍 {a.location}</span>
          <span>📅 {a.date}</span>
        </div>
        <p className="text-slate-500 text-xs leading-relaxed mb-4">{a.desc}</p>
        <div className="flex items-center justify-between">
          <span className="bg-navy-50 text-navy-700 text-[10px] font-bold px-2.5 py-1 rounded-sm">{a.role}</span>
          {a.status !== 'completed' && (
            <motion.button
              whileHover={{ x: 3 }}
              className="text-gold-600 text-xs font-bold hover:text-gold-700 transition-colors"
            >
              View briefing →
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function VolunteerPortalPage({ navigate }: { navigate: (p: any) => void }) {
  const [activeTab, setActiveTab] = useState<DashTab>('dashboard')
  const hoursPercent = Math.round((user.hoursLogged / user.hoursGoal) * 100)

  const tabs: { id: DashTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '◉' },
    { id: 'missions', label: 'My Missions', icon: '🌍' },
    { id: 'impact', label: 'My Impact', icon: '★' },
    { id: 'resources', label: 'Resources', icon: '📋' },
    { id: 'profile', label: 'Profile', icon: '◎' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]">
      {/* Portal header bar */}
      <div className="bg-navy-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-gold-500/50" />
            <div>
              <div className="text-white text-sm font-semibold leading-tight">{user.name}</div>
              <div className="text-white/40 text-[10px]">{user.role}</div>
            </div>
            <div className="hidden md:flex items-center gap-1.5 bg-gold-500/15 border border-gold-500/30 rounded-sm px-3 py-1">
              <span className="text-gold-400 text-xs">★</span>
              <span className="text-gold-300 text-xs font-bold">{user.level}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <div className="text-white/35 text-[10px] mb-0.5">Hours to Gold+</div>
              <div className="text-white text-xs font-bold">{user.hoursGoal - user.hoursLogged} hrs remaining</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(196,154,46,0.6)' }}
              onClick={() => navigate('home')}
              className="text-white/50 hover:text-white text-xs border border-white/15 px-3 py-1.5 rounded-sm transition-all"
            >
              ← Main Site
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="bg-white border-b border-slate-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide -mb-px">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative flex items-center gap-1.5 px-3 sm:px-5 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === t.id ? 'text-navy-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className="text-base sm:text-sm">{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
                {activeTab === t.id && (
                  <motion.div layoutId="portal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <AnimatePresence mode="wait">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Welcome banner */}
              <div className="bg-navy-900 rounded-sm p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(196,154,46,0.12) 0%, transparent 70%)' }} />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div>
                    <div className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-2">Good to see you</div>
                    <h2 className="text-white font-display text-2xl lg:text-3xl font-bold mb-2">
                      Welcome back, {user.name.split(' ')[1]}
                    </h2>
                    <p className="text-white/50 text-sm">Your next mission: <span className="text-gold-400 font-semibold">{user.nextMission}</span></p>
                  </div>
                  {/* Progress ring */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                          <motion.circle
                            cx="48" cy="48" r="40" fill="none" stroke="#C49A2E" strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - hoursPercent / 100) }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: 0.3 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-white font-display font-bold text-lg leading-none">{hoursPercent}%</div>
                          <div className="text-white/40 text-[9px]">goal</div>
                        </div>
                      </div>
                      <div className="text-white/50 text-[10px] mt-1">{user.hoursLogged}/{user.hoursGoal} hrs</div>
                    </div>
                    <div>
                      <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Impact Score</div>
                      <div className="text-gold-400 font-display text-4xl font-bold">{user.impactScore}</div>
                      <div className="text-white/30 text-[10px]">out of 100</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming assignments */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-navy-900 font-display font-bold text-lg">Upcoming Missions</h3>
                    <button onClick={() => setActiveTab('missions')} className="text-gold-600 text-xs font-bold hover:text-gold-700 transition-colors">
                      View all →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assignments.filter(a => a.status === 'upcoming').map((a, i) => (
                      <AssignmentCard key={a.id} a={a} index={i} />
                    ))}
                  </div>
                </div>

                {/* Activity feed */}
                <div>
                  <h3 className="text-navy-900 font-display font-bold text-lg mb-4">Recent Activity</h3>
                  <div className="bg-white border border-slate-100 rounded-sm p-5 space-y-4">
                    {activity.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex gap-3 items-start"
                      >
                        <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <span className="text-white text-[9px]">{item.icon}</span>
                        </div>
                        <div>
                          <p className="text-slate-700 text-xs leading-snug">{item.event}</p>
                          <div className="text-slate-400 text-[10px] mt-0.5">{item.date}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* MISSIONS */}
          {activeTab === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-navy-900 font-display font-bold text-2xl">My Missions</h3>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-navy-900 text-white text-sm font-bold px-5 py-2.5 rounded-sm"
                >
                  + Browse Open Missions
                </motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {assignments.map((a, i) => <AssignmentCard key={a.id} a={a} index={i} />)}
              </div>
            </motion.div>
          )}

          {/* IMPACT */}
          {activeTab === 'impact' && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <h3 className="text-navy-900 font-display font-bold text-2xl">My Impact Report</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
              </div>
              {/* Impact breakdown */}
              <div className="bg-white border border-slate-100 rounded-sm p-8">
                <h4 className="text-navy-900 font-display font-bold text-lg mb-6">Hours by Program Area</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Healthcare & Medical', hours: 340, color: 'bg-emerald-500', pct: 40 },
                    { label: 'Humanitarian Aid', hours: 220, color: 'bg-blue-500', pct: 26 },
                    { label: 'Community Education', hours: 180, color: 'bg-gold-500', pct: 21 },
                    { label: 'Logistics & Operations', hours: 107, color: 'bg-purple-500', pct: 13 },
                  ].map((item, i) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-600 font-medium">{item.label}</span>
                        <span className="text-navy-900 font-bold">{item.hours} hrs</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Certificate */}
              <div className="bg-navy-900 rounded-sm p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 lines-bg opacity-20" />
                <div className="relative z-10">
                  <div className="text-gold-400 text-3xl mb-3">★</div>
                  <h4 className="text-white font-display font-bold text-xl mb-2">Gold Volunteer Status</h4>
                  <p className="text-white/50 text-sm mb-5">Awarded for 800+ hours of humanitarian service across 7 countries.</p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(196,154,46,0.3)' }}
                    className="bg-gold-500 text-navy-900 font-bold text-sm px-6 py-3 rounded-sm"
                  >
                    Download Certificate
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESOURCES */}
          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="text-navy-900 font-display font-bold text-2xl mb-6">Volunteer Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((r, i) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(11,29,58,0.08)', transition: { duration: 0.2 } }}
                    className="bg-white border border-slate-100 rounded-sm p-5 flex items-center gap-4 cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-navy-50 rounded-sm flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-navy-100 transition-colors">
                      {r.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-navy-900 font-semibold text-sm group-hover:text-navy-600 transition-colors">{r.title}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{r.type} · {r.size}</div>
                    </div>
                    <motion.div whileHover={{ x: 3 }} className="text-gold-500 text-lg">↓</motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl"
            >
              <h3 className="text-navy-900 font-display font-bold text-2xl mb-6">My Profile</h3>
              <div className="bg-white border border-slate-100 rounded-sm overflow-hidden mb-5">
                <div className="bg-navy-900 h-24 relative">
                  <div className="absolute bottom-0 left-8 translate-y-1/2">
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-white" />
                  </div>
                </div>
                <div className="pt-14 px-8 pb-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-navy-900 font-display font-bold text-xl">{user.name}</h4>
                      <div className="text-slate-400 text-sm">{user.role}</div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-slate-400 text-xs">📍 {user.location}</span>
                        <span className="text-slate-300 text-xs">·</span>
                        <span className="text-slate-400 text-xs">Member since {user.memberSince}</span>
                      </div>
                    </div>
                    <span className="bg-gold-100 text-gold-800 text-[10px] font-bold px-3 py-1.5 rounded-sm">★ {user.level}</span>
                  </div>
                </div>
              </div>

              {/* Edit form */}
              <div className="bg-white border border-slate-100 rounded-sm p-8 space-y-5">
                <h4 className="text-navy-900 font-bold text-base">Edit Profile</h4>
                {[
                  { label: 'Full Name', value: user.name, type: 'text' },
                  { label: 'Email', value: 'amara.diallo@example.com', type: 'email' },
                  { label: 'Location', value: user.location, type: 'text' },
                  { label: 'Skills / Specialization', value: 'Emergency Medicine, Trauma Care, Community Health', type: 'text' },
                ].map(field => (
                  <div key={field.label}>
                    <label className="block text-xs font-bold text-navy-900 mb-1.5 tracking-wide uppercase">{field.label}</label>
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full border border-slate-200 rounded-sm px-4 py-3 text-sm text-navy-900 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-navy-900 text-white font-bold text-sm px-6 py-3 rounded-sm"
                  >
                    Save Changes
                  </motion.button>
                  <button className="border border-slate-200 text-slate-500 font-semibold text-sm px-6 py-3 rounded-sm hover:border-slate-400 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>

              {/* Sign out */}
              <div className="mt-5">
                <button
                  onClick={() => navigate('home')}
                  className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  Sign out of portal →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
