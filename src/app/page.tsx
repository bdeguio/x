import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Arena 👋</h1>
      <p className="mb-4 text-lg">Track and compare your portfolio with others.</p>
      <Link href="/sign-in" className="text-blue-600 underline text-lg">
        Sign In
      </Link>
    </main>
  );
}
