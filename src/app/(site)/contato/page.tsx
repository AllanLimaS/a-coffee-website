import type { Metadata } from 'next'
import ContactForm from '@/components/site/ContactForm'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o A. Coffee. Estamos prontos para ajudar com dúvidas, pedidos e parcerias.',
}

const CONTACT_INFO = [
  {
    icon: '📧',
    label: 'E-mail',
    value: 'contato@acoffee.com.br',
    href: 'mailto:contato@acoffee.com.br',
  },
  {
    icon: '📱',
    label: 'WhatsApp',
    value: '+55 11 99999-9999',
    href: 'https://wa.me/5511999999999',
  },
  {
    icon: '📍',
    label: 'Endereço',
    value: 'Rua do Café, 123\nSão Paulo, SP',
    href: null,
  },
  {
    icon: '⏰',
    label: 'Atendimento',
    value: 'Seg–Sex, 9h às 18h',
    href: null,
  },
]

export default function ContatoPage() {
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
            Fale com a gente
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
          >
            Contato
          </h1>
          <p className="text-xl max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Tem alguma dúvida, sugestão ou quer saber mais sobre nossos produtos? Adoramos conversar sobre café.
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="pb-24 md:pb-32" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Info de contato */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
                >
                  Informações
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  Respondemos todas as mensagens em até 1 dia útil.
                </p>
              </div>

              <div className="space-y-5">
                {CONTACT_INFO.map(info => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div
                      className="text-xl w-11 h-11 flex items-center justify-center rounded-xl shrink-0"
                      style={{ backgroundColor: 'rgba(170,134,75,0.1)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-muted)' }}>
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm font-medium transition-colors hover:opacity-70 whitespace-pre-line"
                          style={{ color: 'var(--color-espresso)' }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium whitespace-pre-line" style={{ color: 'var(--color-espresso)' }}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Redes sociais */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-muted)' }}>
                  Redes Sociais
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/a.coffee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm transition-all hover:opacity-80"
                    style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-canvas)' }}
                    aria-label="Instagram"
                  >
                    IG
                  </a>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm transition-all hover:opacity-80"
                    style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-canvas)' }}
                    aria-label="WhatsApp"
                  >
                    WA
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
