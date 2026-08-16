import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre café especial, origens, processos de torra e métodos de preparo.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 60%, var(--color-gold) 0%, transparent 55%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            Blog
          </h1>
          <p
            className="text-xl max-w-xl leading-relaxed"
            style={{ color: 'rgba(244,239,230,0.7)' }}
          >
            Histórias, conhecimento técnico e paixão pelo universo do café de especialidade.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center py-20 text-lg" style={{ color: 'var(--color-muted)' }}>
              Nenhum post publicado ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-48 flex items-center justify-center text-4xl shrink-0"
                    style={{ backgroundColor: 'rgba(35,49,38,0.06)' }}
                  >
                    ☕
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: 'rgba(170,134,75,0.1)', color: 'var(--color-gold)' }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-muted-light)' }}>
                        {formatDate(post.date)}
                      </span>
                    </div>

                    <h2
                      className="text-xl font-bold mb-3 leading-snug group-hover:text-[var(--color-gold)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-espresso)' }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--color-muted)' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs" style={{ color: 'var(--color-muted-light)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="flex items-center gap-2 text-sm font-medium mt-auto"
                      style={{ color: 'var(--color-forest)' }}
                    >
                      <span>Ler artigo</span>
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
