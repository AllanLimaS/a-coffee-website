/**
 * Rate limiter in-memory — sem dependências externas.
 *
 * Funciona por janela deslizante simples: conta requisições por chave
 * (normalmente o IP) dentro de um intervalo de tempo.
 *
 * Limitação: o estado é por instância de servidor. Em produção na Vercel
 * com múltiplas lambdas cada instância tem seu próprio contador — para um
 * CMS de uso pessoal com poucos admins isso é mais que suficiente.
 */

interface Entry {
  count: number
  resetAt: number // timestamp em ms
}

const store = new Map<string, Entry>()

// Limpeza periódica para não acumular entradas antigas na memória
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}, 60_000)

export interface RateLimitOptions {
  /** Número máximo de requisições permitidas na janela */
  limit: number
  /** Duração da janela em milissegundos */
  windowMs: number
}

/**
 * Verifica se a chave excedeu o limite.
 * Retorna `{ allowed: true }` ou `{ allowed: false, retryAfterMs: number }`.
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): { allowed: true } | { allowed: false; retryAfterMs: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    // Janela nova
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }

  entry.count++
  return { allowed: true }
}

/**
 * Extrai o IP do cliente a partir dos headers do Next.js.
 * Considera proxies como o da Vercel (x-forwarded-for).
 */
export function getClientIp(req: Request): string {
  const forwarded = (req.headers as Headers).get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  const realIp = (req.headers as Headers).get('x-real-ip')
  if (realIp) return realIp.trim()

  return 'unknown'
}
