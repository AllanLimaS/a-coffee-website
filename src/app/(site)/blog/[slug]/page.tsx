import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getPostSlugs } from '@/lib/content'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || post.status !== 'published') notFound()

  return (
    <>
      {/* Hero do post */}
      <section
        className="pt-32 pb-12 md:pt-40 md:pb-16"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: 'rgba(170,134,75,0.2)', color: 'var(--color-gold)' }}
            >
              {post.category}
            </span>
            <span className="text-xs" style={{ color: 'rgba(244,239,230,0.5)' }}>
              {formatDate(post.date)}
            </span>
            <span className="text-xs" style={{ color: 'rgba(244,239,230,0.5)' }}>
              por {post.author}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            {post.title}
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: 'rgba(244,239,230,0.7)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(244,239,230,0.6)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cover placeholder */}
      <div
        className="h-72 md:h-96 w-full flex items-center justify-center text-6xl"
        style={{ backgroundColor: 'rgba(35,49,38,0.08)' }}
      >
        ☕
      </div>

      {/* Conteúdo do post */}
      <article className="py-16 md:py-20" style={{ backgroundColor: 'var(--color-canvas)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="prose-content">
            <MDXRemote source={post.content ?? ''} />
          </div>
        </div>
      </article>

      {/* Voltar ao blog */}
      <div
        className="border-t py-10"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--color-forest)' }}
          >
            ← Voltar ao Blog
          </Link>
        </div>
      </div>
    </>
  )
}
