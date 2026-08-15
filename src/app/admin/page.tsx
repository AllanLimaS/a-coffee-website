import Link from 'next/link'
import { getAllPosts, getAllServices } from '@/lib/content'

export default function AdminDashboard() {
  const posts = getAllPosts(false)
  const publishedPosts = posts.filter(p => p.status === 'published')
  const draftPosts = posts.filter(p => p.status === 'draft')
  const services = getAllServices()

  const stats = [
    {
      label: 'Posts publicados',
      value: publishedPosts.length,
      color: '#22c55e',
      icon: (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      label: 'Rascunhos',
      value: draftPosts.length,
      color: 'var(--color-gold)',
      icon: (
        <svg className="w-5 h-5 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      label: 'Produtos/Serviços',
      value: services.length,
      color: '#60a5fa',
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: 'Páginas editáveis',
      value: 3,
      color: '#a78bfa',
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ]

  const quickLinks = [
    {
      label: 'Novo Post',
      href: '/admin/posts/novo',
      icon: (
        <svg className="w-5 h-5 text-[var(--color-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: 'Editar Home',
      href: '/admin/paginas',
      icon: (
        <svg className="w-5 h-5 text-[var(--color-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Gerenciar Mídia',
      href: '/admin/midia',
      icon: (
        <svg className="w-5 h-5 text-[var(--color-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Ver Site',
      href: '/',
      target: '_blank',
      icon: (
        <svg className="w-5 h-5 text-[var(--color-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      ),
    },
  ]

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
        >
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: 'rgba(244,239,230,0.4)' }}>
          Visão geral do conteúdo do site A. Coffee
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-xl p-5 border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                {stat.icon}
              </div>
              <span
                className="text-3xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: stat.color }}
              >
                {stat.value}
              </span>
            </div>
            <p className="text-xs font-medium" style={{ color: 'rgba(244,239,230,0.5)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Atalhos rápidos */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'rgba(244,239,230,0.4)' }}
        >
          Atalhos rápidos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              target={link.target}
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-[rgba(170,134,75,0.4)]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.07)',
                color: 'var(--color-canvas)',
              }}
            >
              {link.icon}
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Posts recentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(244,239,230,0.4)' }}
          >
            Posts recentes
          </h2>
          <Link
            href="/admin/posts"
            className="text-xs font-medium transition-colors hover:opacity-70 flex items-center gap-1"
            style={{ color: 'var(--color-gold)' }}
          >
            Ver todos
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {posts.slice(0, 5).map((post, i) => (
            <div
              key={post.slug}
              className="flex items-center justify-between px-5 py-4"
              style={{
                borderBottom: i < posts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-canvas)' }}>
                  {post.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(244,239,230,0.35)' }}>
                  {post.date} · {post.author}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: post.status === 'published'
                      ? 'rgba(34,197,94,0.15)'
                      : 'rgba(234,179,8,0.15)',
                    color: post.status === 'published' ? '#86efac' : '#fde047',
                  }}
                >
                  {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="text-xs transition-colors hover:opacity-70"
                  style={{ color: 'var(--color-gold)' }}
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
