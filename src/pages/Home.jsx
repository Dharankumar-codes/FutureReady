
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-slate-50">

      {/* Hero Section */}
      <section className="bg-[#101C35] text-white px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-blue-400 font-semibold mb-4">
            YOUR FUTURE STARTS HERE
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your Career.
            <br />
            Build Your Future.
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Not sure which career is right for you?
            Explore career paths, discover your strengths,
            learn essential skills, and follow a personalized roadmap.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/quiz"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold"
            >
              Find My Career
            </Link>

            <Link
              to="/careers"
              className="border border-gray-400 hover:bg-white hover:text-[#101C35] px-7 py-3 rounded-lg font-semibold"
            >
              Explore Careers
            </Link>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#101C35] mb-4">
            Everything You Need to Get Career Ready
          </h2>

          <p className="text-gray-600">
            From career discovery to skill development,
            FutureReady helps you move forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-5">🎯</div>
            <h3 className="text-xl font-bold mb-3">
              Career Discovery
            </h3>
            <p className="text-gray-600">
              Discover suitable career paths based on your
              interests and strengths.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-5">🗺️</div>
            <h3 className="text-xl font-bold mb-3">
              Learning Roadmaps
            </h3>
            <p className="text-gray-600">
              Follow step-by-step learning paths to develop
              skills for your chosen career.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-5">📊</div>
            <h3 className="text-xl font-bold mb-3">
              Progress Tracking
            </h3>
            <p className="text-gray-600">
              Track completed skills, learning goals,
              and career preparation progress.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Your Future?
        </h2>

        <p className="text-blue-100 mb-8">
          Take the first step towards your dream career.
        </p>

        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started for Free
        </Link>
      </section>

    </div>
  )
}

export default Home
