import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
          Arena is free to use. Unlock deeper insights when you go Legend.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center bg-zinc-100 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold mb-2">Free</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Everything you need to get started.</p>
            <ul className="text-zinc-700 dark:text-zinc-300 text-sm mb-6 space-y-2 text-left w-full max-w-xs mx-auto">
              <li>✅ View other portfolios</li>
              <li>✅ No sign-up required — explore directly in your browser</li>
            </ul>
            <Link
              href="/sign-in"
              className="mt-auto inline-block bg-purple-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Legend Plan */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center bg-zinc-100 dark:bg-zinc-900 opacity-60">
            <h2 className="text-2xl font-semibold mb-2">
              Legend $10/mo <span className="text-sm text-zinc-500 dark:text-zinc-400">(Coming Soon)</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">For those who want more connection.</p>
            <ul className="text-zinc-700 dark:text-zinc-300 text-sm mb-6 space-y-2 text-left w-full max-w-xs mx-auto">
              <li>✅ Connect multiple financial accounts</li>
              <li>✅ Save and track favorite portfolios</li>
              <li>✅ AI-generated portfolio reflections (informational only)</li>
            </ul>
            <button
              disabled
              className="mt-auto inline-block bg-zinc-300 dark:bg-zinc-700 px-5 py-2 rounded-xl text-zinc-500 dark:text-zinc-400 font-semibold cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white transition">Terms</Link>
          <Link href="/about" className="hover:text-black dark:hover:text-white transition">About</Link>
          <Link href="/" className="hover:text-black dark:hover:text-white transition">Home</Link>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center">
          Arena is not a financial advisor. All features and insights are for informational purposes only.
        </p>
      </footer>
    </main>
  );
}
