import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
      {/* ── Marquee Ticker Banner ── */}
      <div
        className="overflow-hidden whitespace-nowrap py-3 border-b border-white/10"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="inline-flex gap-8 items-center animate-marquee font-[family-name:var(--font-display)] text-sm tracking-wide text-[var(--color-canvas)]">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="inline-flex items-center gap-6 shrink-0">
              <span className="font-semibold tracking-widest uppercase">A. Coffee Roasters</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              <span>Torra Semanal Artesanal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              <span>100% Grãos Arábica Selecionados</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              <span>Microlotes Especiais do Brasil</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero (Split Layout) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Coluna Esquerda: Bloco de Conteúdo Sólido */}
          <div
            className="lg:col-span-7 rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-2xl"
            style={{ backgroundColor: 'var(--color-forest)' }}
          >
            {/* Ambient light glow */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none blur-3xl"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />

            <div>
              {/* Tag com linha decorativa */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[var(--color-gold)]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                  Specialty Roastery • Edição 2026
                </span>
              </div>

              {/* Título de alto impacto com Playfair Display */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-[var(--color-canvas)] font-[family-name:var(--font-display)]"
              >
                {home.hero.title}
              </h1>

              {/* Subtítulo */}
              <p
                className="text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl mb-10 text-[rgba(244,239,230,0.8)] font-[family-name:var(--font-sans)]"
              >
                {home.hero.subtitle}
              </p>
            </div>

            <div>
              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href={home.hero.ctaLink}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                  style={{ backgroundColor: 'var(--color-gold)', color: '#FFFFFF' }}
                >
                  {home.hero.ctaText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all border border-[rgba(244,239,230,0.3)] text-[var(--color-canvas)] hover:bg-white/10 hover:border-[var(--color-canvas)]"
                >
                  Nossa História
                </Link>
              </div>

              {/* Micro badge no rodapé do bloco */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[rgba(244,239,230,0.5)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Torrefação Própria</span>
                </div>
                <span>•</span>
                <span>Altitude 1.100m+</span>
                <span>•</span>
                <span>SCA 86+ Pontos</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Bloco Fotográfico com Card Flutuante */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] shadow-2xl border border-[var(--color-border)] group">
            {/* Foto principal (CMS ou fallback do showroom) */}
            <Image
              src={home.hero.backgroundImage || '/images/hero.jpg'}
              alt={home.hero.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
            />

            {/* Gradiente escuro no rodapé da imagem para leitura */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Badge flutuante Glassmorphism */}
            <div
              className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 rounded-2xl border border-white/15 backdrop-blur-md shadow-2xl"
              style={{ backgroundColor: 'rgba(25, 22, 20, 0.85)' }}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3
                  className="text-lg font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)]"
                >
                  Showroom & Torrefação
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Ao Vivo
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[rgba(244,239,230,0.7)] leading-relaxed">
                Visite nossa flagship em São Paulo e acompanhe a curva de torra artesanal de perto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Ribbon (Métricas de Destaque) ── */}
      <section
        className="border-y border-[var(--color-border)] py-8 md:py-10 shadow-sm"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]/60">
            <div className="pt-4 sm:pt-0">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1 text-[var(--color-espresso)] font-[family-name:var(--font-display)]"
              >
                100%
              </div>
              <div className="text-xs sm:text-sm font-medium text-[var(--color-muted)]">
                Grãos Arábica de Origem
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div
                className="text-3xl sm:text-4xl font-bold mb-1 font-[family-name:var(--font-display)] text-[var(--color-gold)]"
              >
                86+
              </div>
              <div className="text-xs sm:text-sm font-medium text-[var(--color-muted)]">
                Pontuação Especialidade SCA
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div
                className="text-2xl sm:text-3xl font-bold mb-1 text-[var(--color-espresso)] font-[family-name:var(--font-display)]"
              >
                Small Batch
              </div>
              <div className="text-xs sm:text-sm font-medium text-[var(--color-muted)]">
                Torra Semanal Artesanal
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <div
                className="text-2xl sm:text-3xl font-bold mb-1 text-[var(--color-espresso)] font-[family-name:var(--font-display)]"
              >
                Direct Trade
              </div>
              <div className="text-xs sm:text-sm font-medium text-[var(--color-muted)]">
                Comércio Justo com Fazendas
              </div>
            </div>
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
            {/* Imagem */}
            <div className="relative rounded-2xl h-80 md:h-96 overflow-hidden shadow-lg border border-[var(--color-border)]">
              {home.aboutPreview.image ? (
                <Image
                  src={home.aboutPreview.image}
                  alt="Sobre A. Coffee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-[var(--color-border)]">
                  🌿
                </div>
              )}
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
