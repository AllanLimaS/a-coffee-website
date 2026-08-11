'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const widths = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export default function Modal({ open, onClose, title, children, maxWidth = 'md' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Fechar com Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Bloquear scroll do body
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          'relative w-full rounded-xl border shadow-2xl',
          'border-[rgba(255,255,255,0.1)]',
          widths[maxWidth],
        ].join(' ')}
        style={{ backgroundColor: '#1C1917' }}
      >
        {/* Header */}
        {title && (
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <h2
              className="text-base font-semibold"
              style={{ color: 'var(--color-canvas)' }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-xl leading-none w-7 h-7 flex items-center justify-center rounded-md transition-colors hover:bg-white/10"
              style={{ color: 'rgba(244,239,230,0.5)' }}
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        )}

        {/* Botão fechar sem título */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-xl w-7 h-7 flex items-center justify-center rounded-md transition-colors hover:bg-white/10"
            style={{ color: 'rgba(244,239,230,0.5)' }}
            aria-label="Fechar"
          >
            ×
          </button>
        )}

        {/* Content */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
