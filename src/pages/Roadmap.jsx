import { useState } from 'react'
import { roadmaps } from '../data/roadmaps'

const colorMap = {
  blue: {
    card: 'border-blue-500/40 hover:border-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
    phase: 'text-blue-400',
    dot: 'bg-blue-500',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  green: {
    card: 'border-green-500/40 hover:border-green-400',
    badge: 'bg-green-500/20 text-green-300',
    phase: 'text-green-400',
    dot: 'bg-green-500',
    btn: 'bg-green-600 hover:bg-green-700',
  },
  purple: {
    card: 'border-purple-500/40 hover:border-purple-400',
    badge: 'bg-purple-500/20 text-purple-300',
    phase: 'text-purple-400',
    dot: 'bg-purple-500',
    btn: 'bg-purple-600 hover:bg-purple-700',
  },
  pink: {
    card: 'border-pink-500/40 hover:border-pink-400',
    badge: 'bg-pink-500/20 text-pink-300',
    phase: 'text-pink-400',
    dot: 'bg-pink-500',
    btn: 'bg-pink-600 hover:bg-pink-700',
  },
}

const Roadmap = () => {
  const [selected, setSelected] = useState(null)

  if (selected) {
    const roadmap = roadmaps.find(r => r.id === selected)
    const c = colorMap[roadmap.color]

    return (
      <div className="min-h-screen bg-[#0D1526] px-4 py-12">
        <div className="max-w-3xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => setSelected(null)}
            className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition"
          >
            ← Back to Roadmaps
          </button>

          {/* Header */}
          <div className="bg-[#101C35] rounded-2xl p-6 mb-6 border border-gray-700">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{roadmap.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-white">{roadmap.title}</h1>
                <p className="text-gray-400 mt-1">{roadmap.description}</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          {roadmap.steps.map((step, si) => (
            <div key={si} className="bg-[#101C35] rounded-2xl p-6 mb-4 border border-gray-700">
              <h2 className={`text-lg font-semibold mb-4 ${c.phase}`}>
                {step.phase}
              </h2>
              <div className="flex flex-col gap-3">
                {step.topics.map((topic, ti) => (
                  <div
                    key={ti}
                    className="flex items-start gap-3 bg-[#0D1526] rounded-xl p-4"
                  >
                    <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${c.dot}`} />
                    <div>
                      <p className="text-white font-medium">{topic.name}</p>
                      <p className="text-gray-400 text-sm">{topic.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1526] px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Career <span className="text-blue-400">Roadmaps</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Step-by-step learning paths to reach your dream career
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {roadmaps.map((roadmap) => {
            const c = colorMap[roadmap.color]
            return (
              <div
                key={roadmap.id}
                className={`bg-[#101C35] border rounded-2xl p-6 cursor-pointer transition-all duration-200 ${c.card}`}
                onClick={() => setSelected(roadmap.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{roadmap.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{roadmap.title}</h2>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.badge}`}>
                      {roadmap.steps.length} Phases
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{roadmap.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {roadmap.steps.reduce((acc, s) => acc + s.topics.length, 0)} Topics
                  </span>
                  <button className={`text-sm text-white px-4 py-2 rounded-lg transition ${c.btn}`}>
                    View Roadmap →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Roadmap