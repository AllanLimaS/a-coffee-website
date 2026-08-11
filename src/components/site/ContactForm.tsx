'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')

    // Simula envio com delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 95% chance de sucesso na simulação
    if (Math.random() > 0.05) {
      setState('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } else {
      setState('error')
    }
  }

  const inputBase: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    border: '1.5px solid var(--color-border)',
    color: 'var(--color-espresso)',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  }

  if (state === 'success') {
    return (
      <div
        className="rounded-xl p-10 text-center border"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="text-5xl mb-4">✅</div>
        <h3
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
        >
          Mensagem enviada!
        </h3>
        <p className="mb-6" style={{ color: 'var(--color-muted)' }}>
          Recebemos seu contato e responderemos em até 1 dia útil.
        </p>
        <button
          onClick={() => setState('idle')}
          className="px-6 py-2.5 rounded-md font-semibold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-canvas)' }}
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-espresso)' }}
          >
            Nome *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Seu nome completo"
            value={form.name}
            onChange={handleChange}
            style={inputBase}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-espresso)' }}
          >
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            style={inputBase}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-espresso)' }}
          >
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={form.phone}
            onChange={handleChange}
            style={inputBase}
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-espresso)' }}
          >
            Assunto
          </label>
          <select
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            style={inputBase}
          >
            <option value="">Selecione um assunto</option>
            <option value="produto">Dúvida sobre produto</option>
            <option value="assinatura">Assinatura mensal</option>
            <option value="corporativo">Programa corporativo</option>
            <option value="pedido">Meu pedido</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-1.5"
          style={{ color: 'var(--color-espresso)' }}
        >
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Como podemos ajudar você?"
          value={form.message}
          onChange={handleChange}
          style={{ ...inputBase, resize: 'vertical' }}
        />
      </div>

      {state === 'error' && (
        <p className="text-sm font-medium" style={{ color: '#dc2626' }}>
          Ocorreu um erro ao enviar. Tente novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full py-4 rounded-md font-semibold text-base transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-canvas)' }}
      >
        {state === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}
