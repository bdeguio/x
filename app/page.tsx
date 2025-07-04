export default function ArenaStreetHome() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16 font-sans">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
          ArenaStreet.com
        </h1>

        <p className="text-slate-300 text-lg">
          We’re a small team having fun building smart, helpful tools for modern professionals.  
          Right now we’re working on two projects — and loving every minute of it.
        </p>

        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 shadow">
            <h2 className="text-xl font-semibold text-blue-400">NOTAM.PRO ✈️</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Instantly receive FAA NOTAM summaries via text. Made for pilots, by pilots.
            </p>
            <a
              href="https://notam.pro"
              className="inline-block mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
            >
              Visit NOTAM.PRO
            </a>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 shadow">
            <h2 className="text-xl font-semibold text-cyan-400">Arena 📊</h2>
            <p className="text-slate-400 mt-2 text-sm">
              Our upcoming platform for collaborative investing and smarter trading decisions. Still in the lab — stay tuned!
            </p>
            <a
              href="#"
              className="inline-block mt-4 px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition"
            >
              Learn More
            </a>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-12">
          © {new Date().getFullYear()} ArenaStreet.com LLC · <a href="/privacy" className="underline text-white">Privacy Policy</a> · <a href="/terms" className="underline text-white">Terms of Use</a>
        </p>
      </div>
    </main>
  );
}
