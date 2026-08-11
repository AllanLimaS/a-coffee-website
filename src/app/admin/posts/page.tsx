import Link from 'next/link';
import { getAllPosts } from '@/lib/content';

export default async function PostsPage() {
  const posts = await getAllPosts(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}>
            Gerenciar Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(244,239,230,0.4)' }}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} no total
          </p>
        </div>
        <Link 
          href="/admin/posts/novo" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
          style={{ backgroundColor: 'var(--color-gold)', color: '#0f0d0c' }}
        >
          Novo Post
        </Link>
      </div>

      <div className="rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
        {posts.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'rgba(244,239,230,0.4)' }}>
            Nenhum post encontrado. Crie seu primeiro post!
          </div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <tr className="border-b transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <th className="h-10 px-4 text-left align-middle font-medium" style={{ color: 'rgba(244,239,230,0.6)' }}>Título</th>
                  <th className="h-10 px-4 text-left align-middle font-medium" style={{ color: 'rgba(244,239,230,0.6)' }}>Categoria</th>
                  <th className="h-10 px-4 text-left align-middle font-medium" style={{ color: 'rgba(244,239,230,0.6)' }}>Data</th>
                  <th className="h-10 px-4 text-left align-middle font-medium" style={{ color: 'rgba(244,239,230,0.6)' }}>Status</th>
                  <th className="h-10 px-4 text-right align-middle font-medium" style={{ color: 'rgba(244,239,230,0.6)' }}>Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {posts.map((post) => (
                  <tr key={post.slug} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <td className="p-4 align-middle font-medium" style={{ color: 'var(--color-canvas)' }}>{post.title}</td>
                    <td className="p-4 align-middle" style={{ color: 'rgba(244,239,230,0.6)' }}>{post.category || '—'}</td>
                    <td className="p-4 align-middle" style={{ color: 'rgba(244,239,230,0.6)' }}>
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4 align-middle">
                      <span 
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
                        style={{ 
                          backgroundColor: post.status === 'published' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: post.status === 'published' ? 'rgb(74, 222, 128)' : 'rgb(251, 191, 36)'
                        }}
                      >
                        {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <Link 
                        href={`/admin/posts/${post.slug}`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-white/10 h-8 px-3"
                        style={{ color: 'var(--color-gold)' }}
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
