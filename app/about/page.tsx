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
          Today, investing is either overly private or overly loud. Arena sits in the middle — a quiet signal where real portfolios are shared (anonymously or not), trends are visible, and insights emerge from behavior, not hype.
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
          <li>AI-powered insights to help you reflect on your portfolio</li>
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

      <section>
        <h2 className="text-xl font-semibold mb-2">Who&apos;s Building Arena</h2>
        <p>
          Arena is built by a small team that believes the most interesting financial questions aren&apos;t just quantitative — they&apos;re social, behavioral, and personal. If you&apos;re one of those people who likes to look behind the curtain and think for yourself, you&apos;ll probably like it here.
        </p>
      </section>
    </main>
  );
}
