# ☕ A. Coffee — Status de Implementação

> Atualizado em: 10/08/2026

---

## ✅ Concluído

### Setup & Infraestrutura
- [x] Inicialização do projeto Next.js 15 + TypeScript + Tailwind CSS 4
- [x] Configuração do `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`
- [x] Instalação de todas as dependências (`next-auth`, `@tiptap/*`, `sharp`, `@octokit/rest`, `gray-matter`, `next-mdx-remote`)
- [x] `src/middleware.ts` — proteção das rotas `/admin/*`
- [x] `src/styles/globals.css` — design system com CSS variables (cores, tipografia)
- [x] `src/app/layout.tsx` — layout raiz com fontes (Playfair Display + Plus Jakarta Sans)
- [x] `src/app/not-found.tsx` — página 404
- [x] `src/app/error.tsx` — página de erro
- [x] `src/app/robots.ts` — robots.txt
- [x] `src/app/sitemap.ts` — sitemap.xml dinâmico

### Bibliotecas (`src/lib/`)
- [x] `src/lib/auth.ts` — configuração NextAuth v4 + GitHub OAuth + whitelist de admins
- [x] `src/lib/github.ts` — client Octokit: `getFileContent`, `putFileContent`, `deleteFile`, `listDirectory`
- [x] `src/lib/content.ts` — helpers de leitura de conteúdo: `getHomeContent`, `getAboutContent`, `getAllServices`, `getPostBySlug`, `getAllPosts`, `getPostSlugs`
- [x] `src/lib/utils.ts` — utilitários gerais
- [x] `src/lib/image.ts` — otimização de imagens com sharp: `optimizeAndSave` (WebP, max 1920px, q82), `deleteUpload`, `listUploads`

### Tipos (`src/types/`)
- [x] `src/types/content.ts` — interfaces: `SiteConfig`, `HomeContent`, `AboutContent`, `Service`, `Post`, `PostFrontmatter`
- [x] `src/types/index.ts` — re-exports gerais

### API Routes (`src/app/api/`)
- [x] `src/app/api/auth/[...nextauth]/route.ts` — handler NextAuth
- [x] `src/app/api/content/route.ts` — CRUD de conteúdo via GitHub API (GET, PUT, DELETE) com autenticação
- [x] `src/app/api/upload/route.ts` — upload (POST), listagem (GET) e deleção (DELETE) de imagens com autenticação e sanitização

### Componentes UI (`src/components/ui/`)
- [x] `Button.tsx` — variantes: `primary`, `secondary`, `ghost`, `danger`; tamanhos: `sm`, `md`, `lg`; estado `loading`
- [x] `Input.tsx` — `Input`, `Textarea`, `Select` com suporte a label, error e hint
- [x] `Modal.tsx` — fechar com ESC, backdrop blur, bloqueio de scroll do body
- [x] `Card.tsx` — variante hover opcional
- [x] `Loading.tsx` — spinner com `fullPage` opcional
- [x] `index.ts` — barrel exports

### Componentes Admin (`src/components/admin/`)
- [x] `Sidebar.tsx` — navegação lateral com active state e botão de logout
- [x] `ContentEditor.tsx` — editor TipTap com toolbar (headings, bold, italic, listas, blockquote, undo/redo)
- [x] `ImageUploader.tsx` — drag-and-drop + click para upload, preview, troca de imagem
- [x] `PostForm.tsx` — formulário completo de post: título, slug (auto-gerado), data, autor, categoria, tags, excerpt, imagem de capa, editor TipTap, salvar/excluir via API
- [x] `PageEditor.tsx` — editor genérico de páginas JSON com dot notation, suporte a campos text/textarea/image/url
- [x] `MediaGallery.tsx` — galeria de imagens com upload múltiplo, copiar URL, excluir, modo `selectable`

### Site Público (`src/app/(site)/`)
- [x] `layout.tsx` — layout com Header + Footer
- [x] `page.tsx` — Home: Hero, Destaques, Produtos em Destaque, Sobre Preview, Depoimentos, CTA Final
- [x] `sobre/page.tsx` — Sobre: Hero, História, Timeline, Valores, Equipe
- [x] `servicos/page.tsx` — Serviços: grid de produtos com filtros por categoria
- [x] `blog/page.tsx` — Blog: listagem de posts com cards
- [x] `blog/[slug]/page.tsx` — Página individual do post renderizado com `next-mdx-remote`
- [x] `contato/page.tsx` — Contato: formulário + informações de contato

### Componentes do Site (`src/components/site/`)
- [x] `Header.tsx` — navbar responsivo com links e CTA
- [x] `Footer.tsx` — rodapé com links, redes sociais e copyright
- [x] `ServicesGrid.tsx` — grid de serviços/produtos
- [x] `ContactForm.tsx` — formulário de contato com validação client-side

### Conteúdo Seed (`content/`)
- [x] `content/config/site.json`
- [x] `content/pages/home.json`
- [x] `content/pages/sobre.json`
- [x] `content/posts/arte-da-torra-artesanal.md`
- [x] `content/posts/sul-de-minas-vs-cerrado-mineiro.md`
- [x] `content/services/cafe-especial.json`
- [x] `content/services/assinatura-mensal.json`
- [x] `content/services/corporativo.json`

### Admin — Dashboard e Login
- [x] `src/app/admin/layout.tsx` — layout do painel com Sidebar + proteção de sessão
- [x] `src/app/admin/page.tsx` — Dashboard: stats (posts, rascunhos, serviços, páginas), atalhos rápidos, lista de posts recentes
- [x] `src/app/admin/login/page.tsx` — página de login com botão "Entrar com GitHub"

### Admin — Páginas de Gestão ✨ NOVO
- [x] `src/app/admin/posts/page.tsx` — Listagem de todos os posts com status badges e links para editar
- [x] `src/app/admin/posts/novo/page.tsx` — Formulário de criação de novo post (usa `PostForm`)
- [x] `src/app/admin/posts/[slug]/page.tsx` — Formulário de edição de post existente com `EditPostClient` wrapper
- [x] `src/app/admin/paginas/page.tsx` — Seletor de página com tabs (Home, Sobre, Contato) + `PageEditor`
- [x] `src/app/admin/midia/page.tsx` — Galeria de mídia com upload e gerenciamento

### Verificação
- [x] `npm run build` — compilação bem-sucedida sem erros de TypeScript/ESLint

---

## 🔜 Próximos passos

1. Configurar variáveis de ambiente na Vercel (`.env.example` já existe como referência)
2. Criar GitHub OAuth App + Personal Access Token
3. Deploy na Vercel
4. Testar fluxo completo: login → criar post → ver no blog
5. Conferir responsividade do admin no mobile
