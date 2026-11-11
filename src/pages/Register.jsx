import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      return setError('All fields are required.')
    }
    if (form.password !== form.confirm) {
      return setError('Passwords do not match.')
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.')
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const result = register({ name: form.name.trim(), email: form.email.trim(), password: form.password })
    setLoading(false)
    if (!result.success) return setError(result.error)
    navigate('/profile')
  }

  const inputCls =
    'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all'

  return (
    <div className="min-h-screen bg-[#0a1221] flex items-center justify-center px-4 py-16">
      {/* Glow blobs */}
      <div className="fixed -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-white">
            Future<span className="text-blue-400">Ready</span>
          </Link>
          <p className="text-white/40 text-sm mt-2">Create your account and start your journey</p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white mb-6">Create Account</h1>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" id="register-form">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                id="register-name"
                name="name" value={form.name} onChange={handle}
                placeholder="Your full name" className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                id="register-email"
                name="email" type="email" value={form.email} onChange={handle}
                placeholder="your@email.com" className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                id="register-password"
                name="password" type="password" value={form.password} onChange={handle}
                placeholder="Min. 6 characters" className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Confirm Password</label>
              <input
                id="register-confirm"
                name="confirm" type="password" value={form.confirm} onChange={handle}
                placeholder="Repeat password" className={inputCls}
              />
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
            >
              {loading ? '⏳ Creating account...' : '🚀 Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
