import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="min-h-screen p-8 text-white bg-black flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-6">Join Us</h1>
        <p className="mb-4 text-lg">
          Arena is building the next-generation platform for tracking and comparing investment portfolios. We're rethinking transparency, social finance, and the power of collective insight. We’re early — and we’re looking for ambitious people to help shape the future.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">We're Currently Looking For:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Full-Stack Developer (Next.js, Supabase, Clerk, Plaid)</li>
          <li>Product Designer (UX/UI, minimal design, fast iteration)</li>
          <li>Growth Hacker (SEO, product-led growth, analytics)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">What We're About</h2>
        <p className="mb-4">
          Arena is not a job — it's a bet on yourself. We value:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Initiative over credentials</li>
          <li>Trust and ownership</li>
          <li>Clarity, not fluff</li>
          <li>Signal over noise</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Remote-First. Builder-Driven.</h2>
        <p className="mb-6">
          We’re based in the U.S. but operate remotely. We move fast, respect deep work, and believe the best ideas win.
        </p>

        <h2 className="text-xl font-semibold mb-2">Interested?</h2>
        <p className="mb-8">
          Send us a short note, portfolio, or project you're proud of to{" "}
          <a href="mailto:admin@arenastreet.com" className="underline">
            admin@arenastreet.com
          </a>
          . Tell us why Arena, and how you can help.
        </p>

        <Link href="/" className="text-purple-400 hover:underline">&larr; Back to Home</Link>
      </div>
    </main>
  );
}
