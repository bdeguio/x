export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Effective: May 1, 2025</p>

      <section className="mb-6">
        <p>
          This Privacy Policy explains how Arena (operated by ARENASTREET.COM LLC) collects, uses, and protects your data. By using our platform, you agree to the terms outlined below.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Data We Collect</h2>
        <p>
          When you create an account, we collect your email and phone number via Clerk. If you link financial accounts through Plaid, we collect and store relevant financial data securely using Supabase.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
        <p>
          Your data is used to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Display portfolio information</li>
          <li>Generate insights through AI tools</li>
          <li>Allow comparison and social features</li>
          <li>Improve the product experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell your data. We only share it with essential services like Supabase, Clerk, and Plaid to operate Arena. You control what accounts you link and what information is visible to others.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Data Storage</h2>
        <p>
          Your data is stored securely using encrypted databases through Supabase. We apply industry best practices to prevent unauthorized access.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies & Tracking</h2>
        <p>
          We may use basic cookies and analytics to monitor usage and improve Arena&apos;s functionality. You can disable cookies in your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You may request to access, update, or delete your personal data at any time by contacting us at <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. If changes are significant, we&apos;ll notify you via email or in-app notice.
        </p>
      </section>

      <section>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          For any questions or concerns, contact us at <a href="mailto:admin@arenastreet.com" className="text-purple-600 underline">admin@arenastreet.com</a>.
        </p>
      </section>
    </main>
  );
}
