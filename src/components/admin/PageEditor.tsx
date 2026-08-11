'use client'

import { useState } from 'react'
import { Input, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUploader from './ImageUploader'

interface FieldConfig {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image' | 'url'
  placeholder?: string
}

interface PageEditorProps {
  /** Caminho do arquivo no repositório, ex: content/pages/home.json */
  filePath: string
  /** Título exibido na UI */
  pageTitle: string
  /** Dados atuais do JSON da página */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  /** Configuração dos campos exibidos */
  fields: FieldConfig[]
  /** SHA do arquivo no GitHub (necessário para atualização) */
  sha?: string
}

export default function PageEditor({ filePath, pageTitle, data, fields, sha }: PageEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<Record<string, any>>(data)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function set(key: string, value: any) {
    // Suporta dot notation: "hero.title"
    setForm(prev => setNested({ ...prev }, key.split('.'), value))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function get(key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], form)
  }

  async function handleSave() {
    setError(null)
    setSuccess(false)
    setSaving(true)
    try {
      // Buscar SHA atual se não foi passado
      let currentSha = sha
      if (!currentSha) {
        const res = await fetch(`/api/content?path=${filePath}`)
        if (res.ok) {
          const d = await res.json()
          currentSha = d.sha
        }
      }

      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: filePath,
          content: JSON.stringify(form, null, 2),
          message: `chore: atualiza conteúdo de ${pageTitle}`,
          sha: currentSha,
        }),
      })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Erro ao salvar')
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            {pageTitle}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(244,239,230,0.35)' }}>
            {filePath}
          </p>
        </div>
        <Button onClick={handleSave} loading={saving} size="sm">
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          Salvo com sucesso! O site será atualizado em instantes.
        </div>
      )}

      {/* Campos */}
      <div className="space-y-5">
        {fields.map(field => {
          const value = get(field.key) ?? ''
          if (field.type === 'image') {
            return (
              <ImageUploader
                key={field.key}
                label={field.label}
                value={value}
                onChange={url => set(field.key, url)}
              />
            )
          }
          if (field.type === 'textarea') {
            return (
              <Textarea
                key={field.key}
                label={field.label}
                value={value}
                onChange={e => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
              />
            )
          }
          return (
            <Input
              key={field.key}
              label={field.label}
              value={value}
              onChange={e => set(field.key, e.target.value)}
              placeholder={field.placeholder}
              type={field.type === 'url' ? 'url' : 'text'}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── Helper: setar valor em objeto aninhado por array de chaves ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setNested(obj: Record<string, any>, keys: string[], value: any): Record<string, any> {
  if (keys.length === 1) {
    obj[keys[0]] = value
    return obj
  }
  if (!obj[keys[0]] || typeof obj[keys[0]] !== 'object') {
    obj[keys[0]] = {}
  }
  obj[keys[0]] = setNested({ ...obj[keys[0]] }, keys.slice(1), value)
  return obj
}
