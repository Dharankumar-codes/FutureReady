import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// ─── Static fallback data ─────────────────────────────────────────────────────

const DEMO = {
  name: 'Alex Johnson',
  title: 'Aspiring Full-Stack Developer',
  location: 'Chennai, Tamil Nadu',
  bio: 'Passionate about technology and eager to build a future in software development. Currently exploring web dev, AI/ML and cloud technologies through FutureReady.',
  email: 'alex.johnson@email.com',
  github: 'github.com/alexj',
  linkedin: 'linkedin.com/in/alexj',
  joinDate: 'January 2026',
  lastActive: '2 hours ago',
}

const SKILLS = [
  { name: 'React',      level: 'Intermediate', pct: 65 },
  { name: 'JavaScript', level: 'Advanced',     pct: 85 },
  { name: 'Python',     level: 'Beginner',     pct: 35 },
  { name: 'Node.js',    level: 'Intermediate', pct: 60 },
  { name: 'SQL',        level: 'Intermediate', pct: 55 },
  { name: 'Git',        level: 'Advanced',     pct: 80 },
]

const GOALS = [
  { title: 'Full-Stack Web Developer',  pct: 72 },
  { title: 'Machine Learning Engineer', pct: 38 },
  { title: 'Cloud Solutions Architect', pct: 25 },
]

const ACTIVITY = [
  { icon: '🏆', text: 'Earned "JavaScript Master" badge',          time: '2 hours ago' },
  { icon: '📚', text: 'Completed "React Hooks Deep Dive" course',  time: '1 day ago'   },
  { icon: '🎯', text: 'Finished Career Quiz – matched Full-Stack', time: '3 days ago'  },
  { icon: '🗺️', text: 'Started Web Development Roadmap',          time: '1 week ago'  },
  { icon: '🚀', text: 'Joined FutureReady platform',               time: '1 month ago' },
]

const MILESTONES = [
  { label: 'HTML & CSS Basics',       done: true  },
  { label: 'JavaScript Fundamentals', done: true  },
  { label: 'React Framework',         done: true  },
  { label: 'Node.js & Express',       done: false },
  { label: 'Database Design',         done: false },
  { label: 'DevOps & Cloud',          done: false },
]

const levelColor = (level) => {
  if (level === 'Advanced')     return 'bg-blue-100 text-blue-700'
  if (level === 'Intermediate') return 'bg-indigo-100 text-indigo-700'
  return 'bg-gray-100 text-gray-600'
}

// ─── Edit Profile Modal ───────────────────────────────────────────────────────

function EditModal({ profile, onSave, onClose }) {
  const [form, setForm] = useState({ ...profile })
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const fields = [
    { label: 'Full Name',          name: 'name',     type: 'text',  placeholder: 'Your full name'           },
    { label: 'Professional Title', name: 'title',    type: 'text',  placeholder: 'e.g. Aspiring Developer'  },
    { label: 'Location',           name: 'location', type: 'text',  placeholder: 'City, State'              },
    { label: 'Email',              name: 'email',    type: 'email', placeholder: 'your@email.com'           },
    { label: 'GitHub',             name: 'github',   type: 'text',  placeholder: 'github.com/username'      },
    { label: 'LinkedIn',           name: 'linkedin', type: 'text',  placeholder: 'linkedin.com/in/username' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#101C35]">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {fields.map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
              <input
                type={type} name={name} value={form[name] || ''} onChange={handle} placeholder={placeholder}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Bio</label>
            <textarea
              name="bio" value={form.bio || ''} onChange={handle} rows={3} placeholder="Write a short bio..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="px-5 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

// ─── Main Profile Page ────────────────────────────────────────────────────────

const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth()
  const navigate = useNavigate()

  const base = currentUser ? { ...DEMO, ...currentUser } : DEMO
  const [profile, setProfile]      = useState(base)
  const [avatarPreview, setAvatar] = useState(currentUser?.avatar || null)
  const [editing, setEditing]      = useState(false)
  const [activeTab, setActiveTab]  = useState('overview')
  const avatarRef = useRef(null)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; if (!file) return
    const r = new FileReader(); r.onload = (ev) => setAvatar(ev.target.result); r.readAsDataURL(file)
  }
  const handleSave = (updated) => {
    setProfile(updated)
    if (currentUser && updateProfile) updateProfile(updated)
    setEditing(false)
  }
  const handleLogout = () => { logout(); navigate('/') }

  const initials = profile.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const TABS = [
    { key: 'overview', label: 'Overview', icon: '🏠' },
    { key: 'skills',   label: 'Skills',   icon: '🎯' },
    { key: 'progress', label: 'Progress', icon: '📈' },
    { key: 'activity', label: 'Activity', icon: '🕐' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-16 pt-6">

        {/* ══════════════════════════════════════════════════════════════════
            PROFILE CARD  (banner + avatar + info)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">

          {/* ── Fixed Banner ────────────────────────────────────────────── */}
          <div className="relative h-44 md:h-56 overflow-hidden select-none">

            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2550] via-[#1a3a6e] to-[#0d3b6e]" />

            {/* Diagonal colour bands */}
            <div className="absolute inset-0 opacity-30"
              style={{ background: 'linear-gradient(135deg, #1e40af 0%, transparent 50%, #4f46e5 100%)' }} />

            {/* Animated glowing orbs */}
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-blue-400/30 rounded-full blur-3xl" />
            <div className="absolute top-4 left-1/3 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 right-10 w-56 h-56 bg-indigo-500/30 rounded-full blur-3xl" />
            <div className="absolute top-2 right-1/4 w-32 h-32 bg-purple-400/15 rounded-full blur-2xl" />

            {/* Fine dot grid */}
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

            {/* Diagonal stripe lines */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)' }} />

            {/* Floating career icons */}
            {[
              { e: '💻', top: '15%', left: '6%',   size: 'text-3xl', op: 'opacity-30' },
              { e: '🚀', top: '55%', left: '12%',  size: 'text-2xl', op: 'opacity-25' },
              { e: '🎯', top: '20%', left: '28%',  size: 'text-xl',  op: 'opacity-20' },
              { e: '📊', top: '62%', left: '45%',  size: 'text-2xl', op: 'opacity-20' },
              { e: '⭐', top: '18%', right: '28%', size: 'text-xl',  op: 'opacity-25' },
              { e: '🧠', top: '50%', right: '12%', size: 'text-2xl', op: 'opacity-20' },
              { e: '🏆', top: '15%', right: '6%',  size: 'text-3xl', op: 'opacity-30' },
              { e: '🔗', top: '62%', right: '25%', size: 'text-xl',  op: 'opacity-20' },
            ].map(({ e, top, left, right, size, op }, i) => (
              <span key={i} className={`absolute ${size} ${op}`} style={{ top, left, right }}>{e}</span>
            ))}

            {/* Centre branding */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              {/* Badge */}
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[11px] font-bold text-white/80 tracking-widest uppercase">Career Explorer</span>
              </div>
              {/* Logo text */}
              <h2 className="text-2xl md:text-3xl font-extrabold text-white/90 tracking-tight">
                Future<span className="text-blue-300">Ready</span>
              </h2>
              {/* Tagline */}
              <p className="text-white/40 text-xs font-medium tracking-wide">Discover · Learn · Grow</p>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/10 to-transparent" />
          </div>

          {/* ── Avatar + Info row ───────────────────────────────────────── */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end -mt-12">

              {/* Avatar (overlaps banner) */}
              <div className="relative shrink-0">
                <div
                  onClick={() => avatarRef.current.click()}
                  className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 cursor-pointer ring-4 ring-white shadow-xl group"
                >
                  {avatarPreview
                    ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">{initials}</div>
                  }
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-2xl">
                    <span className="text-white text-xs font-semibold">📷 Edit</span>
                  </div>
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 ring-2 ring-white" />
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              {/* Name / title / meta */}
              <div className="flex-1 min-w-0 mt-4 sm:mt-0 sm:pb-1">
                <h1 className="text-2xl font-bold text-[#101C35] leading-tight">{profile.name}</h1>
                <p className="text-blue-600 font-medium text-sm mt-0.5">{profile.title}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                  {profile.location && <span>📍 {profile.location}</span>}
                  <span>📅 Joined {profile.joinDate || 'recently'}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    Active {profile.lastActive || 'recently'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 shrink-0 flex-wrap sm:pb-1">
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                >
                  ✏️ Edit Profile
                </button>
                {currentUser
                  ? <button onClick={handleLogout} className="flex items-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition">
                      🚪 Logout
                    </button>
                  : <Link to="/login" className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition">
                      🔑 Sign In
                    </Link>
                }
              </div>

            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-gray-100">
              {[
                { label: 'Skills',     value: SKILLS.length, icon: '🎯' },
                { label: 'Courses',    value: 11,            icon: '📚' },
                { label: 'Day Streak', value: '45d',         icon: '🔥' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-bold text-[#101C35]">{value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{icon} {label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            TABS
        ══════════════════════════════════════════════════════════════════ */}
        <div className="flex gap-1 mb-6 bg-white border border-gray-100 rounded-xl p-1 shadow-sm w-fit">
          {TABS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            OVERVIEW TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-5">

            {/* About + Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#101C35] mb-3">About Me</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{profile.bio || 'No bio added yet.'}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#101C35] mb-4">Contact & Links</h3>
                <div className="space-y-3">
                  {[
                    { icon: '📧', label: 'Email',    value: profile.email    },
                    { icon: '🐙', label: 'GitHub',   value: profile.github   },
                    { icon: '💼', label: 'LinkedIn', value: profile.linkedin },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-lg">{icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm text-blue-600 font-medium truncate">{value || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#101C35]">Top Skills</h3>
                <button onClick={() => setActiveTab('skills')} className="text-sm text-blue-600 hover:underline font-medium">View all →</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILLS.slice(0, 4).map(({ name, level, pct }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-700">{name}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor(level)}`}>{level}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-600 transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Goals */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#101C35]">Career Goals</h3>
                <button onClick={() => setActiveTab('progress')} className="text-sm text-blue-600 hover:underline font-medium">View details →</button>
              </div>
              <div className="space-y-4">
                {GOALS.map(({ title, pct }) => (
                  <div key={title}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{title}</span>
                      <span className="text-sm font-bold text-[#101C35]">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SKILLS TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'skills' && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <div key={lvl} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                  <p className="text-3xl font-bold text-[#101C35]">{SKILLS.filter(s => s.level === lvl).length}</p>
                  <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColor(lvl)}`}>{lvl}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#101C35] mb-5">All Skills</h3>
              <div className="space-y-5">
                {SKILLS.map(({ name, level, pct }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-gray-700">{name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#101C35]">{pct}%</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor(level)}`}>{level}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-blue-600 transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            PROGRESS TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'progress' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-[#101C35] mb-5">Career Goal Progress</h3>
              <div className="space-y-5">
                {GOALS.map(({ title, pct }) => (
                  <div key={title}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{title}</span>
                      <span className="text-sm font-bold text-[#101C35]">{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#101C35] mb-4">Learning Milestones</h3>
                <div className="space-y-1">
                  {MILESTONES.map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                      <span className={`text-lg ${done ? 'text-green-500' : 'text-gray-200'}`}>{done ? '✅' : '⬜'}</span>
                      <span className={`text-sm font-medium flex-1 ${done ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
                      {done && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Done</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-[#101C35] mb-4">Weekly Activity</h3>
                <div className="flex items-end gap-2 h-32">
                  {[4, 7, 3, 9, 6, 8, 5].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-lg bg-blue-600 opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${(h / 9) * 100}%` }} title={`${h} activities`} />
                      <span className="text-xs text-gray-400 font-medium">{['M','T','W','T','F','S','S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            ACTIVITY TAB
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-[#101C35] mb-5">Recent Activity</h3>
            <div className="space-y-1">
              {ACTIVITY.map(({ icon, text, time }, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shrink-0">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 opacity-60" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Edit Modal */}
      {editing && <EditModal profile={profile} onSave={handleSave} onClose={() => setEditing(false)} />}

    </div>
  )
}

export default Profile
