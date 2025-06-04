import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">About Arena</h1>

      <section className="mb-6">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Arena is a platform for tracking, comparing, and exploring portfolios in a more transparent and social way. We help people see how others invest — not to copy, but to understand and reflect.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Why We Exist</h2>
        <p>
          Investing today often feels either isolating or performative. Arena creates a space in between — a trusted environment where friends, families, and thoughtful investors can share real portfolios, learn from each other, and spark meaningful conversations without the noise.
        </p>
        <p className="mt-2">
          Our goal isn&apos;t to tell you what to buy. It&apos;s to show you how others are actually positioned — and give you the tools to reflect on your own thinking.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">What Arena Is</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>A private dashboard to track your investment accounts</li>
          <li>Social discovery: follow, compare, and observe portfolios</li>
          <li>Holdings are ranked by percentage of portfolio — largest positions first</li>
          <li>AI-generated portfolio reflections (informational only)</li>
          <li>Built for people who want to think clearly, not chase noise</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">What Arena Is Not</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not provide financial advice or recommendations</li>
          <li>We don&apos;t execute trades or handle your money</li>
          <li>We don&apos;t predict the market or tell you what to do</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Plans &amp; Pricing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Free:</strong> View public portfolios and compare in-browser
          </li>
          <li>
            <strong>Legend ($10/mo):</strong> Connect multiple accounts, follow unlimited profiles, and access AI-generated portfolio reflections (coming soon)
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Security &amp; Privacy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account linking is handled securely via Plaid</li>
          <li>We never have access to your login credentials</li>
          <li>All data is stored in Supabase with strict role-based access control</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Who&apos;s Building Arena</h2>
        <p>
          Arena is built by a small team that believes the most interesting financial questions aren&apos;t just quantitative — they&apos;re social, behavioral, and personal. If you&apos;re one of those people who likes to look behind the curtain and think for yourself, you&apos;ll probably like it here.
        </p>
      </section>
      <footer className="w-full mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white transition">Terms</Link>
          <Link href="/" className="hover:text-black dark:hover:text-white transition">Home</Link>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center">
          Arena is not a financial advisor. All features and insights are for informational purposes only.
        </p>
      </footer>
    </main>
  );
}
