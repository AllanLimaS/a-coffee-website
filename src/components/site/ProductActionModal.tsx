'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export type ModalType = 'ecommerce' | 'whatsapp' | null

interface ProductActionModalProps {
  type: ModalType
  serviceTitle?: string
  serviceSlug?: string
  onClose: () => void
}

export default function ProductActionModal({
  type,
  serviceTitle,
  serviceSlug,
  onClose,
}: ProductActionModalProps) {
  const [copied, setCopied] = useState(false)
  const [notified, setNotified] = useState(false)
  const [emailNotify, setEmailNotify] = useState('')

  if (!type) return null

  // Mensagens pré-configuradas para cada serviço
  const whatsappMessages: Record<string, string> = {
    'assinatura-mensal':
      'Olá! Gostaria de saber mais sobre o plano de Assinatura Mensal de Cafés Especiais da A. Coffee e os microlotes deste mês.',
    corporativo:
      'Olá! Gostaria de solicitar uma proposta personalizada e agendar uma degustação gratuita de Café Corporativo para a minha empresa.',
    'cafe-especial':
      'Olá! Gostaria de encomendar cafés especiais da A. Coffee diretamente pelo WhatsApp.',
  }

  const currentMessage =
    (serviceSlug && whatsappMessages[serviceSlug]) ||
    `Olá! Gostaria de mais informações sobre ${serviceTitle || 'os cafés especiais da A. Coffee'}.`

  return (
    <Modal open={!!type} onClose={onClose} maxWidth="md">
      {type === 'ecommerce' ? (
        /* ── Modal E-commerce em Construção (Minimalista & Editorial) ── */
        <div className="py-4 text-center">
          <h3
            className="text-2xl sm:text-3xl font-bold mb-3 text-[var(--color-canvas)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Loja Online em Breve
          </h3>

          <p className="text-sm sm:text-base text-[rgba(244,239,230,0.7)] max-w-md mx-auto mb-6 leading-relaxed">
            Estamos finalizando a plataforma de e-commerce para você comprar grãos frescos e microlotes com torra semanal sob demanda. Volte em breve!
          </p>

          {/* Card de Notificação */}
          <div className="p-4 rounded-xl mb-6 text-left border border-white/10 bg-white/[0.03]">
            <p className="text-xs font-medium text-[var(--color-gold)] mb-2 uppercase tracking-wide">
              Deseja ser avisado no lançamento?
            </p>
            {notified ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium py-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Perfeito! Avisaremos você assim que abrirmos os pedidos online.
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  if (emailNotify) setNotified(true)
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail ou WhatsApp"
                  value={emailNotify}
                  onChange={e => setEmailNotify(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg text-xs bg-black/40 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-gold)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors text-[#191614] bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] cursor-pointer"
                >
                  Avise-me
                </button>
              </form>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-white/20 text-[var(--color-canvas)] transition-colors hover:bg-white/10 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        /* ── Modal Simulação WhatsApp (Minimalista & Editorial) ── */
        <div className="py-2">
          <div className="pb-3 mb-4 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
              Atendimento Personalizado
            </span>
            <h3
              className="text-2xl font-bold text-[var(--color-canvas)] mt-0.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {serviceTitle || 'Café de Especialidade'}
            </h3>
          </div>

          {/* Prévia da Mensagem do WhatsApp */}
          <div className="p-4 rounded-xl border border-white/10 bg-[#0f1411] mb-5">
            <div className="text-[11px] font-semibold text-[rgba(244,239,230,0.5)] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Mensagem sugerida:</span>
              <span className="text-emerald-400 font-medium">WhatsApp</span>
            </div>
            <p className="text-xs sm:text-sm text-[rgba(244,239,230,0.85)] leading-relaxed italic bg-white/[0.04] p-3 rounded-lg border border-white/5">
              &ldquo;{currentMessage}&rdquo;
            </p>
          </div>

          {/* Informação e Ação */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 3000)
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-bold text-sm text-white transition-all shadow-lg hover:opacity-90 active:scale-[0.98] cursor-pointer"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.83.813 2.796.814 3.183 0 5.769-2.588 5.77-5.767 0-3.18-2.587-5.767-5.77-5.77zm0 10.375c-.868 0-1.719-.234-2.463-.676l-.176-.105-1.83.48.488-1.784-.115-.183c-.485-.773-.742-1.674-.741-2.529.001-2.535 2.062-4.596 4.597-4.596 2.536 0 4.597 2.061 4.598 4.596 0 2.536-2.061 4.597-4.597 4.597z" />
              </svg>
              {copied ? '✓ Simulação: Redirecionamento Executado!' : 'Continuar para o WhatsApp'}
            </button>

            <div className="flex items-center justify-between text-xs text-[rgba(244,239,230,0.4)] px-1">
              <span>Contato direto: +55 (11) 99999-9999</span>
              <button onClick={onClose} className="hover:text-white transition-colors underline cursor-pointer">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
