'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const NAV = [
  { icon: '🏠', label: 'Dashboard', href: '/admin' },
  { icon: '📝', label: 'Posts', href: '/admin/posts' },
  { icon: '📄', label: 'Páginas', href: '/admin/paginas' },
  { icon: '🖼️', label: 'Mídia', href: '/admin/midia' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-60 shrink-0 flex flex-col h-full border-r"
      style={{
        backgroundColor: 'var(--color-espresso)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <div
        className="px-6 py-5 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <Link href="/admin">
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-canvas)' }}
          >
            A. Coffee
          </span>
          <span
            className="block text-xs mt-0.5"
            style={{ color: 'rgba(244,239,230,0.4)' }}
          >
            Admin CMS
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(item => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? 'rgba(170,134,75,0.15)' : 'transparent',
                color: isActive ? 'var(--color-gold)' : 'rgba(244,239,230,0.6)',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Ações */}
      <div
        className="px-3 py-4 border-t space-y-1"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{ color: 'rgba(244,239,230,0.5)' }}
        >
          <span>🌐</span>
          Ver Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          style={{ color: 'rgba(244,239,230,0.5)' }}
        >
          <span>🚪</span>
          Sair
        </button>
      </div>
    </aside>
  )
}
