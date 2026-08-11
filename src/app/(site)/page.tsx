import type { Metadata } from 'next'
import Link from 'next/link'
import { getHomeContent, getAllServices } from '@/lib/content'

export const metadata: Metadata = {
  title: 'A. Coffee — Café Artesanal Brasileiro',
  description: 'Cafés especiais selecionados diretamente de pequenos produtores brasileiros. Torra artesanal semanal.',
}

const ICONS: Record<string, string> = {
  origin: '🌱',
  roast: '🔥',
  sustainability: '♻️',
}

export default function HomePage() {
  const home = getHomeContent()
  const services = getAllServices().filter(s => s.featured).slice(0, 3)

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        {/* Background decorativo */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 70% 40%, var(--color-gold) 0%, transparent 60%)',
          }}
        />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(170,134,75,0.2)', color: 'var(--color-gold)' }}
            >
              Torra Semanal Artesanal
            </span>

            {/* Título split */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-bold leading-none mb-6"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
            >
              {home.hero.title}
            </h1>
            <p
              className="text-xl md:text-2xl font-light mb-10 whitespace-pre-line leading-snug"
              style={{ color: 'rgba(244,239,230,0.75)' }}
            >
              {home.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={home.hero.ctaLink}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-md font-semibold text-base transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)' }}
              >
                {home.hero.ctaText}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-md font-semibold text-base transition-all hover:bg-white/10"
                style={{ color: 'var(--color-canvas)', border: '1.5px solid rgba(244,239,230,0.3)' }}
              >
                Nossa História
              </Link>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-canvas)', writingMode: 'vertical-rl' }}>
              Scroll
            </span>
            <div className="w-px h-12" style={{ backgroundColor: 'var(--color-canvas)' }} />
          </div>
        </div>
      </section>

      {/* ── Destaques ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
            >
              Por que A. Coffee?
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Cada detalhe do processo foi pensado para entregar a melhor xícara possível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.highlights.map((h, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border transition-shadow hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div
                  className="text-4xl mb-4 w-14 h-14 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                >
                  {ICONS[h.icon] ?? '☕'}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
                >
                  {h.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Produtos em Destaque ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-forest)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
              >
                Nossos Produtos
              </h2>
              <p style={{ color: 'rgba(244,239,230,0.6)' }}>
                Selecionados com rigor, torrados com cuidado.
              </p>
            </div>
            <Link
              href="/servicos"
              className="text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: 'var(--color-gold)' }}
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(service => (
              <Link
                key={service.slug}
                href={`/servicos`}
                className="group rounded-xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                {/* Imagem placeholder */}
                <div
                  className="h-48 flex items-center justify-center text-5xl"
                  style={{ backgroundColor: 'rgba(170,134,75,0.15)' }}
                >
                  ☕
                </div>
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.badges?.slice(0, 2).map(badge => (
                      <span
                        key={badge}
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: 'rgba(170,134,75,0.2)', color: 'var(--color-gold)' }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(244,239,230,0.6)' }}>
                    {service.shortDescription}
                  </p>
                  {/* Notas sensoriais */}
                  {service.sensoryNotes && service.sensoryNotes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.sensoryNotes.map(note => (
                        <span
                          key={note}
                          className="text-xs"
                          style={{ color: 'rgba(244,239,230,0.5)' }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg" style={{ color: 'var(--color-gold)' }}>
                      {service.price}
                    </span>
                    {service.priceUnit && (
                      <span className="text-xs" style={{ color: 'rgba(244,239,230,0.4)' }}>
                        {service.priceUnit}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sobre Preview ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Imagem placeholder */}
            <div
              className="rounded-2xl h-80 md:h-96 flex items-center justify-center text-6xl"
              style={{ backgroundColor: 'var(--color-border)' }}
            >
              🌿
            </div>
            {/* Texto */}
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-4 block"
                style={{ color: 'var(--color-gold)' }}
              >
                Nossa História
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
              >
                Paixão pelo café desde o primeiro grão
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                {home.aboutPreview.text}
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:gap-3"
                style={{ color: 'var(--color-forest)' }}
              >
                Conheça nossa história
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Depoimentos ── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: 'var(--color-espresso)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
            >
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.testimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} style={{ color: 'var(--color-gold)' }}>★</span>
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-6 italic"
                  style={{ color: 'rgba(244,239,230,0.7)' }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-canvas)' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(244,239,230,0.4)' }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section
        className="py-24 md:py-32 text-center"
        style={{ backgroundColor: 'var(--color-gold)' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
          >
            {home.cta.title}
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(25,22,20,0.7)' }}>
            {home.cta.subtitle}
          </p>
          <Link
            href={home.cta.buttonLink}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md font-bold text-base transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: 'var(--color-espresso)', color: 'var(--color-canvas)' }}
          >
            {home.cta.buttonText}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
