import { withAuth } from 'next-auth/middleware'

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET || 'a-coffee-website-fallback-secret-key-32chars-min',
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === '/admin/login') {
        return true
      }
      return !!token
    },
  },
  pages: {
    signIn: '/admin/login',
  },
})

export const config = {
  matcher: ['/admin/:path*'],
}

