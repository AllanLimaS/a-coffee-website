import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getFileContent, putFileContent, deleteFile } from '@/lib/github'

// ── Proteção: apenas sessão autenticada ──
async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  return null
}

/**
 * GET /api/content?path=content/pages/home.json
 * Lê um arquivo do repositório via GitHub API.
 */
export async function GET(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const filePath = req.nextUrl.searchParams.get('path')
  if (!filePath) {
    return NextResponse.json({ error: 'Parâmetro "path" obrigatório' }, { status: 400 })
  }

  const result = await getFileContent(filePath)
  if (!result) {
    return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 })
  }

  return NextResponse.json({ content: result.content, sha: result.sha })
}

/**
 * PUT /api/content
 * Body: { path, content, message?, sha? }
 * Cria ou atualiza um arquivo via GitHub API.
 */
export async function PUT(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  let body: { path?: string; content?: string; message?: string; sha?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 })
  }

  const { path: filePath, content, message, sha } = body

  if (!filePath || content === undefined) {
    return NextResponse.json({ error: 'Campos "path" e "content" são obrigatórios' }, { status: 400 })
  }

  const commitMsg = message ?? `chore: atualiza ${filePath}`
  const ok = await putFileContent(filePath, content, commitMsg, sha)

  if (!ok) {
    return NextResponse.json({ error: 'Falha ao salvar no GitHub' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

/**
 * DELETE /api/content
 * Body: { path, sha, message? }
 * Remove um arquivo via GitHub API.
 */
export async function DELETE(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  let body: { path?: string; sha?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON inválido' }, { status: 400 })
  }

  const { path: filePath, sha, message } = body

  if (!filePath || !sha) {
    return NextResponse.json({ error: 'Campos "path" e "sha" são obrigatórios' }, { status: 400 })
  }

  const commitMsg = message ?? `chore: remove ${filePath}`
  const ok = await deleteFile(filePath, sha, commitMsg)

  if (!ok) {
    return NextResponse.json({ error: 'Falha ao deletar no GitHub' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
