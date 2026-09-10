import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

function getMetadataBase(): URL {
  const envUrl =
    process.env.NEXTAUTH_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  try {
    const formatted = envUrl.startsWith('http') ? envUrl : `https://${envUrl}`
    return new URL(formatted)
  } catch {
    return new URL('http://localhost:3000')
  }
}

export const metadata: Metadata = {
  title: {
    default: 'Café Ponto — Café Artesanal Brasileiro',
    template: '%s | Café Ponto',
  },
  description:
    'Cafés especiais selecionados diretamente de pequenos produtores brasileiros. Torra artesanal semanal com entrega em todo o Brasil.',
  keywords: ['café especial', 'café artesanal', 'café brasileiro', 'torra artesanal', 'Sul de Minas', 'Cerrado Mineiro'],
  authors: [{ name: 'Café Ponto' }],
  creator: 'Café Ponto',
  metadataBase: getMetadataBase(),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Café Ponto',
    title: 'Café Ponto — Café Artesanal Brasileiro',
    description: 'Cafés especiais selecionados diretamente de pequenos produtores brasileiros.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Café Ponto' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Café Ponto — Café Artesanal Brasileiro',
    description: 'Cafés especiais selecionados diretamente de pequenos produtores brasileiros.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  )
}