import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Arena 👋</h1>
      <p className="mb-4 text-lg">Track and compare your portfolio with others.</p>

      <Link
        href="/sign-in"
        className="inline-block rounded-2xl bg-purple-600 px-6 py-3 text-white text-lg font-semibold hover:bg-purple-700 transition"
      >
        Sign In
      </Link>
    </main>
  );
}
