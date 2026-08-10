# ☕ A. Coffee — Website + CMS

Site institucional da marca **A. Coffee** com CMS customizado integrado.

## Stack

| Camada           | Tecnologia                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 15 (App Router)            |
| Linguagem        | TypeScript                          |
| Auth             | NextAuth.js + GitHub OAuth          |
| Conteúdo         | JSON/Markdown no Git + GitHub API   |
| Imagens          | Git + sharp (otimização server-side)|
| Editor Rich Text | TipTap                              |
| Estilização      | Tailwind CSS 4                      |
| Deploy           | Vercel (free tier)                  |

## Estrutura

```
src/
├── app/
│   ├── (site)/           → Páginas públicas do site
│   │   ├── page.tsx          Home
│   │   ├── sobre/            Sobre nós / Nossa história
│   │   ├── servicos/         Produtos e serviços
│   │   ├── blog/             Blog / Novidades
│   │   └── contato/          Formulário de contato
│   │
│   ├── admin/            → Painel CMS (protegido)
│   │   ├── page.tsx          Dashboard
│   │   ├── paginas/          Gerenciar páginas
│   │   ├── posts/            Gerenciar posts do blog
│   │   └── midia/            Gerenciar imagens
│   │
│   └── api/              → API Routes
│       ├── auth/             NextAuth callbacks
│       ├── content/          CRUD via GitHub API
│       └── upload/           Upload + otimização de imagens
│
├── components/
│   ├── site/             → Componentes do site público
│   ├── admin/            → Componentes do painel CMS
│   └── ui/               → Componentes reutilizáveis (botões, inputs, etc.)
│
├── lib/                  → Utilitários, GitHub API client, helpers
├── types/                → Tipos TypeScript compartilhados
└── styles/               → Estilos globais

content/                  → Conteúdo do site (JSON/Markdown)
├── pages/                    Conteúdo das páginas
├── posts/                    Posts do blog
├── services/                 Serviços/produtos
└── config/                   Configurações gerais do site
```

## Desenvolvimento

```bash
npm run dev
```

## Deploy

Push para `main` → Vercel deploya automaticamente.
