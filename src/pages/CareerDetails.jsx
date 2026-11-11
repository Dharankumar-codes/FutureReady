// src/pages/CareerDetails.jsx
// Career Details page.
// Styles live in ./CareerDetails.css (all classes start with "cd-").


import { useState } from "react";
import "./CareerDetails.css";

const sampleCareer = {
  title: "Frontend Developer",
  category: "Web Development",
  tagline: "Build the interfaces millions of people use every day.",
  description:
    "Frontend developers turn designs into fast, accessible, and responsive web interfaces. They work closely with designers and backend engineers to deliver the parts of a product that users see and interact with.",
  quickFacts: [
    { label: "Avg. Starting Salary", value: "₹4 – 6 LPA" },
    { label: "Market Demand", value: "Very High" },
    { label: "Time to Job-Ready", value: "6 – 9 months" },
    { label: "Difficulty", value: "Beginner Friendly" },
    { label: "Work Mode", value: "Remote / Hybrid / Office" },
    { label: "Degree Required", value: "Not mandatory" },
  ],
  responsibilities: [
    "Convert UI/UX designs into clean, reusable components",
    "Make websites responsive across mobile, tablet, and desktop",
    "Integrate frontend with backend APIs",
    "Optimize page speed and performance",
    "Ensure accessibility and cross-browser compatibility",
    "Write and review code with the team using Git",
  ],
  dayInLife: [
    { time: "10:00 AM", task: "Daily stand-up meeting with the team" },
    { time: "10:30 AM", task: "Build new UI components for a feature" },
    { time: "01:00 PM", task: "Lunch break" },
    { time: "02:00 PM", task: "Connect the feature to backend APIs" },
    { time: "04:00 PM", task: "Code review and bug fixes" },
    { time: "05:30 PM", task: "Sync with designers on upcoming screens" },
  ],
  skills: [
    { name: "HTML & CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Git & GitHub", level: 70 },
    { name: "REST APIs", level: 65 },
    { name: "TypeScript", level: 50 },
  ],
  softSkills: ["Problem Solving", "Communication", "Attention to Detail", "Teamwork", "Time Management"],
  tools: ["VS Code", "Chrome DevTools", "Figma", "npm", "Vite", "Postman", "Tailwind CSS"],
  roadmap: [
    {
      phase: "Phase 1",
      title: "Web Fundamentals",
      duration: "4 – 6 weeks",
      topics: ["How the web works", "HTML5 semantics", "CSS basics", "Flexbox & Grid", "Responsive design"],
    },
    {
      phase: "Phase 2",
      title: "JavaScript Core",
      duration: "6 – 8 weeks",
      topics: ["Variables & data types", "Functions & scope", "Arrays & objects", "DOM manipulation", "Async JS & Fetch API"],
    },
    {
      phase: "Phase 3",
      title: "Tools & Version Control",
      duration: "2 weeks",
      topics: ["Git basics", "GitHub workflow", "npm packages", "Browser DevTools"],
    },
    {
      phase: "Phase 4",
      title: "React Framework",
      duration: "6 – 8 weeks",
      topics: ["Components & props", "State & hooks", "React Router", "Forms", "API integration"],
    },
    {
      phase: "Phase 5",
      title: "Projects & Job Prep",
      duration: "4 – 6 weeks",
      topics: ["Portfolio website", "3–4 real projects", "Resume & LinkedIn", "Interview practice"],
    },
  ],
  salary: [
    { level: "Fresher (0–1 yr)", range: "₹3 – 6 LPA" },
    { level: "Junior (1–3 yrs)", range: "₹6 – 10 LPA" },
    { level: "Mid-Level (3–5 yrs)", range: "₹10 – 18 LPA" },
    { level: "Senior (5+ yrs)", range: "₹18 – 35 LPA" },
  ],
  growthPath: ["Junior Developer", "Frontend Developer", "Senior Developer", "Tech Lead", "Engineering Manager"],
  projects: [
    { name: "Personal Portfolio", level: "Beginner" },
    { name: "Weather App with API", level: "Beginner" },
    { name: "E-commerce Product Page", level: "Intermediate" },
    { name: "Task Manager with React", level: "Intermediate" },
    { name: "Real-time Chat UI", level: "Advanced" },
  ],
  certifications: [
    "Meta Front-End Developer Certificate",
    "freeCodeCamp Responsive Web Design",
    "freeCodeCamp JavaScript Algorithms",
  ],
  resources: [
    { name: "MDN Web Docs", type: "Free" },
    { name: "freeCodeCamp", type: "Free" },
    { name: "React Official Docs", type: "Free" },
    { name: "JavaScript.info", type: "Free" },
    { name: "Udemy / Coursera courses", type: "Paid" },
  ],
  companies: ["TCS", "Infosys", "Zoho", "Freshworks", "Swiggy", "Razorpay", "Startups"],
  pros: ["High demand and many job openings", "Visible, creative work", "Good remote work options", "Low entry barrier"],
  cons: ["Technologies change quickly", "Need to keep learning constantly", "Cross-browser issues can be frustrating"],
  faqs: [
    {
      q: "Do I need a computer science degree?",
      a: "No. Many frontend developers are self-taught. A strong portfolio of projects matters more than a degree for most companies.",
    },
    {
      q: "Is frontend development a good career in 2026?",
      a: "Yes. Every business needs a web presence, and demand for skilled React developers remains strong in India and globally.",
    },
    {
      q: "How much math do I need?",
      a: "Very little. Basic logic and arithmetic are enough for most frontend work.",
    },
  ],
  relatedCareers: ["Backend Developer", "Full Stack Developer", "UI/UX Designer", "Mobile App Developer"],
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "roadmap", label: "Roadmap" },
  { id: "salary", label: "Salary & Growth" },
  { id: "projects", label: "Projects" },
  { id: "resources", label: "Resources" },
  { id: "faq", label: "FAQ" },
];

const CareerDetails = () => {
  const career = sampleCareer;
  const [openPhase, setOpenPhase] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="cd-page">
      {/* ---------- Hero ---------- */}
      <header className="cd-hero">
        <div className="cd-container">
          <nav className="cd-breadcrumb">
            <span onClick={() => window.history.back()}>Careers</span>
            <span className="cd-sep">/</span>
            <span>{career.category}</span>
            <span className="cd-sep">/</span>
            <span className="cd-current">{career.title}</span>
          </nav>

          <span className="cd-badge">{career.category}</span>
          <h1 className="cd-title">{career.title}</h1>
          <p className="cd-tagline">{career.tagline}</p>
          <p className="cd-desc">{career.description}</p>

          <div className="cd-hero-actions">
            <button className="cd-btn cd-btn-primary" onClick={() => scrollTo("roadmap")}>
              View Roadmap
            </button>
            <button className="cd-btn cd-btn-ghost">Save Career</button>
          </div>
        </div>
      </header>

      {/* ---------- Section tabs ---------- */}
      <div className="cd-tabs">
        <div className="cd-container cd-tabs-inner">
          {sections.map((s) => (
            <button key={s.id} className="cd-tab" onClick={() => scrollTo(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Main layout ---------- */}
      <div className="cd-container cd-layout">
        <main className="cd-main">
          {/* Overview */}
          <section id="overview" className="cd-card">
            <h2 className="cd-h2">What does a {career.title} do?</h2>
            <ul className="cd-check-list">
              {career.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h3 className="cd-h3">A Day in the Life</h3>
            <div className="cd-timeline">
              {career.dayInLife.map((d) => (
                <div key={d.time} className="cd-timeline-row">
                  <span className="cd-time">{d.time}</span>
                  <span className="cd-dot" />
                  <span className="cd-task">{d.task}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="cd-card">
            <h2 className="cd-h2">Skills Required</h2>
            <p className="cd-muted">Expected proficiency for an entry-level role.</p>
            <div className="cd-skill-list">
              {career.skills.map((s) => (
                <div key={s.name} className="cd-skill">
                  <div className="cd-skill-head">
                    <span>{s.name}</span>
                    <span className="cd-muted">{s.level}%</span>
                  </div>
                  <div className="cd-bar">
                    <div className="cd-bar-fill" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cd-two-col">
              <div>
                <h3 className="cd-h3">Soft Skills</h3>
                <div className="cd-tags">
                  {career.softSkills.map((s) => (
                    <span key={s} className="cd-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="cd-h3">Tools & Technologies</h3>
                <div className="cd-tags">
                  {career.tools.map((t) => (
                    <span key={t} className="cd-tag cd-tag-outline">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="cd-card">
            <h2 className="cd-h2">Learning Roadmap</h2>
            <p className="cd-muted">Click a phase to see its topics.</p>
            <div className="cd-phases">
              {career.roadmap.map((p, i) => {
                const isOpen = openPhase === i;
                return (
                  <div key={p.phase} className={`cd-phase ${isOpen ? "cd-phase-open" : ""}`}>
                    <button className="cd-phase-head" onClick={() => setOpenPhase(isOpen ? null : i)}>
                      <span className="cd-phase-num">{i + 1}</span>
                      <div className="cd-phase-text">
                        <span className="cd-phase-label">{p.phase}</span>
                        <span className="cd-phase-title">{p.title}</span>
                      </div>
                      <span className="cd-phase-duration">{p.duration}</span>
                      <span className="cd-chevron">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <ul className="cd-phase-topics">
                        {p.topics.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Salary & Growth */}
          <section id="salary" className="cd-card">
            <h2 className="cd-h2">Salary in India</h2>
            <table className="cd-table">
              <thead>
                <tr>
                  <th>Experience Level</th>
                  <th>Salary Range</th>
                </tr>
              </thead>
              <tbody>
                {career.salary.map((s) => (
                  <tr key={s.level}>
                    <td>{s.level}</td>
                    <td className="cd-strong">{s.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="cd-note">* Approximate figures. Actual salary varies by company, city, and skills.</p>

            <h3 className="cd-h3">Career Growth Path</h3>
            <div className="cd-growth">
              {career.growthPath.map((g, i) => (
                <div key={g} className="cd-growth-item">
                  <span className="cd-growth-step">{g}</span>
                  {i < career.growthPath.length - 1 && <span className="cd-arrow">→</span>}
                </div>
              ))}
            </div>

            <h3 className="cd-h3">Top Hiring Companies</h3>
            <div className="cd-tags">
              {career.companies.map((c) => (
                <span key={c} className="cd-tag cd-tag-outline">{c}</span>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="cd-card">
            <h2 className="cd-h2">Projects to Build</h2>
            <div className="cd-project-grid">
              {career.projects.map((p) => (
                <div key={p.name} className="cd-project">
                  <span className={`cd-level cd-level-${p.level.toLowerCase()}`}>{p.level}</span>
                  <span className="cd-project-name">{p.name}</span>
                </div>
              ))}
            </div>

            <div className="cd-two-col">
              <div className="cd-pros">
                <h3 className="cd-h3">Pros</h3>
                <ul>
                  {career.pros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="cd-cons">
                <h3 className="cd-h3">Challenges</h3>
                <ul>
                  {career.cons.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section id="resources" className="cd-card">
            <h2 className="cd-h2">Learning Resources</h2>
            <div className="cd-resource-list">
              {career.resources.map((r) => (
                <div key={r.name} className="cd-resource">
                  <span>{r.name}</span>
                  <span className={`cd-pill ${r.type === "Free" ? "cd-pill-free" : "cd-pill-paid"}`}>{r.type}</span>
                </div>
              ))}
            </div>

            <h3 className="cd-h3">Recommended Certifications</h3>
            <ul className="cd-check-list">
              {career.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="cd-card">
            <h2 className="cd-h2">Frequently Asked Questions</h2>
            {career.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="cd-faq">
                  <button className="cd-faq-q" onClick={() => setOpenFaq(isOpen ? null : i)}>
                    <span>{f.q}</span>
                    <span className="cd-chevron">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p className="cd-faq-a">{f.a}</p>}
                </div>
              );
            })}
          </section>
        </main>

        {/* ---------- Sidebar ---------- */}
        <aside className="cd-sidebar">
          <div className="cd-card cd-sticky">
            <h3 className="cd-h3 cd-mt0">Quick Facts</h3>
            <dl className="cd-facts">
              {career.quickFacts.map((f) => (
                <div key={f.label} className="cd-fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <button className="cd-btn cd-btn-primary cd-full" onClick={() => scrollTo("roadmap")}>
              Start This Roadmap
            </button>
            <button className="cd-btn cd-btn-outline cd-full">Take Career Quiz</button>

            <h3 className="cd-h3">Related Careers</h3>
            <ul className="cd-related">
              {career.relatedCareers.map((r) => (
                <li key={r}>{r} →</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CareerDetails;