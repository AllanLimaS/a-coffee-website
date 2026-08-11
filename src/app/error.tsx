'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <p
        className="text-6xl mb-4"
        style={{ color: 'var(--color-gold)' }}
      >
        ☕
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
      >
        Algo deu errado
      </h1>
      <p
        className="text-lg mb-8 max-w-md"
        style={{ color: 'var(--color-muted)' }}
      >
        Ocorreu um erro inesperado. Tente novamente ou volte mais tarde.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-forest)',
            color: 'var(--color-canvas)',
          }}
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all hover:opacity-90"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-forest)',
            border: '2px solid var(--color-forest)',
          }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
