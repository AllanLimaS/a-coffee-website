import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'A. Coffee — Café Artesanal Brasileiro',
    template: '%s | A. Coffee',
  },
  description:
    'Cafés especiais selecionados diretamente de pequenos produtores brasileiros. Torra artesanal semanal com entrega em todo o Brasil.',
  keywords: ['café especial', 'café artesanal', 'café brasileiro', 'torra artesanal', 'Sul de Minas', 'Cerrado Mineiro'],
  authors: [{ name: 'A. Coffee' }],
  creator: 'A. Coffee',
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'A. Coffee',
    title: 'A. Coffee — Café Artesanal Brasileiro',
    description: 'Cafés especiais selecionados diretamente de pequenos produtores brasileiros.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'A. Coffee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A. Coffee — Café Artesanal Brasileiro',
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
