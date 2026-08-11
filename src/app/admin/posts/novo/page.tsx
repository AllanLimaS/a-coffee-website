'use client';

import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}>
          Novo Post
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(244,239,230,0.4)' }}>
          Crie uma nova publicação para o blog
        </p>
      </div>
      <PostForm />
    </div>
  );
}
