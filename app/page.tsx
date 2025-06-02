import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-8 bg-black text-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold mb-4">Welcome to Arena 👋</h1>
        <p className="mb-4 text-lg">Track and compare your portfolio with others.</p>

        <Link
          href="/sign-in"
          className="inline-block rounded-2xl bg-purple-600 px-6 py-3 text-white text-lg font-semibold hover:bg-purple-700 transition"
        >
          Sign In
        </Link>
      </div>

      {/* Footer */}
      <footer className="w-full mt-12 pt-6 border-t border-zinc-800 text-sm text-zinc-500 flex justify-center gap-6">
        <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
        <Link href="/terms" className="hover:text-white transition">Terms</Link>
        <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        <Link href="/careers" className="hover:text-white transition">Careers</Link>
        <span className="text-zinc-600">&copy; {new Date().getFullYear()} ARENASTREET.COM LLC</span>
      </footer>
    </main>
  );
}
