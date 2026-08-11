interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
  fullPage?: boolean
}

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-7 w-7 border-2',
  lg: 'h-10 w-10 border-[3px]',
}

export default function Loading({ size = 'md', label, fullPage = false }: LoadingProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={[
          'animate-spin rounded-full border-transparent',
          'border-t-[var(--color-gold)]',
          sizes[size],
        ].join(' ')}
        style={{ borderTopColor: 'var(--color-gold)' }}
        role="status"
        aria-label={label ?? 'Carregando...'}
      />
      {label && (
        <span className="text-sm" style={{ color: 'rgba(244,239,230,0.5)' }}>
          {label}
        </span>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-espresso)]/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return spinner
}
