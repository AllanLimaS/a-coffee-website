import type { Metadata } from 'next'
import { getAllServices } from '@/lib/content'
import ServicesGrid from '@/components/site/ServicesGrid'

export const metadata: Metadata = {
  title: 'Serviços & Produtos',
  description: 'Conheça nossa seleção de cafés especiais, assinaturas mensais e soluções corporativas.',
}

export default function ServicosPage() {
  const services = getAllServices()

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 md:pt-40 md:pb-20"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span
            className="text-xs font-semibold tracking-widest uppercase mb-4 block"
            style={{ color: 'var(--color-gold)' }}
          >
            Portfólio
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
          >
            Nossos Produtos
          </h1>
          <p className="text-xl max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Cada produto reflete a nossa obsessão por qualidade e a riqueza do café brasileiro.
          </p>
        </div>
      </section>

      {/* Grid com filtros */}
      <section className="pb-24 md:pb-32" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ServicesGrid services={services} />
        </div>
      </section>

      {/* CTA corporativo */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            Precisa de uma solução para sua empresa?
          </h2>
          <p className="mb-8" style={{ color: 'rgba(244,239,230,0.7)' }}>
            Oferecemos programas personalizados para empresas de qualquer porte, com moedor incluso e suporte dedicado.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-md font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)' }}
          >
            Falar sobre o programa corporativo →
          </a>
        </div>
      </section>
    </>
  )
}
