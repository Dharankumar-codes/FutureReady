
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-[#101C35] text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Future<span className="text-blue-400">Ready</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/careers" className="hover:text-blue-400">Careers</Link>
          <Link to="/quiz" className="hover:text-blue-400">Career Quiz</Link>
          <Link to="/roadmap" className="hover:text-blue-400">Roadmaps</Link>
        </div>

        {/* Authentication */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
