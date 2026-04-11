import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating backend fetch or calling actual endpoint if server is running
    fetch('http://localhost:8080/api/hello')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        console.error("Backend not reachable yet", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center font-bold text-white">
                V
              </div>
              <span className="text-xl font-bold tracking-tight text-white px-2">
                Tech<span className="text-cyan-400 italic">Stack</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Settings</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
              Modern Fullstack <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Template v4.0
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Experience the power of React with Tailwind CSS v4 and Spring Boot. 
              Beautifully crafted for performance and developer experience.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-bold rounded-2xl shadow-xl shadow-cyan-500/20 transition-all transform hover:-translate-y-1 active:scale-95">
                Explore Components
              </button>
              <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 transition-all transform hover:-translate-y-1">
                Read Docs
              </button>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/30 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl text-cyan-400 font-bold">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Frontend</h3>
            <p className="text-slate-400 text-sm">React + Vite + Tailwind v4. Blazing fast startup and HMR.</p>
          </div>
          
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl text-blue-400 font-bold">🍃</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Backend</h3>
            <p className="text-slate-400 text-sm">Spring Boot 3.2. Robust, scalable, and secure enterprise backend.</p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/60 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl text-purple-400 font-bold">🔌</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Integration</h3>
            <div className="mt-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800 font-mono text-xs overflow-hidden">
               {loading ? (
                 <span className="text-slate-500 animate-pulse">Checking connection...</span>
               ) : data ? (
                 <span className="text-green-400">✅ {data.message}</span>
               ) : (
                 <span className="text-red-400">❌ Backend Offline (Run mvn spring-boot:run)</span>
               )}
            </div>
          </div>
        </div>

        {/* Feature Teaser */}
        <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to build something amazing?</h2>
              <p className="text-slate-400 max-w-md">The project is already initialized with a clean architecture. Start by editing the files in your IDE.</p>
            </div>
            <div className="flex space-x-3 bg-slate-900/50 p-2 rounded-2xl border border-slate-800/50">
              <div className="w-12 h-12 bg-cyan-400/10 flex items-center justify-center rounded-xl text-cyan-400 font-bold">R</div>
              <div className="w-12 h-12 bg-blue-400/10 flex items-center justify-center rounded-xl text-blue-400 font-bold">S</div>
              <div className="w-12 h-12 bg-purple-400/10 flex items-center justify-center rounded-xl text-purple-400 font-bold">T</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; 2026 TechStack Template. Powered by Gemini.
        </div>
      </footer>
    </div>
  )
}

export default App
