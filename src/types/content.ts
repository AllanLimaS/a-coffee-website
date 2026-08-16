// ── Configuração global do site ──
export interface SiteConfig {
  siteName: string
  tagline: string
  logo: string
  socialLinks: {
    instagram: string
    facebook: string
    whatsapp: string
  }
  contactInfo: {
    email: string
    phone: string
    address: string
  }
}

// ── Conteúdo da Home ──
export interface HomeContent {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
    backgroundVideo?: string
    ctaText: string
    ctaLink: string
  }
  highlights: Array<{
    icon: string
    title: string
    description: string
  }>
  featuredProducts: string[]
  aboutPreview: {
    text: string
    image: string
  }
  testimonials: Array<{
    name: string
    text: string
    role: string
    avatar?: string
  }>
  cta: {
    title: string
    subtitle: string
    buttonText: string
    buttonLink: string
  }
}

// ── Conteúdo da página Sobre ──
export interface AboutContent {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  story: {
    title: string
    paragraphs: string[]
    image: string
  }
  timeline: Array<{
    year: string
    title: string
    description: string
  }>
  values: Array<{
    icon: string
    title: string
    description: string
  }>
  team: Array<{
    name: string
    role: string
    bio: string
    photo: string
  }>
}

// ── Conteúdo da página Contato ──
export interface ContactContent {
  title: string
  subtitle: string
  email: string
  phone: string
  address: string
  hours: string
  instagramUrl: string
  whatsappUrl: string
  mapUrl?: string
}

// ── Serviço / Produto ──
export interface Service {
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  image: string
  gallery: string[]
  price: string
  priceUnit?: string
  category: 'cafes' | 'acessorios' | 'assinaturas' | 'corporativo'
  featured: boolean
  order: number
  badges?: string[]
  sensoryNotes?: string[]
}

// ── Post do Blog ──
export interface Post {
  title: string
  slug: string
  date: string
  author: string
  category: string
  tags: string[]
  coverImage: string
  excerpt: string
  status: 'published' | 'draft'
  content?: string // HTML renderizado do Markdown
}

// ── Frontmatter bruto do Markdown ──
export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  author: string
  category: string
  tags: string[]
  coverImage: string
  excerpt: string
  status: 'published' | 'draft'
}
