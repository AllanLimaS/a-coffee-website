import Link from 'next/link'
import { getAllPosts, getAllServices } from '@/lib/content'

export default function AdminDashboard() {
  const posts = getAllPosts(false)
  const publishedPosts = posts.filter(p => p.status === 'published')
  const draftPosts = posts.filter(p => p.status === 'draft')
  const services = getAllServices()

  const stats = [
    { label: 'Posts publicados', value: publishedPosts.length, icon: '✅', color: '#22c55e' },
    { label: 'Rascunhos', value: draftPosts.length, icon: '📝', color: 'var(--color-gold)' },
    { label: 'Produtos/Serviços', value: services.length, icon: '☕', color: '#60a5fa' },
    { label: 'Páginas editáveis', value: 3, icon: '📄', color: '#a78bfa' },
  ]

  const quickLinks = [
    { label: 'Novo Post', href: '/admin/posts/novo', icon: '✏️' },
    { label: 'Editar Home', href: '/admin/paginas', icon: '🏠' },
    { label: 'Gerenciar Mídia', href: '/admin/midia', icon: '🖼️' },
    { label: 'Ver Site', href: '/', icon: '🌐', target: '_blank' },
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
              <span className="text-2xl">{stat.icon}</span>
              <span
                className="text-3xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: stat.color }}
              >
                {stat.value}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(244,239,230,0.5)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Atalhos rápidos */}
      <div>
        <h2
          className="text-sm font-semibold uppercase tracking-widest mb-4"
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
              <span className="text-xl">{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Posts recentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(244,239,230,0.4)' }}
          >
            Posts recentes
          </h2>
          <Link
            href="/admin/posts"
            className="text-xs font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--color-gold)' }}
          >
            Ver todos →
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
