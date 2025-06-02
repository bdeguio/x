import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Effective: May 1, 2025</p>

      <section className="mb-6">
        <p>
          By using Arena (operated by ARENASTREET.COM LLC), you agree to these Terms of Service. If you do not agree, please do not use our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Use of the Service</h2>
        <p>
          Arena provides a way to track, link, and compare financial portfolios. You agree not to misuse the platform or access it using automated systems unless explicitly permitted.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Account Registration</h2>
        <p>
          You must provide accurate contact information, including your email and phone number, through our authentication partner Clerk. You are responsible for maintaining the confidentiality of your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Payments</h2>
        <p>
          Subscriptions are handled through our payment provider. Plans and prices are listed on our <Link href="/pricing" className="text-purple-600 underline">pricing</Link> page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Refund Policy</h2>
        <p>
          We offer a 7-day refund window for new Pro (Legend) subscriptions. To request a refund, email us at <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Disclaimers</h2>
        <p>
          Arena is not a financial advisor. Content, tools, and AI-generated insights are for informational purposes only and do not constitute financial advice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Data & Privacy</h2>
        <p>
          We do not sell your personal data. Your financial data is securely stored via Supabase and shared only with your consent. See our <Link href="/privacy" className="text-purple-600 underline">Privacy Policy</Link> for details.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
        <p>
          These terms may be updated periodically. Continued use of Arena after changes constitutes acceptance of the new terms.
        </p>
      </section>

      <section>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          For questions, reach out to <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>
    </main>
  );
}
