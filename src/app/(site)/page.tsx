import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHomeContent, getAllServices } from '@/lib/content'
import FeaturedProducts from '@/components/site/FeaturedProducts'

export const metadata: Metadata = {
  title: 'A. Coffee — Café Artesanal Brasileiro',
  description: 'Cafés especiais selecionados diretamente de pequenos produtores brasileiros. Torra artesanal semanal.',
}


export default function HomePage() {
  const home = getHomeContent()
  const services = getAllServices().filter(s => s.featured).slice(0, 3)

  return (
    <>
      {/* ── Split Hero Layout (Full Screen Edge-to-Edge 100vh) ── */}
      <section
        className="relative w-full min-h-screen lg:min-h-0 lg:h-screen lg:max-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        {/* Coluna Esquerda: Conteúdo & Editorial */}
        <div
          className="lg:col-span-7 relative z-10 flex flex-col justify-between px-6 sm:px-12 lg:px-12 xl:px-16 pt-20 sm:pt-24 lg:pt-24 pb-6 sm:pb-8 lg:pb-6 overflow-hidden"
          style={{ backgroundColor: 'var(--color-forest)' }}
        >
          {/* Ambient light glow */}
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none blur-3xl"
            style={{ backgroundColor: 'var(--color-gold)' }}
          />
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }}
          />

          <div className="relative z-10 my-auto py-2">
            {/* Tag com linha decorativa */}
            <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
              <span className="w-6 h-[2px] bg-[var(--color-gold)]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                Specialty Roastery • Edição 2026
              </span>
            </div>

            {/* Título de alto impacto calibrado para 100vh em desktop */}
            <h1
              className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-[1.08] tracking-tight mb-3 sm:mb-4 text-[var(--color-canvas)] font-[family-name:var(--font-display)] max-w-xl"
            >
              {home.hero.title}
            </h1>

            {/* Subtítulo */}
            <p
              className="text-sm sm:text-base lg:text-base font-light leading-relaxed max-w-lg mb-5 sm:mb-6 text-[rgba(244,239,230,0.85)] font-[family-name:var(--font-sans)]"
            >
              {home.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 items-center">
              <Link
                href={home.hero.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                style={{ backgroundColor: 'var(--color-gold)', color: '#FFFFFF' }}
              >
                {home.hero.ctaText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all border border-[rgba(244,239,230,0.35)] text-[var(--color-canvas)] hover:bg-white/10 hover:border-[var(--color-canvas)]"
              >
                Nossa História
              </Link>
            </div>
          </div>

          {/* Micro badge no rodapé do bloco */}
          <div className="relative z-10 mt-4 lg:mt-auto pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[rgba(244,239,230,0.6)]">
            <span className="font-medium">Torrefação Artesanal Própria</span>
            <span>•</span>
            <span className="font-medium">Altitude 1.100m+</span>
            <span>•</span>
            <span className="font-medium">SCA 86+ Pontos</span>
          </div>
        </div>

        {/* Coluna Direita: Bloco de Vídeo / Fotográfico Editorial (Full Height) */}
        <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-0 lg:h-full overflow-hidden group bg-[#191614]">
          {home.hero.backgroundVideo ? (
            <video
              src={home.hero.backgroundVideo}
              poster={home.hero.backgroundImage || '/images/hero.jpg'}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <Image
              src={home.hero.backgroundImage || '/images/hero.jpg'}
              alt={home.hero.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          )}

          {/* Gradiente escuro no rodapé para legibilidade do card */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Badge flutuante Glassmorphism */}
          <div
            className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 p-5 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl"
            style={{ backgroundColor: 'rgba(25, 22, 20, 0.85)' }}
          >
            <h3
              className="text-lg sm:text-xl font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)] mb-1.5"
            >
              Showroom & Torrefação
            </h3>
            <p className="text-xs sm:text-sm text-[rgba(244,239,230,0.75)] leading-relaxed">
              Visite nossa flagship e acompanhe a curva de torra artesanal dos microlotes de perto.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pilares & Filosofia (Destaques Redesenhados) ── */}
      <section className="py-24 md:py-36 border-t border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Editorial */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 pb-8 border-b border-[var(--color-border)]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1.5px] bg-[var(--color-gold)]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                  Nossos Pilares & Filosofia
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[var(--color-espresso)] font-[family-name:var(--font-display)]"
              >
                Da origem à xícara, <span className="italic font-normal text-[var(--color-gold)]">nenhum detalhe</span> é por acaso.
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[var(--color-muted)] max-w-md font-light leading-relaxed">
              Combinamos o rigor técnico da torrefação de especialidade com o compromisso ético do comércio direto com os produtores.
            </p>
          </div>

          {/* Grid de Pilares com Design Editorial Contemporâneo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Card 1 */}
            <div
              className="group relative rounded-2xl p-8 sm:p-10 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)] tracking-widest opacity-80"
                  >
                    01
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-forest)] transition-colors group-hover:bg-[var(--color-gold)] group-hover:text-white"
                    style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Terroir & Rastreabilidade
                </div>

                <h3
                  className="text-2xl font-bold mb-4 text-[var(--color-espresso)] font-[family-name:var(--font-display)] group-hover:text-[var(--color-gold)] transition-colors"
                >
                  Origem Rastreável
                </h3>

                <p className="text-sm leading-relaxed text-[var(--color-muted)] font-normal mb-8">
                  Cafés selecionados diretamente de pequenos produtores parceiros no Sul de Minas, Cerrado e Chapada Diamantina, com rastreabilidade total do lote.
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--color-border)]/60 flex items-center gap-2 text-xs font-semibold text-[var(--color-forest)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span>Altitude 1.100m+ • Microlotes</span>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="group relative rounded-2xl p-8 sm:p-10 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)] tracking-widest opacity-80"
                  >
                    02
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-forest)] transition-colors group-hover:bg-[var(--color-gold)] group-hover:text-white"
                    style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Perfil & Precisão Térmica
                </div>

                <h3
                  className="text-2xl font-bold mb-4 text-[var(--color-espresso)] font-[family-name:var(--font-display)] group-hover:text-[var(--color-gold)] transition-colors"
                >
                  Torra Artesanal
                </h3>

                <p className="text-sm leading-relaxed text-[var(--color-muted)] font-normal mb-8">
                  Cada lote é torrado semanalmente em pequenos volumes sob demanda, preservando notas sensoriais puras, acidez equilibrada e frescor inigualável.
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--color-border)]/60 flex items-center gap-2 text-xs font-semibold text-[var(--color-forest)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span>Small Batch • Curva Customizada</span>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="group relative rounded-2xl p-8 sm:p-10 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)] tracking-widest opacity-80"
                  >
                    03
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-forest)] transition-colors group-hover:bg-[var(--color-gold)] group-hover:text-white"
                    style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-2">
                  Comércio Justo & Futuro
                </div>

                <h3
                  className="text-2xl font-bold mb-4 text-[var(--color-espresso)] font-[family-name:var(--font-display)] group-hover:text-[var(--color-gold)] transition-colors"
                >
                  Direct Trade
                </h3>

                <p className="text-sm leading-relaxed text-[var(--color-muted)] font-normal mb-8">
                  Trabalhamos sem intermediários com remuneração justa acima do mercado, apoiando práticas agroecológicas que cuidam do solo e das famílias produtoras.
                </p>
              </div>

              <div className="pt-5 border-t border-[var(--color-border)]/60 flex items-center gap-2 text-xs font-semibold text-[var(--color-forest)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span>100% Rastreável • Cultivo Ético</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Serviços em Destaque ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-forest)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
              >
                Nossos Serviços
              </h2>
              <p style={{ color: 'rgba(244,239,230,0.6)' }}>
                Linha de cafés especiais, planos de assinatura e soluções corporativas.
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

          <FeaturedProducts services={services} />
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
