import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import {
  Code2,
  Users,
  BriefcaseBusiness,
  ArrowRight,
  Search,
  Code,
} from 'lucide-react'

function App() {
  const [backendStatus, setBackendStatus] = useState(
    'Checking backend...',
  )

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Backend request failed')
        }

        return response.json()
      })
      .then((result) => {
        setBackendStatus(result.message)
      })
      .catch(() => {
        setBackendStatus('Backend connection failed')
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Code2 className="text-indigo-400" />
          DevConnect
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-300 hover:text-white"
          >
            Home
          </Link>

          <a
            href="#features"
            className="text-slate-300 hover:text-white"
          >
            Features
          </a>

          <Link
            to="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 hover:bg-indigo-500"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-8 py-24 text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          <Code2 size={16} />
          Built for developers, by developers
        </div>

        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          Connect. Build.
          <span className="block text-indigo-400">
            Grow Together.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Discover developers, showcase your projects, share technical
          knowledge, and build meaningful connections in one place.
        </p>

        {/* Backend Connection Status */}
        <div className="mt-6 inline-block rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm">
          Backend Status:{' '}
          <span
            className={
              backendStatus === 'DevConnect backend is healthy'
                ? 'text-green-400'
                : 'text-indigo-400'
            }
          >
            {backendStatus}
          </span>
        </div>

        {/* Hero Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
          >
            Join DevConnect
            <ArrowRight size={18} />
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 hover:bg-slate-800"
          >
            <Code size={18} />
            Explore GitHub
          </a>

        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-8 pb-24"
      >

        <h2 className="mb-12 text-center text-3xl font-bold">
          Everything developers need
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <FeatureCard
            icon={<Users size={28} />}
            title="Developer Network"
            description="Discover developers, connect with talented people, and grow your professional network."
          />

          <FeatureCard
            icon={<BriefcaseBusiness size={28} />}
            title="Project Showcase"
            description="Showcase your projects, technologies, GitHub repositories, and live applications."
          />

          <FeatureCard
            icon={<Search size={28} />}
            title="Discover & Learn"
            description="Explore developer profiles, technical blogs, and new technologies."
          />

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-6 text-center text-slate-500">
        © 2026 DevConnect. Built for the developer community.
      </footer>

    </div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500">

      <div className="mb-4 text-indigo-400">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-semibold">
        {title}
      </h3>

      <p className="leading-relaxed text-slate-400">
        {description}
      </p>

    </div>
  )
}

export default App