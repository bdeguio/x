import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Arena</h1>
      <p className="mb-4 text-lg">This is your homepage.</p>
      <Link href="/holdings" className="text-blue-600 underline text-lg">
        Go to Holdings
      </Link>
    </main>
  );
}