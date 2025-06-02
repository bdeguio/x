import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen p-8 text-white bg-black flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Effective Date: [Insert Date]</p>

        <p className="mb-4">
          ARENASTREET.COM LLC ("we", "our", or "us") values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our platform, Arena ("the Service").
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Who We Are</h2>
        <p className="mb-4">
          This Service is operated by ARENASTREET.COM LLC, a U.S. limited liability company registered in New Mexico. Arena is a platform for tracking and socially comparing investment portfolios.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Account Info:</strong> When you sign up via Clerk, we collect your name, email, and phone number.</li>
          <li><strong>Financial Data (via Plaid):</strong> If you link accounts, we access balances, holdings, and transactions. We never store your credentials.</li>
          <li><strong>Usage Data:</strong> Includes pages visited, clicks, and device/browser info (anonymized).</li>
          <li><strong>Optional Profile Info:</strong> You may choose to share parts of your profile publicly.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. How We Use Your Information</h2>
        <p className="mb-4">
          We use data to provide Arena’s core features, show portfolio insights, improve the platform, prevent abuse, and send essential updates. We do not sell your data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Clerk (authentication)</li>
          <li>Supabase (data)</li>
          <li>Plaid (financial integration)</li>
          <li>Vercel (hosting)</li>
          <li><span className="text-red-400">XXXXXX</span> (payment processing — pending)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Sharing</h2>
        <p className="mb-4">
          Your data is not shared with advertisers or third parties, except as needed to operate the Service. Any public sharing is opt-in.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Security</h2>
        <p className="mb-4">
          We encrypt all data in transit and at rest. We follow best practices to protect user data but cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Your Rights</h2>
        <p className="mb-4">
          You may request account deletion, export your data, or revoke connected accounts at any time by contacting us.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Children’s Privacy</h2>
        <p className="mb-4">
          Arena is not intended for individuals under 18. We do not knowingly collect data from minors.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Changes</h2>
        <p className="mb-4">
          We may revise this policy. If significant changes are made, we’ll notify you via email or in-app notice.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact</h2>
        <p className="mb-8">
          For privacy concerns, reach us at <a href="mailto:admin@arenastreet.com" className="underline">admin@arenastreet.com</a>
        </p>

        <Link href="/" className="text-purple-400 hover:underline">&larr; Back to Home</Link>
      </div>
    </main>
  );
}
