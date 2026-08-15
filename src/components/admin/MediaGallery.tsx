'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'

interface Upload {
  filename: string
  publicPath: string
  sizeBytes: number
}

interface MediaGalleryProps {
  selectable?: boolean
  onSelect?: (publicPath: string) => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaGallery({ selectable = false, onSelect }: MediaGalleryProps) {
  const [uploads, setUploads] = useState<Upload[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchUploads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/upload')
      if (!res.ok) throw new Error('Falha ao carregar mídia')
      const data = await res.json()
      setUploads(data.uploads ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchUploads() }, [fetchUploads])

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError(null)
    try {
      for (const file of Array.from(files)) {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: form })
        if (!res.ok) {
          const d = await res.json()
          throw new Error(d.error ?? 'Erro ao fazer upload')
        }
      }
      await fetchUploads()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm(`Excluir "${filename}"?`)) return
    try {
      const res = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error ?? 'Erro ao excluir')
      }
      setUploads(prev => prev.filter(u => u.filename !== filename))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir')
    }
  }

  function copyUrl(publicPath: string) {
    navigator.clipboard.writeText(publicPath).then(() => {
      setCopied(publicPath)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loading label="Carregando mídia..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            Gerenciar Mídia
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(244,239,230,0.4)' }}>
            {uploads.length} imagem{uploads.length !== 1 ? 's' : ''} em public/uploads/
          </p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => handleUpload(e.target.files)}
          />
          <Button onClick={() => inputRef.current?.click()} loading={uploading}>
            {uploading ? 'Enviando...' : '+ Upload'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Grid de imagens */}
      {uploads.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 py-24 rounded-xl border border-dashed"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <svg className="w-10 h-10 text-[rgba(244,239,230,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm" style={{ color: 'rgba(244,239,230,0.4)' }}>
            Nenhuma imagem ainda. Faça o primeiro upload!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {uploads.map(upload => (
            <div
              key={upload.filename}
              className={[
                'group relative rounded-xl border overflow-hidden transition-all',
                selectable ? 'cursor-pointer hover:border-[var(--color-gold)]' : '',
              ].join(' ')}
              style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)' }}
              onClick={selectable && onSelect ? () => onSelect(upload.publicPath) : undefined}
            >
              {/* Thumbnail */}
              <div className="relative h-28 bg-black/20">
                <Image
                  src={upload.publicPath}
                  alt={upload.filename}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>

              {/* Info */}
              <div className="px-2 py-2">
                <p
                  className="text-xs truncate leading-tight"
                  style={{ color: 'rgba(244,239,230,0.7)' }}
                  title={upload.filename}
                >
                  {upload.filename}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: 'rgba(244,239,230,0.35)' }}>
                  {formatBytes(upload.sizeBytes)}
                </p>
              </div>

              {/* Actions overlay */}
              {!selectable && (
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(upload.publicPath)}
                    className="text-xs px-3 py-1.5 rounded-md font-medium w-full transition-colors"
                    style={{
                      backgroundColor: copied === upload.publicPath ? 'rgba(34,197,94,0.3)' : 'rgba(170,134,75,0.3)',
                      color: copied === upload.publicPath ? '#86efac' : 'var(--color-gold)',
                    }}
                  >
                    {copied === upload.publicPath ? '✓ Copiado!' : 'Copiar URL'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(upload.filename)}
                    className="text-xs px-3 py-1.5 rounded-md font-medium w-full text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
