import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const adminUsers = (process.env.ADMIN_USERS ?? '').split(',').map(u => u.trim()).filter(Boolean)

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Permite apenas usuários da whitelist
      const username = (profile as { login?: string })?.login ?? ''
      return adminUsers.includes(username)
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
