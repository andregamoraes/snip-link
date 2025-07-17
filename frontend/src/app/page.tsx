'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to SnipLink </h1>
      <p className="text-lg mb-8 text-gray-600">
        Simplify your links in seconds.
      </p>
      <button
        onClick={() => router.push('/shorten')}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
      >
        Start shortening
      </button>
    </main>
  )
}
