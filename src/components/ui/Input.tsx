import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'

// ── Base styles ──
const baseInput =
  'w-full rounded-md border px-3.5 py-2.5 text-sm transition-colors outline-none ' +
  'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.12)] text-[var(--color-canvas)] ' +
  'placeholder:text-[rgba(244,239,230,0.3)] ' +
  'focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

// ── Input ──

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'rgba(244,239,230,0.6)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[baseInput, error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '', className]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs" style={{ color: 'rgba(244,239,230,0.35)' }}>{hint}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ── Textarea ──

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, rows = 4, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'rgba(244,239,230,0.6)' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={[baseInput, 'resize-y min-h-[80px]', error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '', className]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs" style={{ color: 'rgba(244,239,230,0.35)' }}>{hint}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

// ── Select ──

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { label: string; value: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'rgba(244,239,230,0.6)' }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={[baseInput, 'cursor-pointer', error ? 'border-red-500' : '', className]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

export default Input
