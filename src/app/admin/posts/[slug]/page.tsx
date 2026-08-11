import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/content';
import PostForm from '@/components/admin/PostForm';

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}>
          Editar Post
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(244,239,230,0.4)' }}>
          Atualize o conteúdo da publicação
        </p>
      </div>
      <PostForm initialData={post} />
    </div>
  );
}
