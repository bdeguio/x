import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen p-8 text-white bg-black flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">Effective Date: May 1, 2025</p>

        <p className="mb-4">
          These Terms and Conditions ("Terms") govern your access to and use of Arena, a service operated by ARENASTREET.COM LLC, a New Mexico limited liability company ("we", "us", or "our").
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Arena, you agree to these Terms and our Privacy Policy. If you do not agree, you must not use the service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Description of Service</h2>
        <p className="mb-4">
          Arena is a dashboard platform for tracking, comparing, and optionally sharing investment portfolios. Arena does not offer financial advice, execute trades, or provide investment recommendations.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. User Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years old and legally capable of entering into binding contracts to use Arena.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Account and Usage</h2>
        <p className="mb-4">
          You agree to provide accurate information and to use Arena only for lawful purposes. You are responsible for any activity conducted under your account.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Prohibited Conduct</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Providing or implying financial advice through the platform</li>
          <li>Misrepresenting or impersonating another user’s profile or data</li>
          <li>Using bots or scraping tools without permission</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Data and Privacy</h2>
        <p className="mb-4">
          Your use of Arena is also governed by our <Link href="/privacy-policy" className="underline text-purple-400">Privacy Policy</Link>. We take data privacy seriously and limit third-party access to essential service functions only.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Intellectual Property</h2>
        <p className="mb-4">
          All content, branding, software, and systems are the property of ARENASTREET.COM LLC or its licensors. You may not copy, distribute, or reverse-engineer any part of the platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Termination</h2>
        <p className="mb-4">
          We may suspend or terminate your access at any time if you violate these Terms. You may cancel your account at any time by contacting us.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Disclaimers</h2>
        <p className="mb-4">
          Arena is provided “as is” without warranties of any kind. We do not guarantee accuracy, availability, or suitability for any particular purpose.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, we are not liable for any loss or damages related to your use of the platform, including financial decisions made based on the content.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">11. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of the State of New Mexico, United States.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">12. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms at any time. Continued use of the platform constitutes your acceptance of any revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">13. Contact</h2>
        <p className="mb-8">
          Questions? Reach us at <a href="mailto:admin@arenastreet.com" className="underline">admin@arenastreet.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">14. Refund Policy</h2>
        <p className="mb-4">
            Arena offers a 7-day refund window for new Pro (Legend) subscriptions. If you're unsatisfied with the service, contact us at{" "}
            <a href="mailto:admin@arenastreet.com" className="underline">admin@arenastreet.com</a> within 7 days of your initial payment.
        </p>
        <p className="mb-4">
            After 7 days, all payments are non-refundable. We reserve the right to deny refund requests if we detect abuse or misuse of the platform.
        </p>
        <p className="mb-4">
            Refunds do not apply to renewals, upgrades, or purchases made through third-party app stores or platforms.
        </p>

        <Link href="/" className="text-purple-400 hover:underline">&larr; Back to Home</Link>
      </div>
    </main>
  );
}
