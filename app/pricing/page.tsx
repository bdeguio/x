import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-lg text-zinc-400 mb-12">
          Arena is free to use. Unlock deeper insights when you go Legend.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="border border-zinc-800 rounded-2xl p-6 flex flex-col items-center bg-zinc-900">
            <h2 className="text-2xl font-semibold mb-2">Free</h2>
            <p className="text-zinc-400 mb-4">Everything you need to get started.</p>
            <ul className="text-zinc-300 text-sm mb-6 space-y-2 text-left w-full max-w-xs mx-auto">
              <li>✅ Link 1 account</li>
              <li>✅ View other portfolios</li>
              <li>✅ Compare holdings</li>
            </ul>
            <Link
              href="/sign-in"
              className="mt-auto inline-block bg-purple-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-purple-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Legend Plan */}
          <div className="border border-zinc-800 rounded-2xl p-6 flex flex-col items-center bg-zinc-900 opacity-60">
            <h2 className="text-2xl font-semibold mb-2">
              Legend <span className="text-sm text-zinc-400">(Coming Soon)</span>
            </h2>
            <p className="text-zinc-400 mb-4">For those who want the edge.</p>
            <ul className="text-zinc-300 text-sm mb-6 space-y-2 text-left w-full max-w-xs mx-auto">
              <li>🔥 Unlimited account links</li>
              <li>🧠 AI-generated portfolio reflections</li>
              <li>📋 Curated follow lists</li>
              <li>🚀 Early access to new features</li>
            </ul>
            <button
              disabled
              className="mt-auto inline-block bg-zinc-700 px-5 py-2 rounded-xl text-zinc-400 font-semibold cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      <footer className="w-full mt-16 pt-6 border-t border-zinc-800 text-sm text-zinc-500 flex justify-center gap-6">
        <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
        <Link href="/terms" className="hover:text-white transition">Terms</Link>
        <Link href="/careers" className="hover:text-white transition">Careers</Link>
      </footer>
    </main>
  );
}
