export const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: '🖥️',
    color: 'blue',
    description: 'Build beautiful, responsive web interfaces',
    steps: [
      {
        phase: 'Phase 1 — Basics',
        topics: [
          { name: 'HTML5', desc: 'Structure of web pages', done: false },
          { name: 'CSS3', desc: 'Styling and layouts', done: false },
          { name: 'JavaScript', desc: 'Make pages interactive', done: false },
        ]
      },
      {
        phase: 'Phase 2 — Intermediate',
        topics: [
          { name: 'React.js', desc: 'Component-based UI library', done: false },
          { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', done: false },
          { name: 'Git & GitHub', desc: 'Version control', done: false },
        ]
      },
      {
        phase: 'Phase 3 — Advanced',
        topics: [
          { name: 'Next.js', desc: 'React framework for production', done: false },
          { name: 'TypeScript', desc: 'Typed JavaScript', done: false },
          { name: 'Testing (Jest)', desc: 'Write unit & integration tests', done: false },
        ]
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: '⚙️',
    color: 'green',
    description: 'Build APIs, databases and server-side logic',
    steps: [
      {
        phase: 'Phase 1 — Basics',
        topics: [
          { name: 'Python / Node.js', desc: 'Choose your backend language', done: false },
          { name: 'HTTP & REST APIs', desc: 'Understand web communication', done: false },
          { name: 'Git & GitHub', desc: 'Version control basics', done: false },
        ]
      },
      {
        phase: 'Phase 2 — Intermediate',
        topics: [
          { name: 'Express.js / FastAPI', desc: 'Build REST APIs', done: false },
          { name: 'SQL & PostgreSQL', desc: 'Relational databases', done: false },
          { name: 'Authentication (JWT)', desc: 'Secure your APIs', done: false },
        ]
      },
      {
        phase: 'Phase 3 — Advanced',
        topics: [
          { name: 'Docker', desc: 'Containerize your apps', done: false },
          { name: 'Redis', desc: 'Caching and sessions', done: false },
          { name: 'System Design', desc: 'Scale your applications', done: false },
        ]
      }
    ]
  },
  {
    id: 'datascience',
    title: 'Data Scientist',
    icon: '📊',
    color: 'purple',
    description: 'Analyze data and build ML models',
    steps: [
      {
        phase: 'Phase 1 — Basics',
        topics: [
          { name: 'Python', desc: 'Primary language for data science', done: false },
          { name: 'Statistics & Math', desc: 'Foundation of data analysis', done: false },
          { name: 'Excel / Sheets', desc: 'Basic data manipulation', done: false },
        ]
      },
      {
        phase: 'Phase 2 — Intermediate',
        topics: [
          { name: 'Pandas & NumPy', desc: 'Data manipulation libraries', done: false },
          { name: 'Matplotlib / Seaborn', desc: 'Data visualization', done: false },
          { name: 'Machine Learning (Sklearn)', desc: 'Build ML models', done: false },
        ]
      },
      {
        phase: 'Phase 3 — Advanced',
        topics: [
          { name: 'Deep Learning (TensorFlow)', desc: 'Neural networks', done: false },
          { name: 'NLP', desc: 'Natural Language Processing', done: false },
          { name: 'Model Deployment', desc: 'Deploy ML models to production', done: false },
        ]
      }
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Designer',
    icon: '🎨',
    color: 'pink',
    description: 'Design intuitive and beautiful user experiences',
    steps: [
      {
        phase: 'Phase 1 — Basics',
        topics: [
          { name: 'Design Principles', desc: 'Color, typography, layout', done: false },
          { name: 'Figma Basics', desc: 'Industry-standard design tool', done: false },
          { name: 'User Research', desc: 'Understand your users', done: false },
        ]
      },
      {
        phase: 'Phase 2 — Intermediate',
        topics: [
          { name: 'Wireframing', desc: 'Sketch layouts before building', done: false },
          { name: 'Prototyping', desc: 'Interactive mockups in Figma', done: false },
          { name: 'Accessibility (a11y)', desc: 'Design for everyone', done: false },
        ]
      },
      {
        phase: 'Phase 3 — Advanced',
        topics: [
          { name: 'Design Systems', desc: 'Build reusable component libraries', done: false },
          { name: 'Motion Design', desc: 'Animations and micro-interactions', done: false },
          { name: 'Usability Testing', desc: 'Validate your designs with users', done: false },
        ]
      }
    ]
  }
]