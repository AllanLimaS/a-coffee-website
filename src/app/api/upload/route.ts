import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { optimizeAndSave, deleteUpload, listUploads } from '@/lib/image'

// ── Proteção: apenas sessão autenticada ──
async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  return null
}

/**
 * GET /api/upload
 * Lista todas as imagens em public/uploads/.
 */
export async function GET() {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const uploads = listUploads()
  return NextResponse.json({ uploads })
}

/**
 * POST /api/upload
 * multipart/form-data com campo "file".
 * Otimiza (WebP, max 1920px, q82) e salva em public/uploads/.
 */
export async function POST(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Body multipart/form-data inválido' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Campo "file" obrigatório' }, { status: 400 })
  }

  // Validar tipo de imagem
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/tiff']
  if (!validTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Tipo de arquivo não suportado: ${file.type}` },
      { status: 400 }
    )
  }

  // Tamanho máximo: 10 MB
  const MAX_SIZE = 10 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Arquivo muito grande (máximo 10 MB)' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const result = await optimizeAndSave(buffer, file.name)
    return NextResponse.json({ success: true, ...result })
  } catch (err) {
    console.error('[upload] optimizeAndSave error:', err)
    return NextResponse.json({ error: 'Erro ao processar imagem' }, { status: 500 })
  }
}

/**
 * DELETE /api/upload
 * Body: { filename: string }
 * Remove um arquivo de public/uploads/.
 */
export async function DELETE(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  let body: { filename?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 })
  }

  if (!body.filename) {
    return NextResponse.json({ error: 'Campo "filename" obrigatório' }, { status: 400 })
  }

  // Prevenir path traversal
  const safeFilename = body.filename.replace(/[^a-zA-Z0-9._-]/g, '')
  if (safeFilename !== body.filename) {
    return NextResponse.json({ error: 'Nome de arquivo inválido' }, { status: 400 })
  }

  const ok = deleteUpload(safeFilename)
  if (!ok) {
    return NextResponse.json({ error: 'Falha ao deletar arquivo' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
