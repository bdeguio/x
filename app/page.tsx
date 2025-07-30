import Link from "next/link";

export default function ArenaStreetHome() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16 font-sans">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm">
          ArenaStreet.com
        </h1>

        <p className="text-gray-400 text-lg">
          We&apos;re a small team having fun building smart, helpful tools for modern professionals.  
          Right now we&apos;re working on two projects — and loving every minute of it.
        </p>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow">
            <h2 className="text-xl font-semibold text-white">NOTAM.PRO ✈️</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Instantly receive FAA NOTAM summaries via text. Made for pilots, by pilots.
            </p>
            <a
              href="https://notam.pro"
              className="inline-block mt-4 px-4 py-2 rounded bg-white hover:bg-gray-200 text-black text-sm font-medium transition"
            >
              Visit NOTAM.PRO
            </a>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 shadow">
            <h2 className="text-xl font-semibold text-white">Arena</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Our upcoming platform. Still in the lab — stay tuned!
            </p>
            <Link
              href="/sign-in"
              className="inline-block mt-4 px-4 py-2 rounded bg-white hover:bg-gray-200 text-black text-sm font-medium transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-12">
          © {new Date().getFullYear()} ArenaStreet.com LLC ·{" "}
          <Link href="/privacy" className="underline text-white">
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="underline text-white">
            Terms of Use
          </Link>
        </p>
      </div>
    </main>
  );
}
