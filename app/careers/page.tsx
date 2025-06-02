
export default function CareersPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Careers at Arena</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Help us reshape how people understand their portfolios and connect through investing. Arena is a fast-moving, early-stage startup backed by purpose — and built for scale.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Open Roles</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Frontend Engineer</strong> — Help us build smooth, secure, and beautiful user experiences with Next.js, Clerk, Supabase, and Tailwind.
          </li>
          <li>
            <strong>Backend Engineer</strong> — Design data pipelines, secure APIs, and performance-optimized infrastructure for financial data.
          </li>
          <li>
            <strong>AI/ML Developer</strong> — Train and integrate intelligent investment insights and reflections into user dashboards.
          </li>
          <li>
            <strong>Product Designer</strong> — Define how people interact with their financial world. Emphasis on clean UI, dark mode, and subtle visual storytelling.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Who We&apos;re Looking For</h2>
        <p>
          You&apos;re entrepreneurial, self-directed, and excited by the idea of building something people talk about. You move fast, care about product quality, and want your work to have leverage.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Why Join Arena</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Founding team access</li>
          <li>Fully remote and async culture</li>
          <li>Freedom to move fast and ship boldly</li>
          <li>Build in public and with a loyal user base</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">How to Apply</h2>
        <p>
          Email us at <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a> with your resume, portfolio, or just a note about why you&apos;d be a great fit.
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Include links to past work, GitHub, or anything else that shows your style.
        </p>
      </section>
    </main>
  );
}
