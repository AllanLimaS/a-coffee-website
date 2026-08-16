'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Service } from '@/types/content'
import ProductActionModal, { ModalType } from './ProductActionModal'

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [modalType, setModalType] = useState<ModalType>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleAction = (service: Service) => {
    setSelectedService(service)
    if (service.slug === 'cafe-especial' || service.category === 'cafes') {
      setModalType('ecommerce')
    } else {
      setModalType('whatsapp')
    }
  }

  const getButtonText = (service: Service) => {
    if (service.slug === 'cafe-especial' || service.category === 'cafes') return 'Acessar Loja'
    if (service.slug === 'assinatura-mensal' || service.category === 'assinaturas') return 'Assinar Agora'
    if (service.slug === 'corporativo') return 'Falar com Consultor'
    return 'Saiba mais'
  }

  return (
    <>
      {/* Grid de Serviços */}
      {services.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
            Nenhum serviço encontrado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div
              key={service.slug}
              className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div>
                {/* Imagem do Serviço */}
                <div className="relative h-60 w-full overflow-hidden bg-[#233126]/10">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-[var(--color-gold)]">
                      ☕
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6 sm:p-7">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.badges?.map(badge => (
                      <span
                        key={badge}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
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
                    className="text-xl sm:text-2xl font-bold mb-2.5"
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
                        <span
                          key={note}
                          className="text-xs px-2 py-0.5 rounded-md bg-[rgba(170,134,75,0.1)] text-[var(--color-espresso)] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex items-center justify-between border-t border-[var(--color-border)]/40 mt-auto">
                <div>
                  <span
                    className="font-bold text-lg sm:text-xl"
                    style={{ color: 'var(--color-espresso)', fontFamily: 'var(--font-display)' }}
                  >
                    {service.price}
                  </span>
                  {service.priceUnit && (
                    <span className="text-xs ml-1 font-normal text-[var(--color-muted)]">
                      /{service.priceUnit}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAction(service)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor:
                      service.slug === 'cafe-especial' || service.category === 'cafes'
                        ? 'var(--color-gold)'
                        : 'var(--color-forest)',
                    color:
                      service.slug === 'cafe-especial' || service.category === 'cafes'
                        ? '#191614'
                        : 'var(--color-canvas)',
                  }}
                >
                  {getButtonText(service)}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Interativo */}
      <ProductActionModal
        type={modalType}
        serviceTitle={selectedService?.title}
        serviceSlug={selectedService?.slug}
        onClose={() => {
          setModalType(null)
          setSelectedService(null)
        }}
      />
    </>
  )
}
