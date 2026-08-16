import type { NextConfig } from 'next'

const securityHeaders = [
  // Previne clickjacking (ex: painel admin embutido em iframe malicioso)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Previne MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Controla informações de referência enviadas em requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restringe acesso a APIs de hardware/sensor desnecessárias
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Aplica em todas as rotas
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  serverExternalPackages: ['sharp'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
}

export default nextConfig
