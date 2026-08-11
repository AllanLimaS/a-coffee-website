import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/Sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <>{children}</>
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: '#0f0d0c' }}
    >
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="h-14 flex items-center justify-between px-6 border-b shrink-0"
          style={{
            backgroundColor: '#0f0d0c',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-sm" style={{ color: 'rgba(244,239,230,0.4)' }}>
            Bem-vindo, <span style={{ color: 'var(--color-canvas)' }}>{session.user?.name}</span>
          </p>
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-espresso)' }}
          >
            {session.user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
        </header>

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ backgroundColor: '#141210' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
