import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen justify-between min-h-screen p-8 bg-white text-black dark:bg-black dark:text-white transition-colors">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center p-48 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Arena 👋</h1>
        <p className="mb-4 text-lg">Track and compare your portfolio with others.</p>

        <Link
          href="/sign-in"
          className="inline-block rounded-2xl bg-purple-600 px-6 py-3 text-white text-lg font-semibold hover:bg-purple-700 transition"
        >
          Sign In
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="w-full border-t border-gray-100 dark:border-gray-800 text-center pt-4 text-xs text-gray-400 dark:text-gray-500">
        <div className="max-w-4xl mx-auto space-y-1">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/careers" className="hover:underline">Careers</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </div>
          <p>© 2025 ARENASTREET.COM LLC · Arena is not a financial advisor.</p>
          <p>Built with Supabase, Plaid, Vercel, and OpenAI.</p>
        </div>
      </footer>
    </main>
  );
}
