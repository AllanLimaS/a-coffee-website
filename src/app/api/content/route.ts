import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getFileContent, putFileContent, deleteFile } from '@/lib/github'
import fs from 'fs'
import path from 'path'

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
 * Lê o conteúdo (primeiro do disco local, depois fallback GitHub API).
 */
export async function GET(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const filePath = req.nextUrl.searchParams.get('path')
  if (!filePath) {
    return NextResponse.json({ error: 'Parâmetro "path" obrigatório' }, { status: 400 })
  }

  // 1. Tentar ler do sistema de arquivos local primeiro
  try {
    const fullPath = path.join(process.cwd(), filePath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      return NextResponse.json({ content, sha: '' })
    }
  } catch (err) {
    console.error('[content api] Erro ao ler arquivo local:', err)
  }

  // 2. Fallback: buscar na GitHub API
  if (process.env.GITHUB_TOKEN) {
    const result = await getFileContent(filePath)
    if (result) {
      return NextResponse.json({ content: result.content, sha: result.sha })
    }
  }

  return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 404 })
}

/**
 * PUT /api/content
 * Body: { path, content, message?, sha? }
 * Salva no disco local (atualização imediata no localhost) E envia commit pro GitHub.
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

  // 1. Salvar no sistema de arquivos local
  try {
    const fullPath = path.join(process.cwd(), filePath)
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(fullPath, content, 'utf-8')
  } catch (err) {
    console.error('[content api] Erro ao escrever arquivo local:', err)
  }

  // 2. Enviar commit pro GitHub (se o token estiver configurado)
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'your-github-personal-access-token') {
    const commitMsg = message ?? `chore: atualiza ${filePath}`
    await putFileContent(filePath, content, commitMsg, sha)
  }

  return NextResponse.json({ success: true })
}

/**
 * DELETE /api/content
 * Body: { path, sha?, message? }
 * Exclui do disco local E do GitHub.
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

  if (!filePath) {
    return NextResponse.json({ error: 'Campo "path" obrigatório' }, { status: 400 })
  }

  // 1. Remover do disco local
  try {
    const fullPath = path.join(process.cwd(), filePath)
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
    }
  } catch (err) {
    console.error('[content api] Erro ao deletar arquivo local:', err)
  }

  // 2. Remover do GitHub (se tiver token)
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'your-github-personal-access-token' && sha) {
    const commitMsg = message ?? `chore: remove ${filePath}`
    await deleteFile(filePath, sha, commitMsg)
  }

  return NextResponse.json({ success: true })
}
