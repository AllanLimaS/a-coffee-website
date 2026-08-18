'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(244,239,230,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:opacity-80"
              style={{
                fontFamily: 'var(--font-display)',
                color: scrolled ? 'var(--color-espresso)' : '#FFFFFF',
              }}
            >
              A. Coffee
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors duration-300 relative group"
                  style={{
                    color: isActive
                      ? 'var(--color-gold)'
                      : scrolled
                      ? 'var(--color-espresso)'
                      : 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 w-full transition-transform origin-left duration-200"
                    style={{
                      backgroundColor: 'var(--color-gold)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </Link>
              )
            })}
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contato"
              className="px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 hover:opacity-90 active:scale-95 shadow-sm"
              style={{
                backgroundColor: scrolled ? 'var(--color-forest)' : 'var(--color-gold)',
                color: scrolled ? 'var(--color-canvas)' : '#191614',
              }}
            >
              Fale Conosco
            </Link>
          </div>

          {/* Hambúrguer mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded cursor-pointer"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: scrolled ? 'var(--color-espresso)' : '#FFFFFF',
                transform: menuOpen ? 'translateY(8px) rotate(45deg)' : '',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: scrolled ? 'var(--color-espresso)' : '#FFFFFF',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{
                backgroundColor: scrolled ? 'var(--color-espresso)' : '#FFFFFF',
                transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : '',
              }}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className="md:hidden border-t backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: scrolled ? 'var(--color-canvas)' : 'rgba(25, 22, 20, 0.98)',
            borderColor: scrolled ? 'var(--color-border)' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_ITEMS.map(item => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-base font-medium border-b transition-colors"
                  style={{
                    color: isActive
                      ? 'var(--color-gold)'
                      : scrolled
                      ? 'var(--color-espresso)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: scrolled ? 'var(--color-border)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contato"
              className="mt-4 py-3 text-center rounded-md font-semibold transition-all"
              style={{
                backgroundColor: scrolled ? 'var(--color-forest)' : 'var(--color-gold)',
                color: scrolled ? 'var(--color-canvas)' : '#191614',
              }}
            >
              Fale Conosco
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
