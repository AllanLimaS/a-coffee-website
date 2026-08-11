# ☕ A. Coffee — Plano de Implementação

## 1. Visão Geral

Site institucional da marca de café **A. Coffee** com **CMS customizado integrado** (painel admin para gerenciar conteúdo).
Projeto único (monorepo) — um Next.js App que serve tanto o site público quanto o painel administrativo.

---

## 2. Stack Técnica

| Camada           | Tecnologia                            | Versão     |
| ---------------- | ------------------------------------- | ---------- |
| Framework        | Next.js (App Router)                  | 15+        |
| Linguagem        | TypeScript                            | 5+         |
| Auth             | NextAuth.js (Auth.js) + GitHub OAuth  | v5 (beta)  |
| Conteúdo         | JSON/Markdown no Git + GitHub API     | —          |
| Imagens          | Git + sharp (otimização server-side)  | —          |
| Editor Rich Text | TipTap                                | v2         |
| Estilização      | Tailwind CSS                          | v4         |
| Deploy           | Vercel (free tier)                    | —          |

### Dependências principais esperadas

```
next, react, react-dom
typescript, @types/react, @types/node
next-auth (v5)
@tiptap/react, @tiptap/starter-kit, @tiptap/extension-image
sharp
tailwindcss, @tailwindcss/postcss
octokit (@octokit/rest) — client GitHub API
gray-matter — parse frontmatter de Markdown
remark, remark-html ou next-mdx-remote — renderizar Markdown
```

---

## 3. Arquitetura

### 3.1 Fluxo Geral

```
Admin loga (NextAuth + GitHub OAuth)
  → Edita conteúdo no painel /admin (TipTap para rich text)
    → Ao salvar: API Route recebe os dados
      → sharp otimiza imagens (se houver upload)
        → Octokit commita JSON/MD + imagens no repositório via GitHub API
          → Vercel detecta push na branch main → rebuild automático (SSG/ISR)
            → Site público atualizado com novo conteúdo
```

### 3.2 Armazenamento de Conteúdo (Git-Based)

Todo conteúdo do site é armazenado como arquivos JSON ou Markdown dentro da pasta `content/`:

```
content/
├── config/
│   └── site.json         ← Configurações globais (nome do site, redes sociais, etc.)
│
├── pages/
│   ├── home.json         ← Conteúdo da Home (hero, seções, CTAs)
│   ├── sobre.json        ← Conteúdo da página Sobre
│   └── contato.json      ← Conteúdo da página Contato
│
├── posts/
│   ├── primeiro-post.md  ← Post de blog em Markdown com frontmatter
│   └── segundo-post.md
│
└── services/
    ├── cafe-especial.json
    ├── assinatura.json
    └── corporativo.json
```

### 3.3 Armazenamento de Imagens

- Imagens ficam em `public/uploads/` dentro do próprio repositório Git.
- Antes de commitar, o servidor processa com `sharp`:
  - Converte para **WebP**
  - Redimensiona para no máximo **1920px** de largura
  - Comprime com qualidade **80-85%**
- O componente `<Image>` do Next.js aplica otimização adicional ao servir.
- Tamanho estimado total: 3-10MB (irrelevante para os 5GB de limite do GitHub).

### 3.4 Autenticação

- **NextAuth.js v5** com provider **GitHub OAuth**.
- Apenas usuários autorizados (lista de GitHub usernames em variável de ambiente) podem acessar `/admin`.
- Middleware do Next.js protege todas as rotas `/admin/*`.
- Fluxo: Login via GitHub → NextAuth valida → verifica se username está na whitelist → libera acesso ao painel.

**Variáveis de ambiente necessárias:**

```env
# NextAuth
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=uma-chave-secreta-aleatoria

# GitHub OAuth App
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# GitHub API (para commits de conteúdo)
GITHUB_TOKEN=ghp_...           # Personal Access Token com permissão de escrita no repo
GITHUB_OWNER=AllanLimaS        # Username do GitHub
GITHUB_REPO=a-coffee-website   # Nome do repositório

# Admin whitelist
ADMIN_USERS=AllanLimaS         # Usernames separados por vírgula
```

---

## 4. Páginas do Site Público

### 4.1 Home (`/`)
- **Hero Section**: imagem grande de fundo (café sendo servido), título "A. Coffee", tagline, CTA.
- **Destaques**: 3 cards com diferenciais da marca (origem, torra artesanal, sustentabilidade).
- **Produtos em destaque**: grid com 3 produtos principais com imagem, nome e preço.
- **Sobre (resumo)**: breve texto + link para a página completa.
- **Depoimentos**: carrossel de depoimentos de clientes.
- **CTA final**: chamada para contato ou assinatura.

### 4.2 Sobre Nós (`/sobre`)
- **Hero**: imagem de fazenda/produção de café.
- **Nossa História**: timeline interativa com marcos da marca.
- **Nossos Valores**: cards com ícones (qualidade, sustentabilidade, comunidade).
- **Equipe**: grid com fotos e nomes dos fundadores/equipe.

### 4.3 Produtos/Serviços (`/servicos`)
- **Grid de Produtos/Serviços**: cards com imagem, título, descrição curta e link para detalhes.
- **Categorias**: filtros por tipo (cafés, acessórios, assinaturas, corporativo).
- **Detalhe do serviço** (modal ou página expandida): descrição completa, galeria de imagens.

### 4.4 Blog (`/blog`)
- **Listagem**: cards com thumbnail, título, data, resumo e tags.
- **Filtros**: por categoria/tag.
- **Página do post** (`/blog/[slug]`): conteúdo completo renderizado a partir do Markdown, autor, data, imagens, compartilhamento.

### 4.5 Contato (`/contato`)
- **Formulário**: nome, e-mail, telefone, mensagem.
- **Informações de contato**: endereço, telefone, e-mail, redes sociais.
- **Mapa**: embed do Google Maps (opcional).
- **Envio de e-mail**: API Route que envia e-mail (opções: Resend free tier 3k/mês, ou apenas simular o envio para o portfólio).

### 4.6 Elementos Globais
- **Header/Navbar**: logo, links de navegação, botão CTA.
- **Footer**: logo, links, redes sociais, copyright.
- **SEO**: meta tags dinâmicas por página, Open Graph, sitemap.xml.

---

## 5. Painel CMS (Admin)

### 5.1 Dashboard (`/admin`)
- Visão geral: total de páginas, posts publicados, rascunhos, imagens.
- Atalhos rápidos: "Novo Post", "Editar Home", "Upload de Mídia".
- Último conteúdo editado.

### 5.2 Gerenciar Páginas (`/admin/paginas`)
- Listar páginas editáveis (Home, Sobre, Contato, Serviços).
- Editar conteúdo de cada seção com formulários dinâmicos.
- Campos: textos, imagens (upload), links, toggles de visibilidade.
- Botão "Salvar" → commita no Git via GitHub API.

### 5.3 Gerenciar Posts (`/admin/posts`)
- Listar posts (título, data, status: rascunho/publicado).
- Criar novo post: título, slug (auto-gerado), categoria, tags, conteúdo (editor TipTap), imagem de capa.
- Editar post existente.
- Deletar post.
- Preview antes de publicar.

### 5.4 Gerenciar Mídia (`/admin/midia`)
- Galeria de imagens já uploadadas (lidas de `public/uploads/`).
- Upload de novas imagens com otimização automática (sharp).
- Deletar imagens.
- Copiar URL da imagem para uso no editor.

### 5.5 UI do Painel Admin
- Design limpo e funcional (dashboard style).
- Sidebar com navegação.
- Responsivo (funcionar no celular é desejável mas não prioritário).
- Tema: escuro por padrão, com cores neutras e acentos de cor da marca.

---

## 6. Content Schema (Estrutura dos JSON/Markdown)

### 6.1 `content/config/site.json`
```json
{
  "siteName": "A. Coffee",
  "tagline": "Café artesanal com alma brasileira.",
  "logo": "/images/logo.png",
  "socialLinks": {
    "instagram": "https://instagram.com/a.coffee",
    "facebook": "",
    "whatsapp": "5511999999999"
  },
  "contactInfo": {
    "email": "contato@acoffee.com.br",
    "phone": "+55 11 99999-9999",
    "address": "Rua do Café, 123 — São Paulo, SP"
  }
}
```

### 6.2 `content/pages/home.json`
```json
{
  "hero": {
    "title": "A. Coffee",
    "subtitle": "Do grão à xícara, cada detalhe importa.",
    "backgroundImage": "/uploads/hero-home.webp",
    "ctaText": "Conheça nossos cafés",
    "ctaLink": "/servicos"
  },
  "highlights": [
    {
      "icon": "origin",
      "title": "Origem Rastreável",
      "description": "Cafés selecionados diretamente de pequenos produtores."
    }
  ],
  "featuredProducts": ["cafe-especial", "assinatura", "corporativo"],
  "aboutPreview": {
    "text": "Nascemos da paixão por um café que conta histórias...",
    "image": "/uploads/about-preview.webp"
  },
  "testimonials": [
    {
      "name": "Maria S.",
      "text": "O melhor café que já provei.",
      "role": "Cliente desde 2023"
    }
  ]
}
```

### 6.3 `content/posts/exemplo-post.md`
```markdown
---
title: "A arte da torra artesanal"
slug: "arte-da-torra-artesanal"
date: "2026-08-10"
author: "A. Coffee"
category: "Processo"
tags: ["torra", "artesanal", "café"]
coverImage: "/uploads/post-torra.webp"
excerpt: "Descubra como o processo de torra transforma grãos verdes em sabor."
status: "published"
---

Conteúdo do post em Markdown aqui...
```

### 6.4 `content/services/cafe-especial.json`
```json
{
  "title": "Café Especial",
  "slug": "cafe-especial",
  "shortDescription": "Grãos selecionados, torra artesanal.",
  "fullDescription": "Nosso café especial é cultivado...",
  "image": "/uploads/cafe-especial.webp",
  "gallery": ["/uploads/cafe-1.webp", "/uploads/cafe-2.webp"],
  "price": "R$ 45,90",
  "category": "cafes",
  "featured": true,
  "order": 1
}
```

---

## 7. Design Direction & Design System

> [!NOTE]
> O guia completo e especificação técnica dos tokens visuais está disponível em [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md).

### 7.1 Paleta de Cores Oficial
- **Canvas / Background**: `#F4EFE6` (Creme Pergaminho Quente)
- **Primária Dark**: `#233126` (Verde Floresta Profundo)
- **Acento / Accent**: `#AA864B` (Amber Gold / Latão Dourado)
- **Texto / Contraste**: `#191614` (Preto Espresso Tostado)
- **Superfície Cards**: `#FFFFFF` (Branco Puro)
- **Bordas**: `#DED6C7` (Cinza Pergaminho Suave)

### 7.2 Tipografia Oficial
- **Headlines / Títulos**: **`Playfair Display`** (Google Fonts — Serif editorial clássica e sofisticada, com variações itálicas expressivas)
- **Body / Corpo de Texto**: **`Plus Jakarta Sans`** (Google Fonts — Sans-serif moderna, limpa e legível)

### 7.3 Estilo Visual & Referências
- **BENS CAFÉ**: Layout split na Hero (bloco verde floresta `#233126` com texto impactante + foto alta definição), Marquee Ticker banner animado no topo (`A. COFFEE ROASTERS • TORRA SEMANAL ARTESANAL`), cards de produtos em grid.
- **Coffee Collective**: Minimalismo nórdico, respiro visual, badges de origem (*Sul de Minas*, *Cerrado Mineiro*, *Chapada Diamantina*) e tags de notas sensoriais (*ex: 🍫 Chocolate Amargo, 🌰 Avelã, 🍊 Acidez Cítrica*).
- **Componentes Chave**: Guia interativo de métodos de extração do barista (V60, Espresso, Prensa Francesa), botões em Amber Gold (`#AA864B`), badges de pontuação SCA (86+).

---

## 8. Estrutura de Pastas (Referência Completa)

```
a-coffee-website/
├── .gitignore
├── README.md
├── PLANO.md                    ← Este arquivo
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
│
├── content/                    ← Conteúdo gerenciado pelo CMS
│   ├── config/
│   │   └── site.json
│   ├── pages/
│   │   ├── home.json
│   │   ├── sobre.json
│   │   └── contato.json
│   ├── posts/
│   │   └── *.md
│   └── services/
│       └── *.json
│
├── public/
│   ├── images/                 ← Assets fixos (logo, ícones, etc.)
│   └── uploads/                ← Imagens gerenciadas pelo CMS
│
└── src/
    ├── app/
    │   ├── layout.tsx          ← Layout raiz (fonts, metadata global)
    │   ├── (site)/             ← Route group do site público
    │   │   ├── layout.tsx      ← Layout com header + footer
    │   │   ├── page.tsx        ← Home
    │   │   ├── sobre/page.tsx
    │   │   ├── servicos/page.tsx
    │   │   ├── blog/page.tsx
    │   │   ├── blog/[slug]/page.tsx
    │   │   └── contato/page.tsx
    │   │
    │   ├── admin/              ← Route group do CMS
    │   │   ├── layout.tsx      ← Layout com sidebar + proteção auth
    │   │   ├── page.tsx        ← Dashboard
    │   │   ├── paginas/page.tsx
    │   │   ├── posts/page.tsx
    │   │   ├── posts/novo/page.tsx
    │   │   ├── posts/[slug]/page.tsx
    │   │   └── midia/page.tsx
    │   │
    │   └── api/
    │       ├── auth/[...nextauth]/route.ts  ← NextAuth handler
    │       ├── content/route.ts             ← CRUD de conteúdo (GitHub API)
    │       └── upload/route.ts              ← Upload + otimização de imagens
    │
    ├── components/
    │   ├── site/               ← Componentes do site público
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Hero.tsx
    │   │   ├── ServiceCard.tsx
    │   │   ├── PostCard.tsx
    │   │   ├── Testimonials.tsx
    │   │   └── ContactForm.tsx
    │   │
    │   ├── admin/              ← Componentes do CMS
    │   │   ├── Sidebar.tsx
    │   │   ├── ContentEditor.tsx
    │   │   ├── ImageUploader.tsx
    │   │   ├── PostForm.tsx
    │   │   ├── PageEditor.tsx
    │   │   └── MediaGallery.tsx
    │   │
    │   └── ui/                 ← Componentes reutilizáveis
    │       ├── Button.tsx
    │       ├── Input.tsx
    │       ├── Modal.tsx
    │       ├── Card.tsx
    │       └── Loading.tsx
    │
    ├── lib/
    │   ├── auth.ts             ← Config do NextAuth
    │   ├── github.ts           ← Client da GitHub API (Octokit)
    │   ├── content.ts          ← Helpers para ler/escrever conteúdo
    │   ├── image.ts            ← Otimização de imagens com sharp
    │   └── utils.ts            ← Utilidades gerais
    │
    ├── types/
    │   ├── content.ts          ← Tipos dos JSONs de conteúdo
    │   └── index.ts            ← Tipos gerais
    │
    └── styles/
        └── globals.css         ← Estilos globais + Tailwind directives
```

---

## 9. Ordem de Implementação Sugerida

### Fase 1 — Setup & Infraestrutura
1. Inicializar Next.js + TypeScript + Tailwind CSS 4
2. Configurar NextAuth.js com GitHub OAuth
3. Criar middleware de proteção das rotas `/admin`
4. Configurar Octokit (GitHub API client)
5. Criar helpers de leitura/escrita de conteúdo

### Fase 2 — CMS (Admin Panel)
6. Layout do admin (sidebar + topbar)
7. Dashboard com visão geral
8. CRUD de posts (criar, editar, listar, deletar)
9. Editor TipTap integrado
10. Upload de imagens com otimização (sharp)
11. Galeria de mídia
12. Editor de páginas (Home, Sobre, etc.)

### Fase 3 — Site Público (Front-End)
13. Layout global (header + footer)
14. Página Home com todas as seções
15. Página Sobre com timeline
16. Página Serviços/Produtos
17. Página Blog (listagem + post individual)
18. Página Contato com formulário
19. SEO (meta tags, Open Graph, sitemap)

### Fase 4 — Polish
20. Animações e micro-interações
21. Responsividade (mobile-first)
22. Performance (Lighthouse > 90)
23. Conteúdo fictício final (textos, imagens geradas)
24. Deploy na Vercel

---

## 10. Configuração de Deploy (Vercel)

1. Conectar repositório GitHub à Vercel.
2. Configurar variáveis de ambiente (listadas na seção 3.4).
3. Criar GitHub OAuth App:
   - Settings > Developer Settings > OAuth Apps > New.
   - Homepage URL: `https://seu-dominio.vercel.app`
   - Callback URL: `https://seu-dominio.vercel.app/api/auth/callback/github`
4. Gerar GitHub Personal Access Token com permissão `repo` (para o Octokit commitar).
5. Deploy automático: cada push na `main` rebuilda o site.
