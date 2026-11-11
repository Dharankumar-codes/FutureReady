
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser, logout } = useAuth()

  return (
    <nav className="bg-[#101C35] text-white px-6 py-4 sticky top-0 z-40 border-b border-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Future<span className="text-blue-400">Ready</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-white/70 hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/careers" className="text-white/70 hover:text-blue-400 transition-colors">Careers</Link>
          <Link to="/quiz" className="text-white/70 hover:text-blue-400 transition-colors">Career Quiz</Link>
          <Link to="/roadmap" className="text-white/70 hover:text-blue-400 transition-colors">Roadmaps</Link>
        </div>

        {/* Auth / Profile */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-blue-400 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold shadow">
                  {currentUser.name?.charAt(0).toUpperCase() || '👤'}
                </span>
                <span className="hidden md:inline">{currentUser.name?.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="text-sm text-white/50 hover:text-red-400 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-white/70 hover:text-blue-400 transition-colors font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar
