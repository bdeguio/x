import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Effective Date: May 1, 2025</p>

      <section className="mb-6">
        <p>
          By using Arena (operated by ARENASTREET.COM LLC), you agree to these Terms of Service. If you do not agree, please do not use our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Use of the Service</h2>
        <p>
          Arena provides a way to track and compare user-linked investment data for informational purposes. You agree not to misuse the platform or access it using automated systems unless explicitly permitted.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
        <p>
          Arena is a dashboard platform that helps users organize and visualize their own portfolio data. It may also enable sharing this data with other users. Arena does not provide financial advice, trade execution, or investment recommendations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Account Registration</h2>
        <p>
          You must provide accurate contact information, including your email and phone number, through our authentication partner Clerk. You are responsible for maintaining the confidentiality of your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payments</h2>
        <p>
          Subscriptions are handled through our payment provider. Plans and prices are listed on our <Link href="/pricing" className="text-purple-600 underline">pricing</Link> page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Refund Policy</h2>
        <p>
          We offer a 7-day refund window for new Pro (Legend) subscriptions. To request a refund, email us at <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Prohibited Conduct</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Providing or implying financial advice through the platform</li>
          <li>Misrepresenting or impersonating another user’s profile or data</li>
          <li>Using bots or scraping tools without permission</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Data & Privacy</h2>
        <p>
          We do not sell your personal data. Your account and portfolio data is securely stored via Supabase and is only shared with your explicit consent. See our <Link href="/privacy" className="text-purple-600 underline">Privacy Policy</Link> for details.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Termination</h2>
        <p>
          We may suspend or terminate your access at any time if you violate these Terms. You may cancel your account at any time by contacting us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Disclaimers</h2>
        <p>
          Arena is provided “as is” without warranties of any kind. We do not guarantee accuracy, availability, or suitability for any particular purpose. Arena is not a financial advisor. Content, tools, and AI-generated insights are for informational purposes only and do not constitute financial advice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, we are not liable for any loss or damages related to your use of the platform, including financial decisions made based on the content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
        <p>
          These terms may be updated periodically. Continued use of Arena after changes constitutes acceptance of the new terms.
        </p>
      </section>

      <section>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          For questions, reach out to <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>
      <footer className="w-full mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col items-center gap-4">
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy</Link>
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

