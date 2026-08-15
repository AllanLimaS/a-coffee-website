'use client'

import { useState, useEffect } from 'react'
import PageEditor from '@/components/admin/PageEditor'

const PAGES = [
  {
    id: 'home',
    label: 'Home',
    filePath: 'content/pages/home.json',
    pageTitle: 'Página Inicial',
    fields: [
      { key: 'hero.title', label: 'Hero — Título', type: 'text' as const },
      { key: 'hero.subtitle', label: 'Hero — Subtítulo', type: 'text' as const },
      { key: 'hero.backgroundImage', label: 'Hero — Imagem de Fundo', type: 'image' as const },
      { key: 'hero.ctaText', label: 'Hero — Texto do Botão', type: 'text' as const },
      { key: 'hero.ctaLink', label: 'Hero — Link do Botão', type: 'url' as const },
      { key: 'aboutPreview.text', label: 'Prévia Sobre — Texto', type: 'textarea' as const },
      { key: 'aboutPreview.image', label: 'Prévia Sobre — Imagem', type: 'image' as const },
    ],
  },
  {
    id: 'sobre',
    label: 'Sobre',
    filePath: 'content/pages/sobre.json',
    pageTitle: 'Página Sobre',
    fields: [
      { key: 'hero.title', label: 'Hero — Título', type: 'text' as const },
      { key: 'hero.subtitle', label: 'Hero — Subtítulo', type: 'text' as const },
      { key: 'hero.backgroundImage', label: 'Hero — Imagem de Fundo', type: 'image' as const },
      { key: 'story.title', label: 'Nossa História — Título', type: 'text' as const },
    ],
  },
  {
    id: 'contato',
    label: 'Contato',
    filePath: 'content/pages/contato.json',
    pageTitle: 'Página Contato',
    fields: [
      { key: 'title', label: 'Título da Página', type: 'text' as const },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' as const },
      { key: 'mapUrl', label: 'URL do Google Maps', type: 'url' as const },
    ],
  },
]

export default function AdminPaginasPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [pageData, setPageData] = useState<Record<string, Record<string, unknown>>>({})
  const [loading, setLoading] = useState(true)

  const activePage = PAGES.find(p => p.id === activeTab)!

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const res = await fetch(`/api/content?path=${activePage.filePath}`)
        if (res.ok) {
          const data = await res.json()
          if (data.content) {
            setPageData(prev => ({
              ...prev,
              [activeTab]: JSON.parse(data.content),
            }))
          }
        }
      } catch (err) {
        console.error('Erro ao carregar página:', err)
      } finally {
        setLoading(false)
      }
    }

    if (!pageData[activeTab]) {
      loadData()
    } else {
      setLoading(false)
    }
  }, [activeTab, activePage.filePath, pageData])

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
        >
          Gerenciar Páginas
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(244,239,230,0.4)' }}>
          Edite o conteúdo das páginas do site
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-lg"
        style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
      >
        {PAGES.map(page => (
          <button
            key={page.id}
            onClick={() => setActiveTab(page.id)}
            className="flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === page.id ? 'rgba(170,134,75,0.15)' : 'transparent',
              color: activeTab === page.id ? 'var(--color-gold)' : 'rgba(244,239,230,0.5)',
            }}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div
            className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
          />
        </div>
      ) : pageData[activeTab] ? (
        <PageEditor
          key={activeTab}
          filePath={activePage.filePath}
          pageTitle={activePage.pageTitle}
          data={pageData[activeTab]}
          fields={activePage.fields}
        />
      ) : (
        <div
          className="flex flex-col items-center gap-3 py-24 rounded-xl border border-dashed"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <svg className="w-10 h-10 text-[rgba(244,239,230,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm" style={{ color: 'rgba(244,239,230,0.4)' }}>
            Página ainda não configurada. Salve para criar o arquivo.
          </p>
        </div>
      )}
    </div>
  )
}
