import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

// ── Validação de variáveis de ambiente ──
if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32) {
  console.warn(
    '[auth] AVISO: NEXTAUTH_SECRET não está definido ou possui menos de 32 caracteres. ' +
    'Defina uma chave segura nas variáveis de ambiente da Vercel para produção.'
  )
}

const adminUsers = (process.env.ADMIN_USERS ?? '').split(',').map(u => u.trim()).filter(Boolean)

if (adminUsers.length === 0) {
  console.warn(
    '[auth] ATENÇÃO: ADMIN_USERS está vazio ou não definido. ' +
    'Nenhum usuário conseguirá fazer login no painel administrativo.'
  )
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'a-coffee-website-fallback-secret-key-32chars-min',
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Permite apenas usuários da whitelist (comparação case-insensitive)
      const username = ((profile as { login?: string })?.login ?? '').toLowerCase()
      return adminUsers.some(u => u.toLowerCase() === username)
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        ;(session.user as typeof session.user & { username: string }).username =
          (token as { login?: string }).login ?? ''
      }
      return session
    },
    async jwt({ token, profile }) {
      if (profile) {
        ;(token as typeof token & { login?: string }).login =
          (profile as { login?: string }).login ?? ''
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
}
