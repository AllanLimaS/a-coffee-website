import type { Metadata } from 'next'
import { getAboutContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história do A. Coffee — de onde viemos, o que nos move e quem somos.',
}

const VALUE_ICONS: Record<string, string> = {
  quality: '⭐',
  transparency: '🔍',
  community: '🤝',
  sustainability: '🌿',
}

export default function SobrePage() {
  const about = getAboutContent()

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 60%, var(--color-gold) 0%, transparent 55%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(170,134,75,0.2)', color: 'var(--color-gold)' }}
          >
            Quem somos
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            {about.hero.title}
          </h1>
          <p
            className="text-xl max-w-xl leading-relaxed"
            style={{ color: 'rgba(244,239,230,0.7)' }}
          >
            {about.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── Nossa História ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mb-4 block"
                style={{ color: 'var(--color-gold)' }}
              >
                A origem
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
              >
                {about.story.title}
              </h2>
              <div className="space-y-4">
                {about.story.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div
              className="rounded-2xl h-80 md:h-[480px] flex items-center justify-center text-6xl"
              style={{ backgroundColor: 'var(--color-border)' }}
            >
              🌿
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: 'var(--color-espresso)' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
            >
              Nossa Jornada
            </h2>
          </div>

          <div className="relative">
            {/* Linha vertical */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            />

            <div className="space-y-10">
              {about.timeline.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Conteúdo */}
                  <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <span
                      className="text-xs font-bold tracking-widest uppercase mb-2 block"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(244,239,230,0.6)' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Dot central — desktop */}
                  <div className="hidden md:flex w-[10%] justify-center items-start pt-1">
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: 'var(--color-gold)',
                        borderColor: 'var(--color-espresso)',
                      }}
                    />
                  </div>

                  {/* Espaço oposto */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
            >
              Nossos Valores
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
              Princípios que guiam cada decisão, do campo à sua xícara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((v, i) => (
              <div
                key={i}
                className="p-7 rounded-xl border text-center transition-shadow hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="text-3xl mb-4 w-14 h-14 flex items-center justify-center rounded-full mx-auto"
                  style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                >
                  {VALUE_ICONS[v.icon] ?? '✦'}
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipe ── */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
            >
              Nossa Equipe
            </h2>
            <p style={{ color: 'rgba(244,239,230,0.6)' }}>
              As pessoas por trás de cada xícara.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.team.map((member, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.1)',
                }}
              >
                {/* Avatar placeholder */}
                <div
                  className="h-56 flex items-center justify-center text-5xl"
                  style={{ backgroundColor: 'rgba(170,134,75,0.15)' }}
                >
                  👤
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    {member.role}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(244,239,230,0.6)' }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
