import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: 'var(--color-canvas)' }}
    >
      <p
        className="text-8xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold)' }}
      >
        404
      </p>
      <h1
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
      >
        Página não encontrada
      </h1>
      <p
        className="text-lg mb-8 max-w-md"
        style={{ color: 'var(--color-muted)' }}
      >
        Parece que esse grão se perdeu no caminho. Volte para a página inicial e continue explorando.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all hover:opacity-90"
        style={{
          backgroundColor: 'var(--color-forest)',
          color: 'var(--color-canvas)',
        }}
      >
        ← Voltar ao início
      </Link>
    </div>
  )
}
