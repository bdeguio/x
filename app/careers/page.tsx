import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Careers at Arena</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        We’re reimagining how people understand and connect through investing — and we need bold builders to help lead the charge. Arena is a fast-moving, early-stage startup backed by purpose — and built for scale.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Open Roles</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Frontend Engineer</strong> — Craft responsive, secure, and elegant UIs using Next.js, Clerk, Supabase, and Tailwind.
          </li>
          <li>
            <strong>Backend Engineer</strong> — Design performant APIs, secure data flows, and infrastructure to support real-time financial dashboards.
          </li>
          <li>
            <strong>AI/ML Developer</strong> — Build intelligent portfolio insights and reflections that help users see their behavior more clearly.
          </li>
          <li>
            <strong>Product Designer</strong> — Shape how people interact with their financial world. Prioritize clarity, emotional resonance, and subtle visual storytelling.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Who We&apos;re Looking For</h2>
        <p>
          You&apos;re entrepreneurial, self-directed, and excited by the idea of building something people talk about. You move fast, care deeply about product quality, and want your work to have leverage.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Why Join Arena</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Founding team access</li>
          <li>Fully remote and async culture</li>
          <li>Freedom to move fast and ship boldly</li>
          <li>Build in public and with a loyal user base</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">How to Apply</h2>
        <p>
          Excited? Send a note, resume, or project link to{" "}
          <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">
            admin@arenastreet.com
          </a>. Bonus points for GitHub, demos, or something weird that shows you care.
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Include links to past work, GitHub, or anything else that shows your style.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
          Don’t see your role? Reach out anyway. We’re always looking for sharp minds.
        </p>
      </section>
      <footer className="w-full mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy</Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white transition">Terms</Link>
          <Link href="/about" className="hover:text-black dark:hover:text-white transition">About</Link>
        </div>
        <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center">
          Arena is not a financial advisor. All features and insights are for informational purposes only.
        </p>
      </footer>
    </main>
  );
}
