import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getFileContent, putFileContent, deleteFile } from '@/lib/github'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
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

// ── Rate limit: 60 req/min por IP ──
function checkRateLimit(req: NextRequest) {
  const ip = getClientIp(req)
  const result = rateLimit(`content:${ip}`, { limit: 60, windowMs: 60_000 })
  if (!result.allowed) {
    const retryAfter = Math.ceil(result.retryAfterMs / 1000)
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em instantes.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }
  return null
}

// ── Proteção: path traversal ──
// Apenas caminhos dentro dessas pastas são permitidos.
const ALLOWED_PREFIXES = ['content/', 'public/uploads/']

function assertSafePath(filePath: string): void {
  // Normaliza separadores e resolve sequências ".."
  const normalized = path.posix.normalize(filePath.replace(/\\/g, '/'))

  const isAllowed = ALLOWED_PREFIXES.some(prefix => normalized.startsWith(prefix))

  if (!isAllowed || normalized.includes('..')) {
    throw new Error(`Caminho não permitido: "${filePath}"`)
  }
}

/**
 * GET /api/content?path=content/pages/home.json
 * Lê o conteúdo (primeiro do disco local, depois fallback GitHub API).
 */
export async function GET(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const limited = checkRateLimit(req)
  if (limited) return limited

  const filePath = req.nextUrl.searchParams.get('path')
  if (!filePath) {
    return NextResponse.json({ error: 'Parâmetro "path" obrigatório' }, { status: 400 })
  }

  try {
    assertSafePath(filePath)
  } catch {
    return NextResponse.json({ error: 'Caminho não permitido' }, { status: 403 })
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

  const limited = checkRateLimit(req)
  if (limited) return limited

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

  try {
    assertSafePath(filePath)
  } catch {
    return NextResponse.json({ error: 'Caminho não permitido' }, { status: 403 })
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

  const limited = checkRateLimit(req)
  if (limited) return limited

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

  try {
    assertSafePath(filePath)
  } catch {
    return NextResponse.json({ error: 'Caminho não permitido' }, { status: 403 })
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
