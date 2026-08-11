'use client'

import { useRef, useState, DragEvent } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface ImageUploaderProps {
  value?: string
  onChange: (publicPath: string) => void
  label?: string
}

export default function ImageUploader({ value, onChange, label = 'Imagem de Capa' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  async function upload(file: File) {
    setError(null)
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erro ao fazer upload')
      onChange(data.publicPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    upload(files[0])
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: 'rgba(244,239,230,0.6)' }}
      >
        {label}
      </span>

      {/* Preview */}
      {value && (
        <div className="relative rounded-lg overflow-hidden h-40 border border-[rgba(255,255,255,0.1)]">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-black/60 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Remover imagem"
          >
            ×
          </button>
        </div>
      )}

      {/* Drop zone */}
      {!value && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 h-32 rounded-lg border-2 border-dashed cursor-pointer transition-colors"
          style={{
            borderColor: dragging ? 'var(--color-gold)' : 'rgba(255,255,255,0.15)',
            backgroundColor: dragging ? 'rgba(170,134,75,0.08)' : 'rgba(255,255,255,0.03)',
          }}
        >
          <span className="text-2xl">🖼️</span>
          <p className="text-xs text-center" style={{ color: 'rgba(244,239,230,0.5)' }}>
            {uploading ? 'Enviando...' : 'Arraste ou clique para enviar'}
            <br />
            <span style={{ color: 'rgba(244,239,230,0.3)' }}>JPG, PNG, WebP — máx. 10 MB</span>
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => inputRef.current?.click()}
          loading={uploading}
        >
          Trocar imagem
        </Button>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
