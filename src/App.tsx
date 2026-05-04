import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-purple-500/30">
      <div className="max-w-md w-full space-y-8 bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 cursor-default">
            Vite + Tailwind
          </h1>
          <p className="text-slate-400 font-medium tracking-wide"> Pure Tailwind v4 Setup </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="group relative px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Count is {count}</span>
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
          </button>

          <p className="text-xs text-slate-500 font-mono tracking-tighter opacity-60">
            Edit <code className="text-blue-400/80 decoration-blue-400/30 underline underline-offset-4">src/App.tsx</code> to test HMR
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
