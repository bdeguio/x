export default function ArenaStreetLanding() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16 font-sans">
      <div className="text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
          Welcome to ArenaStreet
        </h1>

        <p className="text-slate-400 text-lg">
          Which product are you looking for?
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="https://arenastreet.com/arena"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-lg font-medium transition shadow"
          >
            Arena
          </a>
          <a
            href="https://notam.pro"
            className="inline-block px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-lg font-medium transition shadow"
          >
            NOTAM.PRO
          </a>
        </div>

        <p className="text-xs text-slate-500 mt-10">
          ArenaStreet.com LLC · <a href="/privacy" className="underline text-white">Privacy</a> · <a href="/terms" className="underline text-white">Terms</a>
        </p>
      </div>
    </main>
  );
}
