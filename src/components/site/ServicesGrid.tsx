'use client'

import { useState } from 'react'
import type { Service } from '@/types/content'

const CATEGORIES = [
  { label: 'Todos', value: 'all' },
  { label: 'Cafés', value: 'cafes' },
  { label: 'Assinaturas', value: 'assinaturas' },
  { label: 'Corporativo', value: 'corporativo' },
  { label: 'Acessórios', value: 'acessorios' },
]

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? services
    : services.filter(s => s.category === active)

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: active === cat.value ? 'var(--color-forest)' : 'var(--color-surface)',
              color: active === cat.value ? 'var(--color-canvas)' : 'var(--color-espresso)',
              border: `1.5px solid ${active === cat.value ? 'var(--color-forest)' : 'var(--color-border)'}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            Nenhum produto encontrado nesta categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (
            <div
              key={service.slug}
              className="group rounded-xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Imagem placeholder */}
              <div
                className="h-52 flex items-center justify-center text-5xl"
                style={{ backgroundColor: 'rgba(170,134,75,0.08)' }}
              >
                ☕
              </div>

              <div className="p-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {service.badges?.map(badge => (
                    <span
                      key={badge}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: 'rgba(35,49,38,0.08)',
                        color: 'var(--color-forest)',
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
                  {service.shortDescription}
                </p>

                {/* Notas sensoriais */}
                {service.sensoryNotes && service.sensoryNotes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    {service.sensoryNotes.map(note => (
                      <span key={note} className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="font-bold text-xl"
                      style={{ color: 'var(--color-espresso)' }}
                    >
                      {service.price}
                    </span>
                    {service.priceUnit && (
                      <span className="text-xs ml-1" style={{ color: 'var(--color-muted)' }}>
                        /{service.priceUnit}
                      </span>
                    )}
                  </div>
                  <button
                    className="px-4 py-2 rounded-md text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-forest)', color: 'var(--color-canvas)' }}
                  >
                    Saiba mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
