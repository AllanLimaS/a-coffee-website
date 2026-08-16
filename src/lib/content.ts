import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { SiteConfig, HomeContent, AboutContent, ContactContent, Service, Post, PostFrontmatter } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ── Helpers genéricos ──

function readJson<T>(filePath: string): T | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

// ── Configuração do site ──

export function getSiteConfig(): SiteConfig {
  const config = readJson<SiteConfig>(path.join(CONTENT_DIR, 'config', 'site.json'))
  if (!config) throw new Error('site.json não encontrado em content/config/')
  return config
}

// ── Páginas ──

export function getHomeContent(): HomeContent {
  const content = readJson<HomeContent>(path.join(CONTENT_DIR, 'pages', 'home.json'))
  if (!content) throw new Error('home.json não encontrado em content/pages/')
  return content
}

export function getAboutContent(): AboutContent {
  const content = readJson<AboutContent>(path.join(CONTENT_DIR, 'pages', 'sobre.json'))
  if (!content) throw new Error('sobre.json não encontrado em content/pages/')
  return content
}

export function getContactContent(): ContactContent {
  const content = readJson<ContactContent>(path.join(CONTENT_DIR, 'pages', 'contato.json'))
  if (!content) {
    return {
      title: 'Contato',
      subtitle: 'Tem alguma dúvida, sugestão ou quer saber mais sobre nossos cafés especiais? Adoramos conversar sobre café.',
      email: 'contato@acoffee.com.br',
      phone: '+55 11 99999-9999',
      address: 'Rua do Café, 123\nSão Paulo, SP',
      hours: 'Seg–Sex, 9h às 18h',
      instagramUrl: 'https://instagram.com/a.coffee',
      whatsappUrl: 'https://wa.me/5511999999999',
    }
  }
  return content
}

// ── Serviços ──

export function getAllServices(): Service[] {
  const dir = path.join(CONTENT_DIR, 'services')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  const services = files
    .map(file => readJson<Service>(path.join(dir, file)))
    .filter((s): s is Service => s !== null)

  return services.sort((a, b) => a.order - b.order)
}

export function getServiceBySlug(slug: string): Service | null {
  const safeSlug = path.basename(slug) // previne path traversal via "../"
  return readJson<Service>(path.join(CONTENT_DIR, 'services', `${safeSlug}.json`))
}

// ── Posts do Blog ──

export function getAllPosts(onlyPublished = true): Post[] {
  const dir = path.join(CONTENT_DIR, 'posts')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data } = matter(raw)
    return data as Post
  })

  const filtered = onlyPublished
    ? posts.filter(p => p.status === 'published')
    : posts

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const safeSlug = path.basename(slug) // previne path traversal via "../"
  const filePath = path.join(CONTENT_DIR, 'posts', `${safeSlug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as PostFrontmatter

  return {
    ...frontmatter,
    content, // Markdown bruto — será renderizado pelo componente
  }
}

export function getPostSlugs(): string[] {
  const dir = path.join(CONTENT_DIR, 'posts')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}
