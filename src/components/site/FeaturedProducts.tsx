'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Service } from '@/types/content'
import ProductActionModal, { ModalType } from './ProductActionModal'

interface FeaturedProductsProps {
  services: Service[]
}

export default function FeaturedProducts({ services }: FeaturedProductsProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map(service => (
          <div
            key={service.slug}
            className="group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <div>
              {/* Imagem do Produto */}
              <div className="relative h-64 w-full overflow-hidden bg-black/20">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#121a14] via-transparent to-transparent pointer-events-none" />

                {/* Badges Flutuantes */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {service.badges?.slice(0, 2).map(badge => (
                    <span
                      key={badge}
                      className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-md border border-white/10"
                      style={{
                        backgroundColor: 'rgba(25, 22, 20, 0.75)',
                        color: 'var(--color-gold)',
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Informações */}
              <div className="p-6 sm:p-8">
                <h3
                  className="text-2xl font-bold mb-3 text-[var(--color-canvas)] group-hover:text-[var(--color-gold)] transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 text-[rgba(244,239,230,0.7)] font-light">
                  {service.shortDescription}
                </p>

                {/* Preço */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className="text-2xl font-bold text-[var(--color-gold)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {service.price}
                  </span>
                  {service.priceUnit && (
                    <span className="text-xs text-[rgba(244,239,230,0.5)] font-light">
                      /{service.priceUnit}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Ação */}
            <div className="p-6 sm:p-8 pt-0">
              <button
                onClick={() => handleAction(service)}
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:opacity-95 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                style={{
                  backgroundColor:
                    service.slug === 'cafe-especial' || service.category === 'cafes'
                      ? 'var(--color-gold)'
                      : '#FFFFFF',
                  color: '#191614',
                }}
              >
                <span>{getButtonText(service)}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

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
