import type { Metadata } from 'next'
import Image from 'next/image'
import { getAboutContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a história do A. Coffee — de onde viemos, o que nos move e quem somos.',
}

const VALUE_SVGS: Record<string, React.ReactNode> = {
  quality: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  transparency: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  community: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  sustainability: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
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
              className="relative rounded-2xl h-80 md:h-[480px] overflow-hidden shadow-lg border border-[var(--color-border)]"
            >
              <Image
                src="/images/espresso.jpg"
                alt="História da A. Coffee"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
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

      {/* ── Valores (Design Editorial Sem Emojis) ── */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-[var(--color-border)]">
            <div>
              <span
                className="text-xs font-bold tracking-widest uppercase mb-3 block text-[var(--color-gold)]"
              >
                Manifesto & Princípios
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-espresso)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Nossos Valores
              </h2>
            </div>
            <p className="text-base text-[var(--color-muted)] max-w-md font-light leading-relaxed">
              Princípios inegociáveis que guiam cada decisão, da seleção do lote na fazenda até a última gota na sua xícara.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {about.values.map((v, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)] opacity-75"
                    >
                      0{i + 1}
                    </span>
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-xl text-[var(--color-forest)] transition-colors group-hover:bg-[var(--color-gold)] group-hover:text-white"
                      style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                    >
                      {VALUE_SVGS[v.icon] ?? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3 text-[var(--color-espresso)] group-hover:text-[var(--color-gold)] transition-colors"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {v.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[var(--color-muted)] font-light">
                    {v.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50 flex items-center gap-1.5 text-xs text-[var(--color-forest)] font-medium">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
                  <span>Compromisso A. Coffee</span>
                </div>
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
                  className="h-56 flex items-center justify-center text-[var(--color-gold)]"
                  style={{ backgroundColor: 'rgba(170,134,75,0.12)' }}
                >
                  <svg className="w-16 h-16 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
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
