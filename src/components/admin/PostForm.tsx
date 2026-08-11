'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types/content'
import { Input, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ContentEditor from './ContentEditor'
import ImageUploader from './ImageUploader'

interface PostFormProps {
  initialData?: Partial<Post>
  sha?: string // SHA do arquivo no GitHub (necessário para atualizar)
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function PostForm({ initialData, sha }: PostFormProps) {
  const router = useRouter()
  const isNew = !initialData?.slug

  const [form, setForm] = useState<Partial<Post>>({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    author: 'A. Coffee',
    category: '',
    tags: [],
    coverImage: '',
    excerpt: '',
    status: 'draft',
    content: '',
    ...initialData,
  })

  const [tagsInput, setTagsInput] = useState((initialData?.tags ?? []).join(', '))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function set<K extends keyof Post>(key: K, value: Post[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleTitleChange(title: string) {
    set('title', title)
    if (isNew) {
      set('slug', slugify(title))
    }
  }

  async function handleSave() {
    setError(null)
    setSuccess(false)

    // Validação básica
    if (!form.title?.trim()) return setError('Título obrigatório')
    if (!form.slug?.trim()) return setError('Slug obrigatório')
    if (!form.content?.trim()) return setError('Conteúdo obrigatório')

    setSaving(true)
    try {
      // Montar frontmatter + conteúdo Markdown
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const frontmatter = [
        '---',
        `title: "${form.title}"`,
        `slug: "${form.slug}"`,
        `date: "${form.date}"`,
        `author: "${form.author}"`,
        `category: "${form.category}"`,
        `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
        `coverImage: "${form.coverImage}"`,
        `excerpt: "${form.excerpt}"`,
        `status: "${form.status}"`,
        '---',
        '',
      ].join('\n')

      const rawContent = `${frontmatter}${form.content ?? ''}`
      const filePath = `content/posts/${form.slug}.md`

      // Buscar SHA atual se for edição
      let currentSha = sha
      if (!isNew && !currentSha) {
        const res = await fetch(`/api/content?path=${filePath}`)
        if (res.ok) {
          const data = await res.json()
          currentSha = data.sha
        }
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: filePath,
          content: rawContent,
          message: `${isNew ? 'feat' : 'chore'}: ${isNew ? 'adiciona' : 'atualiza'} post "${form.title}"`,
          sha: currentSha,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Erro ao salvar')
      }

      setSuccess(true)
      if (isNew) {
        router.push('/admin/posts')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar post')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!form.slug) return
    if (!confirm(`Excluir o post "${form.title}"? Esta ação não pode ser desfeita.`)) return

    setSaving(true)
    setError(null)
    try {
      const filePath = `content/posts/${form.slug}.md`

      // Buscar SHA atual
      let currentSha = sha
      if (!currentSha) {
        const res = await fetch(`/api/content?path=${filePath}`)
        if (res.ok) {
          const data = await res.json()
          currentSha = data.sha
        }
      }

      if (!currentSha) throw new Error('Não foi possível obter SHA do arquivo')

      const res = await fetch('/api/content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: filePath,
          sha: currentSha,
          message: `chore: remove post "${form.title}"`,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Erro ao excluir')
      }

      router.push('/admin/posts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            {isNew ? 'Novo Post' : 'Editar Post'}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(244,239,230,0.4)' }}>
            {isNew ? 'Crie um novo post para o blog' : `Editando: ${form.slug}`}
          </p>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <Button variant="danger" size="sm" onClick={handleDelete} loading={saving}>
              Excluir
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => set('status', form.status === 'published' ? 'draft' : 'published')}
          >
            {form.status === 'published' ? '📝 Rascunho' : '✅ Publicar'}
          </Button>
          <Button onClick={handleSave} loading={saving} size="sm">
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          Post salvo com sucesso!
        </div>
      )}

      {/* Grid de campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Input
            label="Título"
            value={form.title ?? ''}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Título do post"
          />
        </div>

        <Input
          label="Slug (URL)"
          value={form.slug ?? ''}
          onChange={e => set('slug', slugify(e.target.value))}
          placeholder="meu-post-aqui"
          hint="Gerado automaticamente a partir do título"
        />

        <Input
          label="Data"
          type="date"
          value={form.date ?? ''}
          onChange={e => set('date', e.target.value)}
        />

        <Input
          label="Autor"
          value={form.author ?? ''}
          onChange={e => set('author', e.target.value)}
        />

        <Input
          label="Categoria"
          value={form.category ?? ''}
          onChange={e => set('category', e.target.value)}
          placeholder="Processo, Origem, Receitas..."
        />

        <div className="md:col-span-2">
          <Input
            label="Tags (separadas por vírgula)"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="torra, artesanal, café"
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Resumo / Excerpt"
            value={form.excerpt ?? ''}
            onChange={e => set('excerpt', e.target.value)}
            placeholder="Breve descrição do post..."
            rows={2}
          />
        </div>
      </div>

      {/* Imagem de capa */}
      <ImageUploader
        value={form.coverImage}
        onChange={url => set('coverImage', url)}
      />

      {/* Editor de conteúdo */}
      <div>
        <span
          className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
          style={{ color: 'rgba(244,239,230,0.6)' }}
        >
          Conteúdo
        </span>
        <ContentEditor
          value={form.content ?? ''}
          onChange={html => set('content', html)}
          placeholder="Escreva o conteúdo do post..."
        />
      </div>
    </div>
  )
}
