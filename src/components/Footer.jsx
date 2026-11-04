
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#101C35] text-gray-300 px-6 py-12">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Future<span className="text-blue-400">Ready</span>
          </h2>

          <p className="text-sm leading-7">
            Discover your career path, develop the right skills
            and build a better future with FutureReady.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/careers" className="hover:text-blue-400">Careers</Link>
            <Link to="/quiz" className="hover:text-blue-400">Career Quiz</Link>
            <Link to="/roadmap" className="hover:text-blue-400">Roadmaps</Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/profile" className="hover:text-blue-400">
              My Profile
            </Link>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>

          <p className="text-sm leading-7">
            Have questions about your career journey?
            We are here to help you.
          </p>

          <p className="text-sm mt-3 text-blue-400">
            support@futureready.com
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-10 pt-6 text-center">
        <p className="text-sm">
          © 2026 FutureReady. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer
