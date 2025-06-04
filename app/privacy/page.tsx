import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Effective: May 1, 2025</p>

      <section className="mb-6">
        <p>
          This Privacy Policy explains how Arena (operated by ARENASTREET.COM LLC) collects, uses, and protects your information. By using Arena, you agree to the terms outlined below.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Account Info:</strong> Your email and phone number, collected via Clerk during sign-up.</li>
          <li><strong>Linked Account Data:</strong> If you connect financial accounts via Plaid, we collect and store relevant portfolio data (e.g., balances, holdings) using Supabase. We never store your login credentials.</li>
          <li><strong>Usage Data:</strong> We may collect anonymized data such as pages visited, features used, and device/browser metadata.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Display your portfolio data and linked accounts</li>
          <li>Generate AI-powered portfolio reflections</li>
          <li>Enable comparison and social features</li>
          <li>Improve Arena’s performance and functionality</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell your personal information. Data is shared only with essential third-party services that help operate Arena:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Clerk (authentication)</li>
          <li>Supabase (database storage)</li>
          <li>Plaid (account aggregation)</li>
        </ul>
        <p className="mt-2">
          You control which accounts you connect and what data is made visible to others.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p>
          Your data is encrypted in transit and at rest using Supabase. We apply modern best practices including role-based access control and logging to prevent unauthorized access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking</h2>
        <p>
          Arena may use cookies or analytics tools to monitor usage and improve functionality. You may disable cookies in your browser, though some features may be affected.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You may request to access, update, export, or delete your personal data at any time. Contact us at{" "}
          <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If changes are significant, we’ll notify you via email or in-app notice.
        </p>
      </section>

      <section>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          For any questions or concerns, contact us at{" "}
          <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>
      <footer className="w-full mt-16 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-500 flex flex-col items-center gap-4">
        <div className="flex gap-6">
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
