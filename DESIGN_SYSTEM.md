# ☕ A. Coffee — Design System & Especificações Visuais

Documento oficial de especificação de Design, Identidade de Marca, Guia de Estilo e Tokens Visuais do projeto **A. Coffee**.

---

## 1. Identidade da Marca (Branding & Positioning)

- **Nome da Marca**: `A. Coffee` (ou `A. Coffee Roasters`)
- **Slogan**: *Crafted with Precision. Brewed for Everyday.*
- **Conceito**: Torrefação institucional de café de especialidade (*specialty coffee*) de alto padrão. Une a força tipográfica e layout estruturado com a elegância do minimalismo nórdico e a transparência do comércio direto com produtores (*direct trade*).

---

## 2. Referências de Design (Benchmarking Visual)

1. **BENS CAFÉ (Layout Structure & Impact)**:
   - **Marquee Ticker Banner**: Faixa animada contínua no topo (`A. COFFEE ROASTERS • TORRA SEMANAL ARTESANAL`).
   - **Hero Section Dividida (Split Layout)**: Bloco container de cor sólida com texto de grande impacto à esquerda + fotografia realista de alta resolução da cafeteria à direita.
   - **Cards de Produtos**: Fotos de destaque com tags flutuantes de origem e preços destacados.

2. **Coffee Collective (Dinamarca - Nordic Minimalism)**:
   - **Respiro Visual & Grid Limpo**: Espaçamento amplo e hierarquia clara.
   - **Badges de Origem & Notas Sensoriais**: Identificação discreta de aromas e sabores por lote (*ex: Chocolate Amargo, Avelã, Acidez Cítrica, Floral*).

---

## 3. Tokens de Cores (Color Palette)

| Categoria | Token CSS | Código Hex | Descrição & Uso |
| :--- | :--- | :--- | :--- |
| **Canvas / Background** | `--color-canvas` | `#F4EFE6` | Creme / Pergaminho Quente — Fundo principal acolhedor. |
| **Canvas Secundário** | `--color-canvas-dark` | `#E8E0D2` | Creme escurecido para containers secundários e navegação. |
| **Primária Dark** | `--color-forest` | `#233126` | Verde Floresta Profundo — Containers hero, rodapé e seções de contraste. |
| **Destaque / Accent** | `--color-accent` | `#AA864B` | **Amber Gold (Latão Dourado)** — Botões principais, preços, hovers e badges. |
| **Accent Hover** | `--color-accent-hover` | `#8F6F3A` | Tom escurecido para estado de hover nos botões de destaque. |
| **Texto / Contraste** | `--color-espresso` | `#191614` | Preto Espresso Tostado — Leitura principal de parágrafos e títulos. |
| **Superfície Cards** | `--color-surface` | `#FFFFFF` | Branco puro para fundos de cards e seções destacadas. |
| **Texto Suave** | `--color-muted` | `#766E65` | Cinza terroso para subtítulos, metadados e legendas. |
| **Bordas** | `--color-border` | `#DED6C7` | Linhas finas de divisão e bordas sutis de cards. |

---

## 4. Tipografia (Typography System)

### 4.1 Fontes Selecionadas (Google Fonts)

* **Títulos & Headings**: **`Playfair Display`** (Serif clássica, luxuosa e editorial)
  * *Uso*: Logo, títulos de páginas, headings de seção, destaques em itálico e marquee.
  * *Pesos*: `700` (Bold) para títulos principais, `600 Italic` para citações e destaques.
* **Corpo de Texto & UI**: **`Plus Jakarta Sans`** (Sans-serif moderna e legível)
  * *Uso*: Parágrafos, botões, navegação, inputs de formulário, especificações técnicas.
  * *Pesos*: `400` (Regular), `600` (Semi-Bold), `700` (Bold).

### 4.2 Escala Tipográfica

| Nível | Fonte | Tamanho | Peso / Estilo | Aplicação |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `Playfair Display` | 3.8rem (60px) | 700 (Bold) | Título principal da Hero Section |
| **H1 Section Title** | `Playfair Display` | 2.6rem (41px) | 700 (Bold) | Títulos das seções principais |
| **H2 Subtitle** | `Playfair Display` | 1.75rem (28px) | 600 (Italic) | Subtítulos e frases de destaque |
| **H3 Card Title** | `Playfair Display` | 1.4rem (22px) | 700 (Bold) | Nomes de grãos e títulos de cards |
| **Body Large** | `Plus Jakarta Sans` | 1.1rem (17.5px) | 400 (Regular) | Textos introdução e manifesto |
| **Body Base** | `Plus Jakarta Sans` | 0.95rem (15px) | 400 (Regular) | Parágrafos e descrição de produtos |
| **Meta / Small** | `Plus Jakarta Sans` | 0.85rem (13.5px) | 600 / 700 | Badges, tags de sabor e notas de rodapé |

---

## 5. Componentes & Padrões Visuais (UI Specs)

### 5.1 Banner Marquee Ticker
- **Fundo**: Verde Floresta (`#233126`)
- **Texto**: Creme Pergaminho (`#F4EFE6`) em `Playfair Display` 600, separado por pontos em Amber Gold (`#AA864B`).
- **Comportamento**: Animação de scroll contínuo e infinito (`marqueeScroll 24s linear infinite`).

### 5.2 Hero Section (Split Layout)
- **Container Esquerdo**: Fundo Verde Floresta (`#233126`), bordas arredondadas `20px`, padding generoso (`4rem`).
  - Headline com palavra de destaque em itálico com a cor Amber Gold (`#AA864B`).
  - Botão Primário: Amber Gold (`#AA864B`) com texto branco.
  - Botão Secundário: Outline transparente com borda suave (`rgba(244, 239, 230, 0.4)`).
- **Container Direito**: Imagem em alta resolução do interior da torrefação/cafeteria com overlay desfocado no canto inferior (*Showroom & Torrefação*).

### 5.3 Badges de Notas Sensoriais (Flavor Tags)
- **Fundo**: `rgba(170, 134, 75, 0.12)` (Amber Gold translúcido)
- **Borda**: `1px solid rgba(170, 134, 75, 0.25)`
- **Texto**: `#AA864B` em `Plus Jakarta Sans` 600
- Exemplo: `🍫 Chocolate Amargo`, `🌰 Avelã`, `🍯 Caramelo`, `🍊 Acidez Cítrica`, `🌿 Floral`

### 5.4 Cards de Produtos (Grãos & Lotes)
- **Fundo**: Branco (`#FFFFFF`) com borda `#DED6C7` e cantos de `20px`.
- **Efeito Hover**: Translação vertical suave (`translateY(-6px)`), sombra elevada (`shadow-hover`) e borda acentuada em Amber Gold (`#AA864B`).
- **Header do Card**: Imagem do produto em container `#F4EFE6` com badge flutuante de origem (`Sul de Minas`, `Cerrado Mineiro`, `Chapada Diamantina`) em Verde Floresta.

### 5.5 Guia Interativo de Extração (Barista Methods)
- **Fundo**: Verde Floresta (`#233126`) com abas chaveáveis (*V60 / Filtrado*, *Espresso Bar*, *Prensa Francesa*).
- **Especificações**: Grid 2x2 com cards translúcidos mostrando Proporção, Moagem, Temperatura e Tempo.

---

## 6. Recursos Visuais & Imagens

As imagens do projeto devem seguir a estética realista de cafeteria artesanal:
1. **Hero**: Balcão de madeira escura, paredes em verde floresta, máquina espresso profissional e xícaras de cerâmica.
2. **Produtos**: Pacote de café em papel craft minimalista com rótulo terracota/dourado e grãos espalhados.
3. **Extração**: Chícara artesanal de espresso com crema dourada abundante e textura cremosa.
